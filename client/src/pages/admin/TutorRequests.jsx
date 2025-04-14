import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminTutorRequestsPage = () => {
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setRequests([
        
          {
            id: 1,
            tutor_id: 101,
            tutor_name: "Nguyễn Văn A",
            tutor_email: "nguyenvana@example.com",
            subject: "Toán",
            class: "Lớp 10",
            location: "Hà Nội",
            customer_id: 201,
            customer_name: "Trần Thị B",
            created_at: "2025-04-12T08:30:00",
            status: "Pending"
          },
          {
            id: 2,
            tutor_id: 102,
            tutor_name: "Lê Thị C",
            tutor_email: "lethic@example.com",
            subject: "Văn",
            class: "Lớp 9",
            location: "TP. Hồ Chí Minh",
            customer_id: 202,
            customer_name: "Nguyễn Văn D",
            created_at: "2025-04-10T10:15:00",
            status: "Approved",
            approved_at: "2025-04-11T14:00:00",
            approved_by: "Admin"
          },
          {
            id: 3,
            tutor_id: 103,
            tutor_name: "Phạm Văn E",
            tutor_email: "phamvane@example.com",
            subject: "Tiếng Anh",
            class: "Lớp 11",
            location: "Đà Nẵng",
            customer_id: 203,
            customer_name: "Lê Thị F",
            created_at: "2025-04-09T09:45:00",
            status: "Rejected",
            rejected_at: "2025-04-10T13:30:00",
            rejected_by: "Admin",
            rejection_reason: "Không đủ điều kiện hoàn tiền"
          },
          {
            id: 4,
            tutor_id: 104,
            tutor_name: "Trần Thị G",
            tutor_email: "tranthig@example.com",
            subject: "Hóa học",
            class: "Lớp 12",
            location: "Cần Thơ",
            customer_id: 204,
            customer_name: "Võ Minh H",
            created_at: "2025-04-13T16:20:00",
            status: "Pending"
          }
        
        
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true
    return request.status.toLowerCase() === activeTab.toLowerCase()
  })

  const handleApprove = (id) => {
    if (window.confirm('Bạn có chắc muốn duyệt yêu cầu này không?')) {
      const updated = requests.map(r => r.id === id
        ? { ...r, status: 'Approved', approved_at: new Date(), approved_by: 'Admin' }
        : r
      )
      setRequests(updated)
    }
  }

  const handleReject = (id) => {
    const reason = prompt('Nhập lý do từ chối:')
    if (reason) {
      const updated = requests.map(r => r.id === id
        ? { ...r, status: 'Rejected', rejected_at: new Date(), rejected_by: 'Admin', rejection_reason: reason }
        : r
      )
      setRequests(updated)
    }
  }

  const renderStatus = (status) => {
    switch (status) {
      case 'Pending': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Đang chờ</span>
      case 'Approved': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Đã duyệt</span>
      case 'Rejected': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Đã từ chối</span>
      default: return status
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt yêu cầu hoàn tiền</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {['all', 'pending', 'approved', 'rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold ${activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
              }`}
          >
            {tab === 'all' ? 'Tất cả' :
              tab === 'pending' ? 'Đang chờ' :
                tab === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
          </button>
        ))}
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">Không có yêu cầu nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Gia sư</th>
                <th className="px-4 py-2 text-left">Khóa học</th>
                <th className="px-4 py-2 text-left">Phụ huynh</th>
                <th className="px-4 py-2 text-left">Ngày tạo</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-2">
                    <div>{r.tutor_name}</div>
                    <div className="text-sm text-gray-500">{r.tutor_email}</div>
                  </td>
                  <td className="px-4 py-2">
                    {r.subject} - {r.class}
                    <div className="text-sm text-gray-500">{r.location}</div>
                  </td>
                  <td className="px-4 py-2">{r.customer_name}</td>
                  <td className="px-4 py-2">{new Date(r.created_at).toLocaleDateString('vi-VN')}</td>
                  <td className="px-4 py-2">{renderStatus(r.status)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/admin/tutor-requests/${r.id}`} className="text-blue-500 hover:underline">Chi tiết</Link>
                    {r.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="text-green-600 hover:underline"
                        >Duyệt</button>
                        <button
                          onClick={() => handleReject(r.id)}
                          className="text-red-600 hover:underline"
                        >Từ chối</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lý do từ chối */}
      {activeTab === 'rejected' && filteredRequests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Chi tiết từ chối</h2>
          <ul className="space-y-4">
            {filteredRequests.map(r => (
              <li key={r.id} className="p-4 bg-red-50 border border-red-200 rounded-md">
                <strong>{r.tutor_name}</strong> - {r.subject} {r.class} <br />
                <span className="text-sm text-gray-600">Lý do từ chối: {r.rejection_reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AdminTutorRequestsPage
