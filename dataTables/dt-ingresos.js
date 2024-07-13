// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/ingresoList";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableIngresosProd")) {
        $("#dataTableIngresosProd").DataTable().destroy();
      }

      // Estructura de dataTableIngresosProd
      $("#dataTableIngresosProd thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Ingresos</th>
          <th scope="col">Fecha Ingreso</th>
          <th scope="col">Productos</th>
          <th scope="col">Total S/.</th>
            <th scope="col">Acciones</th>
        </tr>
      `);

      // Definición inicial de dataTableIngresosProd
      var columnDefsIngProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "nombreIngProd" },
        { data: "fechaIngProd" },
        { data: "fechaCoti" },
        { data: "modalIngProd" },
        { data: "totalIngProd" },
        { data: "buttons" },
      ];

      var tableIngProductos = $("#dataTableIngresosProd").DataTable({
        columns: columnDefsIngProductos,
      });

      // Titulo dataTableIngresosProd
      $(".tituloIngresos").text("Todos los Ingresos");

      // Solicitud inicial de dataTableIngresosProd
      var data = new FormData();
      data.append("todosLosIngProductos", true);

      $.ajax({
        url: "ajax/ingresoProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableIngProductos.clear();
          tableIngProductos.rows.add(response);
          tableIngProductos.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText); // Procedencia de error
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

});
