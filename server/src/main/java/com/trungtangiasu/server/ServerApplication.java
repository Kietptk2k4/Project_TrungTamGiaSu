package com.trungtangiasu.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.trungtangiasu.server.utils.*;
@SpringBootApplication
public class ServerApplication {
	public static void main(String[] args) throws Exception{
		SpringApplication.run(ServerApplication.class, args);
		printIntro();
	}

	public static void printIntro(){
		String intro = """
        __        __   _                            _
        \\ \\      / /__| | ___ ___  _ __ ___   ___  | |_ ___
         \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\ | __/ _ \\
          \\ V  V /  __/ | (_| (_) | | | | | |  __/ | || (_) |
           \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/

         ____  ____ _____ _  __   ____           _
        |  _ \\/ ___|_   _| |/ /  / ___|___ _ __ | |_ ___ _ __
        | | | \\___ \\ | | | ' /  | |   / _ \\ '_ \\| __/ _ \\ '__|
        | |_| |___) || | | . \\  | |__|  __/ | | | ||  __/ |
        |____/|____/ |_| |_|\\_\\  \\____\\___|_| |_|\\__\\___|_|
                -> Your Trusted Tutoring Platform
                -> Learn Better - Grow Smarter - Achieve More
        """;
		ConsolePrinter.println(
				intro,
				new ConsolePrinter.Gradient(
						new ConsolePrinter.Color(41, 128, 185),
						new ConsolePrinter.Color(109, 213, 250)
				),
				ConsolePrinter.DEFAULT_COLOR,
				ConsolePrinter.BOLD
		);
	}
}