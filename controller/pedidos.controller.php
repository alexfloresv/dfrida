<?php
date_default_timezone_set('America/Bogota');

class PedidosController
{
  // Mostrar todos los pedidos
  public static function ctrDTablePedidos()
  {
    $table = "pedido";
    $response = PedidosModel::mdlDTablePedidos($table);
    return $response;
  }
  // Crear pedido
  public static function ctrCrearPedidoJson($jsonData)
  {
    // Agregar la fecha actual en el formato requerido
    $currentDateTime = date('Y-m-d H:i:s');
    $jsonData['DateCreate'] = $currentDateTime;
    $jsonData['DateUpdate'] = $currentDateTime;

    // Definir el estado del pedido
    $jsonData['estadoPedido'] = 1;

    $table = "pedido";
    $response = PedidosModel::mdlCrearPedidoJson($table, $jsonData);
    if($response =="ok"){
      $response = CotizacionController::ctrActualizarEstadoAsignacionCoti($jsonData['idCoti'],2);
    }
    return $response;
  }
  // Editar Pedido
  public static function ctrEditarPedidoJson($jsonData)
  {
    // Agregar la fecha actual en el formato requerido
    $currentDateTime = date('Y-m-d H:i:s');
    $jsonData['DateUpdate'] = $currentDateTime;

    $table = "pedido";
    $response = PedidosModel::mdlEditarPedidoJson($table, $jsonData);
    if($response =="ok"){
      $responseCambioEstadoNueva = CotizacionController::ctrActualizarEstadoAsignacionCoti($jsonData['idCoti'],2);
      $responseCambioEstadoAntigua = CotizacionController::ctrActualizarEstadoAsignacionCoti($jsonData['idCotiAntigua'],1);
      if($responseCambioEstadoAntigua != "ok" || $responseCambioEstadoNueva != "ok"){
        $response = "error";
      }
    }
    return $response;
  }
  // Datos de Pedido por ID
  public static function ctrDatosPedidoPorID($idPedido)
  {
    $tabla = "pedido";
    $response = PedidosModel::mdlDatosPedidoPorID($tabla,$idPedido);
    return $response;
  }
  // Eliminar Pedido
  public static function ctrEliminarPedido($idPedido,$idCoti)
  {
    $table = "pedido";
    $response = PedidosModel::mdlEliminarPedido($table,$idPedido);
    if($response == "ok"){
      $response = CotizacionController::ctrActualizarEstadoAsignacionCoti($idCoti,1);
    }
    return $response;
  }
}
