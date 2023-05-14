const carritoContainer = document.getElementById("productosCarrito");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const carrito = recuperarCarrito() || [];

recuperarCarrito();
inyectarEnCarrito();

function guardarCarrito() {
  localStorage.setItem("carritoDeInstrumentos", JSON.stringify(carrito));
}

function eventoAddCarrito() {
  const btns = document.querySelectorAll(".cardBtn");
  for (let boton of btns) {
    boton.addEventListener("click", () => {
      carrito.push(
        instrumentos.find(
          (instrumento) => instrumento.id === parseInt(boton.id)
        )
      );
      guardarCarrito();
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#4CAF50",
        stopOnFocus: true,
      }).showToast();
    });
  }
}

function recuperarCarrito() {
  return JSON.parse(localStorage.getItem("carritoDeInstrumentos"));
}

function generarFilaCarrito(instrumento) {
  return `<tr class="filaCarrito">
              <td>${instrumento.nombre}</td>
              <td>$${instrumento.precio.toFixed(2)}</td>
              <td>
                <button class="btnRemove" onclick="eventoEliminarInstrumento(${
                  instrumento.id
                })"> Eliminar </button>
              </td>
            </tr>`;
}

function inyectarEnCarrito() {
  carritoContainer.innerHTML = "";
  carrito.forEach((instrumento) => {
    carritoContainer.innerHTML += generarFilaCarrito(instrumento);
  });
  totalCarrito.innerText = calcTotalCarrito().toString();
  eventoEliminarInstrumento();
}

function vaciarCarrito() {
  carrito.length = 0;
  localStorage.setItem("carritoDeInstrumentos", JSON.stringify(carrito));
  guardarCarrito();
  recuperarCarrito();
  inyectarEnCarrito();
  Toastify({
    text: "Carrito vaciado",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#FFA500",
    stopOnFocus: true,
  }).showToast();
}

function eventoEliminarInstrumento(id) {
  const indice = carrito.findIndex((instrumento) => instrumento.id === id);
  if (indice > -1) {
    carrito.splice(indice, 1);
    guardarCarrito();
    inyectarEnCarrito();
    Toastify({
      text: "Producto eliminado del carrito",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#FF6347",
      stopOnFocus: true,
    }).showToast();
  }
}

function calcTotalCarrito() {
  return carrito
    .reduce((acc, instrumento) => acc + instrumento.precio, 0)
    .toFixed(2);
}

function compra() {
  Toastify({
    text: "La compra fue exitosa, muchas gracias",
    duration: 6000,
    gravity: "bottom",
    position: "center",
    backgroundColor: "#00ec3e",
    stopOnFocus: true,
  }).showToast();
  carrito.length = 0;
  localStorage.removeItem("carritoDeInstrumentos");
  inyectarEnCarrito();
}
