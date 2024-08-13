<?php

require_once "conexion.php";

class HomeModel
{
  // Mostrar todos los procesos operativos con su tiempo y costo
  public static function mdlObtenerProcesosOperativosTiempoCosto($table)
  {
    $statement = Conexion::conn()->prepare("SELECT proceso_operativo.idProcOp,  proceso_operativo.descripcionProcOp, ficha_proceso.procesoFichaProcJson, cotizacion.totalCoti FROM $table INNER JOIN tipo_proceso ON proceso_operativo.idTipoProc = tipo_proceso.idTipoProc INNER JOIN ficha_proceso ON tipo_proceso.idFichaProc = ficha_proceso.idFichaProc INNER JOIN pedido ON proceso_operativo.idPedido = pedido.idPedido INNER JOIN cotizacion ON pedido.idCoti = cotizacion.idCoti WHERE proceso_operativo.estadoProcOp = 5");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  // Mostrar conteo de los estados operativos actuales
  public static function mdlObtenerEstadosProcesosOperativosHome($table)
  {
    $statement = Conexion::conn()->prepare("SELECT
    SUM(CASE WHEN estadoProcOp = 1 THEN 1 ELSE 0 END) AS registrados,
    SUM(CASE WHEN estadoProcOp = 2 THEN 1 ELSE 0 END) AS en_proceso,
    SUM(CASE WHEN estadoProcOp = 3 THEN 1 ELSE 0 END) AS cuello_de_botella,
    SUM(CASE WHEN estadoProcOp = 4 THEN 1 ELSE 0 END) AS listo,
    SUM(CASE WHEN estadoProcOp = 5 THEN 1 ELSE 0 END) AS prenda_terminada,
    SUM(CASE WHEN estadoProcOp = 6 THEN 1 ELSE 0 END) AS retrasado
    FROM
    $table");
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // Mostrar el total recaudado por anio
  public static function mdlObtenerTotalRecaudadoAnio($table)
  {
    $statement = Conexion::conn()->prepare("SELECT EXTRACT(YEAR FROM proceso_operativo.fechaFinProcOp) AS `año`, SUM(cotizacion.totalCoti) AS ganancia_total FROM $table INNER JOIN pedido ON  proceso_operativo.idPedido = pedido.idPedido INNER JOIN cotizacion ON  pedido.idCoti = cotizacion.idCoti WHERE proceso_operativo.estadoProcOp = 5 GROUP BY EXTRACT(YEAR FROM proceso_operativo.fechaFinProcOp) ORDER BY año DESC;");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
