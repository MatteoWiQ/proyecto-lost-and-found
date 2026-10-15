import ObjetoPerdido from "./ObjetoPerdido.js";

const nombreInput = document.querySelector("#nombre");
const categoriaInput = document.querySelector("#categoria");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const lugarInput = document.querySelector("#lugar");
const commentarioInput = document.querySelector("#commentario");

const form = document.querySelector("#lost-object-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const objetoPerdido = new ObjetoPerdido(nombreInput.value, 
                                          categoriaInput.value, 
                                          fechaInput.value, 
                                          horaInput.value, 
                                          lugarInput.value, 
                                          commentarioInput.value);
  div.innerHTML = "<p>" + objetoPerdido.ValidacionFinal() + "</p>";
});
