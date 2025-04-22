"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const ChoiceTutor = ({ onSelectTutor }) => {
  const [tutors, setTutors] = useState([])
  const [subjects, setSubjects] = useState([])
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const tutorsPerPage = 4

  const [selectedTutor, setSelectedTutor] = useState(null)

  // Mock data cho danh sách gia sư
  const mockTutors = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      gender: "MALE",
      avg_rating: 4.8,
      completed_courses: 25,
      subjects: [
        {
          Toán: ["Lớp 10", "Lớp 11", "Lớp 12"],
          "Vật lý": ["Lớp 10", "Lớp 11", "Lớp 12"],
          Hóa: ["Lớp 10", "Lớp 11", "Lớp 12"],
          Sinh: ["Lớp 10", "Lớp 11", "Lớp 12"],
          Sử: ["Lớp 10", "Lớp 11", "Lớp 12"],
          Địa: ["Lớp 10", "Lớp 11", "Lớp 12"],
        },
      ],
      introduction: "Giáo viên giàu kinh nghiệm với hơn 5 năm giảng dạy môn Toán cấp 3.",
    },
    {
      id: 2,
      name: "Trần Thị B",
      gender: "FEMALE",
      avg_rating: 4.6,
      completed_courses: 18,
      subjects: [
        {
          Văn: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
          Sử: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
        },
      ],
      introduction: "Sinh viên xuất sắc ngành Sư phạm Ngữ văn, có kinh nghiệm dạy kèm học sinh cấp 2.",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      gender: "MALE",
      avg_rating: 4.9,
      completed_courses: 32,
      subjects: [
        {
          "Vật lý": ["Lớp 10", "Lớp 11", "Lớp 12"],
          "Hóa học": ["Lớp 10", "Lớp 11", "Lớp 12"],
        },
      ],
      introduction: "Thạc sĩ Vật lý, có chứng chỉ quốc tế về phương pháp giảng dạy.",
    },
    {
      id: 4,
      name: "Lê Thị D",
      gender: "FEMALE",
      avg_rating: 4.7,
      completed_courses: 15,
      subjects: [
        {
          "Tiếng Anh": ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"],
        },
      ],
      introduction: "Giáo viên tiếng Anh với chứng chỉ IELTS 8.0, chuyên dạy học sinh cấp 3.",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      gender: "MALE",
      avg_rating: 4.5,
      completed_courses: 22,
      subjects: [
        {
          Toán: ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
          "Tiếng Anh": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
        },
      ],
      introduction: "Giáo viên tiểu học với phương pháp giảng dạy sinh động, phù hợp với trẻ nhỏ.",
    },
    {
      id: 6,
      name: "Đỗ Thị F",
      gender: "FEMALE",
      avg_rating: 4.9,
      completed_courses: 28,
      subjects: [
        {
          "Sinh học": ["Lớp 10", "Lớp 11", "Lớp 12"],
          "Hóa học": ["Lớp 10", "Lớp 11", "Lớp 12"],
        },
      ],
      introduction: "Tiến sĩ Sinh học, có kinh nghiệm ôn thi đại học với tỷ lệ đỗ cao.",
    },
  ]

  const mockSubjects = ["Toán", "Văn", "Tiếng Anh", "Vật lý", "Hóa học", "Sinh học", "Sử", "Địa"]
  const mockClasses = [
    "Lớp 1",
    "Lớp 2",
    "Lớp 3",
    "Lớp 4",
    "Lớp 5",
    "Lớp 6",
    "Lớp 7",
    "Lớp 8",
    "Lớp 9",
    "Lớp 10",
    "Lớp 11",
    "Lớp 12",
  ]

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/tutors")
        setTutors(response.data)
        console.log("Fetched tutors:", response.data)
        setSubjects(mockSubjects)
        setClasses(mockClasses)
        setIsLoading(false)
      } catch (error) {
        console.error("Lỗi khi fetch tutors:", error)
        setTutors(mockTutors) // fallback
        setSubjects(mockSubjects)
        setClasses(mockClasses)
        setIsLoading(false)
      }
    }

    fetchTutors()
  }, [])

  // Hàm kiểm tra xem gia sư có dạy môn học được chọn không
  const tutorTeachesSubject = (tutor, subject) => {
    if (!subject) return true

    for (const subjectObj of tutor.subjects) {
      if (Object.keys(subjectObj).includes(subject)) {
        return true
      }
    }
    return false
  }

  // Hàm kiểm tra xem gia sư có dạy lớp được chọn không
  const tutorTeachesClass = (tutor, classItem) => {
    if (!classItem) return true

    for (const subjectObj of tutor.subjects) {
      for (const subject in subjectObj) {
        if (subjectObj[subject].includes(classItem)) {
          return true
        }
      }
    }
    return false
  }

  // Lọc danh sách gia sư theo các tiêu chí
  const filteredTutors = tutors.filter((tutor) => {
    // Lọc theo tên
    if (searchQuery && !tutor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Lọc theo môn học
    if (selectedSubject && !tutorTeachesSubject(tutor, selectedSubject)) {
      return false
    }

    // Lọc theo lớp
    if (selectedClass && !tutorTeachesClass(tutor, selectedClass)) {
      return false
    }

    return true
  })

  // Tính phân trang
  const indexOfLastTutor = currentPage * tutorsPerPage
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
  const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor)
  const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage)

  // Hàm lấy tất cả các môn học của gia sư
  const getTutorSubjects = (tutor) => {
    const allSubjects = []
    tutor.subjects.forEach((subjectObj) => {
      Object.keys(subjectObj).forEach((subject) => {
        allSubjects.push(subject)
      })
    })
    return allSubjects
  }

  // Hàm lấy các lớp tương ứng với môn học
  const getClassesForSubject = (tutor, subject) => {
    for (const subjectObj of tutor.subjects) {
      if (subjectObj[subject]) {
        return subjectObj[subject]
      }
    }
    return []
  }

  const handleSelectTutor = (tutor) => {
    setSelectedTutor(tutor)
    onSelectTutor(tutor.id, tutor.name)
  }

  const handleCancelSelection = () => {
    setSelectedTutor(null)
    onSelectTutor(0, "")
  }

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Đang tải danh sách gia sư...</p>
      </div>
    )
  }

  if (selectedTutor) {
    // Hiển thị thông tin của gia sư đã chọn
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">{selectedTutor.name}</h3>
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Đã chọn</span>
          </div>
          <button
            onClick={handleCancelSelection}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Hủy chọn gia sư"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-2">{selectedTutor.introduction}</p>

        <div className="mb-2">
          <h4 className="text-sm font-medium mb-1">Môn dạy:</h4>
          <div className="space-y-1">
            {getTutorSubjects(selectedTutor).map((subject) => (
              <div key={subject} className="flex flex-col">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded inline-block w-fit mb-1">
                  {subject}
                </span>
                <div className="flex flex-wrap gap-1 ml-2">
                  {getClassesForSubject(selectedTutor, subject).map((classItem) => (
                    <span
                      key={`${subject}-${classItem}`}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      {classItem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-600">
          Đánh giá: {selectedTutor.avg_rating.toFixed(1)}⭐ | Đã hoàn thành {selectedTutor.completed_courses} khóa học
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm theo tên</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Nhập tên gia sư..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Tất cả môn học</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Tất cả các lớp</option>
              {classes.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {currentTutors.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Không tìm thấy gia sư phù hợp với tiêu chí của bạn.</p>
        </div>
      ) : (
        <>
          {/* Danh sách gia sư */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTutors.map((tutor) => (
              <div key={tutor.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-md font-semibold">{tutor.name}</h3>
                  <div className="text-sm">{tutor.avg_rating.toFixed(1)}⭐</div>
                </div>

                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{tutor.introduction}</p>

                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {getTutorSubjects(tutor).map((subject) => (
                      <span
                        key={subject}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600">{tutor.completed_courses} khóa học</div>
                  <button
                    onClick={() => handleSelectTutor(tutor)}
                    className="bg-primary text-black text-xs px-3 py-1 rounded hover:bg-primary-dark transition"
                  >
                    Chọn
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Trước
            </button>
            <span className="text-sm">
              Trang {currentPage} / {Math.max(1, totalPages)}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Sau
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ChoiceTutor
