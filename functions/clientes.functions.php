<?php
class FunctionClientes
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
  //  Estados de los Clientes
  public static function getEstadoClientes($estadoCli)
  {
    //  Estado de los Clientes 1 = Activo & 2 = Desactivado
    if ($estadoCli == 1) {
      $estado = '<span class="badge rounded-pill bg-success">Activo</span>';
    }
    if ($estadoCli == 2) {
      $estado = '<span class="badge rounded-pill bg-danger">Inactivo</span>';
    }
    if ($estadoCli > 3) {
      $estado = '<span class="badge rounded-pill bg-warning">Sin Estado</span>';
    }

    return $estado;
  }

  //botones Clientes
  public static function getBtnClientes($codCli, $estadoCli)
  {
    $botones = '
    <button class="btn btn-warning btnEditCliente" codCli="' . $codCli . '" data-bs-toggle="modal" data-bs-target="#modalEditClients"><i class="fa-solid fa-pencil"></i></button>
    <button class="btn btn-danger btnDeleteCliente" codCli="' . $codCli . '" estadoCli="' . $estadoCli . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
}

