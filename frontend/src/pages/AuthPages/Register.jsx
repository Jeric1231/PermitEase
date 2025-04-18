import { useState } from "react"
import { FileCheck, ArrowRight, ArrowLeft, User, Building, Briefcase } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function Register() {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleNavigation = (path) => {
    setIsNavigating(true)
    setTimeout(() => {
      setIsNavigating(false)
      navigate(path)
    }, 1500)
  }

  // Registration Path Card Component
  const RegistrationPathCard = ({ icon, title, description, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="flex flex-col items-center text-center p-6 rounded-lg border bg-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="mb-4 p-4 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base mb-6">{description}</p>
        <button className="mt-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full">
          Register <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    )
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
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Choose Your Registration Path</h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Select the registration option that best fits your needs. PermitEase offers tailored experiences for
              individuals, businesses, and government employees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
            <Link to="/" className="inline-flex items-center mt-4 text-sm text-blue-600 hover:text-blue-500">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to home
            </Link>
          </div>
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
