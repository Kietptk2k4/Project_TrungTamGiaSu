"use client"

import { useState, useEffect } from "react"
import "./Style/tutoring-form.css"

export default function TutoringRequestForm() {
  const [formData, setFormData] = useState({
    sessionsPerWeek: 1,
    sessions: [
      {
        dayOfWeek: "monday",
        startTime: "14:00",
        endTime: "16:00",
      },
    ],
    budget: "",
    subject: "",
    address: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
  })

  const [errors, setErrors] = useState({})
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  // Danh sách môn học
  const subjects = [
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Tiếng Anh",
    "Văn học",
    "Lịch sử",
    "Địa lý",
    "Tin học",
    "Mỹ thuật",
    "Âm nhạc",
    "Thể dục",
    "Ngoại ngữ",
    "Kinh tế",
    "Kinh doanh",
  ]

  // Danh sách ngày trong tuần
  const daysOfWeek = [
    { value: "monday", label: "Thứ Hai" },
    { value: "tuesday", label: "Thứ Ba" },
    { value: "wednesday", label: "Thứ Tư" },
    { value: "thursday", label: "Thứ Năm" },
    { value: "friday", label: "Thứ Sáu" },
    { value: "saturday", label: "Thứ Bảy" },
    { value: "sunday", label: "Chủ Nhật" },
  ]

  // Mock data cho tỉnh, quận, phường
  useEffect(() => {
    setProvinces([
      { id: "1", name: "Hà Nội" },
      { id: "2", name: "Hồ Chí Minh" },
      { id: "3", name: "Đà Nẵng" },
      { id: "4", name: "Hải Phòng" },
      { id: "5", name: "Cần Thơ" },
    ])
  }, [])

  useEffect(() => {
    if (formData.address?.province) {
      const mockDistricts = {
        1: [
          { id: "101", name: "Ba Đình" },
          { id: "102", name: "Hoàn Kiếm" },
          { id: "103", name: "Hai Bà Trưng" },
          { id: "104", name: "Đống Đa" },
          { id: "105", name: "Cầu Giấy" },
        ],
        2: [
          { id: "201", name: "Quận 1" },
          { id: "202", name: "Quận 2" },
          { id: "203", name: "Quận 3" },
          { id: "204", name: "Quận 4" },
          { id: "205", name: "Quận 5" },
          { id: "209", name: "Thủ Đức" },
        ],
        3: [
          { id: "301", name: "Hải Châu" },
          { id: "302", name: "Thanh Khê" },
          { id: "303", name: "Sơn Trà" },
          { id: "304", name: "Ngũ Hành Sơn" },
          { id: "305", name: "Liên Chiểu" },
        ],
        4: [
          { id: "401", name: "Hồng Bàng" },
          { id: "402", name: "Ngô Quyền" },
          { id: "403", name: "Lê Chân" },
          { id: "404", name: "Hải An" },
          { id: "405", name: "Kiến An" },
        ],
        5: [
          { id: "501", name: "Ninh Kiều" },
          { id: "502", name: "Bình Thủy" },
          { id: "503", name: "Cái Răng" },
          { id: "504", name: "Ô Môn" },
          { id: "505", name: "Thốt Nốt" },
        ],
      }

      setDistricts(mockDistricts[formData.address.province] || [])
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          district: "",
          ward: "",
        },
      })
    } else {
      setDistricts([])
    }
  }, [formData.address.province])

  useEffect(() => {
    if (formData.address?.district) {
      const mockWards = {
        101: [
          { id: "1011", name: "Phúc Xá" },
          { id: "1012", name: "Trúc Bạch" },
          { id: "1013", name: "Vĩnh Phúc" },
          { id: "1014", name: "Cống Vị" },
        ],
        102: [
          { id: "1021", name: "Hàng Bạc" },
          { id: "1022", name: "Hàng Bồ" },
          { id: "1023", name: "Hàng Đào" },
          { id: "1024", name: "Hàng Mã" },
        ],
        201: [
          { id: "2011", name: "Bến Nghé" },
          { id: "2012", name: "Bến Thành" },
          { id: "2013", name: "Cầu Kho" },
          { id: "2014", name: "Cầu Ông Lãnh" },
        ],
        209: [
          { id: "2091", name: "Linh Đông" },
          { id: "2092", name: "Linh Tây" },
          { id: "2093", name: "Linh Chiểu" },
          { id: "2094", name: "Linh Trung" },
          { id: "2095", name: "Tam Phú" },
        ],
      }

      setWards(mockWards[formData.address.district] || [])
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          ward: "",
        },
      })
    } else {
      setWards([])
    }
  }, [formData.address.district])

  const handleSessionsPerWeekChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    const newValue = Math.min(Math.max(value, 1), 7)

    let newSessions = [...formData.sessions]
    if (newValue > formData.sessions.length) {
      for (let i = formData.sessions.length; i < newValue; i++) {
        newSessions.push({
          dayOfWeek: daysOfWeek[i % 7].value,
          startTime: "14:00",
          endTime: "16:00",
        })
      }
    } else if (newValue < formData.sessions.length) {
      newSessions = newSessions.slice(0, newValue)
    }

    setFormData({
      ...formData,
      sessionsPerWeek: newValue,
      sessions: newSessions,
    })
  }

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...formData.sessions]
    updatedSessions[index] = {
      ...updatedSessions[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      sessions: updatedSessions,
    })
  }

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value,
      },
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.sessionsPerWeek || formData.sessionsPerWeek < 1) {
      newErrors.sessionsPerWeek = "Vui lòng nhập ít nhất 1 buổi mỗi tuần"
    }

    formData.sessions.forEach((session, index) => {
      if (!session.dayOfWeek) {
        newErrors[`session_${index}_day`] = "Vui lòng chọn ngày"
      }
      if (!session.startTime) {
        newErrors[`session_${index}_start`] = "Vui lòng chọn giờ bắt đầu"
      }
      if (!session.endTime) {
        newErrors[`session_${index}_end`] = "Vui lòng chọn giờ kết thúc"
      }
      if (session.startTime && session.endTime && session.startTime >= session.endTime) {
        newErrors[`session_${index}_time`] = "Giờ kết thúc phải sau giờ bắt đầu"
      }
    })

    if (!formData.budget) {
      newErrors.budget = "Vui lòng nhập ngân sách"
    } else if (isNaN(formData.budget) || Number.parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Vui lòng nhập số tiền hợp lệ"
    }

    if (!formData.subject) {
      newErrors.subject = "Vui lòng chọn môn học"
    }

    if (!formData.address.province) {
      newErrors.province = "Vui lòng chọn tỉnh/thành phố"
    }
    if (!formData.address.district) {
      newErrors.district = "Vui lòng chọn quận/huyện"
    }
    if (!formData.address.ward) {
      newErrors.ward = "Vui lòng chọn phường/xã"
    }
    if (!formData.address.street) {
      newErrors.street = "Vui lòng nhập địa chỉ đường phố"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      alert("Yêu cầu gia sư đã được gửi thành công!")
    } else {
      const firstError = document.querySelector(".error")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <div className="tutoring-container">
      <div className="tutoring-header">
        <h1>Form Yêu Cầu Gia Sư</h1>
        <p>Điền thông tin dưới đây để yêu cầu gia sư phù hợp với nhu cầu của bạn</p>
      </div>

      <div className="tutoring-card">
        <form onSubmit={handleSubmit} className="tutoring-form">
          {/* Số buổi mỗi tuần */}
          <div className="form-section">
            <h2>Yêu Cầu Buổi Học</h2>
            <div className="form-group">
              <label htmlFor="sessionsPerWeek">Số buổi mỗi tuần</label>
              <input
                type="number"
                id="sessionsPerWeek"
                name="sessionsPerWeek"
                min="1"
                max="7"
                value={formData.sessionsPerWeek}
                onChange={handleSessionsPerWeekChange}
                className={errors.sessionsPerWeek ? "error-input" : ""}
              />
              {errors.sessionsPerWeek && <span className="error">{errors.sessionsPerWeek}</span>}
            </div>

            {/* Chi tiết buổi học */}
            <div className="sessions-container">
              <h3>Chi Tiết Buổi Học</h3>
              {formData.sessions.map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-header">
                    <h4>Buổi {index + 1}</h4>
                  </div>
                  <div className="session-details">
                    <div className="form-group">
                      <label htmlFor={`day-${index}`}>Ngày trong tuần</label>
                      <select
                        id={`day-${index}`}
                        value={session.dayOfWeek}
                        onChange={(e) => handleSessionChange(index, "dayOfWeek", e.target.value)}
                        className={errors[`session_${index}_day`] ? "error-input" : ""}
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                      {errors[`session_${index}_day`] && (
                        <span className="error">{errors[`session_${index}_day`]}</span>
                      )}
                    </div>

                    <div className="time-group">
                      <div className="form-group">
                        <label htmlFor={`start-${index}`}>Giờ bắt đầu</label>
                        <input
                          type="time"
                          id={`start-${index}`}
                          value={session.startTime}
                          onChange={(e) => handleSessionChange(index, "startTime", e.target.value)}
                          className={errors[`session_${index}_start`] ? "error-input" : ""}
                        />
                        {errors[`session_${index}_start`] && (
                          <span className="error">{errors[`session_${index}_start`]}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor={`end-${index}`}>Giờ kết thúc</label>
                        <input
                          type="time"
                          id={`end-${index}`}
                          value={session.endTime}
                          onChange={(e) => handleSessionChange(index, "endTime", e.target.value)}
                          className={errors[`session_${index}_end`] ? "error-input" : ""}
                        />
                        {errors[`session_${index}_end`] && (
                          <span className="error">{errors[`session_${index}_end`]}</span>
                        )}
                      </div>
                    </div>
                    {errors[`session_${index}_time`] && (
                      <span className="error">{errors[`session_${index}_time`]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ngân sách và Môn học */}
          <div className="form-section">
            <h2>Ngân Sách và Môn Học</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budget">Ngân sách (VND)</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="VD: 300,000"
                    className={errors.budget ? "error-input" : ""}
                  />
                  <span className="currency-symbol">₫</span>
                </div>
                {errors.budget && <span className="error">{errors.budget}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Môn học</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "error-input" : ""}
                >
                  <option value="">Chọn môn học</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && <span className="error">{errors.subject}</span>}
              </div>
            </div>
          </div>

          {/* Địa chỉ */}
          <div className="form-section">
            <h2>Địa Chỉ Nhà</h2>
            <div className="form-group">
              <label htmlFor="province">Tỉnh/Thành phố</label>
              <select
                id="province"
                value={formData.address.province}
                onChange={(e) => handleAddressChange("province", e.target.value)}
                className={errors.province ? "error-input" : ""}
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              {errors.province && <span className="error">{errors.province}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="district">Quận/Huyện</label>
                <select
                  id="district"
                  value={formData.address.district}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  disabled={!formData.address.province}
                  className={errors.district ? "error-input" : ""}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && <span className="error">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ward">Phường/Xã</label>
                <select
                  id="ward"
                  value={formData.address.ward}
                  onChange={(e) => handleAddressChange("ward", e.target.value)}
                  disabled={!formData.address.district}
                  className={errors.ward ? "error-input" : ""}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                {errors.ward && <span className="error">{errors.ward}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="street">Tên đường và số nhà</label>
              <input
                type="text"
                id="street"
                value={formData.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                placeholder="VD: 79 Man Thiên"
                className={errors.street ? "error-input" : ""}
              />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Gửi Yêu Cầu Gia Sư
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}