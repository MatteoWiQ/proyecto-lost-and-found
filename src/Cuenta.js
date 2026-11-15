

class Cuenta {
  constructor(correo,contrasena) {
    this.correo = correo;
    this.contrasena = contrasena;
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
    return this.correo;
  }
  ValidarCuenta(){
    if (this.obtenerCorreo() !== "" && this.contrasena !== "") {
      return "Cuenta creada con exito";
    }
  }
  
}
export default Cuenta;