window.formularioIngProdNuevoMermaCounter = 1;
window.nombreProdMerma = 1;
// Crear producto merma
document.addEventListener("DOMContentLoaded", function () {
  // Si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMerma";
  if (currentPath == appPath) {
    document
      .getElementById("btnAddNuevoProdMerma")
      .addEventListener("click", function () {
        Swal.fire({
          icon: "warning",
          title: "Crear Producto Merma",
          text: "Este producto se creará automáticamente en el catálogo después de su registro.",
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.value) {
            // Crear un nuevo formulario para el producto con un ID único que incrementa en 1 cada vez que se agrega un producto
            var formularioID =
              "formularioIngProdNewMerm" + formularioIngProdNuevoMermaCounter++;
            var nombreProdIngID = "nombreProdIng_" + window.nombreProdMerma++;
            var nuevoProductoHTML =
              '<form id="' +
              formularioID +
              '" class="row productoRow" style="padding:5px 15px">' +
              /* div producto */
              '<div class="col-lg-2" id="divNombreProdMerma">' +
              /* id del producto */
              '<input type="hidden" class="form-control" id="codProdIng" value="">' +
              /* nombre del producto con botón al lado */
              '<div class="input-group">' +
              '<input type="text" class="form-control" id="' +
              nombreProdIngID +
              '" value="" placeholder="Ingrese campo Obligatorio">' +
              /*boton para buscar producto existente*/
              '<div class="input-group-append">' +
              '<button class="btn btn-primary " type="button" id="btnAddProductoMermaExistente" value="' +
              formularioID +
              '">Buscar</button>' +
              "</div>" +
              "</div>" +
              "</div>" +
              /* fin div del producto */
              /* código del producto */
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control" id="codigoProdIng" value="" placeholder="Ingrese campo Obligatorio" >' +
              "</div>" +
              /* unidad del tipo de producto */
              '<div class="col-lg-2">' +
              '<input type="text" class="form-control" id="unidadProdIng" value="" placeholder="Ingrese campo Obligatorio" >' +
              "</div>" +
              /* cantidad editable inicia en 1 */
              '<div class="col-lg-2">' +
              '<input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="" placeholder="Ingrese campo Obligatorio">' +
              "</div>" +
              /* precio */
              '<div class="col-lg-2">' +
              '<input type="number" class="form-control precioProdIng" id="precioProdIng" value="" data-original-precio="" placeholder="Ingrese campo Obligatorio">' +
              "</div>" +
              /* botón de eliminar */
              '<div class="col-lg-1">' +
              '<button type="button" class="btn btn-danger btn-xs deleteNuevoProdMerma" id="deleteNuevoIngresoProd" value=""><i class="fa fa-times"></i></button>' +
              "</div>" +
              "</form>";

            // Agregar el nuevo formulario al contenedor
            $(".AddProductoMermaNuevo").append(nuevoProductoHTML);
          }
        });
      });

    // Eliminar el producto
    $(document).on("click", ".deleteNuevoProdMerma", function () {
      $(this).closest(".productoRow").remove();
    });
    //fin agregar productos a la cotizacion
  }
});

//funcion para traer la merma aprobada al selct 2
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMerma";
  if (currentPath == appPath) {
    // Usar event delegation para escuchar el evento de clic en el botón
    document.body.addEventListener("click", function (event) {
      if (event.target && event.target.id === "btnAddProductoMermaExistente") {
        var formularioID = event.target.value; // Obtener el nombre del formulario del valor del botón
        var selectID = "nombreProdIng_" + window.nombreProdMerma++; // Generar un ID único para el select
        Swal.fire({
          title: "¿Buscar un producto merma existente?",
          text: "Al confirmar se mostrara todos los productos del catalogo selecione el producto merma existente.",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No, Crear un nuevo producto merma.",
          confirmButtonText: "Sí, Selecionar Uno existente.",
        }).then((result) => {
          if (result.isConfirmed) {
            // Cambiar el botón por un campo select en el formulario correcto
            var container = document.querySelector(
              `#${formularioID} #divNombreProdMerma`
            );
            container.innerHTML = `
              <div class="input-group">
                <select class="form-control select2" id="${selectID}" name="nombreProdIng">
                  <option value="0">Seleccione un producto merma</option>
                </select>
                <!-- id del producto -->
                <input type="hidden" class="form-control" id="codProdIng" value="">
              </div>`;

            // Inicializar Select2 en el nuevo campo select
            $(`#${selectID}`).select2();

            // Cargar datos dinámicamente al confirmar
            var data = new FormData();
            data.append("todasLosProductosMerma", true);

            $.ajax({
              url: "ajax/productoMerma.ajax.php",
              method: "POST",
              data: data,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (data) {
                // Limpiar las opciones actuales
                $(`#${selectID}`).empty();
                $(`#${selectID}`).append(
                  '<option value="0">Seleccione un producto merma</option>'
                );
                // Agregar las nuevas opciones
                $.each(data, function (key, value) {
                  $(`#${selectID}`).append(
                    '<option value="' +
                      value.idProd +
                      '">' +
                      value.nombreProd +
                      "</option>"
                  );
                });
                // Actualizar Select2 después de agregar las opciones
                $(`#${selectID}`).trigger("change");

                // Agregar evento change para capturar el valor seleccionado
                $(`#${selectID}`).on("change", function () {
                  var codProdCatal = $(this).val();
                  // Validar si codMermaConfir es igual a 0
                  if (codProdCatal == 0) {
                    // No hacer nada si codMermaConfir es 0
                    return;
                  }
                  productoMermaCatalogo(codProdCatal, formularioID);
                });
              },
              error: function (xhr, status, error) {
                console.error("Error al cargar los datos:", error);
              },
            });
          }
        });
      }
    });
  }
});

//funcion para trear los productos de la merma aprobada
function productoMermaCatalogo(codProdCatal, formularioID) {
  var data = new FormData();
  data.append("codProdCatal", codProdCatal);
  //visualizar los datos
  $.ajax({
    url: "ajax/productoMerma.ajax.php",
    method: "POST",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      $(`#${formularioID} #codProdIng`).val(response["idProd"]);
      $(`#${formularioID} #nombreProdIng`).val(response["nombreProd"]);
      $(`#${formularioID} #codigoProdIng`).val(response["codigoProd"]);
      $(`#${formularioID} #unidadProdIng`).val(response["unidadProd"]);
      $(`#${formularioID} #precioProdIng`).val(response["precioProd"]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
    },
  });
}
//fin funcion

//variable global contadora de formularios de merma ingresados
window.formularioMprimaMerma = 1;

//variable global contadora de mermas selecionadas
window.mermasSelecionadas = [];

// Función para verificar si una merma ya ha sido seleccionada
function verificarMermaSelecionada(codMermaConfir) {
  return new Promise((resolve) => {
    // Convertir codMermaConfir a número entero
    const codMermaConfirInt = parseInt(codMermaConfir, 10);

    // Buscar el codMerma en el array global
    const mermaEncontrada = mermasSelecionadas.some(
      (merma) => parseInt(merma.codMerma, 10) === codMermaConfirInt
    );

    if (mermaEncontrada) {
      // Mostrar mensaje de error si la merma ya fue seleccionada
      Swal.fire({
        title: "Error",
        html: "La merma ya fue seleccionada y se encuentra en la <br> <strong>Lista de Materias Prima Merma Confirmadas</strong>",
        icon: "info",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // Confirmar el mensaje antes de devolver true
          resolve(true);
        }
      });
    } else {
      // Devolver false si la merma no fue seleccionada
      resolve(false);
    }
  });
}
// Fin

//funcion para traer la merma aprobada al selct 2
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/productoMerma";
  if (currentPath == appPath) {
    // Verificar si el botón existe en el DOM
    var btnAddProductosMermados = document.getElementById(
      "btnAddProductosMermados"
    );
    if (btnAddProductosMermados) {
      // Inicializar Select2
      btnAddProductosMermados.addEventListener("click", function () {
        Swal.fire({
          title: "Seleccione una o varias mermas confirmadas",
          text: "Todas las mermas seleccionadas se agregaran ala lista para crear el producto merma estas se utilizaran para crear el Procucto Merma.",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No, Crear despues.",
          confirmButtonText: "Sí, Agregar Merma Confirmada.",
        }).then((result) => {
          if (result.isConfirmed) {
            // Cambiar el botón por un campo select
            var container = document.getElementById("prodMermaAdd");
            container.innerHTML = `
              <select class="form-control select2" id="prodMermaAddId" name="prodMermaAddId">
                <option value="0">Seleccione una merma confirmada</option>
              </select>`;

            // Inicializar Select2 en el nuevo campo select
            $("#prodMermaAddId").select2();

            // Cargar datos dinámicamente al confirmar
            var data = new FormData();
            data.append("todasLasMermamasConfirmadas", true);

            $.ajax({
              url: "ajax/productoMerma.ajax.php",
              method: "POST",
              data: data,
              contentType: false,
              processData: false,
              dataType: "json",
              success: function (data) {
                // Limpiar las opciones actuales
                $("#prodMermaAddId").empty();
                $("#prodMermaAddId").append(
                  '<option value="0">Seleccione una merma confirmada</option>'
                );
                // Agregar las nuevas opciones
                $.each(data, function (key, value) {
                  $("#prodMermaAddId").append(
                    '<option value="' +
                      value.idMerma +
                      '">' +
                      value.nombreMerma +
                      "</option>"
                  );
                });
                // Actualizar Select2 después de agregar las opciones
                $("#prodMermaAddId").trigger("change");

                // Agregar evento change para capturar el valor seleccionado
                $("#prodMermaAddId").on("change", function () {
                  var codMermaConfir = $(this).val();
                  // Validar si codMermaConfir es igual a 0

                  if (codMermaConfir == 0) {
                    // No hacer nada si codMermaConfir es 0
                    return;
                  }

                  // Verificar si el codMerma ya está seleccionado
                  verificarMermaSelecionada(codMermaConfir).then(
                    (mermaSeleccionada) => {
                      if (mermaSeleccionada) {
                        // No hacer nada si la merma ya fue seleccionada
                      } else {
                        // Enviar código a la función porque no se encontró el valor en la variable global
                        mermaAddProducto(codMermaConfir);
                      }
                    }
                  );
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

//funcion para trear los productos de la merma aprobada
function mermaAddProducto(codMermaConfir) {
  var data = new FormData();
  data.append("codMermaConfir", codMermaConfir);
  //visualizar los datos
  $.ajax({
    url: "ajax/productoMerma.ajax.php",
    method: "POST",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (response) {
      if (response.hasOwnProperty("jsonMerma")) {
        ingresoMermaConfirmada(
          response["jsonMerma"],
          response["idMerma"],
          response["nombreMerma"]
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
    },
  });
}

// Uso de async/await en ingresoProductoEdit para esperar la respuesta de obtenerStock
function ingresoMermaConfirmada(jsonMerma, idMerma, nombreMerma) {
  // Decodificar el JSON recibido de la respuesta de visualizar datos
  const procesos = JSON.parse(jsonMerma);

  // Mostrar el modal de carga porque la promesa es asíncrona y espera la respuesta para crear el formulario
  // el usuario visualizará una demora en la carga de los datos
  Swal.fire({
    title: "Cargando...",
    text: "Por favor, espere mientras se procesan los datos.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  // Crear cabecera de formularios
  const cabezeraHTML = `
      <div class="row align-items-center mt-2" id="cabezeraMerma">
        <div class="col-lg-10">
          <label for="" class="form-label" style="font-weight: bold">Merma agregada</label>
          <!-- id del producto -->
          <input type="hidden" class="form-control" id="codMerma" value="${idMerma}">
          <!-- nombre del producto -->
          <input type="text" class="form-control" id="nombreMerma" value="${nombreMerma}" readonly>
        </div>
        <div class="col-lg-2 d-flex align-items-center">
          <button type="button" class="btn btn-danger btn-xs deleteCabezeraMerma" value="${idMerma}"><i class="fa fa-times"></i></button>
        </div>
      </div>
      <div class="w-100 my-2"></div>
    `;

  // Insertar la cabecera en el contenedor adecuado
  $(".AddMateriaPrimaMermad").append(cabezeraHTML);

  // Recorrer todos los arrays decodificados del JSON para crear un formulario por cada producto resuelto
  for (const proceso of Object.values(procesos)) {
    const {
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng,
      mermaDesechoEstado,
    } = proceso;

    // Insertar el formulario de producción directamente
    insertarFormularioMerma(
      codProdIng,
      nombreProdIng,
      codigoProdIng,
      unidadProdIng,
      cantidadProdIng,
      precioProdIng,
      mermaDesechoEstado,
      idMerma
    );
  }

  // Cerrar el modal de carga una vez que se haya completado el procesamiento
  Swal.close();
}

function insertarFormularioMerma(
  codProdIng,
  nombreProdIng,
  codigoProdIng,
  unidadProdIng,
  cantidadProdIng,
  precioProdIng,
  mermaDesechoEstado = 2, // utilizado // 1 = no utilizado = original data
  codMerma
) {
  // Llamar a validarCantidad después de que todos los parámetros estén definidos

  var formularioID = "formularioMprimaMerma" + formularioMprimaMerma++;
  var nuevoProductoHTML = `
    <form id="${formularioID}" class="row productoRowMerma" style="padding:5px 15px">
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
        <input type="number" class="form-control cantidadProdIng" id="cantidadProdIng" value="${cantidadProdIng}" min="1" step="1" readonly>
      </div>
      <!-- precio -->
      <div class="col-lg-2">
        <input type="text" class="form-control precioProdIng" id="precioProdIng" value="${precioProdIng}" data-original-precio="${precioProdIng}" readonly>
      </div>
      <!-- estado desecho merma value 1 = no usado 2 = utilizado -->
      <input type="hidden" class="form-control" id="mermaDesechoEstado" value="${mermaDesechoEstado}">
      <!-- boton de eliminar -->
     <div class="col-lg-1">
        <button type="button" class="btn btn-danger btn-xs deleteMprimaMermada" value="${formularioID}"><i class="fa fa-times"></i></button>
      </div>
    </form>
  `;

  // Agregar el nuevo formulario al contenedor
  $(".AddMateriaPrimaMermad").append(nuevoProductoHTML);

  // Agregar el código y formulario de la merma a la variable global
  mermasSelecionadas.push({ codMerma: parseInt(codMerma), formularioID });
}

// Función para eliminar un formulario específico
function deleteMprimaMermada(button) {
  // Obtener el valor del botón, que es el ID del formulario
  var formularioID = button.value;

  // Buscar el formulario en el DOM y eliminarlo
  var formulario = document.getElementById(formularioID);
  if (formulario) {
    formulario.remove();
  }

  // Buscar y eliminar el objeto correspondiente en la variable global
  mermasSelecionadas = mermasSelecionadas.filter(function (item) {
    return item.formularioID !== formularioID;
  });
}

// Función para eliminar una cabecera completa
function deleteCabezeraMerma(button) {
  // Obtener el valor del botón, que es el codMerma
  var codMerma = parseInt(button.value, 10);

  // Buscar y eliminar todos los formularios correspondientes en el DOM
  mermasSelecionadas.forEach(function (item) {
    if (item.codMerma === codMerma) {
      var formularioID = item.formularioID;
      var formulario = document.getElementById(formularioID);
      if (formulario) {
        formulario.remove();
      }
    }
  });

  // Buscar y eliminar todos los objetos correspondientes en la variable global
  mermasSelecionadas = mermasSelecionadas.filter(function (item) {
    return item.codMerma !== codMerma;
  });

  // Eliminar la cabecera del DOM
  document.getElementById("cabezeraMerma").remove();
}

// Asignar eventos a los botones de eliminar
document.addEventListener("DOMContentLoaded", function () {
  // Asignar evento a los botones de eliminar formulario específico
  document.querySelectorAll(".deleteMprimaMermada").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteMprimaMermada(button);
    });
  });

  // Asignar evento a los botones de eliminar cabecera completa
  document.querySelectorAll(".deleteCabezeraMerma").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteCabezeraMerma(button);
    });
  });
});

// Asignar eventos a los botones de eliminar dinámicamente
$(document).on("click", ".deleteMprimaMermada", function () {
  deleteMprimaMermada(this);
});

$(document).on("click", ".deleteCabezeraMerma", function () {
  deleteCabezeraMerma(this);
});
