// data table de ProcesoOperativo
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableProcesoOperativo")) {
      $("#dataTableProcesoOperativo").DataTable().destroy();
    }

    // Estructura de dataTableProcesoOperativo
    $("#dataTableProcesoOperativo thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Iniciar Proceso</th>
          <th scope="col">Estado Actual</th>
          <th scope="col">Proceso Actual</th>
          <th scope="col">Nombre Proceso</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Fecha Registro</th>
          <th scope="col">Fecha Inicio</th>
          <th scope="col">Fecha Fin</th>
          <th scope="col">Pedido</th>
          <th scope="col">Prod Prima</th>
          <th scope="col">Finalizar Proceso</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

    // Definición inicial de dataTableProcesoOperativo
    var columnDefsProcOp = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "btnIniProcOp" },
      { data: "estado" },
      { data: "modalTipoProc" },
      { data: "nombreProcOp" },
      { data: "descripcionProcOp" },
      {
        data: "fechaRegistroProcOp",
        render: function (data, type, row) {
          return '<span class="text-primary">' + data + "</span>";
        },
      },
      {
        data: "fechaInicioProcOp",
        render: function (data, type, row) {
          return '<span class="text-success">' + data + "</span>";
        },
      },
      {
        data: "fechaFinProcOp",
        render: function (data, type, row) {
          return '<span class="text-danger">' + data + "</span>";
        },
      },
      { data: "modalPedido" },
      { data: "modalSalProdMprima" },
      { data: "btnFinProcOp" },
      { data: "buttons" },
    ];

    var tableProcOp = $("#dataTableProcesoOperativo").DataTable({
      columns: columnDefsProcOp,
    });

    // Titulo dataTableProcesoOperativo
    $(".tituloProcOp").text("Todos los Procesos Operativos");

    // Solicitud inicial de dataTableProcesoOperativo
    var data = new FormData();
    data.append("todosLosProcOp", true);

    $.ajax({
      url: "ajax/procesoOperativo.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableProcOp.clear();
        tableProcOp.rows.add(response);
        tableProcOp.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
        console.error("Detalles del error: ", jqXHR.responseText);
      },
    });
  }
});
//fin

// data table modal todos los tipos de procesos
document.addEventListener("DOMContentLoaded", function () {
  $("#modalDataTableTipoProcesoOp").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta al mostrar el modal
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/procesosOperativos";
    if (currentPath == appPath) {
      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#modalDataTableTiposDeProceso")) {
        $("#modalDataTableTiposDeProceso").DataTable().destroy();
      }
      // Estructura de modalDataTableTiposDeProceso
      $("#modalDataTableTiposDeProceso thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Tipo Proceso</th>
             <th scope="col">Descripcion</th>
          <th scope="col">Ficha Trabajo</th>
          <th scope="col">Aciones</th>
        </tr>
      `);

      // Definición inicial de modalDataTableTiposDeProceso
      var columnDefsTiposProcOp = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        { data: "nombreTipoProc" },
        { data: "descripcionTipoProc" },
        { data: "descFichTrab" },
        { data: "btns" },
      ];

      var tableTiposProcOp = $("#modalDataTableTiposDeProceso").DataTable({
        columns: columnDefsTiposProcOp,
      });
      //data table tipos de procesos operativos
      var data = new FormData();
      data.append("todosLosTiposProcOp", true);

      $.ajax({
        url: "ajax/procesoOperativo.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableTiposProcOp.clear();
          tableTiposProcOp.rows.add(response);
          tableTiposProcOp.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }
  });
});
//fin
