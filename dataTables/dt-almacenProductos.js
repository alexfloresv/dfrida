// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/almacenProductos";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableAlmacenProductos")) {
      $("#dataTableAlmacenProductos").DataTable().destroy();
    }

    // Estructura de dataTableAlmacenProductos
    $("#dataTableAlmacenProductos thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Codigo</th>
          <th scope="col">Unidad Medida</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Total S/.</th>
          </tr>
      `);

    // Definición inicial de dataTableAlmacenProductos
    var columnDefsAlmacenProductos = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreProdAlma" },
      { data: "codigoProdAlma" },
      { data: "unidadProdAlma" },
      { data: "cantidadProdAlma" },
      {
        data: "totalProdAlma",
        render: function (data, type, row) {
          return "S/ " + data; 
        },
      },
    ];

    var tableAlmacenProductos = $("#dataTableAlmacenProductos").DataTable({
      columns: columnDefsAlmacenProductos,
    });

    // Titulo dataTableAlmacenProductos
    $(".tituloAlmacenProductos").text("Stock de Productos Almacen");

    // Solicitud inicial de dataTableAlmacenProductos
    var data = new FormData();
    data.append("todosLosProductosAlmacen", true);

    $.ajax({
      url: "ajax/almacenProductos.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableAlmacenProductos.clear();
        tableAlmacenProductos.rows.add(response);
        tableAlmacenProductos.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // Procedencia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
