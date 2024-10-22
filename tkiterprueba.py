import tkinter as tk
from tkinter import ttk
from tkinter import filedialog

import matplotlib
matplotlib.use('TkAgg')
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from matplotlib.figure import Figure

# Crear ventana principal
root = tk.Tk()
root.title("Aplicación de Predicción de Ausentismo")
root.geometry("900x700")
root.configure(bg='#ffffff')  # Fondo blanco

# Estilo de ttk
style = ttk.Style()
style.theme_use('clam')
style.configure('TFrame', background='#ffffff')
style.configure('TLabel', background='#ffffff', font=('Arial', 12))
style.configure('TButton', font=('Arial', 12))
style.configure('TCombobox', font=('Arial', 12))

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
frame_dropdowns.pack(pady=10)

# Colores relacionados con Audi (rojo, negro, gris)
root.configure(bg='#ffffff')  # Fondo blanco

style.configure('TFrame', background='#e5e5e5')  # Gris claro para los frames
style.configure('TLabel', background='#e5e5e5', font=('Arial', 12), foreground='#000000')  # Texto negro
style.configure('TButton', font=('Arial', 12), background='#ff0000', foreground='#ffffff')  # Botones rojos con texto blanco
style.configure('TCombobox', font=('Arial', 12))

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

# Sección de gráficas de resultados
label_graficas = ttk.Label(frame_main, text="Gráficas de Resultados:")
label_graficas.pack(pady=10)

# Crear figura de Matplotlib (placeholder para las gráficas)
fig = Figure(figsize=(6, 4), dpi=100)
t = [0, 1, 2, 3, 4, 5]
s = [0, 1, 4, 9, 16, 25]
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
    top.configure(bg='#e5e5e5')
    label_tabla = ttk.Label(top, text="Aquí se mostrarán las tablas que resumen las gráficas.")
    label_tabla.pack(pady=20)

btn_ver_mas = ttk.Button(frame_main, text="Ver Más", command=ver_mas)
btn_ver_mas.pack(pady=10)

root.mainloop()