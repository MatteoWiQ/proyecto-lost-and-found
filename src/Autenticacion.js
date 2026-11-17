class Autenticacion {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  iniciarSesion(correo, contrasena) {
    return this.repositorio.buscarCuenta(correo, contrasena);
  }
}

export default Autenticacion;
