<?php

require_once "conexion.php";
/* vercel */
class CategoriaProductsMprimaModel
{
  //  ListarDataTable Categorias de los cateProductos
  public static function mdlGetAllCategoriesViewMp($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatMPrima, nombreCategoriaMprima FROM $table ORDER BY idCatMPrima DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //Crear una nueva categoria
  public static function mdlCreateCategoria($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreCategoriaMprima, DateCreate) VALUES(:nombreCategoriaMprima, :DateCreate)");
    $statement->bindParam(":nombreCategoriaMprima", $dataCreate["nombreCategoriaMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }


  //  Ver un producto específico editar
  public static function mdlViewProductoMprima($table, $codProductoMp)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatMPrima, nombreCategoriaMprima FROM $table WHERE idCatMPrima = :idCatMPrima");
    $statement->bindParam(":idCatMPrima", $codProductoMp, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  //  Editar categoria
  public static function mdlEditCategoriaMprima($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreCategoriaMprima=:nombreCategoriaMprima, DateUpdate=:DateUpdate WHERE idCatMPrima=:idCatMPrima");
    $statement->bindParam(":nombreCategoriaMprima", $dataUpdate["nombreCategoriaMprima"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idCatMPrima", $dataUpdate["idCatMPrima"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  // Verificar si el cateProducto está en Uso
  public static function mdlCateProductMprimaUso($table, $codCatProMp)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatMPrima FROM $table WHERE idCatMPrima = :codCatProMp");
    $statement->bindParam(":codCatProMp", $codCatProMp, PDO::PARAM_INT);
    $statement->execute();
    // Verificar si hay resultados
    if ($statement->rowCount() > 0) {
      // Si hay al menos una fila, el valor buscado existe
      return true;
    } else {
      // Si no hay filas, el valor buscado no existe
      return false;
    }
  }

  //  Borrar un producto específico
  public static function mdlDeleteCateProduct($table, $codCatPro)
  {
    $statement = Conexion::conn()->prepare("DELETE  FROM $table WHERE idCatMPrima = $codCatPro");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }



}
