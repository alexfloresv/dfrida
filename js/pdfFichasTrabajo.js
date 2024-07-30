// Descargar PDF de la cotización
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/fichaTrabajoList";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on(
      "click",
      ".btnDescargarFichaTrabajo",
      function () {
        var codFichTrab = $(this).attr("codFichTrab");
        //mensaje de confirmación descargar cotizacion
        //console.log("codFichTrab", codFichTrab);
        swal
          .fire({
            title: "Descargar Ficha Trabajo",
            html: "<strong><h2>PD'F</h2></strong>",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "En otro momento",
            confirmButtonText: "Si, Descargar",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var data = new FormData();

              data.append("codFichTrabView", codFichTrab);

              $.ajax({
                url: "ajax/fichaTrabajo.ajax.php",
                method: "POST",
                data: data,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (response) {
                  const datosFichaTrabajo = response;

                  const { jsPDF } = window.jspdf;
                  const doc = new jsPDF();

                  // Encabezado
                  doc.setFont("helvetica", "bold");
                  doc.setFontSize(16);
                  doc.text("D'Frida Collection", 14, 20);

                  doc.setFontSize(10);
                  doc.text("Ruc: 20605835032", 14, 25);
                  doc.text("Email: dfridacollection@gmail.com", 14, 30);
                  doc.text("Teléfono: 957 983 430", 14, 35);
                  doc.text(
                    "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                    14,
                    40
                  );

                  doc.setFont("helvetica", "bold");
                  doc.text("FICHA DE TRABAJO", 90, 50);

                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 53, 190, 53);

                  // Información adicional
                  doc.setFontSize(10);
                  doc.setFont("helvetica", "normal");
                  doc.text(
                    "Nombre Proceso: " + datosFichaTrabajo.tituloFichaProc,
                    14,
                    60
                  );
                  doc.text(
                    "Producto Proceso: " + datosFichaTrabajo.productoFichaProc,
                    14,
                    65
                  );
                  doc.text(
                    "Observacion: " + datosFichaTrabajo.detalleFichaProc,
                    14,
                    70
                  );

                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 75, 190, 75);

                  let finalY = 80; // Ajuste para el inicio de la tabla

                  let procesos = JSON.parse(datosFichaTrabajo.procesoFichaProcJson);
                  // Creación de la Tabla de Procesos
                  let filas = [];
                  Object.keys(procesos).forEach((key, index) => {
                    let proceso = procesos[key];
                    filas.push([
                      index + 1, // Número de secuencia, comenzando en 1
                      proceso.procesosAdd,
                      proceso.tiempoAdd,
                      proceso.observacionAdd,
                    ]);
                  });
                  
                  // Usar autoTable para agregar las filas a la tabla
                  doc.autoTable({
                    startY: finalY,
                    headStyles: {
                      fontSize: 10,
                      halign: "left",
                      fillColor: [200, 200, 200],
                    },
                    head: [["#", "Proceso", "Tiempo", "Observación"]],
                    body: filas,
                    didDrawPage: function (data) {
                      finalY = data.cursor.y; // Actualizar finalY después de dibujar la tabla
                    },
                  });

                  // Observación alineada con TOTAL
                  finalY += 10; // Ajuste para espacio antes de la observación
                  doc.setFont("helvetica", "bold");
                  doc.text("OBSERVACIÓN", 14, finalY);
                  doc.setFont("helvetica", "normal");
                  finalY += 5; // Ajuste para espacio antes del texto de la observación
                  let observacion = doc.splitTextToSize(
                    datosFichaTrabajo.detalleFichaProc,
                    180
                  ); // Ajusta el ancho según sea necesario
                  doc.text(observacion, 14, finalY);

                  // Guardar el PDF
                  doc.save(
                    `FichaTrabajo-D'Frida-${datosFichaTrabajo.tituloFichaProc}.pdf`
                  );
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
// Fin Descargar PDF de la cotización

// Descargar PDF modal tipo de proceso operativo
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/procesosOperativos";
  if (currentPath == appPath) {
    $(".dataTableFichaTrabajo").on(
      "click",
      ".btnDescargarFichaTrabajo",
      function () {
        var codFichTrab = $(this).attr("codFichTrab");
        //mensaje de confirmación descargar cotizacion
        //console.log("codFichTrab", codFichTrab);
        swal
          .fire({
            title: "Descargar Ficha Trabajo",
            html: "<strong><h2>PD'F</h2></strong>",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "En otro momento",
            confirmButtonText: "Si, Descargar",
          })
          .then((result) => {
            if (result.isConfirmed) {
              var data = new FormData();

              data.append("codFichTrabView", codFichTrab);

              $.ajax({
                url: "ajax/fichaTrabajo.ajax.php",
                method: "POST",
                data: data,
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (response) {
                  const datosFichaTrabajo = response;

                  const { jsPDF } = window.jspdf;
                  const doc = new jsPDF();

                  // Encabezado
                  doc.setFont("helvetica", "bold");
                  doc.setFontSize(16);
                  doc.text("D'Frida Collection", 14, 20);

                  doc.setFontSize(10);
                  doc.text("Ruc: 20605835032", 14, 25);
                  doc.text("Email: dfridacollection@gmail.com", 14, 30);
                  doc.text("Teléfono: 957 983 430", 14, 35);
                  doc.text(
                    "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                    14,
                    40
                  );

                  doc.setFont("helvetica", "bold");
                  doc.text("FICHA DE TRABAJO", 90, 50);

                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 53, 190, 53);

                  // Información adicional
                  doc.setFontSize(10);
                  doc.setFont("helvetica", "normal");
                  doc.text(
                    "Nombre Proceso: " + datosFichaTrabajo.tituloFichaProc,
                    14,
                    60
                  );
                  doc.text(
                    "Producto Proceso: " + datosFichaTrabajo.productoFichaProc,
                    14,
                    65
                  );
                  doc.text(
                    "Observacion: " + datosFichaTrabajo.detalleFichaProc,
                    14,
                    70
                  );

                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 75, 190, 75);

                  let finalY = 80; // Ajuste para el inicio de la tabla

                  let procesos = JSON.parse(datosFichaTrabajo.procesoFichaProcJson);
                  // Creación de la Tabla de Procesos
                  let filas = [];
                  Object.keys(procesos).forEach((key, index) => {
                    let proceso = procesos[key];
                    filas.push([
                      index + 1, // Número de secuencia, comenzando en 1
                      proceso.procesosAdd,
                      proceso.tiempoAdd,
                      proceso.observacionAdd,
                    ]);
                  });
                  
                  // Usar autoTable para agregar las filas a la tabla
                  doc.autoTable({
                    startY: finalY,
                    headStyles: {
                      fontSize: 10,
                      halign: "left",
                      fillColor: [200, 200, 200],
                    },
                    head: [["#", "Proceso", "Tiempo", "Observación"]],
                    body: filas,
                    didDrawPage: function (data) {
                      finalY = data.cursor.y; // Actualizar finalY después de dibujar la tabla
                    },
                  });

                  // Observación alineada con TOTAL
                  finalY += 10; // Ajuste para espacio antes de la observación
                  doc.setFont("helvetica", "bold");
                  doc.text("OBSERVACIÓN", 14, finalY);
                  doc.setFont("helvetica", "normal");
                  finalY += 5; // Ajuste para espacio antes del texto de la observación
                  let observacion = doc.splitTextToSize(
                    datosFichaTrabajo.detalleFichaProc,
                    180
                  ); // Ajusta el ancho según sea necesario
                  doc.text(observacion, 14, finalY);

                  // Guardar el PDF
                  doc.save(
                    `FichaTrabajo-D'Frida-${datosFichaTrabajo.tituloFichaProc}.pdf`
                  );
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
// Fin Descargar PDF de la cotización
