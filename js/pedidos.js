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
            $("#idClienteAddPedido").val(selectedCliente).trigger('change');
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
          var selectedFichaTecnica = $("#idFichaTecnicaAddPedido").attr("data-selected");
          if (selectedFichaTecnica) {
            $("#idFichaTecnicaAddPedido").val(selectedFichaTecnica).trigger('change');
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
document.getElementById('btnVerCotizacionesPedidoAdd').addEventListener('click', function() {
  var clienteSelect = document.getElementById('idClienteAddPedido');
  var fichaTecnicaSelect = document.getElementById('idFichaTecnicaAddPedido');
  
  clienteSelect.setAttribute('data-selected', clienteSelect.value);
  fichaTecnicaSelect.setAttribute('data-selected', fichaTecnicaSelect.value);
});
//Fin

// Evento para restaurar los valores seleccionados cuando se cierra el modal de cotizaciones
document.getElementById('modalSeleccionarCotizacionPedidos').addEventListener('hidden.bs.modal', function() {
  var clienteSelect = document.getElementById('idClienteAddPedido');
  var fichaTecnicaSelect = document.getElementById('idFichaTecnicaAddPedido');
  
  var selectedCliente = clienteSelect.getAttribute('data-selected');
  var selectedFichaTecnica = fichaTecnicaSelect.getAttribute('data-selected');
  
  if (selectedCliente) {
    clienteSelect.value = selectedCliente;
    $(clienteSelect).trigger('change');
  }
  if (selectedFichaTecnica) {
    fichaTecnicaSelect.value = selectedFichaTecnica;
    $(fichaTecnicaSelect).trigger('change');
  }
});
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
