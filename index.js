const [,, metodo, recurso, ...args] = process.argv;
const parametro = args[0]; // útil para métodos como GET/DELETE con 1 solo parámetro

const URL_BASE = 'https://fakestoreapi.com';

async function obtenerTodosLosProductos() {
    try {
      const response = await fetch(URL_BASE + '/products'); 
      const data = await response.json(); 

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
      const response = await fetch(`${URL_BASE}/products/${productoID}`); 
      const data = await response.json();

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
        const response = await fetch(`${URL_BASE}/products/${productoID}`, {
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
        const response = await fetch(`${URL_BASE}/products/`, {
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
        console.log(`Producto: ${data.title} | $${data.price}`);
        
    } catch (error) {
        console.error("Error al agregar producto:", error);
    } finally {
        console.log("Fin de la consulta.");
    }
}



// Switch para ejecutar el programa
switch (metodo) {
  case 'GET':
    if (recurso === 'products') {
      if (parametro) {
        obtenerProductoPorID(parametro);
      } else {
        obtenerTodosLosProductos();
      }
    } else {
      console.log("Recurso GET no reconocido.");
    }
    break;

  case 'DELETE':
    if (recurso === 'products' && parametro) {
      eliminarProductoPorID(parametro);
    } else {
      console.log("DELETE requiere un ID.");
    }
    break;

  case 'POST':
    if (recurso === 'products' && args.length >= 3) {
      const [title, price, category] = args;
      agregarProducto(title, price, category);
    } else {
      console.log("POST requiere título, precio y categoría.");
    }
    break;

  default:
    console.log("Comando no válido. Usa:\n" +
                "- npm run start GET products\n" +
                "- npm run start GET products <id>\n" +
                "- npm run start DELETE products <id>\n" +
                "- npm run start POST products <title> <price> <category>");
    break;
}
