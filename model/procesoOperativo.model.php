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
  //data table tipos de procesos operativos
  public static function mdlDTableTiposProcesosOperativos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idTipoProc, descripcionTipoProc, idFichaProc, nombreTipoProc FROM $table ORDER BY idTipoProc DESC");
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

  //// visualizar datos para editar tipo de proceso operativo
  public static function mdlViewDataTipoProcOp($table, $codTipoProc)
  {
    $statement = Conexion::conn()->prepare("SELECT idTipoProc, descripcionTipoProc, idFichaProc, nombreTipoProc FROM $table WHERE idTipoProc = :idTipoProc");
    $statement->bindParam(":idTipoProc", $codTipoProc, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de pedidos
  public static function mdlSelect2Pedido($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idPedido, tituloPedido FROM $table WHERE estadoPedido = 1 ORDER BY idPedido DESC");
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
    try {
      $statement = Conexion::conn()->prepare("INSERT INTO $table (
              nombreProcOp, 
              descripcionProcOp, 
              fechaRegistroProcOp, 
              fechaFinProcOp, 
              idSalMprima, 
              idPedido, 
              idTipoProc, 
              estadoProcOp, 
              DateCreate
          ) VALUES (
              :nombreProcOp, 
              :descripcionProcOp, 
              :fechaRegistroProcOp, 
              :fechaFinProcOp, 
              :idSalMprima, 
              :idPedido, 
              :idTipoProc, 
              :estadoProcOp, 
              :DateCreate
          )");

      $statement->bindParam(":nombreProcOp", $dataCreate["nombreProcOp"], PDO::PARAM_STR);
      $statement->bindParam(":descripcionProcOp", $dataCreate["descripcionProcOp"], PDO::PARAM_STR);
      $statement->bindParam(":fechaRegistroProcOp", $dataCreate["fechaRegistroProcOp"], PDO::PARAM_STR);
      $statement->bindParam(":fechaFinProcOp", $dataCreate["fechaFinProcOp"], PDO::PARAM_STR);
      $statement->bindParam(":idSalMprima", $dataCreate["idSalMprima"], PDO::PARAM_INT);
      $statement->bindParam(":idPedido", $dataCreate["idPedido"], PDO::PARAM_INT);
      $statement->bindParam(":idTipoProc", $dataCreate["idTipoProc"], PDO::PARAM_INT);
      $statement->bindParam(":estadoProcOp", $dataCreate["estadoProcOp"], PDO::PARAM_INT);
      $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

      if ($statement->execute()) {
        return "ok";
      }
    } catch (PDOException $e) {
      return "error";
    }
  }

  //obtener el ultimo registro de proceso operativo
  public static function mdlUltimoRegistroProcOp($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp FROM $table ORDER BY idProcOp DESC LIMIT 1");
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);

  }
  // actualizar estado de pedido
  public static function mdlActualizarPedidoProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoPedido = :estadoPedido, DateUpdate = :DateUpdate WHERE idPedido = :idPedido");
    $statement->bindParam(":estadoPedido", $dataUpdate["estadoPedido"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idPedido", $dataUpdate["idPedido"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //asignar proceso operativo a salida materia prima
  public static function mdlAsignarSalMprima($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idProcOp = :idProcOp, DateUpdate = :DateUpdate WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //editar  tipo de proceso operativo 
  public static function mdlEditarTipoProc($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreTipoProc = :nombreTipoProc, descripcionTipoProc = :descripcionTipoProc, idFichaProc = :idFichaProc, DateUpdate = :DateUpdate WHERE idTipoProc = :idTipoProc");
    $statement->bindParam(":nombreTipoProc", $dataUpdate["nombreTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionTipoProc", $dataUpdate["descripcionTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":idFichaProc", $dataUpdate["idFichaProc"], PDO::PARAM_INT);
    $statement->bindParam(":idTipoProc", $dataUpdate["idTipoProc"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //borrar  tipo de proceso operativo 
  public static function mdlBorrarTipoProc($table, $codTipoProcDelet)
  {
    try {
      $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idTipoProc = :idTipoProc");
      $statement->bindParam(":idTipoProc", $codTipoProcDelet, PDO::PARAM_INT);
      if ($statement->execute()) {
        return "ok";
      } else {
        return "error";
      }
    } catch (Exception $e) {
      return "error";
    }
  }
  //funcion visualizar datos para editar proceso operativo principal
  public static function mdlViewDataProcOp($table, $codProcOpEditView)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp, idTipoProc, idPedido, idSalMprima, descripcionProcOp, nombreProcOp, fechaRegistroProcOp, fechaFinProcOp FROM $table WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $codProcOpEditView, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima edit
  public static function mdSelect2SalMprimaEdit($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idSalMprima, nombreSalMprima FROM $table ORDER BY idSalMprima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //funcion para mostrar el selec2 de pedidos edit
  public static function mdlSelect2PedidoEdit($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idPedido, tituloPedido FROM $table ORDER BY idPedido DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //funcion visualizar datos para editar proceso operativo principal
  public static function mdlViewRegDataProcOp($table, $idProcOp)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp, idTipoProc, idPedido, idSalMprima, descripcionProcOp, nombreProcOp, fechaRegistroProcOp, fechaFinProcOp FROM $table WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $idProcOp, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //obtener registro actual de proceso operativo
  public static function mdlRegistroActualProcOp($table, $idProcOp)
  {
    $statement = Conexion::conn()->prepare("SELECT idSalMprima FROM $table WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $idProcOp, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //asignar proceso operativo a salida materia prima
  public static function mdlAsignarProcOpSalMprima($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idProcOp = :idProcOp, DateUpdate = :DateUpdate WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //asignar salida materia prima a proceso operativo
  public static function mdlAsignarSalMprimaProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idSalMprima = :idSalMprima, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //quitar registro proc op actual de salida materia prima
  public static function mdlQuitarSalMprimaProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idProcOp = :idProcOp, DateUpdate = :DateUpdate WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //agregar nuevo registro de proc op a salida materia prima
  public static function mdlAddUpdateSalMprimaProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idProcOp = :idProcOp, DateUpdate = :DateUpdate WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //quitar perdido anterior
  public static function mdlQuitarPedidoAnterior($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoPedido = :estadoPedido, DateUpdate = :DateUpdate WHERE idPedido = :idPedido");
    $statement->bindParam(":estadoPedido", $dataUpdate["estadoPedido"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idPedido", $dataUpdate["idPedido"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //agregar nuevo pedido a proceso operativo
  public static function mdlAddPedidoNewProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idPedido = :idPedido, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idPedido", $dataUpdate["idPedido"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //editar proceso operativo
  public static function mdlEditarProcOp($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreProcOp = :nombreProcOp,  descripcionProcOp = :descripcionProcOp,  fechaRegistroProcOp = :fechaRegistroProcOp, fechaFinProcOp = :fechaFinProcOp, idTipoProc = :idTipoProc, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":nombreProcOp", $dataUpdate["nombreProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":descripcionProcOp", $dataUpdate["descripcionProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":fechaRegistroProcOp", $dataUpdate["fechaRegistroProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":fechaFinProcOp", $dataUpdate["fechaFinProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":idTipoProc", $dataUpdate["idTipoProc"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //obtener registro actual de proceso operativo para borrar
  public static function mdlViewRegDataProcOpDelet($table, $codProcDelet)
  {
    $statement = Conexion::conn()->prepare("SELECT idPedido, idSalMprima FROM $table WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $codProcDelet, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //borrar  tipo de proceso operativo 
  public static function mdlBorrarProcOp($table, $codProcDelet)
  {
    try {
      $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idProcOp = :idProcOp");
      $statement->bindParam(":idProcOp", $codProcDelet, PDO::PARAM_INT);
      if ($statement->execute()) {
        return "ok";
      } else {
        return "error";
      }
    } catch (Exception $e) {
      return "error";
    }
  }

  //iniciar proceso operativo
  public static function mdlIniciarProcesoOperativo($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoProcOp = :estadoProcOp, fechaInicioProcOp = :fechaInicioProcOp, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":estadoProcOp", $dataUpdate["estadoProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":fechaInicioProcOp", $dataUpdate["fechaInicioProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //finalizar proceso operativo
  public static function mdlFinalizarProcesoOperativo($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoProcOp = :estadoProcOp, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":estadoProcOp", $dataUpdate["estadoProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  // registrar finalaizacion en tabla proceso operativo finalizado
  public static function mdlRegistrarProcOpFinalizado($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idProcOp, estadoProcOpFin, DateCreate) VALUES(:idProcOp, :estadoProcOpFin, :DateCreate)");
    $statement->bindParam(":idProcOp", $dataCreate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":estadoProcOpFin", $dataCreate["estadoProcOpFin"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //ultimo registro de proceso operativo finalizado
  public static function mdlUltimoRegProcOpFin($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOpFin FROM $table ORDER BY idProcOpFin DESC LIMIT 1");
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //registro de produccion
  public static function mdlRegistrarProduccion($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idProcOpFin, estadoProduccion, DateCreate) VALUES(:idProcOpFin, :estadoProduccion, :DateCreate)");
    $statement->bindParam(":idProcOpFin", $dataCreate["idProcOpFin"], PDO::PARAM_STR);
    $statement->bindParam(":estadoProduccion", $dataCreate["estadoProduccion"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //actualziar estado de pedido a finalizado
  public static function mdlActualizarPedidoProcOpFin($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoPedido = :estadoPedido, DateUpdate = :DateUpdate WHERE idPedido = :idPedido");
    $statement->bindParam(":estadoPedido", $dataUpdate["estadoPedido"], PDO::PARAM_INT);
    $statement->bindParam(":idPedido", $dataUpdate["idPedido"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //visualizar datos estados de proceso operativo principal
  public static function mdlViewDataEstadosProcesoOperativo($table, $idProcOp)
  {
    $statement = Conexion::conn()->prepare("
         SELECT 
             po.idProcOp, 
             po.idTipoProc, 
             po.fechaInicioProcOp, 
             po.fechaFinProcOp, 
             po.estadoProcOp,
             tp.nombreTipoProc,
             tp.idFichaProc
         FROM $table po
         INNER JOIN tipo_proceso tp ON po.idTipoProc = tp.idTipoProc
         WHERE po.idProcOp = :idProcOp
     ");
    $statement->bindParam(":idProcOp", $idProcOp, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //visualizar procesos en el modal de procesos trabajo del proceso operativo
  public static function mdlVerProcesosTrabajo($table, $idFichaProc)
  {
    $statement = Conexion::conn()->prepare("SELECT 
     procesoFichaProcJson
     FROM $table WHERE idFichaProc = :idFichaProc");
    $statement->bindParam(":idFichaProc", $idFichaProc, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
    //obtener estado de proceso operativo
  public static function mdlOptenerEstadoDeprocesoOp($table, $idProcOp)
  {
    $statement = Conexion::conn()->prepare("SELECT 
     estadoProcOp
     FROM $table WHERE idProcOp = :idProcOp");
    $statement->bindParam(":idProcOp", $idProcOp, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
  //finalizar proceso operativo modal estados
  public static function mdlActualizarEstadoProcesoOperativo($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoProcOp = :estadoProcOp, fechaFinProcOp = :fechaFinProcOp, DateUpdate = :DateUpdate WHERE idProcOp = :idProcOp");
    $statement->bindParam(":estadoProcOp", $dataUpdate["estadoProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":fechaFinProcOp", $dataUpdate["fechaFinProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //////////////////////////////////////////////////////
}