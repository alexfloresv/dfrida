//verificar ruta para inicializar dataTableClientes
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/clients";
  if (currentPath == appPath) {
    // Definición inicial de dataTableClientes
    var columnDefsClientes = [
      { data: "RazonSocialCli" },
      { data: "rucCli" },
      { data: "nombreCli" },
      { data: "correoCli" },
      { data: "direccionCli" },
      { data: "celularCli" },
      { data: "detalleCli" },
      { data: "estadoCli" },
      { data: "buttons" },
    ];

    var tableClientes = $("#dataTableClientes").DataTable({
      columns: columnDefsClientes,
    });

    // Titulo dataTableClientes
    $(".tituloClientes").text("Todos los Clientes");

    //Solicitud inicial de dataTableClientes
    var data = new FormData();
    data.append("todosLosClientes", true);

    $.ajax({
      url: "ajax/clients.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",

      success: function (response) {
        tableClientes.clear();
        tableClientes.rows.add(response);
        tableClientes.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // procendecia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });

    //Estructura de dataTableClientes
    $("#dataTableClientes thead").html(`
    <tr>
    <th>#</th>
    <th>Razón Social</th>
    <th>RUC</th>
     <th>Nombre</th>
    <th>Correo</th>
    <th>Dirección</th>
    <th>Celular</th>
    <th>Observación</th>
    <th>Estado</th>
    <th>Acciones</th>
    </tr>
    `);

    tableClientes.destroy();

    columnDefsClientes = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "RazonSocialCli" },
      { data: "rucCli" },
      { data: "nombreCli" },
      { data: "correoCli" },
      { data: "direccionCli" },
      { data: "celularCli" },
      { data: "detalleCli" },
      { data: "estadoCli" },
      { data: "buttons" },
    ];
    tableClientes = $("#dataTableClientes").DataTable({
      columns: columnDefsClientes,
    });
    //fin vericar ruta
  }
});
