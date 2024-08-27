// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableSalidasProd")) {
      $("#dataTableSalidasProd").DataTable().destroy();
    }

    // Estructura de dataTableSalidasProd
    $("#dataTableSalidasProd thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Salida Producto</th>
          <th scope="col">Fecha Salida</th>
            <th scope="col">Pedido</th>
          <th scope="col">Salida Productos</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableSalidasProd
    var columnDefsSalProductos = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreSalProd" },
      { data: "fechaSalProd" },
      { data: "modalPedSalProd" },
      { data: "modalSalProd" },
      {
        data: "totalSalProd",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      { data: "buttons" },
    ];

    var tableSalProductos = $("#dataTableSalidasProd").DataTable({
      columns: columnDefsSalProductos,
    });

    // Titulo dataTableSalidasProd
    $(".tituloSalidas").text("Todas las salidas de Productos al Almacen");

    // Solicitud inicial de dataTableSalidasProd
    var data = new FormData();
    data.append("todasLasSalidasProductos", true);

    $.ajax({
      url: "ajax/salidaProd.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableSalProductos.clear();
        tableSalProductos.rows.add(response);
        tableSalProductos.draw();
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
    $(".dataTableSalidasProd").on("click", ".btnVerSalProd", function () {
      var codAllSalProd = $(this).attr("codAllSalProd");

      $("#modalDataTableProdSalida thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Código Producto</th>
          <th scope="col">Unidad Producto</th>
          <th scope="col">Cantidad Producto</th>
          <th scope="col">Precio Producto</th>
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

// //data table modal salidas almacen
document.addEventListener("DOMContentLoaded", function () {
  $("#modalAddProdSali").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta al mostrar el modal
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/salidaProd";
    if (currentPath == appPath) {
      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableProductosSalidaAlmacen")) {
        $("#dataTableProductosSalidaAlmacen").DataTable().destroy();
      }
      // Estructura de dataTableProductosSalidaAlmacen
      $("#dataTableProductosSalidaAlmacen thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Código</th>
           <th scope="col">Cantidad Almacenada</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      `);

      // Definición inicial de dataTableProductosSalidaAlmacen
      var columnDefsProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreProdAlma" },
        { data: "codigoProdAlma" },
        { data: "cantidadProdAlma" },
        {
          data: "precioProd",
          render: function (data, type, row) {
            return "S/ " + data; // Coloca 'S/' delante del valor de la celda
          },
        },
        {
          data: "idProd",
          render: function (data, type, row) {
            return (
              '<button class="btn btn-success btnAddProdModalSal" codAddSalProdModal="' +
              data +
              '"><i class="fa-solid fa-clipboard-check"></i></button>'
            );
          },
        },
      ];

      var tableProductos = $("#dataTableProductosSalidaAlmacen").DataTable({
        columns: columnDefsProductos,
      });

      // Titulo dataTableProductosSalidaAlmacen
      //$(".tituloProductos").text("Todos los Productos");

      // Solicitud inicial de dataTableProductosSalidaAlmacen
      var data = new FormData();
      data.append("todosLosProductosAlmacen", true);

      $.ajax({
        url: "ajax/salidaProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableProductos.clear();
          tableProductos.rows.add(response);
          tableProductos.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});
//fin

// //data table modal editar salidas
document.addEventListener("DOMContentLoaded", function () {
  $("#modalAddProdSali").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta al mostrar el modal
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/salidaProdEdit";
    if (currentPath == appPath) {
      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableProductosSalidaAlmacen")) {
        $("#dataTableProductosSalidaAlmacen").DataTable().destroy();
      }
      // Estructura de dataTableProductosSalidaAlmacen
      $("#dataTableProductosSalidaAlmacen thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Código</th>
           <th scope="col">Cantidad Almacenada</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      `);

      // Definición inicial de dataTableProductosSalidaAlmacen
      var columnDefsProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreProdAlma" },
        { data: "codigoProdAlma" },
        { data: "cantidadProdAlma" },
        {
          data: "precioProdAlma",
          render: function (data, type, row) {
            return "S/ " + data; // Coloca 'S/' delante del valor de la celda
          },
        },
        {
          data: "idProd",
          render: function (data, type, row) {
            return (
              '<button class="btn btn-success btnAddProdModalSal" codAddSalProdModal="' +
              data +
              '"><i class="fa-solid fa-clipboard-check"></i></button>'
            );
          },
        },
      ];

      var tableProductos = $("#dataTableProductosSalidaAlmacen").DataTable({
        columns: columnDefsProductos,
      });

      // Titulo dataTableProductosSalidaAlmacen
      //$(".tituloProductos").text("Todos los Productos");

      // Solicitud inicial de dataTableProductosSalidaAlmacen
      var data = new FormData();
      data.append("todosLosProductosAlmacen", true);

      $.ajax({
        url: "ajax/salidaProd.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableProductos.clear();
          tableProductos.rows.add(response);
          tableProductos.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});
//fin

// descargar salidas productos por fechas
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    $(function () {
      var boton = $("#btnDescargarSalidasProd");
      boton.daterangepicker(
        {
          opens: "left",
          autoApply: false,
          locale: {
            format: "YYYY-MM-DD",
            cancelLabel: "Cancelar",
            applyLabel: "Aplicar",
            customRangeLabel: "Seleccionar rango",
            daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            monthNames: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ],
            firstDay: 1,
          },
          showDropdowns: true, // Habilitar el selector de año y mes
          minYear: 2000, // Año mínimo
          maxYear: parseInt(moment().format("YYYY"), 10) + 1, // Año máximo incrementado en 1
        },
        function (start, end) {
          boton.val(
            start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD")
          );
        }
      );

      // Agrega la fecha actual si no se selecciona ninguna fecha al clickear en el botón apply
      // También si solo se selecciona una sola fecha
      boton.on("apply.daterangepicker", function (ev, picker) {
        var rangoFechas = $(this).val().split(" - ");
        var fechaInicioNot = rangoFechas[0];
        var fechaFinNot = rangoFechas[1];
        var fechaActualNot = new Date().toISOString().split("T")[0]; // obtiene la fecha actual en formato YYYY-MM-DD
        if (!fechaInicioNot && !fechaFinNot) {
          fechaInicioNot = fechaActualNot;
          fechaFinNot = fechaActualNot;
        } else if (!fechaFinNot) {
          fechaFinNot = fechaInicioNot;
        } else if (!fechaInicioNot) {
          fechaInicioNot = fechaFinNot;
        }
        var data = new FormData();
        data.append("fechaInicioSalidaProducto", fechaInicioNot);
        data.append("fechaFinSalidaProducto", fechaFinNot);
        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            // Llama a la función para crear y descargar el archivo Excel
            crearArchivoExcelSalidasProductosporFecha(
              response,
              "SalidasProductos",
              "Salidas_Productos"
            );
            boton.val(""); // Limpia la selección del input
            boton.data("daterangepicker").setStartDate(moment()); // Restablece la fecha de inicio
            boton.data("daterangepicker").setEndDate(moment()); // Restablece la fecha de fin
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText); // Procedencia de error
            console.log(
              "Error en la solicitud AJAX: ",
              textStatus,
              errorThrown
            );
          },
        });
      });
    });
  }
});
// función para exportar a excel
const crearArchivoExcelSalidasProductosporFecha = (
  data,
  nombreHoja,
  nombreArchivo
) => {
  const cabecerasPersonalizadas = [
    "Nombre Salida",
    "Fecha Salida",
    "IGV",
    "Subtotal",
    "Total",
    "Código Producto",
    "Nombre Producto",
    "Código Producto Ingreso",
    "Unidad Producto",
    "Cantidad Producto",
    "Precio Producto",
  ];

  const keys = [
    "nombreSalProd",
    "fechaSalProd",
    "igvSalProd",
    "subTotalSalProd",
    "totalSalProd",
    "codProdIng",
    "nombreProdIng",
    "codigoProdIng",
    "unidadProdIng",
    "cantidadProdIng",
    "precioProdIng",
  ];

  // Filtrar los datos para incluir solo las claves especificadas
  const filteredData = data.map((item) => {
    let filteredItem = {};
    keys.forEach((key) => {
      if (item.hasOwnProperty(key)) {
        filteredItem[key] = item[key];
      }
    });
    return filteredItem;
  });

  var workbook = XLSX.utils.book_new();

  // Crear la hoja de cálculo con las cabeceras personalizadas
  const ws = XLSX.utils.json_to_sheet(filteredData, {
    header: keys,
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
};
