package com.trungtangiasu.server.utils;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class OS {
    public static Path pwd(){
        return Paths.get(System.getProperty("user.dir"));
    }

    public static Path getResourcesPath() {
        try{
            return Path.of(OS.class.getClassLoader().getResource(".").toURI());
        }catch (Exception e){
            throw new RuntimeException("Can not load Resources path");
        }
    }

    public static Path path(String... args){
        return Paths.get(args[0], Arrays.copyOfRange(args, 1, args.length));
    }

    public static String name(){
        return  System.getProperty("os.name");
    }
}
