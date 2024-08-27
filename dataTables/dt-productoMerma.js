// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
  //verrificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMermaList";
  if (currentPath == appPath) {
    //si es correcta la ruta inicializa el datatable

    // Verifica si el DataTable ya está inicializado y destrúyelo si es así
    if ($.fn.DataTable.isDataTable("#dataTableProductoMerma")) {
      $("#dataTableProductoMerma").DataTable().destroy();
    }

    // Estructura de dataTableProductoMerma
    $("#dataTableProductoMerma thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Registro</th>
          <th scope="col">Fecha Registro</th>
          <th scope="col">Estado</th>
          <th scope="col">Producto Merma</th>
          <th scope="col">Productos Mermados</th>
        
        </tr>
      `);

    // Definición inicial de dataTableProductoMerma
    var columnDefsProdMerma = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1; // Para el número de fila
        },
      },
      { data: "descripcionProdMerma" },
      { data: "fechaProdMerma" },
      { data: "stateProdMerma" },
      { data: "btnProdMerma" },
      { data: "btnMprimaMerma" },
      // { data: "btnEditMerma" },
    ];

    var tableProdMerma = $("#dataTableProductoMerma").DataTable({
      columns: columnDefsProdMerma,
    });

    // Titulo dataTableProductoMerma
    $(".tituloProdMerma").text("Todos los registro de Producto Merma");

    // Solicitud inicial de dataTableProductoMerma
    var data = new FormData();
    data.append("todosLosRegistrosProdMerma", true);

    $.ajax({
      url: "ajax/productoMerma.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        tableProdMerma.clear();
        tableProdMerma.rows.add(response);
        tableProdMerma.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud AJAX: ", textStatus, errorThrown);
        console.error("Detalles del error: ", jqXHR.responseText);
      },
    });
  }
});
//fin

// //data table modal salidas almacen
document.addEventListener("DOMContentLoaded", function () {
  $("#modalAddProdMPrima").on("shown.bs.modal", function () {
    // Verificar si la ruta es la correcta al mostrar el modal
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/productoMerma";
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
          <th scope="col">Código</th>
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

//modal para ver productos mermamdos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    $(".dataTableMerma").on("click", ".btnVerMermaAceptada", function () {
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
            <th scope="col">Código </th>
            <th scope="col">Unidad merma</th>
            <th scope="col">Cantidad merma</th>
            <th scope="col">Precio merma</th>
            <th scope="col">Estado Merma</th>
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
          {
            data: "estadoMerma",
            render: function (data, type, row) {
              var estado = Number(data); // Convertir data a número
              if (estado === 1) {
                return '<span class="text-warning">Sin Utilizar</span>';
              } else {
                return '<span class="text-success">Utilizado</span>';
              }
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
                  estadoMerma: item.mermaDesechoEstado,
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
    });
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

//modal para ver productos de productoMerma
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMermaList";
  if (currentPath == appPath) {
    $(".dataTableProductoMerma").on("click", ".btnMermaProd", function () {
      var codProdMerma = $(this).attr("codProdMerma");

      $("#modalDataTableProdMerma thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto Prima</th>
          <th scope="col">Código Producto</th>
          <th scope="col">Unidad Producto</th>
          <th scope="col">Cantidad Producto</th>
          <th scope="col">Precio Producto</th>
        </tr>
      `);

      var columnDefsProdMermCreate = [
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

      var tableProdMermCreate = $("#modalDataTableProdMerma").DataTable({
        columns: columnDefsProdMermCreate,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codProdMerma", codProdMerma);

      $.ajax({
        url: "ajax/productoMerma.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Asumiendo que la respuesta incluye el JSON en un campo llamado ingJsonProd
          var decodedJson = JSON.parse(response.jsonProdMerma);
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
          tableProdMermCreate.clear();

          // Añade los nuevos datos y redibuja la tabla
          tableProdMermCreate.rows.add(dataArray);
          tableProdMermCreate.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
  }
});
//fin

//modal para ver productos de productoMerma
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMermaList";
  if (currentPath == appPath) {
    $(".dataTableProductoMerma").on("click", ".btnMermaMPrima", function () {
      var codProdMpMerma = $(this).attr("codProdMpMerma");

      $("#modalDataTableProdMprimaMerma thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Producto Prima</th>
          <th scope="col">Código Producto</th>
          <th scope="col">Unidad Producto</th>
          <th scope="col">Cantidad Producto</th>
          <th scope="col">Precio Producto</th>
          <th scope="col">Estado</th>
        </tr>
      `);

      var columnDefsProdMpMerma = [
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
        {
          data: "mPrimAdd",
          render: function (data, type, row) {
            if (data === null) {
              return '<span class="text-success">Merma Utilizada</span>';
            } else {
              return '<span class="text-warning">Materia Prima Agregada</span>';
            }
          },
        },
      ];

      var tableProdMpMerma = $("#modalDataTableProdMprimaMerma").DataTable({
        columns: columnDefsProdMpMerma,
        destroy: true, // Asegúrate de destruir la instancia anterior para evitar problemas de inicialización
      });

      var data = new FormData();
      data.append("codProdMpMerma", codProdMpMerma);

      $.ajax({
        url: "ajax/productoMerma.ajax.php",
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
                nombreProd: item.nombreProdIng,
                codigoProd: item.codigoProdIng,
                unidadProd: item.unidadProdIng,
                cantidadProd: item.cantidadProdIng,
                precioProd: item.precioProdIng,
                mPrimAdd: item.hasOwnProperty('mPrimAdd') ? item.mPrimAdd : null,
              });
            }
          }

          // Limpia el DataTable antes de añadir los nuevos datos
          tableProdMpMerma.clear();

          // Añade los nuevos datos y redibuja la tabla
          tableProdMpMerma.rows.add(dataArray);
          tableProdMpMerma.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
  }
});
//fin
