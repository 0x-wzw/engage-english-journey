
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Bell, Mic, Image, File } from "lucide-react";

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
  type?: "text" | "image" | "file" | "audio";
  fileName?: string;
  fileUrl?: string;
};

export default function ChatSection() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // --- FILE & IMAGE HANDLING ---
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFileUploading(true);
    const file = e.target.files?.[0];
    if (!file) { setFileUploading(false); return; }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size too large (max 5MB).");
      setFileUploading(false);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64file = reader.result as string;
      setMessages(prev => [
        ...prev,
        { role: "user", content: file.name, type: "file", fileName: file.name, fileUrl: base64file }
      ]);
      await sendToWebhook({
        type: "file",
        fileName: file.name,
        fileData: base64file,
      });
      setFileUploading(false);
    };
    reader.readAsDataURL(file);
    // Reset input for re-upload
    e.target.value = "";
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFileUploading(true);
    const file = e.target.files?.[0];
    if (!file) { setFileUploading(false); return; }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      setFileUploading(false);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image size too large (max 5MB).");
      setFileUploading(false);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64image = reader.result as string;
      setMessages(prev => [
        ...prev,
        { role: "user", content: "", type: "image", fileName: file.name, fileUrl: base64image }
      ]);
      await sendToWebhook({
        type: "image",
        fileName: file.name,
        fileData: base64image,
      });
      setFileUploading(false);
    };
    reader.readAsDataURL(file);
    // Reset input for re-upload
    e.target.value = "";
  };

  const sendToWebhook = async (data: any) => {
    if (!webhookUrl) {
      setError("Please enter a valid LLM webhook URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          messages,
        }),
      });
      if (!response.ok) throw new Error("LLM webhook error.");
      const result = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.reply || JSON.stringify(result) },
      ]);
    } catch (e: any) {
      setError(e.message || "Failed to contact LLM.");
    }
    setLoading(false);
  };

  // Send text or transcribed voice input to LLM webhook
  const handleSend = async (textToSend?: string) => {
    setError("");
    if (!webhookUrl) {
      setError("Please enter a valid LLM webhook URL.");
      return;
    }
    const sendText = textToSend ?? input.trim();
    if (!sendText) return;
    setMessages((prev) => [...prev, { role: "user", content: sendText, type: "text" }]);
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

  // --- VOICE-to-TEXT (browser only, now marks message as "audio") ---
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
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64audio = reader.result as string;
          setMessages((prev) => [
            ...prev,
            { role: "user", content: "[Voice message]", type: "audio", fileUrl: base64audio }
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

  // ---- Chat UI ----
  return (
    <div className="mb-10 max-w-2xl mx-auto bg-white border border-border rounded-lg shadow px-6 py-5">
      <ReminderBar />
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2 text-primary">
        <MessageCircle className="text-primary" />
        Practice with Chat
      </h2>
      <div className="mb-2 text-muted-foreground text-sm">
        Chat in English using text, voice, images, or files! Provide your LLM webhook endpoint below to connect. All practice data stays in your browser.
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
              max-w-[72%] whitespace-pre-line break-words
            `}>
              {/* Render message depending on type */}
              {msg.type === "image" && msg.fileUrl &&
                <img src={msg.fileUrl} alt={msg.fileName || "uploaded image"} className="rounded w-full max-w-[250px] max-h-[180px] object-contain mb-1" />}
              {msg.type === "file" && msg.fileUrl &&
                <a
                  href={msg.fileUrl}
                  download={msg.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                  style={{ wordBreak: 'break-all' }}
                >
                  📎 {msg.fileName}
                </a>
              }
              {(msg.type === "audio" && msg.fileUrl) ?
                <audio src={msg.fileUrl} controls className="w-full mt-1" /> : null}
              {/* Plain text fallback */}
              {msg.type === "text" || !msg.type ? msg.content : null}
              {msg.role === "user" && (msg.type === "file" || msg.type === "image") && msg.fileName && (
                <div className="text-xs mt-1">{msg.fileName}</div>
              )}
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
          {/* Image upload button */}
          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            variant="ghost"
            size="icon"
            disabled={loading || fileUploading || !webhookUrl}
            className="p-0"
            title="Send Image"
          >
            <Image className="text-blue-600" />
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </Button>
          {/* File upload button */}
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            variant="ghost"
            size="icon"
            disabled={loading || fileUploading || !webhookUrl}
            className="p-0"
            title="Send File"
          >
            <File className="text-gray-600" />
            <input
              type="file"
              accept="*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
          {/* Voice button */}
          <Button
            type="button"
            onClick={handleVoice}
            disabled={loading || !webhookUrl}
            variant={recording ? "destructive" : "secondary"}
            className="px-4 py-2"
            title="Send Voice"
          >
            <Mic className={recording ? "animate-pulse" : ""} />
            {recording ? "Stop" : ""}
          </Button>
          {/* Send */}
          <Button
            type="submit"
            disabled={loading || !input.trim() || !webhookUrl}
            variant="default"
            className="px-4 py-2"
          >
            Send
          </Button>
        </div>
      </form>
      {fileUploading && (
        <div className="text-xs text-muted-foreground mt-1">Uploading...</div>
      )}
      {error && <div className="text-destructive mt-2 text-sm">{error}</div>}
      <div className="mt-3 text-xs text-muted-foreground">
        <b>Note:</b> Supports text, voice, images, and file uploads (max 5MB each). Files/images are sent as <code>base64</code> to your webhook.
      </div>
    </div>
  );
}
// ... no other code here
