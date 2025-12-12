// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// Pages
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";


// Components
import ProtectedRoute from "./auth/protectedRoutes";
import Layout from "./Layouts/MainLayout";
import AccountPage from "./pages/Account";
import HistoryPage from "./pages/History";
import RedirectPage from "./pages/RedirectPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================ */}
        {/* PUBLIC ROUTES - Accessible to everyone */}
        {/* ============================================ */}
        
        {/* Landing Page - Always accessible */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />

        {/* ============================================ */}
        {/* AUTH ROUTES - Only for non-authenticated users */}
        {/* ============================================ */}
        
        {/* Sign In Page */}
        <Route
          path="/sign-in"
          element={
            <>
              {/* If already signed in, redirect to home */}
              <SignedIn>
                <Navigate to="/home" replace />
              </SignedIn>
              {/* If not signed in, show sign in page */}
              <SignedOut>
                <SignInPage />
              </SignedOut>
            </>
          }
        />

        {/* Sign Up Page */}
        <Route
          path="/sign-up"
          element={
            <>
              {/* If already signed in, redirect to home */}
              <SignedIn>
                <Navigate to="/home" replace />
              </SignedIn>
              {/* If not signed in, show sign up page */}
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            </>
          }
        />

        {/* ============================================ */}
        {/* PROTECTED ROUTES - Only for authenticated users */}
        {/* ============================================ */}
        
        {/* Home Dashboard */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* History Page */}
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <Layout>
                <HistoryPage/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Settings Page */}
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <Layout>
                {/* <Settings /> - Create this component */}
                <div>Settings Page - Coming Soon</div>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Account Page */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Layout>
                <AccountPage/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ============================================ */}
        {/* FALLBACK ROUTE - 404 Not Found */}
        {/* ============================================ */}
        
        {/* Catch all undefined routes */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-[#FCF5EE] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-[#850E35] mb-4">404</h1>
                <p className="text-xl text-[#850E35]/70 mb-6">Page not found</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Go to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}