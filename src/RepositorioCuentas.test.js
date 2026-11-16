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

})