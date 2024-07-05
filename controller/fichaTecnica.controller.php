<?php
date_default_timezone_set('America/Bogota');

class FichaTecnicaController
{
  //datatable de FichaTecnica
  public static function ctrDTableFichaTecnica()
  {
    $table = "ficha_tecnica";
    $response = FichaTecnicaModel::mdlDTableFichaTecnica($table);
    return $response;
  }

  //  crear ficha tecnica

  public static function ctrCrearFichaTecnica($crearFichaTecnica, $jsonFichaTecnicaBase64)
  {
    if ($crearFichaTecnica["nombreFichaTecAdd"] === "" || $crearFichaTecnica["fechaFichaTecAdd"] === "" || $crearFichaTecnica["descripcionFichaTecAdd"] === "") {
      $response = "errorForm";
    } elseif (strpos($jsonFichaTecnicaBase64, '"base64":null') !== false) {
      $response = "error";
    } else {
      $table = "ficha_tecnica";
      $dataCreate = array(
        "nombreFichaTec" => $crearFichaTecnica["nombreFichaTecAdd"],
        "fechaFichaTec" => $crearFichaTecnica["fechaFichaTecAdd"],
        "clienteFichaTec" => $crearFichaTecnica["clienteFichaTecAdd"],
        "descripcionFichaTec" => $crearFichaTecnica["descripcionFichaTecAdd"],
        "codigoFichaTec" => $crearFichaTecnica["codigoFichaTecAdd"],
        "nombreSoliFichaTec" => $crearFichaTecnica["nombreSoliFichaTecAdd"],
        "celularFichaTec" => $crearFichaTecnica["celularFichaTecAdd"],
        "correoFichaTec" => $crearFichaTecnica["correoFichaTecAdd"],
        "detalleFichaTec" => $crearFichaTecnica["detalleFichaTecAdd"],
        "docFichaTec" => $jsonFichaTecnicaBase64,
        "estadoFichaTec" => 1,
        "DateCreate" => date("Y-m-d\TH:i:sP")
      );
      $response = FichaTecnicaModel::mdCrearFichaTecnica($table, $dataCreate);
    }
    return $response;

  }
  //  visualizar datos ficha tecnica
  public static function ctrViewDatosFichaTecnica($codFichaTec)
  {
    $table = "ficha_tecnica";
    $response = FichaTecnicaModel::mdlViewDatosFichaTecnica($table, $codFichaTec);
    unset($response['docFichaTec']);
    $response['docFichaTec'] = "Documento eliminado para no sobrecargar el servidor y el navegador del usuario los elimine muchos caracateres p xdxdxd";
    return $response;
  }

  // Editar ficha técnica
  public static function ctrEditarFichaTecnica($editarFichaTecnica, $jsonFichaTecnicaBase64)
  {
    $table = 'ficha_Tecnica';
    // Verificar si no se modificó la ficha técnica o si el JSON tiene "base64":null
    if
    (strpos($jsonFichaTecnicaBase64, '"base64":null') === false) {
      // Preparar datos para actualizar, incluyendo el documento y el estado
      $dataUpdate = array(
        "idFichaTec" => $editarFichaTecnica["codFichaTec"],
        "nombreFichaTec" => $editarFichaTecnica["nombreFichaTecEdit"],
        "fechaFichaTec" => $editarFichaTecnica["fechaFichaTecEdit"],
        "clienteFichaTec" => $editarFichaTecnica["clienteFichaTecEdit"],
        "descripcionFichaTec" => $editarFichaTecnica["descripcionFichaTecEdit"],
        "codigoFichaTec" => $editarFichaTecnica["codigoFichaTecEdit"],
        "nombreSoliFichaTec" => $editarFichaTecnica["nombreSoliFichaTecEdit"],
        "celularFichaTec" => $editarFichaTecnica["celularFichaTecEdit"],
        "correoFichaTec" => $editarFichaTecnica["correoFichaTecEdit"],
        "detalleFichaTec" => $editarFichaTecnica["detalleFichaTecEdit"],
        "docFichaTec" => $jsonFichaTecnicaBase64,
        "estadoFichaTec" => 1,
        "DateUpdate" => date("Y-m-d\TH:i:sP")
      );
      $response = FichaTecnicaModel::mdlUpdateConFichaTecnica($table, $dataUpdate);
    } else {
      // Preparar datos para actualizar sin modificar el documento ni el estado
      $dataUpdate = array(
        "idFichaTec" => $editarFichaTecnica["codFichaTec"],
        "nombreFichaTec" => $editarFichaTecnica["nombreFichaTecEdit"],
        "fechaFichaTec" => $editarFichaTecnica["fechaFichaTecEdit"],
        "clienteFichaTec" => $editarFichaTecnica["clienteFichaTecEdit"],
        "descripcionFichaTec" => $editarFichaTecnica["descripcionFichaTecEdit"],
        "codigoFichaTec" => $editarFichaTecnica["codigoFichaTecEdit"],
        "nombreSoliFichaTec" => $editarFichaTecnica["nombreSoliFichaTecEdit"],
        "celularFichaTec" => $editarFichaTecnica["celularFichaTecEdit"],
        "correoFichaTec" => $editarFichaTecnica["correoFichaTecEdit"],
        "detalleFichaTec" => $editarFichaTecnica["detalleFichaTecEdit"],
        "DateUpdate" => date("Y-m-d\TH:i:sP")
      );
      $response = FichaTecnicaModel::mdlUpdateSinFichaTecnica($table, $dataUpdate);
    }
    return $response;
  }

  //borrar FichaTecnica
  public static function ctrDeleteFichaTecnica($borrarFichaTecnica)
  {
    $codFichaTec = $borrarFichaTecnica["codFichaTec"];
    // Verificar si está en uso la ficha técnica si es true no se puede eliminar
    $verificarUso = self::ctrVerificarUsoFichaTecnica($codFichaTec);
    if ($verificarUso) {
      $response = "error";
    } else {
      // Si la ficha técnica no está en uso, proceder con la eliminación
      $table = "ficha_Tecnica";
      $response = FichaTecnicaModel::mdlDeleteFichaTecnica($table, $codFichaTec);
    }
    return $response;
  }
  //verificar si esta en uso la ficha tecnica
  public static function ctrVerificarUsoFichaTecnica($codFichaTec)
  {
    $table = "pedido";
    $response = FichaTecnicaModel::mdlVerificarUsoFichaTecnica($table, $codFichaTec);
    return $response;
  }

  //  Descargar ficha tecnica
  public static function ctrDescargarFichaTecnica($codCotiB64)
  {
    $codCotiB64 = $codCotiB64["codFichaTec"];
    //cambiar estado de la ficha tecnica al descargar
    $newEstadoCoti = self::ctrEstadoDescargaFichaTecnica($codCotiB64);
    $table = "ficha_Tecnica";
    $response = FichaTecnicaModel::mdlDescargarFichaTecnica($table, $codCotiB64);
    return $response;
  }

  //cambiar estado de la ficha tecnica al descargar
  public static function ctrEstadoDescargaFichaTecnica($codCotiB64)
  {
    $table = "ficha_Tecnica";
    $response = FichaTecnicaModel::mdlEstadoDescargaFichaTecnica($table, $codCotiB64);
    return $response;
  }
}
