"use client"

import { useState } from "react"
import { FileCheck, ArrowRight, ArrowLeft, Eye, EyeOff, Check, Building } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function RegisterBusiness() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessRegistrationNumber: "",
    industryType: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    website: "",
    businessAddress: "",
    city: "",
    province: "",
    postalCode: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    contactPersonPosition: "",
    contactPersonEmail: "",
    contactPersonPhone: "",
    taxIdentificationNumber: "",
    numberOfEmployees: "",
    yearEstablished: "",
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

    // Business Information validation
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required"
    if (!formData.businessRegistrationNumber.trim())
      newErrors.businessRegistrationNumber = "Registration number is required"
    if (!formData.industryType) newErrors.industryType = "Industry type is required"
    if (!formData.taxIdentificationNumber) newErrors.taxIdentificationNumber = "Tax ID number is required"

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

    // Address validation
    if (!formData.businessAddress) newErrors.businessAddress = "Business address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.province) newErrors.province = "Province is required"
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required"

    // Contact person validation
    if (!formData.contactPersonFirstName) newErrors.contactPersonFirstName = "Contact person's first name is required"
    if (!formData.contactPersonLastName) newErrors.contactPersonLastName = "Contact person's last name is required"
    if (!formData.contactPersonPosition) newErrors.contactPersonPosition = "Contact person's position is required"
    if (!formData.contactPersonEmail) {
      newErrors.contactPersonEmail = "Contact person's email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactPersonEmail)) {
      newErrors.contactPersonEmail = "Email is invalid"
    }
    if (!formData.contactPersonPhone) newErrors.contactPersonPhone = "Contact person's phone is required"

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
        console.log("Business registration form submitted:", formData)
        setIsLoading(false)
        handleNavigation("/business-dashboard")
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

  // Industry types
  const industryTypes = [
    "Agriculture, Forestry and Fishing",
    "Mining and Quarrying",
    "Manufacturing",
    "Electricity, Gas, Steam and Air Conditioning Supply",
    "Water Supply; Sewerage, Waste Management",
    "Construction",
    "Wholesale and Retail Trade",
    "Transportation and Storage",
    "Accommodation and Food Service Activities",
    "Information and Communication",
    "Financial and Insurance Activities",
    "Real Estate Activities",
    "Professional, Scientific and Technical Activities",
    "Administrative and Support Service Activities",
    "Public Administration and Defense",
    "Education",
    "Human Health and Social Work Activities",
    "Arts, Entertainment and Recreation",
    "Other Service Activities",
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
              <Building className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Business Registration</h1>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Please fill out the form below to create your business account. This will allow you to apply for business
            permits and licenses.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Business Information</h2>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your business name"
                />
                {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
              </div>

              <div>
                <label htmlFor="businessRegistrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  type="text"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.businessRegistrationNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter registration number"
                />
                {errors.businessRegistrationNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.businessRegistrationNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="taxIdentificationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Identification Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="taxIdentificationNumber"
                  name="taxIdentificationNumber"
                  type="text"
                  value={formData.taxIdentificationNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.taxIdentificationNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter TIN"
                />
                {errors.taxIdentificationNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.taxIdentificationNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="industryType"
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.industryType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select industry type</option>
                  {industryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.industryType && <p className="mt-1 text-sm text-red-600">{errors.industryType}</p>}
              </div>

              <div>
                <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-1">
                  Year Established
                </label>
                <input
                  id="yearEstablished"
                  name="yearEstablished"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter year established"
                />
              </div>

              <div>
                <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Employees
                </label>
                <input
                  id="numberOfEmployees"
                  name="numberOfEmployees"
                  type="number"
                  min="1"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of employees"
                />
              </div>

              {/* Contact Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Contact Information</h2>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email <span className="text-red-500">*</span>
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
                  placeholder="Enter business email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Phone <span className="text-red-500">*</span>
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
                  placeholder="Enter business phone"
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter business website"
                />
              </div>

              {/* Address Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Business Address</h2>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="businessAddress"
                  name="businessAddress"
                  type="text"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.businessAddress ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter business address"
                />
                {errors.businessAddress && <p className="mt-1 text-sm text-red-600">{errors.businessAddress}</p>}
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

              {/* Authorized Representative Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Authorized Representative</h2>
              </div>

              <div>
                <label htmlFor="contactPersonFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPersonFirstName"
                  name="contactPersonFirstName"
                  type="text"
                  value={formData.contactPersonFirstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactPersonFirstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.contactPersonFirstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPersonFirstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactPersonLastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPersonLastName"
                  name="contactPersonLastName"
                  type="text"
                  value={formData.contactPersonLastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactPersonLastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.contactPersonLastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPersonLastName}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactPersonPosition" className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPersonPosition"
                  name="contactPersonPosition"
                  type="text"
                  value={formData.contactPersonPosition}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactPersonPosition ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter position"
                />
                {errors.contactPersonPosition && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPersonPosition}</p>
                )}
              </div>

              <div>
                <label htmlFor="contactPersonEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPersonEmail"
                  name="contactPersonEmail"
                  type="email"
                  value={formData.contactPersonEmail}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactPersonEmail ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter email"
                />
                {errors.contactPersonEmail && <p className="mt-1 text-sm text-red-600">{errors.contactPersonEmail}</p>}
              </div>

              <div>
                <label htmlFor="contactPersonPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactPersonPhone"
                  name="contactPersonPhone"
                  type="tel"
                  value={formData.contactPersonPhone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactPersonPhone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.contactPersonPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPersonPhone}</p>}
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
