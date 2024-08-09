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

 
}
