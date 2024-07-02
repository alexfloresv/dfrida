<?php
class FunctionUsuario
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
  //  Estados de los usuarios
  public static function getEstadoUsuarios($stateValue)
  {
    //  Estado de los usuarios 1 = Activo & 2 = Desactivado
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

  //botones usuarios
  public static function getBtnUsuarios($codUsuario)
  {
    $botones = '
    <button class="btn btn-warning btnEditUser" codUser="' . $codUsuario . '" data-bs-toggle="modal" data-bs-target="#modalEditUser"><i class="fa-solid fa-pencil"></i></button>
    <button class="btn btn-danger btnDeleteUser" codUser="' . $codUsuario . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
}

