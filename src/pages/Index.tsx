
import { Link } from "react-router-dom";
import Curriculum from "@/components/Curriculum";
import Layout from "@/components/Layout";

const Index = () => (
  <Layout>
    <section className="flex flex-col md:flex-row items-center gap-8 my-12">
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Relaxed English Learning</h1>
        <p className="text-lg md:text-xl mb-6 text-muted-foreground">
          Simple, fun English for everyone. Assess yourself, discover your strengths, and learn at your own pace. 🎉
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/login"
            className="bg-primary hover:bg-[#1277a8] text-white font-semibold px-6 py-3 rounded shadow text-lg hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/self-assessment"
            className="bg-secondary hover:bg-[#7bdcb5] text-gray-700 font-semibold px-6 py-3 rounded shadow text-lg transition"
          >
            Try Self Assessment
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No stress. No pressure. Low-data, always saves your progress!
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-accent rounded-2xl p-8 shadow-xl w-[320px] h-[290px] flex flex-col items-center justify-center border border-border">
          <div className="text-6xl mb-3">🌱📖</div>
          <div className="font-semibold text-lg text-foreground mb-1">Your Learning Journey</div>
          <ul className="list-disc pl-6 text-sm text-muted-foreground text-left">
            <li>Self Assessment</li>
            <li>Reading, Writing, Listening, Speaking</li>
            <li>Dashboard: Track your progress</li>
            <li>Resume anytime</li>
            <li>Customized learning</li>
          </ul>
        </div>
      </div>
    </section>
    <Curriculum />
  </Layout>
);

export default Index;
