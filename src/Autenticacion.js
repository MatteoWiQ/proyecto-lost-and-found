class Autenticacion {
  constructor(repositorio, almacenamiento = null) {
    this.repositorio = repositorio;
    this.almacenamiento = almacenamiento;
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
    if (this.almacenamiento) {
      this.almacenamiento.setItem("sesion", JSON.stringify({
        correo: cuenta.correo,
        nombre: cuenta.nombre,
        rol: cuenta.rol
      }));
    }
    return cuenta;
  }
}

export default Autenticacion;
