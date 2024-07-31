// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/pedidosList";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTablePedidos")) {
        $("#dataTablePedidos").DataTable().destroy();
      }

      // Estructura de dataTableCotizaciones
      $("#dataTablePedidos thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ttulo Pedido</th>
          <th scope="col">Nombre Pedido</th>
          <th scope="col">Fecha</th>
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
        { data: "tituloPedido" },
        { data: "nombrePedido" },
        { data: "fechaPedido" },
/*         { data: "nombreCoti" },
        { data: "celularCoti" },
        {
          data: "totalCoti",
          render: function (data, type, row) {
            return "S/ " + data; 
          },
        },
        */
        { data: "estadoPedidos" },
        { data: "buttons" },
      ];

      var tableCotizacion = $("#dataTablePedidos").DataTable({
        columns: columnDefsCotizacion,
      });

      // Titulo dataTablePedidos
      $(".tituloPedidos").text("Todos los Pedidos");

      // Solicitud inicial de dataTableCotizaciones
      var data = new FormData();
      data.append("todosLosPedidos", true);

      $.ajax({
        url: "ajax/pedidos.ajax.php",
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
