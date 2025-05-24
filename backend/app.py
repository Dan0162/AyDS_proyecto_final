from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# ------------------ CONEXIÓN A LA BASE DE DATOS ------------------
def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="root",
        password="12345",
        database="users_db"
    )

# ------------------ LOGIN ------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()

    if user:
        return jsonify({
            "message": "Login exitoso",
            "usuario_id": user["id"],
            "nombre": user["nombre"]
        })
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401

# ------------------ REGISTRO ------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
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
            (username, password, nombre)
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

# ------------------ LISTAR TALLERES ------------------
@app.route('/talleres', methods=['GET'])
def get_talleres():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM talleres")
    talleres = cursor.fetchall()
    return jsonify(talleres)

# ------------------ DETALLE DE UN TALLER ------------------
@app.route('/talleres/<int:id>', methods=['GET'])
def get_taller(id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM talleres WHERE id=%s", (id,))
    taller = cursor.fetchone()
    return jsonify(taller)

# ------------------ RESERVAR SIN PAGAR ------------------
@app.route('/reservar', methods=['POST'])
def reservar():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    taller_id = data.get("taller_id")

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM reservas WHERE usuario_id=%s AND taller_id=%s",
        (usuario_id, taller_id)
    )
    existing = cursor.fetchone()

    if existing:
        return jsonify({"message": "Ya reservaste este taller."}), 409

    # Verificar cupo
    cursor.execute("SELECT cupo FROM talleres WHERE id = %s", (taller_id,))
    taller = cursor.fetchone()
    if not taller or taller[0] <= 0:
        return jsonify({"message": "Este taller ya no tiene cupo disponible."}), 400

    try:
        cursor.execute(
            "INSERT INTO reservas (usuario_id, taller_id, estado, pagado) VALUES (%s, %s, %s, %s)",
            (usuario_id, taller_id, "Pendiente", False)
        )
        cursor.execute(
            "UPDATE talleres SET cupo = cupo - 1 WHERE id = %s",
            (taller_id,)
        )
        db.commit()
        return jsonify({"message": "Reserva realizada con éxito"})
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al reservar: {err}"}), 400

# ------------------ PAGAR RESERVA ------------------
@app.route('/pagar', methods=['POST'])
def pagar():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    taller_id = data.get("taller_id")

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM reservas WHERE usuario_id=%s AND taller_id=%s",
        (usuario_id, taller_id)
    )
    reserva = cursor.fetchone()

    if reserva:
        cursor.execute(
            "UPDATE reservas SET pagado=1, estado='Confirmada' WHERE usuario_id=%s AND taller_id=%s",
            (usuario_id, taller_id)
        )
        db.commit()
        return jsonify({"message": "Pago confirmado para el taller reservado"})
    else:
        return jsonify({"message": "No se encontró la reserva para este taller"}), 404

# ------------------ ELIMINAR RESERVA ------------------
@app.route('/eliminar-reserva', methods=['POST'])
def eliminar_reserva():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    taller_id = data.get("taller_id")

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM reservas WHERE usuario_id=%s AND taller_id=%s AND pagado=0",
        (usuario_id, taller_id)
    )
    rows_deleted = cursor.rowcount

    if rows_deleted > 0:
        cursor.execute(
            "UPDATE talleres SET cupo = cupo + 1 WHERE id = %s",
            (taller_id,)
        )

    db.commit()
    return jsonify({"message": "Reserva eliminada con éxito"})

# ------------------ VER MIS RESERVAS ------------------
@app.route('/mis-reservas/<int:usuario_id>', methods=['GET'])
def mis_reservas(usuario_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            r.id,
            r.taller_id,
            t.nombre AS nombre_taller,
            t.fecha,
            r.pagado,
            r.estado
        FROM reservas r
        JOIN talleres t ON r.taller_id = t.id
        WHERE r.usuario_id = %s
        ORDER BY t.fecha DESC
    """, (usuario_id,))
    reservas = cursor.fetchall()
    return jsonify(reservas)

# ------------------ INICIO DEL SERVIDOR ------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
