import React, { createContext, useContext, useState, useEffect } from 'react';

interface TranslationContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

const translations = {
  en: {
    header: {
      title: "Learning Platform",
    },
    nav: {
      home: "Home",
      selfAssessment: "Self Assessment",
      assessment: "Assessment",
      courses: "Courses",
      dashboard: "Dashboard",
      manageCourses: "Manage Courses",
      apiKeys: "API Keys",
      menu: "Menu"
    },
    home: {
      title: "Unlock Your Potential with Personalized Learning",
      subtitle:
        "Embark on a transformative learning experience tailored to your unique skills and career aspirations. Start with a self-assessment, discover your strengths, and chart a course towards professional growth.",
      getStarted: "Get Started",
      tryAssessment: "Try a Self-Assessment",
      noStress: "No stress, just growth. Take the first step towards a brighter future today!",
      journeyTitle: "Your Learning Journey",
      journey: {
        selfAssessment: "Start with a self-assessment",
        skills: "Identify key skills to develop",
        dashboard: "Track your progress on a personalized dashboard",
        resume: "Build a standout resume",
        customized: "Get customized learning recommendations"
      }
    },
    auth: {
      login: "Login",
      logout: "Logout",
      account: "Account",
      loading: "Loading...",
    },
    footer: {
      text: "Empowering Careers Through Knowledge",
    },
    selfAssessmentPage: {
      title: "Self-Assessment",
      description: "Evaluate your skills and interests to discover suitable career paths.",
      startAssessment: "Start Assessment",
      loading: "Loading assessment...",
      error: "Failed to load assessment.",
    },
    assessmentPage: {
      title: "Assessment",
      submit: "Submit",
      next: "Next",
      previous: "Previous",
      loading: "Loading questions...",
      error: "Failed to load questions.",
    },
    dashboardPage: {
      title: "Dashboard",
      welcome: "Welcome to your personalized dashboard!",
      progress: "Your Progress",
      completedCourses: "Completed Courses",
      recommendedCourses: "Recommended Courses",
      noCourses: "No courses completed yet.",
    },
    continueLearning: {
      title: "Continue Learning",
      subtitle: "Explore our curated courses to enhance your skills and advance your career.",
      loadingCourses: "Loading courses...",
      errorLoading: "Error loading courses:",
      noCourses: "No courses available at the moment.",
      start: "Start",
      progressNote: "Your progress is saved automatically as you complete each level.",
    },
    notFound: {
      title: "404 - Page Not Found",
      message: "Oops! The page you are looking for does not exist.",
      returnHome: "Return to Home",
    },
  },
  es: {
    header: {
      title: "Plataforma de Aprendizaje",
    },
    nav: {
      home: "Inicio",
      selfAssessment: "Autoevaluación",
      assessment: "Evaluación",
      courses: "Cursos",
      dashboard: "Panel",
      manageCourses: "Gestionar Cursos",
      apiKeys: "Claves API",
      menu: "Menú"
    },
    home: {
      title: "Desbloquea Tu Potencial con Aprendizaje Personalizado",
      subtitle:
        "Embárcate en una experiencia de aprendizaje transformadora adaptada a tus habilidades y aspiraciones profesionales. Comienza con una autoevaluación, descubre tus fortalezas y traza un curso hacia el crecimiento profesional.",
      getStarted: "Comenzar",
      tryAssessment: "Probar una Autoevaluación",
      noStress: "Sin estrés, solo crecimiento. ¡Da el primer paso hacia un futuro mejor hoy!",
      journeyTitle: "Tu Viaje de Aprendizaje",
      journey: {
        selfAssessment: "Comienza con una autoevaluación",
        skills: "Identifica habilidades clave para desarrollar",
        dashboard: "Sigue tu progreso en un panel personalizado",
        resume: "Construye un currículum destacado",
        customized: "Obtén recomendaciones de aprendizaje personalizadas"
      }
    },
    auth: {
      login: "Iniciar Sesión",
      logout: "Cerrar Sesión",
      account: "Cuenta",
      loading: "Cargando...",
    },
    footer: {
      text: "Impulsando Carreras a Través del Conocimiento",
    },
    selfAssessmentPage: {
      title: "Autoevaluación",
      description: "Evalúa tus habilidades e intereses para descubrir caminos profesionales adecuados.",
      startAssessment: "Comenzar Autoevaluación",
      loading: "Cargando autoevaluación...",
      error: "Error al cargar la autoevaluación.",
    },
    assessmentPage: {
      title: "Evaluación",
      submit: "Enviar",
      next: "Siguiente",
      previous: "Anterior",
      loading: "Cargando preguntas...",
      error: "Error al cargar las preguntas.",
    },
    dashboardPage: {
      title: "Panel",
      welcome: "¡Bienvenido a tu panel personalizado!",
      progress: "Tu Progreso",
      completedCourses: "Cursos Completados",
      recommendedCourses: "Cursos Recomendados",
      noCourses: "Aún no has completado ningún curso.",
    },
    continueLearning: {
      title: "Continuar Aprendiendo",
      subtitle: "Explora nuestros cursos seleccionados para mejorar tus habilidades y avanzar en tu carrera.",
      loadingCourses: "Cargando cursos...",
      errorLoading: "Error al cargar los cursos:",
      noCourses: "No hay cursos disponibles por el momento.",
      start: "Comenzar",
      progressNote: "Tu progreso se guarda automáticamente a medida que completas cada nivel.",
    },
    notFound: {
      title: "404 - Página No Encontrada",
      message: "¡Oops! La página que estás buscando no existe.",
      returnHome: "Volver al Inicio",
    },
  },
  fr: {
    header: {
      title: "Plateforme d'Apprentissage",
    },
    nav: {
      home: "Accueil",
      selfAssessment: "Auto-évaluation",
      assessment: "Évaluation",
      courses: "Cours",
      dashboard: "Tableau de bord",
      manageCourses: "Gérer les cours",
      apiKeys: "Clés API",
      menu: "Menu"
    },
    home: {
      title: "Libérez Votre Potentiel avec un Apprentissage Personnalisé",
      subtitle:
        "Embarquez pour une expérience d'apprentissage transformatrice adaptée à vos compétences et aspirations professionnelles. Commencez par une auto-évaluation, découvrez vos forces et tracez une voie vers la croissance professionnelle.",
      getStarted: "Commencer",
      tryAssessment: "Essayer une Auto-évaluation",
      noStress: "Pas de stress, juste de la croissance. Faites le premier pas vers un avenir meilleur dès aujourd'hui !",
      journeyTitle: "Votre Parcours d'Apprentissage",
      journey: {
        selfAssessment: "Commencez par une auto-évaluation",
        skills: "Identifiez les compétences clés à développer",
        dashboard: "Suivez vos progrès sur un tableau de bord personnalisé",
        resume: "Construisez un CV exceptionnel",
        customized: "Obtenez des recommandations d'apprentissage personnalisées"
      }
    },
    auth: {
      login: "Se Connecter",
      logout: "Se Déconnecter",
      account: "Compte",
      loading: "Chargement...",
    },
    footer: {
      text: "Donner du Pouvoir aux Carrières Grâce à la Connaissance",
    },
    selfAssessmentPage: {
      title: "Auto-évaluation",
      description: "Évaluez vos compétences et intérêts pour découvrir des parcours professionnels adaptés.",
      startAssessment: "Commencer l'Auto-évaluation",
      loading: "Chargement de l'auto-évaluation...",
      error: "Erreur lors du chargement de l'auto-évaluation.",
    },
    assessmentPage: {
      title: "Évaluation",
      submit: "Soumettre",
      next: "Suivant",
      previous: "Précédent",
      loading: "Chargement des questions...",
      error: "Erreur lors du chargement des questions.",
    },
    dashboardPage: {
      title: "Tableau de Bord",
      welcome: "Bienvenue sur votre tableau de bord personnalisé !",
      progress: "Vos Progrès",
      completedCourses: "Cours Terminés",
      recommendedCourses: "Cours Recommandés",
      noCourses: "Aucun cours terminé pour le moment.",
    },
    continueLearning: {
      title: "Continuer l'Apprentissage",
      subtitle: "Explorez nos cours sélectionnés pour améliorer vos compétences et faire avancer votre carrière.",
      loadingCourses: "Chargement des cours...",
      errorLoading: "Erreur lors du chargement des cours :",
      noCourses: "Aucun cours disponible pour le moment.",
      start: "Commencer",
      progressNote: "Vos progrès sont enregistrés automatiquement à mesure que vous terminez chaque niveau.",
    },
    notFound: {
      title: "404 - Page Non Trouvée",
      message: "Oops ! La page que vous recherchez n'existe pas.",
      returnHome: "Retour à l'Accueil",
    },
  },
  de: {
    header: {
      title: "Lernplattform",
    },
    nav: {
      home: "Startseite",
      selfAssessment: "Selbstbewertung",
      assessment: "Bewertung",
      courses: "Kurse",
      dashboard: "Dashboard",
      manageCourses: "Kurse verwalten",
      apiKeys: "API-Schlüssel",
      menu: "Menü"
    },
    home: {
      title: "Entfalten Sie Ihr Potenzial mit personalisiertem Lernen",
      subtitle:
        "Begeben Sie sich auf eine transformative Lernerfahrung, die auf Ihre individuellen Fähigkeiten und Karriereziele zugeschnitten ist. Beginnen Sie mit einer Selbstbewertung, entdecken Sie Ihre Stärken und steuern Sie einen Kurs in Richtung berufliches Wachstum.",
      getStarted: "Loslegen",
      tryAssessment: "Eine Selbstbewertung ausprobieren",
      noStress: "Kein Stress, nur Wachstum. Machen Sie noch heute den ersten Schritt in eine bessere Zukunft!",
      journeyTitle: "Ihre Lernreise",
      journey: {
        selfAssessment: "Beginnen Sie mit einer Selbstbewertung",
        skills: "Identifizieren Sie wichtige Fähigkeiten, die Sie entwickeln sollten",
        dashboard: "Verfolgen Sie Ihre Fortschritte auf einem personalisierten Dashboard",
        resume: "Erstellen Sie einen herausragenden Lebenslauf",
        customized: "Erhalten Sie individuelle Lernempfehlungen"
      }
    },
    auth: {
      login: "Anmelden",
      logout: "Abmelden",
      account: "Konto",
      loading: "Laden...",
    },
    footer: {
      text: "Karrieren durch Wissen fördern",
    },
    selfAssessmentPage: {
      title: "Selbstbewertung",
      description: "Bewerten Sie Ihre Fähigkeiten und Interessen, um geeignete Karrierewege zu entdecken.",
      startAssessment: "Selbstbewertung starten",
      loading: "Selbstbewertung wird geladen...",
      error: "Fehler beim Laden der Selbstbewertung.",
    },
    assessmentPage: {
      title: "Bewertung",
      submit: "Absenden",
      next: "Weiter",
      previous: "Zurück",
      loading: "Fragen werden geladen...",
      error: "Fehler beim Laden der Fragen.",
    },
    dashboardPage: {
      title: "Dashboard",
      welcome: "Willkommen auf Ihrem persönlichen Dashboard!",
      progress: "Ihr Fortschritt",
      completedCourses: "Abgeschlossene Kurse",
      recommendedCourses: "Empfohlene Kurse",
      noCourses: "Noch keine Kurse abgeschlossen.",
    },
    continueLearning: {
      title: "Weiterlernen",
      subtitle: "Entdecken Sie unsere kuratierten Kurse, um Ihre Fähigkeiten zu verbessern und Ihre Karriere voranzutreiben.",
      loadingCourses: "Kurse werden geladen...",
      errorLoading: "Fehler beim Laden der Kurse:",
      noCourses: "Im Moment sind keine Kurse verfügbar.",
      start: "Starten",
      progressNote: "Ihr Fortschritt wird automatisch gespeichert, wenn Sie jedes Level abschließen.",
    },
    notFound: {
      title: "404 - Seite Nicht Gefunden",
      message: "Ups! Die von Ihnen gesuchte Seite existiert nicht.",
      returnHome: "Zurück zur Startseite",
    },
  },
  it: {
    header: {
      title: "Piattaforma di Apprendimento",
    },
    nav: {
      home: "Home",
      selfAssessment: "Autovalutazione",
      assessment: "Valutazione",
      courses: "Corsi",
      dashboard: "Dashboard",
      manageCourses: "Gestisci corsi",
      apiKeys: "Chiavi API",
      menu: "Menu"
    },
    home: {
      title: "Sblocca il Tuo Potenziale con l'Apprendimento Personalizzato",
      subtitle:
        "Intraprendi un'esperienza di apprendimento trasformative su misura per le tue competenze e aspirazioni di carriera. Inizia con un'autovalutazione, scopri i tuoi punti di forza e traccia un percorso verso la crescita professionale.",
      getStarted: "Inizia",
      tryAssessment: "Prova un'Autovalutazione",
      noStress: "Nessuno stress, solo crescita. Fai il primo passo verso un futuro migliore oggi stesso!",
      journeyTitle: "Il Tuo Percorso di Apprendimento",
      journey: {
        selfAssessment: "Inizia con un'autovalutazione",
        skills: "Identifica le competenze chiave da sviluppare",
        dashboard: "Tieni traccia dei tuoi progressi su una dashboard personalizzata",
        resume: "Costruisci un curriculum eccezionale",
        customized: "Ottieni consigli di apprendimento personalizzati"
      }
    },
    auth: {
      login: "Accedi",
      logout: "Esci",
      account: "Account",
      loading: "Caricamento...",
    },
    footer: {
      text: "Potenziare le Carriere Attraverso la Conoscenza",
    },
    selfAssessmentPage: {
      title: "Autovalutazione",
      description: "Valuta le tue competenze e interessi per scoprire percorsi di carriera adatti.",
      startAssessment: "Inizia Autovalutazione",
      loading: "Caricamento autovalutazione...",
      error: "Errore durante il caricamento dell'autovalutazione.",
    },
    assessmentPage: {
      title: "Valutazione",
      submit: "Invia",
      next: "Avanti",
      previous: "Indietro",
      loading: "Caricamento domande...",
      error: "Errore durante il caricamento delle domande.",
    },
    dashboardPage: {
      title: "Dashboard",
      welcome: "Benvenuto nella tua dashboard personalizzata!",
      progress: "I Tuoi Progressi",
      completedCourses: "Corsi Completati",
      recommendedCourses: "Corsi Raccomandati",
      noCourses: "Nessun corso completato finora.",
    },
    continueLearning: {
      title: "Continua l'Apprendimento",
      subtitle: "Esplora i nostri corsi curati per migliorare le tue competenze e far avanzare la tua carriera.",
      loadingCourses: "Caricamento corsi...",
      errorLoading: "Errore durante il caricamento dei corsi:",
      noCourses: "Nessun corso disponibile al momento.",
      start: "Inizia",
      progressNote: "I tuoi progressi vengono salvati automaticamente man mano che completi ogni livello.",
    },
    notFound: {
      title: "404 - Pagina Non Trovata",
      message: "Oops! La pagina che stai cercando non esiste.",
      returnHome: "Torna alla Home",
    },
  },
  pt: {
    header: {
      title: "Plataforma de Aprendizagem",
    },
    nav: {
      home: "Início",
      selfAssessment: "Autoavaliação",
      assessment: "Avaliação",
      courses: "Cursos",
      dashboard: "Painel",
      manageCourses: "Gerenciar cursos",
      apiKeys: "Chaves API",
      menu: "Menu"
    },
    home: {
      title: "Desbloqueie Seu Potencial com Aprendizagem Personalizada",
      subtitle:
        "Embarque em uma experiência de aprendizado transformadora, adaptada às suas habilidades e aspirações de carreira. Comece com uma autoavaliação, descubra seus pontos fortes e trace um curso em direção ao crescimento profissional.",
      getStarted: "Começar",
      tryAssessment: "Experimentar uma Autoavaliação",
      noStress: "Sem estresse, apenas crescimento. Dê o primeiro passo em direção a um futuro melhor hoje!",
      journeyTitle: "Sua Jornada de Aprendizagem",
      journey: {
        selfAssessment: "Comece com uma autoavaliação",
        skills: "Identifique as principais habilidades a serem desenvolvidas",
        dashboard: "Acompanhe seu progresso em um painel personalizado",
        resume: "Construa um currículo de destaque",
        customized: "Obtenha recomendações de aprendizado personalizadas"
      }
    },
    auth: {
      login: "Entrar",
      logout: "Sair",
      account: "Conta",
      loading: "Carregando...",
    },
    footer: {
      text: "Capacitando Carreiras Através do Conhecimento",
    },
    selfAssessmentPage: {
      title: "Autoavaliação",
      description: "Avalie suas habilidades e interesses para descobrir caminhos de carreira adequados.",
      startAssessment: "Iniciar Autoavaliação",
      loading: "Carregando autoavaliação...",
      error: "Erro ao carregar a autoavaliação.",
    },
    assessmentPage: {
      title: "Avaliação",
      submit: "Enviar",
      next: "Próximo",
      previous: "Anterior",
      loading: "Carregando perguntas...",
      error: "Erro ao carregar as perguntas.",
    },
    dashboardPage: {
      title: "Painel",
      welcome: "Bem-vindo ao seu painel personalizado!",
      progress: "Seu Progresso",
      completedCourses: "Cursos Concluídos",
      recommendedCourses: "Cursos Recomendados",
      noCourses: "Nenhum curso concluído ainda.",
    },
    continueLearning: {
      title: "Continuar Aprendendo",
      subtitle: "Explore nossos cursos selecionados para aprimorar suas habilidades e avançar em sua carreira.",
      loadingCourses: "Carregando cursos...",
      errorLoading: "Erro ao carregar os cursos:",
      noCourses: "Nenhum curso disponível no momento.",
      start: "Começar",
      progressNote: "Seu progresso é salvo automaticamente à medida que você conclui cada nível.",
    },
    notFound: {
      title: "404 - Página Não Encontrada",
      message: "Oops! A página que você está procurando não existe.",
      returnHome: "Voltar para a Página Inicial",
    },
  },
  zh: {
    header: {
      title: "学习平台",
    },
    nav: {
      home: "首页",
      selfAssessment: "自我评估",
      assessment: "评估",
      courses: "课程",
      dashboard: "仪表板",
      manageCourses: "管理课程",
      apiKeys: "API密钥",
      menu: "菜单"
    },
    home: {
      title: "通过个性化学习释放您的潜力",
      subtitle:
        "开始一次变革性的学习体验，该体验根据您的独特技能和职业抱负量身定制。 从自我评估开始，发现自己的优势，并规划通往职业发展的道路。",
      getStarted: "开始",
      tryAssessment: "尝试自我评估",
      noStress: "没有压力，只有成长。 今天就迈出迈向更美好未来的第一步！",
      journeyTitle: "您的学习之旅",
      journey: {
        selfAssessment: "从自我评估开始",
        skills: "确定要发展的关键技能",
        dashboard: "在个性化仪表板上跟踪您的进度",
        resume: "建立出色的简历",
        customized: "获得定制的学习建议"
      }
    },
    auth: {
      login: "登录",
      logout: "登出",
      account: "帐户",
      loading: "加载中...",
    },
    footer: {
      text: "通过知识赋能职业",
    },
    selfAssessmentPage: {
      title: "自我评估",
      description: "评估您的技能和兴趣，以发现合适的职业道路。",
      startAssessment: "开始自我评估",
      loading: "正在加载自我评估...",
      error: "无法加载自我评估。",
    },
    assessmentPage: {
      title: "评估",
      submit: "提交",
      next: "下一个",
      previous: "上一个",
      loading: "正在加载问题...",
      error: "无法加载问题。",
    },
    dashboardPage: {
      title: "仪表板",
      welcome: "欢迎来到您的个性化仪表板！",
      progress: "你的进步",
      completedCourses: "已完成的课程",
      recommendedCourses: "推荐课程",
      noCourses: "尚未完成任何课程。",
    },
    continueLearning: {
      title: "继续学习",
      subtitle: "探索我们精选的课程，以提高您的技能并提升您的职业生涯。",
      loadingCourses: "正在加载课程...",
      errorLoading: "加载课程时出错：",
      noCourses: "目前没有可用的课程。",
      start: "开始",
      progressNote: "当您完成每个级别时，您的进度会自动保存。",
    },
    notFound: {
      title: "404 - 页面未找到",
      message: "糟糕！ 您要查找的页面不存在。",
      returnHome: "返回首页",
    },
  },
  ja: {
    header: {
      title: "学習プラットフォーム",
    },
    nav: {
      home: "ホーム",
      selfAssessment: "自己評価",
      assessment: "評価",
      courses: "コース",
      dashboard: "ダッシュボード",
      manageCourses: "コース管理",
      apiKeys: "APIキー",
      menu: "メニュー"
    },
    home: {
      title: "パーソナライズされた学習であなたの可能性を解き放ちましょう",
      subtitle:
        "あなたのユニークなスキルとキャリアの願望に合わせて調整された、変革的な学習体験に乗り出しましょう。 自己評価から始めて、自分の強みを発見し、専門能力開発への道筋を描きましょう。",
      getStarted: "始めましょう",
      tryAssessment: "自己評価を試す",
      noStress: "ストレスはなく、成長のみです。 今日、より明るい未来への第一歩を踏み出しましょう！",
      journeyTitle: "あなたの学習の旅",
      journey: {
        selfAssessment: "自己評価から始める",
        skills: "開発すべき重要なスキルを特定する",
        dashboard: "パーソナライズされたダッシュボードで進捗状況を追跡する",
        resume: "傑出した履歴書を作成する",
        customized: "カスタマイズされた学習の推奨事項を入手する"
      }
    },
    auth: {
      login: "ログイン",
      logout: "ログアウト",
      account: "アカウント",
      loading: "読み込み中...",
    },
    footer: {
      text: "知識を通じてキャリアを支援する",
    },
    selfAssessmentPage: {
      title: "自己評価",
      description: "あなたのスキルと興味を評価して、適切なキャリアパスを見つけてください。",
      startAssessment: "自己評価を開始する",
      loading: "自己評価をロードしています...",
      error: "自己評価のロードに失敗しました。",
    },
    assessmentPage: {
      title: "評価",
      submit: "送信",
      next: "次へ",
      previous: "前へ",
      loading: "質問をロードしています...",
      error: "質問のロードに失敗しました。",
    },
    dashboardPage: {
      title: "ダッシュボード",
      welcome: "パーソナライズされたダッシュボードへようこそ！",
      progress: "あなたの進捗状況",
      completedCourses: "完了したコース",
      recommendedCourses: "おすすめコース",
      noCourses: "まだ完了したコースはありません。",
    },
    continueLearning: {
      title: "学習を続ける",
      subtitle: "厳選されたコースを探索して、スキルを向上させ、キャリアを向上させましょう。",
      loadingCourses: "コースをロードしています...",
      errorLoading: "コースのロード中にエラーが発生しました：",
      noCourses: "現在利用できるコースはありません。",
      start: "開始",
      progressNote: "各レベルを完了すると、進捗状況が自動的に保存されます。",
    },
    notFound: {
      title: "404 - ページが見つかりません",
      message: "おっと！ お探しのページは存在しません。",
      returnHome: "ホームページに戻る",
    },
  },
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>((localStorage.getItem('language') || 'en'));

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        console.warn(`Translation key "${key}" not found in language "${language}"`);
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextProps => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
