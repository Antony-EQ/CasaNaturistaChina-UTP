/* 
   MODO OSCURO — Casa Naturista China
   Persistencia con localStorage y cambio dinámico de tema
 */
(function () {
  'use strict';

  var btnToggle = document.getElementById('btn-theme-toggle');
  var htmlElement = document.documentElement;

  // 1. Revisar si hay una preferencia guardada en localStorage
  var temaGuardado = localStorage.getItem('tema_pagina');

  // Aplicar el tema guardado al cargar la página
  if (temaGuardado) {
    htmlElement.setAttribute('data-theme', temaGuardado);
    actualizarIcono(temaGuardado);
  }

  // 2. Función para cambiar el icono del botón
  function actualizarIcono(tema) {
    if (!btnToggle) return;
    var icono = btnToggle.querySelector('i');
    if (icono) {
      if (tema === 'dark') {
        icono.className = 'fa-solid fa-sun'; // Sol en modo oscuro
      } else {
        icono.className = 'fa-solid fa-moon'; // Luna en modo claro
      }
    }
  }

  // 3. Evento al hacer clic en el botón
  if (btnToggle) {
    btnToggle.addEventListener('click', function () {
      var temaActual = htmlElement.getAttribute('data-theme');
      var nuevoTema = temaActual === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', nuevoTema);
      localStorage.setItem('tema_pagina', nuevoTema); // Guardar preferencia
      actualizarIcono(nuevoTema);
    });
  }
})()