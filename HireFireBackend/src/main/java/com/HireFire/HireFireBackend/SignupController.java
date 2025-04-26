package com.HireFire.HireFireBackend;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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
            String createTableSQL = "CREATE TABLE IF NOT EXISTS users (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                    "name TEXT NOT NULL," +
                    "email TEXT UNIQUE NOT NULL," +
                    "password TEXT NOT NULL," +
                    "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

            try (PreparedStatement stmt = conn.prepareStatement(createTableSQL)) {
                stmt.execute();
            }
        } catch (SQLException e) {
            System.err.println("Error initializing database: " + e.getMessage());
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
        // Check for required fields
        if (signupRequest.getName() == null || signupRequest.getEmail() == null ||
                signupRequest.getPassword() == null || signupRequest.getName().isEmpty() ||
                signupRequest.getEmail().isEmpty() || signupRequest.getPassword().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Please provide all required fields"));
        }

        // Hash the password before storing it
        String hashedPassword;
        try {
            hashedPassword = hashPassword(signupRequest.getPassword());
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error processing password"));
        }

        // Store user in database
        try (Connection conn = getConnection()) {
            String insertSQL = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            try (PreparedStatement pstmt = conn.prepareStatement(insertSQL)) {
                pstmt.setString(1, signupRequest.getName());
                pstmt.setString(2, signupRequest.getEmail());
                pstmt.setString(3, hashedPassword);

                int rowsAffected = pstmt.executeUpdate();

                if (rowsAffected > 0) {
                    return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
                } else {
                    return ResponseEntity
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ApiResponse(false, "Failed to register user"));
                }
            }
        } catch (SQLException e) {
            // Check for email uniqueness constraint violation
            if (e.getMessage().contains("UNIQUE constraint failed: users.email")) {
                return ResponseEntity
                        .badRequest()
                        .body(new ApiResponse(false, "Email already registered"));
            }

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Database error: " + e.getMessage()));
        }
    }

    // Login endpoint to handle user authentication
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@RequestBody SignupRequest loginRequest) {
        // Check required fields
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null ||
                loginRequest.getEmail().isEmpty() || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Please provide email and password"));
        }

        // Hash the provided password to compare with stored hash
        String hashedPassword;
        try {
            hashedPassword = hashPassword(loginRequest.getPassword());
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error processing password"));
        }

        // Check credentials against database
        try (Connection conn = getConnection()) {
            String query = "SELECT * FROM users WHERE email = ? AND password = ?";

            try (PreparedStatement pstmt = conn.prepareStatement(query)) {
                pstmt.setString(1, loginRequest.getEmail());
                pstmt.setString(2, hashedPassword);

                try (var resultSet = pstmt.executeQuery()) {
                    if (resultSet.next()) {
                        // User found, login successful
                        return ResponseEntity.ok(new ApiResponse(true, "Login successful"));
                    } else {
                        // No user found with matching credentials
                        return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(new ApiResponse(false, "Invalid email or password"));
                    }
                }
            }
        } catch (SQLException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Database error: " + e.getMessage()));
        }
    }

    // Helper method to hash passwords
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
        return String.format("%064x", new java.math.BigInteger(1, hash));
    }
}