import Autenticacion from "./Autenticacion";
import Cuenta from "./Cuenta";
import RepositorioCuentas from "./RepositorioCuentas";

function crearAlmacenamiento() {
  const datos = new Map();
  return {
    setItem: (clave, valor) => datos.set(clave, valor),
    getItem: (clave) => datos.get(clave) || null
  };
}

describe("Autenticacion", () => {
  it("deberia iniciar sesion con credenciales validas", () => {
    const repositorio = new RepositorioCuentas();
    const cuenta = new Cuenta(
      "juan@ucb.edu.bo", "123456789", "123456789", "Juan"
    );
    repositorio.agregarCuenta(cuenta);
    const autenticacion = new Autenticacion(repositorio);

    expect(autenticacion.iniciarSesion("juan@ucb.edu.bo", "123456789")).toEqual(cuenta);
  });

  it("deberia ocultar cual credencial es incorrecta", () => {
    const autenticacion = new Autenticacion(new RepositorioCuentas());

    expect(autenticacion.iniciarSesion("juan@ucb.edu.bo", "incorrecta")).toEqual({
      exito: false,
      mensaje: "Correo o contraseña incorrectos"
    });
  });

  it("deberia rechazar correos fuera del dominio institucional", () => {
    const autenticacion = new Autenticacion(new RepositorioCuentas());

    expect(autenticacion.iniciarSesion("juan@gmail.com", "123456789")).toEqual({
      exito: false,
      mensaje: "Debe usar su correo institucional"
    });
  });

  it("deberia guardar una sesion sin la contrasena", () => {
    const repositorio = new RepositorioCuentas();
    repositorio.agregarCuenta(new Cuenta(
      "juan@ucb.edu.bo", "123456789", "123456789", "Juan"
    ));
    const almacenamiento = crearAlmacenamiento();
    const autenticacion = new Autenticacion(repositorio, almacenamiento);

    autenticacion.iniciarSesion("juan@ucb.edu.bo", "123456789");

    expect(almacenamiento.getItem("sesion")).toContain("juan@ucb.edu.bo");
    expect(almacenamiento.getItem("sesion")).not.toContain("123456789");
  });
});
