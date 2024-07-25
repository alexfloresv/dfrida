<?php
date_default_timezone_set('America/Bogota');

class ingresoMprimaController
{
  //datatable de ingresos productos prima
  public static function ctrDTableIngProductosPrima()
  {
    $table = "ingreso_mprima";
    $response = ingresoMprimaModel::mdlDTableIngProductosPrima($table);
    return $response;
  }

  //datatable  ingresos en el modal de ingresos productos prima
  public static function ctrVerProductosIngresadosModal($codAllIngMprima)
  {
    $table = "ingreso_mprima";
    $response = ingresoMprimaModel::mdlVerProductosIngresadosModal($table, $codAllIngMprima);
    return $response;
  }

  //crear ingreso productos a almacen de  productos***
  public static function ctrCrearIngresoMprima($crearIngresoProd, $jsonProductosIngProd)
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

  //ingreso de productos a almacen prima
  public static function ctrIngresarProductosAlmacenProd($jsonProductosIngProd)
  {
    $dataProductosIng = json_decode($jsonProductosIngProd, true);
    $table = "almacen_mprima";
    //ingresamos a cada array de productos y verificamos si existe o no en el almacen
    foreach ($dataProductosIng as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);

      // Preparar datos para ingresar o actualizar en el almacén
      $dataIngAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "codigoMprimaAlma" => $producto["codigoProdIng"],
        "nombreMprimaAlma" => $producto["nombreProdIng"],
        "unidadMprimaAlma" => $producto["unidadProdIng"],
        "cantidadMprimaAlma" => $producto["cantidadProdIng"],
        "precioMprimaAlma" => $producto["precioProdIng"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );

      if ($stockAlmacen === false) {
        // El producto no existe, se crea con los datos ya preparados en el array de dataIngAlamacen con los del array decodificado
        $response = ingresoMprimaModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // El producto ya existe, se actualiza la cantidad
        $dataSumarProdAlamacen = array(
          "idMprima" => $producto["codProdIng"],
          "cantidadMprimaAlma" => $stockAlmacen["cantidadMprimaAlma"] + $producto["cantidadProdIng"], // Sumar la cantidad actual con la nueva cantidad
          "codigoMprimaAlma" => $producto["codigoProdIng"],
          "nombreMprimaAlma" => $producto["nombreProdIng"],
          "unidadMprimaAlma" => $producto["unidadProdIng"],
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = ingresoMprimaModel::mdlSumarProductoAlmacenProd($table, $dataSumarProdAlamacen);
      }

      if (!$response) {
        return $response;
      }
    }
    return $response;
  }
  //verificar datos de productos en almacen prima
  public static function ctrStockAlmacen($codProd)
  {
    $table = "almacen_mprima";
    $response = ingresoMprimaModel::mdlStockAlmacen($table, $codProd);
    return $response;
  }

  //crear el registro de ingreso de productos
  public static function ctrRegistroIngresoProductos($IngresoProdData, $jsonProductosCotizacion)
  {
    $table = "ingreso_mprima";
    $dataCreate = array(
      "nombreIngMprima" => $IngresoProdData["tituloIngProdAdd"],
      "fechaIngMprima" => $IngresoProdData["fechaIngProdAdd"],
      "igvIngMprima" => $IngresoProdData["igvIngProdAdd"],
      "subTotalIngMprima" => $IngresoProdData["subTotalIngProdAdd"],
      "totalIngMprima" => $IngresoProdData["totalIngProdAdd"],
      "ingJsonMprima" => $jsonProductosCotizacion,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ingresoMprimaModel::mdlCrearIngresoProd($table, $dataCreate);

    return $response;
  }
  //fin crear ingreso productos a almacen de  productos prima***

  //visualizar datos para editar ingreso productos
  public static function ctrVerDataIngProductos($codIngMprima)
  {
    $codIdIngProd = $codIngMprima;
    $table = "ingreso_mprima";
    $response = ingresoMprimaModel::mdlVerDataFichaTrabajo($table, $codIdIngProd);
    return $response;
  }

  //obtener precio para editar ingreso productos prima
  public static function ctrPrecioProdEdit($codIngProd)
  {
    $codIdIngProd = $codIngProd;
    $table = "materia_prima";
    $response = ingresoMprimaModel::mdlPrecioProdEdit($table, $codIdIngProd);
    return $response;
  }

  //editar ingreso productos prima
  public static function ctrEditarIngresoProd($editarIngProd, $jsonProdIngNuevoEdit)
  {

    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codIngProd = $editarIngProd["codIngMprima"];
      $table = "ingreso_mprima";
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
        "idIngMprima" => $codIngProd,
        "nombreIngMprima" => $editProdData["tituloIngProdEdit"],
        "fechaIngMprima" => $editProdData["fechaIngProdEdit"],
        "igvIngMprima" => $editProdData["igvIngProdAdd"],
        "subTotalIngMprima" => $editProdData["subTotalIngProdAdd"],
        "totalIngMprima" => $editProdData["totalIngProdAdd"],
        "ingJsonMprima" => $jsonProdIngNuevoEdit,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      $response = ingresoMprimaModel::mdlEditarIngresoProd($table, $dataUpdate);
    } else {
      $response = "error";
    }
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos al editar un registro de ingreso prima
  public static function ctrEditarProductosIngresadosAlmacen($jsonProdIngAnteriorEdit, $jsonProdIngNuevoEdit)
  {
    $dataProducIngAnterior = json_decode($jsonProdIngAnteriorEdit, true);
    $dataProducIngNuevo = json_decode($jsonProdIngNuevoEdit, true);
    $table = "almacen_mprima";

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

      //cantidad antes de editar
      $prodEncontrado = null;

      foreach ($productosAntiguosIndexados as $item) {
        if ($item["codProdIng"] === $producto["codProdIng"]) {
          $prodEncontrado = $item;
          break; // Rompe el bucle una vez encontrado el producto
        }
      }

      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular la cantidad a retirar del almacén sina fectar el stock
      $cantidadARetirar = $cantidadAnte - $ajusteStock;

      // Calcular resta de stock al editar ingreso sina fectar el estock
      $nuevoStock = $stockActual - $cantidadARetirar;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Actualizar productos en almacen suma
    foreach ($dataFiltroSuma as $producto) {

      //cantidad antes de editar
      $prodEncontrado = null;

      foreach ($productosAntiguosIndexados as $item) {
        if ($item["codProdIng"] === $producto["codProdIng"]) {
          $prodEncontrado = $item;
          break; // Rompe el bucle una vez encontrado el producto
        }
      }
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];
      $ajusteStock = $producto["cantidadProdIng"];


      // Calcular la cantidad a retirar del almacén sina fectar el stock
      $cantidadAsumar = $ajusteStock - $cantidadAnte;

      // Calcular resta de stock al editar ingreso sina fectar el estock
      $nuevoStock = $stockActual + $cantidadAsumar;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }
    // Actualizar productos en almacen si no existe lo crea si existe solo le suma
    foreach ($dataFiltroNuevo as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);

      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual + $ajusteStock;

      $dataIngAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $ajusteStock,
        "codigoMprimaAlma" => $producto["codigoProdIng"],
        "nombreMprimaAlma" => $producto["nombreProdIng"],
        "unidadMprimaAlma" => $producto["unidadProdIng"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );

      if ($stockAlmacen === false) {
        // El producto no existe, se crea con los datos ya preparados en el array de dataIngAlamacen con los del array decodificado
        $response = ingresoMprimaModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // Preparar datos para actualizar
        $dataActualizarProdAlamacen = array(
          "idMprima" => $producto["codProdIng"],
          "cantidadMprimaAlma" => $nuevoStock,
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );

        // Actualizar productos en almacen
        $response = ingresoMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
      }
    }

    // Actualizar productos en almacen  delete significa que no esta presente en el edit pero si en el antiguo se retiro el producto entoces resta esta cantidad del almacen aqui es donde puede generar negativos
    foreach ($dataFiltroDelete as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual - $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = ingresoMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin editar ingreso productos

  //borrar ingreso productos prima
  public static function ctrBorrarIngProductos($borrarIngProductos)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codIngProd = $borrarIngProductos["codIngMprima"];
      $table = "ingreso_mprima";
      //obtener el registro de productos ingresados
      $productosIngresados = self::ctrRecuperarProductosIngresados($codIngProd);
      //borrar productos ingresados en almacen
      $deleteProdIngAlmacen = self::ctrBorrarProductosIngresadosAlmacen($productosIngresados["ingJsonMprima"]);
      //eliminar registro de ingreso de productos
      $response = ingresoMprimaModel::mdlBorrarRegistroIngresProducto($table, $codIngProd);
    } else {
      $response = "error";
    }
    return $response;
  }

  //obtener el registro de productos ingresados json
  public static function ctrRecuperarProductosIngresados($codIngProd)
  {
    $table = "ingreso_mprima";
    $response = ingresoMprimaModel::mdlRecuperarProductosIngresados($table, $codIngProd);
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos  prima al eliminar un registro de ingreso++
  public static function ctrBorrarProductosIngresadosAlmacen($productosIngresados)
  {
    $dataProductosIng = json_decode($productosIngresados, true);
    $table = "almacen_mprima";

    foreach ($dataProductosIng as $producto) {
      // Verificar datos de productos en almacen
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular nuevo stock
      $nuevoStock = $stockActual - $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen prima
      $response = ingresoMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin borrar ingreso productos

  //Agregar Producto prima al ingreso
  public static function ctrAgregarIngProducto($codIngProducto)
  {
    $table = 'materia_prima';
    $response = ingresoMprimaModel::mdlAgregarIngProducto($table, $codIngProducto);
    return $response;
  }


}
