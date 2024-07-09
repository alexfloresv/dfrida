// Crear ficha tecnica
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnica";
  if (currentPath == appPath) {
    //inicio

    // escuchar el botn y tomar el archivo para enviarlo al servidor por php y guardarlo en el directorio
    var btnfileFichaTecnica = document.getElementById("btnfileFichaTecnica");
    btnfileFichaTecnica.addEventListener("click", function () {
      document.getElementById("fileFichaTecnica").click();
    });

    var fileFichaTecnica = document.getElementById("fileFichaTecnica");
    fileFichaTecnica.addEventListener("change", handleFileSelect);

    function handleFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        let nombreBaseArchivo = file.name.split(".").slice(0, -1).join("."); // Solo guarda el nombre base del archivo
        let extensionArchivo = "." + file.name.split(".").pop(); // Guarda la extensión del archivo, incluyendo el punto
    
        // Limpiar el nombre del archivo, eliminando caracteres no deseados excepto el guion bajo (_)
        nombreBaseArchivo = nombreBaseArchivo.replace(/[^a-zA-Z0-9._]/g, "");
    
        nombreArchivoSeleccionado = nombreBaseArchivo; // Actualiza la variable global con el nombre limpio
        extensionArchivoSeleccionado = extensionArchivo; // Actualiza la variable global con la extensión
    
        // Mostrar mensaje de carga
        Swal.fire({
          title: "Cargando la Ficha Técnica...",
          showConfirmButton: false,
          allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading();
          },
          didOpen: () => {
            // Seleccionar el icono de carga y aplicar estilos directamente
            const loader = document.querySelector(".swal2-loader");
            if (loader) {
              loader.style.width = "60px";
              loader.style.height = "60px";
            }
          },
        });
    
        // Cerrar el mensaje después de 2 segundos
        setTimeout(() => {
          Swal.close();
        }, 1000);
    
        // Actualizar la barra de progreso
        updateProgressBar(100); // Ejemplo de actualización de progreso
      }
    }

    function updateProgressBar(percent) {
      const progressBar = document.getElementById("progressBar");
      if (progressBar) {
        progressBar.style.width = percent + "%";
        progressBar.textContent = percent >= 100 ? "Completado" : "Cargando...";
      }
    }
    //fin enviar archivo con nuevo nombre al servidor php para guardar

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
        //nombre del archivo
        var jsonNombreArchivo = JSON.stringify(nombreArchivoSeleccionado);
        //extencion dela rchivo
        var jsonExtensionArchivo = JSON.stringify(extensionArchivoSeleccionado);

        $.ajax({
          url: "ajax/fichaTecnica.ajax.php",
          method: "POST",
          data: {
            jsonCrearfichaTecnica: jsonCrearfichaTecnica,
            jsonNombreArchivo: jsonNombreArchivo,
            jsonExtensionArchivo: jsonExtensionArchivo,
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
            // Verificar si la respuesta es un número el id del registro
            // Convierte response a una cadena para asegurar que .trim() funcione
            let responseStr = String(response).trim();
            // Verificar si la respuesta convertida a cadena es un número
            if (!isNaN(responseStr) && responseStr !== "") {
              // Asegura que la respuesta no esté vacía y sea un número
              let numero = parseInt(responseStr, 10); // Convierte la respuesta a un número entero
              let nombreArchivoModificado =
                numero + "_" + nombreArchivoSeleccionado; // Modifica el nombre del archivo

              // Llama a la función para enviar el archivo con el nuevo nombre
              enviarArchivoConNuevoNombre(nombreArchivoModificado);
              /* esperar un respuesta */
              //del servidor
              //y envia a otra vista despues de una respeusta
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
    //funcion apra envair el archivo ala funcion php que gaurdara ela rchivo en el directorio del sistema
    function enviarArchivoConNuevoNombre(nombreArchivoModificado) {
      var fileInput = document.getElementById("fileFichaTecnica");
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("nombreArchivo", nombreArchivoModificado); // Añade el nuevo nombre del archivo
        formData.append("fileFichaTecnica", file); // Añade el archivo

        $.ajax({
          url: "fichasTecnicas/guardarFichasTecnicas.php",
          type: "POST",
          data: formData,
          processData: false, // Evitar que jQuery procese los datos
          contentType: false, // Evitar que jQuery establezca el tipo de contenido
          success: function (response) {
            // Asumiendo que el servidor devuelve un objeto JSON con un campo "status"
            if (response.status === "ok") {
              Swal.fire({
                icon: "success",
                title: "Correcto",
                html: "Ficha Técnica Registrada <strong>Correctamente</strong>.",
                confirmButtonText: "Ok",
              }).then((result) => {
                window.location.href = "/dfrida/fichaTecnicaList";
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar la ficha técnica.",
              });
            }
          },
          error: function (xhr, status, error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un error al enviar el archivo.",
            });
          },
        });
      } else {
        console.log("No hay archivo seleccionado.");
      }
    }
    //fin enviar archivo
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
                  if (response == "error") {
                    Swal.fire(
                      "Error",
                      "No se pudo borrar la Ficha Tecnica",
                      "error"
                    );
                  } else {
                    //la respuesta trae el nombre del archivo a eliminar
                    $.ajax({
                      //enviar nombre a eliminar al servidor
                      url: "fichasTecnicas/eliminarFichasTecnicas.php",
                      method: "POST",
                      data: { docFichaTec: response.docFichaTec },
                      dataType: "json",
                      success: function (response) {
                        if (response.status === "ok") {
                          Swal.fire(
                            "Correcto",
                            "Ficha Tecnica eliminada correctamente.",
                            "success"
                          ).then(function () {
                            window.location.reload(); // Recargar la página.
                          });
                        } else {
                          // Manejo de una respuesta no exitosa de la segunda llamada AJAX.
                          Swal.fire(
                            "Error",
                            "La ficha tecnica no se pudo eliminar.",
                            "error"
                          ).then(function () {
                            window.location.reload(); // Recargar la página.
                          });
                        }
                      },
                      error: function (error) {
                        // Manejo de un error en la segunda llamada AJAX.
                        console.error("Error:", error);
                        Swal.fire(
                          "Error",
                          "La Ficha tecnica no se pudo eliminar.",
                          "error"
                        );
                      },
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
