# Project Overview

This is a single-page responsive website built with **React** and **Vite**. It is a modern, component-based application that showcases a company's services, gallery, and contact information.

## Main Technologies

*   **Framework**: [React](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **UI Components**: [Material-UI](https://mui.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Emotion](https://emotion.sh/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) & [React Spring](https://www.react-spring.dev/)
*   **Scrolling**: [React Scroll](https://github.com/fisshy/react-scroll)
*   **Linting**: [ESLint](https://eslint.org/)

## Architecture

The application follows a standard React project structure.

*   `src/`: Contains all the source code.
    *   `main.jsx`: The entry point of the application.
    *   `App.jsx`: The main component that defines the layout and structure of the single-page application.
    *   `components/`: Contains reusable React components.
    *   `context/`: Contains React context providers, such as the `ThemeContext` for light and dark modes.
    *   `theme/`: Contains the theme definitions for Material-UI.
    *   `assets/`: Contains static assets like images and SVGs.

The application is composed of several sections, each represented by a component (e.g., `Hero`, `About`, `Services`, `Gallery`, `Contact`). The `Header` component provides navigation between these sections using smooth scrolling.

# Building and Running

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the source code using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

# Development Conventions

## Theming

The project uses a custom theming solution built on top of Material-UI. The theme is defined in `src/theme/theme.js` and provides light and dark modes. The `ThemeContext` in `src/context/ThemeContext.jsx` manages the theme state and provides a function to toggle between the two modes.

## Component Structure

Components are organized in the `src/components/` directory. Each component is a separate `.jsx` file and is responsible for a specific part of the UI.

## Styling

The project uses a combination of styling solutions:

*   **Material-UI components**: For building the main UI structure.
*   **Tailwind CSS**: For utility-first CSS.
*   **Emotion**: For component-specific styles and theming.

This hybrid approach allows for both rapid development with utility classes and the creation of complex, themed components.
