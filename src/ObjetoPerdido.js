

class ObjetoPerdido{
    constructor(nombre){
        this.nombre = nombre;
    }
    getNombre(){
        if(this.nombre === ""){
            return "nombre obligatorio";
        }
        return this.nombre;
    }
}

export default ObjetoPerdido;