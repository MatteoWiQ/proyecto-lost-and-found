

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];

class ObjetoPerdido{
    constructor(nombre,categoria){
        this.nombre = nombre;
        this.categoria = categoria;
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
    getInformacion(){
        let message="";
        if (this.validarNombre()!=""){
            message = this.validarNombre();
        }
        else if (this.validarCategoria()!=""){
            message += this.validarCategoria();
        }
        return message === "" ? this.getNombre() + ", " + this.getCategoria() : message;
    }
}

export default ObjetoPerdido;