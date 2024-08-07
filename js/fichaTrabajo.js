//agregar  lsita de trabajos a la ficha de trabajo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    document
      .getElementById("botonAbrirModalProceso")
      .addEventListener("click", function () {
        var contenidoModal = `
      <label for="procesosAdd" class="form-label" style="font-weight: bold">Nombre Proceso a Agregar:</label>
      <input type="text" class="form-control mb-3" id="procesosAddModal" name="procesosAdd" placeholder="Ingrese el nombre del proceso">
      <label for="tiempoAdd" class="form-label" style="font-weight: bold">Tiempo:</label>
      <input type="number" class="form-control mb-3" id="tiempoAddModal" name="tiempoAdd" placeholder="Ingrese tiempo en Horas/Dias  1Horas 1Dias">
      <select class="form-select" id="tiempoProduccion" name="tiempoProduccion">
      <option value="Horas">Horas</option>
      <option value="Dias">Dias</option>                              
      </select>
      <label for="observacionAdd" class="form-label" style="font-weight: bold">Observación:</label>
      <textarea class="form-control mb-3" id="observacionAddModal" name="observacionAdd" placeholder="Ingrese observacion de proceso de trabajo opcional" rows="4"></textarea>
      <br>`;
        document.getElementById("modalProcesoTrabajo").innerHTML =
          contenidoModal;
      });

    let formularioProcesoCounter = 0;

    document
      .getElementById("botonAgregarProceso")
      .addEventListener("click", function () {
        var nombreProceso = document.getElementById("procesosAddModal");
        var tiempoProceso = document.getElementById("tiempoAddModal");
        var tiempoProduccion = document.getElementById("tiempoProduccion"); // Obtener el valor del select
        var observacionProceso = document.getElementById("observacionAddModal");
        // Contar campos vacíos
        var camposVacios = [
          nombreProceso,
          tiempoProceso,
          observacionProceso,
        ].reduce((acc, input) => {
          if (input.value.trim() === "") {
            input.classList.add("is-invalid");
            return acc + 1;
          } else {
            input.classList.remove("is-invalid");
            return acc;
          }
        }, 0);

        if (camposVacios === 3) {
          return;
        }

        // Concatenar el valor del select al valor del tiempo
        var tiempoConUnidad = `${tiempoProceso.value} ${tiempoProduccion.value}`;

        // Crear un nuevo formulario para el proceso con un ID único
        var formularioID = "formularioProceso" + formularioProcesoCounter++;
        var nuevoProductoHTML = `
        <form id="${formularioID}" class="row procesoRow" style="padding:5px 15px">
          <div class="col-lg-4">
            <input type="text" class="form-control " id="procesosAdd" value="${nombreProceso.value}" >
          </div>
          <div class="col-lg-2">
            <input type="text" class="form-control " id="tiempoAdd" value="${tiempoConUnidad}" >
          </div>
          <div class="col-lg-4">
            <input type="text" class="form-control " id="observacionAdd" value="${observacionProceso.value}">
          </div>
          <div class="col-lg-1">
            <button type="button" class="btn btn-danger btn-xs deleteProcesoAdd"><i class="fa fa-times"></i></button>
          </div>
        </form>`;
        $(".AddProcesoTrabajo").append(nuevoProductoHTML);
        // Limpiar campos del modal
        nombreProceso.value = "";
        tiempoProceso.value = "";
        observacionProceso.value = "";
        tiempoProduccion.value = "Horas"; // Resetear el select a su valor por defecto
      });
    // Eliminar el producto
    $(document).on("click", ".deleteProcesoAdd", function () {
      $(this).closest(".procesoRow").remove();
    });
  }
});

//crear ficha de trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    document
      .getElementById("btnRegistrarFichaTrabajo")
      .addEventListener("click", function () {
        //recolectar los datos del formulario principal
        var formulario = document.getElementById("formProcesoTrabajo");
        var datosFormulario = {};
        var elementosFormulario = formulario.querySelectorAll(
          "input, select, textarea"
        );
        elementosFormulario.forEach(function (elemento) {
          if (elemento.id) {
            datosFormulario[elemento.id] = elemento.value;
          }
        });
        // Crear un JSON con los datos recolectados del formulario principal
        var jsonCrearProcesoTrabajo = JSON.stringify(datosFormulario);

        // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS y PRODUCTOS PRIMA
        recojerFormulariosAnidadosProcesosTrabajo(function (
          datosFormulariosProcesos
        ) {
          // Crear un JSON con los datos recolectados de los formularios anidados
          var jsonProcesosTrabajo = JSON.stringify(datosFormulariosProcesos);

          $.ajax({
            url: "ajax/fichaTrabajo.ajax.php",
            method: "POST",
            data: {
              jsonCrearProcesoTrabajo: jsonCrearProcesoTrabajo,
              jsonProcesosTrabajo: jsonProcesosTrabajo,
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
                  html: "Proceso Trabajo Creado Correctamente <strong>¿Desea Crear Otra?</strong> ",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL(); // Llamar a la función para limpiar la URL
                    window.location.reload(); // Recargar la página
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
                  }
                });
              } else if (response == "error0") {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "El proceso ya existe <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL();
                    window.location.reload();
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
                  }
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  html: "No se pudo crear el proceso <strong>¿Desea Crear Otra?</strong>.",
                  showCancelButton: true,
                  confirmButtonText: "Si",
                  cancelButtonText: "No",
                }).then(function (result) {
                  if (result.value) {
                    limpiarURL();
                    window.location.reload();
                  } else {
                    window.location.href = "/dfrida/fichaTrabajoList";
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

        function recojerFormulariosAnidadosProcesosTrabajo(callback) {
          let datosFormulariosProcesos = {};

          $("[id^=formularioProceso]").each(function (index) {
            let datosFormulario = {};
            $(this)
              .find("input, select")
              .each(function () {
                if (this.id) {
                  datosFormulario[this.id] = $(this).val();
                }
              });
            datosFormulariosProcesos["procesoTrabajo" + index] =
              datosFormulario;
          });

          // Llamar al callback con los datos recolectados
          if (callback && typeof callback === "function") {
            callback(datosFormulariosProcesos);
          }
        }
        //fin
      });
  }
});

//inicio edicion de ficha tecnica
// Enviar código a la vista de editar ficha técnica para visualizar los datos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on(
      "click",
      ".btnEditFichaTrabajo",
      function () {
        var codFichTrab = $(this).attr("codFichTrab");
        // Usar la variable directamente en la URL de redirección
        window.location.href =
          "/dfrida/fichaTrabajoEdit?codFichTrab=" + codFichTrab;
      }
    );
  }
});
// Fin

//tomar el valor de la ur y asignarlo al campo oculto
function getQueryParam(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//variable gloval para contar los formularios de procesos de trabajo de edit a agregar lo que llegan de respeusta y los nuevos que sea greagaran
window.formularioProcesoCounterEdit = 0;

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoEdit";
  if (currentPath == appPath) {
    // Función para obtener el valor de un parámetro por nombre

    // Extraer el valor de 'codFichaTec' de la URL
    var codFichTrab = getQueryParam("codFichTrab");
    if (codFichTrab) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codFichTrab").value = codFichTrab;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //  editar ficha tecnica
    //obtener el valor guardado en el campo oculto cuando carga la pagina
    var codFichTrab = document.getElementById("codFichTrab").value;
    var data = new FormData();
    data.append("codFichTrabView", codFichTrab);
    //visualizar los datos
    $.ajax({
      url: "ajax/fichaTrabajo.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        $("#codFichTrab").val(response["idFichaProc"]);
        $("#tituloProcesEdit").val(response["tituloFichaProc"]);
        $("#productoFichaProcEdit").val(response["productoFichaProc"]);
        $("#detalleFichaProcEdit").val(response["detalleFichaProc"]);
        if (response.hasOwnProperty("procesoFichaProcJson")) {
          procesosTrabajoEdit(response["procesoFichaProcJson"]);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
      // Función simplificada para actualizar la barra de progreso
    });

    function procesosTrabajoEdit(procesoFichaProcJson) {
      // Decodificar el JSON recibido
      const procesos = JSON.parse(procesoFichaProcJson);
      //var formularioProcesoCounter = 0;
      // Insertar datos automáticamente
      Object.values(procesos).forEach((proceso) => {
        const { procesosAdd, tiempoAdd, observacionAdd } = proceso;
        insertarFormulario(procesosAdd, tiempoAdd, observacionAdd);
      });
    }

    function insertarFormulario(
      nombreProceso,
      tiempoProceso,
      observacionProceso
    ) {
      var formularioID = "formularioProceso" + formularioProcesoCounterEdit++;
      var nuevoProductoHTML = `
        <form id="${formularioID}" class="row procesoRow" style="padding:5px 15px">
          <div class="col-lg-4">
            <input type="text" class="form-control " id="procesosAdd" value="${nombreProceso}" >
          </div>
          <div class="col-lg-2">
            <input type="text" class="form-control " id="tiempoAdd" value="${tiempoProceso}" >
          </div>
          <div class="col-lg-4">
            <input type="text" class="form-control " id="observacionAdd" value="${observacionProceso}">
          </div>
          <div class="col-lg-1">
            <button type="button" class="btn btn-danger btn-xs deleteProcesoAdd"><i class="fa fa-times"></i></button>
          </div>
        </form>`;

      $(".AddProcesoTrabajo").append(nuevoProductoHTML);
    }

    $("#btnEditarFichaTrabajo").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formProcesoTrabajoEdit");
      var datosFormulario = {};
      //obtener los elementos del formulario
      var elementosFormulario = formulario.querySelectorAll(
        "input, select, textarea"
      );
      //for each para recorrer los elementos del formulario y asignarle la clave como su id y su valor
      elementosFormulario.forEach(function (elemento) {
        if (elemento.id) {
          datosFormulario[elemento.id] = elemento.value;
        }
      });
      //crear el json
      var jsonEditarFichaTrabajo = JSON.stringify(datosFormulario);

      // Llamada a la función para recolectar datos de formularios anidados PRODUCTOS y PRODUCTOS PRIMA
      recojerFormulariosAnidadosProcesosTrabajoEdit(function (
        datosFormulariosProcesos
      ) {
        // Crear un JSON con los datos recolectados de los formularios anidados
        var jsonProcesosTrabajoEdit = JSON.stringify(datosFormulariosProcesos);

        $.ajax({
          url: "ajax/fichaTrabajo.ajax.php",
          method: "POST",
          data: {
            jsonEditarFichaTrabajo: jsonEditarFichaTrabajo,
            jsonProcesosTrabajoEdit: jsonProcesosTrabajoEdit,
          },
          dataType: "json",
          success: function (response) {
            if (response == "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Ficha Trabajo Editada Correctamente",
              }).then(function () {
                window.location.href = "/dfrida/fichaTrabajoList";
              });
            } else {
              Swal.fire(
                "Error",
                "La ficha Trabajo no se ha podido editar",
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

      function recojerFormulariosAnidadosProcesosTrabajoEdit(callback) {
        let datosFormulariosProcesos = {};

        $("[id^=formularioProceso]").each(function (index) {
          let datosFormulario = {};
          $(this)
            .find("input, select")
            .each(function () {
              if (this.id) {
                datosFormulario[this.id] = $(this).val();
              }
            });
          datosFormulariosProcesos["procesoTrabajo" + index] = datosFormulario;
        });

        // Llamar al callback con los datos recolectados
        if (callback && typeof callback === "function") {
          callback(datosFormulariosProcesos);
        }
      }
      //fin
    });
  }
});
//fin

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoEdit";
  if (currentPath == appPath) {
    document
      .getElementById("botonAbrirModalProceso")
      .addEventListener("click", function () {
        var contenidoModal = `
      <label for="procesosAdd" class="form-label" style="font-weight: bold">Nombre Proceso a Agregar:</label>
      <input type="text" class="form-control mb-3" id="procesosAddModal" name="procesosAdd" placeholder="Ingrese el nombre del proceso">
      <label for="tiempoAdd" class="form-label" style="font-weight: bold">Tiempo:</label>
      <input type="number" class="form-control mb-3" id="tiempoAddModal" name="tiempoAdd" placeholder="Ingrese tiempo en Horas/Dias  1Horas 1Dias">
      <select class="form-select" id="tiempoProduccion" name="tiempoProduccion">
      <option value="Horas">Horas</option>
      <option value="Dias">Dias</option>                              
      </select>
      <label for="observacionAdd" class="form-label" style="font-weight: bold">Observación:</label>
      <textarea class="form-control mb-3" id="observacionAddModal" name="observacionAdd" placeholder="Ingrese observacion de proceso de trabajo opcional" rows="4"></textarea>
      <br>`;
        document.getElementById("modalProcesoTrabajo").innerHTML =
          contenidoModal;
      });

    //let formularioProcesoCounter = 0;

    document
      .getElementById("botonAgregarProceso")
      .addEventListener("click", function () {
        var nombreProceso = document.getElementById("procesosAddModal");
        var tiempoProceso = document.getElementById("tiempoAddModal");
        var tiempoProduccion = document.getElementById("tiempoProduccion"); // Obtener el valor del select
        var observacionProceso = document.getElementById("observacionAddModal");
        // Contar campos vacíos
        var camposVacios = [
          nombreProceso,
          tiempoProceso,
          observacionProceso,
        ].reduce((acc, input) => {
          if (input.value.trim() === "") {
            input.classList.add("is-invalid");
            return acc + 1;
          } else {
            input.classList.remove("is-invalid");
            return acc;
          }
        }, 0);

        if (camposVacios === 3) {
          return;
        }

        // Concatenar el valor del select al valor del tiempo
        var tiempoConUnidad = `${tiempoProceso.value} ${tiempoProduccion.value}`;

        // Crear un nuevo formulario para el proceso con un ID único
        var formularioID = "formularioProceso" + formularioProcesoCounterEdit++;
        var nuevoProductoHTML = `
        <form id="${formularioID}" class="row procesoRow" style="padding:5px 15px">
          <div class="col-lg-4">
            <input type="text" class="form-control " id="procesosAdd" value="${nombreProceso.value}" >
          </div>
          <div class="col-lg-2">
            <input type="text" class="form-control " id="tiempoAdd" value="${tiempoConUnidad}" >
          </div>
          <div class="col-lg-4">
            <input type="text" class="form-control " id="observacionAdd" value="${observacionProceso.value}">
          </div>
          <div class="col-lg-1">
            <button type="button" class="btn btn-danger btn-xs deleteProcesoAdd"><i class="fa fa-times"></i></button>
          </div>
        </form>`;
        $(".AddProcesoTrabajo").append(nuevoProductoHTML);
        // Limpiar campos del modal
        nombreProceso.value = "";
        tiempoProceso.value = "";
        observacionProceso.value = "";
        tiempoProduccion.value = "Horas"; // Resetear el select a su valor por defecto
      });
    // Eliminar el producto
    $(document).on("click", ".deleteProcesoAdd", function () {
      $(this).closest(".procesoRow").remove();
    });
  }
});

// eliminar ficha de trabajo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on(
      "click",
      ".btnDeleteFichaTrabajo",
      function () {
        var codFichTrab = $(this).attr("codFichTrab");

        swal
          .fire({
            title: "¿Está seguro de borrar Ficha Trabajo?",
            text: "¡No podrá revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, borrar Ficha de Trabajo!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var jsonBorraFichaTrabajo = JSON.stringify({
                codFichTrab: codFichTrab,
              });
              $.ajax({
                url: "ajax/fichaTrabajo.ajax.php",
                method: "POST",
                data: { jsonBorraFichaTrabajo: jsonBorraFichaTrabajo },
                dataType: "json",
                success: function (response) {
                  if (response == "ok") {
                    Swal.fire(
                      "Confirmación",
                      "Ficha de Trabajo eliminada correctamente.",
                      "success"
                    ).then(function () {
                      window.location.reload(); // Recargar la página solo si la respuesta es "ok".
                    });
                  } else {
                    // Manejo de una respuesta no exitosa de la llamada AJAX.
                    Swal.fire(
                      "Error",
                      "La Ficha de Trabajo no se pudo eliminar Se esta usando en un Proceso Operativo Solo Puede editarla.",
                      "error"
                    );
                  }
                },
                error: function (error) {
                  // Manejo de un error en la llamada AJAX.
                  console.error("Error:", error);
                  Swal.fire(
                    "Error",
                    "La Ficha técnica no se pudo eliminar.",
                    "error"
                  );
                },
              });
            }
          });
      }
    );
  }
});
//fin eliminar

// bton de agregar ficha trabajo redirecciona a la vista de ficha trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddFichaTrabajo");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTrabajo";
      });
    }
  }
});

// bton de cerrar ficha trabajo redirecciona a la vista de fichas trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajo";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarFichaTrabajo");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTrabajoList";
      });
    }
  }
});

// bton de cerrar ficha trabajo redirecciona a la vista de fichas trabajo
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoEdit";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarFichaTrabajoEdit");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTrabajoList";
      });
    }
  }
});
