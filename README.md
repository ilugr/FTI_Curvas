# Proyecto Extractor de Patentes

### Integrantes del Grupo 2:
- **Gonzalo Bustamante**
- **San Pedro Mauro**

---

## Explicación del Programa

### Dragon curve
- **No terminales:** X Y
- **Terminales:** F + −
- **Cadena Inicial:** FX
- **Reglas de producción:** (X → X+YF+), (Y → −FX−Y)
- **Angulo:** 90°
- **Interpretación:**
    - F: Dibujar Segmento
    - +: Girar a la Derecha
    - -: Girar a la Izquierda
    - X, Y: No se hace nada.

### Curva de Hilbert
- **No terminales:** X, Y
- **Terminales:** +, −, F
- **Cadena Inicial:** X
- **Reglas de producción:** (X→+ YF - XFX - FY +), (Y →- XF + YFY + FX -)
- **Angulo:** 90°
- **Interpretación:**
    - F: Dibujar Segmento
    - +: Girar a la Derecha
    - -: Girar a la Izquierda
    - X, Y: No se hace nada.

---

## Pasos para Hacer Funcionar el Programa

1. **Clonar el proyecto.**

2. **Posicionarse en la carpeta `ELC`:**

    ```bash
    cd ELC
    ```

3. **Crear un entorno virtual** dentro de la carpeta del proyecto:

    ```bash
    python -m venv env
    ```

4. **Activar el entorno:**
    - En **Windows**:

      ```bash
      .\env\Scripts\activate
      ```
    - En **Linux/Mac**:

      ```bash
      source env/bin/activate
      ```

5. **Instalar las dependencias** desde `requirements.txt`:

    ```bash
    pip install -r requirements.txt
    ```

6. **Ejecutar la aplicación:**

    ```bash
    python app.py
    ```
