from flask import Flask, request, jsonify # Importamos Flask para la aplicación web, request para leer datos entrantes y jsonify para responder en Json
import mysql.connector # Importamos el conector de MySQL para python
from flask_cors import CORS # Importamos CORS para peticiones de otros orígenes.
import os # Para poder conectarnos con el .env
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__) # Crea la aplicación Flask

CORS(app) # Habilita CORS pra toda la app, permitiendo que el frontend consuma este backend

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Correo y contraseña requeridos"}), 400

    try:
        conn = mysql.connector.connect(
            host="db",
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PW"),
            database=os.getenv("DB_NAME")
        )
        cursor = conn.cursor(dictionary=True)

        # Buscar usuario por correo
        query = "SELECT * FROM users WHERE email_address=%s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        # Validar si el usuario existe y si la contraseña es correcta
        if user and check_password_hash(user["password_hash"], password):
            return jsonify({"message": "Login exitoso", "user": user}), 200
        else:
            return jsonify({"message": "Credenciales inválidas"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500


    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")

    # Validaciones básicas
    if not all([username, first_name, last_name, email, phone, password]):
        return jsonify({"message": "Todos los campos son obligatorios"}), 400

    # Validar longitud mínima de la contraseña
    if len(password) < 8:
        return jsonify({"message": "La contraseña debe tener al menos 8 caracteres"}), 400


    try:
        conn = mysql.connector.connect(
            host="db",
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PW"),
            database=os.getenv("DB_NAME")
        )
        cursor = conn.cursor()

        # Verificar usuario o email duplicados
        query_check = "SELECT * FROM users WHERE user_name = %s OR email_address = %s"
        cursor.execute(query_check, (username, email))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({"message": "Usuario o correo ya registrado"}), 409
        
        # Hash de la contraseña
        hashed_password = generate_password_hash(password)

        # Insertar nuevo usuario
        query_insert = """
        INSERT INTO users (user_name, first_name, last_name, email_address, phone_number, password_hash)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query_insert, (username, first_name, last_name, email, phone, hashed_password))
        conn.commit()

        cursor.close()
        conn.close()
        return jsonify({"message": "Registro exitoso"}), 201

    except mysql.connector.Error as err:
        return jsonify({"message": f"Error en la base de datos: {err}"}), 500

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)