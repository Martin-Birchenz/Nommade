const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    // Creamos el div para la tarjeta de la bebida
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "col-sm-12 col-md-4 col-lg-4";
    // Le agregamos el html correspondiente
    nuevoProducto.innerHTML = `
    <div class="card p-5">
        <img src="../public/${producto.url_img}" class="card-img" alt="${producto.nombre}" />
        <div class="card-body">
            <h2 class="card-title"> ${producto.nombre} </h2>
            <p class="card-text">$${producto.precio} c/u</p>
            <a class="btn btn-warning">Agregar al carrito</a>
        </div>
    </div>
    `;

    // Agregamos la tarjeta al contenedor de tienda.html
    contenedorTarjetas.appendChild(nuevoProducto);

    // Buscamos la etiquetay le damos la orden de escuchar el clic
    nuevoProducto
      .getElementsByTagName("a")[0]
      .addEventListener("click", () => agregarCarrito(producto));
  });
}

// Función para obtener los datos del servidor
async function cargarBebidas() {
  try {
    const res = await fetch("http://localhost:3000/productos"); // Reclamamos los datos
    const productos = await res.json(); // Convertimos la respuesta en formato JSON
    crearTarjetasProductos(productos);
  } catch (error) {
    console.log("Error al cargar los productos: ", error);
  }
}

cargarBebidas();
