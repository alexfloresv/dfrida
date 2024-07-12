//agrergar productos a la cotizacion
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    //funcion para agregar productos a la cotizacion
    // Definir un contador global para los IDs de formulario
    var formularioIngProdCounter = 1;

    $(".dataTableProductos").on("click", ".btnAddProdModalIng", function () {
      var codAddIngProdModal = $(this).attr("codAddIngProdModal");

      var datos = new FormData();
      datos.append("codAddIngProdModal", codAddIngProdModal);
      $.ajax({
        url: "ajax/ingresoProd.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (respuesta) {
          var idProd = respuesta["idProd"];
          var nombreProd = respuesta["nombreProd"];
          var codigoProd = respuesta["codigoProd"];
          var unidadProd = respuesta["unidadProd"];
          var precioProd = respuesta["precioProd"];

          // Crear un nuevo formulario para el producto con un ID único que incrementa en 1 cada vez que se agrega un producto
          var formularioID = "formularioIngProd" + formularioIngProdCounter++;
          var nuevoProductoHTML =
            '<form id="' +
            formularioID +
            '" class="row productoRow" style="padding:5px 15px">' +
            '<div class="col-lg-2">' +
            /* id del prodcuto */
            '<input type="hidden" class="form-control" id="codProdIng" value="' +
            idProd +
            '">' +
            /* nombre del producto */
            '<input type="text" class="form-control" id="nombreProdIng" value="' +
            nombreProd +
            '" readonly>' +
            "</div>" +
            /* codigo del producto */
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control" id="codigoProdIng" value="' +
            codigoProd +
            '" readonly>' +
            "</div>" +
            /* unidad del tipo de producto */
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control" id="unidadProdIng"value="' +
            unidadProd +
            '" readonly>' +
            "</div>" +
            /* cantidad editable inicia en 1 */
            '<div class="col-lg-2">' +
            '<input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="1" min="1" step="1">' +
            "</div>" +
            /* precio */
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control precioProdIng" id="precioProdIng" value="' +
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
    $(document).on("input", ".cantidadProdIng", function () {
      var count = $(this).val();
      var precioPerUnit = $(this)
        .closest(".productoRow")
        .find(".precioProdIng")
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
        .find(".precioProdIng")
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

// TOTALES DE LA COTIZACION
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    //funcion para calcular los totales de la cotizacion
    $(document).ready(function () {
      function calcularTotalCotizacion() {
        //guarda el valor de los productos y productos prima en 0 para  sumar los precios
        let totalProductos = 0;

        //busca todos los formularios que comiencen con formularioIngProd = productos
        // Sumar los precios de todos los productos
        $("[id^=formularioIngProd]").each(function () {
          const precio = parseFloat($(this).find("#precioProdIng").val()) || 0;
          //toma el valor del input con id precioProdIng y lo convierte a float
          totalProductos += precio;
        });

        // Asignar el totalProducto al input de totalIngProdAddList y actualizar el atributo 'value'
        $("#totalIngProdAddList")
          .val(totalProductos.toFixed(2))
          .attr("value", totalProductos.toFixed(2));

        // Calcular el total general
        const totalGeneral = totalProductos;

        // Asignar el totalGeneral al input de subTotalIngProdAdd y actualizar el atributo 'value'
        $("#subTotalIngProdAdd")
          .val(totalGeneral.toFixed(2))
          .attr("value", totalGeneral.toFixed(2));

        // Asignar un valor estático de 0 a igvIngProdAdd y actualizar el atributo 'value'
        $("#igvIngProdAdd").val(0).attr("value", 0);

        // Calcular el totalCotizacion como la suma de totalGeneral + igvIngProdAdd
        const igvIngProdAdd = parseFloat($("#igvIngProdAdd").val()) || 0;
        const totalIngProdAdd = totalGeneral + igvIngProdAdd;

        // Asignar el totalCotizacion al input de totalCotizacion y actualizar el atributo 'value'
        $("#totalIngProdAdd")
          .val(totalIngProdAdd.toFixed(2))
          .attr("value", totalIngProdAdd.toFixed(2));
      }

      //botón para calcular el total
      $("#btnCalcularTotalIng").click(function () {
        calcularTotalCotizacion();
      });
    });
    //fin vericar ruta
  }
});
//FIN TOTALES

//  crear ingreso productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    //escuchar el evento click en el boton registrar cotizacion
    const btnRegistrar = document.getElementById("btnRegistrarIngresoProd");
    btnRegistrar.addEventListener("click", function () {
      let camposRequeridos = [
        { id: "tituloIngProdAdd", nombre: "Titulo cotizacion" },
        { id: "fechaIngProdAdd", nombre: "Fecha cotizacion" },
        { id: "subTotalIngProdAdd", nombre: "Sub Total Cotización" },
        { id: "totalIngProdAdd", nombre: "Total Producto" },
      ];
      let formularioValido = true;
      //verificar que los campos de total cotizacion no esten vacios
      camposRequeridos.forEach(function (campo) {
        let input = document.getElementById(campo.id);
        if (!input.value || parseFloat(input.value) === 0) {
          formularioValido = false;
          input.classList.add("is-invalid");

          Swal.fire({
            icon: "error",
            title: "Campo Requerido",
            html: `Complete el campo <b>${campo.nombre}</b> verifique que los <b>Totales</b> no sean <b>0</b> oprima en el botón <b>Calcular</b>.`,
          });
          return;
        } else {
          input.classList.remove("is-invalid"); // Remueve la clase de error si el campo está lleno y no es 0
        }
      });

      if (!formularioValido) {
        // Si el formulario no es válido, se detiene aquí. El mensaje ya fue mostrado por SweetAlert2.
        return;
        // Si el formulario es válido, se procede con la CREACION
      } else {
        // Aquí puedes añadir la lógica para enviar el formulario manualmente o cualquier otra acción
        console.log("Formulario válido, proceder con la acción deseada.");
        // Simula la pulsación del botón "btnCalcularTotalIng" para asegurar que los totales estén actualizados si el usuario no lo hizo
        document.getElementById("btnCalcularTotalIng").click();
        /* fin click calcular total */
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formIngresoProd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearIngProd = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
        recojerFormulariosAnidadosIngProductos(function (
          datosFormulariosProductos
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProductosIngProd = JSON.stringify(datosFormulariosProductos);

          $.ajax({
            url: "ajax/ingresoProd.ajax.php",
            method: "POST",
            data: {
              jsonCrearIngProd: jsonCrearIngProd,
              jsonProductosIngProd: jsonProductosIngProd,
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
                  html: "Ingreso de productos a Almacen ingresados Correctamente<br> <strong>¿Desea Crear Otra?</strong> ",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/ingresoList"; // Redirigir a la 
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
                    window.location.href = "/dfrida/ingresoList"; // Redirigir a la 
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
                    window.location.href = "/dfrida/ingresoList"; // Redirigir a la vista de cotizacionList
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
        function recojerFormulariosAnidadosIngProductos(callback) {
          //alamcena los datos de los formularios productos y productos prima
          let datosFormulariosProductos = {};

          // Recorrer los formularios de productos
          $("[id^=formularioIngProd]").each(function (index) {
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

          // Llamar al callback con los datos recolectados de ambos formularios
          if (callback && typeof callback === "function") {
            callback(datosFormulariosProductos);
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

//vista de agregar productos a los ingresos de productos a el almacen
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddIngresoProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/ingresoProd";
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarIngresoProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/ingresoList";
      });
    }
  }
});
