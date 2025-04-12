import TutorCard from "./TutorCard"
import "./TutorsList.css"

const TutorsList = () => {
  const tutors = [
    {
      id: 1,
      name: "Tiến Đạt ",
      location: "97 Man Thiện Hiệp Phú",
      rating: 5,
      reviewCount: 109,
      isAmbassador: true,
      subject: "Toan",
      description: "Có 20 năm kinh nghiệm dạy toán.",
      imageUrl:"https://res.cloudinary.com/dsfgzdr5z/image/upload/v1744389027/avatar2_tsrpuz.jpg",
    },
    {
      id: 2,
      name: "Huy Sơn ",
      location: "97 Man Thiện Hiệp Phú",
      rating: 5,
      reviewCount: 47,
      isAmbassador: true,
      subject: "Guitar",
      description: "Có 20 năm kinh nghiệm dạy toán.",
      imageUrl:"https://res.cloudinary.com/dsfgzdr5z/image/upload/v1744388643/cld-sample-5.jpg"
    },
    {
      id: 3,
      name: "Ngọc Tú ",
      location: "97 Man Thiện Hiệp Phú",
      rating: 5,
      reviewCount: 55,
      isAmbassador: true,
      subject: "Piano",
      description: "Có 20 năm kinh nghiệm dạy toán.",
      imageUrl:"https://res.cloudinary.com/dsfgzdr5z/image/upload/v1744389026/avatar1_fmoms8.jpg"
    },
  ]

  return (
    <section className="tutors-list-section">
      <div className="tutors-header">
        <h2 className="tutors-title">32 million reviewed tutors</h2>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="star">
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="tutors-grid">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </section>
  )
}







export default TutorsList
