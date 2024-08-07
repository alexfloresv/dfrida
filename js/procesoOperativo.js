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
                title: "Correcto. Tipo Proceso Creado Correctamente",
                html: "Puede Agregarlo al Proceso Principal<br><strong>Se abrirá la ventana para Crear el Proceso Principal.</strong>",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#formTipoProcesoOp").trigger("reset");
                $("#modalCrearProcesoOp").modal("show");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear el Tipo proceso <strong>Selecione una Ficha de trabajo</strong>.",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#modalTipoProcesoOp").modal("show");
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
//fin

// Inicializar Select2 para edit de tipo de proceso operativo

// Función para manejar el evento change
let warningConfirmed = false; // Variable de estado

if (!warningConfirmed) {
  $("#idFichTrabProcEdit").on("select2:opening", mensajeSelecionarOtroDato);
}

//funcion que se incia al precioanr el select2
function mensajeSelecionarOtroDato(e) {
  if (warningConfirmed) {
    // Si el mensaje ya fue confirmado, permitir la apertura del select2
    warningConfirmed = false; // Resetear el estado para futuras interacciones
    return;
  }
  e.preventDefault(); // Prevenir la apertura del select2
  Swal.fire({
    title: "Advertencia",
    text: "Modificar este campo afectará al proceso operativo. ¿Desea continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, modificar",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, permitir la apertura del select2
      warningConfirmed = true; // Actualizar el estado
      $("#idFichTrabProcEdit").select2("open");
    }
  });
}

//funcion para mostrar el selec2 de fichas de trabajo
function Select2EditTipoProc(id) {
  // Mover la inicialización de Select2 y la carga de datos dentro del evento shown.bs.modal
  $("#modalEditTipoProcesoOp").on("shown.bs.modal", function () {
    // Inicializar Select2
    $("#idFichTrabProcEdit").select2({
      dropdownParent: $("#modalEditTipoProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

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
        $("#idFichTrabProcEdit").empty();
        $("#idFichTrabProcEdit").append(
          '<option value="0">Seleccione la Ficha de Trabajo</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idFichTrabProcEdit").append(
            '<option value="' +
              value.idfichaProc +
              '">' +
              value.tituloFichaProc +
              "</option>"
          );
        });
        // Seleccionar la opción específica
        $("#idFichTrabProcEdit").val(id).trigger("change");
        // Asignar la función mensajeSelecionarOtroDato al evento select2:opening solo si warningConfirmed es false
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  });

  // Mostrar el modal
  $("#modalEditTipoProcesoOp").modal("show");
}

//fin

//  funcion editar tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".modalDataTableTiposDeProceso").on(
      "click",
      ".btnEditarTipoProcOp",
      function () {
        $("#modalEditTipoProcesoOp").modal("show");
        var codTipoProc = $(this).attr("codTipoProc");
        var data = new FormData();
        data.append("codTipoProc", codTipoProc);
        //visualizar los datos del usuario en el modal
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            $("#nombreTipoProcOpEdit").val(response["nombreTipoProc"]);
            $("#descripcionTipoProcOpEdit").val(
              response["descripcionTipoProc"]
            );
            $("#codTipoProc").val(response["idTipoProc"]);
            // Llamar a la función Select2EditMprima con los datos recibidos
            Select2EditTipoProc(response["idFichaProc"]);
            //fin
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(
              "Error en la solicitud AJAX: ",
              textStatus,
              errorThrown
            );
          },
        });
      }
    );
    //fin visualizar los datos del usuario en el modal

    //editar si se da clic en el boton editar
    document
      .getElementById("editarTipoProcModal")
      .addEventListener("click", function () {
        //obtener el formulario por id
        var formulario = document.getElementById("formTipoProcesoOpEdit");
        var datosFormulario = {};
        //obtener los elementos del formulario
        var elementosFormulario = formulario.querySelectorAll("input, select");
        //for each para recorrer los elementos del formulario y asignarle la clave como si id y su valor
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        //crear el json
        var jsonEditarTipoProc = JSON.stringify(datosFormulario);
        //enviar el json por ajax
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: { jsonEditarTipoProc: jsonEditarTipoProc },
          dataType: "json",
          success: function (response) {
            $("#modalEditTipoProcesoOp").modal("hide");
            if (response == "ok") {
              Swal.fire(
                "Correcto",
                "Tipo Proceso editado correctamente",
                "success"
              ).then(function () {
                $("#modalDataTableTipoProcesoOp").modal("show");
              });
            } else {
              Swal.fire(
                "Error",
                "El Tipo Proceso no se ha podido editar asegurese de seleccionar una ficha de trabajo",
                "error"
              ).then(function () {
                $("#modalEditTipoProcesoOp").modal("show");
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
//fin
//funcion para cerrar el modal de editar tipo de proceso y abri la lista
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $("#cerrarModalEditTipoProc").on("click", () =>
      $("#modalEditTipoProcesoOp").data("botonCerrar", true).modal("hide")
    );
    $("#modalEditTipoProcesoOp").on("hidden.bs.modal", function () {
      $(this).data("botonCerrar") &&
        $("#modalDataTableTipoProcesoOp").modal("show");
    });
  }
});
//fin

//eliminar tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".modalDataTableTiposDeProceso").on(
      "click",
      ".btnDeleteTipoProcOp",
      function () {
        var codTipoProc = $(this).attr("codTipoProc");
        $("#modalDataTableTipoProcesoOp").modal("hide");
        Swal.fire({
          title: "¿Está seguro de eliminar el Tipo de Proceso?",
          text: "¡Esto Puede generar inconsistencias en los procesos operativos activos!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, eliminar Tipo de Proceso!",
          cancelButtonText: "¡No, cancelar acción!",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = new FormData();
            data.append("codTipoProcDelet", codTipoProc);
            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "¡Eliminado!",
                    "El Tipo de Proceso ha sido eliminado.",
                    "success"
                  ).then(function () {
                    $("#modalDataTableTipoProcesoOp").modal("show");
                  });
                } else {
                  Swal.fire(
                    "¡Error!",
                    "El Tipo de Proceso no se puede eliminar se encuentra asignado a un proceso operativo.",
                    "error"
                  ).then(function () {
                    $("#modalDataTableTipoProcesoOp").modal("show");
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
          } else {
            // Si el usuario cancela la acción, volver a mostrar el modal
            $("#modalDataTableTipoProcesoOp").modal("show");
          }
        });
      }
    );
  }
});
//fin
/* fin funciones para tipo de proceso */

/* funciones para proceso principal */
//funcion para mostrar el modal de crear proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("btnAddSalidaProd")
      .addEventListener("click", function () {
        Swal.fire({
          title:
            "Crear un Nuevo Proceso Requiere de un Pedido una Salida de productos Prima y un Tipo de Proceso Operativo. ¿Registro un Tipo de Proceso?",
          html: "Si ya registro un <strong>Tipo de proceso</strong> para este nuevo proceso Operativo omita este mensje con <strong>Si.</strong> y <strong>No.</strong>",
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
  }
});
//fin

//funcion para abrir el modal de tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
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

//funcion para mostrar el selec2 de selecionar salida materia prima
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearProcesoOp").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idSalProdPrima").select2({
        dropdownParent: $("#modalCrearProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todasLasSalidasMprima", true);

      $.ajax({
        url: "ajax/procesoOperativo.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idSalProdPrima").empty();
          $("#idSalProdPrima").append(
            '<option value="0">Selecionar despues una salida de productos prima</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idSalProdPrima").append(
              '<option value="' +
                value.idSalMprima +
                '">' +
                value.nombreSalMprima +
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

//crear  proceso operativo principal
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("crearProcOpModal")
      .addEventListener("click", function () {
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formProcesoOpAdd");
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
        var jsonCrearProceso = JSON.stringify(datosFormulario);
        //console.log(jsonCrearProceso);
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: {
            jsonCrearProceso: jsonCrearProceso,
          },
          dataType: "json",
          success: function (response) {
            $("#modalCrearProcesoOp").modal("hide");
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "Proceso Operativo Creado Correctamente<br><strong>Administrelo desde la lista de Procesos</strong>",
                confirmButtonText: "Ok",
              }).then(function () {
                window.location.reload();
              });
            } else if (response == "errorPedido") {
              Swal.fire({
                icon: "error",
                title: "Error!. No se pudo asignar el pedido al proceso",
                html: "<strong>Asignelo en la edicion del Proceso Operativo</strong>.",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#modalCrearProcesoOp").modal("hide");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error!. No se pudo crear el Proceso Operativo",
                html: "<strong>Asigne una Salida de Productos Prima, Un Pedido y Un tipo de proceso</strong>.",
                confirmButtonText: "Ok",
              }).then(function () {
                $("#modalCrearProcesoOp").modal("show");
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
//fin
/* Funciones para editar el proceso operativo */

////////////////funciones de select para editar
// Función para mostrar select tipo proceso operativo
let confirmarIdTipoProc = false; // Variable de estado

if (!confirmarIdTipoProc) {
  $("#idTipoProcOpEdit").on(
    "select2:opening",
    mensajeSelecionarOtroDatoIdtipoProc
  );
}

//funcion que se incia al precioanr el select2
function mensajeSelecionarOtroDatoIdtipoProc(e) {
  if (confirmarIdTipoProc) {
    // Si el mensaje ya fue confirmado, permitir la apertura del select2
    confirmarIdTipoProc = false; // Resetear el estado para futuras interacciones
    return;
  }
  e.preventDefault(); // Prevenir la apertura del select2
  Swal.fire({
    title: "Advertencia",
    text: "Modificar este campo afectará al proceso operativo. ¿Desea continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, modificar",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, permitir la apertura del select2
      confirmarIdTipoProc = true; // Actualizar el estado
      $("#idTipoProcOpEdit").select2("open");
    }
  });
}

//funcion para mostrar el selec2
function Select2EditTipoProcProcOp(id) {
  // Mover la inicialización de Select2 y la carga de datos dentro del evento shown.bs.modal
  $("#modalEditarProcesoOp").on("shown.bs.modal", function () {
    // Inicializar Select2
    $("#idTipoProcOpEdit").select2({
      dropdownParent: $("#modalEditarProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

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
        $("#idTipoProcOpEdit").empty();
        $("#idTipoProcOpEdit").append(
          '<option value="0">Selecionar el Tipo de Proceso</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idTipoProcOpEdit").append(
            '<option value="' +
              value.idTipoProc +
              '">' +
              value.nombreTipoProc +
              "</option>"
          );
        });
        // Seleccionar la opción específica
        $("#idTipoProcOpEdit").val(id).trigger("change");
        // Asignar la función mensajeSelecionarOtroDato al evento select2:opening solo si warningConfirmed es false
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  });

  // Mostrar el modal
  $("#modalEditarProcesoOp").modal("show");
}
//fin

// Función para mostrar select salida de productos materia prima
let confirmarIdMprima = false; // Variable de estado

if (!confirmarIdMprima) {
  $("#idSalProdPrimaEdit").on(
    "select2:opening",
    mensajeSelecionarOtroDatoIdMprima
  );
}

//funcion que se incia al precioanr el select2
function mensajeSelecionarOtroDatoIdMprima(e) {
  if (confirmarIdMprima) {
    // Si el mensaje ya fue confirmado, permitir la apertura del select2
    confirmarIdMprima = false; // Resetear el estado para futuras interacciones
    return;
  }
  e.preventDefault(); // Prevenir la apertura del select2
  Swal.fire({
    title: "Advertencia",
    text: "Modificar este campo afectará al proceso operativo. ¿Desea continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, modificar",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, permitir la apertura del select2
      confirmarIdMprima = true; // Actualizar el estado
      $("#idSalProdPrimaEdit").select2("open");
    }
  });
}

//funcion para mostrar el selec2
function Select2EdiProcOpIdMprima(id) {
  // Mover la inicialización de Select2 y la carga de datos dentro del evento shown.bs.modal
  $("#modalEditarProcesoOp").on("shown.bs.modal", function () {
    // Inicializar Select2
    $("#idSalProdPrimaEdit").select2({
      dropdownParent: $("#modalEditarProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

    var data = new FormData();
    data.append("todasLasSalidasMprimaEdit", true);
    $.ajax({
      url: "ajax/procesoOperativo.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#idSalProdPrimaEdit").empty();
        $("#idSalProdPrimaEdit").append(
          '<option value="0">Selecionar despues una salida de productos prima</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idSalProdPrimaEdit").append(
            '<option value="' +
              value.idSalMprima +
              '">' +
              value.nombreSalMprima +
              "</option>"
          );
        });
        // Seleccionar la opción específica
        $("#idSalProdPrimaEdit").val(id).trigger("change");
        // Asignar la función mensajeSelecionarOtroDato al evento select2:opening solo si warningConfirmed es false
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  });

  // Mostrar el modal
  $("#modalEditarProcesoOp").modal("show");
}
//fin

// Función para mostrar select2 de pedidos
let confirmarPedidos = false; // Variable de estado

if (!confirmarPedidos) {
  $("#idPedidoProcOpEdit").on(
    "select2:opening",
    mensajeSelecionarOtroDatoIdPedido
  );
}

//funcion que se incia al precioanr el select2
function mensajeSelecionarOtroDatoIdPedido(e) {
  if (confirmarPedidos) {
    // Si el mensaje ya fue confirmado, permitir la apertura del select2
    confirmarPedidos = false; // Resetear el estado para futuras interacciones
    return;
  }
  e.preventDefault(); // Prevenir la apertura del select2
  Swal.fire({
    title: "Advertencia",
    text: "Modificar este campo afectará al proceso operativo. ¿Desea continuar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, modificar",
    cancelButtonText: "No, cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Si el usuario confirma, permitir la apertura del select2
      confirmarPedidos = true; // Actualizar el estado
      $("#idPedidoProcOpEdit").select2("open");
    }
  });
}

//funcion para mostrar el selec2 pedido
function Select2EdiProcOpIdPedido(id) {
  // Mover la inicialización de Select2 y la carga de datos dentro del evento shown.bs.modal
  $("#modalEditarProcesoOp").on("shown.bs.modal", function () {
    // Inicializar Select2
    $("#idPedidoProcOpEdit").select2({
      dropdownParent: $("#modalEditarProcesoOp"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

    var data = new FormData();
    data.append("todosLosPedidosEdit", true);
    $.ajax({
      url: "ajax/procesoOperativo.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#idPedidoProcOpEdit").empty();
        $("#idPedidoProcOpEdit").append(
          '<option value="0">Seleccione un Pedido para el proceso</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idPedidoProcOpEdit").append(
            '<option value="' +
              value.idPedido +
              '">' +
              value.tituloPedido +
              "</option>"
          );
        });
        // Seleccionar la opción específica
        $("#idPedidoProcOpEdit").val(id).trigger("change");
        // Asignar la función mensajeSelecionarOtroDato al evento select2:opening solo si warningConfirmed es false
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  });

  // Mostrar el modal
  $("#modalEditarProcesoOp").modal("show");
}
//fin

/////////////////fin

//  funcion editar proceso operativo principal
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnEditarProcOp",
      function () {
        // Mensaje de advertencia con SweetAlert2
        Swal.fire({
          title: "Advertencia",
          text: "Modificar el proceso operativo afectará a todo el proceso y subprocesos. ¿Desea continuar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, modificar",
          cancelButtonText: "No, cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Si el usuario confirma, se ejecuta el flujo de código existente
            $("#modalEditarProcesoOp").modal("show");
            var codProcOp = $(this).attr("codProcOp");
            var data = new FormData();
            data.append("codProcOpEditView", codProcOp);
            // Visualizar los datos del usuario en el modal
            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (response) {
                $("#nombreProcOpEdit").val(response["nombreProcOp"]);
                $("#descripcionProcOpEdit").val(response["descripcionProcOp"]);
                $("#fechaRegProcOpEdit").val(response["fechaRegistroProcOp"]);
                $("#fechaFinProcOpEdit").val(response["fechaFinProcOp"]);
                $("#codProcOpEdit").val(response["idProcOp"]);
                // Llamar a la función Select2EditTipoProcProcOp con los datos recibidos
                Select2EditTipoProcProcOp(response["idTipoProc"]);
                // Llamar a la función Select2EdiProcOpIdMprima con los datos recibidos
                Select2EdiProcOpIdMprima(response["idSalMprima"]);
                // Llamar a la función Select2EdiProcOpIdPedido con los datos recibidos
                Select2EdiProcOpIdPedido(response["idPedido"]);
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(
                  "Error en la solicitud AJAX: ",
                  textStatus,
                  errorThrown
                );
              },
            });
          }
        });
      }
    );
    //fin visualizar los datos del usuario en el modal

    //funcion para abrir modal de editar proceso operativo
    document.addEventListener("DOMContentLoaded", function () {
      var currentPath = window.location.pathname;
      var appPath = "/dfrida/procesosOperativos";
      if (currentPath == appPath) {
        // Obtener referencias a los modales
        var modalVerSalidasMprima = new bootstrap.Modal(
          document.getElementById("modalverSalidasMprima")
        );
        var modalEditarProcesoOp = new bootstrap.Modal(
          document.getElementById("modalEditarProcesoOp")
        );

        // Abrir el modal de editar al cerrar el modal de ver salidas
        document
          .getElementById("modalverSalidasMprima")
          .addEventListener("hidden.bs.modal", function () {
            modalEditarProcesoOp.show();
          });
      }
    });
    //fin funcion

    //editar si se da clic en el boton editar
    document
      .getElementById("editarProcOpModal")
      .addEventListener("click", function () {
        //obtener el formulario por id
        var formulario = document.getElementById("formProcesoOpEdit");
        var datosFormulario = {};
        //obtener los elementos del formulario
        var elementosFormulario = formulario.querySelectorAll("input, select");
        //for each para recorrer los elementos del formulario y asignarle la clave como si id y su valor
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        //crear el json
        var jsonEditarProcOp = JSON.stringify(datosFormulario);
        //enviar el json por ajax
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: { jsonEditarProcOp: jsonEditarProcOp },
          dataType: "json",
          success: function (response) {
            $("#modalEditarProcesoOp").modal("hide");
            if (response == "ok") {
              Swal.fire(
                "Correcto",
                "Proceso Operativo editado correctamente",
                "success"
              ).then(function () {
                window.location.reload();
              });
            } else {
              Swal.fire(
                "Error",
                "Llene todos los campos requeridos para editar el Proceso Operativo Correctamente",
                "error"
              ).then(function () {
                $("#modalEditarProcesoOp").modal("show");
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
//fin

//eliminar proceso operativo principal
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnDeleteProcOp",
      function () {
        var codProcOp = $(this).attr("codProcOp");

        Swal.fire({
          title: "¿Está seguro de eliminar el Proceso Operativo?",
          text: "¡Esta accion liberara el pedido y la salida de productos prima de este proceso operativo!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, eliminar Proceso!",
          cancelButtonText: "¡No, cancelar acción!",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = new FormData();
            data.append("codProcDelet", codProcOp);
            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "¡Eliminado!",
                    "El Proceso ha sido eliminado. Se ha liberado la salida de productos prima y el pedido.",
                    "success"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "noAdmin") {
                  Swal.fire(
                    "¡Error!",
                    "Necesita permisos de administrador para esta acción.",
                    "error"
                  ).then(function () {
                    window.location.reload();
                  });
                } else {
                  Swal.fire(
                    "¡Error!",
                    "El Proceso no se puede eliminar, se encuentra activo y asignado a una salida o pedido.",
                    "error"
                  ).then(function () {
                    window.location.reload();
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
          }
        });
      }
    );
  }
});
//fin

/* fin funciones para proceso inicar principal */
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnIniciarProcesoOp",
      function () {
        var codIniProcOp = $(this).attr("codIniProcOp");

        Swal.fire({
          title: "¿Inicar Proceso Operativo?",
          text: "Al iniciar el proceso operativo no se podra eliminar mas este proceso",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, inicar Proceso!",
          cancelButtonText: "¡No, cancelar acción!",
        }).then((result) => {
          if (result.isConfirmed) {
            // $("#modalInicioProcesoOp").modal("show");
            var data = new FormData();
            data.append("codIniProcOp", codIniProcOp);
            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "¡Iniciado!",
                    "El Proceso ha sido iniciado satisfactoriamente. Ahora puede hacer el seguimiento del proceso operativo.",
                    "success"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "errorIniSalMprima") {
                  Swal.fire(
                    "¡Error!",
                    "El Proceso no a iniciado es nesesario adjuntar una SALIDA DE PRODUCTOS PRIMA. Adjunte uno en la edicion del proceso operativo.",
                    "error"
                  ).then(function () {});
                } else {
                  Swal.fire(
                    "¡Error!",
                    "El Proceso No sido iniciado.",
                    "error"
                  ).then(function () {
                    window.location.reload();
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
          }
        });
      }
    );
  }
});
/* fin funciones inicio de proceso */

/* funciones para finalizar proceso principal */
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnFinProcesoOp",
      function () {
        var codFinProcOp = $(this).attr("codFinProcOp");

        Swal.fire({
          title: "¿Finalizar el Proceso Operativo?",
          text: "Al Finalizar el proceso ya no se podra realizar cambios. Este pasara a la lista de Produccion.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, finalizar Proceso!",
          cancelButtonText: "¡No, verificar proceso!",
        }).then((result) => {
          if (result.isConfirmed) {
            // $("#modalInicioProcesoOp").modal("show");
            var data = new FormData();
            data.append("codFinProcOp", codFinProcOp);
            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Finalizado!",
                    "El Proceso ha finalizado con exito. Gestione estos productos en Produccion para almacenarlos.",
                    "success"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "errorSnSalida") {
                  Swal.fire(
                    "¡Error!",
                    "No Puede finalizar el proceso por que no tiene una salida de productos prima adjuntado al proceo operativo.",
                    "error"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "errorActPedido") {
                  Swal.fire(
                    "¡Error no se pudo finalizar el proceso!",
                    "No se pudo actualiza el PEDIDO a Finalizado Asegurese de que no se aya eliminado o editado.",
                    "error"
                  ).then(function () {
                    window.location.reload();
                  });
                } else {
                  Swal.fire(
                    "¡Error!",
                    "Al finalizar el proceso falta finalizar otro sub proceso.",
                    "error"
                  ).then(function () {
                    window.location.reload();
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
          }
        });
      }
    );
  }
});

/* fin funciones Fin de proceso */

//funciones para modificar visualizar el estado de los proceso operativos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnEstadosProcOp",
      function () {
        // Abrir el modal
        $("#modalEstadosProcesosOp").modal("show");

        // Obtener los datos del botón
        var codProcOp = $(this).attr("codProcOp");
        var codTipProc = $(this).attr("codTipProc");

        // Crear el objeto FormData
        var jsonEstadosProcOp = JSON.stringify({
          codProcOp: codProcOp,
          codTipProc: codTipProc,
        });

        // Realizar la solicitud AJAX
        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: { jsonEstadosProcOp: jsonEstadosProcOp },
          dataType: "json",
          success: function (response) {
            $("#codProcOpEst").val(response["idProcOp"]);
            $("#tipoPorcesoOpNombreEstate").val(response["nombreTipoProc"]);
            $("#fechaInicioProcOpEstate").val(response["fechaInicioProcOp"]);
            $("#fechaFinProcOpEstate").val(response["fechaFinProcOp"]);
            $("#estadoPrincipalProcOP").val(response["estadoProcOp"]);

            $("#btnFichaTrabEstate").data("id-ficha", response["idFichaProc"]);
            $("#btnFichaTrabEstate").data("id-proc-op", response["idProcOp"]);
            //btnFinalizarProcesoOp
            $("#btnFinalizarProcOpEstate").val(response["idProcOp"]);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(
              "Error en la solicitud AJAX: ",
              textStatus,
              errorThrown
            );
          },
        });
      }
    );
  }
});
//fin estados procesos

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

//funcion  finalizar proceso operativo desde el modal modal estados
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("btnFinalizarProcOpEstate")
      .addEventListener("click", function () {
        //obtener value del boton
        var idProcOp = $("#btnFinalizarProcOpEstate").val();
        // cierra el modal
        $("#modalEstadosProcesosOp").modal("hide");
        //mensje de advertencia
        Swal.fire({
          title: "¿Finalizar el Proceso Operativo?",
          text: "Al finalizar el proceso operativo este pasara a la lista de Produccion y Finalizara automaticamente los sub procesos.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, finalizar Proceso!",
          cancelButtonText: "¡No, siguir seguimiento!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Abre el modal
            //$("#modalEstadosProcesosOp").modal("show");
            // Crear el objeto FormData
            var jsonFinEstadoProcOp = JSON.stringify({
              idProcOp: idProcOp,
            });

            $.ajax({
              url: "ajax/procesoOperativo.ajax.php",
              method: "POST",
              data: { jsonFinEstadoProcOp: jsonFinEstadoProcOp },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Finalizado!",
                    "El Proceso ha finalizado satisfactoriamente. Ahora Este pasara a la lista de Produccion.",
                    "success"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "errorSnSalida") {
                  Swal.fire(
                    "¡Error!",
                    "No Puede finalizar el proceso por que no tiene una salida de productos prima adjuntado al proceo operativo.",
                    "error"
                  ).then(function () {
                    window.location.reload();
                  });
                } else if (response == "errorActPedido") {
                  Swal.fire(
                    "¡Error no se pudo finalizar el proceso!",
                    "No se pudo actualiza el PEDIDO a Finalizado Asegurese de que no se aya eliminado o editado.",
                    "error"
                  ).then(function () {
                    window.location.reload();
                  });
                } else {
                  Swal.fire(
                    "¡Error!",
                    "El Proceso No sido finalizado por un error desconosido.",
                    "error"
                  ).then(function () {
                    window.location.reload();
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
          } else {
            $("#modalEstadosProcesosOp").modal("show");
          }
        });
      });
  }
});
//fin funcion
//funcion actualizar el estado del proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("btnActualizarProcesoOpEstados")
      .addEventListener("click", function () {
        //obtener el formulario por id
        var formulario = document.getElementById("formEstadosProcesosOp");
        var datosFormulario = {};
        var estadoPrincipalProcOP = null; // Variable para guardar el valor de estadoPrincipalProcOP

        // Obtener los elementos del formulario
        var elementosFormulario = formulario.querySelectorAll("input, select");

        // Recorrer los elementos del formulario y asignar la clave como su id y su valor
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
            // Capturar el valor de estadoPrincipalProcOP
            if (elemento.id === "estadoPrincipalProcOP") {
              estadoPrincipalProcOP = elemento.value;
            }
          }
        });
        //crear el json
        var jsonEditarEstadoProcOp = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: { jsonEditarEstadoProcOp: jsonEditarEstadoProcOp },
          dataType: "json",
          success: function (response) {
            $("#modalEstadosProcesosOp").modal("hide");
            if (response == "ok") {
              // Validar el valor de estadoPrincipalProcOP
              if (estadoPrincipalProcOP === "4") {
                Swal.fire(
                  "¡Proceso Listo para Finalizarlo!",
                  "Finalize el proceso operativo desde el botón en la lista de procesos.",
                  "info"
                ).then(function () {
                  window.location.reload();
                });
              } else {
                Swal.fire(
                  "Actualizado!",
                  "El Estado del proceso ha sido actualizado satisfactoriamente.",
                  "success"
                ).then(function () {
                  window.location.reload();
                });
              }
            } else {
              Swal.fire(
                "¡Error!",
                "El Proceso no ha sido actualizado.",
                "error"
              ).then(function () {
                window.location.reload();
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
//fin funcion
