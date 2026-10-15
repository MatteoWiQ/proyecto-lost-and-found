

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];

class ObjetoPerdido{
    constructor(nombre,categoria,fecha){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
    }
    getNombre(){
        if (this.validarNombre()!=""){
            return this.validarNombre();
        }
        return this.nombre;
    }
    validarNombre(){
        if(this.nombre === ""){
            return "nombre obligatorio";
        }
        if (this.nombre.length > 100){
            return "Cantidad de caracteres no es valida";
        }
        return "";
    }
    getCategoria(){
        if(this.validarCategoria()!=""){
            return this.validarCategoria();
        }
        return this.categoria;
    }
    validarCategoria(){
        if(!categorias.includes(this.categoria)){
            return "No existe esa categoria";
        }
        return "";
    }
    getFecha(){
        return this.fecha;
    }
    getInformacion(){
        let message="";
        if (this.validarNombre()!=""){
            message = this.validarNombre();
        }
        else if (this.validarCategoria()!=""){
            message += this.validarCategoria();
        }
        return message === "" ? this.getNombre() + ", " + this.getCategoria() + ", " + this.fecha : message;
    }
}

export default ObjetoPerdido;