/* ==========================================================
   TURNO 8 — Arrays, objetos y operadores
   ----------------------------------------------------------
   Aquí está el ÚNICO array de productos de toda la página.
   Antes teníamos dos (uno aquí y otro en modal.js) con los
   mismos datos repetidos, así que los junté en uno solo.
   Ahora el modal, el filtro, el carrito y los productos
   recomendados sacan la información de este array.

   Si hay que cambiar un precio o el stock, solo se cambia aquí.

   Cada producto es un objeto con estos datos:
     id          → nombre corto sin espacios, lo uso para encontrar
                   el producto desde el botón "Ver detalles".
     nombre      → como aparece en la tarjeta.
     categoria   → tiene que ser igual a las opciones del selector
                   ("¿Qué quieres mejorar?"), si no el filtro no lo encuentra.
     precio      → en soles, como número (sin comillas).
     stockLocal1 → unidades en el Local 1 (Cercado de Tacna).
     stockLocal2 → unidades en el Local 2 (Gregorio Albarracín).
                   El stock total lo calculo abajo sumando los dos.
     presentacion → frasco, bolsa, etc. Vacío = en la tabla sale "—".
     imagen, alt → la foto y su descripción.
     descripcion, comoTomar → textos que se ven en el modal.
     recomendado → true si sale en "Productos destacados" del inicio (index.html).
     vitrina     → true si sale en el carrusel "Productos en vitrina".
     etiqueta    → cartelito de color de la tarjeta ("Más vendido",
                   "Recomendado", "En oferta"). Vacío = sin cartelito.
     info        → texto del botón "Ver información" (Turno 2).
                   Vacío = la tarjeta no lleva ese botón.

   OJO: este archivo se carga ANTES que principal.js, por eso
   escribo las categorías como texto y no con las constantes CAT_.
   ========================================================== */

/* Los grupos de "Productos por necesidad", en el orden en que salen.
   categoria → tiene que ser igual a la categoría de los productos.
   titulo    → lo que se ve como título del grupo.
   id        → para los enlaces del Turno 6 (productos.html#digestion, etc.). */
const gruposCatalogo = [
  { categoria: "Digestión",               titulo: "Digestión y desintoxicación", id: "digestion" },
  { categoria: "Energía",                 titulo: "Energía y vitalidad",         id: "energia" },
  { categoria: "Huesos y articulaciones", titulo: "Huesos y articulaciones",     id: "huesos" },
  { categoria: "Defensas",                titulo: "Defensas",                    id: "defensas" },
  { categoria: "Corazón",                 titulo: "Corazón y presión",           id: "corazon" },
  { categoria: "Belleza y piel",          titulo: "Belleza y piel",              id: "piel" },
  { categoria: "Descanso y estrés",       titulo: "Descanso y estrés",           id: "descanso" }
];

const productos = [
  // ---------- Digestión ----------
  {
    id: "carbon-activado",
    nombre: "Carbón activado",
    categoria: "Digestión",
    precio: 35.00,
    stockLocal1: 10,
    stockLocal2: 0,
    presentacion: "Frasco 100 cápsulas",
    imagen: "img/productos/carbon-activado.jpeg",
    alt: "Frasco de cápsulas de carbón activado",
    descripcion: "Ayuda a desintoxicar y alivia la hinchazón después de las comidas.",
    comoTomar: "2 cápsulas, alejadas de las comidas y medicamentos.",
    recomendado: false,
    vitrina: true,
    etiqueta: "Más vendido",
    info: ""
  },
  {
    id: "harina-de-curcuma-200-g",
    nombre: "Harina de cúrcuma 200 g",
    categoria: "Digestión",
    precio: 29.90,
    stockLocal1: 5,
    stockLocal2: 3,
    presentacion: "Bolsa 200 g",
    imagen: "img/productos/curcuma.jpeg",
    alt: "Bolsa de harina de cúrcuma de 200 gramos",
    descripcion: "Antiinflamatorio natural que también apoya la digestión y el hígado.",
    comoTomar: "1 cucharadita en agua tibia, 2 veces al día.",
    recomendado: true,
    vitrina: true,
    etiqueta: "Recomendado",
    info: "Cúrcuma: producto natural utilizado como apoyo para el bienestar y la digestión."
  },
  {
    id: "papaya-cleanse",
    nombre: "Papaya Cleanse",
    categoria: "Digestión",
    precio: 42.00,
    stockLocal1: 4,
    stockLocal2: 3,
    presentacion: "",
    imagen: "img/productos/papaya cleanse 1.jpeg",
    alt: "Frasco de Papaya Cleanse",
    descripcion: "Limpieza intestinal natural, combate el tránsito lento y la pesadez.",
    comoTomar: "1 medida en las noches antes de acostarse.",
    recomendado: false,
    vitrina: false,
    etiqueta: "En oferta",
    info: ""
  },

  // ---------- Energía ----------
  {
    id: "aguaje-maca-negra",
    nombre: "Aguaje + Maca negra",
    categoria: "Energía",
    precio: 45.00,
    stockLocal1: 3,
    stockLocal2: 2,
    presentacion: "Frasco 100 cápsulas",
    imagen: "img/productos/aguaje.jpeg",
    alt: "Frasco de cápsulas de aguaje con maca negra",
    descripcion: "Energía sostenida durante el día y apoyo al equilibrio hormonal femenino.",
    comoTomar: "2 cápsulas con el desayuno diariamente.",
    recomendado: true,
    vitrina: true,
    etiqueta: "",
    info: ""
  },
  {
    id: "maca-negra-pura",
    nombre: "Maca Negra Pura",
    categoria: "Energía",
    precio: 38.00,
    stockLocal1: 5,
    stockLocal2: 4,
    presentacion: "",
    imagen: "img/productos/maca negra.jpeg",
    alt: "Frasco de cápsulas de Maca Negra pura",
    descripcion: "Aumenta la resistencia física, combate el cansancio y mejora la concentración.",
    comoTomar: "2 cápsulas por la mañana con abundante agua.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: "Maca Negra: raíz andina que brinda energía y resistencia física durante el día."
  },
  {
    id: "alphaman-energy",
    nombre: "Alphaman Energy",
    categoria: "Energía",
    precio: 55.00,
    stockLocal1: 3,
    stockLocal2: 3,
    presentacion: "",
    imagen: "img/productos/alphaman.jpeg",
    alt: "Frasco de cápsulas Alphaman",
    descripcion: "Fórmula vigorizante para el rendimiento, fuerza física y vitalidad masculina.",
    comoTomar: "1 cápsula al día por las mañanas.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },

  // ---------- Huesos y articulaciones ----------
  {
    id: "colageno-vitamina-c",
    nombre: "Colágeno + Vitamina C",
    categoria: "Huesos y articulaciones",
    precio: 69.90,
    stockLocal1: 0,
    stockLocal2: 6,
    presentacion: "Frasco 300 g",
    imagen: "img/productos/colageno.jpeg",
    alt: "Frasco de colágeno con vitamina C en polvo",
    descripcion: "Cuida y regenera el cartílago en rodillas, hombros y columna.",
    comoTomar: "1 medida (10 g) en agua en ayunas.",
    recomendado: true,
    vitrina: true,
    etiqueta: "",
    info: ""
  },
  {
    id: "arthyzhan-articular",
    nombre: "Arthyzhan Articular",
    categoria: "Huesos y articulaciones",
    precio: 49.00,
    stockLocal1: 4,
    stockLocal2: 4,
    presentacion: "",
    imagen: "img/productos/Arthyzhan.jpeg",
    alt: "Frasco de cápsulas Arthyzhan para articulaciones",
    descripcion: "Alivio rápido para la rigidez y el dolor en coyunturas y articulaciones.",
    comoTomar: "1 cápsula 2 veces al día después de alimentos.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },
  {
    id: "magnesio-complex",
    nombre: "Magnesio Complex",
    categoria: "Huesos y articulaciones",
    precio: 46.00,
    stockLocal1: 0,
    stockLocal2: 0,                // agotado en los dos locales a propósito
    presentacion: "",
    imagen: "img/productos/magnesio complex.jpeg",
    alt: "Frasco de cápsulas Magnesio Complex",
    descripcion: "Fijador natural de calcio, previene la osteoporosis y alivia calambres.",
    comoTomar: "2 cápsulas por las noches con agua tibia.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: "Magnesio Complex: ayuda a fijar el calcio en los huesos y a reducir los calambres."
  },

  // ---------- Defensas ----------
  {
    id: "moringa",
    nombre: "Moringa",
    categoria: "Defensas",
    precio: 32.00,
    stockLocal1: 6,
    stockLocal2: 6,
    presentacion: "Frasco 100 cápsulas",
    imagen: "img/productos/moringa.jpeg",
    alt: "Frasco de cápsulas de moringa",
    descripcion: "Aporte de vitaminas y antioxidantes para reforzar las defensas.",
    comoTomar: "1 cápsula con el almuerzo.",
    recomendado: false,
    vitrina: true,
    etiqueta: "",
    info: ""
  },
  {
    id: "una-de-gato",
    nombre: "Uña de gato",
    categoria: "Defensas",
    precio: 28.00,
    stockLocal1: 5,
    stockLocal2: 4,
    presentacion: "Frasco 100 cápsulas",
    imagen: "img/productos/unadegato.jpg",
    alt: "Frasco de cápsulas de uña de gato",
    descripcion: "Planta peruana tradicional para el refuerzo del sistema inmune.",
    comoTomar: "1 cápsula, 2 veces al día con alimentos.",
    recomendado: false,
    vitrina: true,
    etiqueta: "",
    info: "Uña de gato: planta de la Amazonía peruana usada para reforzar las defensas."
  },
  {
    id: "aceite-de-oregano",
    nombre: "Aceite de Orégano",
    categoria: "Defensas",
    precio: 39.00,
    stockLocal1: 6,
    stockLocal2: 5,
    presentacion: "",
    imagen: "img/productos/aceite de oregano.jpeg",
    alt: "Frasco de Aceite de Orégano",
    descripcion: "Potente antibacteriano y antiviral natural para vías respiratorias e inmunidad.",
    comoTomar: "3 a 5 gotas diluidas en agua o jugo.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },

  // ---------- Corazón ----------
  {
    id: "omega-3-puro",
    nombre: "Omega 3 Puro",
    categoria: "Corazón",
    precio: 55.00,
    stockLocal1: 7,
    stockLocal2: 0,
    presentacion: "Frasco 60 cápsulas",
    imagen: "img/productos/omega-3.jfif",
    alt: "Frasco de cápsulas de omega 3",
    descripcion: "Apoyo a la salud del corazón, circulación y control del colesterol.",
    comoTomar: "1 cápsula con el desayuno.",
    recomendado: false,
    vitrina: true,
    etiqueta: "",
    info: ""
  },
  {
    id: "cardiox-arterial",
    nombre: "Cardiox Arterial",
    categoria: "Corazón",
    precio: 48.00,
    stockLocal1: 3,
    stockLocal2: 3,
    presentacion: "",
    imagen: "img/productos/cardiox.jpeg",
    alt: "Frasco de cápsulas Cardiox",
    descripcion: "Favorece la elasticidad vascular y el equilibrio de la presión sanguínea.",
    comoTomar: "1 cápsula 2 veces al día antes de comer.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },
  {
    id: "actiomega-cardio",
    nombre: "Actiomega Cardio",
    categoria: "Corazón",
    precio: 52.00,
    stockLocal1: 4,
    stockLocal2: 4,
    presentacion: "",
    imagen: "img/productos/actiomega.jpeg",
    alt: "Frasco de cápsulas Actiomega",
    descripcion: "Concentrado de ácidos grasos EPA/DHA para cuidar el sistema cardiovascular.",
    comoTomar: "1 cápsula blanda con el almuerzo.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },

  // ---------- Belleza y piel ----------
  // El colágeno también está aquí porque en la tienda se vende para las
  // dos cosas. Tiene otro id para que el modal muestre el texto de piel.
  {
    id: "colageno-vitamina-c-piel",
    nombre: "Colágeno + Vitamina C",
    categoria: "Belleza y piel",
    precio: 69.90,
    stockLocal1: 0,
    stockLocal2: 6,
    presentacion: "Frasco 300 g",
    imagen: "img/productos/colageno.jpeg",
    alt: "Frasco de colágeno con vitamina C en polvo",
    descripcion: "Piel más firme y luminosa con absorción rápida y sabor neutro.",
    comoTomar: "1 medida (10 g) en agua, en ayunas.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },
  {
    id: "aceite-de-coco-virgen",
    nombre: "Aceite de Coco Virgen",
    categoria: "Belleza y piel",
    precio: 34.00,
    stockLocal1: 5,
    stockLocal2: 5,
    presentacion: "",
    imagen: "img/productos/aceite de coco.jpeg",
    alt: "Frasco de Aceite de Coco virgen",
    descripcion: "Nutrición e hidratación profunda para cutis, cabello y cuidado corporal.",
    comoTomar: "Aplicar directo en piel o 1 cucharada diaria.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },
  {
    id: "biofem-mujer",
    nombre: "Biofem Mujer",
    categoria: "Belleza y piel",
    precio: 45.00,
    stockLocal1: 5,
    stockLocal2: 4,
    presentacion: "",
    imagen: "img/productos/biofem1.jpeg",
    alt: "Frasco de cápsulas Biofem",
    descripcion: "Bienestar femenino, revitalización de la piel y equilibrio hormonal.",
    comoTomar: "2 cápsulas al día con alimentos.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },

  // ---------- Descanso y estrés ----------
  {
    id: "miel-de-abeja-500-g",
    nombre: "Miel de abeja 500 g",
    categoria: "Descanso y estrés",
    precio: 25.00,
    stockLocal1: 8,
    stockLocal2: 7,
    presentacion: "Frasco 500 g",
    imagen: "img/productos/miel1.jpg",
    alt: "Frasco de miel de abeja de 500 gramos",
    descripcion: "Induce el descanso natural nocturno y suaviza la garganta.",
    comoTomar: "1 cucharada antes de dormir.",
    recomendado: false,
    vitrina: true,
    etiqueta: "",
    info: ""
  },
  {
    id: "magnesio-complex-relax",
    nombre: "Magnesio Complex Relax",
    categoria: "Descanso y estrés",
    precio: 46.00,
    stockLocal1: 7,
    stockLocal2: 7,
    presentacion: "",
    imagen: "img/productos/magnesio complex.jpeg",
    alt: "Frasco de cápsulas Magnesio Complex",
    descripcion: "Relajación neuromuscular profunda, alivia el insomnio y el estrés diario.",
    comoTomar: "2 cápsulas 30 minutos antes de dormir.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  },
  {
    id: "te-verde-antioxidante",
    nombre: "Té Verde Antioxidante",
    categoria: "Descanso y estrés",
    precio: 22.00,
    stockLocal1: 10,
    stockLocal2: 10,
    presentacion: "",
    imagen: "img/productos/te verde 1.jpeg",
    alt: "Caja de Té Verde antioxidante",
    descripcion: "Rico en L-teanina calmante, ideal para despejar la mente y bajar tensiones.",
    comoTomar: "1 taza tibia a media tarde o noche.",
    recomendado: false,
    vitrina: false,
    etiqueta: "",
    info: ""
  }
];


/* ==========================================================
   STOCK TOTAL
   ----------------------------------------------------------
   Cada producto tiene el stock de cada local. Aquí sumo los dos
   (operador +) y lo guardo en "stock", que es lo que usan las
   tarjetas, el modal y el carrito.
   ========================================================== */
for (let i = 0; i < productos.length; i++) {
  productos[i].stock = productos[i].stockLocal1 + productos[i].stockLocal2;
}


/* ==========================================================
   BUSCAR UN PRODUCTO
   ----------------------------------------------------------
   Recorro el array con un for y devuelvo el producto que tenga
   ese id. Si no lo encuentro devuelvo null.
   La uso en el modal y en el filtro.
   ========================================================== */
function buscarProductoPorId(id) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      return productos[i];
    }
  }
  return null;
}

// Lo mismo pero buscando por el nombre. La usa el carrito.
function buscarProductoPorNombre(nombre) {
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre === nombre) {
      return productos[i];
    }
  }
  return null;
}


/* ==========================================================
   OPERADORES PARA PRECIOS Y CANTIDADES
   ----------------------------------------------------------
   Estas funciones las usa el carrito (Turno 13) para sacar el
   subtotal de cada producto y el total.
   ========================================================== */

// Subtotal = precio x cantidad (operador *)
// Ejemplo: calcularSubtotal(46, 2) → 92
function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}

// Total = suma de todos los subtotales (operador +=)
// Recibe la lista del carrito: [{ precio, cantidad }, ...]
function calcularTotal(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total += calcularSubtotal(lista[i].precio, lista[i].cantidad);
  }
  return total;
}

// Simulo una venta: si hay stock suficiente, lo descuento con -=
// y muestro en consola cuánto se pagaría.
function procesarCompraItem(id, cantidadDeseada) {
  const producto = buscarProductoPorId(id);

  if (producto === null) {
    console.error("No existe ningún producto con el id: " + id);
    return 0;
  }

  // Operadores de comparación (<=, >) y lógico (&&)
  if (cantidadDeseada > 0 && cantidadDeseada <= producto.stock) {
    producto.stock -= cantidadDeseada;                                    // resta y asigna
    const subtotal = calcularSubtotal(producto.precio, cantidadDeseada);  // multiplica

    console.log("Venta: " + cantidadDeseada + " x " + producto.nombre);
    console.log("Subtotal: S/ " + subtotal.toFixed(2));
    console.log("Stock que queda: " + producto.stock);
    return subtotal;
  }

  console.warn("No hay stock suficiente de " + producto.nombre + ". Quedan: " + producto.stock);
  return 0;
}
