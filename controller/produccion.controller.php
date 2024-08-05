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

 
}
