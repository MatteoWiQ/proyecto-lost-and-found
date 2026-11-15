import Cuenta from './Cuenta';


describe("Crear cuenta", () => {
  it("Construir cuenta con correo", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo");

    expect(cuenta.obtenerCorreo()).toBe("juan@ucb.edu.bo");
  });
  it("Validar correo de la ucb", () => {
    const cuenta = new Cuenta("juan@ugmail.com");

    expect(cuenta.obtenerCorreo()).toBe("No es un correo de la UCB");
  });
  it("Validar no vacios", () => {
    const cuenta = new Cuenta("");

    expect(cuenta.obtenerCorreo()).toBe("El correo es obligatorio");
  });

});