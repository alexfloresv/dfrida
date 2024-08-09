//agregar productos a ingreso productos****
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    // Definir un contador global para los IDs de formulario
    var formularioIngProdCounter = 1;

    // guardar los codigos de los productos agregados
    window.codigosProductosAgregados = new Set();

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
            '" >' +
            "</div>" +
            /* boton de eliminar */
            '<div class="col-lg-1">' +
            '<button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" id="deleteNuevoIngresoProd" value="' +
            idProd +
            '"><i class="fa fa-times"></i></button>' +
            "</div>" +
            "</form>";

          // Agregar el nuevo formulario al contenedor
          $(".AddProductoCotizacion").append(nuevoProductoHTML);
        },
      });
    });

    // Actualizar el precio cuando cambia la cantidad
    $(document).on("input", ".cantidadProdIng", function () {
      var input = $(this);
      var count = input.val();
      var precioPerUnit = input
        .closest(".productoRow")
        .find(".precioProdIng")
        .data("original-precio");

      // Verificar si el campo tiene exactamente 0 y mostrar alerta
      if (count === "0") {
        Swal.fire({
          icon: "warning",
          title: "Cantidad Inválida",
          html: "La cantidad no puede ser 0.",
        }).then((result) => {
          if (result.value) {
            count = 1;
            var precioFinal = (count * precioPerUnit).toFixed(2);
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

      // Si el valor del input es vacío o 0, el precio final es 0
      if (count === "" || parseInt(count) === 0) {
        var precioFinal = "0";
      } else {
        var precioFinal = (count * precioPerUnit).toFixed(2);
      }

      // Actualizar el valor interno y el atributo 'value' en el HTML
      input.val(count);
      input.attr("value", count); // Actualiza el atributo 'value' en el HTML para la cantidad
      input
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
      /* console.log(
        "Datos originales de la variable global:",
        Array.from(datosTemporales)
      ); */

      // Paso 3: Buscar y eliminar el valor del botón en la nueva variable
      if (datosTemporales.has(valorBoton)) {
        datosTemporales.delete(valorBoton);
        /*   console.log(
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
      /*  console.log(
        "Estado actualizado de la variable global:",
        Array.from(codigosProductosAgregados)
      ); */

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
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    //funcion para calcular los totales
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

        // Calcular el 18% de totalGeneral para igvIngProdAdd y actualizar el atributo 'value'
        //const igvIngProdAdd = totalGeneral * 0.18;
        //$("#igvIngProdAdd").val(igvIngProdAdd).attr("value", igvIngProdAdd);

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
        { id: "tituloIngProdAdd", nombre: "Titulo ingreso" },
        { id: "fechaIngProdAdd", nombre: "Fecha ingreso" },
        { id: "subTotalIngProdAdd", nombre: "Sub Total " },
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
      var input = $(this);
      var count = input.val();
      var precioPerUnit = input
        .closest(".productoRow")
        .find(".precioProdIng")
        .data("original-precio");

      // Verificar si el campo tiene exactamente 0 y mostrar alerta
      if (count === "0") {
        Swal.fire({
          icon: "warning",
          title: "Cantidad Inválida",
          html: "La cantidad no puede ser 0.",
        }).then((result) => {
          if (result.value) {
            count = 1;
            var precioFinal = (count * precioPerUnit).toFixed(2);
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

      // Si el valor del input es vacío o 0, el precio final es 0
      if (count === "" || parseInt(count) === 0) {
        var precioFinal = "0";
      } else {
        var precioFinal = (count * precioPerUnit).toFixed(2);
      }

      // Actualizar el valor interno y el atributo 'value' en el HTML
      input.val(count);
      input.attr("value", count); // Actualiza el atributo 'value' en el HTML para la cantidad
      input
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
        calcularTotalCotizacion();
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

        // Esperar la respuesta de obtenerPrecioProdUni
        try {
          // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
          const precioProd = await obtenerPrecioProdUni(
            codProdIng
          );
          insertarFormulario(
            codProdIng,
            nombreProdIng,
            codigoProdIng,
            unidadProdIng,
            cantidadProdIng,
            precioProdIng, 
            precioProd// uni precio 1 + 1 = 2
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
      precioProd
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
            <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProd}" readonly>
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
//cerrar ingreso productos
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

//funcion para traer la produccion aprobada al selct 2
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/ingresoProd";
  if (currentPath == appPath) {
    // Verificar si el botón existe en el DOM
    var btnProduccionProdAdd = document.getElementById("btnProduccionProdAdd");
    if (btnProduccionProdAdd) {
      // Inicializar Select2
      btnProduccionProdAdd.addEventListener("click", function () {
        Swal.fire({
          title:
            "¿Agregar una produccion aprobada al ingreso de productos?",
          text: "Selecione una produccion Aprobada para registrar los productos, en el alamcen de productos finales.",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No, Creare un ingreso sin produccion.",
          confirmButtonText: "Sí, Agregar Produccion Aprobada.",
        }).then((result) => {
          if (result.isConfirmed) {
            // Cambiar el botón por un campo select
            var container = document.getElementById("produccionProdAdd");
            container.innerHTML = `
              <select class="form-control select2" id="produccionAdd" name="produccionAdd">
                <option value="0">Seleccione una produccion</option>
              </select>
            `;

            // Inicializar Select2 en el nuevo campo select
            $("#produccionAdd").select2();

            // Cargar datos dinámicamente al confirmar
            var data = new FormData();
            data.append("todasLasProduccionesDisponibles", true);

            $.ajax({
              url: "ajax/ingresoProd.ajax.php",
              method: "POST",
              data: data,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (data) {
                // Limpiar las opciones actuales
                $("#produccionAdd").empty();
                $("#produccionAdd").append(
                  '<option value="0">Seleccione una produccion</option>'
                );
                // Agregar las nuevas opciones
                $.each(data, function (key, value) {
                  $("#produccionAdd").append(
                    '<option value="' +
                      value.idProduccion +
                      '">' +
                      value.nombreProduccion +
                      "</option>"
                  );
                });
                // Actualizar Select2 después de agregar las opciones
                $("#produccionAdd").trigger("change");

                // Agregar evento change para capturar el valor seleccionado
                $("#produccionAdd").on("change", function () {
                  var codProduccion = $(this).val();
                  // Aquí puedes agregar cualquier lógica adicional que necesites
                  productosProduccion(codProduccion);
                });
              },
              error: function (xhr, status, error) {
                console.error("Error al cargar los datos:", error);
              },
            });
          }
        });
      });
    } else {
      console.error(
        'El elemento con id "btnProcesoOperativoAdd" no se encontró en el DOM.'
      );
    }
  }
});
//fin funcion

//funcion para trear los productos de la cotizacion
function productosProduccion(codProduccion) {
  var data = new FormData();
  data.append("codProduccion", codProduccion);
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
      if (response.hasOwnProperty("productsCoti")) {
        ingresoProductoProduccion(response["productsCoti"]);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
    },
  });
}

//promesa para obtener el stock de los productos de almacen y sumarlo a la cantidad de la salida para mostrar un máximo a editar y también el precio del producto
// Modificación de obtenerStock para que retorne una promesa la función retorna la cantidad a la función de *insertarFormulario*
function obtenerDataProd(codProdCoti) {
  return new Promise((resolve, reject) => {
    var data = new FormData();
    data.append("codProdCoti", codProdCoti);
    $.ajax({
      url: "ajax/ingresoProd.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        resolve({
          //cantidadProdAlma: response["cantidadMprimaAlma"],
          precioProd: response["precioProd"],
          codigoProd: response["codigoProd"],
        }); // Resuelve la promesa con un objeto que contiene ambos valores
      },
      error: function (jqXHR, textStatus, errorThrown) {
        reject("Error en la solicitud AJAX: " + textStatus + " " + errorThrown); // Rechaza la promesa si hay un error
      },
    });
  });
}

// Uso de async/await en ingresoProductoEdit para esperar la respuesta de obtenerStock
async function ingresoProductoProduccion(productsCoti) {
  // Decodificar el JSON recibido de la respuesta de visualizar datos
  const procesos = JSON.parse(productsCoti);

  // Mostrar el modal de carga porque la promesa es asíncrona y espera la respuesta para crear el formulario
  //el usuario visualizará una demora en la carga de los datos
  Swal.fire({
    title: "Cargando...",
    text: "Por favor, espere mientras se procesan los datos.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  //recorre todos los arrays decodificados del json para crear un formulario por cada producto resuelto
  for (const proceso of Object.values(procesos)) {
    const {
      codProdCoti,
      nombreProdCoti,
      unidadProdCoti,
      cantidadProdCoti,
      precioProdCoti
    } = proceso;

    // Convertir el código del producto a entero antes de agregarlo a la variable global
    //que valida los productos agregados a la lista
    var codProdIngInt = parseInt(codProdCoti, 10);
    // Agregar el código del producto a la variable global
    codigosProductosAgregados.add(codProdIngInt);
    //console.log(codigosProductosAgregados); // Mostrar el estado actual

    // Esperar la respuesta de obtenerStock
    try {
      // Enviar el id de producto a la función de obtener stock para traer el stock del almacén
      const {precioProd, codigoProd } =
        await obtenerDataProd(codProdCoti);
      insertarFormularioProduccion(
        codProdCoti,
        nombreProdCoti,
        codigoProd,
        unidadProdCoti,
        cantidadProdCoti,
        precioProdCoti,
        precioProd
      );
    } catch (error) {
      console.error(error); // Manejar el error si la promesa es rechazada
    }
  }

  // Cerrar el modal de carga una vez que se haya completado el procesamiento
  Swal.close();
}

function insertarFormularioProduccion(
  codProdIng,
  nombreProdIng,
  codigoProdIng,
  unidadProdIng,
  cantidadProdIng,
  precioProdIng,
  precioProd,
  idProd = codProdIng
) {
  // Llamar a validarCantidad después de que todos los parámetros estén definidos
  
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
  $(".AddProductoCotizacion").append(nuevoProductoHTML);
}


