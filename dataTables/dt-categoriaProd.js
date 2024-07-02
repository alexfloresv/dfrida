// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  $("#modalViewCatProd").on("shown.bs.modal", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/products";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableCategoriasProductos")) {
        $("#dataTableCategoriasProductos").DataTable().destroy();
      }

      // Estructura de dataTableCategoriasProductos
      $("#dataTableCategoriasProductos thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Categoria Producto</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

      // Definición inicial de dataTableCategoriasProductos
      var columnDefsCateProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "nombreCategoriaProd" },
        { data: "buttons" },
      ];

      var tableCateProductos = $("#dataTableCategoriasProductos").DataTable({
        columns: columnDefsCateProductos,
      });

      // Titulo dataTableCategoriasProductos
      $(".tituloProductos").text("Todas las Categorias de Productos");

      // Solicitud inicial de dataTableCategoriasProductos
      var data = new FormData();
      data.append("todasLasCategoriasProductos", true);

      $.ajax({
        url: "ajax/categoriaProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableCateProductos.clear();
          tableCateProductos.rows.add(response);
          tableCateProductos.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText); // Procedencia de error
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});
