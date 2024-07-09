<?php
ob_start(); // Inicia el buffer de salida
if (isset($_POST["docFichaTec"])) {
  $nombreArchivoEliminar = $_POST["docFichaTec"];
  $archivoParaEliminar = $nombreArchivoEliminar;
  if (unlink($archivoParaEliminar)) {
    $response = ["status" => "ok"];
  } else {
    $response = ["status" => "error"];
  }
  ob_clean(); // Limpia el buffer de salida sin enviarlo al cliente
  header('Content-Type: application/json'); // Asegúrate de que esta línea esté antes de cualquier salida.
  echo json_encode($response);
  exit(); // Termina la ejecución del script
}
ob_end_flush(); // Envía el buffer de salida y lo desactiva

