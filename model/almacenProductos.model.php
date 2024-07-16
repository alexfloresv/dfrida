<?php

require_once "conexion.php";

class almacenProductosModel
{
  //datatable de ingresos productos
  public static function mdlDTableAlmacenProductos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idAlmaProd, idProd, codigoProdAlma, nombreProdAlma, unidadProdAlma, cantidadProdAlma, precioProdAlma FROM $table ORDER BY idAlmaProd DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //datatable  ingresos en el modal de ingresos productos
  public static function mdlVerProductosIngresadosModal($table, $codAllIngProd)
  {
    $statement = Conexion::conn()->prepare("SELECT ingJsonProd FROM $table WHERE idIngProd = :idIngProd");
    $statement->bindParam(":idIngProd", $codAllIngProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //verificar datos de productos en almacen
  public static function mdlStockAlmacen($table, $codProd)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadProdAlma FROM $table WHERE idProd = :idProd");
    $statement->bindParam(":idProd", $codProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // El producto ya existe, se actualiza la cantidad
  public static function mdlSumarProductoAlmacenProd($table, $dataSumarProdAlamacen)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET cantidadProdAlma = :cantidadProdAlma, DateUpdate = :DateUpdate  WHERE idProd = :idProd");
    $statement->bindParam(":DateUpdate", $dataSumarProdAlamacen["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":cantidadProdAlma", $dataSumarProdAlamacen["cantidadProdAlma"], PDO::PARAM_STR);
    $statement->bindParam(":idProd", $dataSumarProdAlamacen["idProd"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  //ingreso de productos a almacen
  public static function mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idProd, codigoProdAlma, nombreProdAlma, unidadProdAlma, cantidadProdAlma, precioProdAlma, DateCreate) VALUES (:idProd, :codigoProdAlma, :nombreProdAlma, :unidadProdAlma, :cantidadProdAlma, :precioProdAlma, :DateCreate)");
    $statement->bindParam(":idProd", $dataIngAlamacen["idProd"], PDO::PARAM_INT);
    $statement->bindParam(":codigoProdAlma", $dataIngAlamacen["codigoProdAlma"], PDO::PARAM_STR);
    $statement->bindParam(":nombreProdAlma", $dataIngAlamacen["nombreProdAlma"], PDO::PARAM_STR);
    $statement->bindParam(":unidadProdAlma", $dataIngAlamacen["unidadProdAlma"], PDO::PARAM_INT);
    $statement->bindParam(":cantidadProdAlma", $dataIngAlamacen["cantidadProdAlma"], PDO::PARAM_INT);
    $statement->bindParam(":precioProdAlma", $dataIngAlamacen["precioProdAlma"], PDO::PARAM_INT);
    $statement->bindParam(":DateCreate", $dataIngAlamacen["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //crear el registro de ingreso de productos
  public static function mdlCrearIngresoProd($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreIngProd, fechaIngProd, igvIngProd, subTotalIngProd, totalIngProd, ingJsonProd, DateCreate) VALUES(:nombreIngProd, :fechaIngProd, :igvIngProd, :subTotalIngProd, :totalIngProd, :ingJsonProd, :DateCreate)");
    $statement->bindParam(":nombreIngProd", $dataCreate["nombreIngProd"], PDO::PARAM_STR);
    $statement->bindParam(":fechaIngProd", $dataCreate["fechaIngProd"], PDO::PARAM_STR);
    $statement->bindParam(":igvIngProd", $dataCreate["igvIngProd"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalIngProd", $dataCreate["subTotalIngProd"], PDO::PARAM_STR);
    $statement->bindParam(":totalIngProd", $dataCreate["totalIngProd"], PDO::PARAM_STR);
    $statement->bindParam(":ingJsonProd", $dataCreate["ingJsonProd"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  // Editar un producto específico
  public static function mdlEditProduct($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET idCatPro=:idCatPro, nombreProd=:nombreProd, codigoProd=:codigoProd, detalleProd=:detalleProd, unidadProd=:unidadProd, precioProd=:precioProd, DateUpdate=:DateUpdate WHERE idProd=:idProd");
    $statement->bindParam(":idCatPro", $dataUpdate["idCatPro"], PDO::PARAM_INT);
    $statement->bindParam(":nombreProd", $dataUpdate["nombreProd"], PDO::PARAM_STR);
    $statement->bindParam(":codigoProd", $dataUpdate["codigoProd"], PDO::PARAM_STR);
    $statement->bindParam(":detalleProd", $dataUpdate["detalleProd"], PDO::PARAM_STR);
    $statement->bindParam(":unidadProd", $dataUpdate["unidadProd"], PDO::PARAM_STR);
    $statement->bindParam(":precioProd", $dataUpdate["precioProd"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idProd", $dataUpdate["idProd"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //  Borrar cotizacion
  public static function mdlDeleteCotizacion($table, $codCoti)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idCoti = $codCoti");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //Agregar Producto al ingreso
  public static function mdlAgregarIngProducto($table, $codIngProducto)
  {
    $statement = Conexion::conn()->prepare("SELECT idProd, nombreProd, codigoProd, unidadProd,precioProd FROM $table WHERE idProd = :idProd");
    $statement->bindParam(":idProd", $codIngProducto, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //Agregar Producto Mprima a la cotizacion
  public static function AgregarProductoMprimaCoti($table, $codProductoMprimaCoti)
  {
    $statement = Conexion::conn()->prepare("SELECT idMprima, nombreMprima, unidadMprima, precioMprima FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codProductoMprimaCoti, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //  Descargar PDF de la cotizacion
  public static function mdlDescargarPdfCotizacion($table, $codCoti)
  {
    $statement = Conexion::conn()->prepare("SELECT 
    tituloCoti, 
    fechaCoti, 
    razonSocialCoti, 
    nombreComercialCoti, 
    rucCoti, 
    nombreCoti, 
    celularCoti, 
    correoCoti, 
    direccionCoti, 
    detalleCoti, 
    productsCoti, 
    productsMprimaCoti, 
    totalProductsCoti, 
    totalProductsMprimaCoti, 
    igvCoti, 
    subTotalCoti, 
    totalCoti 
    FROM $table WHERE idCoti = :idCoti");
    $statement->bindParam(":idCoti", $codCoti, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //cambiar estao de la cotizacion al descargar
  public static function mdlEstadoDescargaPdfCotizacion($table, $codCoti)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET estadoCoti = '2' WHERE idCoti = :idCoti");
    $statement->bindParam(":idCoti", $codCoti, PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
}
