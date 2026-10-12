/* ============================================================
   TURNO 7 — CARRUSEL DE PRODUCTOS (js/carrusel.js)

   Qué hace:
   1. Botones siguiente / anterior.
   2. Rotación automática cada 4 segundos.
   3. Se detiene al pasar el mouse, al enfocar con el teclado o al tocar.
   4. Al llegar al final vuelve al inicio (y al revés).
   5. Flechas del teclado ← → cuando la pista tiene el foco.
   6. Respeta a quien tiene activado "reducir movimiento" en su sistema.

   El desplazamiento lo hace el navegador con scroll-snap (CSS);
   aquí solo se calcula cuánto mover.
   ============================================================ */
(function () {
  var carrusel = document.querySelector('.carrusel');
  if (!carrusel) return;                       // si la página no tiene carrusel, no hace nada

  var pista        = carrusel.querySelector('.carrusel-pista');
  var btnAnterior  = carrusel.querySelector('.carrusel-anterior');
  var btnSiguiente = carrusel.querySelector('.carrusel-siguiente');
  var temporizador = null;
  var reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Distancia de un paso = ancho de una tarjeta + espacio entre tarjetas
  function paso() {
    var tarjeta = pista.querySelector('.carrusel-item');
    var espacio = parseFloat(getComputedStyle(pista).columnGap) || 0;
    return tarjeta.offsetWidth + espacio;
  }

  function mover(distancia) {
    pista.scrollBy({ left: distancia, behavior: reducirMovimiento ? 'auto' : 'smooth' });
  }

  function siguiente() {
    var alFinal = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 5;
    if (alFinal) {
      pista.scrollTo({ left: 0, behavior: reducirMovimiento ? 'auto' : 'smooth' });   // vuelve al inicio
    } else {
      mover(paso());
    }
  }

  function anterior() {
    if (pista.scrollLeft <= 5) {
      pista.scrollTo({ left: pista.scrollWidth, behavior: reducirMovimiento ? 'auto' : 'smooth' });  // salta al final
    } else {
      mover(-paso());
    }
  }

  function detener() {
    if (temporizador) { clearInterval(temporizador); temporizador = null; }
  }

  function iniciar() {
    detener();
    if (!reducirMovimiento) temporizador = setInterval(siguiente, 4000);
  }

  btnSiguiente.addEventListener('click', siguiente);
  btnAnterior.addEventListener('click', anterior);

  // Teclado: flechas izquierda/derecha
  pista.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); anterior(); }
  });

  // Pausa cuando el usuario interactúa; reanuda cuando se va
  carrusel.addEventListener('mouseenter', detener);
  carrusel.addEventListener('mouseleave', iniciar);
  carrusel.addEventListener('focusin',    detener);
  carrusel.addEventListener('focusout',   iniciar);
  carrusel.addEventListener('touchstart', detener, { passive: true });

  // Pausa si la pestaña no está visible (ahorra recursos)
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) detener(); else iniciar();
  });

  iniciar();
})();
