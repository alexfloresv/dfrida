document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el modal con campos cuando se abre
  document
    .getElementById("botonAbrirModalProceso")
    .addEventListener("click", function () {
      var contenidoModal = `
      <label for="procesosAdd" class="form-label" style="font-weight: bold">Nombre Proceso a Agregar:</label>
      <input type="text" class="form-control" id="procesosAdd" name="procesosAdd" placeholder="Ingrese el nombre del proceso">
      <label for="tiempoAdd" class="form-label" style="font-weight: bold">Tiempo:</label>
      <input type="text" class="form-control" id="tiempoAdd" name="tiempoAdd" placeholder="Ingrese tiempo en minutos/horas/dias/etc">
      <label for="observacionAdd" class="form-label" style="font-weight: bold">Observación:</label>
      <textarea class="form-control" id="observacionAdd" name="observacionAdd" placeholder="Ingrese observacion de proceso de trabajo opcional" rows="4"></textarea>
      <br>`;
      document.getElementById("modalProcesoTrabajo").innerHTML = contenidoModal;
    });

  // Inicializar contador para los formularios de proceso
  //let formularioProcesoCounter = 1;

  document.getElementById("botonAgregarProceso").addEventListener("click", function () {
    var nombreProceso = document.getElementById("procesosAdd").value;
    var tiempo = document.getElementById("tiempoAdd").value;
    var observacion = document.getElementById("observacionAdd").value;
  
    // Crear un nuevo formulario para el proceso con un ID único
    var formularioProcesoCounter = document.querySelectorAll('.procesoRow').length + 1;
    var formularioID = "formularioProceso" + formularioProcesoCounter;
    var formularioProcesoHTML = `
      <form id="${formularioID}" class="row procesoRow" style="padding:5px 15px">
        <div class="col-lg-4">
          <input type="text" class="form-control" value="${nombreProceso}" readonly>
        </div>
        <div class="col-lg-2">
          <input type="text" class="form-control" value="${tiempo}" readonly>
        </div>
        <div class="col-lg-4">
          <input type="text" class="form-control" value="${observacion}" readonly>
        </div>
        <div class="col-lg-1">
          <button type="button" class="btn btn-danger btn-xs deleteProcesoAdd"><i class="fa fa-times"></i></button>
        </div>
      </form>`;
  
    // Agregar el nuevo formulario al contenedor
    document.querySelector(".AddProcesoTrabajo").insertAdjacentHTML('beforeend', formularioProcesoHTML);
  
    // Limpiar campos del modal
    document.getElementById("procesosAdd").value = "";
    document.getElementById("tiempoAdd").value = "";
    document.getElementById("observacionAdd").value = "";
  });
  
  // Eliminar el proceso
  $(document).on("click", ".deleteProcesoAdd", function () {
    $(this).closest(".procesoRow").remove();
  });
});
