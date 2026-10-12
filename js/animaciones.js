/*
   ANIMACIONES DE INICIO — Casa Naturista China
   Las tarjetas con la clase .animacion-tarjeta (Turno 4) aparecen
   cuando entran en pantalla al hacer scroll, no todas al cargar.
 */
(function () {
  'use strict';

  var tarjetas = document.querySelectorAll('.animacion-tarjeta');

  // Si el navegador no soporta IntersectionObserver, se quedan visibles
  if (!tarjetas.length || !('IntersectionObserver' in window)) return;

  var observador = new IntersectionObserver(function (entradas) {
    var orden = 0;

    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;

      var tarjeta = entrada.target;
      tarjeta.style.animationDelay = (orden * 0.12) + 's'; // entran una después de otra
      tarjeta.classList.remove('tarjeta-oculta');
      tarjeta.classList.add('tarjeta-visible');
      orden++;
      observador.unobserve(tarjeta); // solo se anima la primera vez
    });
  }, { threshold: 0.15 });

  tarjetas.forEach(function (tarjeta) {
    tarjeta.classList.add('tarjeta-oculta');
  });

  var observando = false;

  function observar() {
    if (observando) return;
    observando = true;

    tarjetas.forEach(function (tarjeta) {
      observador.observe(tarjeta);
    });
  }

  // Se espera a que termine la pantalla de bienvenida para que
  // las primeras tarjetas no se animen mientras está tapando la página
  var bienvenida = document.querySelector('.bienvenida-turno4');
  var hayBienvenida = bienvenida && getComputedStyle(bienvenida).display !== 'none' &&
                      getComputedStyle(bienvenida).animationName !== 'none';

  if (hayBienvenida) {
    bienvenida.addEventListener('animationend', function (evento) {
      if (evento.target === bienvenida) observar();
    });
    // Respaldo: si el evento no llegara, las tarjetas no se quedan ocultas
    setTimeout(observar, 3500);
  } else {
    observar();
  }
})();
