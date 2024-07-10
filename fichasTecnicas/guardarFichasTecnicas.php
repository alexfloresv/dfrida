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
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_INI_SIZE) {
    addResponse($response, "error", "El archivo excede la directiva upload_max_filesize en php.ini.");
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_FORM_SIZE) {
    addResponse($response, "error", "El archivo excede el límite especificado en el formulario HTML.");
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_PARTIAL) {
    addResponse($response, "error", "El archivo solo se subió parcialmente.");
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_NO_TMP_DIR) {
    addResponse($response, "error", "Falta una carpeta temporal en el servidor.");
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_CANT_WRITE) {
    addResponse($response, "error", "No se pudo escribir el archivo en el disco.");
  } elseif ($_FILES['fileFichaTecnica']['error'] == UPLOAD_ERR_EXTENSION) {
    addResponse($response, "error", "Una extensión PHP detuvo la subida del archivo.");
  } else {
    $destino = __DIR__; // Asegúrate de ajustar esta ruta según sea necesario
    if (!is_writable($destino)) {
      addResponse($response, "error", "La carpeta de destino no es accesible o no tiene permisos de escritura.");
    } else {
      addResponse($response, "ok", "El archivo llegó con éxito a la función de move_uploaded_file."); // Mensaje de éxito antes de mover el archivo
      $nombreOriginal = $_FILES['fileFichaTecnica']['name'];
      $extension = pathinfo($nombreOriginal, PATHINFO_EXTENSION);
      $nombreArchivoPost = preg_replace("/[^a-zA-Z0-9._]/", "", $_POST['nombreArchivo']);
      $nuevoNombre = $nombreArchivoPost . "." . $extension;
      $guardado = $_FILES['fileFichaTecnica']['tmp_name'];
      if (move_uploaded_file($guardado, $destino . '/' . $nuevoNombre)) {
        addResponse($response, "ok", "Archivo subido con éxito al servidor.");
      } else {
        addResponse($response, "error", "Error al mover el archivo subido a la carpeta de Fichas Tecnicas.");
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