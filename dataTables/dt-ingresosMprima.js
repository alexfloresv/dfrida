//data  table ingresos materia prima
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoMprimaList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableIngresosMprima")) {
      $("#dataTableIngresosMprima").DataTable().destroy();
    }

    // Estructura de dataTableIngresosMprima
    $("#dataTableIngresosMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Ingreso Producto</th>
          <th scope="col">Fecha Ingreso</th>
          <th scope="col">Productos Ingresados</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableIngresosMprima
    var columnDefsIngProductos = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreIngMprima" },
      { data: "fechaIngMprima" },
      { data: "modalIngMprima" },
      {
        data: "totalIngMprima",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      { data: "buttons" },
    ];

    var tableIngProductos = $("#dataTableIngresosMprima").DataTable({
      columns: columnDefsIngProductos,
    });

    // Titulo dataTableIngresosMprima
    $(".tituloIngresosMprima").text(
      "Todos los ingresos de Productos Prima al Almacen"
    );

    // Solicitud inicial de dataTableIngresosMprima
    var data = new FormData();
    data.append("todosLosIngProductosPrima", true);

    $.ajax({
      url: "ajax/ingresoMprima.ajax.php",
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
  var appPath = "/dfrida/ingresoMprimaList";
  if (currentPath == appPath) {
    $(".dataTableIngresosMprima").on("click", ".btnVerIngProd", function () {
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
        { data: "nombreProd" },
        { data: "codigoProd" },
        { data: "unidadProd" },
        { data: "cantidadProd" },
        {
          data: "precioProd",
          render: function (data, type, row) {
            return "S/ " + data;
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

// //data table modal ingresos material prima
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta al mostrar el modal
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoMprima";
  if (currentPath == appPath) {
    // Estructura de dataTableProductosMprima
    $("#dataTableProductosMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto Prima</th>
          <th scope="col">Codigo Producto Prima</th>
          <th scope="col">Precio Prima</th>
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
            '<button class="btn btn-success btnAddProdModalIng" codAddIngProdModal="' +
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
