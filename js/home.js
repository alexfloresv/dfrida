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

    // Variables globales para almacenar los datos y la referencia a los elementos de la interfaz
    var estadosProcesosData = {};
    var iconosEstado = {
      registrado: "fa-file-lines",
      en_proceso: "fa-spinner",
      cuello_de_botella: "fa-triangle-exclamation",
      listo: "fa-circle-check",
      prenda_terminada: "fa-shirt",
      retrasado: "fa-clock",
    };

    var opcionesFiltro = [
      { value: "registrado", text: "Registrado" },
      { value: "en_proceso", text: "En Proceso" },
      { value: "cuello_de_botella", text: "Cuello de Botella" },
      { value: "listo", text: "Listo" },
      { value: "prenda_terminada", text: "Prenda Terminada" },
      { value: "retrasado", text: "Retrasado" },
    ];

    var filtroEstadosProcesos = document.getElementById(
      "filtro-estados-procesos"
    );
    opcionesFiltro.forEach(function (opcion) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "dropdown-item filtro-opcion";
      a.style.cursor = "pointer";
      a.setAttribute("data-value", opcion.value);
      a.innerHTML = opcion.text;
      li.appendChild(a);
      filtroEstadosProcesos.appendChild(li);
    });

    function actualizarEstadoSeleccionado(opcionSeleccionada) {
      console.log("Opción seleccionada:", opcionSeleccionada); // Debugging

      var iconoSeleccionado = iconosEstado[opcionSeleccionada];
      console.log("Ícono seleccionado:", iconoSeleccionado); // Debugging

      var textoSeleccionado = opcionesFiltro.find(
        (opcion) => opcion.value === opcionSeleccionada
      ).text;

      var filtroSpan = document.querySelector(
        ".filtro-seleccionado-estados-procesos"
      );
      var estadoIcon = document.querySelector(".estado-icon");
      var estadoText = document.querySelector(".estado-text");

      if (filtroSpan) {
        filtroSpan.textContent = "| " + textoSeleccionado;
      }

      if (estadoIcon) {
        // Limpia las clases actuales del ícono y añade la nueva clase
        estadoIcon.classList.remove(
          "fa-file-alt",
          "fa-spinner",
          "fa-exclamation-triangle",
          "fa-check-circle",
          "fa-shirt",
          "fa-clock"
        );
        estadoIcon.classList.add(iconoSeleccionado);
      }

      if (estadoText) {
        estadoText.textContent = textoSeleccionado;
      }

      if (estadosProcesosData[opcionSeleccionada]) {
        var conteo = estadosProcesosData[opcionSeleccionada];
        var estadoConteoElement = document.querySelector(".estado-conteo");

        if (estadoConteoElement) {
          estadoConteoElement.textContent = conteo;
        }
      }
    }

    function obtenerConteoEstadoProcesosOperativosHome() {
      var data = new FormData();
      data.append("estadosProcesosOperativosHome", true);
      $.ajax({
        url: "ajax/home.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          estadosProcesosData = {
            registrado: response.registrados,
            en_proceso: response.en_proceso,
            cuello_de_botella: response.cuello_de_botella,
            listo: response.listo,
            prenda_terminada: response.prenda_terminada,
            retrasado: response.retrasado,
          };

          actualizarEstadoSeleccionado("registrado");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("filtro-opcion")) {
        var opcionSeleccionada = event.target.getAttribute("data-value");
        actualizarEstadoSeleccionado(opcionSeleccionada);
      }
    });

    obtenerConteoEstadoProcesosOperativosHome();
    obtenerProcesosOperativosTiempoCosto();
  }
});
