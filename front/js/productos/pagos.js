function pedido() {
  const memoria = JSON.parse(localStorage.getItem("Bebidas")) || [];

  if (memoria.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  const telefono = "+5493435618314";
  let mensaje = "¡Hola! Me gustaría realizar el siguiente pedido Nommade:%0A";

  memoria.forEach((producto) => {
    const tipoNombre = producto.nombre || producto.promo;
    const subtotal = producto.precio * producto.cantidad;
    const subTotalPrecio = Number(subtotal).toLocaleString("es-ar");
    mensaje += `-${tipoNombre} --- Cantidad del producto: ${producto.cantidad}%0A`;
    total += subTotalPrecio;
  });

  mensaje += `Total a pagar: $${total}`;

  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}
