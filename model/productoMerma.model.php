<?php

require_once "conexion.php";

class ProductoMermaModel
{
    //datatable de produccion
    public static function mdlDTableProductoMerma($table)
    {
        $statement = Conexion::conn()->prepare("SELECT 
        idProdMerma, descripcionProdMerma, fechaProdMerma, estadoProdMerma FROM $table 
        ORDER BY 
        idMerma DESC");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

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
            if ($statement->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin funcion

    //verificar si el producto existe
    public static function mdlVerificarProdExitente($table, $idProd)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idProd
            FROM $table 
            WHERE idProd = :idProd ");
            $statement->bindParam(":idProd", $idProd, PDO::PARAM_STR);
            $statement->execute();

            // Verificar si el resultado de la consulta es falso
            if ($statement->fetch(PDO::FETCH_ASSOC) === false) {
                return false;
            } else {
                return true;
            }
        } catch (Exception $e) {
            return "error";
        }
    }
    // fin

    //crear producto nuevo si no existe false
    public static function crearNuevoProductoMerma($table, $dataCreate)
    {
        try {
            $statement = Conexion::conn()->prepare("INSERT INTO $table 
                    (nombreProd, codigoProd, unidadProd, precioProd, DateCreate) 
                    VALUES 
                    (:nombreProd, :codigoProd, :unidadProd, :precioProd, :DateCreate)");
            $statement->bindParam(":nombreProd", $dataCreate['nombreProd'], PDO::PARAM_STR);
            $statement->bindParam(":codigoProd", $dataCreate['codigoProd'], PDO::PARAM_STR);
            $statement->bindParam(":unidadProd", $dataCreate['unidadProd'], PDO::PARAM_STR);
            $statement->bindParam(":precioProd", $dataCreate['precioProd'], PDO::PARAM_STR);
            $statement->bindParam(":DateCreate", $dataCreate['DateCreate'], PDO::PARAM_STR);
            if ($statement->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin

    //recueprar id de producto recien creado
    public static function recuperarIdProdCreado($table)
    {
        try {
            $statement = Conexion::conn()->prepare("SELECT 
            idProd
            FROM $table 
            ORDER BY idProd DESC LIMIT 1");
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin

    //crear registro de producto merma en su tabla
    public static function mdlCrearRegProdMerma($table, $dataCreate)
    {
        try {
            $statement = Conexion::conn()->prepare("INSERT INTO $table 
                    ( descripcionProdMerma, fechaProdMerma, totalProdMerma, totalMerma, estadoProdMerma, jsonProdMerma, jsonMerma, DateCreate) 
                    VALUES 
                    (:descripcionProdMerma, :fechaProdMerma, :totalProdMerma, :totalMerma, :estadoProdMerma, :jsonProdMerma, :jsonMerma, :DateCreate)");
            $statement->bindParam(":descripcionProdMerma", $dataCreate['descripcionProdMerma'], PDO::PARAM_STR);
            $statement->bindParam(":fechaProdMerma", $dataCreate['fechaProdMerma'], PDO::PARAM_STR);
            $statement->bindParam(":totalProdMerma", $dataCreate['totalProdMerma'], PDO::PARAM_STR);
            $statement->bindParam(":totalMerma", $dataCreate['totalMerma'], PDO::PARAM_STR);
            $statement->bindParam(":estadoProdMerma", $dataCreate['estadoProdMerma'], PDO::PARAM_STR);
            $statement->bindParam(":jsonProdMerma", $dataCreate['jsonProdMerma'], PDO::PARAM_STR);
            $statement->bindParam(":jsonMerma", $dataCreate['jsonMerma'], PDO::PARAM_STR);
            $statement->bindParam(":DateCreate", $dataCreate['DateCreate'], PDO::PARAM_STR);
            if ($statement->execute()) {
                return "ok";
            } else {
                return "error";
            }
        } catch (Exception $e) {
            return "error";
        }
    }
    //fin

    //actualizar estado de la merma si toda la merma esta utilizada //
    public static function mdlAcualizarEstadoMermaSitodaLaMermaEstaUtlizada($table, $dataUpdate)
    {
        try {
            $statement = Conexion::conn()->prepare("UPDATE $table SET 
               estadoMerma = :estadoMerma
               WHERE idMerma = :idMerma ");
            $statement->bindParam(":idMerma", $dataUpdate['idMerma'], PDO::PARAM_INT);
            $statement->bindParam(":estadoMerma", $dataUpdate['estadoMerma'], PDO::PARAM_STR);
            if ($statement->execute()) {
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