import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TutorRequest = () => {
  const navigate = useNavigate()
  
  // State cho form yêu cầu
  const [formData, setFormData] = useState({
    subject_id: '',
    class_id: '',
    sessions_per_week: 2,
    fee_per_session: '',
    province_id: '',
    district_id: '',
    ward_id: '',
    address_detail: '',
    specific_tutor_id: '',
    schedule: [
      { day_of_week: 2, start_time: '18:00', end_time: '19:30' },
      { day_of_week: 5, start_time: '18:00', end_time: '19:30' }
    ]
  })
  
  // State cho select options
  const [subjects, setSubjects] = useState([])
  const [classes, setClasses] = useState([])
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [tutors, setTutors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // State cho scheduling
  const [specificTutor, setSpecificTutor] = useState(false)
  
  // Mock data cho các options
  useEffect(() => {
    // Giả lập API call
    setTimeout(() => {
      setSubjects([
        { id: 1, name: "Toán" },
        { id: 2, name: "Văn" },
        { id: 3, name: "Tiếng Anh" },
        { id: 4, name: "Vật lý" },
        { id: 5, name: "Hóa học" }
      ])
      
      setClasses([
        { id: 1, name: "Lớp 1" },
        { id: 2, name: "Lớp 2" },
        { id: 3, name: "Lớp 3" },
        { id: 4, name: "Lớp 4" },
        { id: 5, name: "Lớp 5" },
        { id: 6, name: "Lớp 6" },
        { id: 7, name: "Lớp 7" },
        { id: 8, name: "Lớp 8" },
        { id: 9, name: "Lớp 9" },
        { id: 10, name: "Lớp 10" },
        { id: 11, name: "Lớp 11" },
        { id: 12, name: "Lớp 12" }
      ])
      
      setProvinces([
        { id: "P01", name: "Hà Nội" },
        { id: "P02", name: "TP. Hồ Chí Minh" },
        { id: "P03", name: "Đà Nẵng" }
      ])
      
      setTutors([
        { id: 1, name: "Nguyễn Văn A" },
        { id: 2, name: "Trần Thị B" },
        { id: 3, name: "Lê Văn C" }
      ])
      
      setIsLoading(false)
    }, 1000)
  }, [])
  
  // Load districts khi chọn province
  useEffect(() => {
    if (formData.province_id) {
      // Giả lập API call
      setTimeout(() => {
        if (formData.province_id === 'P01') {
          setDistricts([
            { id: "D01", name: "Ba Đình" },
            { id: "D02", name: "Hoàn Kiếm" },
            { id: "D03", name: "Hai Bà Trưng" }
          ])
        } else if (formData.province_id === 'P02') {
          setDistricts([
            { id: "D04", name: "Quận 1" },
            { id: "D05", name: "Quận 2" },
            { id: "D06", name: "Quận 3" }
          ])
        } else {
          setDistricts([
            { id: "D07", name: "Hải Châu" },
            { id: "D08", name: "Thanh Khê" },
            { id: "D09", name: "Liên Chiểu" }
          ])
        }
        setFormData(prev => ({ ...prev, district_id: '', ward_id: '' }))
      }, 500)
    } else {
      setDistricts([])
      setWards([])
    }
  }, [formData.province_id])
  
  // Load wards khi chọn district
  useEffect(() => {
    if (formData.district_id) {
      // Giả lập API call
      setTimeout(() => {
        if (formData.district_id === 'D01') {
          setWards([
            { id: "W01", name: "Phường Phúc Xá" },
            { id: "W02", name: "Phường Trúc Bạch" }
          ])
        } else if (formData.district_id === 'D04') {
          setWards([
            { id: "W03", name: "Phường Bến Nghé" },
            { id: "W04", name: "Phường Bến Thành" }
          ])
        } else {
          setWards([
            { id: "W05", name: "Phường Mẫu mã 1" },
            { id: "W06", name: "Phường Mẫu mã 2" }
          ])
        }
        setFormData(prev => ({ ...prev, ward_id: '' }))
      }, 500)
    } else {
      setWards([])
    }
  }, [formData.district_id])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule]
    newSchedule[index] = { ...newSchedule[index], [field]: value }
    setFormData({
      ...formData,
      schedule: newSchedule
    })
  }
  
  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { day_of_week: 2, start_time: '18:00', end_time: '19:30' }
      ]
    })
  }
  
  const removeScheduleItem = (index) => {
    const newSchedule = [...formData.schedule]
    newSchedule.splice(index, 1)
    setFormData({
      ...formData,
      schedule: newSchedule
    })
  }
  
  const handleTutorTypeChange = (e) => {
    const value = e.target.value
    setSpecificTutor(value === 'specific')
    // Nếu không chọn gia sư cụ thể thì reset specific_tutor_id
    if (value !== 'specific') {
      setFormData({
        ...formData,
        specific_tutor_id: ''
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    
    // Giả lập API call để tạo yêu cầu
    setTimeout(() => {
      alert('Yêu cầu đã được gửi thành công!')
      navigate('/customer')
    }, 1000)
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Đang tải...</p>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Tạo yêu cầu gia sư mới</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Thông tin khóa học</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Môn học <span className="text-red-500">*</span>
              </label>
              <select
                name="subject_id"
                value={formData.subject_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn môn học</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lớp <span className="text-red-500">*</span>
              </label>
              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Chọn lớp</option>
                {classes.map(classItem => (
                  <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số buổi học mỗi tuần <span className="text-red-500">*</span>
              </label>
              <select
                name="sessions_per_week"
                value={formData.sessions_per_week}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              >
                <option value="1">1 buổi</option>
                <option value="2">2 buổi</option>
                <option value="3">3 buổi</option>
                <option value="4">4 buổi</option>
                <option value="5">5 buổi</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Học phí đề xuất (VNĐ/buổi) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fee_per_session"
                value={formData.fee_per_session}
                onChange={handleChange}
                placeholder="Ví dụ: 200000"
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Lịch học</h2>
          <p className="text-sm text-gray-600 mb-4">Vui lòng chọn thời gian học trong tuần</p>
          
          {formData.schedule.map((item, index) => (
            <div key={index} className="flex flex-wrap items-center gap-4 mb-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thứ
                </label>
                <select
                  value={item.day_of_week}
                  onChange={(e) => handleScheduleChange(index, 'day_of_week', e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                >
                  <option value="2">Thứ Hai</option>
                  <option value="3">Thứ Ba</option>
                  <option value="4">Thứ Tư</option>
                  <option value="5">Thứ Năm</option>
                  <option value="6">Thứ Sáu</option>
                  <option value="7">Thứ Bảy</option>
                  <option value="1">Chủ Nhật</option>
                </select>
              </div>
              
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ bắt đầu
                </label>
                <input
                  type="time"
                  value={item.start_time}
                  onChange={(e) => handleScheduleChange(index, 'start_time', e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giờ kết thúc
                </label>
                <input
                  type="time"
                  value={item.end_time}
                  onChange={(e) => handleScheduleChange(index, 'end_time', e.target.value)}
                  className="w-full md:w-36 border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              {formData.schedule.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScheduleItem(index)}
                  className="mt-5 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          
          {formData.schedule.length < 5 && (
            <button
              type="button"
              onClick={addScheduleItem}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Thêm lịch học
            </button>
          )}
        </div>
        
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Địa chỉ học</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <select
                  name="province_id"
                  value={formData.province_id}
                  onChange={handleChange}
                  required
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
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <select
                  name="district_id"
                  value={formData.district_id}
                  onChange={handleChange}
                  required
                  disabled={!formData.province_id}
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
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <select
                  name="ward_id"
                  value={formData.ward_id}
                  onChange={handleChange}
                  required
                  disabled={!formData.district_id}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map(ward => (
                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ chi tiết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address_detail"
                value={formData.address_detail}
                onChange={handleChange}
                placeholder="Số nhà, tên đường, thông tin bổ sung..."
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Lựa chọn gia sư</h2>
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tutor_type"
                    value="any"
                    checked={!specificTutor}
                    onChange={handleTutorTypeChange}
                    className="form-radio h-4 w-4 text-primary"
                  />
                  <span className="ml-2">Để trung tâm chọn gia sư phù hợp</span>
                </label>
                
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tutor_type"
                    value="specific"
                    checked={specificTutor}
                    onChange={handleTutorTypeChange}
                    className="form-radio h-4 w-4 text-primary"
                  />
                  <span className="ml-2">Chọn gia sư cụ thể</span>
                </label>
              </div>
            </div>
            
            {specificTutor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn gia sư <span className="text-red-500">*</span>
                </label>
                <select
                  name="specific_tutor_id"
                  value={formData.specific_tutor_id}
                  onChange={handleChange}
                  required={specificTutor}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Chọn gia sư</option>
                  {tutors.map(tutor => (
                    <option key={tutor.id} value={tutor.id}>{tutor.name}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  *Lưu ý: Yêu cầu của bạn sẽ được gửi trực tiếp đến gia sư này, họ có quyền chấp nhận hoặc từ chối.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/customer')}
              className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    )
}

export default TutorRequest