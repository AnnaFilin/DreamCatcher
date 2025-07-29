import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { DreamProvider } from "./contexts/DreamProvider";

import Layout from "./layout/Layout.jsx";
import PublicLayout from "./layout/PublicLayout.jsx";
import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import About from "./pages/About.jsx";
import RegisterForm from "./features/auth/RegisterForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import "./index.css";
import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DreamProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/about" element={<About />} />

              <Route path="/register" element={<RegisterForm />} />
              <Route path="/welcome" element={<WelcomePage />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DreamProvider>
    </Provider>
  </React.StrictMode>
);
