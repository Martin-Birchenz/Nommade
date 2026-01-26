const contenedorTarjetasInicio = document.getElementById(
  "productos-container-inicio",
);

function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "card text-center col-sm-12 col-md-6 col-lg-4";

    nuevoProducto.innerHTML = `  
            <img src="./public/${producto.url_img}" alt="${producto.nombre}" class="card-img-top"/>
            <div class="card-body">
                <h3 class="card-title"> ${producto.nombre} </h3>
                <a class="btn btn-warning">Agregar al carrito</a>
            </div>
    `;

    contenedorTarjetasInicio.appendChild(nuevoProducto);

    nuevoProducto
      .getElementsByTagName("a")[0]
      .addEventListener("click", () => agregarCarrito(producto));
  });
}

async function cargarBebidasInicio() {
  try {
    const res = await fetch("http://localhost:3000/productosInicio");
    const productos = await res.json();
    crearTarjetasProductosInicio(productos);
  } catch (error) {
    console.log("Error al cargar los productos: ", error);
  }
}

cargarBebidasInicio();
