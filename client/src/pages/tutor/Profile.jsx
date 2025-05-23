import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadImage from '../../components/fileUpload/UploadImage'
import { FileUpload } from '../../components/fileUpload/FileUpload'

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

  const [avatarImage, setAvatarImage] = useState(null);
  const [url, setUrl] = useState('');

  const handleAvatarChange = (e) => {
    setAvatarImage(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUrl(response.data.url);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };
  useEffect(() => {
    // Giả lập API call để lấy thông tin người dùng và các thông tin khác
    const fetchUserProfile = async () => {
      try {
        // Trong thực tế, đây sẽ là API call
        // const response = await api.get('/tutor/profile')
        
        // Dữ liệu giả lập
        setTimeout(() => {
          setProfile({
            name: 'Nguyễn Thị Diệu Hằng',
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
      {/* <UploadImage /> */}
     
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
            <div className="flex  gap-6 mb-6">
              <div >
                <div className  = "flex justify-between items-center mb-4">
                  <img className = "bg-center" src="data:image/jpeg;base64,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" alt="Uploaded" />
                </div>  
                <button type='button' className="block text-sm font-medium text-gray-700 mb-1">
                  Đổi ảnh đại diện
                  <input type="file" className=' text-red-500' />  
                </button>
              </div>
              <div className="grid grid-cols-2 mb-16">
                <div >
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