<?php
require_once "../controller/ingresoProd.controller.php";
require_once "../model/ingresoProd.model.php";
require_once "../functions/ingresoProd.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de ingresos productos
if (isset($_POST["todosLosIngProductos"])) {
  $todosLosIngProductos = new IngresoProdAjax();
  $todosLosIngProductos->ajaxDTableIngProdcuctos();
}

//visualizar ingreos en el modal de ingresos productos
if (isset($_POST["codAllIngProd"])) {
  $view = new IngresoProdAjax();
  $view->codAllIngProd = $_POST["codAllIngProd"];
  $view->ajaxVerProductosIngresadosModal($_POST["codAllIngProd"]);
}

//  crear ingreso productos
if (isset($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"])) {
  $create = new IngresoProdAjax();
  $create->jsonCrearIngProd = $_POST["jsonCrearIngProd"];
  $create->jsonProductosIngProd = $_POST["jsonProductosIngProd"];
  $create->ajaxCrearIngresoProd($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"]);
}

//editar ProductosMprima
if (isset($_POST["jsonEditarProductosMprima"])) {
  $edit = new IngresoProdAjax();
  $edit->jsonEditarProductosMprima = $_POST["jsonEditarProductosMprima"];
  $edit->ajaxEditarProductosMprima($_POST["jsonEditarProductosMprima"]);
}
//borrar cotizacion
if (isset($_POST["jsonBorraCotizacion"])) {
  $delete = new IngresoProdAjax();
  $delete->jsonBorraCotizacion = $_POST["jsonBorraCotizacion"];
  $delete->ajaxBorrarCotizacion($_POST["jsonBorraCotizacion"]);
}
//Agregar Producto al ingreso
if (isset($_POST["codAddIngProdModal"])) {
  $add = new IngresoProdAjax();
  $add->codAddIngProdModal = $_POST["codAddIngProdModal"];
  $add->ajaxAgregarIngProducto($_POST["codAddIngProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new IngresoProdAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class IngresoProdAjax
{
  //datatable de ingresos productos
  public function ajaxDTableIngProdcuctos()
  {
    $todosLosIngProductos = ingresoProdController::ctrDTableIngProdcuctos();
    foreach ($todosLosIngProductos as &$ingresos) {
      $ingresos['buttons'] = FunctionIngresoProd::getBtnIngProd($ingresos["idIngProd"]);
      $ingresos['modalIngProd'] = FunctionIngresoProd::getBtnVerIngProd($ingresos["idIngProd"]);
    }
    echo json_encode($todosLosIngProductos);
  }

  //visualizar ingreos en el modal de ingresos productos
  public function ajaxVerProductosIngresadosModal($codAllIngProd)
  {
    $response = ingresoProdController::ctrVerProductosIngresadosModal($codAllIngProd);
    echo json_encode($response);
  }

  //  crear ingreso productos
  public function ajaxCrearIngresoProd($jsonCrearIngProd, $jsonProductosIngProd, )
  {
    $crearIngresoProd = json_decode($jsonCrearIngProd, true);

    $response = ingresoProdController::ctrCrearIngresoProd($crearIngresoProd, $jsonProductosIngProd);
    echo json_encode($response);
  }

  //  editar ProductosMprima
  public function ajaxEditarProductosMprima($jsonEditarProductosMprima)
  {
    $editarProductosMprima = json_decode($jsonEditarProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrEditProductMprima($editarProductosMprima);
    echo json_encode($response);
  }
  //borrar ProductosMprima
  public function ajaxBorrarCotizacion($jsonBorraCotizacion)
  {
    $borrarCotizacion = json_decode($jsonBorraCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrDeleteCotizacion($borrarCotizacion);
    echo json_encode($response);
  }

  //Agregar Producto a la cotizacion
  public function ajaxAgregarIngProducto($codAddIngProdModal)
  {
    $codIngProducto = json_decode($codAddIngProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrAgregarIngProducto($codIngProducto);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

