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
    expect(objeto.getInformacion()).toEqual("Documento, Tecnologia, 2026-10-14, 10:30");
  });
  it("Registrar hora obligatoria", () => {
    const objeto = new ObjetoPerdido("Documento", "Tecnologia", "2026-10-14", "");
    expect(objeto.getInformacion()).toEqual("La hora es obligatoria");
  });




});
