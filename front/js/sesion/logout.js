document.getElementById("cerrar-sesion").addEventListener("click", async () => {
  const res = await fetch("http://127.0.0.1:3000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    window.location.href = "/front/pages/sesion/login.html";
  }
});
