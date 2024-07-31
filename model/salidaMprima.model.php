<?php

require_once "conexion.php";

class salidaMprimaModel
{
  //datatable de ingresos productos prima
  public static function mdlmdlDTableSalProdcuctos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idSalMprima, idProcOp, nombreSalMprima, fechaSalMprima, totalSalMprima FROM $table ORDER BY idSalMprima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  // //data table modal salidas almacen prima
  public static function mdlDTableSalProdcuctosAlmacen($table)
  {
    $statement = Conexion::conn()->prepare("
          SELECT 
              a.idMprima, 
              a.nombreMprimaAlma, 
              a.codigoMprimaAlma, 
              a.precioMprimaAlma, 
              a.cantidadMprimaAlma, 
              p.precioMprima 
          FROM 
              $table a
          INNER JOIN 
              materia_prima p ON a.idMprima = p.idMprima
          WHERE 
              a.cantidadMprimaAlma > 0 
          ORDER BY 
              a.idAlmaMprima DESC
      ");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //datatable  ingresos en el modal de ingresos productos prima
  public static function mdlVerProductosSalidaModal($table, $codAllSalMprima)
  {
    $statement = Conexion::conn()->prepare("SELECT salJsonMprima FROM $table WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idSalMprima", $codAllSalMprima, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //verificar datos de productos en almacen prima
  public static function mdlStockAlmacen($table, $codProd)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadMprimaAlma FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codProd, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if ($result && $result['cantidadMprimaAlma'] > 0) {
      return $result;
    } else {
      return false;
    }
  }

  // El producto ya existe, se actualiza la cantidad
  public static function mdlRestarProductoAlmacenProd($table, $dataRestarProdAlamacen)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET  cantidadMprimaAlma = :cantidadMprimaAlma, DateUpdate = :DateUpdate  WHERE idMprima = :idMprima");
    $statement->bindParam(":cantidadMprimaAlma", $dataRestarProdAlamacen["cantidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":idMprima", $dataRestarProdAlamacen["idMprima"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $dataRestarProdAlamacen["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //ingreso de productos a almacen si ubo error al restar prima
  public static function mdlRestaurarProductosAlmacenProd($table, $operacion)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET  cantidadMprimaAlma = :cantidadMprimaAlma, DateUpdate = :DateUpdate  WHERE idMprima = :idMprima");
    $statement->bindParam(":cantidadMprimaAlma", $operacion["cantidadMprimaAlma"], PDO::PARAM_STR);
    $statement->bindParam(":idMprima", $operacion["idMprima"], PDO::PARAM_INT);
    $statement->bindParam(":DateUpdate", $operacion["DateUpdate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return true;
    } else {
      return false;
    }
  }

  //crear el registro de ingreso de productos prima
  public static function mdlCrearSalidaProd($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreSalMprima, idProcOp, fechaSalMprima, igvSalMprima, subTotalSalMprima, totalSalMprima, salJsonMprima, DateCreate) VALUES(:nombreSalMprima, :idProcOp, :fechaSalMprima, :igvSalMprima, :subTotalSalMprima, :totalSalMprima, :salJsonMprima, :DateCreate)");
    $statement->bindParam(":nombreSalMprima", $dataCreate["nombreSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataCreate["idProcOp"], PDO::PARAM_INT);
    $statement->bindParam(":fechaSalMprima", $dataCreate["fechaSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":igvSalMprima", $dataCreate["igvSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalSalMprima", $dataCreate["subTotalSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":totalSalMprima", $dataCreate["totalSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":salJsonMprima", $dataCreate["salJsonMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //visualizar datos para editar salida productos prima
  public static function mdlVerDataSalidaRegistro($table, $codIdSalProd)
  {
    $statement = Conexion::conn()->prepare("SELECT
          s.idSalMprima,
          s.nombreSalMprima,
          s.idProcOp,
          p.nombreProcOp,  -- Campo de la tabla proceso_operativo
          s.fechaSalMprima,
          s.igvSalMprima,
          s.subTotalSalMprima,
          s.totalSalMprima,
          s.salJsonMprima
          FROM $table s
          LEFT JOIN proceso_operativo p ON s.idProcOp = p.idProcOp
          WHERE s.idSalMprima = :idSalMprima");
    $statement->bindParam(":idSalMprima", $codIdSalProd, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  //obtener stock de almacen para visualizar datos para editar salidas productos pima
  public static function mdlStockAlmacenEdit($table, $codIngProd)
  {
    $statement = Conexion::conn()->prepare("
          SELECT 
              a.cantidadMprimaAlma, 
              p.precioMprima 
          FROM 
              $table a
          INNER JOIN 
              materia_prima p ON a.idMprima = p.idMprima
          WHERE 
              a.idMprima = :idMprima
      ");
    $statement->bindParam(":idMprima", $codIngProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  //editar registro salida de productos prima
  public static function mdlEditarSalidaProd($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreSalMprima = :nombreSalMprima, idProcOp = :idProcOp, fechaSalMprima = :fechaSalMprima, igvSalMprima = :igvSalMprima, subTotalSalMprima = :subTotalSalMprima, totalSalMprima = :totalSalMprima, salJsonMprima = :salJsonMprima, DateUpdate = :DateUpdate WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":nombreSalMprima", $dataUpdate["nombreSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":idProcOp", $dataUpdate["idProcOp"], PDO::PARAM_STR);
    $statement->bindParam(":fechaSalMprima", $dataUpdate["fechaSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":igvSalMprima", $dataUpdate["igvSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":subTotalSalMprima", $dataUpdate["subTotalSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":totalSalMprima", $dataUpdate["totalSalMprima"], PDO::PARAM_STR);
    $statement->bindParam(":salJsonMprima", $dataUpdate["salJsonMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idSalMprima", $dataUpdate["idSalMprima"], PDO::PARAM_INT);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }


  //eliminar productos salida prima**

  //obtener el registro de productos salida prima
  public static function mdlRecuperarProductosRegSalida($table, $codSalProd)
  {
    $statement = Conexion::conn()->prepare("SELECT salJsonMprima FROM $table WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idSalMprima", $codSalProd, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //verificar si la salida esta asignada a un proceso operativo
  public static function mdlVerificarSalidaProcOp($table, $codSalMprima)
  {
    $statement = Conexion::conn()->prepare("SELECT idSalMprima FROM $table WHERE idSalMprima = :idSalMprima");
    $statement->bindParam(":idSalMprima", $codSalMprima, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if ($result) {
      return true; // El idSalMprima existe en la tabla
    } else {
      return false; // El idSalMprima no existe en la tabla
    }
  }

  //verificar datos de productos en almacen prima
  public static function mdlStockAlmacenSalida($table, $codProd)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadMprimaAlma FROM $table WHERE idMprima = :idMprima");
    $statement->bindParam(":idMprima", $codProd, PDO::PARAM_INT);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    return $result;
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

  //borrar salida productos pirma
  public static function mdlBorrarRegistroIngresProducto($table, $codSalProd)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idSalMprima = $codSalProd");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //fin eliminar productos ingresados**

  //Agregar Producto de almacen ala salida prima
  public static function mdlAgregarSalProducto($table, $codSalProducto)
  {
    $statement = Conexion::conn()->prepare("
          SELECT 
              a.idMprima, 
              a.nombreMprimaAlma, 
              a.codigoMprimaAlma, 
              a.unidadMprimaAlma, 
              a.precioMprimaAlma, 
              a.cantidadMprimaAlma, 
              p.precioMprima 
          FROM 
              $table a
          INNER JOIN 
              materia_prima p ON a.idMprima = p.idMprima
          WHERE 
              a.idMprima = :idMprima
      ");
    $statement->bindParam(":idMprima", $codSalProducto, PDO::PARAM_INT);
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
  public static function mdlObtenerDatosSalidaProductosMPrimaporFecha($table, $fechaInicioSalidaMPrima, $fechaFinSalidaMPrima)
  {
    $statement = Conexion::conn()->prepare("SELECT
	salida_mprima.idSalMprima, 
	salida_mprima.idProcOp, 
	salida_mprima.nombreSalMprima, 
	salida_mprima.fechaSalMprima, 
	salida_mprima.igvSalMprima, 
	salida_mprima.subTotalSalMprima, 
	salida_mprima.totalSalMprima, 
	salida_mprima.salJsonMprima
FROM
	salida_mprima
	WHERE
    salida_mprima.fechaSalMprima BETWEEN :fechaInicioSalidaMPrima AND :fechaFinSalidaMPrima ");
    $statement->bindParam(":fechaInicioSalidaMPrima", $fechaInicioSalidaMPrima, PDO::PARAM_STR);
    $statement->bindParam(":fechaFinSalidaMPrima", $fechaFinSalidaMPrima, PDO::PARAM_STR);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de selecionar proceso Operativo
  public static function mdSelect2SalMprima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp, nombreProcOp FROM $table WHERE idSalMprima IS NULL OR idSalMprima = 0 ORDER BY idProcOp DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //funcion para mostrar el selec2 de selecionar proceso Operativo
  public static function mdSelect2SalMprimaEdit($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idProcOp, nombreProcOp FROM $table ORDER BY idProcOp DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
}
