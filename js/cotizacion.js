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
        $("#igvCotizacionAdd")
          .val(igvCotizacionAdd)
          .attr("value", igvCotizacionAdd);
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
        //console.log("Formulario válido, proceder con la acción deseada.");
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
// Fin
//editar cotizacion
// Enviar código a la vista de editar
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionList";
  if (currentPath == appPath) {
    // guardar los codigos de los productos agregados

    $(".dataTableCotizaciones").on("click", ".btnEditCotizacion", function () {
      swal
        .fire({
          title: "¡Editar la cotizacion puede generar negativos!",
          text: "¡Esta accion afectara directamente al almacen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, Editar Ingreso!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var codCoti = $(this).attr("codCoti");
            // Usar la variable directamente en la URL de redirección
            window.location.href =
              "/dfrida/cotizacionListEdit?codCoti=" + codCoti;
          }
        });
    });
  }
});
// Fin
//Editar Cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionListEdit";
  if (currentPath == appPath) {
    // Extraer el valor de 'codFichaTec' de la URL
    var codCoti = getQueryParam("codCoti");
    if (codCoti) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codCotiEditarVista").value = codCoti;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //  editar ficha tecnica
    //obtener el valor guardado en el campo oculto cuando carga la pagina
    var codCoti = document.getElementById("codCotiEditarVista").value;
    var jsonPdfCotizacion = JSON.stringify({
      codCoti: codCoti,
    });
    $.ajax({
      url: "ajax/cotizacion.ajax.php",
      method: "POST",
      data: { jsonPdfCotizacion: jsonPdfCotizacion },
      dataType: "json",
      success: function (response) {
        /* $("#codIngProd").val(response["idIngProd"]); */
        $("#tituloCotiEdit").val(response["tituloCoti"]);
        $("#fechaCotiEdit").val(response["fechaCoti"]);
        $("#razonSocialCotiEdit").val(response["razonSocialCoti"]);
        $("#nombreComercialCotiEdit").val(response["nombreComercialCoti"]);
        $("#rucCotiEdit").val(response["rucCoti"]);
        $("#nombreCotiEdit").val(response["nombreCoti"]);
        $("#celularCotiEdit").val(response["celularCoti"]);
        $("#correoCotiEdit").val(response["correoCoti"]);
        $("#direccionCotiEdit").val(response["direccionCoti"]);
        $("#detalleCotiEdit").val(response["detalleCoti"]);

        $("#totalProdCotiEdit").val(response["totalProductsCoti"]);
        $("#totalProdMprimaCotiEdit").val(response["totalProductsMprimaCoti"]);
        $("#igvCotizacionEdit").val(response["igvCoti"]);

        $("#subTotalCotizacionEdit").val(response["subTotalCoti"]);
        $("#totalCotizacionEdit").val(response["totalCoti"]);

        if (response.hasOwnProperty("productsCoti")) {
          ingresoProductoEdit(response["productsCoti"]);
        }
        if (response.hasOwnProperty("productsMprimaCoti")) {
          ingresoProductoMPrimaEdit(response["productsMprimaCoti"]);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });
    function obtenerPrecioProdUni(codProdIng) {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        data.append("codProdIng", codProdIng);
        $.ajax({
          url: "ajax/ingresoProd.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            resolve(response["precioProd"]); // Resuelve la promesa con un objeto que contiene ambos valores
          },
          error: function (jqXHR, textStatus, errorThrown) {
            reject(
              "Error en la solicitud AJAX: " + textStatus + " " + errorThrown
            ); // Rechaza la promesa si hay un error
          },
        });
      });
    }
    function obtenerPrecioProdMPrimaUni(codProdIng) {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        data.append("codProdIng", codProdIng);
        $.ajax({
          url: "ajax/ingresoMprima.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            resolve(response["precioMprima"]); // Resuelve la promesa con un objeto que contiene ambos valores
          },
          error: function (jqXHR, textStatus, errorThrown) {
            reject(
              "Error en la solicitud AJAX: " + textStatus + " " + errorThrown
            ); // Rechaza la promesa si hay un error
          },
        });
      });
    }

    // Uso de async/await en ingresoProductoEdit para esperar la respuesta de obtenerPrecioProdUni
    async function ingresoProductoEdit(ingJsonProd) {
      // Decodificar el JSON recibido de la respuesta de visualizar datos
      const procesos = JSON.parse(ingJsonProd);

      // Mostrar el modal de carga porque la promesa es asincrónica y espera la respuesta para crear el formulario
      // el usuario visualizará una demora en la carga de los datos
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se procesan los datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Recorre todos los arrays decodificados del JSON para crear un formulario por cada producto resuelto
      for (const proceso of Object.values(procesos)) {
        const {
          codProdCoti,
          nombreProdCoti,
          unidadProdCoti,
          cantidadProdCoti,
          precioProdCoti,
        } = proceso;

        // Esperar la respuesta de obtenerPrecioProdUni
        try {
          // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
          const precioProdCotiUnidad = await obtenerPrecioProdUni(codProdCoti);
          insertarFormulario(
            codProdCoti,
            nombreProdCoti,
            unidadProdCoti,
            cantidadProdCoti,
            precioProdCoti,
            precioProdCotiUnidad
          );
        } catch (error) {
          console.error(error); // Manejar el error si la promesa es rechazada
        }
      }

      // Cerrar el modal de carga una vez que se haya completado el procesamiento
      Swal.close();
    }
    // Uso de async/await en ingresoProductoEdit para esperar la respuesta de obtenerPrecioProdUni
    async function ingresoProductoMPrimaEdit(ingJsonProd) {
      // Decodificar el JSON recibido de la respuesta de visualizar datos
      const procesos = JSON.parse(ingJsonProd);

      // Mostrar el modal de carga porque la promesa es asincrónica y espera la respuesta para crear el formulario
      // el usuario visualizará una demora en la carga de los datos
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se procesan los datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Recorre todos los arrays decodificados del JSON para crear un formulario por cada producto resuelto
      for (const proceso of Object.values(procesos)) {
        const {
          codProdMprimaCoti,
          nombreProdMprimaCoti,
          unidadProdMprimaCoti,
          cantidadProdMprimaCoti,
          precioProdMprimaCoti,
        } = proceso;

        // Esperar la respuesta de obtenerPrecioProdUni
        try {
          // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
          const precioProdMprimaCotiUnidad = await obtenerPrecioProdMPrimaUni(
            codProdMprimaCoti
          );
          insertarFormularioProductoMPrima(
            codProdMprimaCoti,
            nombreProdMprimaCoti,
            unidadProdMprimaCoti,
            cantidadProdMprimaCoti,
            precioProdMprimaCoti,
            precioProdMprimaCotiUnidad
          );
        } catch (error) {
          console.error(error); // Manejar el error si la promesa es rechazada
        }
      }

      // Cerrar el modal de carga una vez que se haya completado el procesamiento
      Swal.close();
    }
    // Asegurarse de que el contador esté inicializado
    var formularioProdCotiCounter = formularioProdCotiCounter || 0;

    function insertarFormulario(
      codProdCoti,
      nombreProdCoti,
      unidadProdCoti,
      cantidadProdCoti,
      precioProdCoti,
      precioProdCotiUnidad
    ) {
      // Crear un nuevo formulario para el producto con un ID único que incrementa en 1 cada vez que se agrega un producto
      var formularioID = "formularioProdCoti" + formularioProdCotiCounter++;
      var nuevoProductoHTML = `
    <form id="${formularioID}" class="row productoRow" style="padding:5px 15px">
      <div class="col-lg-4">
        <!-- id del producto -->
        <input type="hidden" class="form-control" id="codProdCoti" value="${codProdCoti}">
        <!-- nombre del producto -->
        <input type="text" class="form-control" id="nombreProdCoti" value="${nombreProdCoti}" readonly>
      </div>
      <!-- unidad del tipo de producto -->
      <div class="col-lg-2">
        <input type="text" class="form-control" id="unidadProdCoti" value="${unidadProdCoti}" readonly>
      </div>
      <!-- cantidad editable -->
      <div class="col-lg-2">
        <input type="number" class="form-control cantidadProdCoti" id="cantidadProdCoti" value="${cantidadProdCoti}">
      </div>
      <!-- precio -->
      <div class="col-lg-2">
        <input type="text" class="form-control precioProdCoti" id="precioProdCoti" value="${precioProdCoti}" data-original-precio="${precioProdCotiUnidad}" readonly>
      </div>
      <!-- boton de eliminar -->
      <div class="col-lg-1">
        <button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="${codProdCoti}"><i class="fa fa-times"></i></button>
      </div>
    </form>`;

      // Verificar que el contenedor exista
      if ($(".AddProductoCotizacionEdit").length) {
        // Agregar el nuevo formulario al contenedor
        $(".AddProductoCotizacionEdit").append(nuevoProductoHTML);
      } else {
        console.error(
          "El contenedor .AddProductoCotizacionEdit no existe en el DOM."
        );
      }
    }
    // Agregar Productos a la cotización
    $(".dataTableProductosEditarCotizacion").on(
      "click",
      ".btnAddProdModalIngEditarCotizacion",
      function () {
        var codAddIngProdModal = $(this).attr("codAddIngProdModal");

        // Buscar en el contenedor AddProductoMprimaCotizacionEdit si ya existe un formulario con el mismo código de producto
        var productoDuplicado = false;

        $(".AddProductoCotizacionEdit .productoRow").each(function () {
          var codProdCoti = $(this).find("#codProdCoti").val();
          if (
            codProdCoti === codAddIngProdModal ||
            parseInt(codProdMprimaCoti) === parseInt(codAddIngProdModal)
          ) {
            productoDuplicado = true;
            return false; // Salir del bucle each
          }
        });

        // Verificar si el código ya ha sido agregado
        if (productoDuplicado) {
          // Cerrar el modal antes de mostrar el mensaje de SweetAlert
          $("#modalEditProdCoti").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "Producto Prima duplicado",
            text: "El producto ya está en la lista.",
          }).then((result) => {
            if (result.value) {
              // Mostrar el modal de nuevo
              $("#modalEditProdCoti").modal("show");
            }
          });
          return; // No proceder con el AJAX
        }

        var datos = new FormData();
        datos.append("codAddIngProdModal", codAddIngProdModal);
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
            var formularioID =
              "formularioProdCoti" + formularioProdCotiCounter++;
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
            $(".AddProductoCotizacionEdit").append(nuevoProductoHTML);
          },
        });
      }
    );
    // Asegurarse de que el contador esté inicializado
    var formularioProdMprimaCotiCounter = formularioProdMprimaCotiCounter || 0;

    function insertarFormularioProductoMPrima(
      codProdMprimaCoti,
      nombreProdMprimaCoti,
      unidadProdMprimaCoti,
      cantidadProdMprimaCoti,
      precioProdMprimaCoti,
      precioProdMprimaCotiUnidad
    ) {
      // Crear un nuevo formulario para el producto prima con un ID único que incrementa en 1 cada vez que se agrega un producto prima
      var formularioMprimaID =
        "formularioProdMprimaCoti" + formularioProdMprimaCotiCounter++;
      var nuevoProductoMprimaHTML =
        '<form id="' +
        formularioMprimaID +
        '" class="row productoMprimaRow" style="padding:5px 15px">' +
        '<div class="col-lg-4">' +
        /* id del producto prima */
        '<input type="hidden" class="form-control" id="codProdMprimaCoti" value="' +
        codProdMprimaCoti +
        '">' +
        /* nombre del producto prima */
        '<input type="text" class="form-control" id="nombreProdMprimaCoti" value="' +
        nombreProdMprimaCoti +
        '" readonly>' +
        "</div>" +
        /* unidad del tipo de producto prima */
        '<div class="col-lg-2">' +
        '<input type="text" class="form-control" id="unidadProdMprimaCoti" value="' +
        unidadProdMprimaCoti +
        '" readonly>' +
        "</div>" +
        /* cantidad editable inicia en 1 */
        '<div class="col-lg-2">' +
        '<input type="number" class="form-control cantidadProdMprimaCoti" id="cantidadProdMprimaCoti" value="' +
        cantidadProdMprimaCoti +
        '" min="1" step="1">' +
        "</div>" +
        /* precio prima */
        '<div class="col-lg-2">' +
        '<input type="text" class="form-control precioProdMprimaCoti" id="precioProdMprimaCoti" value="' +
        precioProdMprimaCoti +
        '" data-original-precio="' +
        precioProdMprimaCotiUnidad +
        '" readonly>' +
        "</div>" +
        /* boton de eliminar prima */
        '<div class="col-lg-1">' +
        '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProdMprima"><i class="fa fa-times"></i></button>' +
        "</div>" +
        "</form>";

      // Verificar que el contenedor exista
      if ($(".AddProductoMprimaCotizacionEdit").length) {
        // Agregar el nuevo formulario al contenedor
        $(".AddProductoMprimaCotizacionEdit").append(nuevoProductoMprimaHTML);
      } else {
        console.error(
          "El contenedor .AddProductoMprimaCotizacion no existe en el DOM."
        );
      }
    }
    // Agregar Productos a la cotización
    $(".dataTableProductosMprimaEditarCotizacion").on(
      "click",
      ".btnAddProdModalEditarPedido",
      function () {
        var codAddIngProdModal = $(this).attr("codaddingprodmodal");

        // Buscar en el contenedor AddProductoMprimaCotizacionEdit si ya existe un formulario con el mismo código de producto
        var productoDuplicado = false;

        $(".AddProductoMprimaCotizacionEdit .productoMprimaRow").each(
          function () {
            var codProdMprimaCoti = $(this).find("#codProdMprimaCoti").val();
            if (
              codProdMprimaCoti === codAddIngProdModal ||
              parseInt(codProdMprimaCoti) === parseInt(codAddIngProdModal)
            ) {
              productoDuplicado = true;
              return false; // Salir del bucle each
            }
          }
        );

        // Verificar si el código ya ha sido agregado
        if (productoDuplicado) {
          // Cerrar el modal antes de mostrar el mensaje de SweetAlert
          $("#modalEditProdMprimaCoti").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "Producto Prima duplicado",
            text: "El producto ya está en la lista.",
          }).then((result) => {
            if (result.value) {
              // Mostrar el modal de nuevo
              $("#modalEditProdMprimaCoti").modal("show");
            }
          });
          return; // No proceder con el AJAX
        }

        var datos = new FormData();
        datos.append("codAddIngProdModal", codAddIngProdModal);
        $.ajax({
          url: "ajax/ingresoMprima.ajax.php",
          method: "POST",
          data: datos,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (respuesta) {
            var idProd = respuesta["idMprima"];
            var nombreProd = respuesta["nombreMprima"];
            var unidadProd = respuesta["unidadMprima"];
            var precioProd = respuesta["precioMprima"];
            // Crear un nuevo formulario para el producto con un ID único que incrementa en 1 cada vez que se agrega un producto
            var formularioID =
              "formularioProdMprimaCoti" + formularioProdMprimaCotiCounter++;
            var nuevoProductoHTML =
              '<form id="' +
              formularioID +
              '" class="row productoMprimaRow" style="padding:5px 15px">' +
              '<div class="col-lg-4">' +
              /* id del prodcuto */
              '<input type="hidden" class="form-control" id="codProdMprimaCoti" value="' +
              idProd +
              '">' +
              /* nombre del producto */
              '<input type="text" class="form-control" id="nombreProdMprimaCoti" value="' +
              nombreProd +
              '" readonly>' +
              "</div>" +
              /* unidad del tipo de producto */
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control" id="unidadProdMprimaCoti"value="' +
              unidadProd +
              '" readonly>' +
              "</div>" +
              /* cantidad editable inicia en 1 */
              '<div class="col-lg-2">' +
              '<input type="number" class="form-control cantidadProdMprimaCoti" id="cantidadProdMprimaCoti" value="1" min="1" step="1">' +
              "</div>" +
              /* precio */
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control precioProdMprimaCoti" id="precioProdMprimaCoti" value="' +
              precioProd +
              '" data-original-precio="' +
              precioProd +
              '" readonly>' +
              "</div>" +
              /* boton de eliminar */
              '<div class="col-lg-1">' +
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="' +
              idProd +
              '" ><i class="fa fa-times"></i></button>' +
              "</div>" +
              "</form>";

            // Agregar el nuevo formulario al contenedor
            $(".AddProductoMprimaCotizacionEdit").append(nuevoProductoHTML);
          },
        });
      }
    );
    //enviar formulario al servidor para editar
    $("#btnEditarIngresoProd").on("click", function () {
      //totales estén actualizados si el usuario no lo hizo
      document.getElementById("btnCalcularTotalIng").click();
      //obtener el formulario por id

      var formulario = document.getElementById("formIngresoProdEdit");
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
      var jsonEditarIngProd = JSON.stringify(datosFormulario);

      // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
      recojerFormulariosAnidadosIngProdEdit(function (datosFormulariosIngProd) {
        // Crear un JSON con los datos recolectados de los formularios anidados
        var jsonEditarIngProductosForms = JSON.stringify(
          datosFormulariosIngProd
        );

        $.ajax({
          url: "ajax/ingresoProd.ajax.php",
          method: "POST",
          data: {
            jsonEditarIngProd: jsonEditarIngProd,
            jsonEditarIngProductosForms: jsonEditarIngProductosForms,
          },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Ingreso Producto Editado Correctamente",
              }).then(function () {
                window.location.href = "/dfrida/ingresoList";
              });
            } else {
              Swal.fire(
                "Error",
                "Nesesita permisos de administrador para realizar esta acción",
                "error"
              ).then(function () {});
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
      //fin editar
      //recojer todos los formularios anidados que son los productos  y asignarle un nombre++ que es un json con sus datos recoje todos los productos = fromularios
      function recojerFormulariosAnidadosIngProdEdit(callback) {
        let datosFormulariosIngProd = {};

        $("[id^=formularioIngProd]").each(function (index) {
          let datosFormulario = {};
          $(this)
            .find("input, select")
            .each(function () {
              if (this.id) {
                datosFormulario[this.id] = $(this).val();
              }
            });
          datosFormulariosIngProd["producto" + index] = datosFormulario;
        });

        // Llamar al callback con los datos recolectados
        if (callback && typeof callback === "function") {
          callback(datosFormulariosIngProd);
        }
      }
      //fin
    });
    $("#btnCerrarEditarCotizacion").on("click", function () {
      window.location.href = "/dfrida/cotizacionList";
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
    // Actualizar el precio cuando cambia la cantidad
    $(document).on("input", ".cantidadProdMprimaCoti", function () {
      var count = $(this).val();
      var precioPerUnit = $(this)
        .closest(".productoMprimaRow")
        .find(".precioProdMprimaCoti")
        .data("original-precio");
      // Si el valor del input es vacío o 0, el precio final es 0
      var precioFinal =
        count === "" || parseInt(count) === 0
          ? "0"
          : (count * precioPerUnit).toFixed(2);

      // Actualizar el valor interno y el atributo 'value' en el HTML
      $(this).val(count);
      $(this).attr("value", count); // Actualiza el atributo 'value' en el HTML para la cantidad
      $(this)
        .closest(".productoMprimaRow")
        .find(".precioProdMprimaCoti")
        .val(precioFinal) // Actualiza el valor interno para el precio
        .attr("value", precioFinal); // Actualiza el atributo 'value' en el HTML para el precio
    });
  }
});
// Fin
