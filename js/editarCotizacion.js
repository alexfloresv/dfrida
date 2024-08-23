//Editar Cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionListEdit";
  if (currentPath == appPath) {
    var dataOriginal = {};
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
        // Guardar los datos originales en la variable global
        dataOriginal = {
          tituloCoti: response["tituloCoti"],
          fechaCoti: response["fechaCoti"],
          razonSocialCoti: response["razonSocialCoti"],
          nombreComercialCoti: response["nombreComercialCoti"],
          rucCoti: response["rucCoti"],
          nombreCoti: response["nombreCoti"],
          celularCoti: response["celularCoti"],
          correoCoti: response["correoCoti"],
          direccionCoti: response["direccionCoti"],
          detalleCoti: response["detalleCoti"],
          totalProductsCoti: response["totalProductsCoti"],
          igvCoti: response["igvCoti"],
          subTotalCoti: response["subTotalCoti"],
          totalCoti: response["totalCoti"],
          productsCoti: response["productsCoti"],
        };
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
          if (codProdCoti === codAddIngProdModal) {
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
            title: "Producto duplicado",
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

    $("#btnCalcularTotalEdit").on("click", function () {
      // Guarda el valor de los productos y productos prima en 0 para sumar los precios
      let totalProductos = 0;
      let totalProductosPrima = 0;
      // Sumar los precios de todos los productos
      $("[id^=formularioProdCoti]").each(function () {
        const precio = parseFloat($(this).find("#precioProdCoti").val()) || 0;
        totalProductos += precio;
      });

      // Asignar el totalProducto al input de totalProdCotiEdit y actualizar el atributo 'value'
      $("#totalProdCotiEdit")
        .val(totalProductos.toFixed(2))
        .attr("value", totalProductos.toFixed(2));

      // Calcular el total general
      const totalGeneral = totalProductos;

      // Asignar el totalGeneral al input de subTotalCotizacionEdit y actualizar el atributo 'value'
      $("#subTotalCotizacionEdit")
        .val(totalGeneral.toFixed(2))
        .attr("value", totalGeneral.toFixed(2));

      // Calcular el 18% de totalGeneral para igvCotizacionEdit y actualizar el atributo 'value'
      const igvCotizacionEdit = totalGeneral * 0;
      $("#igvCotizacionEdit")
        .val(igvCotizacionEdit.toFixed(2))
        .attr("value", igvCotizacionEdit.toFixed(2));
      const totalCotizacionEdit = totalGeneral;

      // Asignar el totalCotizacion al input de totalCotizacionEdit y actualizar el atributo 'value'
      $("#totalCotizacionEdit")
        .val(totalCotizacionEdit.toFixed(2))
        .attr("value", totalCotizacionEdit.toFixed(2));
    });
    //FIN TOTALES
    // Recolectar los datos del formulario
    function recolectarDatosFormulario() {
      let datosFormulario = {};

      datosFormulario.tituloCoti = $("#tituloCotiEdit").val();
      datosFormulario.fechaCoti = $("#fechaCotiEdit").val();
      datosFormulario.razonSocialCoti = $("#razonSocialCotiEdit").val();
      datosFormulario.nombreComercialCoti = $("#nombreComercialCotiEdit").val();
      datosFormulario.rucCoti = $("#rucCotiEdit").val();
      datosFormulario.nombreCoti = $("#nombreCotiEdit").val();
      datosFormulario.celularCoti = $("#celularCotiEdit").val();
      datosFormulario.correoCoti = $("#correoCotiEdit").val();
      datosFormulario.direccionCoti = $("#direccionCotiEdit").val();
      datosFormulario.detalleCoti = $("#detalleCotiEdit").val();
      datosFormulario.totalProductsCoti = $("#totalProdCotiEdit").val();
      datosFormulario.igvCoti = $("#igvCotizacionEdit").val();
      datosFormulario.subTotalCoti = $("#subTotalCotizacionEdit").val();
      datosFormulario.totalCoti = $("#totalCotizacionEdit").val();

      datosFormulario.productsCoti = {};
      $(".AddProductoCotizacionEdit .productoRow").each(function (index) {
        let producto = {
          codProdCoti: $(this).find("#codProdCoti").val(),
          nombreProdCoti: $(this).find("#nombreProdCoti").val(),
          unidadProdCoti: $(this).find("#unidadProdCoti").val(),
          cantidadProdCoti: $(this).find("#cantidadProdCoti").val(),
          precioProdCoti: $(this).find("#precioProdCoti").val(),
        };
        datosFormulario.productsCoti[`producto${index}`] = producto;
      });

      // Validar que haya productos asignados
      if (Object.keys(datosFormulario.productsCoti).length === 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debe asignar al menos un producto a la cotización.",
        });
        return null; // Indicar que la recolección de datos falló
      }

      return datosFormulario;
    }
    // Fin

    // Función para comparar los datos del formulario con los datos originales
    function compararDatos(datosFormulario, dataOriginal) {
      let diferencias = [];

      function convertirAString(valor) {
        return valor !== null && valor !== undefined ? valor.toString() : "";
      }

      function compararValores(valor1, valor2) {
        return convertirAString(valor1) === convertirAString(valor2);
      }

      // Comparar campos de texto
      for (let key in dataOriginal) {
        if (key !== "productsCoti") {
          if (!compararValores(datosFormulario[key], dataOriginal[key])) {
            diferencias.push({
              campo: key,
              original: dataOriginal[key],
              editado: datosFormulario[key],
            });
          }
        }
      }

      // Función para comparar productos
      function compararProductos(productosForm, productosOrig, tipo) {
        if (
          Object.keys(productosForm).length !==
          Object.keys(productosOrig).length
        ) {
          diferencias.push({
            campo: tipo,
            original: Object.keys(productosOrig).length,
            editado: Object.keys(productosForm).length,
          });
        } else {
          for (let key in productosForm) {
            let productoForm = productosForm[key];
            let productoOrig = productosOrig[key];
            for (let campo in productoOrig) {
              if (!compararValores(productoForm[campo], productoOrig[campo])) {
                diferencias.push({
                  campo: `${tipo} ${key} - ${campo}`,
                  original: productoOrig[campo],
                  editado: productoForm[campo],
                });
              }
            }
          }
        }
      }

      // Convertir JSON a objetos para la comparación
      let productsCotiOriginal = JSON.parse(dataOriginal.productsCoti);

      // Comparar productos
      compararProductos(
        datosFormulario.productsCoti,
        productsCotiOriginal,
        "producto"
      );

      if (diferencias.length > 0) {
        return false; // Hay diferencias
      }

      return true; // No hay diferencias
    }

    // Modificar el evento del botón para incluir la comparación
    $("#btnEditarCotizacion").on("click", function () {
      document.getElementById("btnCalcularTotalEdit").click();

      let datosFormulario = recolectarDatosFormulario();

      if (compararDatos(datosFormulario, dataOriginal)) {
        Swal.fire({
          icon: "info",
          title: "Sin cambios",
          text: "No se han realizado cambios en la cotización.",
        });
      } else {
        // Añadir el dato de codCoti a datosFormulario
        datosFormulario.codCoti = codCoti;
        var jsonCotizacionEditar = JSON.stringify(datosFormulario);
        $.ajax({
          url: "ajax/cotizacion.ajax.php",
          method: "POST",
          data: { jsonCotizacionEditar: jsonCotizacionEditar },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "¡Cotización Actualizada!",
                text: "La cotización ha sido actualizada con éxito.",
              }).then((result) => {
                if (result.value) {
                  window.location.href = "/dfrida/cotizacionList";
                }
              });
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(
              "Error en la solicitud AJAX para editar cotización: ",
              textStatus,
              errorThrown
            );
          },
        });
      }
    });
    //fin editar
    // Boton de Cerrar Vista de Editar Cotizacion
    $("#btnCerrarEditarCotizacion").on("click", function () {
      window.location.href = "/dfrida/cotizacionList";
    });
    // Fin
    // Actualizar el precio cuando cambia la cantidad del Producto
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
    // Fin
    // Eliminar el producto
    $(document).on("click", ".deleteNuevoIngresoProd", function () {
      $(this).closest(".productoRow").remove();
    });
  }
});
// Fin
// Funcionalidad Modales
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionListEdit";
  if (currentPath == appPath) {
    // guardar los codigos de los productos agregados

    $("#modalEditProdCoti").on(
      "click",
      "#btnAgregarProductEditCotizacion",
      function () {
        // Abrir el modal
        $("#modalEditProdCoti").modal("hide");
        $("#modalAddProductoNuevoEditarCotizacion").modal("show");
      }
    );
    $("#modalAddProductoNuevoEditarCotizacion").on(
      "click",
      "#btnCerrarCreacionProductoNuevo",
      function () {
        $("#modalAddProductoNuevoEditarCotizacion").modal("hide");
        $("#modalEditProdCoti").modal("show");
      }
    );
    $("#modalEditProdCoti").on(
      "click",
      "#btnAgregarCategoriaProductEditCotizacion",
      function () {
        // Abrir el modal
        $("#modalEditProdCoti").modal("hide");
        var formulario = document.getElementById("formCrearCategoriaProd");
        formulario.reset();
        $("#modalCrearCategoriaProdEditarCotizacion").modal("show");

      }
    );
    $("#modalCrearCategoriaProdEditarCotizacion").on(
      "click",
      "#btnCerrarCrearCategoriaCotizacion",
      function () {
        $("#modalCrearCategoriaProdEditarCotizacion").modal("hide");
        $("#modalEditProdCoti").modal("show");
      }
    );
  }
});

