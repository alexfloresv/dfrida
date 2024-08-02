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
  var appPath = "/dfrida/clients";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearCliente")
      .addEventListener("click", function (event) {
        // al verificar la ruta estara atento al evento click del id del boton
        //event.preventDefault(); // prevenir el comportamiento predeterminado del evento de clic para si es de tipo submit
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearCliente");
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
        var jsonCrearCliente = JSON.stringify(datosFormulario);
        //console.log(jsonCrearCliente);
        //enviar el json por ajax

        $.ajax({
          url: "ajax/clients.ajax.php",
          method: "POST",
          data: { jsonCrearCliente: jsonCrearCliente },
          dataType: "json",

          success: function (response) {
            $("#modalAddClients").modal("hide"); // Cerrar el modal
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Cliente creado correctamente",
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
                text: "El Cliente no se ha podido registrar ingrese los datos",
              }).then(function (result) {
                if (result.value) {
                  // Limpiar los datos de la URL
                  window.history.pushState(
                    {},
                    document.title,
                    window.location.pathname
                  ); //limpiar la url fin
                  //window.location.reload(); // Recargar la página
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
//  editar Clientes
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/clients";
  if (currentPath == appPath) {
    $(".dataTableClientes").on("click", ".btnEditCliente", function () {
      var codCli = $(this).attr("codCli");
      var data = new FormData();
      data.append("codCli", codCli);
      //visualizar los datos del Clientes en el modal
      $.ajax({
        url: "ajax/clients.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          $("#EditRu").val(response["rucCli"]);
          $("#EditRazonSocial").val(response["RazonSocialCli"]);
          $("#EditNameCli").val(response["nombreCli"]);
          $("#EditEmailCli").val(response["correoCli"]);
          $("#EditAddressCli").val(response["direccionCli"]);
          $("#EditPhoneCli").val(response["celularCli"]);
          $("#EditDetallCli").val(response["detalleCli"]);
          $("#EditStateCli").val(response["estadoCli"]);
          $("#codClient").val(response["idCli"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin visualizar los datos del Clientes en el modal

    //editar Clientes si se da clic en el boton editar
    $("#btnEditarClientes").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarClientes");
      var datosFormulario = {};
      //obtener los elementos del formulario
      var elementosFormulario = formulario.querySelectorAll("input, select");
      //for each para recorrer los elementos del formulario y asignarle la clave como si id y su valor
      elementosFormulario.forEach(function (elemento) {
        if (elemento.id) {
          datosFormulario[elemento.id] = elemento.value;
        }
      });
      //crear el json
      var jsonEditarClientes = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/clients.ajax.php",
        method: "POST",
        data: { jsonEditarClientes: jsonEditarClientes },
        dataType: "json",
        success: function (response) {
          $("#modalEditClients").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Cliente editado correctamente",
              "success"
            ).then(function () {
              window.location.reload(); // Recargar la página
            });
          } else {
            Swal.fire(
              "Error",
              "El Cliente no se ha podido editar",
              "error"
            ).then(function () {
              //$("#modalEditClients").modal("hide");
            });
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin editar Clientes si se da clic en el boton editar
    // Escuchar el clic en el botón de cerrar
    $("#btnCerrarEditarClientes").on("click", function () {
      $("#modalEditClients").modal("hide");
    });
  }
});
//fin
//  eliminar Clientes
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/clients";
  if (currentPath == appPath) {
    $(".dataTableClientes").on("click", ".btnDeleteCliente", function () {
      var codCli = $(this).attr("codCli");
      var estadoCli = $(this).attr("estadoCli");
      //mensaje de confirmación para eliminar Clientes
      swal
        .fire({
          title: "¿Está seguro de borrar el Cliente?",
          text: "¡No podrá revertir el cambio!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, borrar Clientes!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var jsonBorraClientes = JSON.stringify({
              codCli: codCli,
              estadoCli: estadoCli,
            });
            $.ajax({
              url: "ajax/clients.ajax.php",
              method: "POST",
              data: { jsonBorraClientes: jsonBorraClientes },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Cliente eliminado correctamente",
                    "success"
                  ).then(function () {
                    window.location.reload(); // Recargar la página
                  });
                } else {
                  Swal.fire(
                    "Error",
                    "El Cliente no se ha podido eliminar esta activo",
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
//fin eliminar Clientes
//  editar Clientes
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    $(".dataTablePedidos").on("click", ".btnVerClientePedido", function () {
      var idCli = $(this).attr("idCli");
      var data = new FormData();
      data.append("codCli", idCli);
      //visualizar los datos del Clientes en el modal
      $.ajax({
        url: "ajax/clients.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          $("#VerRuPedido").val(response["rucCli"]);
          $("#VerRazonSocialPedido").val(response["RazonSocialCli"]);
          $("#VerNameCliPedido").val(response["nombreCli"]);
          $("#VerEmailCliPedido").val(response["correoCli"]);
          $("#VerAddressCliPedido").val(response["direccionCli"]);
          $("#VerPhoneCliPedido").val(response["celularCli"]);
          $("#VerDetallCliPedido").val(response["detalleCli"]);
          $("#codClient").val(response["idCli"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    $("#modalVerClientePedidos").on(
      "click",
      "#btnCerrarVerClientesPedidos",
      function () {
        $("#modalVerClientePedidos").modal("hide");
      }
    );
  }
});

//fin visualizar los datos del Clientes en el modal
