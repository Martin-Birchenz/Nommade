const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const reiniciarCarritoElement = document.getElementById("reiniciar-carrito");

// Llamamos a la función para que se ejecute al cargar la página
crearTarjetasProductos();
actualizar();

function crearTarjetasProductos() {
  contenedorTarjetas.innerHTML = "";

  // Leemos el local storage
  const productos = JSON.parse(localStorage.getItem("Bebidas"));

  if (productos && productos.length > 0) {
    contenedorTarjetas.innerHTML = `
    <table class="table">
        <thead>
          <tr>
            <th class="thead-th" scope="col"> Nombre </th>
            <th class="thead-th" scope="col"> Precio </th>
            <th class="thead-th" scope="col"> Cantidad </th>
            <th class="thead-th" scope="col">Total por producto</th>
          </tr>
        </thead>
        <tbody id="body-table">
        </tbody>
    </table>
    `;

    const body = document.getElementById("body-table");

    productos.forEach((producto) => {
      const tipoNombre = producto.nombre || producto.promo;

      // Creamos un tr para cada producto
      const filaProducto = document.createElement("tr");
      // Le agregamos el html correspondiente
      filaProducto.innerHTML = `   
            <td scope="row"> ${tipoNombre} </td>
            <td>$${producto.precio}</td>
            <td><button class="restar">-</button> <span class="cantidad"> ${
              producto.cantidad
            } </span> <button class="sumar">+</button></td>
            <td>$${producto.cantidad * producto.precio}</td>
        `;

      // Agregamos el html correspondiente
      body.appendChild(filaProducto);

      // Botón sumar
      filaProducto.querySelector(".sumar").addEventListener("click", () => {
        agregarCarrito(producto);
        crearTarjetasProductos();
        actualizar();
      });

      // Botón restar
      filaProducto.querySelector(".restar").addEventListener("click", () => {
        restarCarrito(producto);
        crearTarjetasProductos();
        actualizar();
      });
    });
  } else {
    contenedorTarjetas.innerHTML = ` <p id="carrito-vacio" class="text-center">¡El carrito está vacío! Agrega productos</p> `;
  }
}

function actualizar() {
  const productos = JSON.parse(localStorage.getItem("Bebidas")) || [];
  let unidades = 0;
  let precio = 0;

  if (productos.length > 0) {
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  unidadesElement.innerText = `${unidades}`;
  precioElement.innerText = `$${precio}`;
}

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("Bebidas");
  actualizar();
  crearTarjetasProductos();
  actualizarContadorCarrito();
}

document.getElementById("comprar").addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("Bebidas"));

  if (carrito && carrito.length > 0) {
    window.location.href = "./pagos.html";
  } else {
    alert("El carrito está vacío");
  }
});
