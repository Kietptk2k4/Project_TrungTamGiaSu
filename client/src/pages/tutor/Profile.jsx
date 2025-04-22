import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TutorProfilePage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  // User profile data state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    introduction: '',
    qualifications: '',
    teaching_experience: '',
    subjects: [],
    classes: []
  })
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Certificates state
  const [certificates, setCertificates] = useState([])
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    url : null
  })
  
  // Available subjects and classes
  const [availableSubjects, setAvailableSubjects] = useState([])
  const [availableClasses, setAvailableClasses] = useState([])
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin người dùng và các thông tin khác
    const fetchUserProfile = async () => {
      try {
        // Trong thực tế, đây sẽ là API call
        // const response = await api.get('/tutor/profile')
        
        // Dữ liệu giả lập
        setTimeout(() => {
          setProfile({
            name: 'Nguyễn Văn Thành',
            email: 'thanh.nguyen@example.com',
            phone: '0912345678',
            gender: 'MALE',
            introduction: 'Tôi là giáo viên với hơn 5 năm kinh nghiệm giảng dạy các môn Toán và Lý. Tôi có bằng Thạc sĩ Toán học từ Đại học Khoa học Tự nhiên TP.HCM và đã từng giảng dạy tại nhiều trung tâm gia sư uy tín.',
            qualifications: 'Thạc sĩ Toán học, Đại học Khoa học Tự nhiên TP.HCM (2018)',
            teaching_experience: 'Giảng dạy Toán và Lý cho học sinh từ lớp 6 đến lớp 12 từ năm 2018 đến nay. Có kinh nghiệm ôn thi đại học và các kỳ thi quốc tế.',
            subjects: [1, 4], // ID môn Toán và Lý
            classes: [6, 7, 8, 9, 10, 11, 12] // ID lớp 6-12
          })
          
          setCertificates([
            {
              id: 1,
              name: 'Bằng Thạc sĩ Toán học',
              issuer: 'Đại học Khoa học Tự nhiên TP.HCM',
              issueDate: '2018-06-15',
              fileUrl: 'https://example.com/certificate1.pdf'
            },
            {
              id: 2,
              name: 'Chứng chỉ Phương pháp giảng dạy hiện đại',
              issuer: 'Trung tâm Nghiên cứu Giáo dục',
              issueDate: '2019-08-20',
              fileUrl: 'https://example.com/certificate2.pdf'
            }
          ])
          
          setAvailableSubjects([
            { id: 1, name: 'Toán' },
            { id: 2, name: 'Văn' },
            { id: 3, name: 'Tiếng Anh' },
            { id: 4, name: 'Vật lý' },
            { id: 5, name: 'Hóa học' },
            { id: 6, name: 'Sinh học' }
          ])
          
          setAvailableClasses([
            { id: 1, name: 'Lớp 1' },
            { id: 2, name: 'Lớp 2' },
            { id: 3, name: 'Lớp 3' },
            { id: 4, name: 'Lớp 4' },
            { id: 5, name: 'Lớp 5' },
            { id: 6, name: 'Lớp 6' },
            { id: 7, name: 'Lớp 7' },
            { id: 8, name: 'Lớp 8' },
            { id: 9, name: 'Lớp 9' },
            { id: 10, name: 'Lớp 10' },
            { id: 11, name: 'Lớp 11' },
            { id: 12, name: 'Lớp 12' }
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
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value
    })
  }
  
  // Handle subject selection
  const handleSubjectChange = (subjectId) => {
    if (profile.subjects.includes(subjectId)) {
      setProfile({
        ...profile,
        subjects: profile.subjects.filter(id => id !== subjectId)
      })
    } else {
      setProfile({
        ...profile,
        subjects: [...profile.subjects, subjectId]
      })
    }
  }
  
  // Handle class selection
  const handleClassChange = (classId) => {
    if (profile.classes.includes(classId)) {
      setProfile({
        ...profile,
        classes: profile.classes.filter(id => id !== classId)
      })
    } else {
      setProfile({
        ...profile,
        classes: [...profile.classes, classId]
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
  
  // Handle certificate form changes
  const handleCertificateChange = (e) => {
    const { name, value } = e.target
    setNewCertificate({
      ...newCertificate,
      [name]: value
    })
  }
  
  // Handle file upload
  const handleFileChange = (e) => {
    setNewCertificate({
      ...newCertificate,
      file: e.target.files[0]
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
      
      if (profile.subjects.length === 0) {
        throw new Error('Vui lòng chọn ít nhất một môn học')
      }
      
      if (profile.classes.length === 0) {
        throw new Error('Vui lòng chọn ít nhất một lớp dạy')
      }
      
      // Trong thực tế, đây sẽ là API call
      // await api.put('/tutor/profile', profile)
      
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
      // await api.put('/tutor/password', passwordData)
      
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
  
  // Add new certificate
  const handleAddCertificate = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    setError(null)
    
    try {
      // Validate form
      if (!newCertificate.name.trim()) {
        throw new Error('Vui lòng nhập tên chứng chỉ')
      }
      
      if (!newCertificate.issuer.trim()) {
        throw new Error('Vui lòng nhập tên đơn vị cấp')
      }
      
      if (!newCertificate.issueDate) {
        throw new Error('Vui lòng chọn ngày cấp')
      }
      
      if (!newCertificate.file) {
        throw new Error('Vui lòng tải lên file chứng chỉ')
      }
      
      // Trong thực tế, đây sẽ là API call để upload file và tạo chứng chỉ mới
      // const formData = new FormData()
      // formData.append('name', newCertificate.name)
      // formData.append('issuer', newCertificate.issuer)
      // formData.append('issueDate', newCertificate.issueDate)
      // formData.append('certificateFile', newCertificate.file)
      // await api.post('/tutor/certificates', formData)
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Giả lập thêm chứng chỉ mới
      const newId = certificates.length > 0 ? Math.max(...certificates.map(cert => cert.id)) + 1 : 1
      setCertificates([
        ...certificates,
        {
          id: newId,
          name: newCertificate.name,
          issuer: newCertificate.issuer,
          issueDate: newCertificate.issueDate,
          fileUrl: URL.createObjectURL(newCertificate.file)
        }
      ])
      
      // Reset form
      setNewCertificate({
        name: '',
        issuer: '',
        issueDate: '',
        file: null
      })
      
      setSuccessMessage('Thêm chứng chỉ thành công!')
    } catch (error) {
      console.error('Error adding certificate:', error)
      setError(error.message || 'Đã xảy ra lỗi khi thêm chứng chỉ. Vui lòng thử lại sau.')
    } finally {
      setIsUploading(false)
    }
  }
  
  // Delete certificate
  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chứng chỉ này không?')) {
      try {
        // Trong thực tế, đây sẽ là API call
        // await api.delete(`/tutor/certificates/${id}`)
        
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Cập nhật state
        setCertificates(certificates.filter(cert => cert.id !== id))
        setSuccessMessage('Xóa chứng chỉ thành công!')
      } catch (error) {
        console.error('Error deleting certificate:', error)
        setError('Đã xảy ra lỗi khi xóa chứng chỉ. Vui lòng thử lại sau.')
      }
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
      <h1 className="text-2xl font-bold mb-6">Thông tin gia sư</h1>
      
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
      
      {/* Thông tin cơ bản */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới thiệu bản thân
              </label>
              {isEditing ? (
                <textarea
                  name="introduction"
                  value={profile.introduction}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                ></textarea>
              ) : (
                <p className="text-gray-900">{profile.introduction}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bằng cấp, chứng chỉ
              </label>
              {isEditing ? (
                <textarea
                  name="qualifications"
                  value={profile.qualifications}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                ></textarea>
              ) : (
                <p className="text-gray-900">{profile.qualifications}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kinh nghiệm giảng dạy
              </label>
              {isEditing ? (
                <textarea
                  name="teaching_experience"
                  value={profile.teaching_experience}
                  onChange={handleProfileChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                ></textarea>
              ) : (
                <p className="text-gray-900">{profile.teaching_experience}</p>
              )}
            </div>
            
            {isEditing && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Môn học <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableSubjects.map(subject => (
                      <div key={subject.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`subject-${subject.id}`}
                          checked={profile.subjects.includes(subject.id)}
                          onChange={() => handleSubjectChange(subject.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor={`subject-${subject.id}`} className="ml-2 text-sm text-gray-700">
                          {subject.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lớp dạy <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableClasses.map(classItem => (
                      <div key={classItem.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`class-${classItem.id}`}
                          checked={profile.classes.includes(classItem.id)}
                          onChange={() => handleClassChange(classItem.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor={`class-${classItem.id}`} className="ml-2 text-sm text-gray-700">
                          {classItem.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {!isEditing && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Môn dạy</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSubjects
                      .filter(subject => profile.subjects.includes(subject.id))
                      .map(subject => (
                        <span key={subject.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {subject.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lớp dạy</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableClasses
                      .filter(classItem => profile.classes.includes(classItem.id))
                      .map(classItem => (
                        <span key={classItem.id} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {classItem.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              </>
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
      
      {/* Chứng chỉ */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold">Chứng chỉ & Bằng cấp</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Thêm chứng chỉ mới</h3>
            <form onSubmit={handleAddCertificate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên chứng chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCertificate.name}
                    onChange={handleCertificateChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Đơn vị cấp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="issuer"
                    value={newCertificate.issuer}
                    onChange={handleCertificateChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày cấp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={newCertificate.issueDate}
                    onChange={handleCertificateChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    File chứng chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-1.5 focus:ring-primary focus:border-primary"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Hỗ trợ file PDF, JPG, JPEG, PNG (tối đa 5MB)</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none"
                  disabled={isUploading}
                >
                  {isUploading ? 'Đang tải lên...' : 'Thêm chứng chỉ'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium mb-3">Chứng chỉ đã tải lên</h3>
            
            {certificates.length === 0 ? (
              <p className="text-gray-500">Chưa có chứng chỉ nào được tải lên.</p>
            ) : (
              <div className="space-y-4">
                {certificates.map(cert => (
                  <div key={cert.id} className="flex flex-col md:flex-row justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">Ngày cấp: {new Date(cert.issueDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="flex items-center mt-3 md:mt-0">
                      <a 
                        href={cert.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark mr-4"
                      >
                        Xem
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
           // Tiếp tục từ đoạn code trước
        )}
        </div>
      </div>
    </div>
    
    {/* Đổi mật khẩu */}
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

export default TutorProfilePage