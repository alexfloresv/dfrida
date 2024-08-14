<?php
class FunctionMerma
{

  //  Estados de los usuarios
  public static function getEstadoMerma($stateValue)
  {

    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-danger">Sin Confirmar</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-success">Confirmada</span>';
    }
    return $estado;
  }

  //botones de productos prima de pedido = cotizacion = proceso operativo
  public static function btnProductosMprimaMerma($codSalMprima, $estadoMerma, $codMerma)
  {
      if ($estadoMerma == 2) {
          $botones = '
              <button class="btn btn-primary btnAprobMprimaMerma" codMerma="' . $codMerma . '" codSalMprima="' . $codSalMprima . '" disabled><i class="fa-solid fa-recycle"></i></button>
              ';
      } else {
          $botones = '
              <button class="btn btn-primary btnAprobMprimaMerma" codMerma="' . $codMerma . '" codSalMprima="' . $codSalMprima . '"><i class="fa-solid fa-recycle"></i></button>
              ';
      }
      return $botones;
  }

  //boton de merma confirmada
  public static function btnVerMermaAceptada($codMerma, $estadoMerma)
  {
    if ($estadoMerma == 2) {
      $botones = '
          <button class="btn btn-success btnVerMermaAceptada" codMerma="' . $codMerma . '"><i class="fa-solid fa-trash-can"></i></button>
          ';
    } else {
      $botones = '
          <button class="btn btn-success btnVerMermaAceptada" codMerma="' . $codMerma . '" disabled><i class="fa-solid fa-trash-can"></i></button>
          ';
    }
    return $botones;
  }

  //boton ver proceso operativo de origen
  public static function btnVerProcOpOrigin($codProcOpMerma)
  {
    $botones = '
       <button class="btn btn-warning btnVerProcOpMerma" codProcOpMerma="' . $codProcOpMerma . '" ><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i></button>
       ';
    return $botones;
  }

  //boton editar merma
  public static function btnEditMerma($codMerma, $estadoMerma)
  {
      if ($estadoMerma == 1) {
          $botones = '
          <button class="btn btn-warning btnEditUser" codMerma="' . $codMerma . '" disabled><i class="fa-solid fa-pencil"></i></button>
          ';
      } else {
          $botones = '
          <button class="btn btn-warning btnEditUser" codMerma="' . $codMerma . '"><i class="fa-solid fa-pencil"></i></button>
          ';
      }
      return $botones;
  }

  public static function getFechaAprobadoMerma($fechaMermaAprob)
  {

    if ($fechaMermaAprob == null) {
      $estado = '<span class="badge rounded-pill bg-danger">Sin Fecha Aceptada</span>';
    }else{
      $estado = '<span class="badge rounded-pill bg-success">'.$fechaMermaAprob.'</span>';
    }
    return $estado;
  }
}

