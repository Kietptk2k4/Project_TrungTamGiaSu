import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const CourseDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin chi tiết khóa học
    const fetchCourseDetails = async () => {
      try {
        // Trong thực tế, đây sẽ là API call
        // const response = await api.get(`/customer/courses/${id}`)
        
        // Dữ liệu giả lập
        setTimeout(() => {
          setCourse({
            id: parseInt(id),
            subject: "Toán",
            class: "Lớp 10",
            tutor: {
              id: 1,
              name: "Nguyễn Văn A",
              phone: "0987654321",
              email: "tutora@example.com",
              rating: 4.8
            },
            start_date: "2023-10-15",
            end_date: null,
            status: "InProgress",
            sessions_per_week: 2,
            fee_per_session: 2000000,
            total_sessions: 24,
            completed_sessions: 8,
            remaining_sessions: 16,
          
            schedule: [
              { day_of_week: 2, start_time: "18:00", end_time: "19:30" },
              { day_of_week: 5, start_time: "18:00", end_time: "19:30" }
            ],
            location: {
              province: "TP. Hồ Chí Minh",
              district: "Quận 1",
              ward: "Phường Bến Nghé",
              address_detail: "123 Đường Nguyễn Huệ"
            },
            payments: [
              { id: 1, amount: 1600000, date: "2023-10-15", status: "Completed", description: "Thanh toán học phí tháng đầu" }
            ],
          
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching course details:', error)
        setIsLoading(false)
      }
    }
    
    fetchCourseDetails()
  }, [id])
  
  const handleCancelRequest = () => {
    if (window.confirm('Bạn có chắc chắn muốn yêu cầu hủy khóa học này không?')) {
      // Trong thực tế, đây sẽ là API call để gửi yêu cầu hủy
      alert('Yêu cầu hủy khóa học đã được gửi. Chúng tôi sẽ liên hệ với bạn sớm.')
    }
  }
  
  const getDayOfWeekName = (day) => {
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
    return days[day % 7]
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Đang tải thông tin khóa học...</p>
      </div>
    )
  }
  
  if (!course) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Không tìm thấy thông tin khóa học!</h2>
        <p className="text-gray-600 mb-6">Khóa học bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập.</p>
        <Link to="/customer/my-courses" className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-dark">
          Quay lại danh sách khóa học
        </Link>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chi tiết khóa học</h1>
        <Link to="/customer/my-courses" className="text-primary hover:underline">
          &larr; Quay lại danh sách
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">
                {course.subject} - {course.class}
              </h2>
              <p className="text-gray-600 mt-1">
                Gia sư: {course.tutor.name}
              </p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.status === 'InProgress' ? 'bg-green-100 text-green-800' :
                course.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.status === 'InProgress' ? 'Đang diễn ra' :
                course.status === 'Completed' ? 'Đã hoàn thành' :
                'Đã hủy'}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Ngày bắt đầu: {new Date(course.start_date).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin khóa học</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số buổi mỗi tuần:</span>
                  <span className="font-medium">{course.sessions_per_week} buổi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Học phí:</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee_per_session)}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số buổi:</span>
                  <span className="font-medium">{course.total_sessions} buổi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đã hoàn thành:</span>
                  <span className="font-medium">{course.completed_sessions} buổi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Còn lại:</span>
                  <span className="font-medium">{course.remaining_sessions} buổi</span>
                </div> */}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Lịch học</h3>
              <div className="space-y-2">
                {course.schedule.map((scheduleItem, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span>{getDayOfWeekName(scheduleItem.day_of_week)}</span>
                    <span>{scheduleItem.start_time} - {scheduleItem.end_time}</span>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Địa điểm học</h3>
            <p className="text-gray-700">
              {course.location.address_detail}, {course.location.ward}, {course.location.district}, {course.location.province}
            </p>
          </div>
          
          {/* Thông tin gia sư */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Thông tin gia sư</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Tên gia sư:</p>
                <p className="font-medium">{course.tutor.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Đánh giá:</p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${i < Math.floor(course.tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2">{course.tutor.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Số điện thoại:</p>
                <p className="font-medium">{course.tutor.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{course.tutor.email}</p>
              </div>
            </div>
          </div>
          
          {/* Lịch sử thanh toán */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Lịch sử thanh toán</h3>
            {course.payments && course.payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày thanh toán
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {course.payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(payment.date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(payment.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'Completed' ? 'Đã thanh toán' : 'Đang xử lý'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Chưa có thanh toán nào.</p>
            )}
          </div>
          
        </div>  
      </div>
      
      {/* Các nút thao tác */}
      <div className="flex flex-wrap justify-end gap-4">
        {course.status === 'InProgress' && (
          <>
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              onClick={handleCancelRequest}
            >
              Yêu cầu hủy khóa học
            </button>
            
            {/* <Link 
              to={`/customer/payment/${course.id}`}
              className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-dark"
            >
              Thanh toán tiếp theo
            </Link> */}
          </>
        )}
        
        {course.status === 'Completed' && !course.has_feedback && (
          <Link 
            to={`/customer/feedback/${course.id}`}
            className="px-4 py-2 bg-secondary text-black rounded hover:bg-green-700"
          >
            Đánh giá gia sư
          </Link>
        )}
      </div>
    </div>
  )
}

export default CourseDetailPage