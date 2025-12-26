# Project Overview

This is a React-based web application for tracking payments. It provides a user-friendly interface for viewing payment progress and managing payment segments. The application is built with Vite, styled with a combination of Material-UI and Tailwind CSS, and uses Axios for API communication with a backend server.

## Technologies Used

- **Frontend:** React, React Router, Material-UI, Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Animation:** Framer Motion, React Spring
- **Carousels/Sliders:** Swiper

## Architecture

The application is structured as a single-page application (SPA) with the following key components:

- **`main.jsx`:** The entry point of the application, responsible for setting up the React environment, routing, and context providers.
- **`App.jsx`:** The main application component, which defines the routes for the landing page, login page, and dashboard.
- **`pages/`:** Contains the main pages of the application, including the landing page, login page, and dashboard.
- **`components/`:** Contains reusable UI components used throughout the application.
- **`api/`:** Contains the API service modules for interacting with the backend server.
- **`context/`:** Contains React context providers for managing application-wide state, such as authentication and theme.
- **`theme/`:** Contains the theme configuration for the application.

## Building and Running

### Prerequisites

- Node.js and npm (or a compatible package manager) must be installed.

### Development

To run the application in development mode, follow these steps:

1.  Install the dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

This will start the Vite development server and open the application in your default browser. The application will automatically reload when you make changes to the code.

### Production

To build the application for production, run the following command:

```bash
npm run build
```

This will create a `dist` directory with the optimized production build of the application.

To preview the production build locally, run:

```bash
npm run preview
```

## Development Conventions

### Linting

The project uses ESLint for code linting. To run the linter, use the following command:

```bash
npm run lint
```

### API Communication

The application communicates with a a backend server for data and authentication. The API endpoints are defined in the `src/api/` directory. The `vite.config.js` file is configured to proxy API requests to `https://back.gvnconsortium.com`.

### Authentication

Authentication is handled using a token-based system. The `AuthContext` provider manages the user's authentication state, and the `ProtectedRoute` component is used to protect routes that require authentication.

### Styling

The application uses a combination of Material-UI and Tailwind CSS for styling. The `tailwind.config.js` file contains the custom theme configuration for Tailwind CSS, and the `src/theme/` directory contains the theme configuration for Material-UI.
