<?php
require_once "conexion.php";


class FichaTecnicaModel
{
  //datatable de FichaTecnica
  public static function mdlDTableFichaTecnica($table)
  {
    $statement = Conexion::conn()->prepare("SELECT 
    idFichaTec,
    nombreFichaTec, 
    fechaFichaTec, 
    descripcionFichaTec, 
    codigoFichaTec, 
    clienteFichaTec, 
    celularFichaTec, 
    estadoFichaTec 
    FROM $table ORDER BY idFichaTec DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //  crear ficha tecnica
  public static function mdCrearFichaTecnica($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreFichaTec, fechaFichaTec, clienteFichaTec, descripcionFichaTec, codigoFichaTec, nombreSoliFichaTec, celularFichaTec, correoFichaTec, detalleFichaTec, docFichaTec, estadoFichaTec, DateCreate) VALUES(:nombreFichaTec, :fechaFichaTec, :clienteFichaTec, :descripcionFichaTec, :codigoFichaTec, :nombreSoliFichaTec, :celularFichaTec, :correoFichaTec, :detalleFichaTec, :docFichaTec, :estadoFichaTec, :DateCreate)");

    $statement->bindParam(":nombreFichaTec", $dataCreate["nombreFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":fechaFichaTec", $dataCreate["fechaFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":clienteFichaTec", $dataCreate["clienteFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionFichaTec", $dataCreate["descripcionFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":codigoFichaTec", $dataCreate["codigoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":nombreSoliFichaTec", $dataCreate["nombreSoliFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":celularFichaTec", $dataCreate["celularFichaTec"], PDO::PARAM_INT);
    $statement->bindParam(":correoFichaTec", $dataCreate["correoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":detalleFichaTec", $dataCreate["detalleFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":docFichaTec", $dataCreate["docFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":estadoFichaTec", $dataCreate["estadoFichaTec"], PDO::PARAM_INT);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //  visualizar datos ficha tecnica
  public static function mdlViewDatosFichaTecnica($table, $codFichaTec)
  {
    $statement = Conexion::conn()->prepare("SELECT
    idFichaTec,
    nombreFichaTec,
    fechaFichaTec,
    clienteFichaTec,
    descripcionFichaTec,
    codigoFichaTec,
    nombreSoliFichaTec,
    celularFichaTec,
    correoFichaTec,
    detalleFichaTec,
    docFichaTec
    FROM $table WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codFichaTec, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  // Editar datos del personal
  public static function mdlUpdatePersonal($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET IdTipoPer=:IdTipoPer, dni=:dni, NombrePer=:NombrePer, ApellidoPer=:ApellidoPer, TelefonoPer=:TelefonoPer, DireccionPer=:DireccionPer, Estado=:Estado, DateUpdate=:DateUpdate WHERE IdPer=:IdPer");
    $statement->bindParam(":IdTipoPer", $dataUpdate["IdTipoPer"], PDO::PARAM_INT);
    $statement->bindParam(":dni", $dataUpdate["dni"], PDO::PARAM_INT);
    $statement->bindParam(":NombrePer", $dataUpdate["NombrePer"], PDO::PARAM_STR);
    $statement->bindParam(":ApellidoPer", $dataUpdate["ApellidoPer"], PDO::PARAM_STR);
    $statement->bindParam(":TelefonoPer", $dataUpdate["TelefonoPer"], PDO::PARAM_STR);
    $statement->bindParam(":DireccionPer", $dataUpdate["DireccionPer"], PDO::PARAM_STR);
    $statement->bindParam(":Estado", $dataUpdate["Estado"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":IdPer", $dataUpdate["IdPer"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //verificar si esta en uso la ficha tecnica
  public static function mdlVerificarUsoFichaTecnica($table, $codFichaTec)
  {
    $statement = Conexion::conn()->prepare("SELECT idFichaTec FROM $table WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codFichaTec, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch();
    return $result !== false;
  }

  //borrar FichaTecnica
  public static function mdlDeleteFichaTecnica($table, $codFichaTec)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codFichaTec, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //  Descargar ficha tecnica
  public static function mdlDescargarFichaTecnica($table, $codCotiB64)
  {
    $statement = Conexion::conn()->prepare("SELECT docFichaTec FROM $table WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codCotiB64, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

}
