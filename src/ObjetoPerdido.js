

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];

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
        if(!this.validarCategoria()){
            return "No existe esa categoria";
        }
        return this.categoria;
    }
    validarCategoria(){
        if(categorias.includes(this.categoria)){
            return true;
        }
    }
    getInformacion(){
        let message="";
        if (this.getNombre() === "nombre obligatorio"){
            message = "nombre obligatorio";
        }
        else if (this.getCategoria() === "No existe esa categoria"){
            message += "No existe esa categoria";
        }
        return message === "" ? this.getNombre() + ", " + this.getCategoria() : message;
    }
}

export default ObjetoPerdido;