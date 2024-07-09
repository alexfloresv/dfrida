
<?php
ob_start(); // Inicia el buffer de salida
if (isset($_FILES['fileFichaTecnica']) && isset($_POST['nombreArchivo'])) {

  $nombreOriginal = $_FILES['fileFichaTecnica']['name'];
  $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
  $nombreArchivoPost = preg_replace("/[^a-zA-Z0-9._]/", "", $_POST['nombreArchivo']);
  $nuevoNombre = $nombreArchivoPost . "." . $extension;
  $guardado = $_FILES['fileFichaTecnica']['tmp_name'];
  if (move_uploaded_file($guardado, $nuevoNombre)) {
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
