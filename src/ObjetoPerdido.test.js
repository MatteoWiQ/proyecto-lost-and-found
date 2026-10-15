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
    expect(objeto.getInformacion()).toEqual("Laptop, Tecnologia");
  });
  it("registrar categorias validas", () => {
    const objeto = new ObjetoPerdido("Documento", "Cualquier Cosa");
    expect(objeto.getInformacion()).toEqual("No existe esa categoria");
  });


});
