<?php

require_once "conexion.php";

class almacenMateriaPrimaModel
{
  //datatable de ingresos productos prima
  public static function mdlDTableAlmacenProductosPrima($table)
  {
    $statement = Conexion::conn()->prepare("SELECT 
      idAlmaMprima, idMprima, codigoMprimaAlma, nombreMprimaAlma, unidadMprimaAlma, cantidadMprimaAlma, precioMprimaAlma, DateUpdate 
        FROM $table 
        ORDER BY 
          CASE 
            WHEN cantidadMprimaAlma > 0 THEN 1
            WHEN cantidadMprimaAlma < 0 THEN 2
            ELSE 3
          END ASC,
          DateUpdate DESC,
          idAlmaMprima DESC
      ");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }
  
}
