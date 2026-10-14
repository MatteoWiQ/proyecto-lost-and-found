

class ObjetoPerdido{
    constructor(nombre,categoria){
        this.nombre = nombre;
        this.categoria = categoria;
    }
    getNombre(){
        if(this.nombre === ""){
            return "nombre obligatorio";
        }
        return this.nombre;
    }
    getCategoria(){
        return this.categoria;
    }
    getInformacion(){
        return this.nombre + ", " + this.categoria;
    }
}

export default ObjetoPerdido;