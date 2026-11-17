class Autenticacion {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  iniciarSesion(correo, contrasena) {
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
