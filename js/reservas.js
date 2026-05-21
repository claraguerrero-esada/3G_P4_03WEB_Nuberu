/* =============================================
   NUBERU — reservas.js
   Lógica del test del Nuberu y formulario de reservas
   ============================================= */

// =============================================
// DATOS DEL MENÚ XUNU
// Estructura: { id, nombre, imagen, categoria }
// imagen sigue el patrón: 1.1, 2.3, etc.
// =============================================
const MENU = {
    entrantes: [
        { id: '1.1', nombre: 'Trás la lluvia',      tags: ['curioso', 'festivo', 'artesanía', 'tierra'] },
        { id: '1.2', nombre: 'Blanco suspendido',   tags: ['en-calma', 'nube', 'dulzor'] },
        { id: '1.3', nombre: 'Descanso',            tags: ['en-calma', 'tradicional', 'tierra'] },
        { id: '1.4', nombre: 'Tierras',             tags: ['curioso', 'creativo', 'tierra', 'artesanía'] },
    ],
    primeros: [
        { id: '2.1', nombre: 'Verde junio',         tags: ['festivo', 'creativo', 'tropical', 'dulzor'] },
        { id: '2.2', nombre: 'Pliegue',             tags: ['curioso', 'creativo', 'artesanía'] },
        { id: '2.3', nombre: 'La braña 2',          tags: ['en-calma', 'tradicional', 'tierra'] },
        { id: '2.4', nombre: 'Ceniza blanca',       tags: ['curioso', 'tierra', 'nube'] },
    ],
    segundos: [
        { id: '3.1', nombre: 'Marea fría',          tags: ['en-calma', 'nube', 'suave'] },
        { id: '3.2', nombre: 'Brezo y carbón',      tags: ['festivo', 'tierra', 'intenso'] },
        { id: '3.3', nombre: 'Corral de verano',    tags: ['tradicional', 'en-calma', 'artesanía'] },
        { id: '3.4', nombre: 'Brasa y humo',        tags: ['creativo', 'tropical', 'intenso'] },
    ],
    postres: [
        { id: '4.1', nombre: 'Junio rojo',          tags: ['festivo', 'dulzor', 'tropical'] },
        { id: '4.2', nombre: 'Boscoso',             tags: ['en-calma', 'tierra', 'artesanía'] },
        { id: '4.3', nombre: 'Última luz',          tags: ['curioso', 'nube', 'dulzor'] },
        { id: '4.4', nombre: 'Piedra y cacao',      tags: ['creativo', 'intenso', 'tierra'] },
    ],
};

// Perfiles de comensal por sentimiento
const PERFILES = {
    'curioso':   'Curioso',
    'en-calma':  'Sereno',
    'festivo':   'Festivo',
    'creativo':  'Creativo',
};

// =============================================
// ESTADO DEL TEST
// =============================================
const estado = {
    paso: 0,
    respuestas: {
        sentimiento: null,  // paso 1
        obra: null,         // paso 2
        ingrediente: null,  // paso 3
        dulce: 50,          // paso 4
        suave: 50,
        tradicional: 50,
        palabra: null,      // paso 5
    },
    menuRecomendado: null,
    horaSeleccionada: null,
    fechaSeleccionada: null,
};

// =============================================
// UTILIDADES: mostrar/ocultar pantallas
// =============================================
function mostrarPantalla(id) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    const pantalla = document.getElementById(id);
    if (pantalla) {
        pantalla.classList.add('activa');
        window.scrollTo(0, 0);
    }
}

// =============================================
// BARRA DE PROGRESO
// =============================================
const progresoBarra = document.getElementById('progresoBarra');

function actualizarProgreso(paso) {
    // Mostrar barra en pasos 1-5
    if (paso >= 1 && paso <= 5) {
        progresoBarra.classList.add('visible');
    } else {
        progresoBarra.classList.remove('visible');
    }

    // Actualizar estados de cada círculo
    document.querySelectorAll('.progreso-paso').forEach(el => {
        const n = parseInt(el.dataset.paso);
        el.classList.remove('activo', 'completado');
        if (n < paso)  el.classList.add('completado');
        if (n === paso) el.classList.add('activo');
    });
}

// =============================================
// PANTALLA 0: ENTRADA
// =============================================
document.getElementById('btnEmpezarTest').addEventListener('click', () => {
    estado.paso = 1;
    actualizarProgreso(1);
    document.body.classList.add('test-activo');
    mostrarPantalla('pantalla-1');
});

document.getElementById('btnSaltarTest').addEventListener('click', () => {
    document.body.classList.remove('test-activo');
    mostrarPantalla('pantalla-reservas');
});

// =============================================
// BOTÓN ATRÁS
// =============================================
document.getElementById('btnAtras').addEventListener('click', () => {
    if (estado.paso > 1) {
        estado.paso--;
        actualizarProgreso(estado.paso);
        mostrarPantalla(`pantalla-${estado.paso}`);
    } else {
        document.body.classList.remove('test-activo');
        mostrarPantalla('pantalla-0');
        progresoBarra.classList.remove('visible');
    }
});

// Botón saltar de la barra inferior — lleva a pantalla de reservas
document.getElementById('btnSaltarBarra').addEventListener('click', () => {
    progresoBarra.classList.remove('visible');
    document.body.classList.remove('test-activo');
    mostrarPantalla('pantalla-reservas');
});

// =============================================
// PASO 1: SENTIMIENTO — avance automático
// =============================================
document.querySelectorAll('[data-paso="1"]').forEach(btn => {
    btn.addEventListener('click', () => {
        estado.respuestas.sentimiento = btn.dataset.valor;
        // Marcar seleccionado visualmente
        document.querySelectorAll('[data-paso="1"]').forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
        // Avanzar con pequeña pausa
        setTimeout(() => {
            estado.paso = 2;
            actualizarProgreso(2);
            mostrarPantalla('pantalla-2');
        }, 400);
        document.body.classList.add('test-activo');

    });
});

// =============================================
// PASO 2: OBRA — avance automático (600ms)
// =============================================
document.querySelectorAll('[data-paso="2"]').forEach(btn => {
    btn.addEventListener('click', () => {
        estado.respuestas.obra = btn.dataset.valor;
        document.querySelectorAll('[data-paso="2"]').forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
        setTimeout(() => {
            estado.paso = 3;
            actualizarProgreso(3);
            mostrarPantalla('pantalla-3');
        }, 600);
    });
});

// =============================================
// PASO 3: INGREDIENTE — avance automático
// =============================================
document.querySelectorAll('[data-paso="3"]').forEach(btn => {
    btn.addEventListener('click', () => {
        estado.respuestas.ingrediente = btn.dataset.valor;
        document.querySelectorAll('[data-paso="3"]').forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
        setTimeout(() => {
            estado.paso = 4;
            actualizarProgreso(4);
            mostrarPantalla('pantalla-4');
        }, 400);
    });
});

// =============================================
// PASO 4: SLIDERS
// =============================================
document.getElementById('sliderDulce').addEventListener('input', e => {
    estado.respuestas.dulce = parseInt(e.target.value);
});
document.getElementById('sliderSuave').addEventListener('input', e => {
    estado.respuestas.suave = parseInt(e.target.value);
});
document.getElementById('sliderTradicional').addEventListener('input', e => {
    estado.respuestas.tradicional = parseInt(e.target.value);
});

document.getElementById('btnListo').addEventListener('click', () => {
    estado.paso = 5;
    actualizarProgreso(5);
    mostrarPantalla('pantalla-5');
});

// =============================================
// PASO 5: PALABRA — avance al pulsar Terminar
// =============================================
document.querySelectorAll('[data-paso="5"]').forEach(btn => {
    btn.addEventListener('click', () => {
        estado.respuestas.palabra = btn.dataset.valor;
        document.querySelectorAll('[data-paso="5"]').forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');
    });
});

document.getElementById('btnTerminar').addEventListener('click', () => {
    calcularResultado();
    mostrarResultado();
    progresoBarra.classList.remove('visible');
    mostrarPantalla('pantalla-resultado');
});

// =============================================
// ALGORITMO DE RECOMENDACIÓN
//
// Cómo funciona:
// - Cada plato tiene tags que coinciden con las
//   respuestas del usuario
// - Puntuamos cada plato sumando coincidencias
// - Seleccionamos el mejor de cada categoría
// - Los sliders añaden puntuación extra por sabor
// =============================================
function calcularResultado() {
    const r = estado.respuestas;

    // Tags activos del usuario
    const tagsUsuario = [
        r.sentimiento,
        r.palabra,
        r.ingrediente === 'gamoneú'  ? 'artesanía' : null,
        r.ingrediente === 'manzana'  ? 'dulzor'    : null,
        r.ingrediente === 'setas'    ? 'tierra'    : null,
        r.ingrediente === 'rosa'     ? 'nube'      : null,
        r.ingrediente === 'miel'     ? 'dulzor'    : null,
        r.dulce       > 60 ? 'intenso'     : null,
        r.dulce       < 40 ? 'dulzor'      : null,
        r.suave       > 60 ? 'intenso'     : null,
        r.tradicional > 60 ? 'tropical'    : null,
        r.tradicional < 40 ? 'artesanía'   : null,
    ].filter(Boolean);

    function puntuarPlatos(platos) {
        return platos
            .map(plato => ({
                ...plato,
                puntos: plato.tags.filter(t => tagsUsuario.includes(t)).length
            }))
            .sort((a, b) => b.puntos - a.puntos);
    }

    // Seleccionamos el mejor de cada categoría
    // Si hay empate, añadimos algo de aleatoriedad
    function mejor(platos) {
        const puntuados = puntuarPlatos(platos);
        const maxPuntos = puntuados[0].puntos;
        const empatados = puntuados.filter(p => p.puntos === maxPuntos);
        return empatados[Math.floor(Math.random() * empatados.length)];
    }

    estado.menuRecomendado = {
        entrante: mejor(MENU.entrantes),
        primero:  mejor(MENU.primeros),
        segundo:  mejor(MENU.segundos),
        postre:   mejor(MENU.postres),
    };
}

function mostrarResultado() {
    const m = estado.menuRecomendado;
    const perfil = PERFILES[estado.respuestas.sentimiento] || 'Creativo';

    document.getElementById('resultadoPerfil').textContent = perfil;

    const contenedor = document.getElementById('resultadoPlatos');
    contenedor.innerHTML = [m.entrante, m.primero, m.segundo, m.postre]
        .map(plato => `
      <div class="resultado-plato">
        <img src="assets/images/${plato.id}.jpg"
             alt="${plato.nombre}"
             onerror="this.outerHTML='<div class=\\'resultado-plato plato-placeholder\\'></div>'" />
        <p class="resultado-plato-nombre">${plato.nombre}</p>
      </div>
    `).join('');
}

// Reservar desde el resultado
document.getElementById('btnReservarExperiencia').addEventListener('click', () => {
    const m = estado.menuRecomendado;
    if (m) {
        const resumen = `${m.entrante.nombre} · ${m.primero.nombre} · ${m.segundo.nombre} · ${m.postre.nombre}`;
        document.getElementById('reservasMenuPrevio').style.display = 'block';
        document.getElementById('reservasMenuPrevioValor').textContent = resumen;
    }
    mostrarPantalla('pantalla-reservas');
});

// Repetir el test
document.getElementById('btnRepetirTest').addEventListener('click', () => {
    // Resetear estado
    estado.respuestas = { sentimiento: null, obra: null, ingrediente: null,
        dulce: 50, suave: 50, tradicional: 50, palabra: null };
    estado.menuRecomendado = null;
    // Quitar selecciones visuales
    document.querySelectorAll('.seleccionado').forEach(el => el.classList.remove('seleccionado'));
    document.querySelectorAll('input[type="range"]').forEach(el => el.value = 50);
    // Volver al inicio del test
    estado.paso = 1;
    actualizarProgreso(1);
    progresoBarra.classList.add('visible');
    mostrarPantalla('pantalla-1');
});

// =============================================
// CALENDARIO EMERGENTE
//
// Cómo funciona:
// - Al hacer click en el campo de fecha se abre
//   un calendario generado dinámicamente en JS
// - Solo se pueden seleccionar Ju/Vi/Sá/Do
//   (días en que abre el restaurante)
// - Al seleccionar fecha se desbloquean las horas
// =============================================
const campofecha    = document.getElementById('fechaReserva');
const calendario    = document.getElementById('calendario');
const grupoHorario  = document.getElementById('grupoHorario');
const grupoContacto = document.getElementById('grupoContacto');

let calAnio = new Date().getFullYear();
let calMes  = new Date().getMonth();

const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function renderCalendario() {
    const hoy        = new Date();
    const primerDia  = new Date(calAnio, calMes, 1).getDay(); // 0=Dom
    const diasMes    = new Date(calAnio, calMes + 1, 0).getDate();
    // Ajustar para que la semana empiece en Lunes
    const offset     = (primerDia === 0) ? 6 : primerDia - 1;

    let html = `
    <div class="cal-cabecera">
      <button class="cal-nav" id="calPrev">‹</button>
      <span class="cal-mes">${MESES[calMes]} ${calAnio}</span>
      <button class="cal-nav" id="calNext">›</button>
    </div>
    <div class="cal-dias-semana">
      ${DIAS_SEMANA.map(d => `<div>${d}</div>`).join('')}
    </div>
    <div class="cal-dias">
  `;

    // Celdas vacías al inicio
    for (let i = 0; i < offset; i++) {
        html += `<div class="cal-dia vacio"></div>`;
    }

    for (let dia = 1; dia <= diasMes; dia++) {
        const fecha      = new Date(calAnio, calMes, dia);
        const diaSemana  = fecha.getDay(); // 0=Dom, 4=Jue, 5=Vie, 6=Sab
        const esAbierto  = [0, 4, 5, 6].includes(diaSemana); // Dom, Ju, Vi, Sá
        const esPasado   = fecha < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const fechaStr   = `${dia}/${calMes+1}/${calAnio}`;
        const esSelec    = fechaStr === estado.fechaSeleccionada;
        const esHoy      = fecha.toDateString() === hoy.toDateString();

        let clases = 'cal-dia';
        if (!esAbierto || esPasado) clases += ' deshabilitado';
        if (esSelec) clases += ' seleccionado';
        if (esHoy)   clases += ' hoy';

        html += `<div class="${clases}" data-fecha="${fechaStr}">${dia}</div>`;
    }

    html += `</div>`;
    calendario.innerHTML = html;

    // Eventos de navegación
    document.getElementById('calPrev').addEventListener('click', e => {
        e.stopPropagation();
        calMes--;
        if (calMes < 0) { calMes = 11; calAnio--; }
        renderCalendario();
    });

    document.getElementById('calNext').addEventListener('click', e => {
        e.stopPropagation();
        calMes++;
        if (calMes > 11) { calMes = 0; calAnio++; }
        renderCalendario();
    });

    // Selección de día
    calendario.querySelectorAll('.cal-dia:not(.deshabilitado):not(.vacio)').forEach(el => {
        el.addEventListener('click', e => {
            e.stopPropagation();
            estado.fechaSeleccionada = el.dataset.fecha;
            campofecha.value = el.dataset.fecha;
            calendario.classList.remove('abierto');
            desbloquearHorario();
        });
    });
}

// Abrir/cerrar calendario
campofecha.addEventListener('click', e => {
    e.stopPropagation();
    if (calendario.classList.contains('abierto')) {
        calendario.classList.remove('abierto');
    } else {
        renderCalendario();
        calendario.classList.add('abierto');
    }
});

// Cerrar al hacer click fuera
document.addEventListener('click', () => {
    calendario.classList.remove('abierto');
});

// =============================================
// DESBLOQUEO DE HORARIOS
// Al seleccionar fecha se habilitan los botones de hora
// =============================================
function desbloquearHorario() {
    grupoHorario.classList.add('desbloqueado');
    document.querySelectorAll('.horario-pill').forEach(pill => {
        pill.disabled = false;
    });
}

// =============================================
// SELECCIÓN DE HORA → desbloquea campos de contacto
// =============================================
document.querySelectorAll('.horario-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.horario-pill').forEach(p => p.classList.remove('seleccionado'));
        pill.classList.add('seleccionado');
        estado.horaSeleccionada = pill.dataset.hora;
        // Desbloquear campos de contacto
        grupoContacto.classList.add('desbloqueado');
        document.querySelectorAll('#grupoContacto input, #grupoContacto textarea').forEach(el => {
            el.disabled = false;
        });
    });
});

// =============================================
// CONFIRMAR RESERVA
// =============================================
document.getElementById('btnConfirmar').addEventListener('click', () => {
    const nombre    = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const email     = document.getElementById('email').value.trim();
    const telefono  = document.getElementById('telefono').value.trim();
    const fecha     = estado.fechaSeleccionada;
    const hora      = estado.horaSeleccionada;
    const checkLegal = document.getElementById('checkLegal').checked;

    // Validación básica
    if (!nombre || !apellidos || !email || !telefono || !fecha || !hora) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }

    if (!checkLegal) {
        alert('Debes aceptar las condiciones de uso y política de privacidad.');
        return;
    }

    // Mostrar confirmación
    document.getElementById('confirmacionEmail').textContent = email;
    document.getElementById('confirmacionDetalle').textContent =
        `${nombre} ${apellidos} · ${fecha} a las ${hora}`;

    mostrarPantalla('pantalla-confirmacion');
});