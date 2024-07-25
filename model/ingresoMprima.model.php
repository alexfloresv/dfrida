<?php

require_once "conexion.php";

class ingresoMprimaModel
{
  //datatable de ingresos productos prima
  public static function mdlDTableIngProductosPrima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idIngMprima, nombreIngMprima, fechaIngMprima, totalIngMprima FROM $table ORDER BY idIngMprima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //datatable  ingresos en el modal de ingresos productos prima
  public static function mdlVerProductosIngresadosModal($table, $codAllIngMprima)
  {
    $statement = Conexion::conn()->prepare("SELECT ingJsonMprima FROM $table WHERE idIngMprima = :idIngMprima");
    $statement->bindParam(":idIngMprima", $codAllIngMprima, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //verificar datos de productos en almacen prima
  public static function mdlStockAlmacen($table, $codProd)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadMprimaAlma FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // El producto ya existe, se actualiza la cantidad en almacen prima
  public static function mdlSumarProductoAlmacenProd($table, $dataSumarProdAlamacen)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET codigoMprimaAlma = :codigoMprimaAlma, nombreMprimaAlma = :nombreMprimaAlma, unidadMprimaAlma = :unidadMprimaAlma, cantidadMprimaAlma = :cantidadMprimaAlma, DateUpdate = :DateUpdate  WHERE idMprima = :idMprima");
    $statement->bindParam(":codigoMprimaAlma", $dataSumarProdAlamacen["codigoMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":nombreMprimaAlma", $dataSumarProdAlamacen["nombreMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":unidadMprimaAlma", $dataSumarProdAlamacen["unidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":cantidadMprimaAlma", $dataSumarProdAlamacen["cantidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":idMprima", $dataSumarProdAlamacen["idMprima"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataSumarProdAlamacen["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }
  
  //ingreso de productos a almacen prima
  public static function mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idMprima, codigoMprimaAlma, nombreMprimaAlma, unidadMprimaAlma, cantidadMprimaAlma, precioMprimaAlma, DateCreate) VALUES (:idMprima, :codigoMprimaAlma, :nombreMprimaAlma, :unidadMprimaAlma, :cantidadMprimaAlma, :precioMprimaAlma, :DateCreate)");
    $statement->bindParam(":idMprima", $dataIngAlamacen["idMprima"], PDO::PARAM_INT);
    $statement->bindParam(":codigoMprimaAlma", $dataIngAlamacen["codigoMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":nombreMprimaAlma", $dataIngAlamacen["nombreMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":unidadMprimaAlma", $dataIngAlamacen["unidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":cantidadMprimaAlma", $dataIngAlamacen["cantidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":precioMprimaAlma", $dataIngAlamacen["precioMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataIngAlamacen["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //crear el registro de ingreso de productos prima
  public static function mdlCrearIngresoProd($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreIngMprima, fechaIngMprima, igvIngMprima, subTotalIngMprima, totalIngMprima, ingJsonMprima, DateCreate) VALUES(:nombreIngMprima, :fechaIngMprima, :igvIngMprima, :subTotalIngMprima, :totalIngMprima, :ingJsonMprima, :DateCreate)");
    $statement->bindParam(":nombreIngMprima", $dataCreate["nombreIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":fechaIngMprima", $dataCreate["fechaIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":igvIngMprima", $dataCreate["igvIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalIngMprima", $dataCreate["subTotalIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":totalIngMprima", $dataCreate["totalIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":ingJsonMprima", $dataCreate["ingJsonMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //visualizar datos para editar ingreso productos prima
  public static function mdlVerDataFichaTrabajo($table, $codIdIngProd)
  {
    $statement = Conexion::conn()->prepare("SELECT
     idIngMprima,
     nombreIngMprima,
     fechaIngMprima, 
     igvIngMprima,
     subTotalIngMprima,
     totalIngMprima,
     ingJsonMprima
     FROM $table WHERE idIngMprima = :idIngMprima");
    $statement->bindParam(":idIngMprima", $codIdIngProd, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  //obtener precio para editar ingreso productos prima
  public static function mdlPrecioProdEdit($table, $codIngProd)
  {
    $statement = Conexion::conn()->prepare("SELECT precioMprima FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codIngProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //editar registro ingreso de productos prima
  public static function mdlEditarIngresoProd($table, $dataEdit)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreIngMprima = :nombreIngMprima, fechaIngMprima = :fechaIngMprima, igvIngMprima = :igvIngMprima, subTotalIngMprima = :subTotalIngMprima, totalIngMprima = :totalIngMprima, ingJsonMprima = :ingJsonMprima, DateUpdate = :DateUpdate WHERE idIngMprima = :idIngMprima");
    $statement->bindParam(":nombreIngMprima", $dataEdit["nombreIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":fechaIngMprima", $dataEdit["fechaIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":igvIngMprima", $dataEdit["igvIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalIngMprima", $dataEdit["subTotalIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":totalIngMprima", $dataEdit["totalIngMprima"], PDO::PARAM_STR);
    $statement->bindParam(":ingJsonMprima", $dataEdit["ingJsonMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataEdit["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idIngMprima", $dataEdit["idIngMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }


  //eliminar productos ingresados**

  //obtener el registro de productos ingresados prima
  public static function mdlRecuperarProductosIngresados($table, $codIngProd)
  {
    $statement = Conexion::conn()->prepare("SELECT ingJsonMprima FROM $table WHERE idIngMprima = :idIngMprima");
    $statement->bindParam(":idIngMprima", $codIngProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //actualizar productos en almacen prima
  public static function mdlActualizarProductosIngresados($table, $dataUpdateProdAlmacen)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET cantidadMprimaAlma = :cantidadMprimaAlma, DateUpdate = :DateUpdate WHERE idMprima = :idMprima");
    $statement->bindParam(":cantidadMprimaAlma", $dataUpdateProdAlmacen["cantidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdateProdAlmacen["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idMprima", $dataUpdateProdAlmacen["idMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //  Borrar ingreso productos prima
  public static function mdlBorrarRegistroIngresProducto($table, $codIngProd)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idIngMprima = $codIngProd");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //fin eliminar productos ingresados**

  //Agregar Producto prima al ingreso
  public static function mdlAgregarIngProducto($table, $codIngProducto)
  {
    $statement = Conexion::conn()->prepare("SELECT idMprima, nombreMprima, codigoMprima, unidadMprima,precioMprima FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codIngProducto, PDO::PARAM_INT);
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
