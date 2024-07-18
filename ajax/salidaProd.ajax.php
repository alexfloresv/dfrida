<?php
require_once "../controller/salidaProd.controller.php";
require_once "../model/salidaProd.model.php";
require_once "../functions/salidaProd.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de ingresos productos
if (isset($_POST["todosLosIngProductos"])) {
  $todosLosIngProductos = new salidaProdAjax();
  $todosLosIngProductos->ajaxDTableIngProdcuctos();
}

//visualizar ingreos en el modal de ingresos productos
if (isset($_POST["codAllIngProd"])) {
  $view = new salidaProdAjax();
  $view->codAllIngProd = $_POST["codAllIngProd"];
  $view->ajaxVerProductosIngresadosModal($_POST["codAllIngProd"]);
}

//  crear ingreso productos
if (isset($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"])) {
  $create = new salidaProdAjax();
  $create->jsonCrearIngProd = $_POST["jsonCrearIngProd"];
  $create->jsonProductosIngProd = $_POST["jsonProductosIngProd"];
  $create->ajaxCrearIngresoProd($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"]);
}

//visualizar datos para editar ingreso productos
if (isset($_POST["codIngProd"])) {
  $viewData = new salidaProdAjax();
  $viewData->codIngProd = $_POST["codIngProd"];
  $viewData->ajaxVerDataIngProd($_POST["codIngProd"]);
}


//editar ingreso productos
if (isset($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"])) {
  $edit = new salidaProdAjax();
  $edit->jsonEditarIngProd = $_POST["jsonEditarIngProd"];
  $edit->jsonEditarIngProductosForms = $_POST["jsonEditarIngProductosForms"];
  $edit->ajaxEditarIngresoProd($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"]);
}


//borrar ingreso productos
if (isset($_POST["jsonBorraIngProdcutos"])) {
  $delete = new salidaProdAjax();
  $delete->jsonBorraIngProdcutos = $_POST["jsonBorraIngProdcutos"];
  $delete->ajaxBorrarIngProductos($_POST["jsonBorraIngProdcutos"]);
}
//Agregar Producto al ingreso
if (isset($_POST["codAddIngProdModal"])) {
  $add = new salidaProdAjax();
  $add->codAddIngProdModal = $_POST["codAddIngProdModal"];
  $add->ajaxAgregarIngProducto($_POST["codAddIngProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new salidaProdAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class salidaProdAjax
{
  //datatable de ingresos productos
  public function ajaxDTableIngProdcuctos()
  {
    $todosLosIngProductos = salidaProdController::ctrDTableIngProdcuctos();
    foreach ($todosLosIngProductos as &$ingresos) {
      $ingresos['buttons'] = FunctionIngresoProd::getBtnIngProd($ingresos["idIngProd"]);
      $ingresos['modalIngProd'] = FunctionIngresoProd::getBtnVerIngProd($ingresos["idIngProd"]);
    }
    echo json_encode($todosLosIngProductos);
  }

  //visualizar ingreos en el modal de ingresos productos
  public function ajaxVerProductosIngresadosModal($codAllIngProd)
  {
    $response = salidaProdController::ctrVerProductosIngresadosModal($codAllIngProd);
    echo json_encode($response);
  }

  //  crear ingreso productos
  public function ajaxCrearIngresoProd($jsonCrearIngProd, $jsonProductosIngProd, )
  {
    $crearIngresoProd = json_decode($jsonCrearIngProd, true);

    $response = salidaProdController::ctrCrearIngresoProd($crearIngresoProd, $jsonProductosIngProd);
    echo json_encode($response);
  }

  //visualizar datos para editar ingreso productos
  public function ajaxVerDataIngProd($codIngProd)
  {
    $response = salidaProdController::ctrVerDataIngProductos($codIngProd);
    echo json_encode($response);
  }

  //editar ingreso productos
  public function ajaxEditarIngresoProd($jsonEditarIngProd, $jsonEditarIngProductosForms)
  {
    $editarIngProd = json_decode($jsonEditarIngProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrEditarIngresoProd($editarIngProd, $jsonEditarIngProductosForms);
    echo json_encode($response);
  }
  //borrar ingreso productos
  public function ajaxBorrarIngProductos($jsonBorraIngProdcutos)
  {
    $borrarIngProductos = json_decode($jsonBorraIngProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrBorrarIngProductos($borrarIngProductos);
    echo json_encode($response);
  }

  //Agregar Producto a la cotizacion
  public function ajaxAgregarIngProducto($codAddIngProdModal)
  {
    $codIngProducto = json_decode($codAddIngProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrAgregarIngProducto($codIngProducto);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

