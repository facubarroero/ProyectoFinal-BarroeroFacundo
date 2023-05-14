/*const cotizacionDolar = document.getElementById("dolar");

fetch("https://api-dolar-argentina.herokuapp.com/api/dolarblue")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    const cotizacionARS = data.rates.ARS;
    cotizacionDolar.textContent = `Cotización del Dólar: ARS ${cotizacionARS.toFixed(2)}`;
  })
  .catch((error) => {
    Toastify({
        text: "Error al cargar API",
        duration: 6000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ff0000",
        stopOnFocus: true,
      }).showToast();
  });*/

const cotizacionDolar = document.getElementById("dolar");

fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then((respuesta) => respuesta.json())
  .then((data) => {
    const cotizacionARS = data.rates.ARS;
    cotizacionDolar.textContent = `Cotización del Dólar Oficial: ARS ${cotizacionARS.toFixed(
      2
    )}`;
  })
  .catch((error) => {
    Toastify({
        text: "Error al cargar API",
        duration: 6000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ff0000",
        stopOnFocus: true,
      }).showToast();
  });
