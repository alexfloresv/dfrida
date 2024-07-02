<?php

require_once "conexion.php";

class ProductMprimaModel
{
  // Mostrar todos los almacen_prod

  public static function mdlDTableProductosMprima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT materia_prima.idMprima, materia_prima.idCatMprima, materia_prima.codigoMprima, materia_prima.nombreMprima, materia_prima.detalleMprima, materia_prima.unidadMprima, materia_prima.precioMprima, categoria_mprima.nombreCategoriaMprima FROM $table INNER JOIN categoria_mprima ON materia_prima.idCatMprima = categoria_mprima.idCatMprima ORDER BY materia_prima.idMprima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  // Mostrar todas las categoria_mprima de productos
  public static function mdlGetAllCategoriesMprima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatMPrima, nombreCategoriaMprima FROM $table ORDER BY idCatMPrima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //verificar si el nombre de ProductosMprima existe
  public static function mdlExistenciaDeProductoMateriaPrima($table, $nombreMprima)
  {
    $statement = Conexion::conn()->prepare("SELECT nombreMprima FROM $table WHERE nombreMprima = :nombreMprima");
    $statement->bindParam(":nombreMprima", $nombreMprima, PDO::PARAM_STR);
    $statement->execute();
    $resultado = $statement->fetch(PDO::FETCH_ASSOC);
    return $resultado ? true : false;
  }
  //verificar si el codigo de ProductosMprima existe
  public static function mdlExistenciaDeCodigoProductoMateriaPrima($table, $productCodigoMp)
  {
    $statement = Conexion::conn()->prepare("SELECT codigoMprima FROM $table WHERE codigoMprima = :codigoMprima");
    $statement->bindParam(":codigoMprima", $productCodigoMp, PDO::PARAM_STR);
    $statement->execute();
    $resultado = $statement->fetch(PDO::FETCH_ASSOC);
    return $resultado ? true : false;
  }

  // Crear nuevo producto
  public static function CrearProductoMprima($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idCatMPrima, nombreMprima, codigoMprima, detalleMprima, unidadMprima, precioMprima, DateCreate) VALUES(:idCatMPrima, :nombreMprima, :codigoMprima, :detalleMprima, :unidadMprima, :precioMprima, :DateCreate)");
    $statement->bindParam(":idCatMPrima", $dataCreate["idCatMPrima"], PDO::PARAM_INT);
    $statement->bindParam(":nombreMprima", $dataCreate["nombreMprima"], PDO::PARAM_STR);
    $statement->bindParam(":codigoMprima", $dataCreate["codigoMprima"], PDO::PARAM_STR);
    $statement->bindParam(":detalleMprima", $dataCreate["detalleMprima"], PDO::PARAM_STR);
    $statement->bindParam(":unidadMprima", $dataCreate["unidadMprima"], PDO::PARAM_STR);
    $statement->bindParam(":precioMprima", $dataCreate["precioMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //  visualizar datos materia_prima
  public static function mdlViewProductoMprima($table, $codProductMprima)
  {
    $statement = Conexion::conn()->prepare("SELECT materia_prima.idMprima, materia_prima.idCatMprima, materia_prima.codigoMprima, materia_prima.nombreMprima, materia_prima.detalleMprima, materia_prima.unidadMprima, materia_prima.precioMprima, categoria_mprima.nombreCategoriaMprima FROM $table INNER JOIN categoria_mprima ON materia_prima.idCatMprima = categoria_mprima.idCatMprima WHERE materia_prima.idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codProductMprima, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  // Editar un ProductosMprima específico
  public static function mdlEditProductMprima($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idCatMprima=:idCatMprima, nombreMprima=:nombreMprima, codigoMprima=:codigoMprima, detalleMprima=:detalleMprima, unidadMprima=:unidadMprima, precioMprima=:precioMprima, DateUpdate=:DateUpdate WHERE idMprima=:idMprima");
    $statement->bindParam(":idCatMprima", $dataUpdate["idCatMprima"], PDO::PARAM_INT);
    $statement->bindParam(":nombreMprima", $dataUpdate["nombreMprima"], PDO::PARAM_STR);
    $statement->bindParam(":codigoMprima", $dataUpdate["codigoMprima"], PDO::PARAM_STR);
    $statement->bindParam(":detalleMprima", $dataUpdate["detalleMprima"], PDO::PARAM_STR);
    $statement->bindParam(":unidadMprima", $dataUpdate["unidadMprima"], PDO::PARAM_STR);
    $statement->bindParam(":precioMprima", $dataUpdate["precioMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idMprima", $dataUpdate["idMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //verificar si el producto Prima esta en alamacen
  public static function mdlAlmacenMpProductStock($table, $codProductMp)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadMprima FROM $table WHERE idMprima = $codProductMp");
    return $statement->fetch();
  }

  //  Borrar un producto específico
  public static function mdlDeleteProductMprima($table, $codProductMp)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idMprima = $codProductMp");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

}
