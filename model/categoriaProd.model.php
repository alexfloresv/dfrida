<?php

require_once "conexion.php";

class CategoriaProductsModel
{
  //  ListarDataTable Categorias de los cateProductos
  public static function mdlGetAllCategoriesView($table)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatPro, nombreCategoriaProd FROM $table ORDER BY idCatPro DESC");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  //Crear una nueva categoria
  public static function mdlCreateCategoria($table, $dataCreate)
  {
    $statement = Conexion::conn()->prepare("INSERT INTO $table (nombreCategoriaProd, DateCreate) VALUES(:nombreCategoriaProd, :DateCreate)");
    $statement->bindParam(":nombreCategoriaProd", $dataCreate["nombreCategoriaProd"], PDO::PARAM_STR);
    $statement->bindParam(":DateCreate", $dataCreate["DateCreate"], PDO::PARAM_STR);

    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }

  // Verificar si el cateProducto está en Uso
  public static function mdlCateProductUso($table, $codCatPro)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatPro FROM $table WHERE idCatPro = :codCatPro");
    $statement->bindParam(":codCatPro", $codCatPro, PDO::PARAM_INT);
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
    $statement = Conexion::conn()->prepare("DELETE  FROM $table WHERE idCatPro = $codCatPro");
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }
  //  Ver un producto específico editar
  public static function mdlViewProducto($table, $codProduct)
  {
    $statement = Conexion::conn()->prepare("SELECT idCatPro, nombreCategoriaProd FROM $table WHERE idCatPro = :idCatPro");
    $statement->bindParam(":idCatPro", $codProduct, PDO::PARAM_INT);
    $statement->execute();
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
 
  //  Editar categoria
  public static function mdlEditCategoria($table, $dataUpdate)
  {
    $statement = Conexion::conn()->prepare("UPDATE $table SET nombreCategoriaProd=:nombreCategoriaProd, DateUpdate=:DateUpdate WHERE idCatPro=:idCatPro");
    $statement->bindParam(":nombreCategoriaProd", $dataUpdate["nombreCategoriaProd"], PDO::PARAM_STR);
    $statement->bindParam(":DateUpdate", $dataUpdate["DateUpdate"], PDO::PARAM_STR);
    $statement->bindParam(":idCatPro", $dataUpdate["idCatPro"], PDO::PARAM_STR);
    if ($statement->execute()) {
      return "ok";
    } else {
      return "error";
    }
  }





}
