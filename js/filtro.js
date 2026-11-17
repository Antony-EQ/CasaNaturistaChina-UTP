/* ==========================================================
   TURNO 10 — Filtro de productos con DOM
   ----------------------------------------------------------
   Uso el selector "¿Qué quieres mejorar?" de productos.html
   (onchange="filtrarProductos()") y el array del Turno 8.

   Cómo funciona:
   1. Leo la opción que eligió el cliente.
   2. Recorro todas las tarjetas con un for.
   3. De cada tarjeta saco su id (del botón "Ver detalles")
      y busco ese producto en el array para saber su categoría.
   4. Si la categoría coincide (o eligió "Todos") la muestro,
      si no, le pongo la clase "oculto".
   Todo pasa sin recargar la página.
   ========================================================== */

function filtrarProductos() {
    const selector = document.getElementById("selector-necesidad");
    const tarjetas = document.querySelectorAll("#por-necesidad .producto");
    const seleccion = selector.value;
    let cantidad = 0;

    for (const tarjeta of tarjetas) {
        // El botón "Ver detalles" guarda el id del producto en data-id
        const boton = tarjeta.querySelector(".boton-detalles");
        const producto = boton ? buscarProductoPorId(boton.dataset.id) : null;

        if (producto === null) {
            console.error("Esta tarjeta no tiene un producto en el array:", tarjeta);
            continue; // paso a la siguiente tarjeta
        }

        // Condición: se muestra si eligió "Todos" o si la categoría es la misma
        if (seleccion === "Todos" || producto.categoria === seleccion) {
            tarjeta.classList.remove("oculto");
            cantidad++;
        } else {
            tarjeta.classList.add("oculto");
        }
    }

    // Si un grupo se queda sin tarjetas visibles, también oculto su título
    const grupos = document.querySelectorAll("#por-necesidad .grid-productos");
    for (const grupo of grupos) {
        const vacio = grupo.querySelector(".producto:not(.oculto)") === null;
        grupo.classList.toggle("oculto", vacio);
        grupo.previousElementSibling.classList.toggle("oculto", vacio);
    }

    // Mensaje con cuántos productos se encontraron
    const mensaje = document.getElementById("resultado-filtro");
    if (cantidad === 0) {
        mensaje.textContent = "No hay productos para esta categoría.";
    } else {
        mensaje.textContent = "Productos encontrados: " + cantidad;
    }
}

// Lo llamo una vez al cargar para que salga el mensaje con el total
filtrarProductos();
