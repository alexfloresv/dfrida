<?php
ob_start(); // Inicia el buffer de salida

if (isset($_POST["docFichaTec"])) {
  $nombreArchivoDescargar = $_POST["docFichaTec"];
  $archivoParaDescargar = $nombreArchivoDescargar;

  if (file_exists($archivoParaDescargar)) {
    // Registra el archivo que se encontró y está listo para su descarga
    error_log("Archivo encontrado y listo para descarga: " . $archivoParaDescargar);

    // Prepara la URL para la descarga del archivo
    // Asegúrate de que esta URL sea accesible para el cliente
    $urlDescarga = 'fichasTecnicas/' . basename($archivoParaDescargar);

    // Prepara la respuesta
    $response = ['status' => 'success', 'url' => $urlDescarga];
  } else {
    // Si el archivo no existe, envía una respuesta de error
    $response['message'] = 'Archivo no encontrado';
  }
}
// Limpia el buffer de salida y envía la respuesta JSON
ob_end_clean();
header('Content-Type: application/json');
echo json_encode($response);
exit();