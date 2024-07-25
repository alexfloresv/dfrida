<?php
date_default_timezone_set('America/Bogota');

class almacenMateriaPrimaController
{
  //datatable almacen productos prima
  public static function ctrDTableAlmacenProductosPrima()
  {
    $table = "almacen_mprima";
    $response = almacenMateriaPrimaModel::mdlDTableAlmacenProductosPrima($table);
    return $response;
  }

}
