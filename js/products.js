// Crear Producto nuevo
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearProducto")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearProducto");
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
        var jsonCrearProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/products.ajax.php",
          method: "POST",
          data: { jsonCrearProductos: jsonCrearProductos },
          dataType: "json",
          success: function (response) {
            $("#modalAddProducto").modal("hide"); // Cerrar el modal
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
                html: "<strong>Producto creado correctamente</strong>",
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
                html: "Ya existe un Producto con el mismo <strong>nombre</strong>.",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                }
              });
            } else if (response == "errorCod") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto con el mismo <strong>código</strong>.",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "<strong>No se puede crear el Producto con datos Vacios</strong>.",
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
//fin crear Producto nuevo

//funcion para ver la categorias de productos editar
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById("productCategoryContainerEdit");
    container.innerHTML = `
      <div class="form-group">
        <label for="editProductCategory" class="col-form-label">Categoría:</label>
        <select class="form-control" id="editProductCategory" name="editProductCategory">
          <option value="0">Seleccione una categoría</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector(".form-group");
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";

    // Inicializar Select2 en el nuevo campo select
    $("#editProductCategory").select2({
      dropdownParent: $("#modalEditProducto"), // Asegúrate de que el ID del modal sea correcto
    });

    // Cargar datos dinámicamente al confirmar
    var data = new FormData();
    data.append("todasLasCategorias", true);

    $.ajax({
      url: "ajax/categoriaProd.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#editProductCategory").empty();
        $("#editProductCategory").append(
          '<option value="0">Seleccione una categoría</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#editProductCategory").append(
            '<option value="' +
              value.idCatPro +
              '">' +
              value.nombreCategoriaProd +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#editProductCategory").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin

//  editar Productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    $(".dataTableProductos").on("click", ".btnEditProducto", function () {
      var codPro = $(this).attr("codPro");
      var data = new FormData();
      data.append("codPro", codPro);
      //visualizar los datos del Productos en el modal
      $.ajax({
        url: "ajax/products.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          //console.log(response);
          $("#editProductName").val(response["nombreProd"]);
          // Establecer el valor del select2
          var editProductCategory = response["idCatPro"];
          $("#editProductCategory").val(editProductCategory).trigger("change");
          //
          $("#editProductCodigo").val(response["codigoProd"]);
          $("#editProductUnit").val(response["unidadProd"]);
          $("#editProductPrice").val(response["precioProd"]);
          $("#editProductDetail").val(response["detalleProd"]);
          $("#codProduct").val(response["idProd"]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin visualizar los datos del Productos en el modal

    //editar Productos si se da clic en el boton editar
    $("#btnEditarProducto").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarProducto");
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
      var jsonEditarProductos = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/products.ajax.php",
        method: "POST",
        data: { jsonEditarProductos: jsonEditarProductos },
        dataType: "json",
        success: function (response) {
          $("#modalEditProducto").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Producto editado correctamente",
              "success"
            ).then(function () {
              window.location.reload(); // Recargar la página
            });
          } else {
            Swal.fire(
              "Error",
              "El Producto no se ha podido editar",
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
    //fin editar Productos si se da clic en el boton editar
    // Escuchar el clic en el botón de cerrar
    $("#btnCerrarEditarProducto").on("click", function () {
      $("#modalEditProducto").modal("hide");
    });
  }
});
//fin
// eliminar Productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    $(".dataTableProductos").on("click", ".btnDeleteProducto", function () {
      var codPro = $(this).attr("codPro");
      //mensaje de confirmación para eliminar Productos
      swal
        .fire({
          title: "¿Está seguro de borrar el Producto?",
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
            var jsonBorraProducto = JSON.stringify({
              codPro: codPro,
            });
            $.ajax({
              url: "ajax/products.ajax.php",
              method: "POST",
              data: { jsonBorraProducto: jsonBorraProducto },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Producto eliminado correctamente",
                    "success"
                  ).then(function () {
                    window.location.reload(); // Recargar la página
                  });
                } else {
                  Swal.fire(
                    "Error",
                    "El Producto se encuentra en el inventario no se puede eliminar",
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
//fin eliminar Productos
// Crear Producto nuevo en la vista de Cotizacion
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearProducto")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearProducto");
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
        var jsonCrearProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/products.ajax.php",
          method: "POST",
          data: { jsonCrearProductos: jsonCrearProductos },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "<strong>Producto creado correctamente</strong>",
              }).then(function (result) {
                if (result.value) {
                  $("#modalAddProductoNuevoCotizacion").modal("hide");
                  $("#modalAddProdCoti").modal("show");
                }
              });
            } else if (response == "errorNom") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto con el mismo <strong>nombre</strong>.",
              }).then(function (result) {});
            } else if (response == "errorCod") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto con el mismo <strong>código</strong>.",
              }).then(function (result) {});
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "<strong>No se puede crear el Producto con datos Vacios</strong>.",
              }).then(function (result) {});
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
// Crear Producto nuevo en la vista de editar Cotizacion
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "users"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionListEdit";
  if (currentPath == appPath) {
    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnCrearProducto")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formCrearProducto");
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
        var jsonCrearProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/products.ajax.php",
          method: "POST",
          data: { jsonCrearProductos: jsonCrearProductos },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "<strong>Producto creado correctamente</strong>",
              }).then(function (result) {
                if (result.value) {
                  $("#modalAddProductoNuevoEditarCotizacion").modal("hide");
                  $("#modalEditProdCoti").modal("show");
                }
              });
            } else if (response == "errorNom") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto con el mismo <strong>nombre</strong>.",
              }).then(function (result) {});
            } else if (response == "errorCod") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Ya existe un Producto con el mismo <strong>código</strong>.",
              }).then(function (result) {});
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "<strong>No se puede crear el Producto con datos Vacios</strong>.",
              }).then(function (result) {});
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
