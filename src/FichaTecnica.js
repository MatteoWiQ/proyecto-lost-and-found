export function obtenerCamposFicha(ficha) {
  return [
    { etiqueta: "Nombre", valor: ficha.nombre },
    { etiqueta: "Categoría", valor: ficha.categoria },
    { etiqueta: "Fecha", valor: ficha.fecha },
    { etiqueta: "Hora", valor: ficha.hora },
    { etiqueta: "Ubicación", valor: ficha.lugar },
    { etiqueta: "Comentario", valor: ficha.commentario || "Ninguno" },
    { etiqueta: "Estado", valor: ficha.estado }
  ];
}
