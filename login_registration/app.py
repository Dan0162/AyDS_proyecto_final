from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="root",
        password="12345",
        database="users_db"
    )

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Cuerpo de solicitud inválido o no es JSON"}), 400
    username = data.get("username")
    password_hash = data.get("password")  # Ahora recibimos el hash desde el frontend

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cursor.fetchone()

    if user and user["password"] == password_hash:
        return jsonify({
            "message": "Login exitoso",
            "usuario_id": user["id"],
            "nombre": user["nombre"]
        })
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Cuerpo de solicitud inválido o no es JSON"}), 400
    username = data.get("username")
    password_hash = data.get("password")  # Ahora recibimos el hash desde el frontend
    nombre = data.get("nombre")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"message": "El correo ya está registrado."}), 409

    try:
        cursor.execute(
            "INSERT INTO users (username, password, nombre) VALUES (%s, %s, %s)",
            (username, password_hash, nombre)
        )
        db.commit()
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        new_user = cursor.fetchone()
        return jsonify({
            "message": "Registro exitoso",
            "usuario_id": new_user["id"],
            "nombre": nombre
        }), 200
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al registrar: {err}"}), 400

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)