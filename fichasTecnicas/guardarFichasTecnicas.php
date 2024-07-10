<?php
ob_start(); // Inicia el buffer de salida
$response = []; // Inicializa la respuesta como un array vacío

function addResponse(&$response, $status, $message)
{
  $response[] = ["status" => $status, "message" => $message];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (!isset($_FILES['fileFichaTecnica'])) {
    addResponse($response, "error", "No se subió ningún archivo.");

  } else {
    $destino = __DIR__; // Asegúrate de ajustar esta ruta según sea necesario
    if (!is_writable($destino)) {
      addResponse($response, "error", "La carpeta de destino no es accesible o no tiene permisos de escritura.");
    } else {
      $nombreOriginal = $_FILES['fileFichaTecnica']['name'];
      $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
      $nombreArchivoPost = preg_replace("/[^a-zA-Z0-9._]/", "", $_POST['nombreArchivo']);
      $nuevoNombre = $nombreArchivoPost . "." . $extension;
      $guardado = $_FILES['fileFichaTecnica']['tmp_name'];
      if (move_uploaded_file($guardado, $destino . '/' . $nuevoNombre)) {
        addResponse($response, "ok", "Ficha Tecnica Registrada Con exito");
      } else {
        addResponse($response, "error", "Error al crear la ficha Fichas Tecnica.");
      }
    }
  }
} else {
  addResponse($response, "error", "Método de solicitud no permitido.");
}

ob_clean(); // Limpia el buffer de salida sin enviarlo al cliente
header('Content-Type: application/json'); // Asegúrate de que esta línea esté antes de cualquier salida.
echo json_encode($response);
exit(); // Termina la ejecución del script
ob_end_flush(); // Envía el buffer de salida y lo desactiva