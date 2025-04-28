package com.HireFire.HireFireBackend;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static javax.swing.UIManager.getString;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from React Native frontend
public class Login {

    private static final String DB_URL = "jdbc:sqlite:D:/UNIVERSITY DATA/Semester 4/Assignments/SDA/Project/Code/Database/HireFire";

    // Create a method to establish database connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL);
    }

    // User login DTO (Data Transfer Object)
    public static class LoginRequest {
        private String name; // Changed from username to name
        private String password;

        // Getters and setters
        public String getName() { return name; } // Changed from getUsername to getName
        public void setName(String name) { this.name = name; } // Changed from setUsername to setName

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // Response DTO
    public static class ApiResponse {
        private boolean success;
        private String message;
        private String name; // Changed from username to name

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public ApiResponse(boolean success, String message, String name) { // Changed parameter from username to name
            this.success = success;
            this.message = message;
            this.name = name; // Changed from username to name
        }

        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getName() { return name; } // Changed from getUsername to getName
        public void setName(String name) { this.name = name; } // Changed from setUsername to setName
    }

    // Login endpoint to handle user authentication
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Validate input
            if (loginRequest.getName() == null || loginRequest.getName().trim().isEmpty() || // Changed getUsername to getName
                    loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(false, "Name and password are required")); // Changed "Username" to "Name"
            }

            // Hash the provided password for comparison
            String hashedPassword = hashPassword(loginRequest.getPassword());

            // Check if user exists and password matches
            try (Connection conn = getConnection();
                 PreparedStatement stmt = conn.prepareStatement(
                         "SELECT * FROM users WHERE name = ? AND password = ?")) {

                stmt.setString(1, loginRequest.getName()); // Changed getUsername to getName
                stmt.setString(2, hashedPassword);

                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        // User found and password matches
                        return ResponseEntity
                                .ok(new ApiResponse(true, "Login successful", loginRequest.getName())); // Changed getUsername to getName
                    } else {
                        // User not found or password doesn't match
                        return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(new ApiResponse(false, "Invalid name or password")); // Changed "username" to "name"
                    }
                }
            }
        } catch (SQLException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Database error: " + e.getMessage()));
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Hashing error: " + e.getMessage()));
        }
    }

    // Utility method to hash passwords (using SHA-256)
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashedBytes = md.digest(password.getBytes());

        StringBuilder hexString = new StringBuilder();
        for (byte b : hashedBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }

    // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<ApiResponse> testEndpoint() {
        return ResponseEntity.ok(new ApiResponse(true, "API is working"));
    }
}
