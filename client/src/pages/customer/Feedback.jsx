import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const FeedbackPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackData, setFeedbackData] = useState({
    rating: 5,
    content: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Giả lập API call để lấy thông tin khóa học
    const fetchCourseDetails = async () => {
      try {
        // Trong thực tế, đây sẽ là API call
        // const response = await api.get(`/customer/courses/${id}`)
        
        // Dữ liệu giả lập
        setTimeout(() => {
          setCourse({
            id: parseInt(id),
            subject: "Toán",
            class: "Lớp 10",
            tutor: {
              id: 1,
              name: "Nguyễn Văn A",
              avatar: null,
            },
            status: "Completed",
            start_date: "2023-05-10",
            end_date: "2023-08-15",
            has_feedback: false
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching course details:', error)
        setError('Không thể tải thông tin khóa học. Vui lòng thử lại sau.')
        setIsLoading(false)
      }
    }
    
    fetchCourseDetails()
  }, [id])
  
  const handleRatingChange = (rating) => {
    setFeedbackData({
      ...feedbackData,
      rating
    })
  }
  
  const handleContentChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      content: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Kiểm tra nội dung đánh giá
    if (!feedbackData.content.trim()) {
      setError('Vui lòng nhập nội dung đánh giá')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Trong thực tế, đây sẽ là API call
      // await api.post(`/customer/courses/${id}/feedback`, feedbackData)
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Hiển thị thông báo thành công và chuyển hướng
      alert('Cảm ơn bạn đã đánh giá gia sư!')
      navigate(`/customer/courses/${id}`)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setError('Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="ml-3">Đang tải thông tin...</p>
      </div>
    )
  }
  
  if (!course) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Không tìm thấy thông tin khóa học!</h2>
        <p className="text-gray-600 mb-6">Khóa học bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập.</p>
        <Link to="/customer/my-courses" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Quay lại danh sách khóa học
        </Link>
      </div>
    )
  }
  
  // Kiểm tra nếu khóa học chưa hoàn thành hoặc đã có đánh giá
  if (course.status !== 'Completed') {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">Không thể đánh giá!</h2>
        <p className="text-gray-600 mb-6">Bạn chỉ có thể đánh giá gia sư khi khóa học đã hoàn thành.</p>
        <Link to={`/customer/courses/${id}`} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Quay lại chi tiết khóa học
        </Link>
      </div>
    )
  }
  
  if (course.has_feedback) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Đã đánh giá!</h2>
        <p className="text-gray-600 mb-6">Bạn đã đánh giá khóa học này. Mỗi khóa học chỉ được đánh giá một lần.</p>
        <Link to={`/customer/courses/${id}`} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Quay lại chi tiết khóa học
        </Link>
      </div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Đánh giá gia sư</h1>
        <Link to={`/customer/courses/${id}`} className="text-primary hover:underline">
          &larr; Quay lại chi tiết khóa học
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Thông tin khóa học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Môn học:</p>
                <p className="font-medium">{course.subject} - {course.class}</p>
              </div>
              <div>
                <p className="text-gray-600">Gia sư:</p>
                <p className="font-medium">{course.tutor.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày bắt đầu:</p>
                <p className="font-medium">{new Date(course.start_date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-gray-600">Ngày kết thúc:</p>
                <p className="font-medium">{new Date(course.end_date).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Đánh giá sao</h2>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-3xl focus:outline-none"
                  >
                    <span className={star <= feedbackData.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  </button>
                ))}
                <span className="ml-4 text-gray-600">
                  {feedbackData.rating}/5 sao
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="feedback-content" className="block text-lg font-semibold mb-3">
                Nội dung đánh giá
              </label>
              <textarea
                id="feedback-content"
                rows="5"
                value={feedbackData.content}
                onChange={handleContentChange}
                placeholder="Hãy chia sẻ trải nghiệm của bạn với gia sư này..."
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary"
                required
              ></textarea>
              <p className="mt-2 text-sm text-gray-500">
                Đánh giá của bạn sẽ giúp ích cho các học viên khác trong việc lựa chọn gia sư.
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-end gap-4">
              <Link
                to={`/customer/courses/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Hủy bỏ
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage