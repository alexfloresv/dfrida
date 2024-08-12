<?php

require_once "conexion.php";

class HomeModel
{
  // Mostrar todos los pedidos
  public static function mdlObtenerProcesosOperativosTiempoCosto($table)
  {
    $statement = Conexion::conn()->prepare("SELECT proceso_operativo.idProcOp,  proceso_operativo.descripcionProcOp, ficha_proceso.procesoFichaProcJson, cotizacion.totalCoti FROM $table INNER JOIN tipo_proceso ON proceso_operativo.idTipoProc = tipo_proceso.idTipoProc INNER JOIN ficha_proceso ON tipo_proceso.idFichaProc = ficha_proceso.idFichaProc INNER JOIN pedido ON proceso_operativo.idPedido = pedido.idPedido INNER JOIN cotizacion ON pedido.idCoti = cotizacion.idCoti WHERE proceso_operativo.estadoProcOp = 5");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
