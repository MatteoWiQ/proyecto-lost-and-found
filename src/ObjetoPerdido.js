const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];
const lugares = ["Bloque A", "Bloque B", "Biblioteca", "Canchas", "Cafetería", "Facultad de Tecnología"];
const extensionesImagenPermitidas = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg"];
class ObjetoPerdido{
    constructor(nombre,categoria,fecha, hora, lugar, commentario, foto){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
        this.hora = hora;
        this.lugar = lugar;
        this.commentario = commentario;
        this.foto = foto;
        this.estado = "Pendiente de validación";
    }
    obtenerNombre(){
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
    obtenerCategoria(){
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
    obtenerFecha(){
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
    validarNoFuturo(){
        let fecha = new Date(this.fecha);
        let hoy = new Date();
        if (fecha > hoy) {
            return "La fecha no puede ser futura";
        }
        return "";
    }
    validarDia(){
        const errorFechaFutura = this.validarNoFuturo();
        if (errorFechaFutura !== "") {
            return errorFechaFutura;
        }
        const fecha = new Date(this.fecha);
        if (this.validarFormatoTiempo(fecha)) {
            return "La fecha no puede ser incorrecta";
        }
        return "";
    }
    validarFormatoTiempo(fecha){
        return isNaN(fecha.getTime())
    }
    obtenerHora(){
        if(this.validarHora()!=""){
            return this.validarHora();
        }
        return this.hora;
    }
    validarHora(){
        if (this.hora === "") {
            return "La hora es obligatoria";
        }
        const formatoHora = /^(\d{2}):(\d{2})$/.exec(this.hora);
        if (!formatoHora) {
            return "La hora no esta en formato correcto";
        }
        const hora = Number(formatoHora[1]);
        const minuto = Number(formatoHora[2]);
        if (minuto > 59) {
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

    obtenerLugar(){
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
    obtenerCommentario(){
        return this.commentario;
    }

    obtenerFoto(){
        if(this.validarFoto()!=""){
            return this.validarFoto();
        }
        return this.foto;
    }
    ValidarFotoNombre(nombreFoto){
        if (typeof nombreFoto !== "string") {
            return "Formato de imagen no permitido";
        }
        return "";
    }
    ValidarFotoExtension(extension){
        if (!extensionesImagenPermitidas.includes(extension)) {
            return "Formato de imagen no permitido";
        }
        return "";
    }
    ValidarFotoTipo(extension){
        if (typeof this.foto === "object" && this.foto.type) {
            const tiposPorFormato = {
                jpg: ["image/jpeg", "image/jpg"],
                jpeg: ["image/jpeg", "image/jpg"],
                png: ["image/png"],
                gif: ["image/gif"],
                bmp: ["image/bmp"],
                tiff: ["image/tiff"],
                svg: ["image/svg+xml"],
            };

            if (!tiposPorFormato[extension]?.includes(this.foto.type.toLowerCase())) {
                return "Formato de imagen no permitido";
            }
        }
        return "";
    }
    validarFoto(){
        const nombreFoto = typeof this.foto === "string" ? this.foto : this.foto?.name;
        const mensajeValidarFotoNombre = this.ValidarFotoNombre(nombreFoto);
        if (mensajeValidarFotoNombre !== "") {
            return mensajeValidarFotoNombre;
        }
        const extension = nombreFoto.split(".").pop().toLowerCase();
        const mensajeValidarFotoExtension = this.ValidarFotoExtension(extension);
        if (mensajeValidarFotoExtension !== "") {
            return mensajeValidarFotoExtension;
        }
        const mensajeValidarFotoTipo = this.ValidarFotoTipo(extension);
        if (mensajeValidarFotoTipo !== "") {
            return mensajeValidarFotoTipo;
        }
        return "";
    }
    obtenerInformacion(){
        let mensaje="";
        if (this.validarNombre()!=""){
            mensaje += this.validarNombre();
        }
        else if (this.validarCategoria()!=""){
            mensaje += this.validarCategoria();
        }
        else if (this.validarFecha()!=""){
            mensaje += this.validarFecha();
        }
        else if (this.validarHora()!=""){
            mensaje += this.validarHora();
        }
        else if (this.validarLugar()!=""){
            mensaje += this.validarLugar();
        }
        else if (this.validarFoto()!=""){
            mensaje += this.validarFoto();
        }
        return mensaje === "" ? this.obtenerNombre()
         + ", " + this.obtenerCategoria() 
         + ", " + this.obtenerFecha() 
         + ", " + this.obtenerHora()
         + ", " + this.obtenerLugar()
         + ", " + this.obtenerCommentario()
          : mensaje;
    }
    ValidacionFinal(){
        if(this.obtenerInformacion() === this.obtenerNombre()
         + ", " + this.obtenerCategoria() 
         + ", " + this.obtenerFecha() 
         + ", " + this.obtenerHora()
         + ", " + this.obtenerLugar()
         + ", " + this.obtenerCommentario()
         && this.validarFoto() === ""){
            return "Registro exitoso. ¡Guardado correctamente!";
        }
        return "Registro fallido: "+ this.obtenerInformacion();
    }

    obtenerEstado() {
        return this.estado;
    }

    obtenerFichaTecnica() {
        return {
            nombre: this.nombre,
            categoria: this.categoria,
            fecha: this.fecha,
            hora: this.hora,
            lugar: this.lugar,
            commentario: this.commentario,
            foto: this.foto,
            estado: this.estado
        };
    }

    aprobar() {
        this.estado = "Publicado";
    }

    //Santiago
    obtenerEstadoValidacion() {
        return "Pendiente de validación";
    }
    obtenerNotificacionCatalogo() {
        return "Tu publicación aparecerá en el catálogo tras ser aprobada por Bienestar Estudiantil.";
    }
    obtenerInstruccionesEntrega() {
        return "Debes entregar el objeto físico en Bienestar Estudiantil para su custodia y devolución.";
    }
    obtenerUbicacionYPautasEntrega() {
        return "Ubicación: Oficina de Bienestar Estudiantil, Planta Baja del Edificio Principal. Pautas: Acercarse de lunes a viernes de 08:30 a 16:00 con el objeto físico y el comprobante del sistema.";
    }

    
    obtenerDatosTarjeta() {
        return {
            nombre: this.nombre,
            categoria: this.categoria,
            fecha: this.fecha,
            lugar: this.lugar,
            foto: this.foto
        };
    }

    obtenerDetalleCompleto() {
        return {
            nombre: this.nombre,
            categoria: this.categoria,
            fecha: this.fecha,
            hora: this.hora,
            lugar: this.lugar,
            commentario: this.commentario,
            foto: this.foto
        };
    }
}

export default ObjetoPerdido;
