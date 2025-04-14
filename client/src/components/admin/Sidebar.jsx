import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Quản Trị Viên</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/customer-requests" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Yêu cầu khách hàng
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/tutor-requests" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Yêu cầu gia sư
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/courses" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Quản lý khóa học
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Quản lý người dùng
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/payments" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Quản lý thanh toán
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/statistics" 
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-700'}`
              }
            >
              Thống kê báo cáo
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar