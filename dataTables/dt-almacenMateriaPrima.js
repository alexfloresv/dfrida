// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/almacenMateriaPrima";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableAlmacenMateriaPrima")) {
      $("#dataTableAlmacenMateriaPrima").DataTable().destroy();
    }

    // Estructura de dataTableAlmacenMateriaPrima
    $("#dataTableAlmacenMateriaPrima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Codigo</th>
          <th scope="col">Unidad Medida</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Total S/.</th>
          </tr>
      `);

    // Definición inicial de dataTableAlmacenMateriaPrima
    var columnDefsAlmacenMprima = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreMprimaAlma" },
      { data: "codigoMprimaAlma" },
      { data: "unidadMprimaAlma" },
      { data: "cantidadMprimaAlma" },
      {
        data: "totalProdAlmaMprima",
        render: function (data, type, row) {
          return "S/ " + data; 
        },
      },
    ];

    var tableAlmacenMprima = $("#dataTableAlmacenMateriaPrima").DataTable({
      columns: columnDefsAlmacenMprima,
    });

    // Titulo dataTableAlmacenMateriaPrima
    $(".tituloAlmacenMateriaPrima").text("Stock de Productos Almacen Productos Materia Prima");

    // Solicitud inicial de dataTableAlmacenMateriaPrima
    var data = new FormData();
    data.append("todosLosProductosAlmacenMprima", true);

    $.ajax({
      url: "ajax/almacenMateriaPrima.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableAlmacenMprima.clear();
        tableAlmacenMprima.rows.add(response);
        tableAlmacenMprima.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // Procedencia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
