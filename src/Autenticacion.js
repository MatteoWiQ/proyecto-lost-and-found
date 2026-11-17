class Autenticacion {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  iniciarSesion(correo, contrasena) {
    if (!correo.toLowerCase().endsWith("@ucb.edu.bo")) {
      return {
        exito: false,
        mensaje: "Debe usar su correo institucional"
      };
    }
    const cuenta = this.repositorio.buscarCuenta(correo, contrasena);
    if (!cuenta) {
      return {
        exito: false,
        mensaje: "Correo o contraseña incorrectos"
      };
    }
    return cuenta;
  }
}

export default Autenticacion;
