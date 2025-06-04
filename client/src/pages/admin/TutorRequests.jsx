import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminTutorRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const renderStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Đang chờ</span>;
      case 'APPROVED':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Đã duyệt</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Đã từ chối</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      let apiUrl = 'http://localhost:8080/api/admin/tutor-requests';
      if (activeTab !== 'all') {
        apiUrl += `?status=${activeTab.toUpperCase()}`;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Vui lòng đăng nhập để truy cập danh sách yêu cầu.');
          navigate('/login');
          return;
        }

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          let errorMessage = `Lỗi API: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            errorMessage = await response.text() || 'Không có thông tin lỗi.';
          }
          console.error(`Lỗi HTTP! status: ${response.status}`, errorMessage);
          if (response.status === 401) {
            setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('token');
            navigate('/login');
          } else if (response.status === 403) {
            setError('Bạn không có quyền truy cập tài nguyên này.');
            navigate('/login');
          } else {
            throw new Error(errorMessage);
          }
        }

        const responseData = await response.json();
        if (responseData.statusCode === 1000 && responseData.data) {
          setRequests(responseData.data);
        } else {
          setError(responseData.message || 'Không tìm thấy yêu cầu nào.');
          setRequests([]);
        }
      } catch (err) {
        console.error('Không thể tải danh sách yêu cầu:', err);
        setError(`Lỗi: ${err.message}`);
        setRequests([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab, navigate]);

  const handleApprove = async (id) => {
    if (!window.confirm('Bạn có chắc muốn duyệt yêu cầu này không?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập.');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/admin/tutor-requests/${id}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        let errorMessage = 'Không thể phê duyệt yêu cầu.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = await response.text() || 'Không có thông tin lỗi.';
        }
        console.error(`Lỗi phê duyệt: status=${response.status}`, errorMessage);
        if (response.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (response.status === 404) {
          setError(`Không tìm thấy yêu cầu ID ${id}.`);
        } else if (response.status === 400) {
          setError(`Yêu cầu không hợp lệ: ${errorMessage}`);
        } else if (response.status === 500) {
          setError(`Lỗi server: ${errorMessage}`);
        } else {
          setError(`Lỗi: ${errorMessage}`);
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      if (responseData.statusCode === 1000) {
        setRequests(requests.map((r) =>
          r.id === id ? { ...r, status: 'APPROVED', approved_at: new Date(), approved_by: 'Admin' } : r
        ));
        setError(null);
        alert('Yêu cầu đã được phê duyệt thành công!');
      } else {
        throw new Error(responseData.message || 'Không thể phê duyệt yêu cầu.');
      }
    } catch (err) {
      console.error('Lỗi phê duyệt:', err);
      if (!error) setError(`Lỗi khi phê duyệt yêu cầu: ${err.message}`);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Nhập lý do từ chối:');
    if (!reason) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập.');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/admin/tutor-requests/${id}/reject`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rejection_reason: reason }),
      });

      if (!response.ok) {
        let errorMessage = 'Không thể từ chối yêu cầu.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = await response.text() || 'Không có thông tin lỗi.';
        }
        console.error(`Lỗi từ chối: status=${response.status}`, errorMessage);
        if (response.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (response.status === 404) {
          setError(`Không tìm thấy yêu cầu ID ${id}.`);
        } else if (response.status === 400) {
          setError(`Yêu cầu không hợp lệ: ${errorMessage}`);
        } else if (response.status === 500) {
          setError(`Lỗi server: ${errorMessage}`);
        } else {
          setError(`Lỗi: ${errorMessage}`);
        }
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      if (responseData.statusCode === 1000) {
        setRequests(requests.map((r) =>
          r.id === id ? { ...r, status: 'REJECTED', rejected_at: new Date(), rejected_by: 'Admin', rejection_reason: reason } : r
        ));
        setError(null);
        alert('Yêu cầu đã được từ chối thành công!');
      } else {
        throw new Error(responseData.message || 'Không thể từ chối yêu cầu.');
      }
    } catch (err) {
      console.error('Lỗi từ chối:', err);
      if (!error) setError(`Lỗi khi từ chối yêu cầu: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Duyệt Yêu Cầu Hoàn Tiền</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
      )}

      <div className="flex space-x-4 mb-6 border-b">
        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-semibold ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            {tab === 'all' ? 'Tất Cả' : tab === 'pending' ? 'Đang Chờ' : tab === 'approved' ? 'Đã Duyệt' : 'Đã Từ Chối'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Không có yêu cầu nào.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Gia Sư</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Khóa Học</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Học Sinh</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Ngày Tạo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Trạng Thái</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-2">
                    <div className="text-sm font-medium text-gray-900">{r.tutor_name}</div>
                    <div className="text-sm text-gray-500">{r.tutor_email}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-sm text-gray-700">{r.subject} - {r.class}</div>
                    <div className="text-sm text-gray-500">{r.location}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-sm text-gray-700">{r.customer_name}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-sm text-gray-600">{new Date(r.created_at).toLocaleDateString('vi-VN')}</div>
                  </td>
                  <td className="px-4 py-2">{renderStatus(r.status)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link to={`/admin/tutor-requests/${r.id}`} className="text-blue-600 hover:text-blue-800">Chi Tiết</Link>
                    {r.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(r.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => handleReject(r.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Từ Chối
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'rejected' && requests.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Chi Tiết Từ Chối</h2>
          <ul className="space-y-4">
            {requests
              .filter((r) => r.status === 'REJECTED')
              .map((r) => (
                <li key={r.id} className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <strong>{r.tutor_name}</strong> - {r.subject} {r.class} <br />
                  <span className="text-sm text-gray-600">Lý do từ chối: {r.rejection_reason}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminTutorRequestsPage;