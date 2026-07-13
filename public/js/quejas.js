import Swal from "sweetalert2";

//Cambiar el formulario de acuerdo a lo que seleccione el usuario: presentar queja o ver estatus a traves de folio
const btnRegister = document.getElementById("btnRegister");
const btnSearch = document.getElementById("btnSearch");

const registerSection = document.getElementById("registerSection");
const searchSection = document.getElementById("searchSection");

btnRegister.addEventListener("click", () => {
  registerSection.classList.remove("hidden");
  searchSection.classList.add("hidden");

  btnRegister.classList.add("bg-primary", "text-white");
  btnRegister.classList.remove("text-gray-300");

  btnSearch.classList.remove("bg-primary", "text-white");
  btnSearch.classList.add("text-gray-300");
});

btnSearch.addEventListener("click", () => {
  searchSection.classList.remove("hidden");
  registerSection.classList.add("hidden");

  btnSearch.classList.add("bg-primary", "text-white");
  btnSearch.classList.remove("text-gray-300");

  btnRegister.classList.remove("bg-primary", "text-white");
  btnRegister.classList.add("text-gray-300");
});

const form = document.getElementById("complaintsForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(form);

  const respuesta = await fetch("http://wisp-api.test/guardar_queja.php", {
    method: "POST",
    body: datos,
  });

  const resultado = await respuesta.json();

  if (resultado.success) {
    form.reset();

    Swal.fire({
      icon: "success",
      title: "¡Solicitud enviada!",
      html: `
      <p class="text-gray-600">
        Tu solicitud fue registrada correctamente.
      </p>

      <div class="my-4 rounded-lg bg-gray-100 p-4">
        <p class="text-sm text-gray-500">Número de folio</p>
        <p id="folioTexto" style="font-size:22px;font-weight:bold;">
          ${resultado.folio}
        </p>
      </div>

      <p>
        <strong>Guarda este folio.</strong><br>
        Lo necesitarás para consultar el estado de tu queja o sugerencia.
      </p>
    `,
      confirmButtonText: "Entendido",
      confirmButtonColor: "#647EF5",
      showDenyButton: true,
      denyButtonText: "Copiar folio",
      denyButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isDenied) {
        navigator.clipboard.writeText(resultado.folio);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Folio copiado al portapapeles",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "No se pudo registrar la solicitud",
      text:
        resultado.message || "Ocurrió un error inesperado. Intenta nuevamente.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#647EF5",
    });
  }
});

//Buscar por folio
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(searchForm);

  const folio = datos.get("folio");

  if (!folio.trim()) {
    Swal.fire({
      icon: "info",
      title: "Ingresa un folio",
      text: "Es necesario escribir el número de folio para realizar la consulta.",
      confirmButtonColor: "#647EF5",
    });

    return;
  }

  const respuesta = await fetch(
    `http://wisp-api.test/consultar_queja.php?folio=${encodeURIComponent(folio)}`,
  );

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error("Error al consultar el servidor.");
  }

  if (!resultado.success) {

  searchForm.reset();
    // Ocultar el resultado anterior
  document.getElementById("searchResult").classList.add("hidden");
  
    Swal.fire({
      icon: "error",
      title: "Folio no encontrado",
      text:
        resultado.message ||
        "No existe una solicitud registrada con el folio proporcionado.",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#647EF5",
    });

    return;
  }

  document.getElementById("folioResult").textContent = resultado.data.folio;

  document.getElementById("tipoResult").textContent = resultado.data.tipo;

  document.getElementById("fechaResult").textContent = resultado.data.fecha;

  const seguimiento = document.getElementById("seguimientoResult");

if (resultado.data.actualizacion || resultado.data.comentario) {
    seguimiento.classList.remove("hidden");

    document.getElementById("actualizacionResult").textContent = resultado.data.actualizacion || "";
    document.getElementById("comentarioResult").textContent = resultado.data.comentario || "";
} else {
    seguimiento.classList.add("hidden");
}

  document.getElementById("searchResult").classList.remove("hidden");

  searchForm.reset();

  //Cambiar el color de acuerdo al status de la queja
  const estadoResult = document.getElementById("estadoResult");

  estadoResult.textContent = resultado.data.estado;

  // Quitar clases anteriores
  estadoResult.classList.remove(
    "text-yellow-400",
    "text-blue-400",
    "text-orange-400",
    "text-green-400",
    "text-red-400",
    "text-white",
  );

  switch (resultado.data.estado) {
    case "Recibida":
      estadoResult.classList.add("text-yellow-400");
      break;

    case "Resuelta":
      estadoResult.classList.add("text-green-400");
      break;

    case "Cancelada":
      estadoResult.classList.add("text-red-400");
      break;

    default:
      estadoResult.classList.add("text-white");
  }
});
