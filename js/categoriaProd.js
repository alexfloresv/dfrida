// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "products"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    document
      .getElementById("btnCrearCategoriaProd")
      .addEventListener("click", function (event) {
        var formulario = document.getElementById("formCrearCategoriaProd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");

        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });

        var jsonCrearCategoriaProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/categoriaProd.ajax.php",
          method: "POST",
          data: { jsonCrearCategoriaProductos: jsonCrearCategoriaProductos },
          dataType: "json",
          success: function (response) {
            $("#modalCrearCategoriaProd").modal("hide");

            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Categoria creada correctamente",
              }).then(function (result) {
                if (result.value) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "La Categoria no se ha podido crear inserte una nueva Categoria",
              }).then(function (result) {
                if (result.value) {
                  window.history.pushState(
                    {},
                    document.title,
                    window.location.pathname
                  );
                  limpiarFormulario();
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
            limpiarFormulario();
          },
        });
      });
  }
  // Función para limpiar el formulario y no actualizar la página solo para modales create
  function limpiarFormulario() {
    var formulario = document.getElementById("formCrearCategoriaProd");
    formulario.reset();
  }
});
//fin crear Cliente nuevo
//  editar Productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    $(".dataTableCategoriasProductos").on(
      "click",
      ".btnEditCatProd",
      function () {
        var codCatPro = $(this).attr("codCatPro");
        var data = new FormData();
        data.append("codCatPro", codCatPro);
        //visualizar los datos del Productos en el modal
        $.ajax({
          url: "ajax/categoriaProd.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            //console.log(response);
            $("#codCatPro").val(response["idCatPro"]);
            $("#categoriaNameProdEditar").val(response["nombreCategoriaProd"]);
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
    //fin visualizar los datos del Productos en el modal

    //editar Productos si se da clic en el boton editar
    $("#btnEditarCategoriaProd").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarCategoriaProd");
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
      var jsonEditarCategoriaProductos = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/categoriaProd.ajax.php",
        method: "POST",
        data: { jsonEditarCategoriaProductos: jsonEditarCategoriaProductos },
        dataType: "json",
        success: function (response) {
          $("#dataTableCategoriasProductos").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Categoria editada correctamente",
              "success"
            ).then(function () {
              $("#modalViewCatProd").modal("show");
            });
          } else {
            Swal.fire(
              "Error",
              "La Categoria no se ha podido editar",
              "error"
            ).then(function () {
              $("#modalViewCatProd").modal("show");
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
    $(".dataTableCategoriasProductos").on(
      "click",
      ".btnDeleteCatProd",
      function () {
        var codCatPro = $(this).attr("codCatPro");
        //mensaje de confirmación para eliminar Productos
        swal
          .fire({
            title: "¿Está seguro de borrar la Categoria de Producto?",
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
              var jsonBorraCateProducto = JSON.stringify({
                codCatPro: codCatPro,
              });
              $.ajax({
                url: "ajax/categoriaProd.ajax.php",
                method: "POST",
                data: { jsonBorraCateProducto: jsonBorraCateProducto },
                dataType: "json",
                success: function (response) {
                  $("#modalViewCatProd").modal("hide");
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto",
                      "Categoria eliminada correctamente",
                      "success"
                    ).then(function () {
                      $("#modalViewCatProd").modal("show");
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "La Categoria de producto se encuentra en uso no se puede eliminar",
                      "error"
                    ).then(function () {
                      $("#modalViewCatProd").modal("show");
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
              ///
            }
          });
      }
    );
  }
});
//fin eliminar Productos

// editar Ctegoria Productos funcionalidad para los modales de ver y editar
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath == appPath) {
    // Escucha el evento click en los botones de edición dentro del DataTable
    $(".dataTableCategoriasProductos").on(
      "click",
      ".btnEditCatProd",
      function () {
        // Cierra el modal de vista de categorías
        $("#modalViewCatProd").modal("hide");
        // Abre el modal de edición de categorías
        $("#modalEditarCategoriaProd").modal("show");
      }
    );

    // Añade un escuchador de eventos al botón de cerrar o editar dentro del modal de edición
    $("#btnCerrarEditarCategoriaProd, #btnEditarCategoriaProd").on(
      "click",
      function () {
        // Cierra el modal de edición de categorías
        $("#modalEditarCategoriaProd").modal("hide");
        // Espera un breve retraso antes de abrir el modal de vista de categorías
        setTimeout(function () {
          $("#modalViewCatProd").modal("show");
        }, 500); // Ajusta el retraso según sea necesario
      }
    );
  }
});

// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "products"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    document
      .getElementById("btnCrearCategoriaProd")
      .addEventListener("click", function (event) {
        var formulario = document.getElementById("formCrearCategoriaProd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");

        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });

        var jsonCrearCategoriaProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/categoriaProd.ajax.php",
          method: "POST",
          data: { jsonCrearCategoriaProductos: jsonCrearCategoriaProductos },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Categoria creada correctamente",
              }).then(function (result) {
                if (result.value) {
                  $("#modalCrearCategoriaProdCotizacion").modal("hide");
                  $("#modalAddProdCoti").modal("show");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "La Categoria no se ha podido crear inserte una nueva Categoria",
              }).then(function (result) {
                if (result.value) {
                  limpiarFormulario();
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
            limpiarFormulario();
          },
        });
      });
  }
  // Función para limpiar el formulario y no actualizar la página solo para modales create
  function limpiarFormulario() {
    var formulario = document.getElementById("formCrearCategoriaProd");
    formulario.reset();
  }
});
// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "products"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionListEdit";
  if (currentPath == appPath) {
    document
      .getElementById("btnCrearCategoriaProd")
      .addEventListener("click", function (event) {
        var formulario = document.getElementById("formCrearCategoriaProd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");

        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });

        var jsonCrearCategoriaProductos = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/categoriaProd.ajax.php",
          method: "POST",
          data: { jsonCrearCategoriaProductos: jsonCrearCategoriaProductos },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Categoria creada correctamente",
              }).then(function (result) {
                if (result.value) {
                  $("#modalCrearCategoriaProdEditarCotizacion").modal("hide");
                  $("#modalEditProdCoti").modal("show");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "La Categoria no se ha podido crear inserte una nueva Categoria",
              }).then(function (result) {
                if (result.value) {
                  limpiarFormulario();
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
            limpiarFormulario();
          },
        });
      });
  }
  // Función para limpiar el formulario y no actualizar la página solo para modales create
  function limpiarFormulario() {
    var formulario = document.getElementById("formCrearCategoriaProd");
    formulario.reset();
  }
});

//funcion para ver la categorias de productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/products";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById("productCategoryContainer");
    container.innerHTML = `
      <div class="form-group">
        <label for="productCategory" class="col-form-label">Categoría:</label>
        <select class="form-control" id="productCategory" name="productCategory">
          <option value="0">Seleccione una categoría</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector('.form-group');
    formGroup.style.display = 'flex';
    formGroup.style.flexDirection = 'column';

    // Inicializar Select2 en el nuevo campo select
    $("#productCategory").select2({
      dropdownParent: $('#modalAddProducto') // Asegúrate de que el ID del modal sea correcto
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
        $("#productCategory").empty();
        $("#productCategory").append(
          '<option value="0">Seleccione una categoría</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#productCategory").append(
            '<option value="' +
              value.idCatPro +
              '">' +
              value.nombreCategoriaProd +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#productCategory").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin
