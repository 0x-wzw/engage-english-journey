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

    // Login page
    'login.title': 'Login to Your Account',
    'login.createAccount': 'Create an Account',
    'login.firstName': 'First Name',
    'login.lastName': 'Last Name',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.loginButton': 'Login',
    'login.signUpButton': 'Sign Up',
    'login.noAccount': "Don't have an account?",
    'login.signUpLink': 'Sign up',
    'login.hasAccount': 'Already have an account?',
    'login.loginLink': 'Login',
    'login.note': 'You\'ll need to connect Supabase for authentication features.',
    'login.docs': 'See Lovable docs for instructions.',

    // Self Assessment page
    'selfAssessment.title': 'Self Assessment',
    'selfAssessment.subtitle': 'How do you rate yourself in each skill? (1 = Just starting, 5 = Very confident)',
    'selfAssessment.saveButton': 'Save & Continue',
    'selfAssessment.thankYou': 'Thank you for your honest assessment!',
    'selfAssessment.startTest': 'Start the English Skills Test →',

    // Assessment page
    'assessment.title': 'Skill Assessment',
    'assessment.selectLevel': 'Select Level:',
    'assessment.reading': 'Reading',
    'assessment.writing': 'Writing',
    'assessment.listening': 'Listening',
    'assessment.speaking': 'Speaking',
    'assessment.back': '← Back',
    'assessment.next': 'Next',
    'assessment.finish': 'Finish',
    'assessment.complete': 'Assessment Complete!',
    'assessment.completeMsg': 'Great job taking the first step! Your progress will appear in your dashboard.',
    'assessment.viewDashboard': 'View Dashboard',

    // Dashboard page
    'dashboard.title': 'Your Dashboard',
    'dashboard.subtitle': 'Welcome! Here you\'ll see your progress and learning journey.',
    'dashboard.supabaseNote': '(Connect Supabase to track and save your results!)',
    'dashboard.progress': 'Progress:',
    'dashboard.selfAssessment': 'Self assessment:',
    'dashboard.testScore': 'Test Score:',
    'dashboard.assessmentButton': 'Assessment',
    'dashboard.redoSelfAssessment': 'Redo Self-Assessment',
    'dashboard.viewAllCourses': 'View All Courses',
    'dashboard.tip': 'Tip: Your dashboard updates whenever you finish a self-assessment or skill test.',

    // Continue Learning page
    'continueLearning.title': 'Continue Learning',
    'continueLearning.subtitle': 'Choose a level to start or continue your English learning journey!',
    'continueLearning.loadingCourses': 'Loading courses...',
    'continueLearning.noCourses': 'No courses available yet.',
    'continueLearning.start': 'Start',
    'continueLearning.progressNote': '(Your progress will be saved when you finish assessments for each level!)',
    'continueLearning.errorLoading': 'Failed to load courses:',

    // Admin pages
    'admin.accessDenied': 'Access Denied',
    'admin.mustBeAdmin': 'You must be an admin to manage courses.',
    'admin.mustBeAdminApiKeys': 'You must be an admin or super admin to manage API keys.',
    'admin.coursesTitle': 'Courses Management',
    'admin.level': 'Level',
    'admin.summary': 'Summary',
    'admin.actions': 'Actions',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.add': 'Add Course',
    'admin.update': 'Update',
    'admin.cancel': 'Cancel',
    'admin.noCourses': 'No courses yet.',
    'admin.apiKeysTitle': 'API Key Management',
    'admin.apiKeysSubtitle': 'Manage API keys for integrations.',
    'admin.apiKeysNote': 'For real-world usage, secure storage (e.g., Edge Functions secrets) should be implemented.',
    'admin.addApiKey': 'Add API Key',
    'admin.apiKeyLabel': 'API Key Label',
    'admin.apiKeyValue': 'API Key Value',
    'admin.addKeyDemo': 'Add Key (Demo Only)',
    'admin.apiKeysComing': 'API key management coming soon: secure store, update, and delete keys in the backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'Oops! Page not found',
    'notFound.returnHome': 'Return to Home',
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

    // Login page
    'login.title': 'Iniciar Sesión en tu Cuenta',
    'login.createAccount': 'Crear una Cuenta',
    'login.firstName': 'Nombre',
    'login.lastName': 'Apellido',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.loginButton': 'Iniciar Sesión',
    'login.signUpButton': 'Registrarse',
    'login.noAccount': '¿No tienes una cuenta?',
    'login.signUpLink': 'Regístrate',
    'login.hasAccount': '¿Ya tienes una cuenta?',
    'login.loginLink': 'Iniciar Sesión',
    'login.note': 'Necesitarás conectar Supabase para las funciones de autenticación.',
    'login.docs': 'Consulta la documentación de Lovable para instrucciones.',

    // Self Assessment page
    'selfAssessment.title': 'Autoevaluación',
    'selfAssessment.subtitle': '¿Cómo te calificas en cada habilidad? (1 = Apenas comenzando, 5 = Muy confiado)',
    'selfAssessment.saveButton': 'Guardar y Continuar',
    'selfAssessment.thankYou': '¡Gracias por tu evaluación honesta!',
    'selfAssessment.startTest': 'Comenzar la Prueba de Habilidades de Inglés →',

    // Assessment page
    'assessment.title': 'Evaluación de Habilidades',
    'assessment.selectLevel': 'Seleccionar Nivel:',
    'assessment.reading': 'Lectura',
    'assessment.writing': 'Escritura',
    'assessment.listening': 'Escucha',
    'assessment.speaking': 'Habla',
    'assessment.back': '← Atrás',
    'assessment.next': 'Siguiente',
    'assessment.finish': 'Finalizar',
    'assessment.complete': '¡Evaluación Completada!',
    'assessment.completeMsg': '¡Excelente trabajo dando el primer paso! Tu progreso aparecerá en tu panel.',
    'assessment.viewDashboard': 'Ver Panel',

    // Dashboard page
    'dashboard.title': 'Tu Panel',
    'dashboard.subtitle': '¡Bienvenido! Aquí verás tu progreso y viaje de aprendizaje.',
    'dashboard.supabaseNote': '(¡Conecta Supabase para rastrear y guardar tus resultados!)',
    'dashboard.progress': 'Progreso:',
    'dashboard.selfAssessment': 'Autoevaluación:',
    'dashboard.testScore': 'Puntuación de Prueba:',
    'dashboard.assessmentButton': 'Evaluación',
    'dashboard.redoSelfAssessment': 'Rehacer Autoevaluación',
    'dashboard.viewAllCourses': 'Ver Todos los Cursos',
    'dashboard.tip': 'Consejo: Tu panel se actualiza cada vez que terminas una autoevaluación o prueba de habilidades.',

    // Continue Learning page
    'continueLearning.title': 'Continuar Aprendiendo',
    'continueLearning.subtitle': '¡Elige un nivel para comenzar o continuar tu viaje de aprendizaje de inglés!',
    'continueLearning.loadingCourses': 'Cargando cursos...',
    'continueLearning.noCourses': 'No hay cursos disponibles todavía.',
    'continueLearning.start': 'Comenzar',
    'continueLearning.progressNote': '(¡Tu progreso se guardará cuando termines las evaluaciones para cada nivel!)',
    'continueLearning.errorLoading': 'Error al cargar cursos:',

    // Admin pages
    'admin.accessDenied': 'Acceso Denegado',
    'admin.mustBeAdmin': 'Debes ser administrador para gestionar cursos.',
    'admin.mustBeAdminApiKeys': 'Debes ser administrador o superadministrador para gestionar claves API.',
    'admin.coursesTitle': 'Gestión de Cursos',
    'admin.level': 'Nivel',
    'admin.summary': 'Resumen',
    'admin.actions': 'Acciones',
    'admin.edit': 'Editar',
    'admin.delete': 'Eliminar',
    'admin.add': 'Agregar Curso',
    'admin.update': 'Actualizar',
    'admin.cancel': 'Cancelar',
    'admin.noCourses': 'No hay cursos todavía.',
    'admin.apiKeysTitle': 'Gestión de Claves API',
    'admin.apiKeysSubtitle': 'Gestionar claves API para integraciones.',
    'admin.apiKeysNote': 'Para uso en el mundo real, se debe implementar almacenamiento seguro (ej. secretos de Edge Functions).',
    'admin.addApiKey': 'Agregar Clave API',
    'admin.apiKeyLabel': 'Etiqueta de Clave API',
    'admin.apiKeyValue': 'Valor de Clave API',
    'admin.addKeyDemo': 'Agregar Clave (Solo Demo)',
    'admin.apiKeysComing': 'Gestión de claves API próximamente: almacenar, actualizar y eliminar claves de forma segura en el backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': '¡Ups! Página no encontrada',
    'notFound.returnHome': 'Volver al Inicio',
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

    // Login page
    'login.title': 'Se connecter à votre compte',
    'login.createAccount': 'Créer un compte',
    'login.firstName': 'Prénom',
    'login.lastName': 'Nom',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.loginButton': 'Se connecter',
    'login.signUpButton': 'S\'inscrire',
    'login.noAccount': 'Vous n\'avez pas de compte ?',
    'login.signUpLink': 'S\'inscrire',
    'login.hasAccount': 'Vous avez déjà un compte ?',
    'login.loginLink': 'Se connecter',
    'login.note': 'Vous devrez connecter Supabase pour les fonctionnalités d\'authentification.',
    'login.docs': 'Consultez la documentation Lovable pour les instructions.',

    // Self Assessment page
    'selfAssessment.title': 'Auto-évaluation',
    'selfAssessment.subtitle': 'Comment vous évaluez-vous dans chaque compétence ? (1 = Débutant, 5 = Très confiant)',
    'selfAssessment.saveButton': 'Sauvegarder et Continuer',
    'selfAssessment.thankYou': 'Merci pour votre évaluation honnête !',
    'selfAssessment.startTest': 'Commencer le Test de Compétences Anglaises →',

    // Assessment page
    'assessment.title': 'Évaluation des Compétences',
    'assessment.selectLevel': 'Sélectionner le Niveau :',
    'assessment.reading': 'Lecture',
    'assessment.writing': 'Écriture',
    'assessment.listening': 'Écoute',
    'assessment.speaking': 'Expression orale',
    'assessment.back': '← Retour',
    'assessment.next': 'Suivant',
    'assessment.finish': 'Terminer',
    'assessment.complete': 'Évaluation Terminée !',
    'assessment.completeMsg': 'Excellent travail pour avoir fait le premier pas ! Vos progrès apparaîtront dans votre tableau de bord.',
    'assessment.viewDashboard': 'Voir le Tableau de bord',

    // Dashboard page
    'dashboard.title': 'Votre Tableau de bord',
    'dashboard.subtitle': 'Bienvenue ! Ici vous verrez vos progrès et votre parcours d\'apprentissage.',
    'dashboard.supabaseNote': '(Connectez Supabase pour suivre et sauvegarder vos résultats !)',
    'dashboard.progress': 'Progrès :',
    'dashboard.selfAssessment': 'Auto-évaluation :',
    'dashboard.testScore': 'Score du Test :',
    'dashboard.assessmentButton': 'Évaluation',
    'dashboard.redoSelfAssessment': 'Refaire l\'Auto-évaluation',
    'dashboard.viewAllCourses': 'Voir Tous les Cours',
    'dashboard.tip': 'Conseil : Votre tableau de bord se met à jour chaque fois que vous terminez une auto-évaluation ou un test de compétences.',

    // Continue Learning page
    'continueLearning.title': 'Continuer l\'Apprentissage',
    'continueLearning.subtitle': 'Choisissez un niveau pour commencer ou continuer votre parcours d\'apprentissage de l\'anglais !',
    'continueLearning.loadingCourses': 'Chargement des cours...',
    'continueLearning.noCourses': 'Aucun cours disponible pour l\'instant.',
    'continueLearning.start': 'Commencer',
    'continueLearning.progressNote': '(Vos progrès seront sauvegardés lorsque vous terminerez les évaluations pour chaque niveau !)',
    'continueLearning.errorLoading': 'Échec du chargement des cours :',

    // Admin pages
    'admin.accessDenied': 'Accès Refusé',
    'admin.mustBeAdmin': 'Vous devez être administrateur pour gérer les cours.',
    'admin.mustBeAdminApiKeys': 'Vous devez être administrateur ou super administrateur pour gérer les clés API.',
    'admin.coursesTitle': 'Gestion des Cours',
    'admin.level': 'Niveau',
    'admin.summary': 'Résumé',
    'admin.actions': 'Actions',
    'admin.edit': 'Modifier',
    'admin.delete': 'Supprimer',
    'admin.add': 'Ajouter un Cours',
    'admin.update': 'Mettre à jour',
    'admin.cancel': 'Annuler',
    'admin.noCourses': 'Aucun cours pour l\'instant.',
    'admin.apiKeysTitle': 'Gestion des Clés API',
    'admin.apiKeysSubtitle': 'Gérer les clés API pour les intégrations.',
    'admin.apiKeysNote': 'Pour un usage réel, un stockage sécurisé (ex. secrets Edge Functions) devrait être implémenté.',
    'admin.addApiKey': 'Ajouter une Clé API',
    'admin.apiKeyLabel': 'Libellé de la Clé API',
    'admin.apiKeyValue': 'Valeur de la Clé API',
    'admin.addKeyDemo': 'Ajouter une Clé (Démo Seulement)',
    'admin.apiKeysComing': 'Gestion des clés API à venir : stocker, mettre à jour et supprimer les clés de manière sécurisée dans le backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'Oups ! Page non trouvée',
    'notFound.returnHome': 'Retour à l\'Accueil',
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

    // Login page
    'login.title': 'Bei Ihrem Konto anmelden',
    'login.createAccount': 'Konto erstellen',
    'login.firstName': 'Vorname',
    'login.lastName': 'Nachname',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'login.loginButton': 'Anmelden',
    'login.signUpButton': 'Registrieren',
    'login.noAccount': 'Sie haben noch kein Konto?',
    'login.signUpLink': 'Registrieren',
    'login.hasAccount': 'Sie haben bereits ein Konto?',
    'login.loginLink': 'Anmelden',
    'login.note': 'Sie müssen Supabase für Authentifizierungsfunktionen verbinden.',
    'login.docs': 'Siehe Lovable-Dokumentation für Anweisungen.',

    // Self Assessment page
    'selfAssessment.title': 'Selbsteinschätzung',
    'selfAssessment.subtitle': 'Wie bewerten Sie sich in jeder Fähigkeit? (1 = Gerade anfangend, 5 = Sehr zuversichtlich)',
    'selfAssessment.saveButton': 'Speichern & Fortfahren',
    'selfAssessment.thankYou': 'Vielen Dank für Ihre ehrliche Einschätzung!',
    'selfAssessment.startTest': 'Englisch-Fähigkeitstest starten →',

    // Assessment page
    'assessment.title': 'Fähigkeitsbewertung',
    'assessment.selectLevel': 'Niveau auswählen:',
    'assessment.reading': 'Lesen',
    'assessment.writing': 'Schreiben',
    'assessment.listening': 'Hören',
    'assessment.speaking': 'Sprechen',
    'assessment.back': '← Zurück',
    'assessment.next': 'Weiter',
    'assessment.finish': 'Beenden',
    'assessment.complete': 'Bewertung Abgeschlossen!',
    'assessment.completeMsg': 'Großartige Arbeit beim ersten Schritt! Ihr Fortschritt wird in Ihrem Dashboard angezeigt.',
    'assessment.viewDashboard': 'Dashboard anzeigen',

    // Dashboard page
    'dashboard.title': 'Ihr Dashboard',
    'dashboard.subtitle': 'Willkommen! Hier sehen Sie Ihren Fortschritt und Ihre Lernreise.',
    'dashboard.supabaseNote': '(Verbinden Sie Supabase, um Ihre Ergebnisse zu verfolgen und zu speichern!)',
    'dashboard.progress': 'Fortschritt:',
    'dashboard.selfAssessment': 'Selbsteinschätzung:',
    'dashboard.testScore': 'Testergebnis:',
    'dashboard.assessmentButton': 'Bewertung',
    'dashboard.redoSelfAssessment': 'Selbsteinschätzung wiederholen',
    'dashboard.viewAllCourses': 'Alle Kurse anzeigen',
    'dashboard.tip': 'Tipp: Ihr Dashboard wird aktualisiert, wenn Sie eine Selbsteinschätzung oder einen Fähigkeitstest abschließen.',

    // Continue Learning page
    'continueLearning.title': 'Weiterlernen',
    'continueLearning.subtitle': 'Wählen Sie ein Niveau, um Ihre Englisch-Lernreise zu beginnen oder fortzusetzen!',
    'continueLearning.loadingCourses': 'Kurse werden geladen...',
    'continueLearning.noCourses': 'Noch keine Kurse verfügbar.',
    'continueLearning.start': 'Starten',
    'continueLearning.progressNote': '(Ihr Fortschritt wird gespeichert, wenn Sie Bewertungen für jedes Niveau abschließen!)',
    'continueLearning.errorLoading': 'Fehler beim Laden der Kurse:',

    // Admin pages
    'admin.accessDenied': 'Zugriff Verweigert',
    'admin.mustBeAdmin': 'Sie müssen Administrator sein, um Kurse zu verwalten.',
    'admin.mustBeAdminApiKeys': 'Sie müssen Administrator oder Super-Administrator sein, um API-Schlüssel zu verwalten.',
    'admin.coursesTitle': 'Kursverwaltung',
    'admin.level': 'Niveau',
    'admin.summary': 'Zusammenfassung',
    'admin.actions': 'Aktionen',
    'admin.edit': 'Bearbeiten',
    'admin.delete': 'Löschen',
    'admin.add': 'Kurs hinzufügen',
    'admin.update': 'Aktualisieren',
    'admin.cancel': 'Abbrechen',
    'admin.noCourses': 'Noch keine Kurse.',
    'admin.apiKeysTitle': 'API-Schlüssel-Verwaltung',
    'admin.apiKeysSubtitle': 'API-Schlüssel für Integrationen verwalten.',
    'admin.apiKeysNote': 'Für den realen Einsatz sollte sichere Speicherung (z.B. Edge Functions Secrets) implementiert werden.',
    'admin.addApiKey': 'API-Schlüssel hinzufügen',
    'admin.apiKeyLabel': 'API-Schlüssel-Label',
    'admin.apiKeyValue': 'API-Schlüssel-Wert',
    'admin.addKeyDemo': 'Schlüssel hinzufügen (Nur Demo)',
    'admin.apiKeysComing': 'API-Schlüssel-Verwaltung kommt bald: sichere Speicherung, Aktualisierung und Löschung von Schlüsseln im Backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'Ups! Seite nicht gefunden',
    'notFound.returnHome': 'Zur Startseite zurückkehren',
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

    // Login page
    'login.title': 'Accedi al Tuo Account',
    'login.createAccount': 'Crea un Account',
    'login.firstName': 'Nome',
    'login.lastName': 'Cognome',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.loginButton': 'Accedi',
    'login.signUpButton': 'Registrati',
    'login.noAccount': 'Non hai un account?',
    'login.signUpLink': 'Registrati',
    'login.hasAccount': 'Hai già un account?',
    'login.loginLink': 'Accedi',
    'login.note': 'Dovrai connettere Supabase per le funzionalità di autenticazione.',
    'login.docs': 'Vedi la documentazione di Lovable per le istruzioni.',

    // Self Assessment page
    'selfAssessment.title': 'Autovalutazione',
    'selfAssessment.subtitle': 'Come ti valuti in ogni abilità? (1 = Appena iniziato, 5 = Molto fiducioso)',
    'selfAssessment.saveButton': 'Salva e Continua',
    'selfAssessment.thankYou': 'Grazie per la tua valutazione onesta!',
    'selfAssessment.startTest': 'Inizia il Test di Abilità Inglese →',

    // Assessment page
    'assessment.title': 'Valutazione delle Abilità',
    'assessment.selectLevel': 'Seleziona Livello:',
    'assessment.reading': 'Lettura',
    'assessment.writing': 'Scrittura',
    'assessment.listening': 'Ascolto',
    'assessment.speaking': 'Parlato',
    'assessment.back': '← Indietro',
    'assessment.next': 'Avanti',
    'assessment.finish': 'Termina',
    'assessment.complete': 'Valutazione Completata!',
    'assessment.completeMsg': 'Ottimo lavoro nel fare il primo passo! I tuoi progressi appariranno nella tua dashboard.',
    'assessment.viewDashboard': 'Visualizza Dashboard',

    // Dashboard page
    'dashboard.title': 'La Tua Dashboard',
    'dashboard.subtitle': 'Benvenuto! Qui vedrai i tuoi progressi e il tuo viaggio di apprendimento.',
    'dashboard.supabaseNote': '(Connetti Supabase per tracciare e salvare i tuoi risultati!)',
    'dashboard.progress': 'Progresso:',
    'dashboard.selfAssessment': 'Autovalutazione:',
    'dashboard.testScore': 'Punteggio Test:',
    'dashboard.assessmentButton': 'Valutazione',
    'dashboard.redoSelfAssessment': 'Rifai Autovalutazione',
    'dashboard.viewAllCourses': 'Visualizza Tutti i Corsi',
    'dashboard.tip': 'Suggerimento: La tua dashboard si aggiorna ogni volta che completi un\'autovalutazione o un test di abilità.',

    // Continue Learning page
    'continueLearning.title': 'Continua l\'Apprendimento',
    'continueLearning.subtitle': 'Scegli un livello per iniziare o continuare il tuo viaggio di apprendimento inglese!',
    'continueLearning.loadingCourses': 'Caricamento corsi...',
    'continueLearning.noCourses': 'Nessun corso disponibile ancora.',
    'continueLearning.start': 'Inizia',
    'continueLearning.progressNote': '(I tuoi progressi saranno salvati quando completi le valutazioni per ogni livello!)',
    'continueLearning.errorLoading': 'Errore nel caricamento dei corsi:',

    // Admin pages
    'admin.accessDenied': 'Accesso Negato',
    'admin.mustBeAdmin': 'Devi essere un amministratore per gestire i corsi.',
    'admin.mustBeAdminApiKeys': 'Devi essere un amministratore o super amministratore per gestire le chiavi API.',
    'admin.coursesTitle': 'Gestione Corsi',
    'admin.level': 'Livello',
    'admin.summary': 'Riassunto',
    'admin.actions': 'Azioni',
    'admin.edit': 'Modifica',
    'admin.delete': 'Elimina',
    'admin.add': 'Aggiungi Corso',
    'admin.update': 'Aggiorna',
    'admin.cancel': 'Annulla',
    'admin.noCourses': 'Nessun corso ancora.',
    'admin.apiKeysTitle': 'Gestione Chiavi API',
    'admin.apiKeysSubtitle': 'Gestisci le chiavi API per le integrazioni.',
    'admin.apiKeysNote': 'Per uso reale, dovrebbe essere implementato uno storage sicuro (es. Edge Functions secrets).',
    'admin.addApiKey': 'Aggiungi Chiave API',
    'admin.apiKeyLabel': 'Etichetta Chiave API',
    'admin.apiKeyValue': 'Valore Chiave API',
    'admin.addKeyDemo': 'Aggiungi Chiave (Solo Demo)',
    'admin.apiKeysComing': 'Gestione chiavi API in arrivo: memorizzazione sicura, aggiornamento ed eliminazione delle chiavi nel backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'Ops! Pagina non trovata',
    'notFound.returnHome': 'Torna alla Home',
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

    // Login page
    'login.title': 'Entre na Sua Conta',
    'login.createAccount': 'Criar uma Conta',
    'login.firstName': 'Nome',
    'login.lastName': 'Sobrenome',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.loginButton': 'Entrar',
    'login.signUpButton': 'Cadastrar',
    'login.noAccount': 'Não tem uma conta?',
    'login.signUpLink': 'Cadastre-se',
    'login.hasAccount': 'Já tem uma conta?',
    'login.loginLink': 'Entrar',
    'login.note': 'Você precisará conectar o Supabase para recursos de autenticação.',
    'login.docs': 'Veja a documentação do Lovable para instruções.',

    // Self Assessment page
    'selfAssessment.title': 'Autoavaliação',
    'selfAssessment.subtitle': 'Como você se avalia em cada habilidade? (1 = Apenas começando, 5 = Muito confiante)',
    'selfAssessment.saveButton': 'Salvar e Continuar',
    'selfAssessment.thankYou': 'Obrigado pela sua avaliação honesta!',
    'selfAssessment.startTest': 'Iniciar o Teste de Habilidades em Inglês →',

    // Assessment page
    'assessment.title': 'Avaliação de Habilidades',
    'assessment.selectLevel': 'Selecionar Nível:',
    'assessment.reading': 'Leitura',
    'assessment.writing': 'Escrita',
    'assessment.listening': 'Escuta',
    'assessment.speaking': 'Fala',
    'assessment.back': '← Voltar',
    'assessment.next': 'Próximo',
    'assessment.finish': 'Finalizar',
    'assessment.complete': 'Avaliação Concluída!',
    'assessment.completeMsg': 'Ótimo trabalho dando o primeiro passo! Seu progresso aparecerá no seu painel.',
    'assessment.viewDashboard': 'Ver Painel',

    // Dashboard page
    'dashboard.title': 'Seu Painel',
    'dashboard.subtitle': 'Bem-vindo! Aqui você verá seu progresso e jornada de aprendizado.',
    'dashboard.supabaseNote': '(Conecte o Supabase para rastrear e salvar seus resultados!)',
    'dashboard.progress': 'Progresso:',
    'dashboard.selfAssessment': 'Autoavaliação:',
    'dashboard.testScore': 'Pontuação do Teste:',
    'dashboard.assessmentButton': 'Avaliação',
    'dashboard.redoSelfAssessment': 'Refazer Autoavaliação',
    'dashboard.viewAllCourses': 'Ver Todos os Cursos',
    'dashboard.tip': 'Dica: Seu painel atualiza sempre que você completa uma autoavaliação ou teste de habilidades.',

    // Continue Learning page
    'continueLearning.title': 'Continuar Aprendendo',
    'continueLearning.subtitle': 'Escolha um nível para começar ou continuar sua jornada de aprendizado de inglês!',
    'continueLearning.loadingCourses': 'Carregando cursos...',
    'continueLearning.noCourses': 'Nenhum curso disponível ainda.',
    'continueLearning.start': 'Começar',
    'continueLearning.progressNote': '(Seu progresso será salvo quando você completar avaliações para cada nível!)',
    'continueLearning.errorLoading': 'Falha ao carregar cursos:',

    // Admin pages
    'admin.accessDenied': 'Acesso Negado',
    'admin.mustBeAdmin': 'Você deve ser um administrador para gerenciar cursos.',
    'admin.mustBeAdminApiKeys': 'Você deve ser um administrador ou super administrador para gerenciar chaves API.',
    'admin.coursesTitle': 'Gerenciamento de Cursos',
    'admin.level': 'Nível',
    'admin.summary': 'Resumo',
    'admin.actions': 'Ações',
    'admin.edit': 'Editar',
    'admin.delete': 'Excluir',
    'admin.add': 'Adicionar Curso',
    'admin.update': 'Atualizar',
    'admin.cancel': 'Cancelar',
    'admin.noCourses': 'Nenhum curso ainda.',
    'admin.apiKeysTitle': 'Gerenciamento de Chaves API',
    'admin.apiKeysSubtitle': 'Gerenciar chaves API para integrações.',
    'admin.apiKeysNote': 'Para uso no mundo real, armazenamento seguro (ex. Edge Functions secrets) deve ser implementado.',
    'admin.addApiKey': 'Adicionar Chave API',
    'admin.apiKeyLabel': 'Rótulo da Chave API',
    'admin.apiKeyValue': 'Valor da Chave API',
    'admin.addKeyDemo': 'Adicionar Chave (Apenas Demo)',
    'admin.apiKeysComing': 'Gerenciamento de chaves API em breve: armazenar, atualizar e excluir chaves com segurança no backend.',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'Ops! Página não encontrada',
    'notFound.returnHome': 'Voltar ao Início',
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

    // Login page
    'login.title': '登录您的账户',
    'login.createAccount': '创建账户',
    'login.firstName': '名字',
    'login.lastName': '姓氏',
    'login.email': '邮箱',
    'login.password': '密码',
    'login.loginButton': '登录',
    'login.signUpButton': '注册',
    'login.noAccount': '没有账户？',
    'login.signUpLink': '注册',
    'login.hasAccount': '已有账户？',
    'login.loginLink': '登录',
    'login.note': '您需要连接Supabase以使用身份验证功能。',
    'login.docs': '查看Lovable文档获取说明。',

    // Self Assessment page
    'selfAssessment.title': '自我评估',
    'selfAssessment.subtitle': '您如何评估自己的每项技能？（1 = 刚开始，5 = 非常自信）',
    'selfAssessment.saveButton': '保存并继续',
    'selfAssessment.thankYou': '感谢您的诚实评估！',
    'selfAssessment.startTest': '开始英语技能测试 →',

    // Assessment page
    'assessment.title': '技能评估',
    'assessment.selectLevel': '选择级别：',
    'assessment.reading': '阅读',
    'assessment.writing': '写作',
    'assessment.listening': '听力',
    'assessment.speaking': '口语',
    'assessment.back': '← 返回',
    'assessment.next': '下一个',
    'assessment.finish': '完成',
    'assessment.complete': '评估完成！',
    'assessment.completeMsg': '迈出第一步很棒！您的进度将显示在仪表板中。',
    'assessment.viewDashboard': '查看仪表板',

    // Dashboard page
    'dashboard.title': '您的仪表板',
    'dashboard.subtitle': '欢迎！这里您将看到您的进度和学习旅程。',
    'dashboard.supabaseNote': '（连接Supabase以跟踪和保存您的结果！）',
    'dashboard.progress': '进度：',
    'dashboard.selfAssessment': '自我评估：',
    'dashboard.testScore': '测试分数：',
    'dashboard.assessmentButton': '评估',
    'dashboard.redoSelfAssessment': '重做自我评估',
    'dashboard.viewAllCourses': '查看所有课程',
    'dashboard.tip': '提示：每当您完成自我评估或技能测试时，您的仪表板都会更新。',

    // Continue Learning page
    'continueLearning.title': '继续学习',
    'continueLearning.subtitle': '选择一个级别开始或继续您的英语学习之旅！',
    'continueLearning.loadingCourses': '加载课程中...',
    'continueLearning.noCourses': '暂无可用课程。',
    'continueLearning.start': '开始',
    'continueLearning.progressNote': '（当您完成每个级别的评估时，您的进度将被保存！）',
    'continueLearning.errorLoading': '加载课程失败：',

    // Admin pages
    'admin.accessDenied': '拒绝访问',
    'admin.mustBeAdmin': '您必须是管理员才能管理课程。',
    'admin.mustBeAdminApiKeys': '您必须是管理员或超级管理员才能管理API密钥。',
    'admin.coursesTitle': '课程管理',
    'admin.level': '级别',
    'admin.summary': '摘要',
    'admin.actions': '操作',
    'admin.edit': '编辑',
    'admin.delete': '删除',
    'admin.add': '添加课程',
    'admin.update': '更新',
    'admin.cancel': '取消',
    'admin.noCourses': '暂无课程。',
    'admin.apiKeysTitle': 'API密钥管理',
    'admin.apiKeysSubtitle': '管理集成的API密钥。',
    'admin.apiKeysNote': '对于实际使用，应实现安全存储（例如Edge Functions secrets）。',
    'admin.addApiKey': '添加API密钥',
    'admin.apiKeyLabel': 'API密钥标签',
    'admin.apiKeyValue': 'API密钥值',
    'admin.addKeyDemo': '添加密钥（仅演示）',
    'admin.apiKeysComing': 'API密钥管理即将推出：在后端安全存储、更新和删除密钥。',

    // 404 page
    'notFound.title': '404',
    'notFound.message': '哎呀！找不到页面',
    'notFound.returnHome': '返回首页',
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

    // Login page
    'login.title': 'アカウントにログイン',
    'login.createAccount': 'アカウントを作成',
    'login.firstName': '名前',
    'login.lastName': '苗字',
    'login.email': 'メール',
    'login.password': 'パスワード',
    'login.loginButton': 'ログイン',
    'login.signUpButton': 'サインアップ',
    'login.noAccount': 'アカウントをお持ちでないですか？',
    'login.signUpLink': 'サインアップ',
    'login.hasAccount': 'すでにアカウントをお持ちですか？',
    'login.loginLink': 'ログイン',
    'login.note': '認証機能を使用するにはSupabaseを接続する必要があります。',
    'login.docs': '手順については、Lovableドキュメントを参照してください。',

    // Self Assessment page
    'selfAssessment.title': '自己評価',
    'selfAssessment.subtitle': '各スキルをどのように評価しますか？（1 = 始めたばかり、5 = とても自信がある）',
    'selfAssessment.saveButton': '保存して続行',
    'selfAssessment.thankYou': '正直な評価をありがとうございます！',
    'selfAssessment.startTest': '英語スキルテストを開始 →',

    // Assessment page
    'assessment.title': 'スキル評価',
    'assessment.selectLevel': 'レベル選択：',
    'assessment.reading': 'リーディング',
    'assessment.writing': 'ライティング',
    'assessment.listening': 'リスニング',
    'assessment.speaking': 'スピーキング',
    'assessment.back': '← 戻る',
    'assessment.next': '次へ',
    'assessment.finish': '完了',
    'assessment.complete': '評価完了！',
    'assessment.completeMsg': '最初の一歩を踏み出すという素晴らしい仕事をしました！あなたの進捗はダッシュボードに表示されます。',
    'assessment.viewDashboard': 'ダッシュボードを表示',

    // Dashboard page
    'dashboard.title': 'あなたのダッシュボード',
    'dashboard.subtitle': 'ようこそ！ここであなたの進捗と学習の旅を見ることができます。',
    'dashboard.supabaseNote': '（結果を追跡・保存するためにSupabaseを接続してください！）',
    'dashboard.progress': '進捗：',
    'dashboard.selfAssessment': '自己評価：',
    'dashboard.testScore': 'テストスコア：',
    'dashboard.assessmentButton': '評価',
    'dashboard.redoSelfAssessment': '自己評価をやり直す',
    'dashboard.viewAllCourses': 'すべてのコースを表示',
    'dashboard.tip': 'ヒント：自己評価やスキルテストを完了するたびに、ダッシュボードが更新されます。',

    // Continue Learning page
    'continueLearning.title': '学習を続ける',
    'continueLearning.subtitle': 'レベルを選択して英語学習の旅を始めたり続けたりしましょう！',
    'continueLearning.loadingCourses': 'コース読み込み中...',
    'continueLearning.noCourses': 'まだ利用可能なコースはありません。',
    'continueLearning.start': '開始',
    'continueLearning.progressNote': '（各レベルの評価を完了すると、進捗が保存されます！）',
    'continueLearning.errorLoading': 'コースの読み込みに失敗しました：',

    // Admin pages
    'admin.accessDenied': 'アクセス拒否',
    'admin.mustBeAdmin': 'コースを管理するには管理者である必要があります。',
    'admin.mustBeAdminApiKeys': 'APIキーを管理するには管理者またはスーパー管理者である必要があります。',
    'admin.coursesTitle': 'コース管理',
    'admin.level': 'レベル',
    'admin.summary': '概要',
    'admin.actions': 'アクション',
    'admin.edit': '編集',
    'admin.delete': '削除',
    'admin.add': 'コース追加',
    'admin.update': '更新',
    'admin.cancel': 'キャンセル',
    'admin.noCourses': 'まだコースがありません。',
    'admin.apiKeysTitle': 'APIキー管理',
    'admin.apiKeysSubtitle': '統合のためのAPIキーを管理します。',
    'admin.apiKeysNote': '実際の使用には、安全なストレージ（例：Edge Functions secrets）を実装する必要があります。',
    'admin.addApiKey': 'APIキー追加',
    'admin.apiKeyLabel': 'APIキーラベル',
    'admin.apiKeyValue': 'APIキー値',
    'admin.addKeyDemo': 'キー追加（デモのみ）',
    'admin.apiKeysComing': 'APIキー管理機能準備中：バックエンドでキーの安全な保存、更新、削除。',

    // 404 page
    'notFound.title': '404',
    'notFound.message': 'おっと！ページが見つかりません',
    'notFound.returnHome': 'ホームに戻る',
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
