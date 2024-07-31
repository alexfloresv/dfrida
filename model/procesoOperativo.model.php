<?php

require_once "conexion.php";

class procesoOperativoModel
{
  //datatable de proceso Op
  public static function mdlDTableProcesosOperativos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp, idTipoProc, idPedido, idSalMprima, descripcionProcOp, nombreProcOp, fechaRegistroProcOp, fechaInicioProcOp, fechaFinProcOp, estadoProcOp FROM $table ORDER BY idProcOp DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de fichas de trabajo
  public static function mdlSelect2FichTrabModal($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idfichaProc, tituloFichaProc  FROM $table ORDER BY idfichaProc DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //crear el tipo de proceso operativo
  public static function mdlCrearTipoProcModal($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreTipoProc, descripcionTipoProc,idFichaProc, DateCreate) VALUES(:nombreTipoProc, :descripcionTipoProc, :idFichaProc, :DateCreate)");
    $statement->bindParam(":nombreTipoProc", $dataCreate["nombreTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionTipoProc", $dataCreate["descripcionTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaProc", $dataCreate["idFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //funcion para mostrar el selec2 de pedidos
  public static function mdlSelect2Pedido($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idPedido, tituloPedido  FROM $table ORDER BY idPedido DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de tipo de procesos
  public static function mdlSelect2TiposProcesos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idTipoProc, nombreTipoProc  FROM $table ORDER BY idTipoProc DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima
  public static function mdSelect2SalMprima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idSalMprima, nombreSalMprima FROM $table WHERE idProcOp IS NULL OR idProcOp = 0 ORDER BY idSalMprima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //verifi

//crear  proceso operativo principal
  public static function mdlCrearProcOpModal($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreTipoProc, descripcionTipoProc,idFichaProc, DateCreate) VALUES(:nombreTipoProc, :descripcionTipoProc, :idFichaProc, :DateCreate)");
    $statement->bindParam(":nombreTipoProc", $dataCreate["nombreTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionTipoProc", $dataCreate["descripcionTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaProc", $dataCreate["idFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //////////////////////////////////////////////////////
}