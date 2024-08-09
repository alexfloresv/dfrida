<?php
class FunctionProduccion
{

  //  Estados de los usuarios
  public static function getEstadoProduccion($stateValue)
  {
    //  Estado de los usuarios 1 = Activo & 2 = Desactivado
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-danger">Por Aprobar</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-warning">Por Ingresar</span>';
    }
    if ($stateValue == 3) {
      $estado = '<span class="badge rounded-pill bg-danger">En StandBy</span>';
    }
    if ($stateValue == 4) {
      $estado = '<span class="badge rounded-pill bg-success">En almacen</span>';
    }

    return $estado;
  }

  //botones productos
  public static function getBtnProductos($codPed)
  {
    $botones = '
    <button class="btn btn-success btnVerPedido" data-bs-toggle="modal" data-bs-target="#modalVerProductosPedido" codPed="' . $codPed . '" ><i class="fa-solid fa-people-carry-box"></i></button>
    ';
    return $botones;
  }
  //btn aceptar produccion
  public static function btnProduccion($codProduccion, $estadoProduccion)
  {
      if ($estadoProduccion == 1) {
          $botones = '
          <button class="btn btn-primary btnProduccionAcept" codProduccion="' . $codProduccion . '">
              <i class="fa-solid fa-clipboard-check"></i>
          </button>
          ';
      } else {
          $botones = '
          <button class="btn btn-primary btnProduccionAcept" codProduccion="' . $codProduccion . '" disabled>
              <i class="fa-solid fa-clipboard-check"></i>
          </button>
          ';
      }
      return $botones;
  }
  //fecha de aprobacion de produccion
  public static function getFechaAprobadoProduccion($fechaAceptProducc)
  {

    if ($fechaAceptProducc == null || $fechaAceptProducc == "") {
      $estado = '<span class="badge rounded-pill bg-danger">Sin Fecha Aprobada</span>';
    } else {
      $estado = '<span class="badge rounded-pill bg-success">' . $fechaAceptProducc . '</span>';
    }
    return $estado;
  }
}

