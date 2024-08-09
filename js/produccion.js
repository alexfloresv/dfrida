//  aceptar produccion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/produccionList";
  if (currentPath == appPath) {
    $(".dataTableProduccion").on("click", ".btnProduccionAcept", function () {
      //id de registro recuperado del botn
      var codProduccion = $(this).attr("codProduccion");

      Swal.fire({
        title: "¿Aceptar la produccion?",
        text: "Al aceptar la produccion, esta estara disponible para el ingreso a el almacen de productos.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí, Aceptar",
        cancelButtonText: "No, Después",
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, se ejecuta el flujo de código existente
          $("#modalProduccionAceptacion").modal("show");

          $("#codProduccionAcept").val(codProduccion); //
          $("#codProduccion").val(codProduccion); //

          document
            .getElementById("crearAceptacionProduccion")
            .addEventListener("click", function () {
              //verificar campo de fecha
              var fechaProduccionAceptar = document.getElementById(
                "fechaProduccionAcept"
              );

              // Verificar si el campo de fecha está vacío
              if (!fechaProduccionAceptar.value) {
                // Obtener la fecha actual
                var today = new Date();
                var day = String(today.getDate()).padStart(2, "0");
                var month = String(today.getMonth() + 1).padStart(2, "0"); // Enero es 0
                var year = today.getFullYear();

                // Formatear la fecha como YYYY-MM-DD
                var fechaActual = year + "-" + month + "-" + day;

                // Asignar la fecha actual al campo de fecha
                fechaProduccionAceptar.value = fechaActual;
              }
              //fin
              //obtener el formulario por id
              var formulario = document.getElementById(
                "formProduccionAceptacion"
              );
              var datosFormulario = {};
              //obtener los elementos del formulario
              var elementosFormulario =
                formulario.querySelectorAll("input, select");
              //for each para recorrer los elementos del formulario y asignarle la clave como si id y su valor
              elementosFormulario.forEach(function (elemento) {
                if (elemento.id) {
                  datosFormulario[elemento.id] = elemento.value;
                }
              });
              //crear el json
              var jsonAceptarProduccion = JSON.stringify(datosFormulario);
              //enviar el json por ajax
              $.ajax({
                url: "ajax/produccion.ajax.php",
                method: "POST",
                data: { jsonAceptarProduccion: jsonAceptarProduccion },
                dataType: "json",
                success: function (response) {
                  $("#modalProduccionAceptacion").modal("hide");
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto, Produccion Aceptada",
                      "Ahora puede Ingresar la produccion al almacen de productos desde Ingresos Productos.",
                      "success"
                    ).then(function () {
                      window.location.reload();
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "No se Actualizo la Produccion, intente de nuevo",
                      "error"
                    ).then(function () {
                      $("#modalProduccionAceptacion").modal("show");
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
            });
        }
      });
    });
  }
});
//fin

//  funcion para crear ingreso de produccion a almacen de productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/produccionList";
  if (currentPath == appPath) {
    // Recuperar el valor del botón cuando sea necesario
    $("#codProduccionAcept").on("click", function () {
      $("#modalProduccionAceptacion").modal("hide");
      var codProduccion = $(this).val();

      Swal.fire({
        title: "¿Crear Ingreso de Producción a Almacén de Productos?",
        text: "Sera redirigido a la página de ingreso de productos para crear el ingreso de la producción seleccionada e ingresar los productos al almacén de productos finales. La producción será aceptada automáticamente después del ingreso.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Sí, Ingresar",
        cancelButtonText: "No, Después solo Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          //funciones para envia al ingreso de modal
        } else {
          $("#modalProduccionAceptacion").modal("show");
        }
      });
    });
  }
});
//fin
//funcion para abri y cerrar el modal
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    // Escuchar el clic del botón cerrarProcTrabAcitvos
    document
      .getElementById("cerrarProcTrabAcitvos")
      .addEventListener("click", function () {
        // Acción a realizar cuando se presione el botón
        $("#modalVerProcesoTrabajo").modal("hide");
        $("#modalEstadosProcesosOp").modal("show");
      });
  }
});
// fin funcion
