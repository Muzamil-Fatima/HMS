import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContextProvider.jsx";
import DoctorContextProvider from "./context/DoctorContextProvider.jsx";
import AppContextProvider from "./context/AppContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
);
