
import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

/** Simple demo questions for each type. In production: make customizable */

const ASSESSMENT_QUESTIONS = [
  {
    skill: "reading",
    question: "What does this sentence mean? 'She is reading a book.'",
    options: [
      "She is eating a book",
      "She is running outside",
      "She is looking at written pages",
      "She is buying a new bag"
    ],
    answer: 2
  },
  {
    skill: "writing",
    question: "Write a sentence about your favorite hobby.",
    open: true,
  },
  {
    skill: "listening",
    question: "Listen and choose what you hear.",
    audio: "/placeholder.mp3", // replace with actual audio when available
    options: [
      "The cat is black",
      "The dog is running",
      "The rain is heavy",
      "The car is fast"
    ],
    answer: 0
  },
  {
    skill: "speaking",
    question: "Say aloud: 'I am learning English.'",
    speaking: true,
  }
];

type AnswerData = {
  [index: number]: string | number;
};

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerData>({});
  const [submitted, setSubmitted] = useState(false);

  const question = ASSESSMENT_QUESTIONS[step];

  // Handling speaking/audio is placeholder for now, as it's advanced and may need browser permissions/backends.
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 bg-card p-8 rounded-lg shadow-lg border border-border animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-primary">Skill Assessment</h1>
        {step < ASSESSMENT_QUESTIONS.length ? (
          <>
            <div className="mb-6">
              <span className="font-semibold text-lg text-muted-foreground">
                {question.skill === "reading" && "Reading"}
                {question.skill === "writing" && "Writing"}
                {question.skill === "listening" && "Listening"}
                {question.skill === "speaking" && "Speaking"}
              </span>
            </div>
            <div className="mb-5 text-lg text-foreground">{question.question}</div>
            {/* Audio placeholder */}
            {question.audio && (
              <audio controls className="mb-4">
                <source src={question.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {/* Choice Q */}
            {question.options && (
              <div className="grid grid-cols-1 gap-3 w-full">
                {question.options.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers(a => ({ ...a, [step]: idx }))}
                    className={`px-5 py-3 rounded border border-border text-left font-medium ${
                      answers[step] === idx
                        ? "bg-primary text-white shadow"
                        : "bg-accent text-foreground"
                    } hover:border-primary hover:scale-105 transition`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {/* Open Q */}
            {question.open && (
              <textarea
                className="w-full mt-2 border border-border rounded p-3"
                rows={3}
                placeholder="Write your answer here..."
                value={String(answers[step] || "")}
                onChange={e => setAnswers(a => ({ ...a, [step]: e.target.value }))}
              />
            )}
            {/* Speaking placeholder */}
            {question.speaking && (
              <div className="mt-2 text-accent-foreground">
                <em>(Say the sentence aloud. <span className="text-xs text-muted-foreground">(Speaking scoring coming soon)</span>)</em>
              </div>
            )}
            <div className="mt-7 flex gap-3">
              {step > 0 && (
                <button
                  className="px-4 py-2 rounded bg-secondary font-semibold text-foreground hover:bg-[#74d0aa] transition"
                  onClick={() => setStep(s => s - 1)}
                >
                  ← Back
                </button>
              )}
              <button
                className="ml-auto px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-[#1277a8] transition"
                onClick={() => setStep(s => s + 1)}
                disabled={question.open ? !answers[step] : (question.options ? answers[step] === undefined : false)}
              >
                {step === ASSESSMENT_QUESTIONS.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center animate-fade-in mt-10">
            <div className="text-xl font-bold text-accent-foreground mb-2">Assessment Complete!</div>
            <div className="mb-3 text-muted-foreground">Great job taking the first step! Your progress will appear in your dashboard.</div>
            <Link to="/dashboard" className="underline text-primary text-lg hover:text-[#1277a8] transition">
              View Dashboard
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
