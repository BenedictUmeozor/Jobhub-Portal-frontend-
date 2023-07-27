import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { EmployerJobContextProvider } from "./contexts/employerJobContext.jsx";
import { ApplicationContextProvider } from "./contexts/applicationContext.jsx";
import { JobContextProvider } from "./contexts/jobContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JobContextProvider>
      <AuthContextProvider>
        <EmployerJobContextProvider>
          <ApplicationContextProvider>
            <App />
          </ApplicationContextProvider>
        </EmployerJobContextProvider>
      </AuthContextProvider>
    </JobContextProvider>
  </React.StrictMode>
);
