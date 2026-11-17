
import Cuenta from "./Cuenta.js";

let mapaCuentas = new Map();
class RepositorioCuentas {
    constructor() {
        this.cuentas = [];
    }
    agregarCuenta(cuenta) {
        if (this.cuentas.some((cuentaExistente) => cuentaExistente.correo === cuenta.correo)) {
            return "Error, la cuenta ya existe";
        }
        this.cuentas.push(cuenta);
    }

    buscarCuenta(correo, contrasena) {
        return this.cuentas.find((cuenta) =>
            cuenta.correo === correo && cuenta.contrasena === contrasena
        );
    }

}
export default RepositorioCuentas;
