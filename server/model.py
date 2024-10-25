import numpy as np
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
from tensorflow.keras.losses import MeanSquaredError
from sktime.forecasting.arima import AutoARIMA
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from xgboost import XGBRegressor


def predict_sarima(historicos, horizon=14):
    """
    Genera un DataFrame con las predicciones de LSTM, XGBoost y SARIMA para los próximos 7 días.
    """
    
    forecaster = AutoARIMA(sp=7, suppress_warnings=True)
    forecaster.fit(historicos)
    
    fh = np.arange(horizon)
    y_pred= forecaster.predict_interval(fh=fh, coverage =0.95)
    y_pred_SARIMA = forecaster.predict(fh=fh)
    
    return y_pred_SARIMA, y_pred

def predecir_con_LSTM(data, n_steps=30, n_pred=14, epochs=20):
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data.values.reshape(-1, 1))


    X, y = crear_secuencias(data_scaled, n_steps)
    X = X.reshape((X.shape[0], X.shape[1], 1))

    model = Sequential()
    model.add(LSTM(50, activation='relu', input_shape=(n_steps, 1)))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')

    model.fit(X, y, epochs=epochs, batch_size=32, verbose=0)

    X_input = data_scaled[-n_steps:].reshape(1, n_steps, 1)
    predicciones = []

    for _ in range(n_pred):
        y_pred = model.predict(X_input, verbose=0)
        predicciones.append(y_pred[0, 0])
        y_pred = y_pred.reshape(1, 1, 1)  # Asegurar dimensiones correctas
        X_input = np.append(X_input[:, 1:, :], y_pred, axis=1)

    predicciones = scaler.inverse_transform(np.array(predicciones).reshape(-1, 1))
    return predicciones

def predecir_con_XGBoost(data, n_steps=30, n_pred=14):
    
    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data.values.reshape(-1, 1))


    X, y = crear_secuencias(data_scaled, n_steps)

    X = X.reshape((X.shape[0], X.shape[1]))

    model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=7)
    model.fit(X, y)

    X_input = data_scaled[-n_steps:].reshape(1, -1)  
    predicciones = []

    for _ in range(n_pred):
        y_pred = model.predict(X_input)  
        predicciones.append(y_pred[0])   
        
        y_pred = y_pred.reshape(1, 1)  
        
        # Actualizamos la ventana eliminando el primer valor y agregando la nueva predicción
        X_input = np.append(X_input[:, 1:], y_pred, axis=1)

    # Desescalar las predicciones
    predicciones = scaler.inverse_transform(np.array(predicciones).reshape(-1, 1))
    
    return predicciones


def data_transform(data, clave_orgeh=None, clave_turno=None):
    """
    Transforma el DataFrame de ausencias, filtrando por ORGEH y Turno, 
    contabilizando las ausencias por fecha y clase.

    Parámetros:
    data (DataFrame): DataFrame original con datos de ausencias.
    clave_orgeh (str): Clave para filtrar por ORGEH (opcional).
    clave_turno (str): Clave para filtrar por Turno (opcional).

    Retorna:
    DataFrame: DataFrame con el conteo de ausencias por fecha y clase.
    """
    # Filtrar por ORGEH y Turno si se proporcionan
    if clave_orgeh is not None:
        data = data[data['ORGEH'] == clave_orgeh]
    if clave_turno is not None:
        data = data[data['Turno'] == clave_turno]

    ausencias = []

    # Iterar sobre las filas del DataFrame filtrado
    for _, row in data.iterrows():
        if row['Días naturales'] > 0:
            fechas = pd.date_range(row['Inicio de validez'], row['Fin de validez'])
            ausencias.extend([(fecha, row['Clase absent./pres.']) for fecha in fechas])

    # Crear DataFrame de ausencias
    df_ausencias = pd.DataFrame(ausencias, columns=['Fecha', 'Clase absent./pres.'])

    # Agrupar por fecha y clase de ausencia, contando ocurrencias
    conteo_ausencias = df_ausencias.groupby(['Fecha', 'Clase absent./pres.']).size().unstack(fill_value=0)

    # Rellenar fechas faltantes en el rango completo
    fecha_min = df_ausencias['Fecha'].min()
    fecha_max = df_ausencias['Fecha'].max()
    fechas_completas = pd.date_range(fecha_min, fecha_max)

    # Reindexar para incluir todas las fechas del rango y rellenar con 0 donde falte
    conteo_ausencias = conteo_ausencias.reindex(fechas_completas, fill_value=0)

    # Resetear el índice y ordenar por fecha
    conteo_ausencias = conteo_ausencias.reset_index().rename(columns={'index': 'Fecha'})
    conteo_ausencias = conteo_ausencias.sort_values(by='Fecha').reset_index(drop=True)

    # Eliminar columnas específicas, ignorando errores si no existen
    conteo_ausencias = conteo_ausencias.drop(columns=[
        'Mini Time Account', 'Paro Técnico', 'Huelga', 'Control Prenatal',
        'Permiso razones operativa', 'Retardo x Transporte', 'Suspensión',
        'Vacaciones P', 'Vacaciones'
    ], errors='ignore')

    cols = [col for col in conteo_ausencias.columns if col != 'Fecha']
    conteo_ausencias['Total'] = conteo_ausencias[cols].sum(axis=1)

    
    return conteo_ausencias.reset_index(drop=True)


def crear_secuencias(data, n_steps):
    X, y = [], []
    for i in range(len(data) - n_steps):
        X.append(data[i:i + n_steps])
        y.append(data[i + n_steps])
    return np.array(X), np.array(y)


def predict(data, horizon = 7):
    
    pred_sarima, interval_sarima = predict_sarima(data, horizon=horizon)
    pred_lstm = predecir_con_LSTM(data=data, n_pred=horizon)
    pred_xgb = predecir_con_XGBoost(data=data, n_pred=horizon)
    
    df_pred = pd.DataFrame({
        'SARIMA': pred_sarima,
        'Lower': interval_sarima[('Total', 0.95, 'upper')].astype(int),
        'Upper': interval_sarima[('Total', 0.95, 'lower')].astype(int),
        'LSTM': pred_lstm.flatten(),
        'XGBoost': pred_xgb.flatten()
    })
    
    df_pred['Prediccion'] = (2/3 * df_pred['SARIMA'] +
                          1/6* df_pred['LSTM'] +
                          1/6 * df_pred['XGBoost'])
    
    df_pred = df_pred[['Upper', 'Prediccion', 'Lower']].reset_index(drop=True)
    df_pred = df_pred.round().clip(lower=0).astype(int)

    predict_array = df_pred.to_numpy().T
    
    return predict_array