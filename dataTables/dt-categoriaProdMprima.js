// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  $("#modalViewCatProdMprima").on("shown.bs.modal", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/productMprima";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableCategoriasProductosMprima")) {
        $("#dataTableCategoriasProductosMprima").DataTable().destroy();
      }

      // Estructura de dataTableCategoriasProductosMprima
      $("#dataTableCategoriasProductosMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Categoria Producto Prima</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

      // Definición inicial de dataTableCategoriasProductosMprima
      var columnDefsCateProductosMprima = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "nombreCategoriaMprima" },
        { data: "buttons" },
      ];

      var tableCateProductosMprima = $("#dataTableCategoriasProductosMprima").DataTable({
        columns: columnDefsCateProductosMprima,
      });

      // Titulo dataTableCategoriasProductosMprima
      //$(".tituloProductos").text("Todas las Categorias de Productos");

      // Solicitud inicial de dataTableCategoriasProductosMprima
      var data = new FormData();
      data.append("todasLasCategoriasProductosMprima", true);

      $.ajax({
        url: "ajax/categoriaProdMprima.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableCateProductosMprima.clear();
          tableCateProductosMprima.rows.add(response);
          tableCateProductosMprima.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText); // Procedencia de error
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});
