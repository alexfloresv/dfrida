<?php
//controladores
require_once "../controller/productoMerma.controller.php";
require_once "../model/productoMerma.model.php";
require_once "../controller/ingresoProd.controller.php";
require_once "../model/ingresoProd.model.php";
require_once "../functions/productoMerma.functions.php";

//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

//funciones para escuchar entrad ade datos desde $.ajax de jquery
  //datatable de prodcucto mermas
if (isset($_POST["todosLosRegistrosProdMerma"])) {
  $todosLosRegistrosProdMerma = new ProductoMermaAjax();
  $todosLosRegistrosProdMerma->ajaxDTableProductoMerma();
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

//funcion para trear crear registro de propducto merma
if (isset($_POST["jsonCrearRegistroMerma"], $_POST["jsonProdMerma"], $_POST["jsonMprimaMerma"])) {
  $create = new ProductoMermaAjax();
  $create->jsonCrearRegistroMerma = $_POST["jsonCrearRegistroMerma"];
  $create->jsonProdMerma = $_POST["jsonProdMerma"];
  $create->jsonMprimaMerma = $_POST["jsonMprimaMerma"];
  $create->ajaxCrearRegProdMerma($_POST["jsonCrearRegistroMerma"], $_POST["jsonProdMerma"], $_POST["jsonMprimaMerma"]);
}

class ProductoMermaAjax
{
  //datatable de prodcucto mermas
  public function ajaxDTableProductoMerma()
  {
    $todosLosProdMerma = ProductoMermaController::ctrDTableProductoMerma();
    foreach ($todosLosProdMerma as &$merma) {
      $merma['stateProdMerma'] = FunctionProductoMerma::getEstadoProdMerma($merma["estadoProdMerma"]);
      $merma['btnProdMerma'] = FunctionProductoMerma::btnProdMerma($merma["idProdMerma"]);
      $merma['btnMprimaMerma'] = FunctionProductoMerma::btnProdMprimaMerma($merma["idProdMerma"]);
    
    }
    //mostar todos los usuarios DataTable
    echo json_encode($todosLosProdMerma);
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
  public function ajaxCrearRegProdMerma($jsonCrearRegistroMerma, $jsonProdMerma, $jsonMprimaMerma)
  {
    $response = ProductoMermaController::CrearRegProdMerma($jsonCrearRegistroMerma, $jsonProdMerma, $jsonMprimaMerma);
    echo json_encode($response);
  }
}

