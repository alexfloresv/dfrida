<?php
date_default_timezone_set('America/Bogota');

class CategoriaProductsController
{
  //  ListarDataTable Categorias de los cateProductos
  public static function ctrGetAllCategoriesView()
  {
    $table = "categoria_prod";
    $response = CategoriaProductsModel::mdlGetAllCategoriesView($table);
    return $response;
  }

  //  Crear nueva cateoria
  public static function ctrCreateCategoria($crearCateProducto)
  {
    if (empty($crearCateProducto["categoriaNameProd"])) {
      $response = "error";
      return $response;
    }
    $table = "categoria_prod";
    $dataCreate = array(
      "nombreCategoriaProd" => $crearCateProducto["categoriaNameProd"],
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = CategoriaProductsModel::mdlCreateCategoria($table, $dataCreate);
    return $response;
  }

  //  Ver un producto específico editar
  public static function ctrViewProducto($codProduct)
  {
    $table = "categoria_prod";
    $response = CategoriaProductsModel::mdlViewProducto($table, $codProduct);
    return $response;
  }
  //  Editar una categoria
  public static function ctrEditCategoria($editarCategoriaProductos)
  {
    $table = "categoria_prod";
    $dataUpdate = array(
      "idCatPro" => $editarCategoriaProductos["codCatPro"],
      "nombreCategoriaProd" => $editarCategoriaProductos["categoriaNameProdEditar"],
      ["editDescripcionCategoria"],
      "DateUpdate" => date("Y-m-d\TH:i:sP")
    );
    $response = CategoriaProductsModel::mdlEditCategoria($table, $dataUpdate);
    return $response;

  }

  // Eliminar un cateProducto
  public static function ctrDeleteCateProduct($borrarcateProducto)
  {
    $codCatPro = $borrarcateProducto["codCatPro"];
    $usoCateProd = self::ctrCateProductUso($codCatPro);
    // Si usoCateProd es true, el producto está en uso y no se puede eliminar
    if ($usoCateProd === true) {
      $response = "error";
    } else {
      // Si usoCateProd es false, el producto no está en uso y se puede proceder a eliminar
      $table = "categoria_prod";
      $response = CategoriaProductsModel::mdlDeleteCateProduct($table, $codCatPro);
    }
    return $response;
  }
  //verificar si el cateProducto esta en alamacen
  public static function ctrCateProductUso($codCatPro)
  {
    $table = "producto";
    $response = CategoriaProductsModel::mdlCateProductUso($table, $codCatPro);
    return $response;
  }

}
