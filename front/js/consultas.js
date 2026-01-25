document.getElementById("form-consulta").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const consulta = document.getElementById("consulta").value;
  const telefono = "+5493435611122";
  const texto = `¡Hola! Mi nombre es ${name}. Tengo la siguiente consulta: ${consulta}. Mi correo electrónico y número de teléfono: ${email}  ${telefono}`;
  const textoCodificado = encodeURIComponent(texto);
  const url = `https://wa.me/${telefono}?text=${textoCodificado}`;
  window.open(url, "_blank");
});
