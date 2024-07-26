<?php
require_once "../controller/salidaMprima.controller.php";
require_once "../model/salidaMprima.model.php";
require_once "../functions/salidaMprima.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de salidas productos prima
if (isset($_POST["todasLasSalidasProductos"])) {
  $todasLasSalidasProductos = new salidaMprimaAjax();
  $todasLasSalidasProductos->ajaxDTableSalProdcuctos();
}

//datatable de salidas productos alamcen modal prima
if (isset($_POST["todosLosProductosAlmacen"])) {
  $todosLosProductosAlmacen = new salidaMprimaAjax();
  $todosLosProductosAlmacen->ajaxDTableSalProdcuctosAlmacen();
}

//visualizar salidas en el modal de salidas productos prima
if (isset($_POST["codAllSalMprima"])) {
  $view = new salidaMprimaAjax();
  $view->codAllSalMprima = $_POST["codAllSalMprima"];
  $view->ajaxVerProductosSalidaModal($_POST["codAllSalMprima"]);
}

//  crear salida de  productos prima
if (isset($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"])) {
  $create = new salidaMprimaAjax();
  $create->jsonCrearSalidaProd = $_POST["jsonCrearSalidaProd"];
  $create->jsonProductosSalidaProd = $_POST["jsonProductosSalidaProd"];
  $create->ajaxCrearSalidaProd($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"]);
}

//visualizar datos para editar salidas productos prima
if (isset($_POST["codSalMprima"])) {
  $viewData = new salidaMprimaAjax();
  $viewData->codSalMprima = $_POST["codSalMprima"];
  $viewData->ajaxVerDataSalProd($_POST["codSalMprima"]);
}

//obtener stock y precio de almacen para visualizar datos para editar salidas productos prima
if (isset($_POST["codProdIng"])) {
  $viewData = new salidaMprimaAjax();
  $viewData->codProdIng = $_POST["codProdIng"];
  $viewData->ajaxStockAlmacenEdit($_POST["codProdIng"]);
}

//editar salida productos prima
if (isset($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"])) {
  $edit = new salidaMprimaAjax();
  $edit->jsonEditarSalProd = $_POST["jsonEditarSalProd"];
  $edit->jsonEditarSalProductosForms = $_POST["jsonEditarSalProductosForms"];
  $edit->ajaxEditarSalidaProd($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"]);
}

//borrar salida productos prima
if (isset($_POST["jsonBorraSalProdcutos"])) {
  $delete = new salidaMprimaAjax();
  $delete->jsonBorraSalProdcutos = $_POST["jsonBorraSalProdcutos"];
  $delete->ajaxBorrarSalProductos($_POST["jsonBorraSalProdcutos"]);
}

//Agregar Producto de almacen ala salida prima
if (isset($_POST["codAddSalProdModal"])) {
  $add = new salidaMprimaAjax();
  $add->codAddSalProdModal = $_POST["codAddSalProdModal"];
  $add->ajaxAgregarSalProducto($_POST["codAddSalProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new salidaMprimaAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class salidaMprimaAjax
{
  //datatable de salidas productos prima
  public function ajaxDTableSalProdcuctos()
  {
    $todasLasSalidasProductos = salidaMprimaController::ctrDTableSalProdcuctos();
    foreach ($todasLasSalidasProductos as &$salidas) {
      $salidas['buttons'] = FunctionSalidaMprima::getBtnSalProd($salidas["idSalMprima"]);
      $salidas['modalProcSalMprima'] = FunctionSalidaMprima::getBtnVerProcSalMprima($salidas["idSalMprima"]);
      $salidas['modalSalMprima'] = FunctionSalidaMprima::getBtnVerSalMprima($salidas["idSalMprima"]);
    }
    echo json_encode($todasLasSalidasProductos);
  }

  //datatable de salidas productos alamcen modal prima
  public function ajaxDTableSalProdcuctosAlmacen()
  {
    $todosLosProductosAlmacen = salidaMprimaController::ctrDTableSalProdcuctosAlmacen();
    echo json_encode($todosLosProductosAlmacen);
  }

  //visualizar ingreos en el modal de salidas productos prima
  public function ajaxVerProductosSalidaModal($codAllSalMprima)
  {
    $response = salidaMprimaController::ctrVerProductosSalidaModal($codAllSalMprima);
    echo json_encode($response);
  }

  //  crear salida de  productos prima
  public function ajaxCrearSalidaProd($jsonCrearSalidaProd, $jsonProductosSalidaProd, )
  {
    $crearSalidaProd = json_decode($jsonCrearSalidaProd, true);

    $response = salidaMprimaController::ctrCrearSalidaProd($crearSalidaProd, $jsonProductosSalidaProd);
    echo json_encode($response);
  }

  //visualizar datos para editar salidas productos prima
  public function ajaxVerDataSalProd($codSalMprima)
  {
    $response = salidaMprimaController::ctrVerDataIngProductos($codSalMprima);
    echo json_encode($response);
  }

  //obtener stock de almacen para visualizar datos para editar salidas productosm prima
  public function ajaxStockAlmacenEdit($codProdIng)
  {
    $response = salidaMprimaController::ctrStockAlmacenEdit($codProdIng);
    echo json_encode($response);
  }

  //editar salida productos prima
  public function ajaxEditarSalidaProd($jsonEditarSalProd, $jsonEditarSalProductosForms)
  {
    $editarSalProd = json_decode($jsonEditarSalProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaMprimaController::ctrEditarSalidaProd($editarSalProd, $jsonEditarSalProductosForms);
    echo json_encode($response);
  }

  //borrar salida productos prima
  public function ajaxBorrarSalProductos($jsonBorraSalProdcutos)
  {
    $borrarSalProductos = json_decode($jsonBorraSalProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaMprimaController::ctrBorrarSalProductos($borrarSalProductos);
    echo json_encode($response);
  }

  //Agregar Producto de almacen ala salida prima
  public function ajaxAgregarSalProducto($codAddSalProdModal)
  {
    $codSalProducto = json_decode($codAddSalProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = salidaMprimaController::ctrAgregarSalProducto($codSalProducto);
    echo json_encode($response);
  }


}

