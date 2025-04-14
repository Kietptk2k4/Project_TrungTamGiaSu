import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CoursesManagementPage = () => {
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterClass, setFilterClass] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [coursesPerPage] = useState(10)
  
  // Mock data for filters
  const subjects = ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh']
  const classes = ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12']
  
  // Fetch courses data
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      const mockCourses = Array(25).fill().map((_, idx) => ({
        id: idx + 1,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        class: classes[Math.floor(Math.random() * classes.length)],
        tutor_name: idx % 5 === 0 ? null : `Giáo viên ${idx + 1}`,
        customer_name: `Học sinh ${idx + 1}`,
        location: `Quận ${(idx % 10) + 1}, TP.HCM`,
        start_date: idx % 5 === 0 ? null : new Date(2023, 9, idx + 1).toISOString(),
        end_date: idx % 8 === 0 ? new Date(2023, 11, idx + 1).toISOString() : null,
        fee_per_session: 150000 + (idx * 10000),
        sessions_per_week: (idx % 3) + 1,
        status: idx % 5 === 0 ? 'Pending' : idx % 8 === 0 ? 'Completed' : idx % 10 === 0 ? 'Cancelled' : 'InProgress',
        total_sessions: 24,
        completed_sessions: idx % 8 === 0 ? 24 : Math.floor(Math.random() * 10),
        total_fee: (150000 + (idx * 10000)) * 24,
        created_at: new Date(2023, 8, idx + 1).toISOString()
      }))
      
      setCourses(mockCourses)
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    // Tab filtering
    if (activeTab !== 'all' && course.status !== activeTab) return false
    
    // Search term filtering
    if (searchTerm && !course.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (!course.tutor_name || !course.tutor_name.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false
    }
    
    // Subject filtering
    if (filterSubject && course.subject !== filterSubject) return false
    
    // Class filtering
    if (filterClass && course.class !== filterClass) return false
    
    return true
  })
  
  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  // Reset filters and search
  const resetFilters = () => {
    setSearchTerm('')
    setFilterSubject('')
    setFilterClass('')
    setCurrentPage(1)
  }
  
  // Format status to Vietnamese
  const formatStatus = (status) => {
    switch (status) {
      case 'Pending': return 'Chờ gia sư'
      case 'InProgress': return 'Đang diễn ra'
      case 'Completed': return 'Đã hoàn thành'
      case 'Cancelled': return 'Đã hủy'
      default: return status
    }
  }
  
  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'InProgress': return 'bg-green-100 text-green-800'
      case 'Completed': return 'bg-blue-100 text-blue-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
        <Link
          to="/admin/courses/create"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Tạo khóa học mới
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
              placeholder="Tên học sinh hoặc gia sư..."
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả môn học</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full md:w-48 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả các lớp</option>
              {classes.map((classItem, index) => (
                <option key={index} value={classItem}>{classItem}</option>
              ))}
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
          className={`py-2 px-4 font-medium ${activeTab === 'Pending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Pending')}
        >
          Chờ gia sư
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'InProgress' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('InProgress')}
        >
          Đang diễn ra
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'Completed' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Completed')}
        >
          Đã hoàn thành
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'Cancelled' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('Cancelled')}
        >
          Đã hủy
        </button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Tổng số khóa học</h3>
          <p className="text-3xl font-bold">{courses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Đang diễn ra</h3>
          <p className="text-3xl font-bold text-green-600">
            {courses.filter(course => course.status === 'InProgress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Chờ gia sư</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {courses.filter(course => course.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Đã hoàn thành</h3>
          <p className="text-3xl font-bold text-blue-600">
            {courses.filter(course => course.status === 'Completed').length}
          </p>
        </div>
      </div>
      
      {/* Courses Table */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy khóa học nào phù hợp với tiêu chí tìm kiếm.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khóa học
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học sinh
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gia sư
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Học phí
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.subject} - {course.class}</div>
                        <div className="text-sm text-gray-500">{course.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.customer_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.tutor_name ? (
                          <div className="text-sm text-gray-900">{course.tutor_name}</div>
                        ) : (
                          <span className="text-sm text-yellow-600">Chưa có gia sư</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee_per_session)}
                          /buổi
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.sessions_per_week} buổi/tuần
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                          {formatStatus(course.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/admin/courses/${course.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          Chi tiết
                        </Link>
                        {course.status === 'Pending' && (
                          <Link 
                            to={`/admin/courses/${course.id}/assign`}
                            className="text-green-600 hover:text-green-800 ml-3"
                          >
                            Gán gia sư
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">{indexOfFirstCourse + 1}</span> đến{' '}
              <span className="font-medium">
                {Math.min(indexOfLastCourse, filteredCourses.length)}
              </span>{' '}
              trong tổng số <span className="font-medium">{filteredCourses.length}</span> kết quả
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-primary hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Trước
              </button>
              
              {[...Array(Math.ceil(filteredCourses.length / coursesPerPage)).keys()].map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === number + 1
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
                className={`px-3 py-1 rounded ${
                  currentPage === Math.ceil(filteredCourses.length / coursesPerPage)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-primary hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Sau
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CoursesManagementPage