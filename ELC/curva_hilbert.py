import turtle
import colorsys

config = {
    "velocidad": 0,
    "background_color": "gray",
    "pensize": 5,
    "posicion_inicial": (-500, -200),
    "color_inicial": "blue",
    "reglas": {
        "X": "+YF-XFX-FY+",
        "Y": "-XF+YFY+FX-"
    },
    "tamanio_segmento": 7,
    "angulo": 90,
    "iteraciones": 8
}

def configuracion():
    turtle.speed(config["velocidad"])  # Velocidad de la tortuga
    turtle.bgcolor(config["background_color"])  # Color de fondo
    turtle.pensize(config["pensize"])  # Grosor de la línea
    turtle.penup()
    turtle.goto(config["posicion_inicial"])  # Posición inicial de la tortuga
    turtle.pendown()

def hilbert_curve(iteraciones):
    cadena_inicial = "X"
    for _ in range(iteraciones):
        dibujo = ""
        for letra in cadena_inicial:
            # Aplica las reglas usando el diccionario
            dibujo += config["reglas"].get(letra, letra)
        cadena_inicial = dibujo
    
    return cadena_inicial

def dibujar_cadena(cadena, longitud, angulo):
    # Crear lista de colores degradados
    colores = []
    for i in range(len(cadena)):
        h = i / len(cadena)  # Proporción del color en el degradado
        color = colorsys.hsv_to_rgb(h, 1, 1)  
        colores.append(color)
    
    for i, simbolo in enumerate(cadena):
        turtle.pencolor(colores[i])  # Cambia el color de la línea según el degradado
        if simbolo == "F":
            turtle.forward(longitud)
        elif simbolo == "-":
            turtle.right(angulo)
        elif simbolo == "+":
            turtle.left(angulo)

def main():
    configuracion()
    cadena = hilbert_curve(config["iteraciones"])
    dibujar_cadena(cadena, config["tamanio_segmento"], config["angulo"])
    turtle.done()

if __name__ == "__main__":
    main()