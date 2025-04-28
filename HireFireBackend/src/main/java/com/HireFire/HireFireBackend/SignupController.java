package com.HireFire.HireFireBackend;

import jakarta.annotation.PostConstruct;
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
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow requests from React Native frontend
public class SignupController {

    private static final String DB_URL = "jdbc:sqlite:D:/UNIVERSITY DATA/Semester 4/Assignments/SDA/Project/Code/Database/HireFire";

    // Create a method to establish database connection
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL);
    }

    // Method to initialize the database (create tables if they don't exist)
    @PostConstruct
    public void initializeDatabase() {
        try (Connection conn = getConnection()) {
            String createUserTableSQL =
                    "CREATE TABLE IF NOT EXISTS users (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "name TEXT NOT NULL," +
                            "email TEXT NOT NULL UNIQUE," +
                            "password TEXT NOT NULL)";

            try (PreparedStatement pstmt = conn.prepareStatement(createUserTableSQL)) {
                pstmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // User registration DTO (Data Transfer Object)
    public static class SignupRequest {
        private String name;
        private String email;
        private String password;
        private String currentPassword;

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getCurrentPassword() { return currentPassword; }
        public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
    }

    // Response DTO
    public static class ApiResponse {
        private boolean success;
        private String message;

        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    // Signup endpoint to handle user registration
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            // Validate input
            if (signupRequest.getName() == null || signupRequest.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Name is required"));
            }

            if (signupRequest.getEmail() == null || signupRequest.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Email is required"));
            }

            if (signupRequest.getPassword() == null || signupRequest.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "Password is required"));
            }

            // Check if user already exists
            try (Connection conn = getConnection()) {
                String checkUserSQL = "SELECT COUNT(*) FROM users WHERE email = ?";
                try (PreparedStatement pstmt = conn.prepareStatement(checkUserSQL)) {
                    pstmt.setString(1, signupRequest.getEmail());
                    ResultSet rs = pstmt.executeQuery();
                    if (rs.next() && rs.getInt(1) > 0) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ApiResponse(false, "User with this email already exists"));
                    }
                }

                // Hash the password
                String hashedPassword = hashPassword(signupRequest.getPassword());

                // Insert the new user
                String insertUserSQL = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
                try (PreparedStatement pstmt = conn.prepareStatement(insertUserSQL)) {
                    pstmt.setString(1, signupRequest.getName());
                    pstmt.setString(2, signupRequest.getEmail());
                    pstmt.setString(3, hashedPassword);

                    int affectedRows = pstmt.executeUpdate();
                    if (affectedRows > 0) {
                        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ApiResponse(false, "Failed to register user"));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Database error: " + e.getMessage()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error hashing password"));
        }
    }

    // Helper method to hash passwords
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedHash = digest.digest(
                password.getBytes(StandardCharsets.UTF_8));

        StringBuilder hexString = new StringBuilder();
        for (byte b : encodedHash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }
}