<?php
date_default_timezone_set('America/Bogota');

class CategoriaProductsMprimaController
{
  //  ListarDataTable Categorias de los categoria_mprima
  public static function ctrGetAllCategoriesViewMp()
  {
    $table = "categoria_mprima";
    $response = CategoriaProductsMprimaModel::mdlGetAllCategoriesViewMp($table);
    return $response;
  }

  //  Crear nueva cateoria
  public static function ctrCreateCategoria($crearCateProductoMprima)
  {
    if (empty($crearCateProductoMprima["categoriaNameProdMprima"])) {
      $response = "error";
      return $response;
    }
    $table = "categoria_mprima";
    $dataCreate = array(
      "nombreCategoriaMprima" => $crearCateProductoMprima["categoriaNameProdMprima"],
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = CategoriaProductsMprimaModel::mdlCreateCategoria($table, $dataCreate);
    return $response;
  }

  //  Ver un categoria_mprima específico editar
  public static function ctrViewProductoMprima($codProductoMp)
  {
    $table = "categoria_mprima";
    $response = CategoriaProductsMprimaModel::mdlViewProductoMprima($table, $codProductoMp);
    return $response;
  }
  //  Editar una categoria
  public static function ctrEditCategoriaMprima($editarCategoriaProductosMprima)
  {
    $table = "categoria_mprima";
    $dataUpdate = array(
      "idCatMPrima" => $editarCategoriaProductosMprima["codCatProMp"],
      "nombreCategoriaMprima" => $editarCategoriaProductosMprima["categoriaNameProdEditarMprima"],
      "DateUpdate" => date("Y-m-d\TH:i:sP")
    );
    $response = CategoriaProductsMprimaModel::mdlEditCategoriaMprima($table, $dataUpdate);
    return $response;
  }

  // Eliminar un categoria_mprima
  public static function ctrDeleteCateProductMprima($jsonBorraCateProductoMp)
  {
    $codCatProMp = $jsonBorraCateProductoMp["codCatProMp"];
    $usoCateProdMp = self::ctrCateProductMprimaUso($codCatProMp);
    // Si usoCateProdMp es true, el producto está en uso y no se puede eliminar
    if ($usoCateProdMp === true) {
      $response = "error";
    } else {
      // Si usoCateProdMp es false, el producto no está en uso y se puede proceder a eliminar
      $table = "categoria_mprima";
      $response = CategoriaProductsMprimaModel::mdlDeleteCateProduct($table, $codCatProMp);
    }
    return $response;
  }
  // Verificar si el cateProducto está en Uso
  public static function ctrCateProductMprimaUso($codCatProMp)
  {
    $table = "materia_prima";
    $response = CategoriaProductsMprimaModel::mdlCateProductMprimaUso($table, $codCatProMp);
    return $response;
  }

}
