// Crear ficha tecnica
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnica";
  if (currentPath == appPath) {
    //crear dato base 64 y enviarlo por ajax

    // Definición de la variable global para almacenar el Base64 y el nombre del archivo
    var fichaTecnicaData = {
      base64: null,
      nombreArchivo: null,
      extensionArchivo: null,
    };

    // Evento para abrir el diálogo de selección de archivo
    document
      .getElementById("btnfileFichaTecnica")
      .addEventListener("click", function () {
        document.getElementById("fileFichaTecnica").click();
      });

    // Evento para manejar el cambio de archivo y convertirlo a base64
    document
      .getElementById("fileFichaTecnica")
      .addEventListener("change", convertirArchivoABase64YGuardarComoJSON);

    // Función para convertir el archivo seleccionado a base64 y almacenarlo en la variable global
    function convertirArchivoABase64YGuardarComoJSON() {
      const file = document.getElementById("fileFichaTecnica").files[0];
      if (!file) {
        alert("No se ha seleccionado ningún archivo.");
        return;
      }

      updateProgressBar(0); // Inicia la barra de progreso en 0%
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        const base64 = loadEvent.target.result;
        // Extrae el nombre del archivo y su extensión
        const nombreCompletoArchivo = file.name;
        const extensionArchivo = nombreCompletoArchivo.slice(
          nombreCompletoArchivo.lastIndexOf(".") + 1
        );
        const nombreArchivo = nombreCompletoArchivo.slice(
          0,
          nombreCompletoArchivo.lastIndexOf(".")
        );
        // Almacena el resultado en base64 y el nombre del archivo en la variable global
        fichaTecnicaData.base64 = base64.split("base64,")[1];
        fichaTecnicaData.nombreArchivo = nombreArchivo;
        fichaTecnicaData.extensionArchivo = extensionArchivo;
        updateProgressBar(100); // Asegura que la barra de progreso muestre 100%
      };
      reader.readAsDataURL(file);
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar(percent) {
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = percent + "%";
      if (percent > 0 && percent < 100) {
        progressBar.textContent = "Cargando...";
      } else if (percent >= 100) {
        progressBar.textContent = "Completado";
      } else {
        progressBar.textContent = "";
      }
    }
    //fin crear dato base 64 y guardar como json en la variable global para enviarlo por ajax

    //si la ruta no es la correcta no se ejecuta la función
    document
      .getElementById("btnRegistrarFichaTecnica")
      .addEventListener("click", function (event) {
        //obtener el formulario por id
        var formulario = document.getElementById("formFichaTecnica");
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
        var jsonCrearfichaTecnica = JSON.stringify(datosFormulario);
        console.log(jsonCrearfichaTecnica);
        //llamar ala bafiable donde esta el json dela ficha tecninca y enviarlo junto al los datos  al servuidor
        var jsonFichaTecnicaBase64 = JSON.stringify(fichaTecnicaData);
        //console.log(jsonFichaTecnicaBase64);
        $.ajax({
          url: "ajax/fichaTecnica.ajax.php",
          method: "POST",
          data: {
            jsonCrearfichaTecnica: jsonCrearfichaTecnica,
            jsonFichaTecnicaBase64: jsonFichaTecnicaBase64,
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
                html: "Ficha Tecnica Creada Correctamente <br><strong>¿Desea Crear Otra?</strong> ",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL();
                  window.location.reload();
                } else {
                  window.location.href = "/dfrida/fichaTecnicaList";
                }
              });
            } else if (response == "errorForm") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear la Ficha Tecnica  verifique los siguentes datos <br><strong>Nombre Ficha, Fecha, Descripcion Ficha</strong>.",
                showCancelButton: true,
                confirmButtonText: "Ok",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL();
                } else {
                  window.location.href = "/dfrida/fichaTecnicaList";
                }
              });
            } else if (response == "errorFicha") {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear la Ficha Tecnica  el <strong>max_allowed_packet=1M</strong> no se modifico.",
                showCancelButton: true,
                confirmButtonText: "Ok",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL();
                } else {
                  window.location.href = "/dfrida/fichaTecnicaList";
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                html: "No se pudo crear la Ficha Tecnica<br><strong>Ingrese una Ficha Tecnica</strong>.",
                showCancelButton: true,
                confirmButtonText: "Ok",
                cancelButtonText: "No",
              }).then(function (result) {
                if (result.value) {
                  limpiarURL();
                } else {
                  window.location.href = "/dfrida/fichaTecnicaList";
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
      });
    //fin vericar ruta
  }
});
//fin crear ficha tecnica

//inicio edicion de ficha tecnica
// Enviar código a la vista de editar ficha técnica para visualizar los datos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaList";
  if (currentPath == appPath) {
    $(".dataTableFichaTenica").on("click", ".btnEditFichaTecnica", function () {
      var codFichaTec = $(this).attr("codFichaTec");
      // Usar la variable directamente en la URL de redirección
      window.location.href =
        "/dfrida/fichaTecnicaEdit?codFichaTec=" + codFichaTec;
    });
  }
});
// Fin
//tomar el valor de la ur y asignarlo al campo oculto
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaEdit";
  if (currentPath == appPath) {
    // Función para obtener el valor de un parámetro por nombre
    function getQueryParam(name) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.href);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Extraer el valor de 'codFichaTec' de la URL
    var codFichaTec = getQueryParam("codFichaTec");
    if (codFichaTec) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codFichaTec").value = codFichaTec;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //  editar ficha tecnica
    //obtener el valor guardado en el campo oculto cuando carga la pagina
    var codFichaTec = document.getElementById("codFichaTec").value;
    var data = new FormData();
    data.append("codFichaTec", codFichaTec);
    //visualizar los datos
    $.ajax({
      url: "ajax/fichaTecnica.ajax.php",
      method: "POST",
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      dataType: "json",
      success: function (response) {
        $("#codFichaTecEdit").val(response["idFichTec"]);
        $("#nombreFichaTecEdit").val(response["nombreFichaTec"]);
        $("#fechaFichaTecEdit").val(response["fechaFichaTec"]);
        $("#clienteFichaTecEdit").val(response["clienteFichaTec"]);
        $("#descripcionFichaTecEdit").val(response["descripcionFichaTec"]);
        $("#codigoFichaTecEdit").val(response["codigoFichaTec"]);
        $("#nombreSoliFichaTecEdit").val(response["nombreSoliFichaTec"]);
        $("#celularFichaTecEdit").val(response["celularFichaTec"]);
        $("#correoFichaTecEdit").val(response["correoFichaTec"]);
        $("#detalleFichaTecEdit").val(response["detalleFichaTec"]);
        $("#fichaTecDocEdit").val(response["docFichaTec"]);
        if (response.hasOwnProperty("docFichaTec")) {
          updateProgressBarEdit(100);
        }
      },

      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
      },
      // Función simplificada para actualizar la barra de progreso
    });
    function updateProgressBarEdit(percent) {
      const progressBar = document.getElementById("progressBarEdit");
      progressBar.style.width = percent + "%";
      progressBar.textContent = " Ficha Tecnica Existente ";
    }
    //fin visualizar los datos

    //crear dato base 64 y enviarlo por ajax

    // Definición de la variable global para almacenar el Base64 y el nombre del archivo
    var fichaTecnicaData = {
      base64: null,
      nombreArchivo: null,
      extensionArchivo: null,
    };

    // Evento para abrir el diálogo de selección de archivo
    document
      .getElementById("btnfileFichaTecnicaEdit")
      .addEventListener("click", function () {
        document.getElementById("fileFichaTecnicaEdit").click();
      });

    // Evento para manejar el cambio de archivo y convertirlo a base64
    document
      .getElementById("fileFichaTecnicaEdit")
      .addEventListener("change", convertirArchivoABase64YGuardarComoJSON);

    // Función para convertir el archivo seleccionado a base64 y almacenarlo en la variable global
    function convertirArchivoABase64YGuardarComoJSON() {
      const file = document.getElementById("fileFichaTecnicaEdit").files[0];
      if (!file) {
        alert("No se ha seleccionado ningún archivo.");
        return;
      }

      updateProgressBar(0); // Inicia la barra de progreso en 0%
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        const base64 = loadEvent.target.result;
        // Extrae el nombre del archivo y su extensión
        const nombreCompletoArchivo = file.name;
        const extensionArchivo = nombreCompletoArchivo.slice(
          nombreCompletoArchivo.lastIndexOf(".") + 1
        );
        const nombreArchivo = nombreCompletoArchivo.slice(
          0,
          nombreCompletoArchivo.lastIndexOf(".")
        );
        // Almacena el resultado en base64 y el nombre del archivo en la variable global
        fichaTecnicaData.base64 = base64.split("base64,")[1];
        fichaTecnicaData.nombreArchivo = nombreArchivo;
        fichaTecnicaData.extensionArchivo = extensionArchivo;
        updateProgressBar(100); // Asegura que la barra de progreso muestre 100%
      };
      reader.readAsDataURL(file);
    }

    // Función para actualizar la barra de progreso
    function updateProgressBar(percent) {
      const progressBar = document.getElementById("progressBarEdit");
      progressBar.style.width = percent + "%";
      if (percent > 0 && percent < 100) {
        progressBar.textContent = "Cargando...";
      } else if (percent >= 100) {
        progressBar.textContent = "Cambio Completo";
      } else {
        progressBar.textContent = "";
      }
    }
    //fin crear dato base 64 y guardar como json en la variable global para enviarlo por ajax

    $("#btnEditarFichaTecnica").on("click", function () {
      //obtener el formulario por id
      var formulario = document.getElementById("formEditarFcichaTecnica");
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
      var jsonEditarFichaTecnica = JSON.stringify(datosFormulario);
      //enviar el json por ajax
      //llamar ala bafiable donde esta el json dela ficha tecninca y enviarlo junto al los datos  al servuidor
      var jsonFichaTecnicaBase64 = JSON.stringify(fichaTecnicaData);
      $.ajax({
        url: "ajax/fichaTecnica.ajax.php",
        method: "POST",
        data: {
          jsonEditarFichaTecnica: jsonEditarFichaTecnica,
          jsonFichaTecnicaBase64: jsonFichaTecnicaBase64,
        },
        dataType: "json",
        success: function (response) {
          if (response == "ok") {
            Swal.fire(
              "Correcto",
              "Ficha Tecnica editada correctamente",
              "success"
            ).then(function () {
              window.location.href = "/dfrida/fichaTecnicaList";
            });
          } else {
            Swal.fire(
              "Error",
              "La ficha Tecnica no se ha podido editar",
              "error"
            ).then(function () {});
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    });
    //fin editar
  }
});
//fin

// eliminar Cotizacion
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaList";
  if (currentPath == appPath) {
    $(".dataTableFichaTenica").on(
      "click",
      ".btnDeleteFichaTecnica",
      function () {
        var codFichaTec = $(this).attr("codFichaTec");
        //mensaje de confirmación para eliminar ProductosMprima
        swal
          .fire({
            title: "¿Está seguro de borrar Ficha Tecnica ?",
            text: "¡No podrá revertir el cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, borrar Ficha Tecnica!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var jsonBorraFichaTecnica = JSON.stringify({
                codFichaTec: codFichaTec,
              });
              $.ajax({
                url: "ajax/fichaTecnica.ajax.php",
                method: "POST",
                data: { jsonBorraFichaTecnica: jsonBorraFichaTecnica },
                dataType: "json",
                success: function (response) {
                  if (response == "ok") {
                    Swal.fire(
                      "Correcto",
                      "Ficha Tecnica eliminada correctamente",
                      "success"
                    ).then(function () {
                      window.location.reload(); // Recargar la página
                    });
                  } else {
                    Swal.fire(
                      "Error",
                      "La Ficha Tecnica no se puede eliminar",
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
//fin eliminar

// bton de agregar ficha tecnica redirecciona a la vista de ficha tecnica
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaList";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnAddFichaTecnica");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTecnica";
      });
    }
  }
});

// bton de cerrar ficha tecnica redirecciona a la vista de fichas tecnicas
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnica";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarFichaTecnica");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTecnicaList";
      });
    }
  }
});

// bton de cerrar Editficha tecnica redirecciona a la vista de fichas tecnicas
document.addEventListener("DOMContentLoaded", function () {
  //si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaEdit";
  if (currentPath == appPath) {
    var btn = document.getElementById("btnCerrarEditFichaTecnica");
    if (btn) {
      btn.addEventListener("click", function () {
        window.location.href = "/dfrida/fichaTecnicaList";
      });
    }
  }
});
