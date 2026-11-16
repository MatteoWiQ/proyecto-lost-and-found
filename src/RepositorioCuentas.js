
import Cuenta from "./Cuenta.js";
class RepositorioCuentas {
    constructor() {
        this.cuentas = [];
    }
    agregarCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }
}
export default RepositorioCuentas;