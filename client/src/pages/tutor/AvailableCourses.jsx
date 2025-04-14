import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AvailableCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    subject: '',
    class: '',
    location: ''
  })
  
  // Danh sách môn học, lớp và địa điểm để lọc
  const [subjects, setSubjects] = useState([])
  const [classes, setClasses] = useState([])
  const [locations, setLocations] = useState([])
  
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          subject: "Toán",
          class: "Lớp 10",
          location: "Quận 1, TP.HCM",
          sessions_per_week: 2,
          fee_per_session: 200000,
          created_at: "2023-11-01"
        },
        {
          id: 2,
          subject: "Tiếng Anh",
          class: "Lớp 8",
          location: "Quận 3, TP.HCM",
          sessions_per_week: 3,
          fee_per_session: 180000,
          created_at: "2023-10-30"
        },
        {
          id: 3,
          subject: "Vật lý",
          class: "Lớp 12",
          location: "Quận 7, TP.HCM",
          sessions_per_week: 2,
          fee_per_session: 220000,
          created_at: "2023-11-05"
        },
        {
          id: 4,
          subject: "Hóa học",
          class: "Lớp 11",
          location: "Quận 2, TP.HCM",
          sessions_per_week: 2,
          fee_per_session: 210000,
          created_at: "2023-11-03"
        },
        {
          id: 5,
          subject: "Toán",
          class: "Lớp 9",
          location: "Quận 5, TP.HCM",
          sessions_per_week: 2,
          fee_per_session: 190000,
          created_at: "2023-11-02"
        }
      ])
      
      setSubjects(["Toán", "Tiếng Anh", "Vật lý", "Hóa học", "Sinh học", "Văn"])
      setClasses(["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"])
      setLocations(["Quận 1, TP.HCM", "Quận 2, TP.HCM", "Quận 3, TP.HCM", "Quận 5, TP.HCM", "Quận 7, TP.HCM", "Quận 10, TP.HCM"])
      
      setIsLoading(false)
    }, 1000)
  }, [])
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value
    })
  }
  
  const resetFilters = () => {
    setFilters({
      subject: '',
      class: '',
      location: ''
    })
  }
  
  const filteredCourses = courses.filter(course => {
    return (
      (filters.subject === '' || course.subject === filters.subject) &&
      (filters.class === '' || course.class === filters.class) &&
      (filters.location === '' || course.location === filters.location)
    )
  })
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Khóa học có sẵn</h1>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Bộ lọc tìm kiếm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả môn học</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả các lớp</option>
              {classes.map((classItem, index) => (
                <option key={index} value={classItem}>{classItem}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Tất cả địa điểm</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
      
      {/* Courses list */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải khóa học...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Không tìm thấy khóa học phù hợp với bộ lọc của bạn.</p>
          <button
            onClick={resetFilters}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {course.subject} - {course.class}
                    </h2>
                    <p className="text-gray-600">Địa điểm: {course.location}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className="text-gray-600 text-sm">
                      Ngày đăng: {new Date(course.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Số buổi mỗi tuần</p>
                    <p className="font-medium">{course.sessions_per_week} buổi</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Học phí</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee_per_session)} / buổi
                    </p>
                  </div>
                  <div className="md:text-right">
                    <Link
                      to={`/tutor/courses/${course.id}/register`}
                      className="inline-block px-4 py-2 bg-primary text-bold-black rounded hover:bg-primary-dark"
                    >
                      Đăng ký dạy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AvailableCoursesPage