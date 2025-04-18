"use client"

import { useState, useEffect } from "react"
import {
  CheckCircle,
  Clock,
  FileCheck,
  Search,
  Shield,
  Upload,
  Menu,
  X,
  ArrowRight,
  User,
  Building,
  Briefcase,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  const navlinks = [
    { name: "Home", url: "#home" },
    { name: "Features", url: "#features" },
    { name: "How It Works", url: "#how-it-works" },
    { name: "Benefits", url: "#benefits" },
    { name: "Contact", url: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavigation = (path) => {
    setIsNavigating(true)
    setTimeout(() => {
      setIsNavigating(false)
      navigate(path)
    }, 1500)
  }

  // Feature Card Component
  const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>
    )
  }

  // Step Card Component
  const StepCard = ({ number, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mb-4">
          {number}
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      </div>
    )
  }

  // Benefit Item Component
  const BenefitItem = ({ text }) => {
    return (
      <li className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <span className="text-sm md:text-base">{text}</span>
      </li>
    )
  }

  // Registration Path Card Component
  const RegistrationPathCard = ({ icon, title, description, onClick }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer">
        <div className="mb-4 p-4 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base mb-6">{description}</p>
        <button
          onClick={onClick}
          className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full"
        >
          Register <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col text-black">
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

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <FileCheck className="h-6 w-6 text-blue-600" />
            <span>PermitEase</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 mr-30">
            {navlinks.map((link, index) => (
              <a key={index} href={link.url} className="text-sm font-medium hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
            <div className="container mx-auto px-4 py-4 flex flex-col">
              {navlinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="py-3 text-sm font-medium border-b border-gray-100 hover:text-blue-600 transition-colors"
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              Simplifying Government <span className="text-blue-600">Permit Applications</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-600">
              PermitEase transforms the frustrating permit acquisition process in Philippine government agencies into a
              streamlined, transparent experience with AI-powered verification.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleNavigation("/register")}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Register Now <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Log In
              </button>
            </div>
            <div className="mt-12 relative w-full max-w-5xl rounded-lg border bg-white p-2 shadow-lg">
              <img
                src="https://placehold.co/1200x600/e6f0ff/1a56db?text=PermitEase+Dashboard"
                alt="PermitEase dashboard preview"
                className="rounded-md w-full"
              />
            </div>
          </div>
        </section>

        {/* Registration Paths Section */}
        <section id="registration-paths" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                Choose Your Registration Path
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Select the registration option that best fits your needs. PermitEase offers tailored experiences for
                individuals, businesses, and government employees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <RegistrationPathCard
                icon={<User className="h-10 w-10 text-blue-600" />}
                title="Individual Registration"
                description="For citizens applying for personal permits such as building permits, business permits, or special event permits."
                onClick={() => handleNavigation("/register/individual")}
              />
              <RegistrationPathCard
                icon={<Building className="h-10 w-10 text-blue-600" />}
                title="Business Registration"
                description="For companies and business entities that need to apply for commercial permits and licenses."
                onClick={() => handleNavigation("/register/business")}
              />
              <RegistrationPathCard
                icon={<Briefcase className="h-10 w-10 text-blue-600" />}
                title="Government Employee"
                description="For authorized agency staff who need access to process and approve permit applications."
                onClick={() => handleNavigation("/register/government")}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Powerful Features</h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                Everything you need to navigate government permit applications with ease
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FeatureCard
                icon={<Search className="h-10 w-10 text-blue-600" />}
                title="Intuitive Interface"
                description="Select your needed permit type and be guided through a simplified application process with clear steps and requirements."
              />
              <FeatureCard
                icon={<Upload className="h-10 w-10 text-blue-600" />}
                title="Smart Document Upload"
                description="Upload required documents through our user-friendly interface with clear instructions for each requirement."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-blue-600" />}
                title="AI-Powered Verification"
                description="Our GenAI system immediately analyzes documents for completeness, accuracy, and compliance with regulations."
              />
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-blue-600" />}
                title="Real-time Feedback"
                description="Receive instant feedback on issues like missing signatures or incomplete information before submission."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-blue-600" />}
                title="Application Tracking"
                description="Monitor your application status in real-time with transparent updates throughout the approval process."
              />
              <FeatureCard
                icon={<FileCheck className="h-10 w-10 text-blue-600" />}
                title="Digital Permits"
                description="Receive your approved permits digitally, eliminating the need for physical pickup in many cases."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">How PermitEase Works</h2>
              <p className="mt-4 text-base md:text-lg text-gray-600">
                A simple process designed to save you time and frustration
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <StepCard
                number="1"
                title="Select Permit Type"
                description="Choose from our comprehensive list of government permits and licenses available across Philippine agencies."
              />
              <StepCard
                number="2"
                title="Upload Documents"
                description="Follow our guided process to upload all required documents with our AI verification providing instant feedback."
              />
              <StepCard
                number="3"
                title="Track & Receive"
                description="Monitor your application status in real-time and receive your approved permit digitally or with pickup instructions."
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Why Choose PermitEase?</h2>
                <p className="mt-4 text-base md:text-lg text-gray-600">
                  Our platform transforms the traditionally frustrating permit process into a streamlined experience
                </p>
                <ul className="mt-8 space-y-4">
                  <BenefitItem text="Save time with a streamlined application process" />
                  <BenefitItem text="Reduce errors with AI-powered document verification" />
                  <BenefitItem text="Increase transparency in government processes" />
                  <BenefitItem text="Eliminate multiple trips to government offices" />
                  <BenefitItem text="Access clear guidance on all requirements" />
                  <BenefitItem text="Track your application status in real-time" />
                </ul>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="relative rounded-lg border bg-white p-2 shadow-lg mt-8 lg:mt-0">
                <img
                  src="https://placehold.co/800x600/e6f0ff/1a56db?text=PermitEase+Process"
                  alt="PermitEase application process"
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              Ready to Simplify Your Permit Process?
            </h2>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of citizens who have streamlined their government permit applications with PermitEase
            </p>
            <button
              onClick={() => handleNavigation("/register")}
              className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Register Now
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="text-black container px-4 md:px-6">
            <div className="px-5 grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                  <p className="text-[#71718B] md:text-xl">
                    Have questions about PermitEase? Our team is here to help.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <p>(02) 8XXX-XXXX</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <p>support@permitease.gov.ph</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="mt-2 flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your message"
                    />
                  </div>
                  <button className="bg-[#006AFF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="px-5 text-black container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 PermitEase. All rights reserved. A ServiceNow solution for Philippine government agencies.
          </p>
        </div>
      </footer>
    </div>
  )
}
