<?php
require_once "../controller/products.controller.php";
require_once "../model/products.model.php";
require_once "../functions/productos.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de Productos
if (isset($_POST["todosLosProductos"])) {
  $todosLosProductos = new ProductAjax();
  $todosLosProductos->ajaxDTableProductos();
}
//  crear Producto
if (isset($_POST["jsonCrearProductos"])) {
  $create = new ProductAjax();
  $create->jsonCrearProductos = $_POST["jsonCrearProductos"];
  $create->ajaxCrearProducto($_POST["jsonCrearProductos"]);
}
//  visualizar datos Producto
if (isset($_POST["codPro"])) {
  $view = new ProductAjax();
  $view->codProduct = $_POST["codPro"];
  $view->ajaxViewProducto($_POST["codPro"]);
}
//editar Productos
if (isset($_POST["jsonEditarProductos"])) {
  $edit = new ProductAjax();
  $edit->jsonEditarProductos = $_POST["jsonEditarProductos"];
  $edit->ajaxEditarProductos($_POST["jsonEditarProductos"]);
}
//borrar Producto
if (isset($_POST["jsonBorraProducto"])) {
  $delete = new ProductAjax();
  $delete->jsonBorraProducto = $_POST["jsonBorraProducto"];
  $delete->ajaxBorrarProducto($_POST["jsonBorraProducto"]);
}
/////////////////////////////

class ProductAjax
{
  //datatable de Productos
  public function ajaxDTableProductos()
  {
    $todosLosProductos = ProductsController::ctrDTableProductos();
    foreach ($todosLosProductos as &$producto) {
      $producto['buttons'] = FunctionProductos::getBtnProductos($producto["idProd"], $producto["idCatPro"]);
    }
    //mostar todos los Productos DataTable
    echo json_encode($todosLosProductos);
  }

  //  crear Producto
  public function ajaxCrearProducto($jsonCrearProductos)
  {
    $crearProducto = json_decode($jsonCrearProductos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $valoresVacios = 0;
    foreach ($crearProducto as $valor) {
      if (empty($valor)) {
        $valoresVacios++;
      }
    }
    if ($valoresVacios > 2) {
      echo json_encode("error");
      return;
    }
    $response = ProductsController::ctrCrearProducto($crearProducto);
    echo json_encode($response);
  }
  //  visualizar datos Producto
  public function ajaxViewProducto($codProduct)
  {
    $codProducto = json_decode($codProduct, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductsController::ctrViewProducto($codProduct);
    echo json_encode($response);
  }

  //  editar Productos
  public function ajaxEditarProductos($jsonEditarProductos)
  {
    $editarProductos = json_decode($jsonEditarProductos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductsController::ctrEditProduct($editarProductos);
    echo json_encode($response);
  }
  //borrar Producto
  public function ajaxBorrarProducto($jsonBorraProducto)
  {
    $borrarProducto = json_decode($jsonBorraProducto, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ProductsController::ctrDeleteProduct($borrarProducto);
    echo json_encode($response);
  }

}

