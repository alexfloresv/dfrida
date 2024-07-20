<?php
date_default_timezone_set('America/Bogota');

class salidaProdController
{
  //datatable de ingresos productos
  public static function ctrDTableSalProdcuctos()
  {
    $table = "salida_Prod";
    $response = salidaProdModel::mdlmdlDTableSalProdcuctos($table);
    return $response;
  }
  //datatable de salidas productos alamcen modal
  public static function ctrDTableSalProdcuctosAlmacen()
  {
    $table = "almacen_Prod";
    $response = salidaProdModel::mdlDTableSalProdcuctosAlmacen($table);
    return $response;
  }
  //datatable  ingresos en el modal de ingresos productos
  public static function ctrVerProductosIngresadosModal($codAllIngProd)
  {
    $table = "ingreso_prod";
    $response = salidaProdModel::mdlVerProductosIngresadosModal($table, $codAllIngProd);
    return $response;
  }

  //crear ingreso productos a almacen de  productos***
  public static function ctrCrearSalidaProd($crearSalidaProd, $jsonProductosSalidaProd)
  {
    // Eliminar datos innecesarios
    $salidaProdData = self::ctrBorrarDatosInecesariosSalidaProd($crearSalidaProd);
    // Eliminar el array $crearSalidaProd para no duplicar datos
    unset($crearSalidaProd);
    // Ingreso de productos a almacén
    $salidaProductosAlmacen = self::ctrSalidaProductosAlmacenProd($jsonProductosSalidaProd);
    //verifica si es verdadero o falso para crear el registro
    if ($salidaProductosAlmacen) {
      // Crear el registro de ingreso de productos si $ingresoProductosAlmacen es true
      $response = self::ctrRegistroSalidaProductos($salidaProdData, $jsonProductosSalidaProd);
    } else {
      // Si $salidaProductosAlmacen es false, asignar "error" a $response
      //este error solo sucedera cuando ubo un error al restar la cantidad de productos en almacen y se restauro el alamacen
      $response = "errorSalAlmacen";
    }
    return $response;
  }

  //eliminar datos innecesarios
  public static function ctrBorrarDatosInecesariosSalidaProd($crearSalidaProd)
  {
    //datos recolectados por la primera funcion de recoleccion de datos 
    //datos repetidos incesarios y sin estructura
    //datos del primer producto  ubicado por la funcion
    unset($crearSalidaProd["codProdIng"]);
    unset($crearSalidaProd["nombreProdIng"]);
    unset($crearSalidaProd["codigoProdIng"]);
    unset($crearSalidaProd["unidadProdIng"]);
    unset($crearSalidaProd["cantidadProdIng"]);
    unset($crearSalidaProd["precioProdIng"]);

    $response = $crearSalidaProd;
    return $response;
  }

  //salida de productos a almacen
  public static function ctrSalidaProductosAlmacenProd($jsonProductosSalidaProd)
  {
    $dataProductosSalida = json_decode($jsonProductosSalidaProd, true);
    $table = "almacen_prod";
    //almacenar las operaciones exitosas y poder revertirlas si es necesario
    $operacionesExitosas = [];

    foreach ($dataProductosSalida as $producto) {
      // Verificar datos de productos en almacen antes de restar sera true = valor positivo o false = valor negativo o 0
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      if ($stockAlmacen === false) {
        //Si no se encuentra el producto, se restaurara los productos que ya se restaron
        foreach ($operacionesExitosas as $operacion) {
          salidaProdModel::mdlRestaurarProductosAlmacenProd($table, $operacion);
        }
        return false; // Devuelve falso inmediatamente si es negativo o 0 = falso
      } else {
        // Si el producto es postivo, se resta la cantidad
        $dataRestarProdAlamacen = array(
          "idProd" => $producto["codProdIng"],
          "cantidadProdAlma" => $stockAlmacen["cantidadProdAlma"] - $producto["cantidadProdIng"],
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = salidaProdModel::mdlRestarProductoAlmacenProd($table, $dataRestarProdAlamacen);
        if (!$response) {
          // Si falla la resta, se restaura los productos que ya se restaron
          foreach ($operacionesExitosas as $operacion) {
            salidaProdModel::mdlRestaurarProductosAlmacenProd($table, $operacion);
          }
          return false; // Devuelve falso si falla la actualización
        } else {
          // Si la operación es exitosa, se agrega a la lista de operaciones exitosas
          $operacionesExitosas[] = [
            "idProd" => $producto["codProdIng"],
            "cantidadProdAlma" => $stockAlmacen["cantidadProdAlma"], // Guardamos el stock original
            "DateUpdate" => date("Y-m-d\TH:i:sP"),
          ];
        }
      }
    }
    return true; // Si todas las operaciones son exitosas, devuelve verdadero
  }
  //verificar datos de productos en almacen
  public static function ctrStockAlmacen($codProd)
  {
    $table = "almacen_prod";
    $response = salidaProdModel::mdlStockAlmacen($table, $codProd);
    return $response;
  }

  //crear el registro de salida de productos
  public static function ctrRegistroSalidaProductos($salidaProdData, $jsonProductosSalidaProd)
  {
    $table = "salida_prod";
    $dataCreate = array(
      "nombreSalProd" => $salidaProdData["tituloSalProdAdd"],
      "idPedido" => $salidaProdData["pedidoSalProdAdd"],
      "fechaSalProd" => $salidaProdData["fechaSalProdAdd"],
      "igvSalProd" => $salidaProdData["igvIngProdAdd"],
      "subTotalSalProd" => $salidaProdData["subTotalIngProdAdd"],
      "totalSalProd" => $salidaProdData["totalIngProdAdd"],
      "salJsonProd" => $jsonProductosSalidaProd,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = salidaProdModel::mdlCrearSalidaProd($table, $dataCreate);
    return $response;
  }
  //fin crear salida productos a almacen de  productos***

  //***funciones de edit */
  //visualizar datos para editar salida productos
  public static function ctrVerDataIngProductos($codSalProd)
  {
    $codIdSalProd = $codSalProd;
    $table = "salida_prod";
    $response = salidaProdModel::mdlVerDataSalidaRegistro($table, $codIdSalProd);
    return $response;
  }
  
  //obtener stock de almacen para visualizar datos para editar salidas productos
  public static function ctrStockAlmacenEdit($codIngProd)
  {
    $codIdIngProd = $codIngProd;
    $table = "almacen_prod";
    $response = salidaProdModel::mdlStockAlmacenEdit($table, $codIdIngProd);
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
      $editProdData = self::ctrBorrarDatosInecesariosSalidaProd($editarIngProd);
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

      $response = salidaProdModel::mdlEditarIngresoProd($table, $dataUpdate);
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
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
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
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
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
        $response = salidaProdModel::mdlIngresarProductosAlmacenProd($table, $dataIngAlamacen);
      } else {
        // Preparar datos para actualizar
        $dataActualizarProdAlamacen = array(
          "idProd" => $producto["codProdIng"],
          "cantidadProdAlma" => $nuevoStock,
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );

        // Actualizar productos en almacen
        $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
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
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin editar salida productos***

  //**** borar salida productos
  //borrar salida productos
  public static function ctrBorrarSalProductos($borrarSalProductos)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codSalProd = $borrarSalProductos["codSalProd"];
      $table = "salida_prod";
      //obtener el registro de productos 
      $productosRegistradosSalida = self::ctrRecuperarProductosRegSalida($codSalProd);
      //devolver productos restados del alamcen por el registro de salida +++
      $sumarProdAlmacen = self::ctrSumarProductosRestadosDelAlmacen($productosRegistradosSalida["salJsonProd"]);
      //eliminar registro de ingreso de productos
      $response = salidaProdModel::mdlBorrarRegistroIngresProducto($table, $codSalProd);
    } else {
      $response = "error";
    }
    return $response;
  }

  //obtener el registro de productos 
  public static function ctrRecuperarProductosRegSalida($codSalProd)
  {
    $table = "salida_prod";
    //recuperar los productos registrados en la salida
    $response = salidaProdModel::mdlRecuperarProductosRegSalida($table, $codSalProd);
    return $response;
  }

  //editar / cantidades de productos retirados por el registro de salida de productos al eliminar un registro de salida
  public static function ctrSumarProductosRestadosDelAlmacen($productosRegistradosSalida)
  {
    $dataProductosSal = json_decode($productosRegistradosSalida, true);
    $table = "almacen_prod";

    foreach ($dataProductosSal as $producto) {
      //Obtener el stock de productos en almacen
      $stockAlmacen = self::ctrStockAlmacenSalida($producto["codProdIng"]);
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
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //Obtener el stock de productos en almacen
  public static function ctrStockAlmacenSalida($codProd)
  {
    $table = "almacen_prod";
    $response = salidaProdModel::mdlStockAlmacenSalida($table, $codProd);
    return $response;
  }

  //****fin borar salida productos

  //Agregar Producto de almacen ala salida
  public static function ctrAgregarSalProducto($codSalProducto)
  {
    $table = 'almacen_Prod';
    $response = salidaProdModel::mdlAgregarSalProducto($table, $codSalProducto);
    return $response;
  }


}
