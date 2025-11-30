# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture
Vite + React 19 single-page application (frontend-only). Entry: `src/main.jsx` renders `App.jsx` to `#root` in `index.html`.

Key structure:
- `src/components/`: Section components (Header, Hero, About, Services, MissionVision, Gallery, Contact, Footer).
- `src/components/3D/`: Three.js scenes (Scene3D, AnimatedBlob) used in Hero.
- `src/context/ThemeContext.jsx`: Theme management.
- `src/theme/theme.js`: Theme definitions.
- Styling: MUI (@mui/material), Emotion.
- Animations: Framer Motion, React Spring (@react-spring/three).
- 3D: @react-three/fiber, @react-three/drei.
- Other: Swiper (sliders), react-scroll.

Data flow: App.jsx composes sections; theme via Context; 3D canvas in Hero.

## Development Commands
- `npm run dev`: Start Vite dev server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview production build.

No tests configured.
