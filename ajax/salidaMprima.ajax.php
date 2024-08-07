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

//funcion para mostrar el selec2 de selecionar proceso Operativo
if (isset($_POST["todosLosProcesoOperativosMprima"])) {
  $todosLosProcesoOperativosMprima = new salidaMprimaAjax();
  $todosLosProcesoOperativosMprima->ajaxSelect2ProcOpMprima();
}

//funcion para mostrar el selec2 de selecionar proceso Operativo edit
if (isset($_POST["todosLosProcesoOperativosMprimaEdit"])) {
  $todosLosProcesoOperativosMprimaEdit = new salidaMprimaAjax();
  $todosLosProcesoOperativosMprimaEdit->ajaxSelect2ProcOpMprimaEdit();
}
if (isset($_POST["fechaInicioSalidaMPrima"]) && isset($_POST["fechaFinSalidaMPrima"])) {
  $datosProductosSalidaMPrima = new salidaMprimaAjax();
  $datosProductosSalidaMPrima->fechaInicioSalidaMPrima = $_POST["fechaInicioSalidaMPrima"];
  $datosProductosSalidaMPrima->fechaFinSalidaMPrima = $_POST["fechaFinSalidaMPrima"];
  $datosProductosSalidaMPrima->ajaxObtenerDatosSalidaProductosMPrimaporFecha();
}

//funcion para mostrar el selec2 de selecionar  pedido
if (isset($_POST["todosLosPedidosDisponibles"])) {
  $todosLosPedidosDisponibles = new salidaMprimaAjax();
  $todosLosPedidosDisponibles->ajaxSelect2PedidosDisp();
}

//funcion para trear los productos de la cotizacion
if (isset($_POST["codPedidoSalMp"])) {
  $add = new salidaMprimaAjax();
  $add->codPedidoSalMp = $_POST["codPedidoSalMp"];
  $add->ajaxTraerPedidoDisponible($_POST["codPedidoSalMp"]);
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
  public $fechaInicioSalidaMPrima;
  public $fechaFinSalidaMPrima;
  public function ajaxObtenerDatosSalidaProductosMPrimaporFecha()
  {
    $fechaInicioSalidaMPrima = $this->fechaInicioSalidaMPrima;
    $fechaFinSalidaMPrima = $this->fechaFinSalidaMPrima;
    $response = salidaMprimaController::ctrObtenerDatosSalidaProductosMPrimaporFecha($fechaInicioSalidaMPrima, $fechaFinSalidaMPrima);
    $dataFiltrada = [];

    foreach ($response as $salida) {
      $productos = json_decode($salida['salJsonMprima'], true);
      foreach ($productos as $producto) {
        $dataFiltrada[] = [
          'idSalMprima' => $salida['idSalMprima'],
          'idProcOp' => $salida['idProcOp'],
          'nombreSalMprima' => $salida['nombreSalMprima'],
          'fechaSalMprima' => $salida['fechaSalMprima'],
          'igvSalMprima' => $salida['igvSalMprima'],
          'subTotalSalMprima' => $salida['subTotalSalMprima'],
          'totalSalMprima' => $salida['totalSalMprima'],
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
  }  //funcion para mostrar el selec2 de selecionar proceso Operativo
  public function ajaxSelect2ProcOpMprima()
  {
    $todosLosProcesoOperativosMprima = salidaMprimaController::ctrSelect2ProcOpMprima();
    echo json_encode($todosLosProcesoOperativosMprima);
  }

  //funcion para mostrar el selec2 de selecionar proceso Operativo
  public function ajaxSelect2ProcOpMprimaEdit()
  {
    $todosLosProcesoOperativosMprimaEdit = salidaMprimaController::ctrSelect2ProcOpMprimaEdit();
    echo json_encode($todosLosProcesoOperativosMprimaEdit);
  }
  //funcion para mostrar el selec2 de selecionar  pedido
  public function ajaxSelect2PedidosDisp()
  {
    $todosLosPedidosDisponibles = salidaMprimaController::ctrSelect2PedidosDisp();
    echo json_encode($todosLosPedidosDisponibles);
  }
  //funcion para trear los productos de la cotizacion
  public function ajaxTraerPedidoDisponible($codPedidoSalMp)
  {
    $codPedidoSalMp = salidaMprimaController::ctrTraerPedidoDisponible($codPedidoSalMp);
    echo json_encode($codPedidoSalMp);
  }
}

