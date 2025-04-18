"use client"

import { FileCheck, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function RegistrationPending() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      <div className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileCheck className="h-6 w-6 text-blue-600" />
          <span>PermitEase</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-blue-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Registration Submitted</h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
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
                  Your government employee account registration has been submitted and is pending approval from your
                  supervisor.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Thank you for registering with PermitEase. Your account is currently pending approval from your department
            supervisor. You will receive an email notification once your account has been approved.
          </p>

          <p className="text-gray-600 mb-8">
            If you have any questions or need assistance, please contact our support team at{" "}
            <a href="mailto:support@permitease.gov.ph" className="text-blue-600 hover:underline">
              support@permitease.gov.ph
            </a>
          </p>

          <div className="flex justify-center">
            <Link
              to="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
