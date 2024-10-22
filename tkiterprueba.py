import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox

import matplotlib
matplotlib.use('TkAgg')
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

# Función para importar archivos
def importar_archivo():
    filename = filedialog.askopenfilename()
    if filename:
        messagebox.showinfo("Importar Archivo", f"Archivo importado: {filename}")

# Función para buscar y mostrar resumen de ID
def buscar_id():
    id_buscado = entry_buscar.get()
    if id_buscado:
        # Aquí iría la lógica para buscar y mostrar el resumen del ID
        messagebox.showinfo("Resumen de ID", f"Resumen del ID {id_buscado}.")
    else:
        messagebox.showwarning("Buscar ID", "Por favor, ingrese un ID válido.")

# Crear ventana principal
root = tk.Tk()
root.title("Aplicación de Predicción de Ausentismo")
root.geometry("900x700")
root.configure(bg='#ffffff')

# Estilo de ttk
style = ttk.Style()

# Crear barra de navegación
frame_nav = ttk.Frame(root, height=50)
frame_nav.pack(side=tk.TOP, fill=tk.X)

btn_inicio = ttk.Button(frame_nav, text="Inicio", style='TButton')
btn_inicio.pack(side=tk.LEFT, padx=10, pady=10)

# Línea divisora entre navbar y el contenido
separator = ttk.Separator(root, orient='horizontal')
separator.pack(fill=tk.X, pady=10)

# Frame principal
frame_main = ttk.Frame(root)
frame_main.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)

# Frame para los dropdowns
frame_dropdowns = ttk.Frame(frame_main)
frame_dropdowns.pack(pady=10, anchor='w')  # Alineado a la izquierda con anchor='w'

# Dropdown para Código de Puesto
label_puesto = ttk.Label(frame_dropdowns, text="Código de Puesto:")
label_puesto.pack(side=tk.LEFT, padx=5)

opciones_puesto = ["Puesto 1", "Puesto 2", "Puesto 3", "Puesto 4", "Puesto 5"]
combo_puesto = ttk.Combobox(frame_dropdowns, values=opciones_puesto, state="readonly")
combo_puesto.current(0)
combo_puesto.pack(side=tk.LEFT, padx=5)

# Dropdown para Turno
label_turno = ttk.Label(frame_dropdowns, text="Turno:")
label_turno.pack(side=tk.LEFT, padx=5)

opciones_turno = ["Mañana", "Tarde", "Noche"]
combo_turno = ttk.Combobox(frame_dropdowns, values=opciones_turno, state="readonly")
combo_turno.current(0)
combo_turno.pack(side=tk.LEFT, padx=5)

# Dropdown para Tiempo de Predicción
label_tiempo = ttk.Label(frame_dropdowns, text="Tiempo de Predicción:")
label_tiempo.pack(side=tk.LEFT, padx=5)

opciones_tiempo = ["7 días", "14 días"]
combo_tiempo = ttk.Combobox(frame_dropdowns, values=opciones_tiempo, state="readonly")
combo_tiempo.current(0)
combo_tiempo.pack(side=tk.LEFT, padx=5)

# Sección para búsqueda de ID
frame_buscar = ttk.Frame(frame_main)
frame_buscar.pack(pady=10, anchor='w')

label_buscar = ttk.Label(frame_buscar, text="Buscar ID:")
label_buscar.pack(side=tk.LEFT, padx=5)

entry_buscar = ttk.Entry(frame_buscar)
entry_buscar.pack(side=tk.LEFT, padx=5)

btn_buscar = ttk.Button(frame_buscar, text="Ver Resumen", command=buscar_id)
btn_buscar.pack(side=tk.LEFT, padx=5)

# Botón de importar archivos
frame_importar = ttk.Frame(frame_main)
frame_importar.pack(pady=10, anchor='w')

btn_importar = ttk.Button(frame_importar, text="Importar Datos", command=importar_archivo)
btn_importar.pack(side=tk.LEFT, padx=5)

# Sección de gráficas de resultados
label_graficas = ttk.Label(frame_main, text="Gráficas de Resultados:")
label_graficas.pack(pady=10)

# Crear figura de Matplotlib (placeholder para las gráficas)
fig = Figure(figsize=(6, 4), dpi=100)
t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
s = [0, 1, 4, 9, 16, 25, 76, 32, 53, 64, 68, 34]
ax = fig.add_subplot(111)
ax.plot(t, s)

canvas = FigureCanvasTkAgg(fig, master=frame_main)
canvas.draw()
canvas.get_tk_widget().pack()

# Botón Ver Más
def ver_mas():
    top = tk.Toplevel(root)
    top.title("Tablas Resumen")
    top.geometry("500x400")
    label_tabla = ttk.Label(top, text="Aquí se mostrarán las tablas que resumen las gráficas.")
    label_tabla.pack(pady=20)

btn_ver_mas = ttk.Button(frame_main, text="Ver Más", command=ver_mas)
btn_ver_mas.pack(pady=10)

root.mainloop()
