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

    private static final String DB_URL = "jdbc:sqlite:HireFire.db";

    // Create a method to establish database connection
    private Connection getConnection() throws SQLException {
        Connection conn = DriverManager.getConnection(DB_URL);
        return conn;
    }

    // Method to initialize the database (create tables if they don't exist)
    @PostConstruct
    public void initializeDatabase() {
        try (Connection conn = getConnection()) {
            // Create users table
            String createUserTableSQL =
                    "CREATE TABLE IF NOT EXISTS users (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "name TEXT NOT NULL," +
                            "email TEXT NOT NULL UNIQUE," +
                            "password TEXT NOT NULL," +
                            "is_worker BOOLEAN NOT NULL DEFAULT 0" +
                            ")";

            // Create workers table
            String createWorkerTableSQL =
                    "CREATE TABLE IF NOT EXISTS workers (" +
                            "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                            "name TEXT NOT NULL," +
                            "email TEXT NOT NULL UNIQUE," +
                            "password TEXT NOT NULL," +
                            "skills TEXT," +
                            "experience TEXT," +
                            "hourly_rate REAL" +
                            ")";

            try (PreparedStatement userStmt = conn.prepareStatement(createUserTableSQL);
                 PreparedStatement workerStmt = conn.prepareStatement(createWorkerTableSQL)) {

                userStmt.executeUpdate();
                workerStmt.executeUpdate();

                System.out.println("Database tables created successfully");
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
        private boolean isWorker; // New field to identify worker signup

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getCurrentPassword() { return currentPassword; }
        public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }

        public boolean isWorker() { return isWorker; }
        public void setWorker(boolean isWorker) { this.isWorker = isWorker; }
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

    // User signup endpoint - only registers users
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            // Check if the email already exists in either table
            try (Connection conn = getConnection()) {
                // Check in users table
                String checkUserEmailSql = "SELECT COUNT(*) FROM users WHERE email = ?";
                try (PreparedStatement stmt = conn.prepareStatement(checkUserEmailSql)) {
                    stmt.setString(1, signupRequest.getEmail());
                    ResultSet rs = stmt.executeQuery();
                    if (rs.next() && rs.getInt(1) > 0) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ApiResponse(false, "Email already registered as a user"));
                    }
                }

                // Check in workers table
                String checkWorkerEmailSql = "SELECT COUNT(*) FROM workers WHERE email = ?";
                try (PreparedStatement stmt = conn.prepareStatement(checkWorkerEmailSql)) {
                    stmt.setString(1, signupRequest.getEmail());
                    ResultSet rs = stmt.executeQuery();
                    if (rs.next() && rs.getInt(1) > 0) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ApiResponse(false, "Email already registered as a worker"));
                    }
                }

                // Hash the password
                String hashedPassword = hashPassword(signupRequest.getPassword());

                // Insert into users table (always - this is the user signup endpoint)
                String insertUserSql = "INSERT INTO users (name, email, password, is_worker) VALUES (?, ?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(insertUserSql)) {
                    stmt.setString(1, signupRequest.getName());
                    stmt.setString(2, signupRequest.getEmail());
                    stmt.setString(3, hashedPassword);
                    stmt.setBoolean(4, false); // Regular user
                    stmt.executeUpdate();
                }
                return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
            }
        } catch (SQLException | NoSuchAlgorithmException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Registration failed: " + e.getMessage()));
        }
    }

    // Worker-specific signup endpoint
    @PostMapping("/worker/signup")
    public ResponseEntity<ApiResponse> registerWorker(@RequestBody SignupRequest signupRequest) {
        try {
            // Check if the email already exists in either table
            try (Connection conn = getConnection()) {
                // Check in users table
                String checkUserEmailSql = "SELECT COUNT(*) FROM users WHERE email = ?";
                try (PreparedStatement stmt = conn.prepareStatement(checkUserEmailSql)) {
                    stmt.setString(1, signupRequest.getEmail());
                    ResultSet rs = stmt.executeQuery();
                    if (rs.next() && rs.getInt(1) > 0) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ApiResponse(false, "Email already registered as a user"));
                    }
                }

                // Check in workers table
                String checkWorkerEmailSql = "SELECT COUNT(*) FROM workers WHERE email = ?";
                try (PreparedStatement stmt = conn.prepareStatement(checkWorkerEmailSql)) {
                    stmt.setString(1, signupRequest.getEmail());
                    ResultSet rs = stmt.executeQuery();
                    if (rs.next() && rs.getInt(1) > 0) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ApiResponse(false, "Email already registered as a worker"));
                    }
                }

                // Hash the password
                String hashedPassword = hashPassword(signupRequest.getPassword());

                // Insert into workers table (always - this is the worker signup endpoint)
                String insertWorkerSql = "INSERT INTO workers (name, email, password) VALUES (?, ?, ?)";
                try (PreparedStatement stmt = conn.prepareStatement(insertWorkerSql)) {
                    stmt.setString(1, signupRequest.getName());
                    stmt.setString(2, signupRequest.getEmail());
                    stmt.setString(3, hashedPassword);
                    stmt.executeUpdate();
                }
                return ResponseEntity.ok(new ApiResponse(true, "Worker registered successfully"));
            }
        } catch (SQLException | NoSuchAlgorithmException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Worker registration failed: " + e.getMessage()));
        }
    }

    // Helper method to hash passwords
    private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));

        StringBuilder hexString = new StringBuilder();
        for (byte b : encodedHash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }

        return hexString.toString();
    }

}