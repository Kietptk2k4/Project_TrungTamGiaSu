import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TutorMyCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState('active')
  const [isLoading, setIsLoading] = useState(true)
  
  // Giả lập dữ liệu khóa học
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          subject: "Toán",
          class: "Lớp 10",
          customer_name: "Nguyễn Văn X",
          customer_phone: "0987654321",
          location: "Quận 1, TP.HCM",
          start_date: "2023-10-15",
          end_date: null,
          status: "InProgress",
          sessions_per_week: 2,
          fee_per_session: 200000,
          next_session: "2023-11-15T18:00:00",
          fee_received: 3200000
        },
        {
          id: 2,
          subject: "Tiếng Anh",
          class: "Lớp 8",
          customer_name: "Trần Thị Y",
          customer_phone: "0909876543",
          location: "Quận 3, TP.HCM",
          start_date: "2023-09-20",
          end_date: null,
          status: "InProgress",
          sessions_per_week: 3,
          fee_per_session: 180000,
          next_session: "2023-11-14T17:30:00",
          fee_received: 4320000
        },
        {
          id: 3,
          subject: "Văn",
          class: "Lớp 11",
          customer_name: "Phạm Thị Z",
          customer_phone: "0912345678",
          location: "Quận 7, TP.HCM",
          start_date: "2023-05-10",
          end_date: "2023-08-15",
          status: "Completed",
          sessions_per_week: 2,
          fee_per_session: 190000,
          next_session: null,
          fee_received: 4560000,
          feedback: {
            rating: 5,
            content: "Gia sư dạy rất tận tâm, con tôi tiến bộ rõ rệt. Cảm ơn thầy rất nhiều!"
          }
        },
        {
          id: 4,
          subject: "Hóa học",
          class: "Lớp 12",
          customer_name: "Lê Văn W",
          customer_phone: "0923456789",
          location: "Quận 2, TP.HCM",
          start_date: "2023-04-10",
          end_date: "2023-06-30",
          status: "Completed",
          sessions_per_week: 2,
          fee_per_session: 220000,
          next_session: null,
          fee_received: 5280000,
          feedback: {
            rating: 4,
            content: "Gia sư có phương pháp giảng dạy khá hiệu quả, học sinh tiếp thu tốt."
          }
        },
        {
          id: 5,
          subject: "Sinh học",
          class: "Lớp 9",
          customer_name: "Hoàng Văn V",
          customer_phone: "0934567890",
          location: "Quận 5, TP.HCM",
          start_date: "2023-03-15",
          end_date: "2023-04-30",
          status: "Cancelled",
          sessions_per_week: 1,
          fee_per_session: 170000,
          next_session: null,
          fee_received: 1360000,
          cancel_reason: "Học sinh chuyển trường"
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Lọc khóa học theo tab đang chọn
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'active') return course.status === 'InProgress'
    if (activeTab === 'completed') return course.status === 'Completed'
    if (activeTab === 'cancelled') return course.status === 'Cancelled'
    return true // Tab "Tất cả"
  })
  
  // Calculate total earnings
  const calculateTotalEarnings = (courses) => {
    return courses.reduce((total, course) => total + course.fee_received, 0)
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng số khóa học</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Khóa học đang dạy</p>
              <p className="text-2xl font-bold">{courses.filter(course => course.status === 'InProgress').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tổng thu nhập</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(calculateTotalEarnings(courses))}
              </p>
            </div>
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
          className={`py-2 px-4 font-medium ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('active')}
        >
          Đang diễn ra
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'completed' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('completed')}
        >
          Đã hoàn thành
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'cancelled' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Đã hủy
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải khóa học...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Không có khóa học nào trong danh mục này.</p>
          <Link to="/tutor/available-courses" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Tìm khóa học mới
          </Link>
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
                    <p className="text-gray-600">Học sinh: {course.customer_name}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    {course.status === 'InProgress' && (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đang diễn ra
                      </span>
                    )}
                    {course.status === 'Completed' && (
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã hoàn thành
                      </span>
                    )}
                    {course.status === 'Cancelled' && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã hủy
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Địa điểm</p>
                    <p className="font-medium">{course.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                    <p className="font-medium">
                      {new Date(course.start_date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Học phí</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee_per_session)} / buổi
                    </p>
                  </div>
                </div>
                
                {course.status === 'InProgress' && course.next_session && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm font-medium text-yellow-800">
                      Buổi học tiếp theo: {new Date(course.next_session).toLocaleString('vi-VN')}
                    </p>
                  </div>
                )}
                
                {course.status === 'Completed' && course.feedback && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center mb-2">
                      <p className="text-sm font-medium text-blue-800 mr-2">Đánh giá từ học sinh:</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < course.feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-blue-800">"{course.feedback.content}"</p>
                  </div>
                )}
                
                {course.status === 'Cancelled' && course.cancel_reason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-md">
                    <p className="text-sm font-medium text-red-800">
                      Lý do hủy: {course.cancel_reason}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Tổng thu nhập:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee_received)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    <Link
                      to={`/tutor/courses/${course.id}`}
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                      Xem chi tiết
                    </Link>
                    
                    {course.status === 'InProgress' && (
                      <Link
                        to={`/tutor/refunds/create?course=${course.id}`}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                      >
                        Yêu cầu hủy
                      </Link>
                    )}
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

export default TutorMyCoursesPage