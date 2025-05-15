

import { XCircle, AlertTriangle, RefreshCw, Home, ArrowLeft, HelpCircle } from "lucide-react"

const TransactionFailedPage = ({
  transactionData = {
    id: "TRX-12345678",
    date: new Date().toLocaleString(),
    amount: "1,500,000 VND",
    paymentMethod: "Thẻ tín dụng",
    recipient: "Công ty TNHH ABC",
    description: "Thanh toán hóa đơn dịch vụ tháng 5",
    failureReason: "Người dùng đã hủy giao dịch",
    failureCode: "USER_CANCELLED",
  },
  onRetry = () => {},
}) => {
  // Determine if it's a user cancellation or a system error
  const isUserCancelled = transactionData.failureCode === "USER_CANCELLED"

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className={`${isUserCancelled ? "bg-orange-500" : "bg-red-500"} px-6 py-8 text-center`}>
            <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
              {isUserCancelled ? (
                <AlertTriangle className="h-10 w-10 text-orange-500" />
              ) : (
                <XCircle className="h-10 w-10 text-red-500" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isUserCancelled ? "Giao dịch đã bị hủy" : "Giao dịch thất bại!"}
            </h1>
            <p className={`${isUserCancelled ? "text-orange-100" : "text-red-100"} mt-2`}>
              {isUserCancelled ? "Bạn đã hủy giao dịch này" : "Đã xảy ra lỗi khi xử lý giao dịch của bạn"}
            </p>
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

            {/* Error Details */}
            <div className="py-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Lý do thất bại</h2>
              <div
                className={`${
                  isUserCancelled ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200"
                } border rounded-lg p-4`}
              >
                <div className="flex">
                  {isUserCancelled ? (
                    <AlertTriangle className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className={`text-sm font-medium ${isUserCancelled ? "text-orange-800" : "text-red-800"}`}>
                      {transactionData.failureReason}
                    </h3>
                    <div className={`mt-2 text-sm ${isUserCancelled ? "text-orange-700" : "text-red-700"}`}>
                      <p>
                        {isUserCancelled
                          ? "Bạn đã hủy giao dịch này. Không có khoản tiền nào bị trừ từ tài khoản của bạn."
                          : "Vui lòng kiểm tra thông tin thanh toán của bạn và thử lại. Nếu vấn đề vẫn tiếp diễn, hãy liên hệ với ngân hàng của bạn hoặc bộ phận hỗ trợ của chúng tôi."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="py-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Bước tiếp theo</h2>
              <p className="text-gray-600 mb-4">
                {isUserCancelled
                  ? "Bạn có thể thử lại giao dịch này hoặc quay lại trang chủ để tiếp tục mua sắm."
                  : "Vui lòng thử lại giao dịch hoặc chọn phương thức thanh toán khác. Nếu bạn tiếp tục gặp vấn đề, hãy liên hệ với bộ phận hỗ trợ của chúng tôi."}
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  onClick={onRetry}
                  className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isUserCancelled
                      ? "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Thử lại
                </button>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => navigate('/')} >
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

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Cần hỗ trợ thêm?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Liên hệ bộ phận hỗ trợ
            </a>
          </p>
          <div className="mt-4 flex justify-center">
            <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <HelpCircle className="h-4 w-4 mr-1" />
              Câu hỏi thường gặp về thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionFailedPage
