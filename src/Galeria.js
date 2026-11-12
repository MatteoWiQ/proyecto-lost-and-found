

import ObjetoPerdido from "./ObjetoPerdido.js";

class Galeria{
    constructor() {
        this.galeria = [];
    }
    registrarEnGaleria(objeto) {
        this.galeria.push(objeto);
    }
    obtenerGaleriaObjects() {
        return this.galeria;
    }
    obtenerMensajeGaleriaVacia() {
        if (this.galeria.length === 0) {
            return "No hay objetos disponibles";
        }
        return "";
    }
}

export default Galeria;