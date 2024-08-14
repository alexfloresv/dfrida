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
//  aceptar merma data 
if (isset($_POST["codSalMprima"])) {
  $create = new MermaAjax();
  $create->codSalMprima = $_POST["codSalMprima"];
  $create->ajaxAceptarMerma($_POST["codSalMprima"]);
}

//  aceptar merma registro
if (isset($_POST["jsonCrearAcepMerma"], $_POST["jsonProductosMerma"])) {
  $create = new MermaAjax();
  $create->jsonCrearAcepMerma = $_POST["jsonCrearAcepMerma"];
  $create->jsonCrearAcepMerma = $_POST["jsonProductosMerma"];
  $create->ajaxAceptarMermaRegsitro($_POST["jsonCrearAcepMerma"], $_POST["jsonProductosMerma"]);
}

//visualizar datos  de proceso operativo principal en la merma
if (isset($_POST["jsonProcOpMerma"])) {
  $view = new MermaAjax();
  $view->jsonProcOpMerma = $_POST["jsonProcOpMerma"];
  $view->ajaxViewDataProcesoOperativoMerma($_POST["jsonProcOpMerma"]);
}

//visualizar merma aceptada
if (isset($_POST["codMerma"])) {
  $view = new MermaAjax();
  $view->codMerma = $_POST["codMerma"];
  $view->ajaxViewMermaAceptada($_POST["codMerma"]);
}

class MermaAjax
{
  //datatable de mermas
  public function ajaxDTableMerma()
  {
    $todasLasMermas = MermaController::ctrDTableMerma();
    foreach ($todasLasMermas as &$merma) {
      $merma['estadoMermaAcp'] = FunctionMerma::getEstadoMerma($merma["estadoMerma"]);
      $merma['btnMprimaDeProcOp'] = FunctionMerma::btnProductosMprimaMerma($merma["idSalMprima"], $merma["estadoMerma"], $merma["idMerma"]);
      $merma['btnProcOpOrigin'] = FunctionMerma::btnVerProcOpOrigin($merma["idProcOp"]);
      $merma['btnMermaAceptada'] = FunctionMerma::btnVerMermaAceptada($merma["idMerma"], $merma["estadoMerma"]);
      $merma['btnEditMerma'] = FunctionMerma::btnEditMerma($merma["idMerma"], $merma["estadoMerma"]);
      $merma['fechaMermaAprobada'] = FunctionMerma::getFechaAprobadoMerma($merma["fechaMermaAprob"]);
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todasLasMermas);
  }
  //  aceptar merma
  public function ajaxAceptarMerma($codSalMprima)
  {

    $response = MermaController::ctrAceptarMerma($codSalMprima);
    echo json_encode($response);
  }
  //  aceptar merma registro
  public function ajaxAceptarMermaRegsitro($jsonCrearAcepMerma, $jsonProductosMerma)
  {
    $dataMerma = json_decode($jsonCrearAcepMerma, true);
    $response = MermaController::ctrAceptarMermaRegsitro($dataMerma, $jsonProductosMerma);
    echo json_encode($response);
  }
  //visualizar datos  de proceso operativo principal en la merma
  public function ajaxViewDataProcesoOperativoMerma($jsonProcOpMerma)
  {
    $codProcOpMerma = json_decode($jsonProcOpMerma, true);
    $response = MermaController::ctrViewDataProcesoOperativoMerma($codProcOpMerma);
    echo json_encode($response);
  }
  //visualizar merma aceptada
  public function ajaxViewMermaAceptada($codMerma)
  {

    $response = MermaController::ctrViewMermaAceptada($codMerma);
    echo json_encode($response);
  }
}

