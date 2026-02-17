const mensajeError = document.querySelector(".error-msg");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  mensajeError.classList.add("d-none");

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    if (!res.ok) {
      mensajeError.classList.remove("d-none");
      return;
    }
    const resJson = await res.json();
    console.log("Respuesta del servidor: ", res.json);
    if (resJson.redirect) {
      window.location.href = resJson.redirect;
    }
  } catch (error) {
    console.log(error);
  }
});
