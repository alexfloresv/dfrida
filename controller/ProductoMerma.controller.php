<?php
date_default_timezone_set('America/Bogota');

class ProductoMermaController
{
  //datatable de produccion
  /*  public static function ctrDTableMerma()
   {
     $table = "merma";
     $response = ProductoMermaModel::mdlDTableMerma($table);
     return $response;
   } */

  //funcion para traer la merma aprobada al selct 2
  public static function ctrViewDataMermaConfirmada()
  {
    $table = "merma";
    $response = ProductoMermaModel::mdlDTableMerma($table);
    return $response;
  }
  //funcion para trear los productos de la merma aprobada
  public static function ctrAceptarMermaConfirmada($codMermaConfir)
  {
    $table = "merma";
    $response = ProductoMermaModel::mdlAceptarMermaConfirmada($table, $codMermaConfir);
    return $response;
  }

  //funcion para traer productos merma del catalogo al selct 2
  public static function ctrViewDataProdMermaCatalogo()
  {
    $table = "producto";
    $response = ProductoMermaModel::mdlViewDataProdMermaCatalogo($table);
    return $response;
  }
  //funcion para trear los productos de catalogo para llnarlo en el campo de producto merma
  public static function ctrProductoMermaCatalogo($codProdCatal)
  {
    $table = "producto";
    $response = ProductoMermaModel::mdlProductoMermaCatalogo($table, $codProdCatal);
    return $response;
  }

}
