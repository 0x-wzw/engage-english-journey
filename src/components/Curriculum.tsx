
import { useTranslation } from "@/contexts/TranslationContext";

/**
 * Curriculum Section – shows a sample/customizable curriculum
 * (For now: simple data and rendering; future: editing/customizer/admin area)
 */
const curriculum = [
  { level: "Beginner", summary: "Basic greetings, daily expressions, ABCs, numbers, simple sentences." },
  { level: "Elementary", summary: "Talking about yourself, asking questions, basic reading, simple writing." },
  { level: "Intermediate", summary: "Short stories, conversations, practical writing, basic listening comprehension." },
  { level: "Advanced", summary: "Long readings, written arguments, fluent conversation, listening to podcasts." },
];

const Curriculum = () => {
  const { t } = useTranslation();

  return (
    <section className="my-10 w-full">
      <h2 className="text-xl font-bold text-primary mb-4">{t('curriculum.title')}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {curriculum.map((c) => (
          <div key={c.level} className="p-5 rounded-lg bg-accent shadow border border-border">
            <p className="text-lg font-semibold text-foreground mb-1">{c.level}</p>
            <p className="text-muted-foreground">{c.summary}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-muted-foreground italic">
        {t('curriculum.note')}
      </div>
    </section>
  );
};

export default Curriculum;
