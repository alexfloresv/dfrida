<?php
date_default_timezone_set('America/Bogota');

class almacenMateriaPrimaController
{
  //datatable almacen productos prima
  public static function ctrDTableAlmacenProductosPrima()
  {
      $table = "almacen_mprima";
      $response = almacenMateriaPrimaModel::mdlDTableAlmacenProductosPrima($table);
      
      // Iterar sobre cada sub-array en $response
      foreach ($response as &$producto) {
          // Calcular el total multiplicando cantidadMprimaAlma por precioMprimaAlma
          $total = $producto['cantidadMprimaAlma'] * $producto['precioMprimaAlma'];
          // Agregar el total como un nuevo dato en el sub-array
          $producto['totalMprimaAlma'] = $total;
      }
      
      return $response;
  }

}
/* idAlmaProd, idProd, codigoProdAlma, nombreProdAlma, unidadProdAlma, cantidadProdAlma, precioProdAlma, DateUpdate  */