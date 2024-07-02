<?php
require_once "conexion.php";


class ClientsModel
{

  //  Get clients
  public static function mdlGetClients($table)
  {
    $statement = Conexion::conn()->prepare("SELECT tb_client.IdClient, tb_client.NameClient FROM $table ORDER BY IdClient DESC");
    $statement->execute();
    return $statement->fetchAll();
  }

  // Obtener todos los clientes
  public static function mdlGetAllClients($table)
  {
    $statement = Conexion::conn()->prepare("SELECT
      idCli,  
      RazonSocialCli, 
      rucCli, 
      nombreCli, 
      correoCli, 
      direccionCli, 
      celularCli,
      detalleCli, 
      estadoCli
      FROM 
      $table
      ORDER BY 
      IdCli DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  // Create clients
  public static function mdlCreateClient($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (rucCli, RazonSocialCli,nombreCli, CorreoCli, direccionCli, celularCli, detalleCli, estadoCli, DateCreate, DateUpdate)
     VALUES(:rucCli,:RazonSocialCli,:nombreCli, :correoCli, :direccionCli, :celularCli, :detalleCli, :estadoCli, :DateCreate, :DateUpdate)");
    $statement->bindParam(":rucCli", $dataCreate["rucCli"], PDO::PARAM_STR);
    $statement->bindParam(":RazonSocialCli", $dataCreate["RazonSocialCli"], PDO::PARAM_STR);
    $statement->bindParam(":nombreCli", $dataCreate["nombreCli"], PDO::PARAM_STR);
    $statement->bindParam(":correoCli", $dataCreate["correoCli"], PDO::PARAM_STR);
    $statement->bindParam(":direccionCli", $dataCreate["direccionCli"], PDO::PARAM_STR);
    $statement->bindParam(":celularCli", $dataCreate["celularCli"], PDO::PARAM_STR);
    $statement->bindParam(":detalleCli", $dataCreate["detalleCli"], PDO::PARAM_STR);
    $statement->bindParam(":estadoCli", $dataCreate["estadoCli"], PDO::PARAM_INT);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataCreate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  // Editar datos del cliente
  public static function mdlUpdateClient($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET RazonSocialCli=:RazonSocialCli,rucCli=:rucCli, 
    nombreCli=:nombreCli, correoCli=:correoCli, direccionCli=:direccionCli, 
    celularCli=:celularCli, detalleCli=:detalleCli, estadoCli=:estadoCli, DateUpdate=:DateUpdate
    WHERE idCli=:idCli");
    $statement->bindParam(":RazonSocialCli", $dataUpdate["RazonSocialCli"], PDO::PARAM_STR);
    $statement->bindParam(":rucCli", $dataUpdate["rucCli"], PDO::PARAM_STR);
    $statement->bindParam(":nombreCli", $dataUpdate["nombreCli"], PDO::PARAM_STR);
    $statement->bindParam(":correoCli", $dataUpdate["correoCli"], PDO::PARAM_STR);
    $statement->bindParam(":direccionCli", $dataUpdate["direccionCli"], PDO::PARAM_STR);
    $statement->bindParam(":celularCli", $dataUpdate["celularCli"], PDO::PARAM_STR);
    $statement->bindParam(":detalleCli", $dataUpdate["detalleCli"], PDO::PARAM_STR);
    $statement->bindParam(":estadoCli", $dataUpdate["estadoCli"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idCli", $dataUpdate["idCli"], PDO::PARAM_INT);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  // Obtener datos del cliente
  public static function mdlGetClientDataEdit($table, $codClient)
  {
    $statement = Conexion::conn()->prepare("SELECT
    idCli, 
    RazonSocialCli, 
    rucCli, 
    nombreCli, 
    correoCli, 
    direccionCli, 
    celularCli, 
    detalleCli,
    estadoCli 
    FROM $table WHERE idCli = $codClient");
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  // Eliminar cliente
  public static function mdlDeleteClient($table, $codClient)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idCli = :idCli");
    $statement->bindParam(":idCli", $codClient, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
}