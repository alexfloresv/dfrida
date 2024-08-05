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


class ProduccionAjax
{
  //datatable de produccion
  public function ajaxDTableProduccion()
  {
    $todasLasProducciones = ProduccionController::ctrDTableProduccion();
    foreach ($todasLasProducciones as &$produccion) {
      $produccion['btnProductos'] = FunctionProduccion::getBtnProductos($produccion["idCoti"]);
      $produccion['estadoProduccion'] = FunctionProduccion::getEstadoProduccion($produccion["estadoProduccion"]);
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todasLasProducciones);
  }


}

