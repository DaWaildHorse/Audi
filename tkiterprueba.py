import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from tkinter import filedialog

import matplotlib
matplotlib.use('TkAgg')
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

# Función para importar archivos
def importar_archivo():
    filename = filedialog.askopenfilename()
    if filename:
        messagebox.showinfo("Importar Archivo", f"Archivo importado: {filename}")

# Función para buscar y eliminar usuario
def buscar_usuario():
    usuario = entry_buscar.get()
    if usuario:
        # Aquí iría la lógica para buscar y eliminar el usuario de la base de datos
        messagebox.showinfo("Eliminar Usuario", f"Usuario {usuario} eliminado de la base de datos.")
    else:
        messagebox.showwarning("Buscar Usuario", "Por favor, ingrese un nombre de usuario.")

# Crear ventana principal
root = tk.Tk()
root.title("Aplicación de Predicción de Ausentismo")
root.geometry("800x600")

# Crear barra de navegación
frame_nav = tk.Frame(root, bg='lightgray', height=50)
frame_nav.pack(side=tk.TOP, fill=tk.X)

btn_inicio = tk.Button(frame_nav, text="Inicio")
btn_inicio.pack(side=tk.LEFT, padx=10, pady=10)

# Campo de búsqueda y botón eliminar
entry_buscar = tk.Entry(frame_nav)
entry_buscar.pack(side=tk.LEFT, padx=5)

btn_eliminar = tk.Button(frame_nav, text="Eliminar Usuario", command=buscar_usuario)
btn_eliminar.pack(side=tk.LEFT, padx=5)

# Frame principal
frame_main = tk.Frame(root)
frame_main.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

# Dropdown para Código de Puesto
label_puesto = tk.Label(frame_main, text="Código de Puesto:")
label_puesto.grid(row=0, column=0, sticky='e')

opciones_puesto = ["Puesto 1", "Puesto 2", "Puesto 3", "Puesto 4", "Puesto 5"]
combo_puesto = ttk.Combobox(frame_main, values=opciones_puesto, state="readonly")
combo_puesto.current(0)
combo_puesto.grid(row=0, column=1, padx=5, pady=5)

# Dropdown para Turno
label_turno = tk.Label(frame_main, text="Turno:")
label_turno.grid(row=1, column=0, sticky='e')

opciones_turno = ["Mañana", "Tarde", "Noche"]
combo_turno = ttk.Combobox(frame_main, values=opciones_turno, state="readonly")
combo_turno.current(0)
combo_turno.grid(row=1, column=1, padx=5, pady=5)

# Dropdown para Tiempo de Predicción
label_tiempo = tk.Label(frame_main, text="Tiempo de Predicción:")
label_tiempo.grid(row=2, column=0, sticky='e')

opciones_tiempo = ["7 días", "14 días"]
combo_tiempo = ttk.Combobox(frame_main, values=opciones_tiempo, state="readonly")
combo_tiempo.current(0)
combo_tiempo.grid(row=2, column=1, padx=5, pady=5)

# Botón para importar archivos
btn_importar = tk.Button(frame_main, text="Importar Archivos", command=importar_archivo)
btn_importar.grid(row=3, column=0, columnspan=2, pady=10)

# Sección de gráficas de resultados
label_graficas = tk.Label(frame_main, text="Gráficas de Resultados:")
label_graficas.grid(row=4, column=0, columnspan=2)

# Crear figura de Matplotlib
fig = Figure(figsize=(5, 4), dpi=100)
t = [0, 1, 2, 3, 4, 5]
s = [0, 1, 4, 9, 16, 25]
ax = fig.add_subplot(111)
ax.plot(t, s)

canvas = FigureCanvasTkAgg(fig, master=frame_main)
canvas.draw()
canvas.get_tk_widget().grid(row=5, column=0, columnspan=2)

# Botón Ver Más
def ver_mas():
    top = tk.Toplevel(root)
    top.title("Tablas Resumen")
    top.geometry("400x300")
    # Aquí irían las tablas que resumen las gráficas
    label_tabla = tk.Label(top, text="Aquí se muestran las tablas que resumen las gráficas.")
    label_tabla.pack(pady=20)

btn_ver_mas = tk.Button(frame_main, text="Ver Más", command=ver_mas)
btn_ver_mas.grid(row=6, column=0, columnspan=2, pady=10)

root.mainloop()