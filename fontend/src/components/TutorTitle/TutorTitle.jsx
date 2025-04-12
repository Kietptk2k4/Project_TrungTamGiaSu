"use client"

import { useState } from "react"
import "./TutorTitle.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Implement search functionality
  }

  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Tìm kiếm 
        <br />
        Gia sư
      </h1>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
        <i className="fas fa-search search-icon"></i>
        <input
            type="text"
            placeholder='Toán ...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Tìm kiếm 
          </button>
        </div>
      </form>
    </section>
  )
}

export default HeroSection
