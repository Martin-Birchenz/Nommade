const contenedorTarjetas = document.getElementById("productos-container");
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
    <table class="table table-dark table-hover aling-middle border-warning mb-0">
        <thead class="table-warning text-dark">
          <tr>
            <th class="py-3 px-4" scope="col"> Producto </th>
            <th class="py-3 px-4 text-center" scope="col"> Cantidad </th>
            <th class="py-3 px-4 text-end" scope="col"> Precio Unit. </th>
            <th class="py-3 px-4 text-end" scope="col"> Subtotal </th>
          </tr>
        </thead>
        <tbody id="body-table">
        </tbody>
        <tfoot class="border-top border-warning">
          <tr>
            <td colspan="4" class="text-end fs-5 fw-bold text-light py-4">
              TOTAL A PAGAR: <span id="precio" class="text-warning">0</span>
            </td>
          </tr>
        </tfoot>
    </table>
    `;

    const body = document.getElementById("body-table");

    productos.forEach((producto) => {
      const tipoNombre = producto.nombre || producto.promo;

      const precio = Number(producto.precio).toLocaleString("es-ar");
      const cantidadCuenta = producto.cantidad * producto.precio;
      const cantidad = Number(cantidadCuenta).toLocaleString("es-ar");

      // Creamos un tr para cada producto
      const filaProducto = document.createElement("tr");
      // Le agregamos el html correspondiente
      filaProducto.innerHTML = `   
            <td class="px-4 fw-bold text-warning"> ${tipoNombre} </td>
            <td class="text-center"><button class="restar">-</button> <span class="cantidad"> ${
              producto.cantidad
            } </span> <button class="sumar">+</button></td>
            <td class="text-end">$${precio}</td>
            <td class="text-end">$${cantidad}</td>
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
    contenedorTarjetas.innerHTML = ` <p id="carrito-vacio" class="text-center fw-bold fs-3">¡El carrito está vacío! Agrega productos</p> `;
  }
}

function actualizar() {
  const productos = JSON.parse(localStorage.getItem("Bebidas")) || [];
  let precioTotal = 0;

  if (productos.length > 0) {
    productos.forEach((producto) => {
      precioTotal += producto.precio * producto.cantidad;
    });
  }

  const precioElement = document.getElementById("precio");

  const precio = Number(precioTotal).toLocaleString("es-ar");

  if (precioElement) {
    precioElement.innerText = `$${precio}`;
  }
}

reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  if (confirm("¿Estás seguro de que querés vaciar tu carrito de Nommade?")) {
    localStorage.removeItem("Bebidas");
    crearTarjetasProductos();
    actualizar();
  }
  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
}

document.getElementById("comprar").addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("Bebidas"));

  if (carrito && carrito.length > 0) {
    window.location.href = "./pagos.html";
  } else {
    alert("El carrito está vacío");
  }
});
