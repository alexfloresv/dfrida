<?php
//controladores
require_once "../controller/productoMerma.controller.php";
require_once "../model/productoMerma.model.php";
//require_once "../functions/merma.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

//funciones para escuchar entrad ade datos desde $.ajax de jquery
//datatable de mermas
if (isset($_POST["todasLasMermas"])) {
  $todasLasMermas = new ProductoMermaAjax();
  $todasLasMermas->ajaxDTableMerma();
}

//funcion para traer la merma aprobada al selct 2
if (isset($_POST["todasLasMermamasConfirmadas"])) {
  $view = new ProductoMermaAjax();
  $view->ajaxViewDataMermaConfirmada();
}

//funcion para trear los productos de la merma aprobada
if (isset($_POST["codMermaConfir"])) {
  $add = new ProductoMermaAjax();
  $add->codMermaConfir = $_POST["codMermaConfir"];
  $add->ajaxAceptarMermaConfirmada($_POST["codMermaConfir"]);
}

//funcion para traer productos merma del catalogo al selct 2
if (isset($_POST["todasLosProductosMerma"])) {
  $view = new ProductoMermaAjax();
  $view->ajaxViewDataProdMermaCatalogo();
}

//funcion para trear los productos de catalogo para llnarlo en el campo de producto merma
if (isset($_POST["codProdCatal"])) {
  $add = new ProductoMermaAjax();
  $add->codProdCatal = $_POST["codProdCatal"];
  $add->ajaxProductoMermaCatalogo($_POST["codProdCatal"]);
}

class ProductoMermaAjax
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

  //funcion para traer la merma aprobada al selct 2
  public function ajaxViewDataMermaConfirmada()
  {
    $response = ProductoMermaController::ctrViewDataMermaConfirmada();
    echo json_encode($response);
  }

  //funcion para trear los productos de la merma aprobada
  public function ajaxAceptarMermaConfirmada($codMermaConfir)
  {
    $response = ProductoMermaController::ctrAceptarMermaConfirmada($codMermaConfir);
    echo json_encode($response);
  }
  //funcion para traer productos merma del catalogo al selct 2
  public function ajaxViewDataProdMermaCatalogo()
  {
    $response = ProductoMermaController::ctrViewDataProdMermaCatalogo();
    echo json_encode($response);
  }
  //funcion para trear los productos de catalogo para llnarlo en el campo de producto merma
  public function ajaxProductoMermaCatalogo($codProdCatal)
  {
    $response = ProductoMermaController::ctrProductoMermaCatalogo($codProdCatal);
    echo json_encode($response);
  }
}

