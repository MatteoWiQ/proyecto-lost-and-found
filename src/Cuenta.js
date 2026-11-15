

class Cuenta {
  constructor(correo) {
    this.correo = correo;
  }
  validarCorreo() {
    if (!this.correo.endsWith("@ucb.edu.bo")) {
      return "No es un correo de la UCB";
    }
    return "";
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