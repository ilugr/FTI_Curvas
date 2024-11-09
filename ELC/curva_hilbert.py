import turtle

def configuracion():
    turtle.teleport(-100, 0) #Mueve la tortuga a una posicion absoluta
    turtle.speed(0)  # Velocidad de la tortuga  [lento 1, 3, 6, 10, 0 rapido]
    turtle.bgcolor("gray") #color de fondo
    turtle.pensize(5) #grosor de la línea
    turtle.color("blue")

# Programa principal
def main():
    longitud = 10  # Longitud de cada segmento
    angulo = 90  # Ángulo de giro
    iteraciones = 10
    
    configuracion()

    cadena_inicial = "X"
    
    for i in range(iteraciones): 
        dibujo = ""
        for letra in cadena_inicial:
            if letra == "X":
                dibujo += "+YF-XFX-FY+"
            elif letra == "Y":
                dibujo += "-XF+YFY+FX-"
            else:
                dibujo += letra
        cadena_inicial = dibujo

    for simbolo in cadena_inicial:
        if simbolo == "F":
            turtle.forward(longitud)
            turtle.color("yellow")
        elif simbolo == "-":
            turtle.color("yellow")
            turtle.right(angulo)
        elif simbolo == "+":
            turtle.color("blue")
            turtle.left(angulo)
            
    print(cadena_inicial)
    turtle.done()

if __name__ == "__main__":
    main()
