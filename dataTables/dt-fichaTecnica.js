// funciond ata table para modales de categorias de productos crear y eliminar registros sina ctualizar la pagina
document.addEventListener("DOMContentLoaded", function () {
    //verrificar si la ruta es la correcta
    var currentPath = window.location.pathname;
    var appPath = "/dfrida/fichaTecnicaList";
    if (currentPath == appPath) {
      //si es correcta la ruta inicializa el datatable

      // Verifica si el DataTable ya está inicializado y destrúyelo si es así
      if ($.fn.DataTable.isDataTable("#dataTableFichaTenica")) {
        $("#dataTableFichaTenica").DataTable().destroy();
      }

      // Estructura de dataTableFichaTenica
      $("#dataTableFichaTenica thead").html(`
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre Ficha Tenica</th>
          <th scope="col">Fecha</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Codigo Ficha</th>
          <th scope="col">Cliente</th>
          <th scope="col">Celular</th>
          <th scope="col">Ficha Tecnica</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      `);

      // Definición inicial de dataTableFichaTenica
      var columnDefsFichaTecnica = [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1; // Para el número de fila
          },
        },
        { data: "nombreFichaTec" },
        { data: "fechaFichaTec" },
        { data: "descripcionFichaTec" },
        { data: "codigoFichaTec" },
        { data: "clienteFichaTec" },
        { data: "celularFichaTec" },
        { data: "descargaFicha" },
        { data: "estadoFichaTec" },
        { data: "buttons" },
      ];

      var tableFichaTecnia = $("#dataTableFichaTenica").DataTable({
        columns: columnDefsFichaTecnica,
      });

      // Titulo dataTableFichaTenica
      $(".tituloFichaTecnica").text("Todas las Fichas Tenicas");

      // Solicitud inicial de dataTableFichaTenica
      var data = new FormData();
      data.append("todasLasFichasTecnicas", true);

      $.ajax({
        url: "ajax/fichaTecnica.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          tableFichaTecnia.clear();
          tableFichaTecnia.rows.add(response);
          tableFichaTecnia.draw();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText); // Procedencia de error
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

});
