CREATE DATABASE IF NOT EXISTS master_cook_db;
USE master_cook_db;

CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL, 
	email_address VARCHAR(100) NOT NULL UNIQUE,
	phone_number VARCHAR(15) NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE IF NOT EXISTS instructor (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,
    instructor_user_name VARCHAR(50) NOT NULL UNIQUE,
    instructor_first_name VARCHAR(50) NOT NULL,
    instructor_last_name VARCHAR(50) NOT NULL, 
    instructor_email_address VARCHAR(100) NOT NULL UNIQUE,
    instructor_phone_number VARCHAR(15) NOT NULL,
    instructor_password_hash VARCHAR(255) NOT NULL,
    instructor_created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    instructor_description TEXT NULL
);

CREATE TABLE IF NOT EXISTS booking_status (
	booking_status_id INT PRIMARY KEY AUTO_INCREMENT,
	booking_status_name VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO booking_status (booking_status_name) VALUES
('Confirmada'),
('Cancelada'),
('Completada');

CREATE TABLE IF NOT EXISTS category (
	category_id INT PRIMARY KEY AUTO_INCREMENT,
	category_name VARCHAR(50) NOT NULL UNIQUE
);
 
CREATE TABLE IF NOT EXISTS workshop (
	workshop_id INT PRIMARY KEY AUTO_INCREMENT,
	workshop_name VARCHAR(50) NOT NULL,
	workshop_description TEXT NULL,
	quota INT NOT NULL check (quota >= 0),
	workshop_start_date DATE NOT NULL,
	workshop_end_date DATE NOT NULL,
	price DECIMAL(7,2) NOT NULL,
	status ENUM('Disponible', 'No disponible') DEFAULT 'Disponible',
	instructor_id INT NULL,
	FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS workshop_category (
	workshop_id INT NOT NULL,
	category_id INT NOT NULL,
	FOREIGN KEY (workshop_id) REFERENCES workshop(workshop_id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,
	CONSTRAINT pk_workshop_category PRIMARY KEY (workshop_id, category_id)
);

CREATE TABLE IF NOT EXISTS booking (
	booking_id INT PRIMARY KEY AUTO_INCREMENT,
	user_id INT NOT NULL ,
	workshop_id INT NOT NULL, 
	booking_status_id INT NOT NULL,
	booking_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (workshop_id) REFERENCES workshop(workshop_id) ON DELETE CASCADE,
	FOREIGN KEY (booking_status_id) REFERENCES booking_status(booking_status_id) ON DELETE RESTRICT,
	CONSTRAINT unique_user_workshop UNIQUE (user_id, workshop_id)
);

CREATE TABLE IF NOT EXISTS payment (
	payment_id INT PRIMARY KEY AUTO_INCREMENT,
	booking_id INT NOT NULL,
	amount DECIMAL(7,2) NOT NULL, 
	payment_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
	payment_status ENUM('Pendiente', 'Pagado') DEFAULT 'Pendiente',
	authorization_code VARCHAR(100) NULL,
	FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

SELECT 'Inicialización completada' AS status;

SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';
