const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasProductos(productos) {
  productos.forEach((producto) => {
    const precio = Number(producto.precio).toLocaleString("es-ar");
    // Creamos el div para la tarjeta de la bebida
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "col-12 col-sm-6 col-lg-4";
    // Le agregamos el html correspondiente
    nuevoProducto.innerHTML = `
    <div class="card h-100 bg-dark text-light border-warning shadow">
        <img src="../public/${producto.url_img}" class="card-img-top p-2" alt="${producto.nombre}" />
        <div class="card-body d-flex flex-column justify-content-between text-center">
            <div>
              <h2 class="card-title text-center text-light"> ${producto.nombre} </h2>
              <p class="card-text fs-5 fw-bold">$${precio} c/u</p>
              <a class="btn btn-custom fs-5">Agregar al carrito</a>
            </div>
        </div>
    </div>
    `;

    // Agregamos la tarjeta al contenedor de tienda.html
    contenedorTarjetas.appendChild(nuevoProducto);

    // Buscamos la etiqueta y le damos la orden de escuchar el clic
    nuevoProducto
      .getElementsByTagName("a")[0]
      .addEventListener("click", () => agregarCarrito(producto));
  });
}

// Función para obtener los datos del servidor
async function cargarBebidas() {
  try {
    const res = await fetch("/productos"); // Reclamamos los datos
    const productos = await res.json(); // Convertimos la respuesta en formato JSON
    crearTarjetasProductos(productos);
  } catch (error) {
    console.log("Error al cargar los productos: ", error);
  }
}

cargarBebidas();
