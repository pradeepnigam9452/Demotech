import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

 

import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  Home,
  Users,
  Images,
  ChevronRight,
  LogOut,
  Menu,
  X,
  GalleryVertical,
  ListPlus,
  UserCheck,
  } from "lucide-react"    


export function Sidebar() {

  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState({ Dashboard: false })
  // const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [activeView, setActiveView] = useState("Dashboard")

  useEffect(() => {
    const adminUser = sessionStorage.getItem("adminUser");

    if (!adminUser) {
      navigate("/vvs/panel/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminUser");
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(true)
      }
      if (window.innerWidth < 768) {
        setCollapsed(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" onClick={closeMobileMenu} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-white border-r border-gray-200 shadow-lg transition-all duration-300 lg:relative lg:translate-x-0 ${collapsed ? "w-16" : "w-64"
          } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">College Admin</span>
                <span className="text-xs text-gray-500">Management System</span>
              </div>
            )}
          </div>
          {/* Mobile close button */}
          <button onClick={closeMobileMenu} className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3">
            {!collapsed && (
              <div className="mb-2 px-4 py-2 text-xs font-semibold uppercase text-gray-500">Navigation</div>
            )}
            <nav className="space-y-1">
              {[
                {
                  label: "Dashboard",
                  icon: Home,
                  submenu: [],
                  // bg: "bg-blue-50 text-blue-700 border-r-2 border-blue-600",
                },
                {
                  label: "Home",
                  icon: GalleryVertical,
                  submenu: ["Add Home Banner", "All Banner Images","Add Services","All Services"],
                },
                {
                  label: "About Us",
                  icon: Users,
                  submenu: ["Add About Content", "Mission & Vision", "Add Founders","All Founders"],
                },
                {
                  label: "News Section",
                  icon: BookOpen,
                  submenu: ["Add News Data", "All News"],
                },
                {
                  label: "Event Gallery",
                  icon: Images,
                  submenu: ["Add Category","Add Event Images","All Event Gallery Images"],
                },
                {
                  label: "Topbar",
                  icon: ListPlus,
                  submenu: ["Add Topbar Content"],
                },
                {
                  label: "Queries",
                  icon: UserCheck ,
                  submenu: ["Show Addmission Queries", "Contact Queries"],
                },
              ].map(({ label, icon: Icon, submenu, bg }) => (
                <div key={label}>
                  <button
                    onClick={() => toggleMenu(label)}
                    className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 ${bg || "text-gray-700 hover:text-gray-900"
                      }`}
                  >
                    <Icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"} flex-shrink-0`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate text-left">{label}</span>
                        {submenu.length > 0 && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform flex-shrink-0 ${openMenus[label] ? "rotate-180" : ""
                              }`}
                          />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && submenu.length > 0 && openMenus[label] && (
                    <div className="mt-1 space-y-1 pl-10">
                      {submenu.map((title) => (
                        // <a
                        //   key={title}
                        //   href={`/admin/${title.replace(/\s+/g, '')}`}
                        //   className="block rounded-md py-2 pl-3 pr-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        //   onClick={closeMobileMenu}
                        // >
                        //   {title}
                        // </a>
                        <button
                          key={title}
                          onClick={() => {
                            setActiveView(title)
                            closeMobileMenu()
                          }}
                          className="block text-left w-full rounded-md py-2 pl-3 pr-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          {title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar User Footer
        <div className="relative border-t border-gray-200 p-4">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex w-full items-center gap-3 rounded-lg py-2 text-left text-sm hover:bg-gray-50 transition-colors"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gray-200 flex-shrink-0">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Dr. Sarah Johnson"
                className="h-full w-full object-cover"
              />
            </div>
            {!collapsed && (
              <>
                <div className="flex flex-1 flex-col min-w-0">
                  <span className="font-medium text-gray-900 truncate">Dr. Sarah Johnson</span>
                  <span className="text-xs text-gray-500 truncate">Administrator</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </>
            )}
          </button>

          {userDropdownOpen && !collapsed && (
            <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <a
                href="/logout"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </a>
            </div>
          )}
        </div> */}

        {/* Desktop Toggle Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </aside>

      {/* Main Content with Navbar */}
      <div className={`flex flex-col flex-1 transition-all duration-300 lg:${collapsed ? "ml-16" : "ml-64"} min-w-0`}>
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 truncate">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="hover:cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto">
          {activeView === "Add Home Banner" && <AddHomeBanner />}
          {activeView === "All Banner Images" && <AllBannerImages />}
          {activeView === "Add Services" && <AddServices />}
          {activeView === "All Services" && <AllServices />}

          {activeView === "Add About Content" && <AddAboutContent />}
          {activeView === "Mission & Vision" && <MissionVision />}
          {activeView === "Add Founders" && <AddFoundation />}
          {activeView === "All Founders" && <AllFounders />}

          {activeView === "Add News Data" && <AddNewsData />}
          {activeView === "All News" && <AllNews/>}


          {activeView === "Add Category" && <AddCategory />}
          {activeView === "Add Event Images" && <AddEventImages />}
          {activeView === "All Event Gallery Images" && <AllEventGalleryImages />
          }
          {activeView === "Add Topbar Content" && <AddTopbarContent />}

          {activeView === "Show Addmission Queries" && <ShowAddmissionQueries />}
          {activeView === "Contact Queries" && <ContactQueries />}
        </main>
      </div>
    </div>
  )
}
