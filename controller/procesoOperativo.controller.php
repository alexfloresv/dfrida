<?php
date_default_timezone_set('America/Bogota');

class procesoOperativoController
{
  //datatable de proceso Op
  public static function ctrDTableProcesosOperativos()
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlDTableProcesosOperativos($table);
    return $response;
  }
  //funcion para mostrar el selec2 de fichas de trabajo
  public static function ctrSelect2FichTrabModal()
  {
    $table = "ficha_proceso";
    $response = procesoOperativoModel::mdlSelect2FichTrabModal($table);
    return $response;
  }

  //crear el tipo de proceso operativo
  public static function ctrCrearTipoProcModal($jsonCrearTipoProceso)
  {
    $dataTipoProc = json_decode($jsonCrearTipoProceso, true);
    $table = "tipo_proceso";

    $dataCreate = array(
      "nombreTipoProc" => $dataTipoProc["nombreTipoProcOpAdd"],
      "descripcionTipoProc" => $dataTipoProc["descripcionTipoProcOpAdd"],
      "idFichaProc" => $dataTipoProc["idFichTrabProcAdd"],
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlCrearTipoProcModal($table, $dataCreate);
    return $response;
  }

  //funcion para mostrar el selec2 de pedidos
  public static function ctrSelect2Pedido()
  {
    $table = "pedido";
    $response = procesoOperativoModel::mdlSelect2Pedido($table);
    return $response;
  }

  //funcion para mostrar el selec2 de tipo de procesos
  public static function ctrSelect2TiposProcesos()
  {
    $table = "tipo_proceso";
    $response = procesoOperativoModel::mdlSelect2TiposProcesos($table);
    return $response;
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima
  public static function ctrSelect2SalMprima()
  {
    $table = "salida_mprima";
    $response = procesoOperativoModel::mdSelect2SalMprima($table);
    return $response;
  }

  //crear  proceso operativo principal
  public static function ctrCrearProcOpModal($jsonCrearProceso)
  {
    $dataProcOp = json_decode($jsonCrearProceso, true);
    //asignar proceso operativo a salida materia prima
    $salidaMPrimaProcOp = self::ctrAsignarSalMprima($dataProcOp["idSalProdPrima"], );
    //asignar proceso operativo a pedido
    $pedidoProcOp = self::ctrAsignarPedido($dataProcOp["idPedidoProcOp"], );

    $dataProcOp = json_decode($jsonCrearProceso, true);
    $table = "proceso_proceso";

    $dataCreate = array(
      "nombreTipoProc" => $dataProcOp["nombreProcOpAdd"],
      "descripcionProcOp" => $dataProcOp["descripcionProcOpAdd"],
      "fechaRegistroProcOp" => $dataProcOp["fechaRegProcOpAdd"],
      "fechaFinProcOp" => $dataProcOp["fechaFinProcOpAdd"],
      "idSalMprima" => $dataProcOp["idSalProdPrima"],
      "idPedido" => $dataProcOp["idPedidoProcOp"],
      "idTipoProc" => $dataProcOp["idTipoProcOp"],
      "estadoProcOp" => 1, //registrado
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlCrearProcOpModal($table, $dataCreate);
    return $response;
  }

  //asignar proceso operativo a salida materia prima
  public static function ctrAsignarSalMprima($idSalProdPrima)
  {
    //verificar si el id ya esta registrado a una salidad
    $verificarIdProcOp = procesoOperativoModel::mdlVerificarIdProcOpSalMprima($idSalProdPrima);
    if ($verificarIdProcOp) {
      return true;
    } else {
      $table = "salida_mprima";
      $dataUpdate = array(
        "idProcOp" => $idSalProdPrima,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = procesoOperativoModel::mdlAsignarSalMprima($table, $dataUpdate);
      return $response;
    }

  }

  //asignar proceso operativo a pedido
  public static function ctrAsignarPedido($idPedidoProcOp)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idProcOp" => 1,
    );
    $response = procesoOperativoModel::mdlAsignarPedido($table, $dataUpdate);
    return $response;
  }
  ///////////////////////////////////////////////////




}
