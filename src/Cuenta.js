

class Cuenta {
  constructor(correo,contrasena, confirmarContrasena,rol="miembro de la comunidad") {
    this.correo = correo;
    this.contrasena = contrasena;
    this.confirmarContrasena = confirmarContrasena;
    this.rol = rol;
  }
  validarCorreoVacio(){
    if (this.correo === "") {
      return "El correo es obligatorio";
    }
    return "";
  }
  validarCorreoFormato() {
    if (!this.correo.endsWith("@ucb.edu.bo")) {
      return "No es un correo de la UCB";
    }
    return "";
  }
  validarCorreo() {
    const errores=[
      this.validarCorreoVacio(),
      this.validarCorreoFormato()]
    return errores.find((e) => !!e) || "";
  }
  obtenerCorreo() {
    const error = this.validarCorreo();
    if (error) {
      return error;
    }
    return this.correo.toLowerCase();
  }
  validarContrasenaVacio() {
    if (this.contrasena === "") {
      return "Contraseña es obligatoria";
    }
    return "";
  }
  validarContrasenaLongitud() {
    if (this.contrasena.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    return "";
  }
  validarContrasenaConfirmacion() {
    if (this.contrasena !== this.confirmarContrasena) {
      return "Las contraseñas no coinciden";
    }
    return "";
  }
  obtenerContrasena() {
    return this.contrasena;
  }
  validarContrasena() {
    const errores = [
      this.validarContrasenaVacio(),
      this.validarContrasenaLongitud(),
      this.validarContrasenaConfirmacion()
    ];
    return errores.find((e) => !!e) || ""; 
  }
  ValidarCuenta(){
    const errores = [
      this.validarCorreo(),
      this.validarContrasena()
    ];
    const error = errores.find((e) => !!e);
    if (error) {
      return error;
    }
    return "Cuenta creada con exito";
  }
  
}
export default Cuenta;