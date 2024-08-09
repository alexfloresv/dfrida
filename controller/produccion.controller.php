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
    $dataAceptarProducc = json_decode($jsonAceptarProduccion, true);
    $table = "produccion";
    $dataCreate = array(
      "idProduccion" => $dataAceptarProducc["codProduccion"],
      "fechaAceptProducc" => $dataAceptarProducc["fechaProduccionAcept"],
      "estadoProduccion" => 2,//por ingresar
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = ProduccionsModel::mdlAceptarProduccion($table, $dataCreate);
    return $response;
  }
 
}
