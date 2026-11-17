/* ==========================================================
   Modo oscuro persistente (Casa Naturista China)
   - Guarda la elección en localStorage ("claro" / "oscuro").
   - La aplica en TODAS las páginas antes de que se pinte el
     contenido (este script va en el <head>), evitando el
     parpadeo de blanco al cambiar de página.
   - Mantiene sincronizado el interruptor #theme-toggle.
   ========================================================== */
(function () {
  'use strict';

  var CLAVE = 'cnc_tema';
  var raiz = document.documentElement;

  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }
  function guardar(valor) {
    try { localStorage.setItem(CLAVE, valor); } catch (e) { /* sin almacenamiento: solo dura en esta página */ }
  }
  function aplicar(oscuro) {
    if (oscuro) { raiz.setAttribute('data-theme', 'dark'); }
    else { raiz.removeAttribute('data-theme'); }
  }

  /* 1. Aplicar el tema guardado de inmediato (antes de pintar la página) */
  aplicar(leer() === 'oscuro');

  /* 2. Cuando el HTML ya existe, enlazar el interruptor */
  function enlazar() {
    var interruptor = document.getElementById('theme-toggle');
    if (!interruptor) { return; }

    function sincronizar() { interruptor.checked = leer() === 'oscuro'; }
    sincronizar();

    interruptor.addEventListener('change', function () {
      aplicar(interruptor.checked);
      guardar(interruptor.checked ? 'oscuro' : 'claro');
    });

    /* Si el usuario vuelve con "Atrás" (página restaurada) o cambia el
       tema en otra pestaña abierta, esta página se actualiza sola. */
    window.addEventListener('pageshow', function () { aplicar(leer() === 'oscuro'); sincronizar(); });
    window.addEventListener('storage', function (e) {
      if (e.key === CLAVE) { aplicar(leer() === 'oscuro'); sincronizar(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enlazar);
  } else {
    enlazar();
  }
})();
