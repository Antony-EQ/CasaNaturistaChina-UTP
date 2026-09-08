// Casa Naturista China — interacciones del sitio
document.addEventListener('DOMContentLoaded', function () {
  const WA_BASE = 'https://wa.me/51919589549?text=';

  /* ---------- Selector de necesidades ---------- */
  const necesidades = document.querySelectorAll('.necesidad');
  const destacado = document.getElementById('necesidad-elegida');
  const detalle = document.getElementById('necesidad-detalle');
  const selectNecesidad = document.getElementById('fNecesidad');

  necesidades.forEach(function (card) {
    card.addEventListener('click', function () {
      necesidades.forEach(function (c) { c.classList.remove('activa'); });
      card.classList.add('activa');

      const label = card.getAttribute('data-label');
      const hint = card.getAttribute('data-hint');
      if (destacado) destacado.textContent = label;
      if (detalle) detalle.textContent = hint;
      if (selectNecesidad) selectNecesidad.value = label;
    });
  });

  /* ---------- Formulario de contacto ---------- */
  const formulario = document.getElementById('formulario-contacto');
  const vistaFormulario = document.getElementById('vista-formulario');
  const vistaExito = document.getElementById('vista-exito');
  const mensajeError = document.getElementById('mensaje-error');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  const enlaceWaForm = document.getElementById('enlace-wa-formulario');
  const enlaceWaExito = document.getElementById('enlace-wa-exito');

  function construirMensajeWa() {
    const nombre = document.getElementById('fNombre').value.trim() || '[nombre]';
    const ciudad = document.getElementById('fCiudad').value;
    const necesidad = document.getElementById('fNecesidad').value;
    const mensaje = document.getElementById('fMensaje').value.trim();
    let texto = 'Hola Casa Naturista China. Soy ' + nombre + ' de ' + ciudad + '. Quiero asesoría para: ' + necesidad + '.';
    if (mensaje) texto += '\n' + mensaje;
    return WA_BASE + encodeURIComponent(texto);
  }

  function actualizarEnlaceWa() {
    const url = construirMensajeWa();
    if (enlaceWaForm) enlaceWaForm.href = url;
    if (enlaceWaExito) enlaceWaExito.href = url;
  }

  if (formulario) {
    formulario.addEventListener('input', actualizarEnlaceWa);
    actualizarEnlaceWa();

    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      mensajeError.textContent = '';

      const nombre = document.getElementById('fNombre').value.trim();
      const correo = document.getElementById('fCorreo').value.trim();
      const telefono = document.getElementById('fTelefono').value.replace(/\D/g, '');
      const aceptado = document.getElementById('fAcepto').checked;

      if (!nombre) {
        mensajeError.textContent = 'Escribe tu nombre para poder responderte.';
        return;
      }
      if (!correo || !correo.includes('@')) {
        mensajeError.textContent = 'Escribe un correo electrónico válido.';
        return;
      }
      if (telefono.length < 9) {
        mensajeError.textContent = 'Necesitamos un número de WhatsApp válido (9 dígitos).';
        return;
      }
      if (!aceptado) {
        mensajeError.textContent = 'Marca la casilla para que podamos contactarte.';
        return;
      }

      actualizarEnlaceWa();
      document.getElementById('nombre-enviado').textContent = nombre.split(' ')[0];
      document.getElementById('telefono-enviado').textContent = document.getElementById('fTelefono').value;
      document.getElementById('necesidad-enviada').textContent = document.getElementById('fNecesidad').value;

      vistaFormulario.hidden = true;
      vistaExito.hidden = false;
    });
  }

  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', function () {
      formulario.reset();
      mensajeError.textContent = '';
      vistaExito.hidden = true;
      vistaFormulario.hidden = false;
    });
  }
});
