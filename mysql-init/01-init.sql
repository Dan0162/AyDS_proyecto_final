-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS users_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE users_db;

-- Establecer el conjunto de caracteres
SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  nombre VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usuario de prueba
INSERT IGNORE INTO users (username, password, nombre)
VALUES ('admin@mastercook.com', '12345678', 'Admin MasterCook');

-- Tabla de talleres
CREATE TABLE IF NOT EXISTS talleres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(100),
  fecha DATE,
  precio DECIMAL(10,2),
  cupo INT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Talleres de prueba
INSERT IGNORE INTO talleres (nombre, categoria, fecha, precio, cupo) VALUES
('Repostería Creativa', 'Repostería', '2025-06-10', 150.00, 10),
('Sushi Profesional', 'Cocina Internacional', '2025-06-15', 200.00, 8),
('Pastas Artesanales', 'Cocina Italiana', '2025-06-20', 180.00, 12);

-- Tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  taller_id INT,
  estado VARCHAR(50) DEFAULT 'Pendiente',
  pagado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES users(id),
  FOREIGN KEY (taller_id) REFERENCES talleres(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
