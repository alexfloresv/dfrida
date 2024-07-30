/* funciones para tipo de proceso */
//funcion para abrir el modal de tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    // Obtener referencias a los modales
    var modalTipoProcesoOp = new bootstrap.Modal(
      document.getElementById("modalTipoProcesoOp")
    );
    var modalverFichasTrabajo = new bootstrap.Modal(
      document.getElementById("modalverFichasTrabajo")
    );
    var modalProcesosTrabajo = new bootstrap.Modal(
      document.getElementById("modalProcesosTrabajo")
    );

    // Abrir el primer modal al cerrar el segundo
    document
      .getElementById("modalverFichasTrabajo")
      .addEventListener("hidden.bs.modal", function () {
        modalTipoProcesoOp.show();
      });

    // Abrir el segundo modal al cerrar el tercero
    document
      .getElementById("modalProcesosTrabajo")
      .addEventListener("hidden.bs.modal", function () {
        modalverFichasTrabajo.show();
      });
  }
});
//fin funcion abrir modal tipo de proceso operativo

//funcion para mostrar el selec2 de fichas de trabajo
document.addEventListener("DOMContentLoaded", function () {
  $("#modalTipoProcesoOp").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idFichTrabProcAdd").select2({
        dropdownParent: $("#modalTipoProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todasLasFichasTrabajo", true);

      $.ajax({
        url: "ajax/procesoOperativo.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idFichTrabProcAdd").empty();
          $("#idFichTrabProcAdd").append(
            '<option value="0">Seleccione la Ficha de Trabajo</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idFichTrabProcAdd").append(
              '<option value="' +
                value.idfichaProc +
                '">' +
                value.tituloFichaProc +
                "</option>"
            );
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
//fin

//crear el tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("crearTipoProcModal")
      .addEventListener("click", function () {
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formTipoProcesoOpAdd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll(
          "input, select, textarea"
        );
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearTipoProceso = JSON.stringify(datosFormulario);
        //console.log(jsonCrearTipoProceso);
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: {
            jsonCrearTipoProceso: jsonCrearTipoProceso,
          },
          dataType: "json",
          success: function (response) {
            $("#modalTipoProcesoOp").modal("hide");
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "Tipo Proceso Creado Correctamente<br><strong>Puede Agregarlo al Proceso Principal</strong><br> <strong>Se abrirá la ventana para Crear el Proceso Principal.</strong>",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#formTipoProcesoOp").trigger("reset");
                $("#modalCrearProcesoOp").modal("show");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear el Tipo proceso <strong>Intentelo otra vez</strong>.",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#formTipoProcesoOp").trigger("reset");
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
  }
});
/* fin dunciones para tipo de proceso */

/* funciones para proceso principal */
//funcion para mostrar el modal de crear proceso operativo
document
  .getElementById("btnAddSalidaProd")
  .addEventListener("click", function () {
    Swal.fire({
      title:
        "Para crear un Proceso antes debe registrar un Tipo de Proceso Operativo.¿Ya registro Alguno?",
      html: "Si ya registro algun tipo de proceso omita este mensje con <strong>Si.</strong> y <strong>No.</strong>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, crear tipo de proceso",
      confirmButtonText: "Sí, usar un tipo existente",
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar el modal para crear proceso operativo
        $("#modalCrearProcesoOp").modal("show");
      } else {
        // Mostrar el modal para crear tipo de proceso
        $("#modalTipoProcesoOp").modal("show");
      }
    });
  });
//fin

//funcion para abrir el modal de tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    // Obtener referencias a los modales
    var modalCrearProcesoOp = new bootstrap.Modal(
      document.getElementById("modalCrearProcesoOp")
    );
    var modalverSalidasMprima = new bootstrap.Modal(
      document.getElementById("modalverSalidasMprima")
    );
    var modalProdSalidas = new bootstrap.Modal(
      document.getElementById("modalProdSalidas")
    );

    // Abrir el primer modal al cerrar el segundo
    document
      .getElementById("modalverSalidasMprima")
      .addEventListener("hidden.bs.modal", function () {
        modalCrearProcesoOp.show();
      });

    // Abrir el segundo modal al cerrar el tercero
    document
      .getElementById("modalProdSalidas")
      .addEventListener("hidden.bs.modal", function () {
        modalverSalidasMprima.show();
      });
  }
});
//fin funcion abrir modal tipo de proceso operativo

//funcion para mostrar el selec2 de pedidos
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearProcesoOp").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idPedidoProcOp").select2({
        dropdownParent: $("#modalCrearProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todosLosPedidos", true);

      $.ajax({
        url: "ajax/procesoOperativo.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idPedidoProcOp").empty();
          $("#idPedidoProcOp").append(
            '<option value="0">Seleccione un Pedido para el proceso</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idPedidoProcOp").append(
              '<option value="' +
                value.idPedido +
                '">' +
                value.tituloPedido +
                "</option>"
            );
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
//fin

//funcion para mostrar el selec2 de tipo de procesos
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearProcesoOp").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idTipoProcOp").select2({
        dropdownParent: $("#modalCrearProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todosLosTiposdeProcesos", true);

      $.ajax({
        url: "ajax/procesoOperativo.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idTipoProcOp").empty();
          $("#idTipoProcOp").append(
            '<option value="0">Selecionar el Tipo de Proceso</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idTipoProcOp").append(
              '<option value="' +
                value.idTipoProc +
                '">' +
                value.nombreTipoProc +
                "</option>"
            );
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
//fin

//crear   proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("crearTipoProcModal")
      .addEventListener("click", function () {
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formTipoProcesoOpAdd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll(
          "input, select, textarea"
        );
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearTipoProceso = JSON.stringify(datosFormulario);
        //console.log(jsonCrearTipoProceso);
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: {
            jsonCrearTipoProceso: jsonCrearTipoProceso,
          },
          dataType: "json",
          success: function (response) {
            $("#modalTipoProcesoOp").modal("hide");
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "Tipo Proceso Creado Correctamente<br><strong>Puede Agregarlo al Proceso Principal</strong><br> <strong>Se abrirá la ventana para Crear el Proceso Principal.</strong>",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#formTipoProcesoOp").trigger("reset");
                $("#modalCrearProcesoOp").modal("show");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear el Tipo proceso <strong>Intentelo otra vez</strong>.",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#formTipoProcesoOp").trigger("reset");
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
  }
});
//fin crear el tipo de proceso operativo
/* fin funciones para proceso principal */
