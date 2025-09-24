<div align="center">
  <h1>🌸 Inner Bloom: Your Wellness Companion</h1>
  <p><strong>A privacy-first, AI-powered sanctuary for mental wellness and self-reflection.</strong></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini">
</p>

Inner Bloom is an innovative mini-app that combines mental wellness, gamification, and AI-powered insights to create a supportive, community-oriented ecosystem for mental health. It's designed as a safe, private space for users to check in with their feelings, practice mindfulness, reflect on their thoughts with AI-powered guidance, and connect with a supportive community.

![Inner Bloom Application Preview](https://i.imgur.com/Zq3Yt4f.gif)
*(Live demo of the application's core features)*

---

## ✨ Core Features

-   **🧠 Daily Check-ins:** Log your mood, energy, sleep, and gratitude to track wellness over time.
-   **✍️ AI-Powered Journal:** Receive compassionate, insightful reflections on your journal entries from a Gemini-powered AI.
-   **💨 Guided Breathing Exercises:** A curated list of breathing techniques to find calm and focus.
-   **🤝 Support Circle:** An anonymous chat space to share feelings and receive community support.
-   **🛋️ AI Psychoanalysis Sessions:** Engage in a 40-minute, AI-guided session to explore your thoughts deeply.
-   **📜 Session History:** Review AI-powered summaries of past psychoanalysis sessions to track your journey.
-   **📊 Progress Tracking:** Visualize your mood, energy, and sleep trends and celebrate wellness milestones.
-   **🏆 Wellness Challenges:** Complete challenges to build healthy habits and earn points.
-   **🌳 Gamified Experience:** Grow your "Wellness Tree" with a daily streak and earn points.
-   **🌐 Bilingual Support:** Fully available in English and Spanish.
-   **🎨 Light & Dark Mode:** A beautiful, adaptive UI for any time of day.

## 🤖 Key Features in Detail

### AI Psychoanalyst & Journal
Inner Bloom leverages the Google Gemini API to provide two unique features:
-   **The Journal:** After writing an entry, users can request a reflection. The AI, acting as a compassionate companion, offers a brief, supportive perspective on the user's thoughts.
-   **40-Minute Sessions:** Users can engage in a timed, one-on-one session with an AI psychoanalyst. The AI maintains context, asks guiding questions, and helps the user explore their thoughts. At the end, a concise summary of the session is automatically generated and saved.

### The Wellness Tree
To encourage consistency, the app features a "Wellness Tree" that grows as the user maintains their daily check-in streak. It starts as a sprout and flourishes into a full tree, serving as a beautiful visual representation of the user's commitment to their well-being.

### Community Support Circle
An anonymous and safe space where users can share their thoughts and feelings with the community. Other users can react with empathy emojis (🤗, 🙏, ❤️) and "reward" helpful messages with a star, fostering a positive and supportive environment.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally for development and testing.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/inner-bloom.git
    cd inner-bloom
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    The application requires a Google Gemini API key.
    -   Create a `.env` file in the project root.
    -   Add your API key to it:
        ```
        API_KEY="YOUR_GEMINI_API_KEY_HERE"
        ```
    > You can generate a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey). The project is already configured with a `vite.config.ts` to correctly load this key.

### Running the Application

1.  **Start the Development Server**
    ```bash
    npm run dev
    ```

2.  **Open in Browser**
    Navigate to `http://localhost:5173` (or the port specified in your terminal).

---

## 🔐 Authentication Model

This application uses a **simulated local authentication system** to provide a user-specific experience.

-   **Mechanism:** User identity is stored in the browser's `localStorage`. All wellness data (streaks, points, session summaries, etc.) is also saved in `localStorage`, keyed to this user identifier.
-   **Limitations:** This is a **frontend-only simulation**. There is no backend server. All data lives exclusively in the user's browser and will be lost if the browser data is cleared.
-   **Production Recommendation:** For a production-ready application, this local system should be replaced with a proper backend service (e.g., Firebase, Supabase) for secure user authentication and persistent, cross-device data storage.

## 📂 Project Structure

The project follows a standard component-based architecture, organized for clarity and scalability.

```
/src
├── components/     # UI components for each feature (Dashboard, Journal, etc.)
├── contexts/       # React Contexts for global state (Auth, Language, Toast)
├── hooks/          # Custom React hooks (e.g., useUserSpecificStorage)
├── services/       # API service wrappers (e.g., geminiService.ts)
├── App.tsx         # Main component, handles routing and global state logic
├── constants.ts    # Mock data and application-wide constants
├── translations.ts # i18n strings for English & Spanish
├── types.ts        # Core TypeScript type definitions
└── index.tsx       # Application entry point
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License & Author

This project is licensed under the MIT License.

Made with ❤️ by **Ronin Gang Studio**.
