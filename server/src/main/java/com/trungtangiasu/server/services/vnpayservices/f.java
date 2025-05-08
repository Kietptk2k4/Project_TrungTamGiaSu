// import java.io.IOException;
// import java.nio.charset.StandardCharsets;
// import java.text.SimpleDateFormat;
// import java.util.ArrayList;
// import java.util.Calendar;
// import java.util.Enumeration;
// import java.util.HashMap;
// import java.util.TimeZone;

// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// public class f {
//     protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//         String vnp_Version = "2.1.0";
//         String vnp_Command = "pay";
//         String vnp_OrderInfo = req.getParameter("vnp_OrderInfo");
//         String orderType = req.getParameter("ordertype");
//         String vnp_TxnRef = Config.getRandomNumber(8);
//         String vnp_IpAddr = Config.getIpAddress(req);
//         String vnp_TmnCode = Config.vnp_TmnCode;

//         int amount = Integer.parseInt(req.getParameter("amount")) * 100;
//         Map vnp_Params = new HashMap<>();
//         vnp_Params.put("vnp_Version", vnp_Version);
//         vnp_Params.put("vnp_Command", vnp_Command);
//         vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
//         vnp_Params.put("vnp_Amount", String.valueOf(amount));
//         vnp_Params.put("vnp_CurrCode", "VND");
//         String bank_code = req.getParameter("bankcode");
//         if (bank_code != null && !bank_code.isEmpty()) {
//             vnp_Params.put("vnp_BankCode", bank_code);
//         }
//         vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
//         vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
//         vnp_Params.put("vnp_OrderType", orderType);

//         String locate = req.getParameter("language");
//         if (locate != null && !locate.isEmpty()) {
//             vnp_Params.put("vnp_Locale", locate);
//         } else {
//             vnp_Params.put("vnp_Locale", "vn");
//         }
//         vnp_Params.put("vnp_ReturnUrl", Config.vnp_Returnurl);
//         vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//         Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

//         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//         String vnp_CreateDate = formatter.format(cld.getTime());

//         vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//         cld.add(Calendar.MINUTE, 15);
//         String vnp_ExpireDate = formatter.format(cld.getTime());
//         //Add Params of 2.1.0 Version
//         vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//         //Billing
//         vnp_Params.put("vnp_Bill_Mobile", req.getParameter("txt_billing_mobile"));
//         vnp_Params.put("vnp_Bill_Email", req.getParameter("txt_billing_email"));
//         String fullName = (req.getParameter("txt_billing_fullname")).trim();
//         if (fullName != null && !fullName.isEmpty()) {
//             int idx = fullName.indexOf(' ');
//             String firstName = fullName.substring(0, idx);
//             String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
//             vnp_Params.put("vnp_Bill_FirstName", firstName);
//             vnp_Params.put("vnp_Bill_LastName", lastName);

//         }
//         vnp_Params.put("vnp_Bill_Address", req.getParameter("txt_inv_addr1"));
//         vnp_Params.put("vnp_Bill_City", req.getParameter("txt_bill_city"));
//         vnp_Params.put("vnp_Bill_Country", req.getParameter("txt_bill_country"));
//         if (req.getParameter("txt_bill_state") != null && !req.getParameter("txt_bill_state").isEmpty()) {
//             vnp_Params.put("vnp_Bill_State", req.getParameter("txt_bill_state"));
//         }
//         // Invoice
//         vnp_Params.put("vnp_Inv_Phone", req.getParameter("txt_inv_mobile"));
//         vnp_Params.put("vnp_Inv_Email", req.getParameter("txt_inv_email"));
//         vnp_Params.put("vnp_Inv_Customer", req.getParameter("txt_inv_customer"));
//         vnp_Params.put("vnp_Inv_Address", req.getParameter("txt_inv_addr1"));
//         vnp_Params.put("vnp_Inv_Company", req.getParameter("txt_inv_company"));
//         vnp_Params.put("vnp_Inv_Taxcode", req.getParameter("txt_inv_taxcode"));
//         vnp_Params.put("vnp_Inv_Type", req.getParameter("cbo_inv_type"));
//         //Build data to hash and querystring
//         List fieldNames = new ArrayList(vnp_Params.keySet());
//         Collections.sort(fieldNames);
//         StringBuilder hashData = new StringBuilder();
//         StringBuilder query = new StringBuilder();
//         Iterator itr = fieldNames.iterator();
//         while (itr.hasNext()) {
//             String fieldName = (String) itr.next();
//             String fieldValue = (String) vnp_Params.get(fieldName);
//             if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                 //Build hash data
//                 hashData.append(fieldName);
//                 hashData.append('=');
//                 hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                 //Build query
//                 query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
//                 query.append('=');
//                 query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
//                 if (itr.hasNext()) {
//                     query.append('&');
//                     hashData.append('&');
//                 }
//             }
//         }
//         String queryUrl = query.toString();
//         String vnp_SecureHash = Config.hmacSHA512(Config.vnp_HashSecret, hashData.toString());
//         queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
//         String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;
//         com.google.gson.JsonObject job = new JsonObject();
//         job.addProperty("code", "00");
//         job.addProperty("message", "success");
//         job.addProperty("data", paymentUrl);
//         Gson gson = new Gson();
//         resp.getWriter().write(gson.toJson(job));
//     }
//     //vui lòng tham khảo thêm tại code demo
//      <%
//         try
//         {
                        
//         /*  IPN URL: Record payment results from VNPAY
//         Implementation steps:
//         Check checksum
//         Find transactions (vnp_TxnRef) in the database (checkOrderId)
//         Check the payment status of transactions before updating (checkOrderStatus)
//         Check the amount (vnp_Amount) of transactions before updating (checkAmount)
//         Update results to Database
//         Return recorded results to VNPAY
//         */
                
//             // ex:  	PaymnentStatus = 0; pending 
//             //              PaymnentStatus = 1; success 
//             //              PaymnentStatus = 2; Faile 
            
//             //Begin process return from VNPAY	
//             Map fields = new HashMap();
//              for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
//                 String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
//                 String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
//                 if ((fieldValue != null) && (fieldValue.length() > 0)) {
//                     fields.put(fieldName, fieldValue);
//                 }
//             }
    
//             String vnp_SecureHash = request.getParameter("vnp_SecureHash");
//             if (fields.containsKey("vnp_SecureHashType")) 
//             {
//                 fields.remove("vnp_SecureHashType");
//             }
//             if (fields.containsKey("vnp_SecureHash")) 
//             {
//                 fields.remove("vnp_SecureHash");
//             }
            
//             // Check checksum
//             String signValue = Config.hashAllFields(fields);
//             if (signValue.equals(vnp_SecureHash)) 
//             {
    
//                 boolean checkOrderId = true; // vnp_TxnRef exists in your database
//                 boolean checkAmount = true; // vnp_Amount is valid (Check vnp_Amount VNPAY returns compared to the 
//                 amount of the code (vnp_TxnRef) in the Your database).
//                 boolean checkOrderStatus = true; // PaymnentStatus = 0 (pending)
                
                
//                 if(checkOrderId)
//                 {
//                     if(checkAmount)
//                     {
//                         if (checkOrderStatus)
//                         {
//                             if ("00".equals(request.getParameter("vnp_ResponseCode")))
//                             {
                                
//                                 //Here Code update PaymnentStatus = 1 into your Database
//                             }
//                             else
//                             {
                                
//                                 // Here Code update PaymnentStatus = 2 into your Database
//                             }
//                             out.print ("{\"RspCode\":\"00\",\"Message\":\"Confirm Success\"}");
//                         }
//                         else
//                         {
                            
//                             out.print("{\"RspCode\":\"02\",\"Message\":\"Order already confirmed\"}");
//                         }
//                     }
//                     else
//                     {
//                        out.print("{\"RspCode\":\"04\",\"Message\":\"Invalid Amount\"}"); 
//                     }
//                 }
//                 else
//                 {
//                     out.print("{\"RspCode\":\"01\",\"Message\":\"Order not Found\"}");
//                 }
//             } 
//             else 
//             {
//                 out.print("{\"RspCode\":\"97\",\"Message\":\"Invalid Checksum\"}");
//             }
//         }
//         catch(Exception e)
//         {
//             out.print("{\"RspCode\":\"99\",\"Message\":\"Unknow error\"}");
//         }
//     %>
//     <%
//     //Begin process return from VNPAY
//     Map fields = new HashMap();
//     for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
//     String fieldName = (String) params.nextElement();
//     String fieldValue = request.getParameter(fieldName);
//     if ((fieldValue != null) && (fieldValue.length() > 0)) {
//         fields.put(fieldName, fieldValue);
//     }
//     }
    
//     String vnp_SecureHash = request.getParameter("vnp_SecureHash");
//     if (fields.containsKey("vnp_SecureHashType")) {
//     fields.remove("vnp_SecureHashType");
//     }
//     if (fields.containsKey("vnp_SecureHash")) {
//     fields.remove("vnp_SecureHash");
//     }
//     String signValue = Config.hashAllFields(fields);
    
//     %>
//     <%
//     if (signValue.equals(vnp_SecureHash)) {
//         if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
//             out.print("GD Thanh cong");
//         } else {
//             out.print("GD Khong thanh cong");
//         }
    
//     } else {
//         out.print("Chu ky khong hop le");
//     }
//     %>
    
// }
