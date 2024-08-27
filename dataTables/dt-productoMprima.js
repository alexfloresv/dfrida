// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta al mostrar el modal
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    // Estructura de dataTableProductosMprima
    $("#dataTableProductosMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto Prima</th>
           <th scope="col">Proveedor</th>
          <th scope="col">Categoría Producto Prima</th>
          <th scope="col">Código Producto Prima</th>
          <th scope="col">Unidad</th>
          <th scope="col">Precio Prima</th>
          <th scope="col">Observación</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableProductosMprima
    var columnDefsProductosMprima = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nombreMprima" },
      { data: "nombreProv" },
      { data: "nombreCategoriaMprima" },
      { data: "codigoMprima" },
      { data: "unidadMprima" },
      {
        data: "precioMprima",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      { data: "detalleMprima" },
      { data: "buttons" },
    ];

    var tableProductosMprima = $("#dataTableProductosMprima").DataTable({
      columns: columnDefsProductosMprima,
    });

    // Titulo dataTableProductosMprima
    $(".tituloProductosMprima").text("Todos los Productos Prima");

    // Solicitud inicial de dataTableProductosMprima
    var data = new FormData();
    data.append("todosLosProductosMprima", true);

    $.ajax({
      url: "ajax/productMprima.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableProductosMprima.clear();
        tableProductosMprima.rows.add(response);
        tableProductosMprima.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});

//data table modal cotizaciones
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta al mostrar el modal
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    // Estructura de dataTableProductosMprima
    $("#dataTableProductosMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Código</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      `);

    // Definición inicial de dataTableProductosMprima
    var columnDefsProductosMprima = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nombreMprima" },
      { data: "codigoMprima" },
      {
        data: "precioMprima",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      {
        data: "idMprima",
        render: function (data, type, row) {
          return (
            '<button class="btn btn-success btnAddProdMprimaModalCoti" codAddProdMprimaModalCoti="' +
            data +
            '"><i class="fa-solid fa-clipboard-check"></i></button>'
          );
        },
      },
    ];

    var tableProductosMprima = $("#dataTableProductosMprima").DataTable({
      columns: columnDefsProductosMprima,
    });

    // Titulo dataTableProductosMprima
    //$(".tituloProductosMprima").text("Todos los Productos Prima");

    // Solicitud inicial de dataTableProductosMprima
    var data = new FormData();
    data.append("todosLosProductosMprima", true);

    $.ajax({
      url: "ajax/productMprima.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableProductosMprima.clear();
        tableProductosMprima.rows.add(response);
        tableProductosMprima.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
//fin
// //data table modal productos prima cotización para vista pedidos
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta al mostrar el modal
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    // Estructura de dataTableProductos
    $("#dataTableProductosMateriaPrimaCotizacionPedidos thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto Prima</th>
          <th scope="col">Unidad</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
        </tr>
      `);

    // Definición inicial de dataTableProductos
    var columnDefsProductos = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nombreProdMprimaCoti" },
      { data: "unidadProdMprimaCoti" },
      { data: "cantidadProdMprimaCoti" },
      {
        data: "precioProdMprimaCoti",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
    ];

    var tableProductos = $(
      "#dataTableProductosMateriaPrimaCotizacionPedidos"
    ).DataTable({
      columns: columnDefsProductos,
    });
    // Agregar evento de escucha para los botones btnVerProductosPedido
    $(document).on("click", ".btnVerProductosPrimaPedido", function () {
      var codPed = $(this).attr("codPed");
      var idSalMprima = $(this).attr("idSalMprima");
      // Limpiar el DataTable antes de cualquier acción
      tableProductos.clear().draw();
      // Aquí puedes realizar las acciones necesarias con los valores obtenidos
      // Verificar si idSalMprima está asignado
      if (!idSalMprima) {
        Swal.fire({
          title:
            "No se encuentra una Salida de Materia Prima asignada al pedido",
          text: "¿Desea asignarle una Salida de Materia Prima?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, asignar Salida de Materia Prima",
          cancelButtonText: "No, en otro momento",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir a la ruta para asignar proceso operativo
            window.location.href = "/dfrida/procesosOperativos";
          } else {
            $("#modalVerProdPrimaCotiPedidos").modal("hide");
          }
        });
      } else {
        // Solicitud inicial de dataTableProductosCotizacionPedidos
        var data = new FormData();
        data.append("codPedProductosMateriaPrimaPedidos", codPed);
        data.append("idSalMprimaProductosMateriaPrimaPedidos", idSalMprima);

        $.ajax({
          url: "ajax/productMprima.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            tableProductos.clear();
            tableProductos.rows.add(response);
            tableProductos.draw();
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
});
