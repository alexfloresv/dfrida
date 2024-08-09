<?php
//controladores
require_once "../controller/merma.controller.php";
require_once "../model/merma.model.php";
require_once "../functions/merma.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

//funciones para escuchar entrad ade datos desde $.ajax de jquery
//datatable de mermas
if (isset($_POST["todasLasMermas"])) {
  $todasLasMermas = new MermaAjax();
  $todasLasMermas->ajaxDTableMerma();
}


class MermaAjax
{
  //datatable de mermas
  public function ajaxDTableMerma()
  {
    $todasLasMermas = MermaController::ctrDTableMerma();
    foreach ($todasLasMermas as &$merma) {
      $merma['estadoMerma'] = FunctionMerma::getEstadoMerma($merma["estadoMerma"]);
      $merma['btnMprimaDeProcOp'] = FunctionMerma::btnProductosMprimaMerma($merma["idSalMprima"], $merma["estadoMerma"]);
      $merma['btnProcOpOrigin'] = FunctionMerma::btnVerProcOpOrigin($merma["idProcOp"]);
      $merma['btnMermaAceptada'] = FunctionMerma::btnVerMermaAceptada($merma["idMerma"], $merma["estadoMerma"]);
      $merma['btnEditMerma'] = FunctionMerma::btnEditMerma($merma["idMerma"], $merma["estadoMerma"]);
      $merma['fechaMermaAprobada'] = FunctionMerma::getFechaAprobadoMerma($merma["fechaMermaAprob"]);
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todasLasMermas);
  }


}

