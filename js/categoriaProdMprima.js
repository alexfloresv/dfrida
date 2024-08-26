// Iniciar función por el document solo si se encuentra en la vista o ruta correcta que debe de ser "products"
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    document
      .getElementById("btnCrearCategoriaProdMprima")
      .addEventListener("click", function (event) {
        var formulario = document.getElementById(
          "formCrearCategoriaProdMprima"
        );
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");

        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });

        var jsonCrearCategoriaProductosMprima = JSON.stringify(datosFormulario);

        $.ajax({
          url: "ajax/categoriaProdMprima.ajax.php",
          method: "POST",
          data: {
            jsonCrearCategoriaProductosMprima:
              jsonCrearCategoriaProductosMprima,
          },
          dataType: "json",
          success: function (response) {
            $("#modalCrearCategoriaProdMprima").modal("hide");

            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Categoria Materia Prima creada correctamente",
              }).then(function (result) {
                if (result.value) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "La Categoria Materia Prima no se ha podido crear inserte una nueva Categoria",
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
    var formulario = document.getElementById("formCrearCategoriaProdMprima");
    formulario.reset();
  }
});
//fin crear Cliente nuevo
//  editar Productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    $(".dataTableCategoriasProductosMprima").on(
      "click",
      ".btnEditCatProdMp",
      function () {
        var codCatProMp = $(this).attr("codCatProMp");
        var data = new FormData();
        data.append("codCatProMp", codCatProMp);
        //visualizar los datos del Productos en el modal
        $.ajax({
          url: "ajax/categoriaProdMprima.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            //console.log(response);
            $("#codCatProMp").val(response["idCatMPrima"]);
            $("#categoriaNameProdEditarMprima").val(
              response["nombreCategoriaMprima"]
            );
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
    $("#btnEditarCategoriaProdMprima").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarCategoriaProdMprima");
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
      var jsonEditarCategoriaProductosMprima = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      $.ajax({
        url: "ajax/categoriaProdMprima.ajax.php",
        method: "POST",
        data: {
          jsonEditarCategoriaProductosMprima:
            jsonEditarCategoriaProductosMprima,
        },
        dataType: "json",
        success: function (response) {
          $("#modalEditarCategoriaProdMprima").modal("hide");
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Categoria editada correctamente",
              "success"
            ).then(function () {
              $("#modalViewCatProdMprima").modal("show");
            });
          } else {
            Swal.fire(
              "Error",
              "La Categoria no se ha podido editar",
              "error"
            ).then(function () {
              $("#modalViewCatProdMprima").modal("show");
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
    /*    $("#btnCerrarEditarCategoriaProdMprima").on("click", function () {
      $("#modalEditarCategoriaProdMprima").modal("hide");
    }); */
  }
});
//fin
// eliminar Productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    $(".dataTableCategoriasProductosMprima").on(
      "click",
      ".btnDeleteCatProdMp",
      function () {
        var codCatProMp = $(this).attr("codCatProMp");
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
              var jsonBorraCateProductoMp = JSON.stringify({
                codCatProMp: codCatProMp,
              });
              $.ajax({
                url: "ajax/categoriaProdMprima.ajax.php",
                method: "POST",
                data: { jsonBorraCateProductoMp: jsonBorraCateProductoMp },
                dataType: "json",
                success: function (response) {
                  $("#modalViewCatProdMprima").modal("hide");
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto",
                      "Categoria eliminada correctamente",
                      "success"
                    ).then(function () {
                      $("#modalViewCatProdMprima").modal("show");
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "La Categoria de producto se encuentra en uso no se puede eliminar",
                      "error"
                    ).then(function () {
                      $("#modalViewCatProdMprima").modal("show");
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
  var appPath = "/dfrida/productMprima";
  if (currentPath == appPath) {
    // Escucha el evento click en los botones de edición dentro del DataTable
    $(".dataTableCategoriasProductosMprima").on(
      "click",
      ".btnEditCatProdMp",
      function () {
        // Cierra el modal de vista de categorías
        $("#modalViewCatProdMprima").modal("hide");
        // Abre el modal de edición de categorías
        $("#modalEditarCategoriaProdMprima").modal("show");
      }
    );

    // Añade un escuchador de eventos al botón de cerrar o editar dentro del modal de edición
    $("#btnCerrarEditarCategoriaProdMprima, #btnEditarCategoriaProdMprima").on(
      "click",
      function () {
        // Cierra el modal de edición de categorías
        $("#modalEditarCategoriaProdMprima").modal("hide");
        // Espera un breve retraso antes de abrir el modal de vista de categorías
        setTimeout(function () {
          $("#modalViewCatProdMprima").modal("show");
        }, 100); // Ajusta el retraso según sea necesario
      }
    );
  }
});

//funcion para ver la categorias de productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById("productCategoryContainerMprima");
    container.innerHTML = `
      <div class="form-group">
        <label for="productCategoryMp" class="col-form-label">Categoría Materia Prima:</label>
        <select class="form-control" id="productCategoryMp" name="productCategoryMp">
          <option value="0">Seleccione una categoría</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector(".form-group");
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";

    // Inicializar Select2 en el nuevo campo select
    $("#productCategoryMp").select2({
      dropdownParent: $("#modalAddProductoMprima"), // Asegúrate de que el ID del modal sea correcto
    });

    // Cargar datos dinámicamente al confirmar
    var data = new FormData();
    data.append("todasLasCategoriasMprima", true);

    $.ajax({
      url: "ajax/categoriaProdMprima.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#productCategoryMp").empty();
        $("#productCategoryMp").append(
          '<option value="0">Seleccionar categoria </option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#productCategoryMp").append(
            '<option value="' +
              value.idCatMPrima +
              '">' +
              value.nombreCategoriaMprima +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#productCategoryMp").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin

//funcion para ver la categorias de productos editar
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById(
      "productCategoryContainerMprimaEdit"
    );
    container.innerHTML = `
      <div class="form-group">
        <label for="editProductCategoryMp" class="col-form-label">Categoría Materia Prima:</label>
        <select class="form-control" id="editProductCategoryMp" name="editProductCategoryMp">
          <option value="0">Seleccione una categoría</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector(".form-group");
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";

    // Inicializar Select2 en el nuevo campo select
    $("#editProductCategoryMp").select2({
      dropdownParent: $("#modalEditProductoMprima"), // Asegúrate de que el ID del modal sea correcto
    });

    // Cargar datos dinámicamente al confirmar
    var data = new FormData();
    data.append("todasLasCategoriasMprima", true);

    $.ajax({
      url: "ajax/categoriaProdMprima.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#editProductCategoryMp").empty();
        $("#editProductCategoryMp").append(
          '<option value="0">Seleccionar categoria </option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#editProductCategoryMp").append(
            '<option value="' +
              value.idCatMPrima +
              '">' +
              value.nombreCategoriaMprima +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#editProductCategoryMp").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin

//funcion para ver proveedores m prima
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById("proveedorMprima");
    container.innerHTML = `
      <div class="form-group">
        <label for="provedoresMp" class="col-form-label">Proveedor Materia Prima:</label>
        <select class="form-control" id="provedoresMp" name="provedoresMp">
          <option value="0">Seleccione un proveedor</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector(".form-group");
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";

    // Inicializar Select2 en el nuevo campo select
    $("#provedoresMp").select2({
      dropdownParent: $("#modalAddProductoMprima"), // Asegúrate de que el ID del modal sea correcto
    });

    // Cargar datos dinámicamente al confirmar
    var data = new FormData();
    data.append("todosLosProveedores", true);

    $.ajax({
      url: "ajax/categoriaProdMprima.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#provedoresMp").empty();
        $("#provedoresMp").append(
          '<option value="0">Seleccionar proveedor</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#provedoresMp").append(
            '<option value="' +
              value.idProv +
              '">' +
              value.nombreProv +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#provedoresMp").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin

//funcion para ver proveedores m prima edit
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productMprima";
  if (currentPath === appPath) {
    // Agregar el label y el select dinámicamente al div vacío
    var container = document.getElementById("proveedorMprimaEdit");
    container.innerHTML = `
      <div class="form-group">
        <label for="provedoresMpEdit" class="col-form-label">Proveedor Materia Prima:</label>
        <select class="form-control" id="provedoresMpEdit" name="provedoresMpEdit">
          <option value="0">Seleccione un proveedor</option>
        </select>
      </div>
    `;

    // Aplicar estilos para asegurar que el select esté debajo del label
    var formGroup = container.querySelector(".form-group");
    formGroup.style.display = "flex";
    formGroup.style.flexDirection = "column";

    // Inicializar Select2 en el nuevo campo select
    $("#provedoresMpEdit").select2({
      dropdownParent: $("#modalEditProductoMprima"), // Asegúrate de que el ID del modal sea correcto
    });

    // Cargar datos dinámicamente al confirmar
    var data = new FormData();
    data.append("todosLosProveedores", true);

    $.ajax({
      url: "ajax/categoriaProdMprima.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#provedoresMpEdit").empty();
        $("#provedoresMpEdit").append(
          '<option value="0">Seleccionar proveedor</option>'
        );
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#provedoresMpEdit").append(
            '<option value="' +
              value.idProv +
              '">' +
              value.nombreProv +
              "</option>"
          );
        });
        // Actualizar Select2 después de agregar las opciones
        $("#provedoresMpEdit").trigger("change");
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
  }
});
//fin