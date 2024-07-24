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

//visualizar salidas en el modal de salidas productos
if (isset($_POST["codAllSalProd"])) {
  $view = new salidaProdAjax();
  $view->codAllSalProd = $_POST["codAllSalProd"];
  $view->ajaxVerProductosSalidaModal($_POST["codAllSalProd"]);
}

//  crear salida de  productos
if (isset($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"])) {
  $create = new salidaProdAjax();
  $create->jsonCrearSalidaProd = $_POST["jsonCrearSalidaProd"];
  $create->jsonProductosSalidaProd = $_POST["jsonProductosSalidaProd"];
  $create->ajaxCrearSalidaProd($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"]);
}

//visualizar datos para editar salidas productos
if (isset($_POST["codSalProd"])) {
  $viewData = new salidaProdAjax();
  $viewData->codSalProd = $_POST["codSalProd"];
  $viewData->ajaxVerDataSalProd($_POST["codSalProd"]);
}

//obtener stock de almacen para visualizar datos para editar salidas productos
if (isset($_POST["codProdIng"])) {
  $viewData = new salidaProdAjax();
  $viewData->codProdIng = $_POST["codProdIng"];
  $viewData->ajaxStockAlmacenEdit($_POST["codProdIng"]);
}

//editar salida productos
if (isset($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"])) {
  $edit = new salidaProdAjax();
  $edit->jsonEditarSalProd = $_POST["jsonEditarSalProd"];
  $edit->jsonEditarSalProductosForms = $_POST["jsonEditarSalProductosForms"];
  $edit->ajaxEditarSalidaProd($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"]);
}

//borrar salida productos
if (isset($_POST["jsonBorraSalProdcutos"])) {
  $delete = new salidaProdAjax();
  $delete->jsonBorraSalProdcutos = $_POST["jsonBorraSalProdcutos"];
  $delete->ajaxBorrarSalProductos($_POST["jsonBorraSalProdcutos"]);
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
      $salidas['modalPedSalProd'] = FunctionSalidaProd::getBtnVerPedSalProd($salidas["idSalProd"]);
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
  public function ajaxVerProductosSalidaModal($codAllSalProd)
  {
    $response = salidaProdController::ctrVerProductosSalidaModal($codAllSalProd);
    echo json_encode($response);
  }

  //  crear salida de  productos
  public function ajaxCrearSalidaProd($jsonCrearSalidaProd, $jsonProductosSalidaProd, )
  {
    $crearSalidaProd = json_decode($jsonCrearSalidaProd, true);

    $response = salidaProdController::ctrCrearSalidaProd($crearSalidaProd, $jsonProductosSalidaProd);
    echo json_encode($response);
  }

  //visualizar datos para editar salidas productos
  public function ajaxVerDataSalProd($codSalProd)
  {
    $response = salidaProdController::ctrVerDataIngProductos($codSalProd);
    echo json_encode($response);
  }

  //obtener stock de almacen para visualizar datos para editar salidas productos
  public function ajaxStockAlmacenEdit($codProdIng)
  {
    $response = salidaProdController::ctrStockAlmacenEdit($codProdIng);
    echo json_encode($response);
  }

  //editar salida productos
  public function ajaxEditarSalidaProd($jsonEditarSalProd, $jsonEditarSalProductosForms)
  {
    $editarSalProd = json_decode($jsonEditarSalProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrEditarSalidaProd($editarSalProd, $jsonEditarSalProductosForms);
    echo json_encode($response);
  }

  //borrar salida productos
  public function ajaxBorrarSalProductos($jsonBorraSalProdcutos)
  {
    $borrarSalProductos = json_decode($jsonBorraSalProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaProdController::ctrBorrarSalProductos($borrarSalProductos);
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

