
import Layout from "@/components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";

const SelfAssessment = () => {
  const [result, setResult] = useState<{[skill: string]: number}>({});
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const skills = [
    { id: "reading", label: t('skills.reading') },
    { id: "writing", label: t('skills.writing') },
    { id: "listening", label: t('skills.listening') },
    { id: "speaking", label: t('skills.speaking') },
  ];

  const handleChange = (skill: string, value: number) => {
    setResult((prev) => ({ ...prev, [skill]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Save to Supabase for persistent storage and gap analysis
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-2xl font-bold mb-6 text-primary">{t('selfAssessment.title')}</h1>
        <p className="mb-6 text-muted-foreground">{t('selfAssessment.subtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {skills.map(skill => (
            <div key={skill.id} className="flex flex-col gap-2">
              <label className="text-lg font-semibold">{skill.label}</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(val => (
                  <button
                    key={val}
                    type="button"
                    className={`border border-border w-10 h-10 rounded-full flex items-center justify-center transition text-lg font-bold ${
                      result[skill.id] === val
                        ? "bg-primary text-white scale-110 shadow"
                        : "bg-accent"
                    } hover:border-primary`}
                    onClick={() => handleChange(skill.id, val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 rounded-lg font-semibold mt-6 text-lg hover:bg-[#1277a8] transition`}
            disabled={Object.keys(result).length < skills.length}
          >
            {t('selfAssessment.saveButton')}
          </button>
        </form>
        {submitted && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="font-semibold text-foreground mb-2">
              {t('selfAssessment.thankYou')}
            </div>
            <Link
              to="/assessment"
              className="underline text-primary text-lg hover:text-[#1277a8] transition"
            >
              {t('selfAssessment.startTest')}
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SelfAssessment;
