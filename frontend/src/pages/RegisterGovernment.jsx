"use client"

import { useState } from "react"
import { FileCheck, ArrowRight, ArrowLeft, Eye, EyeOff, Check, Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function RegisterGovernment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    employeeId: "",
    department: "",
    position: "",
    supervisorName: "",
    supervisorEmail: "",
    supervisorPhone: "",
    governmentAgency: "",
    officeAddress: "",
    city: "",
    province: "",
    postalCode: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Phone number validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    }

    // Government employee specific validation
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required"
    if (!formData.department) newErrors.department = "Department is required"
    if (!formData.position) newErrors.position = "Position is required"
    if (!formData.governmentAgency) newErrors.governmentAgency = "Government agency is required"

    // Supervisor information validation
    if (!formData.supervisorName) newErrors.supervisorName = "Supervisor name is required"
    if (!formData.supervisorEmail) {
      newErrors.supervisorEmail = "Supervisor email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.supervisorEmail)) {
      newErrors.supervisorEmail = "Supervisor email is invalid"
    }

    // Office address validation
    if (!formData.officeAddress) newErrors.officeAddress = "Office address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.province) newErrors.province = "Province is required"
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required"

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
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
        console.log("Government employee registration form submitted:", formData)
        setIsLoading(false)
        // Show pending approval message
        handleNavigation("/registration-pending")
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    let label = ""
    let color = ""

    switch (strength) {
      case 0:
      case 1:
        label = "Weak"
        color = "bg-red-500"
        break
      case 2:
      case 3:
        label = "Medium"
        color = "bg-yellow-500"
        break
      case 4:
      case 5:
        label = "Strong"
        color = "bg-green-500"
        break
      default:
        label = ""
        color = ""
    }

    return { strength: (strength / 5) * 100, label, color }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  // Government agencies
  const governmentAgencies = [
    "Department of Agriculture",
    "Department of Budget and Management",
    "Department of Education",
    "Department of Energy",
    "Department of Environment and Natural Resources",
    "Department of Finance",
    "Department of Foreign Affairs",
    "Department of Health",
    "Department of Human Settlements and Urban Development",
    "Department of Information and Communications Technology",
    "Department of the Interior and Local Government",
    "Department of Justice",
    "Department of Labor and Employment",
    "Department of National Defense",
    "Department of Public Works and Highways",
    "Department of Science and Technology",
    "Department of Social Welfare and Development",
    "Department of Tourism",
    "Department of Trade and Industry",
    "Department of Transportation",
    "National Economic and Development Authority",
    "Local Government Unit",
    "Other Government Agency",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileCheck className="h-6 w-6 text-blue-600" />
          <span>PermitEase</span>
        </Link>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Link to="/register" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Link>
            <div className="flex items-center ml-4">
              <Briefcase className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Government Employee Registration</h1>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Government employee accounts require verification and approval from your department supervisor. Your
                  account will be pending until approved.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Personal Information</h2>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>

              {/* Employment Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Employment Information</h2>
              </div>

              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.employeeId ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your employee ID"
                />
                {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
              </div>

              <div>
                <label htmlFor="governmentAgency" className="block text-sm font-medium text-gray-700 mb-1">
                  Government Agency <span className="text-red-500">*</span>
                </label>
                <select
                  id="governmentAgency"
                  name="governmentAgency"
                  value={formData.governmentAgency}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.governmentAgency ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select government agency</option>
                  {governmentAgencies.map((agency) => (
                    <option key={agency} value={agency}>
                      {agency}
                    </option>
                  ))}
                </select>
                {errors.governmentAgency && <p className="mt-1 text-sm text-red-600">{errors.governmentAgency}</p>}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your department"
                />
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your position"
                />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
              </div>

              {/* Supervisor Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Supervisor Information</h2>
              </div>

              <div>
                <label htmlFor="supervisorName" className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="supervisorName"
                  name="supervisorName"
                  type="text"
                  value={formData.supervisorName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.supervisorName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter supervisor's name"
                />
                {errors.supervisorName && <p className="mt-1 text-sm text-red-600">{errors.supervisorName}</p>}
              </div>

              <div>
                <label htmlFor="supervisorEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="supervisorEmail"
                  name="supervisorEmail"
                  type="email"
                  value={formData.supervisorEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.supervisorEmail ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter supervisor's email"
                />
                {errors.supervisorEmail && <p className="mt-1 text-sm text-red-600">{errors.supervisorEmail}</p>}
              </div>

              <div>
                <label htmlFor="supervisorPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor Phone
                </label>
                <input
                  id="supervisorPhone"
                  name="supervisorPhone"
                  type="tel"
                  value={formData.supervisorPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter supervisor's phone"
                />
              </div>

              {/* Office Address Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Office Address</h2>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="officeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="officeAddress"
                  name="officeAddress"
                  type="text"
                  value={formData.officeAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.officeAddress ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter office address"
                />
                {errors.officeAddress && <p className="mt-1 text-sm text-red-600">{errors.officeAddress}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province <span className="text-red-500">*</span>
                </label>
                <input
                  id="province"
                  name="province"
                  type="text"
                  value={formData.province}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.province ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter province"
                />
                {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter postal code"
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
              </div>

              {/* Account Security Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Account Security</h2>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Create a password"
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

                {formData.password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Password strength: <span className="font-medium">{passwordStrength.label}</span>
                    </p>

                    <div className="mt-2 grid grid-cols-1 gap-1">
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                            formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {formData.password.length >= 8 && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                            /[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {/[A-Z]/.test(formData.password) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span>At least 1 uppercase letter</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                            /[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {/[0-9]/.test(formData.password) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span>At least 1 number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Link
                to="/register"
                className="px-6 py-2 border border-gray-300 rounded-md mr-4 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center gap-2"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
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
