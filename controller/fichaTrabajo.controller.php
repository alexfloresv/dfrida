<?php
date_default_timezone_set('America/Bogota');

class FichaTrabajoController
{
  // Mostrar todos los productos
  public static function ctrDTableFrichasTrabajo()
  {
    $table = "ficha_proceso";
    $response = FichaTrabajoModel::mdlDTableFrichasTrabajo($table);
    return $response;
  }

  //visualizar procesos en el modal de procesos trabajo
  public static function ctrVerProcesosTrabajo($codFichTrab)
  {
    $table = "ficha_proceso";
    $response = FichaTrabajoModel::mdlVerProcesosTrabajo($table, $codFichTrab);
    return $response;
  }

  //  crear ficha Trabajo
  public static function ctrCrearFichaTrabajo($CrearProcesoTrabajo, $jsonProcesosTrabajo)
  {
    // Eliminar datos innecesarios
    $procesoTrabajoData = self::ctrBorrarDatosInecesarios($CrearProcesoTrabajo);
    // Eliminar el array $crearCotizacion para no duplicar datos
    unset($CrearProcesoTrabajo);

    $table = "ficha_proceso";
    $dataCreate = array(
      "tituloFichaProc" => $procesoTrabajoData["tituloProcesAdd"],
      "productoFichaProc" => $procesoTrabajoData["productoFichaProcAdd"],
      "detalleFichaProc" => $procesoTrabajoData["detalleFichaProcAdd"],
      "procesoFichaProcJson" => $jsonProcesosTrabajo,
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = FichaTrabajoModel::mdCrearFichaTrabajo($table, $dataCreate);

    return $response;
  }
  //verificar si el nombre de Producto existe
  public static function ctrBorrarDatosInecesarios($CrearProcesoTrabajo)
  {

    unset($CrearProcesoTrabajo["procesosAdd"]);
    unset($CrearProcesoTrabajo["tiempoAdd"]);
    unset($CrearProcesoTrabajo["observacionAdd"]);


    $response = $CrearProcesoTrabajo;
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

      $response = FichaTrabajoModel::mdlEditProduct($table, $dataUpdate);
      return $response;
    }
  }
  // Eliminar cotizacion
  public static function ctrDeleteCotizacion($borrarCotizacion)
  {
    $codCoti = $borrarCotizacion["codCoti"];
    $table = "cotizacion";
    $response = FichaTrabajoModel::mdlDeleteCotizacion($table, $codCoti);

    return $response;
  }

  //Agregar Producto a la cotizacion
  public static function ctrAgregarProductoCoti($codProductoCoti)
  {
    $table = 'producto';
    $response = FichaTrabajoModel::AgregarProductoCoti($table, $codProductoCoti);
    return $response;
  }

  //Agregar Producto Mprima a la cotizacion
  public static function ctrAgregarProductoMprimaCoti($codProductoMprimaCoti)
  {
    $table = 'materia_prima';
    $response = FichaTrabajoModel::AgregarProductoMprimaCoti($table, $codProductoMprimaCoti);
    return $response;
  }

  //  Descargar PDF de la cotizacion
  public static function ctrDescargarPdfCotizacion($codCotiPdf)
  {
    $codCoti = $codCotiPdf["codCoti"];
    //cambiar estado de la cotizacion al descargar
    $newEstadoCoti = self::ctrEstadoDescargaPdfCotizacion($codCoti);
    $table = "cotizacion";
    $response = FichaTrabajoModel::mdlDescargarPdfCotizacion($table, $codCoti);

    return $response;
  }

  //cambiar estado de la cotizacion al descargar
  public static function ctrEstadoDescargaPdfCotizacion($codCoti)
  {
    $table = "cotizacion";
    $response = FichaTrabajoModel::mdlEstadoDescargaPdfCotizacion($table, $codCoti);
    return $response;
  }
}
