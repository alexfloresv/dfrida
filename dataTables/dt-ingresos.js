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
// descargar ingresos productos por fechas
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoList";
  if (currentPath == appPath) {
    $(function () {
      var boton = $("#btnDescargarIngresoProd");
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
        data.append("fechaInicioIngresoProdporFecha", fechaInicioNot);
        data.append("fechaFinIngresoProdporFecha", fechaFinNot);
        $.ajax({
          url: "ajax/ingresoProd.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            // Llama a la función para crear y descargar el archivo Excel
            crearArchivoExcelIngresosProductosporFecha(
              response,
              "IngresosProductos",
              "Ingreso_Productos"
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
const crearArchivoExcelIngresosProductosporFecha = (
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
    "nombreIngProd",
    "fechaIngProd",
    "igvIngProd",
    "subTotalIngProd",
    "totalIngProd",
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

