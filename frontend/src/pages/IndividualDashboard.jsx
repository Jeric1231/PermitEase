"use client"

import { useState, useEffect } from "react"
import { FileCheck, Plus, Clock, CheckCircle, AlertCircle, FileText, Search, Bell, User, ChevronDown, BarChart2, Calendar, Folder, Settings, LogOut, Menu, X, ArrowRight, Filter, Home, CreditCard, HelpCircle } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function IndividualDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigate = useNavigate()

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "individual",
    avatar: null,
  }

  // Mock recent applications data
  const recentApplications = [
    {
      id: "APP-2023-001",
      type: "Building Permit",
      status: "In Progress",
      dateSubmitted: "2023-04-15",
      dueDate: "2023-04-30",
      progress: 65,
    },
    {
      id: "APP-2023-002",
      type: "Driver's License Renewal",
      status: "Under Review",
      dateSubmitted: "2023-04-10",
      dueDate: "2023-04-25",
      progress: 40,
    },
    {
      id: "APP-2023-003",
      type: "Special Event Permit",
      status: "Approved",
      dateSubmitted: "2023-03-20",
      dueDate: "2023-04-05",
      progress: 100,
    },
  ]

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Application Approved",
      message: "Your Special Event Permit application has been approved.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Document Required",
      message: "Please upload your valid ID for your Building Permit application.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Application Under Review",
      message: "Your Driver's License Renewal application is now under review.",
      time: "3 days ago",
      read: true,
    },
  ]

  // Mock permit types for individuals
  const permitTypes = [
    {
      id: "building-permit",
      name: "Building Permit",
      description: "Apply for permits related to residential construction",
      icon: <Home className="h-8 w-8 text-blue-600" />,
    },
    {
      id: "drivers-license",
      name: "Driver's License",
      description: "Apply for new or renew your existing driver's license",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
    },
    {
      id: "special-event",
      name: "Special Event Permit",
      description: "Apply for permits for gatherings and special events",
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
    },
    {
      id: "residence-certificate",
      name: "Residence Certificate",
      description: "Apply for a certificate of residence",
      icon: <FileCheck className="h-8 w-8 text-blue-600" />,
    },
  ]

  // Mock upcoming payments
  const upcomingPayments = [
    {
      id: "PAY-2023-001",
      type: "Building Permit Fee",
      amount: "₱2,500.00",
      dueDate: "2023-05-15",
    },
    {
      id: "PAY-2023-002",
      type: "Driver's License Renewal Fee",
      amount: "₱585.00",
      dueDate: "2023-05-10",
    },
  ]

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (path) => {
    setIsNavigating(true)
    setTimeout(() => {
      setIsNavigating(false)
      navigate(path)
    }, 1000)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-yellow-600 bg-yellow-100"
      case "Under Review":
        return "text-blue-600 bg-blue-100"
      case "Approved":
        return "text-green-600 bg-green-100"
      case "Rejected":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Under Review":
        return <FileText className="h-4 w-4" />
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Navigation items for individual
  const navItems = [
    { name: "Dashboard", icon: <BarChart2 className="h-5 w-5" />, path: "/individual-dashboard" },
    { name: "My Applications", icon: <FileText className="h-5 w-5" />, path: "/applications" },
    { name: "Documents", icon: <Folder className="h-5 w-5" />, path: "/documents" },
    { name: "Payments", icon: <CreditCard className="h-5 w-5" />, path: "/payments" },
    { name: "Help Center", icon: <HelpCircle className="h-5 w-5" />, path: "/help" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      {/* Loading Modal */}
      <Backdrop
        open={isLoading || isNavigating}
        style={{
          zIndex: 1300,
          color: "#fff",
        }}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="primary" />
          <p className="mt-4 text-lg font-medium text-white">{isLoading ? "Loading dashboard..." : "Navigating..."}</p>
        </div>
      </Backdrop>

      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-2" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/individual-dashboard" className="flex items-center gap-2 font-bold text-xl">
              <FileCheck className="h-6 w-6 text-blue-600" />
              <span>PermitEase</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                        >
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                  <div className="p-2 text-center border-t">
                    <button className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
                onClick={toggleUserMenu}
                aria-label="User menu"
              >
                {user.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <span className="hidden md:block">{user.name}</span>
                <ChevronDown className="hidden md:block h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <div className="py-2 px-4 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-blue-600 mt-1">Individual Account</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                  </div>
                  <div className="py-1 border-t">
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside
          className={`bg-white shadow-md w-64 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-20 pt-16 md:pt-0 md:relative md:translate-x-0 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b md:pt-16">
            <p className="text-xs uppercase text-gray-500 font-semibold">Individual Portal</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      handleNavigation(item.path)
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
              <p className="text-gray-600 mt-1">
                Manage your personal permit applications and track their status from your dashboard.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Applications</p>
                    <h3 className="text-2xl font-bold mt-1">7</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-green-600">+1</span> from last month
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">2</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-red-600">+1</span> from last month
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Approved</p>
                    <h3 className="text-2xl font-bold mt-1">4</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-green-600">+2</span> from last month
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Upcoming Payments</p>
                    <h3 className="text-2xl font-bold mt-1">2</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-gray-600">Due this month</span>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">My Recent Applications</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </button>
                  <Link
                    to="/applications"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/applications")
                    }}
                  >
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Submitted
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Progress
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              application.status,
                            )}`}
                          >
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{application.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.dateSubmitted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                application.status === "Rejected"
                                  ? "bg-red-600"
                                  : application.status === "Approved"
                                    ? "bg-green-600"
                                    : "bg-blue-600"
                              }`}
                              style={{ width: `${application.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{application.progress}%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleNavigation(`/applications/${application.id}`)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Payments */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Upcoming Payments</h2>
                <Link
                  to="/payments"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/payments")
                  }}
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => handleNavigation(`/payments/${payment.id}`)}
                          >
                            Pay Now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Apply for New Permit */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Apply for a New Permit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {permitTypes.map((permit) => (
                  <div
                    key={permit.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleNavigation(`/apply/${permit.id}`)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-3">{permit.icon}</div>
                      <h3 className="font-medium mb-1">{permit.name}</h3>
                      <p className="text-sm text-gray-600">{permit.description}</p>
                      <button className="mt-4 text-blue-600 flex items-center gap-1 text-sm">
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/applications/new")}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>New Application</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/documents/upload")}
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Upload Documents</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/applications/track")}
                >
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Search className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span>Track Application</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/help")}
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <HelpCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>Get Help</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
