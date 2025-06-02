package com.trungtangiasu.server.utils;
import java.util.*;

/**
 * Utility class for printing colored and styled text to the console using ANSI escape codes.
 * It supports 16 standard console colors, 24-bit true colors using RGB values, gradient color(RBG) 
 * and text styles like bold, italic, underline, etc.<br><br>
 *
 *
 * <b>Usage examples:</b><br>
 * <pre>
 * {@code
 * // Print with a standard color(BLUE foreground and WHITE background) and style BOLD & ITALIC
 * ConsolePrinter.print(
 *      "Hello, World!",
 *      ConsolePrinter.BLUE,
 *      ConsolePrinter.WHITE,
 *      ConsolePrinter.BOLD | ConsolePrinter.ITALIC
 * );
 *
 * // Print with a 24-bit true color
 * ConsolePrinter.Color customColor = new ConsolePrinter.Color(0, 128, 128);
 * ConsolePrinter.println("Custom color text", customColor);
 *
 * // Print with a gradient foreground(red -> blue)
 * ConsolePrinter.Gradient gradient = new ConsolePrinter.Gradient(
 *      new ConsolePrinter.Color(255, 0, 0),
 *      new ConsolePrinter.Color(0, 0, 255)
 * );
 * ConsolePrinter.print(
 *      "Gradient Text Example",
 *      gradient,
 *      ConsolePrinter.DEFAULT_COLOR,
 *      ConsolePrinter.BOLD
 * );
 *
 * // Clear the console screen
 * ConsolePrinter.clearScreen();
 * }
 * </pre>
 *
 * @author TuLe
 */
public class ConsolePrinter {
    public static final int
        // Color constants
        DEFAULT_COLOR = 16,
        BLACK   = 0,    BLACK_BRIGHT   = 8,
        RED     = 1,    RED_BRIGHT     = 9,
        GREEN   = 2,    GREEN_BRIGHT   = 10,
        YELLOW  = 3,    YELLOW_BRIGHT  = 11,
        BLUE    = 4,    BLUE_BRIGHT    = 12,
        MAGENTA = 5,    MAGENTA_BRIGHT = 13,
        CYAN    = 6,    CYAN_BRIGHT    = 14,
        WHITE   = 7,    WHITE_BRIGHT   = 15,

        // Style constants
        DEFAULT_STYLE   = 0b00000000,
        BOLD            = 0b00000001,
        DIM             = 0b00000010, // Not widely supported
        ITALIC          = 0b00000100, // Not widely supported
        UNDERLINE       = 0b00001000,
        BLINK           = 0b00010000,
        INVERT          = 0b00100000, // Swap foreground and background
        HIDDEN          = 0b01000000, // Not widely supported
        STRIKE          = 0b10000000;

    /**
     * Clear screen and move cursor to (1, 1) (top-left corner)
     */
    public static void clearScreen(){
        System.out.print(Ansi.ansClearScreenCode(true));
    }

    /**
     * Clear line and move cursor to (current row, 1) (the first column of current row)
     */
    public static void clearLine(){
        System.out.print(Ansi.ansiClearLineCode());
    }

    /**
     * Prints a data to the console with specified foreground, background, and text style.
     * The output does not terminate with a new line.
     *
     * @param data Data that will be printed to the terminal.
     * @param fg Foreground color, instance of {@code Integer} (for standard colors 0-15),
     * {@link Color} (for 24-bit RGB), or {@link Gradient}.
     * @param bg Background color, instance of {@code Integer} (for standard colors 0-15) or
     * {@link Color} (for 24-bit RGB), or {@link Gradient}.
     * @param style Text style attributes, such as {@link #BOLD}, {@link #ITALIC}, {@link #UNDERLINE}, etc.
     * Multiple styles can be combined using bitwise OR (e.g., {@code BOLD | UNDERLINE}).
     */
    public static void print(Object data, Object fg, Object bg, int style){
        render(data, fg, bg, style, -1, false);
    }

    /**
     * Prints a data
     * @param data data that will be printed to terminal
     * @param fg foreground color, instance of {@code Integer} or {@code Color} op {@code Gradient}
     * @param bg background color, instance of {@code Integer} or {@code Color}
     */
    public static void print(Object data, Object fg, Object bg){
        render(data, fg, bg, DEFAULT_STYLE, -1, false);
    }


    /**
     * Prints a data with default background
     * @param data data that will be printed to terminal
     * @param fg foreground color, instance of {@code Integer} or {@code Color} op {@code Gradient}
     */
    public static void print(Object data, Object fg){
        render(data, fg, DEFAULT_COLOR, DEFAULT_STYLE, -1, false);
    }

    /**
     * It's recommended to use System.out.print() instead
     */
    public static void print(Object data){
        render(data, DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_STYLE, -1, false);
    }

    /**
     * Prints a data and then terminates the line
     * @param data data that will be printed to terminal
     * @param fg foreground color, instance of {@code Integer} or {@code Color} or {@code Gradient}
     * @param bg background color, instance of {@code Integer} or {@code Color} or {@code Gradient}
     * @param style Text style attributes, such as {@code BOLD}, {@code ITALIC}, {@code UNDERLINE}, etc.
     *              Multiple styles can be combined using bitwise OR (e.g., {@code BOLD | UNDERLINE}).
     */
    public static void println(Object data, Object fg, Object bg, int style){
        render(data, fg, bg, style, -1, true);
    }

    /**
     * Prints a data and then terminates the line
     * @param data Data that will be printed to the terminal.
     * @param fg Foreground color, instance of {@code Integer} (for standard colors 0-15),
     * {@link Color} (for 24-bit RGB), or {@link Gradient}.
     * @param bg Background color, instance of {@code Integer} (for standard colors 0-15) or
     * {@link Color} (for 24-bit RGB), or {@link Gradient}.
     */
    public static void println(Object data, Object fg, Object bg){
        render(data, fg, bg, DEFAULT_STYLE, -1, true);
    }


    /**
     * Prints a data and then terminates the line with default background
     * @param data data that will be printed to terminal
     * @param fg foreground color, instance of {@code Integer} or {@code Color} op {@code Gradient}
     */
    public static void println(Object data, Object fg){
        render(data, fg, DEFAULT_COLOR, DEFAULT_STYLE, -1, true);
    }


    /**
     * It's recommended to use System.out.println() instead
     */
    public static void println(Object data){
        render(data, DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_STYLE, -1, true);
    }

    public static class Color{
        private final int r;
        private final int g;
        private final int b;

        public Color(int r, int g, int b){
            this.r = r;
            this.g = g;
            this.b = b;
        }

        public int getR(){return r;}
        public int getG(){return g;}
        public int getB(){return b;}

        public String foreground(){
            return String.format("38;2;%d;%d;%d", r, g, b);
        }

        public String background(){
            return String.format("48;2;%d;%d;%d", r, g, b);
        }
    }

    public static class Gradient{
        private final Color color1;
        private final Color color2;


        public Gradient(Color color1, Color color2){
            this.color1 = color1;
            this.color2 = color2;
        }

        public Color color(int id, int gradientCycle){
            if (gradientCycle <= 1)
                gradientCycle = 2;
            double ratio = (double)(id%gradientCycle)/(gradientCycle-1);
            double r = color1.getR() + ((color2.getR() - color1.getR())*ratio);
            double g = color1.getG() + ((color2.getG() - color1.getG())*ratio);
            double b = color1.getB() + ((color2.getB() - color1.getB())*ratio);
            return new Color((int)r, (int)g, (int)b);
        }
    }


    private static String convertColor(Object color, boolean isForeground){
        if (color instanceof Integer){
            if (isForeground)
                return String.valueOf(Ansi.convertForeground((Integer)color));
            else    
                return String.valueOf(Ansi.convertBackground((Integer)color));
        }
        else if (color instanceof Color){
            if (isForeground)
                return ((Color)color).foreground();
            else
                return ((Color)color).background();
        }
        throw new IllegalArgumentException("Wrong type of color");
    }


    private static void render(Object data, Object fg, Object bg, int style, int gradientCycle, boolean lineBreak){
        // check color datatype
        boolean checkFg = (fg instanceof Integer)||(fg instanceof Color)||(fg instanceof Gradient);
        boolean checkBg = (bg instanceof Integer)||(bg instanceof Color)||(bg instanceof Gradient);
        if (!(checkFg && checkBg))
            throw new IllegalArgumentException("Wrong type of color");

        // if color is gradient, use special function
        if ((fg instanceof Gradient) || (bg instanceof Gradient)){
            renderGradient(data, fg, bg, style, gradientCycle, lineBreak);
            return;
        }

        // text attributes
        ArrayList<String> params = new ArrayList<>();
        params.add(convertColor(fg, true));
        params.add(convertColor(bg, false));
        for (Integer i : Ansi.convertStyle(style))
            params.add(String.valueOf(i));
        String ansiCode = Ansi.PREFIX + String.join(";", params) + Ansi.CMD_TEXT_ATTR;

        // render
        if (lineBreak){
            System.out.println(ansiCode + String.valueOf(data) + Ansi.ansiResetCode());
        }
        else{
            System.out.print(ansiCode + String.valueOf(data) + Ansi.ansiResetCode());
        }
    }


    private static void renderGradient(Object data, Object fg, Object bg, int style, int gradientCycle, boolean lineBreak){  
        // text styles (BOLD, ITALIC, ...)
        ArrayList<String> styles = new ArrayList<>();
        for (Integer i : Ansi.convertStyle(style))
            styles.add(String.valueOf(i));
        String style_code = Ansi.PREFIX + String.join(";", styles) + Ansi.CMD_TEXT_ATTR;
        System.out.print(style_code);

        
        String []lines = String.valueOf(data).split("\n");
        if (gradientCycle <= 1){
            gradientCycle = 2;
            for (String line : lines)
                if (line.length() > gradientCycle)
                    gradientCycle = line.length();
        }
        for (int i = 0; i < lines.length; i ++){
            String line = lines[i];

            // print each character
            for (int j = 0; j < line.length(); j++){
                ArrayList<String> color_attr = new ArrayList<>();
                color_attr.add(
                    (fg instanceof Gradient)
                        ?( ((Gradient)fg).color(j, gradientCycle).foreground() )
                        :(convertColor(fg, true))
                );
                color_attr.add(
                    (bg instanceof Gradient)
                        ? ( ((Gradient)bg).color(j, gradientCycle).background())
                        : (convertColor(bg, false))
                );
                System.out.print(Ansi.PREFIX + String.join(";", color_attr) + Ansi.CMD_TEXT_ATTR + line.charAt(j));
            }

            if (i != lines.length-1)
                System.out.println();
           
        }

        if (lineBreak)
            System.out.println(Ansi.ansiResetCode());
        else    
            System.out.print(Ansi.ansiResetCode());
    }


    private static class Ansi{
        public static final int
            DEFAULT_FG = 39,
            DEFAULT_BG = 49,
            BLACK_FG   = 30,BLACK_BRIGHT_FG   = 90,BLACK_BG   = 40,BLACK_BRIGHT_BG   = 100,
            // RED_FG     = 31,RED_BRIGHT_FG     = 91,RED_BG     = 41,RED_BRIGHT_BG     = 101,
            // GREEN_FG   = 32,GREEN_BRIGHT_FG   = 92,GREEN_BG   = 42,GREEN_BRIGHT_BG   = 102,
            // YELLOW_FG  = 33,YELLOW_BRIGHT_FG  = 93,YELLOW_BG  = 43,YELLOW_BRIGHT_BG  = 103,
            // BLUE_FG    = 34,BLUE_BRIGHT_FG    = 94,BLUE_BG    = 44,BLUE_BRIGHT_BG    = 104,
            // MAGENTA_FG = 35,MAGENTA_BRIGHT_FG = 95,MAGENTA_BG = 45,MAGENTA_BRIGHT_BG = 105,
            // CYAN_FG    = 36,CYAN_BRIGHT_FG    = 96,CYAN_BG    = 46,CYAN_BRIGHT_BG    = 106,
            // WHITE_FG   = 37,WHITE_BRIGHT_FG   = 97,WHITE_BG   = 47,WHITE_BRIGHT_BG   = 107,

            // STYLE_RESET     = 0,  // Reset all text attributes
            STYLE_BOLD      = 1,
            STYLE_DIM       = 2,  // Not widely supported
            STYLE_ITALIC    = 3,  // Not widely supported
            STYLE_UNDERLINE = 4,
            STYLE_BLINK     = 5,
            STYLE_INVERT    = 7,  // Swap foreground and background
            STYLE_HIDDEN    = 8,  // Not widely supported
            STYLE_STRIKE    = 9;

        public static final String
            PREFIX = "\033[",
            CMD_TEXT_ATTR = "m";

        public static int convertForeground(int fg){
            if (!(fg >= ConsolePrinter.BLACK && fg <= ConsolePrinter.WHITE_BRIGHT))
                return Ansi.DEFAULT_FG;

            int base = (fg <= ConsolePrinter.WHITE) ? Ansi.BLACK_FG : Ansi.BLACK_BRIGHT_FG;
            return (fg % 8) + base;
        }

        public static int convertBackground(int bg){
            if (!(bg >= ConsolePrinter.BLACK && bg <= ConsolePrinter.WHITE_BRIGHT))
                return Ansi.DEFAULT_BG; // ansi default bg
        
            int base = (bg <= ConsolePrinter.WHITE) ? Ansi.BLACK_BG : Ansi.BLACK_BRIGHT_BG;
            return (bg % 8) + base;
        }
        
        public static ArrayList<Integer> convertStyle(int style){
            ArrayList<Integer> styles = new ArrayList<>();
            int[][] styles_map = {
                {ConsolePrinter.BOLD, Ansi.STYLE_BOLD},
                {ConsolePrinter.DIM, Ansi.STYLE_DIM},
                {ConsolePrinter.ITALIC, Ansi.STYLE_ITALIC},
                {ConsolePrinter.UNDERLINE, Ansi.STYLE_UNDERLINE},
                {ConsolePrinter.BLINK, Ansi.STYLE_BLINK},
                {ConsolePrinter.INVERT, Ansi.STYLE_INVERT},
                {ConsolePrinter.HIDDEN, Ansi.STYLE_HIDDEN},
                {ConsolePrinter.STRIKE, Ansi.STYLE_STRIKE}
            };

            for (int [] tuple : styles_map){
                if ((style & tuple[0])!=0)
                    styles.add(tuple[1]);
            }
            return styles;
        }

        public static String ansiResetCode(){
            return "\033[0m";
        }

        public static String ansClearScreenCode(boolean deleteBuffer){
            return (deleteBuffer) ?  "\033[2J\033[3J\033[H" :  "\033[2J\033[H";
        }

        public static String ansiClearLineCode(){
            return "\033[2K\033[G";
        }
    }
}