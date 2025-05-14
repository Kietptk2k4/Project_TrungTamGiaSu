import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const TutorList = () => {
  // State cho danh sách gia sư và bộ lọc
  const [tutors, setTutors] = useState([])
  const [subjects, setSubjects] = useState([])
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // State cho các bộ lọc
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorResponse = await axios.get('http://localhost:8080/api/tutors')
        const {data} = tutorResponse.data
        setTutors(data)

        setIsLoading(false)
        setSubjects(mockSubjects)
        setClasses(mockClasses)
        console.log('Gia sư:', tutors)
      } catch (error) {
        console.error('Lỗi khi fetch tutors:', error)
        setIsLoading(false)
      }
    }
    
    fetchTutors()
  }, [])
  if (tutors.length === 0) {
    setTutors(mockTutors);
  }

  // Lọc gia sư theo các điều kiện
  const filteredTutors = tutors.filter(tutor => {
    // Lọc theo tên
    if (searchQuery && !tutor.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Lọc theo môn học
    if (selectedSubject && !tutor.subjects.includes(selectedSubject)) {
      return false
    }
    
    // Lọc theo lớp
    if (selectedClass && !tutor.classes.includes(selectedClass)) {
      return false
    }
    
    return true
  })
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách gia sư</h1>
      
      {/* Bộ lọc */}
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
                <option key={subject} value={subject}>{subject}</option>
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
                <option key={classItem} value={classItem}>{classItem}</option>
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
      ) : filteredTutors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Không tìm thấy gia sư phù hợp với tiêu chí của bạn.</p>
          <button 
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition duration-300"
            onClick={() => {
              setSearchQuery('')
              setSelectedSubject('')
              setSelectedClass('')
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{tutor.name}</h3>
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{tutor.avg_rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{tutor.introduction}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Môn dạy:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <span key={subject} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Lớp dạy:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tutor.classes.map((classItem) => (
                      <span key={classItem} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {classItem}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-600">
                    Đã hoàn thành {tutor.completed_courses} khóa học
                  </div>
                  <Link 
                    to={`/tutors/${tutor.id}`}
                    className="bg-primary text-black py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TutorListPage