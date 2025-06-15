
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

const curriculums = [
  {
    level: "Beginner",
    summary: "Basic greetings, daily expressions, ABCs, numbers, simple sentences.",
  },
  {
    level: "Elementary",
    summary: "Talking about yourself, asking questions, basic reading, simple writing.",
  },
  {
    level: "Intermediate",
    summary: "Short stories, conversations, practical writing, basic listening comprehension.",
  },
  {
    level: "Advanced",
    summary: "Long readings, written arguments, fluent conversation, listening to podcasts.",
  },
];

const ContinueLearning = () => {
  const navigate = useNavigate();

  const handleStartLevel = (level: string) => {
    navigate(`/assessment?level=${encodeURIComponent(level)}`);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 bg-card p-8 rounded-lg shadow-xl border border-border animate-fade-in">
        <h1 className="text-2xl font-bold mb-4 text-primary">Continue Learning</h1>
        <div className="mb-6 text-muted-foreground text-lg">
          Choose a level to start or continue your English learning journey!
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {curriculums.map((curriculum) => (
            <div
              key={curriculum.level}
              className="bg-accent p-6 rounded-lg border border-border shadow flex flex-col justify-between"
            >
              <div>
                <div className="font-semibold text-lg text-foreground mb-1">{curriculum.level}</div>
                <div className="text-muted-foreground text-[15px] mb-4">{curriculum.summary}</div>
              </div>
              <button
                onClick={() => handleStartLevel(curriculum.level)}
                className="mt-auto px-4 py-2 bg-primary text-white rounded hover:bg-[#1277a8] transition text-sm font-semibold"
              >
                {`Start ${curriculum.level}`}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 text-xs text-muted-foreground text-center italic">
          (Your progress will be saved when you finish assessments for each level!)
        </div>
      </div>
    </Layout>
  );
};

export default ContinueLearning;
