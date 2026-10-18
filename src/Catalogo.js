function buscarObjetos(objetos, texto) {
  return objetos.filter((objeto) => objeto.nombre.includes(texto));
}

export { buscarObjetos };