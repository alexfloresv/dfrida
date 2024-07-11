<?php
require_once "conexion.php";


class FichaTrabajoModel
{
  //datatable de FichaTecnica
  public static function mdlDTableFrichasTrabajo($table)
  {
    $statement = Conexion::conn()->prepare("SELECT 
    idFichaProc,
    tituloFichaProc,
    productoFichaProc, 
    detalleFichaProc
    FROM $table ORDER BY idFichaProc DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //visualizar procesos en el modal de procesos trabajo
  public static function mdlVerProcesosTrabajo($table, $codFichTrab)
  {
    $statement = Conexion::conn()->prepare("SELECT 
    procesoFichaProcJson
    FROM $table WHERE idFichaProc = :idFichaProc");
    $statement->bindParam(":idFichaProc", $codFichTrab, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
  //  crear ficha Trabajo
  public static function mdCrearFichaTrabajo($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (tituloFichaProc, productoFichaProc, detalleFichaProc, procesoFichaProcJson, DateCreate) VALUES(:tituloFichaProc, :productoFichaProc, :detalleFichaProc, :procesoFichaProcJson,  :DateCreate)");
    $statement->bindParam(":tituloFichaProc", $dataCreate["tituloFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":productoFichaProc", $dataCreate["productoFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":detalleFichaProc", $dataCreate["detalleFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":procesoFichaProcJson", $dataCreate["procesoFichaProcJson"], PDO::PARAM_STR);
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

  // Editar ficha técnica con ficha tecnica
  public static function mdlUpdateConFichaTecnica($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreFichaTec=:nombreFichaTec, fechaFichaTec=:fechaFichaTec, clienteFichaTec=:clienteFichaTec, descripcionFichaTec=:descripcionFichaTec, codigoFichaTec=:codigoFichaTec, nombreSoliFichaTec=:nombreSoliFichaTec, celularFichaTec=:celularFichaTec, correoFichaTec=:correoFichaTec, detalleFichaTec=:detalleFichaTec, docFichaTec=:docFichaTec, estadoFichaTec=:estadoFichaTec, DateUpdate=:DateUpdate WHERE idFichaTec=:idFichaTec");

    $statement->bindParam(":nombreFichaTec", $dataUpdate["nombreFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":fechaFichaTec", $dataUpdate["fechaFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":clienteFichaTec", $dataUpdate["clienteFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionFichaTec", $dataUpdate["descripcionFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":codigoFichaTec", $dataUpdate["codigoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":nombreSoliFichaTec", $dataUpdate["nombreSoliFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":celularFichaTec", $dataUpdate["celularFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":correoFichaTec", $dataUpdate["correoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":detalleFichaTec", $dataUpdate["detalleFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":docFichaTec", $dataUpdate["docFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":estadoFichaTec", $dataUpdate["estadoFichaTec"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaTec", $dataUpdate["idFichaTec"], PDO::PARAM_INT);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  // Editar ficha técnica sin ficha tecnica

  public static function mdlUpdateSinFichaTecnica($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreFichaTec=:nombreFichaTec, fechaFichaTec=:fechaFichaTec, clienteFichaTec=:clienteFichaTec, descripcionFichaTec=:descripcionFichaTec, codigoFichaTec=:codigoFichaTec, nombreSoliFichaTec=:nombreSoliFichaTec, celularFichaTec=:celularFichaTec, correoFichaTec=:correoFichaTec, detalleFichaTec=:detalleFichaTec, DateUpdate=:DateUpdate WHERE idFichaTec=:idFichaTec");

    $statement->bindParam(":nombreFichaTec", $dataUpdate["nombreFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":fechaFichaTec", $dataUpdate["fechaFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":clienteFichaTec", $dataUpdate["clienteFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionFichaTec", $dataUpdate["descripcionFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":codigoFichaTec", $dataUpdate["codigoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":nombreSoliFichaTec", $dataUpdate["nombreSoliFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":celularFichaTec", $dataUpdate["celularFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":correoFichaTec", $dataUpdate["correoFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":detalleFichaTec", $dataUpdate["detalleFichaTec"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaTec", $dataUpdate["idFichaTec"], PDO::PARAM_INT);

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

  //cambiar estado de la ficha tecnica al descargar
  public static function mdlEstadoDescargaFichaTecnica($table, $codCotiB64)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoFichaTec = '2' WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codCotiB64, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

}
