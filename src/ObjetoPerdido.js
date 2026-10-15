

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];
const lugares = ["Bloque A", "Bloque B", "Biblioteca", "Canchas", "Cafetería", "Facultad de Tecnología"];
class ObjetoPerdido{
    constructor(nombre,categoria,fecha, hora, lugar, commentario){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
        this.hora = hora;
        this.lugar = lugar;
        this.commentario = commentario;
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
        if(this.validarHora()!=""){
            return this.validarHora();
        }
        return this.hora;
    }
    validarHora(){
        if (this.hora === "") {
            return "La hora es obligatoria";
        }
        const [hora, minuto] = this.hora.split(":").map(Number);
        if (isNaN(hora) || isNaN(minuto)) {
            return "La hora no esta en formato correcto";
        }
        if (hora < 6 || hora > 22) {
            return "La hora esta fuera de rango";
        }
        const fechaHora = new Date(`${this.fecha}T${this.hora}`);
        const ahora = new Date();
        if (fechaHora > ahora) {
            return "No se permiten horas futuras";
        }
        return "";
    }

    getLugar(){
        if(this.validarLugar()!=""){
            return this.validarLugar();
        }
        return this.lugar;
    }
    validarLugar(){
        if (this.lugar === "") {
            return "El lugar es obligatorio";
        }
        if (!lugares.includes(this.lugar)) {
            return "El lugar no existe";
        }
        return "";
    }
    getCommentario(){
        return this.commentario;
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
        else if (this.validarHora()!=""){
            message += this.validarHora();
        }
        else if (this.validarLugar()!=""){
            message += this.validarLugar();
        }
        return message === "" ? this.getNombre()
         + ", " + this.getCategoria() 
         + ", " + this.getFecha() 
         + ", " + this.getHora()
         + ", " + this.getLugar()
         + ", " + this.getCommentario() : message;
    }
    ValidacionFinal(){
        if(this.getInformacion() === this.getNombre()
         + ", " + this.getCategoria() 
         + ", " + this.getFecha() 
         + ", " + this.getHora()
         + ", " + this.getLugar()
         + ", " + this.getCommentario()){
            return "Registro exitoso";
        }
        return "Registro fallido";
    }
}

export default ObjetoPerdido;