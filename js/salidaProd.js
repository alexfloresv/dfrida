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

    // Variable global acumulativa para almacenar datos del formulario, idProd y cantidad para validar cantidad maxima en almacen
    window.datosFormularios = [];
    //console.log(datosFormularios);

    $(".dataTableProductosSalidaAlmacen").on("click", ".btnAddProdModalSal", function () {
      var codAddSalProdModal = $(this).attr("codAddSalProdModal");

      // Convertir el código a entero antes de verificar y agregar
      var codAddSalProdModalInt = parseInt(codAddSalProdModal, 10);

      // Verificar si el código ya ha sido agregado
      if (window.codigosProductosAgregados.has(codAddSalProdModalInt)) {
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
      window.codigosProductosAgregados.add(codAddSalProdModalInt);
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

          // Dentro de la función de éxito del AJAX
          var nuevoDatoFormulario = [formularioID, idProd, cantidadProd];
          window.datosFormularios.push(nuevoDatoFormulario);
          //console.log(datosFormularios);
        },
      });
    });

    // Actualizar el precio cuando cambia la cantidad y valida y muestra la cantidad maxiama en el alamcen 
    $(document).on("input", ".cantidadProdIng", function () {
      var count = $(this).val();
      var idProd = $(this).data("original-idprod");
      var precioPerUnit = $(this)
        .closest(".productoRow")
        .find(".precioProdIng")
        .data("original-precio");

      // Lógica para calcular el precio final
      if (count === "" || parseInt(count) === 0) {
        var precioFinal = "0";
      } else {
        var precioFinal = (count * precioPerUnit).toFixed(2);
      }

      // Actualizar el valor interno y el atributo 'value' en el HTML
      $(this).val(count).attr("value", count);
      $(this)
        .closest(".productoRow")
        .find(".precioProdIng")
        .val(precioFinal)
        .attr("value", precioFinal);

      // Lógica para mostrar el mensaje basado en la cantidad
      // Suponiendo que window.datosFormularios es el array global acumulativo
      var formularioID = "";
      var cantidadInicial = 0;
      window.datosFormularios.forEach(function (item) {
        if (item[1] === idProd) {
          formularioID = item[0];
          cantidadInicial = item[2];
        }
      });
      // Si se encuentra el formulario y la cantidad actual supera la inicial
      if (formularioID && parseInt(count) > cantidadInicial) {
        // Mostrar mensaje con SweetAlert
        Swal.fire({
          icon: "info",
          title: "Cantidad Excedente",
          html: "La cantidad máxima en el almacén es <b>" + cantidadInicial + "</b>.",
        }).then((result) => {
          if (result.value) {
            // Después de darle OK, actualizar el campo con la cantidad máxima
            $(this).val(cantidadInicial).attr("value", cantidadInicial);
            // También actualizar el precio final basado en la cantidad máxima
            var precioFinalMax = (cantidadInicial * precioPerUnit).toFixed(2);
            $(this)
              .closest(".productoRow")
              .find(".precioProdIng")
              .val(precioFinalMax)
              .attr("value", precioFinalMax);
          }
        });
      }
    });

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
    //fin agregar productos a la cotizacion
    //fin vericar ruta
  }
});
//fin agreagr productos a la cotizacion

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

//  crear ingreso productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaProd";
  if (currentPath == appPath) {
    //escuchar el evento click en el boton registrar cotizacion
    const btnRegistrar = document.getElementById("btnRegistrarSalidaProd");
    btnRegistrar.addEventListener("click", function () {
      let camposRequeridos = [
        { id: "tituloSalProdAdds", nombre: "Titulo cotizacion" },
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
//fin ingreso****

//****funciones para editar producto ////

// guardar los codigos de los productos agregados
window.codigosProductosAgregados = new Set();

//agrergar productos a ingreso productos
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProdEdit";
  if (currentPath == appPath) {
    //funcion para agregar productos a la cotizacion
    // Definir un contador global para los IDs de formulario
    //var formularioIngProdCounter = 1;

    $(".dataTableProductos").on("click", ".btnAddProdModalIng", function () {
      var codAddIngProdModal = $(this).attr("codAddIngProdModal");

      // Convertir el código a entero antes de verificar y agregar
      var codAddIngProdModalInt = parseInt(codAddIngProdModal, 10);

      // Verificar si el código ya ha sido agregado
      if (window.codigosProductosAgregados.has(codAddIngProdModalInt)) {
        // Cerrar el modal antes de mostrar el mensaje de SweetAlert
        $("#modalAddProdCoti").modal("hide");
        Swal.fire({
          icon: "warning",
          title: "Producto duplicado",
          text: "El producto ya está en la lista.",
        }).then((result) => {
          if (result.value) {
            // Mostrar el modal de nuevo
            $("#modalAddProdCoti").modal("show");
          }
        });
        return; // No proceder con el AJAX
      }

      // Agregar el código al conjunto de productos agregados como entero
      window.codigosProductosAgregados.add(codAddIngProdModalInt);
      //console.log(window.codigosProductosAgregados); // Mostrar el estado actual

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
            '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="' +
            idProd +
            '" ><i class="fa fa-times"></i></button>' +
            "</div>" +
            "</form>";

          // Agregar el nuevo formulario al contenedor
          $(".AddIngProductoEdit").append(nuevoProductoHTML);
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
    $(document).on("click", ".deleteNuevoIngresoProd", function (e) {
      // Paso 1: Capturar el valor del botón presionado y convertirlo a número entero
      var valorBoton = parseInt($(this).val(), 10);
      //console.log("Valor del botón presionado:", valorBoton);

      // Paso 2: Copiar los datos de la variable global a una nueva variable (manteniendo el formato de Set)
      var datosTemporales = new Set(codigosProductosAgregados);
      /*  console.log(
        "Datos originales de la variable global:",
        Array.from(datosTemporales)
      ); */

      // Paso 3: Buscar y eliminar el valor del botón en la nueva variable
      if (datosTemporales.has(valorBoton)) {
        datosTemporales.delete(valorBoton);
        /*    console.log(
          "Datos después de eliminar el valor del botón:",
          Array.from(datosTemporales)
        ); */
      } else {
        //console.log("El valor no se encontró en la variable global.");
      }

      // Paso 4: Limpiar la variable global
      codigosProductosAgregados.clear();

      // Paso 5: Actualizar la variable global con los nuevos datos
      datosTemporales.forEach((valor) => {
        codigosProductosAgregados.add(valor);
      });

      // Paso 7: Mostrar por consola el estado actualizado de la variable global
      /*    console.log(
        "Estado actualizado de la variable global:",
        Array.from(codigosProductosAgregados)
      ); */

      // Eliminar el formulario del producto del DOM
      $(this).closest(".productoRow").remove();
    });
    //fin agregar productos
    //fin vericar ruta
  }
});
//fin agreagr productos

// TOTALES
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProdEdit";
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
// Enviar código a la vista de editar
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoList";
  if (currentPath == appPath) {
    $(".dataTableIngresosProd").on("click", ".btnEditarIngProd", function () {
      swal
        .fire({
          title: "¡Editar el Ingreso Puede generar negativos!",
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
            var codIngProd = $(this).attr("codIngProd");
            // Usar la variable directamente en la URL de redirección
            window.location.href =
              "/dfrida/ingresoProdEdit?codIngProd=" + codIngProd;
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
//variable gloval para contar los formularios  de edit a agregar los que llegan de respeusta y los nuevos que sea greagaran
window.formularioIngProdCounter = 0;

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProdEdit";
  if (currentPath == appPath) {
    // Función para obtener el valor de un parámetro por nombre

    // Extraer el valor de 'codFichaTec' de la URL
    var codIngProd = getQueryParam("codIngProd");
    if (codIngProd) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codIngProd").value = codIngProd;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //  editar ficha tecnica
    //obtener el valor guardado en el campo oculto cuando carga la pagina
    var codIngProd = document.getElementById("codIngProd").value;
    var data = new FormData();
    data.append("codIngProd", codIngProd);
    //visualizar los datos
    $.ajax({
      url: "ajax/ingresoProd.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        $("#codIngProd").val(response["idIngProd"]);
        $("#tituloIngProdEdit").val(response["nombreIngProd"]);
        $("#fechaIngProdEdit").val(response["fechaIngProd"]);
        $("#igvIngProdAdd").val(response["igvIngProd"]);
        $("#subTotalIngProdAdd").val(response["subTotalIngProd"]);
        $("#totalIngProdAdd").val(response["totalIngProd"]);
        $("#totalIngProdAddList").val(response["totalIngProd"]);
        $("#prodIngAnteriorEdit").val(response["ingJsonProd"]);
        if (response.hasOwnProperty("ingJsonProd")) {
          ingresoProductoEdit(response["ingJsonProd"]);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
    });

    function ingresoProductoEdit(ingJsonProd) {
      // Decodificar el JSON recibido
      const procesos = JSON.parse(ingJsonProd);
      //var formularioProcesoCounter = 0;
      // Insertar datos automáticamente
      Object.values(procesos).forEach((proceso) => {
        const {
          codProdIng,
          nombreProdIng,
          codigoProdIng,
          unidadProdIng,
          cantidadProdIng,
          precioProdIng,
        } = proceso;
        // Convertir el código del producto a entero antes de agregarlo a la variable global contadora de productos agreagados ala lista
        var codProdIngInt = parseInt(codProdIng, 10);
        codigosProductosAgregados.add(codProdIngInt);

        insertarFormulario(
          codProdIng,
          nombreProdIng,
          codigoProdIng,
          unidadProdIng,
          cantidadProdIng,
          precioProdIng
        );
      });
    }

    function insertarFormulario(
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng
    ) {
      var formularioID = "formularioIngProd" + formularioIngProdCounter++;
      var nuevoProductoHTML = `
        <form id="${formularioID}" class="row productoRow" style="padding:5px 15px">
          <div class="col-lg-2">
            <!-- id del producto -->
            <input type="hidden" class="form-control" id="codProdIng" value="${codProdIng}">
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
            <input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="${cantidadProdIng}" min="1" step="1">
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
      $(".AddIngProductoEdit").append(nuevoProductoHTML);
    }
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
              ).then(function () { });
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
  }
});
//fin editar ingreso productos

//borrar ingreso productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoList";
  if (currentPath == appPath) {
    $(".dataTableIngresosProd").on("click", ".btnDeleteIngProd", function () {
      var codIngProd = $(this).attr("codIngProd");
      swal
        .fire({
          title: "¿Está seguro de borrar el Ingreso? Puede generar negativos",
          text: "¡No podrá revertir el cambio esta accion afectara directamente al almacen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Si, Borrar Ingreso!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            var jsonBorraIngProdcutos = JSON.stringify({
              codIngProd: codIngProd,
            });
            $.ajax({
              url: "ajax/ingresoProd.ajax.php",
              method: "POST",
              data: { jsonBorraIngProdcutos: jsonBorraIngProdcutos },
              dataType: "json",
              success: function (response) {
                if (response == "ok") {
                  Swal.fire(
                    "Correcto",
                    "Ingreso Producto eliminado correctamente",
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
