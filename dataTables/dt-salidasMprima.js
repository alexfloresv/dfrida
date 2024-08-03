// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaMprimaList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableSalidasMprima")) {
      $("#dataTableSalidasMprima").DataTable().destroy();
    }

    // Estructura de dataTableSalidasMprima
    $("#dataTableSalidasMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Salida Producto</th>
           <th scope="col">Estado Salida</th>
          <th scope="col">Fecha Salida</th>
            <th scope="col">Proceso Operativo</th>
          <th scope="col">Salida Productos</th>
          <th scope="col">Total</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableSalidasMprima
    var columnDefsSalProductosPrima = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreSalMprima" },
      {
        data: "idProcOp",
        render: function (data, type, row) {
          if (data === null || data === 0) {
            return '<span class="text-danger">Salida sin Asignar</span>';
          } else {
            return '<span class="text-success">Salida Asignada</span>';
          }
        },
      },
      { data: "fechaSalMprima" },
      { data: "modalProcSalMprima" },
      { data: "modalSalMprima" },
      {
        data: "totalSalMprima",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      { data: "buttons" },
    ];

    var tableSalProductosPrima = $("#dataTableSalidasMprima").DataTable({
      columns: columnDefsSalProductosPrima,
    });

    // Titulo dataTableSalidasMprima
    $(".tituloSalidas").text("Todas las salidas de Productos Prima de Almacen");

    // Solicitud inicial de dataTableSalidasMprima
    var data = new FormData();
    data.append("todasLasSalidasProductos", true);

    $.ajax({
      url: "ajax/salidaMprima.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableSalProductosPrima.clear();
        tableSalProductosPrima.rows.add(response);
        tableSalProductosPrima.draw();
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
  var appPath = "/dfrida/salidaMprimaList";
  if (currentPath == appPath) {
    $(".dataTableSalidasMprima").on("click", ".btnVerSalProd", function () {
      var codAllSalMprima = $(this).attr("codAllSalMprima");

      $("#modalDataTableProdSalida thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto Prima</th>
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
      data.append("codAllSalMprima", codAllSalMprima);

      $.ajax({
        url: "ajax/salidaMprima.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
          var decodedJson = JSON.parse(response.salJsonMprima);
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
    var appPath = "/dfrida/salidaMprima";
    if (currentPath == appPath) {
      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if (
        $.fn.DataTable.isDataTable("#dataTableProductosSalidaAlmacenMprima")
      ) {
        $("#dataTableProductosSalidaAlmacenMprima").DataTable().destroy();
      }
      // Estructura de dataTableProductosSalidaAlmacenMprima
      $("#dataTableProductosSalidaAlmacenMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Codigo</th>
           <th scope="col">Cantidad Almacenada</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      `);

      // Definición inicial de dataTableProductosSalidaAlmacenMprima
      var columnDefsProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreMprimaAlma" },
        { data: "codigoMprimaAlma" },
        { data: "cantidadMprimaAlma" },
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
              '<button class="btn btn-success btnAddProdModalSal" codAddSalProdModal="' +
              data +
              '"><i class="fa-solid fa-clipboard-check"></i></button>'
            );
          },
        },
      ];

      var tableProductos = $(
        "#dataTableProductosSalidaAlmacenMprima"
      ).DataTable({
        columns: columnDefsProductos,
      });

      // Titulo dataTableProductosSalidaAlmacenMprima
      //$(".tituloProductos").text("Todos los Productos");

      // Solicitud inicial de dataTableProductosSalidaAlmacenMprima
      var data = new FormData();
      data.append("todosLosProductosAlmacen", true);

      $.ajax({
        url: "ajax/salidaMprima.ajax.php",
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

// //data table modal salidas almacen
document.addEventListener("DOMContentLoaded", function () {
  $("#modalAddProdSali").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta al mostrar el modal
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/salidaMprimaEdit";
    if (currentPath == appPath) {
      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if (
        $.fn.DataTable.isDataTable("#dataTableProductosSalidaAlmacenMprima")
      ) {
        $("#dataTableProductosSalidaAlmacenMprima").DataTable().destroy();
      }
      // Estructura de dataTableProductosSalidaAlmacenMprima
      $("#dataTableProductosSalidaAlmacenMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
          <th scope="col">Codigo</th>
           <th scope="col">Cantidad Almacenada</th>
          <th scope="col">Precio</th>
          <th scope="col">Agregar</th>
        </tr>
      `);

      // Definición inicial de dataTableProductosSalidaAlmacenMprima
      var columnDefsProductos = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreMprimaAlma" },
        { data: "codigoMprimaAlma" },
        { data: "cantidadMprimaAlma" },
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
              '<button class="btn btn-success btnAddProdModalSal" codAddSalProdModal="' +
              data +
              '"><i class="fa-solid fa-clipboard-check"></i></button>'
            );
          },
        },
      ];

      var tableProductos = $(
        "#dataTableProductosSalidaAlmacenMprima"
      ).DataTable({
        columns: columnDefsProductos,
      });

      // Titulo dataTableProductosSalidaAlmacenMprima
      //$(".tituloProductos").text("Todos los Productos");

      // Solicitud inicial de dataTableProductosSalidaAlmacenMprima
      var data = new FormData();
      data.append("todosLosProductosAlmacen", true);

      $.ajax({
        url: "ajax/salidaMprima.ajax.php",
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
//////////////////////////modales para proceso oeprativos
// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  $("#modalverSalidasMprimaEdit").on("shown.bs.modal", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableSalidasMprimaEdit")) {
        $("#dataTableSalidasMprimaEdit").DataTable().destroy();
      }

      // Estructura de dataTableSalidasMprimaEdit
      $("#dataTableSalidasMprimaEdit thead").html(`
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre Salida Producto</th>
        <th scope="col">Estado</th>
        <th scope="col">Fecha Salida</th>

        <th scope="col">Total</th>
        </tr>
    `);

      // Definición inicial de dataTableSalidasMprimaEdit
      var columnDefsSalProductosPrima = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "nombreSalMprima" },
        {
          data: "idProcOp",
          render: function (data, type, row) {
            if (data === null || data === 0) {
              return '<span class="text-danger">Salida sin Asignar</span>';
            } else {
              return '<span class="text-success">Salida Asignada</span>';
            }
          },
        },
        { data: "fechaSalMprima" },
    
        {
          data: "totalSalMprima",
          render: function (data, type, row) {
            return "S/ " + data; // Coloca 'S/' delante del valor de la celda
          },
        },
        //{ data: "buttons" },
      ];

      var tableSalProductosPrima = $("#dataTableSalidasMprimaEdit").DataTable({
        columns: columnDefsSalProductosPrima,
      });

      // Solicitud inicial de dataTableSalidasMprimaEdit
      var data = new FormData();
      data.append("todasLasSalidasProductos", true);

      $.ajax({
        url: "ajax/salidaMprima.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableSalProductosPrima.clear();
          tableSalProductosPrima.rows.add(response);
          tableSalProductosPrima.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(
            "Error en la solicitud AJAX: ",
            textStatus,
            errorThrown
          );
          console.error("Detalles del error: ", jqXHR.responseText);
        },
      });
    }
  });
});

//////////////////////////modales para proceso oeprativos
// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableSalidasMprima")) {
      $("#dataTableSalidasMprima").DataTable().destroy();
    }

    // Estructura de dataTableSalidasMprima
    $("#dataTableSalidasMprima thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Salida Producto</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha Salida</th>
          <th scope="col">Salidas Productos</th>
          <th scope="col">Total</th>
          </tr>
      `);

    // Definición inicial de dataTableSalidasMprima
    var columnDefsSalProductosPrima = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "nombreSalMprima" },
      {
        data: "idProcOp",
        render: function (data, type, row) {
          if (data === null || data === 0) {
            return '<span class="text-danger">Salida sin Asignar</span>';
          } else {
            return '<span class="text-success">Salida Asignada</span>';
          }
        },
      },
      { data: "fechaSalMprima" },
      //{ data: "modalProcSalMprima" },
      { data: "modalSalMprima" },
      {
        data: "totalSalMprima",
        render: function (data, type, row) {
          return "S/ " + data; // Coloca 'S/' delante del valor de la celda
        },
      },
      //{ data: "buttons" },
    ];

    var tableSalProductosPrima = $("#dataTableSalidasMprima").DataTable({
      columns: columnDefsSalProductosPrima,
    });

    // Titulo dataTableSalidasMprima
    $(".tituloSalidas").text("Todas las salidas de Productos Prima de Almacen");

    // Solicitud inicial de dataTableSalidasMprima
    var data = new FormData();
    data.append("todasLasSalidasProductos", true);

    $.ajax({
      url: "ajax/salidaMprima.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableSalProductosPrima.clear();
        tableSalProductosPrima.rows.add(response);
        tableSalProductosPrima.draw();
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
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableSalidasMprima").on("click", ".btnVerSalProd", function () {
      var codAllSalMprima = $(this).attr("codAllSalMprima");

      $("#modalDataTableProdSalida thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto Prima</th>
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
      data.append("codAllSalMprima", codAllSalMprima);

      $.ajax({
        url: "ajax/salidaMprima.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
          var decodedJson = JSON.parse(response.salJsonMprima);
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
//fin
// descargar ingresos productos por fechas
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaMprimaList";
  if (currentPath == appPath) {
    $(function () {
      var boton = $("#btnDescargarSalidaMPrima");
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
        data.append("fechaInicioSalidaMPrima", fechaInicioNot);
        data.append("fechaFinSalidaMPrima", fechaFinNot);
        $.ajax({
          url: "ajax/salidaMprima.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            // Llama a la función para crear y descargar el archivo Excel
            crearArchivoExcelSalidaMPrimaporFecha(
              response,
              "SalidasMPrima",
              "Salidas_Materia_Prima"
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
const crearArchivoExcelSalidaMPrimaporFecha = (
  data,
  nombreHoja,
  nombreArchivo
) => {
  const cabecerasPersonalizadas = [
    "Nombre Ingreso",
    "Fecha Ingreso",
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
    "nombreSalMprima",
    "fechaSalMprima",
    "igvSalMprima",
    "subTotalSalMprima",
    "totalSalMprima",
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
