//funcion para traer el proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    $(".dataTableMerma").on("click", ".btnAprobMprimaMerma", function () {
      $("#AddMateriaPrimaMerma").empty();
      var codSalMprima = $(this).attr("codSalMprima");
      var codMerma = $(this).attr("codMerma");
      Swal.fire({
        title: "¿Aceptar Merma de materia prima?",
        text: "Seleccione y asegure la cantidad de materia prima que se va a mermar. Si no existe merma, ingrese 0 en los datos.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, aceptar después.",
        confirmButtonText: "Sí, aceptar merma.",
      }).then((result) => {
        if (result.isConfirmed) {
          //abrir modal
          $("#modalMateriaPrimaMerma").modal("show");
          //guardar el id en el campo oculto para usarlo en el modal
          $("#codMerma").val(codMerma);

          var datos = new FormData();
          datos.append("codSalMprima", codSalMprima);

          $.ajax({
            url: "ajax/merma.ajax.php",
            method: "POST",
            data: datos,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (response) {
              if (response.hasOwnProperty("salJsonMprima")) {
                ingresoPruductosMerma(response["salJsonMprima"]);
              }
              // console.log(response.salJsonMprima);
            },
            error: function (xhr, status, error) {
              console.error("Error al cargar los datos:", error);
            },
          });
        }
      });
    });
  }
});

var formularioIngProdCounter = 1;

// variable global guardar los codigos de los productos agregados no tocar
window.codigosProductosAgregados = new Set();

function eliminarFormulariosAgregados() {
  // Eliminar todos los formularios agregados
  $("[id^=formularioAcepMerma]").remove();
  // Restablecer la variable contadora
  formularioIngProdCounter = 1;
}

function ingresoPruductosMerma(salJsonMprima) {
  eliminarFormulariosAgregados();
  const procesos = JSON.parse(salJsonMprima);
  Swal.fire({
    title: "Cargando...",
    text: "Por favor, espere mientras se procesan los datos.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  for (const proceso of Object.values(procesos)) {
    const {
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng,
    } = proceso;

    insertarFormularioMerma(
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng
    );
  }

  Swal.close();
}

function insertarFormularioMerma(
  codProdIng,
  nombreProdIng,
  codigoProdIng,
  unidadProdIng,
  cantidadProdIng,
  precioProdIng,
  precioProd,
  idProd = codProdIng
) {
  // Llamar a eliminarFormulariosAgregados antes de insertar nuevos formularios

  var formularioID = "formularioAcepMerma" + formularioIngProdCounter++;
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
        <input type="text" class="form-control" id="unidadProdIng" value="${unidadProdIng}">
      </div>
      <!-- cantidad editable inicia en 1 -->
      <div class="col-lg-2">
        <input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="${cantidadProdIng}" min="1" step="1" data-original-idProd="${idProd}">
      </div>
      <!-- precio -->
      <div class="col-lg-2">
        <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProd}">
      </div>
      <!-- boton de eliminar -->
      <div class="col-lg-1">
        <button type="button" class="btn btn-danger btn-xs deleteNuevoIngresoProd" value="${codProdIng}"><i class="fa fa-times"></i></button>
      </div>
    </form>`;

  // Agregar el nuevo formulario al contenedor
  $(".AddMateriaPrimaMerma").append(nuevoProductoHTML);

  // Agregar el código al conjunto de productos agregados como entero
  window.codigosProductosAgregados.add(codProdIng);

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
}

// crear registro de mermas aceptadas
document.addEventListener("DOMContentLoaded", function () {
  // Si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/merma";
  if (currentPath == appPath) {
    // Botón para iniciar el proceso de registro de merma
    var btnCrearRegistroAceptarMerma = document.getElementById(
      "crearRegistroAceptarMerma"
    );

    // Escuchar el evento click del botón
    btnCrearRegistroAceptarMerma.addEventListener("click", function () {
      var formulario = document.querySelector("#formMermaAdd"); // Asegúrate de tener el formulario principal con este ID
      var datosFormulario = {};
      var elementosFormulario = formulario.querySelectorAll("input, select");
      elementosFormulario.forEach(function (elemento) {
        if (elemento.id) {
          datosFormulario[elemento.id] = elemento.value;
        }
      });
      // Crear un JSON con los datos recolectados del formulario principal
      var jsonCrearAcepMerma = JSON.stringify(datosFormulario);

      // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS
      recojerFormulariosAnidadosAcpMerma(function (datosFormulariosProductos) {
        // Crear un JSON con los datos recolectados de los formularios anidados
        var jsonProductosMerma = JSON.stringify(datosFormulariosProductos);

        $.ajax({
          url: "ajax/merma.ajax.php",
          method: "POST",
          data: {
            jsonCrearAcepMerma: jsonCrearAcepMerma,
            jsonProductosMerma: jsonProductosMerma,
          },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Merma Aceptada Correctamente. Esta se puede usar para crear un producto a partir de ella.",
              }).then(function () {
                window.location.reload();
              });
            } else {
              Swal.fire(
                "Error",
                "La merma no se pudo aceptar, por favor verifique los datos e intente de nuevo.",
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
        // Fin de la llamada AJAX
      });
    });

    // Función para recolectar los datos de los formularios productos y productos prima
    function recojerFormulariosAnidadosAcpMerma(callback) {
      // Almacena los datos de los formularios productos y productos prima
      let datosFormulariosProductos = {};

      // Recorrer los formularios de productos
      $("[id^=formularioAcepMerma]").each(function (index) {
        let datosFormulario = {};
        $(this)
          .find("input, select")
          .each(function () {
            if (this.id) {
              datosFormulario[this.id] = $(this).val();
            }
          });
        datosFormulariosProductos["merma" + index] = datosFormulario;
      });

      // Llamar al callback con los datos recolectados de ambos formularios
      if (callback && typeof callback === "function") {
        callback(datosFormulariosProductos);
      }
    }
  }
});
//fin
