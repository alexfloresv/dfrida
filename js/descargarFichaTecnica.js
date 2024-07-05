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
            var data = JSON.parse(response.docFichaTec);

            // Asegurarse de que el base64 esté correctamente codificado.
            var base64 = data.base64.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            try {
              // Convertir el código base64 a un Blob.
              var binary = atob(base64); // Decodifica el base64 a binario.
              var array = [];
              for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
              }
              var blob = new Blob([new Uint8Array(array)], {
                type: "application/octet-stream", // Aquí podrías ajustar el tipo según el archivo.
              });

              // Crear un archivo ZIP y añadir el archivo convertido desde el base64.
              var zip = new JSZip();
              // Construir el nombre del archivo con su extensión.
              var fileName = data.nombreArchivo + "." + data.extensionArchivo;
              zip.file(fileName, blob);

              Swal.fire({
                title: "Descargando Ficha Tecnica...",
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

              // Generar el ZIP.
              zip
                .generateAsync({ type: "blob" })
                .then(function (content) {
                  // Descomprimir el ZIP.
                  JSZip.loadAsync(content).then(function (unzipped) {
                    // Acceder al archivo específico dentro del ZIP.
                    unzipped
                      .file(fileName)
                      .async("blob")
                      .then(function (fileContent) {
                        // Crear un enlace temporal y descargar el archivo.
                        var tempLink = document.createElement("a");
                        tempLink.href = window.URL.createObjectURL(fileContent);
                        tempLink.setAttribute("download", fileName);
                        tempLink.click();

                        // Cerrar el mensaje de swal2 automáticamente después de la descarga.
                        Swal.close();

                        // Recargar la página.
                        window.location.reload();
                      });
                  });
                })
                .catch(function (e) {
                  console.error(
                    "Error al decodificar el base64, al generar el ZIP, o al descomprimir:",
                    e
                  );
                  // Cerrar el mensaje si ocurre un error.
                  Swal.close();
                });
            } catch (e) {
              console.error(
                "Error al decodificar el base64, al generar el ZIP, o al descomprimir:",
                e
              );
            }
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
