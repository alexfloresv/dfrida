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
          <th scope="col">Actualizar Proceso</th>
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
          if (data === null) {
            return '<span class="text-success">Por iniciar</span>';
          } else {
            return '<span class="text-success">' + data + "</span>";
          }
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

//modal para ver productos de salida por el boton
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    
    $(".dataTableProcesoOperativo").on("click", ".btnVerSalProdProcOp", function () {
      var codSalProdMprimaProcOP = $(this).attr("codSalProdMprimaProcOP");

      $("#modalProdSalidasProcOP").on("shown.bs.modal", function () {
        // Verifica si el DataTable ya está inicializado y destrúyelo si es así
        if ($.fn.DataTable.isDataTable("#modalDataTableProdSalidaProcOp")) {
          $("#modalDataTableProdSalidaProcOp").DataTable().destroy();
        }

        $("#modalDataTableProdSalidaProcOp thead").html(`
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

        var tableProdIngresados = $("#modalDataTableProdSalidaProcOp").DataTable({
          columns: columnDefsProdIngresados,
          destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
        });

        var data = new FormData();
        data.append("codAllSalMprima", codSalProdMprimaProcOP);

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

      // Forzar la apertura del modal para que se dispare el evento shown.bs.modal
      $("#modalProdSalidasProcOP").modal('show');
    });
  }
});
//fin
