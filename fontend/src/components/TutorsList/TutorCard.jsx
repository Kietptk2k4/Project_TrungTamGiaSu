"use client"

import { useState } from "react"
import "./TutorCard.css"

const TutorCard = ({ tutor }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="tutor-card">
      <div className="tutor-image-container">
        <img src={tutor.imageUrl || "fontend//src//assets//avatar3.jpg"} alt={tutor.name} className="tutor-image" />
        <div className="tutor-info-overlay">
          <h3 className="tutor-name">{tutor.name}</h3>
          <p className="tutor-location">{tutor.location}</p>
        </div>
      </div>

      <div className="tutor-details">
        <div className="tutor-rating-row">
          <div className="tutor-rating">
            <span className="rating-star">★</span>
            <span className="rating-value">{tutor.rating}</span>
            <span className="review-count">({tutor.reviewCount} reviews)</span>
          </div>

          
            <div className="ambassador-badge">
              <span>Đăng ký  </span>
            </div>
          
        </div>

        <div className="tutor-description">
          <p>
            <strong>{tutor.subject}</strong> 
            <br />
            {tutor.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
