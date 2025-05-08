import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const MyCoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [activeTab, setActiveTab] = useState('active')
  const [isLoading, setIsLoading] = useState(true)
  const [cancelCourseId, setCancelCourseId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelForm, setShowCancelForm] = useState(false);
  const user = localStorage.getItem("user")
  const userData = JSON.parse(user)
  const userId = userData.id // Lấy ID người dùng từ localStorage
  console.log(userId)
  useEffect(() => {
   
    const fetchCourses = async () => {
      const response = await axios.get(`http://localhost:8080/api/customers/getAllCourses/${userId}`)
      const data = response.data
      setCourses(data)
      setIsLoading(false)
    }
    fetchCourses()
  }, [])
  
  // Giả lập dữ liệu khóa học
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCourses([
  //       {
  //         id: 1,
  //         subject: "Toán",
  //         class: "Lớp 10",
  //         tutor_name: "Nguyễn Văn A",
  //         start_date: "2023-10-15",
  //         end_date: null,
  //         status: "INPROGRESS",
  //         sessions_per_week: 2,
  //         fee_per_session: 200000,
  //         next_session: "2023-11-15T18:00:00"
  //       },
  //       {
  //         id: 2,
  //         subject: "Tiếng Anh",
  //         class: "Lớp 8",
  //         tutor_name: "Trần Thị B",
  //         start_date: "2023-09-20",
  //         end_date: null,
  //         status: "INPROGRESS",
  //         sessions_per_week: 3,
  //         fee_per_session: 180000,
  //         next_session: "2023-11-14T17:30:00"
  //       },
  //       {
  //         id: 3,
  //         subject: "Văn",
  //         class: "Lớp 11",
  //         tutor_name: "Phạm Văn C",
  //         start_date: "2023-05-10",
  //         end_date: "2023-08-15",
  //         status: "COMPLETED",
  //         sessions_per_week: 2,
  //         fee_per_session: 190000,
  //         next_session: null
  //       },
  //       {
  //         id: 4,
  //         subject: "Hóa học",
  //         class: "Lớp 12",
  //         tutor_name: "Lê Thị D",
  //         start_date: "2023-04-10",
  //         end_date: "2023-06-30",
  //         status: "COMPLETED",
  //         sessions_per_week: 2,
  //         fee_per_session: 220000,
  //         next_session: null
  //       },
  //       {
  //         id: 5,
  //         subject: "Sinh học",
  //         class: "Lớp 9",
  //         tutor_name: "Hoàng Văn E",
  //         start_date: "2023-03-15",
  //         end_date: "2023-04-30",
  //         status: "CANCELLED",
  //         sessions_per_week: 1,
  //         fee_per_session: 170000,
  //         next_session: null
  //       }
  //     ])
  //     setIsLoading(false)
  //   }, 1000)
  // }, [])
  
  // Lọc khóa học theo tab đang chọn
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'active') return course.status === 'INPROGRESS'
    if (activeTab === 'completed') return course.status === 'COMPLETED'
    if (activeTab === 'cancelled') return course.status === 'CANCELLED'
    return true // Tab "Tất cả"
  })
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Khóa học của tôi</h1>
      
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
          <Link to="/customer/request" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Tạo yêu cầu mới
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
                      {course.subject} - {course.className}
                    </h2>
                    <p className="text-gray-600">Gia sư: {course.tutorName}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    {course.status === 'INPROGRESS' && (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đang diễn ra
                      </span>
                    )}
                    {course.status === 'COMPLETED' && (
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã hoàn thành
                      </span>
                    )}
                    {course.status === 'CANCELLED' && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã hủy
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Ngày bắt đầu</p>
                    <p className="font-medium">
                      {new Date(course.startDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số buổi mỗi tuần</p>
                    <p className="font-medium">{course.sessionsPerWeek} buổi</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Học phí</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.feePerSession)} / buổi
                    </p>
                  </div>
                </div>
                
                {course.status === 'INPROGRESS' && course.next_session && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm font-medium text-yellow-800">
                      Buổi học tiếp theo: {new Date(course.next_session).toLocaleString('vi-VN')}
                    </p>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-end gap-2 mt-4">
                  <Link
                    to={`/customer/courses/${course.id}`}
                    className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-dark"
                  >
                    Xem chi tiết
                  </Link>
                  
                  {course.status === 'COMPLETED' && !course.has_feedback && (
                    <Link
                      to={`/customer/feedback/${course.id}`}
                      className="px-4 py-2 bg-secondary bg-blue-700 text-white rounded hover:bg-green-700"
                    >
                      Đánh giá gia sư
                    </Link>
                  )}
                  
                  {course.status === 'INPROGRESS' && (
                    <button
                      className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                      onClick={() => setCancelCourseId(course.id)}
                    >
                      Yêu cầu hủy khóa học
                    </button>
                  )}
                 
                </div>
                {cancelCourseId === course.id &&  (
                      <div className="mt-4 border p-4 rounded bg-red-50">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">Nhập lý do hủy khóa học:</h3>
                        <textarea
                          className="w-full p-2 border rounded"
                          rows="4"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          placeholder="Vui lòng nhập lý do bạn muốn hủy khóa học..."
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => {
                              if (cancelReason.trim() === '') {
                                alert('Bạn cần nhập lý do!');
                                return;
                              }
                              alert(`Đã gửi yêu cầu hủy với lý do: ${cancelReason}`);
                              // Viet API gửi yêu cầu hủy khóa học ở đây
                              setCancelCourseId(null);
                            }}
                          >
                            Gửi yêu cầu hủy
                          </button>
                          <button
                            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                            onClick={() => {
                              setCancelCourseId(null);
                              setCancelReason('');
                            }}
                          >
                            Hủy bỏ
                          </button>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCoursesPage