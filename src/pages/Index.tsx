
import { Link } from "react-router-dom";
import Curriculum from "@/components/Curriculum";
import Layout from "@/components/Layout";
import { useTranslation } from "@/contexts/TranslationContext";

const Index = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="flex flex-col md:flex-row items-center gap-8 my-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('home.title')}</h1>
          <p className="text-lg md:text-xl mb-6 text-muted-foreground">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-primary hover:bg-[#1277a8] text-white font-semibold px-6 py-3 rounded shadow text-lg hover:scale-105 transition"
            >
              {t('home.getStarted')}
            </Link>
            <Link
              to="/self-assessment"
              className="bg-secondary hover:bg-[#7bdcb5] text-gray-700 font-semibold px-6 py-3 rounded shadow text-lg transition"
            >
              {t('home.tryAssessment')}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t('home.noStress')}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-accent rounded-2xl p-8 shadow-xl w-[320px] h-[290px] flex flex-col items-center justify-center border border-border">
            <div className="text-6xl mb-3">🌱📖</div>
            <div className="font-semibold text-lg text-foreground mb-1">{t('home.journeyTitle')}</div>
            <ul className="list-disc pl-6 text-sm text-muted-foreground text-left">
              <li>{t('home.journey.selfAssessment')}</li>
              <li>{t('home.journey.skills')}</li>
              <li>{t('home.journey.dashboard')}</li>
              <li>{t('home.journey.resume')}</li>
              <li>{t('home.journey.customized')}</li>
            </ul>
          </div>
        </div>
      </section>
      <Curriculum />
    </Layout>
  );
};

export default Index;
