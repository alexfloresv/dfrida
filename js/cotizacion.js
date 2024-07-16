//agrergar productos a la cotizacion
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    //funcion para agregar productos a la cotizacion
    // Definir un contador global para los IDs de formulario
    var formularioProdCotiCounter = 1;

    $(".dataTableProductos").on("click", ".btnAddProdModalCoti", function () {
      var codAddProdModalCoti = $(this).attr("codAddProdModalCoti");

      var datos = new FormData();
      datos.append("codAddProdModalCoti", codAddProdModalCoti);
      $.ajax({
        url: "ajax/cotizacion.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (respuesta) {
          var idProd = respuesta["idProd"];
          var nombreProd = respuesta["nombreProd"];
          var unidadProd = respuesta["unidadProd"];
          var precioProd = respuesta["precioProd"];

          // Crear un nuevo formulario para el producto con un ID único que incrementa en 1 cada vez que se agrega un producto
          var formularioID = "formularioProdCoti" + formularioProdCotiCounter++;
          var nuevoProductoHTML =
            '<form id="' +
            formularioID +
            '" class="row productoRow" style="padding:5px 15px">' +
            '<div class="col-lg-4">' +
            /* id del prodcuto */
            '<input type="hidden" class="form-control" id="codProdCoti" value="' +
            idProd +
            '">' +
            /* nombre del producto */
            '<input type="text" class="form-control" id="nombreProdCoti" value="' +
            nombreProd +
            '" readonly>' +
            "</div>" +
            /* unidad del tipo de producto */
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control" id="unidadProdCoti"value="' +
            unidadProd +
            '" readonly>' +
            "</div>" +
            /* cantidad editable inicia en 1 */
            '<div class="col-lg-2">' +
            '<input type="number" class="form-control cantidadProdCoti" id="cantidadProdCoti" value="1" min="1" step="1">' +
            "</div>" +
            /* precio */
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control precioProdCoti" id="precioProdCoti" value="' +
            precioProd +
            '" data-original-precio="' +
            precioProd +
            '" readonly>' +
            "</div>" +
            /* boton de eliminar */
            '<div class="col-lg-1">' +
            '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd"><i class="fa fa-times"></i></button>' +
            "</div>" +
            "</form>";

          // Agregar el nuevo formulario al contenedor
          $(".AddProductoCotizacion").append(nuevoProductoHTML);
        },
      });
    });
    // Actualizar el precio cuando cambia la cantidad
    $(document).on("input", ".cantidadProdCoti", function () {
      var count = $(this).val();
      var precioPerUnit = $(this)
        .closest(".productoRow")
        .find(".precioProdCoti")
        .data("original-precio");
      //si el valor del input es vacio o 0 el precio final es 0
      if (count === "" || parseInt(count) === 0) {
        var precioFinal = "0";
      } else {
        var precioFinal = (count * precioPerUnit).toFixed(2);
      }
      // Actualizar el valor interno y el atributo 'value' en el HTML
      $(this).val(count);
      $(this).attr("value", count); // Actualiza el atributo 'value' en el HTML para la cantidad
      $(this)
        .closest(".productoRow")
        .find(".precioProdCoti")
        .val(precioFinal) // Actualiza el valor interno para el precio
        .attr("value", precioFinal); // Actualiza el atributo 'value' en el HTML para el precio
    });

    // Eliminar el producto
    $(document).on("click", ".deleteNuevoIngresoProd", function () {
      $(this).closest(".productoRow").remove();
    });
    //fin agregar productos a la cotizacion
    //fin vericar ruta
  }
});
//fin agreagr productos a la cotizacion

//agrergar productos prima a la cotizacion
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    //funcion para agregar productos prima a la cotizacion
    // Definir un contador global para los IDs de formulario
    var formularioProdMprimaCotiCounter = 1;

    $(".dataTableProductosMprima").on(
      "click",
      ".btnAddProdMprimaModalCoti",
      function () {
        var codAddProdMprimaModalCoti = $(this).attr(
          "codAddProdMprimaModalCoti"
        );

        var datos = new FormData();
        datos.append("codAddProdMprimaModalCoti", codAddProdMprimaModalCoti);
        $.ajax({
          url: "ajax/cotizacion.ajax.php",
          method: "POST",
          data: datos,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (respuesta) {
            var idMprima = respuesta["idMprima"];
            var nombreMprima = respuesta["nombreMprima"];
            var unidadMprima = respuesta["unidadMprima"];
            var precioMprima = respuesta["precioMprima"];

            // Crear un nuevo formulario para el producto prima con un ID único que incrementa en 1 cada vez que se agrega un producto prima
            var formularioMprimaID =
              "formularioProdMprimaCoti" + formularioProdMprimaCotiCounter++;
            var nuevoProductoMprimaHTML =
              '<form id="' +
              formularioMprimaID +
              '" class="row productoMprimaRow" style="padding:5px 15px">' +
              '<div class="col-lg-4">' +
              /* id del prodcuto prima */
              '<input type="hidden" class="form-control" id="codProdMprimaCoti" value="' +
              idMprima +
              '">' +
              /* nombre del producto prima */
              '<input type="text" class="form-control" id="nombreProdMprimaCoti" value="' +
              nombreMprima +
              '" readonly>' +
              "</div>" +
              /* unidad del tipo de producto prima */
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control" id="unidadProdMprimaCoti" value="' +
              unidadMprima +
              '" readonly>' +
              "</div>" +
              /* cantidad editable inicia en 1 */
              '<div class="col-lg-2">' +
              '<input type="number" class="form-control cantidadProdMprimaCoti" id="cantidadProdMprimaCoti" value="1" min="1" step="1">' +
              "</div>" +
              /* precio prima*/
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control precioProdMprimaCoti" id="precioProdMprimaCoti" value="' +
              precioMprima +
              '" data-original-precio="' +
              precioMprima +
              '" readonly>' +
              "</div>" +
              /* boton de eliminar prima*/
              '<div class="col-lg-1">' +
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProdMprima"><i class="fa fa-times"></i></button>' +
              "</div>" +
              "</form>";

            // Agregar el nuevo formulario al contenedor
            $(".AddProductoMprimaCotizacion").append(nuevoProductoMprimaHTML);
          },
        });
      }
    );

    // Actualizar el precio cuando cambia la cantidad para productos prima
    $(document).on("input", ".cantidadProdMprimaCoti", function () {
      var count = $(this).val();
      var precioPerUnitMprima = $(this)
        .closest(".productoMprimaRow")
        .find(".precioProdMprimaCoti")
        .data("original-precio");
      //si el valor del input es vacio o 0 el precio final es 0
      if (count === "" || parseInt(count) === 0) {
        var precioFinalMprima = "0";
      } else {
        var precioFinalMprima = (count * precioPerUnitMprima).toFixed(2);
      }
      // Actualizar el valor interno y el atributo 'value' en el HTML
      $(this).val(count);
      $(this).attr("value", count); // Actualiza el atributo 'value' en el HTML para la cantidad
      $(this)
        .closest(".productoMprimaRow")
        .find(".precioProdMprimaCoti")
        .val(precioFinalMprima) // Actualiza el valor interno para el precio
        .attr("value", precioFinalMprima); // Actualiza el atributo 'value' en el HTML para el precio
    });
    // Eliminar el producto
    $(document).on("click", ".deleteNuevoIngresoProdMprima", function () {
      $(this).closest(".productoMprimaRow").remove();
    });
    //fin agregar productos a la cotizacion
    //fin vericar ruta
  }
});
//fin agregAr productos prima a la cotizacion

// TOTALES DE LA COTIZACION
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    //funcion para calcular los totales de la cotizacion
    $(document).ready(function () {
      function calcularTotalCotizacion() {
        //guarda el valor de los productos y productos prima en 0 para  sumar los precios
        let totalProductos = 0;
        let totalProductosPrima = 0;
        //busca todos los formularios que comiencen con formularioProdCoti = productos
        // Sumar los precios de todos los productos
        $("[id^=formularioProdCoti]").each(function () {
          const precio = parseFloat($(this).find("#precioProdCoti").val()) || 0;
          //toma el valor del input con id precioProdCoti y lo convierte a float
          totalProductos += precio;
        });
        //busca todos los formularios que comiencen con formularioProdMprimaCoti = productos prima
        // Sumar los precios de todos los productos prima
        $("[id^=formularioProdMprimaCoti]").each(function () {
          const precio =
            //toma el valor del input con id precioProdMprimaCoti y lo convierte a float
            parseFloat($(this).find("#precioProdMprimaCoti").val()) || 0;
          totalProductosPrima += precio;
        });

        // Asignar el totalProducto al input de totalProdCotiAdd y actualizar el atributo 'value'
        $("#totalProdCotiAdd")
          .val(totalProductos.toFixed(2))
          .attr("value", totalProductos.toFixed(2));

        // Asignar el totalProductoMprima al input de totalProdMprimaCotiAdd y actualizar el atributo 'value'
        $("#totalProdMprimaCotiAdd")
          .val(totalProductosPrima.toFixed(2))
          .attr("value", totalProductosPrima.toFixed(2));

        // Calcular el total general
        const totalGeneral = totalProductos + totalProductosPrima;

        // Asignar el totalGeneral al input de subTotalCotizacionAdd y actualizar el atributo 'value'
        $("#subTotalCotizacionAdd")
          .val(totalGeneral.toFixed(2))
          .attr("value", totalGeneral.toFixed(2));

    
  // Calcular el 18% de totalGeneral para igvIngProdAdd y actualizar el atributo 'value'
  const igvCotizacionAdd = totalGeneral * 0.18;
  $("#igvCotizacionAdd").val(igvCotizacionAdd).attr("value", igvCotizacionAdd);
        const totalCotizacionAdd = totalGeneral + igvCotizacionAdd;

        // Asignar el totalCotizacion al input de totalCotizacion y actualizar el atributo 'value'
        $("#totalCotizacionAdd")
          .val(totalCotizacionAdd.toFixed(2))
          .attr("value", totalCotizacionAdd.toFixed(2));
      }

      //botón para calcular el total
      $("#btnCalcularTotal").click(function () {
        calcularTotalCotizacion();
      });
    });
    //fin vericar ruta
  }
});
//FIN TOTALES

//verificar que los campos de total cotizacion no esten vacios antes de registrar la cotizacion
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    //escuchar el evento click en el boton registrar cotizacion
    const btnRegistrar = document.getElementById("btnRegistrarCotizacion"); // Selecciona el botón "Registrar Cotizacion"
    btnRegistrar.addEventListener("click", function () {
      let camposRequeridos = [
        //{ id: "igvCotizacionAdd", nombre: "IGV Cotización" },
        { id: "tituloCotiAdd", nombre: "Titulo cotizacion" },
        { id: "fechaCotiAdd", nombre: "Fecha cotizacion" },
        { id: "nombreCotiAdd", nombre: "Nombre Solicitante" },
        { id: "subTotalCotizacionAdd", nombre: "Sub Total Cotización" },
        { id: "totalProdCotiAdd", nombre: "Total Producto" },
        { id: "totalProdMprimaCotiAdd", nombre: "Total Producto Prima" },
        { id: "totalCotizacionAdd", nombre: "Total Cotización" },
      ];
      let formularioValido = true;
      //verificar que los campos de total cotizacion no esten vacios
      camposRequeridos.forEach(function (campo) {
        let input = document.getElementById(campo.id);
        if (!input.value || parseFloat(input.value) === 0) {
          // Verifica si el campo está vacío o es igual a 0
          formularioValido = false;
          input.classList.add("is-invalid"); // Añade una clase para indicar visualmente el error
          // Mostrar mensaje con SweetAlert2, el nombre del campo en negrita
          Swal.fire({
            icon: "error",
            title: "Campo Requerido",
            html: `Complete el campo <b>${campo.nombre}</b> verifique que los <b>Totales</b> no sean <b>0</b> oprima en el botón <b>Calcular</b>.`,
          });
          return; // Salir del forEach no detiene el evento click, pero muestra el primer campo vacío o con valor 0
        } else {
          input.classList.remove("is-invalid"); // Remueve la clase de error si el campo está lleno y no es 0
        }
      });

      if (!formularioValido) {
        // Si el formulario no es válido, se detiene aquí. El mensaje ya fue mostrado por SweetAlert2.
        return;
        // Si el formulario es válido, se procede con la CREACION DE LA COTIZACION
      } else {
        // Aquí puedes añadir la lógica para enviar el formulario manualmente o cualquier otra acción
        console.log("Formulario válido, proceder con la acción deseada.");
        // Simula la pulsación del botón "btnCalcularTotal" para asegurar que los totales estén actualizados si el usuario no lo hizo
        document.getElementById("btnCalcularTotal").click();
        /* fin click calcular total */
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formNuevaCotizacio");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearCotizacion = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS y PRODUCTOS PRIMA
        recojerFormulariosAnidadosProductosYprima(function (
          datosFormulariosProductos,
          datosFormulariosProductosPrima
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProductosCotizacion = JSON.stringify(
            datosFormulariosProductos
          );
          var jsonProductosPrimaCotizacion = JSON.stringify(
            datosFormulariosProductosPrima
          );

          $.ajax({
            url: "ajax/cotizacion.ajax.php",
            method: "POST",
            // Enviar los JSON con los datos recolectados DE LOS FORMULARIOS PRINCIPAL Y PRODUCTOS Y PRODUCTOS PRIMA
            data: {
              jsonCrearCotizacion: jsonCrearCotizacion,
              jsonProductosCotizacion: jsonProductosCotizacion,
              jsonProductosPrimaCotizacion: jsonProductosPrimaCotizacion,
            },
            dataType: "json",
            success: function (response) {
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
                  html: "Cotización Creada Correctamente <strong>¿Desea Crear Otra?</strong> ",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/cotizacionList"; // Redirigir a la vista de cotizacionList
                  }
                });
              } else if (response == "error0") {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "La cotización ya existe <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/cotizacionList"; // Redirigir a la vista de cotizacionList
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "No se pudo crear la cotización <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/cotizacionList"; // Redirigir a la vista de cotizacionList
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
          // Fin de la llamada AJAX
        });

        //funcion para recolectar los datos de los formularios productos y productos prima
        function recojerFormulariosAnidadosProductosYprima(callback) {
          //alamcena los datos de los formularios productos y productos prima
          let datosFormulariosProductos = {};
          let datosFormulariosProductosPrima = {};

          // Recorrer los formularios de productos
          $("[id^=formularioProdCoti]").each(function (index) {
            let datosFormulario = {};
            $(this)
              .find("input, select")
              .each(function () {
                if (this.id) {
                  datosFormulario[this.id] = $(this).val();
                }
              });
            datosFormulariosProductos["producto" + index] = datosFormulario;
          });

          // Recorrer los formularios de productos prima
          $("[id^=formularioProdMprimaCoti]").each(function (index) {
            let datosFormulario = {};
            $(this)
              .find("input, select")
              .each(function () {
                if (this.id) {
                  datosFormulario[this.id] = $(this).val();
                }
              });
            datosFormulariosProductosPrima["productoPrima" + index] =
              datosFormulario;
          });

          // Llamar al callback con los datos recolectados de ambos formularios
          if (callback && typeof callback === "function") {
            callback(datosFormulariosProductos, datosFormulariosProductosPrima);
          }
        }
        //fin agregar productos a la cotizacion
      }
    });
    //fin verificar que los campos de total cotizacion no esten vacios
  }
});

/* 
//  editar productMprima
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
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
            $("#editProductprecioMp").val(response["precioMprima"]);
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
//fin */
// eliminar Cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionList";
  if (currentPath == appPath) {
    $(".dataTableCotizaciones").on(
      "click",
      ".btnDeleteCotizacion",
      function () {
        var codCoti = $(this).attr("codCoti");
        //mensaje de confirmación para eliminar ProductosMprima
        swal
          .fire({
            title: "¿Está seguro de borrar la Cotizacion ?",
            text: "¡No podrá revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, borrar Cotizacion!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var jsonBorraCotizacion = JSON.stringify({
                codCoti: codCoti,
              });
              $.ajax({
                url: "ajax/cotizacion.ajax.php",
                method: "POST",
                data: { jsonBorraCotizacion: jsonBorraCotizacion },
                dataType: "json",
                success: function (response) {
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto",
                      "Cotizacion eliminada correctamente",
                      "success"
                    ).then(function () {
                      window.location.reload(); // Recargar la página
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "La Cotizacion no se puede eliminar",
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
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddCotizacion");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/cotizacion";
      });
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarCotizacion");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/cotizacionList";
      });
    }
  }
});
