import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-primary text-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Trung tâm DSTK </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:bg-gray-200">Trang chủ</Link>
          <Link to="/tutors" className="hover:bg-gray-200">Gia sư</Link>
          <Link to="/about" className="hover:bg-gray-200">Về chúng tôi</Link>
          <Link to="/contact" className="hover:bg-gray-200">Liên hệ</Link>
        </div>
        
        <div className="hidden md:block space-x-4">
          <Link to="/login" className="py-2 px-4 border border-white rounded hover:bg-gray-200 hover:text-primary transition duration-300">
            Đăng nhập
          </Link>
          <Link to="/register" className="py-2 px-4 bg-white text-primary rounded hover:bg-gray-200 transition duration-300">
            Đăng ký
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary px-4 py-2">
          <Link to="/" className="block py-2 hover:bg-gray-200">Trang chủ</Link>
          <Link to="/tutors" className="block py-2 hover:bg-gray-200">Gia sư</Link>
          <Link to="/about" className="block py-2 hover:bg-gray-200">Về chúng tôi</Link>
          <Link to="/contact" className="block py-2 hover:bg-gray-200">Liên hệ</Link>
          
          <div className="flex flex-col space-y-2 py-2">
            <Link to="/login" className="py-2 px-4 border border-white rounded text-center hover:bg-white hover:text-primary transition duration-300">
              Đăng nhập
            </Link>
            <Link to="/register" className="py-2 px-4 bg-white text-primary rounded text-center hover:bg-gray-200 transition duration-300">
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header