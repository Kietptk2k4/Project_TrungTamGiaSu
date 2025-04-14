import { NavLink } from 'react-router-dom'

const TutorSidebar = () => {
  return (
    <div className="bg-gray-100 w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu Gia Sư</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/tutor" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-200'}`
              }
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tutor/available-courses" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Các khóa học có sẵn
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tutor/my-courses" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Khóa học của tôi
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tutor/requests" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Yêu cầu từ khách hàng
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tutor/refunds" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-200'}`
              }
            >
              Yêu cầu hoàn tiền
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tutor/profile" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
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

export default TutorSidebar