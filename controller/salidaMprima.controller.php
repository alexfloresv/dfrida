<?php
date_default_timezone_set('America/Bogota');

class salidaMprimaController
{
  //datatable de ingresos productos
  public static function ctrDTableSalProdcuctos()
  {
    $table = "salida_mprima";
    $response = salidaMprimaModel::mdlmdlDTableSalProdcuctos($table);
    return $response;
  }
  //datatable de salidas productos alamcen modal
  public static function ctrDTableSalProdcuctosAlmacen()
  {
    $table = "almacen_mprima";
    $response = salidaMprimaModel::mdlDTableSalProdcuctosAlmacen($table);
    return $response;
  }
  //datatable  ingresos en el modal de ingresos productos prima
  public static function ctrVerProductosSalidaModal($codAllSalMprima)
  {
    $table = "salida_mprima";
    $response = salidaMprimaModel::mdlVerProductosSalidaModal($table, $codAllSalMprima);
    return $response;
  }

  //crear ingreso productos a almacen de  productos prima***
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

  //salida de productos a almacen prima
  public static function ctrSalidaProductosAlmacenProd($jsonProductosSalidaProd)
  {
    $dataProductosSalida = json_decode($jsonProductosSalidaProd, true);
    $table = "almacen_mprima";
    //almacenar las operaciones exitosas y poder revertirlas si es necesario
    $operacionesExitosas = [];

    foreach ($dataProductosSalida as $producto) {
      // Verificar datos de productos en almacen antes de restar sera true = valor positivo o false = valor negativo o 0
      $stockAlmacen = self::ctrStockAlmacen($producto["codProdIng"]);
      if ($stockAlmacen === false) {
        //Si no se encuentra el producto, se restaurara los productos que ya se restaron
        foreach ($operacionesExitosas as $operacion) {
          salidaMprimaModel::mdlRestaurarProductosAlmacenProd($table, $operacion);
        }
        return false; // Devuelve falso inmediatamente si es negativo o 0 = falso
      } else {
        // Si el producto es postivo, se resta la cantidad
        $dataRestarProdAlamacen = array(
          "idMprima" => $producto["codProdIng"],
          "cantidadMprimaAlma" => $stockAlmacen["cantidadMprimaAlma"] - $producto["cantidadProdIng"],
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = salidaMprimaModel::mdlRestarProductoAlmacenProd($table, $dataRestarProdAlamacen);
        if (!$response) {
          // Si falla la resta, se restaura los productos que ya se restaron
          foreach ($operacionesExitosas as $operacion) {
            salidaMprimaModel::mdlRestaurarProductosAlmacenProd($table, $operacion);
          }
          return false; // Devuelve falso si falla la actualización
        } else {
          // Si la operación es exitosa, se agrega a la lista de operaciones exitosas
          $operacionesExitosas[] = [
            "idMprima" => $producto["codProdIng"],
            "cantidadMprimaAlma" => $stockAlmacen["cantidadMprimaAlma"], // Guardamos el stock original
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
    $table = "almacen_mprima";
    $response = salidaMprimaModel::mdlStockAlmacen($table, $codProd);
    return $response;
  }

  //crear el registro de salida de productos pirma
  public static function ctrRegistroSalidaProductos($salidaProdData, $jsonProductosSalidaProd)
  {
    $table = "salida_mprima";
    $dataCreate = array(
      "nombreSalMprima" => $salidaProdData["tituloSalProdAdd"],
      "idProcOp" => $salidaProdData["pedidoSalProdAdd"],
      "fechaSalMprima" => $salidaProdData["fechaSalProdAdd"],
      "igvSalMprima" => $salidaProdData["igvIngProdAdd"],
      "subTotalSalMprima" => $salidaProdData["subTotalIngProdAdd"],
      "totalSalMprima" => $salidaProdData["totalIngProdAdd"],
      "salJsonMprima" => $jsonProductosSalidaProd,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = salidaMprimaModel::mdlCrearSalidaProd($table, $dataCreate);
    return $response;
  }
  //fin crear salida productos a almacen de  productos prima***

  //***funciones de edit prima */
  //visualizar datos para editar salida productos prima
  public static function ctrVerDataIngProductos($codSalMprima)
  {
    $codIdSalProd = $codSalMprima;
    $table = "salida_mprima";
    $response = salidaMprimaModel::mdlVerDataSalidaRegistro($table, $codIdSalProd);
    return $response;
  }

  //obtener stock de almacen para visualizar datos para editar salidas productos
  public static function ctrStockAlmacenEdit($codIngProd)
  {
    $codIdIngProd = $codIngProd;
    $table = "almacen_mprima";
    $response = salidaMprimaModel::mdlStockAlmacenEdit($table, $codIdIngProd);
    return $response;
  }

  //editar ingreso productos prima***
  public static function ctrEditarSalidaProd($editarSalProd, $jsonEditarSalProductosForms)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $table = "salida_mprima";
      //eliminar datos innecesarios
      $editProdData = self::ctrBorrarDatosInecesariosSalidaProd($editarSalProd);
      // Eliminar el array $editarIngProd para no duplicar datos
      unset($editarSalProd);
      //registro de productos ingresados a editar / anterior
      $jsonProdSalAnteriorEdit = $editProdData["salidaAnteriorJsonEdit"];
      //actualizar alamacen con los productos a editar se pasa los dos json en anterir registro y el nuevo
      $editarProdIngAlmacen = self::ctrEditarProductosRetiradosAlmacen($jsonProdSalAnteriorEdit, $jsonEditarSalProductosForms);

      //editar registro salida de productos con los datos editados
      $dataUpdate = array(
        "idSalMprima" => $editProdData["codSalMprima"],
        "nombreSalMprima" => $editProdData["tituloSalProdEdit"],
        "idProcOp" => $editProdData["pedidoSalProdEdit"],
        "fechaSalMprima" => $editProdData["fechaSalProdEdit"],
        "igvSalMprima" => $editProdData["igvIngProdAdd"],
        "subTotalSalMprima" => $editProdData["subTotalIngProdAdd"],
        "totalSalMprima" => $editProdData["totalIngProdAdd"],
        "salJsonMprima" => $jsonEditarSalProductosForms,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      $response = salidaMprimaModel::mdlEditarSalidaProd($table, $dataUpdate);
    } else {
      $response = "error";
    }
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos al editar un registro de ingreso prima
  public static function ctrEditarProductosRetiradosAlmacen($jsonProdSalAnteriorEdit, $jsonEditarSalProductosForms)
  {

    $table = "almacen_mprima";

    $dataProducSalAnterior = json_decode($jsonProdSalAnteriorEdit, true);
    $dataProducSalNuevo = json_decode($jsonEditarSalProductosForms, true);

    $dataSumaAlmacen = [];
    $dataRestaAlmacen = [];
    $dataNuevoRestAlmacen = [];
    $dataDeleteSumAlmacen = [];
    $dataFiltroIgual = [];
    $dataCeroAlmacen = []; // Nuevo array para productos con cantidad nueva en 0 o ""

    // Convertir cantidades a números
    foreach ($dataProducSalAnterior as &$producto) {
      $producto["cantidadProdIng"] = (int) $producto["cantidadProdIng"];
    }
    unset($producto); // Romper la referencia

    foreach ($dataProducSalNuevo as &$producto) {
      $producto["cantidadProdIng"] = (int) $producto["cantidadProdIng"];
    }
    unset($producto); // Romper la referencia

    // Indexar productos antiguos y nuevos por su código
    $productosAntiguosIndexados = [];
    foreach ($dataProducSalAnterior as $productoAntiguo) {
      $productosAntiguosIndexados[$productoAntiguo["codProdIng"]] = $productoAntiguo;
    }

    $productosNuevosIndexados = [];
    foreach ($dataProducSalNuevo as $productoNuevo) {
      $productosNuevosIndexados[$productoNuevo["codProdIng"]] = $productoNuevo;
    }

    // Comparar productos antiguos y nuevos
    foreach ($dataProducSalNuevo as $productoNuevo) {
      $codProdIng = $productoNuevo["codProdIng"];
      if (isset($productosAntiguosIndexados[$codProdIng])) {
        $productoAntiguo = $productosAntiguosIndexados[$codProdIng];
        if ($productoNuevo["cantidadProdIng"] == 0) {
          $dataCeroAlmacen[] = $productoAntiguo; // Guardar el producto antiguo si la cantidad nueva es 0
        } elseif ($productoNuevo["cantidadProdIng"] > $productoAntiguo["cantidadProdIng"]) {
          $dataRestaAlmacen[] = $productoNuevo;
        } elseif ($productoNuevo["cantidadProdIng"] < $productoAntiguo["cantidadProdIng"]) {
          $dataSumaAlmacen[] = $productoNuevo;
        } else {
          $dataFiltroIgual[] = $productoNuevo;
        }
      } else {
        $dataNuevoRestAlmacen[] = $productoNuevo;
      }
    }

    foreach ($dataProducSalAnterior as $productoAntiguo) {
      $codProdIng = $productoAntiguo["codProdIng"];
      if (!isset($productosNuevosIndexados[$codProdIng])) {
        $dataDeleteSumAlmacen[] = $productoAntiguo;
      }
    }

    // Procesar productos para sumar al almacén
    foreach ($dataSumaAlmacen as $producto) {

      //cantidad antes de editar
      $prodEncontrado = null;

      foreach ($productosAntiguosIndexados as $item) {
        if ($item["codProdIng"] === $producto["codProdIng"]) {
          $prodEncontrado = $item;
          break; // Rompe el bucle una vez encontrado el producto
        }
      }

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];// stock ya retirado
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular la cantidad a sumar al almacén
      $cantidadAsumar = $cantidadAnte - $ajusteStock;

      // Calcular el nuevo stock
      $nuevoStock = $stockActual + $cantidadAsumar;

      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos para restar del almacén
    foreach ($dataRestaAlmacen as $producto) {

      //cantidad antes de editar
      $prodEncontrado = null;

      foreach ($productosAntiguosIndexados as $item) {
        if ($item["codProdIng"] === $producto["codProdIng"]) {
          $prodEncontrado = $item;
          break; // Rompe el bucle una vez encontrado el producto
        }
      }

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);

      $stockActual = $stockAlmacen["cantidadMprimaAlma"];// stock actual n
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];// stock ya retirado
      // ajuste de stock es la suma la cantidad anterior y la cantidad actual ya sumada desde el usuario
      $ajusteStock = $producto["cantidadProdIng"];// stock a restar -n

      // Calcular la cantidad a retirar del almacén
      $cantidadARetirar = $ajusteStock - $cantidadAnte;

      // Calcular el nuevo stock
      $nuevoStock = $stockActual - $cantidadARetirar;

      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos nuevos
    foreach ($dataNuevoRestAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual - $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos eliminados
    foreach ($dataDeleteSumAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual + $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos que inserta en 0
    foreach ($dataCeroAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual + $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //fin editar salida productos***

  //**** borar salida productos prima
  //borrar salida productos prima
  public static function ctrBorrarSalProductos($borrarSalProductos)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $codSalProd = $borrarSalProductos["codSalMprima"];
      $table = "salida_mprima";
      //obtener el registro de productos 
      $productosRegistradosSalida = self::ctrRecuperarProductosRegSalida($codSalProd);
      //devolver productos restados del alamcen por el registro de salida +++
      $sumarProdAlmacen = self::ctrSumarProductosRestadosDelAlmacen($productosRegistradosSalida["salJsonMprima"]);
      //eliminar registro de ingreso de productos
      $response = salidaMprimaModel::mdlBorrarRegistroIngresProducto($table, $codSalProd);
    } else {
      $response = "error";
    }
    return $response;
  }

  //obtener el registro de productos salida prima
  public static function ctrRecuperarProductosRegSalida($codSalProd)
  {
    $table = "salida_mprima";
    //recuperar los productos registrados en la salida
    $response = salidaMprimaModel::mdlRecuperarProductosRegSalida($table, $codSalProd);
    return $response;
  }

  //editar / cantidades de productos retirados por el registro de salida de productos al eliminar un registro de salida prima
  public static function ctrSumarProductosRestadosDelAlmacen($productosRegistradosSalida)
  {
    $dataProductosSal = json_decode($productosRegistradosSalida, true);
    $table = "almacen_mprima";

    foreach ($dataProductosSal as $producto) {
      //Obtener el stock de productos en almacen
      $stockAlmacen = self::ctrStockAlmacenSalida($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadMprimaAlma"];
      $ajusteStock = $producto["cantidadProdIng"];

      // Verificar si el valor es vacío y asignar "0" si es el caso
      if ($ajusteStock === "") {
        $ajusteStock = "0";
      }

      // Calcular nuevo stock
      $nuevoStock = $stockActual + $ajusteStock;

      // Preparar datos para actualizar
      $dataActualizarProdAlamacen = array(
        "idMprima" => $producto["codProdIng"],
        "cantidadMprimaAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      // Actualizar productos en almacen
      $response = salidaMprimaModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    return $response;
  }
  //Obtener el stock de productos en almacen prima
  public static function ctrStockAlmacenSalida($codProd)
  {
    $table = "almacen_mprima";
    $response = salidaMprimaModel::mdlStockAlmacenSalida($table, $codProd);
    return $response;
  }

  //****fin borar salida productos

  //Agregar Producto de almacen ala salida prima
  public static function ctrAgregarSalProducto($codSalProducto)
  {
    $table = 'almacen_mprima';
    $response = salidaMprimaModel::mdlAgregarSalProducto($table, $codSalProducto);
    return $response;
  }


}
