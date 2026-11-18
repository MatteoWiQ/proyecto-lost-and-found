import RepositorioCuentas from './RepositorioCuentas';
import Cuenta from './Cuenta';
describe('RepositorioCuentas', () => {
  it('Deberia crear un repositorio de cuentas', () => {
    const repositorio = new RepositorioCuentas();
    expect(repositorio.cuentas).toEqual([]);
  });
  it('Deberia agregar una cuenta al repositorio ', () => {
    const repositorio = new RepositorioCuentas();
    const cuenta = new Cuenta('1', 'John Doe', 'john.doe@example.com');
    repositorio.agregarCuenta(cuenta);
    expect(repositorio.cuentas).toContain(cuenta);
  });
  it('Invalidar cuentas repetidas', () => {
    const repositorio = new RepositorioCuentas();
    const cuenta = new Cuenta('john.doe@example.com', '123456789', '123456789');
    const cuentaRepetida = new Cuenta('john.doe@example.com', '123456789', '123456789');
    repositorio.agregarCuenta(cuenta);
    repositorio.agregarCuenta(cuentaRepetida);
    expect(repositorio.agregarCuenta(cuentaRepetida)).toBe("Error, la cuenta ya existe");
  });

  it('Deberia encontrar una cuenta por correo y contrasena', () => {
    const repositorio = new RepositorioCuentas();
    const cuenta = new Cuenta('juan@ucb.edu.bo', '123456789', '123456789', 'Juan');
    repositorio.agregarCuenta(cuenta);

    expect(repositorio.buscarCuenta('juan@ucb.edu.bo', '123456789')).toBe(cuenta);
  });

  it('Deberia recuperar cuentas desde el almacenamiento', () => {
    const datos = new Map();
    const almacenamiento = {
      setItem: (clave, valor) => datos.set(clave, valor),
      getItem: (clave) => datos.get(clave) || null
    };
    const repositorio = new RepositorioCuentas(almacenamiento);
    repositorio.agregarCuenta(new Cuenta(
      'juan@ucb.edu.bo', '123456789', '123456789', 'Juan'
    ));

    const repositorioRecargado = new RepositorioCuentas(almacenamiento);

    expect(repositorioRecargado.buscarCuenta('juan@ucb.edu.bo', '123456789')).toEqual(
      expect.objectContaining({ correo: 'juan@ucb.edu.bo', nombre: 'Juan' })
    );
  });

})
