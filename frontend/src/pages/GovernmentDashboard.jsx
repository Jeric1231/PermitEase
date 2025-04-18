"use client"

import { useState, useEffect } from "react"
import {
  FileCheck,
  Clock,
  Search,
  Bell,
  User,
  ChevronDown,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowRight,
  Filter,
  Users,
  HelpCircle,
  ClipboardList,
  CheckSquare,
  XSquare,
  PieChart,
  MessageSquare,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

export default function GovernmentDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigate = useNavigate()

  // Mock user data
  const user = {
    name: "Maria Santos",
    email: "maria.santos@gov.ph",
    role: "government",
    avatar: null,
    department: "Department of Trade and Industry",
    position: "Permit Processing Officer",
    employeeId: "GOV-78901-2345",
  }

  // Mock pending applications data
  const pendingApplications = [
    {
      id: "APP-2023-001",
      applicantName: "John Doe",
      type: "Business Permit",
      dateSubmitted: "2023-04-15",
      daysInQueue: 5,
      priority: "High",
    },
    {
      id: "APP-2023-002",
      applicantName: "Acme Corporation",
      type: "Environmental Compliance Certificate",
      dateSubmitted: "2023-04-10",
      daysInQueue: 10,
      priority: "Medium",
    },
    {
      id: "APP-2023-003",
      applicantName: "Jane Smith",
      type: "Building Permit",
      dateSubmitted: "2023-04-18",
      daysInQueue: 2,
      priority: "High",
    },
    {
      id: "APP-2023-004",
      applicantName: "Tech Solutions Inc.",
      type: "Fire Safety Inspection Certificate",
      dateSubmitted: "2023-04-12",
      daysInQueue: 8,
      priority: "Low",
    },
  ]

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Application Assigned",
      message: "A new Business Permit application has been assigned to you.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Application Update",
      message: "Acme Corporation has uploaded the requested documents for their application.",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Supervisor Message",
      message: "Please review the backlog of applications by end of day.",
      time: "3 days ago",
      read: true,
    },
  ]

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Approved",
      applicationId: "APP-2023-005",
      applicantName: "Global Enterprises",
      type: "Business Permit",
      timestamp: "Today at 10:30 AM",
    },
    {
      id: 2,
      action: "Requested Additional Documents",
      applicationId: "APP-2023-002",
      applicantName: "Acme Corporation",
      type: "Environmental Compliance Certificate",
      timestamp: "Yesterday at 3:45 PM",
    },
    {
      id: 3,
      action: "Rejected",
      applicationId: "APP-2023-006",
      applicantName: "Local Shop LLC",
      type: "Sanitary Permit",
      timestamp: "Apr 15, 2023",
      reason: "Incomplete documentation",
    },
  ]

  // Mock performance metrics
  const performanceMetrics = {
    processedToday: 5,
    processedThisWeek: 23,
    averageProcessingTime: "2.3 days",
    approvalRate: "85%",
  }

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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case "Approved":
        return "text-green-600"
      case "Rejected":
        return "text-red-600"
      case "Requested Additional Documents":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "Approved":
        return <CheckSquare className="h-4 w-4" />
      case "Rejected":
        return <XSquare className="h-4 w-4" />
      case "Requested Additional Documents":
        return <ClipboardList className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Navigation items for government employee
  const navItems = [
    { name: "Dashboard", icon: <BarChart2 className="h-5 w-5" />, path: "/government-dashboard" },
    { name: "Applications Queue", icon: <ClipboardList className="h-5 w-5" />, path: "/applications-queue" },
    { name: "Processed Applications", icon: <CheckSquare className="h-5 w-5" />, path: "/processed-applications" },
    { name: "Reports", icon: <PieChart className="h-5 w-5" />, path: "/reports" },
    { name: "Team", icon: <Users className="h-5 w-5" />, path: "/team" },
    { name: "Messages", icon: <MessageSquare className="h-5 w-5" />, path: "/messages" },
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
            <Link to="/government-dashboard" className="flex items-center gap-2 font-bold text-xl">
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
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20">
                  <div className="py-2 px-4 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-blue-600 mt-1">Government Employee</p>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Department: {user.department}</p>
                      <p className="text-xs text-gray-500">Position: {user.position}</p>
                      <p className="text-xs text-gray-500">ID: {user.employeeId}</p>
                    </div>
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
            <p className="text-xs uppercase text-gray-500 font-semibold">Government Portal</p>
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
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                  <p className="text-gray-600 mt-1">
                    Process and manage permit applications from your government dashboard.
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                    onClick={() => handleNavigation("/applications-queue")}
                  >
                    View Queue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Processed Today</p>
                    <h3 className="text-2xl font-bold mt-1">{performanceMetrics.processedToday}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckSquare className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Processed This Week</p>
                    <h3 className="text-2xl font-bold mt-1">{performanceMetrics.processedThisWeek}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Avg. Processing Time</p>
                    <h3 className="text-2xl font-bold mt-1">{performanceMetrics.averageProcessingTime}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Approval Rate</p>
                    <h3 className="text-2xl font-bold mt-1">{performanceMetrics.approvalRate}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Queue */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Applications Queue</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </button>
                  <Link
                    to="/applications-queue"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/applications-queue")
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
                        Applicant
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
                        Date Submitted
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Days in Queue
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Priority
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
                    {pendingApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.applicantName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.dateSubmitted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.daysInQueue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                              application.priority,
                            )}`}
                          >
                            {application.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                            onClick={() => handleNavigation(`/process/${application.id}`)}
                          >
                            Process
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Activities</h2>
                <Link
                  to="/activities"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/activities")
                  }}
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 p-1.5 rounded-full ${
                          activity.action === "Approved"
                            ? "bg-green-100"
                            : activity.action === "Rejected"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                        }`}
                      >
                        {getActionIcon(activity.action)}
                      </div>
                      <div>
                        <p className="font-medium">
                          <span className={getActionColor(activity.action)}>{activity.action}</span> -{" "}
                          {activity.applicantName}'s {activity.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Application ID: <span className="font-medium">{activity.applicationId}</span>
                        </p>
                        {activity.reason && (
                          <p className="text-sm text-gray-600">
                            Reason: <span className="font-medium">{activity.reason}</span>
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
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
                  onClick={() => handleNavigation("/applications-queue")}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Process Applications</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/reports/generate")}
                >
                  <div className="bg-green-100 p-2 rounded-full">
                    <BarChart2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Generate Reports</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/team/workload")}
                >
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-yellow-600" />
                  </div>
                  <span>Manage Workload</span>
                </button>

                <button
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavigation("/messages")}
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>Team Messages</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
