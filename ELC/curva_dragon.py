import turtle
import colorsys

def configuracion():
    turtle.speed(0)  # Velocidad rápida
    turtle.bgcolor("gray")  # Color de fondo
    turtle.pensize(2)  # Grosor de la línea
    turtle.penup()
    turtle.goto(-100, 0)
    turtle.pendown()

def dragon_curve(iteraciones):
    # Cadena inicial y reglas de producción
    cadena_inicial = "FX"
    for _ in range(iteraciones):
        dibujo = ""
        for letra in cadena_inicial:
            if letra == "X":
                dibujo += "X+YF+"
            elif letra == "Y":
                dibujo += "-FX-Y"
            else:
                dibujo += letra
        cadena_inicial = dibujo
    
    return cadena_inicial

def dibujar_cadena(cadena, longitud, angulo):
    # Configuración de color inicial
    colores = []
    for i in range(len(cadena)):
        # Generar un color degradado usando HSL
        h = i / len(cadena)  # Ajuste del color en función de la posición en la cadena
        color = colorsys.hsv_to_rgb(h, 1, 1)  # Color en formato RGB
        colores.append(color)
    
    for i, simbolo in enumerate(cadena):
        turtle.pencolor(colores[i])  # Cambiar el color de la línea
        if simbolo == "F":
            turtle.forward(longitud)
        elif simbolo == "+":
            turtle.right(angulo)
        elif simbolo == "-":
            turtle.left(angulo)

def main():
    iteraciones = 13  # Más iteraciones para mayor detalle
    longitud = 5  # Longitud de cada segmento
    angulo = 90

    configuracion()
    # Generar la curva del dragón
    cadena = dragon_curve(iteraciones)

    # Dibujar la curva con colores degradados
    dibujar_cadena(cadena, longitud,angulo)

    turtle.done()

if __name__ == "__main__":
    main()
