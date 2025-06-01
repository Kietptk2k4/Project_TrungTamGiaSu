package com.trungtangiasu.server.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import static com.trungtangiasu.server.utils.DebugPrinter.*;

/**
 * @author TuLe
 */
public class EmailSender {
    private static String email;
    private static String password;

    static{
        try{
            var prop = PropertyLoader.loadProperties();
            String email = prop.getProperty("EmailSender.email");
            String password  = prop.getProperty("EmailSender.password");

            printSeparator();
            printTitle("Load EmailSender config from application.properties");
            print(
                String.format("Email: '%s'", email),
                String.format("Password: '%s'", password)
            );

            if (email == null || password == null)
                throw new IllegalArgumentException("Email or password cannot be null");

            EmailSender.configSenderEmail(email, password);
        }catch(Exception e){
            printError("Can not config EmailSender");
            printError("Exception message: " + e.getMessage());

            printWarning("To use EmailSender, please have EmailSender.email and EmailSender.password in resource/application.properties");
        }
        printSeparator();
    }
    
    public static void configSenderEmail(String email, String password){
        EmailSender.email = email;
        EmailSender.password = password;
    }

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