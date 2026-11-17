
class RepositorioCuentas {
    constructor(almacenamiento = null) {
        this.almacenamiento = almacenamiento;
        this.cuentas = this.cargarCuentas();
    }

    cargarCuentas() {
        if (!this.almacenamiento) return [];
        const cuentasGuardadas = this.almacenamiento.getItem("cuentas");
        return cuentasGuardadas ? JSON.parse(cuentasGuardadas) : [];
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
