<?php
date_default_timezone_set('America/Bogota');

class MermaController
{
  //datatable de produccion
  public static function ctrDTableMerma()
  {
    $table = "merma";
    $response = MermaModel::mdlDTableMerma($table);
    return $response;
  }
  //  aceptar merma
  public static function ctrAceptarMerma($codSalMprimas)
  {
    $table = "salida_mprima";
    $response = MermaModel::mdlAceptarMerma($table, $codSalMprimas);
    return $response;
  }
 


}
