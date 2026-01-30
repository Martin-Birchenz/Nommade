const contenedorTarjetasInicio = document.getElementById(
  "productos-container-inicio",
);

function crearTarjetasProductosInicio(productos) {
  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "col-12 col-md-6 col-lg-4";

    nuevoProducto.innerHTML = `  
      <div class="card h-100 text center border-warning bg-dark">
        <img src="./public/${producto.url_img}" alt="${producto.nombre}" class="card-img-top p-2"/>
        <div class="card-body d-flex flex-column">
            <h2 class="card-title text-center text-light"> ${producto.nombre} </h2>
            <a class="btn btn-warning fw-bold mt-auto">Agregar al carrito</a>
        </div>
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
