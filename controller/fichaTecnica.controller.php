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
    } elseif ($jsonFichaTecnicaBase64 === "null") {
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
    return $response;
  }

  // Editar ficha técnica
  public static function ctrUpdatePersonal()
  {
    $table = 'ficha_Tecnica';
    $dataUpdate = array(
      "IdTipoPer" => $_POST["editPersonalTypePer"],
      "dni" => $_POST["editDniNumberPer"],
      "NombrePer" => $_POST["editFirstNamePer"],
      "ApellidoPer" => $_POST["editLastNamePer"],
      "TelefonoPer" => $_POST["editPhoneNumberPer"],
      "DireccionPer" => $_POST["editAddressPer"],
      "Estado" => $_POST["editEstadoPer"],
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
      "IdPer" => $_POST["codPersonal"]
    );
    $response = FichaTecnicaModel::mdlUpdatePersonal($table, $dataUpdate);
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
    $table = "ficha_Tecnica";
    $response = FichaTecnicaModel::mdlDescargarFichaTecnica($table, $codCotiB64);
    return $response;
  }
}
