// vite.config.js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite' // Hoặc 'tailwindcss' tùy cách bạn cài đặt
import path from 'path'; // Bạn đã import path đúng rồi

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: { // <--- THÊM KHỐI NÀY
      // Khi frontend gọi đến đường dẫn bắt đầu bằng '/api'
      // (ví dụ: /api/admin/customer-requests)
      // Vite sẽ chuyển tiếp yêu cầu này đến 'target' bên dưới.
      '/api': {
        target: 'http://localhost:8080', // <<< ĐỊA CHỈ BACKEND SPRING BOOT CỦA BẠN
                                         // Nếu backend chạy ở cổng khác, hãy sửa lại ở đây.
        changeOrigin: true, // Cần thiết cho virtual hosted sites, giúp server backend nhận đúng origin
        secure: false,      // Tắt kiểm tra SSL nếu backend là http (thường dùng trong dev)
        
        // Tùy chọn: rewrite path (nếu cần)
        // Ví dụ: nếu frontend gọi '/api/users' nhưng backend chỉ có '/users'
        // thì bạn cần: rewrite: (path) => path.replace(/^\/api/, '')
        // Trong trường hợp của bạn, nếu backend đã có '/api/admin/customer-requests'
        // thì không cần rewrite.
      }
    }
  }
})