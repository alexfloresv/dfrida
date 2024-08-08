<?php

require_once "conexion.php";

class ProduccionsModel
{
    //datatable de produccion
     public static function mdlDTableProduccion($table)
    {
        $statement = Conexion::conn()->prepare("SELECT 
            p.idProcOpFin,
            p.estadoProduccion,
            pof.idProcOp,
            po.nombreProcOp,
            po.fechaInicioProcOp,
            po.fechaFinProcOp,
            po.idPedido,
            po.idTipoProc,
            tp.idFichaProc,
            ped.idCoti,
            c.productsCoti,
            c.productsMprimaCoti
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
}