//caso de sub dominio
/* document.addEventListener("DOMContentLoaded", function () {
  var currentHostname = window.location.hostname;
  var currentPath = window.location.pathname;
  var appHostname = "subdominio.dominio.com";
  var appPath = "/dfrida/users"; 

  if (currentHostname == appHostname && currentPath == appPath) {
    // Tu código aquí
  }
}); */
//fin
// Crear Cliente nuevo
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/proveedores";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearProveedor")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearProveedor");
        var datosFormulario = {};
        //obtener los elementos del formulario
        var elementosFormulario = formulario.querySelectorAll("input, select");
        //for each para recorrer los elementos del formulario y asignarle la clave como su id y su valor
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        //crear el json
        var jsonCrearProveedores = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/proveedores.ajax.php",
          method: "POST",
          data: { jsonCrearProveedores: jsonCrearProveedores },
          dataType: "json",

          success: function (response) {
            $("#modalAddProveedor").modal("hide"); // Cerrar el modal
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Proveedor creado correctamente",
              }).then(function (result) {
                if (result.value) {
                  // Limpiar los datos de la URL
                  window.history.pushState(
                    {},
                    document.title,
                    window.location.pathname
                  ); //limpiar la url fin
                  window.location.reload(); // Recargar la página
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "El Proveedor no se ha podido registrar",
              }).then(function (result) {
                if (result.value) {
                  // Limpiar los datos de la URL
                  window.history.pushState(
                    {},
                    document.title,
                    window.location.pathname
                  ); //limpiar la url fin
                 // window.location.reload(); // Recargar la página
                }
              });
            }
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
    //fin vericar ruta
  }
});
//fin crear Cliente nuevo
//  editar Proveedores
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/proveedores";
  if (currentPath == appPath) {
    $(".dataTableProveedores").on("click", ".btnEditProveedor", function () {
      var codPov = $(this).attr("codPov");
      var data = new FormData();
      data.append("codPov", codPov);
      //visualizar los datos del Proveedores en el modal
      $.ajax({
        url: "ajax/proveedores.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          $("#razonSocialProvEdit").val(response["razonSocialProv"]);
          $("#rucProvEdit").val(response["rucProv"]);
          $("#nombreProvEdit").val(response["nombreProv"]);
          $("#correoProvEdit").val(response["correoProv"]);
          $("#direccionProvEdit").val(response["direccionProv"]);
          $("#celularProvEdit").val(response["celularProv"]);
          $("#detalleProvEdit").val(response["detalleProv"]);
          $("#estadoProvEdit").val(response["estadoProv"]);
          $("#codProveedorEdit").val(response["idProv"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin visualizar los datos del Proveedores en el modal

    //editar Proveedores si se da clic en el boton editar
    $("#btnEditarProveedor").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarProveedor");
      var datosFormulario = {};
      //obtener los elementos del formulario
      var elementosFormulario = formulario.querySelectorAll("input, select");
      //for each para recorrer los elementos del formulario y asignarle la clave como su id y su valor
      elementosFormulario.forEach(function (elemento) {
        if (elemento.id) {
          datosFormulario[elemento.id] = elemento.value;
        }
      });
      //crear el json
      var jsonEditarProveedores = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/proveedores.ajax.php",
        method: "POST",
        data: { jsonEditarProveedores: jsonEditarProveedores },
        dataType: "json",
        success: function (response) {
          $("#modalEditProveedor").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Proveedor editado correctamente",
              "success"
            ).then(function () {
              window.location.reload(); // Recargar la página
            });
          } else {
            Swal.fire(
              "Error",
              "El Proveedor no se ha podido editar",
              "error"
            ).then(function () {
              //$("#modalEditProveedor").modal("hide");
            });
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin editar Proveedores si se da clic en el boton editar
    // Escuchar el clic en el botón de cerrar
    $("#btnCerrarEditarProveedor").on("click", function () {
      $("#modalEditProveedor").modal("hide");
    });
  }
});
//fin
//  eliminar Proveedores
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/proveedores";
  if (currentPath == appPath) {
    $(".dataTableProveedores").on("click", ".btnDeleteProveedor", function () {
      var codPov = $(this).attr("codPov");
      var estadoProv = $(this).attr("estadoProv");
      //mensaje de confirmación para eliminar Proveedores
      swal
        .fire({
          title: "¿Está seguro de borrar el Cliente?",
          text: "¡No podrá revertir el cambio!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, borrar Proveedores!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var jsonBorraProveedores = JSON.stringify({
              codPov: codPov,
              estadoProv: estadoProv,
            });
            $.ajax({
              url: "ajax/proveedores.ajax.php",
              method: "POST",
              data: { jsonBorraProveedores: jsonBorraProveedores },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Proveedor eliminado correctamente",
                    "success"
                  ).then(function () {
                    window.location.reload(); // Recargar la página
                  });
                } else {
                  Swal.fire(
                    "Error",
                    "El Proveedor no se ha podido eliminar esta Activo",
                    "error"
                  ).then(function () {
                    //window.location.reload(); // Recargar la página
                  });
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(
                  "Error en la solicitud AJAX: ",
                  textStatus,
                  errorThrown
                );
              },
            });
          }
        });
    });
  }
});
//fin eliminar Proveedores
