package com.HireFire.HireFireBackend;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class HashUtil {

    public static String generateHash(String integritySalt, Map<String, String> data) {
        StringBuilder sb = new StringBuilder(integritySalt);

        List<String> keys = new ArrayList<>(data.keySet());
        Collections.sort(keys); // sort keys alphabetically

        for (String key : keys) {
            sb.append("&").append(data.get(key));
        }

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(sb.toString().getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hash).toUpperCase();
        } catch (Exception e) {
            throw new RuntimeException("Error generating secure hash", e);
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}

