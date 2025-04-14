const AboutPage = () => {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Về Trung tâm DSTK </h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-700 mb-4">
              Trung tâm DSTK  ra đời với sứ mệnh kết nối học sinh với gia sư chất lượng cao, mang đến giải pháp học tập hiệu quả và phù hợp với nhu cầu của từng học sinh.
            </p>
            <p className="text-gray-700">
              Chúng tôi tin rằng mỗi học sinh đều có tiềm năng riêng, và với sự hướng dẫn phù hợp, các em có thể phát triển tối đa khả năng của mình. Trung tâm DSTK  cam kết tạo ra môi trường học tập tích cực, nơi học sinh được khuyến khích khám phá và phát triển đam mê học tập.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Giá trị cốt lõi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Chất lượng</h3>
                <p className="text-gray-600">Chúng tôi luôn đảm bảo chất lượng giảng dạy thông qua quy trình tuyển chọn gia sư nghiêm ngặt.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tính cá nhân hóa</h3>
                <p className="text-gray-600">Mỗi học sinh có nhu cầu riêng, chúng tôi tạo điều kiện để học sinh tìm được gia sư phù hợp nhất.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Minh bạch</h3>
                <p className="text-gray-600">Chúng tôi đề cao sự minh bạch trong mọi hoạt động, từ học phí đến đánh giá gia sư.</p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-gray-700 mb-6">
              Trung tâm DSTK  được thành lập bởi nhóm các chuyên gia giáo dục và công nghệ, với mong muốn tạo ra nền tảng kết nối gia sư hiện đại và hiệu quả tại Việt Nam.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-semibold">Vũ Tiến Đạt</h3>
                <p className="text-gray-600">Đồng sáng lập & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-semibold">Đàm Huy Sơn</h3>
                <p className="text-gray-600">Giám đốc Học thuật</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-semibold">Lê Ngọc Tú</h3>
                <p className="text-gray-600">Giám đốc Công nghệ</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="font-semibold">Phan Tuấn Kiệt</h3>
                <p className="text-gray-600">Tổng Giám Đốc </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-gray-700 mb-6">
              Nếu bạn có bất kỳ câu hỏi nào về dịch vụ của chúng tôi, đừng ngần ngại liên hệ. Đội ngũ Trung tâm DSTK  luôn sẵn sàng hỗ trợ bạn.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Thông tin liên hệ</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+84 123 456 789</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contact@Trung tâm DSTK .com</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Giờ làm việc</h3>
                  <ul className="space-y-2">
                    <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
                    <li>Thứ Bảy: 8:00 - 12:00</li>
                    <li>Chủ Nhật: Nghỉ</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
  
  export default AboutPage