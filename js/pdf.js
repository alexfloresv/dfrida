// Descargar PDF de la cotización
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/cotizacionList";
  if (currentPath == appPath) {
    $(".dataTableCotizaciones").on("click", ".btnDescargarCoti", function () {
      var codCoti = $(this).attr("codCoti");
      //mensaje de confirmación descargar cotizacion
      swal
        .fire({
          title: "Descargar Cotizacion",
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
            var jsonPdfCotizacion = JSON.stringify({
              codCoti: codCoti,
            });
            $.ajax({
              url: "ajax/cotizacion.ajax.php",
              method: "POST",
              data: { jsonPdfCotizacion: jsonPdfCotizacion },
              dataType: "json",
              success: function (response) {
                const datosCotizacion = response;

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
                doc.text("Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES", 14, 40);

                // Cargar y agregar la imagen como fondo del documento
                var imgBackground = new Image();
                imgBackground.src = "/dfrida/assets/img/dfridaLogin.png";

                imgBackground.onload = function () {
                  // Obtener el ancho y alto de la página del documento PDF
                  var pageWidth = doc.internal.pageSize.getWidth();
                  var pageHeight = doc.internal.pageSize.getHeight();
                  // Añadir la imagen como fondo
                  doc.addImage(this, "JPEG", 0, 0, pageWidth, pageHeight);
                };
                imgBackground.onerror = function () {
                  console.error(
                    "No se pudo cargar la imagen de fondo. Verifique la ruta."
                  );
                };
                // fin de la imagen de fondo
                doc.setFont("helvetica", "bold");
                doc.text("COTIZACIÓN", 90, 50);
                // Línea separadora
                doc.setLineWidth(0.5);
                doc.line(14, 53, 190, 53);

                // Detalles de la cotización
                doc.setFont("helvetica", "normal");
                doc.text(
                  "Cotizacion: " + datosCotizacion.tituloCoti,
                  14,
                  60
                );
                doc.text("RUC: " + datosCotizacion.rucCoti, 14, 65);
                doc.text(
                  "Razón Social: " + datosCotizacion.razonSocialCoti,
                  14,
                  70
                );
                //
                doc.text(
                  "Nombre Comercial: " + datosCotizacion.nombreComercialCoti,
                  14,
                  75
                );
                doc.text("Fecha: " + datosCotizacion.fechaCoti, 140, 80);
                // Línea separadora
                doc.setLineWidth(0.5);
                doc.line(14, 82, 190, 82);
                // Información adicional
                doc.setFont("helvetica", "bold");

                doc.text(
                  "Nombre Cliente: " + datosCotizacion.nombreCoti,
                  14,
                  87
                );
                doc.text("Celular: " + datosCotizacion.celularCoti, 140, 87);
                doc.text("Correo: " + datosCotizacion.correoCoti, 14, 92);
                doc.text("Dirección: " + datosCotizacion.direccionCoti, 14, 97);

                // Línea separadora
                doc.setLineWidth(0.5);
                doc.line(14, 99, 190, 99);
                // Después de la información adicional, inicializa finalY

                let finalY = 95 + 10; // Asumiendo que 95 es la última posición Y después de la información adicional, ajusta según sea necesario

                // Parsear los productos una sola vez
                const productos = JSON.parse(datosCotizacion.productsCoti);

                // Preparar las filas para autoTable
                let filas = [];

                Object.keys(productos).forEach((key) => {
                  let producto = productos[key];

                  filas.push([
                    producto.nombreProdCoti,
                    producto.unidadProdCoti,
                    producto.cantidadProdCoti,
                    producto.precioProdCoti,
                  ]);
                });

                // Usar autoTable para agregar las filas a la tabla
                doc.autoTable({
                  startY: finalY,
                  headStyles: {
                    fontSize: 12,
                    halign: "left",
                    fillColor: [200, 200, 200],
                  },
                  head: [["Nombre Producto", "Unidad", "Cantidad", "Precio S/"]],
                  body: filas,
                  // Agrega aquí más opciones de configuración según sea necesario
                });

                // Asegúrate de ajustar las propiedades de los productos y las opciones de autoTable según tus necesidades

                // Posición Y después de la tabla
                // Actualiza finalY después de la tabla de productos
                finalY = doc.previousAutoTable.finalY + 10;

                // Subtotales y Totales
                doc.text(
                  "Total Productos: S/ " + datosCotizacion.totalProductsCoti,
                  133,
                  finalY
                );
                finalY += 10;

/*                 // Tabla de productos prima
                // Parsear los productos una sola vez
                const productosMprima = JSON.parse(
                  datosCotizacion.productsMprimaCoti
                ); */

                // Preparar las filas para autoTable
                /* let filasMprima = [];

                Object.keys(productosMprima).forEach((key) => {
                  let productoPrima = productosMprima[key];

                  filasMprima.push([
                    productoPrima.nombreProdMprimaCoti,
                    productoPrima.unidadProdMprimaCoti,
                    productoPrima.cantidadProdMprimaCoti,
                    productoPrima.precioProdMprimaCoti,
                  ]);
                });

                // Usar autoTable para agregar las filas a la tabla
                doc.autoTable({
                  startY: finalY,
                  headStyles: {
                    fontSize: 12,
                    halign: "left",
                    fillColor: [200, 200, 200],
                  },
                  head: [
                    ["Nombre Producto Prima ", "Unidad", "Cantidad", "Precio S/"],
                  ],
                  body: filasMprima,

                  // Agrega aquí más opciones de configuración según sea necesario
                });

                // Asegúrate de ajustar las propiedades de los productos y las opciones de autoTable según tus necesidades

                finalY = doc.previousAutoTable.finalY + 10;

                doc.text(
                  "Total Materia Prima:  S/ " +
                    datosCotizacion.totalProductsMprimaCoti,
                  126,
                  finalY
                ); */
                finalY += 10;

                // Alinear los totales por el ":"
                const alinearTexto = (etiqueta, valor, xDerecha, y) => {
                  const textoCompleto = `${etiqueta}: S/ ${valor}`;
                  const anchoTexto = doc.getTextWidth(textoCompleto);
                  const etiquetaAncho = doc.getTextWidth(`${etiqueta}:`);
                  doc.text(`${etiqueta}:`, xDerecha - anchoTexto, y);
                  doc.text(
                    `S/ ${valor}`,
                    xDerecha - anchoTexto + etiquetaAncho + 2,
                    y
                  ); // +2 para un pequeño espacio entre etiqueta y valor
                };

                // Detalle, IGV, Subtotal, Total
                alinearTexto(
                  "Sub Total",
                  datosCotizacion.subTotalCoti,
                  180,
                  finalY
                );
                finalY += 5;
                alinearTexto("IGV", datosCotizacion.igvCoti, 174, finalY);
                finalY += 5;
                alinearTexto("TOTAL", datosCotizacion.totalCoti, 180, finalY);

                // Observación alineada con TOTAL
                doc.text("OBSERVACIÓN", 14, finalY); // Asegúrate de que finalY no se incremente después de TOTAL

                // Asegurar que el texto de la observación no esté en negrita
                doc.setFont("helvetica", "normal");
                finalY += 5; // Ajuste para espacio antes de la observación
                let observacion = doc.splitTextToSize(
                  datosCotizacion.detalleCoti,
                  135
                ); // Ajusta el ancho según sea necesario
                doc.text(observacion, 14, finalY);
                doc.save(`CotizacionD'Frida-${datosCotizacion.tituloCoti}.pdf`);
                // recargar la pagina
                window.location.reload();
                /*    }; */
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
// Fin Descargar PDF de la cotización
// Descargar PDF de la cotización
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    $(".dataTableSeleccionarCotizacionPedidos").on("click", ".btnDescargarCotiPedidosList", function () {
      var codCoti = $(this).attr("codCoti");
        //mensaje de confirmación descargar cotizacion
        swal
          .fire({
            title: "Descargar Cotizacion",
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
              var jsonPdfCotizacion = JSON.stringify({
                codCoti: codCoti,
              });
              $.ajax({
                url: "ajax/cotizacion.ajax.php",
                method: "POST",
                data: { jsonPdfCotizacion: jsonPdfCotizacion },
                dataType: "json",
                success: function (response) {
                  const datosCotizacion = response;
  
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
                  doc.text("Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES", 14, 40);
  
                  // Cargar y agregar la imagen como fondo del documento
                  var imgBackground = new Image();
                  imgBackground.src = "/dfrida/assets/img/dfridaLogin.png";
  
                  imgBackground.onload = function () {
                    // Obtener el ancho y alto de la página del documento PDF
                    var pageWidth = doc.internal.pageSize.getWidth();
                    var pageHeight = doc.internal.pageSize.getHeight();
                    // Añadir la imagen como fondo
                    doc.addImage(this, "JPEG", 0, 0, pageWidth, pageHeight);
                  };
                  imgBackground.onerror = function () {
                    console.error(
                      "No se pudo cargar la imagen de fondo. Verifique la ruta."
                    );
                  };
                  // fin de la imagen de fondo
                  doc.setFont("helvetica", "bold");
                  doc.text("COTIZACIÓN", 90, 50);
                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 53, 190, 53);
  
                  // Detalles de la cotización
                  doc.setFont("helvetica", "normal");
                  doc.text(
                    "Razon Cotizacion: " + datosCotizacion.tituloCoti,
                    14,
                    60
                  );
                  doc.text("RUC: " + datosCotizacion.rucCoti, 14, 65);
                  doc.text(
                    "Razón Social: " + datosCotizacion.razonSocialCoti,
                    14,
                    70
                  );
                  //
                  doc.text(
                    "Nombre Comercial: " + datosCotizacion.nombreComercialCoti,
                    14,
                    75
                  );
                  doc.text("Fecha: " + datosCotizacion.fechaCoti, 140, 80);
                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 82, 190, 82);
                  // Información adicional
                  doc.setFont("helvetica", "bold");
  
                  doc.text(
                    "Nombre Cliente: " + datosCotizacion.nombreCoti,
                    14,
                    87
                  );
                  doc.text("Celular: " + datosCotizacion.celularCoti, 140, 87);
                  doc.text("Correo: " + datosCotizacion.correoCoti, 14, 92);
                  doc.text("Dirección: " + datosCotizacion.direccionCoti, 14, 97);
  
                  // Línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, 99, 190, 99);
                  // Después de la información adicional, inicializa finalY
  
                  let finalY = 95 + 10; // Asumiendo que 95 es la última posición Y después de la información adicional, ajusta según sea necesario
  
                  // Parsear los productos una sola vez
                  const productos = JSON.parse(datosCotizacion.productsCoti);
  
                  // Preparar las filas para autoTable
                  let filas = [];
  
                  Object.keys(productos).forEach((key) => {
                    let producto = productos[key];
  
                    filas.push([
                      producto.nombreProdCoti,
                      producto.unidadProdCoti,
                      producto.cantidadProdCoti,
                      producto.precioProdCoti,
                    ]);
                  });
  
                  // Usar autoTable para agregar las filas a la tabla
                  doc.autoTable({
                    startY: finalY,
                    headStyles: {
                      fontSize: 12,
                      halign: "left",
                      fillColor: [200, 200, 200],
                    },
                    head: [["Nombre Producto", "Unidad", "Cantidad", "Precio S/"]],
                    body: filas,
                    // Agrega aquí más opciones de configuración según sea necesario
                  });
  
                  // Asegúrate de ajustar las propiedades de los productos y las opciones de autoTable según tus necesidades
  
                  // Posición Y después de la tabla
                  // Actualiza finalY después de la tabla de productos
                  finalY = doc.previousAutoTable.finalY + 10;
  
                  // Subtotales y Totales
                  doc.text(
                    "Total Productos: S/ " + datosCotizacion.totalProductsCoti,
                    133,
                    finalY
                  );
                  finalY += 10;
  
                  // Alinear los totales por el ":"
                  const alinearTexto = (etiqueta, valor, xDerecha, y) => {
                    const textoCompleto = `${etiqueta}: S/ ${valor}`;
                    const anchoTexto = doc.getTextWidth(textoCompleto);
                    const etiquetaAncho = doc.getTextWidth(`${etiqueta}:`);
                    doc.text(`${etiqueta}:`, xDerecha - anchoTexto, y);
                    doc.text(
                      `S/ ${valor}`,
                      xDerecha - anchoTexto + etiquetaAncho + 2,
                      y
                    ); // +2 para un pequeño espacio entre etiqueta y valor
                  };
  
                  // Detalle, IGV, Subtotal, Total
                  alinearTexto(
                    "Sub Total",
                    datosCotizacion.subTotalCoti,
                    180,
                    finalY
                  );
                  finalY += 5;
                  alinearTexto("IGV", datosCotizacion.igvCoti, 174, finalY);
                  finalY += 5;
                  alinearTexto("TOTAL", datosCotizacion.totalCoti, 180, finalY);
  
                  // Observación alineada con TOTAL
                  doc.text("OBSERVACIÓN", 14, finalY); // Asegúrate de que finalY no se incremente después de TOTAL
  
                  // Asegurar que el texto de la observación no esté en negrita
                  doc.setFont("helvetica", "normal");
                  finalY += 5; // Ajuste para espacio antes de la observación
                  let observacion = doc.splitTextToSize(
                    datosCotizacion.detalleCoti,
                    135
                  ); // Ajusta el ancho según sea necesario
                  doc.text(observacion, 14, finalY);
                  doc.save(`CotizacionD'Frida-${datosCotizacion.tituloCoti}.pdf`);
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
    $("#modalSeleccionarCotizacionPedidos").on("click", "#btnCerrarModalSeleccionarCotizacionPedidos", function () {
      $("#modalSeleccionarCotizacionPedidos").modal("hide");
      $("#modalCrearPedido").modal("show");
    });
    $("#modalSeleccionarCotizacionPedidosEditar").on("click", "#btnCerrarModalSeleccionarCotizacionPedidosEditar", function () {
      $("#modalSeleccionarCotizacionPedidosEditar").modal("hide");
      $("#modalEditarPedido").modal("show");
    });
    
    
  }
});
//Fin
