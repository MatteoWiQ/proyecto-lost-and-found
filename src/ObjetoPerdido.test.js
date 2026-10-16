import ObjetoPerdido from "./ObjetoPerdido.js";

describe("ObjetoPerdido", () => {
  it("deberia crear una instancia con el nombre proporcionado", () => {
    const objeto = new ObjetoPerdido("Laptop");
    expect(objeto.getNombre()).toEqual("Laptop");
  });
  it("deberia haber un nombre obligatoriamente", () => {
    const objeto = new ObjetoPerdido("");
    expect(objeto.getNombre()).toEqual("nombre obligatorio");
  });
  it("nombre registrable", () => {
    const nombre="a".repeat(101);
    const objeto = new ObjetoPerdido(nombre,"Tecnologia");
    expect(objeto.getInformacion()).toEqual("Cantidad de caracteres no es valida");
  });
  it("registrar categoria", () => {
    const objeto = new ObjetoPerdido("Laptop","Tecnologia");
    expect(objeto.getNombre()+", "+objeto.getCategoria()).toEqual("Laptop, Tecnologia");
  });
  it("registrar categorias validas", () => {
    const objeto = new ObjetoPerdido("Documento", "Cualquier Cosa");
    expect(objeto.getInformacion()).toEqual("No existe esa categoria");
  });
  it("Registrar fecha", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14");
    expect(objeto.getNombre()+", "+objeto.getCategoria()+", "+objeto.getFecha()).toEqual("Documento, Tecnologia, 2026-10-14");
  });
  it("Registrar fecha obligatoria", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "");
    expect(objeto.getInformacion()).toEqual("La fecha es obligatoria");
  });
  it("Registrar fecha futura invalido", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2028-10-10");
    expect(objeto.getInformacion()).toEqual("La fecha no puede ser futura");
  });
  it("Registrar fecha invalido", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "10-1023-2020");
    expect(objeto.getInformacion()).toEqual("La fecha no puede ser incorrecta");
  });
  it("Registrar hora", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "10:30");
    expect(objeto.getNombre()+", "+objeto.getCategoria()+", "+objeto.getFecha()+", "+objeto.getHora()).toEqual("Documento, Tecnologia, 2026-10-14, 10:30");
  });
  it("Registrar hora obligatoria", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "");
    expect(objeto.getInformacion()).toEqual("La hora es obligatoria");
  });
  it("Invalidar hora fuera de rango", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "23:40");
    expect(objeto.getInformacion()).toEqual("La hora esta fuera de rango");
  });
  it("Invalidar horas incorrectas", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "223340");
    expect(objeto.getInformacion()).toEqual("La hora no esta en formato correcto");
  });
  it("Invalidar horas futuras", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-16", "10:30");
    expect(objeto.getInformacion()).toEqual("No se permiten horas futuras");
  });
  it("Registrar Lugar", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A");
    expect(objeto.getNombre()+", "+objeto.getCategoria()+", "+objeto.getFecha()+", "+objeto.getHora()+", "+objeto.getLugar()).toEqual("Documento, Tecnologia, 2026-10-14, 20:30, Bloque A");
  });
  it("Lugar Obligatorio", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "");
    expect(objeto.getInformacion()).toEqual("El lugar es obligatorio");
  });
   it("Validar Lugares invalidos", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Parque");
    expect(objeto.getInformacion()).toEqual("El lugar no existe");
  });
  it("Aceptar comentarios adicionales", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.getInformacion()).toEqual("Documento, Tecnologia, 2026-10-14, 20:30, Bloque A, Comentario adicional");
  });
  // it("Aceptar comentarios adicionales", () => {
  //   const foto = { name: "objeto.jpg", type: "image/jpg" };
  //   const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
  //   expect(objeto.ValidacionFinal()).toEqual("Registro exitoso");
  // });
  it("Mensaje de error", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Parque");
    expect(objeto.ValidacionFinal()).toEqual("Registro fallido: El lugar no existe");
  });
  it("acepta una imagen JPG", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);

    expect(objeto.getFoto()).toEqual(foto);
  });
  it("Invalidar formatos", () => {
    const foto = { name: "objeto.png", type: "image/pdf" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);

    expect(objeto.validarFoto()).toEqual("Formato de imagen no permitido");
  });


  //Santiago
  it("Deberia retornar un mensaje de confirmacion detallado cuando el registro es exitoso", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.ValidacionFinal()).toEqual("Registro exitoso. ¡Guardado correctamente!");
  });

  it("Deberia indicar que el registro exitoso esta Pendiente de validacion", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerEstadoValidacion()).toEqual("Pendiente de validación");
  });

  it("Deberia notificar que la publicacion aparecera en el catalogo tras la aprobacion de Bienestar Estudiantil", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerNotificacionCatalogo()).toEqual("Tu publicación aparecerá en el catálogo tras ser aprobada por Bienestar Estudiantil.");
  });

  it("Deberia mostrar las instrucciones para entregar el objeto fisico a Bienestar Estudiantil", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerInstruccionesEntrega()).toEqual("Debes entregar el objeto físico en Bienestar Estudiantil para su custodia y devolución.");
  });

  it("Deberia retornar la ubicacion exacta y las pautas de entrega de Bienestar Estudiantil", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerUbicacionYPautasEntrega()).toEqual(
      "Ubicación: Oficina de Bienestar Estudiantil, Planta Baja del Edificio Principal. Pautas: Acercarse de lunes a viernes de 08:30 a 16:00 con el objeto físico y el comprobante del sistema."
    );
  });

  it("Deberia retornar una lista con los objetos disponibles en el sistema", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario", foto);
    ObjetoPerdido.registrarEnGaleria(objeto);
    const lista = ObjetoPerdido.obtenerGaleriaObjects();
    expect(lista).toContain(objeto);
  });

  it("Deberia retornar los datos esenciales para la tarjeta (nombre, fotografia, ubicacion, fecha y categoria)", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerDatosTarjeta()).toEqual({
      nombre: "Laptop",
      categoria: "Tecnologia",
      fecha: "2026-10-14",
      lugar: "Bloque A",
      foto: foto
    });
  });

  it("Deberia retornar la informacion detallada y completa del objeto para su consulta", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerDetalleCompleto()).toEqual({
      nombre: "Laptop",
      categoria: "Tecnologia",
      fecha: "2026-10-14",
      hora: "20:30",
      lugar: "Bloque A",
      commentario: "Comentario adicional",
      foto: foto
    });
  });
});