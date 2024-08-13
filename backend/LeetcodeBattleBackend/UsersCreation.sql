-- Create the database in MySQL
CREATE DATABASE leetcode_battle;



-- Create a table for users with additional statistics fields
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    average_battle_time FLOAT DEFAULT 0.0, -- Average duration of battles in minutes
    average_test_cases_passed FLOAT DEFAULT 0.0, -- Average number of test cases passed per battle
    total_battles INT DEFAULT 0 -- Total number of battles fought, necessary to calculate averages dynamically
);
