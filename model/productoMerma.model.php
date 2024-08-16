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
    /* "{"producto0":{"codProdIng":"33","nombreProdIng":"boton 1cm","codigoProdIng":"T1234555","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"0.30"},"producto1":{"codProdIng":"32","nombreProdIng":"hilo blanco","codigoProdIng":"T123459","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"7.00"},"producto2":{"codProdIng":"30","nombreProdIng":"ceda","codigoProdIng":"T12345","unidadProdIng":"Metros","cantidadProdIng":"1","precioProdIng":"14.00"},"producto3":{"codProdIng":"34","nombreProdIng":"boton casaca promo","codigoProdIng":"T12345888","unidadProdIng":"Uni","cantidadProdIng":"1","precioProdIng":"0.50"}}" */


}