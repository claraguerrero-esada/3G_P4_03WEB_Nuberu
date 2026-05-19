/* =============================================
   NUBERU — restaurante.js
   Interacciones de la página restaurante:
   1. Tooltips de ingredientes del menú
   2. Tooltips del mapa de proveedores
   ============================================= */


// =============================================
// DATOS DE INGREDIENTES
// Cada ingrediente tiene: color, imagen, campos
// variables y frase poética.
// Los campos que no aplican se omiten (no aparecen).
// =============================================
const INGREDIENTES = {

    // --- HUERTA LA GÜERIA (amarillo) ---
    'tomates-antiguos': {
        color: 'amarillo',
        imagen: 'assets/images/ing-tomate.png',
        campos: {
            'Origen':           'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':      'María Sánchez',
            'Kilómetro':        '1,2 km',
            'Huella hídrica':   '40 litros/kg',
            'Partes usadas':    'Pulpa, piel y semillas',
            'Material de arte': 'Piel deshidratada para papel artesanal',
        },
        frase: '"Este tomate madura en bancales protegidos del viento norte. Su bisabuela ya lo cultivaba así."',
    },

    'cerezas': {
        color: 'amarillo',
        imagen: 'assets/images/ing-cerezas.png',
        campos: {
            'Origen':         'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':    'María Sánchez',
            'Kilómetro':      '1,2 km',
            'Huella hídrica': '700 litros/kg',
            'Variedad':       'Picota asturiana',
            'Partes usadas':  'Fruto y hueso',
        },
        frase: '"Llegan encurtidas. El hueso se tritura y tiñe de rojo el papel de la galería."',
    },

    'puerro': {
        color: 'rosa',
        imagen: 'assets/images/ing-puerro.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Tallo, hoja exterior y raíz',
            'Material de arte': 'Hojas exteriores para cestería y papel vegetal',
        },
        frase: '"Braseado hasta que el azúcar sale solo. La raíz no se tira — se convierte en caldo."',
    },

    'escanda': {
        color: 'rosa',
        imagen: 'assets/images/ing-escanda.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Variedad':    'Escanda asturiana (Triticum dicoccum)',
            'Partes usadas': 'Grano y paja',
            'Material de arte': 'Paja trenzada para marcos y texturas',
        },
        frase: '"El cereal más antiguo de Asturias. Tarda el doble en crecer. Vale cada día."',
    },

    'remolacha': {
        color: 'amarillo',
        imagen: 'assets/images/ing-remolacha.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Raíz, tallo y hojas',
            'Material de arte': 'Jugo para tinte natural en papel y tela',
        },
        frase: '"Su rojo es el más honesto que existe. No engaña al fuego."',
    },

    'guisantes': {
        color: 'rosa',
        imagen: 'assets/images/ing-guisantes.png',
        campos: {
            'Origen':         'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':    'María Sánchez',
            'Kilómetro':      '1,2 km',
            'Huella hídrica': '280 litros/kg',
            'Variedad':       'Guisante lágrima (cosecha de junio)',
            'Partes usadas':  'Grano y vaina',
        },
        frase: '"Solo existen tres semanas al año. Llegamos a la cocina el mismo día que se recogen."',
    },

    'calabacín': {
        color: 'rojo',
        imagen: 'assets/images/ing-calabacin.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Fruto y flor',
        },
        frase: '"La flor de calabacín dura seis horas. Hay que estar a tiempo."',
    },

    'fabes': {
        color: 'amarillo',
        imagen: 'assets/images/ing-fabes.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Variedad':    'Faba asturiana (Phaseolus vulgaris)',
            'Partes usadas': 'Grano tierno y vaina',
        },
        frase: '"Tiernas, sin remojar. El verano tiene prisa y nosotros también."',
    },

    'coliflor': {
        color: 'verde',
        imagen: 'assets/images/ing-coliflor.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Cabeza, hojas y tallo',
            'Material de arte': 'Hojas carbonizadas para pigmento negro',
        },
        frase: '"Asada entera hasta que la superficie se vuelve oscura como la luna."',
    },

    'tirabeques': {
        color: 'amarillo',
        imagen: 'assets/images/ing-tirabeques.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Vaina entera',
        },
        frase: '"Se come todo. La vaina, el grano, el hilo. Nada se separa."',
    },

    'zanahorias': {
        color: 'rosa',
        imagen: 'assets/images/ing-zanahoria.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Raíz y hojas',
            'Material de arte': 'Hojas para tinte amarillo en papel',
        },
        frase: '"Asadas hasta que el azúcar carameliza y la zanahoria se dobla sin romperse."',
    },

    'berenjena': {
        color: 'amarillo',
        imagen: 'assets/images/ing-berenjena.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Partes usadas': 'Fruto y piel',
            'Material de arte': 'Piel ahumada para pigmento gris',
        },
        frase: '"El humo entra por la piel y se queda dentro. Eso es lo que queremos."',
    },

    'fresas': {
        color: 'amarillo',
        imagen: 'assets/images/ing-fresas.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Huella hídrica': '290 litros/kg',
            'Partes usadas': 'Fruto y hoja',
        },
        frase: '"Maceradas en su propio jugo durante cuatro horas. El frío las despierta."',
    },

    'albaricoque': {
        color: 'rojo',
        imagen: 'assets/images/ing-albaricoque.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Variedad':    'Albaricoque de San Castañón',
            'Partes usadas': 'Fruto y hueso',
        },
        frase: '"El hueso tostado tiene un sabor a almendra amarga que no se puede imitar."',
    },

    'aceite-oliva': {
        color: 'rosa',
        imagen: 'assets/images/ing-aceite.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
        },
        frase: '"El único ingrediente que viaja. Lo elegimos por su amargor limpio."',
    },

    // --- BRAÑA VIVA — QUESERÍA (azul) ---
    'requesón-ahumado': {
        color: 'azul',
        imagen: 'assets/images/ing-requeson.png',
        campos: {
            'Origen':           'Braña Viva — Quesería artesana, Cangas de Onís',
            'Productor/a':      'Gervasio Martín',
            'Kilómetro':        '20,3 km',
            'Huella hídrica':   '80 litros/kg',
        },
        frase: '"Suavidad de nube baja en una cuchara. La braña en estado líquido."',
    },

    'gamoneú-joven': {
        color: 'azul',
        imagen: 'assets/images/ing-gamoneú.png',
        campos: {
            'Origen':      'Braña Viva — Quesería artesana, Cangas de Onís',
            'Productor/a': 'Gervasio Martín',
            'Kilómetro':   '20,3 km',
            'Huella hídrica': '80 litros/kg',
            'Partes usadas': 'Pasta y corteza',
            'Material de arte': 'Corteza para pigmento ocre',
        },
        frase: '"Joven, sin cueva todavía. Suave donde el añejo es bravío."',
    },

    'ricotta': {
        color: 'azul',
        imagen: 'assets/images/ing-ricotta.png',
        campos: {
            'Origen':      'Braña Viva — Quesería artesana, Cangas de Onís',
            'Productor/a': 'Gervasio Martín',
            'Kilómetro':   '20,3 km',
        },
        frase: '"Hecha del suero que sobra del Gamonéu. Nada se pierde en la braña."',
    },

    'cuajada': {
        color: 'azul',
        imagen: 'assets/images/ing-cuajada.png',
        campos: {
            'Origen':      'Braña Viva — Quesería artesana, Cangas de Onís',
            'Productor/a': 'Gervasio Martín',
            'Kilómetro':   '20,3 km',
        },
        frase: '"Cuajada del día. Si no llega antes de las diez de la mañana, no hay postre."',
    },

    'nata': {
        color: 'azul',
        imagen: 'assets/images/ing-nata.png',
        campos: {
            'Origen':      'Braña Viva — Quesería artesana, Cangas de Onís',
            'Productor/a': 'Gervasio Martín',
            'Kilómetro':   '20,3 km',
        },
        frase: '"Nata espesa de vaca que pasta en la montaña. El helado no necesita más."',
    },

    // --- MAR CANTÁBRICA — PESCADO (rosa) ---
    'anchoa': {
        color: 'rosa',
        imagen: 'assets/images/ing-anchoa.png',
        campos: {
            'Origen':           'Mar Cantábrica, Llanes',
            'Productor/a':      'Aurora Peláez',
            'Kilómetro':        '20 km',
            'Tipo de pesca':    'Pesca de anzuelo',
            'Partes usadas':    'Cabeza, lomo, piel',
            'Material de arte': 'Espinas para materiales con colágeno',
        },
        frase: '"Un destello de sal y plata. El Cantábrico en un bocado."',
    },

    'merluza': {
        color: 'rosa',
        imagen: 'assets/images/ing-merluza.png',
        campos: {
            'Origen':        'Mar Cantábrica, Llanes',
            'Productor/a':   'Aurora Peláez',
            'Kilómetro':     '20 km',
            'Tipo de pesca': 'Pesca del pincho (anzuelo de línea)',
            'Partes usadas': 'Lomo, collar y espinas',
        },
        frase: '"Del pincho al plato en menos de doce horas. El Cantábrico todavía tiembla."',
    },

    // --- ROXA DE LOS VALLES — GANADERÍA (rojo) ---
    'presa-iberica': {
        color: 'azul',
        imagen: 'assets/images/ing-presa.png',
        campos: {
            'Origen':      'Roxa de los Valles — Ganadería regenerativa, occidente asturiano',
            'Productor/a': 'Familia Rodríguez Álvarez',
            'Kilómetro':   '68 km',
        },
        frase: '"Criada en pasto de montaña. La grasa infiltrada es la firma del tiempo."',
    },

    'pollo': {
        color: 'verde',
        imagen: 'assets/images/ing-pollo.png',
        campos: {
            'Origen':         'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':    'María Sánchez',
            'Kilómetro':      '1,2 km',
            'Tipo de corral': 'Libertad diurna total',
            'Partes usadas':  'Canal entera',
        },
        frase: '"Corre de sol a sol. La carne tiene memoria de movimiento."',
    },

    'gallina': {
        color: 'verde',
        imagen: 'assets/images/ing-gallina.png',
        campos: {
            'Origen':         'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':    'María Sánchez',
            'Kilómetro':      '1,2 km',
            'Tipo de corral': 'Libertad diurna total',
            'Partes usadas':  'Canal entera para caldo',
        },
        frase: '"El caldo de gallina vieja tiene capas. El de pollo joven, solo una."',
    },

    'yema': {
        color: 'verde',
        imagen: 'assets/images/ing-huevo.png',
        campos: {
            'Origen':         'Huerta de La Güeria, Cangas de Onís',
            'Productor/a':    'María Sánchez',
            'Kilómetro':      '1,2 km',
            'Tipo de corral': 'Libertad diurna total',
            'Material de arte': 'Polvo de cáscara para masa de arcilla',
        },
        frase: '"Sol diminuto. La luz que tiñe de amarillo la braña."',
    },

    // --- PUMARADA TÍU LLUIS — SIDRA (naranja) ---
    'sidra': {
        color: 'rosa',
        imagen: 'assets/images/ing-sidra.png',
        campos: {
            'Origen':      'Pumarada Tíu Lluis, Villaviciosa',
            'Productor/a': 'Lluis Fernández',
            'Kilómetro':   '42 km',
            'Variedad':    'Raxao y Durona de Tresali',
        },
        frase: '"Fermentación espontánea. Sin sulfitos, sin mentiras."',
    },

    'sidra-merluza': {
        color: 'naranja',
        imagen: 'assets/images/ing-sidra.png',
        campos: {
            'Origen':      'Pumarada Tíu Lluis, Villaviciosa',
            'Productor/a': 'Lluis Fernández',
            'Kilómetro':   '42 km',
        },
        frase: '"La acidez de la sidra levanta el pescado sin cubrirlo."',
    },

    // --- MONTE CIEGO — SETAS (verde) ---
    'setas': {
        color: 'verde',
        imagen: 'assets/images/ing-setas.png',
        campos: {
            'Origen':               'Monte Ciego, Cangas de Onís',
            'Productor/a':          'Pedro y Marta Hernández',
            'Kilómetro':            '5 km',
            'Modo de recolección':  'Manual, turnos rotatorios por zona',
            'Partes usadas':        'Sombrero, pie y recortes',
        },
        frase: '"Cada zona descansa un mes. El monte tiene su propio turno."',
    },

    // --- MONTE CIEGO — FRUTOS SECOS (rojo) ---
    'avellana': {
        color: 'rojo',
        imagen: 'assets/images/ing-avellana.png',
        campos: {
            'Origen':            'Monte Ciego, Cangas de Onís',
            'Productor/a':       'Pedro y Marta Hernández',
            'Kilómetro':         '5 km',
            'Huella hídrica':    '3.600 litros/kg',
            'Variedad':          'Avellana común asturiana (Corylus avellana)',
            'Partes utilizadas': 'Pulpa y piel tostada',
            'Material de arte':  'Cáscara triturada para texturas y papel',
        },
        frase: '"Cada avellana tarda siete años en dar su primer fruto. La paciencia es su sabor."',
    },

    'almendra': {
        color: 'amarillo',
        imagen: 'assets/images/ing-almendra.png',
        campos: {
            'Origen':               'Monte Ciego, Cangas de Onís',
            'Productor/a':          'Pedro y Marta Hernández',
            'Kilómetro':            '5 km',
            'Modo de recolección':  'Manual en verde, secado solar',
            'Partes usadas':        'Fruto y cáscara',
            'Material de arte':     'Cáscara carbonizada para pigmento negro',
        },
        frase: '"Tostada en seco hasta que el aceite emerge solo. Un instante antes de quemarse."',
    },

    'ajo-negro': {
        color: 'amarillo',
        imagen: 'assets/images/ing-ajo-negro.png',
        campos: {
            'Origen':      'Huerta de La Güeria, Cangas de Onís',
            'Productor/a': 'María Sánchez',
            'Kilómetro':   '1,2 km',
            'Variedad':    'Ajo morado fermentado 40 días',
            'Partes usadas': 'Diente entero',
        },
        frase: '"El ajo blanco se transforma. Cuarenta días de oscuridad y calor lo vuelven dulce."',
    },

    'miel': {
        color: 'verde',
        imagen: 'assets/images/ing-miel.png',
        campos: {
            'Origen':      'Monte Ciego, Cangas de Onís',
            'Productor/a': 'Pedro y Marta Hernández',
            'Kilómetro':   '5 km',
            'Variedad':    'Miel de brezo y castaño',
        },
        frase: '"Oscura como la tierra del monte. El brezo florece tarde y la abeja lo sabe."',
    },

};


// =============================================
// 1. TOOLTIPS DE INGREDIENTES
//
// Cómo funciona:
// - Cada <span class="ingrediente"> tiene data-ingrediente
//   que mapea a un objeto en INGREDIENTES
// - Al hacer hover (desktop) o click (mobile),
//   se rellena el tooltip con los datos del objeto
//   y se posiciona cerca del cursor
// - Los campos nulos no se renderizan
// =============================================
const tooltip      = document.getElementById('tooltipIngrediente');
const tooltipInner = document.getElementById('tooltipInner');

function construirTooltip(clave) {
    const data = INGREDIENTES[clave];
    if (!data) return null;

    // Construir filas de la tabla solo con campos que existen
    const filasHTML = Object.entries(data.campos)
        .map(([etiqueta, valor]) =>
            `<dt>${etiqueta}</dt><dd>${valor}</dd>`
        ).join('');

    return `
  <div class="ingrediente-tooltip__img-wrap">
  <img src="${data.imagen}" alt="${clave}" />
</div>
    <div class="ingrediente-tooltip__datos ingrediente-tooltip__inner--${data.color}">
      <dl class="ingrediente-tooltip__tabla">
        ${filasHTML}
      </dl>
      <p class="ingrediente-tooltip__frase">${data.frase}</p>
    </div>
  `;
}

function mostrarTooltip(elemento, clave) {
    const html = construirTooltip(clave);
    if (!html) return;

    // Aplicar color al inner
    const data = INGREDIENTES[clave];
    tooltipInner.className = `ingrediente-tooltip__inner ingrediente-tooltip__inner--${data.color}`;
    tooltipInner.innerHTML = html;
    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');

    posicionarTooltip(elemento);
}

function ocultarTooltip() {
    tooltip.classList.remove('visible');
    tooltip.setAttribute('aria-hidden', 'true');
}

function posicionarTooltip(elemento) {
    // Calcula posición relativa a la ventana
    const rect    = elemento.getBoundingClientRect();
    const ttW     = tooltip.offsetWidth  || 560;
    const ttH     = tooltip.offsetHeight || 200;
    const margen  = 12;

    // Intentar colocar debajo del elemento
    let top  = rect.bottom + margen;    let left = rect.left + (rect.width / 2) - (ttW / 2);
    // Si se sale por la derecha
    if (left + ttW > window.innerWidth - margen) {
        left = window.innerWidth - ttW - margen;
    }
    // Si se sale por la izquierda
    if (left < margen) { left = margen; }

    // Si se sale por abajo, colocar encima
    if (rect.bottom + margen + ttH > window.innerHeight) {
        top = rect.top - ttH - margen;    }

    tooltip.style.top  = `${top}px`;
    tooltip.style.left = `${left}px`;
}

// Asignar eventos a todos los ingredientes
document.querySelectorAll('.ingrediente').forEach(function (el) {
    const clave = el.dataset.ingrediente;

    // Desktop: hover
    el.addEventListener('mouseenter', function () {
        mostrarTooltip(el, clave);
    });

    el.addEventListener('mouseleave', function () {
        ocultarTooltip();
    });

    // Mobile: tap
    el.addEventListener('click', function (e) {
        e.stopPropagation();
        if (tooltip.classList.contains('visible')) {
            ocultarTooltip();
        } else {
            mostrarTooltip(el, clave);
        }
    });

    // Accesibilidad: teclado
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mostrarTooltip(el, clave);
        }
        if (e.key === 'Escape') { ocultarTooltip(); }
    });
});

// Cerrar al hacer click fuera
document.addEventListener('click', function () {
    ocultarTooltip();
});

// Cerrar con Escape global
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { ocultarTooltip(); }
});


// =============================================
// 2. TOOLTIPS DEL MAPA DE PROVEEDORES
//
// Reutilizamos la misma lógica que el mapa
// de la landing (hover + tap mobile)
// =============================================
const puntosProv = document.querySelectorAll('.prov-punto');

puntosProv.forEach(function (punto) {

    punto.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            puntosProv.forEach(function (p) {
                if (p !== punto) p.classList.remove('activo');
            });
            punto.classList.toggle('activo');
        }
    });

    punto.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        puntosProv.forEach(function (p) {
            if (p !== punto) p.classList.remove('activo');
        });
        punto.classList.toggle('activo');
    }, { passive: true });

});

document.addEventListener('touchstart', function () {
    puntosProv.forEach(function (p) { p.classList.remove('activo'); });
}, { passive: true });