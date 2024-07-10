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

    // Inicializar variables globales como vacías
    nombreArchivoSeleccionado = "";
    extensionArchivoSeleccionado = "";

    function handleFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        let nombreBaseArchivo = file.name.split(".").slice(0, -1).join("."); // Solo guarda el nombre base del archivo
        //console.log(nombreBaseArchivo);
        let extensionArchivo = "." + file.name.split(".").pop(); // Guarda la extensión del archivo, incluyendo el punto
        //console.log(extensionArchivo);
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

    //fin vericar ruta
  }
});
//fin crear ficha tecnica

//funcion apra envair el archivo ala funcion php que gaurdara ela rchivo en el directorio del sistema
function enviarArchivoConNuevoNombre(nombreArchivoModificado) {
  var fileInput = document.getElementById("fileFichaTecnica");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
   // console.log("Archivo a enviar:", file); // Visualizar el archivo en la consola

    const formData = new FormData();
    formData.append("nombreArchivo", nombreArchivoModificado); // Añade el nuevo nombre del archivo
    formData.append("fileFichaTecnica", file); // Añade el archivo

    // Visualizar el contenido de FormData
  /*   formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    }); */
    $.ajax({
      url: "fichasTecnicas/guardarFichasTecnicas.php",
      type: "POST",
      data: formData,
      processData: false, // Evitar que jQuery procese los datos
      contentType: false, // Evitar que jQuery establezca el tipo de contenido
      success: function (response) {
        function mostrarMensaje(index) {
          // Verificar si el índice está fuera del rango del array de respuestas
          if (index >= response.length) return;

          let item = response[index];
          let icono = item.status === "ok" ? "success" : "error";
          let titulo = item.status === "ok" ? "Éxito" : "Error";

          // Mostrar el mensaje actual
          Swal.fire({
            icon: icono,
            title: titulo,
            html: item.message,
          }).then(() => {
            // Una vez cerrado el mensaje actual, mostrar el siguiente
            mostrarMensaje(index + 1);
          });
        }

        // Iniciar la cadena de mensajes desde el primer elemento
        mostrarMensaje(0);
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
function getQueryParam(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//variabla  del nombre anteriro del la ficha tecnica
var globalDocFichaTec = null;

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaEdit";
  if (currentPath == appPath) {
    // Función para obtener el valor de un parámetro por nombre

    // Extraer el valor de 'codFichaTec' de la URL
    var codFichaTec = getQueryParam("codFichaTec");
    if (codFichaTec) {
      // Asignar el valor extraído al campo oculto
      document.getElementById("codFichaTec").value = codFichaTec;

      // Eliminar el parámetro 'codFichaTec' de la URL
      var newUrl = window.location.pathname;
      history.replaceState(null, "", newUrl);
    }

    //variabla para el nombre del nuevo archivo
    var globalIdFichaTec = null;

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
        globalIdFichaTec = response["idFichaTec"];
        globalDocFichaTec = response["docFichaTec"];
        $("#codFichaTecEdit").val(response["idFichaTec"]);
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

    //inicio editar ficha tecnica
    // escuchar el botn y tomar el archivo para enviarlo al servidor por php y guardarlo en el directorio
    var btnfileFichaTecnicaEdit = document.getElementById(
      "btnfileFichaTecnicaEdit"
    );
    btnfileFichaTecnicaEdit.addEventListener("click", function () {
      document.getElementById("fileFichaTecnicaEdit").click();
    });

    var fileFichaTecnicaEdit = document.getElementById("fileFichaTecnicaEdit");
    fileFichaTecnicaEdit.addEventListener("change", handleFileSelect);
    // Inicializar variables globales como vacías
    nombreArchivoSeleccionadoEdit = "";
    extensionArchivoSeleccionadoEdit = "";

    function handleFileSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        let nombreBaseArchivoEdit = file.name.split(".").slice(0, -1).join("."); // Solo guarda el nombre base del archivo
        console.log(nombreBaseArchivoEdit);
        let extensionArchivoEdit = "." + file.name.split(".").pop(); // Guarda la extensión del archivo, incluyendo el punto
        console.log(extensionArchivoEdit);

        // Limpiar el nombre del archivo, eliminando caracteres no deseados excepto el guion bajo (_)
        nombreBaseArchivoEdit = nombreBaseArchivoEdit.replace(
          /[^a-zA-Z0-9._]/g,
          ""
        );

        nombreArchivoSeleccionadoEdit = nombreBaseArchivoEdit; // Actualiza la variable global con el nombre limpio
        extensionArchivoSeleccionadoEdit = extensionArchivoEdit; // Actualiza la variable global con la extensión

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
      } else {
        // Aquí puedes manejar el caso en que no se seleccionen archivos
        // Por ejemplo, mostrar un mensaje o realizar alguna acción específica
        console.log("No se ha seleccionado ningún archivo.");
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
      //nombre del archivo
      var jsonNombreArchivo = JSON.stringify(nombreArchivoSeleccionadoEdit);
      //extencion dela rchivo
      var jsonExtensionArchivo = JSON.stringify(
        extensionArchivoSeleccionadoEdit
      );

      $.ajax({
        url: "ajax/fichaTecnica.ajax.php",
        method: "POST",
        data: {
          jsonEditarFichaTecnica: jsonEditarFichaTecnica,
          jsonNombreArchivo: jsonNombreArchivo,
          jsonExtensionArchivo: jsonExtensionArchivo,
        },
        dataType: "json",
        success: function (response) {
          nombreArchivoSeleccionadoEdit = nombreArchivoSeleccionadoEdit.trim();

          extensionArchivoSeleccionadoEdit =
            extensionArchivoSeleccionadoEdit.trim();

          if (response == "ok") {
            if (
              nombreArchivoSeleccionadoEdit === "" ||
              extensionArchivoSeleccionadoEdit === ""
            ) {
              Swal.fire(
                "Correcto",
                "Ficha Tecnica editada correctamente",
                "success"
              ).then(function () {
                window.location.href = "/dfrida/fichaTecnicaList";
              });
            } else {
              let nombreArchivoModificadoEdit =
                globalIdFichaTec + "_" + nombreArchivoSeleccionadoEdit;

              enviarArchivoConNuevoNombreEdit(nombreArchivoModificadoEdit);
            }
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

function enviarArchivoConNuevoNombreEdit(nombreArchivoModificadoEdit) {
  var fileInput = document.getElementById("fileFichaTecnicaEdit");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("nombreArchivoEliminar", globalDocFichaTec); // nombre anterior del archivo
    formData.append("nombreArchivoEdit", nombreArchivoModificadoEdit); // Añade el nuevo nombre del archivo
    formData.append("fileFichaTecnicaEdit", file); // Añade el archivo

    $.ajax({
      url: "fichasTecnicas/editarFichasTecnicas.php",
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
            html: "Ficha Técnica Editada con <strong>Exito</strong>.",
            confirmButtonText: "Ok",
          }).then((result) => {
            window.location.href = "/dfrida/fichaTecnicaList";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo editar la ficha técnica.",
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

// Descargar ficha tecnica
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTecnicaList";
  if (currentPath === appPath) {
    // Asegúrate de que el selector para dataTableFichaTenica es correcto y existe en tu HTML
    $(".dataTableFichaTenica").on(
      "click",
      ".btnDescargarFichaTecnica",
      function () {
        var codFichaTec = $(this).attr("codFichaTec");
        var jsonDescargarFichaTecnica = JSON.stringify({
          codFichaTec: codFichaTec,
        });
        $.ajax({
          url: "ajax/fichaTecnica.ajax.php",
          method: "POST",
          data: { jsonDescargarFichaTecnica: jsonDescargarFichaTecnica },
          dataType: "json",
          success: function (response) {
            // Acceder al JSON usando el identificador docFichaTec.
            $.ajax({
              //enviar nombre a eliminar al servidor
              url: "fichasTecnicas/descargaFichasTecnicas.php",
              method: "POST",
              data: { docFichaTec: response.docFichaTec },
              dataType: "json",
              success: function (response) {
                if (response.status === "success") {
                  Swal.fire({
                    title: "Descargando Ficha Técnica...",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    willOpen: () => {
                      Swal.showLoading();
                    },
                    didOpen: () => {
                      const loader = document.querySelector(".swal2-loader");
                      if (loader) {
                        loader.style.width = "60px";
                        loader.style.height = "60px";
                      }
                    },
                  });

                  // Crea un elemento <a> temporal para descargar el archivo
                  var link = document.createElement("a");
                  link.href = response.url;

                  // Extrae el nombre del archivo de la URL
                  var nombreArchivoOriginal = response.url.split("/").pop();

                  // Elimina todo lo que esté antes del primer "_" incluido el "_"
                  var nombreArchivoModificado = nombreArchivoOriginal.substring(
                    nombreArchivoOriginal.indexOf("_") + 1
                  );
                  // El atributo 'download' se usa para asignar el nuevo nombre al archivo descargado
                  link.download = nombreArchivoModificado; // Asigna el nuevo nombre al archivo

                  document.body.appendChild(link); // Agrega el enlace al documento
                  link.click(); // Simula un clic en el enlace para iniciar la descarga
                  document.body.removeChild(link); // Elimina el enlace del documento

                  // Espera 1 segundo antes de cerrar el mensaje y recargar la página
                  setTimeout(() => {
                    Swal.close();
                    window.location.reload(); // Recargar la página.
                  }, 500); // 1000 milisegundos = 1 segundo
                  //
                } else {
                  // Manejo de una respuesta no exitosa de la segunda llamada AJAX.
                  Swal.fire(
                    "Error",
                    "La ficha técnica no se pudo descargar.",
                    "error"
                  );
                }
              },
              error: function (error) {
                // Manejo de un error en la segunda llamada AJAX.
                console.error("Error:", error);
                Swal.fire(
                  "Error",
                  "La Ficha tecnica eror de errores.",
                  "error"
                );
              },
            });
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText); // Procedencia de error
            console.log(
              "Error en la solicitud AJAX: ",
              textStatus,
              errorThrown
            );
          },
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
