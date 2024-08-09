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
      $produccion['nombreProducc'] = FunctionProduccion::getNombreProduccion($produccion["nombreProduccion"],$produccion["nombreProcOp"]);
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

}

