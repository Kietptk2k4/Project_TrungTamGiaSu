import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">Trung tâm DTSK</a>
      </div>
      <div className="nav-links">
        <a href="/become-tutor" className="nav-link">
          Trở thành gia sư
        </a>
        <a href="/login" className="nav-link">
          Đăng nhập
        </a>
      </div>
    </header>
  )
}

export default Header
