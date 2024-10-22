import { useState } from 'react'

function Landing() {
  const [puesto, setPuesto] = useState('')
  const [turno, setTurno] = useState('')
  const [prediccion, setPrediccion] = useState('7 días')

  const handlePuestoChange = (event) => {
    setPuesto(event.target.value)
  }

  const handleTurnoChange = (event) => {
    setTurno(event.target.value)
  }

  const handlePrediccionChange = (event) => {
    setPrediccion(event.target.value)
  }

  const handleSend = () => {
    console.log("Enviando datos:", { puesto, turno, prediccion })
  }

  return (
    <>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
        </ul>
      </nav>

      <div className="container">
        <h1>Predicción de Ausentismo</h1>

        <div className="form-section">
          <label>
            Código de Puesto:
            <select value={puesto} onChange={handlePuestoChange}>
              <option value="">Selecciona un puesto</option>
              <option value="1">Puesto 1</option>
              <option value="2">Puesto 2</option>
              <option value="3">Puesto 3</option>
              <option value="4">Puesto 4</option>
              <option value="5">Puesto 5</option>
            </select>
          </label>

          <label>
            Turno:
            <select value={turno} onChange={handleTurnoChange}>
              <option value="">Selecciona un turno</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
              <option value="rotativo">Rotativo</option>
            </select>
          </label>

          <label>
            Tiempo de Predicción:
            <select value={prediccion} onChange={handlePrediccionChange}>
              <option value="7 días">7 días</option>
              <option value="14 días">14 días</option>
            </select>
          </label>

          <button onClick={handleSend}>OK</button>
        </div>

        <div className="import-section">
          <button onClick={() => console.log("Importar archivos")}>Importar archivos</button>
        </div>

        <div className="results">
          <h2>Gráficas de resultados</h2>
          {/* Aquí se mostrarán las gráficas */}
        </div>

        <div className="summary">
          <button onClick={() => console.log("Mostrar tablas de resumen")}>Ver más</button>
          {/* Aquí se mostrarán las tablas que resumen las gráficas */}
        </div>
      </div>
    </>
  )
}

export default Landing;