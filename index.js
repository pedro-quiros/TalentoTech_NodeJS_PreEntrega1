const [,, metodo, recurso, ...args] = process.argv;
const parametro = args[0]; // útil para métodos como GET/DELETE con 1 solo parámetro


async function obtenerTodosLosProductos() {
    try {
      const response = await fetch('https://fakestoreapi.com/products'); 
      const data = await response.json(); 
    // console.log(data); // Muestra la estructura completa de los datos en la consola
   
    // Mostrar productos resumidos
    data.forEach(({ id, title, price }) => {
      console.log(`ID: ${id} | ${title} | $${price}`);
    });

  } catch (error) {
    console.error("Error al obtener productos:", error);
  } finally {
    console.log("Fin de la consulta.");
  }
}


async function obtenerProductoPorID(productoID) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productoID}`); 
      const data = await response.json();
     // console.log(data);  // Muestra la estructura completa de los datos en la consola

      // Mostrar productos resumidos
      const { id, title, price } = data;
      console.log(`ID: ${id} | ${title} | $${price}`);

    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
    } finally {
        console.log("Fin de la consulta.");
    }
}

async function eliminarProductoPorID(productoID) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productoID}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        
        // Mostrar confirmación de producto eliminado
        const { id, title, price } = data;
        console.log(`Producto eliminado: ID ${id} | ${title} | $${price}`);
        
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    } finally {
        console.log("Fin de la eliminación.");
    }
}

async function agregarProducto(title, price, category) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                price: parseFloat(price),
                category
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(`Producto creado con ID: ${data.id}`);
        
    } catch (error) {
        console.error("Error al agregar producto:", error);
    } finally {
        console.log("Fin de la consulta.");
    }
}


if (metodo === 'GET' && recurso === 'products' && !parametro) {
  obtenerTodosLosProductos();
} 
else if (metodo === 'GET' && recurso === 'products' && parametro) {
  obtenerProductoPorID(parametro);
} 
else if (metodo === 'DELETE' && recurso === 'products' && parametro) {
  eliminarProductoPorID(parametro);
} 
else if (metodo === 'POST' && recurso === 'products' && args.length >= 3) {
  const [title, price, category] = args;
  agregarProducto(title, price, category);
} 
else {
  console.log("Comando no válido. Usa:\n" +
              "- npm run start GET products\n" +
              "- npm run start GET products <id>\n" +
              "- npm run start DELETE products <id>\n" +
              "- npm run start POST products <title> <price> <category>");
}
