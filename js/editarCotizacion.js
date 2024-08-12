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
          totalProductsMprimaCoti: response["totalProductsMprimaCoti"],
          igvCoti: response["igvCoti"],
          subTotalCoti: response["subTotalCoti"],
          totalCoti: response["totalCoti"],
          productsCoti: response["productsCoti"],
          productsMprimaCoti: response["productsMprimaCoti"],
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
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProdMprima" value="' +
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
    // Fin

    $("#btnCalcularTotalEdit").on("click", function () {
      // Guarda el valor de los productos y productos prima en 0 para sumar los precios
      let totalProductos = 0;
      let totalProductosPrima = 0;
      // Sumar los precios de todos los productos
      $("[id^=formularioProdCoti]").each(function () {
        const precio = parseFloat($(this).find("#precioProdCoti").val()) || 0;
        totalProductos += precio;
      });
      // Sumar los precios de todos los productos prima
      $("[id^=formularioProdMprimaCoti]").each(function () {
        const precio =
          parseFloat($(this).find("#precioProdMprimaCoti").val()) || 0;
        totalProductosPrima += precio;
      });

      // Asignar el totalProducto al input de totalProdCotiEdit y actualizar el atributo 'value'
      $("#totalProdCotiEdit")
        .val(totalProductos.toFixed(2))
        .attr("value", totalProductos.toFixed(2));

      // Asignar el totalProductoMprima al input de totalProdMprimaCotiEdit y actualizar el atributo 'value'
      $("#totalProdMprimaCotiEdit")
        .val(totalProductosPrima.toFixed(2))
        .attr("value", totalProductosPrima.toFixed(2));

      // Calcular el total general
      const totalGeneral = totalProductos + totalProductosPrima;

      // Asignar el totalGeneral al input de subTotalCotizacionEdit y actualizar el atributo 'value'
      $("#subTotalCotizacionEdit")
        .val(totalGeneral.toFixed(2))
        .attr("value", totalGeneral.toFixed(2));

      // Calcular el 18% de totalGeneral para igvCotizacionEdit y actualizar el atributo 'value'
      const igvCotizacionEdit = totalGeneral * 0.18;
      $("#igvCotizacionEdit")
        .val(igvCotizacionEdit.toFixed(2))
        .attr("value", igvCotizacionEdit.toFixed(2));
      const totalCotizacionEdit = totalGeneral + igvCotizacionEdit;

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
      datosFormulario.totalProductsMprimaCoti = $(
        "#totalProdMprimaCotiEdit"
      ).val();
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

      datosFormulario.productsMprimaCoti = {};
      $(".AddProductoMprimaCotizacionEdit .productoMprimaRow").each(function (
        index
      ) {
        let productoMprima = {
          codProdMprimaCoti: $(this).find("#codProdMprimaCoti").val(),
          nombreProdMprimaCoti: $(this).find("#nombreProdMprimaCoti").val(),
          unidadProdMprimaCoti: $(this).find("#unidadProdMprimaCoti").val(),
          cantidadProdMprimaCoti: $(this).find("#cantidadProdMprimaCoti").val(),
          precioProdMprimaCoti: $(this).find("#precioProdMprimaCoti").val(),
        };
        datosFormulario.productsMprimaCoti[`productoPrima${index}`] =
          productoMprima;
      });

      // Validar que haya productos asignados
      if (
        Object.keys(datosFormulario.productsCoti).length === 0 ||
        Object.keys(datosFormulario.productsMprimaCoti).length === 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debe asignar al menos un producto y una materia prima a la cotización.",
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
        if (key !== "productsCoti" && key !== "productsMprimaCoti") {
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
      let productsMprimaCotiOriginal = JSON.parse(
        dataOriginal.productsMprimaCoti
      );

      // Comparar productos
      compararProductos(
        datosFormulario.productsCoti,
        productsCotiOriginal,
        "producto"
      );

      // Comparar productos de materia prima
      compararProductos(
        datosFormulario.productsMprimaCoti,
        productsMprimaCotiOriginal,
        "productoMprima"
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
    // Actualizar el precio cuando cambia la cantidad del Producto Prima
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
    // Fin
    // Eliminar el producto
    $(document).on("click", ".deleteNuevoIngresoProd", function () {
      $(this).closest(".productoRow").remove();
    });
    // Eliminar el producto prima
    $(document).on("click", ".deleteNuevoIngresoProdMprima", function () {
      $(this).closest(".productoMprimaRow").remove();
    });
  }
});
// Fin
