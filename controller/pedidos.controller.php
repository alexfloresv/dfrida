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
  public static function ctrCrearPedido($jsonData)
  {
    // Agregar la fecha actual en el formato requerido
    $currentDateTime = date('Y-m-d H:i:s');
    $jsonData['DateCreate'] = $currentDateTime;
    $jsonData['DateUpdate'] = $currentDateTime;

    // Definir el estado del pedido
    $jsonData['estadoPedido'] = 1;

    $table = "pedido";
    $response = PedidosModel::mdlCrearPedido($table, $jsonData);
    return $response;
  }
}
