<?php
date_default_timezone_set('America/Bogota');

class salidaProdController
{
  //datatable de ingresos productos
  public static function ctrDTableSalProdcuctos()
  {
    $table = "salida_prod";
    $response = salidaProdModel::mdlmdlDTableSalProdcuctos($table);
    return $response;
  }
  //datatable de salidas productos alamcen modal
  public static function ctrDTableSalProdcuctosAlmacen()
  {
    $table = "almacen_prod";
    $response = salidaProdModel::mdlDTableSalProdcuctosAlmacen($table);
    return $response;
  }
  //datatable  ingresos en el modal de ingresos productos
  public static function ctrVerProductosSalidaModal($codAllSalProd)
  {
    $table = "salida_prod";
    $response = salidaProdModel::mdlVerProductosSalidaModal($table, $codAllSalProd);
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

  //editar ingreso productos***
  public static function ctrEditarSalidaProd($editarSalProd, $jsonEditarSalProductosForms)
  {
    //verificar si el usuario es administrador
    if ($_SESSION["idTipoUsu"] == 1) {
      $table = "salida_prod";
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
        "idSalProd" => $editProdData["codSalProd"],
        "nombreSalProd" => $editProdData["tituloSalProdEdit"],
        "idPedido" => $editProdData["pedidoSalProdEdit"],
        "fechaSalProd" => $editProdData["fechaSalProdEdit"],
        "igvSalProd" => $editProdData["igvIngProdAdd"],
        "subTotalSalProd" => $editProdData["subTotalIngProdAdd"],
        "totalSalProd" => $editProdData["totalIngProdAdd"],
        "salJsonProd" => $jsonEditarSalProductosForms,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );

      $response = salidaProdModel::mdlEditarSalidaProd($table, $dataUpdate);
    } else {
      $response = "error";
    }
    return $response;
  }

  //editar / cantidades de productos ingresados al alamcen de productos al editar un registro de ingreso
  public static function ctrEditarProductosRetiradosAlmacen($jsonProdSalAnteriorEdit, $jsonEditarSalProductosForms)
  {

    $table = "almacen_prod";

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
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];// stock ya retirado
      $ajusteStock = $producto["cantidadProdIng"];

      // Calcular la cantidad a sumar al almacén
      $cantidadAsumar = $cantidadAnte - $ajusteStock;

      // Calcular el nuevo stock
      $nuevoStock = $stockActual + $cantidadAsumar;

      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
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

      $stockActual = $stockAlmacen["cantidadProdAlma"];// stock actual n
      $cantidadAnte = $prodEncontrado["cantidadProdIng"];// stock ya retirado
      // ajuste de stock es la suma la cantidad anterior y la cantidad actual ya sumada desde el usuario
      $ajusteStock = $producto["cantidadProdIng"];// stock a restar -n

      // Calcular la cantidad a retirar del almacén
      $cantidadARetirar = $ajusteStock - $cantidadAnte;

      // Calcular el nuevo stock
      $nuevoStock = $stockActual - $cantidadARetirar;

      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos nuevos
    foreach ($dataNuevoRestAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual - $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos eliminados
    foreach ($dataDeleteSumAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual + $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }

    // Procesar productos que inserta en 0
    foreach ($dataCeroAlmacen as $producto) {

      $stockAlmacen = self::ctrStockAlmacenEdit($producto["codProdIng"]);
      $stockActual = $stockAlmacen["cantidadProdAlma"];
      $ajusteStock = $producto["cantidadProdIng"];
      $nuevoStock = $stockActual + $ajusteStock;

      $dataActualizarProdAlamacen = array(
        "idProd" => $producto["codProdIng"],
        "cantidadProdAlma" => $nuevoStock,
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = salidaProdModel::mdlActualizarProductosIngresados($table, $dataActualizarProdAlamacen);
    }
    //verificar si es verdadero o falso para editar el registro
    if (is_array($dataFiltroIgual) && !empty($dataFiltroIgual)) {
      return true;
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

      // Verificar si el valor es vacío y asignar "0" si es el caso
      if ($ajusteStock === "") {
        $ajusteStock = "0";
      }

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
    $table = 'almacen_prod';
    $response = salidaProdModel::mdlAgregarSalProducto($table, $codSalProducto);
    return $response;
  }


}
