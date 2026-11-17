import Autenticacion from "./Autenticacion";
import Cuenta from "./Cuenta";
import RepositorioCuentas from "./RepositorioCuentas";

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
});
