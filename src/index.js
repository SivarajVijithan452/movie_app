import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app
import './index.css'; // Import global CSS styles
import reportWebVitals from './reportWebVitals'; // Import performance reporting utility
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider to handle routing
import router from './routes'; // Import the router configuration

// Create a root element for React to render the application into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Provide routing configuration */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Optional: Used to measure and report on performance metrics
