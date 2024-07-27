<?php
require_once "../controller/procesoOperativo.controller.php";
require_once "../model/procesoOperativo.model.php";
require_once "../functions/procesoOperativo.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de proceso Op
if (isset($_POST["todosLosProcOp"])) {
  $todosLosProcOp = new procesoOperativoAjax();
  $todosLosProcOp->ajaxDTableProcOp();
}

//datatable de salidas productos alamcen modal
if (isset($_POST["todosLosProductosAlmacen"])) {
  $todosLosProductosAlmacen = new procesoOperativoAjax();
  $todosLosProductosAlmacen->ajaxDTableSalProdcuctosAlmacen();
}

//visualizar salidas en el modal de salidas productos
if (isset($_POST["codAllSalProd"])) {
  $view = new procesoOperativoAjax();
  $view->codAllSalProd = $_POST["codAllSalProd"];
  $view->ajaxVerProductosSalidaModal($_POST["codAllSalProd"]);
}

//  crear salida de  productos
if (isset($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"])) {
  $create = new procesoOperativoAjax();
  $create->jsonCrearSalidaProd = $_POST["jsonCrearSalidaProd"];
  $create->jsonProductosSalidaProd = $_POST["jsonProductosSalidaProd"];
  $create->ajaxCrearSalidaProd($_POST["jsonCrearSalidaProd"], $_POST["jsonProductosSalidaProd"]);
}

//visualizar datos para editar salidas productos
if (isset($_POST["codSalProd"])) {
  $viewData = new procesoOperativoAjax();
  $viewData->codSalProd = $_POST["codSalProd"];
  $viewData->ajaxVerDataSalProd($_POST["codSalProd"]);
}

//obtener stock de almacen para visualizar datos para editar salidas productos
if (isset($_POST["codProdIng"])) {
  $viewData = new procesoOperativoAjax();
  $viewData->codProdIng = $_POST["codProdIng"];
  $viewData->ajaxStockAlmacenEdit($_POST["codProdIng"]);
}

//editar salida productos
if (isset($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"])) {
  $edit = new procesoOperativoAjax();
  $edit->jsonEditarSalProd = $_POST["jsonEditarSalProd"];
  $edit->jsonEditarSalProductosForms = $_POST["jsonEditarSalProductosForms"];
  $edit->ajaxEditarSalidaProd($_POST["jsonEditarSalProd"], $_POST["jsonEditarSalProductosForms"]);
}

//borrar salida productos
if (isset($_POST["jsonBorraSalProdcutos"])) {
  $delete = new procesoOperativoAjax();
  $delete->jsonBorraSalProdcutos = $_POST["jsonBorraSalProdcutos"];
  $delete->ajaxBorrarSalProductos($_POST["jsonBorraSalProdcutos"]);
}

//Agregar Producto de almacen ala salida
if (isset($_POST["codAddSalProdModal"])) {
  $add = new procesoOperativoAjax();
  $add->codAddSalProdModal = $_POST["codAddSalProdModal"];
  $add->ajaxAgregarSalProducto($_POST["codAddSalProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new procesoOperativoAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class procesoOperativoAjax
{
  //datatable de proceso Op
  public function ajaxDTableProcOp()
  {
    $todosLosProcOp = procesoOperativoController::ctrDTableProcesosOperativos();
    foreach ($todosLosProcOp as &$procesoOp) {
      $procesoOp['btnIniProcOp'] = FunctionProcesoOperativo::getBtnInicioProc($procesoOp["idProcOp"],$procesoOp["estadoProcOp"]);
      $procesoOp['btnFinProcOp'] = FunctionProcesoOperativo::getBtnFinProc($procesoOp["idProcOp"],$procesoOp["estadoProcOp"]);
      $procesoOp['buttons'] = FunctionProcesoOperativo::getBtnProcOp($procesoOp["idProcOp"]);
      $procesoOp['modalTipoProc'] = FunctionProcesoOperativo::getBtnVerTipoProc($procesoOp["idTipoProc"]);
      $procesoOp['modalPedido'] = FunctionProcesoOperativo::getBtnVerPedido($procesoOp["idPedido"]);
      $procesoOp['modalSalProdMprima'] = FunctionProcesoOperativo::getBtnVerSalProdPrima($procesoOp["idSalMprima"]);
      $procesoOp['estado'] = FunctionProcesoOperativo::getEstadoProcOp($procesoOp["estadoProcOp"]);
    }
    unset($procesoOp["idProcOp"]);
    unset($procesoOp["idTipoProc"]);
    unset($procesoOp["idPedido"]);
    unset($procesoOp["idSalMprima"]);

    echo json_encode($todosLosProcOp);
  }

  //datatable de salidas productos alamcen modal
  public function ajaxDTableSalProdcuctosAlmacen()
  {
    $todosLosProductosAlmacen = procesoOperativoController::ctrDTableSalProdcuctosAlmacen();
    echo json_encode($todosLosProductosAlmacen);
  }

  //visualizar ingreos en el modal de salidas productos
  public function ajaxVerProductosSalidaModal($codAllSalProd)
  {
    $response = procesoOperativoController::ctrVerProductosSalidaModal($codAllSalProd);
    echo json_encode($response);
  }

  //  crear salida de  productos
  public function ajaxCrearSalidaProd($jsonCrearSalidaProd, $jsonProductosSalidaProd, )
  {
    $crearSalidaProd = json_decode($jsonCrearSalidaProd, true);

    $response = procesoOperativoController::ctrCrearSalidaProd($crearSalidaProd, $jsonProductosSalidaProd);
    echo json_encode($response);
  }

  //visualizar datos para editar salidas productos
  public function ajaxVerDataSalProd($codSalProd)
  {
    $response = procesoOperativoController::ctrVerDataIngProductos($codSalProd);
    echo json_encode($response);
  }

  //obtener stock de almacen para visualizar datos para editar salidas productos
  public function ajaxStockAlmacenEdit($codProdIng)
  {
    $response = procesoOperativoController::ctrStockAlmacenEdit($codProdIng);
    echo json_encode($response);
  }

  //editar salida productos
  public function ajaxEditarSalidaProd($jsonEditarSalProd, $jsonEditarSalProductosForms)
  {
    $editarSalProd = json_decode($jsonEditarSalProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = procesoOperativoController::ctrEditarSalidaProd($editarSalProd, $jsonEditarSalProductosForms);
    echo json_encode($response);
  }

  //borrar salida productos
  public function ajaxBorrarSalProductos($jsonBorraSalProdcutos)
  {
    $borrarSalProductos = json_decode($jsonBorraSalProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = procesoOperativoController::ctrBorrarSalProductos($borrarSalProductos);
    echo json_encode($response);
  }

  //Agregar Producto de almacen ala salida
  public function ajaxAgregarSalProducto($codAddSalProdModal)
  {
    $codSalProducto = json_decode($codAddSalProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = procesoOperativoController::ctrAgregarSalProducto($codSalProducto);
    echo json_encode($response);
  }


}

