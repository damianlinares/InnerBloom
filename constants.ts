import type { Mood, BreathingTechnique, Milestone, DailyLog, SupportMessage, WellnessChallenge, Language } from './types';
import { translations } from './translations';

type TranslationFn = (key: keyof typeof translations.en, ...args: unknown[]) => string;

export const getMoodOptions = (t: TranslationFn): Mood[] => [
  { label: t('mood_rough'), emoji: '😢', value: 1, color: 'bg-red-400' },
  { label: t('mood_low'), emoji: '😔', value: 2, color: 'bg-orange-400' },
  { label: t('mood_okay'), emoji: '😐', value: 3, color: 'bg-yellow-400' },
  { label: t('mood_good'), emoji: '🙂', value: 4, color: 'bg-lime-400' },
  { label: t('mood_great'), emoji: '😊', value: 5, color: 'bg-green-400' },
];

const BREATHING_TECHNIQUES_EN: BreathingTechnique[] = [
  {
    id: 'diaphragmatic',
    name: "Diaphragmatic Breathing",
    description: "Stress Reduction and Improved Mind-Body Connection.",
    icon: 'lungs',
    pattern: { inhale: 4, exhale: 6 },
    practice: [
        "Lie down or sit in a comfortable position.",
        "Place one hand on your chest and the other on your abdomen.",
        "Inhale slowly through your nose, feeling your abdomen expand while your chest remains relatively still.",
        "Exhale slowly through your mouth or nose, feeling your abdomen contract.",
        "Continue for 5-10 minutes, focusing on the rising and falling of your abdomen."
    ],
  },
  {
    id: '4-7-8',
    name: "4-7-8 Technique",
    description: "Rapidly Calms the Nervous System.",
    icon: 'timer',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    practice: [
        "Sit with your back straight.",
        "Exhale completely through your mouth, making a whoosh sound.",
        "Close your mouth and inhale quietly through your nose to a mental count of 4.",
        "Hold your breath for a count of 7.",
        "Exhale completely through your mouth, making a whoosh sound to a count of 8.",
        "This completes one breath. Repeat the cycle 3 more times."
    ],
  },
  {
    id: 'box',
    name: "Box Breathing",
    description: "Increases Mental Clarity and Concentration.",
    icon: 'square',
    pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 },
    practice: [
        "Sit with your back straight.",
        "Inhale through your nose to a count of 4.",
        "Hold your breath for a count of 4.",
        "Exhale through your nose for a count of 4.",
        "Hold the exhale for a count of 4.",
        "Repeat the cycle for several minutes."
    ],
  },
  {
    id: 'alternateNostril',
    name: "Alternate Nostril Breathing",
    description: "Harmonizes Brain Hemispheres and Balances Emotions.",
    icon: 'yin-yang',
    pattern: { inhale: 4, exhale: 6 },
    practice: [
        "Sit in a comfortable position.",
        "Use your right thumb to close your right nostril.",
        "Inhale slowly through your left nostril.",
        "Close the left nostril with your right ring finger and release the thumb from the right.",
        "Exhale slowly through your right nostril.",
        "Inhale through the right nostril.",
        "Close the right nostril and exhale through the left.",
        "This completes one cycle. Continue for 5-10 minutes."
    ],
  },
  {
    id: 'lion',
    name: "Lion's Breath",
    description: "Releases Facial, Jaw, and Emotional Tension.",
    icon: 'mouth',
    pattern: { inhale: 3, exhale: 5 },
    practice: [
        "Sit on your knees or in a chair.",
        "Inhale deeply through your nose.",
        "As you exhale, open your mouth wide, stick out your tongue, and stretch it towards your chin.",
        "Make a loud, sustained 'ha' sound from deep in your abdomen.",
        "Direct your gaze to the space between your eyebrows or the tip of your nose.",
        "Repeat 3 to 5 times."
    ],
  },
  {
    id: 'bee',
    name: "Bumblebee Breath",
    description: "Calms the Mind and Reduces Insomnia.",
    icon: 'ear',
    pattern: { inhale: 4, exhale: 8 },
    practice: [
        "Sit in a comfortable position and close your eyes.",
        "Gently cover your ears with your thumbs.",
        "Inhale deeply through your nose.",
        "As you exhale, keep your mouth closed and make a humming sound like a bee.",
        "Feel the vibration in your head.",
        "Continue for several cycles."
    ],
  },
  {
    id: 'bellows',
    name: "Bellows Breath",
    description: "Increases Energy and Vitality.",
    icon: 'fire',
    pattern: { inhale: 0.5, exhale: 0.5 },
    practice: [
        "Sit with a straight back.",
        "Perform forceful and rapid inhalations and exhalations through the nose.",
        "The duration of inhalation and exhalation should be equal.",
        "Start with a round of 10 breaths and then breathe normally.",
        "Gradually increase to rounds of 20 or 30."
    ],
  },
  {
    id: 'skullShining',
    name: "Skull Shining Breath",
    description: "Detoxification and Increased Mental Acuity.",
    icon: 'sparkle',
    pattern: { inhale: 1.5, exhale: 0.5 },
    practice: [
        "Sit with a straight back.",
        "Perform a short, powerful exhale through the nose, contracting your abdomen.",
        "The inhalation should be passive and automatic.",
        "Start with rounds of 20-30 exhalations and then rest."
    ],
    note: "This technique is advanced and not recommended for people with high blood pressure, heart problems, or during pregnancy.",
  },
  {
    id: 'ujjayi',
    name: "Victorious Breath",
    description: "Promotes Concentration and Internalization.",
    icon: 'waves',
    pattern: { inhale: 5, exhale: 5 },
    practice: [
        "With your mouth closed, slightly constrict the back of your throat, as if you were fogging up a mirror.",
        "Inhale and exhale through your nose, maintaining that gentle constriction.",
        "The breath will produce a soft, audible sound, similar to ocean waves.",
        "Maintain a slow and steady breathing rhythm."
    ],
  },
];

const BREATHING_TECHNIQUES_ES: BreathingTechnique[] = [
  {
    id: 'diaphragmatic',
    name: "Respiración Diafragmática o Abdominal",
    description: "Reducción del Estrés y Mejora de la Conexión Mente-Cuerpo.",
    icon: 'lungs',
    pattern: { inhale: 4, exhale: 6 },
    practice: [
      "Acuéstate o siéntate en una posición cómoda.",
      "Coloca una mano sobre tu pecho y la otra sobre tu abdomen.",
      "Inhala lentamente por la nariz, sintiendo cómo tu abdomen se expande mientras tu pecho permanece relativamente quieto.",
      "Exhala lentamente por la boca o la nariz, sintiendo cómo tu abdomen se contrae.",
      "Continúa durante 5-10 minutos, enfocándote en el movimiento ascendente y descendente de tu abdomen."
    ],
  },
  {
    id: '4-7-8',
    name: "La Técnica 4-7-8",
    description: "Calma Rápida del Sistema Nervioso.",
    icon: 'timer',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    practice: [
        "Siéntate con la espalda recta.",
        "Exhala completamente por la boca, haciendo un sonido de soplido.",
        "Cierra la boca e inhala silenciosamente por la nariz contando hasta 4.",
        "Aguanta la respiración contando hasta 7.",
        "Exhala completamente por la boca, haciendo un sonido de soplido, contando hasta 8.",
        "Esto completa una respiración. Repite el ciclo 3 veces más."
    ],
  },
  {
    id: 'box',
    name: "Respiración Cuadrada (Box Breathing)",
    description: "Aumento de la Claridad Mental y la Concentración.",
    icon: 'square',
    pattern: { inhale: 4, hold: 4, exhale: 4, holdAfter: 4 },
    practice: [
      "Siéntate con la espalda recta.",
      "Inhala por la nariz contando hasta 4.",
      "Sostén la respiración contando hasta 4.",
      "Exhala por la nariz contando hasta 4.",
      "Sostén la exhalación contando hasta 4.",
      "Repite el ciclo durante varios minutos."
    ],
  },
  {
    id: 'alternateNostril',
    name: "Respiración por Fosas Nasales Alternas",
    description: "Armonización de los Hemisferios Cerebrales y Equilibrio Emocional.",
    icon: 'yin-yang',
    pattern: { inhale: 4, exhale: 6 },
    practice: [
      "Siéntate en una posición cómoda.",
      "Usa el pulgar derecho para cerrar la fosa nasal derecha.",
      "Inhala lentamente por la fosa nasal izquierda.",
      "Cierra la fosa nasal izquierda con el dedo anular derecho y libera el pulgar de la derecha.",
      "Exhala lentamente por la fosa nasal derecha.",
      "Inhala por la fosa nasal derecha.",
      "Cierra la fosa nasal derecha y exhala por la izquierda.",
      "Esto completa un ciclo. Continúa durante 5-10 minutos."
    ],
  },
  {
    id: 'lion',
    name: "Respiración del León (Simhasana)",
    description: "Liberación de Tensión Facial, de Mandíbula y Emocional.",
    icon: 'mouth',
    pattern: { inhale: 3, exhale: 5 },
    practice: [
        "Siéntate de rodillas o en una silla.",
        "Inhala profundamente por la nariz.",
        "Al exhalar, abre la boca ampliamente, saca la lengua y estírala hacia la barbilla.",
        "Emite un sonido de 'ha' fuerte y sostenido desde lo profundo de tu abdomen.",
        "Dirige tu mirada hacia el entrecejo o la punta de la nariz.",
        "Repite de 3 a 5 veces."
    ],
  },
  {
    id: 'bee',
    name: "Zumbido de Abeja (Bhramari Pranayama)",
    description: "Calma la Mente y Reduce el Insomnio.",
    icon: 'ear',
    pattern: { inhale: 4, exhale: 8 },
    practice: [
        "Siéntate en una posición cómoda y cierra los ojos.",
        "Tapa suavemente tus oídos con los pulgares.",
        "Inhala profundamente por la nariz.",
        "Al exhalar, mantén la boca cerrada y produce un zumbido similar al de una abeja.",
        "Siente la vibración en tu cabeza.",
        "Continúa durante varios ciclos."
    ],
  },
  {
    id: 'bellows',
    name: "Respiración de Fuelle (Bhastrika Pranayama)",
    description: "Aumento de la Energía y la Vitalidad.",
    icon: 'fire',
    pattern: { inhale: 0.5, exhale: 0.5 },
    practice: [
        "Siéntate con la espalda recta.",
        "Realiza inhalaciones y exhalaciones forzadas y rápidas por la nariz.",
        "La duración de la inhalación y la exhalación debe ser igual.",
        "Comienza con una ronda de 10 respiraciones y luego respira normalmente.",
        "Aumenta gradualmente a rondas de 20 o 30."
    ],
  },
  {
    id: 'skullShining',
    name: "Respiración de Cráneo Brillante (Kapalabhati)",
    description: "Desintoxicación y Aumento de la Agudeza Mental.",
    icon: 'sparkle',
    pattern: { inhale: 1.5, exhale: 0.5 },
    practice: [
        "Siéntate con la espalda recta.",
        "Realiza una exhalación corta y potente por la nariz, contrayendo el abdomen.",
        "La inhalación debe ser pasiva y automática.",
        "Comienza con rondas de 20-30 exhalaciones y luego descansa."
    ],
    note: "Esta técnica es avanzada y no se recomienda para personas con presión arterial alta, problemas cardíacos o durante el embarazo.",
  },
  {
    id: 'ujjayi',
    name: "Respiración Victoriosa (Ujjayi Pranayama)",
    description: "Fomento de la Concentración y la Interiorización.",
    icon: 'waves',
    pattern: { inhale: 5, exhale: 5 },
    practice: [
        "Con la boca cerrada, contrae ligeramente la parte posterior de la garganta, como si estuvieras empañando un espejo.",
        "Inhala y exhala por la nariz, manteniendo esa suave constricción.",
        "La respiración producirá un sonido suave y audible, similar al de las olas del mar.",
        "Mantén un ritmo de respiración lento y uniforme."
    ],
  },
];

export const getBreathingTechniques = (lang: Language): BreathingTechnique[] => {
    return lang === 'es' ? BREATHING_TECHNIQUES_ES : BREATHING_TECHNIQUES_EN;
}


export const MOCK_DAILY_LOGS: DailyLog[] = [
    { date: '2024-07-15', mood: 4, energy: 75, sleep: 4 },
    { date: '2024-07-16', mood: 3, energy: 60, sleep: 3 },
    { date: '2024-07-17', mood: 5, energy: 90, sleep: 5 },
    { date: '2024-07-18', mood: 4, energy: 80, sleep: 4 },
    { date: '2024-07-19', mood: 2, energy: 40, sleep: 2 },
    { date: '2024-07-20', mood: 3, energy: 65, sleep: 3 },
    { date: '2024-07-21', mood: 5, energy: 95, sleep: 5 },
];

const MOCK_MILESTONES_EN: Milestone[] = [
    { id: '1', icon: 'rosette', title: '7-Day Streak', description: 'Completed check-ins for 7 days in a row.' },
    { id: '2', icon: 'wind', title: 'Breathing Beginner', description: 'Completed your first breathing exercise.' },
    { id: '3', icon: 'notebook', title: 'First Reflection', description: 'Used the AI Journal for the first time.' },
    { id: '4', icon: 'star', title: 'Mindful Month', description: 'Checked in for 30 consecutive days.' },
];

const MOCK_MILESTONES_ES: Milestone[] = [
    { id: '1', icon: 'rosette', title: 'Racha de 7 Días', description: 'Completaste check-ins durante 7 días seguidos.' },
    { id: '2', icon: 'wind', title: 'Principiante de Respiración', description: 'Completaste tu primer ejercicio de respiración.' },
    { id: '3', icon: 'notebook', title: 'Primera Reflexión', description: 'Usaste el Diario con IA por primera vez.' },
    { id: '4', icon: 'star', title: 'Mes Consciente', description: 'Hiciste check-in durante 30 días consecutivos.' },
];

export const getMilestones = (lang: Language): Milestone[] => {
    return lang === 'es' ? MOCK_MILESTONES_ES : MOCK_MILESTONES_EN;
};


const MOCK_SUPPORT_MESSAGES_EN: SupportMessage[] = [
    { id: '1', content: "Feeling really overwhelmed with work this week. It's hard to switch off.", timestamp: '10:30 AM', sender: 'other', reactions: [{emoji: '🤗', count: 2}], isRewarded: true },
    { id: '2', content: "I hear you. It's tough when work bleeds into personal time. Remember to take small breaks, even just 5 minutes.", timestamp: '10:32 AM', sender: 'other', reactions: [{emoji: '🙏', count: 3}, {emoji: '❤️', count: 1}] },
    { id: '3', content: "Thanks for that. It's good to know I'm not alone in this.", timestamp: '10:33 AM', sender: 'self', reactions: [] },
    { id: '4', content: "Definitely not alone. We've all been there. You've got this!", timestamp: '10:35 AM', sender: 'other', reactions: [] },
];

const MOCK_SUPPORT_MESSAGES_ES: SupportMessage[] = [
    { id: '1', content: "Me siento muy abrumado/a con el trabajo esta semana. Es difícil desconectar.", timestamp: '10:30 AM', sender: 'other', reactions: [{emoji: '🤗', count: 2}], isRewarded: true },
    { id: '2', content: "Te entiendo. Es duro cuando el trabajo invade el tiempo personal. Recuerda tomar pequeños descansos, aunque sea de 5 minutos.", timestamp: '10:32 AM', sender: 'other', reactions: [{emoji: '🙏', count: 3}, {emoji: '❤️', count: 1}] },
    { id: '3', content: "Gracias por eso. Es bueno saber que no estoy solo/a en esto.", timestamp: '10:33 AM', sender: 'self', reactions: [] },
    { id: '4', content: "Definitivamente no estás solo/a. Todos hemos pasado por eso. ¡Tú puedes!", timestamp: '10:35 AM', sender: 'other', reactions: [] },
];

export const getSupportMessages = (lang: Language): SupportMessage[] => {
    return lang === 'es' ? MOCK_SUPPORT_MESSAGES_ES : MOCK_SUPPORT_MESSAGES_EN;
};


const MOCK_CHALLENGES_EN: WellnessChallenge[] = [
    { id: '1', icon: 'plant', title: '7-Day Mindful Morning', description: 'Complete a check-in every morning for a week.', reward: '+50 Points', progress: 85, status: 'active' },
    { id: '2', icon: 'wind', title: 'Breathwork Explorer', description: 'Try all 3 breathing techniques.', reward: 'Breathe Easy Badge', progress: 33, status: 'active' },
    { id: '3', icon: 'users-three', title: 'Community Contributor', description: 'Send 10 supportive messages in the Support Circle.', reward: '+100 Points', progress: 50, status: 'active' },
    { id: '4', icon: 'moon', title: 'Consistent Sleep', description: 'Log your sleep quality for 5 days straight.', reward: 'Sleepy Star Badge', progress: 100, status: 'completed' },
    { id: '5', icon: 'book-open', title: 'Journal Journey', description: 'Write in your journal 3 times.', reward: '+20 Points', progress: 100, status: 'completed' },
];

const MOCK_CHALLENGES_ES: WellnessChallenge[] = [
    { id: '1', icon: 'plant', title: 'Mañana Consciente de 7 Días', description: 'Completa un check-in cada mañana durante una semana.', reward: '+50 Puntos', progress: 85, status: 'active' },
    { id: '2', icon: 'wind', title: 'Explorador de Respiración', description: 'Prueba las 3 técnicas de respiración.', reward: 'Insignia "Respira Fácil"', progress: 33, status: 'active' },
    { id: '3', icon: 'users-three', title: 'Contribuidor Comunitario', description: 'Envía 10 mensajes de apoyo en el Círculo de Apoyo.', reward: '+100 Puntos', progress: 50, status: 'active' },
    { id: '4', icon: 'moon', title: 'Sueño Consistente', description: 'Registra la calidad de tu sueño por 5 días seguidos.', reward: 'Insignia "Estrella Dormilona"', progress: 100, status: 'completed' },
    { id: '5', icon: 'book-open', title: 'Viaje del Diario', description: 'Escribe en tu diario 3 veces.', reward: '+20 Puntos', progress: 100, status: 'completed' },
];

export const getChallenges = (lang: Language): WellnessChallenge[] => {
    return lang === 'es' ? MOCK_CHALLENGES_ES : MOCK_CHALLENGES_EN;
}


const JOURNAL_PROMPTS_EN: string[] = [
    "What brought you a moment of joy today?",
    "What's one thing you're proud of accomplishing recently?",
    "Describe a challenge you're currently facing.",
    "What are you looking forward to this week?",
    "What's one small thing you can do to be kind to yourself today?",
    "If you could let go of one worry, what would it be?",
    "What's a simple pleasure you enjoyed recently?",
    "Who is someone you're grateful for, and why?",
];

const JOURNAL_PROMPTS_ES: string[] = [
    "¿Qué te trajo un momento de alegría hoy?",
    "¿De qué logro reciente te sientes orgulloso/a?",
    "Describe un desafío que estés enfrentando actualmente.",
    "¿Qué esperas con ilusión esta semana?",
    "¿Qué pequeña cosa puedes hacer hoy para ser amable contigo mismo/a?",
    "Si pudieras dejar ir una preocupación, ¿cuál sería?",
    "¿Qué simple placer disfrutaste recientemente?",
    "¿Por quién estás agradecido/a y por qué?",
];

export const getJournalPrompts = (lang: Language): string[] => {
    return lang === 'es' ? JOURNAL_PROMPTS_ES : JOURNAL_PROMPTS_EN;
};