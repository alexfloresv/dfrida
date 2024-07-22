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
    $(".dataTableSalidasProd").on("click", ".btnVerIngProd", function () {
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
          <th scope="col">Codigo</th>
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

// //data table modal editar ingresos
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
          <th scope="col">Codigo</th>
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
