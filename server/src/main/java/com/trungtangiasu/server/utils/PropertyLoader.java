package com.trungtangiasu.server.utils;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyLoader {
    private static final String defaultPropertyFileName = "application.properties";

    /**
     * Load from default file "resources/application.properties"
     */
    public static Properties loadProperties() throws IOException{
        return loadProperties(defaultPropertyFileName);
    }

    /**
     * Load from directory "resources/"
     */
    public static Properties loadProperties(String fileName) throws IOException {
        Properties props = new Properties();
        var path = OS.getResourcesPath().resolve(fileName);
        try (InputStream input = new FileInputStream(path.toString())) {
            props.load(input);
        }
        return props;
    }
}
