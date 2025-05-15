import { useState, useEffect } from "react";
import TransactionSuccessPage from "../payment/TransactionSuccessPage";
import TransactionFailedPage from "../payment/TransactionFailedPage";
import { Button } from "../../components/ui/button";
import { useLocation } from "react-router-dom";

export default function PaymentResult() {
  const location = useLocation();

  const [vnpResponseCode, setVnpResponseCode] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionDate, setTransactionDate] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const amountParam = queryParams.get("vnp_Amount");
    const dateParam = queryParams.get("vnp_PayDate");
    const idParam = queryParams.get("vnp_TxnRef");

    setAmount(amountParam);
    setTransactionDate(dateParam);
    setTransactionId(idParam);

    if (responseCode) {
      setVnpResponseCode(responseCode);
    }
  }, [location.search]);

  const handleRetry = () => {
    setVnpResponseCode(null);
  };

  function formatTimestamp(timestamp) {
    if (!/^\d{14}$/.test(timestamp)) {
      return "Không xác định";
    }

    const year = parseInt(timestamp.slice(0, 4));
    const month = parseInt(timestamp.slice(4, 6));
    const day = parseInt(timestamp.slice(6, 8));
    const hour = parseInt(timestamp.slice(8, 10));
    const minute = parseInt(timestamp.slice(10, 12));
    const second = parseInt(timestamp.slice(12, 14));

    const dateObj = new Date(year, month - 1, day, hour, minute, second);

    return dateObj.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  if (vnpResponseCode === "00") {
    return <TransactionSuccessPage  transactionData={{
          id: transactionId || "Không xác định",
          date: formatTimestamp(transactionDate),
          amount: amount ? `${Number(amount/100).toLocaleString("en-US")} VND` : "Không xác định",
          paymentMethod: "VNPay",
          recipient: "Trung tâm gia sư DSTK",
          description: "Thanh toán đặt cọc lớp học",
          failureReason: "Người dùng đã hủy giao dịch",
          failureCode: "USER_CANCELLED",
        }}
        onRetry={handleRetry}/>;
  } else if (vnpResponseCode === "24") {
    return (
      <TransactionFailedPage
        transactionData={{
          id: transactionId || "Không xác định",
          date: formatTimestamp(transactionDate),
          amount: amount ? `${Number(amount/100).toLocaleString("en-US")} VND` : "Không xác định",
          paymentMethod: "VNPay",
          recipient: "Trung tâm gia sư DSTK",
          description: "Thanh toán đặt cọc lớp học",
          failureReason: "Người dùng đã hủy giao dịch",
          failureCode: "USER_CANCELLED",
        }}
        onRetry={handleRetry}
      />
    );
  } else if (vnpResponseCode) {
    return (
      <TransactionFailedPage
        transactionData={{
          id: transactionId || "Không xác định",
          date: formatTimestamp(transactionDate),
          amount: amount ? `${Number(amount/100).toLocaleString("en-US")} VND` : "Không xác định",
          paymentMethod: "VNPay",
          recipient: "Trung tâm gia sư DSTK",
          description: "Thanh toán đặt cọc lớp học",
          failureReason: "Giao dịch bị từ chối bởi ngân hàng phát hành",
          failureCode: "PAYMENT_DECLINED",
        }}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Hệ thống thanh toán</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => handleSimulateTransaction("success")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Mô phỏng giao dịch thành công
        </Button>

        <Button
          onClick={() => handleSimulateTransaction("failed")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Mô phỏng giao dịch thất bại
        </Button>

        <Button
          onClick={() => handleSimulateTransaction("cancelled")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
        >
          Mô phỏng người dùng hủy
        </Button>
      </div>
    </div>
  )
}



// 00: thanh công 
//  10 : nhap sai nhieu lan 
// 11 het thoi gian thanh toan 
//  24 do khách hàng hủy giao dịch
