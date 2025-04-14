import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CustomerRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('pending')
  
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          customer_name: "Nguyễn Văn A",
          subject: "Toán",
          class: "Lớp 10",
          location: "Quận 1, TP.HCM",
          fee: 200000,
          created_at: "2023-11-05",
          status: "Pending"
        },
        {
          id: 2,
          customer_name: "Trần Thị B",
          subject: "Tiếng Anh",
          class: "Lớp 8",
          location: "Quận 3, TP.HCM",
          fee: 180000,
          created_at: "2023-11-04",
          status: "Approved"
        },
        {
          id: 3,
          customer_name: "Lê Văn C",
          subject: "Vật lý",
          class: "Lớp 12",
          location: "Quận 7, TP.HCM",
          fee: 220000,
          created_at: "2023-11-03",
          status: "Rejected"
        },
        {
          id: 4,
          customer_name: "Phạm Thị D",
          subject: "Hóa học",
          class: "Lớp 11",
          location: "Quận 2, TP.HCM",
          fee: 210000,
          created_at: "2023-11-02",
          status: "Pending"
        },
        {
          id: 5,
          customer_name: "Hoàng Văn E",
          subject: "Sinh học",
          class: "Lớp 9",
          location: "Quận 5, TP.HCM",
          fee: 190000,
          created_at: "2023-11-01",
          status: "Approved"
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Lọc yêu cầu theo tab đang chọn
  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true
    return request.status.toLowerCase() === activeTab
  })
  
  const handleApprove = (id) => {
    // Trong thực tế, bạn sẽ gọi API để duyệt yêu cầu
    console.log(`Duyệt yêu cầu có ID: ${id}`)
    
    // Cập nhật state để hiển thị thay đổi
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status: 'Approved' } : request
    )
    setRequests(updatedRequests)
  }
  
  const handleReject = (id) => {
    // Trong thực tế, bạn sẽ gọi API để từ chối yêu cầu
    console.log(`Từ chối yêu cầu có ID: ${id}`)
    
    // Cập nhật state để hiển thị thay đổi
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status: 'Rejected' } : request
    )
    setRequests(updatedRequests)
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Yêu cầu từ khách hàng</h1>
      
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lớp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa điểm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học phí
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
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.customer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(request.fee)} / buổi
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(request.created_at).toLocaleDateString('vi-VN')}
                    </div>
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
                        to={`/admin/customer-requests/${request.id}`} 
                        className="text-primary hover:text-primary-dark"
                      >
                        Chi tiết
                      </Link>
                      
                      {request.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Duyệt
                          </button>
                          <button 
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                      
                      {request.status === 'Approved' && (
                        <Link 
                          to={`/admin/courses/create?request_id=${request.id}`} 
                          className="text-secondary hover:text-green-700"
                        >
                          Tạo khóa học
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CustomerRequestsPage