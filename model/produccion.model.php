<?php

require_once "conexion.php";

class ProduccionsModel
{
    //datatable de produccion
     public static function mdlDTableProduccion($table)
    {
        $statement = Conexion::conn()->prepare("SELECT 
            p.idProduccion,
            p.fechaAceptProducc,
            p.idProcOpFin,
            p.estadoProduccion,
            pof.idProcOp,
            po.nombreProcOp,
            po.fechaInicioProcOp,
            po.fechaFinProcOp,
            po.idPedido,
            ped.idCoti
        FROM 
            $table p
        INNER JOIN 
            proceso_operativo_fin pof ON p.idProcOpFin = pof.idProcOpFin
        INNER JOIN 
            proceso_operativo po ON pof.idProcOp = po.idProcOp
        INNER JOIN 
            tipo_proceso tp ON po.idTipoProc = tp.idTipoProc
        INNER JOIN 
            pedido ped ON po.idPedido = ped.idPedido
        INNER JOIN 
            cotizacion c ON ped.idCoti = c.idCoti
        ORDER BY 
            p.idProcOpFin DESC
        ");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
       //  aceptar produccion
    public static function mdlAceptarProduccion($table, $dataCreate)
    {
        $statement = Conexion::conn()->prepare("UPDATE 
        $table
        SET 
        fechaAceptProducc = :fechaAceptProducc,
        estadoProduccion = :estadoProduccion,
        DateCreate = :DateCreate
        WHERE 
        idProduccion = :idProduccion");
        $statement->bindParam(":fechaAceptProducc", $dataCreate["fechaAceptProducc"], PDO::PARAM_STR);
        $statement->bindParam(":estadoProduccion", $dataCreate["estadoProduccion"], PDO::PARAM_INT);
        $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
        $statement->bindParam(":idProduccion", $dataCreate["idProduccion"], PDO::PARAM_INT);
        if ($statement->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }
}