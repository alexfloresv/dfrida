<?php
require_once "../controller/home.controller.php";
require_once "../model/home.model.php";
/* require_once "../functions/home.functions.php"; */

// Inicio de sesión
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

// Obtener tiempo de proceso operativo y cuanto se gato
if (isset($_POST["todosLosProcesosOperativosTiempoCosto"])) {
  $todosProcesosOperativosTiempoCosto = new HomeAjax();
  $todosProcesosOperativosTiempoCosto->ajaxObtenerProcesosOperativosTiempoCosto();
}

class HomeAjax
{
  public function ajaxObtenerProcesosOperativosTiempoCosto()
  {
    $todosProcesosOperativosTiempoCosto = HomeController::ctrObtenerProcesosOperativosTiempoCosto();

    // Recorrer cada proceso operativo
    foreach ($todosProcesosOperativosTiempoCosto as &$proceso) {
      // Variable para almacenar el total de horas
      $horasProceso = 0;

      // Decodificar el JSON
      $procesos = json_decode($proceso['procesoFichaProcJson'], true);

      // Recorrer cada proceso dentro del JSON
      foreach ($procesos as $procesoTrabajo) {
        // Obtener el tiempo y la unidad
        $tiempoAdd = $procesoTrabajo['tiempoAdd'];
        if (strpos($tiempoAdd, 'Dias') !== false) {
          // Convertir días a horas (1 día = 8 horas)
          $dias = (int) filter_var($tiempoAdd, FILTER_SANITIZE_NUMBER_INT);
          $horasProceso += $dias * 8;
        } elseif (strpos($tiempoAdd, 'Horas') !== false) {
          // Sumar las horas directamente
          $horas = (int) filter_var($tiempoAdd, FILTER_SANITIZE_NUMBER_INT);
          $horasProceso += $horas;
        }
      }

      // Añadir la variable horasProceso al proceso
      $proceso['horasProceso'] = $horasProceso;
    }

    // Devolver el resultado en formato JSON
    echo json_encode($todosProcesosOperativosTiempoCosto);
  }
}