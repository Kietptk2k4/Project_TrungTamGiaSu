import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomerRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [error, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const translateStatus = (status) => {
    const statusMap = {
      PENDING: { text: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
      APPROVED: { text: 'Approved', color: 'bg-green-100 text-green-800' },
      REJECTED: { text: 'Rejected', color: 'bg-red-100 text-red-800' },
    };
    return statusMap[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setErrorMsg(null);
      let apiUrl = 'http://localhost:8080/api/admin/customer-requests';

      if (activeTab !== 'all') {
        apiUrl += `?status=${activeTab.toUpperCase()}`;
      }

      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token || 'No token');
        if (!token) {
          setErrorMsg('Vui lòng đăng nhập để truy cập danh sách yêu cầu.');
          setLoading(false);
          navigate('/login');
          return;
        }

        console.log('Sending request to:', apiUrl);
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          let errorMessage = `Lỗi API: ${response.status}`;
          let errorBody = '';
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
            errorBody = JSON.stringify(errorData);
          } catch {
            errorBody = await response.text() || 'Không có thông tin lỗi.';
            errorMessage = errorBody || errorMessage;
          }
          console.error(`Lỗi HTTP! status: ${response.status}`, errorBody);
          if (response.status === 401) {
            setErrorMsg('Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
            localStorage.removeItem('token');
            navigate('/login');
          } else if (response.status === 403) {
            setErrorMsg('Bạn không có quyền truy cập tài nguyên này.');
            navigate('/login');
          } else {
            throw new Error(errorMessage);
          }
        }

        const responseData = await response.json();
        console.log('Phản hồi API:', responseData);
        if (responseData && responseData.statusCode === 1000 && responseData.data) {
          setRequests(responseData.data);
          setErrorMsg(null);
        } else {
          console.error('Lỗi API:', responseData.message);
          setErrorMsg('Không tìm thấy yêu cầu nào.');
          setRequests([]);
        }
      } catch (err) {
        console.error('Không thể tải danh sách yêu cầu:', err);
        if (err.message.includes('Failed to fetch')) {
          setErrorMsg('Lỗi kết nối server hoặc CORS. Vui lòng kiểm tra server.');
        } else {
          setErrorMsg('Không tìm thấy yêu cầu nào.');
        }
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab, navigate]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMsg('Vui lòng đăng nhập.');
        navigate('/login');
        return;
      }
      const response = await fetch(`http://localhost:8080/api/admin/customer-requests/${id}/approve`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        let errorMessage = 'Không thể phê duyệt yêu cầu.';
        let errorBody = '';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          errorBody = JSON.stringify(errorData);
        } catch {
          errorBody = await response.text() || 'Không có thông tin lỗi.';
          errorMessage = errorBody || errorMessage;
        }
        console.error(`Lỗi phê duyệt: status=${response.status}`, errorBody);
        if (response.status === 401) {
          setErrorMsg('Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (response.status === 404) {
          setErrorMsg(`Không tìm thấy yêu cầu ID ${id}.`);
        } else {
          setErrorMsg(`Lỗi khi phê duyệt yêu cầu: ${errorMessage}`);
        }
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      if (responseData.statusCode === 1000) {
        setRequests(requests.map((request) =>
          request.id === id ? { ...request, status: 'APPROVED' } : request
        ));
        setErrorMsg(null);
        alert('Yêu cầu đã được phê duyệt thành công!');
      } else {
        throw new Error(responseData.message || 'Không thể phê duyệt yêu cầu.');
      }
    } catch (err) {
      console.error('Lỗi phê duyệt:', err);
      if (!error) setErrorMsg(`Lỗi khi phê duyệt yêu cầu: ${err.message}`);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMsg('Vui lòng đăng nhập.');
        navigate('/login');
        return;
      }
      const response = await fetch(`http://localhost:8080/api/admin/customer-requests/${id}/reject`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        let errorMessage = 'Không thể từ chối yêu cầu.';
        let errorBody = '';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          errorBody = JSON.stringify(errorData);
        } catch {
          errorBody = await response.text() || 'Không có thông tin lỗi.';
          errorMessage = errorBody || errorMessage;
        }
        console.error(`Lỗi từ chối: status=${response.status}`, errorBody);
        if (response.status === 401) {
          setErrorMsg('Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (response.status === 404) {
          setErrorMsg(`Không tìm thấy yêu cầu ID ${id}.`);
        } else {
          setErrorMsg(`Lỗi khi từ chối yêu cầu: ${errorMessage}`);
        }
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      if (responseData.statusCode === 1000) {
        setRequests(requests.map((request) =>
          request.id === id ? { ...request, status: 'REJECTED' } : request
        ));
        setErrorMsg(null);
        alert('Yêu cầu đã được từ chối thành công!');
      } else {
        throw new Error(responseData.message || 'Không thể từ chối yêu cầu.');
      }
    } catch (err) {
      console.error('Lỗi từ chối:', err);
      if (!error) setErrorMsg(`Lỗi khi từ chối yêu cầu: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Yêu Cầu Khách Hàng</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
      )}

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          Tất Cả
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Đang Xử Lý
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'approved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('approved')}
        >
          Đã Phê Duyệt
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'rejected' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          Đã Từ Chối
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Không tìm thấy yêu cầu nào.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Khách Hàng
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Môn Học
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Tiêu Đề
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Địa Điểm
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Học Phí
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Ngày Tạo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Trạng Thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-tight">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.client_name || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{request.subject || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{request.title || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{request.location || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.fee
                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(
                            request.fee
                          ) + '/tháng'
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {request.created_at
                        ? new Date(request.created_at).toLocaleDateString('en-GB')
                        : 'N/A'}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-lg ${translateStatus(
                        request.status
                      ).color}`}
                    >
                      {translateStatus(request.status).text}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/customer-requests/${request.id}/detail`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Chi Tiết
                      </Link>
                      {request.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Phê Duyệt
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Từ Chối
                          </button>
                        </>
                      )}
                      {request.status === 'APPROVED' && (
                        <Link
                          to={`/admin/courses/create?request_id=${request.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Tạo Khóa Học
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
  );
};

export default CustomerRequestsPage;