<?php
require_once "../controller/categoriaProd.controller.php";
require_once "../model/categoriaProd.model.php";
require_once "../functions/categoriaProd.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de CategoriaProductos
if (isset($_POST["todasLasCategoriasProductos"])) {
  $todasLasCategoriaProductos = new CategoriaProductAjax();
  $todasLasCategoriaProductos->ajaxDTableCateProductos();
}
//  crear Producto
if (isset($_POST["jsonCrearCategoriaProductos"])) {
  $create = new CategoriaProductAjax();
  $create->jsonCrearCategoriaProductos = $_POST["jsonCrearCategoriaProductos"];
  $create->CrearCategoriaProducto($_POST["jsonCrearCategoriaProductos"]);
}
//  visualizar datos CategoriaProductos
if (isset($_POST["codCatPro"])) {
  $view = new CategoriaProductAjax();
  $view->codCatPro = $_POST["codCatPro"];
  $view->ajaxViewCateProducto($_POST["codCatPro"]);
}
//editar CategoriaProductos
if (isset($_POST["jsonEditarCategoriaProductos"])) {
  $edit = new CategoriaProductAjax();
  $edit->jsonEditarCategoriaProductos = $_POST["jsonEditarCategoriaProductos"];
  $edit->ajaxEditarCategoriaProductos($_POST["jsonEditarCategoriaProductos"]);
}
//borrar CategoriaProductos
if (isset($_POST["jsonBorraCateProducto"])) {
  $delete = new CategoriaProductAjax();
  $delete->jsonBorraCateProducto = $_POST["jsonBorraCateProducto"];
  $delete->ajaxBorrarCateProducto($_POST["jsonBorraCateProducto"]);
}
/////////////////////////////

class CategoriaProductAjax
{
  //datatable de CategoriaProductos
  public function ajaxDTableCateProductos()
  {
    $todosLosCategoriaProductos = CategoriaProductsController::ctrGetAllCategoriesView();
    foreach ($todosLosCategoriaProductos as &$producto) {
      $producto['buttons'] = FunctionCategoriaProductos::getBtnCatProductos($producto["idCatPro"]);
    }
    //mostar todos los CategoriaProductos DataTable
    echo json_encode($todosLosCategoriaProductos);
  }

  //  crear CategoriaProductos
  public function CrearCategoriaProducto($jsonCrearCategoriaProductos)
  {
    $crearCateProducto = json_decode($jsonCrearCategoriaProductos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsController::ctrCreateCategoria($crearCateProducto);
    echo json_encode($response);
  }
  //  visualizar datos CategoriaProductos
  public function ajaxViewCateProducto($codProduct)
  {
    $codProducto = json_decode($codProduct, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsController::ctrViewProducto($codProduct);
    echo json_encode($response);
  }

  //  editar CategoriaProductos
  public function ajaxEditarCategoriaProductos($jsonEditarCategoriaProductos)
  {
    $editarCategoriaProductos = json_decode($jsonEditarCategoriaProductos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsController::ctrEditCategoria($editarCategoriaProductos);
    echo json_encode($response);
  }
  //borrar CategoriaProductos
  public function ajaxBorrarCateProducto($jsonBorraCateProducto)
  {
    $borrarProducto = json_decode($jsonBorraCateProducto, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CategoriaProductsController::ctrDeleteCateProduct($borrarProducto);
    echo json_encode($response);
  }

}

