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
// Descargar excel ingreso productos por fechas
if (isset($_POST["fechaInicioIngresoProdporFecha"]) && isset($_POST["fechaFinIngresoProdporFecha"])) {
  $datosInicioIngresoProdporFecha = new IngresoProdAjax();
  $datosInicioIngresoProdporFecha->fechaInicioIngresoProdporFecha = $_POST["fechaInicioIngresoProdporFecha"];
  $datosInicioIngresoProdporFecha->fechaFinIngresoProdporFecha = $_POST["fechaFinIngresoProdporFecha"];
  $datosInicioIngresoProdporFecha->ajaxObtenerDatosIngresoProductosporFecha();
}
//funcion para traer la produccion aprobada al select 2
if (isset($_POST["todasLasProduccionesDisponibles"])) {
  $todasLasProduccionesDisponibles = new IngresoProdAjax();
  $todasLasProduccionesDisponibles->ajaxSelect2ProduccionDisp();
}
//funcion para trear los productos de la cotizacion
if (isset($_POST["codProduccion"])) {
  $add = new IngresoProdAjax();
  $add->codProduccion = $_POST["codProduccion"];
  $add->ajaxTraerProduccionDisponible($_POST["codProduccion"]);
}
//funcion para trear codigo de  producto y precio de producto 
if (isset($_POST["codProdCoti"])) {
  $add = new IngresoProdAjax();
  $add->codProdCoti = $_POST["codProdCoti"];
  $add->ajaxTraerDataProducto($_POST["codProdCoti"]);
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

  //visualizar datos para editar ingreso productos
  public function ajaxVerDataIngProd($codIngProd)
  {
    $response = ingresoProdController::ctrVerDataIngProductos($codIngProd);
    echo json_encode($response);
  }

  //obtener precio para editar ingreso productos
  public function ajaxPrecioProdEdit($codProdIng)
  {
    $response = ingresoProdController::ctrPrecioProdEdit($codProdIng);
    echo json_encode($response);
  }

  //editar ingreso productos
  public function ajaxEditarIngresoProd($jsonEditarIngProd, $jsonEditarIngProductosForms)
  {
    $editarIngProd = json_decode($jsonEditarIngProd, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrEditarIngresoProd($editarIngProd, $jsonEditarIngProductosForms);
    echo json_encode($response);
  }
  //borrar ingreso productos
  public function ajaxBorrarIngProductos($jsonBorraIngProdcutos)
  {
    $borrarIngProductos = json_decode($jsonBorraIngProdcutos, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = ingresoProdController::ctrBorrarIngProductos($borrarIngProductos);
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
  public $fechaInicioIngresoProdporFecha;
  public $fechaFinIngresoProdporFecha;
  // Descargar excel ingreso productos por fechas
  public function ajaxObtenerDatosIngresoProductosporFecha()
  {
    $fechaFinIngresoProdporFecha = $this->fechaFinIngresoProdporFecha;
    $fechaInicioIngresoProdporFecha = $this->fechaInicioIngresoProdporFecha;
    $response = ingresoProdController::ctrObtenerDatosIngresoProductosporFecha($fechaInicioIngresoProdporFecha, $fechaFinIngresoProdporFecha);
    $dataFiltrada = [];

    foreach ($response as $ingreso) {
      $productos = json_decode($ingreso['ingJsonProd'], true);
      foreach ($productos as $producto) {
        $dataFiltrada[] = [
          'idIngProd' => $ingreso['idIngProd'],
          'nombreIngProd' => $ingreso['nombreIngProd'],
          'fechaIngProd' => $ingreso['fechaIngProd'],
          'igvIngProd' => $ingreso['igvIngProd'],
          'subTotalIngProd' => $ingreso['subTotalIngProd'],
          'totalIngProd' => $ingreso['totalIngProd'],
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
  //funcion para traer la produccion aprobada al select 2
  public function ajaxSelect2ProduccionDisp()
  {
    $todasLasProduccionesDisponibles = ingresoProdController::ctrSelect2ProduccionDisp();
    echo json_encode($todasLasProduccionesDisponibles);
  }
  //funcion para trear los productos de la cotizacion
  public function ajaxTraerProduccionDisponible($codProduccion)
  {
    $codProduccion = ingresoProdController::ctrTraerProduccionDisponible($codProduccion);
    echo json_encode($codProduccion);
  }
  //funcion para trear codigo de  producto y precio de producto 
  public function ajaxTraerDataProducto($codProdCoti)
  {
    $response = ingresoProdController::ctrTraerDataProducto($codProdCoti);
    echo json_encode($response);
  }
}

