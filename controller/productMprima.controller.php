<?php
date_default_timezone_set('America/Bogota');

class ProductMprimaController
{
  // Mostrar todos los ProductosMprima
  public static function ctrDTableProductosMprima()
  {
    $table = "materia_prima";
    $response = ProductMprimaModel::mdlDTableProductosMprima($table);
    return $response;
  }

  // Mostrar todas las categorías de categoria_mprima
  public static function ctrGetAllCategoriesMprima()
  {
    $table = "categoria_mprima";
    $response = ProductMprimaModel::mdlGetAllCategoriesMprima($table);
    return $response;
  }

  // Crear nuevo ProductosMprima
  public static function ctrCrearProductoMprima($crearProductoMprima)
  {
    // Verificar si el nombre de ProductosMprima existe
    // La respuesta será true para existencia y false para no existencia
    $existNomProd = self::ctrExistenciaDeProductoMateriaPrima($crearProductoMprima["productNameMp"]);
    // Verificar si el código de ProductosMprima existe
    // La respuesta será true para existencia y false para no existencia
    $existCodProd = self::ctrExistenciaDeCodigoProductoMateriaPrima($crearProductoMprima["productCodigoMp"]);
    if ($existNomProd) {
      $response = "errorNom";
    } elseif ($existCodProd) {
      $response = "errorCod";
    } else {
      $table = "materia_prima";
      $dataCreate = array(
        "idCatMPrima" => $crearProductoMprima["productCategoryMp"],
        "nombreMprima" => $crearProductoMprima["productNameMp"],
        "codigoMprima" => $crearProductoMprima["productCodigoMp"],
        "detalleMprima" => $crearProductoMprima["productDetailMp"],
        "unidadMprima" => $crearProductoMprima["productUnitMp"],
        "precioMprima" => $crearProductoMprima["productPriceMp"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );
      $response = ProductMprimaModel::CrearProductoMprima($table, $dataCreate);
    }
    return $response;
  }
  //verificar si el nombre de ProductosMprima existe
  public static function ctrExistenciaDeProductoMateriaPrima($nombreMprima)
  {
    $table = "materia_prima";
    //la respues sera true para existencia y false para no existencia
    $response = ProductMprimaModel::mdlExistenciaDeProductoMateriaPrima($table, $nombreMprima);
    return $response;
  }
  //verificar si el codigo de ProductosMprima existe
  public static function ctrExistenciaDeCodigoProductoMateriaPrima($productCodigoMp)
  {
    $table = "materia_prima";
    //la respues sera true para existencia y false para no existencia
    $response = ProductMprimaModel::mdlExistenciaDeCodigoProductoMateriaPrima($table, $productCodigoMp);
    return $response;
  }
  //  visualizar datos ProductosMprima
  public static function ctrViewProductoMprima($codProductoMp)
  {
    $table = 'materia_prima';
    $productData = ProductMprimaModel::mdlViewProductoMprima($table, $codProductoMp);
    return $productData;
  }

  // Editar un ProductosMprima específico
  public static function ctrEditProductMprima($editarProductosMprima)
  {
    if (isset($editarProductosMprima['editProductNameMp']) && isset($editarProductosMprima['editProductCategoryMp'])) {
      $table = 'materia_prima';
      $dataUpdate = array(
        'idMprima' => $editarProductosMprima['codProductMp'],
        'idCatMprima' => $editarProductosMprima['editProductCategoryMp'],
        'nombreMprima' => $editarProductosMprima['editProductNameMp'],
        "codigoMprima" => $editarProductosMprima["editProductCodigoMp"],
        'detalleMprima' => $editarProductosMprima['editProductDetailMp'],
        'unidadMprima' => $editarProductosMprima['editProductUnitMp'],
        'precioMprima' => $editarProductosMprima['editProductPriceMp'],
        'DateUpdate' => date("Y-m-d\TH:i:sP"),
      );

      $response = ProductMprimaModel::mdlEditProductMprima($table, $dataUpdate);
      return $response;
    }
  }
  // Eliminar un ProductosMprima
  public static function ctrDeleteProductMprima($borrarProductoMprima)
  {
    $codProductMp = $borrarProductoMprima["codProMp"];
    // Verificar si el ProductosMprima está en almacén
    $almacenMp = self::ctrAlmacenMpProductStock($codProductMp);
    if (!empty($almacenMp) && $almacenMp["cantidadMprima"] > 0) {
      $response = "error";
    } else {
      $table = "materia_prima";
      $response = ProductMprimaModel::mdlDeleteProductMprima($table, $codProductMp);
    }
    return $response;
  }
  //verificar si el ProductosMprima esta en alamacen
  public static function ctrAlmacenMpProductStock($codProductMp)
  {
    $table = "alamcen_mprima";
    $response = ProductMprimaModel::mdlAlmacenMpProductStock($table, $codProductMp);
    return $response;
  }

}
