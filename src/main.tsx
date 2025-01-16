import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { CookiesProvider } from "react-cookie";

import "./main.css";

import BaseLayout from "./pages/layouts/BaseLayout";
import ProtectedLayout from "./pages/layouts/ProtectedLayout";

import LoginPage from "./pages/LoginPage";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<LandingPage />} />

            <Route path="" element={<ProtectedLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
);

