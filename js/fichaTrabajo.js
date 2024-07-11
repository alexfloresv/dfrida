//agregar  lsita de trabajos a la ficha de trabajo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    document
      .getElementById("botonAbrirModalProceso")
      .addEventListener("click", function () {
        var contenidoModal = `
      <label for="procesosAdd" class="form-label" style="font-weight: bold">Nombre Proceso a Agregar:</label>
      <input type="text" class="form-control mb-3" id="procesosAddModal" name="procesosAdd" placeholder="Ingrese el nombre del proceso">
      <label for="tiempoAdd" class="form-label" style="font-weight: bold">Tiempo:</label>
      <input type="text" class="form-control mb-3" id="tiempoAddModal" name="tiempoAdd" placeholder="Ingrese tiempo en minutos/horas/dias/etc">
      <label for="observacionAdd" class="form-label" style="font-weight: bold">Observación:</label>
      <textarea class="form-control mb-3" id="observacionAddModal" name="observacionAdd" placeholder="Ingrese observacion de proceso de trabajo opcional" rows="4"></textarea>
      <br>`;
        document.getElementById("modalProcesoTrabajo").innerHTML =
          contenidoModal;
      });

    let formularioProcesoCounter = 0;

    document
      .getElementById("botonAgregarProceso")
      .addEventListener("click", function () {
        var nombreProceso = document.getElementById("procesosAddModal");
        var tiempoProceso = document.getElementById("tiempoAddModal");
        var observacionProceso = document.getElementById("observacionAddModal");
        // Contar campos vacíos
        var camposVacios = [
          nombreProceso,
          tiempoProceso,
          observacionProceso,
        ].reduce((acc, input) => {
          if (input.value.trim() === "") {
            input.classList.add("is-invalid");
            return acc + 1;
          } else {
            input.classList.remove("is-invalid");
            return acc;
          }
        }, 0);

        if (camposVacios === 3) {
          return;
        }

        // Crear un nuevo formulario para el producto con un ID único
        var formularioID = "formularioProceso" + formularioProcesoCounter++;
        var nuevoProductoHTML = `
        <form id="${formularioID}" class="row procesoRow" style="padding:5px 15px">
          <div class="col-lg-4">
            <input type="text" class="form-control " id="procesosAdd" value="${nombreProceso.value}" >
          </div>
          <div class="col-lg-2">
            <input type="text" class="form-control " id="tiempoAdd" value="${tiempoProceso.value}" >
          </div>
          <div class="col-lg-4">
            <input type="text" class="form-control " id="observacionAdd" value="${observacionProceso.value}">
          </div>
          <div class="col-lg-1">
            <button type="button" class="btn btn-danger btn-xs deleteProcesoAdd"><i class="fa fa-times"></i></button>
          </div>
        </form>`;
        $(".AddProcesoTrabajo").append(nuevoProductoHTML);
        // Limpiar campos del modal
        nombreProceso.value = "";
        tiempoProceso.value = "";
        observacionProceso.value = "";
      });
    // Eliminar el producto
    $(document).on("click", ".deleteProcesoAdd", function () {
      $(this).closest(".procesoRow").remove();
    });
  }
});

//crear ficha de trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    document
      .getElementById("btnRegistrarFichaTrabajo")
      .addEventListener("click", function () {
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formProcesoTrabajo");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select, textarea");
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearProcesoTrabajo = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS y PRODUCTOS PRIMA
        recojerFormulariosAnidadosProcesosTrabajo(function (
          datosFormulariosProcesos
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProcesosTrabajo = JSON.stringify(datosFormulariosProcesos);

          $.ajax({
            url: "ajax/fichaTrabajo.ajax.php",
            method: "POST",
            data: {
              jsonCrearProcesoTrabajo: jsonCrearProcesoTrabajo,
              jsonProcesosTrabajo: jsonProcesosTrabajo,
            },
            dataType: "json",
            success: function (response) {
              // Función para limpiar los datos de la URL
              var limpiarURL = function () {
                window.history.pushState(
                  {},
                  document.title,
                  window.location.pathname
                );
              };

              if (response == "ok") {
                Swal.fire({
                  icon: "success",
                  title: "Correcto",
                  html: "Proceso Trabajo Creado Correctamente <strong>¿Desea Crear Otra?</strong> ",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
                  }
                });
              } else if (response == "error0") {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "El proceso ya existe <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL();
                    window.location.reload();
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "No se pudo crear el proceso <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL();
                    window.location.reload();
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
                  }
                });
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(
                "Error en la solicitud AJAX: ",
                textStatus,
                errorThrown
              );
            },
          });
          // Fin de la llamada AJAX
        });

        //funcion para recolectar los datos de los formularios productos y productos prima
        function recojerFormulariosAnidadosProcesosTrabajo(callback) {
          //alamcena los datos de los formularios productos y productos prima
          let datosFormulariosProcesos = {};

          // Recorrer los formularios de productos
          $("[id^=formularioProceso]").each(function (index) {
            let datosFormulario = {};
            $(this)
              .find("input, select")
              .each(function () {
                if (this.id) {
                  datosFormulario[this.id] = $(this).val();
                }
              });
            datosFormulariosProcesos["procesoTrabajo" + index] = datosFormulario;
          });

          // Llamar al callback con los datos recolectados
          if (callback && typeof callback === "function") {
            callback(datosFormulariosProcesos);
          }
        }
        //fin
      });
    //fin verificar que los campos de total cotizacion no esten vacios
  }
});



// bton de agregar ficha trabajo redirecciona a la vista de ficha trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddFichaTrabajo");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTrabajo";
      });
    }
  }
});

// bton de cerrar ficha trabajo redirecciona a la vista de fichas trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarFichaTrabajo");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTrabajoList";
      });
    }
  }
});