package com.trungtangiasu.server.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import static com.trungtangiasu.server.utils.DebugPrinter.*;

/**
 * <p><b>Usage Example:</b></p>
 * <pre>{@code
 * // Load an HTML template from resources/templates/template.html
 * EmailSender.sendEmailHtmlFormat(
 *     "receiver@gmail.com",
 *     "Email Title",
 *     HtmlTemplate.load("template.html")
 *         .put("message", "Hello, this email is for testing.")
 *         .render()
 * );
 * }</pre><br>
 * @author TuLe
 * @see HtmlTemplate
 */
public class EmailSender {
    private static String email;
    private static String password;

    static{
        try{
            var prop = PropertyLoader.loadProperties();
            String email = prop.getProperty("EmailSender.email");
            String password  = prop.getProperty("EmailSender.password");

            // print debug
            printSeparator();
            printTitle("Load EmailSender config from application.properties");
            print(
                String.format("Email: '%s'", email),
                String.format("Password: '%s'", password)
            );

            // check email and password
            // if email and password is wrong, method Transport.connect() will throw exception
            Session session = createSession(email, password);
            session.getTransport("smtp").connect();

            // if not throw exception, config email & password
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


    /**
     * Send email with emailContent as plaintext
     */
    public static void sendEmail(String receiverEmail, String emailTitle, String emailContent)
            throws MessagingException
    {
        send(receiverEmail, emailTitle, emailContent, false);
    }


    /**
     * Send email with emailContent as html format
     */
    public static void sendEmailHtmlFormat(String receiverEmail, String emailTitle, String emailContent)
            throws MessagingException
    {
        send(receiverEmail, emailTitle, emailContent, true);
    }


    /**
     * use default email and password to create session
     */
    private static Session createSession(String email, String password){
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        return Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });
    }

    /**
     * Send email with plaintext or html
     * @param isHtml if {@code true}: use html format for emailContent
     */
    private static void send(String receiverEmail, String emailTitle, String emailContent, boolean isHtml)
            throws MessagingException
    {
        Session session = createSession(email, password);
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(email));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(receiverEmail));
        message.setSubject(emailTitle);
        if (isHtml)
            message.setContent(emailContent, "text/html; charset=UTF-8");
        else
            message.setText(emailContent);
        Transport.send(message);
    }

}