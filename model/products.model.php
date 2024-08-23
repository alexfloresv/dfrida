<?php

require_once "conexion.php";

class ProductsModel
{
  // Mostrar todos los productos

  public static function mdlDTableProductos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT producto.idProd, producto.idCatPro, producto.codigoProd, producto.nombreProd, producto.detalleProd, producto.unidadProd, producto.precioProd, categoria_prod.nombreCategoriaProd FROM $table LEFT JOIN categoria_prod ON producto.idCatPro = categoria_prod.idCatPro ORDER BY producto.idProd DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  // Mostrar todas las categorías de productos
  public static function mdlGetAllCategories($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatPro, nombreCategoriaProd FROM $table ORDER BY idCatPro DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  // Crear nuevo producto
  public static function CrearProducto($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (idCatPro, nombreProd, codigoProd, detalleProd, unidadProd, precioProd, DateCreate) VALUES(:idCatPro, :nombreProd, :codigoProd, :detalleProd, :unidadProd, :precioProd, :DateCreate)");
    $statement->bindParam(":idCatPro", $dataCreate["idCatPro"], PDO::PARAM_INT);
    $statement->bindParam(":nombreProd", $dataCreate["nombreProd"], PDO::PARAM_STR);
    $statement->bindParam(":codigoProd", $dataCreate["codigoProd"], PDO::PARAM_STR);
    $statement->bindParam(":detalleProd", $dataCreate["detalleProd"], PDO::PARAM_STR);
    $statement->bindParam(":unidadProd", $dataCreate["unidadProd"], PDO::PARAM_STR);
    $statement->bindParam(":precioProd", $dataCreate["precioProd"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  //verificar si el nombre de ProductosMprima existe
  public static function mdlExistenciaDeProductoNombre($table, $productName)
  {
    $statement = Conexion::conn()->prepare("SELECT nombreProd FROM $table WHERE nombreProd = :nombreProd");
    $statement->bindParam(":nombreProd", $productName, PDO::PARAM_STR);
    $statement->execute();
    $resultado = $statement->fetch(PDO::FETCH_ASSOC);
    return $resultado ? true : false;
  }
  //verificar si el codigo de ProductosMprima existe
  public static function mdlExistenciaDeCodigoProducto($table, $productCodigo)
  {
    $statement = Conexion::conn()->prepare("SELECT codigoProd FROM $table WHERE codigoProd = :codigoProd");
    $statement->bindParam(":codigoProd", $productCodigo, PDO::PARAM_STR);
    $statement->execute();
    $resultado = $statement->fetch(PDO::FETCH_ASSOC);
    return $resultado ? true : false;
  }

  //  visualizar datos Producto
  public static function mdlViewProducto($table, $codProduct)
  {
    $statement = Conexion::conn()->prepare("SELECT producto.idProd, producto.idCatPro, producto.codigoProd, producto.nombreProd, producto.detalleProd, producto.unidadProd, producto.precioProd, categoria_prod.nombreCategoriaProd FROM $table INNER JOIN categoria_prod ON producto.idCatPro = categoria_prod.idCatPro WHERE producto.idProd = :idProd");
    $statement->bindParam(":idProd", $codProduct, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
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

  // Mostrar todas las categorías de productos modal
  public static function mdlGetAllCategoriesView($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatPro, nombreCategoriaProd FROM $table ORDER BY idCatPro DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

  //verificar si el producto esta en alamacen
  public static function mdlAlamacenProductStock($table, $codProduct)
  {
    $statement = Conexion::conn()->prepare("SELECT cantidadProd FROM $table WHERE idProd = $codProduct");
    return $statement->fetch();
  }

  //  Borrar un producto específico
  public static function mdlDeleteProduct($table, $codProduct)
  {
    $statement = Conexion::conn()->prepare("DELETE FROM $table WHERE idProd = $codProduct");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  // Obtener productos de una cotización para la vista pedidos
  public static function mdlMostrarDatosProductosCotizacionPedido($table, $codPed, $idCoti){
    $statement = Conexion::conn()->prepare("SELECT cotizacion.productsCoti FROM $table INNER JOIN pedido ON cotizacion.idCoti = pedido.idCoti WHERE cotizacion.idCoti = :idCoti AND pedido.idPedido = :codPed");
    $statement->bindParam(":idCoti", $idCoti, PDO::PARAM_INT);
    $statement->bindParam(":codPed", $codPed, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  // Obtener codigo del producto por idProducto
  public static function mdlObtenerCodigoProducto($table, $idProduct){
    $statement = Conexion::conn()->prepare("SELECT codigoProd FROM $table WHERE idProd = :idProd");
    $statement->bindParam(":idProd", $idProduct, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

}
