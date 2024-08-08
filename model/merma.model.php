<?php

require_once "conexion.php";

class MermaModel
{
    //datatable de produccion
     public static function mdlDTableMerma($table)
    {
        $statement = Conexion::conn()->prepare("SELECT 
        idMerma, idProcOp, idSalMprima, fechaMermaIng, estadoMerma, fechaMermaAprob, nombreMerma FROM $table 
        ORDER BY 
        idMerma DESC");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}