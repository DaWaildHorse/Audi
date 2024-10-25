from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import model as ld

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/api/predict", methods=['POST'])
def predict_route():
    full_df = pd.read_excel("../data/absentism.xlsx")
    df = ld.data_transform(full_df)  # Convert input data to DataFrame

    y_train = df.loc[df['Fecha'] <= '2024-05-01', 'Total']
    y_test = df.loc[df['Fecha'] >= '2024-05-01', 'Total']

    pred = ld.predict(y_train, horizon=14)
    # Return the prediction as a JSON response
    return jsonify({"prediction": pred.tolist()})

@app.route("/api/predict_by_department", methods=['POST'])
def predict_by_department_route():
    data = request.get_json()  # Obtener el JSON de la solicitud
    variable1 = data.get("variable1")  # Extraer variable1
    variable2 = data.get("variable2")  # Extraer variable2

    full_df = pd.read_excel("../data/absentism.xlsx")
    df = ld.data_transform(full_df, variable1, variable2)  # Usar las variables seleccionadas

    y_train = df.loc[df['Fecha'] <= '2024-05-01', 'Total']
    y_test = df.loc[df['Fecha'] >= '2024-05-01', 'Total']

    pred = ld.predict(y_train, horizon=14)
    return jsonify({"prediction": pred.tolist()})
if __name__ == "__main__":
    app.run(debug=True, port=8080)
