<?php
require_once "../controller/categoriaProdMprima.controller.php";
require_once "../model/categoriaProdMprima.model.php";
require_once "../functions/categoriaProdMprima.functions.php";

require_once "../controller/productMprima.controller.php";
require_once "../model/productMprima.model.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de CategoriaProductosMprima
if (isset($_POST["todasLasCategoriasProductosMprima"])) {
  $todasLasCategoriaProductosMprima = new CategoriaProductMprimaAjax();
  $todasLasCategoriaProductosMprima->ajaxDTableCateProductosMprima();
}
//  crear Producto
if (isset($_POST["jsonCrearCategoriaProductosMprima"])) {
  $create = new CategoriaProductMprimaAjax();
  $create->jsonCrearCategoriaProductosMprima = $_POST["jsonCrearCategoriaProductosMprima"];
  $create->CrearCategoriaProductoMprima($_POST["jsonCrearCategoriaProductosMprima"]);
}
//  visualizar datos CategoriaProductosMprima
if (isset($_POST["codCatProMp"])) {
  $view = new CategoriaProductMprimaAjax();
  $view->codCatProMp = $_POST["codCatProMp"];
  $view->ajaxViewCateProductoMprima($_POST["codCatProMp"]);
}
//editar CategoriaProductosMprima
if (isset($_POST["jsonEditarCategoriaProductosMprima"])) {
  $edit = new CategoriaProductMprimaAjax();
  $edit->jsonEditarCategoriaProductosMprima = $_POST["jsonEditarCategoriaProductosMprima"];
  $edit->ajaxEditarCategoriaProductosMprima($_POST["jsonEditarCategoriaProductosMprima"]);
}
//borrar CategoriaProductosMprima
if (isset($_POST["jsonBorraCateProductoMp"])) {
  $delete = new CategoriaProductMprimaAjax();
  $delete->jsonBorraCateProductoMp = $_POST["jsonBorraCateProductoMp"];
  $delete->ajaxBorrarCateProductoMprima($_POST["jsonBorraCateProductoMp"]);
}

//select2 para CategoriaProductosMprima  
if (isset($_POST["todasLasCategoriasMprima"])) {
  $todasLasCategoriasMprima = new CategoriaProductMprimaAjax();
  $todasLasCategoriasMprima->ajaxCateSelect2Mprima();
}

//select2 para selecioanr proveedores  

if (isset($_POST["todosLosProveedores"])) {
  $todosLosProveedores = new CategoriaProductMprimaAjax();
  $todosLosProveedores->ajaxCateSelect2MprimaProvee();
}
/////////////////////////////

class CategoriaProductMprimaAjax
{
  //datatable de CategoriaProductosMprima
  public function ajaxDTableCateProductosMprima()
  {
    $todosLosCategoriaProductosMprima = CategoriaProductsMprimaController::ctrGetAllCategoriesViewMp();
    foreach ($todosLosCategoriaProductosMprima as &$producto) {
      $producto['buttons'] = FunctionCategoriaProductosMprima::getBtnCategoriaMprima($producto["idCatMPrima"]);
    }
    //mostar todos los CategoriaProductosMprima DataTable
    echo json_encode($todosLosCategoriaProductosMprima);
  }

  //  crear CategoriaProductosMprima
  public function CrearCategoriaProductoMprima($jsonCrearCategoriaProductosMprima)
  {
    $crearCateProductoMprima = json_decode($jsonCrearCategoriaProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo

    $response = CategoriaProductsMprimaController::ctrCreateCategoria($crearCateProductoMprima);
    echo json_encode($response);
  }
  //  visualizar datos CategoriaProductosMprima
  public function ajaxViewCateProductoMprima($codCatProMp)
  {
    $codProductoMp = json_decode($codCatProMp, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsMprimaController::ctrViewProductoMprima($codProductoMp);
    echo json_encode($response);
  }

  //  editar CategoriaProductosMprima
  public function ajaxEditarCategoriaProductosMprima($jsonEditarCategoriaProductosMprima)
  {
    $editarCategoriaProductosMprima = json_decode($jsonEditarCategoriaProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsMprimaController::ctrEditCategoriaMprima($editarCategoriaProductosMprima);
    echo json_encode($response);
  }
  //borrar CategoriaProductosMprima
  public function ajaxBorrarCateProductoMprima($jsonBorraCateProductoMp)
  {
    $borrarProductoMprima = json_decode($jsonBorraCateProductoMp, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsMprimaController::ctrDeleteCateProductMprima($borrarProductoMprima);
    echo json_encode($response);
  }

  //select2 para CategoriaProductosMprima  
  public function ajaxCateSelect2Mprima()
  {
    $todasLasCategoriasMprima = ProductMprimaController::ctrGetAllCategoriesMprima();
    echo json_encode($todasLasCategoriasMprima);
  }

  //select2 para selecioanr proveedores  
  public function ajaxCateSelect2MprimaProvee()
  {
    $todasLasCategoriasMprima = ProductMprimaController::ctrGetAllProveedorMprima();
    echo json_encode($todasLasCategoriasMprima);
  }


}

