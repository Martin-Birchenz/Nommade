const mensajeError = document.querySelector(".error-msg");
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  mensajeError.classList.add("d-none");

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
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

    if (resJson.redirect) {
      window.location.href = resJson.redirect;
    }
  } catch (error) {
    console.log(error);
  }
});
