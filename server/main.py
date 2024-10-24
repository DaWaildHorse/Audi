from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/api/users", methods=['GET'])
def users():
    # Generate a NumPy array (for example, random values)
    data = np.random.rand(10).tolist()  # Convert to list to send as JSON
    return jsonify({
        "users": ["andre"],
        "data": data
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)
