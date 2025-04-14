import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminTutorRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)
  
  // Giả lập dữ liệu yêu cầu
  useEffect(() => {
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          tutor_name: "Nguyễn Văn A",
          tutor_id: 101,
          tutor_email: "nguyenvana@example.com",
          tutor_phone: "0987654321",
          course_id: 201,
          subject: "Toán",
          class: "Lớp 10",
          customer_name: "Lê Thị X",
          location: "Quận 1, TP.HCM",
          fee_per_session: 200000,
          sessions_per_week: 2,
          created_at: "2023-11-05",
          status: "Pending"
        },
        {
          id: 2,
          tutor_name: "Trần Thị B",
          tutor_id: 102,
          tutor_email: "tranthib@example.com",
          tutor_phone: "0987654322",
          course_id: 202,
          subject: "Tiếng Anh",
          class: "Lớp 8",
          customer_name: "Phạm Văn Y",
          location: "Quận 3, TP.HCM",
          fee_per_session: 180000,
          sessions_per_week: 3,
          created_at: "2023-11-03",
          status: "Pending"
        },
        {
          id: 3,
          tutor_name: "Phạm Văn C",
          tutor_id: 103,
          tutor_email: "phamvanc@example.com",
          tutor_phone: "0987654323",
          course_id: 203,
          subject: "Vật lý",
          class: "Lớp 12",
          customer_name: "Nguyễn Thị Z",
          location: "Quận 7, TP.HCM",
          fee_per_session: 220000,
          sessions_per_week: 2,
          created_at: "2023-10-28",
          status: "Approved",
          approved_at: "2023-10-29",
          approved_by: "Admin Nguyễn"
        },
        {
          id: 4,
          tutor_name: "Lê Thị D",
          tutor_id: 104,
          tutor_email: "lethid@example.com",
          tutor_phone: "0987654324",
          course_id: 204,
          subject: "Hóa học",
          class: "Lớp 11",
          customer_name: "Trần Văn W",
          location: "Quận 2, TP.HCM",
          fee_per_session: 210000,
          sessions_per_week: 2,
          created_at: "2023-10-25",
          status: "Rejected",
          rejected_at: "2023-10-26",
          rejected_by: "Admin Trần",
          rejection_reason: "Thông tin về trình độ chuyên môn không phù hợp với khóa học"
        },
        {
          id: 5,
          tutor_name: "Hoàng Văn E",
          tutor_id: 105,
          tutor_email: "hoangvane@example.com",
          tutor_phone: "0987654325",
          course_id: 205,
          subject: "Sinh học",
          class: "Lớp 9",
          customer_name: "Lê Văn V",
          location: "Quận 5, TP.HCM",
          fee_per_session: 190000,
          sessions_per_week: 1,
          created_at: "2023-10-20",
          status: "Approved",
          approved_at: "2023-10-21",
          approved_by: "Admin Hoàng"
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
  
  // Xử lý khi phê duyệt yêu cầu
  const handleApprove = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn phê duyệt yêu cầu này không?')) {
      // Trong thực tế, đây sẽ là API call
      // Giả lập cập nhật trạng thái
      const updatedRequests = requests.map(req => 
        req.id === id ? { 
          ...req, 
          status: 'Approved',
          approved_at: new Date().toISOString(),
          approved_by: 'Admin'
        } : req
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
        req.id === id ? { 
          ...req, 
          status: 'Rejected',
          rejected_at: new Date().toISOString(),
          rejected_by: 'Admin',
          rejection_reason: reason
        } : req
      )
      setRequests(updatedRequests)
    }
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Yêu cầu từ gia sư</h1>
      
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
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Không có yêu cầu nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gia sư
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa học
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ huynh
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày yêu cầu
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
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.tutor_name}</div>
                    <div className="text-sm text-gray-500">{request.tutor_email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.subject} - {request.class}</div>
                    <div className="text-sm text-gray-500">{request.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.customer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {request.status === 'Pending' ? 'Đang chờ' : 
                       request.status === 'Approved' ? 'Đã duyệt' : 
                       'Đã từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/admin/tutor-requests/${request.id}`} 
                        className="text-primary hover:text-primary-dark"
                      >
                        Chi tiết
                      </Link>
                      
                      {request.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-800 ml-3"
                          >
                            Duyệt
                          </button>
                          <button 
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-800 ml-3"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Chi tiết yêu cầu khi được chọn */}
      {activeTab === 'rejected' && filteredRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Lý do từ chối</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gia sư
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khóa học
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày từ chối
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người từ chối
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lý do
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map(request => (
                  <tr key={`rejection-${request.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.tutor_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.subject} - {request.class}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.rejected_at ? new Date(request.rejected_at).toLocaleDateString('vi-VN') : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.rejected_by || ''}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {request.rejection_reason || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTutorRequestsPage