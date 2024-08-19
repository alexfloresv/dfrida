<?php
date_default_timezone_set('America/Bogota');

class ProductoMermaController
{
  //datatable de produccion
  /*  public static function ctrDTableMerma()
   {
     $table = "merma";
     $response = ProductoMermaModel::mdlDTableMerma($table);
     return $response;
   } */

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

  //**funcion para crear registro de producto merma y producto merma y agregarlo al almacen
  public static function CrearRegProdMerma($jsonCrearRegistroMerma, $jsonProdMerma, $jsonMprimaMerma)
  {
    //formulario
    $dataFormProdMerma = self::eliminarDatosInecesarios($jsonCrearRegistroMerma);
    //productos merma
    $dataProdMremaNew = json_decode($jsonProdMerma, true);
    //productos prima mermados agregados
    $dataMprimaMerma = json_decode($jsonMprimaMerma, true);

    //crear registro de mprima Merma
    $mPrimaMerma = self::ctrCrearRegistroMprimaMerma($dataMprimaMerma);
    //crear registro de producto merma si no existe
    if ($mPrimaMerma) {
      $crearProductosNuevos = self::crearProdMermaNuevo($dataProdMremaNew);

    }
    //crear registro de producto merma en su tabla y despues agregarlo al almacen
    $table = "producto";
    $response = ProductoMermaModel::mdlProductoMermaCatalogo($table);
    return $response;
  }

  //eliminar datos innecesarios del formulario
  public static function eliminarDatosInecesarios($jsonCrearRegistroMerma)
  {
    // Decodificar el JSON para convertirlo en un array
    $dataFormProdMerma = json_decode($jsonCrearRegistroMerma, true);

    $nuevoArray = [];

    // Recorrer el array original y extraer los datos específicos
    foreach ($dataFormProdMerma as $item) {
      $nuevoArray[] = [
        "nombreProdMerma" => $item["nombreProdMerma"],
        "fechaProdMerma" => $item["fechaProdMerma"],
        "totalProdMerma" => $item["totalProdMerma"],
        "totalMerma" => $item["totalMerma"]
      ];
    }
    unset($dataFormProdMerma);
    // Retornar el nuevo array
    return $nuevoArray;
  }

  //crear registro de mprima Merma
  public static function ctrCrearRegistroMprimaMerma($dataMprimaMerma)
  {
    //id de merma aceptada
    $validar = null;

    // Iterar sobre cada array dentro de dataMprimaMerma para buscar el codMerma cada json tiene este dato sirve para buscar el registro correcto
    foreach ($dataMprimaMerma as $data) {
      // Obtener el codMerma del array actual
      $codMerma = $data["codMerma"];

      // Comparar el codMerma con la variable acumuladora si este dato es igual no envia nada pero si no es igual envia el dato e inia la funcion
      if ($validar !== $codMerma) {
        // Enviar el dato a la función para obtenr el json de merma aceptada
        $jsonMermaAceptada = self::obtenerMermaConfirmada($codMerma);

        // Guardar el codMerma en la variable acumuladora
        $validar = $codMerma;

        //funcion para actualizar los estados del registro recuperado dela merma
        $updateEstadoMermaMprima = self::actualizarEstadosMermaMprima($jsonMermaAceptada, $dataMprimaMerma, $codMerma);
        //fin
      }
    }
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
    $dataMermaAceptada = json_decode($jsonMermaAceptada, true);


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

    // Convertir el nuevo array a JSON
    $newJson = json_encode($newData);

    //actualizar registro json de la merma base de datos //
    $response = self::updateBaseDeDatos($codMerma, $newJson);
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
  public static function crearProdMermaNuevo($dataProdMremaNew)
  {
    //verificar y crear el nuevo registro de producto nuevo si es el caso y recuperar sus id del nuevo producto creado en la tabla producto


  }
  //fin funcion
  
  //fin funcion crear producto merma **
}
