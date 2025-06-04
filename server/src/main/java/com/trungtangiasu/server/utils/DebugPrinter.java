package com.trungtangiasu.server.utils;

/**
 * Utility class for printing debug messages to the console with different formats and colors.
 * <p>
 * All methods are static and can be called without creating an instance of this class.
 * <p>
 * <b>Recommended usage:</b>
 * <pre>
 * {@code import static com.trungtangiasu.server.utils.DebugPrinter.*;}
 * </pre>
 * This allows calling static methods directly without the class name prefix.
 * <p>
 * <b>Example:</b>
 * <pre>{@code
 * import static com.trungtangiasu.server.utils.DebugPrinter.*;
 * printSeparator();
 * printTitle("Debug title");
 * print(
 *      "Some Messages/Notifications",
 *      "Hello world, everything ok"
 * );
 * printWarning("Warning Messages");
 * printError("Error Message");
 * printSeparator();
 * }</pre>
 * <p>
 * <b>Output:</b>
 * <pre>{@code
 * ----------------------------------------
 * [Debug title]
 *      Some Messages/Notifications
 *      Hello world, everything ok
 *      Warning Messages
 *      Error Message
 * ----------------------------------------
 * }</pre>
 * <p>
 * <b>Note about the {@code active} flag:</b>
 * <br>
 * This flag controls whether debug messages are printed or not.
 * When {@code active} is {@code false}, no debug messages will be printed.
 * You can enable or disable debug output at runtime via {@link #setActiveDebug(boolean)}.
 *
 * @author tule
 */
public class DebugPrinter {
    private static boolean active = true;


    public static void setActiveDebug(boolean b){
        active = b;
    }


    public static void printTitle(Object value){
        if (!active) return;
        ConsolePrinter.println(String.format("[%s]", value.toString()), ConsolePrinter.BLUE);
    }


    public static void print(Object... value){
        if (!active) return;
        String text = "";
        for (Object o : value){
            text += o.toString() + "\n";
        }
        for (String line : text.split("\n"))
            ConsolePrinter.println(String.format("\t%s", line));
    }


    public static void printWarning(Object... value){
        if (!active) return;
        String text = "";
        for (Object o : value){
            text += o.toString() + "\n";
        }
        for (String line : text.split("\n"))
            ConsolePrinter.println(String.format("\t%s", line), ConsolePrinter.YELLOW);
    }


    public static void printError(Object... value){
        if (!active) return;
        String text = "";
        for (Object o : value){
            text += o.toString() + "\n";
        }
        for (String line : text.split("\n"))
            ConsolePrinter.println(String.format("\t%s", line), ConsolePrinter.RED);
    }


    public static void printSeparator(){
        if (!active) return;
        ConsolePrinter.println("----------------------------------------");
    }
}
