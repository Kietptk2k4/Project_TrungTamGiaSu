import "./CourseCard.css"

const CourseCard = ({ classData }) => {
  return (
    <div className="class-card">
      <div className="class-card-header">
        <div className="class-id">Mã số: {classData.id}</div>
        <div className="class-status">{classData.status}</div>
      </div>

      <div className="class-card-content">
        <div className="class-info">
          <div>
            <strong>Lớp dạy:</strong> {classData.classLevel}
          </div>
          <div>
            <strong>Môn dạy:</strong> {classData.subjects}
          </div>
          <div>
            <strong>Địa chỉ:</strong> {classData.address}
            <a href="#" className="map-link">
              (Xem bản đồ)
            </a>
          </div>
          <div className="fee">
            <strong>Học phí:</strong> {classData.fee}
          </div>
          <div>
            <strong>Số học viên:</strong> {classData.students}
          </div>
          <div>
            <strong>Số buổi:</strong> {classData.sessions}
          </div>
          <div>
            <strong>Thời gian:</strong> {classData.time}
          </div>
          <div>
            <strong>Hình thức dạy:</strong> {classData.format}
          </div>
          <div>
            <strong>Yêu cầu:</strong> {classData.requirements}
          </div>
          <div>
            <strong>Liên hệ:</strong> <span className="contact">{classData.contact}</span>
          </div>
        </div>

        <div className="class-card-footer">
          <button className="contact-button">Liên hệ nhận lớp »</button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
