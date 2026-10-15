

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];

class ObjetoPerdido{
    constructor(nombre,categoria,fecha, hora){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
        this.hora = hora;
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
        if(this.validarFecha()!=""){
            return this.validarFecha();
        }
        return this.fecha;
    }
    validarFecha(){
        if (this.fecha === "") {
            return "La fecha es obligatoria";
        }
        else if (this.validarDia() != "") {
            return this.validarDia();
        }
        return "";
    }
    
    validarDia(){
        let fecha = new Date(this.fecha);
        let hoy = new Date();
        if (fecha > hoy) {
            return "La fecha no puede ser futura";
        }
        else if (isNaN(fecha.getTime())) {
            return "La fecha no puede ser incorrecta";
        }
        return "";
    }
    getHora(){
        return this.hora;
    }
    
    getInformacion(){
        let message="";
        if (this.validarNombre()!=""){
            message = this.validarNombre();
        }
        else if (this.validarCategoria()!=""){
            message += this.validarCategoria();
        }
        else if (this.validarFecha()!=""){
            message += this.validarFecha();
        }
        return message === "" ? this.getNombre() + ", " + this.getCategoria() + ", " + this.getFecha() + ", " + this.getHora() : message;
    }
}

export default ObjetoPerdido;