/* =============================================
   NUBERU — main.js
   Interacciones de la landing page
   ============================================= */


// --------------------------------------------------
// 1. MENÚ HAMBURGUESA
//
// Cómo funciona:
// - Al hacer click en el botón hamburguesa se añade
//   la clase .menu-abierto al <body>
// - Esa clase activa el overlay y transforma las
//   líneas del botón en una X mediante css puro
// - Se bloquea el scroll del body mientras está abierto
// --------------------------------------------------
const btnMenu     = document.getElementById('btnMenu');
const menuOverlay = document.getElementById('menuOverlay');

btnMenu.addEventListener('click', function () {
    const abierto = document.body.classList.toggle('menu-abierto');
    btnMenu.setAttribute('aria-expanded', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
});

// Cerrar al hacer click en un enlace del menú
menuOverlay.querySelectorAll('.menu-item').forEach(function (item) {
    item.addEventListener('click', function () {
        document.body.classList.remove('menu-abierto');
        document.body.style.overflow = '';
        btnMenu.setAttribute('aria-expanded', 'false');
    });
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-abierto')) {
        document.body.classList.remove('menu-abierto');
        document.body.style.overflow = '';
        btnMenu.setAttribute('aria-expanded', 'false');
    }
});


// --------------------------------------------------
// 2. SCROLL: logo del hero → barra inferior
//
// Cómo funciona:
// - Al superar el 70% del alto del hero con el scroll,
//   se añade .reducido al logo grande (desaparece)
//   y .visible al logo de la barra (aparece)
// - Usamos requestAnimationFrame para no bloquear
//   el hilo principal durante el scroll
// --------------------------------------------------
const heroLogo  = document.getElementById('heroLogo');
const barraLogo = document.getElementById('barraLogo');
const hero      = document.getElementById('hero');

function gestionarScroll() {
    // Guard: si no hay hero en esta página, no hacer nada
    if (!hero || !heroLogo || !barraLogo) return;

    const umbral = hero.offsetHeight * 0.7;

    if (window.scrollY > umbral) {
        heroLogo.classList.add('reducido');
        barraLogo.classList.add('visible');
    } else {
        heroLogo.classList.remove('reducido');
        barraLogo.classList.remove('visible');
    }
}

// Throttle con requestAnimationFrame: ejecuta la función
// como máximo una vez por frame de repintado (~60 veces/seg)
let tickScroll = false;
window.addEventListener('scroll', function () {
    if (!tickScroll) {
        requestAnimationFrame(function () {
            gestionarScroll();
            tickScroll = false;
        });
        tickScroll = true;
    }
}, { passive: true });

// Ejecutar al cargar por si el usuario llega con scroll
gestionarScroll();


// --------------------------------------------------
// 3. MAPA: TOOLTIPS EN MOBILE (TAP) + POSICIONAMIENTO
//
// Cómo funciona:
// - Los tooltips se extraen del .mapa-punto y se
//   mueven al body con position: fixed para que
//   aparezcan sobre cualquier otro elemento
// - En desktop el :hover activa el tooltip
// - En mobile touchstart activa el tooltip
// - Se calcula la posición del tooltip dinámicamente
//   respecto al punto del mapa
// --------------------------------------------------
const puntos = document.querySelectorAll('.mapa-punto');
const tooltipsMovidos = new Map(); // Almacenar tooltips movidos
let tooltipTimeout = null; // Para evitar flickering

// Mover tooltips al body
puntos.forEach(function (punto) {
    const tooltip = punto.querySelector('.mapa-tooltip');

    if (tooltip) {
        // Clonar el tooltip y moverlo al body
        const tooltipClonado = tooltip.cloneNode(true);
        document.body.appendChild(tooltipClonado);
        tooltipsMovidos.set(punto, tooltipClonado);

        // Remover el tooltip original del punto
        tooltip.remove();

        // Nota: NO añadimos listeners sobre el tooltip clonado. Mantener
        // los tooltips como `pointer-events: none` evita que intercepten
        // el cursor y provoquen parpadeos; la visibilidad se controla
        // únicamente desde los eventos del punto.
    }

    // Accesibilidad: activar con teclado
    punto.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();

            // Limpiar timeout anterior
            if (tooltipTimeout) clearTimeout(tooltipTimeout);

            // Desactivar todos los tooltips
            tooltipsMovidos.forEach(function (tooltip) {
                tooltip.classList.remove('activo');
            });

            // Activar el tooltip del punto actual
            const tooltipActual = tooltipsMovidos.get(punto);
            if (tooltipActual) {
                tooltipActual.classList.add('activo');
                posicionarTooltip(punto, tooltipActual);
            }
        }
    });

    // Desktop: hover activa el tooltip
    punto.addEventListener('mouseenter', function (e) {
        // Comprobar distancia desde el cursor al centro del punto para evitar activaciones
        const rectCheck = punto.getBoundingClientRect();
        const centerX = rectCheck.left + rectCheck.width / 2;
        const centerY = rectCheck.top + rectCheck.height / 2;
        const clientX = (e && e.clientX) ? e.clientX : (window.event && window.event.clientX) || centerX;
        const clientY = (e && e.clientY) ? e.clientY : (window.event && window.event.clientY) || centerY;

        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const hoverRadius = parseInt(punto.getAttribute('data-hover-radius') || '40', 10) || 40; // px
        if (dist > hoverRadius) {
            // Ignorar la activación si el cursor no está suficientemente cerca del punto
            return;
        }

        // Limpiar timeout anterior (en caso de que estuviera esperando para desactivar)
        if (tooltipTimeout) clearTimeout(tooltipTimeout);

        // Desactivar todos los tooltips
        tooltipsMovidos.forEach(function (tooltip) {
            tooltip.classList.remove('activo');
        });

        // Activar el tooltip del punto actual
        const tooltipActual = tooltipsMovidos.get(punto);
        if (tooltipActual) {
            tooltipActual.classList.add('activo');
            posicionarTooltip(punto, tooltipActual);
        }
    });

    punto.addEventListener('mouseleave', function () {
        const tooltipActual = tooltipsMovidos.get(punto);
        if (tooltipActual) {
            // Pequeño delay para evitar flickering si el cursor pasa sobre el tooltip
            tooltipTimeout = setTimeout(function () {
                tooltipActual.classList.remove('activo');
            }, 120);
        }
    });

    // Mobile: tap activa el tooltip
    punto.addEventListener('touchstart', function (e) {
        e.stopPropagation();

        // Comprobar distancia en touch (si hay coordenadas)
        const touch = e.touches && e.touches[0];
        if (touch) {
            const rectCheck = punto.getBoundingClientRect();
            const centerX = rectCheck.left + rectCheck.width / 2;
            const centerY = rectCheck.top + rectCheck.height / 2;
            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const hoverRadius = parseInt(punto.getAttribute('data-hover-radius') || '40', 10) || 40; // px
            if (dist > hoverRadius) {
                // Ignorar si el touch está demasiado lejos
                return;
            }
        }

        // Limpiar timeout anterior
        if (tooltipTimeout) clearTimeout(tooltipTimeout);

        // Desactivar todos los tooltips
        tooltipsMovidos.forEach(function (tooltip) {
            tooltip.classList.remove('activo');
        });

        // Activar el tooltip del punto actual
        const tooltipActual = tooltipsMovidos.get(punto);
        if (tooltipActual) {
            tooltipActual.classList.add('activo');
            posicionarTooltip(punto, tooltipActual);
        }
    }, { passive: true });

});

// Tap fuera de cualquier punto cierra todos los tooltips
document.addEventListener('touchstart', function () {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    tooltipsMovidos.forEach(function (tooltip) {
        tooltip.classList.remove('activo');
    });
}, { passive: true });

// Reposicionar tooltips al hacer resize/scroll
window.addEventListener('scroll', function () {
    tooltipsMovidos.forEach(function (tooltip, punto) {
        if (tooltip.classList.contains('activo')) {
            posicionarTooltip(punto, tooltip);
        }
    });
}, { passive: true });

window.addEventListener('resize', function () {
    tooltipsMovidos.forEach(function (tooltip, punto) {
        if (tooltip.classList.contains('activo')) {
            posicionarTooltip(punto, tooltip);
        }
    });
});


// Función para calcular la posición del tooltip (definida después para visibilidad)
function posicionarTooltip(punto, tooltip) {
    const rect = punto.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight || 340;
    const tooltipWidth = tooltip.offsetWidth || 220;
    const padding = 12;

    const irHaciaAbajo = punto.classList.contains('punto-abajo');

    // Permitir un ajuste manual por punto usando data-tooltip-shift (en px)
    const shift = parseInt(punto.getAttribute('data-tooltip-shift') || '0', 10) || 0;

    let top, left;

    if (irHaciaAbajo) {
        top = rect.bottom + padding + shift;
    } else {
        top = rect.top - tooltipHeight - padding - shift;
    }

    left = rect.left + (rect.width / 2) - (tooltipWidth / 2);

    // Ajustar si se sale por los bordes
    if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
    }
    if (left < padding) { left = padding; }
    if (top < padding) { top = rect.bottom + padding; }

    tooltip.style.position = 'fixed';
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    // Mantener por debajo del overlay de menú (z-index:10000)
    tooltip.style.zIndex = '9999';
    // No forzamos pointer-events aquí: lo controla la clase .activo en CSS
}
