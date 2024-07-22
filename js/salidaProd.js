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
            var precioProd = respuesta["precioProdAlma"];
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

//  crear salida productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    //escuchar el evento click en el boton registrar cotizacion
    const btnRegistrar = document.getElementById("btnRegistrarSalidaProd");
    btnRegistrar.addEventListener("click", function () {
      let camposRequeridos = [
        { id: "tituloSalProdAdd", nombre: "Titulo cotizacion" },
        { id: "fechaSalProdAdd", nombre: "Fecha cotizacion" },
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
        //console.log("Formulario válido, proceder con la acción deseada.");
        // Simula la pulsación del botón "btnCalcularTotalIng" para asegurar que los totales estén actualizados si el usuario no lo hizo
        document.getElementById("btnCalcularTotalIng").click();
        /* fin click calcular total */
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formSalidaProd");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll("input, select");
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearSalidaProd = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
        recojerFormulariosAnidadosIngProductos(function (
          datosFormulariosProductos
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProductosSalidaProd = JSON.stringify(
            datosFormulariosProductos
          );

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
                  html: "Retiro de productos de Almacen Correctamente<br> <strong>¿Desea Crear Otro retiro?</strong> ",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/salidaList"; // Redirigir a la
                  }
                });
              } else if (response == "errorSalAlmacen") {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "Un producto que se intenta retirar es negativo o esta en 0 en Almacen <strong>¿Desea verificar el Almacen?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    window.location.href = "/dfrida/almacenProductos"; // Redirigir a la
                  } else {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    //window.location.reload(); // Recargar la página
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "No se pudo crear el registro de Salida <strong>¿Desea Crear Otro?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/salidaList"; // Redirigir a la vista de cotizacionList
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
        //fin agregar productos
      }
    });
    //fin verificar que los campos
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
    console.log(window.codigosProductosAgregados);
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
            var precioProd = respuesta["precioProdAlma"];
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
    console.log(item);
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
        const igvIngProdAdd = parseFloat($("#igvIngProdAdd").val()) || 0;

        // Calcular el 18% de totalGeneral para igvIngProdAdd y actualizar el atributo 'value'
        //const igvIngProdAdd = totalGeneral * 0.18;
        //$("#igvIngProdAdd").val(igvIngProdAdd).attr("value", igvIngProdAdd);

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

    //promesa para obtener el stock de los productos de almacen y sumarlo ala cantidad de la salida para mostrar un maximo a editar
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
            resolve(response["cantidadProdAlma"]); // Resuelve la promesa con el valor deseado
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
          //enviar el id de producto ala funcion de obtener stock para traer el ston del almacen
          const cantidadProdStock = await obtenerStock(codProdIng);
          insertarFormulario(
            codProdIng,
            nombreProdIng,
            codigoProdIng,
            unidadProdIng,
            cantidadProdIng,
            precioProdIng,
            cantidadProdStock
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
            <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProdIng}" readonly>
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
                text: "Ingreso Producto Editado Correctamente",
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
  var appPath = "/dfrida/ingresoProdEdit";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarEditIngresoProd");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/ingresoList";
      });
    }
  }
});
