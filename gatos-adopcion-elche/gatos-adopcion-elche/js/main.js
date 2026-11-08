// ===== Elementos del DOM =====
const listaGatos = document.getElementById("lista-gatos");
const contador = document.getElementById("contador");
const filtroSexo = document.getElementById("filtro-sexo");
const filtroEdad = document.getElementById("filtro-edad");
const selectGato = document.getElementById("gato");
const formulario = document.getElementById("formulario");
const errores = document.getElementById("errores");
const exito = document.getElementById("exito");

// ===== Funciones auxiliares =====

// Devuelve la categoría de edad de un gato
function categoriaEdad(edad) {
  if (edad < 1) {
    return "cachorro";
  } else if (edad <= 7) {
    return "adulto";
  } else {
    return "senior";
  }
}

// Convierte la edad en un texto legible
function textoEdad(edad) {
  if (edad < 1) {
    const meses = Math.round(edad * 12);
    return meses + " meses";
  }
  return edad === 1 ? "1 año" : edad + " años";
}

// ===== Mostrar gatos =====
function mostrarGatos(lista) {
  listaGatos.innerHTML = "";

  if (lista.length === 0) {
    listaGatos.innerHTML = '<p class="sin-resultados">No hay gatos con esos filtros 😿</p>';
    contador.textContent = "";
    return;
  }

  lista.forEach(function (gato) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
      <img src="${gato.imagen}" alt="Foto de ${gato.nombre}" class="tarjeta__foto" data-ficha="${gato.id}" title="Ver ficha de ${gato.nombre}">
      <div class="tarjeta__info">
        <h3>${gato.nombre}</h3>
        <div>
          <span class="etiqueta">${gato.sexo}</span>
          <span class="etiqueta">${textoEdad(gato.edad)}</span>
        </div>
        <p>${gato.descripcion}</p>
        <button class="boton" data-id="${gato.id}">Quiero adoptarlo</button>
      </div>
    `;

    listaGatos.appendChild(tarjeta);
  });

  contador.textContent = "Mostrando " + lista.length + " de " + gatos.length + " gatos";
}

// ===== Filtros =====
function filtrarGatos() {
  const sexo = filtroSexo.value;
  const edad = filtroEdad.value;

  const filtrados = gatos.filter(function (gato) {
    const cumpleSexo = sexo === "todos" || gato.sexo === sexo;
    const cumpleEdad = edad === "todos" || categoriaEdad(gato.edad) === edad;
    return cumpleSexo && cumpleEdad;
  });

  mostrarGatos(filtrados);
}

filtroSexo.addEventListener("change", filtrarGatos);
filtroEdad.addEventListener("change", filtrarGatos);

// ===== Rellenar el select del formulario =====
function rellenarSelect() {
  gatos.forEach(function (gato) {
    const opcion = document.createElement("option");
    opcion.value = gato.nombre;
    opcion.textContent = gato.nombre;
    selectGato.appendChild(opcion);
  });
}

// ===== Adoptar: selecciona el gato en el formulario y baja hasta él =====
function adoptar(gato) {
  selectGato.value = gato.nombre;
  document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
}

function buscarGato(id) {
  return gatos.find(function (g) { return g.id === Number(id); });
}

// ===== Ficha del gato (ventana modal) =====
const ficha = document.getElementById("ficha");
let gatoAbierto = null;

function abrirFicha(gato) {
  gatoAbierto = gato;
  document.getElementById("ficha-foto").src = gato.imagen;
  document.getElementById("ficha-foto").alt = "Foto de " + gato.nombre;
  document.getElementById("ficha-nombre").textContent = gato.nombre;
  document.getElementById("ficha-sexo").textContent = gato.sexo;
  document.getElementById("ficha-edad").textContent = textoEdad(gato.edad);
  document.getElementById("ficha-descripcion").textContent = gato.descripcion;
  ficha.showModal();
}

document.getElementById("ficha-cerrar").addEventListener("click", function () {
  ficha.close();
});

// Cerrar al hacer clic fuera del contenido
ficha.addEventListener("click", function (evento) {
  if (evento.target === ficha) {
    ficha.close();
  }
});

document.getElementById("ficha-adoptar").addEventListener("click", function () {
  ficha.close();
  adoptar(gatoAbierto);
});

// ===== Clics en las tarjetas =====
// Usamos delegación de eventos porque las tarjetas se crean dinámicamente
listaGatos.addEventListener("click", function (evento) {
  if (evento.target.matches("button[data-id]")) {
    adoptar(buscarGato(evento.target.dataset.id));
  }

  if (evento.target.matches("img[data-ficha]")) {
    abrirFicha(buscarGato(evento.target.dataset.ficha));
  }
});

// ===== Validación del formulario =====
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  const listaErrores = [];

  if (nombre.length < 2) {
    listaErrores.push("Escribe tu nombre.");
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    listaErrores.push("El email no es válido.");
  }

  // Teléfono español: 9 cifras empezando por 6, 7, 8 o 9
  const regexTelefono = /^[6789]\d{8}$/;
  if (!regexTelefono.test(telefono)) {
    listaErrores.push("El teléfono debe tener 9 cifras.");
  }

  if (mensaje.length < 10) {
    listaErrores.push("Cuéntanos algo más sobre ti (mínimo 10 caracteres).");
  }

  if (listaErrores.length > 0) {
    errores.innerHTML = listaErrores.join("<br>");
    exito.textContent = "";
    return;
  }

  // No hay backend: simulamos el envío
  errores.innerHTML = "";
  exito.textContent = "¡Gracias, " + nombre + "! Hemos recibido tu solicitud para adoptar a " + selectGato.value + ". Te llamaremos pronto.";
  formulario.reset();
});

// ===== Inicio =====
mostrarGatos(gatos);
rellenarSelect();
