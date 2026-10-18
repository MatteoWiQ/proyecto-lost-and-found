function buscarObjetos(objetos, texto) {
  return objetos.filter((objeto) => objeto.nombre === texto);
}

export { buscarObjetos };