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

    // Crear registro de proceso operativo
    $addProcOp = self::ctrCrearRegistro($dataProcOp);

    // Obtener el último registro de proceso operativo
    $ultimoRegistro = self::ctrUltimoRegistroProcOp();
    // actualizar estado de pedido
    $updateEstadoPedido = self::ctrActualizarPedidoProcOp($dataProcOp["idPedidoProcOp"]);

    if ($updateEstadoPedido = true) {
      // Verificar si idSalProdPrima tiene un valor válido
      if (!empty($dataProcOp["idSalProdPrima"]) && $dataProcOp["idSalProdPrima"] != 0) {
        // Asignar proceso operativo a salida materia prima
        $salidaMPrimaProcOp = self::ctrAsignarAsalMprima($ultimoRegistro["idProcOp"], $dataProcOp["idSalProdPrima"]);
        // Si salidaMPrimaProcOp es verdadero, retornar addProcOp "ok"
        if ($salidaMPrimaProcOp) {
          return $addProcOp;
        } else {
          return "error";
        }
      } else {
        // Si el valor de idSalProdPrima es null, vacío o 0, retornar addProcOp "ok"
        return $addProcOp;
      }
    } else {
      return "errorPedido";
    }
  }

  //crear proceso operativo
  public static function ctrCrearRegistro($dataProcOp)
  {
    $table = "proceso_operativo";
    $dataCreate = array(
      "nombreProcOp" => $dataProcOp["nombreProcOpAdd"],
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
  //obtener el ultimo registro de proceso operativo
  public static function ctrUltimoRegistroProcOp()
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlUltimoRegistroProcOp($table);
    return $response;
  }
  // actualizar estado de pedido
  public static function ctrActualizarPedidoProcOp($idPedido)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $idPedido,
      "estadoPedido" => 2,//en proceso
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlActualizarPedidoProcOp($table, $dataUpdate);
    return $response;
  }
  //asignar proceso operativo a salida materia prima
  public static function ctrAsignarAsalMprima($idProcOp, $idSalProdPrima)
  {
    $table = "salida_mprima";
    $dataUpdate = array(
      "idSalMprima" => $idSalProdPrima,
      "idProcOp" => $idProcOp,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlAsignarSalMprima($table, $dataUpdate);
    return $response;

  }

  ///////////////////////////////////////////////////




}
