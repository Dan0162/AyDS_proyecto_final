from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error as MySQLError
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

DB_UNAVAILABLE_ERROR = {
    "error": "DB_UNAVAILABLE",
    "message": "Estamos teniendo problemas en conectar con nuestros servicios. Por favor intenta más tarde."
}

def get_db_connection():
    try:
        return mysql.connector.connect(
            host="db",
            user="root",
            password="12345",
            database="users_db"
        )
    except MySQLError:
        return None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Cuerpo de solicitud inválido o no es JSON"}), 400
    username = data.get("username")
    password = data.get("password")

    db = get_db_connection()
    if db is None:
        return jsonify(DB_UNAVAILABLE_ERROR), 503
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        user = cursor.fetchone()
        if user and check_password_hash(user["password"], password):
            return jsonify({
                "message": "Login exitoso",
                "usuario_id": user["id"],
                "nombre": user["nombre"]
            })
        else:
            return jsonify({"message": "Credenciales incorrectas"}), 401
    except MySQLError:
        return jsonify(DB_UNAVAILABLE_ERROR), 503

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Cuerpo de solicitud inválido o no es JSON"}), 400
    username = data.get("username")
    password = data.get("password")
    nombre = data.get("nombre")

    db = get_db_connection()
    if db is None:
        return jsonify(DB_UNAVAILABLE_ERROR), 503
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"message": "El correo ya está registrado."}), 409

        hashed_password = generate_password_hash(password)
        cursor.execute(
            "INSERT INTO users (username, password, nombre) VALUES (%s, %s, %s)",
            (username, hashed_password, nombre)
        )
        db.commit()
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        new_user = cursor.fetchone()
        return jsonify({
            "message": "Registro exitoso",
            "usuario_id": new_user["id"],
            "nombre": nombre
        }), 200
    except MySQLError:
        return jsonify(DB_UNAVAILABLE_ERROR), 503

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)