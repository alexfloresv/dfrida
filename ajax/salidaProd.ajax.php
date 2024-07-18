<?php
require_once "../controller/salidaProd.controller.php";
require_once "../model/salidaProd.model.php";
require_once "../functions/salidaProd.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de salidas productos
if (isset($_POST["todasLasSalidasProductos"])) {
  $todasLasSalidasProductos = new salidaProdAjax();
  $todasLasSalidasProductos->ajaxDTableSalProdcuctos();
}

//datatable de salidas productos alamcen modal
if (isset($_POST["todosLosProductosAlmacen"])) {
  $todosLosProductosAlmacen = new salidaProdAjax();
  $todosLosProductosAlmacen->ajaxDTableSalProdcuctosAlmacen();
}

//visualizar ingreos en el modal de salidas productos
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

//Agregar Producto de almacen ala salida
if (isset($_POST["codAddSalProdModal"])) {
  $add = new salidaProdAjax();
  $add->codAddSalProdModal = $_POST["codAddSalProdModal"];
  $add->ajaxAgregarSalProducto($_POST["codAddSalProdModal"]);
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
  //datatable de salidas productos
  public function ajaxDTableSalProdcuctos()
  {
    $todasLasSalidasProductos = salidaProdController::ctrDTableSalProdcuctos();
    foreach ($todasLasSalidasProductos as &$salidas) {
      $salidas['buttons'] = FunctionSalidaProd::getBtnSalProd($salidas["idSalProd"]);
      $salidas['modalSalProd'] = FunctionSalidaProd::getBtnVerSalProd($salidas["idSalProd"]);
    }
    echo json_encode($todasLasSalidasProductos);
  }

  //datatable de salidas productos alamcen modal
  public function ajaxDTableSalProdcuctosAlmacen()
  {
    $todosLosProductosAlmacen = salidaProdController::ctrDTableSalProdcuctosAlmacen();
    echo json_encode($todosLosProductosAlmacen);
  }

  //visualizar ingreos en el modal de salidas productos
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

 //Agregar Producto de almacen ala salida
  public function ajaxAgregarSalProducto($codAddSalProdModal)
  {
    $codSalProducto = json_decode($codAddSalProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrAgregarSalProducto($codSalProducto);
    echo json_encode($response);
  }


}

