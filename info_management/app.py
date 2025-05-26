from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="root",
        password="12345",
        database="users_db"
    )

@app.route('/talleres', methods=['GET'])
def get_talleres():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM talleres")
    talleres = cursor.fetchall()
    return jsonify(talleres)

@app.route('/talleres/<int:id>', methods=['GET'])
def get_taller(id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM talleres WHERE id=%s", (id,))
    taller = cursor.fetchone()
    return jsonify(taller)

@app.route('/reservar', methods=['POST'])
def reservar():
    data = request.get_json()
    usuario_id = data.get("usuario_id")
    taller_id = data.get("taller_id")

    db = get_db_connection()
    cursor = db.cursor()

    # 1. Check if the user already has a reservation for this workshop
    cursor.execute(
        "SELECT id FROM reservas WHERE usuario_id=%s AND taller_id=%s",
        (usuario_id, taller_id)
    )
    existing = cursor.fetchone()
    if existing:
        return jsonify({"message": "Ya tienes una reserva para este taller."}), 409

    # 2. Check if there is available capacity
    cursor.execute("SELECT cupo FROM talleres WHERE id = %s", (taller_id,))
    taller = cursor.fetchone()
    if not taller or taller[0] <= 0:
        return jsonify({"message": "Este taller ya no tiene cupo disponible."}), 400

    # 3. Proceed to reserve
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
        return jsonify({"message": "Reserva realizada con éxito. Redireccionando a la pasarela de pago."})
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error al reservar: {err}"}), 400

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

@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)