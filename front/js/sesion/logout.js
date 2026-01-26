document.getElementById("cerrar-sesion").addEventListener("click", async () => {
  const res = await fetch("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    window.location.href = "/pages/sesion/login.html";
  }
});
