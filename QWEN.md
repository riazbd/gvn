# GVN Consortium Web Application

## Project Overview

GVN is a React-based web application built with Vite that serves as a client portal for the GVN Consortium. This application allows users to manage their profiles, track payment segments, and access various services. The application communicates with a backend API at `https://gvnconsortium.com/api/` to handle authentication, user data, and business logic.

### Key Technologies
- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **UI Framework**: Material-UI (MUI) 7.3.5 with Emotion
- **Styling**: Tailwind CSS with custom configurations
- **Routing**: React Router DOM 7.10.0
- **HTTP Client**: Axios 1.13.2
- **Animations**: Framer Motion 12.23.24 and React Spring 10.0.3
- **Icons**: Lucide React 0.555.0 and MUI Icons

### Architecture
- **State Management**: Context API for authentication and theme management
- **API Integration**: Axios with request/response interceptors for authentication handling
- **Authentication**: JWT-based authentication with local storage persistence
- **Frontend Components**: Organized in `src/components`, `src/pages`, `src/context`, and `src/api`
- **Theme Management**: Custom theme context with Material-UI integration

### File Structure
```
src/
├── api/                   # API service files and configuration
├── components/           # Reusable UI components (Header, Footer, etc.)
├── context/              # React Context providers (Auth, Theme)
├── hooks/                # Custom React hooks (if any)
├── pages/                # Page-level components (Landing, Login, Dashboard)
├── theme/                # Theme configuration files (if any)
├── App.jsx               # Main application router
├── main.jsx              # Application entry point with providers
└── index.css             # Global styles and Tailwind directives
```

## Building and Running

### Prerequisites
- Node.js 18+ (recommended LTS version)
- npm or yarn package manager

### Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```
The application will start on `http://localhost:5173` with hot module replacement (HMR).

3. **Build for Production**
```bash
npm run build
```
This creates an optimized production build in the `dist/` directory.

4. **Preview Production Build**
```bash
npm run preview
```
Serves the production build locally for testing purposes.

5. **Lint Code**
```bash
npm run lint
```
Checks code for linting errors using ESLint.

### API Proxy Configuration
The Vite configuration includes a proxy to forward `/api` requests to `http://127.0.0.1:8000`, which is the backend development server. This allows for seamless development without CORS issues.

## Development Conventions

### Component Structure
- Components are organized by feature/functionality
- Page components are in `src/pages/` and represent route destinations
- Reusable UI components are in `src/components/`
- Context providers wrap the application in `src/main.jsx`

### Styling
- Tailwind CSS is used for utility-first styling
- Custom colors and configurations are defined in `tailwind.config.js`
- Global styles are in `src/index.css`
- Material-UI components are used for complex UI elements

### Authentication Flow
1. User credentials are sent to `/api/client/login`
2. JWT token is received and stored in localStorage
3. Token is automatically attached to API requests via Axios interceptors
4. When token is present, user is considered authenticated
5. Logout removes the token from localStorage and calls the API logout endpoint

### API Service Layer
- API client configured with base URL `/api/client`
- Request interceptors automatically attach Authorization header
- Response interceptors handle errors and token expiration
- Service functions are organized by domain (authService, paymentService)

### Error Handling
- Axios interceptors intercept API responses for error handling
- Protected routes redirect unauthenticated users to login
- LocalStorage token is removed on authentication failures

## Environment and Configuration

### API Endpoints
- Production API: `https://gvnconsortium.com/api/`
- Development proxy: `http://127.0.0.1:8000/api/` via Vite proxy

### Key Features
- Landing page with hero, about, services, gallery, mission/vision, and contact sections
- User authentication (login/logout functionality)
- Protected dashboard for authenticated users
- Payment segment tracking and status management
- Responsive design for mobile and desktop
- Custom theme management system
- Loading screens and animations for better UX

## Testing and Quality

### Linting
ESLint is configured with React-specific rules and is run via `npm run lint`.

### Development Tools
- Vite for fast development server with HMR
- React Fast Refresh for quicker iteration
- Tailwind CSS for styling
- Material-UI for component library

## Deployment

The application is configured for deployment with Vite's production build. The build command compiles all assets, optimizes for production, and outputs to the `dist/` directory which can be served by any static web server.

## Special Notes

- The application includes an API interceptor setup to handle token refresh and authentication errors
- The project includes a Postman collection (`Gvn live.postman_collection.json`) that documents API endpoints
- There's a loading screen with 2.5s delay on the landing page for user experience
- The application uses both Tailwind CSS and Material-UI for styling, allowing for flexible UI design
- Payment segments and statuses are tracked in the dashboard for users