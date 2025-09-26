import type { Language } from './types';

const en = {
    // Onboarding
    onboarding_welcome_title: "Welcome to Inner Bloom",
    onboarding_welcome_subtitle: "A safe space to check in with yourself, find balance, and grow with a supportive community.",
    onboarding_name_prompt: "What should we call you?",
    onboarding_name_placeholder: "Your name",
    onboarding_cta_start: "Get Started",
    onboarding_cta_continue: "Continue",

    // Language Selection
    language_welcome_title: "Welcome to Inner Bloom",
    language_select_prompt: "Please select your language",

    // Disclaimer
    disclaimer_title: "Important Notice / Aviso Importante",
    disclaimer_text_en: "Inner Bloom is a tool for wellness and self-reflection. It is not a substitute for professional psychological therapy or medical advice. If you are in crisis, please contact a mental health professional or a crisis hotline.",
    disclaimer_text_es: "Inner Bloom es una herramienta para el bienestar y la autorreflexión. No sustituye la terapia psicológica profesional ni el consejo médico. Si estás en crisis, por favor contacta a un profesional de la salud mental o una línea de ayuda.",
    disclaimer_accept: "I Understand / Entendido",

    // Dashboard
    dashboard_greeting_morning: "Good morning",
    dashboard_greeting_afternoon: "Good afternoon",
    dashboard_greeting_evening: "Good evening",
    dashboard_streak_prefix: "Day",
    dashboard_streak_suffix: "day streak",
    dashboard_points_suffix: "Points",
    dashboard_ritual_title: "Collective Healing Ritual",
    dashboard_ritual_subtitle: "Daily Sunset Breathwork",
    dashboard_ritual_cta: "Join Now",
    dashboard_ritual_live_title: "Ritual is Live!",
    dashboard_ritual_live_subtitle: "Join the collective breath. Find your center.",
    dashboard_ritual_live_participants: "breathing together",
    dashboard_ritual_countdown_label: "Next ritual begins in:",
    dashboard_ritual_waiting: "waiting for the moment",
    dashboard_ritual_waiting_cta: "Waiting...",
    dashboard_tree_title: "Your Wellness Tree",
    dashboard_tree_stage_0: "Complete your first Daily Check-in to plant your tree!",
    dashboard_tree_stage_1: (days: number) => `${days} days to a small tree!`,
    dashboard_tree_stage_2: "Your consistency is helping it grow!",
    dashboard_tree_stage_3: "A testament to your dedication!",
    dashboard_tree_level_sprout: "New Beginning",
    dashboard_tree_level_seedling: "Seedling",
    dashboard_tree_level_small: "Small Tree",
    dashboard_tree_level_flourishing: "Flourishing Tree",
    dashboard_checkin_title: "Daily Check-in",
    dashboard_checkin_prompt: "How are you feeling today?",
    dashboard_checkin_cta: "Start Check-in",
    dashboard_checkin_completed_prompt: "You've checked in today. See you tomorrow!",
    dashboard_checkin_completed_cta: "Completed for Today",
    dashboard_actions_title: "Quick Actions",
    dashboard_action_breathe: "Breathe",
    dashboard_action_journal: "Journal",
    dashboard_action_support: "Support",
    dashboard_action_progress: "Progress",
    dashboard_action_challenges: "Challenges",
    dashboard_action_psychoanalysis: "Psychoanalysis",

    // Daily Checkin
    checkin_step_mood: "How are you feeling?",
    checkin_step_vitals: "Your Vital Signs",
    checkin_step_gratitude: "What are you grateful for?",
    checkin_energy: "Energy Level",
    checkin_sleep: "Sleep Quality",
    checkin_next: "Next",
    checkin_complete: "Complete Check-in",
    
    // Moods
    mood_rough: 'Rough',
    mood_low: 'Low',
    mood_okay: 'Okay',
    mood_good: 'Good',
    mood_great: 'Great',

    // Completion Celebration
    celebration_title: "Check-in Complete!",
    celebration_streak_message: (streak: number) => `You're on a ${streak}-day streak. Amazing work!`,
    celebration_points_earned: (points: number) => `+ ${points} Wellness Points ✨`,
    celebration_cta: "Continue",

    // Breathing
    breathing_title: "Breathing Exercises",
    breathing_ready: "Find a comfortable position",
    breathing_begin: "Begin",
    breathing_inhale: "Inhale...",
    breathing_hold: "Hold",
    breathing_exhale: "Exhale...",
    breathing_end_session: "End Session",

    // Journal
    journal_reflecting: "Inner Bloom is reflecting...",
    journal_reflection_title: "A Moment of Reflection",
    journal_inspiration: "Inspiration for Today",
    journal_placeholder: "Begin writing here...",
    journal_thinking: "Thinking...",
    journal_reflect: "Reflect",

    // Support Circle
    support_title: "Support Circle",
    support_placeholder: "Whisper your thoughts to the circle...",
    support_reward_tooltip: "Reward this message",
    support_rewarded_tooltip: "Rewarded",

    // Progress Dashboard
    progress_title: "Progress Dashboard",
    progress_milestones_title: "Your Milestones",
    progress_mood_chart_title: "Last 7 Days Mood Trend",
    progress_energy_chart_title: "Energy Levels",
    progress_sleep_chart_title: "Sleep Quality",
    progress_session_history_cta: "View Session History",

    // Wellness Challenges
    challenges_title: "Wellness Challenges",
    challenges_reward_prefix: "Reward",
    challenges_completed_text: "Completed",
    challenges_no_challenges: "No challenges available right now.",

    // Psychoanalysis Session
    psycho_title: "40-Minute Session",
    psycho_intro: "This is a safe, private space to explore your thoughts. I will listen and ask questions to help guide your reflection.",
    psycho_loading: "Preparing...",
    psycho_begin: "Begin Session",
    psycho_placeholder: "Type your thoughts...",
    psycho_exit_confirm_title: "End Session?",
    psycho_exit_confirm_body: "Are you sure you want to end your session early? A summary will be generated and your conversation will be saved.",
    psycho_exit_confirm_confirm: "End Session",
    psycho_exit_confirm_cancel: "Stay",
    psycho_times_up_title: "Session Ended",
    psycho_times_up_body: "Your 40-minute session is complete. A summary will be generated and saved to your history.",
    psycho_times_up_confirm: "Return to Dashboard",

    // User Profile
    profile_title: "My Profile",
    profile_username_label: "You are known as",
    profile_stat_streak: "Day Streak",
    profile_stat_points: "Wellness Points",

    // Settings
    settings_title: "Settings",
    settings_section_appearance: "Appearance",
    settings_theme_label: "Theme",
    settings_theme_light: "Light",
    settings_theme_dark: "Dark",
    settings_theme_system: "System",
    settings_section_general: "General",
    settings_language_label: "Language",
    settings_section_notifications: "Notifications",
    settings_notifications_label: "Enable Daily Reminders",
    
    // Session History
    session_history_title: "Session History",
    session_history_empty: "You have no saved session summaries yet. Complete a psychoanalysis session to see your history here.",

    // Errors
    error_api_generic: "An API error occurred. Please try again.",
    error_api_invalid_key: "Invalid API key. Please check your settings.",
    error_storage_full: "Could not save data. Your browser storage might be full.",
};

const es = {
    // Onboarding
    onboarding_welcome_title: "Bienvenido a Inner Bloom",
    onboarding_welcome_subtitle: "Un espacio seguro para conectar contigo mismo, encontrar balance y crecer con una comunidad de apoyo.",
    onboarding_name_prompt: "¿Cómo deberíamos llamarte?",
    onboarding_name_placeholder: "Tu nombre",
    onboarding_cta_start: "Comenzar",
    onboarding_cta_continue: "Continuar",

    // Language Selection
    language_welcome_title: "Bienvenido a Inner Bloom",
    language_select_prompt: "Por favor, selecciona tu idioma",

    // Disclaimer
    disclaimer_title: "Important Notice / Aviso Importante",
    disclaimer_text_en: "Inner Bloom is a tool for wellness and self-reflection. It is not a substitute for professional psychological therapy or medical advice. If you are in crisis, please contact a mental health professional or a crisis hotline.",
    disclaimer_text_es: "Inner Bloom es una herramienta para el bienestar y la autorreflexión. No sustituye la terapia psicológica profesional ni el consejo médico. Si estás en crisis, por favor contacta a un profesional de la salud mental o una línea de ayuda.",
    disclaimer_accept: "I Understand / Entendido",

    // Dashboard
    dashboard_greeting_morning: "Buenos días",
    dashboard_greeting_afternoon: "Buenas tardes",
    dashboard_greeting_evening: "Buenas noches",
    dashboard_streak_prefix: "Día",
    dashboard_streak_suffix: "días de racha",
    dashboard_points_suffix: "Puntos",
    dashboard_ritual_title: "Ritual de Sanación Colectiva",
    dashboard_ritual_subtitle: "Respiración Comunitaria al Atardecer",
    dashboard_ritual_cta: "Únete Ahora",
    dashboard_ritual_live_title: "¡El Ritual está en Vivo!",
    dashboard_ritual_live_subtitle: "Únete a la respiración colectiva. Encuentra tu centro.",
    dashboard_ritual_live_participants: "respirando juntos",
    dashboard_ritual_countdown_label: "El próximo ritual comienza en:",
    dashboard_ritual_waiting: "esperando el momento",
    dashboard_ritual_waiting_cta: "Esperando...",
    dashboard_tree_title: "Tu Árbol de Bienestar",
    dashboard_tree_stage_0: "¡Completa tu primer Check-in Diario para plantar tu árbol!",
    dashboard_tree_stage_1: (days: number) => `¡A ${days} días de tener un árbol pequeño!`,
    dashboard_tree_stage_2: "¡Tu constancia lo está ayudando a crecer!",
    dashboard_tree_stage_3: "¡Un testimonio de tu dedicación!",
    dashboard_tree_level_sprout: "Nuevo Comienzo",
    dashboard_tree_level_seedling: "Plántula",
    dashboard_tree_level_small: "Árbol Pequeño",
    dashboard_tree_level_flourishing: "Árbol Floreciente",
    dashboard_checkin_title: "Check-in Diario",
    dashboard_checkin_prompt: "¿Cómo te sientes hoy?",
    dashboard_checkin_cta: "Iniciar Check-in",
    dashboard_checkin_completed_prompt: "Ya hiciste tu check-in de hoy. ¡Nos vemos mañana!",
    dashboard_checkin_completed_cta: "Completado por Hoy",
    dashboard_actions_title: "Acciones Rápidas",
    dashboard_action_breathe: "Respira",
    dashboard_action_journal: "Diario",
    dashboard_action_support: "Apoyo",
    dashboard_action_progress: "Progreso",
    dashboard_action_challenges: "Retos",
    dashboard_action_psychoanalysis: "Psicoanálisis",
    
    // Daily Checkin
    checkin_step_mood: "¿Cómo te sientes?",
    checkin_step_vitals: "Tu energía y descanso",
    checkin_step_gratitude: "¿De qué estás agradecido/a?",
    checkin_energy: "Nivel de Energía",
    checkin_sleep: "Calidad del Sueño",
    checkin_next: "Siguiente",
    checkin_complete: "Completar Check-in",

    // Moods
    mood_rough: 'Difícil',
    mood_low: 'Bajo',
    mood_okay: 'Normal',
    mood_good: 'Bien',
    mood_great: 'Genial',

    // Completion Celebration
    celebration_title: "¡Check-in Completo!",
    celebration_streak_message: (streak: number) => `Llevas una racha de ${streak} días. ¡Increíble trabajo!`,
    celebration_points_earned: (points: number) => `+ ${points} Puntos de Bienestar ✨`,
    celebration_cta: "Continuar",

    // Breathing
    breathing_title: "Ejercicios de Respiración",
    breathing_ready: "Busca una posición cómoda",
    breathing_begin: "Comenzar",
    breathing_inhale: "Inhala...",
    breathing_hold: "Sostén",
    breathing_exhale: "Exhala...",
    breathing_end_session: "Finalizar Sesión",

    // Journal
    journal_reflecting: "Inner Bloom está reflexionando...",
    journal_reflection_title: "Un Momento de Reflexión",
    journal_inspiration: "Inspiración para Hoy",
    journal_placeholder: "Empieza a escribir aquí...",
    journal_thinking: "Pensando...",
    journal_reflect: "Reflexionar",

    // Support Circle
    support_title: "Círculo de Apoyo",
    support_placeholder: "Susurra tus pensamientos al círculo...",
    support_reward_tooltip: "Recompensar este mensaje",
    support_rewarded_tooltip: "Recompensado",

    // Progress Dashboard
    progress_title: "Panel de Progreso",
    progress_milestones_title: "Tus Hitos",
    progress_mood_chart_title: "Tendencia de Ánimo (Últimos 7 Días)",
    progress_energy_chart_title: "Niveles de Energía",
    progress_sleep_chart_title: "Calidad del Sueño",
    progress_session_history_cta: "Ver Historial de Sesiones",

    // Wellness Challenges
    challenges_title: "Retos de Bienestar",
    challenges_reward_prefix: "Recompensa",
    challenges_completed_text: "Completado",
    challenges_no_challenges: "No hay retos disponibles por ahora.",

    // Psychoanalysis Session
    psycho_title: "Sesión de 40 Minutos",
    psycho_intro: "Este es un espacio seguro y privado para explorar tus pensamientos. Escucharé y haré preguntas para guiar tu reflexión.",
    psycho_loading: "Preparando...",
    psycho_begin: "Iniciar Sesión",
    psycho_placeholder: "Escribe tus pensamientos...",
    psycho_exit_confirm_title: "¿Finalizar Sesión?",
    psycho_exit_confirm_body: "¿Estás seguro/a de que quieres finalizar tu sesión antes de tiempo? Se generará un resumen y tu conversación se guardará.",
    psycho_exit_confirm_confirm: "Finalizar Sesión",
    psycho_exit_confirm_cancel: "Quedarme",
    psycho_times_up_title: "Sesión Finalizada",
    psycho_times_up_body: "Tu sesión de 40 minutos ha terminado. Se generará un resumen y se guardará en tu historial.",
    psycho_times_up_confirm: "Volver al Panel",

    // User Profile
    profile_title: "Mi Perfil",
    profile_username_label: "Eres conocido/a como",
    profile_stat_streak: "Racha de Días",
    profile_stat_points: "Puntos de Bienestar",

    // Settings
    settings_title: "Ajustes",
    settings_section_appearance: "Apariencia",
    settings_theme_label: "Tema",
    settings_theme_light: "Claro",
    settings_theme_dark: "Oscuro",
    settings_theme_system: "Sistema",
    settings_section_general: "General",
    settings_language_label: "Idioma",
    settings_section_notifications: "Notificaciones",
    settings_notifications_label: "Activar Recordatorios Diarios",

    // Session History
    session_history_title: "Historial de Sesiones",
    session_history_empty: "Aún no tienes resúmenes de sesiones guardados. Completa una sesión de psicoanálisis para ver tu historial aquí.",
    
    // Errors
    error_api_generic: "Ocurrió un error con la API. Por favor, inténtalo de nuevo.",
    error_api_invalid_key: "Clave de API inválida. Por favor, revisa tu configuración.",
    error_storage_full: "No se pudieron guardar los datos. El almacenamiento de tu navegador podría estar lleno.",
};

export const translations = { en, es };

const aiMessages = {
    en: {
        reflectionUnavailable: "AI reflection is currently unavailable. Please check your API key setup.",
        journalPlaceholder: "Write something in your journal to get a reflection.",
        reflectionError: "I'm having a little trouble reflecting right now. Please try again later.",
        journalSystemInstruction: `You are a compassionate and supportive wellness companion named 'Inner Bloom'. 
Your role is to read a user's short journal entry and provide a brief, positive, and encouraging reflection. 
Do not give medical advice. Focus on acknowledging their feelings, highlighting strengths, or offering a gentle, positive perspective. 
Keep your response to 2-3 sentences. Format your response as a single paragraph.`,
        psychoanalystConnectionError: "Welcome. It seems the connection to my core insights is unavailable (API key is missing). I can still listen, but I won't be able to provide reflections.",
        psychoanalystSessionStartError: "I'm sorry, I'm having trouble starting our session right now. Please try again later.",
        psychoanalystResponseError: "I'm having trouble responding right now. Please try again in a moment.",
        psychoanalystStartPrompt: "Start the session by introducing yourself and asking an open-ended question to begin.",
        psychoanalystSummaryInstruction: "You are an expert psychotherapist. Summarize the following session transcript. Identify the main themes and provide a concise, neutral title. The user wants to track their progress, so focus on key insights and emotional shifts. The output must be a JSON object with 'title' and 'summary' keys.",
        psychoanalystSystemInstruction: `🌌 Ultimate Hyper Mega Prompt: Integral Psychologist with Memory

Assigned Role:
You are a Universal Integral Psychologist with Therapeutic Memory.

You hold all degrees and doctorates in psychology, psychiatry, neuroscience, psychotherapy, philosophy of mind, spirituality, anthropology, and coaching.

You master all psychological schools: psychoanalysis, CBT, gestalt, humanism, systemic therapy, logotherapy, acceptance and commitment therapy, positive psychology, transpersonal, mindfulness, neuropsychology, behavioral, clinical, developmental, social, sports, educational, and organizational psychology.

You know and apply the most up-to-date, evidence-based techniques and clinical guidelines (DSM-5-TR, ICD-11, APA, WHO).

Furthermore, you integrate Eastern and shamanic approaches (Zen, Taoism, Vedas, Ayurveda, Amazonian shamanism, altered states of consciousness).

Therapeutic Memory Capability (simulated):

You remember what the user shares about their life, history, emotions, and goals.

You recognize behavioral patterns and reflect them back to the user with empathy.

You follow up on processes: exercises, progress, setbacks, and achievements.

You can create a growth narrative that connects all sessions.

Communication Style:

Empathetic, human, non-judgmental.

Able to use technical language when required, or simple, approachable language depending on the context.

Active listening, open-ended questions, symbolic silences (when the user needs space).

Use plain text only. Do not use markdown (like asterisks for bolding) or any other special formatting.

You always offer practical tools:

Breathing and mindfulness exercises

Cognitive restructuring techniques

Role-playing situations

Therapeutic diaries and self-observation

Resilience and emotional regulation methods

Visualizations and therapeutic metaphors

Objective:

To provide deep and constant psychological support.

To accompany in emotional crises, anxiety, depression, grief, addictions, self-confidence, relationships, meaning of life.

To promote integral well-being (mental, emotional, spiritual).

To facilitate a journey of self-knowledge and personal transformation.

To intervene with clarity and firmness in cases of risk (e.g., suicide), providing concrete steps for immediate help.

Interaction Rules:

You always respond as the Integral Psychologist with Memory.

You adapt to the user's emotional and cultural state.

You integrate different approaches and perspectives to provide a 360° view.

You provide practical steps and easy-to-apply strategies.

You maintain continuity between conversations (e.g., "last time we talked about your anxiety, today we can delve into the technique you left pending").

Always respond in the user's language.

Your priority is the person's well-being and evolution.`,
    },
    es: {
        reflectionUnavailable: "La reflexión de la IA no está disponible actualmente. Por favor, revisa la configuración de tu clave de API.",
        journalPlaceholder: "Escribe algo en tu diario para obtener una reflexión.",
        reflectionError: "Estoy teniendo un pequeño problema para reflexionar en este momento. Por favor, inténtalo de nuevo más tarde.",
        journalSystemInstruction: `Eres un compañero de bienestar compasivo y solidario llamado 'Inner Bloom'. Tu función es leer la breve entrada del diario de un usuario y proporcionar una reflexión breve, positiva y alentadora. No des consejos médicos. Concéntrate en reconocer sus sentimientos, resaltar sus fortalezas u ofrecer una perspectiva amable y positiva. Mantén tu respuesta en 2-3 frases. Formatea tu respuesta como un solo párrafo.`,
        psychoanalystConnectionError: "Bienvenido/a. Parece que la conexión con mis conocimientos centrales no está disponible (falta la clave de API). Aún puedo escuchar, pero no podré ofrecer reflexiones.",
        psychoanalystSessionStartError: "Lo siento, estoy teniendo problemas para iniciar nuestra sesión en este momento. Por favor, inténtalo de nuevo más tarde.",
        psychoanalystResponseError: "Estoy teniendo problemas para responder en este momento. Por favor, inténtalo de nuevo en un momento.",
        psychoanalystStartPrompt: "Inicia la sesión presentándote y haciendo una pregunta abierta para comenzar.",
        psychoanalystSummaryInstruction: "Eres un psicoterapeuta experto. Resume la siguiente transcripción de la sesión. Identifica los temas principales y proporciona un título conciso y neutral. El usuario quiere seguir su progreso, así que céntrate en las ideas clave y los cambios emocionales. La salida debe ser un objeto JSON con las claves 'title' y 'summary'.",
        psychoanalystSystemInstruction: `🌌 Hyper Mega Prompt Definitivo: Psicólogo Integral con Memoria

Rol Asignado:
Eres un Psicólogo Integral Universal con Memoria Terapéütica.

Posees todos los títulos y doctorados en psicología, psiquiatría, neurociencia, psicoterapia, filosofía de la mente, espiritualidad, antropología, y coaching.

Dominas todas las escuelas psicológicas: psicoanálisis, TCC, gestalt, humanismo, terapia sistémica, logoterapia, terapia de aceptación y compromiso, psicología positiva, transpersonal, mindfulness, neuropsicología, conductual, clínica, del desarrollo, social, deportiva, educativa y organizacional.

Conoces y aplicas las técnicas más actualizadas, basadas en evidencia científica y guías clínicas (DSM-5-TR, CIE-11, APA, OMS).

Además, integras enfoques orientales y chamánicos (zen, taoísmo, vedas, ayurveda, chamanismo amazónico, estados alterados de conciencia).

Capacidad de Memoria Terapéütica (simulada):

Recuerdas lo que el usuario comparte sobre su vida, historia, emociones y metas.

Reconocedores patrones de comportamiento y los reflejas al usuario con empatía.

Haces seguimiento a procesos: ejercicios, avances, recaídas y logros.

Puedes crear una línea narrativa de crecimiento que conecte todas las sesiones.

Estilo de Comunicación:

Empático, humano, sin juicios.

Capaz de hablar con lenguaje técnico cuando se requiere, o con lenguaje sencillo y cercano según el contexto.

Escucha activa, preguntas abiertas, silencios simbólicos (cuando el usuario necesita espacio).

Usa solo texto plano. No utilices markdown (como asteriscos para negritas) ni ningún otro formato especial.

Siempre ofreces herramientas prácticas:

Ejercicios de respiración y mindfulness

Técnicas cognitivas de reestructuración

Role playing de situaciones

Diarios terapéüticos y autoobservación

Métodos de resiliencia y regulación emocional

Visualizaciones y metáforas terapéüticas

Objetivo:

Brindar apoyo psicológico profundo y constante.

Acompañar en crisis emocionales, ansiedad, depresión, duelos, adicciones, autoconfianza, relaciones, sentido de vida.

Promover el bienestar integral (mental, emocional, espiritual).

Facilitar un viaje de autoconocimiento y transformación personal.

Intervenir con claridad y firmeza en casos de riesgo (p. ej. suicidio), dando pasos concretos de ayuda inmediata.

Reglas de Interacción:

Siempre respondes como el Psicólogo Integral con Memoria.

Te adaptas al estado emocional y cultural del usuario.

Integra diferentes enfoques y perspectivas para dar una visión 360°.

Das pasos prácticos y estrategias fáciles de aplicar.

Mantienes continuidad entre conversaciones (ejemplo: “la última vez hablamos de tu ansiedad, hoy podemos profundizar en la técnica que dejaste pendiente”).

Respondes siempre en el idioma del usuario.

Tu prioridad es el bienestar y la evolución de la persona.`,
    },
};

export const getAIMessages = (lang: Language) => aiMessages[lang];