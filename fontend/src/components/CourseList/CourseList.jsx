import "./CourseList.css"
import CourseCard from "./CourseCard"

const CourseList = () => {
  const classData = [
    {
      id: "MDC/BB1438",
      status: "Lớp đã giao",
      classLevel: "Lớp 4",
      subjects: "Tiếng Việt, Toán",
      address: "Võ Hoành, phường Phú Thọ Hòa, Tân Phú",
      fee: "2.400.000đ/tháng",
      students: "1 hs",
      sessions: "3b (thứ 2,3,5)",
      time: "17h30-19h",
      format: "offline",
      requirements: "Gv tự do NỮ (kiên nhẫn)",
      contact: "0348.473.575",
    },
    {
      id: "MDC/AV1462",
      status: "Lớp đã giao",
      classLevel: "Giao Tiếp",
      subjects: "Anh văn",
      address: "Thoại Ngọc Hầu, phường Tây Thạnh, quận Tân Phú",
      fee: "1.800.000đ/tháng",
      students: "1 bé 5 tuổi",
      sessions: "3b ( thứ 3,5,7)",
      time: "19h30-20h30 ( dạy 60p)",
      format: "offline",
      requirements: "Gv tự do NỮ",
      contact: "0348.473.575",
    },
  ]

  return (
    <div className="class-list-container">
      {classData.map((classItem) => (
        <CourseCard key={classItem.id} classData={classItem} />
      ))}
    </div>
  )
}

export default CourseList
