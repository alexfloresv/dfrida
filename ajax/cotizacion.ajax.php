<?php
require_once "../controller/cotizacion.controller.php";
require_once "../model/cotizacion.model.php";
require_once "../functions/cotizacion.functions.php";
require_once "../controller/clients.controller.php";
require_once "../model/clients.model.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de Cotizaciones
if (isset($_POST["todasLasCotizaciones"]) || isset($_POST["todasLasCotizacionesPedidosVista"])) {
  $todasLasCotizaciones = new CotizacionAjax();
  $todasLasCotizaciones->ajaxDTableCotizaciones();
}
//  crear Cotizacion
if (isset($_POST["jsonCrearCotizacion"], $_POST["jsonProductosCotizacion"])) {
  $create = new CotizacionAjax();
  $create->jsonCrearCotizacion = $_POST["jsonCrearCotizacion"];
  $create->jsonProductosCotizacion = $_POST["jsonProductosCotizacion"];
  $create->ajaxCrearCotizacion($_POST["jsonCrearCotizacion"], $_POST["jsonProductosCotizacion"]);
}

//editar ProductosMprima
if (isset($_POST["jsonEditarProductosMprima"])) {
  $edit = new CotizacionAjax();
  $edit->jsonEditarProductosMprima = $_POST["jsonEditarProductosMprima"];
  $edit->ajaxEditarProductosMprima($_POST["jsonEditarProductosMprima"]);
}
//borrar cotizacion
if (isset($_POST["jsonBorraCotizacion"])) {
  $delete = new CotizacionAjax();
  $delete->jsonBorraCotizacion = $_POST["jsonBorraCotizacion"];
  $delete->ajaxBorrarCotizacion($_POST["jsonBorraCotizacion"]);
}
//Agregar Producto a la cotizacion
if (isset($_POST["codAddProdModalCoti"])) {
  $add = new CotizacionAjax();
  $add->codAddProdModalCoti = $_POST["codAddProdModalCoti"];
  $add->ajaxAgregarProductoCoti($_POST["codAddProdModalCoti"]);
}
//Agregar Producto a la cotizacion
if (isset($_POST["codAddProdMprimaModalCoti"])) {
  $add = new CotizacionAjax();
  $add->codAddProdMprimaModalCoti = $_POST["codAddProdMprimaModalCoti"];
  $add->ajaxAgregarProductoMprimaCoti($_POST["codAddProdMprimaModalCoti"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new CotizacionAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
//  Editar la cotizacion
if (isset($_POST["jsonCotizacionEditar"])) {
  $jsonCotizacionEditar = json_decode($_POST["jsonCotizacionEditar"], true);
  $editar = new CotizacionAjax();
  $editar->jsonCotizacionEditar = $jsonCotizacionEditar;
  $editar->ajaxEditarCotizacion();
}
/////////////////////////////

class CotizacionAjax
{
  //datatable de cotizaciones
  public function ajaxDTableCotizaciones()
  {
    if (isset($_POST["todasLasCotizacionesPedidosVista"])) {
      $todasLasCotizaciones = CotizacionController::ctrDTableCotizacionesSinAsignarPedidos();
      foreach ($todasLasCotizaciones as &$cotizacion) {
        $cotizacion['buttons'] = FunctionCotizacion::getBtnCotizacionPedidosVista($cotizacion["idCoti"]);
      }
    } else {
      $todasLasCotizaciones = CotizacionController::ctrDTableCotizaciones();
      foreach ($todasLasCotizaciones as &$cotizacion) {
        $cotizacion['buttons'] = FunctionCotizacion::getBtnCotizacion($cotizacion["idCoti"], $cotizacion["estadoCoti"]);
        $cotizacion['estadoCoti'] = FunctionCotizacion::getEstadoCoti($cotizacion["estadoCoti"]);
      }
    }
    //mostar todos los ProductosMprima DataTable
    echo json_encode($todasLasCotizaciones);
  }

  //  crear Cotizacion
  public function ajaxCrearCotizacion($jsonCrearCotizacion, $jsonProductosCotizacion)
  {
    $crearCotizacion = json_decode($jsonCrearCotizacion, true);

    $response = CotizacionController::ctrCrearCotizacion($crearCotizacion, $jsonProductosCotizacion);
    echo json_encode($response);
  }

  //  editar ProductosMprima
  public function ajaxEditarProductosMprima($jsonEditarProductosMprima)
  {
    $editarProductosMprima = json_decode($jsonEditarProductosMprima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CotizacionController::ctrEditProductMprima($editarProductosMprima);
    echo json_encode($response);
  }
  //borrar ProductosMprima
  public function ajaxBorrarCotizacion($jsonBorraCotizacion)
  {
    $borrarCotizacion = json_decode($jsonBorraCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CotizacionController::ctrDeleteCotizacion($borrarCotizacion);
    echo json_encode($response);
  }

  //Agregar Producto a la cotizacion
  public function ajaxAgregarProductoCoti($codAddProdModalCoti)
  {
    $codProductoCoti = json_decode($codAddProdModalCoti, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CotizacionController::ctrAgregarProductoCoti($codProductoCoti);
    echo json_encode($response);
  }
  //Agregar Producto Mprima a la cotizacion
  public function ajaxAgregarProductoMprimaCoti($codAddProdMprimaModalCoti)
  {
    $codProductoMprimaCoti = json_decode($codAddProdMprimaModalCoti, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CotizacionController::ctrAgregarProductoMprimaCoti($codProductoMprimaCoti);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = CotizacionController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
  public $jsonCotizacionEditar;
  public function ajaxEditarCotizacion(){
    $jsonCotizacionEditar = $this->jsonCotizacionEditar;
    $response = CotizacionController::ctrEditarCotizacion($jsonCotizacionEditar);
    echo json_encode($response);
  }
}

