from tkinter import *
from tkinter import ttk
import subprocess
import os

# Function to run the external Python script
def run_script():
    # Replace 'tkiterprueba.py' with the full path if necessary
    root.destroy()
    subprocess.run(['python3', 'tkiterprueba.py'])

root = Tk()
frm = ttk.Frame(root, padding=10)
frm.grid()

ttk.Label(frm, text="Programa de Predicción de Absentismo").grid(column=0, row=0)
ttk.Label(frm, text="Valida tus Credenciales con PKI").grid(column=0, row=1)

# Button to run the script
ttk.Button(frm, text="Validar", command=run_script).grid(column=0, row=2)

root.mainloop()
