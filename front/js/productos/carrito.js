// Función para agregar productos al carrito!
function agregarCarrito(producto) {
  // Buscamos si ya hay algo en el LocalStorage. Si no hay nada, memoria será un array vacío
  const memoria = JSON.parse(localStorage.getItem("Bebidas")) || [];

  const promo_producto = producto.nombre || producto.promo;

  // Buscamos si el producto al que hicimos clic ya está en la lista
  const indiceProducto = memoria.findIndex(
    (item) => (item.nombre || item.promo) === promo_producto,
  );

  if (indiceProducto === -1) {
    // Si no está, le agregamos la propiedad cantidad = 1 y lo metemos al array
    const productoNuevo = { ...producto };
    productoNuevo.cantidad = 1;
    memoria.push(productoNuevo);
  } else {
    // Si ya está, buscamos ese producto en la lista y le sumamos 1 a la cantidad
    memoria[indiceProducto].cantidad++;
  }

  // Guardamos la lista actualizada convirtiéndola en texto JSON
  localStorage.setItem("Bebidas", JSON.stringify(memoria));

  console.log("Carrito actualizado: ", memoria);

  actualizarContadorCarrito();
}

// Identificamos el contador de carrito
const contadorCarrito = document.getElementById("contador-carrito");

function restarCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("Bebidas")) || [];
  const indiceProducto = memoria.findIndex((item) => item.id === producto.id);

  if (indiceProducto !== -1) {
    // Si hay más de uno, solo restamos
    if (memoria[indiceProducto].cantidad > 1) {
      memoria[indiceProducto].cantidad--;
    } else {
      // Si la cantidad es 1 y restamos, el producto desaparece del array
      memoria.splice(indiceProducto, 1);
    }
    localStorage.setItem("Bebidas", JSON.stringify(memoria));
    actualizarContadorCarrito();
  }
}

// En esta función vamos actualizando el valor que está por debajo del ícono carrito
function actualizarContadorCarrito() {
  // Buscamos si ya hay algo en el LocalStorage. Si no hay nada, memoria será un array vacío
  const memoria = JSON.parse(localStorage.getItem("Bebidas")) || [];

  if (memoria && memoria.length > 0) {
    const cuenta = memoria.reduce(
      (acum, current) => acum + current.cantidad,
      0,
    );
    contadorCarrito.innerText = cuenta;
  } else {
    contadorCarrito.innerText = 0;
  }
}

actualizarContadorCarrito();
