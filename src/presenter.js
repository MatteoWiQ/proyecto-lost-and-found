import ObjetoPerdido from "./ObjetoPerdido.js";

const nombreInput = document.querySelector("#nombre");
const form = document.querySelector("#lost-object-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const objetoPerdido = new ObjetoPerdido(nombreInput.value);
  div.innerHTML = "<p>" + objetoPerdido.getNombre() + "</p>";
});
