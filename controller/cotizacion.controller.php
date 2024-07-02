<?php
date_default_timezone_set('America/Bogota');

class CotizacionController
{
  // Mostrar todos los productos
  public static function ctrDTableCotizaciones()
  {
    $table = "cotizacion";
    $response = CotizacionModel::mdlDTableCotizaciones($table);
    return $response;
  }

  // Crear nueva cotizacion
  public static function ctrCrearCotizacion($crearCotizacion, $jsonProductosCotizacion, $jsonProductosPrimaCotizacion)
  {
    // Eliminar datos innecesarios
    $cotizacionData = self::ctrBorrarDatosInecesarios($crearCotizacion);
    // Eliminar el array $crearCotizacion para no duplicar datos
    unset($crearCotizacion);

    $table = "cotizacion";
    $dataCreate = array(
      "tituloCoti" => $cotizacionData["tituloCotiAdd"],
      "fechaCoti" => $cotizacionData["fechaCotiAdd"],
      "razonSocialCoti" => $cotizacionData["razonSocialCotiAdd"],
      "nombreComercialCoti" => $cotizacionData["nombreComercialCotiAdd"],
      "rucCoti" => $cotizacionData["rucCotiAdd"],
      "nombreCoti" => $cotizacionData["nombreCotiAdd"],
      "celularCoti" => $cotizacionData["celularCotiAdd"],
      "correoCoti" => $cotizacionData["correoCotiAdd"],
      "direccionCoti" => $cotizacionData["direccionCotiAdd"],
      "detalleCoti" => $cotizacionData["detalleCotiAdd"],
      "productsCoti" => $jsonProductosCotizacion,
      "productsMprimaCoti" => $jsonProductosPrimaCotizacion,
      "totalProductsCoti" => $cotizacionData["totalProdCotiAdd"],
      "totalProductsMprimaCoti" => $cotizacionData["totalProdMprimaCotiAdd"],
      "igvCoti" => $cotizacionData["igvCotizacionAdd"],
      "subTotalCoti" => $cotizacionData["subTotalCotizacionAdd"],
      "totalCoti" => $cotizacionData["totalCotizacionAdd"],
      "estadoCoti" => 1,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = CotizacionModel::mdlCrearCrearCotizacion($table, $dataCreate);

    return $response;
  }
  //verificar si el nombre de Producto existe
  public static function ctrBorrarDatosInecesarios($crearCotizacion)
  {
    //datos recolectados por la primera funcion de recoleccion de datos 
    //datos repetidos incesarios y sin estructura
    //datos del primer producto  ubicado por la funcion
    unset($crearCotizacion["codProdCoti"]);
    unset($crearCotizacion["nombreProdCoti"]);
    unset($crearCotizacion["unidadProdCoti"]);
    unset($crearCotizacion["cantidadProdCoti"]);
    unset($crearCotizacion["precioProdCoti"]);
    //datos del primer producto prima ubicado por la funcion
    unset($crearCotizacion["codProdMprimaCoti"]);
    unset($crearCotizacion["nombreProdMprimaCoti"]);
    unset($crearCotizacion["unidadProdMprimaCoti"]);
    unset($crearCotizacion["cantidadProdMprimaCoti"]);
    unset($crearCotizacion["precioProdMprimaCoti"]);
    $response = $crearCotizacion;
    return $response;
  }


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

      $response = CotizacionModel::mdlEditProduct($table, $dataUpdate);
      return $response;
    }
  }
  // Eliminar cotizacion
  public static function ctrDeleteCotizacion($borrarCotizacion)
  {
    $codCoti = $borrarCotizacion["codCoti"];
    $table = "cotizacion";
    $response = CotizacionModel::mdlDeleteCotizacion($table, $codCoti);

    return $response;
  }

  //Agregar Producto a la cotizacion
  public static function ctrAgregarProductoCoti($codProductoCoti)
  {
    $table = 'producto';
    $response = CotizacionModel::AgregarProductoCoti($table, $codProductoCoti);
    return $response;
  }

  //Agregar Producto Mprima a la cotizacion
  public static function ctrAgregarProductoMprimaCoti($codProductoMprimaCoti)
  {
    $table = 'materia_prima';
    $response = CotizacionModel::AgregarProductoMprimaCoti($table, $codProductoMprimaCoti);
    return $response;
  }

  //  Descargar PDF de la cotizacion
  public static function ctrDescargarPdfCotizacion($codCotiPdf)
  {
    $codCoti = $codCotiPdf["codCoti"];
    $table = "cotizacion";
    $response = CotizacionModel::mdlDescargarPdfCotizacion($table, $codCoti);

    return $response;
  }

}
