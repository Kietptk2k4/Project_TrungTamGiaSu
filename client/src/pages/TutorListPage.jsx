"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const TutorListPage = () => {
  const [tutors, setTutors] = useState([])
  const [subjects, setSubjects] = useState([])
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const tutorsPerPage = 9

  // Dữ liệu mẫu mới
  const mockTutors = [
    {
      id: 1,
      name: "Trần Thị Bình",
      gender: "FEMALE",
      avgRating: 4.5,
      completedCourses: 10,
      introduction: "Gia sư Toán với 5 năm kinh nghiệm",
      subjects: {
        "Toán học": ["Lớp 1"],
      },
    },
    {
      id: 2,
      name: "Phạm Thị Dung",
      gender: "FEMALE",
      avgRating: 4.8,
      completedCourses: 15,
      introduction: "Chuyên gia Vật lý, từng giảng dạy tại trường THPT",
      subjects: {
        "Vật lý": ["Lớp 1"],
      },
    },
    {
      id: 3,
      name: "Bùi Văn Giang",
      gender: "MALE",
      avgRating: 4.2,
      completedCourses: 5,
      introduction: "Chuyên dạy Hóa học, phương pháp dễ hiểu",
      subjects: {
        "Hóa học": ["Lớp 1"],
      },
    },
    {
      id: 4,
      name: "Lê Thị Kim",
      gender: "FEMALE",
      avgRating: 4.9,
      completedCourses: 20,
      introduction: "Gia sư Sinh học với bằng Tiến sĩ",
      subjects: {
        "Sinh học": ["Lớp 1"],
      },
    },
    {
      id: 6,
      name: "Lê Văn Cường",
      gender: "MALE",
      avgRating: 4.3,
      completedCourses: 7,
      introduction: "Giáo viên Lịch sử, giàu kinh nghiệm",
      subjects: {
        "Lịch sử": ["Lớp 1"],
      },
    },
    {
      id: 7,
      name: "Hoàng Văn Em",
      gender: "MALE",
      avgRating: 4.7,
      completedCourses: 12,
      introduction: "Gia sư Địa lý, hỗ trợ học sinh thi THPTQG",
      subjects: {
        "Địa lý": ["Lớp 1"],
      },
    },
    {
      id: 9,
      name: "Nguyễn Thị Hạnh",
      gender: "FEMALE",
      avgRating: 4.6,
      completedCourses: 9,
      introduction: "Gia sư Tin học, chuyên lập trình",
      subjects: {
        "Tin học": ["Lớp 1"],
      },
    },
    {
      id: 10,
      name: "Trần Văn In",
      gender: "MALE",
      avgRating: 4.4,
      completedCourses: 6,
      introduction: "Gia sư Giáo dục công dân, tận tâm",
      subjects: {
        "Giáo dục công dân": ["Lớp 1"],
      },
    },
  ]

  const mockSubjects = [
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Lịch sử",
    "Địa lý",
    "Tin học",
    "Giáo dục công dân",
  ]
  const mockClasses = ["Lớp 1"]

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/tutors")
        setTutors(response.data)
        setSubjects(mockSubjects)
        setClasses(mockClasses)
        setIsLoading(false)
      } catch (error) {
        console.error("Lỗi khi fetch tutors:", error)
        setTutors(mockTutors) // Fallback
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
    return Object.keys(tutor.subjects).includes(subject)
  }

  // Hàm kiểm tra xem gia sư có dạy lớp được chọn không
  const tutorTeachesClass = (tutor, classItem) => {
    if (!classItem) return true
    for (const subject in tutor.subjects) {
      if (tutor.subjects[subject].includes(classItem)) {
        return true
      }
    }
    return false
  }

  // Lọc danh sách gia sư theo các tiêu chí
  const filteredTutors = tutors.filter((tutor) => {
    if (searchQuery && !tutor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedSubject && !tutorTeachesSubject(tutor, selectedSubject)) {
      return false
    }
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
    return Object.keys(tutor.subjects)
  }

  // Hàm lấy các lớp tương ứng với môn học
  const getClassesForSubject = (tutor, subject) => {
    return tutor.subjects[subject] || []
  }

  const handleRegister = (tutorId) => {
    alert(`Bạn đã chọn đăng ký với gia sư có ID: ${tutorId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách gia sư</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tìm kiếm gia sư</h2>

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

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải danh sách gia sư...</p>
        </div>
      ) : currentTutors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Không tìm thấy gia sư phù hợp với tiêu chí của bạn.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{tutor.name}</h3>
                    <div className="flex items-center">
                      <span>{tutor.avgRating.toFixed(1)}⭐</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{tutor.introduction}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Môn dạy:</h4>
                    <div className="space-y-2">
                      {getTutorSubjects(tutor).map((subject) => (
                        <div key={subject} className="flex flex-col">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded inline-block w-fit mb-1">
                            {subject}
                          </span>
                          <div className="flex flex-wrap gap-1 ml-2">
                            {getClassesForSubject(tutor, subject).map((classItem) => (
                              <span
                                key={`${subject}-${classItem}`}
                                className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                              >
                                {classItem}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-600">
                      Đã hoàn thành {tutor.completedCourses} khóa học
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/tutors/${tutor.id}`}
                        className="bg-primary text-black h-12 w-32 flex items-center justify-center py-2 px-4 rounded hover:bg-primary-dark transition"
                      >
                        Xem chi tiết
                      </Link>
                      <button
                        onClick={() => handleRegister(tutor.id)}
                        className="bg-green-500 text-white h-12 w-24 flex items-center justify-center rounded hover:bg-green-600 transition"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Trang trước
            </button>
            <span>
              Trang {currentPage} / {Math.max(1, totalPages)}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TutorListPage