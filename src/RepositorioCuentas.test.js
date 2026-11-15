import RepositorioCuentas from './RepositorioCuentas';

describe('RepositorioCuentas', () => {
  it('Deberia crear un repositorio de cuentas', () => {
    const repositorio = new RepositorioCuentas();
    expect(repositorio.cuentas).toEqual([]);
  });
})