"use client"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronLeft, LayoutDashboard, Users, LogOut } from "lucide-react"
import { toggleSidebar, closeSidebar, toggleCollapse } from "../store/slices/sidebarSlice"
import { logout } from "../store/slices/authSlice"

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { isOpen, isCollapsed } = useSelector((state) => state.sidebar)

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/voters", icon: Users, label: "Voters" },
  ]

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => dispatch(closeSidebar())} />
      )}

      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-16" : "lg:w-64"}
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && <h1 className="text-xl font-bold text-gray-800">Voter System</h1>}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(toggleCollapse())}
                className="hidden lg:block p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
              </button>
              <button onClick={() => dispatch(closeSidebar())} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => dispatch(closeSidebar())}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg transition-colors
                        ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"}
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className={`
                flex items-center space-x-3 p-3 w-full rounded-lg transition-colors
                text-red-600 hover:bg-red-50
                ${isCollapsed ? "justify-center" : ""}
              `}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
