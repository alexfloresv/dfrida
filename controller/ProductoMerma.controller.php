<?php
date_default_timezone_set('America/Bogota');

class ProductoMermaController
{
    //datatable de prodcucto mermas
   public static function ctrDTableProductoMerma()
   {
     $table = "prod_merma";
     $response = ProductoMermaModel::mdlDTableProductoMerma($table);
     return $response;
   }

  //funcion para traer la merma aprobada al selct 2
  public static function ctrViewDataMermaConfirmada()
  {
    $table = "merma";
    $response = ProductoMermaModel::mdlDTableMerma($table);
    return $response;
  }
  //funcion para trear los productos de la merma aprobada
  public static function ctrAceptarMermaConfirmada($codMermaConfir)
  {
    $table = "merma";
    $response = ProductoMermaModel::mdlAceptarMermaConfirmada($table, $codMermaConfir);
    return $response;
  }

  //funcion para traer productos merma del catalogo al selct 2
  public static function ctrViewDataProdMermaCatalogo()
  {
    $table = "producto";
    $response = ProductoMermaModel::mdlViewDataProdMermaCatalogo($table);
    return $response;
  }
  //funcion para trear los productos de catalogo para llnarlo en el campo de producto merma
  public static function ctrProductoMermaCatalogo($codProdCatal)
  {
    $table = "producto";
    $response = ProductoMermaModel::mdlProductoMermaCatalogo($table, $codProdCatal);
    return $response;
  }

  //**funciones para crear registro de producto merma y productos merma y agregarlo al almacen
  public static function CrearRegProdMerma($jsonCrearRegistroMerma, $jsonProdMerma, $jsonMprimaMerma)
  {
    //formulario
    $dataFormProdMerma = self::eliminarDatosInecesarios($jsonCrearRegistroMerma);
    unset($jsonCrearRegistroMerma);
    //productos merma
    $dataProdMermaNew = json_decode($jsonProdMerma, true);
    //productos prima mermados agregados
    $dataMprimaMerma = json_decode($jsonMprimaMerma, true);

    //crear registro de mprima Merma
    $mPrimaMerma = self::ctrCrearRegistroMprimaMerma($dataMprimaMerma);
    //crear registro de producto merma si no existe
    if ($mPrimaMerma) {
      //crear productos editado con id para el ingreso al almacen
      $crearProductosNuevos = self::crearProdMermaNuevo($dataProdMermaNew);
      //registro de producto merma
      $registroProdMerma = self::crearRegistroProdMerma($dataFormProdMerma, $crearProductosNuevos, $dataProdMermaNew);

      if ($registroProdMerma == "ok") {
        //agreagar productos creados al almacen
        $newStock = self::agregarProductosAlmacen($crearProductosNuevos);
        if ($newStock) {

          //si es correcto la insercio al almacen es true// sino es false
          //devuelve el ok del registro de producto merma
          return $registroProdMerma;
        }
      }
    }
    //ok//error
    //return $registroProdMerma;
  }
  //fin funcion

  //crear registro de producto merma en su tabla
  public static function crearRegistroProdMerma($dataFormProdMerma, $crearProductosNuevos, $dataProdMermaNew)
  {

    $jsonProductos = json_encode($crearProductosNuevos);

    $jsonMermaPrima = json_encode($dataProdMermaNew);

    $table = "prod_merma";

    $dataCreate = array(
      'descripcionProdMerma' => $dataFormProdMerma['nombreProdMerma'],
      'fechaProdMerma' => $dataFormProdMerma['fechaProdMerma'],
      'totalProdMerma' => $dataFormProdMerma['totalProdMerma'],
      'totalMerma' => $dataFormProdMerma['totalMerma'],
      'estadoProdMerma' => 1,
      'jsonProdMerma' => $jsonProductos,
      'jsonMerma' => $jsonMermaPrima,
      'DateCreate' => date("Y-m-d\TH:i:sP"),
    );

    $response = ProductoMermaModel::mdlCrearRegProdMerma($table, $dataCreate);
    return $response;
  }
  //fin funcion

  //agreagar productos creados al almacen
  public static function agregarProductosAlmacen($crearProductosNuevos)
  {
    $jsonProductosIngProd = json_encode($crearProductosNuevos);

    $response = ingresoProdController::ctrIngresarProductosAlmacenProd($jsonProductosIngProd);

    return $response;
  }
  //fin

  //eliminar datos innecesarios del formulario
  public static function eliminarDatosInecesarios($jsonCrearRegistroMerma)
  {
    // Decodificar el JSON para convertirlo en un array asociativo
    $dataFormProdMerma = json_decode($jsonCrearRegistroMerma, true);

    // Extraer los datos específicos
    $nuevoArray = [
      "nombreProdMerma" => $dataFormProdMerma["nombreProdMerma"],
      "fechaProdMerma" => $dataFormProdMerma["fechaProdMerma"],
      "totalProdMerma" => $dataFormProdMerma["totalProdMerma"],
      "totalMerma" => $dataFormProdMerma["totalMerma"]
    ];

    // Retornar el nuevo array
    return $nuevoArray;
  }

  //crear registro de mprima Merma
  public static function ctrCrearRegistroMprimaMerma($dataMprimaMerma)
  {
    // Variable para almacenar el último estado de actualización
    $updateEstadoMermaMprima = false;

    // Variable para validar el codMerma
    $validar = null;

    // Iterar sobre cada array dentro de dataMprimaMerma para buscar el codMerma
    foreach ($dataMprimaMerma as $data) {
      // Obtener el codMerma del array actual
      $codMerma = $data["codMerma"];

      // Comparar el codMerma con la variable acumuladora
      if ($validar !== $codMerma) {
        // Enviar el dato a la función para obtenr el json de merma aceptada
        $jsonMermaAceptada = self::obtenerMermaConfirmada($codMerma);

        // Guardar el codMerma en la variable acumuladora
        $validar = $codMerma;

        // Crear un nuevo array temporal para almacenar los arrays coincidentes
        $arraysCoincidentes = [];

        // Buscar todos los arrays que tengan el mismo codMerma
        foreach ($dataMprimaMerma as $item) {
          if ($item["codMerma"] === $codMerma) {
            $arraysCoincidentes[] = $item;
          }
        }

        // Enviar el nuevo array temporal a la función para actualizar los estados
        $updateEstadoMermaMprima = self::actualizarEstadosMermaMprima($jsonMermaAceptada, $arraysCoincidentes, $codMerma);


        // Si la función devuelve true, continuar con la siguiente iteración
        if ($updateEstadoMermaMprima) {
          $arraysCoincidentes = null;
          //camiar estado a merma si todos los datos del array es
          continue;
        }
      } else {
        continue;
      }
    }

    // Devolver el último estado de actualización
    return $updateEstadoMermaMprima;
  }
  //obtener registro de merma aceptada
  public static function obtenerMermaConfirmada($codMerma)
  {
    $idMerma = $codMerma;
    $table = "merma";
    $jsonMerma = ProductoMermaModel::obtenerMermaConfirmada($table, $idMerma);
    return $jsonMerma;
  }
  //funcion para actualizar los estados del registro recuperado dela merma
  public static function actualizarEstadosMermaMprima($jsonMermaAceptada, $dataMprimaMerma, $codMerma)
  {
    // Decodificar los JSON para convertirlos en arrays
    $dataMermaAceptada = json_decode($jsonMermaAceptada["jsonMerma"], true);

    // Array para almacenar los registros modificados
    $newData = [];

    // Iterar sobre cada registro en dataMprimaMerma
    foreach ($dataMprimaMerma as $mprimaMerma) {
      $codProdIng = $mprimaMerma['codProdIng'];
      $found = false;

      // Buscar el registro correspondiente en dataMermaAceptada
      foreach ($dataMermaAceptada as $aceptada) {
        if ($aceptada['codProdIng'] === $codProdIng) {
          $found = true;
          // Comparar el mermaDesechoEstado
          if ($aceptada['mermaDesechoEstado'] !== $mprimaMerma['mermaDesechoEstado']) {
            // Agregar el registro modificado al nuevo array
            $newData[] = $mprimaMerma;
          } else {
            // Agregar el registro sin modificar al nuevo array
            $newData[] = $aceptada;
          }
          break;
        }
      }

      // Si no se encontró el registro en dataMermaAceptada, agregar el registro modificado
      if (!$found) {
        $newData[] = $mprimaMerma;
      }
    }

    // Agregar los registros de dataMermaAceptada que no están en dataMprimaMerma
    foreach ($dataMermaAceptada as $aceptada) {
      $found = false;
      foreach ($dataMprimaMerma as $mprimaMerma) {
        if ($aceptada['codProdIng'] === $mprimaMerma['codProdIng']) {
          $found = true;
          break;
        }
      }
      if (!$found) {
        $newData[] = $aceptada;
      }
    }

    // Crear un nuevo array asociativo con la estructura estandarizada
    $standardizedData = [];
    foreach ($newData as $index => $item) {
      $standardizedData["merma" . $index] = $item;
    }

    // Convertir el nuevo array a JSON
    $newJson = json_encode($standardizedData);

    // Actualizar registro JSON de la merma en la base de datos
    $response = self::updateBaseDeDatos($codMerma, $newJson);

    //limpiar arrays temporales
    $newData = null;
    $standardizedData = null;
    $newJson = null;
    //verificar si el registro merma tiene toda la merma utilizada por el estado ya modificado para cambiar el esdo del registro si es el caso
    if ($response) {
      $UpdateMermaAllJson = self::verificarEstadoMprimaMerma($codMerma);
      if ($UpdateMermaAllJson) {
        return $response;
      }
    }
    return $response;
  }
  //fin funcion

  //verificar si el registro merma tiene toda la merma utilizada por el estado ya modificado
  public static function verificarEstadoMprimaMerma($codMerma)
  {
    // Obtener el registro actualizado
    $jsonModificado = self::obtenerMermaConfirmada($codMerma);

    // Decodificar el JSON para convertirlo en un array de arrays
    $mermaJsonMprima = json_decode($jsonModificado["jsonMerma"], true);

    // Verificar si todos los valores de mermaDesechoEstado son 2
    foreach ($mermaJsonMprima as $item) {
      if ($item['mermaDesechoEstado'] != 2) {
        // Si al menos uno no es 2, retornar false
        return true;
      }
    }

    // Si todos son 2, llamar a la función del modelo

    //actualizar estado de la merma si toda la merma esta utilizada
    $table = "merma";
    
    $dataUpdate = array(
      'idMerma' => $codMerma,
      'estadoMerma' => 3,
      'DateUpdate' => date("Y-m-d\TH:i:sP"),
    );

    $response = ProductoMermaModel::mdlAcualizarEstadoMermaSitodaLaMermaEstaUtlizada($table, $dataUpdate);

    // Retornar el resultado de la función del modelo
    return $response;
  }

  //actualizar registro json de la merma base de datos //
  public static function updateBaseDeDatos($codMerma, $newJson)
  {
    $table = "merma";

    $dataUpdate = array(
      'idMerma' => $codMerma,
      'jsonMerma' => $newJson,
      'DateUpdate' => date("Y-m-d\TH:i:sP"),
    );

    $response = ProductoMermaModel::mdlUpdateBaseDeDatos($table, $dataUpdate);
    return $response;
    //true// false
  }
  //fin funcion

  //registrar producto nuevo si es el caso
  public static function crearProdMermaNuevo($dataProdMermaNew)
  {

    // Recorrer cada array dentro de $dataProdMermaNew
    foreach ($dataProdMermaNew as &$item) {
      // Verificar si el array contiene la clave 'codProdIng'
      if (isset($item['codProdIng'])) {
        // Enviar el valor de 'codProdIng' a la función para verificar si el producto existe
        $verificarProdExitente = self::verificarProdExitente($item['codProdIng']);
        if ($verificarProdExitente) {
          // Si el producto existe, continuar con el siguiente array en el foreach
          continue;
        } else {
          // Crear producto nuevo si no existe
          $table = "producto";
          $dataCreate = array(
            'nombreProd' => $item['nombreProdIng'],
            'codigoProd' => $item['codigoProdIng'],
            'unidadProd' => $item['unidadProdIng'],
            'precioProd' => $item['precioProdIng'],
            'DateCreate' => date("Y-m-d\TH:i:sP"),
          );

          $createProdMerma = ProductoMermaModel::crearNuevoProductoMerma($table, $dataCreate);
          if ($createProdMerma) {
            // Recuperar ID del producto recién creado
            $IdProd = ProductoMermaModel::recuperarIdProdCreado($table);
            // Convertir el ID recuperado a texto y agregarlo al array
            $item['codProdIng'] = strval($IdProd['idProd']);
          } else {
            // Manejar el caso en que la creación del producto falle
            return false;
          }
        }
      }
    }
    //devolver el array con los productos nuevos agregados en codProdIng del json
    return $dataProdMermaNew;
  }
  //fin funcion

  //verificar si el producto existe
  public static function verificarProdExitente($codProdIng)
  {
    $idProd = $codProdIng;
    $table = "producto";
    $response = ProductoMermaModel::mdlVerificarProdExitente($table, $idProd);
    return $response;
  }
  //fin

  //fin funciones crear producto merma **
}
