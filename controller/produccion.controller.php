<?php
date_default_timezone_set('America/Bogota');

class ProduccionController
{
  //datatable de produccion
  public static function ctrDTableProduccion()
  {
    $table = "produccion";
    $response = ProduccionsModel::mdlDTableProduccion($table);
    return $response;
  }
  //  aceptar produccion
  public static function ctrAceptarProduccion($jsonAceptarProduccion)
  {
    $table = "produccion";
    $dataAceptarProducc = json_decode($jsonAceptarProduccion, true);

    $nombreProcOp = self::getNombreProcOp($dataAceptarProducc["codProduccion"]);
    $nombreProduccion = $dataAceptarProducc["nombreProduccionAcept"];

    // Validar si $nombreProduccion está vacío
    if (empty($nombreProduccion)) {
      $nombreRegistro = $nombreProcOp["nombreProcOp"];
    } else {
      $nombreRegistro = $nombreProduccion;
    }

    $dataCreate = array(
      "idProduccion" => $dataAceptarProducc["codProduccion"],
      "nombreProduccion" => $nombreRegistro,
      "fechaAceptProducc" => $dataAceptarProducc["fechaProduccionAcept"],
      "estadoProduccion" => 2, // por ingresar
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ProduccionsModel::mdlAceptarProduccion($table, $dataCreate);
    return $response;
  }
  public static function getNombreProcOp($codProduccion)
  {
    $table = "produccion";
    $response = ProduccionsModel::mdlGetNombreProcOp($codProduccion, $table);
    return $response;
  }

}
