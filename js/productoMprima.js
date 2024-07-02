// Crear productMprima nuevo
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearProductoMprima")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearProductoMprima");
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
        var jsonCrearProductosMprima = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/productMprima.ajax.php",
          method: "POST",
          data: { jsonCrearProductosMprima: jsonCrearProductosMprima },
          dataType: "json",

          success: function (response) {
            $("#modalAddProductoMprima").modal("hide"); // Cerrar el modal
            // Función para limpiar los datos de la URL
            var limpiarURL = function () {
              window.history.pushState(
                {},
                document.title,
                window.location.pathname
              );
            };

            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "<strong>Producto Prima creado correctamente</strong>",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                  window.location.reload(); // Recargar la página
                }
              });
            } else if (response == "errorNom") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto Prima con el mismo <strong>nombre</strong>.",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                }
              });
            } else if (response == "errorCod") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto Prima con el mismo <strong>código</strong>.",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "<strong>No se puede crear el Producto Prima con datos Vacios</strong>.",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
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
//fin crear productMprima nuevo
//  editar productMprima
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    $(".dataTableProductosMprima").on(
      "click",
      ".btnEditProductoMprima",
      function () {
        var codProMp = $(this).attr("codProMp");
        var data = new FormData();
        data.append("codProMp", codProMp);
        //visualizar los datos del Productos en el modal
        $.ajax({
          url: "ajax/productMprima.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            //console.log(response);
            $("#editProductNameMp").val(response["nombreMprima"]);
            $("#editProductCategoryMp").val(response["idCatMprima"]);
            $("#editProductCodigoMp").val(response["codigoMprima"]);
            $("#editProductUnitMp").val(response["unidadMprima"]);
            $("#editProductPriceMp").val(response["precioMprima"]);
            $("#editProductDetailMp").val(response["detalleMprima"]);
            $("#codProductMp").val(response["idMprima"]);
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
    );
    //fin visualizar los datos del ProductosMprima en el modal

    //editar ProductosMprima si se da clic en el boton editar
    $("#btnEditarProductoMprima").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarProductoMprima");
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
      var jsonEditarProductosMprima = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/productMprima.ajax.php",
        method: "POST",
        data: { jsonEditarProductosMprima: jsonEditarProductosMprima },
        dataType: "json",
        success: function (response) {
          $("#modalEditProducto").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Producto Prima editado correctamente",
              "success"
            ).then(function () {
              window.location.reload(); // Recargar la página
            });
          } else {
            Swal.fire(
              "Error",
              "El Producto Prima no se ha podido editar existe otro igual",
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
    //fin editar ProductosMprima si se da clic en el boton editar
    // Escuchar el clic en el botón de cerrar
    $("#btnCerrarEditarProducto").on("click", function () {
      $("#modalEditProducto").modal("hide");
    });
  }
});
//fin
// eliminar ProductosMprima
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    $(".dataTableProductosMprima").on(
      "click",
      ".btnDeleteProductoMprima",
      function () {
        var codProMp = $(this).attr("codProMp");
        //mensaje de confirmación para eliminar ProductosMprima
        swal
          .fire({
            title: "¿Está seguro de borrar el Producto Prima?",
            text: "¡No podrá revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, borrar Producto!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var jsonBorraProductoMprima = JSON.stringify({
                codProMp: codProMp,
              });
              $.ajax({
                url: "ajax/productMprima.ajax.php",
                method: "POST",
                data: { jsonBorraProductoMprima: jsonBorraProductoMprima },
                dataType: "json",
                success: function (response) {
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto",
                      "Producto Prima eliminado correctamente",
                      "success"
                    ).then(function () {
                      window.location.reload(); // Recargar la página
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "El Producto Prima se encuentra en el inventario no se puede eliminar",
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
      }
    );
  }
});
//fin eliminar ProductosMprima
