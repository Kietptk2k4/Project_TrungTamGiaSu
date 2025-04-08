package com.trungtangiasu.server;

import com.trungtangiasu.server.utils.EmailSender;
import com.trungtangiasu.server.utils.OtpGenerator;
public class Main {
    public static void main(String[] args) {
        testEmailSender(
            "n22dccn193@student.ptithcm.edu.vn", 
            "TEST OTP CHO QUAN LY TRUNG TAM GIA SU",
            "Xin Chao Tu, \nBan dang yeu cau thay doi mat khau. Ma OTP cua ban la: "
                    + OtpGenerator.randomOtp(6) + "\nMa se het han trong vong 5 phut!"  );
    }

    public static void testEmailSender(String receiver, String title, String content){
        java.io.Console console = System.console();
        java.util.Scanner in = new java.util.Scanner(System.in);

        String sender, password;
        System.out.print("Sender email: ");
        sender =  in.nextLine();

        password= String.valueOf(console.readPassword("Sender email password: "));

        EmailSender.configSenderEmail(sender, password);



        try {
            EmailSender.sendEmail(receiver, title, content);
            System.out.print("Send email OK");
        }catch(javax.mail.MessagingException e){
            System.out.print("Send email Fail");
            e.printStackTrace();
        }
    }
}
