function pedido() {
  const memoria = JSON.parse(localStorage.getItem("Bebidas")) || [];

  if (memoria.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  const telefono = "+5493435618314";
  let mensaje = "¡Hola! Me gustaría realizar el siguiente pedido Nommade:%0A";
  let totalAcumulado = 0;

  memoria.forEach((producto) => {
    const tipoNombre = producto.nombre || producto.promo;
    const subtotal = producto.precio * producto.cantidad;

    totalAcumulado += subtotal;

    const subTotalPrecio = Number(subtotal).toLocaleString("es-ar");

    mensaje += `-${tipoNombre} --- Cantidad: ${producto.cantidad} ($${subTotalPrecio})%0A`;
  });

  const totalFinal = Number(totalAcumulado).toLocaleString("es-ar");

  mensaje += `%0ATotal a pagar: $${totalFinal}`;

  const url = `https://wa.me/${telefono}?text=${mensaje}`;

  console.log("Enviando a WhatsApp:", url);
  window.open(url, "_blank");
}
