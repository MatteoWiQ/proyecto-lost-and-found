import ObjetoPerdido from "./ObjetoPerdido.js";

describe("ObjetoPerdido", () => {
  it("deberia crear una instancia con el nombre proporcionado", () => {
    const objeto = new ObjetoPerdido("Laptop");
    expect(objeto.obtenerNombre()).toEqual("Laptop");
  });
  it("deberia haber un nombre obligatoriamente", () => {
    const objeto = new ObjetoPerdido("");
    expect(objeto.obtenerNombre()).toEqual("nombre obligatorio");
  });
  it("nombre registrable", () => {
    const nombre="a".repeat(101);
    const objeto = new ObjetoPerdido(nombre,"Tecnologia");
    expect(objeto.obtenerInformacion()).toEqual("Cantidad de caracteres no es valida");
  });
  it("registrar categoria", () => {
    const objeto = new ObjetoPerdido("Laptop","Tecnologia");
    expect(objeto.obtenerNombre()+", "+objeto.obtenerCategoria()).toEqual("Laptop, Tecnologia");
  });
  it("registrar categorias validas", () => {
    const objeto = new ObjetoPerdido("Documento", "Cualquier Cosa");
    expect(objeto.obtenerInformacion()).toEqual("No existe esa categoria");
  });
  it("Registrar fecha", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14");
    expect(objeto.obtenerNombre()+", "+objeto.obtenerCategoria()+", "+objeto.obtenerFecha()).toEqual("Documento, Tecnologia, 2026-10-14");
  });
  it("Registrar fecha obligatoria", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "");
    expect(objeto.obtenerInformacion()).toEqual("La fecha es obligatoria");
  });
  it("Registrar fecha futura invalido", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2028-10-10");
    expect(objeto.obtenerInformacion()).toEqual("La fecha no puede ser futura");
  });
  it("Registrar fecha invalido", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "10-1023-2020");
    expect(objeto.obtenerInformacion()).toEqual("La fecha no puede ser incorrecta");
  });
  it("Registrar hora", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "10:30");
    expect(objeto.obtenerNombre()+", "+objeto.obtenerCategoria()+", "+objeto.obtenerFecha()+", "+objeto.obtenerHora()).toEqual("Documento, Tecnologia, 2026-10-14, 10:30");
  });
  it("Registrar hora obligatoria", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "");
    expect(objeto.obtenerInformacion()).toEqual("La hora es obligatoria");
  });
  it("Invalidar hora fuera de rango", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "23:40");
    expect(objeto.obtenerInformacion()).toEqual("La hora esta fuera de rango");
  });
  it("Invalidar horas incorrectas", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "223340");
    expect(objeto.obtenerInformacion()).toEqual("La hora no esta en formato correcto");
  });
  // it("Invalidar horas futuras", () => {
  //   const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-16", "10:30", "Bloque A");
  //   expect(objeto.obtenerInformacion()).toEqual("No se permiten horas futuras");
  // });
  it("Registrar Lugar", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A");
    expect(objeto.obtenerNombre()+", "+objeto.obtenerCategoria()+", "+objeto.obtenerFecha()+", "+objeto.obtenerHora()+", "+objeto.obtenerLugar()).toEqual("Documento, Tecnologia, 2026-10-14, 20:30, Bloque A");
  });
  it("Lugar Obligatorio", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "");
    expect(objeto.obtenerInformacion()).toEqual("El lugar es obligatorio");
  });
   it("Validar Lugares invalidos", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Parque");
    expect(objeto.obtenerInformacion()).toEqual("El lugar no existe");
  });
  it("Aceptar comentarios adicionales", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);
    expect(objeto.obtenerInformacion()).toEqual("Documento, Tecnologia, 2026-10-14, 20:30, Bloque A, Comentario adicional");
  });
  it("Mensaje de error", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Parque");
    expect(objeto.ValidacionFinal()).toEqual("Registro fallido: El lugar no existe");
  });
  it("acepta una imagen JPG", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Comentario adicional", foto);

    expect(objeto.obtenerFoto()).toEqual(foto);
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


  it("Deberia iniciar con estado Pendiente de validacion", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia");
    expect(objeto.obtenerEstado()).toEqual("Pendiente de validación");
  });

  it("Deberia cambiar a estado Publicado al aprobarse", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia");
    objeto.aprobar();
    expect(objeto.obtenerEstado()).toEqual("Publicado");
  });

  it("Deberia retornar la ficha tecnica con el estado actual del objeto", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-15", "10:30", "Biblioteca", "Rayada", "laptop.png");

    const ficha = objeto.obtenerFichaTecnica();

    expect(ficha.estado).toEqual("Pendiente de validación");
  });
});