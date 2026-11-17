/* ==================================================================
   CASA NATURISTA CHINA — principal.js
   TURNO 1: Variables, constantes y consola
   ------------------------------------------------------------------
   ¿Qué hace este archivo?
   Guarda los datos básicos de la tienda (nombre, WhatsApp, categorías
   y productos) y los muestra en la CONSOLA del navegador para
   comprobar que todo funciona.

   ¿Cómo ver la consola?
   Abrir cualquier página del sitio > presionar F12 (o clic derecho >
   "Inspeccionar") > pestaña "Consola".

   Este archivo se enlaza al final de cada página HTML con:
       <script src="js/principal.js"></script>
   Lo ponemos al final para que el HTML cargue primero.
   ================================================================== */


/* ------------------------------------------------------------------
   PASO 0: ¿Qué diferencia hay entre const y let?
   ------------------------------------------------------------------
   const  → CONSTANTE. Su valor NO cambia nunca.
            Ejemplo: el nombre de la tienda siempre es el mismo.
   let    → VARIABLE. Su valor SÍ puede cambiar.
            Ejemplo: el stock baja cuando se vende un producto.

   Por costumbre, las constantes fijas se escriben en MAYÚSCULAS
   y las variables en minúsculas (camelCase: stockCurcuma).
   ------------------------------------------------------------------ */


/* ==================================================================
   1. DATOS DE LA TIENDA (constantes: nunca cambian)
   ================================================================== */
const NOMBRE_TIENDA = "Casa Naturista China";
const NUMERO_WHATSAPP = "51919589549"; // 51 = código de Perú + número del celular


/* ==================================================================
   2. CATEGORÍAS DEL CATÁLOGO (constantes)
   Son las 7 necesidades que el cliente puede elegir en
   "¿Qué quieres mejorar?". Las usaremos en los Turnos 3, 6 y 10.
   ================================================================== */
const CAT_DIGESTION = "Digestión";
const CAT_ENERGIA   = "Energía";
const CAT_HUESOS    = "Huesos y articulaciones";
const CAT_DEFENSAS  = "Defensas";
const CAT_CORAZON   = "Corazón";
const CAT_PIEL      = "Belleza y piel";
const CAT_DESCANSO  = "Descanso y estrés";


/* ==================================================================
   3. PRODUCTOS REALES DEL CATÁLOGO
   ------------------------------------------------------------------
   - Nombre, precio y categoría  → const (no cambian).
   - Stock                       → let   (cambia al vender o reponer).
   Los precios son los mismos que aparecen en productos.html.
   ================================================================== */

// Producto 1: Harina de cúrcuma
const PRODUCTO_1_NOMBRE    = "Harina de cúrcuma 200 g";
const PRODUCTO_1_PRECIO    = 29.90;           // en soles (S/)
const PRODUCTO_1_CATEGORIA = CAT_DIGESTION;
let   stockProducto1       = 8;               // unidades disponibles

// Producto 2: Aguaje + Maca negra
const PRODUCTO_2_NOMBRE    = "Aguaje + Maca negra";
const PRODUCTO_2_PRECIO    = 45.00;
const PRODUCTO_2_CATEGORIA = CAT_ENERGIA;
let   stockProducto2       = 5;

// Producto 3: Magnesio Complex
const PRODUCTO_3_NOMBRE    = "Magnesio Complex";
const PRODUCTO_3_PRECIO    = 46.00;
const PRODUCTO_3_CATEGORIA = CAT_HUESOS;
let   stockProducto3       = 0;               // 0 = agotado (para probar el aviso)


/* ==================================================================
   4. COMPROBAR QUE EL ARCHIVO ESTÁ ENLAZADO
   ------------------------------------------------------------------
   Si este mensaje aparece en la consola, significa que el HTML
   encontró y cargó principal.js correctamente.
   Si NO aparece, la ruta del <script> está mal escrita.
   document.title nos dice en qué página estamos.
   ================================================================== */
console.log("=== SISTEMA DE " + NOMBRE_TIENDA + " INICIADO ===");
console.log("principal.js enlazado correctamente en la página: " + document.title);
console.log("WhatsApp de la tienda: +" + NUMERO_WHATSAPP);


/* ==================================================================
   5. MOSTRAR LOS DATOS EN LA CONSOLA
   ------------------------------------------------------------------
   console.log() imprime mensajes normales (texto en blanco/negro).
   Se pueden separar varios datos con comas dentro del paréntesis.
   ================================================================== */
console.log("Categorías disponibles:", CAT_DIGESTION, "|", CAT_ENERGIA, "|", CAT_HUESOS, "|",
            CAT_DEFENSAS, "|", CAT_CORAZON, "|", CAT_PIEL, "|", CAT_DESCANSO);

console.log("Producto 1:", PRODUCTO_1_NOMBRE, "| Precio: S/", PRODUCTO_1_PRECIO,
            "| Categoría:", PRODUCTO_1_CATEGORIA, "| Stock:", stockProducto1);
console.log("Producto 2:", PRODUCTO_2_NOMBRE, "| Precio: S/", PRODUCTO_2_PRECIO,
            "| Categoría:", PRODUCTO_2_CATEGORIA, "| Stock:", stockProducto2);
console.log("Producto 3:", PRODUCTO_3_NOMBRE, "| Precio: S/", PRODUCTO_3_PRECIO,
            "| Categoría:", PRODUCTO_3_CATEGORIA, "| Stock:", stockProducto3);


/* ==================================================================
   6. VERIFICAR LOS VALORES DE LAS VARIABLES
   ------------------------------------------------------------------
   Aquí revisamos que los datos tengan sentido:
     - typeof nos dice el TIPO de dato ("number", "string", etc.).
       Un precio debe ser "number", no texto como "29.90".
     - Un precio debe ser mayor que 0.
     - El stock no puede ser negativo.

   Si algo está mal usamos console.error(): el mensaje sale en ROJO.
   Si todo está bien no aparece ningún error (consola limpia).

   ¿Cómo probarlo en la exposición?
   Cambiar por un momento  PRODUCTO_1_PRECIO = "29.90";  (con comillas)
   o  stockProducto2 = -3;  guardar, recargar la página y ver el
   error rojo en la consola. Luego dejarlo como estaba.
   ================================================================== */

// Producto 1
if (typeof PRODUCTO_1_PRECIO !== "number" || PRODUCTO_1_PRECIO <= 0) {
    console.error("ERROR: el precio de " + PRODUCTO_1_NOMBRE + " no es válido: " + PRODUCTO_1_PRECIO);
}
if (stockProducto1 < 0) {
    console.error("ERROR: el stock de " + PRODUCTO_1_NOMBRE + " no puede ser negativo.");
}

// Producto 2
if (typeof PRODUCTO_2_PRECIO !== "number" || PRODUCTO_2_PRECIO <= 0) {
    console.error("ERROR: el precio de " + PRODUCTO_2_NOMBRE + " no es válido: " + PRODUCTO_2_PRECIO);
}
if (stockProducto2 < 0) {
    console.error("ERROR: el stock de " + PRODUCTO_2_NOMBRE + " no puede ser negativo.");
}

// Producto 3
if (typeof PRODUCTO_3_PRECIO !== "number" || PRODUCTO_3_PRECIO <= 0) {
    console.error("ERROR: el precio de " + PRODUCTO_3_NOMBRE + " no es válido: " + PRODUCTO_3_PRECIO);
}
if (stockProducto3 < 0) {
    console.error("ERROR: el stock de " + PRODUCTO_3_NOMBRE + " no puede ser negativo.");
}


/* ==================================================================
   7. AVISO DE PRODUCTO AGOTADO
   ------------------------------------------------------------------
   Un producto agotado NO es un error del código, es una situación
   normal de la tienda. Por eso usamos console.warn(): el mensaje
   sale en AMARILLO (advertencia) y no en rojo.

   Resumen de colores en la consola:
     console.log()   → mensaje normal
     console.warn()  → advertencia (amarillo)
     console.error() → error real  (rojo)
   ================================================================== */
if (stockProducto3 === 0) {
    console.warn("Aviso: " + PRODUCTO_3_NOMBRE + " se encuentra AGOTADO.");
} else {
    console.log(PRODUCTO_3_NOMBRE + " tiene " + stockProducto3 + " unidades disponibles.");
}


/* ==================================================================
   8. EJEMPLO: ¿POR QUÉ EL STOCK ES let?
   ------------------------------------------------------------------
   Simulamos que se vendió 1 cúrcuma. Como stockProducto1 es let,
   podemos cambiar su valor sin problema.
   (Si fuera const, JavaScript daría el error
   "Assignment to constant variable").
   ================================================================== */
stockProducto1 = stockProducto1 - 1;
console.log("Se vendió 1 unidad de " + PRODUCTO_1_NOMBRE + ". Stock actualizado: " + stockProducto1);

console.log("=== Verificación terminada ===");



/* ==================================================================
   TURNO 2: Onclick y manipulación básica del DOM
   ------------------------------------------------------------------
   ¿Qué es el DOM?
   Es la forma en que JavaScript "ve" la página HTML: cada etiqueta
   (<p>, <button>, <h3>...) es un objeto que podemos buscar y cambiar.

   ¿Qué hace este turno?
   En productos.html, algunas tarjetas tienen un botón "Ver información".
   Al hacer clic se muestra un texto extra del producto SIN cambiar
   de página. Al hacer clic otra vez, el texto se oculta.

   Herramientas que usamos:
     onclick                   → ejecuta una función al hacer clic.
     document.getElementById() → busca un elemento por su id.
     textContent               → cambia el texto de un elemento.
     classList.toggle()        → pone o quita una clase CSS.
   ================================================================== */


/* ------------------------------------------------------------------
   1. TEXTOS DE INFORMACIÓN
   El texto de cada producto está en el dato "info" del array
   (js/catalogo.js). Solo los productos que tienen info llevan
   el botón "Ver información".
   ------------------------------------------------------------------ */


/* ------------------------------------------------------------------
   2. FUNCIÓN mostrarInformacion()
   ------------------------------------------------------------------
   Es UNA SOLA función que sirve para TODOS los botones, así no
   repito el mismo código por cada producto.

   Recibe 3 datos (parámetros) desde el onclick del botón:
     boton  → el botón que se presionó.
     idCaja → el id del <p> donde se mostrará el texto.
     texto  → la información que quiero mostrar.

   El botón y la caja los arma el Turno 9 (más abajo), así:
     botonInfo.onclick = function () {
       mostrarInformacion(botonInfo, "info-una-de-gato", producto.info);
     };
     <p id="info-una-de-gato" class="info-extra oculto"></p>
   ------------------------------------------------------------------ */
function mostrarInformacion(boton, idCaja, texto) {

    // Paso 1: buscar en la página la caja con ese id.
    const caja = document.getElementById(idCaja);

    // Paso 2: si no existe (id mal escrito), avisar en la consola y salir.
    if (caja === null) {
        console.error("ERROR: no se encontró ningún elemento con id '" + idCaja + "'.");
        return; // return detiene la función aquí
    }

    // Paso 3: escribir el texto dentro de la caja.
    caja.textContent = texto;

    // Paso 4: mostrar u ocultar la caja.
    // toggle = interruptor: si tiene la clase "oculto" se la quita (se ve),
    // y si no la tiene se la pone (se oculta).
    caja.classList.toggle("oculto");

    // Paso 5: cambiar el texto del botón según el estado de la caja.
    // classList.contains() pregunta si la caja tiene esa clase (true / false).
    if (caja.classList.contains("oculto")) {
        boton.textContent = "Ver información";
        boton.setAttribute("aria-expanded", "false"); // para lectores de pantalla
    } else {
        boton.textContent = "Ocultar información";
        boton.setAttribute("aria-expanded", "true");
    }

    // Paso 6: comprobar en la consola que la función se ejecutó.
    console.log("Clic en 'Ver información' → " + idCaja);
}

/* ============================================================
   TURNO 3 — ONCHANGE: "¿QUÉ QUIERES MEJORAR?"
   TURNO 6 — SWITCH Y RECOMENDACIONES POR CATEGORÍA
   ------------------------------------------------------------
   El selector está en index.html y tiene onchange="mostrarNecesidad()",
   o sea, cada vez que el cliente cambia de opción se ejecuta esta función.

   Turno 3: leo la opción elegida (selector.value) y muestro
            "Seleccionaste ...".
   Turno 6: con un switch agrego la recomendación de la categoría
            y preparo el enlace a esa sección de productos.html.
   Uso el mismo selector para los dos turnos, no hice otro.
   ============================================================ */
function mostrarNecesidad() {
    const selector = document.getElementById("selector-necesidad");
    const mensaje = document.getElementById("mensaje-necesidad");
    const enlace = document.getElementById("enlace-categoria");

    if (selector === null || mensaje === null || enlace === null) {
        return;
    }

    let recomendacion = "";
    let destino = "";

    // SWITCH: cada caso corresponde a una opción del selector del Turno 3.
    switch (selector.value) {
        case CAT_DIGESTION:
            recomendacion = "Revisa nuestra categoría de productos para Digestión.";
            destino = "productos.html#digestion";
            break;

        case CAT_ENERGIA:
            recomendacion = "Revisa nuestra categoría de productos para Energía.";
            destino = "productos.html#energia";
            break;

        case CAT_HUESOS:
            recomendacion = "Revisa nuestra categoría de productos para Huesos y articulaciones.";
            destino = "productos.html#huesos";
            break;

        case CAT_DEFENSAS:
            recomendacion = "Revisa nuestra categoría de productos para Defensas.";
            destino = "productos.html#defensas";
            break;

        case CAT_CORAZON:
            recomendacion = "Revisa nuestra categoría de productos para Corazón.";
            destino = "productos.html#corazon";
            break;

        case CAT_PIEL:
            recomendacion = "Revisa nuestra categoría de productos para Belleza y piel.";
            destino = "productos.html#piel";
            break;

        case CAT_DESCANSO:
            recomendacion = "Revisa nuestra categoría de productos para Descanso.";
            destino = "productos.html#descanso";
            break;

        default:
            recomendacion = "Selecciona una necesidad para ver una recomendación.";
            destino = "";
    }

    // Turno 3: primero digo qué eligió y luego la recomendación del switch
    if (destino !== "") {
        mensaje.textContent = "Seleccionaste " + selector.value + ". " + recomendacion;
    } else {
        mensaje.textContent = recomendacion;
    }

    if (destino !== "") {
        enlace.href = destino;
        enlace.textContent = "Ver productos de esta categoría";
        enlace.hidden = false;
    } else {
        enlace.removeAttribute("href");
        enlace.textContent = "";
        enlace.hidden = true;
    }

    console.log("Turno 6 — Necesidad seleccionada:", selector.value, "| Enlace:", destino);
}
/* ============================================================
   TURNO 4 — FORMULARIO CON SALUDO PERSONALIZADO
   ============================================================ */

// 1. Obtener los elementos del formulario
const campoNombre = document.getElementById("nombre");
const saludoPersonalizado = document.getElementById("saludo-personalizado");
const mensajeNombre = document.getElementById("msg-nombre");

// 2. Comprobar que los elementos existen en la página
if (campoNombre && saludoPersonalizado && mensajeNombre) {

    // 3. Obtener el nombre cuando el usuario escribe
    campoNombre.addEventListener("input", function () {

        // trim() elimina los espacios al inicio y al final
        const nombreCliente = campoNombre.value.trim();

        // 4. Validar que el nombre no esté vacío
        if (nombreCliente === "") {

            saludoPersonalizado.textContent = "";
            mensajeNombre.textContent = "Por favor, escribe tu nombre.";

        } else if (!campoNombre.checkValidity()) {

            saludoPersonalizado.textContent = "";
            mensajeNombre.textContent = "Ingresa un nombre válido de al menos 3 caracteres.";

        } else {

            // 5. Mostrar el saludo personalizado utilizando el DOM
            mensajeNombre.textContent = "";

            // No uso "Bienvenido/Bienvenida" para no adivinar si es hombre o mujer
            saludoPersonalizado.textContent =
                "Hola " + nombreCliente +
                ". Cuéntanos qué deseas mejorar para poder orientarte.";
        }
    });

    // 6. Validar también cuando el usuario abandona el campo
    campoNombre.addEventListener("blur", function () {

        if (campoNombre.value.trim() === "") {
            mensajeNombre.textContent = "Este campo es obligatorio.";
            saludoPersonalizado.textContent = "";
        }
    });
}


/* ============================================================
   CONTADOR DE CARACTERES — "Cuéntanos tu caso" (contacto.html)
   ------------------------------------------------------------
   El textarea tiene maxlength="500", o sea, máximo 500 CARACTERES
   (letras, espacios y signos), no palabras.
   Cada vez que el cliente escribe, actualizo el texto "0 / 500".
   Cuando le quedan 50 o menos, el contador se pone rojo
   (clase .limite en css/formulario.css).
   ============================================================ */
const campoMensaje = document.getElementById("mensaje");
const contadorMensaje = document.getElementById("contador-mensaje");

if (campoMensaje && contadorMensaje) {

    function actualizarContador() {
        const maximo = campoMensaje.maxLength;          // lo leo del HTML (500)
        const escritos = campoMensaje.value.length;     // caracteres escritos
        contadorMensaje.textContent = escritos + " / " + maximo + " caracteres";

        // Rojo cuando quedan 50 o menos
        contadorMensaje.classList.toggle("limite", maximo - escritos <= 50);
    }

    campoMensaje.addEventListener("input", actualizarContador);
    actualizarContador(); // al cargar, para que empiece en "0 / 500"
}


/* ============================================================
   TURNO 5 — DISPONIBILIDAD DINÁMICA DE PRODUCTOS
   ------------------------------------------------------------
   verificarStock() decide el estado según el stock (if / else if / else).
   actualizarEstadosStock() busca todas las tarjetas que tienen
   data-stock y les pone el texto y el color que corresponde.
   La llamo desde el Turno 9, después de armar las tarjetas.
   ============================================================ */

// Devuelve el mensaje y la clase visual que corresponden al stock.
function verificarStock(stock) {
    if (stock === 0) {
        return { mensaje: "● Agotado", clase: "agotado" };
    } else if (stock >= 1 && stock <= 5) {
        return { mensaje: "⚠ Últimas unidades", clase: "ultimas-unidades" };
    } else {
        return { mensaje: "● Disponible", clase: "disponible" };
    }
}

// Busca las tarjetas con data-stock y actualiza su estado visible.
function actualizarEstadosStock() {
    const tarjetas = document.querySelectorAll(".producto[data-stock]");

    tarjetas.forEach((tarjeta) => {
        const stock = Number(tarjeta.dataset.stock);
        const indicador = tarjeta.querySelector(".estado-stock");

        if (!Number.isFinite(stock) || stock < 0) {
            console.error("El stock debe ser un número igual o mayor que cero.", tarjeta);
            return;
        }

        if (indicador === null) {
            console.error("Falta el elemento .estado-stock en una tarjeta de producto.", tarjeta);
            return;
        }

        const estado = verificarStock(stock);

        // Si hay stock, también muestro cuántas unidades quedan
        if (stock > 0) {
            indicador.textContent = estado.mensaje + " (" + stock + " unidades)";
        } else {
            indicador.textContent = estado.mensaje;
        }

        indicador.classList.remove("disponible", "ultimas-unidades", "agotado");
        indicador.classList.add(estado.clase);
        tarjeta.classList.toggle("producto-agotado", stock === 0);
        tarjeta.classList.toggle("producto-ultimas-unidades", stock >= 1 && stock <= 5);
    });
}


/* ==========================================================
   TURNO 9 — Bucles y generación de productos con DOM
   ----------------------------------------------------------
   Ninguna tarjeta de producto está escrita a mano en el HTML.
   Todas las armo aquí con document.createElement() y
   appendChild(), recorriendo el array de js/catalogo.js:

   - index.html     → "Productos destacados"    (recomendado: true)
   - productos.html → "Productos en vitrina"    (vitrina: true)
                    → "Productos por necesidad" (todos, por grupo)
                    → "Tabla comparativa"       (todos, con el stock de cada local)

   Así, si cambio un precio o el stock en catalogo.js,
   cambia en todas las secciones a la vez.
   ========================================================== */

(function () {
  'use strict';

  if (typeof productos === 'undefined' || !Array.isArray(productos)) {
    console.error('Turno 9: no se encontró el array "productos" (revisa js/catalogo.js).');
    return;
  }

  /* ---------- Pequeñas ayudas ---------- */

  function formatearPrecio(precio) {
    return 'S/ ' + precio.toFixed(2);
  }

  // Crea cualquier etiqueta con su clase y su texto en una sola línea
  function crear(etiqueta, clase, texto) {
    var el = document.createElement(etiqueta);
    if (clase) { el.className = clase; }
    if (texto) { el.textContent = texto; }
    return el;
  }

  function crearImagen(producto, cargarYa) {
    var imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.alt;
    imagen.loading = cargarYa ? 'eager' : 'lazy';   // las primeras fotos cargan de frente
    imagen.decoding = 'async';
    return imagen;
  }

  // Enlace verde a WhatsApp con el nombre del producto ya escrito
  function crearBotonWhatsapp(texto, mensaje) {
    var enlace = crear('a', 'boton boton-verde', texto);
    enlace.href = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(mensaje);
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    return enlace;
  }

  // Cartelito "Más vendido", "Recomendado" o "En oferta"
  function crearEtiqueta(texto) {
    var clase = 'etiqueta';
    if (texto === 'Recomendado') { clase += ' etiqueta-recomendado'; }
    if (texto === 'En oferta') { clase += ' etiqueta-oferta'; }
    return crear('span', clase, texto);
  }

  // Precio + botón, alineados abajo de la tarjeta
  function crearPie(producto, textoBoton, mensaje) {
    var pie = crear('div', 'producto-pie');
    pie.appendChild(crear('span', 'precio', formatearPrecio(producto.precio)));
    pie.appendChild(crearBotonWhatsapp(textoBoton, mensaje));
    return pie;
  }

  function vaciar(contenedor) {
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
  }


  /* ---------- 1) Tarjeta de "Productos destacados" (index.html) ---------- */

  function crearTarjetaProducto(producto) {
    var articulo = crear('article', 'producto animacion-tarjeta');
    articulo.setAttribute('data-stock', producto.stock);  // el Turno 5 pinta el estado

    var cuerpo = crear('div', 'producto-cuerpo');
    if (producto.etiqueta !== '') {
      cuerpo.appendChild(crearEtiqueta(producto.etiqueta));
    }
    cuerpo.appendChild(crear('span', 'categoria', producto.categoria));
    cuerpo.appendChild(crear('h3', '', producto.nombre));
    cuerpo.appendChild(crear('p', 'estado-stock'));
    cuerpo.appendChild(crear('p', 'descripcion-corta', producto.descripcion));
    cuerpo.appendChild(crearPie(producto, 'Consultar', 'Hola, deseo consultar sobre ' + producto.nombre));

    articulo.appendChild(crearImagen(producto, false));
    articulo.appendChild(cuerpo);
    return articulo;
  }


  /* ---------- 2) Tarjeta completa de "Productos por necesidad" ---------- */

  function crearTarjetaCatalogo(producto) {
    var articulo = crear('article', 'producto');
    articulo.setAttribute('data-stock', producto.stock);

    var cuerpo = crear('div', 'producto-cuerpo');

    if (producto.etiqueta !== '') {
      cuerpo.appendChild(crearEtiqueta(producto.etiqueta));
    }
    cuerpo.appendChild(crear('span', 'categoria', producto.categoria));
    cuerpo.appendChild(crear('h3', '', producto.nombre));
    cuerpo.appendChild(crear('p', 'estado-stock'));
    cuerpo.appendChild(crear('p', '', producto.descripcion));

    // "Cómo tomarlo:" en negrita y luego el texto
    var comoTomar = crear('p', 'como-tomar');
    comoTomar.appendChild(crear('strong', '', 'Cómo tomarlo:'));
    comoTomar.appendChild(document.createTextNode(' ' + producto.comoTomar));
    cuerpo.appendChild(comoTomar);

    // TURNO 2: solo los productos que tienen "info" llevan el botón
    if (producto.info !== '') {
      var idCaja = 'info-' + producto.id;

      var botonInfo = crear('button', 'boton boton-borde boton-info', 'Ver información');
      botonInfo.type = 'button';
      botonInfo.setAttribute('aria-controls', idCaja);
      // Sigo usando onclick, pero ahora se lo pongo desde JavaScript
      botonInfo.onclick = function () {
        mostrarInformacion(botonInfo, idCaja, producto.info);
      };

      var cajaInfo = crear('p', 'info-extra oculto');
      cajaInfo.id = idCaja;
      cajaInfo.setAttribute('aria-live', 'polite');

      cuerpo.appendChild(botonInfo);
      cuerpo.appendChild(cajaInfo);
    }

    // TURNO 12: botón que abre el modal (modal.js lee el data-id)
    var botonDetalles = crear('button', 'boton boton-verde boton-detalles', 'Ver detalles');
    botonDetalles.type = 'button';
    botonDetalles.setAttribute('data-id', producto.id);
    botonDetalles.setAttribute('aria-haspopup', 'dialog');
    botonDetalles.setAttribute('aria-controls', 'modal-producto');
    cuerpo.appendChild(botonDetalles);

    cuerpo.appendChild(crearPie(producto, 'Lo quiero', 'Hola, quiero ' + producto.nombre));

    articulo.appendChild(crearImagen(producto, false));
    articulo.appendChild(cuerpo);
    return articulo;
  }


  /* ---------- 3) Tarjeta de la vitrina (carrusel) ---------- */

  function crearItemVitrina(producto, posicion, total) {
    var articulo = crear('article', 'carrusel-item');
    articulo.setAttribute('aria-roledescription', 'diapositiva');
    articulo.setAttribute('aria-label', posicion + ' de ' + total);

    var cuerpo = crear('div', 'carrusel-cuerpo');
    if (producto.etiqueta !== '') {
      cuerpo.appendChild(crearEtiqueta(producto.etiqueta));
    }
    cuerpo.appendChild(crear('span', 'categoria', producto.categoria));
    cuerpo.appendChild(crear('h3', '', producto.nombre));
    cuerpo.appendChild(crearPie(producto, 'Lo quiero', 'Hola, quiero ' + producto.nombre));

    articulo.appendChild(crearImagen(producto, posicion <= 3)); // las 3 primeras se ven al entrar
    articulo.appendChild(cuerpo);
    return articulo;
  }


  /* ---------- Armar cada sección ---------- */

  // index.html: recorro el array con forEach y solo uso los recomendados
  function renderizarRecomendados() {
    var contenedor = document.getElementById('grid-recomendados');
    if (!contenedor) { return; }

    vaciar(contenedor);
    productos.forEach(function (producto) {
      if (producto.recomendado) {
        contenedor.appendChild(crearTarjetaProducto(producto));
      }
    });
  }

  // productos.html: primero filtro los de vitrina y luego los recorro con for
  function renderizarVitrina() {
    var pista = document.getElementById('vitrina-pista');
    if (!pista) { return; }

    var enVitrina = productos.filter(function (p) { return p.vitrina; });

    vaciar(pista);
    for (var i = 0; i < enVitrina.length; i++) {
      pista.appendChild(crearItemVitrina(enVitrina[i], i + 1, enVitrina.length));
    }
  }

  // productos.html: por cada grupo creo su título y su grilla,
  // y adentro meto los productos de esa categoría (un for dentro de otro)
  function renderizarCatalogo() {
    var contenedor = document.getElementById('catalogo-necesidad');
    if (!contenedor) { return; }

    vaciar(contenedor);

    for (var g = 0; g < gruposCatalogo.length; g++) {
      var grupo = gruposCatalogo[g];

      var titulo = crear('h3', 'titulo-grupo', grupo.titulo);
      titulo.id = grupo.id;                          // para los enlaces del Turno 6

      var grilla = crear('div', 'grid-productos');

      for (var i = 0; i < productos.length; i++) {
        if (productos[i].categoria === grupo.categoria) {
          grilla.appendChild(crearTarjetaCatalogo(productos[i]));
        }
      }

      contenedor.appendChild(titulo);
      contenedor.appendChild(grilla);
    }
  }

  /* ---------- 4) Tabla comparativa (productos.html) ---------- */

  // Celda con el estado del stock de un local. Reutilizo verificarStock()
  // del Turno 5 y la misma pastilla de color que usan las tarjetas.
  function crearCeldaLocal(stockLocal) {
    var estado = verificarStock(stockLocal);
    var texto = estado.mensaje.replace(/^[●⚠]\s*/, '');   // sin el símbolo
    if (stockLocal > 0) {
      texto += ' (' + stockLocal + ')';
    }
    var celda = document.createElement('td');
    celda.appendChild(crear('span', 'estado-stock ' + estado.clase, texto));
    return celda;
  }

  function renderizarTabla() {
    var cuerpo = document.getElementById('tabla-comparativa-cuerpo');
    if (!cuerpo) { return; }

    vaciar(cuerpo);
    var yaPuestos = [];   // para no repetir el colágeno, que está en dos categorías

    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];
      if (yaPuestos.indexOf(p.nombre) !== -1) { continue; }
      yaPuestos.push(p.nombre);

      var fila = document.createElement('tr');
      fila.appendChild(crear('th', '', p.nombre));            // <th>: el nombre es el título de la fila
      fila.appendChild(crear('td', '', p.descripcion));
      fila.appendChild(crear('td', '', p.comoTomar));
      fila.appendChild(crear('td', '', p.presentacion !== '' ? p.presentacion : '—'));
      fila.appendChild(crear('td', 'precio-tabla', formatearPrecio(p.precio)));
      fila.appendChild(crearCeldaLocal(p.stockLocal1));
      fila.appendChild(crearCeldaLocal(p.stockLocal2));
      cuerpo.appendChild(fila);
    }
  }

  /* ---------- 5) Botones ‹ › de la vitrina ----------
     Cada clic mueve la pista el ancho de UNA tarjeta.
     Si ya estoy al principio o al final, apago el botón de ese lado. */
  function activarBotonesVitrina() {
    var pista = document.getElementById('vitrina-pista');
    var anterior = document.getElementById('vitrina-anterior');
    var siguiente = document.getElementById('vitrina-siguiente');
    if (!pista || !anterior || !siguiente) { return; }

    // Ancho de una tarjeta + el espacio entre tarjetas (gap del CSS)
    function anchoDeUnPaso() {
      var tarjeta = pista.querySelector('.carrusel-item');
      if (!tarjeta) { return pista.clientWidth; }
      var espacio = parseFloat(getComputedStyle(pista).columnGap) || 0;
      return tarjeta.offsetWidth + espacio;
    }

    function actualizarBotones() {
      var alInicio = pista.scrollLeft <= 2;
      var alFinal = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 2;
      anterior.disabled = alInicio;
      siguiente.disabled = alFinal;
    }

    anterior.addEventListener('click', function () {
      pista.scrollBy({ left: -anchoDeUnPaso(), behavior: 'smooth' });
    });
    siguiente.addEventListener('click', function () {
      pista.scrollBy({ left: anchoDeUnPaso(), behavior: 'smooth' });
    });

    // También se puede deslizar con el dedo o el touchpad,
    // así que reviso los botones cada vez que la pista se mueve
    pista.addEventListener('scroll', actualizarBotones);
    window.addEventListener('resize', actualizarBotones);
    actualizarBotones();
  }

  renderizarRecomendados();
  renderizarVitrina();
  renderizarCatalogo();
  renderizarTabla();
  activarBotonesVitrina();

  // Ya existen las tarjetas: ahora el Turno 5 les pone el estado del stock
  actualizarEstadosStock();
})();


/* ==================================================================
   TURNO 13 — CARRITO DE CONSULTA Y WHATSAPP
   ------------------------------------------------------------------
   Idea: el carrito es un ARRAY de objetos { nombre, precio, cantidad }.
   - Agregar: si el producto NO está en el array se agrega con cantidad 1;
     si YA está, solo se incrementa su cantidad (no hay duplicados).
   - Los precios los saco del array `productos` del Turno 8 (catalogo.js),
     y el subtotal y el total los calculo con calcularSubtotal() y
     calcularTotal() de ese mismo archivo.
   - El número de WhatsApp es la constante NUMERO_WHATSAPP (Turno 1).
   - Se expone como window.Carrito para que lista.js y modal.js lo usen
     (así hay UNA sola lista y no dos).
   ================================================================== */
(function () {
  'use strict';

  var CLAVE_CARRITO = 'cnc_carrito';   // para que el carrito sobreviva al recargar
  var carrito = cargarCarrito();       // ← EL ARRAY DEL CARRITO

  /* ---------- Referencias al DOM (solo existen en productos.html) ---------- */
  var modalCarrito = document.getElementById('modal-carrito');
  var btnAbrir     = document.getElementById('btn-carrito');
  if (!modalCarrito || !btnAbrir) { return; }   // otras páginas: no hace nada

  var cajaCarrito  = modalCarrito.querySelector('.modal-caja');
  var btnCerrar    = document.getElementById('carrito-cerrar');
  var listaUl      = document.getElementById('carrito-items');
  var vacioMsg     = document.getElementById('carrito-vacio');
  var resumen      = document.getElementById('carrito-resumen');
  var totalEl      = document.getElementById('carrito-total');
  var contadorEl   = document.getElementById('carrito-contador');
  var btnVaciar    = document.getElementById('carrito-vaciar');
  var btnWhatsapp  = document.getElementById('carrito-whatsapp');
  var ultimoFoco   = null;

  /* ---------- Almacenamiento ---------- */
  function cargarCarrito() {
    try {
      var d = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
      if (!Array.isArray(d)) { return []; }
      var validos = d.filter(function (i) {
        return i && typeof i.nombre === 'string' && i.precio >= 0 && i.cantidad >= 1;
      });
      // El carrito guardado pudo quedar con más unidades de las que hay ahora
      // (por ejemplo, si bajó el stock). Lo ajusto y quito los que se agotaron.
      validos.forEach(function (i) {
        var producto = buscarProductoPorNombre(i.nombre);
        var stock = producto === null ? 0 : producto.stock;
        if (i.cantidad > stock) { i.cantidad = stock; }
      });
      return validos.filter(function (i) { return i.cantidad >= 1; });
    } catch (e) { return []; }
  }
  function guardarCarrito() {
    try { localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito)); } catch (e) { /* queda en memoria */ }
  }

  /* ---------- Buscar el precio de un producto por su nombre ----------
     Uso buscarProductoPorNombre() de catalogo.js (Turno 8). */
  function precioDe(nombre) {
    var producto = buscarProductoPorNombre(nombre);
    if (producto === null) {
      console.error('Carrito: no se encontró el precio de "' + nombre + '".');
      return null;
    }
    return producto.precio;
  }

  function buscarEnCarrito(nombre) {
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === nombre) { return carrito[i]; }
    }
    return null;
  }

  function dinero(n) { return 'S/ ' + n.toFixed(2); }

  /* ---------- Operaciones del carrito ---------- */
  // ¿Está agotado? Lo reviso en el array del Turno 8.
  function estaAgotado(nombre) {
    var producto = buscarProductoPorNombre(nombre);
    return producto !== null && producto.stock === 0;
  }

  // Cuántas unidades hay en total (Local 1 + Local 2) según el array del Turno 8.
  // Es el máximo que el cliente puede pedir de ese producto.
  function stockDe(nombre) {
    var producto = buscarProductoPorNombre(nombre);
    return producto === null ? 0 : producto.stock;
  }

  // ¿Ya pidió todas las unidades que hay?
  function llegoAlMaximo(item) {
    return item.cantidad >= stockDe(item.nombre);
  }

  function agregar(nombre) {
    // Si no hay stock no lo agrego a la lista
    if (estaAgotado(nombre)) {
      alert(nombre + ' está agotado por ahora. Puedes consultarnos por WhatsApp cuándo vuelve a llegar.');
      return;
    }

    var item = buscarEnCarrito(nombre);
    if (item) {                                   // ya existe → solo sube la cantidad
      // No dejo pedir más de lo que hay en stock
      if (llegoAlMaximo(item)) {
        alert('Solo tenemos ' + stockDe(nombre) + ' unidades de ' + nombre + ' y ya están todas en tu lista.');
        return;
      }
      item.cantidad += 1;
      guardarCarrito(); dibujar();
      alert(nombre + ' ya estaba en tu lista. Ahora tienes ' + item.cantidad + ' unidades.');
      return;
    }
    var precio = precioDe(nombre);
    if (precio === null) { return; }
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });   // nuevo → cantidad 1
    guardarCarrito(); dibujar();
    alert(nombre + ' fue agregada a tu lista.');
  }

  function aumentar(nombre) {
    var item = buscarEnCarrito(nombre);
    // El botón + se desactiva al llegar al stock, pero igual lo reviso aquí
    if (item && !llegoAlMaximo(item)) { item.cantidad += 1; guardarCarrito(); dibujar(); }
  }

  function disminuir(nombre) {
    var item = buscarEnCarrito(nombre);
    if (!item) { return; }
    if (item.cantidad > 1) { item.cantidad -= 1; guardarCarrito(); dibujar(); return; }
    eliminar(nombre);      // intentó bajar de 1 → se pide confirmación; si cancela, se queda en 1
  }

  function eliminar(nombre) {
    if (!confirm('¿Deseas eliminar ' + nombre + ' de tu lista?')) { return; }
    carrito = carrito.filter(function (i) { return i.nombre !== nombre; });
    guardarCarrito(); dibujar();
  }

  function vaciar() {
    if (!carrito.length) { return; }
    if (!confirm('¿Deseas vaciar todo el carrito?')) { return; }
    carrito = [];
    guardarCarrito(); dibujar();
  }

  /* ---------- Cálculos ---------- */
  function totalUnidades() {
    return carrito.reduce(function (s, i) { return s + i.cantidad; }, 0);
  }
  function totalEstimado() {
    return calcularTotal(carrito);   // función del Turno 8 (catalogo.js)
  }

  /* ---------- WhatsApp ---------- */
  function mensajeWhatsapp() {
    var lineas = ['Hola, quisiera consultar disponibilidad de:'];
    carrito.forEach(function (i) { lineas.push(i.nombre + ' x' + i.cantidad); });
    lineas.push('Total referencial: ' + dinero(totalEstimado()));
    return lineas.join('\n');
  }
  function enlaceWhatsapp() {
    return 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(mensajeWhatsapp());
  }

  /* ---------- Dibujar el modal (todo con DOM, sin innerHTML con datos) ---------- */
  function crearBoton(clase, texto, etiqueta, nombre, accion) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = clase;
    b.textContent = texto;
    b.setAttribute('aria-label', etiqueta);
    b.setAttribute('data-accion', accion);
    b.setAttribute('data-nombre', nombre);
    return b;
  }

  function dibujar() {
    listaUl.innerHTML = '';
    carrito.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'carrito-item';

      var info = document.createElement('div');
      info.className = 'carrito-info';
      var n = document.createElement('strong');
      n.textContent = item.nombre;
      var p = document.createElement('span');
      p.textContent = dinero(item.precio) + ' c/u';
      info.appendChild(n); info.appendChild(p);

      var ctrl = document.createElement('div');
      ctrl.className = 'carrito-controles';
      var cant = document.createElement('span');
      cant.className = 'carrito-cantidad';
      cant.textContent = item.cantidad;
      cant.setAttribute('aria-label', 'Cantidad: ' + item.cantidad);
      ctrl.appendChild(crearBoton('carrito-btn carrito-menos', '−', 'Disminuir cantidad de ' + item.nombre, item.nombre, 'menos'));
      ctrl.appendChild(cant);
      var mas = crearBoton('carrito-btn carrito-mas', '+', 'Aumentar cantidad de ' + item.nombre, item.nombre, 'mas');
      // Si ya pidió todo el stock, el + queda desactivado y aviso cuántas hay
      if (llegoAlMaximo(item)) {
        mas.disabled = true;
        mas.title = 'Solo hay ' + stockDe(item.nombre) + ' unidades';
        var aviso = document.createElement('span');
        aviso.className = 'carrito-maximo';
        aviso.textContent = 'Máximo disponible: ' + stockDe(item.nombre);
        info.appendChild(aviso);
      }
      ctrl.appendChild(mas);

      var sub = document.createElement('span');
      sub.className = 'carrito-subtotal';
      sub.textContent = dinero(calcularSubtotal(item.precio, item.cantidad));

      var del = crearBoton('carrito-eliminar', 'Eliminar', 'Eliminar ' + item.nombre + ' de mi lista', item.nombre, 'eliminar');

      li.appendChild(info); li.appendChild(ctrl); li.appendChild(sub); li.appendChild(del);
      listaUl.appendChild(li);
    });

    var unidades = totalUnidades();
    var hayItems = carrito.length > 0;
    contadorEl.textContent = unidades;
    contadorEl.hidden = !hayItems;                // la burbuja del botón se oculta con 0
    vacioMsg.hidden = hayItems;                   // estado vacío
    resumen.hidden = !hayItems;                   // totales + WhatsApp solo con productos
    totalEl.textContent = dinero(totalEstimado());
    btnWhatsapp.href = hayItems ? enlaceWhatsapp() : '#';
    btnAbrir.setAttribute('aria-label', 'Abrir mi lista de productos (' + unidades + ' unidades)');

    // Avisar a lista.js / modal.js para que actualicen sus botones.
    document.dispatchEvent(new CustomEvent('carrito:cambio'));
  }

  /* ---------- Abrir / cerrar el modal ---------- */
  function abrirCarrito() {
    ultimoFoco = document.activeElement;
    modalCarrito.hidden = false;
    document.body.classList.add('modal-abierto');
    listaUl.scrollTop = 0;          // la lista siempre empieza desde el primer producto
    btnCerrar.focus();
  }
  function cerrarCarrito() {
    if (modalCarrito.hidden) { return; }
    modalCarrito.hidden = true;
    document.body.classList.remove('modal-abierto');
    if (ultimoFoco && ultimoFoco.focus) { ultimoFoco.focus(); }
  }

  /* ---------- Eventos ---------- */
  btnAbrir.addEventListener('click', abrirCarrito);
  btnCerrar.addEventListener('click', cerrarCarrito);
  btnVaciar.addEventListener('click', vaciar);

  modalCarrito.addEventListener('click', function (e) {
    if (e.target === modalCarrito) { cerrarCarrito(); return; }        // clic fuera
    var b = e.target.closest('button[data-accion]');
    if (!b) { return; }
    var nombre = b.getAttribute('data-nombre');
    var accion = b.getAttribute('data-accion');
    if (accion === 'mas') { aumentar(nombre); }
    else if (accion === 'menos') { disminuir(nombre); }
    else if (accion === 'eliminar') { eliminar(nombre); }
  });

  btnWhatsapp.addEventListener('click', function (e) {
    if (!carrito.length) { e.preventDefault(); }   // seguridad: nunca abrir WhatsApp vacío
  });

  document.addEventListener('keydown', function (e) {
    if (modalCarrito.hidden) { return; }
    if (e.key === 'Escape') { cerrarCarrito(); return; }
    if (e.key === 'Tab') {                          // el foco no sale del modal
      var f = Array.prototype.filter.call(
        cajaCarrito.querySelectorAll('button, a[href]'),
        function (el) { return el.offsetParent !== null; });
      if (!f.length) { return; }
      var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  /* ---------- API pública: la usan lista.js (Turno 7) y modal.js (Turno 12) ---------- */
  window.Carrito = {
    agregar: agregar,
    eliminar: eliminar,
    contiene: function (nombre) { return buscarEnCarrito(nombre) !== null; },
    estaAgotado: estaAgotado,
    nombres: function () { return carrito.map(function (i) { return i.nombre; }); }
  };

  dibujar();
})();
