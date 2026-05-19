/* =============================================
   NUBERU — galeria.js
   Interacciones de la página galería
   ============================================= */

// --------------------------------------------------
// 1. LOGO EN BARRA INFERIOR
//
// En esta página no hay hero, así que el logo
// de la barra siempre está visible (controlado
// por la clase .barra-logo--visible en HTML).
// No necesitamos lógica de scroll para ocultarlo.
// --------------------------------------------------

// --------------------------------------------------
// 2. ANIMACIÓN DE ENTRADA: RED DE ARTISTAS
//
// Las tarjetas de artistas aparecen con un leve
// fade+slide al entrar en el viewport.
// --------------------------------------------------
(function () {
    const cards = document.querySelectorAll('.gal-artista-card');

    if (!cards.length || !('IntersectionObserver' in window)) return;

    // Estado inicial: oculto
    cards.forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.5s ease ' + (i * 0.07) + 's, transform 0.5s ease ' + (i * 0.07) + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(function (card) {
        observer.observe(card);
    });
})();


// --------------------------------------------------
// 3. ANIMACIÓN DE ENTRADA: SECCIONES PRINCIPALES
//
// Fade+slide suave para los bloques principales
// al hacer scroll.
// --------------------------------------------------
(function () {
    const bloques = document.querySelectorAll(
        '.gal-expo__texto, .gal-artista__texto, .gal-red__cabecera, .gal-programa__texto'
    );

    if (!bloques.length || !('IntersectionObserver' in window)) return;

    bloques.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    bloques.forEach(function (el) {
        observer.observe(el);
    });
})();