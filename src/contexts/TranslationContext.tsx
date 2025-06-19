
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'Learn English, Relaxed',
    'nav.home': 'Home',
    'nav.selfAssessment': 'Self Assessment',
    'nav.assessment': 'Assessment',
    'nav.courses': 'Courses',
    'nav.dashboard': 'Dashboard',
    'nav.manageCourses': 'Manage Courses',
    'nav.apiKeys': 'API Key Management',
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.account': 'Account',
    'auth.loading': 'Loading...',
    
    // Home page
    'home.title': 'Relaxed English Learning',
    'home.subtitle': 'Simple, fun English for everyone. Assess yourself, discover your strengths, and learn at your own pace. 🎉',
    'home.getStarted': 'Get Started',
    'home.tryAssessment': 'Try Self Assessment',
    'home.noStress': 'No stress. No pressure. Low-data, always saves your progress!',
    'home.journeyTitle': 'Your Learning Journey',
    'home.journey.selfAssessment': 'Self Assessment',
    'home.journey.skills': 'Reading, Writing, Listening, Speaking',
    'home.journey.dashboard': 'Dashboard: Track your progress',
    'home.journey.resume': 'Resume anytime',
    'home.journey.customized': 'Customized learning',
    'curriculum.title': 'Sample Curriculum',
    'curriculum.note': '(Curriculum is customizable for your needs.)',
    
    // Footer
    'footer.text': 'Made with ❤️ for learners everywhere.',
    
    // Skills
    'skills.reading': 'Reading 📚',
    'skills.writing': 'Writing ✏️',
    'skills.listening': 'Listening 🎧',
    'skills.speaking': 'Speaking 🗣️',
  },
  es: {
    // Header
    'header.title': 'Aprende Inglés, Relajado',
    'nav.home': 'Inicio',
    'nav.selfAssessment': 'Autoevaluación',
    'nav.assessment': 'Evaluación',
    'nav.courses': 'Cursos',
    'nav.dashboard': 'Panel',
    'nav.manageCourses': 'Gestionar Cursos',
    'nav.apiKeys': 'Gestión de Claves API',
    'auth.login': 'Iniciar Sesión',
    'auth.logout': 'Cerrar Sesión',
    'auth.account': 'Cuenta',
    'auth.loading': 'Cargando...',
    
    // Home page
    'home.title': 'Aprendizaje de Inglés Relajado',
    'home.subtitle': 'Inglés simple y divertido para todos. Evalúate, descubre tus fortalezas y aprende a tu ritmo. 🎉',
    'home.getStarted': 'Comenzar',
    'home.tryAssessment': 'Probar Autoevaluación',
    'home.noStress': '¡Sin estrés. Sin presión. Bajo consumo de datos, siempre guarda tu progreso!',
    'home.journeyTitle': 'Tu Viaje de Aprendizaje',
    'home.journey.selfAssessment': 'Autoevaluación',
    'home.journey.skills': 'Lectura, Escritura, Escucha, Habla',
    'home.journey.dashboard': 'Panel: Sigue tu progreso',
    'home.journey.resume': 'Continúa en cualquier momento',
    'home.journey.customized': 'Aprendizaje personalizado',
    'curriculum.title': 'Currículo de Muestra',
    'curriculum.note': '(El currículo es personalizable según tus necesidades.)',
    
    // Footer
    'footer.text': 'Hecho con ❤️ para estudiantes de todo el mundo.',
    
    // Skills
    'skills.reading': 'Lectura 📚',
    'skills.writing': 'Escritura ✏️',
    'skills.listening': 'Escucha 🎧',
    'skills.speaking': 'Habla 🗣️',
  },
  fr: {
    // Header
    'header.title': 'Apprendre l\'Anglais, Détendu',
    'nav.home': 'Accueil',
    'nav.selfAssessment': 'Auto-évaluation',
    'nav.assessment': 'Évaluation',
    'nav.courses': 'Cours',
    'nav.dashboard': 'Tableau de bord',
    'nav.manageCourses': 'Gérer les Cours',
    'nav.apiKeys': 'Gestion des Clés API',
    'auth.login': 'Se connecter',
    'auth.logout': 'Se déconnecter',
    'auth.account': 'Compte',
    'auth.loading': 'Chargement...',
    
    // Home page
    'home.title': 'Apprentissage de l\'Anglais Détendu',
    'home.subtitle': 'Anglais simple et amusant pour tous. Évaluez-vous, découvrez vos forces et apprenez à votre rythme. 🎉',
    'home.getStarted': 'Commencer',
    'home.tryAssessment': 'Essayer l\'Auto-évaluation',
    'home.noStress': 'Pas de stress. Pas de pression. Faible consommation de données, sauvegarde toujours vos progrès !',
    'home.journeyTitle': 'Votre Parcours d\'Apprentissage',
    'home.journey.selfAssessment': 'Auto-évaluation',
    'home.journey.skills': 'Lecture, Écriture, Écoute, Expression orale',
    'home.journey.dashboard': 'Tableau de bord : Suivez vos progrès',
    'home.journey.resume': 'Reprendre à tout moment',
    'home.journey.customized': 'Apprentissage personnalisé',
    'curriculum.title': 'Programme d\'Exemple',
    'curriculum.note': '(Le programme est personnalisable selon vos besoins.)',
    
    // Footer
    'footer.text': 'Fait avec ❤️ pour les apprenants du monde entier.',
    
    // Skills
    'skills.reading': 'Lecture 📚',
    'skills.writing': 'Écriture ✏️',
    'skills.listening': 'Écoute 🎧',
    'skills.speaking': 'Expression orale 🗣️',
  },
  de: {
    // Header
    'header.title': 'Englisch lernen, Entspannt',
    'nav.home': 'Startseite',
    'nav.selfAssessment': 'Selbsteinschätzung',
    'nav.assessment': 'Bewertung',
    'nav.courses': 'Kurse',
    'nav.dashboard': 'Dashboard',
    'nav.manageCourses': 'Kurse verwalten',
    'nav.apiKeys': 'API-Schlüssel-Verwaltung',
    'auth.login': 'Anmelden',
    'auth.logout': 'Abmelden',
    'auth.account': 'Konto',
    'auth.loading': 'Laden...',
    
    // Home page
    'home.title': 'Entspanntes Englisch-Lernen',
    'home.subtitle': 'Einfaches, spaßiges Englisch für alle. Bewerten Sie sich selbst, entdecken Sie Ihre Stärken und lernen Sie in Ihrem eigenen Tempo. 🎉',
    'home.getStarted': 'Loslegen',
    'home.tryAssessment': 'Selbsteinschätzung ausprobieren',
    'home.noStress': 'Kein Stress. Kein Druck. Geringer Datenverbrauch, speichert immer Ihren Fortschritt!',
    'home.journeyTitle': 'Ihre Lernreise',
    'home.journey.selfAssessment': 'Selbsteinschätzung',
    'home.journey.skills': 'Lesen, Schreiben, Hören, Sprechen',
    'home.journey.dashboard': 'Dashboard: Verfolgen Sie Ihren Fortschritt',
    'home.journey.resume': 'Jederzeit fortsetzen',
    'home.journey.customized': 'Individuelles Lernen',
    'curriculum.title': 'Beispiel-Lehrplan',
    'curriculum.note': '(Der Lehrplan ist an Ihre Bedürfnisse anpassbar.)',
    
    // Footer
    'footer.text': 'Mit ❤️ für Lernende überall gemacht.',
    
    // Skills
    'skills.reading': 'Lesen 📚',
    'skills.writing': 'Schreiben ✏️',
    'skills.listening': 'Hören 🎧',
    'skills.speaking': 'Sprechen 🗣️',
  },
  it: {
    // Header
    'header.title': 'Impara l\'Inglese, Rilassato',
    'nav.home': 'Home',
    'nav.selfAssessment': 'Autovalutazione',
    'nav.assessment': 'Valutazione',
    'nav.courses': 'Corsi',
    'nav.dashboard': 'Dashboard',
    'nav.manageCourses': 'Gestisci Corsi',
    'nav.apiKeys': 'Gestione Chiavi API',
    'auth.login': 'Accedi',
    'auth.logout': 'Esci',
    'auth.account': 'Account',
    'auth.loading': 'Caricamento...',
    
    // Home page
    'home.title': 'Apprendimento dell\'Inglese Rilassato',
    'home.subtitle': 'Inglese semplice e divertente per tutti. Valutati, scopri i tuoi punti di forza e impara al tuo ritmo. 🎉',
    'home.getStarted': 'Inizia',
    'home.tryAssessment': 'Prova l\'Autovalutazione',
    'home.noStress': 'Niente stress. Nessuna pressione. Basso consumo dati, salva sempre i tuoi progressi!',
    'home.journeyTitle': 'Il Tuo Viaggio di Apprendimento',
    'home.journey.selfAssessment': 'Autovalutazione',
    'home.journey.skills': 'Lettura, Scrittura, Ascolto, Parlato',
    'home.journey.dashboard': 'Dashboard: Traccia i tuoi progressi',
    'home.journey.resume': 'Riprendi in qualsiasi momento',
    'home.journey.customized': 'Apprendimento personalizzato',
    'curriculum.title': 'Curriculum di Esempio',
    'curriculum.note': '(Il curriculum è personalizzabile per le tue esigenze.)',
    
    // Footer
    'footer.text': 'Fatto con ❤️ per studenti di tutto il mondo.',
    
    // Skills
    'skills.reading': 'Lettura 📚',
    'skills.writing': 'Scrittura ✏️',
    'skills.listening': 'Ascolto 🎧',
    'skills.speaking': 'Parlato 🗣️',
  },
  pt: {
    // Header
    'header.title': 'Aprenda Inglês, Relaxado',
    'nav.home': 'Início',
    'nav.selfAssessment': 'Autoavaliação',
    'nav.assessment': 'Avaliação',
    'nav.courses': 'Cursos',
    'nav.dashboard': 'Painel',
    'nav.manageCourses': 'Gerenciar Cursos',
    'nav.apiKeys': 'Gerenciamento de Chaves API',
    'auth.login': 'Entrar',
    'auth.logout': 'Sair',
    'auth.account': 'Conta',
    'auth.loading': 'Carregando...',
    
    // Home page
    'home.title': 'Aprendizado de Inglês Relaxado',
    'home.subtitle': 'Inglês simples e divertido para todos. Avalie-se, descubra seus pontos fortes e aprenda no seu ritmo. 🎉',
    'home.getStarted': 'Começar',
    'home.tryAssessment': 'Experimentar Autoavaliação',
    'home.noStress': 'Sem estresse. Sem pressão. Baixo consumo de dados, sempre salva seu progresso!',
    'home.journeyTitle': 'Sua Jornada de Aprendizado',
    'home.journey.selfAssessment': 'Autoavaliação',
    'home.journey.skills': 'Leitura, Escrita, Escuta, Fala',
    'home.journey.dashboard': 'Painel: Acompanhe seu progresso',
    'home.journey.resume': 'Continue a qualquer momento',
    'home.journey.customized': 'Aprendizado personalizado',
    'curriculum.title': 'Currículo de Exemplo',
    'curriculum.note': '(O currículo é personalizável para suas necessidades.)',
    
    // Footer
    'footer.text': 'Feito com ❤️ para estudantes de todo o mundo.',
    
    // Skills
    'skills.reading': 'Leitura 📚',
    'skills.writing': 'Escrita ✏️',
    'skills.listening': 'Escuta 🎧',
    'skills.speaking': 'Fala 🗣️',
  },
  zh: {
    // Header
    'header.title': '轻松学英语',
    'nav.home': '首页',
    'nav.selfAssessment': '自我评估',
    'nav.assessment': '评估',
    'nav.courses': '课程',
    'nav.dashboard': '仪表板',
    'nav.manageCourses': '管理课程',
    'nav.apiKeys': 'API密钥管理',
    'auth.login': '登录',
    'auth.logout': '退出',
    'auth.account': '账户',
    'auth.loading': '加载中...',
    
    // Home page
    'home.title': '轻松英语学习',
    'home.subtitle': '简单有趣的英语，适合每个人。评估自己，发现优势，按自己的节奏学习。🎉',
    'home.getStarted': '开始',
    'home.tryAssessment': '尝试自我评估',
    'home.noStress': '无压力。无负担。低数据使用，始终保存您的进度！',
    'home.journeyTitle': '您的学习之旅',
    'home.journey.selfAssessment': '自我评估',
    'home.journey.skills': '阅读、写作、听力、口语',
    'home.journey.dashboard': '仪表板：跟踪您的进度',
    'home.journey.resume': '随时继续',
    'home.journey.customized': '个性化学习',
    'curriculum.title': '示例课程',
    'curriculum.note': '（课程可根据您的需求定制。）',
    
    // Footer
    'footer.text': '用❤️为世界各地的学习者制作。',
    
    // Skills
    'skills.reading': '阅读 📚',
    'skills.writing': '写作 ✏️',
    'skills.listening': '听力 🎧',
    'skills.speaking': '口语 🗣️',
  },
  ja: {
    // Header
    'header.title': 'リラックス英語学習',
    'nav.home': 'ホーム',
    'nav.selfAssessment': '自己評価',
    'nav.assessment': '評価',
    'nav.courses': 'コース',
    'nav.dashboard': 'ダッシュボード',
    'nav.manageCourses': 'コース管理',
    'nav.apiKeys': 'APIキー管理',
    'auth.login': 'ログイン',
    'auth.logout': 'ログアウト',
    'auth.account': 'アカウント',
    'auth.loading': '読み込み中...',
    
    // Home page
    'home.title': 'リラックス英語学習',
    'home.subtitle': 'みんなのためのシンプルで楽しい英語。自己評価し、強みを発見し、自分のペースで学習しましょう。🎉',
    'home.getStarted': '始める',
    'home.tryAssessment': '自己評価を試す',
    'home.noStress': 'ストレスなし。プレッシャーなし。低データ使用量、常に進捗を保存！',
    'home.journeyTitle': 'あなたの学習の旅',
    'home.journey.selfAssessment': '自己評価',
    'home.journey.skills': 'リーディング、ライティング、リスニング、スピーキング',
    'home.journey.dashboard': 'ダッシュボード：進捗を追跡',
    'home.journey.resume': 'いつでも再開',
    'home.journey.customized': 'カスタマイズされた学習',
    'curriculum.title': 'サンプルカリキュラム',
    'curriculum.note': '（カリキュラムはあなたのニーズに合わせてカスタマイズ可能です。）',
    
    // Footer
    'footer.text': '世界中の学習者のために❤️で作られました。',
    
    // Skills
    'skills.reading': 'リーディング 📚',
    'skills.writing': 'ライティング ✏️',
    'skills.listening': 'リスニング 🎧',
    'skills.speaking': 'スピーキング 🗣️',
  },
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
