package com.trungtangiasu.server.utils;

import java.io.*;
import java.nio.charset.StandardCharsets;

/**
 * Utility class for loading and rendering HTML templates with placeholders.
 *
 * <p><b>Template Syntax:</b><br>
 * Placeholders in the template file should be in the format {@code ${key}}.<br>
 * These placeholders will be replaced with values provided via {@code put()} calls.
 * </p>
 *
 * <p><b>Methods:</b></p>
 * <ul>
 *     <li>{@code load(String path)} – Loads the HTML template from the given path within {@code resources}.</li>
 *     <li>{@code put(String key, String value)} – Sets the value for a placeholder key.</li>
 *     <li>{@code render()} – Applies all key-value substitutions and returns the resulting HTML as a string.</li>
 * </ul>
 *
 *
 * <p><b>Usage Example:</b></p>
 *
 * File resources/templates/template.html: <br>
 * <pre>{@code
 *      <html>
 *          <head>
 *              <meta charset="UTF-8" />
 *              <meta name="viewport" content="width=device-width, initial-scale=1" />
 *          </head>
 *          <body>
 *              <p>${message}</p>
 *          </body>
 *      </html>
 * }</pre><br>
 *
 * Code: <br>
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
 *
 * @author tule
 * @see EmailSender
 *
 */
public class HtmlTemplate {
    private static final String defaultDirectory = "templates";
    private String data;

    public static HtmlTemplate load(String filePath) throws IOException {
        var truePath = OS.getResourcesPath().resolve(defaultDirectory).resolve(filePath);
        try( InputStream inputStream = new FileInputStream(truePath.toString()))
        {
            HtmlTemplate template = new HtmlTemplate();
            template.data =  new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            return template;
        }
    }

    public HtmlTemplate put(String key, String value){
        String placeholder = "${" + key + "}";
        if (!this.data.contains(placeholder)) {

            DebugPrinter.printWarning(
                    "HtmlTemplate warning:",
                    String.format("\tNot found placeholder: '${%s}'", key),
                    String.format("\tProvided value       : '%s'", value),
                    "\tThis key-value pair will be ignored."
            );
            return this;
        }
        this.data = this.data.replace(placeholder, value);
        return this;
    }

    public String render(){
        // remove unassign key template
        this.data = data.replaceAll("\\$\\{(.+?)\\}", "");
        return data;
    }
}

