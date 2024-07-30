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
        // Evento para el botón de descarga
        document
          .getElementById("btnDescargarInventarioAlmacenProductos")
          .addEventListener("click", function () {
            crearArchivoExcelAlmacenProductos(
              response,
              "InventarioProductos",
              "Inventario_Productos"
            );
          });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // Procedencia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
// Función para crear archivo Excel con la data de la tabla de productos
function crearArchivoExcelAlmacenProductos(data, nombreHoja, nombreArchivo) {
  const cabecerasPersonalizadas = [
    "Código Producto",
    "Nombre Producto",
    "Unidad de Medida",
    "Cantidad",
    "Precio",
    "Fecha de Actualización",
  ];

  const clavesPermitidas = [
    "codigoProdAlma",
    "nombreProdAlma",
    "unidadProdAlma",
    "cantidadProdAlma",
    "precioProdAlma",
    "DateUpdate",
  ];

  const dataFiltrada = data.map((objeto) => {
    const objetoFiltrado = {};
    clavesPermitidas.forEach((clave) => {
      objetoFiltrado[clave] =
        objeto[clave] !== null && objeto[clave] !== ""
          ? objeto[clave]
          : "Sin Inf.";
    });
    return objetoFiltrado;
  });

  var workbook = XLSX.utils.book_new();

  // Crear la hoja de cálculo con las cabeceras personalizadas
  const ws = XLSX.utils.json_to_sheet(dataFiltrada, {
    header: clavesPermitidas,
  });

  // Reemplazar las cabeceras por las personalizadas
  XLSX.utils.sheet_add_aoa(ws, [cabecerasPersonalizadas], { origin: "A1" });

  const date = new Date().toLocaleDateString().replaceAll("/", "-");
  XLSX.utils.book_append_sheet(workbook, ws, nombreHoja);

  var excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  var blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = nombreArchivo + ".xlsx";
  link.click();

  URL.revokeObjectURL(url);
}
