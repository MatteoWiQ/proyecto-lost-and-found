import Cuenta from './Cuenta';


describe("Crear cuenta", () => {
  it("Construir cuenta con correo", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo");

    expect(cuenta.obtenerCorreo()).toBe("juan@ucb.edu.bo");
  });

});