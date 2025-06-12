# Aplicación de Estudio de Tiempos

Esta es una aplicación web para realizar estudios de tiempo y exportar los datos a Excel.

## Características

- Registro de tiempos con descripción
- Tabla de mediciones con fecha y hora
- Exportación a Excel
- Interfaz moderna y fácil de usar
- Posibilidad de eliminar mediciones individuales

## Requisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona este repositorio
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta los siguientes comandos:

```bash
npm install
npm start
```

La aplicación se abrirá automáticamente en tu navegador predeterminado en `http://localhost:3000`.

## Uso

1. Ingresa el tiempo en el campo "Tiempo" (puedes usar números decimales, por ejemplo: 1.5)
2. Escribe una descripción de la actividad
3. Haz clic en "Agregar" para registrar la medición
4. Para eliminar una medición, usa el botón de papelera
5. Para exportar todos los datos a Excel, haz clic en "Exportar a Excel"

## Formato del Excel

El archivo Excel exportado incluirá las siguientes columnas:
- Fecha (dd/mm/yyyy)
- Hora (hh:mm:ss)
- Tiempo
- Descripción 