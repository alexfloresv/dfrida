//agregar productos a ingreso productos****
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    // Definir un contador global para los IDs de formulario no taocar
    var formularioIngProdCounter = 1;

    // variable global guardar los codigos de los productos agregados no tocar
    window.codigosProductosAgregados = new Set();
    //console.log(window.codigosProductosAgregados); // Mostrar el estado actual
    // Variable global acumulativa para almacenar datos del formulario, idProd y cantidad para validar cantidad maxima en almacen no tocar
    window.datosFormularios = [];
    //onsole.log(datosFormularios);

    $(".dataTableProductosSalidaAlmacen").on(
      "click",
      ".btnAddProdModalSal",
      function () {
        var codAddSalProdModal = $(this).attr("codAddSalProdModal");
        // Primero, verificar si el string es vacío antes de cualquier conversión
        if (codAddSalProdModal.trim() === "") {
          return; // No proceder con el resto de la función si el string es vacío
        }
        // Convertir el código a entero antes de verificar y agregar
        var codAddSalProdModal = parseInt(codAddSalProdModal, 10);

        // Validar que el código no sea NaN, cero, o el string no sea vacío
        if (
          isNaN(codAddSalProdModal) ||
          codAddSalProdModal === 0
          //codAddSalProdModal.trim() === ""
        ) {
          return; // No proceder con el resto de la función
        }

        // Verificar si el código ya ha sido agregado
        if (window.codigosProductosAgregados.has(codAddSalProdModal)) {
          // Cerrar el modal antes de mostrar el mensaje de SweetAlert
          $("#modalAddProdSali").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "Producto duplicado",
            text: "El producto ya está en la lista.",
          }).then((result) => {
            if (result.value) {
              // Mostrar el modal de nuevo
              $("#modalAddProdSali").modal("show");
            }
          });
          return; // No proceder con el AJAX
        }

        // Agregar el código al conjunto de productos agregados como entero
        window.codigosProductosAgregados.add(codAddSalProdModal);
        //console.log(window.codigosProductosAgregados); // Mostrar el estado actual

        var datos = new FormData();
        datos.append("codAddSalProdModal", codAddSalProdModal);
        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: datos,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (respuesta) {
            var idProd = respuesta["idProd"];
            var nombreProd = respuesta["nombreProdAlma"];
            var codigoProd = respuesta["codigoProdAlma"];
            var unidadProd = respuesta["unidadProdAlma"];
            var precioProd = respuesta["precioProd"];
            //cantidad
            var cantidadProd = respuesta["cantidadProdAlma"];

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
              '<input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="1" min="1" step="1" data-original-idProd="' +
              idProd +
              '">' +
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
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" id="deleteNuevoIngresoProd" value="' +
              idProd +
              '"><i class="fa fa-times"></i></button>' +
              "</div>" +
              "</form>";

            // Agregar el nuevo formulario al contenedor
            $(".AddProductoSalida").append(nuevoProductoHTML);

            //agregar la cantidad a la variable gloval contadora
            var nuevoDatoFormulario = [formularioID, idProd, cantidadProd];
            window.datosFormularios.push(nuevoDatoFormulario);
            //console.log(datosFormularios);
          },
        });
      }
    );

    // funcion para actualizar el precio y validar la cantidad y mostrar la cantidad maxima en almacen
    $(document).on(
      "input",
      ".cantidadProdIng",
      actualizarPrecioYValidarCantidad
    );

    // Eliminar el producto
    $(document).on("click", ".deleteNuevoIngresoProd", function (e) {
      // Paso 1: Capturar el valor del botón presionado y convertirlo a número entero
      var valorBoton = parseInt($(this).val(), 10);
      //console.log("Valor del botón presionado:", valorBoton);
      // Paso 2: Copiar los datos de la variable global a una nueva
      var datosTemporales = new Set(codigosProductosAgregados);
      // Paso 3: Buscar y eliminar el valor del botón en la nueva variable
      if (datosTemporales.has(valorBoton)) {
        datosTemporales.delete(valorBoton);
      } else {
        //console.log("El valor no se encontró en la variable global.");
      }
      // Paso 4: Limpiar la variable global
      codigosProductosAgregados.clear();
      // Paso 5: Actualizar la variable global con los nuevos datos
      datosTemporales.forEach((valor) => {
        codigosProductosAgregados.add(valor);
      });
      // Eliminar el formulario del producto del DOM
      $(this).closest(".productoRow").remove();
    });
    //fin agregar productos
    ///fin vericar ruta
  }
});
//fin agreagr productos
// TOTALES
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    //funcion para calcular los totales
    $(document).ready(function () {
      function calcularTotalSalida() {
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
        //const igvIngProdAdd = parseFloat($("#igvIngProdAdd").val()) || 0;

        // Calcular el 18% de totalGeneral para igvIngProdAdd y actualizar el atributo 'value'
        const igvIngProdAdd = totalGeneral * 0.18;
        $("#igvIngProdAdd").val(igvIngProdAdd).attr("value", igvIngProdAdd);

        const totalIngProdAdd = totalGeneral + igvIngProdAdd;

        // Asignar el totalCotizacion al input de totalCotizacion y actualizar el atributo 'value'
        $("#totalIngProdAdd")
          .val(totalIngProdAdd.toFixed(2))
          .attr("value", totalIngProdAdd.toFixed(2));
      }

      //botón para calcular el total
      $("#btnCalcularTotalIng").click(function () {
        calcularTotalSalida();
      });
    });
    //fin vericar ruta
  }
});
//FIN TOTALES

// agregar y crear Salida
document.addEventListener("DOMContentLoaded", function () {
  // Si la ruta no es la correcta, no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    // Escuchar el evento click en el botón registrar salida de productos
    const btnRegistrar = document.getElementById("btnRegistrarSalidaProd");
    btnRegistrar.addEventListener("click", function () {
      let camposRequeridos = [
        { id: "tituloSalProdAdd", nombre: "Titulo de la Salida" },
        { id: "fechaSalProdAdd", nombre: "Fecha de la Salida" },
        { id: "subTotalIngProdAdd", nombre: "Sub Total" },
        { id: "totalIngProdAdd", nombre: "Total" },
      ];

      // Verificar si el botón de "Agregar Productos del Pedido" está bloqueado
      const btnPedidoProductoAdd = document.getElementById(
        "btnPedidoProductoAdd"
      );
      const clienteSelect = document.getElementById("clienteSelectProductoAdd");
      const selectPedido = document.getElementById("pedidoSalProductsAdd");

      let clienteSeleccionado = false;
      let pedidoSeleccionado = false;

      // Validar si el botón de pedido está bloqueado y si se ha seleccionado un pedido
      if (btnPedidoProductoAdd && btnPedidoProductoAdd.disabled) {
        pedidoSeleccionado = true;
      } else if (selectPedido && selectPedido.value !== "0") {
        pedidoSeleccionado = true;
      }

      // Validar si se ha seleccionado un cliente cuando el pedido no está seleccionado
      if (clienteSelect && clienteSelect.value !== "0") {
        clienteSeleccionado = true;
      }

      // Verificar si al menos un pedido o un cliente ha sido seleccionado
      if (!clienteSeleccionado && !pedidoSeleccionado) {
        Swal.fire({
          icon: "error",
          title: "Falta Información",
          text: "Debe seleccionar un pedido o un cliente antes de continuar.",
        });
        return; // Detener la ejecución si no hay un cliente o pedido seleccionado
      }

      let formularioValido = true;

      // Verificar que los campos requeridos no estén vacíos
      camposRequeridos.forEach(function (campo) {
        let input = document.getElementById(campo.id);
        if (!input.value || parseFloat(input.value) === 0) {
          formularioValido = false;
          input.classList.add("is-invalid");

          Swal.fire({
            icon: "error",
            title: "Campo Requerido",
            html: `Complete el campo <b>${campo.nombre}</b> y verifique que los <b>Totales</b> no sean <b>0</b>. Oprima el botón <b>Calcular</b> si es necesario.`,
          });
          return;
        } else {
          input.classList.remove("is-invalid"); // Remueve la clase de error si el campo está lleno y no es 0
        }
      });

      // Si el formulario no es válido, detener el proceso
      if (!formularioValido) {
        return;
      }

      // Simula la pulsación del botón "btnCalcularTotalIng" para asegurar que los totales estén actualizados si el usuario no lo hizo
      document.getElementById("btnCalcularTotalIng").click();
      /* fin click calcular total */

      // Recolectar los datos del formulario principal
      var formulario = document.getElementById("formSalidaProd");

      var datosFormulario = {};
      var elementosFormulario = formulario.querySelectorAll("input, select");
      elementosFormulario.forEach(function (elemento) {
        if (elemento.id) {
          datosFormulario[elemento.id] = elemento.value;
        }
      });

      // Buscar todas las cabeceras de pedidos
      const cabecerasPedidos = document.querySelectorAll(
        '[id^="cabezeraPedido"]'
      );

      // Verificar si existen cabeceras de pedidos
      if (cabecerasPedidos.length > 0) {
        // Array para almacenar los IDs de las cabeceras de pedidos
        let idsPedidos = [];

        // Recorrer las cabeceras y extraer los IDs
        cabecerasPedidos.forEach((cabecera) => {
          const id = cabecera.id.replace("cabezeraPedido", "");
          idsPedidos.push(id);
        });

        // Guardar los IDs de las cabeceras de pedidos en datosFormulario
        datosFormulario["pedidoSalProdAdd"] = idsPedidos;
      }

      // Crear un JSON con los datos recolectados del formulario principal
      var jsonCrearSalidaProd = JSON.stringify(datosFormulario);

      // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
      recojerFormulariosAnidadosIngProductos(function (
        datosFormulariosProductos
      ) {
        // Crear un JSON con los datos recolectados de los formularios anidados
        var jsonProductosSalidaProd = JSON.stringify(datosFormulariosProductos);

        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: {
            jsonCrearSalidaProd: jsonCrearSalidaProd,
            jsonProductosSalidaProd: jsonProductosSalidaProd,
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
                html: "Retiro de productos de Almacén correctamente realizado.<br> <strong>¿Desea crear otro retiro?</strong>",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                  window.location.reload(); // Recargar la página
                } else {
                  window.location.href = "/dfrida/salidaList"; // Redirigir a la lista de salidas
                }
              });
            } else if (response == "errorSalAlmacen") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "Un producto que se intenta retirar tiene cantidades negativas o está en 0 en el Almacén. <strong>¿Desea verificar el Almacén?</strong>",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  window.location.href = "/dfrida/almacenProductos"; // Redirigir a la vista del almacén
                } else {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                  //window.location.reload(); // Recargar la página
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear el registro de salida. <strong>¿Desea intentar de nuevo?</strong>",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL(); // Llamar a la función para limpiar la URL
                  window.location.reload(); // Recargar la página
                } else {
                  window.location.href = "/dfrida/salidaList"; // Redirigir a la lista de salidas
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

      // Función para recolectar los datos de los formularios productos y productos prima
      function recojerFormulariosAnidadosIngProductos(callback) {
        // Almacena los datos de los formularios productos y productos prima
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
      // Fin agregar productos
    });
    // Fin verificar que los campos
  }
});

//fin agregar y crear Salida****

//****funciones para editar producto ////
//agrergar productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProdEdit";
  if (currentPath == appPath) {
    // Definir un contador global para los IDs de formulario no tocar
    var formularioIngProdCounter = 1;

    // guardar los codigos de los productos agregados no tocar
    window.codigosProductosAgregados = new Set();
    //console.log(window.codigosProductosAgregados);
    // Variable global acumulativa para almacenar datos del formulario, idProd y cantidad para validar cantidad maxima en almacen no tocar
    window.datosFormularios = [];
    //console.log(datosFormularios);

    //agregar producto de modal a formulario
    $(".dataTableProductosSalidaAlmacen").on(
      "click",
      ".btnAddProdModalSal",
      function () {
        var codAddSalProdModal = $(this).attr("codAddSalProdModal");

        // Primero, verificar si el string es vacío antes de cualquier conversión
        if (codAddSalProdModal.trim() === "") {
          return; // No proceder con el resto de la función si el string es vacío
        }
        // Convertir el código a entero antes de verificar y agregar
        var codAddSalProdModal = parseInt(codAddSalProdModal, 10);
        // Validar que el código no sea NaN, cero, o el string no sea vacío
        if (
          isNaN(codAddSalProdModal) ||
          codAddSalProdModal === 0
          //codAddSalProdModal.trim() === ""
        ) {
          return; // No proceder con el resto de la función
        }
        //console.log(window.codigosProductosAgregados); // Mostrar el estado actual
        // Verificar si el código ya ha sido agregado
        if (window.codigosProductosAgregados.has(codAddSalProdModal)) {
          // Cerrar el modal antes de mostrar el mensaje de SweetAlert
          $("#modalAddProdSali").modal("hide");
          Swal.fire({
            icon: "warning",
            title: "Producto duplicado",
            text: "El producto ya está en la lista.",
          }).then((result) => {
            if (result.value) {
              // Mostrar el modal de nuevo
              $("#modalAddProdSali").modal("show");
            }
          });
          return; // No proceder con el AJAX
        }

        // Agregar el código al conjunto de productos agregados como entero
        window.codigosProductosAgregados.add(codAddSalProdModal);
        // console.log(window.codigosProductosAgregados); // Mostrar el estado actual

        var datos = new FormData();
        datos.append("codAddSalProdModal", codAddSalProdModal);
        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: datos,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (respuesta) {
            var idProd = respuesta["idProd"];
            var nombreProd = respuesta["nombreProdAlma"];
            var codigoProd = respuesta["codigoProdAlma"];
            var unidadProd = respuesta["unidadProdAlma"];
            var precioProd = respuesta["precioProd"];
            //cantidad
            var cantidadProd = respuesta["cantidadProdAlma"];

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
              '<input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="1" min="1" step="1" data-original-idProd="' +
              idProd +
              '">' +
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
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" id="deleteNuevoIngresoProd" value="' +
              idProd +
              '"><i class="fa fa-times"></i></button>' +
              "</div>" +
              "</form>";

            // Agregar el nuevo formulario al contenedor
            $(".AddProductoSalida").append(nuevoProductoHTML);

            //agregar la cantidad a la variable gloval contadora
            var nuevoDatoFormulario = [formularioID, idProd, cantidadProd];
            window.datosFormularios.push(nuevoDatoFormulario);
            //console.log(datosFormularios);
          },
        });
      }
    );

    // verificar la cantidad de productos en almacen y actualizar el precio al maximo de almacen
    $(document).on(
      "input",
      ".cantidadProdIng",
      actualizarPrecioYValidarCantidad
    );

    // Eliminar el producto y eliminarlo de la variable global para volver a ingresarlo
    $(document).on("click", ".deleteNuevoIngresoProd", function (e) {
      // Paso 1: Capturar el valor del botón presionado y convertirlo a número entero
      var valorBoton = parseInt($(this).val(), 10);
      //console.log("Valor del botón presionado:", valorBoton);
      // Paso 2: Copiar los datos de la variable global a una nueva variable (manteniendo el formato de Set)
      var datosTemporales = new Set(codigosProductosAgregados);

      // Paso 3: Buscar y eliminar el valor del botón en la nueva variable
      if (datosTemporales.has(valorBoton)) {
        datosTemporales.delete(valorBoton);
      } else {
        //console.log("El valor no se encontró en la variable global.");
      }
      // Paso 4: Limpiar la variable global
      codigosProductosAgregados.clear();
      // Paso 5: Actualizar la variable global con los nuevos datos
      datosTemporales.forEach((valor) => {
        codigosProductosAgregados.add(valor);
      });
      // Eliminar el formulario del producto del DOM que asu ves el array contenedor del id del producto recojido del btoon
      $(this).closest(".productoRow").remove();
    });
    //fin agregar productos
    //fin vericar ruta
  }
});
//fin agreagr productos

//*****funcion para validad cantidades de alamacen y actualizar precio y mostrar mensaje de cantidad maxima
// Actualizar el precio cuando cambia la cantidad y valida y muestra la cantidad maxiama en // Definir la función globalmente
function actualizarPrecioYValidarCantidad(event) {
  var input = $(event.target);
  var count = input.val();
  var idProd = input.data("original-idprod");
  var precioPerUnit = input
    .closest(".productoRow")
    .find(".precioProdIng")
    .data("original-precio");

  // Lógica para calcular el precio final
  var precioFinal = "0";
  if (count !== "" && parseInt(count) !== 0) {
    precioFinal = (count * precioPerUnit).toFixed(2);
  }

  // Verificar si el campo tiene exactamente 0 y mostrar alerta
  if (count === "0") {
    Swal.fire({
      icon: "warning",
      title: "Cantidad Inválida",
      html: "La cantidad no puede ser 0.",
    }).then((result) => {
      if (result.value) {
        count = 1;
        precioFinal = (count * precioPerUnit).toFixed(2);
        input.val(count).attr("value", count);
        input
          .closest(".productoRow")
          .find(".precioProdIng")
          .val(precioFinal)
          .attr("value", precioFinal);
      }
    });
    return; // Salir de la función para evitar continuar con la lógica
  }

  // Actualizar el valor interno y el atributo 'value' en el HTML
  input.val(count).attr("value", count);
  input
    .closest(".productoRow")
    .find(".precioProdIng")
    .val(precioFinal)
    .attr("value", precioFinal);

  // Lógica para mostrar el mensaje basado en la cantidad
  var formularioID = "";
  var cantidadInicial = 0;
  window.datosFormularios.forEach(function (item) {
    //console.log(item);
    if (item[1] === idProd) {
      formularioID = item[0];
      cantidadInicial = item[2];
    }
  });

  if (formularioID && parseInt(count) > cantidadInicial) {
    Swal.fire({
      icon: "info",
      title: "Cantidad Excedente",
      html: "La cantidad máxima en almacén es <b>" + cantidadInicial + "</b>.",
    }).then((result) => {
      if (result.value) {
        input.val(cantidadInicial).attr("value", cantidadInicial);
        var precioFinalMax = (cantidadInicial * precioPerUnit).toFixed(2);
        input
          .closest(".productoRow")
          .find(".precioProdIng")
          .val(precioFinalMax)
          .attr("value", precioFinalMax);
      }
    });
  }
}
//***fin validar cantidad y actualizar precio */

// TOTALES
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProdEdit";
  if (currentPath == appPath) {
    //funcion para calcular los totales
    $(document).ready(function () {
      function calcularTotalSalida() {
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
        // Calcular el total como la suma de totalGeneral + igvIngProdAdd
        //const igvIngProdAdd = parseFloat($("#igvIngProdAdd").val()) || 0;

        // Calcular el 18% de totalGeneral para igvIngProdAdd y actualizar el atributo 'value'
        const igvIngProdAdd = totalGeneral * 0.18;
        $("#igvIngProdAdd").val(igvIngProdAdd).attr("value", igvIngProdAdd);

        const totalIngProdAdd = totalGeneral + igvIngProdAdd;

        // Asignar el total al input de total y actualizar el atributo 'value'
        $("#totalIngProdAdd")
          .val(totalIngProdAdd.toFixed(2))
          .attr("value", totalIngProdAdd.toFixed(2));
      }

      //botón para calcular el total
      $("#btnCalcularTotalIng").click(function () {
        calcularTotalSalida();
      });
    });
    //fin vericar ruta
  }
});
//FIN TOTALES
////

//editar ingreso productos
// Enviar código a la vista de editar tomadnodlo el valor del boton
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    $(".dataTableSalidasProd").on("click", ".btnEditarSalProd", function () {
      swal
        .fire({
          title: "¡Editar la Salida Puede generar negativos y exedentes!",
          text: "¡Esta accion afectara directamente al almacen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, Editar Salida!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var codSalProd = $(this).attr("codSalProd");
            // Usar la variable directamente en la URL de redirección
            window.location.href =
              "/dfrida/salidaProdEdit?codSalProd=" + codSalProd;
          }
        });
    });
  }
});
// Fin

//tomar el valor de la url y asignarlo al campo oculto
function getQueryParam(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//variable gloval para contar los formularios  de edit a agregar los que llegan de respeusta ajax visualizar datos  y los nuevos que sea greagaran
window.formularioIngProdCounter = 1;

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProdEdit";
  if (currentPath == appPath) {
    // Función para obtener el valor de un parámetro por nombre

    // Extraer el valor de 'codFichaTec' de la URL
    var codSalProd = getQueryParam("codSalProd");
    if (codSalProd) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codSalProd").value = codSalProd;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //editar ficha tecnica
    //obtener el valor guardado en el campo oculto cuando carga la pagina
    var codSalProd = document.getElementById("codSalProd").value;
    var data = new FormData();
    data.append("codSalProd", codSalProd);
    //visualizar los datos
    $.ajax({
      url: "ajax/salidaProd.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        $("#codIngProd").val(response["idSalProd"]);
        $("#tituloSalProdEdit").val(response["nombreSalProd"]);
        $("#pedidoSalProdEdit").val(response["idPedido"]);
        $("#fechaSalProdEdit").val(response["fechaSalProd"]);
        $("#igvIngProdAdd").val(response["igvSalProd"]);
        $("#subTotalIngProdAdd").val(response["subTotalSalProd"]);
        $("#totalIngProdAdd").val(response["totalSalProd"]);
        $("#totalIngProdAddList").val(response["totalSalProd"]);
        $("#salidaAnteriorJsonEdit").val(response["salJsonProd"]);
        if (response.hasOwnProperty("salJsonProd")) {
          ingresoProductoEdit(response["salJsonProd"]);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });

    //promesa para obtener el stock de los productos de almacen y sumarlo ala cantidad de la salida para mostrar un maximo a editar y tambien el precio del porducto
    // Modificación de obtenerStock para que retorne una promesa la funcion retorana la cantidad ala funcion de *insertarFormulario*
    function obtenerStock(codProdIng) {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        data.append("codProdIng", codProdIng);
        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          dataType: "json",
          success: function (response) {
            resolve({
              cantidadProdAlma: response["cantidadProdAlma"],
              precioProd: response["precioProd"],
            }); // Resuelve la promesa con un objeto que contiene ambos valores
          },
          error: function (jqXHR, textStatus, errorThrown) {
            reject(
              "Error en la solicitud AJAX: " + textStatus + " " + errorThrown
            ); // Rechaza la promesa si hay un error
          },
        });
      });
    }

    // Uso de async/await en ingresoProductoEdit para esperar la respuesta de obtenerStock
    async function ingresoProductoEdit(salJsonProd) {
      // Decodificar el JSON recibido de la respeusta de visualiar datos
      const procesos = JSON.parse(salJsonProd);

      // Mostrar el modal de carga por que la promesa es asincrona y espera la respuesta para crear el formulario
      //el usuario visualizara una demora en al carga de los datos
      Swal.fire({
        title: "Cargando...",
        text: "Por favor, espere mientras se procesan los datos.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      //recorre todos los arrays decodificado del json para crear un formulario por cada producto resuelto
      for (const proceso of Object.values(procesos)) {
        const {
          codProdIng,
          nombreProdIng,
          codigoProdIng,
          unidadProdIng,
          cantidadProdIng,
          precioProdIng,
        } = proceso;

        // Convertir el código del producto a entero antes de agregarlo a la variable global
        //que valida los productos agregados a la lista
        var codProdIngInt = parseInt(codProdIng, 10);
        codAddSalProdModal = codProdIngInt;
        // Agregar el código del producto a la variable global
        codigosProductosAgregados.add(codAddSalProdModal);
        //console.log(codigosProductosAgregados); // Mostrar el estado actual

        // Esperar la respuesta de obtenerStock
        try {
          // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
          const { cantidadProdAlma, precioProd } = await obtenerStock(
            codProdIng
          );
          insertarFormulario(
            codProdIng,
            nombreProdIng,
            codigoProdIng,
            unidadProdIng,
            cantidadProdIng,
            precioProdIng,
            cantidadProdAlma,
            precioProd
          );
        } catch (error) {
          console.error(error); // Manejar el error si la promesa es rechazada
        }
      }

      // Cerrar el modal de carga una vez que se haya completado el procesamiento
      Swal.close();
    }

    function insertarFormulario(
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng,
      cantidadProdStock,
      precioProd,
      //valores para la varible global que espera estos datos para inicar la funcion de cantidades maximas editables
      cantidadProd = Number(cantidadProdStock) + Number(cantidadProdIng),
      idProd = codProdIng
    ) {
      var formularioID = "formularioIngProd" + formularioIngProdCounter++;
      var nuevoProductoHTML = `
        <form id="${formularioID}" class="row productoRow" style="padding:5px 15px">
          <div class="col-lg-2">
            <!-- id del producto -->
            <input type="hidden" class="form-control" id="codProdIng" value="${idProd}">
            <!-- nombre del producto -->
            <input type="text" class="form-control" id="nombreProdIng" value="${nombreProdIng}" readonly>
          </div>
          <!-- codigo del producto -->
          <div class="col-lg-2">
            <input type="text" class="form-control" id="codigoProdIng" value="${codigoProdIng}" readonly>
          </div>
          <!-- unidad del tipo de producto -->
          <div class="col-lg-2">
            <input type="text" class="form-control" id="unidadProdIng" value="${unidadProdIng}" readonly>
          </div>
          <!-- cantidad editable inicia en 1 -->
          <div class="col-lg-2">
            <input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="${cantidadProdIng}" min="1" step="1" data-original-idProd="${idProd}">
          </div>
          <!-- precio -->
          <div class="col-lg-2">
            <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProd}" readonly>
          </div>
          <!-- boton de eliminar -->
          <div class="col-lg-1">
            <button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="${codProdIng}"><i class="fa fa-times"></i></button>
          </div>
        </form>`;

      // Agregar el nuevo formulario al contenedor
      $(".AddProductoSalida").append(nuevoProductoHTML);

      //agregar la cantidad a la variable gloval contadora
      var nuevoDatoFormulario = [
        formularioID,
        Number(idProd),
        String(cantidadProd),
      ];
      window.datosFormularios.push(nuevoDatoFormulario);
      //console.log(datosFormularios);

      //llama ala funcion de editar cantidad y precio para que valide la cantidad maxima
      $(document).on(
        "input",
        ".cantidadProdIng",
        actualizarPrecioYValidarCantidad
      );

      /*  // Eliminar el producto
      $(document).on("click", ".deleteNuevoIngresoProd", function (e) {
        // Paso 1: Capturar el valor del botón presionado y convertirlo a número entero
        var valorBoton = parseInt($(this).val(), 10);
        //console.log("Valor del botón presionado:", valorBoton);
        // Paso 2: Copiar los datos de la variable global a una nueva variable (manteniendo el formato de Set)
        var datosTemporales = new Set(codigosProductosAgregados);

        // Paso 3: Buscar y eliminar el valor del botón en la nueva variable
        if (datosTemporales.has(valorBoton)) {
          datosTemporales.delete(valorBoton);
        } else {
          //console.log("El valor no se encontró en la variable global.");
        }
        // Paso 4: Limpiar la variable global
        codigosProductosAgregados.clear();
        // Paso 5: Actualizar la variable global con los nuevos datos
        datosTemporales.forEach((valor) => {
          codigosProductosAgregados.add(valor);
        });
        // Eliminar el formulario del producto del DOM
        $(this).closest(".productoRow").remove();
      });
      //fin agregar productos */
    }
    //enviar formulario al servidor para editar
    $("#btnEditarSalidaProd").on("click", function () {
      //totales estén actualizados si el usuario no lo hizo
      document.getElementById("btnCalcularTotalIng").click();
      //obtener el formulario por id

      var formulario = document.getElementById("formSalidaProdEdit");
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
      var jsonEditarSalProd = JSON.stringify(datosFormulario);

      // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
      recojerFormulariosAnidadosSalProdEdit(function (datosFormulariosSalProd) {
        // Crear un JSON con los datos recolectados de los formularios anidados
        var jsonEditarSalProductosForms = JSON.stringify(
          datosFormulariosSalProd
        );

        $.ajax({
          url: "ajax/salidaProd.ajax.php",
          method: "POST",
          data: {
            jsonEditarSalProd: jsonEditarSalProd,
            jsonEditarSalProductosForms: jsonEditarSalProductosForms,
          },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Salida de Productos Editado Correctamente",
              }).then(function () {
                window.location.href = "/dfrida/salidaList";
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
      function recojerFormulariosAnidadosSalProdEdit(callback) {
        let datosFormulariosSalProd = {};

        $("[id^=formularioIngProd]").each(function (index) {
          let datosFormulario = {};
          $(this)
            .find("input, select")
            .each(function () {
              if (this.id) {
                datosFormulario[this.id] = $(this).val();
              }
            });
          datosFormulariosSalProd["producto" + index] = datosFormulario;
        });

        // Llamar al callback con los datos recolectados
        if (callback && typeof callback === "function") {
          callback(datosFormulariosSalProd);
        }
      }
      //fin
    });
  }
});
//fin editar ingreso productos

//****eliminar registro de salida****
//borrar salida productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    $(".dataTableSalidasProd").on("click", ".btnDeleteSalProd", function () {
      var codSalProd = $(this).attr("codSalProd");
      swal
        .fire({
          title: "¿Está seguro de borrar la Salida? Puede generar exedentes",
          text: "¡No podrá revertir el cambio esta accion afectara directamente al almacen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, Borrar Salida!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var jsonBorraSalProdcutos = JSON.stringify({
              codSalProd: codSalProd,
            });
            $.ajax({
              url: "ajax/salidaProd.ajax.php",
              method: "POST",
              data: { jsonBorraSalProdcutos: jsonBorraSalProdcutos },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Salida de Productos eliminado correctamente",
                    "success"
                  ).then(function () {
                    window.location.reload(); // Recargar la página
                  });
                } else {
                  Swal.fire(
                    "Error",
                    "Necesita permisos de administrador para realizar esta acción",
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

//vista de agregar productos a los ingresos de productos a el almacen
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddSalidaProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/salidaProd";
      });
    }
  }
});
//cerrar salida productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarSalidaProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/salidaList";
      });
    }
  }
});
//cerrar editar productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProdEdit";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarEditSalProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/salidaList";
      });
    }
  }
});

function obtenerStocSeleccionarPedido(codProdIng) {
  return new Promise((resolve, reject) => {
    var data = new FormData();
    data.append("codProdIng", codProdIng);
    $.ajax({
      url: "ajax/salidaProd.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        resolve({
          cantidadProdAlma: response["cantidadProdAlma"],
          precioProdCotiUnidad: response["precioProd"],
        }); // Resuelve la promesa con un objeto que contiene ambos valores
      },
      error: function (jqXHR, textStatus, errorThrown) {
        reject("Error en la solicitud AJAX: " + textStatus + " " + errorThrown); // Rechaza la promesa si hay un error
      },
    });
  });
}

// Función para insertar el formulario del producto
function insertarFormularioPedido(
  codProdIng,
  nombreProdIng,
  codigoProdIng,
  unidadProdIng,
  cantidadProdIng,
  precioProdIng,
  cantidadProdStock,
  precioProd,
  codPed,
  //valores para la varible global que espera estos datos para inicar la funcion de cantidades maximas editables
  cantidadProd = Number(cantidadProdStock) + Number(cantidadProdIng),
  idProd = codProdIng
) {
  var formularioID = "formularioIngProd" + formularioIngProdCounter++;
  var nuevoProductoHTML = `
    <form id="${formularioID}" class="row productoRow pedido-${codPed}" style="padding:5px 15px">
      <div class="col-lg-2">
        <!-- id del producto -->
        <input type="hidden" class="form-control" id="codProdIng" value="${idProd}">
        <!-- nombre del producto -->
        <input type="text" class="form-control" id="nombreProdIng" value="${nombreProdIng}" readonly>
      </div>
      <!-- codigo del producto -->
      <div class="col-lg-2">
        <input type="text" class="form-control" id="codigoProdIng" value="${codigoProdIng}" readonly>
      </div>
      <!-- unidad del tipo de producto -->
      <div class="col-lg-2">
        <input type="text" class="form-control" id="unidadProdIng" value="${unidadProdIng}" readonly>
      </div>
      <!-- cantidad editable inicia en 1 -->
      <div class="col-lg-2">
        <input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="${cantidadProdIng}" min="1" step="1" data-original-idProd="${idProd}">
      </div>
      <!-- precio -->
      <div class="col-lg-2">
        <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProd}" readonly>
      </div>
      <!-- boton de eliminar -->
      <div class="col-lg-1">
        <button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="${codProdIng}"><i class="fa fa-times"></i></button>
      </div>
    </form>`;

  // Agregar el nuevo formulario al contenedor
  $(".AddProductoSalida").append(nuevoProductoHTML);

  //agregar la cantidad a la variable gloval contadora
  var nuevoDatoFormulario = [
    formularioID,
    Number(idProd),
    String(cantidadProd),
  ];
  window.datosFormularios.push(nuevoDatoFormulario);
  //console.log(datosFormularios);

  //llama ala funcion de editar cantidad y precio para que valide la cantidad maxima
  $(document).on("input", ".cantidadProdIng", actualizarPrecioYValidarCantidad);
}

// Función para editar el ingreso del producto
async function ingresoProductoSeleccionPedido(
  ingJsonProd,
  codPed,
  nombrePedido
) {
  // Verificar si la opción seleccionada es "0"
  if (codPed === "0") {
    return;
  }
  const procesos = JSON.parse(ingJsonProd);

  Swal.fire({
    title: "Cargando...",
    text: "Por favor, espere mientras se procesan los datos.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  // Crear cabecera del pedido
  const cabezeraHTML = `
      <div class="row align-items-center mt-2" id="cabezeraPedido${codPed}">
        <div class="col-lg-11">
          <form id="formCabezeraIdPedido${codPed}">
            <label for="" class="form-label" style="font-weight: bold">Pedido agregado</label>
            <div class="input-group">
              <!-- nombre del pedido -->
              <input type="text" class="form-control" id="nombrePedido" value="${nombrePedido}" readonly>
              <button class="btn btn-danger deleteCabezeraPedido" type="button" value="${codPed}">
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="w-100 my-2"></div>
    `;

  // Insertar la cabecera en el contenedor adecuado
  $(".AddProductoSalida").append(cabezeraHTML);

  for (const proceso of Object.values(procesos)) {
    const {
      codProdCoti,
      codigoProdCoti,
      nombreProdCoti,
      unidadProdCoti,
      cantidadProdCoti,
      precioProdCoti,
    } = proceso;

    try {
      // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
      const { cantidadProdAlma, precioProdCotiUnidad } =
        await obtenerStocSeleccionarPedido(codProdCoti);
      insertarFormularioPedido(
        codProdCoti,
        nombreProdCoti,
        codigoProdCoti,
        unidadProdCoti,
        cantidadProdCoti,
        precioProdCoti,
        cantidadProdAlma,
        precioProdCotiUnidad,
        codPed
      );
    } catch (error) {
      console.error(error);
    }
  }

  Swal.close();
}

// Función para eliminar una cabecera de pedido completa y sus productos asociados
function deleteCabezeraPedido(button) {
  // Obtener el valor del botón, que es el codPed
  var codPed = parseInt(button.value, 10);
  // Eliminar la cabecera del DOM
  document.getElementById(`cabezeraPedido${codPed}`).remove();
  // Eliminar todos los productos asociados al pedido
  $(`.pedido-${codPed}`).remove();
  // Seleccionar la opción con el valor 0
  $("#pedidoSalProductsAdd").val("0");
  $("#pedidoSalProductsAdd").trigger("change");
  // Aquí puedes agregar cualquier lógica adicional que necesites al eliminar la cabecera del pedido
}

// Asignar evento al botón de eliminar cabecera de pedido
$(document).on("click", `.deleteCabezeraPedido`, function () {
  deleteCabezeraPedido(this);
});

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";

  if (currentPath == appPath) {
    function handlePedidoButton() {
      Swal.fire({
        title:
          "¿Agregar productos de un Pedido a una salida de productos? Verifique Stocks en almacén",
        text: "Seleccione un pedido para registrar los productos. Recuerde que puede crear salidas de productos sin esta restricción y después asignarlas a un proceso. Si agrega más de un pedido, el cliente asociado a esta salida será el cliente del primer pedido que haya agregado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.isConfirmed) {
          // Resetear el contenedor del cliente a su estado original
          resetClienteButton();
          // Crear el select de pedidos
          var container = document.getElementById("pedidoAsignarProductosAdd");
          container.innerHTML = `
            <select class="form-control select2" id="pedidoSalProductsAdd" name="pedidoSalProductsAdd">
              <option value="0">Seleccione un pedido</option>
            </select>
          `;

          $("#pedidoSalProductsAdd").select2();

          var data = new FormData();
          data.append("todosLosPedidosTerminados", true);

          $.ajax({
            url: "ajax/pedidos.ajax.php",
            method: "POST",
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {
              $("#pedidoSalProductsAdd").empty();
              $("#pedidoSalProductsAdd").append(
                '<option value="0">Seleccione un Pedido</option>'
              );
              $.each(data, function (key, value) {
                $("#pedidoSalProductsAdd").append(
                  '<option value="' +
                    value.idPedido +
                    '" data-idcoti="' +
                    value.idCoti +
                    '">' +
                    value.nombrePedido +
                    "</option>"
                );
              });
              $("#pedidoSalProductsAdd").trigger("change");

              $("#pedidoSalProductsAdd").on("change", function () {
                var codPed = $(this).val();
                var idCoti = $(this).find("option:selected").data("idcoti");
                var nombrePedido = $(this).find("option:selected").text(); // Obtener el nombre del pedido desde el texto de la opción seleccionada

                // Verificar si la cabecera con el ID ya ha sido ingresada
                if ($("#cabezeraPedido" + codPed).length > 0) {
                  // Mostrar alerta con SweetAlert
                  Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "Esta opción ya ha sido ingresada.",
                  });
                  return; // Salir de la función si la opción ya ha sido ingresada
                }

                // Bloquear el botón "Agregar Productos del Pedido"
                document.getElementById(
                  "btnProductoAddCliente"
                ).disabled = true;

                var data = new FormData();
                data.append("codPedDatosPedidos", codPed);
                data.append("idCotiDatosPedidos", idCoti);

                $.ajax({
                  url: "ajax/products.ajax.php",
                  method: "POST",
                  data: data,
                  cache: false,
                  contentType: false,
                  processData: false,
                  dataType: "json",
                  success: function (response) {
                    ingresoProductoSeleccionPedido(
                      JSON.stringify(response),
                      codPed,
                      nombrePedido
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
              });
            },
            error: function (xhr, status, error) {
              console.error("Error al cargar los datos:", error);
            },
          });
        }
      });
    }
    function handleClienteButton() {
      Swal.fire({
        title: "¿Ha agregado un pedido?",
        text: "Si no ha agregado un pedido, puede registrar un cliente.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, he agregado un pedido",
        cancelButtonText: "No, registrar un cliente",
      }).then((result) => {
        if (result.isDismissed) {
          // Resetear el contenedor de pedidos a su estado original
          resetPedidoButton();
          // Crear el select de clientes
          var container = document.getElementById("clienteProductoAdd");
          container.innerHTML = `
            <select class="form-control select2" id="clienteSelectProductoAdd" name="clienteSelectProductoAdd">
              <option value="0">Seleccione un Cliente</option>
            </select>
          `;

          $("#clienteSelectProductoAdd").select2();

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
              $("#clienteSelectProductoAdd").empty();
              $("#clienteSelectProductoAdd").append(
                '<option value="0">Seleccione un Cliente</option>'
              );
              $.each(data, function (key, value) {
                $("#clienteSelectProductoAdd").append(
                  '<option value="' +
                    value.idCli +
                    '">' +
                    value.nombreCli +
                    "</option>"
                );
              });

              $("#clienteSelectProductoAdd").trigger("change");
              $("#clienteSelectProductoAdd").on("change", function () {
                // Bloquear el botón "Agregar Productos del Pedido"
                document.getElementById("btnPedidoProductoAdd").disabled = true;
              });
            },
            error: function (xhr, status, error) {
              console.error("Error al cargar los datos:", error);
            },
          });
        }
      });
    }

    function resetPedidoButton() {
      document.getElementById("pedidoAsignarProductosAdd").innerHTML = `
        <button type="button" class="btn btn-primary w-100" id="btnPedidoProductoAdd">Agregar Productos del Pedido</button>
      `;
      document
        .getElementById("btnPedidoProductoAdd")
        .addEventListener("click", handlePedidoButton);
    }

    function resetClienteButton() {
      document.getElementById("clienteProductoAdd").innerHTML = `
        <button type="button" class="btn btn-primary w-100" id="btnProductoAddCliente">Agregar Clientes</button>
      `;
      document
        .getElementById("btnProductoAddCliente")
        .addEventListener("click", handleClienteButton);
    }

    // Inicializar los botones al cargar la página
    resetPedidoButton();
    resetClienteButton();
  }
});
