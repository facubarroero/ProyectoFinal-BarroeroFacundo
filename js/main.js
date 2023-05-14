const container = document.getElementById("generalContainer");
const buscarInput = document.getElementById("buscar");
const btnComprar = document.getElementById("btnComprar");
const instrumentos = [];
const URL = "../js/instrumentos.json";

traerInstrumentos();
inyectarInstrumentos(instrumentos);

async function traerInstrumentos() {
  try {
    const respuesta = await fetch(URL);
    const data = await respuesta.json();
    instrumentos.push(...data);
    inyectarInstrumentos(instrumentos);
  } catch (error) {
    Toastify({
      text: "ERROR",
      duration: 6000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#ff0000",
      stopOnFocus: true,
    }).showToast();
  }
}

function generarProductCardsHTML(instrumento) {
  return `<div class="productCard">
                <div class="cardImg">
                    <img src="./img/${instrumento.img}">
                </div>
                <div class="cardName">
                    <h3>${instrumento.nombre}</h3>
                </div>
                <div class="cardPrice">
                    <p class="price">$${instrumento.precio}</p>
                </div>
                <div class="cardType">
                    <p class="tipo">${instrumento.tipo.toUpperCase()}</p>
                </div>
                <div class="cardBtnContainer">
                    <button class="cardBtn" id="${
                      instrumento.id
                    }">Agregar al carrito</button>
                </div>
          </div>`;
}

function inyectarInstrumentos(stock) {
  container.innerHTML = "";
  stock.forEach((instrumento) => {
    container.innerHTML += generarProductCardsHTML(instrumento);
  });
  eventoAddCarrito();
}

function filtro(value) {
  let input = instrumentos.filter((instrumento) =>
    instrumento.nombre.toLowerCase().includes(value.toLowerCase())
  );
  input.length > 0 && inyectarInstrumentos(input);
}

buscarInput.addEventListener("search", (e) => {
  filtro(e.target.value);
});

function existe(instrumento) {
  carrito.find((producto) => producto.id === parseInt(instrumento.id));
}
