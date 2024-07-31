<?php
require_once "../controller/procesoOperativo.controller.php";
require_once "../model/procesoOperativo.model.php";
require_once "../functions/procesoOperativo.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de proceso Op
if (isset($_POST["todosLosProcOp"])) {
  $todosLosProcOp = new procesoOperativoAjax();
  $todosLosProcOp->ajaxDTableProcOp();
}

//funcion para mostrar el selec2 de fichas de trabajo
if (isset($_POST["todasLasFichasTrabajo"])) {
  $todasLasFichasTrabajo = new procesoOperativoAjax();
  $todasLasFichasTrabajo->ajaxSelect2FichTrabModal();
}

//crear el tipo de proceso operativo
if (isset($_POST["jsonCrearTipoProceso"])) {
  $view = new procesoOperativoAjax();
  $view->jsonCrearTipoProceso = $_POST["jsonCrearTipoProceso"];
  $view->ajaxCrearTipoProcModal($_POST["jsonCrearTipoProceso"]);
}

//funcion para mostrar el selec2 de pedidos
if (isset($_POST["todosLosPedidos"])) {
  $todosLosPedidos = new procesoOperativoAjax();
  $todosLosPedidos->ajaxSelect2Pedidos();
}

//funcion para mostrar el selec2 de tipo de procesos
if (isset($_POST["todosLosTiposdeProcesos"])) {
  $todosLosTiposdeProcesos = new procesoOperativoAjax();
  $todosLosTiposdeProcesos->ajaxSelect2TiposProcesos();
}

//funcion para mostrar el selec2 de selecionar salida materia prima
if (isset($_POST["todasLasSalidasMprima"])) {
  $todasLasSalidasMprima = new procesoOperativoAjax();
  $todasLasSalidasMprima->ajaxSelect2SalMprima();
}

//crear  proceso operativo principal
if (isset($_POST["jsonCrearProceso"])) {
  $view = new procesoOperativoAjax();
  $view->jsonCrearProceso = $_POST["jsonCrearProceso"];
  $view->ajaxCrearProcOpModal($_POST["jsonCrearProceso"]);
}

/////////////////////////////

class procesoOperativoAjax
{
  //datatable de proceso Op
  public function ajaxDTableProcOp()
  {
    $todosLosProcOp = procesoOperativoController::ctrDTableProcesosOperativos();
    foreach ($todosLosProcOp as &$procesoOp) {
      $procesoOp['btnIniProcOp'] = FunctionProcesoOperativo::getBtnInicioProc($procesoOp["idProcOp"], $procesoOp["estadoProcOp"]);
      $procesoOp['btnFinProcOp'] = FunctionProcesoOperativo::getBtnFinProc($procesoOp["idProcOp"], $procesoOp["estadoProcOp"]);
      $procesoOp['buttons'] = FunctionProcesoOperativo::getBtnProcOp($procesoOp["idProcOp"]);
      $procesoOp['modalTipoProc'] = FunctionProcesoOperativo::getBtnVerTipoProc($procesoOp["idTipoProc"]);
      $procesoOp['modalPedido'] = FunctionProcesoOperativo::getBtnVerPedido($procesoOp["idPedido"]);
      $procesoOp['modalSalProdMprima'] = FunctionProcesoOperativo::getBtnVerSalProdPrima($procesoOp["idSalMprima"]);
      $procesoOp['estado'] = FunctionProcesoOperativo::getEstadoProcOp($procesoOp["estadoProcOp"]);
    }
    unset($procesoOp["idProcOp"]);
    unset($procesoOp["idTipoProc"]);
    unset($procesoOp["idPedido"]);
    unset($procesoOp["idSalMprima"]);

    echo json_encode($todosLosProcOp);
  }

  //funcion para mostrar el selec2 de fichas de trabajo
  public function ajaxSelect2FichTrabModal()
  {
    $todasLasFichasTrabajo = procesoOperativoController::ctrSelect2FichTrabModal();
    echo json_encode($todasLasFichasTrabajo);
  }

  //crear el tipo de proceso operativo
  public function ajaxCrearTipoProcModal($jsonCrearTipoProceso)
  {
    $response = procesoOperativoController::ctrCrearTipoProcModal($jsonCrearTipoProceso);
    echo json_encode($response);
  }

  //funcion para mostrar el selec2 de pedidos
  public function ajaxSelect2Pedidos()
  {
    $todosLosPedidos = procesoOperativoController::ctrSelect2Pedido();
    echo json_encode($todosLosPedidos);
  }

  //funcion para mostrar el selec2 de tipo de procesos
  public function ajaxSelect2TiposProcesos()
  {
    $todosLosTiposdeProcesos = procesoOperativoController::ctrSelect2TiposProcesos();
    echo json_encode($todosLosTiposdeProcesos);
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima
  public function ajaxSelect2SalMprima()
  {
    $todasLasSalidasMprima = procesoOperativoController::ctrSelect2SalMprima();
    echo json_encode($todasLasSalidasMprima);
  }

//crear  proceso operativo principal
  public function ajaxCrearProcOpModal($jsonCrearProceso)
  {
    $response = procesoOperativoController::ctrCrearProcOpModal($jsonCrearProceso);
    echo json_encode($response);
  }
 


}

