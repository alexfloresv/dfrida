<?php

require_once "conexion.php";

class ProveedoresModel
{
  // Obtener todos los usuarios
  public static function mdlDTableProveedores($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProv, razonSocialProv, rucProv, nombreProv, correoProv, direccionProv, celularProv, detalleProv, estadoProv FROM $table ORDER BY idProv DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  // Crear nuevo Proveedores
  public static function mdlCrearProveedor($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (razonSocialProv, rucProv, nombreProv, correoProv, direccionProv, celularProv, detalleProv, estadoProv, DateCreate, DateUpdate) VALUES(:razonSocialProv, :rucProv, :nombreProv, :correoProv, :direccionProv, :celularProv, :detalleProv, :estadoProv, :DateCreate, :DateUpdate)");
    $statement->bindParam(":razonSocialProv", $dataCreate["razonSocialProv"], PDO::PARAM_STR);
    $statement->bindParam(":rucProv", $dataCreate["rucProv"], PDO::PARAM_STR);
    $statement->bindParam(":nombreProv", $dataCreate["nombreProv"], PDO::PARAM_STR);
    $statement->bindParam(":correoProv", $dataCreate["correoProv"], PDO::PARAM_STR);
    $statement->bindParam(":direccionProv", $dataCreate["direccionProv"], PDO::PARAM_STR);
    $statement->bindParam(":celularProv", $dataCreate["celularProv"], PDO::PARAM_STR);
    $statement->bindParam(":detalleProv", $dataCreate["detalleProv"], PDO::PARAM_STR);
    $statement->bindParam(":estadoProv", $dataCreate["estadoProv"], PDO::PARAM_INT);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataCreate["DateUpdate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //  visualizar datos Proveedor
  public static function mdlViewProveedor($table, $codPov)
  {
    $statement = Conexion::conn()->prepare("SELECT idProv, razonSocialProv, rucProv, nombreProv, correoProv, direccionProv, celularProv, detalleProv, estadoProv FROM $table WHERE idProv = $codPov");
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //  editar Proveedor
  public static function mdlEditarProveedores($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET razonSocialProv=:razonSocialProv, rucProv=:rucProv, nombreProv=:nombreProv, correoProv=:correoProv, direccionProv=:direccionProv, celularProv=:celularProv, detalleProv=:detalleProv, estadoProv=:estadoProv, DateUpdate=:DateUpdate WHERE idProv=:idProv");
    $statement->bindParam(":razonSocialProv", $dataUpdate["razonSocialProv"], PDO::PARAM_STR);
    $statement->bindParam(":rucProv", $dataUpdate["rucProv"], PDO::PARAM_INT);
    $statement->bindParam(":nombreProv", $dataUpdate["nombreProv"], PDO::PARAM_STR);
    $statement->bindParam(":correoProv", $dataUpdate["correoProv"], PDO::PARAM_STR);
    $statement->bindParam(":direccionProv", $dataUpdate["direccionProv"], PDO::PARAM_STR);
    $statement->bindParam(":celularProv", $dataUpdate["celularProv"], PDO::PARAM_INT);
    $statement->bindParam(":detalleProv", $dataUpdate["detalleProv"], PDO::PARAM_STR);
    $statement->bindParam(":estadoProv", $dataUpdate["estadoProv"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idProv", $dataUpdate["idProv"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //  borrar Proveedor
  public static function mdlDeleteProveedor($table, $codUser)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idProv = :idProv");
    $statement->bindParam(":idProv", $codUser, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

}