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

      // Función para generar un color aleatorio similar
      function generarColorSimilar(baseColor) {
        function ajustarColor(color) {
          var ajuste = Math.floor(Math.random() * 30) - 15; // Ajuste aleatorio entre -15 y 15
          var nuevoColor = color + ajuste;
          return Math.max(0, Math.min(255, nuevoColor)); // Asegurarse de que el color esté en el rango 0-255
        }

        var r = ajustarColor(baseColor[0]);
        var g = ajustarColor(baseColor[1]);
        var b = ajustarColor(baseColor[2]);

        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      }

      // Colores base para "horas" y "precio"
      var colorBaseHoras = [179, 154, 99];
      var colorBasePrecio = [179, 154, 99];

      if (opcion === "horas") {
        dataset.push({
          label: "Horas Proceso",
          data: data.horasData,
          backgroundColor: data.horasData.map(() =>
            generarColorSimilar(colorBaseHoras)
          ),
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
          backgroundColor: data.cotiData.map(() =>
            generarColorSimilar(colorBasePrecio)
          ),
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
      registrado: { icon: "fa-file-lines", color: "#007bff" }, // Azul
      en_proceso: { icon: "fa-spinner", color: "#6c757d" }, // Gris
      cuello_de_botella: { icon: "fa-triangle-exclamation", color: "#dc3545" }, // Rojo
      listo: { icon: "fa-circle-check", color: "#28a745" }, // Verde
      prenda_terminada: { icon: "fa-shirt", color: "#393c3f" }, // Cian
      retrasado: { icon: "fa-clock", color: "#FF8C00" },
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
      var iconoSeleccionado = iconosEstado[opcionSeleccionada].icon;
      var colorSeleccionado = iconosEstado[opcionSeleccionada].color;

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
          "fa-file-lines",
          "fa-spinner",
          "fa-triangle-exclamation",
          "fa-circle-check",
          "fa-shirt",
          "fa-clock"
        );
        estadoIcon.classList.add(iconoSeleccionado);
        estadoIcon.style.color = colorSeleccionado; // Aplica el color al ícono
      }

      if (estadoText) {
        estadoText.textContent = textoSeleccionado + ":";
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

          actualizarEstadoSeleccionado("prenda_terminada");
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
    // Variables globales para almacenar los datos y la referencia a los elementos de la interfaz
    var gananciaAnioData = {};
    var filtroGananciaAnio = document.getElementById("filtro-ganancia-anio");

    // Función para agregar opciones de filtro dinámicamente
    function agregarOpcionesFiltroGananciaAnio(response) {
      filtroGananciaAnio.innerHTML = ""; // Limpiar opciones anteriores

      // Crear y agregar el elemento <h6>
      var h6 = document.createElement("h6");
      h6.className = "dropdown-header text-start";
      h6.textContent = "Filtro";
      h6.style.fontSize = "1rem"; // Establecer el tamaño de fuente a 1rem
      filtroGananciaAnio.appendChild(h6);

      // Agregar las opciones del filtro
      response.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.className = "dropdown-item filtro-opcion-ganancia";
        a.style.cursor = "pointer";
        a.setAttribute("data-anio", item.año);
        a.innerHTML = item.año;
        li.appendChild(a);
        filtroGananciaAnio.appendChild(li);
      });

      // Manejar la selección del filtro
      document
        .querySelectorAll(".filtro-opcion-ganancia")
        .forEach(function (element) {
          element.addEventListener("click", function (event) {
            var anioSeleccionado = event.target.getAttribute("data-anio");
            actualizarGananciaSeleccionada(anioSeleccionado);
          });
        });
    }

    // Función para actualizar la interfaz cuando se selecciona un año
    function actualizarGananciaSeleccionada(anioSeleccionado) {
      var ganancia = gananciaAnioData[anioSeleccionado] || 0;
      var filtroSpan = document.querySelector(
        ".filtro-seleccionado-ganancia-anio"
      );
      var gananciaTotal = document.querySelector(".ganancia-total");

      // Actualizar la interfaz
      if (filtroSpan) {
        filtroSpan.textContent = " | Año " + anioSeleccionado;
      }

      if (gananciaTotal) {
        gananciaTotal.textContent =
          "S/. " +
          ganancia
            .toLocaleString("es-PE", { style: "currency", currency: "PEN" })
            .replace("PEN", "")
            .trim();
      }
    }

    // Función para obtener y almacenar los datos de la ganancia por año
    function obtenerGananciaPorAnio() {
      var data = new FormData();
      data.append("totalRecaudadoAnio", true);
      $.ajax({
        url: "ajax/home.ajax.php",
        method: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (response) {
          // Almacenar los datos en la variable global
          response.forEach(function (item) {
            gananciaAnioData[item.año] = item.ganancia_total;
          });

          // Agregar opciones de filtro
          agregarOpcionesFiltroGananciaAnio(response);

          // Actualizar la interfaz con el primer año por defecto
          if (response.length > 0) {
            actualizarGananciaSeleccionada(response[0].año);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error en la solicitud AJAX: ", textStatus, errorThrown);
        },
      });
    }

    // Llamar a la función para obtener datos e inicializar el conteo
    obtenerGananciaPorAnio();

    obtenerConteoEstadoProcesosOperativosHome();
    obtenerProcesosOperativosTiempoCosto();
  }
});
