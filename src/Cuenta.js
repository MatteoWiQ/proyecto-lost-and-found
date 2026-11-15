

class Cuenta {
  constructor(correo) {
    this.correo = correo;
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
  
}
export default Cuenta;