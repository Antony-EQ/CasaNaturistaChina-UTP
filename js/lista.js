/* TURNO 7 — alert, confirm y prompt
   - alert():   solo al agregar un producto a la lista.
   - confirm(): antes de eliminar un producto de la lista.
   - prompt():  búsqueda rápida de productos por nombre.
   Todo lo demás (duplicados, sin resultados, etc.) se avisa en la página,
   sin ventanas emergentes, para no saturar al usuario. */
(function () {
  'use strict';

  /* TURNO 13: la lista ahora es el carrito de principal.js (window.Carrito).
     Así "Mi lista" y "Mi lista de productos" son LO MISMO, sin duplicar datos. */
  var temporizador = null;
  function nombresLista() { return window.Carrito ? window.Carrito.nombres() : []; }

  var ul = document.getElementById('lista-items');
  var vacia = document.getElementById('lista-vacia');
  var contador = document.getElementById('lista-contador');
  var mensaje = document.getElementById('busqueda-mensaje');
  var botonBuscar = document.getElementById('btn-buscar');
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.producto'));

  if (!ul || !botonBuscar) { return; }

  function nombreDe(tarjeta) {
    var h3 = tarjeta.querySelector('h3');
    return h3 ? h3.textContent.trim() : '';
  }
  function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }
  function avisar(texto) { mensaje.textContent = texto; }

  /* ---------- Botón "Agregar a mi lista" en cada producto ---------- */
  tarjetas.forEach(function (tarjeta) {
    var pie = tarjeta.querySelector('.producto-pie');
    var nombre = nombreDe(tarjeta);
    if (!pie || !nombre) { return; }
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton boton-borde boton-lista';
    boton.setAttribute('data-nombre', nombre);
    boton.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar a mi lista';
    pie.parentNode.insertBefore(boton, pie);
  });

  function actualizarBotones() {
    Array.prototype.forEach.call(document.querySelectorAll('.boton-lista'), function (b) {
      // Si el producto está agotado, desactivo el botón
      if (window.Carrito && window.Carrito.estaAgotado(b.getAttribute('data-nombre'))) {
        b.disabled = true;
        b.classList.remove('en-lista');
        b.innerHTML = '<i class="fa-solid fa-ban" aria-hidden="true"></i> Agotado';
        return;
      }
      b.disabled = false;
      var enLista = nombresLista().indexOf(b.getAttribute('data-nombre')) !== -1;
      b.classList.toggle('en-lista', enLista);
      b.innerHTML = enLista
        ? '<i class="fa-solid fa-check" aria-hidden="true"></i> En tu lista'
        : '<i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar a mi lista';
    });
  }

  /* ---------- Dibujar la lista ---------- */
  function dibujar() {
    var lista = nombresLista();
    ul.innerHTML = '';
    lista.forEach(function (nombre) {
      var li = document.createElement('li');
      li.className = 'lista-item';
      var span = document.createElement('span');
      span.textContent = nombre;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'boton boton-borde boton-eliminar';
      b.setAttribute('data-nombre', nombre);
      b.setAttribute('aria-label', 'Eliminar ' + nombre + ' de mi lista');
      b.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i> Eliminar';
      li.appendChild(span);
      li.appendChild(b);
      ul.appendChild(li);
    });
    contador.textContent = lista.length;
    vacia.hidden = lista.length > 0;
    actualizarBotones();
  }

  /* ---------- Agregar / eliminar: lo hace el carrito (alert y confirm viven allí) ---------- */
  function agregar(nombre) { if (window.Carrito) { window.Carrito.agregar(nombre); } }
  function eliminar(nombre) { if (window.Carrito) { window.Carrito.eliminar(nombre); } }

  /* ---------- prompt(): búsqueda rápida por nombre ---------- */
  function limpiarResaltado() {
    clearTimeout(temporizador);
    tarjetas.forEach(function (t) { t.classList.remove('resultado-busqueda'); });
  }

  function buscar() {
    var texto = prompt('¿Qué producto estás buscando?');
    if (texto === null) { return; }               // canceló
    var q = normalizar(texto);
    limpiarResaltado();
    if (!q) { avisar('Escribe el nombre de un producto para buscarlo.'); return; }

    var encontradas = tarjetas.filter(function (t) { return normalizar(nombreDe(t)).indexOf(q) !== -1; });
    if (!encontradas.length) {
      avisar('No encontramos "' + texto.trim() + '". Prueba con otra palabra, por ejemplo "maca" u "omega".');
      return;
    }

    var nombres = [];
    encontradas.forEach(function (t) {
      t.classList.add('resultado-busqueda');
      var n = nombreDe(t);
      if (nombres.indexOf(n) === -1) { nombres.push(n); }
    });
    avisar((nombres.length === 1 ? 'Encontrado: ' : 'Encontrados: ') + nombres.join(', ') + '.');
    // Si el filtro ocultó un resultado, mostrarlo antes de desplazarnos.
    if (typeof filtrarProductos === 'function' && encontradas.some(function (t) {
      return t.classList.contains('oculto');
    })) {
      document.getElementById('selector-necesidad').value = 'Todos';
      filtrarProductos();
    }
    encontradas[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    temporizador = setTimeout(limpiarResaltado, 8000);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener('click', function (e) {
    var agregarBtn = e.target.closest('.boton-lista');
    if (agregarBtn) { agregar(agregarBtn.getAttribute('data-nombre')); return; }
    var eliminarBtn = e.target.closest('.boton-eliminar');
    if (eliminarBtn) { eliminar(eliminarBtn.getAttribute('data-nombre')); }
  });
  botonBuscar.addEventListener('click', buscar);

  document.addEventListener('carrito:cambio', dibujar);   // el carrito avisa cada cambio
  dibujar();
})();
