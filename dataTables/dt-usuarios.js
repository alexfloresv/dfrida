//verificar ruta para inicializar dataTableUsuarios
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/users";
  if (currentPath == appPath) {
    // Definición inicial de dataTableClientes
    var columnDefsUsuario = [
      { data: "nombreUsu" },
      { data: "nombre" },
      { data: "apellido" },
      { data: "descripcionTipo" },
      { data: "LastConnection" },
      { data: "buttons" },
    ];

    var tableUsuario = $("#dataTableUsuarios").DataTable({
      columns: columnDefsUsuario,
    });

    // Titulo dataTableUsuarios
    $(".tituloUsuarios").text("Todos los Usuarios");

    //Solicitud inicial de dataTableUsuarios
    var data = new FormData();
    data.append("todosLosUsuarios", true);

    $.ajax({
      url: "ajax/users.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",

      success: function (response) {
        tableUsuario.clear();
        tableUsuario.rows.add(response);
        tableUsuario.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // procendecia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });

    //Estructura de dataTableUsuarios
    $("#dataTableUsuarios thead").html(`
    <tr>
      <th scope="col">#</th>
      <th scope="col">Usuario</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Tipo Usuario</th>
      <th scope="col">Ultima Conexión</th>
      <th scope="col">Acciones</th>
    </tr>
    `);

    tableUsuario.destroy();

    columnDefsUsuario = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nombreUsu" },
      { data: "nombre" },
      { data: "apellido" },
      { data: "descripcionTipo" },
      { data: "LastConnection" },
      { data: "buttons" },
    ];
    tableUsuario = $("#dataTableUsuarios").DataTable({
      columns: columnDefsUsuario,
    });
    //fin vericar ruta
  }
});
