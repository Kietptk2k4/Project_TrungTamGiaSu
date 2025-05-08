import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CustomerDashboard = () => {
  const [activeCourses, setActiveCourses] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const user = localStorage.getItem("user")
  const userData = JSON.parse(user)
  const userId = userData.id // Lấy ID người dùng từ localStorage
  // useEffect(() => {
  //   // Giả lập API call
  //   setTimeout(() => {
  //     setActiveCourses([
  //       {
  //         id: 1,
  //         subject: "Toán",
  //         class: "Lớp 10",
  //         tutor_name: "Nguyễn Văn A",
  //         start_date: "2023-10-15",
  //         status: "INPROGRESS"
  //       },
  //       {
  //         id: 2,
  //         subject: "Tiếng Anh",
  //         class: "Lớp 8",
  //         tutor_name: "Trần Thị B",
  //         start_date: "2023-09-20",
  //         status: "INPROGRESS"
  //       }
  //     ])
      
  //     setPendingRequests([
  //       {
  //         id: 3,
  //         subject: "Văn",
  //         class: "Lớp 11",
  //         created_at: "2023-11-05",
  //         status: "PENDING"
  //       }
  //     ])
      
  //     setLoading(false)
  //   }, 1000)
  // }, [])
  useEffect(() => {
    const fetchCourseData = async () => {
      const activeCoursesResponse = await axios.get(`http://localhost:8080/api/customers/getAllCoursesInprogress/${userId}`)
      const pendingRequestsResponse = await axios.get(`http://localhost:8080/api/customers/getAllTutoringRequest/${userId}`)
      if (activeCoursesResponse.status === 200) {
        setActiveCourses(activeCoursesResponse.data)
        setPendingRequests(pendingRequestsResponse.data)
        setLoading(false)
      } else {
        // setLoading(false)
        console.error('Error fetching course data:', activeCoursesResponse.statusText)
      }
    }
    fetchCourseData()
  }, [])
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Bảng điều khiển</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Khóa học đang diễn ra</h2>
            <span className="text-white bg-green-500 rounded-full w-8 h-8 flex items-center justify-center">
              {activeCourses.length}
            </span>
          </div>
          <p className="text-gray-600">Số khóa học bạn đang tham gia</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Yêu cầu đang chờ</h2>
            <span className="text-white bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
              {pendingRequests.length}
            </span>
          </div>
          <p className="text-gray-600">Số yêu cầu đang chờ xử lý</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tạo yêu cầu mới</h2>
            <span className="text-white bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <Link to="/customer/request" className="text-primary hover:underline">
            Đăng ký yêu cầu gia sư mới
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Khóa học đang diễn ra</h2>
              <Link to="/customer/my-courses" className="text-primary hover:underline">
                Xem tất cả
              </Link>
            </div>
            
            {activeCourses.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Môn học
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lớp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gia sư
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày bắt đầu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeCourses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.className}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.tutorName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(course.startDate).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/customer/courses/${course.id}`} className="text-primary hover:text-primary-dark">
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Bạn chưa có khóa học nào đang diễn ra.</p>
                <Link 
                  to="/customer/request" 
                  className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                >
                  Tạo yêu cầu gia sư
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Yêu cầu đang chờ</h2>
            </div>
            
            {pendingRequests.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Môn học
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lớp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày tạo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.subjectName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.className}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Đang chờ
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/customer/request/${request.id}`} className="text-primary hover:text-primary-dark">
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">Bạn không có yêu cầu nào đang chờ xử lý.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CustomerDashboard