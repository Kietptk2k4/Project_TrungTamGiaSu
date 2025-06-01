package com.trungtangiasu.server.utils;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyLoader {
    private static final String defaultPropertyFileName = "application.properties";

    /**
     * Load from default file "resource/application.properties"
     */
    public static Properties loadProperties() throws IOException{
        return loadProperties(defaultPropertyFileName);
    }

    public static Properties loadProperties(String fileName) throws IOException {
        Properties props = new Properties();
        try (InputStream input = PropertyLoader.class.getClassLoader().getResourceAsStream(fileName)) {
            if (input == null) {
                throw new IOException("File not found " + fileName);
            }
            props.load(input);
        }
        return props;
    }
}
