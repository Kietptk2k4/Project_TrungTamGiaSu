import { NavLink } from 'react-router-dom'

const CustomerSidebar = () => {
  return (
    <div className="bg-gray-100 w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu Khách Hàng</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/customer" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-red-500' 
                  : 'hover:bg-gray-200'}`
              }
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customer/request" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-red-500' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Tạo yêu cầu gia sư
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customer/my-courses" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-red-500' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Khóa học của tôi
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customer/profile" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-red-500' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Thông tin cá nhân
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default CustomerSidebar