package com.trungtangiasu.server.utils;

import java.util.Random;

/**
 * @author Tule
 */
public class OtpGenerator {
    private static final String  charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final Random random = new Random();

    /**
     * @author Tule
     * @param size: Kich thuoc chuoi otp
     * @return  <p>String co do dai <code>size</code></p>
     *          <p>Cac ky tu trong chuoi tra ve lay ngau nhien trong <code>OtpGenerator.charSet</code></p>
     */
    public static String randomOtp(int size){
        String otp = "";

        for(int i = 0; i < size; i++){
            int k = random.nextInt(charSet.length());
            otp += charSet.charAt(k);
        }
        return otp;
    }
}