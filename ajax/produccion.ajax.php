<?php
//controladores
require_once "../controller/produccion.controller.php";
require_once "../model/produccion.model.php";
require_once "../functions/produccion.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

//funciones para escuchar entrad ade datos desde $.ajax de jquery
//datatable de produccion
if (isset($_POST["todasLasProducciones"])) {
  $todasLasProducciones = new ProduccionAjax();
  $todasLasProducciones->ajaxDTableProduccion();
}

//  aceptar produccion
if (isset($_POST["jsonAceptarProduccion"])) {
  $create = new ProduccionAjax();
  $create->jsonAceptarProduccion = $_POST["jsonAceptarProduccion"];
  $create->ajaxAceptarProduccion($_POST["jsonAceptarProduccion"]);
}

class ProduccionAjax
{
  //datatable de produccion
  public function ajaxDTableProduccion()
  {
    $todasLasProducciones = ProduccionController::ctrDTableProduccion();
    foreach ($todasLasProducciones as &$produccion) {
      $produccion['btnProductos'] = FunctionProduccion::getBtnProductos($produccion["idPedido"]);
      $produccion['estadoProduccionAcept'] = FunctionProduccion::getEstadoProduccion($produccion["estadoProduccion"]);
      $produccion['btnAceptarProduccion'] = FunctionProduccion::btnProduccion($produccion["idProduccion"], $produccion["estadoProduccion"]);
      $produccion['fechaAcep'] = FunctionProduccion::getFechaAprobadoProduccion($produccion["fechaAceptProducc"]);
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todasLasProducciones);
  }

  //  aceptar produccion
  public function ajaxAceptarProduccion($jsonAceptarProduccion)
  {
    $response = ProduccionController::ctrAceptarProduccion($jsonAceptarProduccion);
    echo json_encode($response);
  }
/* "{"producto0":{"codProdCoti":"41","nombreProdCoti":"productoNuevo","unidadProdCoti":"Uni","cantidadProdCoti":"1","precioProdCoti":"1.00"},"producto1":{"codProdCoti":"40","nombreProdCoti":"Polos Ed Fisica Unisex","unidadProdCoti":"Docena","cantidadProdCoti":"1","precioProdCoti":"480.00"}}" /// 
"{"producto0":{"codProdCoti":"41","nombreProdCoti":"productoNuevo","unidadProdCoti":"Uni","cantidadProdCoti":"1","precioProdCoti":"1.00"},"producto1":{"codProdCoti":"40","nombreProdCoti":"Polos Ed Fisica Unisex","unidadProdCoti":"Docena","cantidadProdCoti":"1","precioProdCoti":"480.00"},"producto2":{"codProdCoti":"39","nombreProdCoti":"Camisa Varon Colegio","unidadProdCoti":"Uni","cantidadProdCoti":"1","precioProdCoti":"60.00"}}"
*/
}

