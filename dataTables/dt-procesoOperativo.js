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
          <th scope="col">Descripción</th>
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
             <th scope="col">Descripción</th>
          <th scope="col">Ficha Trabajo</th>
          <th scope="col">Acciones</th>
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

//modal para ver productos prima de salida por el boton
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on(
      "click",
      ".btnVerSalProdProcOp",
      function () {
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
            <th scope="col">Código Producto</th>
            <th scope="col">Unidad Producto</th>
            <th scope="col">Cantidad Producto</th>
            <th scope="col">Precio Producto</th>
          </tr>
         `);

          var columnDefsProdSalidaMprima = [
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

          var tableProdSalidaMprima = $(
            "#modalDataTableProdSalidaProcOp"
          ).DataTable({
            columns: columnDefsProdSalidaMprima,
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
              tableProdSalidaMprima.clear();

              // Añade los nuevos datos y redibuja la tabla
              tableProdSalidaMprima.rows.add(dataArray);
              tableProdSalidaMprima.draw();
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(
                "Error en la solicitud AJAX: ",
                textStatus,
                errorThrown
              );
            },
          });
        });

        // Forzar la apertura del modal para que se dispare el evento shown.bs.modal
        $("#modalProdSalidasProcOP").modal("show");
      }
    );
  }
});
//fin

//funcion visualizar procesos de trabajo activos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    document
      .getElementById("btnFichaTrabEstate")
      .addEventListener("click", function () {
        var idFichaProc = $("#btnFichaTrabEstate").data("id-ficha");
        var idProcOp = $("#btnFichaTrabEstate").data("id-proc-op");

        // cierra el modal
        $("#modalEstadosProcesosOp").modal("hide");
        // Abre el modal
        $("#modalVerProcesoTrabajo").modal("show");

        $("#modalVerProcesoTrabajo").on("shown.bs.modal", function () {
          // Verifica si el DataTable ya está inicializado y destrúyelo si es así
          if ($.fn.DataTable.isDataTable("#dataTableProcesosDeTrabajoActivo")) {
            $("#dataTableProcesosDeTrabajoActivo").DataTable().destroy();
          }

          // Actualiza la estructura del thead para incluir las nuevas columnas
          $("#dataTableProcesosDeTrabajoActivo thead").html(`
          <tr>
            <th scope="col">N° Actividad</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tiempo</th>
            <th scope="col">Observación</th>
            <th scope="col">Estado Trabajo</th>
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
            {
              data: "estadoProcOp",
              render: function (data, type, row) {
                if (data === 1) {
                  return '<span class="text-primary">REGISTRADO</span>';
                } else if (data === 2) {
                  return '<span class="text-warning">EN PROCESO</span>';
                } else if (data === 3) {
                  return '<span class="text-danger">CUELLO DE BOTELLA</span>';
                } else if (data === 4) {
                  return '<span class="text-warning">LISTO </span>';
                } else if (data === 5) {
                  return '<span class="text-success">PRENDA TERMINADA</span>';
                } else {
                  return '<span class="text-danger">RETRASADO</span>';
                }
              },
            },
          ];

          var tableProcesoTrabajo = $(
            "#dataTableProcesosDeTrabajoActivo"
          ).DataTable({
            columns: columnDefsProcesoTrabajo,
            destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
          });

          // Enviar el valor al servidor usando fetch
          // Crear el objeto FormData
          var jsonEstadosFichTrab = JSON.stringify({
            idFichaProc: idFichaProc,
            idProcOp: idProcOp,
          });

          $.ajax({
            url: "ajax/procesoOperativo.ajax.php",
            method: "POST",
            data: { jsonEstadosFichTrab: jsonEstadosFichTrab },

            dataType: "json",
            success: function (response) {
              // Asumiendo que la respuesta incluye el JSON en un campo llamado procesoFichaProcJson
              var decodedJson = JSON.parse(response.procesoFichaProcJson);
              var dataArray = [];
              var estadoProcOp = response.estadosProcOpTrab.estadoProcOp;

              // Transformar el objeto JSON en un array de objetos
              for (var key in decodedJson) {
                if (decodedJson.hasOwnProperty(key)) {
                  var item = decodedJson[key];
                  dataArray.push({
                    // Ajusta estos campos según la estructura de tu JSON
                    nombreProceso: item.procesosAdd,
                    tiempo: item.tiempoAdd,
                    observacion: item.observacionAdd,
                    estadoProcOp: estadoProcOp,
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

//fin funcion

//funcion ver productos de pedido / cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableProcesoOperativo").on("click", ".btnVerPedido", function () {
      var codPed = $(this).attr("codPed");

      $("#modalVerProductosPedido").on("shown.bs.modal", function () {

        // Destruir el DataTable solo cuando se abre el modal
        if ($.fn.DataTable.isDataTable("#dataTableProductosActivosConfeccion")) {
          $("#dataTableProductosActivosConfeccion").DataTable().destroy();
        }

        // Limpiar el encabezado de la tabla
        $("#dataTableProductosActivosConfeccion thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Producto</th>
        
          <th scope="col">Unidad Producto</th>
          <th scope="col">Cantidad Producto</th>
          <th scope="col">Precio Prodcuto</th>
        </tr>
        `);

        var columnDefsProdPedido = [
          {
            data: null,
            render: function (data, type, row, meta) {
              return meta.row + 1;
            },
          },
          { data: "nombreProd" },
          //{ data: "codigoProd" },
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
        $.fn.dataTable.ext.errMode = 'none';

        var tableProdPedido = $("#dataTableProductosActivosConfeccion").DataTable({
          columns: columnDefsProdPedido,
          destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
        });

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
            // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
            var decodedJson = JSON.parse(response.productsCoti);
            var dataArray = [];

            // Transformar el objeto JSON en un array de objetos
            for (var key in decodedJson) {
              if (decodedJson.hasOwnProperty(key)) {
                var item = decodedJson[key];
                //var codigoProd = await ingresoProductoEdit(item.codProdCoti);
                dataArray.push({
                  // Ajusta estos campos según la estructura de tu JSON
                  nombreProd: item.nombreProdCoti,
                  //codigoProd: codigoProd,
                  unidadProd: item.unidadProdCoti,
                  cantidadProd: item.cantidadProdCoti,
                  precioProd: item.precioProdCoti,
                });
              }
            }

            // Limpia el DataTable antes de añadir los nuevos datos
            tableProdPedido.clear();

            // Añade los nuevos datos y redibuja la tabla
            tableProdPedido.rows.add(dataArray);
            tableProdPedido.draw();
          },
          error: function (jqXHR, textStatus, errorThrown) {
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
