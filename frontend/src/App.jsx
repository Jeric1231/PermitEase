"use client"
import "./App.css"
import { AuthenticationProvider, useAuth } from "./context/authentication-context"
import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ForgotPasswordPage from "./pages/ForgetPasswordPage"
import Register from "./pages/AuthPages/Register"
import RegisterIndividual from "./pages/RegisterIndividual"
import RegisterBusiness from "./pages/RegisterBusiness"
import RegisterGovernment from "./pages/RegisterGovernment"
import RegistrationPending from "./pages/AuthPages/RegistrationPending"
import IndividualDashboard from "./pages/IndividualDashboard"
import BusinessDashboard from "./pages/BusinessDashboard"
import GovernmentDashboard from "./pages/GovernmentDashboard"

function App() {
  const RedirectIfAuthenticated = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated) {
      // Redirect based on user role
      if (user?.role === "business") {
        return <Navigate to="/business-dashboard" />
      } else if (user?.role === "government") {
        return <Navigate to="/government-dashboard" />
      } else {
        // Default to individual dashboard
        return <Navigate to="/individual-dashboard" />
      }
    }

    return children
  }

  const RequireAuth = ({ children }) => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <AuthenticationProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <LandingPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <LoginPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectIfAuthenticated>
                <ForgotPasswordPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register/individual"
            element={
              <RedirectIfAuthenticated>
                <RegisterIndividual />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register/business"
            element={
              <RedirectIfAuthenticated>
                <RegisterBusiness />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register/government"
            element={
              <RedirectIfAuthenticated>
                <RegisterGovernment />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/registration-pending"
            element={
              <RedirectIfAuthenticated>
                <RegistrationPending />
              </RedirectIfAuthenticated>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/individual-dashboard"
            element={
              // <RequireAuth>
              //   <IndividualDashboard />
              // </RequireAuth>
              <RedirectIfAuthenticated>
                <IndividualDashboard/>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/business-dashboard"
            element={
              // <RequireAuth>
              //   <BusinessDashboard />
              // </RequireAuth>
              <RedirectIfAuthenticated>
                <BusinessDashboard/>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/government-dashboard"
            element={
              // <RequireAuth>
              //   <GovernmentDashboard />
              // </RequireAuth>
              <RedirectIfAuthenticated>
                <GovernmentDashboard/>
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                {({ user }) => {
                  if (user?.role === "business") {
                    return <Navigate to="/business-dashboard" />
                  } else if (user?.role === "government") {
                    return <Navigate to="/government-dashboard" />
                  } else {
                    return <Navigate to="/individual-dashboard" />
                  }
                }}
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthenticationProvider>
  )
}

export default App
