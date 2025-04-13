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

  // Subjects list
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Literature",
    "History",
    "Geography",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Foreign Language",
    "Economics",
    "Business Studies",
  ]

  // Days of the week
  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  // Mock data for provinces, districts, and wards
  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulate fetching provinces
    setProvinces([
      { id: "1", name: "Hà Nội" },
      { id: "2", name: "Hồ Chí Minh" },
      { id: "3", name: "Đà Nẵng" },
      { id: "4", name: "Hải Phòng" },
      { id: "5", name: "Cần Thơ" },
    ])
  }, [])

  useEffect(() => {
    // Reset districts and wards when province changes
    if (formData.address?.province) {
      // Simulate fetching districts based on selected province
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
    // Reset wards when district changes
    if (formData.address?.district) {
      // Simulate fetching wards based on selected district
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
        // Add more mock wards for other districts as needed
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

  // Handle number of sessions change
  const handleSessionsPerWeekChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    const newValue = Math.min(Math.max(value, 1), 7) // Limit between 1 and 7

    // Update sessions array based on new count
    let newSessions = [...formData.sessions]
    if (newValue > formData.sessions.length) {
      // Add new sessions
      for (let i = formData.sessions.length; i < newValue; i++) {
        newSessions.push({
          dayOfWeek: daysOfWeek[i % 7].value,
          startTime: "14:00",
          endTime: "16:00",
        })
      }
    } else if (newValue < formData.sessions.length) {
      // Remove excess sessions
      newSessions = newSessions.slice(0, newValue)
    }

    setFormData({
      ...formData,
      sessionsPerWeek: newValue,
      sessions: newSessions,
    })
  }

  // Handle session detail changes
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

  // Handle address changes
  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value,
      },
    })
  }

  // Handle general form changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate sessions per week
    if (!formData.sessionsPerWeek || formData.sessionsPerWeek < 1) {
      newErrors.sessionsPerWeek = "Please enter at least 1 session per week"
    }

    // Validate sessions
    formData.sessions.forEach((session, index) => {
      if (!session.dayOfWeek) {
        newErrors[`session_${index}_day`] = "Please select a day"
      }
      if (!session.startTime) {
        newErrors[`session_${index}_start`] = "Please select a start time"
      }
      if (!session.endTime) {
        newErrors[`session_${index}_end`] = "Please select an end time"
      }
      if (session.startTime && session.endTime && session.startTime >= session.endTime) {
        newErrors[`session_${index}_time`] = "End time must be after start time"
      }
    })

    // Validate budget
    if (!formData.budget) {
      newErrors.budget = "Please enter your budget"
    } else if (isNaN(formData.budget) || Number.parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Please enter a valid budget amount"
    }

    // Validate subject
    if (!formData.subject) {
      newErrors.subject = "Please select a subject"
    }

    // Validate address
    if (!formData.address.province) {
      newErrors.province = "Please select a province"
    }
    if (!formData.address.district) {
      newErrors.district = "Please select a district"
    }
    if (!formData.address.ward) {
      newErrors.ward = "Please select a ward"
    }
    if (!formData.address.street) {
      newErrors.street = "Please enter your street address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)
      alert("Tutoring request submitted successfully!")
    } else {
      // Scroll to the first error
      const firstError = document.querySelector(".error")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <div className="tutoring-container">
      <div className="tutoring-header">
        <h1>Tutoring Request Form</h1>
        <p>Fill out the form below to request a tutor for your needs</p>
      </div>

      <div className="tutoring-card">
        <form onSubmit={handleSubmit} className="tutoring-form">
          {/* Sessions per week */}
          <div className="form-section">
            <h2>Session Requirements</h2>
            <div className="form-group">
              <label htmlFor="sessionsPerWeek">Number of sessions per week</label>
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

            {/* Session details */}
            <div className="sessions-container">
              <h3>Session Details</h3>
              {formData.sessions.map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-header">
                    <h4>Session {index + 1}</h4>
                  </div>
                  <div className="session-details">
                    <div className="form-group">
                      <label htmlFor={`day-${index}`}>Day of the week</label>
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
                        <label htmlFor={`start-${index}`}>Start time</label>
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
                        <label htmlFor={`end-${index}`}>End time</label>
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

          {/* Budget and Subject */}
          <div className="form-section">
            <h2>Budget and Subject</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budget">Budget per session (VND)</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 300,000"
                    className={errors.budget ? "error-input" : ""}
                  />
                  <span className="currency-symbol">₫</span>
                </div>
                {errors.budget && <span className="error">{errors.budget}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "error-input" : ""}
                >
                  <option value="">Select a subject</option>
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

          {/* Address */}
          <div className="form-section">
            <h2>Home Address</h2>
            <div className="form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                value={formData.address.province}
                onChange={(e) => handleAddressChange("province", e.target.value)}
                className={errors.province ? "error-input" : ""}
              >
                <option value="">Select a province</option>
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
                <label htmlFor="district">District</label>
                <select
                  id="district"
                  value={formData.address.district}
                  onChange={(e) => handleAddressChange("district", e.target.value)}
                  disabled={!formData.address.province}
                  className={errors.district ? "error-input" : ""}
                >
                  <option value="">Select a district</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && <span className="error">{errors.district}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ward">Ward</label>
                <select
                  id="ward"
                  value={formData.address.ward}
                  onChange={(e) => handleAddressChange("ward", e.target.value)}
                  disabled={!formData.address.district}
                  className={errors.ward ? "error-input" : ""}
                >
                  <option value="">Select a ward</option>
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
              <label htmlFor="street">Street name and house number</label>
              <input
                type="text"
                id="street"
                value={formData.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                placeholder="e.g., 79 Man Thiên"
                className={errors.street ? "error-input" : ""}
              />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Tutoring Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
