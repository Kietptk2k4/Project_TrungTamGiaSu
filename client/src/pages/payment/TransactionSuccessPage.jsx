import { CheckCircle, Download, Home, ArrowLeft, Printer, Share2 } from "lucide-react"
import { useNavigate } from 'react-router-dom'
const TransactionSuccessPage = ({
  transactionData = {
    id: "TRX-12345678",
    date: new Date().toLocaleString(),
    amount: "1,500,000 VND",
    paymentMethod: "Thẻ tín dụng",
    recipient: "Công ty TNHH ABC",
    description: "Thanh toán hóa đơn dịch vụ tháng 5",
  },
}) => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 px-6 py-8 text-center">
            <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">Giao dịch thành công!</h1>
            <p className="text-green-100 mt-2">Giao dịch của bạn đã được xử lý thành công</p>
          </div>

          {/* Transaction Details */}
          <div className="px-6 py-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Chi tiết giao dịch</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium text-gray-900">{transactionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày giao dịch:</span>
                  <span className="font-medium text-gray-900">{transactionData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-medium text-gray-900">{transactionData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức thanh toán:</span>
                  <span className="font-medium text-gray-900">{transactionData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Người nhận:</span>
                  <span className="font-medium text-gray-900">{transactionData.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mô tả:</span>
                  <span className="font-medium text-gray-900">{transactionData.description}</span>
                </div>
              </div>
            </div>

           

            {/* Next Steps */}
            <div className="py-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Bước tiếp theo</h2>
              <p className="text-gray-600 mb-4">
                Một email xác nhận đã được gửi đến địa chỉ email của bạn với chi tiết giao dịch. Bạn có thể theo dõi
                trạng thái giao dịch trong phần "Lịch sử giao dịch" của tài khoản.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={() => navigate('/')}
                >
                  Về trang chủ
                </button>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                   onClick={() => navigate('/tutor/available-courses')} >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default TransactionSuccessPage
