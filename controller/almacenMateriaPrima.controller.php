<?php
date_default_timezone_set('America/Bogota');

class almacenMateriaPrimaController
{
  //datatable almacen productos prima
  public static function ctrDTableAlmacenProductosPrima()
  {
    $table = "almacen_mprima";
    $response = almacenMateriaPrimaModel::mdlDTableAlmacenProductosPrima($table);
    //calcular precioProd por cantidadProdAlma y precioProdAlma	
    foreach ($response as &$producto) {
      // Calcular el total multiplicando cantidadProdAlma por precioProdAlma
      $total = $producto['cantidadMprimaAlma'] * $producto['precioMprimaAlma'];
      // Agregar el total como un nuevo dato en el sub-array
      $producto['precioMprimaAlma'] = $total;
    }
    return $response;
  }

}
/* idAlmaProd, idProd, codigoProdAlma, nombreProdAlma, unidadProdAlma, cantidadProdAlma, precioProdAlma, DateUpdate  */