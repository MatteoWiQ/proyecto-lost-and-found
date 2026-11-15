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
  it("Validar no vacios", () => {
    const cuenta = new Cuenta("");

    expect(cuenta.obtenerCorreo()).toBe("El correo es obligatorio");
  });
  it("Crear cuenta con contrasena", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo","123456abc!2");

    expect(cuenta.ValidarCuenta()).toBe("Cuenta creada con exito");
  });
  it("Validar contrasena no vacia", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo","");

    expect(cuenta.ValidarCuenta()).toBe("Contraseña es obligatoria");
  });
  it("Validar contrasena caracteres", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo","123456");

    expect(cuenta.ValidarCuenta()).toBe("La contraseña debe tener al menos 8 caracteres");
  });


});