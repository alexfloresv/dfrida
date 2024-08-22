<?php

require_once "conexion.php";

class PedidosModel
{
  // Mostrar todos los pedidos
  public static function mdlDTablePedidos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT pedido.idPedido,  pedido.idCli,  pedido.tituloPedido,  pedido.nombrePedido,  pedido.fechaPedido,  pedido.DateCreate, pedido.DateUpdate, pedido.idCoti, pedido.idFichaTec, cotizacion.productsCoti, estadoPedido, pedido.idSalMprima, salida_mprima.salJsonMprima FROM $table INNER JOIN cotizacion ON pedido.idCoti = cotizacion.idCoti LEFT JOIN salida_mprima ON pedido.idSalMprima = salida_mprima.idSalMprima ORDER BY idPedido DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  // Crear pedido
  public static function mdlCrearPedidoJson($table, $jsonData)
  {
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
  // Editar Pedido
  public static function mdlEditarPedidoJson($table, $jsonData)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET tituloPedido = :tituloPedido, nombrePedido = :nombrePedido, fechaPedido = :fechaPedido, DateUpdate = :DateUpdate, idCoti = :idCoti, idFichaTec = :idFichaTec WHERE idPedido = :idPedido");
    $statement->bindParam(":tituloPedido", $jsonData['tituloPedido'], PDO::PARAM_STR);
    $statement->bindParam(":nombrePedido", $jsonData['nombrePedido'], PDO::PARAM_STR);
    $statement->bindParam(":fechaPedido", $jsonData['fechaPedido'], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $jsonData['DateUpdate'], PDO::PARAM_STR);
    $statement->bindParam(":idCoti", $jsonData['idCoti'], PDO::PARAM_INT);
    $statement->bindParam(":idFichaTec", $jsonData['idFichaTec'], PDO::PARAM_INT);
    $statement->bindParam(":idPedido", $jsonData['idPedido'], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  // Datos de Pedido por ID
  public static function mdlDatosPedidoPorID($table, $idPedido)
  {
    $statement = Conexion::conn()->prepare("SELECT pedido.idPedido, pedido.idCli, pedido.tituloPedido, pedido.nombrePedido, pedido.fechaPedido, pedido.idCoti, pedido.idFichaTec, pedido.estadoPedido, cotizacion.tituloCoti FROM $table INNER JOIN cliente ON 
		pedido.idCli = cliente.idCli INNER JOIN cotizacion ON pedido.idCoti = cotizacion.idCoti INNER JOIN ficha_tecnica ON  pedido.idFichaTec = ficha_tecnica.idFichaTec WHERE pedido.idPedido = :idPedido");
    $statement->bindParam(":idPedido", $idPedido, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // Eliminar Pedido
  public static function mdlEliminarPedido($table, $idPedido)
  {
    try 
  {
      $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idPedido = :idPedido");
      $statement->bindParam(":idPedido", $idPedido, PDO::PARAM_INT);
      if ($statement->execute()) {
        return "ok";
      } else {
        return "error";
      }
    } catch (Exception $e) {
      return "error";
    }
  }
  //  Descargar PDF del pedido
  public static function mdlDescargarPdfPedido($table, $idPedido)
  {
    $statement = Conexion::conn()->prepare("SELECT
      pedido.tituloPedido, 
      pedido.nombrePedido, 
      pedido.fechaPedido, 
      cotizacion.tituloCoti, 
      cotizacion.fechaCoti, 
      cotizacion.razonSocialCoti, 
      cotizacion.nombreComercialCoti, 
      cotizacion.rucCoti, 
      cotizacion.nombreCoti, 
      cotizacion.celularCoti, 
      cotizacion.correoCoti, 
      cotizacion.direccionCoti, 
      cotizacion.detalleCoti, 
      cotizacion.productsCoti, 
      cotizacion.totalProductsCoti, 
      cotizacion.igvCoti, 
      cotizacion.subTotalCoti, 
      cotizacion.totalCoti, 
      cotizacion.estadoCoti
    FROM
      pedido
      INNER JOIN
      cotizacion
      ON 
        pedido.idCoti = cotizacion.idCoti
    WHERE
      pedido.idPedido = :idPedido");
    $statement->bindParam(":idPedido", $idPedido, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // Todos los pedidos terminados
  public static function mdlPedidosTerminados($table)
  {
    $statement = Conexion::conn()->prepare("SELECT pedido.idPedido, pedido.nombrePedido, pedido.idCoti FROM $table INNER JOIN proceso_operativo ON pedido.idPedido = proceso_operativo.idPedido WHERE proceso_operativo.estadoProcOp = 5");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  public static function mdlCambiarEstadoPedido($table, $idPedido, $estadoPedido)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoPedido = :estadoPedido WHERE idPedido = :idPedido");
    $statement->bindParam(":estadoPedido", $estadoPedido, PDO::PARAM_INT);
    $statement->bindParam(":idPedido", $idPedido, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
}
