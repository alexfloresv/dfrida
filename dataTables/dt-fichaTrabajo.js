// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableFichaTrabajo")) {
      $("#dataTableFichaTrabajo").DataTable().destroy();
    }

    // Estructura de dataTableFichaTrabajo
    $("#dataTableFichaTrabajo thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Proceso</th>
          <th scope="col">Producto</th>
          <th scope="col">Procesos</th>
          <th scope="col">Observación</th>
            <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableFichaTrabajo
    var columnDefsTrabajo = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "tituloFichaProc" },
      { data: "productoFichaProc" },
      //{ data: "procesoFichaProcJson" },modalProcs
      { data: "modalProcs" },
      { data: "detalleFichaProc" },
      { data: "buttons" },
    ];

    var tableTrabajo = $("#dataTableFichaTrabajo").DataTable({
      columns: columnDefsTrabajo,
    });

    // Titulo dataTableFichaTrabajo
    $(".tituloFichaTrabajo").text("Todas los Fujos de trabajo");

    // Solicitud inicial de dataTableFichaTrabajo
    var data = new FormData();
    data.append("todasLasFichasTrabajo", true);

    $.ajax({
      url: "ajax/fichaTrabajo.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableTrabajo.clear();
        tableTrabajo.rows.add(response);
        tableTrabajo.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // Procedencia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
  }
});
// data table para el modal de lsita de procesos de trabajo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on("click", ".btnVerFichaTrabajo", function () {
      var codFichTrab = $(this).attr("codFichTrab");

      // Actualiza la estructura del thead para incluir las nuevas columnas
      $("#ModalDataTableProcesoTrabajo thead").html(`
        <tr>
          <th scope="col">N° Actividad</th>
          <th scope="col">Nombre</th>
          <th scope="col">Tiempo</th>
          <th scope="col">Observación</th>
        </tr>
      `);

      // Actualiza columnDefsProcesoTrabajo para incluir las nuevas columnas
      var columnDefsProcesoTrabajo = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreProceso" }, // Asume que este es el nombre del proceso
        { data: "tiempo" }, // Asume que este campo existe en tu JSON
        { data: "observacion" }, // Asume que este campo existe en tu JSON
      ];

      var tableProcesoTrabajo = $("#ModalDataTableProcesoTrabajo").DataTable({
        columns: columnDefsProcesoTrabajo,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codFichTrab", codFichTrab);

      $.ajax({
        url: "ajax/fichaTrabajo.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado procesoFichaProcJson
          var decodedJson = JSON.parse(response.procesoFichaProcJson);
          var dataArray = [];

          // Transformar el objeto JSON en un array de objetos
          for (var key in decodedJson) {
            if (decodedJson.hasOwnProperty(key)) {
              var item = decodedJson[key];
              dataArray.push({
                // Ajusta estos campos según la estructura de tu JSON
                nombreProceso: item.procesosAdd,
                tiempo: item.tiempoAdd,
                observacion: item.observacionAdd,
              });
            }
          }

          // Limpia el DataTable antes de añadir los nuevos datos
          tableProcesoTrabajo.clear();

          // Añade los nuevos datos y redibuja la tabla
          tableProcesoTrabajo.rows.add(dataArray);
          tableProcesoTrabajo.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
  }
});

// mostrar todas las fichas de trabajo en el modal de tipos de procesos
document.addEventListener("DOMContentLoaded", function () {
  $("#modalverFichasTrabajo").on("shown.bs.modal", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableFichaTrabajo")) {
        $("#dataTableFichaTrabajo").DataTable().destroy();
      }

      // Estructura de dataTableFichaTrabajo
      $("#dataTableFichaTrabajo thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Proceso</th>
          <th scope="col">Producto</th>
          <th scope="col">Procesos</th>
          <th scope="col">Observación</th>
            <th scope="col">Descargar</th>
        </tr>
      `);

      // Definición inicial de dataTableFichaTrabajo
      var columnDefsTrabajo = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "tituloFichaProc" },
        { data: "productoFichaProc" },
        //{ data: "procesoFichaProcJson" },modalProcs
        { data: "modalProcs" },
        { data: "detalleFichaProc" },
        { data: "buttons" },
      ];

      var tableTrabajo = $("#dataTableFichaTrabajo").DataTable({
        columns: columnDefsTrabajo,
      });

      // Titulo dataTableFichaTrabajo
      $(".tituloFichaTrabajo").text("Todas los Fujos de trabajo");

      // Solicitud inicial de dataTableFichaTrabajo
      var data = new FormData();
      data.append("todasLasFichasTrabajoModal", true);

      $.ajax({
        url: "ajax/fichaTrabajo.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableTrabajo.clear();
          tableTrabajo.rows.add(response);
          tableTrabajo.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText); // Procedencia de error
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});

// mostrar todas las fichas de trabajo en el modal de tipos de procesos
// data table para el modal de lsita de procesos de trabajo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on("click", ".btnVerFichaTrabajo", function () {
      var codFichTrab = $(this).attr("codFichTrab");

      // Actualiza la estructura del thead para incluir las nuevas columnas
      $("#ModalDataTableProcesoTrabajo thead").html(`
        <tr>
          <th scope="col">N° Actividad</th>
          <th scope="col">Nombre</th>
          <th scope="col">Tiempo</th>
          <th scope="col">Observación</th>
        </tr>
      `);

      // Actualiza columnDefsProcesoTrabajo para incluir las nuevas columnas
      var columnDefsProcesoTrabajo = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreProceso" }, // Asume que este es el nombre del proceso
        { data: "tiempo" }, // Asume que este campo existe en tu JSON
        { data: "observacion" }, // Asume que este campo existe en tu JSON
      ];

      var tableProcesoTrabajo = $("#ModalDataTableProcesoTrabajo").DataTable({
        columns: columnDefsProcesoTrabajo,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codFichTrab", codFichTrab);

      $.ajax({
        url: "ajax/fichaTrabajo.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado procesoFichaProcJson
          var decodedJson = JSON.parse(response.procesoFichaProcJson);
          var dataArray = [];

          // Transformar el objeto JSON en un array de objetos
          for (var key in decodedJson) {
            if (decodedJson.hasOwnProperty(key)) {
              var item = decodedJson[key];
              dataArray.push({
                // Ajusta estos campos según la estructura de tu JSON
                nombreProceso: item.procesosAdd,
                tiempo: item.tiempoAdd,
                observacion: item.observacionAdd,
              });
            }
          }

          // Limpia el DataTable antes de añadir los nuevos datos
          tableProcesoTrabajo.clear();

          // Añade los nuevos datos y redibuja la tabla
          tableProcesoTrabajo.rows.add(dataArray);
          tableProcesoTrabajo.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
  }
});
