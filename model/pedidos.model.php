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
  // Crear pedido
  public static function ctrCrearPedidoJson($table, $jsonData){
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idCli, tituloPedido, nombrePedido, fechaPedido, DateCreate, DateUpdate, idCoti, idFichaTec, estadoPedido) VALUES (:idCli, :tituloPedido, :nombrePedido, :fechaPedido, :DateCreate, :DateUpdate, :idCoti, :idFichaTec, :estadoPedido)");
    $statement->bindParam(":idCli", $jsonData['idCliente'], PDO::PARAM_INT);
    $statement->bindParam(":tituloPedido", $jsonData['tituloPedido'], PDO::PARAM_STR);
    $statement->bindParam(":nombrePedido", $jsonData['nombrePedido'], PDO::PARAM_STR);
    $statement->bindParam(":fechaPedido", $jsonData['fechaPedido'], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $jsonData['DateCreate'], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $jsonData['DateUpdate'], PDO::PARAM_STR);
    $statement->bindParam(":idCoti", $jsonData['idCoti'], PDO::PARAM_INT);
    $statement->bindParam(":idFichaTec", $jsonData['idFichaTecnica'], PDO::PARAM_INT);
    $statement->bindParam(":estadoPedido", $jsonData['estadoPedido'], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
}
