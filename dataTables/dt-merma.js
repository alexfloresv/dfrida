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

//modal para ver productos mermamdos 

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    $(".dataTableMerma").on(
      "click",
      ".btnVerMermaAceptada",
      function () {
        var codMerma = $(this).attr("codMerma");

        $("#modalProdMprimaMerma").on("shown.bs.modal", function () {
          // Verifica si el DataTable ya está inicializado y destrúyelo si es así
          if ($.fn.DataTable.isDataTable("#DataTableProdMprimaMermados")) {
            $("#DataTableProdMprimaMermados").DataTable().destroy();
          }

          $("#DataTableProdMprimaMermados thead").html(`
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto Prima</th>
            <th scope="col">Codigo Producto</th>
            <th scope="col">Unidad Producto</th>
            <th scope="col">Cantidad Producto</th>
            <th scope="col">Precio Prodcuto</th>
          </tr>
         `);

          var columnDefsProdMermados = [
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

          var tableProdMprimaMermados = $(
            "#DataTableProdMprimaMermados"
          ).DataTable({
            columns: columnDefsProdMermados,
            destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
          });

          var data = new FormData();
          data.append("codMerma", codMerma);

          $.ajax({
            url: "ajax/merma.ajax.php",
            method: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (response) {
              // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
              var decodedJson = JSON.parse(response.jsonMerma);
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
              tableProdMprimaMermados.clear();

              // Añade los nuevos datos y redibuja la tabla
              tableProdMprimaMermados.rows.add(dataArray);
              tableProdMprimaMermados.draw();
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
        $("#modalProdMprimaMerma").modal("show");
      }
    );
  }
});
//fin

//funcion para mostrar proceso oeprativo adjunto
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    $(".dataTableMerma").on("click", ".btnVerProcOpMerma", function () {
      // Abrir el modal
      $("#modalEstadosProcesosOpMerma").modal("show");

      // Limpiar todos los datos del modal
      $("#modalEstadosProcesosOpMerma").find("input, textarea, select").val("");

      // Obtener los datos del botón
      var codProcOpMerma = $(this).attr("codProcOpMerma");

      // Crear el objeto FormData
      var jsonProcOpMerma = JSON.stringify({
        codProcOpMerma: codProcOpMerma,
      });

      // Realizar la solicitud AJAX
      $.ajax({
        url: "ajax/merma.ajax.php",
        method: "POST",
        data: { jsonProcOpMerma: jsonProcOpMerma },
        dataType: "json",
        success: function (response) {
          if (response == "error") {
            Swal.fire({
              title: "No se encuentra un proceso operativo asignado",
              text: "¿Desea asignarle un proceso operativo?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Si, asignar Proceso Operativo",
              cancelButtonText: "No, en otro momento",
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirigir a la ruta para asignar proceso operativo
                window.location.href = "/dfrida/procesosOperativos";
              } else {
                $("#modalEstadosProcesosOpMerma").modal("hide");
              }
            });
          } else {
            $("#nombrePorcesoOpNombreMerma").val(response["nombreProcOp"]);
            $("#fechaInicioProcOpMerma").val(response["fechaInicioProcOp"]);
            $("#fechaFinProcOpMerma").val(response["fechaFinProcOp"]);
            $("#tipoPorcesoOpNombreMerma").val(response["nombreTipoProc"]);
            $("#estadoPrincipalProcOPMerma").val(response["estadoProcOp"]);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(
            "Error en la solicitud AJAX: ",
            textStatus,
            errorThrown
          );
        },
      });
    });
  }
});
//fin proceso operativo
