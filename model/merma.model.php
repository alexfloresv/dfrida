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
    /* {"merma0":{"codProdIng":"34","nombreProdIng":"boton casaca promo","codigoProdIng":"T12345888","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"0.50","mermaDesechoEstado":"1"},"merma1":{"codProdIng":"32","nombreProdIng":"hilo blanco","codigoProdIng":"T123459","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"7.00","mermaDesechoEstado":"1"},"merma2":{"codProdIng":"33","nombreProdIng":"boton 1cm","codigoProdIng":"T1234555","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"0.30","mermaDesechoEstado":"1"}} */
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

    //visualizar datos estados de proceso operativo principal
    public static function mdlViewDataProcesoOperativoMerma($table, $idProcOp)
    {
        $statement = Conexion::conn()->prepare("SELECT 
              po.idProcOp,
              po.nombreProcOp,
              po.idTipoProc, 
              po.fechaInicioProcOp, 
              po.fechaFinProcOp, 
              po.estadoProcOp,
              tp.nombreTipoProc
          FROM $table po
          INNER JOIN tipo_proceso tp ON po.idTipoProc = tp.idTipoProc
          WHERE po.idProcOp = :idProcOp");
        $statement->bindParam(":idProcOp", $idProcOp, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
    //visualizar merma aceptada
    public static function mdlViewMermaAceptada($table, $idMerma)
    {
        $statement = Conexion::conn()->prepare("SELECT 
        jsonMerma FROM $table 
        WHERE idMerma = :idMerma");
        $statement->bindParam(":idMerma", $idMerma, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
    /* {"merma0":{"codProdIng":"30","nombreProdIng":"ceda","codigoProdIng":"T12345","unidadProdIng":"Metros","cantidadProdIng":"1","precioProdIng":"14"},"merma1":{"codProdIng":"33","nombreProdIng":"boton 1cm","codigoProdIng":"T1234555","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"0.30"}} */


}