function buscarObjetos(objetos, texto) {
  const textoNormalizado = texto.toLowerCase();

  return objetos.filter((objeto) =>
    objeto.nombre.toLowerCase().includes(textoNormalizado)
  );
}

export { buscarObjetos };