
import Cuenta from "./Cuenta.js";

let mapaCuentas = new Map();
class RepositorioCuentas {
    constructor() {
        this.cuentas = [];
    }
    agregarCuenta(cuenta) {
        if (mapaCuentas.has(cuenta.email)) {
            return "Error, la cuenta ya existe";
        }
        mapaCuentas.set(cuenta.email, cuenta);
        this.cuentas.push(cuenta);
    }

}
export default RepositorioCuentas;