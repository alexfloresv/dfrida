//verificar ruta para inicializar dataTableProveedores
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/proveedores";
  if (currentPath == appPath) {
    // Definición inicial de dataTableClientes
    var columnDefsProveedor = [
      { data: "nombreProv" },
      { data: "celularProv" },
      { data: "rucProv" },
      { data: "razonSocialProv" },
      { data: "correoProv" },
      { data: "direccionProv" },
      { data: "detalleProv" },
      { data: "estadoProv" },
      { data: "buttons" },
    ];

    var tableProveedor = $("#dataTableProveedores").DataTable({
      columns: columnDefsProveedor,
    });

    // Titulo dataTableProveedores
    $(".tituloProveedores").text("Todos los Proveedores");

    //Solicitud inicial de dataTableProveedores
    var data = new FormData();
    data.append("todosLosProveedores", true);

    $.ajax({
      url: "ajax/proveedores.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",

      success: function (response) {
        tableProveedor.clear();
        tableProveedor.rows.add(response);
        tableProveedor.draw();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText); // procendecia de error
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });

    //Estructura de dataTableProveedores
    $("#dataTableProveedores thead").html(`
    <tr>
      <th scope="col">#</th>
     
  
      <th scope="col">Nombre Proveedor</th>
      <th scope="col">Celular</th>
      <th scope="col">Ruc</th>
       <th scope="col">Razon Social</th>
      <th scope="col">Correo</th>
      <th scope="col">Direcccion</th>
      <th scope="col">Observacion</th>
      <th scope="col">Estado</th>
      <th scope="col">Acciones</th>
    </tr>
    `);

    tableProveedor.destroy();

    columnDefsProveedor = [
      {
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + 1;
        },
      },
      { data: "nombreProv" },
      { data: "celularProv" },
      { data: "rucProv" },
      { data: "razonSocialProv" },
      { data: "correoProv" },
      { data: "direccionProv" },
      { data: "detalleProv" },
      { data: "estadoProv" },
      { data: "buttons" },
    ];
    tableProveedor = $("#dataTableProveedores").DataTable({
      columns: columnDefsProveedor,
    });
    //fin vericar ruta
  }
});
