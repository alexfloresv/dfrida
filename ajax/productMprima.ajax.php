<?php
require_once "../controller/productMprima.controller.php";
require_once "../model/productMprima.model.php";
require_once "../functions/productoMprima.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de ProductosMprima
if (isset($_POST["todosLosProductosMprima"])) {
  $todosLosProductosMprima = new ProductMprimaAjax();
  $todosLosProductosMprima->ajaxDTableProductosMprima();
}
//  crear ProductosMprima
if (isset($_POST["jsonCrearProductosMprima"])) {
  $create = new ProductMprimaAjax();
  $create->jsonCrearProductosMprima = $_POST["jsonCrearProductosMprima"];
  $create->ajaxCrearProductoMprima($_POST["jsonCrearProductosMprima"]);
}
//  visualizar datos ProductosMprima
if (isset($_POST["codProMp"])) {
  $view = new ProductMprimaAjax();
  $view->codProMp = $_POST["codProMp"];
  $view->ajaxViewProductoMprima($_POST["codProMp"]);
}
//editar ProductosMprima
if (isset($_POST["jsonEditarProductosMprima"])) {
  $edit = new ProductMprimaAjax();
  $edit->jsonEditarProductosMprima = $_POST["jsonEditarProductosMprima"];
  $edit->ajaxEditarProductosMprima($_POST["jsonEditarProductosMprima"]);
}
//borrar ProductosMprima
if (isset($_POST["jsonBorraProductoMprima"])) {
  $delete = new ProductMprimaAjax();
  $delete->jsonBorraProductoMprima = $_POST["jsonBorraProductoMprima"];
  $delete->ajaxBorrarProductoMprima($_POST["jsonBorraProductoMprima"]);
}
/////////////////////////////

class ProductMprimaAjax
{
  //datatable de ProductosMprima
  public function ajaxDTableProductosMprima()
  {
    $todosLosProductosPrima = ProductMprimaController::ctrDTableProductosMprima();
    foreach ($todosLosProductosPrima as &$productoMprima) {
      $productoMprima['buttons'] = FunctionProductoMprima::getBtnProductosMprima($productoMprima["idMprima"]);
    }
    //mostar todos los ProductosMprima DataTable
    echo json_encode($todosLosProductosPrima);
  }

  //  crear ProductosMprima
  public function ajaxCrearProductoMprima($jsonCrearProductosMprima)
  {
    $crearProductoMprima = json_decode($jsonCrearProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $valoresVacios = 0;
    foreach ($crearProductoMprima as $valor) {
      if (empty($valor)) {
        $valoresVacios++;
      }
    }
    if ($valoresVacios > 2) {
      echo json_encode("error");
      return;
    }
    $response = ProductMprimaController::ctrCrearProductoMprima($crearProductoMprima);
    echo json_encode($response);
  }
  //  visualizar datos ProductosMprima
  public function ajaxViewProductoMprima($codProMp)
  {
    $codProductoMp = json_decode($codProMp, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductMprimaController::ctrViewProductoMprima($codProductoMp);
    echo json_encode($response);
  }

  //  editar ProductosMprima
  public function ajaxEditarProductosMprima($jsonEditarProductosMprima)
  {
    $editarProductosMprima = json_decode($jsonEditarProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductMprimaController::ctrEditProductMprima($editarProductosMprima);
    echo json_encode($response);
  }
  //borrar ProductosMprima
  public function ajaxBorrarProductoMprima($jsonBorraProductoMprima)
  {
    $borrarProductoMprima = json_decode($jsonBorraProductoMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductMprimaController::ctrDeleteProductMprima($borrarProductoMprima);
    echo json_encode($response);
  }

}

