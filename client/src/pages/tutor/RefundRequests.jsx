import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RefundRequestsPage = () => {
  const [refundRequests, setRefundRequests] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)
  
  // Giả lập dữ liệu yêu cầu hoàn tiền
  useEffect(() => {
    setTimeout(() => {
      setRefundRequests([
        {
          id: 1,
          course_id: 101,
          course_subject: "Toán",
          course_class: "Lớp 10",
          customer_name: "Nguyễn Văn X",
          reason: "Không thể tiếp tục dạy do lịch trình cá nhân thay đổi",
          created_at: "2023-11-05",
          status: "Pending",
          amount_requested: 600000,
          admin_feedback: null
        },
        {
          id: 2,
          course_id: 102,
          course_subject: "Tiếng Anh",
          course_class: "Lớp 8",
          customer_name: "Trần Thị Y",
          reason: "Học sinh thay đổi lịch học không phù hợp với lịch cá nhân",
          created_at: "2023-10-28",
          status: "Approved",
          amount_requested: 520000,
          amount_approved: 520000,
          admin_feedback: "Yêu cầu hoàn tiền hợp lý, đã duyệt",
          payment_date: "2023-11-02"
        },
        {
          id: 3,
          course_id: 103,
          course_subject: "Vật lý",
          course_class: "Lớp 12",
          customer_name: "Phạm Văn Z",
          reason: "Chuyển nơi ở sang tỉnh khác",
          created_at: "2023-10-20",
          status: "PartiallyApproved",
          amount_requested: 800000,
          amount_approved: 600000,
          admin_feedback: "Hoàn tiền một phần do đã dạy 2 buổi"
        },
        {
          id: 4,
          course_id: 104,
          course_subject: "Hóa học",
          course_class: "Lớp 11",
          customer_name: "Lê Văn W",
          reason: "Bệnh không thể dạy trong tháng tới",
          created_at: "2023-10-15",
          status: "Rejected",
          amount_requested: 450000,
          admin_feedback: "Đề nghị hỗ trợ tìm gia sư thay thế thay vì hoàn tiền"
        },
        {
          id: 5,
          course_id: 105,
          course_subject: "Sinh học",
          course_class: "Lớp 9",
          customer_name: "Hoàng Thị V",
          reason: "Học sinh không hợp tác trong quá trình học tập",
          created_at: "2023-10-10",
          status: "Cancelled",
          amount_requested: 340000,
          admin_feedback: null
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Lọc yêu cầu theo tab đang chọn
  const filteredRequests = refundRequests.filter(request => {
    if (activeTab === 'all') return true
    if (activeTab === 'approved') return request.status === 'Approved' || request.status === 'PartiallyApproved'
    return request.status.toLowerCase() === activeTab.toLowerCase()
  })
  
  // Xử lý khi hủy yêu cầu hoàn tiền
  const handleCancelRequest = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy yêu cầu hoàn tiền này không?')) {
      // Trong thực tế, đây sẽ là API call
      // Giả lập cập nhật trạng thái
      const updatedRequests = refundRequests.map(req => 
        req.id === id ? { ...req, status: 'Cancelled' } : req
      )
      setRefundRequests(updatedRequests)
    }
  }
  
  // Hàm lấy tên trạng thái tiếng Việt
  const getStatusName = (status) => {
    switch (status) {
      case 'Pending': return 'Đang chờ duyệt'
      case 'Approved': return 'Đã duyệt'
      case 'PartiallyApproved': return 'Duyệt một phần'
      case 'Rejected': return 'Đã từ chối'
      case 'Cancelled': return 'Đã hủy'
      default: return status
    }
  }
  
  // Hàm lấy màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'PartiallyApproved': return 'bg-blue-100 text-blue-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      case 'Cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Yêu cầu hoàn tiền</h1>
        <Link
          to="/tutor/refunds/create"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Tạo yêu cầu mới
        </Link>
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
            className={`py-2 px-4 font-medium ${activeTab === 'create' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('create')}
          >
            Tạo yêu cầu
        </button>

        <button
          className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pending')}
        >
          Đang chờ duyệt
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'approved' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('approved')}
        >
          Đã duyệt
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'rejected' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('rejected')}
        >
          Đã từ chối
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
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : activeTab === 'create' ? (
        <RefundForm
          onSubmit={(newRequest) => {
            setRefundRequests([...refundRequests, newRequest])
            setActiveTab('pending')
          }}
        />
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">Không có yêu cầu hoàn tiền nào trong danh mục này.</p>
          <Link 
            to="/tutor/refunds/create" 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Tạo yêu cầu hoàn tiền mới
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
                      {request.course_subject} - {request.course_class}
                    </h2>
                    <p className="text-gray-600">Học sinh: {request.customer_name}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {getStatusName(request.status)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Ngày yêu cầu</p>
                    <p className="font-medium">
                      {new Date(request.created_at).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Số tiền yêu cầu hoàn</p>
                    <p className="font-medium">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(request.amount_requested)}
                    </p>
                  </div>
                  <div>
                    {(request.status === 'Approved' || request.status === 'PartiallyApproved') && (
                      <>
                        <p className="text-sm text-gray-500">Số tiền được duyệt</p>
                        <p className="font-medium">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(request.amount_approved)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2">Lý do yêu cầu hoàn tiền:</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{request.reason}</p>
                </div>
                
                {request.admin_feedback && (
                  <div className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Phản hồi từ admin:</h3>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{request.admin_feedback}</p>
                  </div>
                )}
                
                {request.status === 'Approved' && request.payment_date && (
                  <div className="mb-4 p-3 bg-green-50 rounded-md">
                    <p className="text-sm font-medium text-green-800">
                      Tiền hoàn đã được chuyển vào ngày {new Date(request.payment_date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end mt-4">
                  <Link
                    to={`/tutor/refunds/${request.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 mr-2"
                  >
                    Xem chi tiết
                  </Link>
                  
                  {request.status === 'Pending' && (
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                    >
                      Hủy yêu cầu
                    </button>
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

export default RefundRequestsPage
const RefundForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    course_subject: '',
    course_class: '',
    customer_name: '',
    reason: '',
    amount_requested: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRequest = {
      id: Date.now(),
      course_id: Math.floor(Math.random() * 1000),
      ...form,
      created_at: new Date().toISOString(),
      status: 'Pending'
    }
    onSubmit(newRequest)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Tạo yêu cầu hoàn tiền</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="course_subject"
          placeholder="Môn học"
          value={form.course_subject}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="course_class"
          placeholder="Lớp học"
          value={form.course_class}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="customer_name"
          placeholder="Tên học sinh / phụ huynh"
          value={form.customer_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="reason"
          placeholder="Lý do yêu cầu hoàn tiền"
          value={form.reason}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="amount_requested"
          placeholder="Số tiền yêu cầu hoàn (VND)"
          value={form.amount_requested}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-primary-dark mt-2"
        >
          Gửi yêu cầu
        </button>
      </div>
    </form>
  )
}
