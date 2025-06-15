
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Bell } from "lucide-react";

const ReminderBar = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-900 rounded mb-4 border border-yellow-200 shadow">
    <Bell size={20} className="text-yellow-600" />
    <span>
      Remember to return regularly to continue your learning journey!
    </span>
  </div>
);

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatSection() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Send text or transcribed voice input to LLM webhook
  const handleSend = async (textToSend?: string) => {
    setError("");
    if (!webhookUrl) {
      setError("Please enter a valid LLM webhook URL.");
      return;
    }
    const sendText = textToSend ?? input.trim();
    if (!sendText) return;
    setMessages((prev) => [...prev, { role: "user", content: sendText }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: sendText },
          ],
        }),
      });
      if (!response.ok) throw new Error("LLM webhook error.");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || JSON.stringify(data) },
      ]);
    } catch (e: any) {
      setError(e.message || "Failed to contact LLM.");
    }
    setLoading(false);
  };

  // Simple Voice-to-Text (browser)
  const handleVoice = async () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setRecording(false);
      return;
    }
    setError("");
    audioChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        // For this example, we'll send the audio as base64 to the webhook,
        // assuming the backend can handle it.
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64audio = reader.result as string;
          setMessages((prev) => [
            ...prev,
            { role: "user", content: "[Voice message]" },
          ]);
          setLoading(true);
          try {
            const response = await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                audio: base64audio,
                previousMessages: messages,
              }),
            });
            if (!response.ok) throw new Error("LLM webhook error.");
            const data = await response.json();
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: data.reply || JSON.stringify(data) },
            ]);
          } catch (e: any) {
            setError(e.message || "Voice chat failed.");
          }
          setLoading(false);
        };
        reader.readAsDataURL(audioBlob);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (e: any) {
      setError("Microphone permission denied or not available.");
    }
  };

  return (
    <div className="mb-10 max-w-2xl mx-auto bg-white border border-border rounded-lg shadow px-6 py-5">
      <ReminderBar />
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-primary">
        <MessageCircle className="text-primary" />
        Practice with Chat
      </h2>
      <div className="mb-2 text-muted-foreground text-sm">
        Chat in English using text or voice! Provide your LLM webhook endpoint below to connect. All practice data stays in your browser.
      </div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter your LLM webhook URL..."
          value={webhookUrl}
          onChange={e => setWebhookUrl(e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="h-60 overflow-y-auto border border-border rounded bg-accent/40 p-3 mb-4 text-[15px]" style={{ minHeight: 200 }}>
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center my-6">No messages yet. Start chatting below!</div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`
              px-4 py-2 rounded-lg 
              ${msg.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}
              max-w-[72%] whitespace-pre-line
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-muted-foreground text-center text-xs mt-2">Assistant is typing...</div>
        )}
      </div>
      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
      >
        <Textarea
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          className="flex-1 min-h-[44px] resize-none"
          rows={2}
        />
        <div className="flex flex-row gap-2 mt-1 sm:mt-0">
          <Button
            type="submit"
            disabled={loading || !input.trim() || !webhookUrl}
            variant="default"
            className="px-4 py-2"
          >
            Send
          </Button>
          <Button
            type="button"
            onClick={handleVoice}
            disabled={loading || !webhookUrl}
            variant={recording ? "destructive" : "secondary"}
            className="px-4 py-2"
          >
            {recording ? "Stop" : "🎤"}
          </Button>
        </div>
      </form>
      {error && <div className="text-destructive mt-2 text-sm">{error}</div>}
      <div className="mt-3 text-xs text-muted-foreground">
        <b>Note:</b> If you don't have an LLM webhook endpoint, try one from an AI provider. Voice input sends audio as <code>base64</code>.
      </div>
    </div>
  );
}
