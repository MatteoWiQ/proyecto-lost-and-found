import Administrador from "./Administrador.js";
import ObjetoPerdido from "./ObjetoPerdido.js";

describe("Administrador", () => {
  let pendiente;
  let publicado;
  let objetos;
  const administrador = new Administrador();

  beforeEach(() => {
    pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();
    objetos = [pendiente, publicado];
  });

  it("Deberia listar solo las publicaciones pendientes de validacion", () => {
    expect(administrador.obtenerPendientes(objetos)).toEqual([pendiente]);
  });

  it("Deberia aprobar una publicacion y dejarla en estado Publicado", () => {
    administrador.aprobarPublicacion(pendiente);

    expect(pendiente.obtenerEstado()).toEqual("Publicado");
  });

  it("Deberia mostrar un mensaje cuando no hay publicaciones pendientes", () => {
    expect(administrador.obtenerMensajePendientes([])).toEqual("No hay publicaciones pendientes");
  });

  it("Deberia poder hacer lo mismo que un usuario, como buscar objetos", () => {
    expect(administrador.buscarObjetos(objetos, "chaqueta")).toEqual([publicado]);
  });

  it("Deberia rechazar una publicacion y eliminarla de los pendientes", () => {
    administrador.rechazarPublicacion(pendiente, "Reporte duplicado");

    expect(pendiente.obtenerEstado()).toEqual("Rechazado");
    expect(pendiente.obtenerMotivoRechazo()).toEqual("Reporte duplicado");
    expect(administrador.obtenerPendientes(objetos)).toEqual([]);
  });
});
