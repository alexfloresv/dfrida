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
}
