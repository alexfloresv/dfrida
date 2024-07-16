<?php
require_once "../controller/almacenProductos.controller.php";
require_once "../model/almacenProductos.model.php";
require_once "../functions/almacenProductos.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery

//datatable almacen productos
if (isset($_POST["todosLosProductosAlmacen"])) {
  $todosLosProductosAlmacen = new AlmacenProductosAjax();
  $todosLosProductosAlmacen->ajaxDTableAlmacenProductos();
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new AlmacenProductosAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class AlmacenProductosAjax
{
  //datatable almacen productos
  public function ajaxDTableAlmacenProductos()
  {
    $todosLosProductosAlmacen = almacenProductosController::ctrDTableAlmacenProductos();
    foreach ($todosLosProductosAlmacen as &$almacen) {
      // Realiza la multiplicación normalmente
      $almacen['totalProdAlma'] = $almacen["precioProdAlma"] * $almacen["cantidadProdAlma"];
      // Si cantidadProdAlma es negativo, asegura que el totalProdAlma también lo sea
      if ($almacen["cantidadProdAlma"] < 0) {
        $almacen['totalProdAlma'] = -abs($almacen['totalProdAlma']);
      }
    }
    unset($almacen); // Corrige la eliminación de la referencia
  
    echo json_encode($todosLosProductosAlmacen);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

