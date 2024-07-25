<?php

require_once "conexion.php";

class almacenProductosModel
{
  //datatable de ingresos productos
  public static function mdlDTableAlmacenProductos($table)
  {
    $statement = Conexion::conn()->prepare("SELECT 
      idAlmaProd, idProd, codigoProdAlma, nombreProdAlma, unidadProdAlma, cantidadProdAlma, precioProdAlma, DateUpdate 
        FROM $table 
        ORDER BY 
          CASE 
            WHEN cantidadProdAlma > 0 THEN 1
            WHEN cantidadProdAlma < 0 THEN 2
            ELSE 3
          END ASC,
          DateUpdate DESC,
          idAlmaProd DESC
      ");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  
}
