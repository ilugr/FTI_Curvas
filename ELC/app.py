from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

REGLAS = {
    "curva_dragon": {
        "inicial": "FX",
        "reglas": {
            "X": "X+YF+",
            "Y": "-FX-Y"
        }
    },
    "curva_hilbert": {
        "inicial": "X",
        "reglas": {
            "Y": "-XF+YFY+FX-",
            "X": "+YF-XFX-FY+"
        }
    }
}

def generar_dragon_curve(dibujo, iteraciones):
    cadena_inicial = REGLAS[dibujo]["inicial"]
    reglas = REGLAS[dibujo]["reglas"]
    
    for _ in range(iteraciones):
        dibujo = "".join(reglas.get(letra, letra) for letra in cadena_inicial)
        cadena_inicial = dibujo
    return cadena_inicial

@app.route('/')
def home():
    return render_template('dibujo.html')

@app.route('/layout')
def layout():
    dibujo = request.args.get('dibujo')  # Valor predeterminado 'curva_dragon'
    return render_template('layouts.html', dibujo=dibujo)

@app.route('/generar_cadena', methods=['POST'])
def generar_cadena():
    data = request.json
    iteraciones = data.get('iteraciones', 13)
    dibujo = data.get('dibujo', 'curva_dragon')  # Se pasa el tipo de dibujo
    cadena = generar_dragon_curve(dibujo, iteraciones)
    return jsonify(cadena=cadena)

@app.route('/pagina_de_dibujo')
def pagina_de_dibujo():
    # Aquí renderizas la plantilla de la página de dibujo
    return render_template('dibujo.html')

if __name__ == '__main__':
    app.run(debug=True)
