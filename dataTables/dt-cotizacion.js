// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableCotizaciones")) {
      $("#dataTableCotizaciones").DataTable().destroy();
    }

    // Estructura de dataTableCotizaciones
    $("#dataTableCotizaciones thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ttulo Cotizacion</th>
          <th scope="col">Nombre Comercial</th>
          <th scope="col">Fecha</th>
          <th scope="col">Nombre Solicitante</th>
          <th scope="col">Numero Cel</th>
          <th scope="col">Total</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableCotizaciones
    var columnDefsCotizacion = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "tituloCoti" },
      { data: "nombreComercialCoti" },
      { data: "fechaCoti" },
      { data: "nombreCoti" },
      { data: "celularCoti" },
      {
        data: "totalCoti",
        render: function (data, type, row) {
          return "S/ " + data;
        },
      },
      { data: "estadoCoti" },
      { data: "buttons" },
    ];

    var tableCotizacion = $("#dataTableCotizaciones").DataTable({
      columns: columnDefsCotizacion,
    });

    // Titulo dataTableCotizaciones
    $(".tituloCotizacion").text("Todas las Cotizaciones");

    // Solicitud inicial de dataTableCotizaciones
    var data = new FormData();
    data.append("todasLasCotizaciones", true);

    $.ajax({
      url: "ajax/cotizacion.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableCotizacion.clear();
        tableCotizacion.rows.add(response);
        tableCotizacion.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // Procedencia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
// Abrir modal de cotizaciones
function abrirModalCotizaciones() {
  $("#modalCrearPedido").modal("hide");
  $("#modalSeleccionarCotizacionPedidos").modal("show");
  if ($.fn.DataTable.isDataTable("#dataTableSeleccionarCotizacionPedidos")) {
    $("#dataTableSeleccionarCotizacionPedidos").DataTable().destroy();
  }

  // Estructura de dataTableCotizaciones
  $("#dataTableSeleccionarCotizacionPedidos thead").html(`
    <tr>
      <th scope="col">#</th>
      <th scope="col">Titulo Cotizacion</th>
      <th scope="col">Nombre Comercial</th>
      <th scope="col">Fecha</th>
      <th scope="col">Nombre Solicitante</th>
      <th scope="col">Total</th>
      <th scope="col">Acciones</th>
    </tr>
  `);

  // Definición inicial de dataTableCotizaciones
  var columnDefsCotizacion = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return (
          '<input type="radio" name="selectRow" class="selectRow" value="' +
          row.idCoti +
          '">'
        );
      },
      orderable: false,
    },
    { data: "tituloCoti" },
    { data: "nombreComercialCoti" },
    { data: "fechaCoti" },
    { data: "nombreCoti" },
    {
      data: "totalCoti",
      render: function (data, type, row) {
        return "S/ " + data;
      },
    },
    { data: "buttons" },
  ];

  var tableCotizacion = $("#dataTableSeleccionarCotizacionPedidos").DataTable({
    columns: columnDefsCotizacion,
  });

  // Titulo dataTableCotizaciones
  $("#titleModalSeleccionarCotizacionPedidosLabel").text(
    "Seleccione una Cotización"
  );

  // Solicitud inicial de dataTableCotizaciones
  var data = new FormData();
  data.append("todasLasCotizacionesPedidosVista", true);

  $.ajax({
    url: "ajax/cotizacion.ajax.php",
    method: "POST",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      tableCotizacion.clear();
      tableCotizacion.rows.add(response);
      tableCotizacion.draw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText); // Procedencia de error
      console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
    },
  });

  // Evento para seleccionar solo una fila a la vez
  $("#dataTableSeleccionarCotizacionPedidos tbody").on(
    "change",
    'input[type="radio"]',
    function () {
      $('input[type="radio"]').not(this).prop("checked", false);
    }
  );
}

// funcionalidad para data table para modal  de categorias de productos crear y eliminar registros sin actualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable
    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    $("#modalCrearPedido").on("shown.bs.modal", function () {
      $("#modalCrearPedido").on(
        "click",
        "#btnVerCotizacionesPedidoAdd",
        function () {
          var idCoti = $("#btnVerCotizacionesPedidoAdd").attr("idCoti");

          if (idCoti) {
            Swal.fire({
              title: "Ya tiene una cotización seleccionada",
              text: "¿Desea seleccionar otra cotización?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                abrirModalCotizaciones();
              }
            });
          } else {
            abrirModalCotizaciones();
          }
        }
      );
    });

    // Evento para el botón de seleccionar cotización
    $("#modalSeleccionarCotizacionPedidos").on(
      "click",
      "#btnSeleccionarCotizaciónparaPedido",
      function () {
        var selectedRadio = $('input[name="selectRow"]:checked');
        if (selectedRadio.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Por favor, seleccione una cotización.",
          });
        } else {
          var selectedIdCoti = selectedRadio.val();
          $("#btnVerCotizacionesPedidoAdd").attr("idCoti", selectedIdCoti);

          // Validar si el atributo idCoti se asignó correctamente
          if (
            $("#btnVerCotizacionesPedidoAdd").attr("idCoti") === selectedIdCoti
          ) {
            Swal.fire({
              icon: "success",
              title: "Cotización Seleccionada Correctamente",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                $("#modalSeleccionarCotizacionPedidos").modal("hide");
                $("#modalCrearPedido").modal("show");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo asignar la cotización. Por favor, intente de nuevo.",
            });
          }
        }
      }
    );
  }
});

// Abrir modal de cotizaciones en el modal de editar pedido
function abrirModalCotizacionesPedidoEditar() {
  $("#modalEditarPedido").modal("hide");
  $("#modalSeleccionarCotizacionPedidosEditar").modal("show");
  if (
    $.fn.DataTable.isDataTable("#dataTableSeleccionarCotizacionPedidosEditar")
  ) {
    $("#dataTableSeleccionarCotizacionPedidosEditar").DataTable().destroy();
  }

  // Estructura de dataTableSeleccionarCotizacionPedidosEditar
  $("#dataTableSeleccionarCotizacionPedidosEditar thead").html(`
    <tr>
      <th scope="col">#</th>
      <th scope="col">Titulo Cotizacion</th>
      <th scope="col">Nombre Comercial</th>
      <th scope="col">Fecha</th>
      <th scope="col">Nombre Solicitante</th>
      <th scope="col">Total</th>
      <th scope="col">Acciones</th>
    </tr>
  `);

  // Definición inicial de dataTableSeleccionarCotizacionPedidosEditar
  var columnDefsCotizacion = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return (
          '<input type="radio" name="selectRow" class="selectRow" value="' +
          row.idCoti +
          '" data-id="' +
          row.idCoti +
          '" data-title="' +
          row.tituloCoti +
          '">'
        );
      },
      orderable: false,
    },
    { data: "tituloCoti" },
    { data: "nombreComercialCoti" },
    { data: "fechaCoti" },
    { data: "nombreCoti" },
    {
      data: "totalCoti",
      render: function (data, type, row) {
        return "S/ " + data;
      },
    },
    { data: "buttons" },
  ];

  var tableCotizacion = $(
    "#dataTableSeleccionarCotizacionPedidosEditar"
  ).DataTable({
    columns: columnDefsCotizacion,
  });

  // Titulo dataTableCotizaciones
  $("#titleModalSeleccionarCotizacionPedidosEditarLabel").text(
    "Seleccione una Cotización"
  );

  // Solicitud inicial de dataTableCotizaciones
  var data = new FormData();
  data.append("todasLasCotizacionesPedidosVista", true);

  $.ajax({
    url: "ajax/cotizacion.ajax.php",
    method: "POST",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      tableCotizacion.clear();
      tableCotizacion.rows.add(response);
      tableCotizacion.draw();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.responseText); // Procedencia de error
      console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
    },
  });

  // Evento para seleccionar solo una fila a la vez
  $("#dataTableSeleccionarCotizacionPedidosEditar tbody").on(
    "change",
    'input[type="radio"]',
    function () {
      $('input[type="radio"]').not(this).prop("checked", false);
    }
  );
}
// funcionalidad para data table para modal  de categorias de productos crear y eliminar registros sin actualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable
    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    $("#modalEditarPedido").on("shown.bs.modal", function () {
      $("#modalEditarPedido").on(
        "click",
        "#btnSeleccionarCotizacionEdit",
        function () {
          var idCoti = $("#btnSeleccionarCotizacionEdit").attr("idCoti");

          if (idCoti) {
            Swal.fire({
              title: "Ya tiene una cotización seleccionada",
              text: "¿Desea seleccionar otra cotización?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                abrirModalCotizacionesPedidoEditar();
              }
            });
          } else {
            abrirModalCotizacionesPedidoEditar();
          }
        }
      );
    });

    // Evento para el botón de seleccionar cotización
    $("#modalSeleccionarCotizacionPedidosEditar").on(
      "click",
      "#btnSeleccionarCotizaciónparaPedidoEditar",
      function () {
        var selectedRadio = $('input[name="selectRow"]:checked');
        if (selectedRadio.length === 0) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Por favor, seleccione una cotización.",
          });
        } else {
          var selectedIdCoti = selectedRadio.val();
          var selectedTituloCoti = selectedRadio.data("title");
          $("#editarCotizacionPedidoModal").attr(
            "cotizacion-original-id",
            selectedIdCoti
          );
          $("#editarCotizacionPedidoModal").attr(
            "cotizacion-original-name",
            selectedTituloCoti
          );

          // Validar si los atributos se asignaron correctamente
          if (
            $("#editarCotizacionPedidoModal").attr("cotizacion-original-id") ===
              selectedIdCoti &&
            $("#editarCotizacionPedidoModal").attr(
              "cotizacion-original-name"
            ) === selectedTituloCoti
          ) {
            Swal.fire({
              icon: "success",
              title: "Cotización Seleccionada Correctamente",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // Mostrar el elemento oculto
                $(".nuevo-cotizacion").removeClass("d-none");

                // Asignar el id y el nombre de la cotización seleccionada
                $("#editarCotizacionPedidoNuevaModal").attr(
                  "cotizacion-nueva-id",
                  selectedIdCoti
                );
                $("#editarCotizacionPedidoNuevaModal").val(selectedTituloCoti);

                // Ocultar el modal actual y mostrar el siguiente
                $("#modalSeleccionarCotizacionPedidosEditar").modal("hide");
                $("#modalEditarPedido").modal("show");
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo asignar la cotización. Por favor, intente de nuevo.",
            });
          }
        }
      }
    );
  }
});
