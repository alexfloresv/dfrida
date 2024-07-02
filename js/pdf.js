// eliminar Cotizacion
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
                //respuesta de la función
                console.log(response);
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
//libreira pdf
const { jsPDF } = window.jspdf;
var doc = new jsPDF();
//fin

// imagen de fondo

// Cargar y añadir la imagen de fondo
var imgBackground = new Image();
imgBackground.src = "/dfrida/assets/img/dfridaPdf.jpg";
imgBackground.onload = function () {
  var imgWidth = doc.internal.pageSize.getWidth();
  var imgHeight = doc.internal.pageSize.getHeight();
  doc.addImage(this, "JPEG", 0, 0, imgWidth, imgHeight); // Añadir la imagen como fondo

  //fin imagen de fondo

  // Ajustar la posición vertical para el título y el contenido
  //cabcera
  var yPosition = 40; // Ajustar según el espacio deseado desde el borde superior

  // Título del PDF, ajustado para dejar espacio para el logo
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("REGISTRO DE NOTAS", 105, yPosition, null, null, "center");
  doc.setFont("helvetica", "normal");
  // Incrementar yPosition después del título
  yPosition += 15; // Ajustar según el espacio deseado entre el título y la siguiente sección

  // Extraer información del alumno de manera específica para la izquierda
  var infoAlumnoIzquierda = [
    "ID del Alumno: " + $("#idAlumno").text(),
    "Nombre del Alumno: " + $("#nombreAlumno").text(),
  ].join("\n");

  // Extraer información del alumno de manera específica para la derecha
  var infoAlumnoDerecha = [
    "Nivel del Alumno: " + $("#nivelAlumno").text(),
    "Grado del Alumno: " + $("#gradoAlumno").text(),
  ].join("\n");

  // Añadir información del alumno al PDF
  doc.setFontSize(10);
  doc.text(infoAlumnoIzquierda, 10, yPosition);
  var splitDerecha = doc.splitTextToSize(infoAlumnoDerecha, 90);
  doc.text(splitDerecha, doc.internal.pageSize.width - 100, yPosition); // Ajustar según el ancho de la página

  // Ajustar yPosition después de agregar la información del alumno
  yPosition +=
    Math.max(infoAlumnoIzquierda.split("\n").length, splitDerecha.length) * 7;

  // Dibujar una línea horizontal para separar los datos del alumno de la tabla
  doc.setDrawColor(0); // Establece el color de la línea, negro en este caso
  doc.line(10, yPosition + 2, doc.internal.pageSize.width - 10, yPosition + 2);

  // Incrementar yPosition después de la línea
  yPosition += 10;

  // Preparar los encabezados y datos de la tabla
  var encabezados = [
    [
      {
        content: "Curso",
        rowSpan: 2,
        styles: { halign: "center", valign: "middle" },
      },
      { content: "I BIMESTRE", colSpan: 2, styles: { halign: "center" } },
      { content: "II BIMESTRE", colSpan: 2, styles: { halign: "center" } },
      { content: "III BIMESTRE", colSpan: 2, styles: { halign: "center" } },
      { content: "IV BIMESTRE", colSpan: 2, styles: { halign: "center" } },
    ],
    [
      "I UNIDAD",
      "II UNIDAD",
      "III UNIDAD",
      "IV UNIDAD",
      "V UNIDAD",
      "VI UNIDAD",
      "VII UNIDAD",
      "VIII UNIDAD",
    ],
  ];

  // Extraer los datos de la tabla
  var data = $("#dataTableNotasPorAlumnoApoderado")
    .DataTable()
    .rows()
    .data()
    .toArray();

  // Aplicar estilos condicionales para "PROMEDIO BIMESTRE"
  var bodyStyles = { fontStyle: "normal", fontSize: 8 };
  var rowStyles = data.map((row, index) => {
    return row.descripcionCurso === "PROMEDIO BIMESTRE"
      ? { fontStyle: "bold" }
      : { fontStyle: "normal" };
  });

  // Añadir la tabla al PDF
  doc.autoTable({
    startY: yPosition,
    head: encabezados,
    body: data.map((item) => [
      item.descripcionCurso,
      item.nota_unidad_i,
      item.nota_unidad_ii,
      item.nota_unidad_iii,
      item.nota_unidad_iv,
      item.nota_unidad_v,
      item.nota_unidad_vi,
      item.nota_unidad_vii,
      item.nota_unidad_viii,
    ]),
    bodyStyles: bodyStyles,
    rowStyles: rowStyles,
    headStyles: { fontSize: 8, halign: "center", fillColor: [1, 152, 145] }, // Establece un tamaño de fuente  para los encabezados y los centra horizontalmente
  });

  // Guardar el documento PDF
  doc.save("Registro_de_Notas.pdf");
};
