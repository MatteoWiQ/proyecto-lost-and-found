
const CUENTA_ADMIN_DEMO = {
    correo: "admin.demo@ucb.edu.bo",
    contrasena: "AdminDemo123!",
    nombre: "Administrador Demo",
    rol: "administrador"
};

class RepositorioCuentas {
    constructor(almacenamiento = null) {
        this.almacenamiento = almacenamiento;
        this.cuentas = this.cargarCuentas();
    }

    cargarCuentas() {
        if (!this.almacenamiento) return [];
        const cuentasGuardadas = this.almacenamiento.getItem("cuentas");
        const cuentas = cuentasGuardadas ? JSON.parse(cuentasGuardadas) : [];
        if (!cuentas.some((cuenta) => cuenta.correo === CUENTA_ADMIN_DEMO.correo)) {
            cuentas.push(CUENTA_ADMIN_DEMO);
            this.almacenamiento.setItem("cuentas", JSON.stringify(cuentas));
        }
        return cuentas;
    }

    guardarCuentas() {
        if (this.almacenamiento) {
            this.almacenamiento.setItem("cuentas", JSON.stringify(this.cuentas));
        }
    }

    agregarCuenta(cuenta) {
        if (this.cuentas.some((cuentaExistente) => cuentaExistente.correo === cuenta.correo)) {
            return "Error, la cuenta ya existe";
        }
        const cuentaGuardada = {
            correo: cuenta.correo,
            contrasena: cuenta.contrasena,
            nombre: cuenta.nombre,
            rol: cuenta.rol
        };
        this.cuentas.push(this.almacenamiento ? cuentaGuardada : cuenta);
        this.guardarCuentas();
    }

    buscarCuenta(correo, contrasena) {
        return this.cuentas.find((cuenta) =>
            cuenta.correo === correo && cuenta.contrasena === contrasena
        );
    }

}
export default RepositorioCuentas;
