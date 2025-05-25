import { Link } from "react-router-dom"
import { Star, Users, BookOpen, Award, ArrowRight, CheckCircle } from "lucide-react"

const HomePage = () => {
  const featuredTutors = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avg_rating: 4.8,
      completed_courses: 25,
      introduction: "Giáo viên giàu kinh nghiệm với hơn 5 năm giảng dạy môn Toán cấp 3.",
      subject: "Toán học",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avg_rating: 4.6,
      completed_courses: 18,
      introduction: "Sinh viên xuất sắc ngành Sư phạm Ngữ văn, có kinh nghiệm dạy kèm học sinh cấp 2.",
      subject: "Ngữ văn",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Phạm Văn C",
      avg_rating: 4.9,
      completed_courses: 32,
      introduction: "Thạc sĩ Vật lý, có chứng chỉ quốc tế về phương pháp giảng dạy.",
      subject: "Vật lý",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Lê Thị D",
      avg_rating: 4.7,
      completed_courses: 15,
      introduction: "Giáo viên tiếng Anh với chứng chỉ IELTS 8.0, chuyên dạy học sinh cấp 3.",
      subject: "Tiếng Anh",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const stats = [
    { number: "1000+", label: "Gia sư chất lượng", icon: Users },
    { number: "5000+", label: "Học sinh đã học", icon: BookOpen },
    { number: "98%", label: "Tỷ lệ hài lòng", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Tìm gia sư
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}
                chất lượng{" "}
              </span>
              cho con bạn
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Trung tâm DSTK kết nối bạn với gia sư chất lượng cao, giúp con bạn đạt kết quả học tập tốt nhất với phương
              pháp giảng dạy hiện đại.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/tutors"
                className="group bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Tìm gia sư ngay
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="group bg-transparent border-2 border-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Đăng ký miễn phí
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cách thức hoạt động</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quy trình đơn giản và hiệu quả để tìm gia sư phù hợp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Đăng ký yêu cầu",
                description: "Gửi yêu cầu với những mong muốn cụ thể về gia sư và lịch học",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "02",
                title: "Kết nối gia sư",
                description: "Chúng tôi tìm kiếm và kết nối bạn với gia sư phù hợp nhất",
                color: "from-purple-500 to-purple-600",
              },
              {
                step: "03",
                title: "Bắt đầu học",
                description: "Thanh toán an toàn và bắt đầu khóa học với gia sư chất lượng",
                color: "from-indigo-500 to-indigo-600",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div
                    className={`bg-gradient-to-r ${item.color} text-emerald-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gia sư nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đội ngũ gia sư chất lượng cao với kinh nghiệm giảng dạy phong phú
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {featuredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="text-center mb-6">
                    <img
                      src={tutor.avatar || "/placeholder.svg"}
                      alt={tutor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                    />
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{tutor.name}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {tutor.subject}
                    </span>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(tutor.avg_rating) ? "fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">{tutor.avg_rating}</span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      {tutor.completed_courses} khóa học hoàn thành
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{tutor.introduction}</p>

                  <Link
                    to={`/tutors/${tutor.id}`}
                    className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-amber-950 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium transform hover:scale-105"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tutors"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-amber-800 font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Xem tất cả gia sư
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Phụ huynh nói gì về chúng tôi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Những phản hồi tích cực từ phụ huynh và học sinh</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                content:
                  "Con tôi đã tiến bộ rất nhiều nhờ gia sư từ Trung tâm DSTK. Chỉ sau 3 tháng, điểm số của con đã tăng đáng kể và con cũng tự tin hơn trong học tập.",
                author: "Chị Nguyễn Thị Hương",
                role: "Phụ huynh học sinh lớp 8",
                avatar: "data:image/jpeg;base64,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",
              },
              {
                content:
                  "Tôi rất hài lòng với dịch vụ của Trung tâm DSTK. Việc tìm gia sư trở nên dễ dàng và gia sư rất chuyên nghiệp, tận tâm với học sinh.",
                author: "Anh Trần Văn Bình",
                role: "Phụ huynh học sinh lớp 11",
                avatar: "data:image/jpeg;base64,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",
              },
              {
                content:
                  "Gia sư từ Trung tâm DSTK không chỉ dạy kiến thức mà còn truyền cảm hứng học tập cho con tôi. Kết quả thi đầu vào đại học của con thật đáng kinh ngạc!",
                author: "Chị Lê Thị Mai",
                role: "Phụ huynh học sinh lớp 12",
                avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXGRgYGBgXGBcXGBoeGBgaFxgYGhcYHSggHRslGxgYITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGy0lICUuLS0tLS0tLS0tLS0tLS0tLy0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tMC0tLS0tLf/AABEIASsAqAMBEQACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAEBQYDAgcBAP/EADwQAAIBAwMCAwYEBQQBBAMAAAECEQADIQQSMQVBIlFhBhMycYGRQqGx0RQjUsHwFWJy4fEHFjOSQ4LC/8QAGwEAAgMBAQEAAAAAAAAAAAAAAgMAAQQFBgf/xAA5EQABBAEDAgQFBAIBAgYDAAABAAIDESEEEjFBUSJhcfAFE4GRwTKhseEU0fEjQhUWQ2JykgYzNP/aAAwDAQACEQMRAD8A9OQNbUMMqQMDnjnPbvWdz8WCtMYBG0pF1LrlpCOA3HwyPqO3zrlalxI3NAv+Vsi08jjxhCN1LTkh4G4cAMduf9kxWeOQycsHvyThFKQWjj0/K5/1S3YZ7t/dLQVUDcWkQADxW2NoL7WfUvayMMv1S/U9be+4Jte7BEAbgTzgngd62BjiFyvntL6WWo1jAbTCouCzck+QHpMeZNVPKfliNvKYxudx4Ql68xEImCPiuQoyOdvxfQgUmNsjf1ZR72O4KLVS6QxngQojPYZJ70cs9MA6KRgtedvT8or2ZuFLl/ftlNgRA0gSGliYgMAIIE81lc6qIWlrXmxSYarqSDLDbuEAkRPqPTP3ing2Fuhge1uVP2df4GVXM7xvYzA7kEjPwiT2APatbCQ2lk1sZe+/pSP0/UGN0W4TbB2AHBO07QR6tH3rXpI2l9lMhgAj3i/P75pDaTrV3dtcKTJAkDw+RH7cV0mOBdRFLV8hqotHp7r75ZikZJJOcQRPf+1OkfGABWVhnMbawk/WtIpRwJBEZmQZn7GRWOWNjxuCCNjZSAMUovUhhPiP3rmOFLqYXzpd+2LgF8vs/wBpz+dRlXlC66oJdq7vjIVjt7ZNJeReFpjZwCsdRu+IMR55NAHHhFJEOQsBeuRO8+n9qK0rbiytrdxsSWn5n9alq9grIXrXUPaIW0YLvKrktschB5HEViL5CPCuPDGy6cU50ej096yl0LuLgEs3xfL0g9qZsDhaHe9vhtT3X+saOwwtqssDnYu4luyA8T9aW5hOGp0W8nchuo9Tt3ra2/dQRkbiJHmBtx+dNax7aACVNH8wndlLujaRQ5dlIAmJ8TQOST2AHr3HcwN7HuLfEuWdOxhJVb1W/pnRCltQwxMCZInnnOc1b6Kpz7bQSO8xax7wDBBgGCRH+d+aDZjclGwLTHQWEtWFf3RQkbnzkFScCcRnt5in/JjLRYXSge1tkr7fVDdCTsG1TJAMk8zWaWFm4WunE8lu5qC9rNSthizCVPwSZJ7AjjEzS3xgOxwnQEvbXVQ2g6uUuTEqxYlf+Q205rUeoiDwAOe6P6ey7BDEXFJIEYK4+E+Y7jyIrS122nBWdQGzCF/BGD5+fqqHT+7vgO21bv4iSQpjkkDO6O/B+fPSje1wtC9roz5J1peqK9s2kLBbY+Pu3qfI+VC5zN1krm6iItO5x5SrX3RtIMgcgTuJPEs3ypMszapq06UDZbVJ65SdxAwok+mYk/WKwkXlajjBU9duekzSXIWm+i+oJ+fc/wDmlFa2BH2dC1xTA4gfUzA/I0u6KDWalkDRu6+yhbdnExgf4JoimtqveVtYtnjmqRCyCF6Nd6+mouNZLxMgqB4GnEDzx2PNZ5NznWCuO9gafAp25or7G49q86+6LFJY7RuuMkAcA7FH3p20AIY43ONFZ3+jjwFHzA8y0xLkE8EmST60RLScLQGljCOiXbXYmQ0ic7+RjHzowwhU7aU30ZuWMeREg5wYJ/LNG0kJLow/HdPNN0xmZWU/yWhiO4j8PqJP5U8R7juHC4j4Cx23on3TOm20JYAmcbQcAD9/7VpawDKtrAOFn7R3Lgszbw0kiAO3bI/OpLJsbaImlF3LurvDcqsWTDDZPcnyIxxXN2ukF8rq/D5omlweec2cDHRAJ0nUXmJM8mSxwD3/ADniibE92F0pdbp4AM8i6AtDarphUnIIRthIxLRLAeigjPmaZt2hK02rGpeQG1Wf+U/9nrVtg3vUARdpBEjxDBbd8uR8qa144Kx/FGgFuc5+ya2usozm0LRCvuRn5IB8IYdyvnNEylzWuc0g3xlG3rTaawrW7YdebhMgmeCvfb2yPKrczFp75WzvJea7KV1nU3uy2wKMgCTP1pZpvVdHQQuDS4HwlItb5En7f3pRd2W9zLwUGy9hn7TSCbKc1tChlc6dSTnHoaEq47Jspzord7Z/KtO3iJJCyMKQM8Yk1YjLguH8ZNzNF9PytNPqlZ/4W3AVmAuPiJkSxJ7LE/lVtYXFYI9TIJGvJ/T08uyITo494q27lm4TnwOP/wCo/KaIx55H3Xbb8V07rJse/JYHQ43IMiDI4kdxnzpYjPAXIZPWXGkfoun3mLknECPFjykju2OT60ZYVr0MjXPLndOE80mkXeqEnwgDsF9TPrRRwAuytxf4SnT9J0zEwqhtxM5MnIyPL7Zro/LaMUsNHlKuodLQSbb72B8U9p5P2AX0pL4PDuBTW8jcKR3R9xRiwjxGPlA7dszQ6fghY9dW4EdkSSRkGDWhYVhqNSxPizVPAcKKpaM5J37/AASTt4MkYEDkevkKY3AV2hbFkDgRUx0S3kuNk5Q2t6H7woBAUFmY95YgnHnSDGT+66Gj1bdOx/c1SK6uLdmwR7tSAPCpmOMcZ5qO2DCx7nSOLnHJSjo9s39NdY2xbbcEi3IJHhJyxJkzHOBUJppLVHYKQaxLunuBQ7e7BHhJYqN3IH+eVJ+ZuGUYfbSPeF31kizp0uHkvtjjsx/t+dKskrf8Nme2Qi8VwiOmdOsXbS3CzPuMHbA2GJzIyf8AutMUDC23LsvlcT4f36rTX9E0/u2ZFZSpA3FuZnt24o5NPHsJahY928WueneyL3bdm4H8Lkl+xVZwVkZMA/cVjGnJAKyy/FWse5vNceqpuoa1NMvukQEIo2wxBEzKkjMkwefxU18gj8IC88+R0ji53JUv1H2X95prF7TxbJAa5b2rDFoBIIWSQZiT3Peo8Ax7gqtHeyXs1et+O7IYjxTGPQbTSvkOccigqtKnuENsIO6fEI8gZmowWMLTs6qq6LpQ+k37R7wl9mSJG6JPn35oifFXRaNO2iCuun9FdI33nRiZKKQwA/c+lOEwBwFrcQT4U06nYeC4bwx4m4OMSe/HYDzrczbIB3QteGmqU41whW90ZnlmiTHAA7Dmrmcxjdqs27xFffZrVObpXbIIlmJJbHA8gJPlXPjd4qXPmkDyqJ1rQkIXUW4JH6VSi491B5miCpHWLI2zOfKrVUiUWohpLOtaJrsKo47ngeZrMWEvKYDQXdro1sWRZO6J3SCVO7+rH+YppYKpXHM6N25v7i1Kdd096/YdlSVVioefGQMwyj5AyMVm+V1auvDpY43gk5I46ZUprLt68qi5LBBjHmcn7xmkUbwuhHBFHdCrXXs91ZtMzeHdbbDLMAx3HrTYpjGfJEYgRj6FHdZ9oTeQBFKoPw88+Z7mmyakOG0IGxOAtEewervJqUt7yLbbtyGYPgJEA8GQPLikRSEPpZviEDDAX1kdfqq3qr6Xf4rwRzxvmJ+fAyKtzGON7l5xY9A6uuouWrCK9m3aLByy7lb3eAq3OIkGSYJiK0Np4rt0Rhtq2Sxbb4T96ar2hTmmt22cOVUkqVaQPECI/wANcuOZzAQFvLLX3WdN1BP8oBbQAAzEACML3rRHI3ZnlGxzW4KbafR22ECSRy/LE/p+1Dap0rmmyiDpU2lCpM/1GQfn2irD6QGRzsqb9oLY90CEVGBCiMRnPHpNW15JyVJHV1U91pb73NlkH3YAjaCJ7gmPnyap9n9KV4RzynvQBqlUi+RxjMtnkHtT4RIB40lxF4RVxhTqQrL3kZPHn2o1Fr/HAR2ow1VSK0utEg1e1VSMa9uM0BFKFfBQoVNdV6VdV2e0+1G3biTAXdyMdjP9qSWOvwld3R6tkrQx4yOPNDdN0K2EuKCjtcRp8MiIk57HFMjiaBV5TpbeQeKKjD0jffW2vLsAJzEnJ+nNYHs8VBbC9scZe7oLVTZ6WLXUDZVFNtwMMobwbfFE8GVOaMN2y13WET79B8wnI/m/7RzeyLWr63bDCFYMFcmR5jdBkRj96IwEO3NSGfE2PhMUw5FWFQ9WC+6bciv2VWAYFiYUQf8AcRWh3C4qj7Ljp942ri77N3fBEKyhviEcR4pHEfSs0Z2S0Vt0mm+dZachVfs9cubWV23BSNjj8akSCfXmtm3aT2VauJsbgW9enYpD0vVd2MAR+dcaXwkADlOLz0VkLoAkwZMCeAB3iox2LUDCeEJ/qllCUWSTk7TnPp2prnDCY2J7yfJa2ddbKkqSIEkNkmqFcqnxPGChup6ZLttjM7k8Mx4WiZ/TmoXDogLaweigOm6xldmBMhge+cZ/So1x3Ckl4tekPo8RuAY/h/tNdcBIpS2vvtLDAjkntyf7UJwoAgH1Q2Rukzz2/wA7zQFyaAFvZtBwNpz6nyqCWke1b29FdUF5lB9Z+VH89QxgoR/aV0MBQQORn9aLdaU6IKo6d1FLyBlPzHcUKzuBBTC2pidu5TggiR8jUUBINhaL06yfF7qJ+nPNQY4WkamWv1FfbnRbBBUoomPKfQg8g+UUJaCr+fLuvcUJe6aovLcJl1UoD5g9z68/c1W0XaX85wjMQ4JtEEmIq0hcCwpbceRMd4+Qqtou1aW9d6Da1SgPIYfC6/Ev7j0NC+MP5TtPqHwP3NRHs7pTprItM3vSCTuIgfQeX95pjbAAJTNTqfnP3VSiE07SDtJjJpUkBc0gKBxTHrPWHFhduSYLTzjsT/k1y2t2P2OXVgjHy93kpbpfV7yyyHczMWcnniB349IrW5oPKAN2jw9UX0/2hvB5eeTg95wATzE1Ty0BXGyR4yra3qwR4xAKjBiDuGR6xU08W47ncLNqjtwOVO2el2bV/wB4bn8uRC9+eCfLjNMj0zRKCDhZrcmvtN1fZcJB9ZxEHIP5it5O2kogpVY9q01V5bLWVKsYJjxH1x3pkbw7FIgVKdQ1Xu3YK0iSAfSazTNp2Fd0v2i6mwODSSEbXJm/tAwBVnMtjnPrVIi5D9KsrcJm4E8gck0RchAtfW1C2nlLlwEdwwH5GqBcqIbwvQehe0i3baMWPh8LnGD2JA7Hz861hpc2wkuZ2VLbuctMzx60CC18/iAeRkdx3HlUVblm6knNUoV9FsRzmooAudtUqXBFWouDUVKeTqN1nVVbaOWgAYHJY9/rWpbDaQ9R1Ss7L+Ek49CayT6dkhs8o2ax8WBx5pK3TTJ2YJMggwo/w9qw/ImDtoyO66n+dpXR7jg9l8t6Qp471wE+S8UX+MD+tZ5Nff6B9T/pb6Xq+5wCYX1PnySfLmmgUNreFiLi47nco7V6u2+FJIWJgEfrx+p7CrFjKu1p1i9omRHv+8DhQu0FQWAEDzPEDPlWr5jH/qQmkjPVbQUjS2vdg4LZLn03Hj6RNNErG4CDC16bZ0rW9zhS3/5C+SvPwr9siiaGEWUQpTqsqs20ysmD+lYHc4QhAvqjuLd+BUAQ7lta1ccmf8/SpSlphYm8ZRJk8AEZ8hJz8qurUtO+m2nseO3uW7OUaNpX4TPruMRHeja4s4RA2rT2d687MLV1QpM7dpG3HKiOIoi/cbKU8dVT2vFkcHipSCluE/yapXS6CftUUXxkqKLO6p71FRWLCoqXlnVfaa4w2hQm7LMBl48z+1O+bYT5HHgJRa1JJk0BckUUwtX+JMDufKhLgmNba+a/TXLmSw2r4UxBIkwYHn60O0uTw2ktudKui2bnKggEg9zxj6VPl9UBK2se82xwvOf1PrVbFNyBvIrMGuMWHmBk+QCngT5iaGqU5TZumXXQM0WLQ+FcST69yfnQXSYGqf6pol7PJ8//ADRbiUBaELodVsKyu4AiVPBAPHyqISsNZeD3GdVCAmQomF9BOYFGUKxdqpRP+j9Vtoi52ss94PLGQdufiH1UVMhRNP8AWhc8bElj4u5M+83ET8o+1EcqJx0/X2iQwMsN0EBhMsD37gTQoxlXPs/1dQP6o4weCT/aKZyh2dkTc6ss/T+9GG2ptKJ0OvRoBPrP1/aoWFDSNZwcD/M0ulSxYVFSycVFRXnmn9lldp5msrZCeFtMY5Wz+ziKYIzQOkcEXy2lI+o6m1Zvohgopl5yPQR3jmKfC7xAuQEBqqtJqVNkXGVHTxAlcBicIAF5n5SI7GumCa/0pah+u6hReCr4QY3KCSAe4En/ADNZ5aaaSncpnr+t2Dplti2A4Jl+5HYEVNwpCps3gn8w5Y/CDx/yP7Vndko24Flbv1t7ltkaG3Ac/hjO4Rx8vWoBtVF5KUHTnuZ/2/52qlQsonT9HdjMUJeAmCMlMLPs43yoTKjEC7/9vmOKr5iL5KA1PRCOOaIPQGIrDT6V0MgEjvFGDaWWkJtpX2kHsfyPnRBQKr6BrYfb51Z4TGpvqyaZGURC+dMundFaTkJT1YaW00SRWZ3KVS0daBCsblRCVPdOvNbbeo+HPE1gYayui4XhZ9Y1877rdgT6GOKtx3FUPCF4/wBVus755Jk/M1oaKCzvNlZDWXLQ8DspgjBI5+X+ZpjXOHBQWQs/eGY7xVZUK/NdlgPKrJwqXOpvEz/nyqgiJW+mt9qslUFQdF0AYye8/wBv3pLinxhWWh0IA4pJWkGkeNCPKqUBWd3p3pVKwUp13TPSq3FFSDs23tE3LUT3BEg+hB5pschCB8YIU+qRKkQCcek/9mtANrK5tJj0fVQyk8qYP6UwjCjTlULdSUkd/SijaUZcCjdAAH+JZGdokx6ExWsCkpytbNzMjvmszh0SyUSTIz9KWqQV9YqICojV6/YYFZGREra54alPU9aXRl86b8nalfM3KRuafxSRRgIDyll+3LVaElYWtQyPuUkMpBBHYjINSqUtfroYMS/Jz9xM/WashRc6VZmfnVdFE3047/OgKY0Ks9nR/n2/akuWhqrtPxQI0WlUoiBbqlaw1Ok3CIqijaUjuaB1JiiYiWP+mWGXcyS0w4YkBfWB8q6OnY0i+VnkGVLXwqXnUHA8jIx61DQOEhDWmbarbgd04ByI8x2pzcJe5VPQ9SzAAnyz3xwCeSKMvQFxV/07UeECBSHKg5H27uRJpau1+NwjnPzqKrURqOjByTvG0ckAk/QGJrWyEALS5u5Bavoaqu5JIMgyIIIz2oZIx0QBtKV12nImkbUBSg2lDeKY7xz6x60NKkq1loAsVB2k4nmO0+sVZCFDi2SMD1MeVVSsLSwaEq0z0ZpZTgq72eFKcns4VXYahVo6zVK0fYFUrRQtCoqS/qcW1LEYqHCY3K8s9oepPevP7oFVUGTxj1rQw0EiSycIYaIo4V2CblXxNwCwHPoJz8qbGdxSXgtQHwOV3BoJEjg+o9DWlItUvQNVxV0lkr0Dpl6QM0tyoJmWIoFaI/jAQJGRVI7CX2kJVTaJjuPI+v7+lbSRZ3LZ6rsmTtgbRO6AI9T+1AcZQlQfW9JkmMChcOyW4KQ6gIpRSyh+t9UW5aRBbVSggkDLZmT61C6xSElKEvMshSQGEGDEieD5jAoVAVwOaAokx0TZoCmNVl0LAJpLlpZwidf11bfhXxN+QqNbapzqQbe1t44VfsDR7AqDz2TXpPtBfJG9azvrotUbSeVZaLX7gKUHojGuutgOgVuKt7zSqJoBK86/ibJ1H8OgDEsA2QqDOEZoJOYGAc09kby3chkmYHbAhv8A1E0l9ghNpU2s4Yq25XJCkRgZEnBFO09AnKyau6HZRCXSMHmtYKxWqP2ev5FHaAr0ro9zAoXKgqBCXGSABAzQUjGV8u6Vhn+9VSuisOnoZPMHHzrS94WoyIx9LiBgf5zSjIhL1J+1lh0UAHwOczwD6/SfzqNNqgbUBd0nvLwtyPEwWRxkxz5UQbbqQkIzVaXpu86ci4rDHvSZE8SU8vln507ZH+nr76qUFja6BoCwtfxTNcP4lUbB98kVXyWcXn1z/pTaFP8AUenm1ca2eVMfYxWSRu0q6R9npjrDRzWYuTQxVFvptw2gqnaTyfL5Uq8rRtxSK0Xs/ZTL+I+tQuKJsYXes63o7EKSJ8lEn8qoNc7hGXsZytrnVERgty0bRf4CYKmePEMZpb4yExsoKI6fqSX9JoaVlyrb1sOgoi2wlNdRUr0r2PWzckFmyG8RXLDhojmc/OmGV9UFAyO93VUmp6Sj2ijCZO7Oc+dXFbcpMx3ilD9d9iFPiUQa2h9rAWUlWssWbb21tIykKBc3d27keS00FKeq7op8IqnIAqTQXB8J78fOhRtKJuOADmT+VRMXPTHBFXIEDHWmW2lpqVdc6et609s9xg+R7H71YKomsrwy/wC9t6gW4IuK4WO8zAo/mbTaIZOE89rPZx7k6m0A0/8AyKpkq3fHkTkfbtRSPa8BzU10JCWdD6MbIGp1KlFGURsNcI4xyF8zRRMI8RSw2uUs1Gr97fBJ+JiSfMkzSJn3wibyvRtDpF2iRWErYjnUgYqiiCQ9WsX3EJ4R5/8AVRvmjORhK/8A2qXZW4YctyTHBzwab86uEkwAmyqn/SA4QOAdgCqDwABAgH9TmlbiclPoAUEdb04WqKFOul3exq2pbk2VatBa6irVWuDYDA01hwkScqS9oeiqfEBmtDCs7wsujrAijJSQE5WhVrTcfOqRBLPZnqwI2k5rXNH1C5+nnp20qsS+CKyELph1rncCTNUFdqd637PWXvW74shn3KGMmQAcMI7j17Cmt2EEORxEApZ0y37oPsIE+YkfY1hdIY3eHhdMtB5U/wBa1S3i4Lq9wArugEZBGJwYnkcGrE77ylvja4UF56bbWroDCCrCaZdhY62nK9X6XdlQfSspWyk0twaoFRbpppq1drddMBUUtfXt4qK7Sm9f8W0c0LkYGETpdSVbNRppC4WqSzc3LIoylkUV3ZuyKoG0JaiLHB+dOj4WeTlLurLg05pyknhTui+I01ITNapRdVSIKE9n9O7B7ikAWxuYEwfp5103ECgeq4GxxBeOmVZ9O6mGUGaxyR0V09NqA9qMTUGZFKIWrcmKagEcR50KZuUt13SNbV9nByPTzrHJGdy6enl3Nypez05Lex2IJLSRHme/oKU6+FpoJJ7a6bZ40VSrwpMSRB3KVPacj7VoidQpYpm5tUfs9dmynyFKdymt4TqzcpaIBH2btXaukUjVdqUuysiqtSlMXlNq+Wb4W4Pb5UNpwFhfNb1Ji2xEJOMyAM9hyTVbrRNjpVPRbbqnj+1RpJSpa6I5Uii4SSjdOPDWqPhY5T4kD1UYNMbylqa0XxH505IKZrVKl9FRECvMNZe2uwU4muvS87qnU8gJ50PU4zSpmWlaOWnFpVjpoIEGcVz3cr0MZBCYWhS04LW4/gYbQSQRnPNUU2N1FR17SKTBXbnlTkH5H9KwvOV1musYS/q3TwU2MJUiMxUaSChe2whug6ZkXYe3B8xRO5QDhOFpaIIqw9UiRiXaiukXbuVSlIPWKDVqwaQen0qq0gAVCrBJKeW9YgzuBEcA1QcAoY3O6L7Y6lbuHahkjkeVXutLdGW8p1YHhHyrWzhYJP1IXXpINGEsqXspDmndEgphUVL7VKwvIFaa7K8s82j9LqCsVZ4WUgg2FcdD6gGUVz5mUV6DRT7mqlsvNZKXUBwtCKitA9T0RdSUgXAPCTxPYH0oHRhybHK5pwvMLXtRduXXt3kCFDBAmRBg8+R/WkOhDcrY2cuxSoNFfBoCmI9M0BRALZBQolqhqkS331FEq611pLMbgxJ4Cgk/9fWiAtRTmp6vqLxwBbXsDk/YfvV0Oq0ReQTjpfSy6j3lwsp5UYB+ccj0pVBa3P2ilYdO0oRYiPKjAXMmfZT9BAFawuW7lY6hZFGFSQauxDTTAUpwXINWlruorC8fSuyF5drHSHa0WewRAoijOg1QyYnf/U/6THpGt2NzikSM3BTRl5lDGCyeituj9XD7jBCr+MwAY5+1YpIi3n7dV6UxPjoO5PTqPX1TvS6pXEowYeYII+UikkEGirILTRFFE2zQomryH2kt2/8AU2uWpa1cEM4B2b4yA3Byo+pq5Inhm+jXdbIYngbyDR6rfebZB/CaxcrQcJxo9YDQkIgmVq4KWUa13VStaW3qlF8u2g3IqK1na6en9I+wqIw+k30OhUcQPlUDbQvlKZqvFNa3KyvOExrSsS5cVaiV663RgoHJbTEpdCorXkWgP8xP+QrtR/rHquV8E/8A74vX8FPfH7zDjaOVxPH35rf4t/OOy+iVMdTYkGwDLKz63yEB4S0jCkz8u0keRzj1rE8AuJA/H3XjI5I5/iGon08ZdwBnY3OHFxJBF5oclPtDuOmcI3hVhPqrFlK94zBj55pG1omYSOfO8g0MrsRsjGpie8ZcOA7cAQaGbzx3Ke+yVu5DsW/lkwFxhsSeJ4jvSfiJZ82gM9fsFXxZ0Znpo8XU98CkP7Z9Ya2GQMQotl7m34iDu8M9sKeI5GarR6eNzHSSZAU0GnifG+WUWG9P3UOdTOmtNb3QXUQxzAY+EnykR9q16l2/SAR3kgZ9aXTkkD9I0x3RIGfWqRt5yQQWmJxAjE9/8Oe9YHaJm4s21V07cOR3F8H0tA6FuW19bH8Lhj7tQ0tywgR2J+2FqxBpWaZk0jSb5o8/uo2KFkLZHgpnpdYVMEyIBE85nH+edZfimjZA8fL4I4U1MTY3ADgppa1QNcopCIR6pRFIapREWzUUTLSvAogUJCM0x3N8s0xmSkSYCZCtCxr4wqKIDWriiCopM3NOSSvk1FVrxvTajawPkZrrNdRBXF0k50szZgL29Eyt60l9+J4jtx/0KeJjv3rof+YZW6w6oMGW7S28Y633Wtu4ZkQJMx5fL7n71RdZOOVjf8Yjc6XfCCyQglocR4h1BHfqFW9A0e9HBuSrjsIIM7pmc5nHrWKaUtc00PCunpviglEZYwN2cVdVzWf3PJRN916fauXWub5EImQC3bEnyyfIUmeb57gdtH+Vt1usGoIO0A/z/wALzW51y77y5ceLhufEG4POB6QYijg1BhsVYKmj1jtMCALB5BWei6s14iz7tEUGRtxAHYD680Go1jnRbAABeK6Utv8AnulZ8vaALxXRU+mss52tOzn0J79vU9/PAxWWTURlpkDRvNg5PbmuMrUZA4bqFn3dL7fEnaNpO9pBE48R+nbPrW9usji0UY8Lj1afr74WgTNELRg54+6HvWGLbjzEYwAK5mr1jtQ/c4VXAWWaR0rtxWlp2HBrIQgCMt6x17T8qAgK0XZ6kfI0JCMBMdNq2bhSe/2qDKo0FNXP/UZW8NlCf9z4H0UZP5Vqj0xdyVjl1QbwF6H7Je0Ni+uwD3d4fHbad0xyJyRTzDsWQzF5yqTdQKL5VK0A+oRywVgSsggHggxn6giiojKpKtQsGnDKQ4LGrQrxmzYNdNrV510gRlq2aYAs7nAoirSinXTOvpp7ZnxN2Uf3PYVk1Asrq/DrAOFN9b6vc1L77p4+FRhVHp+9Zl1wMpPqbgAjvQko1z0R9t9PUx96VIPCnwGnL0jTDFc93K6jeEVsmhRBZtYFRWs/4QVdqLt9N4TGDjP15/7o4wHPAdwhkJDCQutN0sFidzAKBMyTJiMTzkADuZ8ssAtoJAJJoD+xSWTTiASKGT/ynemvWrdp/GWO2Z2kfEpgDnyJPlnyqvlOLhTa5/blV80AEF1/2vJei9KdbouMTbS0nvy20OdoO1dqHBYtxPlNbomm7Pa1hkpNNTcD2v4i1cuk2tqt73b7wBydjC4kT4pEHInyrQci1kdnPZPf/d9/T/yzeuOwA3yE2q3JAwSYEAiRkHMYpZiamGXbhU3Tvbwt8dkzCGPhP8wgW8GfiJx96WYOyY2S+V8HWg1/3kru3e7IEhSSdgnvzC7iewO2AIP5QrZZ/Fqbsru5q3KSXUOxEEAEAkgEQAYWY+KTnPaq2gGggcbRgoUC80WyK7VLxheSv2wSAMk8AZJ+QoXPa3lOihklNNC4vWX/ABFbYOBJDE+gVJM/Ssb9TZoLtQfDA0XIgtVZS3m41wk/CoQoD82uAfkprOSSukxrGikov3aitAs1CovytBBHIMj6VRFhWDRtem9J1Qe2rDuBXOe2iuvG6wmimlJi5uVES4D1FERZuxURBb27Vw2UKoWLksw4gngGchctPlPnWoSNDjngUPyfXmlkdG4tGOTZ/CEv3bisFZILHkkSozucgD0JA8w3YwdLSx5ppxgfQcj8lZyHN55/PvhSZ6wLd+8GZrIupsFxJm1tj3UAZ2KBBAyZJ9AwSjcel9UBYaXDa33YVb2quah9yvtPvVtgKN6bhcALbmCcCAJNOvubWZxo5Si5eVnkyQdu492ON7R5sdx+tUkki0fqOrlbgdfF/OF9zkbip/loJE7FXHzJ7AVe5EX0cIy1e0y3/wCIF4FA/vRb2OLu4HeqExtADR4p4FXi7V+G91rLT9YYAsGIdn3H5AEgDyBZs/8AFaEqg4VlPume2G0BbqkwI3DJ+ZnmhLQhD0rVBG664tr/AEz/ADD5eGJHzNPfqHHAWKD4ZEwAvyUPc6l4W90m1OGZiVB7wYO4mM7dzecCsckrQ7ack9OT78zhdGKOhbcBKb2vuthboE/hTck8Y+ET9c1XzK/U0gd8fgplbsXaBS4oILSc8D9TRPkDBa6Pw3SQy2+ayB0C01FpfeLOLZjxKd34Qx+o3CRVteHC1eo0kf8AlNbGCGOyM377IzqQ0pnZbIC2xlT+Mjgz2Hn86W6UB21dHVaXQsY7cPELqvsPZ81P0xeZVT7I6+AbZ7cVknbRtdDTPsUVaWLlZaWxbMREniqRLEjyqKwvhkAnJgTjJ+1UjGE86KzEZ4HbH6gx5/Y+VKY8OyFRcCFp1fToFa5HjjzMYwDHEgHmtDHu/SkOaL3LyTrtvxTWzosruUre+zXJdmYkASxJMKIAk9gKfG4nlY9Q2loHH9v+qbYull81vdsuoRmVgriUJGGHcg94xS2TRvJa02Rz5K3Mc2iRyhjimIFotyrUWou1FEZpVDuNxIUAs5HO1AWaPUgQPUis+oldHHbeTQHqcD/adE3c7PHX0CH1+rLmYCqBCqPhReYH9yck5NSGERNrknk9Se/+h0RPkLzfToOyHu7LQYXFJfY0QYCMVlNwPxR+IdpjkGlnfNRYabY+ovPp5H6pg2s5Ga+3vqi9UHOrNoKGJulQu1ckvtMYxmciszGs/wAUSE1TbvPsrV818by0DnjojOtaPTi41tBGxgruCYLEbW92JOAykQ8/Cc5FZdLJMGBxP6gSB5Dv9D0ROmLXgA5H/Brn91z1TRNpwumUgttLX2z43dDFsmMIiMCJxuae1VHOJiZnd/COwB58yT+wpVqZn34smsnv/wAc+pSzqrFVVEjYQGcAq7IScbmA7mfxE+cYB0abL97+boHIB9B/Q8rWMso5OffKF6Ze2XFNb5G21HC7a9egaW60AjINYCusOLRd67/KZ5HxC2gIkFiNzSOTCCPQvPascri6VsY4A3H+APqVH3S3s2iqgHyz+tPAoAI2Cgubsgbj7gBiNhvOqhx+JV3CQTnxjyWO84ppWueW27A/7RwehJ6129VLaT4uFr7OdRe0121qIt7PEoJloEn4gBu8IEQOxitkbonxtMf1Pc/XqtU0UQhY9nOb+n9Jn1TWpctuqMCymGWRuU5EED5UyHxAPHB4WSRjwwOIweF5r1pM1tPCxHlAdO6U2odLaYY3FE9gCGLMfQAT9KTJqWwMdI7p/PQfdBJGZKAWnU74uXPd2RFoEJaX0yqsf99zduJ9R5Velj2t+bKc5Lj58kejaoed0s0rs7G8cD35pl0PSX4uoyI1uyzf/O1sWLd4+CWLA7oEnYpgmCexrNrZYdzHscQXAfpB3FvPlXqc9kUDH0WkCh3qgUJ7T6BkcP7pbaXFBX3bB7RI+P3bLws52nInyitPw3UCSMs3WW9xTq6XfXzStVHtddUD9vokc10Vnpdh8VFVIu7KjB5HI4IODyPMeVC5odz0yia4jhfemW9zziLatdaRuEWxugiRIJCrz+Ks+qdtj2jlxDR9cfxabCLfZ6Z+yz0lo3LqgmWZpJbI7s7N8gCTUne2GI+lD+AtWkjEji9x4zXcn++U29neqi415zaL30tvety7gAzGIzuLXBAmOZzXK1LJNrI91NJDeB7rC6s0rnVHzQFd+O9X9EF7KWS19GuEslpffXTIbw24ubpDRMkArzkg5BFaNcS2EhmC7wjpk4+1dVyIm/8AUs9MlNb+kTUamxcAuTq1ZoYghYukPkHiATHp3rG17oInNcB4CPrj+bWimSEO7/br7+9rPT9HV1tuirJ3XDuWQbKbgHiPiJRjIjjI8QhsurNOa41VAVyXH8DztE+Fkja4I+5CmdWWLsxUrngwSI7EqAD9PSupDQYG3f3/ADawlpYeKV97NuLljmMc+Xn9s1lkG1y60D/CCv2o052i0QQ2ltXL7MW3As5BKsNoYuAVIAMDAntXLjnIl+dzvcAMZoYseSZ893zfmHkZ/r7Iy+11EeWyMbgMA7QWHwjAIYcAklc02Of5m2utn6XQ69UJcVj7d3CEKBA1q4LagkjjYvuwq8nxBojHxVXwv/8AT/7rN+tp0e3ghZ6vS+8XTJcB95b0au4j+YJkW1DQYck7c/1UiCYs+Zt4c+h2vqVQftaa5vH5/A+qI9mfZq5ZLsGDK5Mg5hBOZGC7NH0DeYJ6wvqlvmkc3a44QvWukMZgYEsfRVBZuO8DHqRTJ5hEwHqSAPUrMW2gOgH3FvUXmRtpHukErJLLuYbsAEIDmI8Vc7VB0r2RAi/1H6cY9VY8IJQF7o6re1QYsbOm3EmQGYkxbTdBAJY8/wC31rW3WvMEQbW9+PIAcmsdFiMDfmPJ4H8ppdfTL03S+8S66e8vTsZUh9xjfuUyduAcYHrWZg1B18uwtDqbyCcUOPyjcYxA2wSLP381iNt7TWbFmxeW3c1S7bly4jQxG24EAAMBZJIBEg96sl8OofNI9pcGZAB4vF9OfPsqAa+NrGtNE+X1SHXaNERXBYl2cp5e6VigY+HJZge4wvGa6UOoe9+08AAH/wCRF19FnfEGtsdSa9AgAa2JJRVt8bW+E9/6T5/LzH9wKJLRHS7q27lxbuA9trcnIElHUmJ8J2ASJw08Vk1THOa0tF7XA/yPyt+hfGyW5OO3fIwjrbgbmtW13NIxBVVJ8UNwSV8MDszTmKFxkmcPDQBvOLI4+3PqF6rTwwzES6eIBoPOBuIrAq6HXsUv0q3A1wghQ6lD/UAeYjv3+fapNGJC3ceDf1WWD4ZqdY8zv8Adfr2qsV9+R5rV9abCMgWQ8bmnxPtMhc8LuMnzIHYRS/8AGIIkdmr29h3Ne+/KUIB8NmqZu68tPQkd+1X1R+i1d0pZIuMoQlkGy3K7jLLJUkqTysxnijGiErT80WT5mq6Htfu11Y9BHq2Cd42udnwnFdOn7cfut21T24G6GRBaUAIoCncWDKohhDERGPtVSfDId1ng0Tmzfr/av/wWN0we00yvqT69lxc0W8C5tyAR/thRuJ7HcSJ5x+VaToGFpawkHn3aDU/BInnwOqunr3Qmh6k9hwocBGktbjxKYkRc2lSDAkNmCZzXMe1wBa8X53/PUH0/ZcEtfE8h2Wk1uzj1866fwq32PRNuy8zF7pmWQg3fx+JyoMB2bGJPnNA7StNSjgcC8DpgLc/SsbGJIzbet1d+84T/AFHTLSxbN1WvMXdFcqu9gJkqoEgeGf8AiCZOaXHCxjgQOlcni/NZ2bNwDlDL7UsHFprgmSUm3buouSCyPtgCQfMYrS/RaKRxdRB60SLPmuk4aB0vyw5wPlxfPUGinHS9Jd9w997he5dIukuq/DbO5GYjMeHC4Ez4YFCzTRMlYBwMDyvn6+eVlaAZI2E3kcX1N16+iU3etXmJRLrJaBwJjvy3fPJrrExMPC9JHoYI23sBPouz1K+hhrnvUggwQwyPEA3nBIzj8qGSCLUCiPPHccJM3w+CZuBtPvkLfUbP4aA0jxQMCAwkkx3J7/7YxXP/AMb5UhdWT19Pf+15fU6eSGw8eV9FKXuu37too7ghirPCW1ZmVQFLMigtxOe/yFOg0UUbw9oyMDJIF9geFypZS5tX6rrpXWL1jcLbDa2WR1V0aOCVYc+og4FHqdFDqKLxkdQaP3SY5nx4bwt29o9Qbq3WcMyAhBtUIk/0oBAPrE1UehgjjdG0YdzeSUR1Dy4OPRL9Rq7lwIrRCLsWFVYXcWCwoGAWMD1psWnZGSW3nPJOaq896QOkc4UUL3pyCkcLhZRbCiZJmPEZgQT5enrVpmm08mokEUYyvnUtG6KpYQcofmn9oIH0qk3VaOXTHa/qLFcJhZUhRHhGIX8UgRzGO/ymqwV9F0jAyNrQ2gAMdsdR3Xx1UHI3AfNZmCePLsTVbRy/6f2jjiIj2uxXHp0J6Wj9Xbt7N42lSMqT4YIMgHzwZPOasTj9Pa/f/CQXMla6Ob9NG/Rd+xWotBrq2zuO7+XuUlRkkiSDGAPFx+dHpXA7jRq1xNA4vicBfy2ux3rp2v09Ef1p9wh43yT+AC2CYVcdjmfIkfKqnMbhtJ/pdnTgNPh4+ufP/SSazqqqq2hiARA5fdyTPAwIpRm2c+/f/CrUauPTW5+XHND3+6H0urN5TbSGZsmQABwIkiT5wD/essYllebwPwkwa5uoaSzmsjoP6+meiYi9cICBRtxt3Sobd8JUMe/MjmTmtN6ct2YcB3zkJ40+lkZsPiA568d6/hBajSObtkbily04aS/PGN5+EwAJyKJ2nY47mc1Xl7yset+Ftl2zRH9PA7i7r30wjgy3EI9xassWE+6ZmlSYYlmkFQJJgSZ++GXSvZufVirwbP26fRcSf4bqY2mQsx1o2ffotOq9Qt2A2j8TBVR7ZPhw6+SwDtHhAjgU3SSM2E9+D18+Vt+DSsa8i+M+ZHZL7IDARL7vKZHbGc0ZDHOp2b4K9QHtcL6d19s2wCASeRnjAwTmmwR/L/Sb5VncG4zj7n6Js/T19z75SwDIQAQB2yZ55+lDqXf9THGF5j4trX26DBH3UTbUACRnBGeQexj0+tGQei8uC2srQZMD6fXtRNNhLMe5wDOvH1W50TjyP1B/KipdX/y9rqvaPuFQdJb+Wosi2LoBDlo94CT8SsTEbYGOM/OntqsLnmN0ZLCKcMHuClvUdMdTqD7qDwC2ADGC31OfrSZXAFRsZkdTUH0vX7GA/qIngHHAk8Ak5pb31hdP4HvYHuHBofa0569rbOxEtS5+NpUbc5ZQA04ySe+0VnO825pNV75/0j12vL3bSBePeb7DBFJHe1LidkOBJ8UAwV+Hbg4znniksfIB/wBTHvy7q2fG59hbI6/pX7iucLIqxg7hsmXAB8I57xjn0xVGR2WHn+ftaN2v1bohtFCuvVb3dPcUm2rKZO47lIADdyjdjwB6/ZXziG+IV76FKf8AEntgMO2g7POc858/fZDHWNbgHwuM4AAIIjInwkR5DyIxTYpHNHhPh/P5Svh+tfprbfgOfr3Wp1d1oncUz/MAkepkDOe54qzPZokA/ut0nxk7gAcJvd9ljauNJG4XhZtky5c+CW2jaAoDAyTyYrANYJW+EGtu454Getc4SHB8r3PHTz6Y9+ZRuk0mx7S23BdrjKgMQ22d1wyfhGO5mDnEnTFrTAHuc3/tDsE9RgepvyrzW/STnTh7XNGQDdmzjH1z9BfJQ2puMVBU71HgVmXb4VGCBJGAMCYiOKjQ9zmjbtvJr9+2e66uje51BrKvJ7Z6/grTS2C9xbYO0uVUTIgsQAcj5cVsll/x43S80L/pbtRN8mIyDNf7TFdAPd2FDAXnLuwMBVQSPeFv6fA0Dv6Ut3xNoBlAJAoHzceB5+fZccfFJLMhZ4cDnrV/76JH1PSNqrnvDfYpatszM6BdiK2AqhjyWwCZzSZdTXiLcuNAA4J+w4682eFzZBteNQBXQDoe9e8lLddYawwVLgaVVgVzO4TgcggyKqF5lb+kjJx75W3SauQigP2/ZPPZ/Xp/EWxetKqlVPIkwwXdLmYJkkDyxWwSCqx2yil1m9hiDxuzz18v9Eqy9qzKEjupjEdvsaRRDqK825pbYK8jsqSBAJ+Qmt4WCieEQHg8Qe/zHB/fzoCCtMU4ie19ZCYaTVhiFMjaZOCRz2j0A+1ZtsocayvRs/8AyBu0lwQmtK722zEnnnnvWxt1leW1L43vJiBA8zZJ7+XoqP2O1ShWChPebpO8DKxgKTgQc+simtI2+aZpiRxypTVWlDHapPcA8LOYxzGR9KxTPb+ldLS6P5cG85dzWKx/Pnwm2g0a3U98wgqR4Ybb9JkM2JiO9BC4Nprs+a6EWlg1NPnHid1B6dP7K20uj07XBvRkUDG5oLQeW5EkyCvamtYKJJNHjos+n0ml1ReGtILax5fzyqrR6SzqXYpbU3FiCVSNqgeg8uRWV7WA7iTn33Wl/wAPjgpzrz5k/lS/+j3Qbu91LFmDjktgSd58XkIjiY7GkyFl5Oeg/hciTTiQlxdTroCj5VX8JRrelsMC3uYz4i0DnhUJnER3/vTIrJAz6V+UoaTUWBsOeBSNb2ZuQZW4luJBSWziSQGPqMeVMdp9Q0bgyz9FqHwuX5LnO/Vih37ojUe0upF+210AtaAa1sQFWggliNwPiAkmewxWCGCL5L2t/wC7BvkHt9OiXF8QcxjmVzQPlR/2uG9qGtIsWQLgtPattFwbA7sWaHJ8cNznn7j/AI3zXm3WCQTkZoDt0TW6hxG+TI61n0Hl15+i+Wusi4gG6IHB4/8AqBXaLw4WXUf2P09+i9bp9Zp5B8xrqtF9J6laFxDG9lYNIDiApBJgDgQTn95lwFpDyDeDir6e+ErXamMwuAdV446lWS9QuG7Pu0Zikbwu1RbYRA2kQsGQeQT9KZ8hoAjDbF3f5XEMTflbBdc/WvY9MpbrtCrWnRAltbjr7wt4CQDKAtwQMmB3pbtEx8wl6jjtn8o9ha4FxJOMV/pCdM6IhRTacNbFxgTcBWANslSs4MmmSuEY8Lvunt1JiaXE1RBrHn++Pqlz2rFq+28AtBUHeoPxAqV8QJkHGDMHHFYNRIZbPhIPr+/r5eqx63URzP3eDIq7PH/u6C7/ACm3VTaKRat7wQAWuZIJgc89+PSmaZ7JjThVfc4/HdXoYmalxEoIrz/Vj3kd/siGjZB4YQAkSrRkcjn18q3OLGUeL7f6Xoo4IG/oBF9sf191vfts2wFxckCBtHccboBmcepFDvD22SSPokyaKGUEyDi8mr/YfVOPZyxowlwXxJI/lkeGDBgNnkedU7/pi/qvJ6/Qv0zqdkdD3/tS/UNDsfIx6Ht9eKFsjZBbCuXtA5QF1CTCrzEAT9PmaIDuqc7thVnV/ZpLFq27XASUkBSuJMwWPHPrQTNa4WuzpCyKI2a/Popyy92SC7HG2CTEcQPSR+VLjjZV8rC6eWw0OIC3Gn4MAgf8Qf3NNcyqW34a87nud1OPPnCd9M6s1pQFX4Z4GfF/4FA+Pdyu1NKxzLf6eX2Qeu3XnW64ctwThcSSSBnHqY8s0hkTt+2sLk6WUv1o2Dy4481vbaPOfrBiYraJmtwOAvX2idBe3+AfFHbIbtEcz2kVUOq+YSOyXKADuJ8/RDe1OiFtGa2VSBsuW4AIz4WXvM9vWcEGk63SxuqYYI58/fVcHU/DWTPEowDzXX06eqh3cSVJMDsx+/fn9qx7TQISriaXQmhWOgsdOvPdG6TTko2xTBBgZ8XybzkRFD81rXeP09Pp+UH+RHpmFld+vBPB9PPp1Xeh6oylABaURHgAFzDH4yRz2POMxNVLC2T9V/hcp7zqHBshJHvKoE6pqrj27QnYSscj3ZMSCR5c/XFadLJTREDi6Genvhd7T7IIQSMXQNg2PUeWKr1VBodYGVgt1bqmQQxCMSAZ5aVIWTImRXRjd52mu1cRIrBukl12tIK2dPuCqrb0IDEXJliHBAI+ED0+Rrk65zXkMIHP3/Y/cLkaxzo9rnhuTxyce+9ri/pL6pb/AIhbVxHQAhlZipB+IQZLx5jv85J0FAu2BprFY+//ACsr5mu/9MCh0x2ySstVrGwsAEZMlgWJModnntGZ8/lTtKBtB8u9+ufVeh+HyNcGuA6UBfkfX2EX0LRe8ut7xTtRd7AYLdlUehJGfnT442ucXHot2rne07GH6/dPOlaSxqUK27S2XUyoBMHgH4jzweexp7WsP6R7+iwRaiSB1PNj3X+l3q+ilZa6pYGfhgz6nb+Lv9KqRjthA7fZFqp2SadzRxX27Van7vRCAGZgqniZ3fLaMzHyFZ4Xlzc8ryLmnlC3PDi2NvbcfjP1/CPQfUmmoKSzU69rkMd8T+I7hjtJ9KzNNjaStVk8ptbRChIY4IIM+ISVlYOB8x5Y5qiCH00YP9oogTQHK26fqbTMFFpvERksG5xxt5zWmKKS/ER9v7WuOWUjaOPRW1rpaG6bRt2wudsKR6jxgSe0/WtEkoY2wFcoecnJQ66bNxWRQEiIUJnkqB3MSczwKNrg8XS0aIlslhJuoaEl3KkDwyFBgE89vX0rFLERuNn3yV32uO2+v98pTp7TWrs7l3YzvAAg8zP+RWdo8XhPr06/lNZGHAuOcdvfvqlntjr9zOpYkscxydvE5nmPXmtWocNu1cz4tK2PTNjbgk9PL8JPd67cK29ypKQJKgMwHw4UCIXE+XrXLGnbuNdV5Tbk55ROjKPf33N9oNEzDhscFXxyAB/aKEABtHIF8cj7e/VGIXluBjyCx6hbKxO1yACSwCuG3QCBOTEA88SRiakJ3cWM46j37CBqLtdSvrt3uyxncFDMciDuwCAfWfWjj0wY7ewenNfZPYXxt2i6Oa6eqaafqK7LjJb2M07ixLCGGYgAKPoTBjvW2Ta420Z79u62jfPES4im9+foeVr03WWEvrfLxhlKlTwZEDb3E4z3nil6cFrg13AHP4HX6oKgk2sc4jaOaH/17nPB7KvTQnUWdyEAqAzbiCzho7nBmB6yKe/a/wBPyFlkcHViq95Ub11Wch1CgLzAhhJIG8wNx8POeazsJjIaTdroaHVEO2Pdnp09nhOPZJWdnXILoVkE88qfTxACt0W0grp6qVr2g9R+/wBPRPeidIfeWZgCO4zzxhRzTGM28pT5do8QVjb0aKpVjM5xzPY57+lA55JsLmyTkmwpjr3RdhMjwnE/TBx6UAaCLasYaDjoo7qGm2mD2qxkJD2bTSVC/p752lTZCg7SSB5kgiIFciOKeAbh4r5QAPbxlb6RbbKo7STPiHYLkc9mx6eVdSAFzyXHgf2u38L0bZ3Eu4b0VB0rSWokDcZgAeEASIb/AMx85rcH1wF33/8AT8LQGivunWk6ubcBnIAPgYAEx3Hi8/ymfmtzWOB3Li6nTFnjJx16IT2i6771lIxE5HPAHoCccxSQRGKbwsbJhGfDwpa7qiWAa5tX+ogmPoM0omzkrsxatxFtcEq6j1lQ0JtxA3AER/uMySfpQ7xGPCLVS/GRGCG+I/sEBpNQdtwn3LzEs6yFExuO4boPMAfaubPbngkuHoefLt9V5nUSvlk3vJJKNt+zNy6W2sq3FVW934E7djA3SJjvWcawNO2rBvN+68/2SWzAOB6Wk9vUAYIIg8zn1xW0MNWCu7/4iA/jCO05Zh4yx2yAD2Egx9xxRNY1psDlTSxsJMlZvr0TXTq5jPAgAwfDztg9p7U0jdhy0SRRuG0hF6m0WGcNuJEDsQBtwYjwjEUbI9mBwuZND8t1D9NLjUdLuHbAYsfhCryfxQq/CQccDio1zbPv09UhpHRFdL1jyFG7aJLZZvPaI4jjsTUlNNNHlHIS8U267Xax1973geFMzxAUquImckER6CflS4mbSCT/AGksFH3lFdKW4h3K20AyIIJxJBI+YFbNpaNw5XVmZKyIyGuldTR7595Vl0fq91huufAedsAyIBIj4hJOfL5U5osZ5989lha8n9Sord9hJJm3ypX9PnxQOYDQHPVE8A0Rz1SzXvuRnP4jAHlFMGMJR7KQ6raBBMndiBHI85+1BSS7OSoNtKqoTtdmwC0j3anEiAJPzmM+dYY5dzttp0jWMFUb/YI/S6po8CwoOBEwJ/PkVoia5re56rs/CnPbAS3rd/sEw0zG253EE98gj7iZqt9Gitcc9We6dHUoU+S5ntEZn5CKtpJPvspKGuyeP6UzrNaDxgfX5E586rheaNXjhLNVfDBVUkSc7mG3nB9IE59aW41koDXKCu6VpZUK3CRjYu8nPby9SJxWYvLiCQQl3x0Sy5AgQQRznnyjGMf4KYjNUnnsjr3TUp4wqtCyxaMcQckZ7f7qzajTCVmORkJUjNw8196wB/FXmxm4zYMqZYkmR2Jz9abG1zY2tdzSfCG14jxS30BGQSM+IH96bS3aV17mjm7Coem2/CCsFp4jPHJJxH7U1rNy1RxEDaeTyi7B3sE7Z3FRuK5HiiZOYHyprwGDJ99knWlrSGE8H2E6020IyMGVwWVXQhVjkSWOQfLMzxWeSAj/AKgOOyw/45ILgeil+psEcbQQFYHbgww9YE8d6NjbF9/4TPkFrA88HshX1buACSPik8SDBjsMRxRtY0HCViqCK0e0xAypMkt8QJ4j09PM01gO7yKjuTRwqUa5Tu2qVldgG7wqMcCPT8zWihhVuTDQ9QZBEyIyOx+lUc8ot1rPWa7cZ4UCAPKqOELjhJNVrijSvOfzEUCUVOdQvsApky/uwxOSZgHJrhtaLv8A+X8lN1LRTT3u/oSgrl1heME+E4zMeI+fyrdBhjSPIrofCSQDXcLUXTLZ7/qaa8+Kl1X/AKiir7H3f/6k/wBqJv6UE4rTuPkf5Scn+Wx7goB9d0/oKWeaXmyvvs1YW5q7KONylhIPBo4gC/Kpeg6hFtKrW0RC1xlYqqiQGAAwK6YaA3HkrHChP/USyq6q4FUASOMfhFciTgfX+Utv6Qpi05wPWaWFadWLpWwGUwzb1Y9yJXHpyfnNUqrK/Kcj5L+gqwiBpONLrLgXaHIB5E81pYSFsbqZQP1I3eUh1MNsUyPMkA/rRsAf4XcWUkZwVQ/xjtplJaZcE8RMRMccAVTRteWDik/SGpKCWdTtLKmMs0GMT84+Qpr2gEALpfEYWMYNorj8ofVWFFqYyVknuTvQT9mNZGk7iPP8LhWb+q09nh4nPcLI/wDuo/Q1o6LbpGNe+nBMLbZn/r9KeOFkf+o+q2uMYolGr4jHbS3KnIbQKDfWRPJzngEj86tvKWv/2Q==",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng bắt đầu hành trình học tập?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Hãy để chúng tôi giúp con bạn đạt được những mục tiêu học tập cao nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Đăng ký ngay hôm nay
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
