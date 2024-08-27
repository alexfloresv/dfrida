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
  // se requiere modificar el archivo my.ini de mysql para poder subir longitud de caracteres  y el tiempo de coneccion
  // para ello se midifica el max_allowed_packet=15M y wait_timeout=300 y interactive_timeout=300
  ////////////////////////
/*   
[mysqld]
port=3306
socket="C:/xampp/mysql/mysql.sock"
basedir="C:/xampp/mysql"
tmpdir="C:/xampp/tmp"
datadir="C:/xampp/mysql/data"
pid_file="mysql.pid"
# enable-named-pipe
key_buffer=16M
**modificar la longitd de caracatenes es de 1 megabit se incremento a 15 **
max_allowed_packet=15M
sort_buffer_size=512K
net_buffer_length=8K
read_buffer_size=256K
read_rnd_buffer_size=512K
myisam_sort_buffer_size=8M
log_error="mysql_error.log"
**modificar el tiempo de coneccion se incremento a 5 minutos por ciacaso**
wait_timeout=300
interactive_timeout=300
 */
  ////////////////////////
  //  crear ficha tecnica
  public static function mdCrearFichaTecnica($table, $dataCreate)
  {
    try {
      $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreFichaTec, fechaFichaTec, clienteFichaTec, descripcionFichaTec, codigoFichaTec, nombreSoliFichaTec, celularFichaTec, correoFichaTec, detalleFichaTec, estadoFichaTec, DateCreate) VALUES(:nombreFichaTec, :fechaFichaTec, :clienteFichaTec, :descripcionFichaTec, :codigoFichaTec, :nombreSoliFichaTec, :celularFichaTec, :correoFichaTec, :detalleFichaTec,  :estadoFichaTec, :DateCreate)");

      $statement->bindParam(":nombreFichaTec", $dataCreate["nombreFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":fechaFichaTec", $dataCreate["fechaFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":clienteFichaTec", $dataCreate["clienteFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":descripcionFichaTec", $dataCreate["descripcionFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":codigoFichaTec", $dataCreate["codigoFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":nombreSoliFichaTec", $dataCreate["nombreSoliFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":celularFichaTec", $dataCreate["celularFichaTec"], PDO::PARAM_INT);
      $statement->bindParam(":correoFichaTec", $dataCreate["correoFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":detalleFichaTec", $dataCreate["detalleFichaTec"], PDO::PARAM_STR);
      //$statement->bindParam(":docFichaTec", $dataCreate["docFichaTec"], PDO::PARAM_STR);
      $statement->bindParam(":estadoFichaTec", $dataCreate["estadoFichaTec"], PDO::PARAM_INT);
      $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

      if ($statement->execute()) {
        return "ok";
      } else {
        return "error";
      }
    } catch (PDOException $e) {
      return "errorFicha";
    }
  }
  //obtener el ultimo registro de la ficha tecnica
  public static function mdCrearObtenerElUltimoRegistro($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idFichaTec FROM $table ORDER BY idFichaTec DESC LIMIT 1");
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
  //registrar el documento de la ficha tecnica
  public static function mdlRegistrarDocFichaTec($table, $idFichaTec, $docFichaTec)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET docFichaTec = :docFichaTec WHERE idFichaTec = :idFichaTec");

    $statement->bindParam(":idFichaTec", $idFichaTec["idFichaTec"], PDO::PARAM_INT);
    $statement->bindParam(":docFichaTec", $docFichaTec, PDO::PARAM_STR);
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
  //obtebre el nombre de la ficha tecnica para eliminar el archivo
  public static function mdlDocFichaTecnica($table, $codFichaTec)
  {
    $statement = Conexion::conn()->prepare("SELECT docFichaTec FROM $table WHERE idFichaTec = :idFichaTec");
    $statement->bindParam(":idFichaTec", $codFichaTec, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
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

  //cliente para ficha tecnica
  public static function mdlClientesFichaTec($table)
  {
    $statement = Conexion::conn()->prepare("SELECT 
    idCli,
    nombreCli,
    celularCli,
    correoCli,
    rucCli
     FROM $table ORDER BY idCli DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

}
