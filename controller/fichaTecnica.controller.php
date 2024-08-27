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
  public static function ctrCrearFichaTecnica($crearFichaTecnica, $jsonNombreArchivo, $jsonExtensionArchivo)
  {
    if ($crearFichaTecnica["nombreFichaTecAdd"] === "" || $crearFichaTecnica["fechaFichaTecAdd"] === "" || $crearFichaTecnica["descripcionFichaTecAdd"] === "") {
      return $response = "errorForm";
    } elseif ($crearFichaTecnica["fileFichaTecnica"] === "") {
      return $response = "error";
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
        //"docFichaTec" => $jsonFichaTecnicaBase64,
        "estadoFichaTec" => 1,
        "DateCreate" => date("Y-m-d\TH:i:sP")
      );
      $response = FichaTecnicaModel::mdCrearFichaTecnica($table, $dataCreate);
      if ($response === "ok") {
        //obtener el ultimo registro de la ficha tecnica
        $idFichaTec = self::ctrCrearObtenerElUltimoRegistro($table);
        //registrar el documento de la ficha tecnica con el id del registro para ubicar el archivo en el direcorio id_fichatecnica
        $docFichaTec = self::ctrRegistrarDocFichaTec($table, $idFichaTec, $jsonNombreArchivo, $jsonExtensionArchivo);
        if ($docFichaTec === "ok") {
          // Validar el dato
          if (isset($idFichaTec["idFichaTec"]) && !empty($idFichaTec["idFichaTec"]) && $idFichaTec["idFichaTec"] !== false && $idFichaTec["idFichaTec"] !== null) {
            // Retornar el id de la ficha técnica para crear el archivo con el id como nombre
            return $idFichaTec["idFichaTec"];
          }
        }
      }
    }
    return $response;
  }
  //obtener el ultimo registro de la ficha tecnica
  public static function ctrCrearObtenerElUltimoRegistro($table)
  {
    $response = FichaTecnicaModel::mdCrearObtenerElUltimoRegistro($table);
    return $response;
  }
  //registrar el documento de la ficha tecnica con el id del registro para ubicar el archivo en el direcorio id_fichatecnica
  public static function ctrRegistrarDocFichaTec($table, $idFichaTec, $jsonNombreArchivo, $jsonExtensionArchivo)
  {
    // Remover comillas dobles de las variables
    $jsonNombreArchivo = str_replace('"', '', $jsonNombreArchivo);
    $jsonExtensionArchivo = str_replace('"', '', $jsonExtensionArchivo);

    // Crear un texto con estos valores que son de tipo texto
    $docFichaTec = $idFichaTec["idFichaTec"] . "_" . $jsonNombreArchivo . $jsonExtensionArchivo;

    $response = FichaTecnicaModel::mdlRegistrarDocFichaTec($table, $idFichaTec, $docFichaTec);

    return $response;
  }
  //  visualizar datos ficha tecnica
  public static function ctrViewDatosFichaTecnica($codFichaTec)
  {
    $table = "ficha_tecnica";
    $response = FichaTecnicaModel::mdlViewDatosFichaTecnica($table, $codFichaTec);
    return $response;
  }

  // Editar ficha técnica
  public static function ctrEditarFichaTecnica($editarFichaTecnica, $jsonNombreArchivo, $jsonExtensionArchivo)
  {
    $table = 'ficha_tecnica';
    // Remover comillas dobles de las variables
    $jsonNombreArchivo = str_replace('"', '', $jsonNombreArchivo);
    $jsonExtensionArchivo = str_replace('"', '', $jsonExtensionArchivo);

    if (!empty($jsonNombreArchivo) && !empty($jsonExtensionArchivo)) {
      // Crear un nuevo nombre para el documento de la ficha técnica
      $newNamedocFichaTec = $editarFichaTecnica["codFichaTec"] . "_" . $jsonNombreArchivo . $jsonExtensionArchivo;
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
        "docFichaTec" => $newNamedocFichaTec,
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
      return $response = "error";
    } else {
      // Si la ficha técnica no está en uso, proceder con la eliminación
      $table = "ficha_tecnica";
      //obtebre el nombre de la ficha tecnica para eliminar el archivo
      $docFichaTec = self::ctrDocFichaTecnica($table, $codFichaTec);
      $eliminar = FichaTecnicaModel::mdlDeleteFichaTecnica($table, $codFichaTec);

    }
    return $docFichaTec;
  }
  //obtebre el nombre de la ficha tecnica para eliminar el archivo
  public static function ctrDocFichaTecnica($table, $codFichaTec)
  {
    $response = FichaTecnicaModel::mdlDocFichaTecnica($table, $codFichaTec);
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
    $table = "ficha_tecnica";
    $response = FichaTecnicaModel::mdlDescargarFichaTecnica($table, $codCotiB64);
    return $response;
  }

  //cambiar estado de la ficha tecnica al descargar
  public static function ctrEstadoDescargaFichaTecnica($codCotiB64)
  {
    $table = "ficha_tecnica";
    $response = FichaTecnicaModel::mdlEstadoDescargaFichaTecnica($table, $codCotiB64);
    return $response;
  }

  //cliente para ficha tecnica
  public static function ctrClientesFichaTec()
  {
    $table = "cliente";
    $response = FichaTecnicaModel::mdlClientesFichaTec($table);
    return $response;
  }
}
