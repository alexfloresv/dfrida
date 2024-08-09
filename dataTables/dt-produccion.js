// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/produccionList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableProduccion")) {
      $("#dataTableProduccion").DataTable().destroy();
    }

    // Estructura de dataTableProduccion
    $("#dataTableProduccion thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Aprobar Produccion</th>
          <th scope="col">Nombre Produccion</th>
          <th scope="col">Fecha Aprobada</th>
          <th scope="col">Fecha Inicio</th>
          <th scope="col">Fecha Fin</th>
          <th scope="col">Productos</th>
          <th scope="col">Estado Ingreso Almacen</th>
        </tr>
      `);

    // Definición inicial de dataTableProduccion
    var columnDefsProduccion = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "btnAceptarProduccion" },
      { data: "nombreProcOp" },
      { data: "fechaAcep" },
      { data: "fechaInicioProcOp" },
      { data: "fechaFinProcOp" },
      { data: "btnProductos" },
      { data: "estadoProduccionAcept" },
    ];

    var tableProduccion = $("#dataTableProduccion").DataTable({
      columns: columnDefsProduccion,
    });

    // Titulo dataTableProduccion
    $(".tituloProduccion").text("Todos los registro de produccion");

    // Solicitud inicial de dataTableProduccion
    var data = new FormData();
    data.append("todasLasProducciones", true);

    $.ajax({
      url: "ajax/produccion.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableProduccion.clear();
        tableProduccion.rows.add(response);
        tableProduccion.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
        console.error("Detalles del error: ", jqXHR.responseText);
      },
    });
  }
});

//funcion ver productos de pedido / cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/produccionList";
  if (currentPath == appPath) {
    $(".dataTableProduccion").on("click", ".btnVerPedido", function () {
      var codPed = $(this).attr("codPed");

      $("#modalVerProductosPedido").on("shown.bs.modal", function () {
        // Destruir el DataTable y limpiar el contenido del modal solo cuando se abre el modal
        if ($.fn.DataTable.isDataTable("#dataTableProductosActivosConfeccion")) {
          $("#dataTableProductosActivosConfeccion").DataTable().destroy();
        }
        $("#dataTableProductosActivosConfeccion").empty();

        var data = new FormData();
        data.append("codPed", codPed);

        $.ajax({
          url: "ajax/procesoOperativo.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: async function (response) {
            // Asumiendo que la respuesta incluye el JSON en un campo llamado productsCoti
            var decodedJson = JSON.parse(response.productsCoti);
            var dataArray = [];

            // Transformar el objeto JSON en un array de objetos
            for (var key in decodedJson) {
              if (decodedJson.hasOwnProperty(key)) {
                var item = decodedJson[key];
                var codigoProd = await ingresoProductoEdit(item.codProdCoti);
                dataArray.push({
                  // Ajusta estos campos según la estructura de tu JSON
                  nombreProd: item.nombreProdCoti,
                  codigoProd: codigoProd,
                  unidadProd: item.unidadProdCoti,
                  cantidadProd: item.cantidadProdCoti,
                  precioProd: item.precioProdCoti,
                });
              }
            }

            // Crear el encabezado de la tabla
            $("#dataTableProductosActivosConfeccion").html(`
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Producto</th>
                  <th scope="col">Codigo Producto</th>
                  <th scope="col">Unidad Producto</th>
                  <th scope="col">Cantidad Producto</th>
                  <th scope="col">Precio Prodcuto</th>
                </tr>
              </thead>
              <tbody></tbody>
            `);

            var columnDefsProdPedido = [
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

            // Suprimir advertencias de DataTables
            $.fn.dataTable.ext.errMode = "none";

            var tableProdPedido = $("#dataTableProductosActivosConfeccion").DataTable({
              columns: columnDefsProdPedido,
              destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
            });

            // Limpia el DataTable antes de añadir los nuevos datos
            tableProdPedido.clear();

            // Añade los nuevos datos y redibuja la tabla
            tableProdPedido.rows.add(dataArray);
            tableProdPedido.draw();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
          },
        });
      });
    });
  }
});
function obtenerCodigoProd(codProdCoti) {
  return new Promise((resolve, reject) => {
    var data = new FormData();
    data.append("codProdCoti", codProdCoti);
    $.ajax({
      url: "ajax/procesoOperativo.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        resolve({
          codigoProd: response["codigoProd"],
        }); // Resuelve la promesa con un objeto que contiene ambos valores
      },
      error: function (jqXHR, textStatus, errorThrown) {
        reject("Error en la solicitud AJAX: " + textStatus + " " + errorThrown); // Rechaza la promesa si hay un error
      },
    });
  });
}

async function ingresoProductoEdit(codProdCoti) {
  // Esperar la respuesta de obtener
  try {
    // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
    const codigoProd = await obtenerCodigoProd(codProdCoti);
    //devolver valor a  codigoProd
    return codigoProd.codigoProd; // Devolver el valor de codigoProd
  } catch (error) {
    console.error(error); // Manejar el error si la promesa es rechazada
  }
}
//fin proceso
