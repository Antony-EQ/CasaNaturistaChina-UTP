/* ==========================================================
   TURNO 12 — Ventana modal de producto
   ----------------------------------------------------------
   Hay UN SOLO modal en productos.html y lo reutilizo para todos
   los productos. Cuando se hace clic en "Ver detalles":
     1. Leo el data-id del botón.
     2. Busco ese producto en el array del Turno 8 (catalogo.js).
     3. Cambio con el DOM la imagen, nombre, categoría, precio,
        stock y descripción.
     4. Muestro el modal (le quito el atributo hidden).

   El modal también tiene un formulario de consulta. Al enviarlo
   valido los campos y armo el mensaje para WhatsApp.

   Se puede cerrar con la X, haciendo clic fuera o con Esc.
   No se recarga la página en ningún momento.
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. Busco los elementos del modal ---------- */
  var modal = document.getElementById('modal-producto');
  if (!modal) { return; }   // si no estoy en productos.html no hago nada

  var caja = modal.querySelector('.modal-caja');
  var elImagen = document.getElementById('modal-imagen');
  var elNombre = document.getElementById('modal-nombre');
  var elCategoria = document.getElementById('modal-categoria');
  var elPrecio = document.getElementById('modal-precio');
  var elStock = document.getElementById('modal-stock');
  var elDescripcion = document.getElementById('modal-descripcion');
  var elComoTomar = document.getElementById('modal-como-tomar');
  var btnLista = document.getElementById('modal-lista');
  var btnWhatsapp = document.getElementById('modal-whatsapp');
  var btnCerrar = document.getElementById('modal-cerrar');
  var ultimoBoton = null; // guardo el botón que abrió el modal para regresar ahí al cerrar

  // Elementos del formulario
  var form = document.getElementById('form-consulta');
  var inNombre = document.getElementById('consulta-nombre');
  var inTelefono = document.getElementById('consulta-telefono');
  var inProducto = document.getElementById('consulta-producto');
  var inMensaje = document.getElementById('consulta-mensaje');
  var errNombre = document.getElementById('error-nombre');
  var errTelefono = document.getElementById('error-telefono');
  var errMensaje = document.getElementById('error-mensaje');
  var confirmacion = document.getElementById('consulta-confirmacion');


  /* ---------- 2. Botón "Agregar a mi lista" ----------
     Le pregunto al carrito (principal.js, Turno 13) si el producto
     ya está agregado para cambiar el texto del botón. */
  function enLista(nombre) {
    return !!(window.Carrito && window.Carrito.contiene(nombre));
  }

  function textoBotonLista(nombre) {
    // Producto agotado: el botón queda desactivado
    if (window.Carrito && window.Carrito.estaAgotado(nombre)) {
      btnLista.disabled = true;
      btnLista.classList.remove('en-lista');
      btnLista.innerHTML = '<i class="fa-solid fa-ban" aria-hidden="true"></i> Agotado';
      return;
    }
    btnLista.disabled = false;
    btnLista.classList.toggle('en-lista', enLista(nombre));
    btnLista.innerHTML = enLista(nombre)
      ? '<i class="fa-solid fa-check" aria-hidden="true"></i> En tu lista'
      : '<i class="fa-solid fa-plus" aria-hidden="true"></i> Agregar a mi lista';
  }


  /* ---------- 3. Llenar el modal con los datos del producto ---------- */
  function llenarModal(p) {
    // Reutilizo verificarStock() del Turno 5 (principal.js) para el estado
    var estado = verificarStock(p.stock);
    var textoEstado = estado.mensaje.replace(/^[●⚠]\s*/, ''); // le quito el símbolo
    if (p.stock > 0) {
      textoEstado += ' (' + p.stock + ' unidades)';
    }

    elImagen.src = p.imagen;
    elImagen.alt = p.alt;
    elNombre.textContent = p.nombre;
    elCategoria.textContent = 'Categoría: ' + p.categoria;
    elPrecio.textContent = 'S/ ' + p.precio.toFixed(2);
    elStock.textContent = 'Disponibilidad: ' + textoEstado;
    elStock.className = 'estado-stock ' + estado.clase;
    elDescripcion.textContent = p.descripcion;

    // "Cómo tomarlo" en negrita + el texto
    elComoTomar.textContent = '';
    var fuerte = document.createElement('strong');
    fuerte.textContent = 'Cómo tomarlo: ';
    elComoTomar.appendChild(fuerte);
    elComoTomar.appendChild(document.createTextNode(p.comoTomar));

    btnLista.setAttribute('data-nombre', p.nombre); // lista.js usa este atributo
    textoBotonLista(p.nombre);

    // Uso NUMERO_WHATSAPP del Turno 1 (principal.js)
    btnWhatsapp.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' +
      encodeURIComponent('Hola, quiero consultar por ' + p.nombre);

    // El formulario empieza limpio y con el producto ya escrito
    limpiarFormulario();
    inProducto.value = p.nombre;
  }


  /* ---------- 4. Abrir y cerrar ---------- */
  function abrirModal(id, disparador) {
    var p = buscarProductoPorId(id);   // función del Turno 8 (catalogo.js)
    if (p === null) {
      console.error('Modal: no existe un producto con id "' + id + '".');
      return;
    }
    llenarModal(p);
    ultimoBoton = disparador || null;
    modal.hidden = false;
    document.body.classList.add('modal-abierto'); // para que no se mueva la página de atrás
    caja.scrollTop = 0;
    btnCerrar.focus();
  }

  function cerrarModal() {
    if (modal.hidden) { return; }
    modal.hidden = true;
    document.body.classList.remove('modal-abierto');
    if (ultimoBoton) { ultimoBoton.focus(); }
  }


  /* ---------- 5. Formulario de consulta ---------- */
  function limpiarFormulario() {
    form.reset();
    errNombre.textContent = '';
    errTelefono.textContent = '';
    errMensaje.textContent = '';
    confirmacion.textContent = '';
    inNombre.classList.remove('invalido');
    inTelefono.classList.remove('invalido');
    inMensaje.classList.remove('invalido');
  }

  // Muestro u oculto el error de un campo. Devuelve true si el campo está bien.
  function marcarCampo(input, cajaError, mensajeError) {
    cajaError.textContent = mensajeError;
    input.classList.toggle('invalido', mensajeError !== '');
    return mensajeError === '';
  }

  function validarFormulario() {
    var nombre = inNombre.value.trim();
    var telefono = inTelefono.value.trim();
    var mensaje = inMensaje.value.trim();

    // Nombre: no vacío y mínimo 3 letras
    var errorN = '';
    if (nombre === '') {
      errorN = 'Escribe tu nombre.';
    } else if (nombre.length < 3) {
      errorN = 'El nombre debe tener al menos 3 letras.';
    }

    // WhatsApp: 9 números y que empiece con 9 (celulares de Perú)
    // /^9\d{8}$/ significa: empieza con 9 y le siguen 8 números
    var errorT = '';
    if (telefono === '') {
      errorT = 'Escribe tu número de WhatsApp.';
    } else if (!/^9\d{8}$/.test(telefono)) {
      errorT = 'El número debe tener 9 dígitos y empezar con 9.';
    }

    // Mensaje: no vacío
    var errorM = '';
    if (mensaje === '') {
      errorM = 'Escribe tu consulta.';
    }

    // Marco los tres campos (así salen todos los errores a la vez)
    var okN = marcarCampo(inNombre, errNombre, errorN);
    var okT = marcarCampo(inTelefono, errTelefono, errorT);
    var okM = marcarCampo(inMensaje, errMensaje, errorM);

    return okN && okT && okM;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evito que el formulario recargue la página
    confirmacion.textContent = '';

    if (!validarFormulario()) {
      // Pongo el cursor en el primer campo con error
      var primerError = form.querySelector('.invalido');
      if (primerError) { primerError.focus(); }
      return;
    }

    // Armo el mensaje con los datos del formulario
    var texto = 'Hola, soy ' + inNombre.value.trim() + '.\n' +
      'Quisiera consultar por: ' + inProducto.value + '\n' +
      'Consulta: ' + inMensaje.value.trim() + '\n' +
      'Mi WhatsApp: ' + inTelefono.value.trim();

    var enlace = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(texto);
    window.open(enlace, '_blank', 'noopener');

    confirmacion.textContent = '¡Listo! Se abrió WhatsApp con tu consulta.';
    console.log('Consulta enviada:', texto);
  });

  // Mientras escribe en el teléfono, borro lo que no sea número
  inTelefono.addEventListener('input', function () {
    inTelefono.value = inTelefono.value.replace(/\D/g, '');
  });


  /* ---------- 6. Eventos ---------- */
  document.addEventListener('click', function (e) {
    var abrir = e.target.closest('.boton-detalles');
    if (abrir) { abrirModal(abrir.getAttribute('data-id'), abrir); return; }
    if (e.target === modal) { cerrarModal(); }           // clic fuera de la ventana
  });
  btnCerrar.addEventListener('click', cerrarModal);       // botón X

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) { return; }
    if (e.key === 'Escape') { cerrarModal(); return; }
    if (e.key === 'Tab') {
      // Con Tab el foco se queda dando vueltas dentro del modal
      var items = caja.querySelectorAll('button, a[href], input:not([readonly]), textarea');
      var primero = items[0], ultimo = items[items.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  // Cuando cambia el carrito, actualizo el botón del modal
  document.addEventListener('carrito:cambio', function () {
    var n = btnLista.getAttribute('data-nombre');
    if (n) { textoBotonLista(n); }
  });
})();
