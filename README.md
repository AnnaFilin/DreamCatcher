# Dreamcatcher

**Dreamcatcher** is a web application for recording and reflecting on dreams, with optional AI-generated interpretations.  
It was built as both a personal tool and a portfolio project — combining solid frontend engineering, thoughtful UX design, and structured integration of AI features.

The goal is not only to record dreams, but to help users notice recurring motifs, track moments of lucidity, and strengthen self-awareness — making lucid dreaming more attainable through consistent journaling and reflection.

---

## Features
- Dream journaling with tagging (lucid / vividness)
- Voice input with OpenAI Whisper for quick capture
- AI interpretation using GPT-4 with Jungian archetype structures
- Motif analysis with shared database enrichment
- Multilingual interface (English, Russian, Hebrew)
- Firebase authentication (Google; Email/Password planned)
- Responsive design for desktop and mobile

---

### Screenshots

**Home Screen (with floating motifs)**  
![Home Screen](./screenshots/home.png)

**Dream Interpretation Modal**  
![Dream Modal](./screenshots/modal.png)

---

## About the AI

The AI features are part of the core application architecture — not plug-and-play add-ons.

**GPT-4 is used for two main purposes**:

1. **Dream interpretation** — generating context-aware insights from dream text using custom prompts and archetype structures inspired by Jungian theory, refined and adapted specifically for this app.
2. **Motif analysis** — identifying and classifying key motifs from dreams into archetypal categories, supplementing missing motifs when necessary, and maintaining a shared motif database. Common motifs from this database appear only on the welcome screen for non-registered users, each with a temporary AI-generated Jungian interpretation.

Whisper API is used for accurate voice-to-text transcription.

During development, generative AI tools were also used as assistants for prototyping, refining text, and designing AI prompts — but all architecture, logic, and UI implementation were coded manually.

---

## Tech Stack

- **Framework**: React + Vite
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS + custom theming
- **Routing**: React Router (with protected routes)
- **Internationalization**: react-i18next
- **Backend/Auth**: Firebase (Auth — Google, planned Email/Password + password reset; Firestore)
- **AI APIs**: OpenAI GPT-4 + Whisper
- **Deployment**: Vercel

---

## Live Project

You can explore the live version here:  
[https://www.dreamcatcherlog.app/](https://www.dreamcatcherlog.app/)

---

## Demo Video

🎥 Recorded demo (2.5 min): [Watch on YouTube](https://youtu.be/77Ad7wEgHjI)

This demo shows the full flow:
- Guest view → shared motifs (before sign-up)
- Sign-up / sign-in
- Adding a dream (voice or text)
- AI interpretation
- Personal motifs and history

> Note: Recorded on desktop. Mobile layout may differ (e.g. iPhone SE). Some features require microphone/dictation permissions.

---

## Known Issues / Notes
- Layout may break on small devices (e.g. iPhone SE)
- Some features require microphone/dictation permissions
- Email/password authentication not yet implemented

---

## GitHub Repository

The source code is available on GitHub:  
[https://github.com/AnnaFilin/DreamCatcher](https://github.com/AnnaFilin/DreamCatcher)

---

## Local Setup (optional)

To run locally:

```bash
npm install
npm run dev
```

You will need your own Firebase and OpenAI API credentials for AI features and authentication.

---

## Future Plans
- **Analytics:** dream frequency graphs, sleep time tracking, personal motif dashboard, global motif trends
- **AI & Content:** refined motif analysis, full multilingual support, lucid dreaming resources hub
- **UX & Mobile:** improved responsive design, dedicated shared motifs page, iOS/Android app, user notifications
- **Auth & Security:** email/password sign-in, password reset, backend proxy for API security
- **Engineering:** UI/UX refinements, performance optimization, code refactoring, automated testing

---

## Author
Designed, coded, and maintained by **Anna Filin**, a frontend developer with 6+ years of experience (Vue, React, SwiftUI).

**My role in Dreamcatcher:**
- Frontend engineering (React + Vite + Redux Toolkit + TailwindCSS)
- UI/UX design and responsive layout
- AI integration (OpenAI GPT-4, Whisper API, custom archetype prompts)
- Firebase setup (Auth, Firestore, deployment via Vercel)
- Project architecture, state management, and feature development

I also used generative AI tools to accelerate prototyping, refine text, and design AI prompts — but all architecture, logic, and UI implementation were coded manually.

