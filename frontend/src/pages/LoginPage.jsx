import { useState } from "react"
import { Eye, EyeOff, FileCheck, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "individual", // Default role
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        console.log("Login form submitted:", formData)
        setIsLoading(false)

        // Redirect based on role
        let dashboardPath = "/individual-dashboard"
        if (formData.role === "business") {
          dashboardPath = "/business-dashboard"
        } else if (formData.role === "government") {
          dashboardPath = "/government-dashboard"
        }

        handleNavigation(dashboardPath)
      }, 1500)
    }
  }

  const handleNavigation = (path) => {
    setIsNavigating(true)
    setTimeout(() => {
      setIsNavigating(false)
      navigate(path)
    }, 1500)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileCheck className="h-6 w-6 text-blue-600" />
          <span>PermitEase</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to your PermitEase account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/forgot-password")
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Account Type <span className="text-blue-600">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="individual">Individual Citizen</option>
                <option value="business">Business Entity</option>
                <option value="government">Government Employee</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">Select your account type to access the appropriate dashboard</p>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018s7 3.14 7 7.018c0 3.878-3.132 7.018-7 7.018zm-1.834-9.231l-2.105 2.1 2.105 2.099 1.501-1.498-1.506-1.504 1.506-1.498-1.501-1.497zm2.08-1.494l1.5 1.498-1.5 1.497 1.505 1.504-1.505 1.498 1.5 1.497 2.105-2.099-2.105-2.099z" />
                </svg>
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12.001H10.4383V9.798C10.4383 7.29 11.9313 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.561H15.1923C13.9503 8.561 13.5623 9.333 13.5623 10.124V11.999H16.3363L15.8933 14.89H13.5613V21.879C18.3413 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5223 2 12.0003 2Z" />
                </svg>
              </button>
              <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.3534 12.7241C21.3534 12.0507 21.2996 11.3764 21.185 10.7152H12.2461V14.3171H17.3849C17.1696 15.4086 16.4782 16.3298 15.4607 16.9283V19.2984H18.3742C20.1436 17.6739 21.3534 15.4211 21.3534 12.7241Z" />
                  <path d="M12.2462 21.4999C14.723 21.4999 16.7984 20.6209 18.3782 19.2984L15.4647 16.9283C14.6273 17.4938 13.5326 17.8322 12.2501 17.8322C9.77683 17.8322 7.68359 16.1584 6.97345 13.9021H3.95898V16.3531C5.52857 19.4562 8.62923 21.4999 12.2462 21.4999Z" />
                  <path d="M6.9695 13.9021C6.784 13.3367 6.68144 12.7332 6.68144 12.1125C6.68144 11.4919 6.784 10.8884 6.9695 10.323V7.87207H3.95502C3.30343 9.17934 2.92188 10.6437 2.92188 12.1125C2.92188 13.5814 3.30343 15.0457 3.95502 16.353L6.9695 13.9021Z" />
                  <path d="M12.2462 6.39287C13.5866 6.39287 14.7887 6.86229 15.7379 7.76851L18.3226 5.18387C16.7945 3.77226 14.7192 2.9375 12.2462 2.9375C8.62923 2.9375 5.52857 4.98121 3.95898 8.08434L6.97345 10.5353C7.68359 8.27901 9.77683 6.39287 12.2462 6.39287Z" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/register")
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>

      {/* Loading Modal */}
      <Backdrop
        open={isNavigating}
        style={{
          zIndex: 1300,
          color: "#fff",
        }}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="primary" />
          <p className="mt-4 text-lg font-medium text-white">Loading...</p>
        </div>
      </Backdrop>
    </div>
  )
}
