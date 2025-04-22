// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
  
//   return (
//     <header className="bg-primary text-black shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">Trung tâm DSTK </Link>
        
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="hover:bg-gray-200">Trang chủ</Link>
//           <Link to="/tutors" className="hover:bg-gray-200">Gia sư</Link>
//           <Link to="/about" className="hover:bg-gray-200">Về chúng tôi</Link>
//           <Link to="/contact" className="hover:bg-gray-200">Liên hệ</Link>
//         </div>
        
//         <div className="hidden md:block space-x-4">
//           <Link to="/login" className="py-2 px-4 border border-white rounded hover:bg-gray-200 hover:text-primary transition duration-300">
//             Đăng nhập
//           </Link>
//           <Link to="/register" className="py-2 px-4 bg-white text-primary rounded hover:bg-gray-200 transition duration-300">
//             Đăng ký
//           </Link>
//         </div>
        
//         {/* Mobile menu button */}
//         <button 
//           className="md:hidden"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
      
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-primary px-4 py-2">
//           <Link to="/" className="block py-2 hover:bg-gray-200">Trang chủ</Link>
//           <Link to="/tutors" className="block py-2 hover:bg-gray-200">Gia sư</Link>
//           <Link to="/about" className="block py-2 hover:bg-gray-200">Về chúng tôi</Link>
//           <Link to="/contact" className="block py-2 hover:bg-gray-200">Liên hệ</Link>
          
//           <div className="flex flex-col space-y-2 py-2">
//             <Link to="/login" className="py-2 px-4 border border-white rounded text-center hover:bg-white hover:text-primary transition duration-300">
//               Đăng nhập
//             </Link>
//             <Link to="/register" className="py-2 px-4 bg-white text-primary rounded text-center hover:bg-gray-200 transition duration-300">
//               Đăng ký
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }

// export default Header

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BellIcon, LogOutIcon, Settings, UserPlus, LogIn } from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LogOut, User } from "lucide-react"

const Header = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    navigate("/")
  }

  const navigateToManagementPage = () => {
    if (!user) return
    if (user.role === "TUTOR") {
      navigate("/tutor")
    } else if (user.role === "CUSTOMER") {
      navigate("/customer")
    } else if (user.role === "ADMIN") {
      navigate("/admin")
    } else {
      navigate("/")
    }
  }

  return (
    <header className="bg-primary text-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Trung tâm DSTK
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:bg-gray-200">
            Trang chủ
          </Link>
          <Link to="/tutors" className="hover:bg-gray-200">
            Gia sư
          </Link>
          <Link to="/about" className="hover:bg-gray-200">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="hover:bg-gray-200">
            Liên hệ
          </Link>
        </div>

        <div className="hidden md:block">
          {isLoggedIn && user ? (
            <>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full mr-3 border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <BellIcon className="h-10 w-5 mg-5 " />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-10 w-10 cursor-pointer border-2 border-gray-200 hover:border-gray-300 transition-all">
                    <AvatarImage src={user.avatar || "data:image/jpeg;base64,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"} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={navigateToManagementPage} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Về trang Quản lý</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="py-2 px-4 border border-white rounded hover:bg-gray-200 hover:text-primary transition duration-300"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="py-2 px-4 bg-white text-primary rounded hover:bg-gray-200 transition duration-300"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-primary px-4 py-2">
          <Link to="/" className="block py-2 hover:bg-gray-200">
            Trang chủ
          </Link>
          <Link to="/tutors" className="block py-2 hover:bg-gray-200">
            Gia sư
          </Link>
          <Link to="/about" className="block py-2 hover:bg-gray-200">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="block py-2 hover:bg-gray-200">
            Liên hệ
          </Link>

          {isLoggedIn && user ? (
            <div className="py-2">
              <div
                className="flex items-center space-x-2 py-2 hover:bg-gray-200 px-2 rounded"
                onClick={navigateToManagementPage}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span>Về trang Quản lý</span>
              </div>
              <div
                className="flex items-center space-x-2 py-2 hover:bg-gray-200 px-2 rounded text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 py-2">
              <Link
                to="/login"
                className="py-2 px-4 border border-white rounded text-center hover:bg-white hover:text-primary transition duration-300"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="py-2 px-4 bg-white text-primary rounded text-center hover:bg-gray-200 transition duration-300"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
