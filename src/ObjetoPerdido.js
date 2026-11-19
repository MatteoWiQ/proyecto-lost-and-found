import configuracionBienestar from "./configuracionBienestar.js";

const categorias = ["Tecnologia", "Ropa", "Documentos", "Cuadernos", "Varios"];
const lugares = ["Bloque A", "Bloque B", "Biblioteca", "Canchas", "Cafetería", "Facultad de Tecnología"];
const extensionesImagenPermitidas = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg"];
const tiposPorFormato = {
    jpg: ["image/jpeg", "image/jpg"],
    jpeg: ["image/jpeg", "image/jpg"],
    png: ["image/png"],
    gif: ["image/gif"],
    bmp: ["image/bmp"],
    tiff: ["image/tiff"],
    svg: ["image/svg+xml"],
};
class ObjetoPerdido{
    constructor(nombre,categoria,fecha, hora, lugar, Comentario, foto){
        this.nombre = nombre;
        this.categoria = categoria;
        this.fecha = fecha;
        this.hora = hora;
        this.lugar = lugar;
        this.Comentario = Comentario;
        this.foto = foto;
        this.estado = "Pendiente de validación";
    }
    obtenerNombre(){
        const error = this.validarNombre();
        return error !== "" ? error : this.nombre;
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
        const error = this.validarCategoria();
        return error !== "" ? error : this.categoria;
    }
    validarCategoria(){
        if(!categorias.includes(this.categoria)){
            return "No existe esa categoria";
        }
        return "";
    }
    obtenerFecha(){
        const error = this.validarFecha();
        return error !== "" ? error : this.fecha;
    }
    validarFecha(){
        if (this.fecha === "") {
            return "La fecha es obligatoria";
        }
        const errorDia = this.validarDia();
        if (errorDia !== "") {
            return errorDia;
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
        const error = this.validarHora();
        return error !== "" ? error : this.hora;
    }
    validarFormatoHora(hora){
        return /^(\d{2}):(\d{2})$/.exec(hora);
    }
    validarMinuto(minuto){
        if (minuto > 59) {
            return "La hora no esta en formato correcto";
        }
        return "";
    }
    validarHoraHora(hora){
        if(hora<6 || hora>22){
            return "La hora esta fuera de rango";
        }
        return "";
    }
    validarHora(){
        if (this.hora === "") {
            return "La hora es obligatoria";
        }
        const formatoHora = this.validarFormatoHora(this.hora);
        if (!formatoHora) {
            return "La hora no esta en formato correcto";
        }
        const hora = Number(formatoHora[1]);
        const minuto = Number(formatoHora[2]);
        const errorMinuto = this.validarMinuto(minuto);
        if (errorMinuto !== "") {
            return errorMinuto;
        }
        const errorHora = this.validarHoraHora(hora);
        if (errorHora !== "") {
            return errorHora;
        }
        const fechaHora = new Date(`${this.fecha}T${this.hora}`);
        const ahora = new Date();
        if (fechaHora > ahora) {
            return "No se permiten horas futuras";
        }
        return "";
    }

    obtenerLugar(){
        const error = this.validarLugar();
        return error !== "" ? error : this.lugar;
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
    obtenerComentario(){
        return this.Comentario;
    }

    obtenerFoto(){
        const error = this.validarFoto();
        return error !== "" ? error : this.foto;
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
    validarInformacion() {
        const validadores = [
            () => this.validarNombre(),
            () => this.validarCategoria(),
            () => this.validarFecha(),
            () => this.validarHora(),
            () => this.validarLugar(),
            () => this.validarFoto()
        ];
        for (const validador of validadores) {
            const mensaje = validador();
            if (mensaje !== "") {
                return mensaje;
            }
        }
        return "";
    }
    obtenerInformacion() {
        const error = this.validarInformacion();
        if (error !== "") {
            return error;
        }
        return `${this.nombre}, ${this.categoria}, ${this.fecha}, ${this.hora}, ${this.lugar}, ${this.Comentario}`;
    }
    ValidacionFinal(){
        const error = this.validarInformacion();
        if (error !== "") {
            return `Registro fallido: ${error}`;
        }
        return "Registro exitoso. ¡Guardado correctamente!";
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
            Comentario: this.Comentario,
            foto: this.foto,
            estado: this.estado,
            motivoRechazo: this.motivoRechazo
        };
    }

    aprobar() {
        this.estado = "Publicado";
    }

    rechazar(motivo = "") {
        this.estado = "Rechazado";
        this.motivoRechazo = motivo;
    }

    obtenerMotivoRechazo() {
        return this.motivoRechazo;
    }

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
        return "Ubicación: " + configuracionBienestar.ubicacion + ". Pautas: Acercarse de " + configuracionBienestar.horario + " con el objeto físico y el comprobante del sistema.";
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
            Comentario: this.Comentario,
            foto: this.foto
        };
    }
}

export default ObjetoPerdido;
