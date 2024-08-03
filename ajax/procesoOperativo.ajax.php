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
  $create = new procesoOperativoAjax();
  $create->jsonCrearTipoProceso = $_POST["jsonCrearTipoProceso"];
  $create->ajaxCrearTipoProcModal($_POST["jsonCrearTipoProceso"]);
}

//data table tipos de procesos operativos
if (isset($_POST["todosLosTiposProcOp"])) {
  $todosLosTiposProcOp = new procesoOperativoAjax();
  $todosLosTiposProcOp->ajaxDTableTipoProcOp();
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
  $create = new procesoOperativoAjax();
  $create->jsonCrearProceso = $_POST["jsonCrearProceso"];
  $create->ajaxCrearProcOpModal($_POST["jsonCrearProceso"]);
}

//// visualizar datos para editar tipo de proceso operativo
if (isset($_POST["codTipoProc"])) {
  $view = new procesoOperativoAjax();
  $view->codTipoProc = $_POST["codTipoProc"];
  $view->ajaxViewDataTipoProcOp($_POST["codTipoProc"]);
}

//editar  tipo de proceso operativo 
if (isset($_POST["jsonEditarTipoProc"])) {
  $edit = new procesoOperativoAjax();
  $edit->jsonEditarTipoProc = $_POST["jsonEditarTipoProc"];
  $edit->ajaxEditarTipoProc($_POST["jsonEditarTipoProc"]);
}

//borrar  tipo de proceso operativo 
if (isset($_POST["codTipoProcDelet"])) {
  $delete = new procesoOperativoAjax();
  $delete->codTipoProcDelet = $_POST["codTipoProcDelet"];
  $delete->ajaxBorrarTipoProc($_POST["codTipoProcDelet"]);
}

//funcion visualizar datos para editar proceso operativo principal
if (isset($_POST["codProcOpEditView"])) {
  $view = new procesoOperativoAjax();
  $view->codProcOpEditView = $_POST["codProcOpEditView"];
  $view->ajaxViewDataProcOp($_POST["codProcOpEditView"]);
}

//funcion para mostrar el selec2 de selecionar salida materia prima edit
if (isset($_POST["todasLasSalidasMprimaEdit"])) {
  $todasLasSalidasMprimaEdit = new procesoOperativoAjax();
  $todasLasSalidasMprimaEdit->ajaxSelect2SalMprimaEdit();
}
//funcion para mostrar el selec2 de pedidos edit
if (isset($_POST["todosLosPedidosEdit"])) {
  $todosLosPedidosEdit = new procesoOperativoAjax();
  $todosLosPedidosEdit->ajaxSelect2PedidosEdit();
}

//editar proceso operativo 
if (isset($_POST["jsonEditarProcOp"])) {
  $edit = new procesoOperativoAjax();
  $edit->jsonEditarProcOp = $_POST["jsonEditarProcOp"];
  $edit->ajaxEditarProcOp($_POST["jsonEditarProcOp"]);
}

//borrar  proceso operativo 
if (isset($_POST["codProcDelet"])) {
  $delete = new procesoOperativoAjax();
  $delete->codProcDelet = $_POST["codProcDelet"];
  $delete->ajaxBorrarProcOp($_POST["codProcDelet"]);
}

//iniciar proceso operativo
if (isset($_POST["codIniProcOp"])) {
  $inicio = new procesoOperativoAjax();
  $inicio->codIniProcOp = $_POST["codIniProcOp"];
  $inicio->ajaxIniciarProcesoOperativo($_POST["codIniProcOp"]);
}

//finalizar proceso operativo
if (isset($_POST["codFinProcOp"])) {
  $fin = new procesoOperativoAjax();
  $fin->codFinProcOp = $_POST["codFinProcOp"];
  $fin->ajaxFinalizarProcesoOperativo($_POST["codFinProcOp"]);
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
      $procesoOp['buttons'] = FunctionProcesoOperativo::getBtnProcOp($procesoOp["idProcOp"], $procesoOp["estadoProcOp"]);
      $procesoOp['modalTipoProc'] = FunctionProcesoOperativo::getBtnVerTipoProc($procesoOp["idProcOp"], $procesoOp["idTipoProc"], $procesoOp["estadoProcOp"]);
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
  //data table tipos de procesos operativos
  public function ajaxDTableTipoProcOp()
  {
    $todosLosTiposProcOp = procesoOperativoController::ctrDTableTiposProcesosOperativos();
    foreach ($todosLosTiposProcOp as &$tipoProcesoOp) {
      $tipoProcesoOp['btns'] = FunctionProcesoOperativo::getBtnTipoProcOp($tipoProcesoOp["idTipoProc"]);
      $tipoProcesoOp['descFichTrab'] = FunctionProcesoOperativo::getBtnDescargarFichaTrabajoModalTipoProc($tipoProcesoOp["idFichaProc"]);
    }
    //unset($procesoOp["idProcOp"]);

    echo json_encode($todosLosTiposProcOp);
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
  //// visualizar datos para editar tipo de proceso operativo
  public function ajaxViewDataTipoProcOp($codTipoProc)
  {
    $todosLosTiposProcOp = procesoOperativoController::ctrViewDataTipoProcOp($codTipoProc);
    echo json_encode($todosLosTiposProcOp);
  }

  //editar  tipo de proceso operativo 
  public function ajaxEditarTipoProc($jsonEditarTipoProc)
  {
    $response = procesoOperativoController::ctrEditarTipoProc($jsonEditarTipoProc);
    echo json_encode($response);
  }
  //borrar  tipo de proceso operativo 
  public function ajaxBorrarTipoProc($codTipoProcDelet)
  {
    $response = procesoOperativoController::ctrBorrarTipoProc($codTipoProcDelet);
    echo json_encode($response);
  }
  //funcion visualizar datos para editar proceso operativo principal
  public function ajaxViewDataProcOp($codProcOpEditView)
  {
    $response = procesoOperativoController::ctrViewDataProcOp($codProcOpEditView);
    echo json_encode($response);
  }
  //funcion para mostrar el selec2 de selecionar salida materia prima edit
  public function ajaxSelect2SalMprimaEdit()
  {
    $todasLasSalidasMprimaEdit = procesoOperativoController::ctrSelect2SalMprimaEdit();
    echo json_encode($todasLasSalidasMprimaEdit);
  }
  //funcion para mostrar el selec2 de pedidos edit
  public function ajaxSelect2PedidosEdit()
  {
    $todosLosPedidosEdit = procesoOperativoController::ctrSelect2PedidoEdit();
    echo json_encode($todosLosPedidosEdit);
  }

  //editar proceso operativo 
  public function ajaxEditarProcOp($jsonEditarProcOp)
  {
    $response = procesoOperativoController::ctrEditarProcOp($jsonEditarProcOp);
    echo json_encode($response);
  }
  //borrar  proceso operativo 
  public function ajaxBorrarProcOp($codProcDelet)
  {
    $response = procesoOperativoController::ctrBorrarProcOp($codProcDelet);
    echo json_encode($response);
  }

  //iniciar proceso operativo
  public function ajaxIniciarProcesoOperativo($codIniProcOp)
  {
    $response = procesoOperativoController::ctrIniciarProcesoOperativo($codIniProcOp);
    echo json_encode($response);
  }

 //finalizar proceso operativo
  public function ajaxFinalizarProcesoOperativo($codFinProcOp)
  {
    $response = procesoOperativoController::ctrFinalizarProcesoOperativo($codFinProcOp);
    echo json_encode($response);
  }
}

