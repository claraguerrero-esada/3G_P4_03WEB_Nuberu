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
//   líneas del botón en una X mediante CSS puro
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
    if (!hero) return;
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
// 3. MAPA: TOOLTIPS EN MOBILE (TAP)
//
// Cómo funciona:
// - En desktop el :hover de CSS ya gestiona los tooltips
// - En mobile no existe hover, así que escuchamos
//   touchstart para añadir la clase .activo al punto
// - Tap en cualquier otro sitio cierra todos los tooltips
// - También se gestiona la activación con teclado
//   (Enter y Espacio) para accesibilidad
// --------------------------------------------------
const puntos = document.querySelectorAll('.mapa-punto');

puntos.forEach(function (punto) {

    // Accesibilidad: activar con teclado
    punto.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            puntos.forEach(function (p) {
                if (p !== punto) p.classList.remove('activo');
            });
            punto.classList.toggle('activo');
        }
    });

    // Mobile: tap activa el tooltip
    punto.addEventListener('touchstart', function (e) {
        e.stopPropagation(); // evita que el tap llegue al document
        puntos.forEach(function (p) {
            if (p !== punto) p.classList.remove('activo');
        });
        punto.classList.toggle('activo');
    }, { passive: true });

});

// Tap fuera de cualquier punto cierra todos los tooltips
document.addEventListener('touchstart', function () {
    puntos.forEach(function (p) { p.classList.remove('activo'); });
}, { passive: true });