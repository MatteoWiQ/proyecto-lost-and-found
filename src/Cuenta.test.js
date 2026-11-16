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
  it("Validar correo sin mayusculas", () => {
    const cuenta = new Cuenta("JUAN@ucb.edu.bo");

    expect(cuenta.obtenerCorreo()).toBe("juan@ucb.edu.bo");
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
    const cuenta = new Cuenta("juan@ucb.edu.bo", "123456abc!2", "123456abc!2", "Juan Pérez");

    expect(cuenta.ValidarCuenta()).toBe("Cuenta creada con exito");
    expect(cuenta.obtenerNombre()).toBe("Juan Pérez");
  });
  it("Validar contrasena no vacia", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo", "", "", "Juan");

    expect(cuenta.ValidarCuenta()).toBe("Contraseña es obligatoria");
  });
  it("Validar contrasena caracteres", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo", "123456", "123456", "Juan");

    expect(cuenta.ValidarCuenta()).toBe("La contraseña debe tener al menos 8 caracteres");
  });
  it("Confirmar contrasena error", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo", "123456abc!2", "12abc!2", "Juan");
    expect(cuenta.ValidarCuenta()).toBe("Las contraseñas no coinciden");
  });
  it("Rechazar un nombre vacio", () => {
    const cuenta = new Cuenta("juan@ucb.edu.bo", "123456abc!2", "123456abc!2", " ");

    expect(cuenta.ValidarCuenta()).toBe("El nombre es obligatorio");
  });
  it("Aceptar dominio institucional sin distinguir mayusculas", () => {
    const cuenta = new Cuenta("JUAN@UCB.EDU.BO", "123456abc!2", "123456abc!2", "Juan");

    expect(cuenta.ValidarCuenta()).toBe("Cuenta creada con exito");
    expect(cuenta.obtenerCorreo()).toBe("juan@ucb.edu.bo");
  });
  it("Rechazar una cuenta con correo no institucional", () => {
    const cuenta = new Cuenta("juan@gmail.com", "123456abc!2", "123456abc!2", "Juan");

    expect(cuenta.ValidarCuenta()).toBe("No es un correo de la UCB");
  });


});