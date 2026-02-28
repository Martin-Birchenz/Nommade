async function cargarPromos() {
  const contenedor = document.getElementById("tabla-promos");

  try {
    const res = await fetch("/promociones");
    const promociones = await res.json();

    contenedor.innerHTML = "";

    promociones.forEach((producto) => {
      const precio = Number(producto.precio).toLocaleString("es-ar");
      const fila = document.createElement("tr");
      fila.innerHTML = `
                <td class="px-4 fw-bold text-warning"> ${producto.promo} </td>
                <td class="px-4"> $${precio} </td>
                <td class="text-center">
                    <button class="btn btn-custom btn-sm fw-bold px-3"> Agregar al carrito </button>
                </td>
            `;
      contenedor.appendChild(fila);

      fila
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => agregarCarrito(producto));
    });
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", cargarPromos);
