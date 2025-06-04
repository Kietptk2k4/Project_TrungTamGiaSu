import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name] || errors.auth) {
      setErrors({
        ...errors,
        [name]: null,
        auth: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Support CORS with credentials
      });

      if (response.data.statusCode === 1000) {
        const { token, user } = response.data.data;
        console.log('Đăng nhập thành công:', { token, user });

        // Save token and user info to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on role
        switch (user.role) {
          case 'TUTOR':
            navigate('/tutor/dashboard');
            break;
          case 'CUSTOMER':
            navigate('/customer/dashboard');
            break;
          case 'ADMIN':
            navigate('/admin/customer-requests');
            break;
          default:
            navigate('/');
        }
      } else {
        setErrors({ auth: response.data.message || 'Đăng nhập thất bại.' });
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      if (error.response) {
        // Server responded with error (4xx, 5xx)
        const message = error.response.data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.';
        setErrors({ auth: message });
      } else if (error.request) {
        // No response (CORS, network error)
        setErrors({ auth: 'Lỗi mạng hoặc CORS. Vui lòng kiểm tra server.' });
      } else {
        // Other errors
        setErrors({ auth: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary text-white py-4 px-6">
          <h2 className="text-black font-bold text-center">Đăng nhập</h2>
        </div>

        <form onSubmit={handleSubmit} className="py-6 px-8">
          {errors.auth && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{errors.auth}</div>
          )}
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`bg-gray-50 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`bg-gray-50 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full text-black bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center border border-black ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>

          <div className="text-sm text-gray-700 mt-6 text-center">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;