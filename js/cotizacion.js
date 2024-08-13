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
        /* let totalProductosPrima = 0; */
        //busca todos los formularios que comiencen con formularioProdCoti = productos
        // Sumar los precios de todos los productos
        $("[id^=formularioProdCoti]").each(function () {
          const precio = parseFloat($(this).find("#precioProdCoti").val()) || 0;
          //toma el valor del input con id precioProdCoti y lo convierte a float
          totalProductos += precio;
        });

        // Asignar el totalProducto al input de totalProdCotiAdd y actualizar el atributo 'value'
        $("#totalProdCotiAdd")
          .val(totalProductos.toFixed(2))
          .attr("value", totalProductos.toFixed(2));

        // Calcular el total general
        const totalGeneral = totalProductos;

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
        // Obtener el estado del switch
        var clienteNuevoSwitch = document.getElementById("clienteNuevoSwitch");
        var esClienteNuevo = clienteNuevoSwitch.checked;

        // Agregar el estado del switch a los datos del formulario
        datosFormulario.esClienteNuevo = esClienteNuevo;

        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearCotizacion = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS y PRODUCTOS PRIMA
        recojerFormulariosAnidadosProductosYprima(function (
          datosFormulariosProductos
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProductosCotizacion = JSON.stringify(
            datosFormulariosProductos
          );

          $.ajax({
            url: "ajax/cotizacion.ajax.php",
            method: "POST",
            // Enviar los JSON con los datos recolectados DE LOS FORMULARIOS PRINCIPAL Y PRODUCTOS Y PRODUCTOS PRIMA
            data: {
              jsonCrearCotizacion: jsonCrearCotizacion,
              jsonProductosCotizacion: jsonProductosCotizacion,
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
          confirmButtonText: "Si, Editar Cotizacion!",
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
// Insertar las opciones de los clientes en el select
//funcion para mostrar el selec2 de todos los clientes
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    // Inicializar select2 en el select deseado
    $("#idClienteAddCotizacion").select2({
      placeholder: "Seleccione un Cliente",
      allowClear: true,
    });
    // Cargar datos dinámicamente al abrir el modal
    var data = new FormData();
    data.append("todosLosClientes", true);

    $.ajax({
      url: "ajax/clients.ajax.php",
      method: "POST",
      data: data,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (data) {
        // Limpiar las opciones actuales
        $("#idClienteAddCotizacion").empty();
        // Agregar las nuevas opciones
        $.each(data, function (key, value) {
          $("#idClienteAddCotizacion").append(
            '<option value="' +
              value.idCli +
              '" data-celular="' +
              value.celularCli +
              '" data-correo="' +
              value.correoCli +
              '" data-direccion="' +
              value.direccionCli +
              '">' +
              value.nombreCli +
              "</option>"
          );
        });

        // Restaurar el valor seleccionado si existe
        var selectedCliente = $("#idClienteAddCotizacion").attr(
          "data-selected"
        );
        if (selectedCliente && selectedCliente !== "0") {
          $("#idClienteAddCotizacion").val(selectedCliente).trigger("change");
        } else {
          // Inicializar el select con la opción predeterminada
          $("#idClienteAddCotizacion").val("0").trigger("change");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error al cargar los datos:", error);
      },
    });
    // Añadir el evento change al select
    $("#idClienteAddCotizacion").on("change", function () {
      var selectedOption = $(this).find("option:selected");

      if (selectedOption && selectedOption.val() !== "0") {
        var nombreCli = selectedOption.text();
        var celularCli = selectedOption.data("celular");
        var correoCli = selectedOption.data("correo");
        var direccionCli = selectedOption.data("direccion");

        $("#nombreCotiAdd").val(nombreCli);
        $("#celularCotiAdd").val(celularCli);
        $("#correoCotiAdd").val(correoCli);
        $("#direccionCotiAdd").val(direccionCli);
        $("#detalleCotiAdd").val(""); // Dejar en blanco
      } else {
        // Limpiar los campos de texto si no hay una opción válida seleccionada
        $("#nombreCotiAdd").val("");
        $("#celularCotiAdd").val("");
        $("#correoCotiAdd").val("");
        $("#direccionCotiAdd").val("");
        $("#detalleCotiAdd").val("");
      }
    });
  }
});

// Manejo del switch para cuando es cliente nuevo o cuando ya está creado el cliente:
document.addEventListener("DOMContentLoaded", function () {
  // Verificar si la ruta es la correcta
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacion";
  if (currentPath == appPath) {
    var clienteNuevoSwitch = document.getElementById("clienteNuevoSwitch");
    var clienteNuevoSection = document.getElementById("clienteNuevoSection");
    var datosSolicitanteSection = document.getElementById(
      "datosSolicitanteSection"
    );
    var idClienteAddCotizacion = document.getElementById(
      "idClienteAddCotizacion"
    );
    var nombreCotiAdd = document.getElementById("nombreCotiAdd");
    var celularCotiAdd = document.getElementById("celularCotiAdd");
    var correoCotiAdd = document.getElementById("correoCotiAdd");
    var direccionCotiAdd = document.getElementById("direccionCotiAdd");
    var detalleCotiAdd = document.getElementById("detalleCotiAdd");

    var previousSelectedCliente = null;

    // Función para alternar la visibilidad y limpiar los campos
    function toggleVisibility() {
      if (clienteNuevoSwitch.checked) {
        clienteNuevoSection.style.display = "none";
        datosSolicitanteSection.style.display = "block";
        // Guardar el valor seleccionado antes de limpiar
        previousSelectedCliente = idClienteAddCotizacion.value;
        // Limpiar el select
        idClienteAddCotizacion.value = "";
        // Limpiar los campos de texto
        nombreCotiAdd.value = "";
        celularCotiAdd.value = "";
        correoCotiAdd.value = "";
        direccionCotiAdd.value = "";
        detalleCotiAdd.value = "";
      } else {
        clienteNuevoSection.style.display = "block";
        datosSolicitanteSection.style.display = "none";
        // Restaurar el valor seleccionado
        if (previousSelectedCliente) {
          idClienteAddCotizacion.value = previousSelectedCliente;
        } else {
          idClienteAddCotizacion.value = "0";
        }
        // Limpiar los campos de texto
        nombreCotiAdd.value = "";
        celularCotiAdd.value = "";
        correoCotiAdd.value = "";
        direccionCotiAdd.value = "";
        detalleCotiAdd.value = "";
        // Limpiar el select y mostrar el placeholder
        $(idClienteAddCotizacion).val(null).trigger("change");
      }
    }

    // Inicializar la visibilidad al cargar la página
    toggleVisibility();

    // Añadir el evento change al switch
    clienteNuevoSwitch.addEventListener("change", toggleVisibility);
  }
});
