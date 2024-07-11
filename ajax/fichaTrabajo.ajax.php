<?php
require_once "../controller/fichaTrabajo.controller.php";
require_once "../model/fichaTrabajo.model.php";
require_once "../functions/fichaTrabajo.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de fichaTrabajo
if (isset($_POST["todasLasFichasTrabajo"])) {
  $todasLasFichasTrabajo = new FichaTrabajoAjax();
  $todasLasFichasTrabajo->ajaxDTableFrichasTrabajo();
}

//visualizar procesos en el modal de procesos trabajo
if (isset($_POST["codFichTrab"])) {
  $view = new FichaTrabajoAjax();
  $view->codFichTrab = $_POST["codFichTrab"];
  $view->ajaxVerProcesosTrabajo($_POST["codFichTrab"]);
}

//  crear Cotizacion
if (isset($_POST["jsonCrearProcesoTrabajo"], $_POST["jsonProcesosTrabajo"])) {
  $create = new FichaTrabajoAjax();
  $create->jsonCrearProcesoTrabajo = $_POST["jsonCrearProcesoTrabajo"];
  $create->jsonProcesosTrabajo = $_POST["jsonProcesosTrabajo"];
  $create->ajaxCrearFichaTrabajo($_POST["jsonCrearProcesoTrabajo"], $_POST["jsonProcesosTrabajo"]);
}

//borrar cotizacion
if (isset($_POST["jsonBorraCotizacion"])) {
  $delete = new FichaTrabajoAjax();
  $delete->jsonBorraCotizacion = $_POST["jsonBorraCotizacion"];
  $delete->ajaxBorrarCotizacion($_POST["jsonBorraCotizacion"]);
}
//Agregar Producto a la cotizacion
if (isset($_POST["codAddProdModalCoti"])) {
  $add = new FichaTrabajoAjax();
  $add->codAddProdModalCoti = $_POST["codAddProdModalCoti"];
  $add->ajaxAgregarProductoCoti($_POST["codAddProdModalCoti"]);
}
//Agregar Producto a la cotizacion
if (isset($_POST["codAddProdMprimaModalCoti"])) {
  $add = new FichaTrabajoAjax();
  $add->codAddProdMprimaModalCoti = $_POST["codAddProdMprimaModalCoti"];
  $add->ajaxAgregarProductoMprimaCoti($_POST["codAddProdMprimaModalCoti"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new FichaTrabajoAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
/////////////////////////////

class FichaTrabajoAjax
{
  //datatable de fichas trabajo
  public function ajaxDTableFrichasTrabajo()
  {
    $todasLasFichasTrabajo = FichaTrabajoController::ctrDTableFrichasTrabajo();
    foreach ($todasLasFichasTrabajo as &$proces) {
      $proces['buttons'] = FunctionFichaTrabajo::getBtnFichaTrabajo($proces["idFichaProc"]);
      $proces['modalProcs'] = FunctionFichaTrabajo::getBtnVerProcesTrabajo($proces["idFichaProc"]);
    }
    //mostar todos los ProductosMprima DataTable
    echo json_encode($todasLasFichasTrabajo);
  }

  //visualizar procesos en el modal de procesos trabajo
  public function ajaxVerProcesosTrabajo($codFichTrab)
  {
    $response = FichaTrabajoController::ctrVerProcesosTrabajo($codFichTrab);
    echo json_encode($response);
  }

  //  crear ficha Trabajo
  public function ajaxCrearFichaTrabajo($jsonCrearProcesoTrabajo, $jsonProcesosTrabajo)
  {
    $CrearProcesoTrabajo = json_decode($jsonCrearProcesoTrabajo, true);

    $response = FichaTrabajoController::ctrCrearFichaTrabajo($CrearProcesoTrabajo, $jsonProcesosTrabajo);
    echo json_encode($response);
  }

  //  editar ProductosMprima
  public function ajaxEditarProductosMprima($jsonEditarProductosMprima)
  {
    $editarProductosMprima = json_decode($jsonEditarProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrEditProductMprima($editarProductosMprima);
    echo json_encode($response);
  }
  //borrar ProductosMprima
  public function ajaxBorrarCotizacion($jsonBorraCotizacion)
  {
    $borrarCotizacion = json_decode($jsonBorraCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrDeleteCotizacion($borrarCotizacion);
    echo json_encode($response);
  }

  //Agregar Producto a la cotizacion
  public function ajaxAgregarProductoCoti($codAddProdModalCoti)
  {
    $codProductoCoti = json_decode($codAddProdModalCoti, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrAgregarProductoCoti($codProductoCoti);
    echo json_encode($response);
  }
  //Agregar Producto Mprima a la cotizacion
  public function ajaxAgregarProductoMprimaCoti($codAddProdMprimaModalCoti)
  {
    $codProductoMprimaCoti = json_decode($codAddProdMprimaModalCoti, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrAgregarProductoMprimaCoti($codProductoMprimaCoti);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
}

