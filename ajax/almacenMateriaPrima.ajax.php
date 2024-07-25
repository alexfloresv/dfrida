<?php
require_once "../controller/almacenMateriaPrima.controller.php";
require_once "../model/almacenMateriaPrima.model.php";
//require_once "../functions/almacenMateriaPrima.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery

//datatable almacen productos
if (isset($_POST["todosLosProductosAlmacenMprima"])) {
  $todosLosProductosAlmacenMprima = new AlmacenProductosPrimaAjax();
  $todosLosProductosAlmacenMprima->ajaxDTableAlmacenProductosPrima();
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new AlmacenProductosPrimaAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class AlmacenProductosPrimaAjax
{
  //datatable almacen productos
  public function ajaxDTableAlmacenProductosPrima()
  {
    $todosLosProductosAlmacenMprima = almacenMateriaPrimaController::ctrDTableAlmacenProductosPrima();
    foreach ($todosLosProductosAlmacenMprima as &$almacen) {
      // Realiza la multiplicación normalmente
      $almacen['totalProdAlmaMprima'] = $almacen["precioMprimaAlma"] * $almacen["cantidadMprimaAlma"];
      // Si cantidadMprimaAlma es negativo, asegura que el totalProdAlmaMprima también lo sea
      if ($almacen["cantidadMprimaAlma"] < 0) {
        $almacen['totalProdAlmaMprima'] = -abs($almacen['totalProdAlmaMprima']);
      }
    }
    unset($almacen); // 
  
    echo json_encode($todosLosProductosAlmacenMprima);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

