"use client"

import { useState } from "react"
import "./Style/payment.css"

export default function PaymentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Course selection
    courseId: "web-development",
    // Personal information
    fullName: "",
    email: "",
    phone: "",
    // Payment information
    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    // Billing address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [errors, setErrors] = useState({})

  // Course options
  const courses = [
    {
      id: "web-development",
      name: "Complete Web Development Bootcamp",
      price: 499,
      duration: "12 weeks",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
    },
    {
      id: "data-science",
      name: "Data Science & Machine Learning",
      price: 599,
      duration: "16 weeks",
      description: "Master Python, data analysis, visualization, machine learning and AI fundamentals.",
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      price: 549,
      duration: "14 weeks",
      description: "Build iOS and Android apps using React Native and modern mobile development practices.",
    },
    {
      id: "ui-ux",
      name: "UI/UX Design Masterclass",
      price: 449,
      duration: "10 weeks",
      description: "Learn design principles, wireframing, prototyping, and user research techniques.",
    },
  ]

  // Find the selected course
  const selectedCourse = courses.find((course) => course.id === formData.courseId) || courses[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateStep = (currentStep) => {
    let isValid = true
    const newErrors = {}

    if (currentStep === 1) {
      // Validate course selection - nothing to validate here as we have a default
    } else if (currentStep === 2) {
      // Validate personal information
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
        isValid = false
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
        isValid = false
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
        isValid = false
      } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number is invalid"
        isValid = false
      }
    } else if (currentStep === 3) {
      // Validate payment information
      if (formData.paymentMethod === "credit-card") {
        if (!formData.cardName.trim()) {
          newErrors.cardName = "Name on card is required"
          isValid = false
        }

        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = "Card number is required"
          isValid = false
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
          newErrors.cardNumber = "Card number must be 16 digits"
          isValid = false
        }

        if (!formData.expiryDate.trim()) {
          newErrors.expiryDate = "Expiry date is required"
          isValid = false
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = "Expiry date must be in MM/YY format"
          isValid = false
        }

        if (!formData.cvv.trim()) {
          newErrors.cvv = "CVV is required"
          isValid = false
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = "CVV must be 3 or 4 digits"
          isValid = false
        }

        // Validate billing address
        if (!formData.address.trim()) {
          newErrors.address = "Address is required"
          isValid = false
        }

        if (!formData.city.trim()) {
          newErrors.city = "City is required"
          isValid = false
        }

        if (!formData.state.trim()) {
          newErrors.state = "State is required"
          isValid = false
        }

        if (!formData.zipCode.trim()) {
          newErrors.zipCode = "ZIP code is required"
          isValid = false
        }
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateStep(step)) {
      // Here you would typically send the data to your backend
      console.log("Payment submitted:", formData)

      // Show success message
      setStep(4)
      window.scrollTo(0, 0)
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Handle card number formatting
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value)
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    })
  }

  // Format expiry date
  const handleExpiryDateChange = (e) => {
    let { value } = e.target
    value = value.replace(/\D/g, "")

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4)
    }

    setFormData({
      ...formData,
      expiryDate: value,
    })
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Course Payment</h1>
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>
        <div className="progress-labels">
          <span className={step === 1 ? "current" : ""}>Select Course</span>
          <span className={step === 2 ? "current" : ""}>Personal Info</span>
          <span className={step === 3 ? "current" : ""}>Payment</span>
        </div>
      </div>

      <div className="payment-card">
        {step === 1 && (
          <div className="step-content">
            <h2>Select Your Course</h2>
            <p className="step-description">Choose the course you want to enroll in</p>

            <div className="course-selection">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`course-option ${formData.courseId === course.id ? "selected" : ""}`}
                  onClick={() => setFormData({ ...formData, courseId: course.id })}
                >
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className="course-price">${course.price}</span>
                  </div>
                  <div className="course-details">
                    <span className="course-duration">{course.duration}</span>
                    <p className="course-description">{course.description}</p>
                  </div>
                  <div className="course-select">
                    <input
                      type="radio"
                      id={course.id}
                      name="courseId"
                      value={course.id}
                      checked={formData.courseId === course.id}
                      onChange={handleChange}
                    />
                    <label htmlFor={course.id}>Select</label>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button className="next-btn" onClick={nextStep}>
                Continue to Personal Info
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Personal Information</h2>
            <p className="step-description">Please provide your contact details</p>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="step-actions">
              <button className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button className="next-btn" onClick={nextStep}>
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Payment Details</h2>
            <p className="step-description">Complete your payment securely</p>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Course:</span>
                <span>{selectedCourse.name}</span>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>${selectedCourse.price}</span>
              </div>
            </div>

            <div className="payment-methods">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === "credit-card"}
                    onChange={handleChange}
                  />
                  <label htmlFor="credit-card" className="payment-label">
                    <div className="payment-icon credit-card-icon"></div>
                    Credit Card
                  </label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal" className="payment-label">
                    <div className="payment-icon paypal-icon"></div>
                    PayPal
                  </label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === "bank-transfer"}
                    onChange={handleChange}
                  />
                  <label htmlFor="bank-transfer" className="payment-label">
                    <div className="payment-icon bank-icon"></div>
                    Bank Transfer
                  </label>
                </div>
              </div>
            </div>

            {formData.paymentMethod === "credit-card" && (
              <div className="credit-card-form">
                <h3>Card Information</h3>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="Enter name on card"
                  />
                  {errors.cardName && <span className="error">{errors.cardName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                </div>

                <h3>Billing Address</h3>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                  {errors.address && <span className="error">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="state">State/Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                    {errors.state && <span className="error">{errors.state}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="zipCode">ZIP/Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && <span className="error">{errors.zipCode}</span>}
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === "paypal" && (
              <div className="payment-message">
                <p>
                  You will be redirected to PayPal to complete your payment after clicking the "Complete Payment"
                  button.
                </p>
              </div>
            )}

            {formData.paymentMethod === "bank-transfer" && (
              <div className="payment-message">
                <p>
                  After clicking "Complete Payment", you will receive an email with our bank account details for manual
                  transfer.
                </p>
                <div className="bank-details">
                  <p>
                    <strong>Bank Name:</strong> Example Bank
                  </p>
                  <p>
                    <strong>Account Name:</strong> Course Academy Inc.
                  </p>
                  <p>
                    <strong>Account Number:</strong> XXXX-XXXX-XXXX-XXXX
                  </p>
                  <p>
                    <strong>Reference:</strong> Please include your full name as reference
                  </p>
                </div>
              </div>
            )}

            <div className="terms-checkbox">
              <input type="checkbox" id="terms" name="terms" />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="terms-link">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="step-actions">
              <button className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Complete Payment
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content success-step">
            <div className="success-icon"></div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your payment. Your course enrollment is now complete.</p>
            <div className="success-details">
              <p>
                <strong>Course:</strong> {selectedCourse.name}
              </p>
              <p>
                <strong>Amount Paid:</strong> ${selectedCourse.price}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
            </div>
            <p className="success-message">
              We've sent a confirmation email to your inbox with all the details and instructions to access your course.
            </p>
            <div className="step-actions">
              <a href="/" className="home-btn">
                Return to Homepage
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
