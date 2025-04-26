package com.HireFire.HireFireBackend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLiteConnectionExample {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:D:/UNIVERSITY DATA/Semester 4/Assignments/SDA/Project/Code/Database/HireFire";

        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                System.out.println("Connection to SQLite has been established!");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
