const cards = Array.from(document.querySelectorAll('.video-card')); // Convierte todas las tarjetas de vídeo a un array para poder usar métodos como .filter()
const videoCards = cards.filter(card => card.dataset.type !== 'link'); // Filtra las tarjetas que no son enlaces externos, solo las que tienen vídeo
const modal = document.getElementById('modal'); 
const iframe = document.getElementById('modal-iframe');
const modalTitulo = document.getElementById('modal-titulo');
const botonCerrar = document.getElementById('modal-cerrar');
const botonPrev = document.getElementById('modal-prev'); 
const botonNext = document.getElementById('modal-next'); 

// Contenedores YouTube y TikTok
const youtubeContenedor = document.getElementById('modal-youtube');
const tiktokContenedor = document.getElementById('modal-tiktok');
const tiktokImg = document.getElementById('modal-tiktok-img');
const tiktokBtn = document.getElementById('modal-tiktok-btn');

let indiceActual = 0; // Guarda la posición del vídeo que está abierto en el modal, empieza en 0 (el primero)

// Genera miniaturas automáticas para YouTube
cards.forEach(card => { // Recorre todas las tarjetas
    if (card.dataset.type === 'youtube') { // Solo actúa en las tarjetas de tipo YouTube
        const img = card.querySelector('img');
        img.src = `https://img.youtube.com/vi/${card.dataset.id}/hqdefault.jpg`; // Asigna la miniatura automática de YouTube usando el id del vídeo
    }
});

// Abre el modal con el vídeo del índice indicado
function abrirModal(indice) {
    indiceActual = indice;
    const card = videoCards[indiceActual]; // Obtiene la tarjeta correspondiente al índice
    const type = card.dataset.type; // Lee el tipo de vídeo: 'youtube' o 'tiktok'
    const id = card.dataset.id; // Lee el id del vídeo para construir la URL
    const titulo = card.dataset.titulo || ''; // Lee el título del vídeo, o cadena vacía si no tiene

    modalTitulo.textContent = titulo;

    if (type === 'youtube') {
        // Muestra YouTube, oculta TikTok
        youtubeContenedor.classList.remove('oculto');
        tiktokContenedor.classList.remove('activo');
        iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&origin=${window.location.origin}`; // Carga el vídeo de YouTube con autoplay activado y sin vídeos relacionados al terminar

    } else if (type === 'tiktok') {
        // Muestra TikTok, oculta YouTube
        youtubeContenedor.classList.add('oculto');
        tiktokContenedor.classList.add('activo');
        iframe.src = ''; // Vacía el iframe para que no siga reproduciendo nada en segundo plano

        // Miniatura: usa la img de la tarjeta
        const thumbSrc = card.querySelector('img').src; // Obtiene la URL de la miniatura de la tarjeta
        tiktokImg.src = thumbSrc; // Asigna esa miniatura a la imagen del modal

        // Enlace directo al vídeo en TikTok
        tiktokBtn.href = card.dataset.url || `https://www.tiktok.com/video/${id}`; // Asigna la URL del vídeo al botón, usando data-url si existe o construyéndola con el id
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Bloquea el scroll de la página mientras el modal está abierto
}

// Cierra el modal y detiene el vídeo
function cerrarModal() {
    modal.classList.remove('show');
    iframe.src = ''; // Vacía el src del iframe para detener la reproducción del vídeo
    tiktokContenedor.classList.remove('activo');
    youtubeContenedor.classList.remove('oculto');
    document.body.style.overflow = ''; // Restaura el scroll de la página
}

// Navega al vídeo anterior
function irPrev() {
    indiceActual = (indiceActual - 1 + videoCards.length) % videoCards.length; // Resta 1 al índice, y si llega a -1 vuelve al último vídeo (navegación circular)
    abrirModal(indiceActual);
}

// Navega al vídeo siguiente
function irNext() {
    indiceActual = (indiceActual + 1) % videoCards.length; // Suma 1 al índice, y si supera el último vídeo vuelve al primero (navegación circular)
    abrirModal(indiceActual);
}

// Click en cada tarjeta
cards.forEach((card) => {
    card.addEventListener('click', function () {
        if (card.dataset.type === 'link') { // Si la tarjeta es de tipo enlace externo
            window.open(card.dataset.url, '_blank'); // Abre la URL en una pestaña nueva sin abrir el modal
        } else {
            const videoIndex = videoCards.indexOf(card); // Busca la posición de esta tarjeta dentro del array de vídeos
            abrirModal(videoIndex);
        }
    });
});

// Botón cerrar
botonCerrar.addEventListener('click', cerrarModal);

// Flechas
botonPrev.addEventListener('click', irPrev);
botonNext.addEventListener('click', irNext);

// Click fuera del contenido cierra el modal
modal.addEventListener('click', function (e) {
    if (e.target === modal) cerrarModal(); // Si el click es directamente sobre el overlay (fondo oscuro) y no sobre el contenido, cierra el modal
});

// Teclas: Escape cierra, flechas navegan
document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('show')) return; // Si el modal no está abierto no hace nada
    if (e.key === 'Escape') cerrarModal(); // La tecla Escape cierra el modal
    if (e.key === 'ArrowLeft') irPrev(); // La flecha izquierda va al vídeo anterior
    if (e.key === 'ArrowRight') irNext(); // La flecha derecha va al vídeo siguiente
});