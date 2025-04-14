import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerProfilePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  // User profile data state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    province_id: '',
    district_id: '',
    ward_id: ''
  })
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Location data for address
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin người dùng
    const fetchUserProfile = async () => {
      try {
        // Trong thực tế, đây sẽ là API call
        // const response = await api.get('/customer/profile')
        
        // Dữ liệu giả lập
        setTimeout(() => {
          setProfile({
            name: 'Nguyễn Thị Hồng',
            email: 'hong.nguyen@example.com',
            phone: '0901234567',
            gender: 'FEMALE',
            address: '123 Đường Lê Lợi',
            province_id: 'P02',
            district_id: 'D04',
            ward_id: 'W03'
          })
          
          // Load location data
          setProvinces([
            { id: 'P01', name: 'Hà Nội' },
            { id: 'P02', name: 'TP. Hồ Chí Minh' },
            { id: 'P03', name: 'Đà Nẵng' }
          ])
          
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setError('Không thể tải thông tin cá nhân. Vui lòng thử lại sau.')
        setIsLoading(false)
      }
    }
    
    fetchUserProfile()
  }, [])
  
  // Load districts when province changes
  useEffect(() => {
    if (profile.province_id) {
      // Giả lập API call
      setTimeout(() => {
        if (profile.province_id === 'P01') {
          setDistricts([
            { id: 'D01', name: 'Ba Đình' },
            { id: 'D02', name: 'Hoàn Kiếm' },
            { id: 'D03', name: 'Hai Bà Trưng' }
          ])
        } else if (profile.province_id === 'P02') {
          setDistricts([
            { id: 'D04', name: 'Quận 1' },
            { id: 'D05', name: 'Quận 2' },
            { id: 'D06', name: 'Quận 3' }
          ])
        } else {
          setDistricts([
            { id: 'D07', name: 'Hải Châu' },
            { id: 'D08', name: 'Thanh Khê' },
            { id: 'D09', name: 'Liên Chiểu' }
          ])
        }
      }, 300)
    } else {
      setDistricts([])
      setWards([])
    }
  }, [profile.province_id])
  
  // Load wards when district changes
  useEffect(() => {
    if (profile.district_id) {
      // Giả lập API call
      setTimeout(() => {
        if (profile.district_id === 'D01' || profile.district_id === 'D04' || profile.district_id === 'D07') {
          setWards([
            { id: 'W01', name: 'Phường 1' },
            { id: 'W02', name: 'Phường 2' },
            { id: 'W03', name: 'Phường 3' }
          ])
        } else if (profile.district_id === 'D02' || profile.district_id === 'D05' || profile.district_id === 'D08') {
          setWards([
            { id: 'W04', name: 'Phường 4' },
            { id: 'W05', name: 'Phường 5' },
            { id: 'W06', name: 'Phường 6' }
          ])
        } else {
          setWards([
            { id: 'W07', name: 'Phường 7' },
            { id: 'W08', name: 'Phường 8' },
            { id: 'W09', name: 'Phường 9' }
          ])
        }
      }, 300)
    } else {
      setWards([])
    }
  }, [profile.district_id])
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    
    // Reset dependent fields when changing province or district
    if (name === 'province_id') {
      setProfile({
        ...profile,
        [name]: value,
        district_id: '',
        ward_id: ''
      })
    } else if (name === 'district_id') {
      setProfile({
        ...profile,
        [name]: value,
        ward_id: ''
      })
    } else {
      setProfile({
        ...profile,
        [name]: value
      })
    }
  }
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value
    })
  }
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing)
    setError(null)
    setSuccessMessage(null)
  }
  
  // Save profile changes
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      // Validate form
      if (!profile.name.trim()) {
        throw new Error('Vui lòng nhập họ tên')
      }
      
      if (!profile.phone.trim()) {
        throw new Error('Vui lòng nhập số điện thoại')
      }
      
      // Trong thực tế, đây sẽ là API call
      // await api.put('/customer/profile', profile)
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage('Cập nhật thông tin cá nhân thành công!')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setError(error.message || 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Change password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      // Validate form
      if (!passwordData.currentPassword) {
        throw new Error('Vui lòng nhập mật khẩu hiện tại')
      }
      
      if (!passwordData.newPassword) {
        throw new Error('Vui lòng nhập mật khẩu mới')
      }
      
      if (passwordData.newPassword.length < 8) {
        throw new Error('Mật khẩu mới phải có ít nhất 8 ký tự')
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Xác nhận mật khẩu không khớp')
      }
      
      // Trong thực tế, đây sẽ là API call
      // await api.put('/customer/password', passwordData)
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage('Đổi mật khẩu thành công!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error changing password:', error)
      setError(error.message || 'Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.')
    } finally {
      setIsSaving(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Đang tải thông tin...</p>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
          <button
            type="button"
            onClick={toggleEditMode}
            className="text-primary hover:text-primary-dark"
          >
            {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    required
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{profile.email}</p>
                <p className="text-sm text-gray-500 mt-1">Email không thể thay đổi</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    required
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới tính
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleProfileChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                ) : (
                  <p className="text-gray-900">
                    {profile.gender === 'MALE' ? 'Nam' : profile.gender === 'FEMALE' ? 'Nữ' : ''}
                  </p>
                )}
              </div>
            </div>
            
            {isEditing && (
              <>
                <h3 className="font-medium text-gray-900 mt-6 mb-3">Địa chỉ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tỉnh/Thành phố
                    </label>
                    <select
                      name="province_id"
                      value={profile.province_id}
                      onChange={handleProfileChange}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quận/Huyện
                    </label>
                    <select
                      name="district_id"
                      value={profile.district_id}
                      onChange={handleProfileChange}
                      disabled={!profile.province_id}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phường/Xã
                    </label>
                    <select
                      name="ward_id"
                      value={profile.ward_id}
                      onChange={handleProfileChange}
                      disabled={!profile.district_id}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map(ward => (
                        <option key={ward.id} value={ward.id}>{ward.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ chi tiết
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    placeholder="Số nhà, tên đường, khu vực"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </>
            )}
            
            {!isEditing && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Địa chỉ</h3>
                <p className="text-gray-900">
                  {profile.address && `${profile.address}, `}
                  {wards.find(w => w.id === profile.ward_id)?.name && `${wards.find(w => w.id === profile.ward_id)?.name}, `}
                  {districts.find(d => d.id === profile.district_id)?.name && `${districts.find(d => d.id === profile.district_id)?.name}, `}
                  {provinces.find(p => p.id === profile.province_id)?.name}
                </p>
              </div>
            )}
            
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
                  disabled={isSaving}
                >
                  {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                  required
                  minLength={8}
                />
                <p className="text-sm text-gray-500 mt-1">Mật khẩu phải có ít nhất 8 ký tự</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
                disabled={isSaving}
              >
                {isSaving ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfilePage