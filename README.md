# Pre-Entrega 1 - Proyecto Node.js - Gestión de Productos

## Descripción  
Aplicación CLI para administrar productos de una tienda en línea utilizando la API pública FakeStoreAPI (https://fakestoreapi.com). Permite consultar, crear y eliminar productos desde la terminal mediante comandos sencillos.

## Requisitos  
- Node.js v14 o superior  

## Instalación  
1. Clona este repositorio o descarga el proyecto.  
2. Ejecuta `npm install` para instalar dependencias (si aplica).  
3. Asegúrate que en package.json está configurado `"type": "module"` para usar ESModules.

## Uso  
Ejecuta los comandos con el siguiente formato:  
`npm run start -- <MÉTODO> <RECURSO> [ARGUMENTOS]`

## Comandos disponibles  
- Obtener todos los productos:  
`npm run start -- GET products`

- Obtener un producto por ID:  
`npm run start -- GET products <id>`

- Crear un producto nuevo:  
`npm run start -- POST products <title> <price> <category>`

- Eliminar un producto por ID:  
`npm run start -- DELETE products <id>`

## Ejemplos  
`npm run start -- GET products`  
`npm run start -- GET products 15`  
`npm run start -- POST products "Camiseta Retro" 250 remeras`  
`npm run start -- DELETE products 7`

