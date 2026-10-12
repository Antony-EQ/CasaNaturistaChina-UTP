/*
   TURNO 11 — BLOG / CONSEJOS NATURALES
   1. Filtro de artículos por categoría
   2. Animación de las tarjetas al entrar en pantalla (scroll)
 */
(function () {
  'use strict';

  var filtros = document.querySelectorAll('.blog-filtro');
  var tarjetas = document.querySelectorAll('.blog-tarjeta');
  var mensajeVacio = document.getElementById('blog-vacio');

  // Vuelve a lanzar la animación de entrada de una tarjeta
  function animar(tarjeta, retraso) {
    tarjeta.classList.remove('blog-oculta', 'blog-visible');
    void tarjeta.offsetWidth; // obliga al navegador a reiniciar la animación
    tarjeta.style.animationDelay = retraso + 's';
    tarjeta.classList.add('blog-visible');
  }

  // 1. FILTRO: muestra solo las tarjetas de la categoría elegida
  function filtrar(categoria) {
    var visibles = 0;

    tarjetas.forEach(function (tarjeta) {
      var coincide = categoria === 'todos' || tarjeta.getAttribute('data-categoria') === categoria;
      tarjeta.hidden = !coincide;

      if (coincide) {
        animar(tarjeta, visibles * 0.08); // entran una después de otra
        visibles++;
      }
    });

    if (mensajeVacio) {
      mensajeVacio.hidden = visibles > 0;
    }
  }

  filtros.forEach(function (boton) {
    boton.addEventListener('click', function () {
      filtros.forEach(function (otro) {
        otro.classList.remove('activo');
        otro.setAttribute('aria-pressed', 'false');
      });
      boton.classList.add('activo');
      boton.setAttribute('aria-pressed', 'true');

      filtrar(boton.getAttribute('data-filtro'));
    });
  });

  // Si se llega desde el inicio con un enlace como blog.html#articulo-maca,
  // ese artículo se muestra ya abierto
  var destino = location.hash ? document.getElementById(location.hash.slice(1)) : null;
  var detalle = destino ? destino.querySelector('.blog-mas') : null;
  if (detalle) {
    detalle.open = true;
  }

  // 2. SCROLL: cada tarjeta aparece cuando entra en la pantalla.
  // Si el navegador no soporta IntersectionObserver, se quedan visibles.
  if (!('IntersectionObserver' in window)) return;

  var observador = new IntersectionObserver(function (entradas) {
    var orden = 0;

    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;

      animar(entrada.target, orden * 0.1);
      orden++;
      observador.unobserve(entrada.target); // solo se anima la primera vez
    });
  }, { threshold: 0.15 });

  tarjetas.forEach(function (tarjeta) {
    tarjeta.classList.add('blog-oculta');
    observador.observe(tarjeta);
  });
})();
