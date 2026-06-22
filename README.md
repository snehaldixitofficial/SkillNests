# SkillNests

**Education that completes — and not competes.**

SkillNests is a modern, unified educational platform designed to provide a holistic and non-competitive learning environment for students. Built with a focus on deep understanding, community, and beautifully crafted design, SkillNests goes beyond traditional test prep by emphasizing real skills and collaborative growth.

---

## 🌟 Key Features

*   **📚 Academic Excellence (PYQs)**
    *   Subject, class, and year drill-down for past-year papers.
    *   Clean, distraction-free PDF viewer.
*   **📝 Study Notes**
    *   Curated, chapter-wise notes that are actually pleasant to read.
*   **🤝 Meeting Hub**
    *   Global sessions hosted by admins and peer-hosted study rooms.
    *   Seamless Google Meet and Zoom integration.
*   **📅 Schedule & Events**
    *   Keep track of upcoming classes, academic milestones, and community events.
*   **🧭 Career Guidance**
    *   Live class links and deep-dives into various career paths.
*   **🏆 Olympiads**
    *   Resources focused on depth of knowledge rather than just medals.
*   **⚖️ MUN & Debate**
    *   "Voice an opinion. Defend it gently." Resources and prep for Model United Nations.
*   **🎨 Skill Share & Coding Campus**
    *   A unified space to learn and build together.
    *   **Community Skills:** Users can upload tutorials, share passions (like watercolor, chess, or calligraphy), and host live classes.
    *   **Coding Workshops:** Admin-hosted live coding workshops. No tutorial hell—just real code.

## 🛠️ Tech Stack

*   **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **Routing & SSR:** [TanStack Start](https://tanstack.com/router) / [TanStack Router](https://tanstack.com/router)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with a custom design system focusing on rich aesthetics, glassmorphism, and micro-animations.
*   **Backend & DB:** [Firebase](https://firebase.google.com/) (Auth, Firestore DB)
*   **Payments:** [Razorpay](https://razorpay.com/) integration for premium unlocks.
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🎨 Design Philosophy

SkillNests is built to break away from the sterile, rigid designs of traditional EdTech platforms. 
*   **Warm Aesthetics:** Utilizing champagne, rose gold, and deep phoenix tones instead of stark blacks and whites.
*   **Fluidity:** Smooth gradients, subtle grain overlays, and glassmorphic panels ensure the platform feels alive and responsive.
*   **Non-Competitive UI:** No leaderboards, no anxiety-inducing countdowns. The interface is deliberately designed to feel like a "nest"—a safe place to grow.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your Firebase and Razorpay keys:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

*Built with ❤️ for a better way to learn.*
