// import { Link } from 'react-router-dom'

// const HomePage = () => {
//   const featuredTutors = [
//     {
//       id: 1,
//       name: "Nguyễn Văn A",
//       avg_rating: 4.8,
//       completed_courses: 25,
//       introduction: "Giáo viên giàu kinh nghiệm với hơn 5 năm giảng dạy môn Toán cấp 3."
//     },
//     {
//       id: 2,
//       name: "Trần Thị B",
//       avg_rating: 4.6,
//       completed_courses: 18,
//       introduction: "Sinh viên xuất sắc ngành Sư phạm Ngữ văn, có kinh nghiệm dạy kèm học sinh cấp 2."
//     },
//     {
//       id: 3,
//       name: "Phạm Văn C",
//       avg_rating: 4.9,
//       completed_courses: 32,
//       introduction: "Thạc sĩ Vật lý, có chứng chỉ quốc tế về phương pháp giảng dạy."
//     },
//     {
//       id: 4,
//       name: "Lê Thị D",
//       avg_rating: 4.7,
//       completed_courses: 15,
//       introduction: "Giáo viên tiếng Anh với chứng chỉ IELTS 8.0, chuyên dạy học sinh cấp 3."
//     }
//   ]
  
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-primary text-black py-20">
//         <div className="container mx-auto px-4 flex flex-col items-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
//             Tìm gia sư chất lượng cho con bạn
//           </h1>
//           <p className="text-xl text-center mb-8 max-w-2xl">
//             TutorLink kết nối bạn với gia sư chất lượng cao, giúp con bạn đạt kết quả học tập tốt nhất.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link 
//               to="/tutors" 
//               className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
//             >
//               Tìm gia sư
//             </Link>
//             <Link 
//               to="/register" 
//               className="bg-transparent border-2 border-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-primary transition duration-300"
//             >
//               Đăng ký ngay
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* How It Works */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Cách thức hoạt động</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
//               <h3 className="text-xl font-semibold mb-3">Đăng ký yêu cầu</h3>
//               <p className="text-gray-600">Gửi yêu cầu với những mong muốn cụ thể về gia sư và lịch học</p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
//               <h3 className="text-xl font-semibold mb-3">Kết nối gia sư</h3>
//               <p className="text-gray-600">Chúng tôi tìm kiếm và kết nối bạn với gia sư phù hợp nhất</p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
//               <h3 className="text-xl font-semibold mb-3">Bắt đầu học</h3>
//               <p className="text-gray-600">Thanh toán an toàn và bắt đầu khóa học với gia sư chất lượng</p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Featured Tutors */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Gia sư nổi bật</h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredTutors.map(tutor => (
//               <div key={tutor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-2">{tutor.name}</h3>
//                   <div className="flex items-center mb-3">
//                     <div className="flex text-yellow-400">
//                       {[...Array(5)].map((_, i) => (
//                         <svg 
//                           key={i}
//                           xmlns="http://www.w3.org/2000/svg" 
//                           className={`h-5 w-5 ${i < Math.floor(tutor.avg_rating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                           viewBox="0 0 20 20" 
//                           fill="currentColor"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-gray-600">{tutor.avg_rating.toFixed(1)}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-3">
//                     Hoàn thành {tutor.completed_courses} khóa học
//                   </p>
//                   <p className="text-gray-600 line-clamp-3 mb-4">
//                     {tutor.introduction || 'Chưa có thông tin giới thiệu.'}
//                   </p>
//                   <Link 
//                     to={`/tutors/${tutor.id}`}
//                     className="block text-center bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300"
//                   >
//                     Xem chi tiết
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-10">
//             <Link 
//               to="/tutors"
//               className="bg-primary text-white font-semibold py-2 px-6 rounded hover:bg-primary-dark transition duration-300"
//             >
//               Xem tất cả gia sư
//             </Link>
//           </div>
//         </div>
//       </section>
      
//       {/* Testimonials */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Phụ huynh nói gì về chúng tôi</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <div className="flex text-yellow-400 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg 
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     viewBox="0 0 20 20" 
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Con tôi đã tiến bộ rất nhiều nhờ gia sư từ TutorLink. Chỉ sau 3 tháng, điểm số của con đã tăng đáng kể."
//               </p>
//               <div className="font-medium">Chị Nguyễn Thị Hương</div>
//               <div className="text-sm text-gray-500">Phụ huynh học sinh lớp 8</div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow">
//               <div className="flex text-yellow-400 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg 
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     viewBox="0 0 20 20" 
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Tôi rất hài lòng với dịch vụ của TutorLink. Việc tìm gia sư trở nên dễ dàng và gia sư rất chuyên nghiệp."
//               </p>
//               <div className="font-medium">Anh Trần Văn Bình</div>
//               <div className="text-sm text-gray-500">Phụ huynh học sinh lớp 11</div>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow">
//               <div className="flex text-yellow-400 mb-4">
//                 {[...Array(5)].map((_, i) => (
//                   <svg 
//                     key={i}
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     viewBox="0 0 20 20" 
//                     fill="currentColor"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4">
//                 "Gia sư từ TutorLink không chỉ dạy kiến thức mà còn truyền cảm hứng học tập cho con tôi. Kết quả thi đầu vào đại học của con thật đáng kinh ngạc!"
//               </p>
//               <div className="font-medium">Chị Lê Thị Mai</div>
//               <div className="text-sm text-gray-500">Phụ huynh học sinh lớp 12</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default HomePage
// Trong trang Home.jsx hoặc một component nào đó
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const loginAsCustomer = () => {
    // Lưu thông tin giả lập vào localStorage
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Nguyễn Văn A',
      role: 'Customer'
    }));
    navigate('/customer');
  };
  
  const loginAsTutor = () => {
    localStorage.setItem('user', JSON.stringify({
      id: 2,
      name: 'Trần Thị B',
      role: 'Tutor'
    }));
    navigate('/tutor');
  };
  
  const loginAsAdmin = () => {
    localStorage.setItem('user', JSON.stringify({
      id: 3,
      name: 'Admin',
      role: 'Admin'
    }));
    navigate('/admin');
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">TutorLink - Kết nối gia sư</h1>
      
      {/* Nội dung trang chủ */}
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Đăng nhập nhanh (Demo)</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={loginAsCustomer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đăng nhập là Khách hàng
          </button>
          <button
            onClick={loginAsTutor}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Đăng nhập là Gia sư
          </button>
          <button
            onClick={loginAsAdmin}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Đăng nhập là Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;