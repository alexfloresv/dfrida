document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;
  var validPaths = ["/dfrida/index.php", "/dfrida/home"];

  if (validPaths.includes(currentPath)) {
    function obtenerProcesosOperativosTiempoCosto() {
      var data = new FormData();
      data.append("todosLosProcesosOperativosTiempoCosto", true);

      $.ajax({
        url: "ajax/home.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          var procesos = {};

          response.forEach(function (fila) {
            if (!procesos[fila.idProcOp]) {
              procesos[fila.idProcOp] = {
                descripcion: fila.descripcionProcOp,
                horasProceso: 0,
                totalCoti: 0,
              };
            }
            procesos[fila.idProcOp].horasProceso += fila.horasProceso;
            procesos[fila.idProcOp].totalCoti += fila.totalCoti;
          });

          var labels = [];
          var horasData = [];
          var cotiData = [];

          for (var idProcOp in procesos) {
            labels.push(procesos[idProcOp].descripcion);
            horasData.push(procesos[idProcOp].horasProceso);
            cotiData.push(procesos[idProcOp].totalCoti);
          }

          window.graficoData = { labels, horasData, cotiData };
          actualizarGrafico("horas");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

    function actualizarGrafico(opcion) {
      var canvas = document.getElementById("myChart");
      var ctx = canvas.getContext("2d");

      // Establecer el tamaño máximo del canvas
      canvas.style.maxHeight = "500px";

      var data = window.graficoData;
      var dataset = [];

      if (opcion === "horas") {
        dataset.push({
          label: "Horas Proceso",
          data: data.horasData,
          backgroundColor: "rgba(179, 154, 99, 0.7)", 
          borderColor: "rgba(145, 114, 69, 1)",
          borderWidth: 1,
        });
        document.querySelector(
          ".filtro-seleccionado-alumnos-nuevo-antiguo"
        ).textContent = "| Horas";
      } else if (opcion === "precio") {
        dataset.push({
          label: "Precio Proceso",
          data: data.cotiData,
          backgroundColor: "rgba(179, 154, 99, 0.7)", // Rojo coral
          borderColor: "rgba(179, 154, 99, 1)",
          borderWidth: 1,
        });
        document.querySelector(
          ".filtro-seleccionado-alumnos-nuevo-antiguo"
        ).textContent = "| Precio";
      }

      // Verifica si window.myChart es una instancia de Chart antes de destruirlo
      if (window.myChart && window.myChart instanceof Chart) {
        window.myChart.destroy();
      }

      // Crear el gráfico
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.labels,
          datasets: dataset,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Procesos Operativos: ${
                opcion === "horas" ? "Horas" : "Precio"
              }`,
              font: {
                size: 20, // Aumentar el tamaño de la fuente del título
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Manejar la selección del filtro
    document.querySelectorAll(".filtro-opcion").forEach(function (element) {
      element.addEventListener("click", function (event) {
        var opcionSeleccionada = event.target.getAttribute("data-value");
        actualizarGrafico(opcionSeleccionada);
      });
    });

    // Llamar a la función para obtener datos e inicializar el gráfico
    obtenerProcesosOperativosTiempoCosto();
  }
});