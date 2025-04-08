package com.trungtangiasu.server.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * @author TuLe
 */
public class EmailSender {
    private static String email = "email@gmail.com";
    private static String password = "password";

    /**
     * Cau hinh 1 lan, dung mai mai.
     * @author Tule
     * @param email     email duoc dung phai bat xac thuc 2 lop(nen dung email@gmail.com)
     * @param password  Mat khau ung dung(App password), khong phai mat khau dang nhap google
     */
    public static void configSenderEmail(String email, String password){
        EmailSender.email = email;
        EmailSender.password = password;
    }

    /**
     * Gui email den nguoi nhan
     * 
     * @see #configSenderEmail(String email, String password)
     * @param receiverEmail   Email nguoi nhan
     * @param emailTitle      Tieu de email
     * @param emailContent    Noi dung email
     * @throws MessagingException Neu gui email that bai
     */
    public static void sendEmail(String receiverEmail, String emailTitle, String emailContent)
                    throws MessagingException
    {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(email));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiverEmail));
            message.setSubject(emailTitle);
            message.setText(emailContent);
            Transport.send(message);
        } catch (MessagingException e) {
            throw e;
        }
    }
}