package com.trungtangiasu.server.jdbc.model;
import lombok.*;
import java.sql.*;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RefundResponse {
    public static RefundResponse fromResultSet(ResultSet res)throws SQLException{
        return RefundResponse.builder()
                    .cancellationResponseId(res.getInt("cancellation_response_id"))
                    .refundDeposit(res.getInt("refund_deposit"))
                    .refundTuition(res.getInt("refund_tuition"))
                    .idPaymentTutor((Integer)res.getObject("id_payment_tutor"))
                    .idPaymentCustomer((Integer)res.getObject("id_payment_customer"))
                    .build();
    }

    private int cancellationResponseId;

    @Builder.Default
    private int refundDeposit = 0;

    @Builder.Default
    private int refundTuition = 0;

    @Builder.Default
    private Integer idPaymentTutor = null;

    @Builder.Default
    private Integer idPaymentCustomer = null;
}

