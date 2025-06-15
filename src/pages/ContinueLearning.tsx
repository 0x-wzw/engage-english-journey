import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ContinueLearning = () => {
  const navigate = useNavigate();

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

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
        {error && (
          <div className="text-destructive mb-4">Failed to load courses: {error.message}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {isLoading ? (
            <div className="col-span-2 text-center text-muted-foreground">Loading courses...</div>
          ) : (courses && courses.length > 0 ? (
            courses.map((curriculum: any) => (
              <div
                key={curriculum.id}
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
            ))
          ) : (
            <div className="col-span-2 text-center text-muted-foreground">No courses available yet.</div>
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
