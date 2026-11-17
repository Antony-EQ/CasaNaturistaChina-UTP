/* ==========================================================
   1) MENÚ MÓVIL
   2) IMÁGENES
   3) VIDEO
   ========================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. MENÚ HAMBURGUESA
     --------------------------------------------------------- */
  var encabezado = document.querySelector('.encabezado');
  var botonMenu = document.getElementById('boton-menu');
  var menuNav = document.getElementById('menu-principal');
  var CORTE_MOVIL = window.matchMedia('(max-width: 1150px)'); // mismo punto de corte que el CSS

  function pintarBoton(abierto) {
    botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    botonMenu.textContent = abierto ? '\u2715' : '\u2630'; // ✕ / ☰
  }

  function cerrarMenu() {
    encabezado.classList.remove('menu-abierto');
    pintarBoton(false);
  }

  if (encabezado && botonMenu && menuNav) {
    // Abrir / cerrar con classList.toggle()
    botonMenu.addEventListener('click', function () {
      var abierto = encabezado.classList.toggle('menu-abierto');
      pintarBoton(abierto);
    });

    // Cerrar al elegir una opción del menú (o el botón de WhatsApp del encabezado)
    var enlaces = encabezado.querySelectorAll('.menu a, .boton-whatsapp');
    for (var i = 0; i < enlaces.length; i++) {
      enlaces[i].addEventListener('click', cerrarMenu);
    }

    // Cerrar al tocar fuera del encabezado
    document.addEventListener('click', function (e) {
      if (encabezado.classList.contains('menu-abierto') && !encabezado.contains(e.target)) {
        cerrarMenu();
      }
    });

    // Cerrar con Esc y devolver el foco al botón
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && encabezado.classList.contains('menu-abierto')) {
        cerrarMenu();
        botonMenu.focus();
      }
    });

    // Al pasar a pantalla de escritorio, se reinicia el estado del menú
    function alCambiarTamano(q) { if (!q.matches) { cerrarMenu(); } }
    if (CORTE_MOVIL.addEventListener) { CORTE_MOVIL.addEventListener('change', alCambiarTamano); }
    else if (CORTE_MOVIL.addListener) { CORTE_MOVIL.addListener(alCambiarTamano); }
  }

  /* ---------------------------------------------------------
     2. IMÁGENES AMPLIABLES
     --------------------------------------------------------- */
  var SELECTOR_IMG = 'img[src*="img/productos/"], #modal-imagen';

  var visor = document.createElement('div');
  visor.className = 'visor-imagen';
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Imagen ampliada. Haz clic para volver al tamaño original');
  var visorImg = document.createElement('img');
  visorImg.alt = '';
  var visorCerrar = document.createElement('button');
  visorCerrar.type = 'button';
  visorCerrar.className = 'visor-cerrar';
  visorCerrar.setAttribute('aria-label', 'Cerrar imagen ampliada');
  visorCerrar.textContent = '\u00D7';
  visor.appendChild(visorImg);
  visor.appendChild(visorCerrar);
  document.body.appendChild(visor);

  var miniaturaActiva = null;

  function abrirVisor(miniatura) {
    if (!miniatura.getAttribute('src')) { return; }
    miniaturaActiva = miniatura;
    visorImg.src = miniatura.currentSrc || miniatura.src;
    visorImg.alt = miniatura.alt;
    visor.classList.toggle('activo', true);
    document.body.classList.add('visor-abierto');
    visorCerrar.focus();
  }

  function cerrarVisor() {
    if (!visor.classList.contains('activo')) { return; }
    visor.classList.toggle('activo', false);
    document.body.classList.remove('visor-abierto');
    if (miniaturaActiva) { miniaturaActiva.focus(); miniaturaActiva = null; }
  }

  // Marcar las imágenes ampliables (cursor, accesibilidad por teclado)
  var imagenes = document.querySelectorAll(SELECTOR_IMG);
  for (var j = 0; j < imagenes.length; j++) {
    imagenes[j].classList.add('img-ampliable');
    imagenes[j].setAttribute('tabindex', '0');
    imagenes[j].setAttribute('title', 'Clic para ampliar');
  }

  document.addEventListener('click', function (e) {
    var miniatura = e.target.closest ? e.target.closest(SELECTOR_IMG) : null;
    if (miniatura && !visor.contains(miniatura)) { abrirVisor(miniatura); }
  });

  // Un clic en cualquier parte del visor 
  visor.addEventListener('click', cerrarVisor);

  document.addEventListener('keydown', function (e) {
    var enfocada = document.activeElement;
    if ((e.key === 'Enter' || e.key === ' ') && enfocada && enfocada.matches &&
        enfocada.matches(SELECTOR_IMG) && !visor.classList.contains('activo')) {
      e.preventDefault();
      abrirVisor(enfocada);
    }
  });

  // Esc: en fase de captura para cerrar SOLO el visor (y no también el modal de producto que esté debajo)
  window.addEventListener('keydown', function (e) {
    if (!visor.classList.contains('activo')) { return; }
    if (e.key === 'Escape') { e.stopPropagation(); cerrarVisor(); }
    else if (e.key === 'Tab') { e.preventDefault(); visorCerrar.focus(); }
  }, true);

  /* ---------------------------------------------------------
     3. VIDEO
     --------------------------------------------------------- */
  var videos = document.querySelectorAll('video');
  function marcarVideo(v) { v.classList.toggle('video-activo', !v.paused && !v.ended); }
  for (var k = 0; k < videos.length; k++) {
    (function (v) {
      v.addEventListener('play', function () { marcarVideo(v); });
      v.addEventListener('playing', function () { marcarVideo(v); });
      v.addEventListener('pause', function () { marcarVideo(v); });
      v.addEventListener('ended', function () { marcarVideo(v); });
    })(videos[k]);
  }
})();
