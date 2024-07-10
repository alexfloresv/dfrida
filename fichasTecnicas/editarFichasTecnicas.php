<?php
ob_start(); // Inicia el buffer de salida para editar
if (isset($_FILES['fileFichaTecnicaEdit']) && isset($_POST['nombreArchivoEliminar']) && isset($_POST['nombreArchivoEdit'])) {
  $nombreArchivoEliminar = $_POST["nombreArchivoEliminar"];
  // Asegura que la eliminación ocurra en el directorio del script
  $archivoParaEliminar = __DIR__ . '/' . $nombreArchivoEliminar;

  if (unlink($archivoParaEliminar)) { // Elimina el archivo anterior por su nombre
    $nombreOriginal = $_FILES['fileFichaTecnicaEdit']['name'];
    $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
    $nombreArchivoPost = preg_replace("/[^a-zA-Z0-9._]/", "", $_POST['nombreArchivoEdit']);
    $nuevoNombre = __DIR__ . '/' . $nombreArchivoPost . "." . $extension; // Asegura que el guardado ocurra en el directorio del script
    $guardado = $_FILES['fileFichaTecnicaEdit']['tmp_name'];

    if (move_uploaded_file($guardado, $nuevoNombre)) { // Guarda el archivo nuevo
      $response = ["status" => "ok"];
    } else {
      $response = ["status" => "error"];
    }
  } else {
    $response = ["status" => "error"];
  }
  ob_clean(); // Limpia el buffer de salida sin enviarlo al cliente
  header('Content-Type: application/json'); // Asegúrate de que esta línea esté antes de cualquier salida.
  echo json_encode($response);
  exit(); // Termina la ejecución del script
}
ob_end_flush(); // Envía el buffer de salida y lo desactiva