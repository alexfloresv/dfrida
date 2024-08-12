// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableMerma")) {
      $("#dataTableMerma").DataTable().destroy();
    }

    // Estructura de dataTableMerma
    $("#dataTableMerma thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Aceptar Mermar</th>
          <th scope="col">Nombre Merma</th>
          <th scope="col">Fecha Registro</th>
          <th scope="col">Fecha Aceptada</th>
          <th scope="col">Estado</th>
          <th scope="col">Proceso Operativo</th>
          <th scope="col">Productos Mermados</th>
          <th scope="col">Accion</th>
        </tr>
      `);

    // Definición inicial de dataTableMerma
    var columnDefsMerma = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "btnMprimaDeProcOp" },
      { data: "nombreMerma" },
      { data: "fechaMermaIng" },
      { data: "fechaMermaAprobada" },
      { data: "estadoMermaAcp" },
      { data: "btnProcOpOrigin" },
      { data: "btnMermaAceptada" },
      { data: "btnEditMerma" },
    ];

    var tableMerma = $("#dataTableMerma").DataTable({
      columns: columnDefsMerma,
    });

    // Titulo dataTableMerma
    $(".tituloMerma").text("Todos los registro de Merma");

    // Solicitud inicial de dataTableMerma
    var data = new FormData();
    data.append("todasLasMermas", true);

    $.ajax({
      url: "ajax/merma.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableMerma.clear();
        tableMerma.rows.add(response);
        tableMerma.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
        console.error("Detalles del error: ", jqXHR.responseText);
      },
    });
  }
});

//modal para ver productos de salida por el boton
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    $(".dataTableMerma").on("click", ".btnVerSalProd", function () {
      var codAllSalProd = $(this).attr("codAllSalProd");

      $("#modalDataTableProdSalida thead").html(`
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

      var tableProdIngresados = $("#modalDataTableProdSalida").DataTable({
        columns: columnDefsProdIngresados,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codAllSalProd", codAllSalProd);

      $.ajax({
        url: "ajax/salidaProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
          var decodedJson = JSON.parse(response.salJsonProd);
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
