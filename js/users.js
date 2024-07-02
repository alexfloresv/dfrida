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
// Crear usuario nuevo
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/users";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearUsuario")
      .addEventListener("click", function (event) {
        // al verificar la ruta estara atento al evento click del id del boton
        //event.preventDefault(); // prevenir el comportamiento predeterminado del evento de clic para si es de tipo submit

        var userName = document.getElementById("userName").value;
        var userPassword = document.getElementById("userPassword").value;
        var userFirstName = document.getElementById("userFirstName").value;
        var userLastName = document.getElementById("userLastName").value;
        var userType = document.getElementById("userType").value;

        var data = {
          userName: userName,
          userPassword: userPassword,
          userFirstName: userFirstName,
          userLastName: userLastName,
          userType: userType,
        };

        $.ajax({
          url: "ajax/users.ajax.php",
          method: "POST",
          data: { jsonCrearUsuario: JSON.stringify(data) },
          dataType: "json",

          success: function (response) {
            $("#modalAddUser").modal("hide"); // Cerrar el modal
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Usuario creado correctamente",
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
                text: "El usuario no se ha podido registrar",
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
//fin crear usuario nuevo
//  editar usuario
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/users";
  if (currentPath == appPath) {
    $(".dataTableUsuarios").on("click", ".btnEditUser", function () {
      var codUser = $(this).attr("codUser");
      var data = new FormData();
      data.append("codUser", codUser);
      //visualizar los datos del usuario en el modal
      $.ajax({
        url: "ajax/users.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          $("#editFirstName").val(response["nombre"]);
          $("#editLastName").val(response["apellido"]);
          $("#editUserName").val(response["nombreUsu"]);
          $("#editUserType").val(response["idTipoUsu"]);
          $("#codUser").val(codUser);
          $("#modalEditUser").modal("show");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin visualizar los datos del usuario en el modal

    //editar usuario si se da clic en el boton editar
    $("#btnEditarUsuario").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formCrearEditarUsuario");
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
      var jsonEditarUsuario = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/users.ajax.php",
        method: "POST",
        data: { jsonEditarUsuario: jsonEditarUsuario },
        dataType: "json",
        success: function (response) {
          $("#modalEditUser").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Usuario editado correctamente",
              "success"
            ).then(function () {
              window.location.reload(); // Recargar la página
            });
          } else {
            Swal.fire(
              "Error",
              "El usuario no se ha podido editar",
              "error"
            ).then(function () {
              //$("#modalEditUser").modal("hide");
            });
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin editar usuario si se da clic en el boton editar
    // Escuchar el clic en el botón de cerrar
    $("#btnCerrarEditarUsuario").on("click", function () {
      $("#modalEditUser").modal("hide");
    });
  }
});
//fin
//  eliminar usuario
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/users";
  if (currentPath == appPath) {
    $(".dataTableUsuarios").on("click", ".btnDeleteUser", function () {
      var codUser = $(this).attr("codUser");
      //mensaje de confirmación para eliminar usuario
      swal
        .fire({
          title: "¿Está seguro de borrar el usuario?",
          text: "¡No podrá revertir el cambio!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, borrar usuario!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var jsonBorraUsuario = JSON.stringify({ codUser: codUser }); 
            $.ajax({
              url: "ajax/users.ajax.php",
              method: "POST",
              data: { jsonBorraUsuario: jsonBorraUsuario },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Usuario eliminado correctamente",
                    "success"
                  ).then(function () {
                    window.location.reload(); // Recargar la página
                  });
                } else {
                  Swal.fire(
                    "Error",
                    "El usuario no se ha podido eliminar",
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
//fin eliminar usuario
