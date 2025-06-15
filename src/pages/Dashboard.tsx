import Layout from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// TODO: Replace fake data with Supabase-backed progress and results.
const exampleProgress = [
  { skill: "Reading",  self: 3, actual: 2, progress: 30 },
  { skill: "Writing",  self: 2, actual: 2, progress: 50 },
  { skill: "Listening",  self: 1, actual: 3, progress: 70 },
  { skill: "Speaking",  self: 4, actual: 2, progress: 40 }
];

// Curriculum data by level
const curriculums = [
  { 
    level: "Beginner", 
    summary: "Basic greetings, daily expressions, ABCs, numbers, simple sentences." 
  },
  { 
    level: "Elementary", 
    summary: "Talking about yourself, asking questions, basic reading, simple writing." 
  },
  { 
    level: "Intermediate", 
    summary: "Short stories, conversations, practical writing, basic listening comprehension." 
  },
  { 
    level: "Advanced", 
    summary: "Long readings, written arguments, fluent conversation, listening to podcasts." 
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  // Handler for direct navigation to assessment with selected level (pass as search query for simplicity)
  const handleStartLevel = (level: string) => {
    navigate(`/assessment?level=${encodeURIComponent(level)}`);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-12 bg-card p-8 rounded-lg shadow-xl border border-border">
        <h1 className="text-2xl font-bold mb-4 text-primary">Your Dashboard</h1>
        <div className="mb-4 text-muted-foreground">
          Welcome! Here you’ll see your progress and learning journey. <br />
          (Connect Supabase to track and save your results!)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exampleProgress.map((row) => (
            <div key={row.skill} className="bg-accent p-5 rounded-lg border border-border shadow">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg">{row.skill}</div>
                <div className="text-xs">Progress: <span className="font-bold">{row.progress}%</span></div>
              </div>
              <div className="text-sm mt-3">Self assessment: <span className="font-semibold">{row.self} / 5</span></div>
              <div className="text-sm">Test Score: <span className="font-semibold">{row.actual} / 5</span></div>
              <div className="mt-2">
                <progress
                  value={row.progress}
                  max={100}
                  className="w-full h-2 rounded bg-secondary"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/assessment"
            className="px-6 py-2 bg-primary text-white rounded font-semibold hover:bg-[#1277a8] transition"
          >
            Assessment
          </Link>
          <Link
            to="/self-assessment"
            className="px-6 py-2 bg-secondary rounded font-semibold hover:bg-[#74d0aa] text-foreground transition"
          >
            Redo Self-Assessment
          </Link>
          {/* Added prominent button to view all courses */}
          <Link
            to="/continue-learning"
            className="px-6 py-2 bg-accent border border-border text-primary font-semibold rounded hover:bg-muted transition ml-auto"
          >
            View All Courses
          </Link>
        </div>
        <div className="mt-8 text-[13px] italic text-muted-foreground text-center">
          <span>Tip: Your dashboard updates whenever you finish a self-assessment or skill test.</span>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
