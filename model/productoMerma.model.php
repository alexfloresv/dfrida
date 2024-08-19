<?php

require_once "conexion.php";

class ProductoMermaModel
{
    //datatable de produccion
    /* public static function mdlDTableMerma($table)
    {
        $statement = Conexion::conn()->prepare("SELECT 
        idMerma, idProcOp, idSalMprima, fechaMermaIng, estadoMerma, fechaMermaAprob, nombreMerma FROM $table 
        ORDER BY 
        idMerma DESC");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    } */

    //funcion para traer la merma aprobada al selct 2
    public static function mdlDTableMerma($table)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idMerma, nombreMerma 
            FROM $table 
            WHERE estadoMerma = 2 
            ORDER BY idMerma DESC");
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }
    //funcion para trear los productos de la merma aprobada
    public static function mdlAceptarMermaConfirmada($table, $codMermaConfir)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idMerma, nombreMerma, jsonMerma
            FROM $table 
            WHERE idMerma = :idMerma ");
            $statement->bindParam(":idMerma", $codMermaConfir, PDO::PARAM_INT);
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }
    //funcion para traer productos merma del catalogo al selct 2
    public static function mdlViewDataProdMermaCatalogo($table)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idProd, nombreProd
            FROM $table 
            ORDER BY idProd DESC");
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }

    //funcion para trear los productos de catalogo para llnarlo en el campo de producto merma
    public static function mdlProductoMermaCatalogo($table, $codProdCatal)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idProd, nombreProd, codigoProd, unidadProd, precioProd
            FROM $table 
            WHERE idProd = :idProd ");
            $statement->bindParam(":idProd", $codProdCatal, PDO::PARAM_INT);
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }

    //funciones para crear producto nuevo merma desde la vista recuepracion de datos y registro y updates

    //obtener registro de merma aceptada
    public static function obtenerMermaConfirmada($table, $idMerma)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            jsonMerma
            FROM $table 
            WHERE idMerma = :idMerma ");
            $statement->bindParam(":idMerma", $idMerma, PDO::PARAM_INT);
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin
    //actualizar registro json de la merma base de datos //
    public static function mdlUpdateBaseDeDatos($table, $dataUpdate)
    {
        try {
            $statement = Conexion::conn()->prepare("UPDATE $table SET 
            jsonMerma = :jsonMerma
            WHERE idMerma = :idMerma ");
            $statement->bindParam(":idMerma", $dataUpdate['idMerma'], PDO::PARAM_INT);
            $statement->bindParam(":jsonMerma", $dataUpdate['jsonMerma'], PDO::PARAM_STR);
            $statement->execute();

            // Verificar si la actualización fue exitosa
            if ($statement->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin funcion

    //**fin funciones


}