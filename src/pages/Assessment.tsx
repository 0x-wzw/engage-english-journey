import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

// Demo assessment questions grouped by level for extensibility and customizability.
const ASSESSMENT_QUESTIONS_BY_LEVEL = {
  Beginner: [
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
      audio: "/placeholder.mp3",
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
    },
  ],
  Elementary: [
    {
      skill: "reading",
      question: "What does this sentence mean? 'He walks to school every day.'",
      options: [
        "He drives a car to work.",
        "He goes to school by bus.",
        "He walks to school each day.",
        "He plays at school."
      ],
      answer: 2
    },
    {
      skill: "writing",
      question: "Write a sentence about your family.",
      open: true,
    },
    {
      skill: "listening",
      question: "Listen and choose what you hear.",
      audio: "/placeholder.mp3",
      options: [
        "They eat dinner together.",
        "The weather is sunny.",
        "She has a red balloon.",
        "I go to the library."
      ],
      answer: 0
    },
    {
      skill: "speaking",
      question: "Say aloud: 'My name is [your name].'",
      speaking: true,
    },
  ],
  Intermediate: [
    {
      skill: "reading",
      question: "Choose the correct meaning: 'He will call you back.'",
      options: [
        "He will return your phone.",
        "He will return your call.",
        "He will call your friend.",
        "He will block your number."
      ],
      answer: 1
    },
    {
      skill: "writing",
      question: "Write a short email to schedule a meeting.",
      open: true,
    },
    {
      skill: "listening",
      question: "Listen and choose what you hear.",
      audio: "/placeholder.mp3",
      options: [
        "She likes apples.",
        "He reads fast.",
        "They are watching a movie.",
        "We finished our homework."
      ],
      answer: 2
    },
    {
      skill: "speaking",
      question: "Say aloud: 'Could you please repeat that?'",
      speaking: true,
    },
  ],
  Advanced: [
    {
      skill: "reading",
      question: "Interpret: 'Despite the rain, she managed to arrive on time.'",
      options: [
        "She arrived late because of the rain.",
        "She forgot her umbrella.",
        "She was on time even though it rained.",
        "She didn't come at all."
      ],
      answer: 2
    },
    {
      skill: "writing",
      question: "Write a paragraph about a memorable journey you have taken.",
      open: true,
    },
    {
      skill: "listening",
      question: "Listen and choose what you hear.",
      audio: "/placeholder.mp3",
      options: [
        "He missed the train due to traffic.",
        "The project deadline is tomorrow.",
        "They are celebrating their anniversary.",
        "I prefer tea over coffee."
      ],
      answer: 0
    },
    {
      skill: "speaking",
      question: "Say aloud: 'Learning a language opens many doors.'",
      speaking: true,
    },
  ]
};

const LEVELS = Object.keys(ASSESSMENT_QUESTIONS_BY_LEVEL);

type AnswerData = {
  [index: number]: string | number;
};

const Assessment = () => {
  const [level, setLevel] = useState(LEVELS[0]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerData>({});
  // Allows "finish" message
  const [submitted, setSubmitted] = useState(false);

  // Questions for current level
  const questions = ASSESSMENT_QUESTIONS_BY_LEVEL[level];
  const question = questions[step];

  // Reset assessment on level change
  const handleLevelChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(evt.target.value);
    setStep(0);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 bg-card p-8 rounded-lg shadow-lg border border-border animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-primary">Skill Assessment</h1>
        {/* Level selector */}
        <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:items-center">
          <label className="text-lg font-semibold text-muted-foreground" htmlFor="level-select">
            Select Level:
          </label>
          <select
            id="level-select"
            className="border border-border rounded p-2 bg-accent font-medium text-base text-foreground focus:outline-none"
            value={level}
            onChange={handleLevelChange}
          >
            {LEVELS.map(lvl => (
              <option value={lvl} key={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        {step < questions.length ? (
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
            {/* Choice Question */}
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
                onClick={() => {
                  if (step === questions.length - 1) {
                    setSubmitted(true);
                    setStep(s => s + 1);
                  } else {
                    setStep(s => s + 1);
                  }
                }}
                disabled={question.open ? !answers[step] : (question.options ? answers[step] === undefined : false)}
              >
                {step === questions.length - 1 ? "Finish" : "Next"}
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
