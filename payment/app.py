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

# ------------------ SALUD DEL SERVIDOR ------------------
@app.route('/', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

# ------------------ INICIO DEL SERVIDOR ------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)