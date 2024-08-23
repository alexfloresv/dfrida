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
                doc.text(
                  "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                  14,
                  40
                );

                // Cargar la imagen desde la ruta local y añadirla al PDF
                var imgLogoUrl = "/dfrida/assets/img/dfridaPdf.jpg"; // Ruta de la imagen dentro del proyecto

                var img = new Image();
                img.src = imgLogoUrl;
                img.onload = function () {
                  var imgWidth = 40; // Ancho de la imagen
                  var imgHeight = 20; // Alto de la imagen

                  // Calcular la posición para colocar la imagen en la esquina superior derecha
                  var xPos = doc.internal.pageSize.getWidth() - imgWidth - 10; // 10 es el margen derecho
                  var yPos = 10; // Margen superior

                  // Añadir la imagen en la posición calculada
                  doc.addImage(img, "JPEG", xPos, yPos, imgWidth, imgHeight);

                  // Continuar con el resto del PDF
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
                  doc.text(
                    "Dirección: " + datosCotizacion.direccionCoti,
                    14,
                    97
                  );

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
                    head: [
                      ["Nombre Producto", "Unidad", "Cantidad", "Precio S/"],
                    ],
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
                  doc.save(
                    `CotizacionD'Frida-${datosCotizacion.tituloCoti}.pdf`
                  );
                };
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
    $(
      ".dataTableSeleccionarCotizacionPedidos, .dataTableSeleccionarCotizacionPedidosEditar"
    ).on("click", ".btnDescargarCotiPedidosList", function () {
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
                doc.text(
                  "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                  14,
                  40
                );

                // Cargar la imagen desde la ruta local y añadirla al PDF
                var imgLogoUrl = "/dfrida/assets/img/dfridaPdf.jpg"; // Ruta de la imagen dentro del proyecto

                var img = new Image();
                img.src = imgLogoUrl;
                img.onload = function () {
                  var imgWidth = 40; // Ancho de la imagen
                  var imgHeight = 20; // Alto de la imagen

                  // Calcular la posición para colocar la imagen en la esquina superior derecha
                  var xPos = doc.internal.pageSize.getWidth() - imgWidth - 10; // 10 es el margen derecho
                  var yPos = 10; // Margen superior

                  // Añadir la imagen en la posición calculada
                  doc.addImage(img, "JPEG", xPos, yPos, imgWidth, imgHeight);

                  // Continuar con el resto del PDF
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
                  doc.text(
                    "Dirección: " + datosCotizacion.direccionCoti,
                    14,
                    97
                  );

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
                    head: [
                      ["Nombre Producto", "Unidad", "Cantidad", "Precio S/"],
                    ],
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
                  doc.save(
                    `CotizacionD'Frida-${datosCotizacion.tituloCoti}.pdf`
                  );
                };
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
    $("#modalSeleccionarCotizacionPedidos").on(
      "click",
      "#btnCerrarModalSeleccionarCotizacionPedidos",
      function () {
        $("#modalSeleccionarCotizacionPedidos").modal("hide");
        $("#modalCrearPedido").modal("show");
      }
    );
    $("#modalSeleccionarCotizacionPedidosEditar").on(
      "click",
      "#btnCerrarModalSeleccionarCotizacionPedidosEditar",
      function () {
        $("#modalSeleccionarCotizacionPedidosEditar").modal("hide");
        $("#modalEditarPedido").modal("show");
      }
    );
  }
});
//Fin
// Descargar pdf de pedido
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/pedidosList";
  if (currentPath == appPath) {
    $(".dataTablePedidos").on("click", ".btnDescargarPedidoPdf", function () {
      var idPedido = $(this).attr("idPedido");

      swal
        .fire({
          title: "Descargar Pedido",
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
            var jsonPdfPedido = JSON.stringify({ idPedido: idPedido });

            $.ajax({
              url: "ajax/pedidos.ajax.php",
              method: "POST",
              data: { jsonPdfPedido: jsonPdfPedido },
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
                doc.text(
                  "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                  14,
                  40
                );

                // Cargar la imagen desde la ruta local y añadirla al PDF
                var imgLogoUrl = "/dfrida/assets/img/dfridaPdf.jpg"; // Ruta de la imagen dentro del proyecto

                var img = new Image();
                img.src = imgLogoUrl;
                img.onload = function () {
                  var imgWidth = 40; // Ancho de la imagen
                  var imgHeight = 20; // Alto de la imagen

                  // Calcular la posición para colocar la imagen en la esquina superior derecha
                  var xPos = doc.internal.pageSize.getWidth() - imgWidth - 10; // 10 es el margen derecho
                  var yPos = 10; // Margen superior

                  // Añadir la imagen en la posición calculada
                  doc.addImage(img, "JPEG", xPos, yPos, imgWidth, imgHeight);

                  // Continuar con el resto del PDF (sección PEDIDO, COTIZACIÓN, etc.)
                  doc.setFont("helvetica", "bold");
                  doc.text("PEDIDO", 90, 50);

                  doc.setLineWidth(0.5);
                  doc.line(14, 53, 190, 53);

                  doc.setFont("helvetica", "normal");
                  doc.text("Pedido: " + datosCotizacion.tituloPedido, 14, 60);
                  doc.text(
                    "Nombre Pedido: " + datosCotizacion.nombrePedido,
                    14,
                    65
                  );
                  doc.text("Fecha: " + datosCotizacion.fechaPedido, 140, 70);

                  // Línea separadora entre PEDIDO y detalles de cotización
                  let currentY = 75; // Ajustar la posición para la línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Detalles de la cotización
                  currentY += 7; // Ajustar para empezar con los detalles de la cotización
                  doc.setFont("helvetica", "normal");
                  doc.text(
                    "Cotizacion: " + datosCotizacion.tituloCoti,
                    14,
                    currentY
                  );
                  currentY += 5;
                  doc.text("RUC: " + datosCotizacion.rucCoti, 14, currentY);
                  currentY += 5;
                  doc.text(
                    "Razón Social: " + datosCotizacion.razonSocialCoti,
                    14,
                    currentY
                  );
                  currentY += 5;
                  doc.text(
                    "Nombre Comercial: " + datosCotizacion.nombreComercialCoti,
                    14,
                    currentY
                  );
                  doc.text(
                    "Fecha: " + datosCotizacion.fechaCoti,
                    140,
                    currentY + 5
                  );

                  currentY += 10;
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Información adicional
                  currentY += 5;
                  doc.setFont("helvetica", "bold");
                  doc.text(
                    "Nombre Cliente: " + datosCotizacion.nombreCoti,
                    14,
                    currentY
                  );
                  doc.text(
                    "Celular: " + datosCotizacion.celularCoti,
                    140,
                    currentY
                  );
                  currentY += 5;
                  doc.text(
                    "Correo: " + datosCotizacion.correoCoti,
                    14,
                    currentY
                  );
                  currentY += 5;
                  doc.text(
                    "Dirección: " + datosCotizacion.direccionCoti,
                    14,
                    currentY
                  );

                  currentY += 5;
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Tabla de productos
                  currentY += 10;
                  const productos = JSON.parse(datosCotizacion.productsCoti);

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

                  doc.autoTable({
                    startY: currentY,
                    headStyles: {
                      fontSize: 12,
                      halign: "left",
                      fillColor: [200, 200, 200],
                    },
                    head: [
                      ["Nombre Producto", "Unidad", "Cantidad", "Precio S/"],
                    ],
                    body: filas,
                  });

                  currentY = doc.previousAutoTable.finalY + 10;

                  doc.text(
                    "Total Productos: S/ " + datosCotizacion.totalProductsCoti,
                    133,
                    currentY
                  );
                  currentY += 10;

                  const alinearTexto = (etiqueta, valor, xDerecha, y) => {
                    const textoCompleto = `${etiqueta}: S/ ${valor}`;
                    const anchoTexto = doc.getTextWidth(textoCompleto);
                    const etiquetaAncho = doc.getTextWidth(`${etiqueta}:`);
                    doc.text(`${etiqueta}:`, xDerecha - anchoTexto, y);
                    doc.text(
                      `S/ ${valor}`,
                      xDerecha - anchoTexto + etiquetaAncho + 2,
                      y
                    );
                  };

                  // Asegurarse de que subTotalCoti sea un número
                  datosCotizacion.subTotalCoti = parseFloat(
                    datosCotizacion.subTotalCoti
                  );

                  // Calcular el IGV
                  datosCotizacion.igvCoti = (
                    datosCotizacion.subTotalCoti * 0.18
                  ).toFixed(2);

                  // Calcular el total
                  datosCotizacion.totalCoti = (
                    datosCotizacion.subTotalCoti +
                    parseFloat(datosCotizacion.igvCoti)
                  ).toFixed(2);

                  // Mostrar los valores en el PDF
                  alinearTexto(
                    "Sub Total",
                    datosCotizacion.subTotalCoti.toFixed(2),
                    180,
                    currentY
                  );
                  currentY += 5;
                  alinearTexto("IGV", datosCotizacion.igvCoti, 174, currentY);
                  currentY += 5;
                  alinearTexto(
                    "TOTAL",
                    datosCotizacion.totalCoti,
                    180,
                    currentY
                  );

                  doc.text("OBSERVACIÓN", 14, currentY);

                  doc.setFont("helvetica", "normal");
                  currentY += 5;
                  let observacion = doc.splitTextToSize(
                    datosCotizacion.detalleCoti,
                    135
                  );
                  doc.text(observacion, 14, currentY);

                  // Guardar el documento PDF
                  doc.save(`PedidoD'Frida-${datosCotizacion.tituloCoti}.pdf`);
                  window.location.reload();
                };
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

// Descargar PDF de la salida de productos
document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var appPath = "/dfrida/salidaList";
  if (currentPath == appPath) {
    // Capturar el evento de clic en el botón con clase .btnVerIngProd
    $(".dataTableSalidasProd").on("click", ".btnVerIngProd", function () {
      var idSalProd = $(this).attr("idSalProd");
      swal
        .fire({
          title: "Descargar Salida de Productos",
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
            var jsonPdfSalida = JSON.stringify({
              idSalProd: idSalProd,
            });

            $.ajax({
              url: "ajax/salidaProd.ajax.php",
              method: "POST",
              data: { jsonPdfSalida: jsonPdfSalida },
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
                doc.text(
                  "Direccion:  CALLE SAN CARLOS NRO. 32 URB. LOS ANGELES",
                  14,
                  40
                );

                // Cargar la imagen desde la ruta local y añadirla al PDF
                var imgLogoUrl = "/dfrida/assets/img/dfridaPdf.jpg"; // Ruta de la imagen dentro del proyecto

                var img = new Image();
                img.src = imgLogoUrl;
                img.onload = function () {
                  var imgWidth = 40; // Ancho de la imagen
                  var imgHeight = 20; // Alto de la imagen

                  // Calcular la posición para colocar la imagen en la esquina superior derecha
                  var xPos = doc.internal.pageSize.getWidth() - imgWidth - 10; // 10 es el margen derecho
                  var yPos = 10; // Margen superior

                  // Añadir la imagen en la posición calculada
                  doc.addImage(img, "JPEG", xPos, yPos, imgWidth, imgHeight);

                  // Continuar con el resto del PDF (sección PEDIDO, COTIZACIÓN, etc.)
                  doc.setFont("helvetica", "bold");
                  doc.text("SALIDA DE PRODUCTO", 90, 50);

                  doc.setLineWidth(0.5);
                  doc.line(14, 53, 190, 53);

                  doc.setFont("helvetica", "normal");
                  doc.text("Nombre: " + datosCotizacion.nombreSalProd, 14, 60);
                  doc.text("Fecha: " + datosCotizacion.fechaSalProd, 140, 60);

                  // Línea separadora entre PEDIDO y detalles de cotización
                  let currentY = 65; // Ajustar la posición para la línea separadora
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Detalles de la cotización
                  currentY += 7; // Ajustar para empezar con los detalles de la cotización
                  doc.setFont("helvetica", "normal");
                  doc.text("RUC: " + datosCotizacion.rucCli, 14, currentY);
                  currentY += 5;
                  doc.text(
                    "Razón Social: " + datosCotizacion.RazonSocialCli,
                    14,
                    currentY
                  );

                  currentY += 5;
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Información adicional
                  currentY += 5;
                  doc.setFont("helvetica", "bold");
                  doc.text(
                    "Nombre Cliente: " + datosCotizacion.nombreCli,
                    14,
                    currentY
                  );
                  doc.text(
                    "Celular: " + datosCotizacion.celularCli,
                    140,
                    currentY
                  );
                  currentY += 5;
                  doc.text(
                    "Correo: " + datosCotizacion.correoCli,
                    14,
                    currentY
                  );
                  currentY += 5;
                  doc.text(
                    "Dirección: " + datosCotizacion.direccionCli,
                    14,
                    currentY
                  );

                  currentY += 5;
                  doc.setLineWidth(0.5);
                  doc.line(14, currentY, 190, currentY);

                  // Tabla de productos
                  currentY += 10;
                  const productos = JSON.parse(datosCotizacion.salJsonProd);

                  let filas = [];
                  Object.keys(productos).forEach((key) => {
                    let producto = productos[key];
                    filas.push([
                      producto.nombreProdIng,
                      producto.unidadProdIng,
                      producto.cantidadProdIng,
                      producto.precioProdIng,
                    ]);
                  });

                  doc.autoTable({
                    startY: currentY,
                    headStyles: {
                      fontSize: 12,
                      halign: "left",
                      fillColor: [200, 200, 200],
                    },
                    head: [
                      ["Nombre Producto", "Unidad", "Cantidad", "Precio S/"],
                    ],
                    body: filas,
                  });

                  // Posición Y después de la tabla
                  // Actualiza finalY después de la tabla de productos
                  finalY = doc.previousAutoTable.finalY + 10;

                  // Subtotales y Totales
                  doc.text(
                    "Total Productos: S/ " + datosCotizacion.subTotalSalProd,
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
                    datosCotizacion.subTotalSalProd,
                    180,
                    finalY
                  );
                  finalY += 5;
                  alinearTexto("IGV", datosCotizacion.igvSalProd, 174, finalY);
                  finalY += 5;
                  alinearTexto("TOTAL", datosCotizacion.totalSalProd, 180, finalY);

                  // Guardar el documento PDF
                  doc.save(`PedidoD'Frida-${datosCotizacion.nombreSalProd}.pdf`);
                  window.location.reload();
                };
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
// Fin Descargar PDF de la salida de productos
