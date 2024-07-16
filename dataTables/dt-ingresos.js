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
          <th scope="col">Nombre Ingreso Producto</th>
          <th scope="col">Fecha Ingreso</th>
          <th scope="col">Productos Ingresados</th>
          <th scope="col">Total</th>
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
        { data: "modalIngProd" },
        {
          data: "totalIngProd",
          render: function (data, type, row) {
            return "S/ " + data; // Coloca 'S/' delante del valor de la celda
          },
        },
        { data: "buttons" },
      ];

      var tableIngProductos = $("#dataTableIngresosProd").DataTable({
        columns: columnDefsIngProductos,
      });

      // Titulo dataTableIngresosProd
      $(".tituloIngresos").text("Todos los ingresos de Productos al Almacen");

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

//modal para ver productos ingresados
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoList";
  if (currentPath == appPath) {
    $(".dataTableIngresosProd").on("click", ".btnVerIngProd", function () {
      var codAllIngProd = $(this).attr("codAllIngProd");

      $("#ModalDataTableProdIngresados thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Codigo Producto</th>
          <th scope="col">Unidad Producto</th>
          <th scope="col">Cantidad Producto</th>
          <th scope="col">Precio Prodcuto</th>
        </tr>
      `);

      var columnDefsProdIngresados = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreProd" }, // Asume que este es el nombre del proceso
        { data: "codigoProd" }, // Asume que este campo existe en tu JSON
        { data: "unidadProd" }, // Asume que este campo existe en tu JSON
        { data: "cantidadProd" }, // Asume que este campo existe en tu JSON
        {
          data: "precioProd",
          render: function (data, type, row) {
            return "S/ " + data; // Coloca 'S/' delante del valor de la celda
          },
        },
      ];

      var tableProdIngresados = $("#ModalDataTableProdIngresados").DataTable({
        columns: columnDefsProdIngresados,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codAllIngProd", codAllIngProd);

      $.ajax({
        url: "ajax/ingresoProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
          var decodedJson = JSON.parse(response.ingJsonProd);
          var dataArray = [];

          // Transformar el objeto JSON en un array de objetos
          for (var key in decodedJson) {
            if (decodedJson.hasOwnProperty(key)) {
              var item = decodedJson[key];
              dataArray.push({
                // Ajusta estos campos según la estructura de tu JSON
                nombreProd: item.nombreProdIng,
                codigoProd: item.codigoProdIng,
                unidadProd: item.unidadProdIng,
                cantidadProd: item.cantidadProdIng,
                precioProd: item.precioProdIng,
              });
            }
          }

          // Limpia el DataTable antes de añadir los nuevos datos
          tableProdIngresados.clear();

          // Añade los nuevos datos y redibuja la tabla
          tableProdIngresados.rows.add(dataArray);
          tableProdIngresados.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
  }
});

