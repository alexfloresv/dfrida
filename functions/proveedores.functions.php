<?php
class FunctionProveedores
{

  public static function getTipoUsuarioLogin($tipoUsuarioLogin)
  {

    if ($tipoUsuarioLogin == 1) {
      $TipoUsuario = '<span class="badge rounded-pill bg-success">Administrador</span>';
    }
    if ($tipoUsuarioLogin == 2) {
      $TipoUsuario = '<span class="badge rounded-pill bg-success">Docente</span>';
    }
    if ($tipoUsuarioLogin == 3) {
      $TipoUsuario = '<span class="badge rounded-pill bg-success">Administrativo</span>';
    }
    if ($tipoUsuarioLogin == 4) {
      $TipoUsuario = '<span class="badge rounded-pill bg-success">Apoderado</span>';
    }
    if ($tipoUsuarioLogin > 5) {
      $TipoUsuario = '<span class="badge rounded-pill bg-success">Sin Tipo Usuario</span>';
    }

    return $TipoUsuario;
  }
  //  Estados de los Proveedores
  public static function getEstadoProveedores($stateValue)
  {
    //  Estado de los Proveedores 1 = Activo & 2 = Desactivado
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-success">Activo</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-danger">Desactivado</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-warning">Sin Estado</span>';
    }

    return $estado;
  }

  //botones Proveedores
  public static function getBtnProveedores($codPov, $estadoProv)
  {
    $botones = '
    <button class="btn btn-warning btnEditProveedor" codPov="' . $codPov . '" data-bs-toggle="modal" data-bs-target="#modalEditProveedor"><i class="fa-solid fa-pencil"></i></button>
    <button class="btn btn-danger btnDeleteProveedor" codPov="' . $codPov . '" estadoProv="' . $estadoProv . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
}

