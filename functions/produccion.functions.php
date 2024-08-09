<?php
class FunctionProduccion
{

  //  Estados de los usuarios
  public static function getEstadoProduccion($stateValue)
  {
    //  Estado de los usuarios 1 = Activo & 2 = Desactivado
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-warning">Por Ingresar</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-success">En StandBy</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-danger">En almacen</span>';
    }

    return $estado;
  }

  //botones usuarios
  public static function getBtnProductos($codCotiProd)
  {
    $botones = '
    <button class="btn btn-success btnEditUser" codCotiProd="' . $codCotiProd . '" ><i class="fa-solid fa-people-carry-box"></i></button>
    ';
    return $botones;
  }
}

