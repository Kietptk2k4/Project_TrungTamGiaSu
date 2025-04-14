import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const UsersManagementPage = () => {
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  
  // Mock data for roles
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Tutor' },
    { id: 3, name: 'Customer' }
  ]
  
  // Fetch users data
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      const mockUsers = Array(50).fill().map((_, idx) => {
        const role = roles[idx % 3].name
        return {
          id: idx + 1,
          username: `user${idx + 1}`,
          email: `user${idx + 1}@example.com`,
          name: `${role === 'Admin' ? 'Admin' : role === 'Tutor' ? 'Gia sư' : 'Học sinh'} ${idx + 1}`,
          role: role,
          created_at: new Date(2023, Math.floor(idx / 10), (idx % 30) + 1).toISOString(),
          is_active: idx % 7 !== 0,
          phone: `09${idx.toString().padStart(8, '0')}`,
          last_login: idx % 5 !== 0 ? new Date(2023, 10, (idx % 30) + 1).toISOString() : null
        }
      })
      
      setUsers(mockUsers)
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Filter users
  const filteredUsers = users.filter(user => {
    // Tab filtering
    if (activeTab === 'customer' && user.role !== 'Customer') return false
    if (activeTab === 'tutor' && user.role !== 'Tutor') return false
    if (activeTab === 'admin' && user.role !== 'Admin') return false
    
    // Search term filtering
    if (searchTerm && 
        !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.username.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.phone.includes(searchTerm)) {
      return false
    }
    
    // Role filtering
    if (filterRole && user.role !== filterRole) return false
    
    // Status filtering
    if (filterStatus === 'active' && !user.is_active) return false
    if (filterStatus === 'inactive' && user.is_active) return false
    
    return true
  })
  
  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  // Reset filters and search
  const resetFilters = () => {
    setSearchTerm('')
    setFilterRole('')
    setFilterStatus('')
    setCurrentPage(1)
  }
  
  // Toggle user active status
  const toggleUserStatus = (userId) => {
    const userToUpdate = users.find(user => user.id === userId)
    
    if (userToUpdate.role === 'Admin' && userToUpdate.is_active) {
      alert('Không thể khóa tài khoản Admin!')
      return
    }
    
    const action = userToUpdate.is_active ? 'khóa' : 'mở khóa'
    if (window.confirm(`Bạn có chắc chắn muốn ${action} tài khoản này không?`)) {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, is_active: !user.is_active } : user
      )
      setUsers(updatedUsers)
    }
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Link
          to="/admin/users/create"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Thêm người dùng mới
        </Link>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tên, email, username, số điện thoại..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả vai trò</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Đã khóa</option>
            </select>
          </div>
          
          <div className="w-full md:w-auto flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'customer' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('customer')}
        >
          Khách hàng
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'tutor' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('tutor')}
        >
          Gia sư
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'admin' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('admin')}
        >
          Quản trị viên
        </button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Tổng số người dùng</h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Số khách hàng</h3>
          <p className="text-3xl font-bold text-blue-600">
            {users.filter(user => user.role === 'Customer').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Số gia sư</h3>
          <p className="text-3xl font-bold text-green-600">
            {users.filter(user => user.role === 'Tutor').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Số tài khoản bị khóa</h3>
          <p className="text-3xl font-bold text-red-600">
            {users.filter(user => !user.is_active).length}
          </p>
        </div>
      </div>
      
      {/* Users Table */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy người dùng nào phù hợp với tiêu chí tìm kiếm.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
                       Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên người dùng</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Vai trò</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Lần đăng nhập gần nhất</th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{indexOfFirstUser + index + 1}</td>
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.is_active ? 'Đang hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Chưa đăng nhập'}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Xem
                    </Link>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      {user.is_active ? 'Khóa' : 'Mở khóa'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex space-x-2">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default UsersManagementPage
