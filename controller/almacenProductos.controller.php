<?php
date_default_timezone_set('America/Bogota');

class almacenProductosController
{
  //datatable almacen productos
  public static function ctrDTableAlmacenProductos()
  {
    $table = "almacen_prod";
    // Obtener los datos de la base de datos
    $response = almacenProductosModel::mdlDTableAlmacenProductos($table);

    // Iterar sobre cada sub-array en $response
    foreach ($response as &$producto) {
      // Calcular el total multiplicando cantidadProdAlma por precioProdAlma
      $total = $producto['cantidadProdAlma'] * $producto['precioProdAlma'];
      // Agregar el total como un nuevo dato en el sub-array
      $producto['precioProdAlma'] = $total;
    }

    // Devolver el array modificado
    return $response;
  }

}
