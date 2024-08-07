//funcion para mostrar el selec2 de todos los clientes
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearPedido").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/pedidosList";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idClienteAddPedido").select2({
        dropdownParent: $("#modalCrearPedido"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todosLosClientes", true);

      $.ajax({
        url: "ajax/clients.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idClienteAddPedido").empty();
          $("#idClienteAddPedido").append(
            '<option value="0">Seleccione un Cliente</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idClienteAddPedido").append(
              '<option value="' +
                value.idCli +
                '">' +
                value.nombreCli +
                "</option>"
            );
          });

          // Restaurar el valor seleccionado si existe
          var selectedCliente = $("#idClienteAddPedido").attr("data-selected");
          if (selectedCliente) {
            $("#idClienteAddPedido").val(selectedCliente).trigger("change");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
// Fin

//funcion para mostrar el selec2 de ficha tecnica
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearPedido").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/pedidosList";
    if (currentPath == appPath) {
      // Inicializar Select2
      $("#idFichaTecnicaAddPedido").select2({
        dropdownParent: $("#modalCrearPedido"), // Asegurarse de que el dropdown se muestre dentro del modal
      });

      // Cargar datos dinámicamente al abrir el modal
      var data = new FormData();
      data.append("todasLasFichasTecnicas", true);

      $.ajax({
        url: "ajax/fichaTecnica.ajax.php",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
          // Limpiar las opciones actuales
          $("#idFichaTecnicaAddPedido").empty();
          $("#idFichaTecnicaAddPedido").append(
            '<option value="0">Seleccione una Ficha Tecnica</option>'
          );
          // Agregar las nuevas opciones
          $.each(data, function (key, value) {
            $("#idFichaTecnicaAddPedido").append(
              '<option value="' +
                value.idFichaTec +
                '">' +
                value.nombreFichaTec +
                "</option>"
            );
          });

          // Restaurar el valor seleccionado si existe
          var selectedFichaTecnica = $("#idFichaTecnicaAddPedido").attr(
            "data-selected"
          );
          if (selectedFichaTecnica) {
            $("#idFichaTecnicaAddPedido")
              .val(selectedFichaTecnica)
              .trigger("change");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
// Fin

// Evento para guardar los valores seleccionados antes de abrir el modal de cotizaciones
// Verificar si la ruta es la correcta
var currentPath = window.location.pathname;
var appPath = "/dfrida/pedidosList";
if (currentPath == appPath) {
  document
    .getElementById("btnVerCotizacionesPedidoAdd")
    .addEventListener("click", function () {
      var clienteSelect = document.getElementById("idClienteAddPedido");
      var fichaTecnicaSelect = document.getElementById(
        "idFichaTecnicaAddPedido"
      );

      clienteSelect.setAttribute("data-selected", clienteSelect.value);
      fichaTecnicaSelect.setAttribute(
        "data-selected",
        fichaTecnicaSelect.value
      );
    });
}
//Fin

// Evento para restaurar los valores seleccionados cuando se cierra el modal de cotizaciones
var currentPath = window.location.pathname;
var appPath = "/dfrida/pedidosList";
if (currentPath == appPath) {
  document
    .getElementById("modalSeleccionarCotizacionPedidos")
    .addEventListener("hidden.bs.modal", function () {
      var clienteSelect = document.getElementById("idClienteAddPedido");
      var fichaTecnicaSelect = document.getElementById(
        "idFichaTecnicaAddPedido"
      );

      var selectedCliente = clienteSelect.getAttribute("data-selected");
      var selectedFichaTecnica =
        fichaTecnicaSelect.getAttribute("data-selected");

      if (selectedCliente) {
        clienteSelect.value = selectedCliente;
        $(clienteSelect).trigger("change");
      }
      if (selectedFichaTecnica) {
        fichaTecnicaSelect.value = selectedFichaTecnica;
        $(fichaTecnicaSelect).trigger("change");
      }
    });
}
// Fin
// Validacion de datos del formulario mas creación de pedido
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearPedido").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/pedidosList";
    if (currentPath == appPath) {
      // Creación del pedido
      $("#btncrearPedidoModal")
        .off("click")
        .on("click", function () {
          // Validar campos del formulario
          var isValid = true;
          var missingFields = [];
          var missingSelects = [];

          var requiredFields = [
            { id: "#tituloPedidoAdd", name: "Título del Pedido" },
            { id: "#nombrePedidoAdd", name: "Nombre del Pedido" },
            { id: "#fechaPedidoAdd", name: "Fecha del Pedido" },
            { id: "#idClienteAddPedido", name: "Cliente" },
            { id: "#idFichaTecnicaAddPedido", name: "Ficha Técnica" },
          ];

          requiredFields.forEach(function (field) {
            var value = $(field.id).val().trim();
            if (value === "" || value === null || value === "0") {
              $(field.id).css("border", "1px solid red");
              isValid = false;
              if (
                field.id === "#idClienteAddPedido" ||
                field.id === "#idFichaTecnicaAddPedido"
              ) {
                missingSelects.push(field.name);
              } else {
                missingFields.push(field.name);
              }
            } else {
              $(field.id).css("border", "");
            }
          });

          // Validar idCoti
          var idCoti = $("#btnVerCotizacionesPedidoAdd").attr("idCoti");
          if (!idCoti) {
            $("#btnVerCotizacionesPedidoAdd").css("border", "1px solid red");
            isValid = false;
            missingFields.push("Cotización");
          } else {
            $("#btnVerCotizacionesPedidoAdd").css("border", "");
          }

          if (isValid) {
            // Recopilar los valores de los campos del formulario en un objeto
            var formData = {
              tituloPedido: $("#tituloPedidoAdd").val().trim(),
              nombrePedido: $("#nombrePedidoAdd").val().trim(),
              fechaPedido: $("#fechaPedidoAdd").val().trim(),
              idCliente: $("#idClienteAddPedido").val().trim(),
              idFichaTecnica: $("#idFichaTecnicaAddPedido").val().trim(),
              idCoti: idCoti,
            };

            // Convertir el objeto formData a una cadena JSON
            var jsonData = JSON.stringify(formData);

            // Crear un objeto FormData y agregar los datos del formulario
            var data = new FormData();
            data.append("crearPedido", jsonData);

            // Enviar datos del formulario al servidor
            $.ajax({
              url: "ajax/pedidos.ajax.php",
              method: "POST",
              data: data,
              cache: false,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (respuesta) {
                if (respuesta == "ok") {
                  Swal.fire({
                    icon: "success",
                    title: "Pedido creado correctamente",
                    text: "Tu pedido ha sido registrado exitosamente",
                    confirmButtonText: "OK",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Recargar la página
                      location.reload();
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Error al crear el pedido",
                    text: respuesta,
                  });
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                  icon: "error",
                  title: "Error de conexión",
                  text: "No se pudo conectar al servidor. Por favor, verifica tu conexión a Internet.",
                });
              },
            });
          } else {
            var errorMessage =
              "Por favor, complete todos los campos requeridos.";
            if (missingFields.length > 0) {
              errorMessage += "\nCampos faltantes: " + missingFields.join(", ");
            }
            if (missingSelects.length > 0) {
              errorMessage += "\nSeleccione: " + missingSelects.join(", ");
            }
            Swal.fire({
              icon: "error",
              title: "Error",
              text: errorMessage,
            });
          }
        });
    }
  });
});
// fin
// Función para cargar y seleccionar datos en el selector de Ficha Técnica
function cargarYSeleccionarFichaTecnica(idFichaTecnica) {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    // Inicializar Select2
    $("#idFichaTecnicaEditPedido").select2({
      dropdownParent: $("#modalEditarPedido"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

    // Cargar datos dinámicamente
    var data = new FormData();
    data.append("todasLasFichasTecnicas", true);

    $.ajax({
      url: "ajax/fichaTecnica.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#idFichaTecnicaEditPedido").empty();
        $("#idFichaTecnicaEditPedido").append(
          '<option value="0">Seleccione una Ficha Técnica</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idFichaTecnicaEditPedido").append(
            '<option value="' +
              value.idFichaTec +
              '">' +
              value.nombreFichaTec +
              "</option>"
          );
        });

        // Seleccionar el valor recibido
        $("#idFichaTecnicaEditPedido").val(idFichaTecnica).trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
}

// Función para cargar y seleccionar datos en el selector de Cliente
function cargarYSeleccionarCliente(idCliente) {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    // Inicializar Select2
    $("#idClienteEditPedido").select2({
      dropdownParent: $("#modalEditarPedido"), // Asegurarse de que el dropdown se muestre dentro del modal
    });

    // Cargar datos dinámicamente
    var data = new FormData();
    data.append("todosLosClientes", true);

    $.ajax({
      url: "ajax/clients.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#idClienteEditPedido").empty();
        $("#idClienteEditPedido").append(
          '<option value="0">Seleccione un Cliente</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idClienteEditPedido").append(
            '<option value="' +
              value.idCli +
              '">' +
              value.nombreCli +
              "</option>"
          );
        });

        // Seleccionar el valor recibido
        $("#idClienteEditPedido").val(idCliente).trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
}

// Variable global para almacenar los datos originales
var datosOriginales = {};

// Editar Pedido
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    // Inicializar select2 para los selectores
    $("#idFichaTecnicaEditPedido, #idClienteEditPedido").select2();
    datosOriginales = [];
    // Creación del pedido
    $("#dataTablePedidos").on("click", ".btnEditarPedido", function () {
      var cotizacionInput = $("#editarCotizacionPedidoModal");
      cotizacionInput.attr("cotizacion-original-id", "");
      cotizacionInput.attr("cotizacion-original-name", "");
      // Limpiar el valor del input y el atributo cotizacion-nueva-id
      var cotizacionNuevaInput = $("#editarCotizacionPedidoNuevaModal");
      cotizacionNuevaInput.val("");
      cotizacionNuevaInput.attr("cotizacion-nueva-id", "");

      // Ocultar el contenedor específico del formulario
      $(".nuevo-cotizacion").addClass("d-none");
      Swal.fire({
        title: "Editar Pedido",
        text: "¿Está seguro de que desea editar este pedido?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          var idPedido = $(this).attr("idPedido");
          var data = new FormData();
          data.append("idPedidoDatos", idPedido);

          $.ajax({
            url: "ajax/pedidos.ajax.php",
            method: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (respuesta) {
              $("#editarTituloPedidoModal").val(respuesta["tituloPedido"]);
              $("#editarNombrePedidoModal").val(respuesta["nombrePedido"]);
              $("#editarFechaPedidoModal").val(respuesta["fechaPedido"]);

              var cotizacionInput = $("#editarCotizacionPedidoModal");
              var cotizacionOriginalId = cotizacionInput.attr(
                "cotizacion-original-id"
              );
              var cotizacionOriginalName = cotizacionInput.attr(
                "cotizacion-original-name"
              );

              if (!cotizacionOriginalId && !cotizacionOriginalName) {
                cotizacionInput.val(respuesta["tituloCoti"]);
                cotizacionInput.attr(
                  "cotizacion-original-id",
                  respuesta["idCoti"]
                );
                cotizacionInput.attr(
                  "cotizacion-original-name",
                  respuesta["tituloCoti"]
                );
              } else {
                cotizacionInput.val(cotizacionOriginalName);
              }

              // Almacenar los datos originales en la variable global
              datosOriginales = {
                idPedido: idPedido,
                tituloPedido: respuesta["tituloPedido"],
                nombrePedido: respuesta["nombrePedido"],
                fechaPedido: respuesta["fechaPedido"],
                idCoti: respuesta["idCoti"],
                tituloCoti: respuesta["tituloCoti"],
                idFichaTec: respuesta["idFichaTec"],
                idCli: respuesta["idCli"],
              };

              // Cargar y seleccionar datos en los selectores
              cargarYSeleccionarFichaTecnica(respuesta["idFichaTec"]);
              cargarYSeleccionarCliente(respuesta["idCli"]);

              $("#modalEditarPedido").modal("show");
            },
            error: function (jqXHR, textStatus, errorThrown) {
              Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar al servidor. Por favor, verifica tu conexión a Internet.",
              });
            },
          });
        }
      });
    });
    // Función para extraer los datos del formulario
    function extraerDatosFormulario() {
      return {
        tituloPedido: $("#editarTituloPedidoModal").val(),
        nombrePedido: $("#editarNombrePedidoModal").val(),
        fechaPedido: $("#editarFechaPedidoModal").val(),
        idCoti: $("#editarCotizacionPedidoModal").attr(
          "cotizacion-original-id"
        ),
        tituloCoti: $("#editarCotizacionPedidoModal").attr(
          "cotizacion-original-name"
        ),
        idFichaTec: $("#idFichaTecnicaEditPedido").val(),
        idCli: $("#idClienteEditPedido").val(),
        nuevaIdCoti: $("#editarCotizacionPedidoNuevaModal").attr(
          "cotizacion-nueva-id"
        ),
      };
    }

    // Función para comparar los datos extraídos con los datos originales
    function compararDatos(datosFormulario, datosOriginales) {
      var diferencias = {};
      for (var key in datosOriginales) {
        if (String(datosOriginales[key]) !== String(datosFormulario[key])) {
          diferencias[key] = {
            original: datosOriginales[key],
            nuevo: datosFormulario[key],
          };
        }
      }
      return diferencias;
    }

    // Evento para guardar los cambios y comparar los datos
    $("#modalEditarPedido").on(
      "click",
      "#btnGuardarCambiosPedidoModal",
      function () {
        var datosFormulario = extraerDatosFormulario();
        var diferencias = compararDatos(datosFormulario, datosOriginales);

        if (Object.keys(diferencias).length > 0) {
          Swal.fire({
            title: "Guardar cambios",
            text: "¿Está seguro de que desea guardar los cambios?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              console.log("Diferencias:", diferencias);
              // Agregar idPedido y idCtiAntigua a datosFormulario
              datosFormulario.idPedido = datosOriginales.idPedido; // Asumiendo que idPedido está en datosOriginales
              datosFormulario.idCotiAntigua = datosOriginales.idCoti;
              // Convertir el objeto formData a una cadena JSON
              var jsonData = JSON.stringify(datosFormulario);

              // Crear un objeto FormData y agregar los datos del formulario
              var data = new FormData();
              data.append("editarPedido", jsonData);

              // Enviar datos del formulario al servidor
              $.ajax({
                url: "ajax/pedidos.ajax.php",
                method: "POST",
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (respuesta) {
                  if (respuesta == "ok") {
                    Swal.fire({
                      icon: "success",
                      title: "Pedido actualizado correctamente",
                      text: "Tu pedido ha sido actualizado exitosamente",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Recargar la página
                        location.reload();
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error al actualizar el pedido",
                      text: respuesta,
                    });
                  }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  Swal.fire({
                    icon: "error",
                    title: "Error de conexión",
                    text: "No se pudo conectar al servidor. Por favor, verifica tu conexión a Internet.",
                  });
                },
              });
            }
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "Sin cambios",
            text: "No se han realizado cambios en el formulario.",
          });
        }
      }
    );
  }
});
