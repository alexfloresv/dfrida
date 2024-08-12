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
    //  aceptar merma
    public static function mdlAceptarMerma($table, $codSalMprimas)
    {
        $statement = Conexion::conn()->prepare("SELECT 
        salJsonMprima FROM $table 
        WHERE idSalMprima = :idSalMprima");
        $statement->bindParam(":idSalMprima", $codSalMprimas, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

}