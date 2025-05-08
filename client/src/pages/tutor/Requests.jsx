import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TutorRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)
  
  // Giả lập dữ liệu yêu cầu
  useEffect(() => {
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          customer_name: "Lê Văn X",
          customer_avatar: null,
          subject: "Toán",
          class: "Lớp 10",
          location: "Quận 1, TP.HCM",
          fee_per_session: 200000,
          sessions_per_week: 2,
          created_at: "2023-11-05",
          status: "Pending",
          schedule: [
            { day_of_week: 2, start_time: "18:00", end_time: "19:30" },
            { day_of_week: 5, start_time: "18:00", end_time: "19:30" }
          ]
        },
        {
          id: 2,
          customer_name: "Trần Thị Y",
          customer_avatar: null,
          subject: "Tiếng Anh",
          class: "Lớp 8",
          location: "Quận 3, TP.HCM",
          fee_per_session: 180000,
          sessions_per_week: 3,
          created_at: "2023-11-03",
          status: "Pending",
          schedule: [
            { day_of_week: 2, start_time: "17:00", end_time: "18:30" },
            { day_of_week: 4, start_time: "17:00", end_time: "18:30" },
            { day_of_week: 6, start_time: "17:00", end_time: "18:30" }
          ]
        },
        {
          id: 3,
          customer_name: "Phạm Văn Z",
          customer_avatar: null,
          subject: "Vật lý",
          class: "Lớp 12",
          location: "Quận 7, TP.HCM",
          fee_per_session: 220000,
          sessions_per_week: 2,
          created_at: "2023-10-28",
          status: "Accepted",
          schedule: [
            { day_of_week: 3, start_time: "19:00", end_time: "20:30" },
            { day_of_week: 7, start_time: "14:00", end_time: "15:30" }
          ]
        },
        {
          id: 4,
          customer_name: "Hoàng Thị W",
          customer_avatar: null,
          subject: "Hóa học",
          class: "Lớp 11",
          location: "Quận 10, TP.HCM",
          fee_per_session: 210000,
          sessions_per_week: 2,
          created_at: "2023-10-25",
          status: "Rejected",
          rejection_reason: "Lịch dạy trùng với lịch cá nhân",
          schedule: [
            { day_of_week: 2, start_time: "20:00", end_time: "21:30" },
            { day_of_week: 6, start_time: "20:00", end_time: "21:30" }
          ]
        },
        {
          id: 5,
          customer_name: "Đỗ Văn V",
          customer_avatar: null,
          subject: "Sinh học",
          class: "Lớp 9",
          location: "Quận 5, TP.HCM",
          fee_per_session: 190000,
          sessions_per_week: 1,
          created_at: "2023-10-20",
          status: "Rejected",
          rejection_reason: "Khoảng cách quá xa",
          schedule: [
            { day_of_week: 1, start_time: "18:00", end_time: "19:30" }
          ]
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Lọc yêu cầu theo tab đang chọn
  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true
    return request.status.toLowerCase() === activeTab.toLowerCase()
  })
  
  // Xử lý khi chấp nhận yêu cầu
  const handleAccept = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn nhận dạy lớp này không?')) {
      // Trong thực tế, đây sẽ là API call
      // Giả lập cập nhật trạng thái
      const updatedRequests = requests.map(req => 
        req.id === id ? { ...req, status: 'Accepted' } : req
      )
      setRequests(updatedRequests)
    }
  }
  
  // Xử lý khi từ chối yêu cầu
  const handleReject = (id) => {
    const reason = prompt('Vui lòng nhập lý do từ chối:')
    if (reason) {
      // Trong thực tế, đây sẽ là API call
      // Giả lập cập nhật trạng thái
      const updatedRequests = requests.map(req => 
        req.id === id ? { ...req, status: 'Rejected', rejection_reason: reason } : req
      )
      setRequests(updatedRequests)
    }
  }
  
  // Chuyển đổi số thứ tự ngày trong tuần thành tên
  const getDayOfWeekName = (day) => {
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"]
    return days[day % 7]
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Yêu cầu dạy học</h1>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          Tất cả
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pending')}
        >
          Đang chờ
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'accepted' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('accepted')}
        >
          Đã chấp nhận
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'rejected' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('rejected')}
        >
          Đã từ chối
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải yêu cầu...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Không có yêu cầu nào trong danh mục này.</p>
          <Link to="/tutor" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            Quay lại trang chủ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.map(request => (
            <div key={request.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {request.subject} - {request.class}
                    </h2>
                    <p className="text-gray-600">Học sinh: {request.customer_name}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    {request.status === 'Pending' && (
                      <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đang chờ
                      </span>
                    )}
                    {request.status === 'Accepted' && (
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã chấp nhận
                      </span>
                    )}
                    {request.status === 'Rejected' && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                        Đã từ chối
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Địa điểm</p>
                    <p className="font-medium">{request.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Học phí mỗi buổi</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(request.fee_per_session)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số buổi mỗi tuần</p>
                    <p className="font-medium">
                      {request.sessions_per_week} buổi
                    </p>
                  </div>
                </div>
                
                {/* Hiển thị lịch học */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Lịch học</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {request.schedule.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">{getDayOfWeekName(item.day_of_week)}</span>: {item.start_time} - {item.end_time}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hiển thị lý do từ chối nếu có */}
                {request.status === 'Rejected' && request.rejection_reason && (
                  <div className="mb-4 p-3 bg-red-50 rounded-md">
                    <p className="text-sm font-medium text-red-800">
                      Lý do từ chối: {request.rejection_reason}
                    </p>
                  </div>
                )}
                
                {/* Các nút thao tác */}
                <div className="flex flex-wrap justify-end gap-2 mt-4">
                  <Link
                    to={`/tutor/requests/${request.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Xem chi tiết
                  </Link>
                  
                  {request.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="px-4 py-2 bg-primary text-green-500 border border-green-500 rounded  hover:bg-primary-dark"
                      >
                        Chấp nhận
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  
                  {request.status === 'Accepted' && (
                    <span className="text-green-600 font-medium">
                      Chờ khách hàng thanh toán để bắt đầu khóa học
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TutorRequestsPage