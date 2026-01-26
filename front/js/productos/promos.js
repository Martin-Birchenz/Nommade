async function cargarPromos() {
  const contenedor = document.getElementById("tabla-promos");

  try {
    const res = await fetch("/promociones");
    const promociones = await res.json();

    contenedor.innerHTML = "";

    promociones.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
                <td> ${producto.promo} </td>
                <td> ${producto.precio} </td>
                <td>
                    <button class="btn btn-warning"> Agregar al carrito </button>
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
