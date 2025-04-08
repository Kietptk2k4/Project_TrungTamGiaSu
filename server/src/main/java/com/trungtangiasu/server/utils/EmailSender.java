package com.trungtangiasu.server.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailSender {
    private static String email = "email@gmail.com";
    private static String password = "password";

    public static void configSenderEmail(String email, String password){
        EmailSender.email = email;
        EmailSender.password = password;
    }

    public static void sendEmail(String receiverEmail, String emailTitle, String emailContent)
                    throws MessagingException
    {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); // Thay thế bằng SMTP server của bạn (ví dụ: smtp.gmail.com cho Gmail)
        props.put("mail.smtp.port", "587");           // Thay thế bằng cổng SMTP (thường là 587 cho TLS)
        props.put("mail.smtp.auth", "true");          // Bật xác thực
        props.put("mail.smtp.starttls.enable", "true"); // Bật TLS

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