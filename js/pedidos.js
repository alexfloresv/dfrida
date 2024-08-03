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
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
//fin

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
        },
        error: function (xhr, status, error) {
          console.error("Error al cargar los datos:", error);
        },
      });
    }
  });
});
//fin
// Validacion de datos del formulario mas creación de pedido
document.addEventListener("DOMContentLoaded", function () {
  $("#modalCrearPedido").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/pedidosList";
    if (currentPath == appPath) {
      // Mostrar la fecha actual en el campo de fecha
      $("#modalCrearPedido").on("click", "#btncrearPedidoModal", function () {
        // Validar campos del formulario
        var isValid = true;
        var requiredFields = [
          "#tituloPedidoAdd",
          "#nombrePedidoAdd",
          "#fechaPedidoAdd",
          "#idClienteAddPedido",
          "#idFichaTecnicaAddPedido",
        ];

        requiredFields.forEach(function (field) {
          var value = $(field).val().trim();
          if (value === "" || value === null || value === "0") {
            $(field).css("border", "1px solid red");
            isValid = false;
          } else {
            $(field).css("border", "");
          }
        });

        // Validar idCoti
        var idCoti = $("#btnVerCotizacionesPedidoAdd").attr("idCoti");
        if (!idCoti) {
          $("#btnVerCotizacionesPedidoAdd").css("border", "1px solid red");
          isValid = false;
        } else {
          $("#btnVerCotizacionesPedidoAdd").css("border", "");
        }

        if (isValid) {
          Swal.fire({
            icon: "success",
            title: "Formulario completado correctamente",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // Aquí puedes agregar la lógica para enviar el formulario o realizar otra acción
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor, complete todos los campos requeridos.",
          });
        }
      });
    }
  });
});
