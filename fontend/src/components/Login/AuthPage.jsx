"use client"

import { useState } from "react"
import "./auth.css"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }

    if (!isLogin && !formData.username) {
      newErrors.username = "Tên người dùng là bắt buộc"
      valid = false
    }

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
      valid = false
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      alert(isLogin ? "Đăng nhập thành công!" : "Đăng ký thành công!")

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h1>
          <p>
            {isLogin
              ? "Chào mừng bạn trở lại! Vui lòng đăng nhập vào tài khoản của bạn."
              : "Tạo một tài khoản mới để bắt đầu."}
          </p>
        </div>

        <div className="auth-tabs">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            Đăng Nhập
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            Đăng Ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Tên Người Dùng</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nhập tên người dùng của bạn"
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu của bạn"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          )}

          {isLogin && (
            <div className="forgot-password">
              <a href="#">Quên mật khẩu?</a>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Đăng Nhập" : "Đăng Ký"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setIsLogin(!isLogin)
              }}
            >
              {isLogin ? "Đăng Ký" : "Đăng Nhập"}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}