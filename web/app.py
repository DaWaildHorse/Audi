from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html') 

@app.route("/about")
def about():
    return 'hello world from about'

@app.route("/api")
def api():
    return {'data': [1, 2, 3, 4]}  # Corregido para devolver un diccionario válido

if __name__ == "__main__":
    app.run(debug=True) 