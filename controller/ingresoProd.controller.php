<?php
date_default_timezone_set('America/Bogota');

class ingresoProdController
{
  //datatable de ingresos productos
  public static function ctrDTableIngProdcuctos()
  {
    $table = "ingreso_prod";
    $response = ingresoProdModel::mdlDTableIngProdcuctos($table);
    return $response;
  }
  //datatable  ingresos en el modal de ingresos productos
  public static function ctrVerProductosIngresadosModal($codAllIngProd)
  {
    $table = "ingreso_prod";
    $response = ingresoProdModel::mdlVerProductosIngresadosModal($table, $codAllIngProd);
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
        // El producto no existe, se crea con los datos ya preparados en el array de dataIngAlamacen con los del array decodificado
        $response = ingresoProdModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // El producto ya existe, se actualiza la cantidad
        $dataSumarProdAlamacen = array(
          "idProd" => $producto["codProdIng"],
          "cantidadProdAlma" => $stockAlmacen["cantidadProdAlma"] + $producto["cantidadProdIng"], // Sumar la cantidad actual con la nueva cantidad
          "codigoProdAlma" => $producto["codigoProdIng"],
          "nombreProdAlma" => $producto["nombreProdIng"],
          "unidadProdAlma" => $producto["unidadProdIng"],
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

  //visualizar datos para editar ingreso productos
  public static function ctrVerDataIngProductos($codIngProd)
  {
    $codIdIngProd = $codIngProd;
    $table = "ingreso_prod";
    $response = ingresoProdModel::mdlVerDataFichaTrabajo($table, $codIdIngProd);
    return $response;
  }

  //obtener precio para editar ingreso productos
    public static function ctrPrecioProdEdit($codIngProd)
    {
      $codIdIngProd = $codIngProd;
      $table = "producto";
      $response = ingresoProdModel::mdlPrecioProdEdit($table, $codIdIngProd);
      return $response;
    }

  //editar ingreso productos
  public static function ctrEditarIngresoProd($editarIngProd, $jsonProdIngNuevoEdit)
  {

    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codIngProd = $editarIngProd["codIngProd"];
      $table = "ingreso_prod";
      //eliminar datos innecesarios
      $editProdData = self::ctrBorrarDatosInecesariosIngProd($editarIngProd);
      // Eliminar el array $editarIngProd para no duplicar datos
      unset($editarIngProd);
      //registro de productos ingresados a editar / anterior
      $jsonProdIngAnteriorEdit = $editProdData["prodIngAnteriorEdit"];
      //actualizar alamacen con los productos a editar se pasa los dos json en anterir registro y el nuevo
      $editarProdIngAlmacen = self::ctrEditarProductosIngresadosAlmacen($jsonProdIngAnteriorEdit, $jsonProdIngNuevoEdit);

      //editar registro ingreso de productos con los datos editados
      $dataUpdate = array(
        "idIngProd" => $editProdData["codIngProd"],
        "nombreIngProd" => $editProdData["tituloIngProdEdit"],
        "fechaIngProd" => $editProdData["fechaIngProdEdit"],
        "igvIngProd" => $editProdData["igvIngProdAdd"],
        "subTotalIngProd" => $editProdData["subTotalIngProdAdd"],
        "totalIngProd" => $editProdData["totalIngProdAdd"],
        "ingJsonProd" => $jsonProdIngNuevoEdit,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      $response = ingresoProdModel::mdlEditarIngresoProd($table, $dataUpdate);
    } else {
      $response = "error";
    }
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos al editar un registro de ingreso
  public static function ctrEditarProductosIngresadosAlmacen($jsonProdIngAnteriorEdit, $jsonProdIngNuevoEdit)
  {
    $dataProducIngAnterior = json_decode($jsonProdIngAnteriorEdit, true);
    $dataProducIngNuevo = json_decode($jsonProdIngNuevoEdit, true);
    $table = "almacen_prod";

    // Inicializar arrays para clasificar los productos editados
    $dataFiltroSuma = [];//SUMAR
    $dataFiltroResta = [];//RESTAR
    $dataFiltroIgual = [];//NO TOCAR no se editaron
    $dataFiltroNuevo = [];//NUEVO
    $dataFiltroDelete = [];//ELIMINAR

    // Indexar los productos antiguos por su código para un acceso rápido
    $productosAntiguosIndexados = [];
    foreach ($dataProducIngAnterior as $productoAntiguo) {
      $productosAntiguosIndexados[$productoAntiguo["codProdIng"]] = $productoAntiguo;
    }

    // Indexar los productos nuevos por su código para un acceso rápido
    $productosNuevosIndexados = [];
    foreach ($dataProducIngNuevo as $productoNuevo) {
      $productosNuevosIndexados[$productoNuevo["codProdIng"]] = $productoNuevo;
    }

    // Iterar sobre los productos nuevos para clasificarlos
    foreach ($dataProducIngNuevo as $productoNuevo) {
      $codProdIng = $productoNuevo["codProdIng"];
      if (isset($productosAntiguosIndexados[$codProdIng])) {
        // El producto existe en ambos, comparar cantidades
        $productoAntiguo = $productosAntiguosIndexados[$codProdIng];
        if ($productoNuevo["cantidadProdIng"] > $productoAntiguo["cantidadProdIng"]) {
          $dataFiltroSuma[] = $productoNuevo; // La cantidad ha aumentado
        } elseif ($productoNuevo["cantidadProdIng"] < $productoAntiguo["cantidadProdIng"]) {
          $dataFiltroResta[] = $productoNuevo; // La cantidad ha disminuido
        } else {
          $dataFiltroIgual[] = $productoNuevo; // La cantidad es igual
        }
      } else {
        // El producto es nuevo
        $dataFiltroNuevo[] = $productoNuevo;
      }
    }

    // Iterar sobre los productos antiguos para encontrar los que no están en los nuevos
    foreach ($dataProducIngAnterior as $productoAntiguo) {
      $codProdIng = $productoAntiguo["codProdIng"];
      if (!isset($productosNuevosIndexados[$codProdIng])) {
        // El producto antiguo no está presente en los nuevos, marcar para eliminar
        $dataFiltroDelete[] = $productoAntiguo;
      }
    }

    // Actualizar productos en almacen resta
    foreach ($dataFiltroResta as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual - $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Actualizar productos en almacen suma
    foreach ($dataFiltroSuma as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual + $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }
    // Actualizar productos en almacen si no existe lo crea si existe solo le suma
    foreach ($dataFiltroNuevo as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);

      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual + $ajusteStock;

      $dataIngAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $ajusteStock,
        "codigoProdAlma" => $producto["codigoProdIng"],
        "nombreProdAlma" => $producto["nombreProdIng"],
        "unidadProdAlma" => $producto["unidadProdIng"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );

      if ($stockAlmacen === false) {
        // El producto no existe, se crea con los datos ya preparados en el array de dataIngAlamacen con los del array decodificado
        $response = ingresoProdModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // Preparar datos para actualizar
        $dataActualizarProdAlamacen = array(
          "idProd" => $producto["codProdIng"],
          "cantidadProdAlma" => $nuevoStock,
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );

        // Actualizar productos en almacen
        $response = ingresoProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
      }
    }

    // Actualizar productos en almacen  delete significa que no esta presente en el edit pero si en el antiguo se retiro el producto entoces resta esta cantidad del almacen aqui es donde puede generar negativos
    foreach ($dataFiltroDelete as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual - $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin editar ingreso productos

  //borrar ingreso productos
  public static function ctrBorrarIngProductos($borrarIngProductos)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codIngProd = $borrarIngProductos["codIngProd"];
      $table = "ingreso_prod";
      //obtener el registro de productos ingresados
      $productosIngresados = self::ctrRecuperarProductosIngresados($codIngProd);
      //borrar productos ingresados en almacen
      $deleteProdIngAlmacen = self::ctrBorrarProductosIngresadosAlmacen($productosIngresados["ingJsonProd"]);
      //eliminar registro de ingreso de productos
      $response = ingresoProdModel::mdlBorrarRegistroIngresProducto($table, $codIngProd);
    } else {
      $response = "error";
    }
    return $response;
  }

  //obtener el registro de productos ingresados
  public static function ctrRecuperarProductosIngresados($codIngProd)
  {
    $table = "ingreso_prod";
    $response = ingresoProdModel::mdlRecuperarProductosIngresados($table, $codIngProd);
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos al eliminar un registro de ingreso
  public static function ctrBorrarProductosIngresadosAlmacen($productosIngresados)
  {
    $dataProductosIng = json_decode($productosIngresados, true);
    $table = "almacen_prod";

    foreach ($dataProductosIng as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual - $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin borrar ingreso productos

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


}
