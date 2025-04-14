package com.trungtangiasu.server.utils;

import java.util.*;

public class Iostream {
    public static void main(String[] args) {
        // Ví dụ gọi hàm out
        out("apple", "banana", "cherry", "kiwi", "watermelon");
    }

    public static final Scanner in;
    private static final String hoz;
    private static final String ver;

    static {
        in = new Scanner(System.in);
        hoz = "*";
        ver = "*";
    }

    public static void out(String... messages) {
        int len = longest(messages);
        String horizontal = repeatString(hoz, len + 4);
        System.out.println(horizontal);
        for (String message : messages)
            System.out.println(ver + " " + String.format("%-" + len + "s", message) + " " + ver);
        System.out.println(horizontal+"\n");
    }

    private static String repeatString(String str, int n) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; i++) {
            result.append(str);
        }
        return result.toString();
    }

    private static int longest(String... strings) {
        if (strings == null || strings.length == 0) {
            return 0; // Nếu danh sách rỗng, trả về 0
        }
        int maxLength = strings[0].length();
        for (String str : strings) {
            if (str.length() > maxLength) {
                maxLength = str.length();
            }
        }
        return maxLength;
    }

}
