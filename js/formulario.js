/* ============================================================
   FORMULARIO DE CONTACTO — Casa Naturista China
   Validación visual, contador, envío y panel de éxito.
   Coincide con la estructura de contacto.html y css/formulario.css
   ============================================================ */
(function () {
  'use strict';

  var form = document.getElementById('form-contacto');
  if (!form) return;

  /* Número de WhatsApp del negocio (sin + ni espacios) */
  var NUMERO_WHATSAPP = '51919589549';

  var boton = document.getElementById('boton-enviar');
  var aviso = document.getElementById('aviso-formulario');
  var panelExito = document.getElementById('envio-exito');
  var exitoNombre = document.getElementById('exito-nombre');
  var exitoWhatsapp = document.getElementById('exito-whatsapp');
  var exitoNueva = document.getElementById('exito-nueva');
  var inputMensaje = document.getElementById('mensaje');
  var contador = document.getElementById('contador-mensaje');
  var inputTelefono = document.getElementById('telefono');
  var inputCorreo = document.getElementById('correo');
  var etiquetaOpcionalCorreo = document.querySelector('label[for="correo"] .opcional');

  /* ---------- Utilidades ---------- */

  function preferenciaActual() {
    var marcada = form.querySelector('input[name="preferencia"]:checked');
    return marcada ? marcada.value : '';
  }

  function soloDigitosCelular(valor) {
    var d = valor.replace(/\D/g, '');
    if (d.length > 9 && d.indexOf('51') === 0) d = d.slice(2); // quita el 51 del país
    return d.slice(0, 9);
  }

  /* ---------- Reglas de cada campo ---------- */

  var campos = [
    {
      id: 'nombre',
      req: true,
      vacio: 'Escribe tu nombre y apellido.',
      regla: function (v) {
        if (v.length < 3) return 'El nombre debe tener al menos 3 letras.';
        if (!/^[\p{L}\s.'-]+$/u.test(v)) return 'Usa solo letras en el nombre.';
        return '';
      }
    },
    {
      id: 'telefono',
      req: true,
      vacio: 'Escribe tu número de WhatsApp.',
      regla: function (v) {
        return /^9\d{8}$/.test(soloDigitosCelular(v))
          ? ''
          : 'Ingresa un celular de 9 dígitos que empiece con 9.';
      }
    },
    {
      id: 'correo',
      /* Opcional, salvo que prefiera ser contactado por correo */
      req: function () { return preferenciaActual() === 'Correo electrónico'; },
      vacio: 'Necesitamos tu correo para contactarte por ese medio.',
      regla: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
          ? ''
          : 'Escribe un correo válido, por ejemplo tu@correo.com.';
      }
    },
    { id: 'motivo', req: true, vacio: 'Elige el motivo de tu consulta.' },
    { id: 'necesidad', req: true, vacio: 'Elige qué quieres mejorar.' },
    {
      id: 'mensaje',
      req: true,
      vacio: 'Cuéntanos tu caso para poder ayudarte.',
      regla: function (v) {
        return v.length < 10 ? 'Escribe al menos 10 caracteres.' : '';
      }
    },
    { id: 'horario', req: true, vacio: 'Elige tu horario preferido.' },
    { id: 'autorizo', req: true, vacio: 'Debes aceptar para poder contactarte.' }
  ];

  /* ---------- Validación ---------- */

  function contenedorDe(el) {
    return el.closest('.entrada') || el.closest('.campo');
  }

  function pintar(c, el, error, neutro) {
    var cont = contenedorDe(el);
    var msg = document.getElementById('msg-' + c.id);
    cont.classList.toggle('invalido', error !== '');
    cont.classList.toggle('valido', error === '' && !neutro);
    el.setAttribute('aria-invalid', error !== '' ? 'true' : 'false');
    if (msg) msg.textContent = error;
  }

  /* Devuelve true si el campo es válido. "mostrar" decide si se pinta. */
  function validar(c, mostrar) {
    var el = document.getElementById(c.id);
    var esCasilla = el.type === 'checkbox';
    var valor = esCasilla ? el.checked : el.value.trim();
    var vacio = esCasilla ? !valor : valor === '';
    var requerido = typeof c.req === 'function' ? c.req() : c.req;
    var error = '';

    if (vacio) {
      if (requerido) error = c.vacio;
    } else if (c.regla) {
      error = c.regla(valor);
    }

    if (mostrar !== false) pintar(c, el, error, vacio && !requerido);
    return error === '';
  }

  function validarTodo() {
    var primerInvalido = null;
    campos.forEach(function (c) {
      if (!validar(c, true) && !primerInvalido) {
        primerInvalido = document.getElementById(c.id);
      }
    });
    return primerInvalido;
  }

  /* Los eventos se conectan a cada campo */
  campos.forEach(function (c) {
    var el = document.getElementById(c.id);
    if (!el) return;

    el.addEventListener('blur', function () {
      el.dataset.tocado = '1';
      validar(c);
    });

    el.addEventListener('input', function () {
      if (el.dataset.tocado) validar(c);
    });

    el.addEventListener('change', function () {
      el.dataset.tocado = '1';
      validar(c);
    });
  });

  /* ---------- Teléfono: formato 9xx xxx xxx mientras escribe ---------- */

  inputTelefono.addEventListener('input', function () {
    var d = soloDigitosCelular(inputTelefono.value);
    inputTelefono.value = d.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
  });

  /* ---------- Preferencia: si elige correo, el correo pasa a ser obligatorio ---------- */

  form.querySelectorAll('input[name="preferencia"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      var correoObligatorio = preferenciaActual() === 'Correo electrónico';
      inputCorreo.required = correoObligatorio;
      if (etiquetaOpcionalCorreo) {
        etiquetaOpcionalCorreo.style.display = correoObligatorio ? 'none' : '';
      }
      if (inputCorreo.dataset.tocado) {
        validar(campos.filter(function (c) { return c.id === 'correo'; })[0]);
      }
    });
  });

  /* ---------- Contador de caracteres ---------- */

  function actualizarContador() {
    var largo = inputMensaje.value.length;
    var maximo = inputMensaje.maxLength > 0 ? inputMensaje.maxLength : 500;
    contador.textContent = largo + ' / ' + maximo;
    contador.classList.toggle('limite', largo >= maximo * 0.9);
  }

  inputMensaje.addEventListener('input', actualizarContador);
  actualizarContador();

  /* ---------- Envío ---------- */

  /* Todavía no hay servidor (action="#"), así que se simula una espera.
     Cuando exista el backend, reemplaza el cuerpo por algo así:

     return fetch('/api/contacto', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(datos)
     }).then(function (r) { if (!r.ok) throw new Error('Error'); });
  */
  function enviar(datos) {
    return new Promise(function (resolve) {
      setTimeout(resolve, 1200);
    });
  }

  function mensajeWhatsapp(d) {
    var lineas = [
      'Hola, soy ' + d.nombre + '.',
      'Motivo: ' + d.motivo + '.',
      'Quiero mejorar: ' + d.necesidad + '.'
    ];
    if (d.local) lineas.push('Local: ' + d.local + '.');
    lineas.push('Prefiero que me contacten por ' + d.preferencia + ' en horario ' + d.horario + '.');
    lineas.push('Mi caso: ' + d.mensaje);
    return lineas.join('\n');
  }

  function mostrarExito(datos) {
    boton.classList.remove('cargando');
    boton.classList.add('enviado');

    exitoNombre.textContent = datos.nombre.split(' ')[0];
    exitoWhatsapp.href =
      'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(mensajeWhatsapp(datos));

    panelExito.hidden = false;
    exitoWhatsapp.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var primerInvalido = validarTodo();
    if (primerInvalido) {
      aviso.textContent = 'Revisa los campos marcados en rojo.';
      primerInvalido.focus();
      return;
    }

    aviso.textContent = '';
    boton.disabled = true;
    boton.classList.add('cargando');

    var datos = {};
    new FormData(form).forEach(function (valor, clave) {
      datos[clave] = typeof valor === 'string' ? valor.trim() : valor;
    });

    enviar(datos)
      .then(function () {
        mostrarExito(datos);
      })
      .catch(function () {
        boton.disabled = false;
        boton.classList.remove('cargando');
        aviso.textContent = 'No pudimos enviar tu consulta. Inténtalo de nuevo o escríbenos por WhatsApp.';
      });
  });

  /* ---------- Enviar otra consulta ---------- */

  exitoNueva.addEventListener('click', function () {
    form.reset();
    panelExito.hidden = true;
    aviso.textContent = '';

    boton.disabled = false;
    boton.classList.remove('cargando', 'enviado');

    campos.forEach(function (c) {
      var el = document.getElementById(c.id);
      var cont = contenedorDe(el);
      cont.classList.remove('valido', 'invalido');
      el.removeAttribute('aria-invalid');
      delete el.dataset.tocado;
      var msg = document.getElementById('msg-' + c.id);
      if (msg) msg.textContent = '';
    });

    inputCorreo.required = false;
    if (etiquetaOpcionalCorreo) etiquetaOpcionalCorreo.style.display = '';
    actualizarContador();
    document.getElementById('nombre').focus();
  });
})();
