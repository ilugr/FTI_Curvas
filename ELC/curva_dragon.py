import turtle
import colorsys

config = {
    "velocidad": 0,
    "background_color": "gray",
    "pensize": 2,
    "posicion_inicial": (-100, 0),
    "reglas": {
        "X": "X+YF+",
        "Y": "-FX-Y"
    },
    "iteraciones": 13,
    "tamanio_segmento": 5,
    "angulo": 90
}

def configuracion():
    turtle.speed(config["velocidad"])  # Velocidad
    turtle.bgcolor(config["background_color"])  # Color de fondo
    turtle.pensize(config["pensize"])  # Grosor de la línea
    turtle.penup()
    turtle.goto(config["posicion_inicial"])
    turtle.pendown()

def curva_del_dragon(iteraciones):
    # Cadena inicial y reglas de producción
    cadena_inicial = "FX"
    for _ in range(iteraciones):
        dibujo = ""
        for letra in cadena_inicial:
            # Aplica las reglas del diccionario
            dibujo += config["reglas"].get(letra, letra)
        cadena_inicial = dibujo
    
    return cadena_inicial

def dibujar_cadena(cadena, longitud, angulo):
    # Configuración de color inicial
    colores = []
    for i in range(len(cadena)):
        # Genera un color degradado
        h = i / len(cadena)
        color = colorsys.hsv_to_rgb(h, 1, 1) 
        colores.append(color)
    
    for i, simbolo in enumerate(cadena):
        turtle.pencolor(colores[i])  # Cambia el color de la línea
        if simbolo == "F":
            turtle.forward(longitud)
        elif simbolo == "+":
            turtle.right(angulo)
        elif simbolo == "-":
            turtle.left(angulo)

def main():
    configuracion()
    cadena = curva_del_dragon(config["iteraciones"])
    dibujar_cadena(cadena, config["tamanio_segmento"], config["angulo"])
    turtle.done()

if __name__ == "__main__":
    main()