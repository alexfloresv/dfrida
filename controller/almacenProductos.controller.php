<?php
date_default_timezone_set('America/Bogota');

class almacenProductosController
{
  //datatable almacen productos
  public static function ctrDTableAlmacenProductos()
  {
    $table = "almacen_prod";
    $response = almacenProductosModel::mdlDTableAlmacenProductos($table);
    return $response;
  }

}
