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
  //  visualizar datos ficha de trabajo
  public static function mdlVerDataFichaTrabajo($table, $codFichaTec)
  {
    $statement = Conexion::conn()->prepare("SELECT
    idFichaProc,
    tituloFichaProc,
    productoFichaProc, 
    detalleFichaProc,
    procesoFichaProcJson
    FROM $table WHERE idFichaProc = :idFichaProc");
    $statement->bindParam(":idFichaProc", $codFichaTec, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  // editar ficha trabajo
  public static function mdlEditFichaTrabajo($table, $dataEdit)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET tituloFichaProc = :tituloFichaProc, productoFichaProc = :productoFichaProc, detalleFichaProc = :detalleFichaProc, procesoFichaProcJson = :procesoFichaProcJson WHERE idFichaProc = :idFichaProc");
    $statement->bindParam(":tituloFichaProc", $dataEdit["tituloFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":productoFichaProc", $dataEdit["productoFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":detalleFichaProc", $dataEdit["detalleFichaProc"], PDO::PARAM_STR);
    $statement->bindParam(":procesoFichaProcJson", $dataEdit["procesoFichaProcJson"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaProc", $dataEdit["idFichaProc"], PDO::PARAM_INT);
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

  //eliminar ficha trabajo
 public static function mdlDeleteFichaTrabajo($table, $codFichTrab)
  {
    try {
      $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idFichaProc = :idFichaProc");
      $statement->bindParam(":idFichaProc", $codFichTrab, PDO::PARAM_INT);
      if ($statement->execute()) {
        return "ok";
      } else {
        return "error";
      }
    } catch (PDOException $e) {
      // Manejar el error de la base de datos que sera la clave foranea
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
