# Backlog — ISOFT-LOST-AND-FOUND

**Proyecto:** LAF  
**Tablero Jira:** https://isoft-lost-and-found.atlassian.net/jira/software/projects/LAF/boards/1/backlog  
**Sprint 1:** `INGENIER Sprint 1` — 12/10/2026 → 22/10/2026

> Enfoque del Sprint 1: **registro de reportes de objetos + catálogo + búsqueda/filtros**.
> Los usuarios (cuenta, login, logout) se abordan **después**.
> En el Sprint 1 el registro se hace con un **usuario simulado/fijo**; se reemplaza por login real cuando entren las HU de usuarios.

## Sprint 1 (8 HU)

| Key | HU | Origen |
|-----|----|--------|
| LAF-2 | HU-01 Registrar datos principales del objeto | 3.1.4 |
| LAF-3 | HU-02 Registro de fotografía del objeto | 3.1.5 |
| LAF-4 | HU-03 Confirmación de envío e instrucciones iniciales | 3.1.6 |
| LAF-5 | HU-04 Visualizar catálogo/galería de objetos | 3.1.7 |
| LAF-6 | HU-05 Buscar por texto libre e identificadores | 3.1.8 |
| LAF-7 | HU-06 Filtrar por categoría y zonas/aulas | 3.1.9 |
| LAF-8 | HU-07 Aprobar publicación | 3.1.15 |
| LAF-9 | HU-08 Consultar ficha técnica completa | 3.1.11 |

---

## LAF-2 · HU-01 Registrar datos principales del objeto (3.1.4)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Registrar los datos principales de un objeto encontrado dentro de la universidad.  
**Para:** Facilitar su identificación y ayudar a que su propietario lo recupere.

**Criterios de aceptación:**
- Solo los usuarios con sesión activa pueden registrar un objeto encontrado. *(Sprint 1: se implementa con un usuario simulado/fijo; se reemplaza por login real cuando entren las HU de usuarios).*
- El formulario debe permitir ingresar el nombre del objeto y seleccionar su categoría, fecha, hora y lugar del hallazgo.
- El nombre, la categoría, la fecha, la hora y el lugar deben ser obligatorios.
- El nombre del objeto debe aceptar hasta 100 caracteres. Si se supera este límite, el sistema debe mostrar un mensaje de validación.
- Las categorías disponibles deben incluir al menos: Tecnología, Documentos, Cuadernos, Ropa y Varios.
- No se debe permitir registrar una fecha y hora de hallazgo posterior al momento actual.
- El lugar debe permitir seleccionar una zona, bloque o facultad de la universidad.
- El formulario debe permitir indicar un aula, piso o sector específico y agregar una referencia adicional, por ejemplo: "Mesa de la cafetería".
- Si falta un dato obligatorio o existe un dato inválido, el sistema debe indicar qué debe corregirse y conservar la información ya ingresada.
- Al enviar un reporte válido, el sistema debe guardar los datos y asignarle el estado "Pendiente de validación".
- El reporte debe permanecer fuera del catálogo de objetos disponibles hasta que Bienestar Estudiantil lo apruebe.

## LAF-3 · HU-02 Registro de fotografía del objeto (3.1.5)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Adjuntar una fotografía del objeto encontrado.  
**Para:** Facilitar que otras personas puedan reconocerlo e identificarlo.

**Criterios de aceptación:**
- El formulario debe permitir adjuntar una fotografía del objeto encontrado.
- El usuario debe poder visualizar una vista previa de la imagen antes de registrar el objeto.
- El sistema debe aceptar formatos de imagen comunes como JPG, JPEG y PNG, WEBP o HEIC (para celulares).
- Si la imagen no es válida, se debe mostrar un mensaje de error.
- La fotografía registrada debe mostrarse posteriormente en la publicación del objeto.

## LAF-4 · HU-03 Confirmación de envío e instrucciones iniciales (3.1.6)

**Como:** Miembro de la comunidad universitaria que reporta un objeto encontrado.  
**Quiero:** Recibir una confirmación del envío y conocer los pasos que debo seguir.  
**Para:** Saber que el reporte fue registrado y cómo entregar el objeto a Bienestar Estudiantil.

**Criterios de aceptación:**
- Cuando el reporte se guarde correctamente, el sistema debe mostrar un mensaje de confirmación.
- El mensaje debe indicar que el reporte se encuentra "Pendiente de validación".
- Se debe informar que la publicación aparecerá en el catálogo después de ser aprobada por Bienestar Estudiantil.
- Se debe indicar que el objeto debe entregarse a Bienestar Estudiantil para su custodia y posterior devolución.
- El usuario debe poder consultar la ubicación y las instrucciones de entrega a Bienestar.
- Si el reporte no pudo guardarse, el sistema debe mostrar un mensaje de error y no presentar una confirmación de envío exitoso.

## LAF-5 · HU-04 Visualizar catálogo/galería de objetos (3.1.7)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Poder visualizar todos los objetos perdidos del sistema.  
**Para:** Tener una vista de los objetos perdidos.

**Criterios de aceptación:**
- El sistema debe mostrar una lista o galería de los objetos disponibles.
- Cada objeto debe mostrar como mínimo nombre, fotografía, ubicación, fecha y categoría.
- Los objetos deben poder seleccionarse para consultar su información completa.
- La lista debe actualizarse cuando se registre o cambie el estado de un objeto.

## LAF-6 · HU-05 Buscar por texto libre e identificadores (3.1.8)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Buscar objetos mediante texto libre o identificadores registrados.  
**Para:** Encontrar con mayor facilidad una pertenencia que pueda corresponder a la que perdí.

**Criterios de aceptación:**
- El catálogo debe incluir una barra de búsqueda por texto.
- La barra debe indicar claramente que permite buscar por nombre del objeto, nombre de una persona o identificadores registrados, cuando estos datos estén disponibles.
- La búsqueda debe encontrar coincidencias en la información registrada de los objetos visibles en el catálogo.
- Las diferencias entre mayúsculas y minúsculas no deben impedir encontrar coincidencias.
- La búsqueda debe poder combinarse con los filtros de categoría y ubicación.
- Si no existen coincidencias, el sistema debe mostrar un mensaje indicando que no se encontraron objetos.
- Si el usuario borra el texto de búsqueda, deben volver a mostrarse los objetos que cumplan los filtros que continúen activos.

## LAF-7 · HU-06 Filtrar por categoría y zonas/aulas (3.1.9)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Filtrar los objetos por categoría y por la zona o aula donde fueron encontrados.  
**Para:** Reducir los resultados y localizar más fácilmente mi pertenencia.

**Criterios de aceptación:**
- El catálogo debe permitir seleccionar una categoría como filtro.
- El catálogo debe permitir seleccionar una ubicación registrada, incluyendo zonas, bloques y aulas cuando estén disponibles.
- Los filtros deben poder aplicarse individualmente o en conjunto.
- Cuando se apliquen varios filtros, solo deben mostrarse los objetos que cumplan todas las condiciones seleccionadas.
- Los resultados deben actualizarse sin necesidad de recargar manualmente la página.
- Los filtros seleccionados deben permanecer visibles para que el usuario sepa qué condiciones está aplicando.
- Si no existen objetos que cumplan las condiciones, el sistema debe mostrar un mensaje indicando que no se encontraron resultados.

## LAF-8 · HU-07 Aprobar publicación (3.1.15)

**Como:** Administrador del sistema.  
**Quiero:** Poder validar publicaciones de objetos perdidos hechos por un miembro universitario.  
**Para:** Poder administrar las publicaciones que se realizan.

**Criterios de aceptación:**
- El personal administrativo debe poder visualizar las publicaciones pendientes de validación.
- Cada publicación debe mostrar la información registrada por el usuario.
- Debe existir un botón o acción para aprobar la publicación.
- Una publicación aprobada debe hacerse visible en el catálogo de objetos.

## LAF-9 · HU-08 Consultar ficha técnica completa (3.1.11)

**Como:** Miembro de la comunidad universitaria.  
**Quiero:** Poder visualizar toda la información de un objeto perdido.  
**Para:** Poder tener una mejor vista y comprobar si es el objeto que busco.

**Criterios de aceptación:**
- Al seleccionar un objeto, el sistema debe mostrar su información completa.
- La información debe incluir nombre, fotografía, categoría, fecha, hora y lugar del hallazgo.
- También debe mostrar el estado actual del objeto.
- La información debe mostrarse de forma clara y fácil de interpretar.
- El usuario debe poder regresar al catálogo de objetos.

---

## Fuera del Sprint 1 (van al Sprint 2)

- 3.1.1 Crear cuenta con correo académico
- 3.1.2 Iniciar sesión
- 3.1.3 Cerrar sesión
- 3.1.10 Limpiar filtros y restablecer catálogo
- 3.1.12 Visualizador de fotografía con zoom
- 3.1.13 Ver ubicación y referencias de Bienestar
- 3.1.14 Ver instrucciones y requisitos de reclamo
- 3.1.16 Rechazar publicaciones
- 3.1.17 Registrar entrega al propietario
- 3.1.18 Cambiar estado del objeto a "Entregado"
- 3.1.19 Confirmación de registro de devolución
- 3.1.20 Ver contadores y métricas básicas
- 3.1.21 Actualización de estadísticas en tiempo real
