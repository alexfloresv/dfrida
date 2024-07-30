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
  $todosLosIngProductosPrima = new IngresoMprimaAjax();
  $todosLosIngProductosPrima->ajaxDTableIngProductosPrima();
}

//visualizar ingreos en el modal de ingresos productos prima
if (isset($_POST["codAllIngMprima"])) {
  $view = new IngresoMprimaAjax();
  $view->codAllIngMprima = $_POST["codAllIngMprima"];
  $view->ajaxVerProductosIngresadosModal($_POST["codAllIngMprima"]);
}

//  crear ingreso productos prima
if (isset($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"])) {
  $create = new IngresoMprimaAjax();
  $create->jsonCrearIngProd = $_POST["jsonCrearIngProd"];
  $create->jsonProductosIngProd = $_POST["jsonProductosIngProd"];
  $create->ajaxCrearIngresoMprima($_POST["jsonCrearIngProd"], $_POST["jsonProductosIngProd"]);
}

//visualizar datos para editar ingreso productos prima
if (isset($_POST["codIngMprima"])) {
  $viewData = new IngresoMprimaAjax();
  $viewData->codIngMprima = $_POST["codIngMprima"];
  $viewData->ajaxVerDataIngProd($_POST["codIngMprima"]);
}

//obtener precio para editar ingreso productos prima
if (isset($_POST["codProdIng"])) {
  $viewData = new IngresoMprimaAjax();
  $viewData->codProdIng = $_POST["codProdIng"];
  $viewData->ajaxPrecioProdEdit($_POST["codProdIng"]);
}

//editar ingreso productos prima
if (isset($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"])) {
  $edit = new IngresoMprimaAjax();
  $edit->jsonEditarIngProd = $_POST["jsonEditarIngProd"];
  $edit->jsonEditarIngProductosForms = $_POST["jsonEditarIngProductosForms"];
  $edit->ajaxEditarIngresoProd($_POST["jsonEditarIngProd"], $_POST["jsonEditarIngProductosForms"]);
}


//borrar ingreso productos prima
if (isset($_POST["jsonBorraIngProductosPrima"])) {
  $delete = new IngresoMprimaAjax();
  $delete->jsonBorraIngProductosPrima = $_POST["jsonBorraIngProductosPrima"];
  $delete->ajaxBorrarIngProductos($_POST["jsonBorraIngProductosPrima"]);
}
//Agregar Producto prima al ingreso
if (isset($_POST["codAddIngProdModal"])) {
  $add = new IngresoMprimaAjax();
  $add->codAddIngProdModal = $_POST["codAddIngProdModal"];
  $add->ajaxAgregarIngProductoPrima($_POST["codAddIngProdModal"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new IngresoMprimaAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
// Descargar Ingresos de Productos Prima por fecha
if (isset($_POST["fechaInicioIngresoMPrima"]) && isset($_POST["fechaFinIngresoMPrima"])) {
  $descargarIngresosMPrimaporFecha = new IngresoMprimaAjax();
  $descargarIngresosMPrimaporFecha->fechaInicioIngresoMPrima = $_POST["fechaInicioIngresoMPrima"];
  $descargarIngresosMPrimaporFecha->fechaFinIngresoMPrima = $_POST["fechaFinIngresoMPrima"];
  $descargarIngresosMPrimaporFecha->ajaxObtenerDatosIngresosMPrimaporFechas();
}
/////////////////////////////

class IngresoMprimaAjax
{
  //datatable de ingresos productos prima
  public function ajaxDTableIngProductosPrima()
  {
    $todosLosIngProductosPrima = ingresoMprimaController::ctrDTableIngProductosPrima();
    foreach ($todosLosIngProductosPrima as &$ingresos) {
      $ingresos['buttons'] = FunctionIngresoMprima::getBtnIngProd($ingresos["idIngMprima"]);
      $ingresos['modalIngMprima'] = FunctionIngresoMprima::getBtnVerIngProd($ingresos["idIngMprima"]);
    }
    echo json_encode($todosLosIngProductosPrima);
  }

  //visualizar ingreos en el modal de ingresos productos prima
  public function ajaxVerProductosIngresadosModal($codAllIngMprima)
  {
    $response = ingresoMprimaController::ctrVerProductosIngresadosModal($codAllIngMprima);
    echo json_encode($response);
  }

  //  crear ingreso productos prima
  public function ajaxCrearIngresoMprima($jsonCrearIngProd, $jsonProductosIngProd, )
  {
    $crearIngresoProd = json_decode($jsonCrearIngProd, true);

    $response = ingresoMprimaController::ctrCrearIngresoMprima($crearIngresoProd, $jsonProductosIngProd);
    echo json_encode($response);
  }

  //visualizar datos para editar ingreso productos prima
  public function ajaxVerDataIngProd($codIngMprima)
  {
    $response = ingresoMprimaController::ctrVerDataIngProductos($codIngMprima);
    echo json_encode($response);
  }

  //obtener precio para editar ingreso productos prima
  public function ajaxPrecioProdEdit($codProdIng)
  {
    $response = ingresoMprimaController::ctrPrecioProdEdit($codProdIng);
    echo json_encode($response);
  }

  //editar ingreso productos prima
  public function ajaxEditarIngresoProd($jsonEditarIngProd, $jsonEditarIngProductosForms)
  {
    $editarIngProd = json_decode($jsonEditarIngProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrEditarIngresoProd($editarIngProd, $jsonEditarIngProductosForms);
    echo json_encode($response);
  }
  //borrar ingreso productos prima
  public function ajaxBorrarIngProductos($jsonBorraIngProductosPrima)
  {
    $borrarIngProductos = json_decode($jsonBorraIngProductosPrima, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrBorrarIngProductos($borrarIngProductos);
    echo json_encode($response);
  }

  //Agregar Producto prima al ingreso
  public function ajaxAgregarIngProductoPrima($codAddIngProdModal)
  {
    $codIngMprimaucto = json_decode($codAddIngProdModal, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrAgregarIngProducto($codIngMprimaucto);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoMprimaController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
  public $fechaInicioIngresoMPrima;
  public $fechaFinIngresoMPrima;
  // Descargar Ingresos de Productos Prima por fecha
  public function ajaxObtenerDatosIngresosMPrimaporFechas()
  {
    $fechaInicioIngresoMPrima = $this->fechaInicioIngresoMPrima;
    $fechaFinIngresoMPrima = $this->fechaFinIngresoMPrima;
    $response = ingresoMprimaController::ctrObtenerDatosIngresosMPrimaporFechas($fechaInicioIngresoMPrima, $fechaFinIngresoMPrima);

    $dataFiltrada = [];

    foreach ($response as $ingreso) {
      $productos = json_decode($ingreso['ingJsonMprima'], true);
      foreach ($productos as $producto) {
        $dataFiltrada[] = [
          'idIngMprima' => $ingreso['idIngMprima'],
          'nombreIngMprima' => $ingreso['nombreIngMprima'],
          'fechaIngMprima' => $ingreso['fechaIngMprima'],
          'igvIngMprima' => $ingreso['igvIngMprima'],
          'subTotalIngMprima' => $ingreso['subTotalIngMprima'],
          'totalIngMprima' => $ingreso['totalIngMprima'],
          'codProdIng' => $producto['codProdIng'],
          'nombreProdIng' => $producto['nombreProdIng'],
          'codigoProdIng' => $producto['codigoProdIng'],
          'unidadProdIng' => $producto['unidadProdIng'],
          'cantidadProdIng' => $producto['cantidadProdIng'],
          'precioProdIng' => $producto['precioProdIng'],
        ];
      }
    }

    echo json_encode($dataFiltrada);
  }
}

