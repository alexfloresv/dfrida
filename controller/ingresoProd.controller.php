<?php
date_default_timezone_set('America/Bogota');

class ingresoProdController
{
  // Mostrar todos los productos
  public static function ctrDTableCotizaciones()
  {
    $table = "cotizacion";
    $response = ingresoProdModel::mdlDTableCotizaciones($table);
    return $response;
  }
  
  //crear ingreso productos a almacen de  productos***
  public static function ctrCrearIngresoProd($crearIngresoProd, $jsonProductosIngProd)
  {
    // Eliminar datos innecesarios
    $IngresoProdData = self::ctrBorrarDatosInecesariosIngProd($crearIngresoProd);
    // Eliminar el array $crearCotizacion para no duplicar datos
    unset($crearIngresoProd);
    // Ingreso de productos a almacén
    $ingresoProductosAlmacen = self::ctrIngresarProductosAlmacenProd($jsonProductosIngProd);
    //verifica si es verdadero o falso para crear el registro
    if ($ingresoProductosAlmacen) {
      // Crear el registro de ingreso de productos si $ingresoProductosAlmacen es true
      $response = self::ctrRegistroIngresoProductos($IngresoProdData, $jsonProductosIngProd);
    } else {
      // Si $ingresoProductosAlmacen es false, asignar "error" a $response
      $response = "errorIngAlmacen";
    }
    return $response;
  }

  //eliminar datos innecesarios
  public static function ctrBorrarDatosInecesariosIngProd($crearIngresoProd)
  {
    //datos recolectados por la primera funcion de recoleccion de datos 
    //datos repetidos incesarios y sin estructura
    //datos del primer producto  ubicado por la funcion
    unset($crearIngresoProd["codProdIng"]);
    unset($crearIngresoProd["nombreProdIng"]);
    unset($crearIngresoProd["codigoProdIng"]);
    unset($crearIngresoProd["unidadProdIng"]);
    unset($crearIngresoProd["cantidadProdIng"]);
    unset($crearIngresoProd["precioProdIng"]);

    $response = $crearIngresoProd;
    return $response;
  }

  //ingreso de productos a almacen
  public static function ctrIngresarProductosAlmacenProd($jsonProductosIngProd)
  {
    $dataProductosCotizacion = json_decode($jsonProductosIngProd, true);
    $table = "almacen_prod";
    //ingresamos a cada array de productos y verificamos si existe o no en el almacen
    foreach ($dataProductosCotizacion as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);

      // Preparar datos para ingresar o actualizar en el almacén
      $dataIngAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "codigoProdAlma" => $producto["codigoProdIng"],
        "nombreProdAlma" => $producto["nombreProdIng"],
        "unidadProdAlma" => $producto["unidadProdIng"],
        "cantidadProdAlma" => $producto["cantidadProdIng"],
        "precioProdAlma" => $producto["precioProdIng"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );

      if ($stockAlmacen === false) {
        // El producto no existe, se crea con los datos ya preparados den el array de dataIngAlamacen con los del array decodificado
        $response = ingresoProdModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // El producto ya existe, se actualiza la cantidad
        $dataSumarProdAlamacen = array(
          "idProd" => $producto["codProdIng"],
          "cantidadProdAlma" => $stockAlmacen["cantidadProdAlma"] + $producto["cantidadProdIng"], // Sumar la cantidad actual con la nueva cantidad
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = ingresoProdModel::mdlSumarProductoAlmacenProd($table, $dataSumarProdAlamacen);
      }

      if (!$response) {
        return $response;
      }
    }
    return $response;
  }
  //verificar datos de productos en almacen
  public static function ctrStockAlmacen($codProd)
  {
    $table = "almacen_prod";
    $response = ingresoProdModel::mdlStockAlmacen($table, $codProd);
    return $response;
  }

  //crear el registro de ingreso de productos
  public static function ctrRegistroIngresoProductos($IngresoProdData, $jsonProductosCotizacion)
  {
    $table = "ingreso_prod";
    $dataCreate = array(
      "nombreIngProd" => $IngresoProdData["tituloIngProdAdd"],
      "fechaIngProd" => $IngresoProdData["fechaIngProdAdd"],
      "igvIngProd" => $IngresoProdData["igvIngProdAdd"],
      "subTotalIngProd" => $IngresoProdData["subTotalIngProdAdd"],
      "totalIngProd" => $IngresoProdData["totalIngProdAdd"],
      "ingJsonProd" => $jsonProductosCotizacion,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ingresoProdModel::mdlCrearIngresoProd($table, $dataCreate);

    return $response;
  }
  //fin crear ingreso productos a almacen de  productos***

  // Editar un producto específico
  public static function ctrEditProduct($editarProducto)
  {
    if (isset($editarProducto['editProductName']) && isset($editarProducto['editProductCategory'])) {
      $table = 'producto';
      $dataUpdate = array(
        'idProd' => $editarProducto['codProduct'],
        'idCatPro' => $editarProducto['editProductCategory'],
        'nombreProd' => $editarProducto['editProductName'],
        "codigoProd" => $editarProducto["editProductCodigo"],
        'detalleProd' => $editarProducto['editProductDetail'],
        'unidadProd' => $editarProducto['editProductUnit'],
        'precioProd' => $editarProducto['editProductPrice'],
        'DateUpdate' => date("Y-m-d\TH:i:sP"),
      );

      $response = ingresoProdModel::mdlEditProduct($table, $dataUpdate);
      return $response;
    }
  }
  // Eliminar cotizacion
  public static function ctrDeleteCotizacion($borrarCotizacion)
  {
    $codCoti = $borrarCotizacion["codCoti"];
    $table = "cotizacion";
    $response = ingresoProdModel::mdlDeleteCotizacion($table, $codCoti);

    return $response;
  }

  //Agregar Producto a la cotizacion
  public static function ctrAgregarIngProducto($codIngProducto)
  {
    $table = 'producto';
    $response = ingresoProdModel::mdlAgregarIngProducto($table, $codIngProducto);
    return $response;
  }


  //  Descargar PDF de la cotizacion
  public static function ctrDescargarPdfCotizacion($codCotiPdf)
  {
    $codCoti = $codCotiPdf["codCoti"];
    //cambiar estado de la cotizacion al descargar
    $newEstadoCoti = self::ctrEstadoDescargaPdfCotizacion($codCoti);
    $table = "cotizacion";
    $response = ingresoProdModel::mdlDescargarPdfCotizacion($table, $codCoti);

    return $response;
  }

  //cambiar estado de la cotizacion al descargar
  public static function ctrEstadoDescargaPdfCotizacion($codCoti)
  {
    $table = "cotizacion";
    $response = ingresoProdModel::mdlEstadoDescargaPdfCotizacion($table, $codCoti);
    return $response;
  }
}
