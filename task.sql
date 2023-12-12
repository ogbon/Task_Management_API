DROP DATABASE IF EXISTS task_management;
CREATE DATABASE task_management;
USE task_management;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS `tasks` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255)NOT NULL,
    `description` VARCHAR(255)NOT NULL,
    `due_date` DATE NOT NULL,
    `status` VARCHAR(255)NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users (id)
   
);


INSERT INTO `users` (`username`,`password`) 
VALUES ("Loreta","password");

INSERT INTO `tasks` (title,description,due_date,status,user_id)
VALUES ("Read", "Reading my books" ,"2023-12-13","pending",1),  
("Picnic", "Relaxation with friends" ,"2023-12-14","pending",1), 
("Concert", "Musical Concert" ,"2023-12-15","pending",1);

