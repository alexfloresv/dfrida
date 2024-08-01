<?php

require_once "conexion.php";

class PedidosModel
{
  // Mostrar todos los pedidos
  public static function mdlDTablePedidos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT pedido.idPedido, pedido.idCli, pedido.tituloPedido, pedido.nombrePedido, pedido.fechaPedido, pedido.DateCreate, pedido.DateUpdate, pedido.idCoti, pedido.idFichaTec, cotizacion.productsCoti, cotizacion.productsMprimaCoti FROM $table 	INNER JOIN cotizacion ON pedido.idCoti = cotizacion.idCoti ORDER BY idPedido DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
