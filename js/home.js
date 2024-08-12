// Vista de Home
document.addEventListener("DOMContentLoaded", function () {
  // Si la ruta no es la correcta no se ejecuta la función
  var currentPath = window.location.pathname;
  var validPaths = ["/dfrida/index.php", "/dfrida/home"];

  if (validPaths.includes(currentPath)) {
    // Función para obtener y manejar los datos de alumnos por grados
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

          // Poblar el filtro
          var filtro = document.getElementById("gradoNivelDropdown");
          filtro.innerHTML = "";
          for (var idProcOp in procesos) {
            var option = document.createElement("li");
            option.textContent = procesos[idProcOp].descripcion;
            filtro.appendChild(option);
          }

          // Preparar datos para el gráfico
          var labels = [];
          var horasData = [];
          var cotiData = [];

          for (var idProcOp in procesos) {
            labels.push(procesos[idProcOp].descripcion);
            horasData.push(procesos[idProcOp].horasProceso);
            cotiData.push(procesos[idProcOp].totalCoti);
          }

          // Actualizar gráfico con los datos obtenidos
          actualizarGrafico(labels, horasData, cotiData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

    // Función para actualizar el gráfico
    function actualizarGrafico(labels, horasData, cotiData) {
      var ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Horas Proceso",
              data: horasData,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Cotización",
              data: cotiData,
              backgroundColor: "rgba(255, 99, 132, 0.7)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Procesos Operativos: Horas vs Total Cotización",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              stacked: true, // Configura las barras apiladas en el eje Y
            },
            x: {
              stacked: true, // Configura las barras apiladas en el eje X
            },
          },
        },
      });
    }

    // Llamar a la función para obtener los datos
    obtenerProcesosOperativosTiempoCosto();
  }
});
