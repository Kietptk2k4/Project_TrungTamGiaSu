import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const TutorDetailPage = () => {
  const { id } = useParams()
  const [tutor, setTutor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showRequestForm, setShowRequestForm] = useState(false)
  
  // Giả lập dữ liệu gia sư
  const mockTutor = {
    id: parseInt(id),
    name: "Nguyễn Văn A",
    gender: "MALE",
    phone: "0987654321",
    email: "giasu@example.com",
    avg_rating: 4.8,
    completed_courses: 25,
    subjects: ["Toán", "Vật lý"],
    classes: ["Lớp 10", "Lớp 11", "Lớp 12"],
    introduction: "Giáo viên giàu kinh nghiệm với hơn 5 năm giảng dạy môn Toán cấp 3. Tốt nghiệp Đại học Sư phạm Hà Nội, chuyên ngành Sư phạm Toán học với điểm trung bình 3.8/4.0.",
    certificates: [
      { name: "Bằng Đại học Sư phạm", issuer: "Đại học Sư phạm Hà Nội", date: "2015-06-15" },
      { name: "Chứng chỉ Phương pháp giảng dạy hiện đại", issuer: "Trung tâm Đào tạo Giáo viên", date: "2017-08-20" }
    ],
    feedbacks: [
      { id: 1, customer_name: "Trần Văn B", rating: 5, content: "Thầy dạy rất tận tình, con tôi đã tiến bộ rõ rệt sau 2 tháng học.", date: "2023-05-15" },
      { id: 2, customer_name: "Lê Thị C", rating: 4, content: "Thầy có phương pháp giảng dạy dễ hiểu, phù hợp với trình độ của học sinh.", date: "2023-04-10" },
      { id: 3, customer_name: "Phạm Văn D", rating: 5, content: "Thầy không chỉ dạy kiến thức mà còn truyền cảm hứng học tập cho con tôi.", date: "2023-03-22" }
    ]
  }
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin chi tiết gia sư
    const fetchTutorDetails = () => {
      setTimeout(() => {
        setTutor(mockTutor)
        setIsLoading(false)
      }, 1000)
    }
    
    fetchTutorDetails()
  }, [id])
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Đang tải thông tin gia sư...</p>
      </div>
    )
  }
  
  if (!tutor) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">Không tìm thấy thông tin gia sư!</h2>
        <Link to="/tutors" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded">
          Quay lại danh sách gia sư
        </Link>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{tutor.name}</h1>
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-300 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xl font-bold">{tutor.avg_rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="mt-2">Đã hoàn thành {tutor.completed_courses} khóa học</p>
        </div>
        
        {/* Main content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Info */}
            <div className="md:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
                <p className="text-gray-700">{tutor.introduction}</p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Môn học và lớp dạy</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Môn học:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject) => (
                        <span key={subject} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lớp:</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutor.classes.map((classItem) => (
                        <span key={classItem} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                          {classItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Chứng chỉ</h2>
                <div className="space-y-4">
                  {tutor.certificates.map((cert, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">Ngày cấp: {new Date(cert.date).toLocaleDateString('vi-VN')}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Đánh giá từ phụ huynh</h2>
                {tutor.feedbacks.length > 0 ? (
                  <div className="space-y-6">
                    {tutor.feedbacks.map((feedback) => (
                      <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{feedback.customer_name}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{feedback.content}</p>
                        <p className="text-sm text-gray-500">Ngày đánh giá: {new Date(feedback.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Chưa có đánh giá nào từ phụ huynh.</p>
                )}
              </section>
            </div>
            
            {/* Right column - Request form */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Gửi yêu cầu gia sư</h2>
                
                {!showRequestForm ? (
                  <div className="text-center">
                    <p className="text-gray-700 mb-6">Hãy gửi yêu cầu thuê gia sư {tutor.name} ngay để nhận được sự hỗ trợ học tập tốt nhất.</p>
                    <button 
                      onClick={() => setShowRequestForm(true)}
                      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition duration-300"
                    >
                      Gửi yêu cầu gia sư
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary">
                        <option value="">Chọn môn học</option>
                        {tutor.subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary">
                        <option value="">Chọn lớp</option>
                        {tutor.classes.map(classItem => (
                          <option key={classItem} value={classItem}>{classItem}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số buổi học mỗi tuần</label>
                      <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary">
                        <option value="1">1 buổi</option>
                        <option value="2">2 buổi</option>
                        <option value="3">3 buổi</option>
                        <option value="4">4 buổi</option>
                        <option value="5">5 buổi</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Học phí đề xuất (VNĐ/buổi)</label>
                      <input 
                        type="number" 
                        placeholder="Ví dụ: 200,000" 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ học</label>
                      <textarea 
                        placeholder="Nhập địa chỉ chi tiết" 
                        rows="3"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary"
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button 
                        type="button"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300"
                        onClick={() => alert("Chức năng này sẽ được kích hoạt khi bạn đăng nhập. Vui lòng đăng nhập để gửi yêu cầu.")}
                      >
                        Gửi yêu cầu
                      </button>
                      <button 
                        type="button"
                        className="w-full mt-2 border border-gray-300 bg-white text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300"
                        onClick={() => setShowRequestForm(false)}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                )}
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold mb-2">Liên hệ trực tiếp:</h3>
                  <p className="flex items-center text-gray-700 mb-2">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {tutor.phone}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {tutor.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/tutors" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
          Quay lại danh sách gia sư
        </Link>
      </div>
    </div>
  )
}

export default TutorDetailPage