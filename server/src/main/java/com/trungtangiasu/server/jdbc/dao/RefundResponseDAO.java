package com.trungtangiasu.server.jdbc.dao;
import java.sql.*;
import java.util.*;

import com.trungtangiasu.server.jdbc.MySql;
import com.trungtangiasu.server.jdbc.model.*;
public class RefundResponseDAO {
    public static void main(String []args)throws SQLException{
        RefundResponse rr = RefundResponse.builder()
                    .cancellationResponseId(4)
                    .build();

        RefundResponseDAO.insert(rr);
        System.out.println(rr);
        System.out.println(RefundResponseDAO.selectAll());
        System.out.println(RefundResponseDAO.select(4));


        System.err.println("after change");
        rr.setRefundDeposit(10000);
        rr.setIdPaymentTutor(1);
        RefundResponseDAO.update(rr);
        System.out.println(rr);
        System.out.println(RefundResponseDAO.selectAll());
        System.out.println(RefundResponseDAO.select(4));
    }

    public static List<RefundResponse> selectAll()throws SQLException{
        String sql = "SELECT * FROM RefundResponses";
        List<RefundResponse> list = new ArrayList<>();
        try(
            Connection con = MySql.createConnection();
            Statement stm = con.createStatement();
            ResultSet res = stm.executeQuery(sql)       
        ){
            while(res.next())
                list.add(RefundResponse.fromResultSet(res));
        }

        return list;
    }

    public static RefundResponse select(int cancellationResponseId) throws SQLException{
        String sql = "SELECT * FROM RefundResponses WHERE cancellation_response_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ){
            stm.setInt(1, cancellationResponseId);
            try (ResultSet res = stm.executeQuery()){
                if (res.next())
                    return RefundResponse.fromResultSet(res);
            }
        }
        return null;
    }

    public static void insert(RefundResponse rr) throws SQLException{
        String sql = "INSERT INTO RefundResponses "
                + " (cancellation_response_id, refund_deposit, refund_tuition, id_payment_tutor, id_payment_customer)"
                + "VALUES(?, ?, ?, ?, ?)";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ){
            stm.setInt(1, rr.getCancellationResponseId());
            stm.setInt(2, rr.getRefundDeposit());
            stm.setInt(3, rr.getRefundTuition());
            stm.setObject(4, rr.getIdPaymentTutor());
            stm.setObject(5, rr.getIdPaymentCustomer());

            stm.executeUpdate();
        }
    }

    public static boolean update(RefundResponse rr)throws SQLException{
        String sql = "UPDATE RefundResponses "
                + "SET refund_deposit = ?, "
                + " refund_tuition = ?, "
                + " id_payment_tutor = ?, "
                + " id_payment_customer = ? "
                + "WHERE cancellation_response_id = ?";
        try(
            Connection con = MySql.createConnection();
            PreparedStatement stm = con.prepareStatement(sql)
        ){
            
            stm.setInt(1, rr.getRefundDeposit());
            stm.setInt(2, rr.getRefundTuition());
            stm.setObject(3, rr.getIdPaymentTutor());
            stm.setObject(4, rr.getIdPaymentCustomer());
            stm.setInt(5, rr.getCancellationResponseId());

            int affected = stm.executeUpdate();
            return affected > 0;
        }
    }


}
