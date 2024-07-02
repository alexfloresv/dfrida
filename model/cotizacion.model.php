<?php

require_once "conexion.php";

class CotizacionModel
{
  // Mostrar todas las cotizaciones
  public static function mdlDTableCotizaciones($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCoti, tituloCoti, nombreComercialCoti, fechaCoti, nombreCoti, celularCoti, totalCoti, estadoCoti FROM $table ORDER BY idCoti DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  // Crear nueva cotizacion
  public static function mdlCrearCrearCotizacion($table, $dataCotizacion)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (tituloCoti, fechaCoti, razonSocialCoti, nombreComercialCoti, rucCoti, nombreCoti, celularCoti, correoCoti, direccionCoti, detalleCoti, productsCoti, productsMprimaCoti, totalProductsCoti, totalProductsMprimaCoti, igvCoti, subTotalCoti, totalCoti, estadoCoti, DateCreate) VALUES(:tituloCoti, :fechaCoti, :razonSocialCoti, :nombreComercialCoti, :rucCoti, :nombreCoti, :celularCoti, :correoCoti, :direccionCoti, :detalleCoti, :productsCoti, :productsMprimaCoti, :totalProductsCoti, :totalProductsMprimaCoti, :igvCoti, :subTotalCoti, :totalCoti, :estadoCoti, :DateCreate)");

    $statement->bindParam(":tituloCoti", $dataCotizacion["tituloCoti"], PDO::PARAM_STR);
    $statement->bindParam(":fechaCoti", $dataCotizacion["fechaCoti"], PDO::PARAM_STR);
    $statement->bindParam(":razonSocialCoti", $dataCotizacion["razonSocialCoti"], PDO::PARAM_STR);
    $statement->bindParam(":nombreComercialCoti", $dataCotizacion["nombreComercialCoti"], PDO::PARAM_STR);
    $statement->bindParam(":rucCoti", $dataCotizacion["rucCoti"], PDO::PARAM_STR);
    $statement->bindParam(":nombreCoti", $dataCotizacion["nombreCoti"], PDO::PARAM_STR);
    $statement->bindParam(":celularCoti", $dataCotizacion["celularCoti"], PDO::PARAM_STR);
    $statement->bindParam(":correoCoti", $dataCotizacion["correoCoti"], PDO::PARAM_STR);
    $statement->bindParam(":direccionCoti", $dataCotizacion["direccionCoti"], PDO::PARAM_STR);
    $statement->bindParam(":detalleCoti", $dataCotizacion["detalleCoti"], PDO::PARAM_STR);
    $statement->bindParam(":productsCoti", $dataCotizacion["productsCoti"], PDO::PARAM_STR);
    $statement->bindParam(":productsMprimaCoti", $dataCotizacion["productsMprimaCoti"], PDO::PARAM_STR);
    $statement->bindParam(":totalProductsCoti", $dataCotizacion["totalProductsCoti"], PDO::PARAM_STR);
    $statement->bindParam(":totalProductsMprimaCoti", $dataCotizacion["totalProductsMprimaCoti"], PDO::PARAM_STR);
    $statement->bindParam(":igvCoti", $dataCotizacion["igvCoti"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalCoti", $dataCotizacion["subTotalCoti"], PDO::PARAM_STR);
    $statement->bindParam(":totalCoti", $dataCotizacion["totalCoti"], PDO::PARAM_STR);
    $statement->bindParam(":estadoCoti", $dataCotizacion["estadoCoti"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCotizacion["DateCreate"], PDO::PARAM_STR);

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
  //Agregar Producto a la cotizacion
  public static function AgregarProductoCoti($table, $codProductoCoti)
  {
    $statement = Conexion::conn()->prepare("SELECT idProd, nombreProd, unidadProd,precioProd FROM $table WHERE idProd = :idProd");
    $statement->bindParam(":idProd", $codProductoCoti, PDO::PARAM_INT);
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

}
