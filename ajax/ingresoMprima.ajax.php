<?php
require_once "../controller/ingresoMprima.controller.php";
require_once "../model/ingresoMprima.model.php";
require_once "../functions/ingresoMprima.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery

//datatable de ingresos productos Prima
if (isset($_POST["todosLosIngProductosPrima"])) {
  $todosLosIngProductosPrima = new IngresoProdAjax();
  $todosLosIngProductosPrima->ajaxDTableIngProductosPrima();
}

//visualizar ingreos en el modal de ingresos productos
if (isset($_POST["codAllIngProd"])) {
  $view = new IngresoProdAjax();
  $view->codAllIngProd = $_POST["codAllIngProd"];
  $view->ajaxVerProductosIngresadosModal($_POST["codAllIngProd"]);
}

//  crear ingreso productos prima
if (isset($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"])) {
  $create = new IngresoProdAjax();
  $create->jsonCrearIngProd = $_POST["jsonCrearIngProd"];
  $create->jsonProductosIngProd = $_POST["jsonProductosIngProd"];
  $create->ajaxCrearIngresoMprima($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"]);
}

//visualizar datos para editar ingreso productos
if (isset($_POST["codIngProd"])) {
  $viewData = new IngresoProdAjax();
  $viewData->codIngProd = $_POST["codIngProd"];
  $viewData->ajaxVerDataIngProd($_POST["codIngProd"]);
}

//obtener precio para editar ingreso productos
if (isset($_POST["codProdIng"])) {
  $viewData = new IngresoProdAjax();
  $viewData->codProdIng = $_POST["codProdIng"];
  $viewData->ajaxPrecioProdEdit($_POST["codProdIng"]);
}

//editar ingreso productos
if (isset($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"])) {
  $edit = new IngresoProdAjax();
  $edit->jsonEditarIngProd = $_POST["jsonEditarIngProd"];
  $edit->jsonEditarIngProductosForms = $_POST["jsonEditarIngProductosForms"];
  $edit->ajaxEditarIngresoProd($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"]);
}


//borrar ingreso productos
if (isset($_POST["jsonBorraIngProdcutos"])) {
  $delete = new IngresoProdAjax();
  $delete->jsonBorraIngProdcutos = $_POST["jsonBorraIngProdcutos"];
  $delete->ajaxBorrarIngProductos($_POST["jsonBorraIngProdcutos"]);
}
//Agregar Producto prima al ingreso
if (isset($_POST["codAddIngProdModal"])) {
  $add = new IngresoProdAjax();
  $add->codAddIngProdModal = $_POST["codAddIngProdModal"];
  $add->ajaxAgregarIngProductoPrima($_POST["codAddIngProdModal"]);
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
  public function ajaxDTableIngProductosPrima()
  {
    $todosLosIngProductosPrima = ingresoMprimaController::ctrDTableIngProductosPrima();
    foreach ($todosLosIngProductosPrima as &$ingresos) {
      $ingresos['buttons'] = FunctionIngresoMprima::getBtnIngProd($ingresos["idIngMprima"]);
      $ingresos['modalIngMprima'] = FunctionIngresoMprima::getBtnVerIngProd($ingresos["idIngMprima"]);
    }
    echo json_encode($todosLosIngProductosPrima);
  }

  //visualizar ingreos en el modal de ingresos productos
  public function ajaxVerProductosIngresadosModal($codAllIngProd)
  {
    $response = ingresoMprimaController::ctrVerProductosIngresadosModal($codAllIngProd);
    echo json_encode($response);
  }

  //  crear ingreso productos prima
  public function ajaxCrearIngresoMprima($jsonCrearIngProd, $jsonProductosIngProd, )
  {
    $crearIngresoProd = json_decode($jsonCrearIngProd, true);

    $response = ingresoMprimaController::ctrCrearIngresoMprima($crearIngresoProd, $jsonProductosIngProd);
    echo json_encode($response);
  }

  //visualizar datos para editar ingreso productos
  public function ajaxVerDataIngProd($codIngProd)
  {
    $response = ingresoMprimaController::ctrVerDataIngProductos($codIngProd);
    echo json_encode($response);
  }

  //obtener precio para editar ingreso productos
  public function ajaxPrecioProdEdit($codProdIng)
  {
    $response = ingresoMprimaController::ctrPrecioProdEdit($codProdIng);
    echo json_encode($response);
  }

  //editar ingreso productos
  public function ajaxEditarIngresoProd($jsonEditarIngProd, $jsonEditarIngProductosForms)
  {
    $editarIngProd = json_decode($jsonEditarIngProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrEditarIngresoProd($editarIngProd, $jsonEditarIngProductosForms);
    echo json_encode($response);
  }
  //borrar ingreso productos
  public function ajaxBorrarIngProductos($jsonBorraIngProdcutos)
  {
    $borrarIngProductos = json_decode($jsonBorraIngProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrBorrarIngProductos($borrarIngProductos);
    echo json_encode($response);
  }

//Agregar Producto prima al ingreso
  public function ajaxAgregarIngProductoPrima($codAddIngProdModal)
  {
    $codIngProducto = json_decode($codAddIngProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrAgregarIngProducto($codIngProducto);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

