history.scrollRestoration = 'manual'; // Evita que el navegador intente restaurar la posición de scroll automáticamente al cargar la página

const BotonIz = document.querySelector('.menu-iz .ninja'); 
const BotonDer = document.querySelector('.menu-der .maleta');
const contacto = document.querySelector('.contacto');
const experiencia = document.querySelector('.experiencia');
const explorarBtn = document.getElementById('explorar-btn');
const sobreMi = document.querySelector('.descripcion h2');
const spanAbajo = document.querySelector('.descripcion .abajo');
const h1Trabajo2 = document.querySelector('.trabajo2 .seccion-titulo .trabajo-link h1');
const flechaTrabajo2 = document.querySelector('.trabajo2 .flecha');
const expProfesional = document.querySelector('.experiencia li:first-child');
const tituloExperiencia = document.querySelector('.experiencia-titulo');
const habilidades = document.querySelector('.experiencia li:nth-child(3)');
const capacidades = document.querySelector('.capacidades');
const experienciaLis = document.querySelectorAll('.experiencia li');
const contactoLis = document.querySelectorAll('.contacto li');

// Interacción para mostrar/ocultar el menú de contacto
BotonIz.addEventListener('click', function (evento) {
    evento.stopPropagation(); // Evita que el clic se propague al documento
    contacto.classList.toggle('show'); // Alterna la clase 'show' para mostrar u ocultar el menú de contacto
    experiencia.classList.remove('show'); // Asegura que el menú de experiencia se cierre si se abre el de contacto
});

// Interacción similar para el botón de experiencia
BotonDer.addEventListener('click', function (evento) {
    evento.stopPropagation();
    experiencia.classList.toggle('show');
    contacto.classList.remove('show');
});

// Cerrar ambos menús si se hace clic fuera de ellos
document.addEventListener('click', function (evento) {
    // Verifica que el clic no sea dentro de los menús
    if (!evento.target.closest('.menu-iz') && !evento.target.closest('.menu-der')) { 
        contacto.classList.remove('show');
        experiencia.classList.remove('show');
    }
});

// Interacción para mostrar/ocultar p.adicional en li de contacto
contactoLis.forEach(li => {
    li.addEventListener('click', function (evento) {
        evento.stopPropagation();
        // Solo para li que tienen p.adicional
        if (li.querySelector('p.adicional')) {
            // Quitar 'show' de todos los li
            contactoLis.forEach(otherLi => otherLi.classList.remove('show'));
            // Agregar 'show' al li clicado
            li.classList.add('show');
        }
    });
});

// Cerrar todos los p cuando se salga del menu de contacto
contacto.addEventListener('mouseleave', function () {
    contactoLis.forEach(li => li.classList.remove('show'));
});

// Botón vuelta: scroll suave hasta el inicio de la pagina
explorarBtn?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplaza suavemente hasta la parte superior de la página
});

// Click en h2 de descripcion lleva al span.abajo
sobreMi?.addEventListener('click', function () {
    spanAbajo.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplaza suavemente hasta el span.abajo, alineándolo al inicio del contenedor visible
});

// Interacción para rotar la flecha al pasar el mouse sobre el h1 de trabajo2
// Array con los dos eventos y el valor de rotación correspondiente
const rotaciones = [
    { evento: 'mouseenter', valor: 'rotate(-90deg)' }, // Rota la flecha 90 grados en sentido antihorario al pasar el mouse
    { evento: 'mouseleave', valor: 'rotate(0deg)' }    // Vuelve a la posición original cuando el mouse sale del h1
];

rotaciones.forEach(({ evento, valor }) => {
    h1Trabajo2?.addEventListener(evento, () => {
        flechaTrabajo2.style.transform = valor;
    });
});

// Array con los pares origen → destino para el scroll con offset del header
// Calcula la posición teniendo en cuenta la altura del header para que no quede oculto
const scrollLinks = [
    { origen: expProfesional, destino: tituloExperiencia }, // Click en el primer li lleva al título de experiencia
    { origen: habilidades, destino: capacidades } // Click en el tercer li lleva a la sección de capacidades
];

scrollLinks.forEach(({ origen, destino }) => {
    origen.addEventListener('click', function () {
        const headerAltura = document.querySelector('header').offsetHeight;
        const posicion = destino.getBoundingClientRect().top + window.scrollY - headerAltura;
        window.scrollTo({ top: posicion, behavior: 'smooth' }); // Desplaza suavemente hasta la posición calculada
    });
});

// Cerrar el menú de experiencia al hacer clic en cualquier li dentro de él
experienciaLis.forEach(li => {
    li.addEventListener('click', function () {
        experiencia.classList.remove('show'); // Cierra el menú de experiencia al hacer clic en cualquier li dentro de él
    });
});