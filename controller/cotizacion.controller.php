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
  // Mostrar todos las cotizaciones no asignadas
  public static function ctrDTableCotizacionesSinAsignarPedidos()
  {
    $table = "cotizacion";
    $response = CotizacionModel::mdlDTableCotizacionesSinAsignarPedidos($table);
    return $response;
  }

  // Crear nueva cotizacion
  public static function ctrCrearCotizacion($crearCotizacion, $jsonProductosCotizacion)
  {
    // Guardar el valor de esClienteNuevo
    $esClienteNuevo = $crearCotizacion["esClienteNuevo"];

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
      "totalProductsCoti" => $cotizacionData["totalProdCotiAdd"],
      "igvCoti" => $cotizacionData["igvCotizacionAdd"],
      "subTotalCoti" => $cotizacionData["subTotalCotizacionAdd"],
      "totalCoti" => $cotizacionData["totalCotizacionAdd"],
      "estadoCoti" => 1,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
      "esClienteNuevo" => $esClienteNuevo // Agregar el valor de esClienteNuevo
    );
    $response = CotizacionModel::mdlCrearCrearCotizacion($table, $dataCreate);
    if ($response == "ok" && $esClienteNuevo == true) {
      // Crear un nuevo cliente
      $clienteNuevo = array(
        "Ru" => $cotizacionData["rucCotiAdd"],
        "razonSocial" => $cotizacionData["razonSocialCotiAdd"],
        "NameCli" => $cotizacionData["nombreCotiAdd"],
        "EmailCli" => $cotizacionData["correoCotiAdd"],
        "AddressCli" => $cotizacionData["direccionCotiAdd"],
        "PhoneCli" => $cotizacionData["celularCotiAdd"],
        "DetallCli" => "Sin Observaciones",
      );
      $response = ClientsController::ctrCreateClient($clienteNuevo);
    }

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
    //cambiar estado de la cotizacion al descargar
    //$newEstadoCoti = self::ctrEstadoDescargaPdfCotizacion($codCoti);
    $table = "cotizacion";
    $response = CotizacionModel::mdlDescargarPdfCotizacion($table, $codCoti);

    return $response;
  }

  //cambiar estado de la cotizacion al descargar
  public static function ctrEstadoDescargaPdfCotizacion($codCoti)
  {
    $table = "cotizacion";
    $response = CotizacionModel::mdlEstadoDescargaPdfCotizacion($table, $codCoti);
    return $response;
  }
  // cambiar el estado de cotizacion cuando se le asigne a un pedido
  public static function ctrActualizarEstadoAsignacionCoti($codcoti, $estado)
  {

    $table = "cotizacion";
    $dataActualizarEstado = array(
      "idCoti" => $codcoti,
      "estadoCoti" => $estado,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = CotizacionModel::mdlActualizarEstadoAsignacionCoti($table, $dataActualizarEstado);

    return $response;
  }
  public static function ctrEditarCotizacion($jsonCotizacionEditar)
  {
    // Agregar la fecha actual en el formato requerido
    $currentDateTime = date('Y-m-d H:i:s');
    $jsonCotizacionEditar['DateUpdate'] = $currentDateTime;

    // Convertir los datos de productsCoti y productsMprimaCoti a formato JSON
    $jsonCotizacionEditar['productsCoti'] = json_encode($jsonCotizacionEditar['productsCoti']);

    $table = "cotizacion";
    $response = CotizacionModel::mdlEditarCotizacion($table, $jsonCotizacionEditar);
    return $response;
  }
}
