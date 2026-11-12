
import Galeria from "./Galeria";
import ObjetoPerdido from "./ObjetoPerdido";
describe("Galeria", () => {
  it("Deberia retornar un mensaje amigable cuando la galeria esta vacia", () => {
     const galeria = new Galeria();
    expect(galeria.obtenerMensajeGaleriaVacia()).toEqual("No hay objetos disponibles");
  });
  it("Deberia registrar el objeto automaticamente en la galeria cuando pasa la validacion exitosa", () => {
    const foto = { name: "objeto.jpg", type: "image/jpg" };
    const galeria = new Galeria();
    const objeto = new ObjetoPerdido("Reloj", "Tecnologia", "2026-10-14", "20:30", "Bloque A", "Reloj de pulsera", foto);
    if (objeto.ValidacionFinal() === "Registro exitoso. ¡Guardado correctamente!") {
      galeria.registrarEnGaleria(objeto);
    }
    expect(galeria.obtenerGaleriaObjects()).toContain(objeto);
  });
})