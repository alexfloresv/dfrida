<?php
require_once "../controller/almacenProductos.controller.php";
require_once "../model/almacenProductos.model.php";
require_once "../functions/almacenProductos.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery

 //datatable almacen productos
if (isset($_POST["todosLosProductosAlmacen"])) {
  $todosLosProductosAlmacen = new AlmacenProductosAjax();
  $todosLosProductosAlmacen->ajaxDTableAlmacenProductos();
}

//visualizar ingreos en el modal de ingresos productos
if (isset($_POST["codAllIngProd"])) {
  $view = new AlmacenProductosAjax();
  $view->codAllIngProd = $_POST["codAllIngProd"];
  $view->ajaxVerProductosIngresadosModal($_POST["codAllIngProd"]);
}

//  crear ingreso productos
if (isset($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"])) {
  $create = new AlmacenProductosAjax();
  $create->jsonCrearIngProd = $_POST["jsonCrearIngProd"];
  $create->jsonProductosIngProd = $_POST["jsonProductosIngProd"];
  $create->ajaxCrearIngresoProd($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"]);
}

//editar ProductosMprima
if (isset($_POST["jsonEditarProductosMprima"])) {
  $edit = new AlmacenProductosAjax();
  $edit->jsonEditarProductosMprima = $_POST["jsonEditarProductosMprima"];
  $edit->ajaxEditarProductosMprima($_POST["jsonEditarProductosMprima"]);
}
//borrar cotizacion
if (isset($_POST["jsonBorraCotizacion"])) {
  $delete = new AlmacenProductosAjax();
  $delete->jsonBorraCotizacion = $_POST["jsonBorraCotizacion"];
  $delete->ajaxBorrarCotizacion($_POST["jsonBorraCotizacion"]);
}
//Agregar Producto al ingreso
if (isset($_POST["codAddIngProdModal"])) {
  $add = new AlmacenProductosAjax();
  $add->codAddIngProdModal = $_POST["codAddIngProdModal"];
  $add->ajaxAgregarIngProducto($_POST["codAddIngProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new AlmacenProductosAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class AlmacenProductosAjax
{
 //datatable almacen productos

  public function ajaxDTableAlmacenProductos()
  {
    $todosLosProductosAlmacen = almacenProductosController::ctrDTableAlmacenProductos();
    foreach ($todosLosProductosAlmacen as &$almacen) {

      $almacen['totalProdAlma'] = $almacen["precioProdAlma"] * $almacen["cantidadProdAlma"];
    }
    unset($almacen["precioProdAlma"]);
    
    echo json_encode($todosLosProductosAlmacen);
  }

  //visualizar ingreos en el modal de ingresos productos
  public function ajaxVerProductosIngresadosModal($codAllIngProd)
  {
    $response = almacenProductosController::ctrVerProductosIngresadosModal($codAllIngProd);
    echo json_encode($response);
  }

  //  crear ingreso productos
  public function ajaxCrearIngresoProd($jsonCrearIngProd, $jsonProductosIngProd, )
  {
    $crearIngresoProd = json_decode($jsonCrearIngProd, true);

    $response = almacenProductosController::ctrCrearIngresoProd($crearIngresoProd, $jsonProductosIngProd);
    echo json_encode($response);
  }

  //  editar ProductosMprima
  public function ajaxEditarProductosMprima($jsonEditarProductosMprima)
  {
    $editarProductosMprima = json_decode($jsonEditarProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrEditProductMprima($editarProductosMprima);
    echo json_encode($response);
  }
  //borrar ProductosMprima
  public function ajaxBorrarCotizacion($jsonBorraCotizacion)
  {
    $borrarCotizacion = json_decode($jsonBorraCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrDeleteCotizacion($borrarCotizacion);
    echo json_encode($response);
  }

  //Agregar Producto a la cotizacion
  public function ajaxAgregarIngProducto($codAddIngProdModal)
  {
    $codIngProducto = json_decode($codAddIngProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrAgregarIngProducto($codIngProducto);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = almacenProductosController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

