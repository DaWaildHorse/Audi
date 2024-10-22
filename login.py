from tkinter import *
from tkinter import ttk
import subprocess

# Function to go to the login window
def goto_login():
    root.destroy()  # Close the main window
    login()         # Open the login window

# Function to go to the main page
def goto_mainpage(login_window):
    login_window.destroy()  # Close the login window
    subprocess.run(['python3', 'tkiterprueba.py'])  # Run the external script
    root.quit()  # Close the application

# Function to create the login window
def login():
    login_window = Tk()
    frm2 = ttk.Frame(login_window, padding=10)
    frm2.grid()

    ttk.Label(frm2, text="Programa de Predicción de Absentismo").grid(column=0, row=0)
    ttk.Label(frm2, text="Por favor, añade tu ID & PIN").grid(column=0, row=1)

    # Button to validate and go to the main page
    ttk.Button(frm2, text="Validar", command=lambda: goto_mainpage(login_window)).grid(column=0, row=2)

    login_window.mainloop()

# Main application window
root = Tk()
frm = ttk.Frame(root, padding=10)
frm.grid()

ttk.Label(frm, text="Programa de Predicción de Absentismo").grid(column=0, row=0)
ttk.Label(frm, text="Valida tus Credenciales con PKI").grid(column=0, row=1)

# Button to go to the login window
ttk.Button(frm, text="Validar", command=goto_login).grid(column=0, row=2)

root.mainloop()
