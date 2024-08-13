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
    //  aceptar merma registro
    public static function mdlAceptarMermaRegsitro($table, $dataUpdate)
    {
        $statement = Conexion::conn()->prepare("UPDATE $table SET 
        nombreMerma = :nombreMerma, 
        fechaMermaAprob = :fechaMermaAprob, 
        jsonMerma = :jsonMerma, 
        estadoMerma = :estadoMerma, 
        DateUpdate = :DateUpdate 
        WHERE idMerma = :idMerma");
        $statement->bindParam(":idMerma", $dataUpdate["idMerma"], PDO::PARAM_INT);
        $statement->bindParam(":nombreMerma", $dataUpdate["nombreMerma"], PDO::PARAM_STR);
        $statement->bindParam(":fechaMermaAprob", $dataUpdate["fechaMermaAprob"], PDO::PARAM_STR);
        $statement->bindParam(":jsonMerma", $dataUpdate["jsonMerma"], PDO::PARAM_STR);
        $statement->bindParam(":estadoMerma", $dataUpdate["estadoMerma"], PDO::PARAM_INT);
        $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
        $statement->execute();
        if ($statement->execute()) {
            return "ok";
        } else {
            return "error";
        }
    }

}