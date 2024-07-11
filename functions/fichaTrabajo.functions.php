<?php
class FunctionFichaTrabajo
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
  //  Estados de los Cotizacion
  public static function getEstadoFichaTec($stateValue)
  {
    //  Estado de los Cotizacion 1 = Activo & 2 = Desactivado
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-warning">Cargado</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-success">Descargado</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-danger">Pendiente</span>';
    }

    return $estado;
  }

  //botones ficha trabajo
  public static function getBtnFichaTrabajo($codFichTrab)
  {
    $botones = '
       <button class="btn btn-dark btnDescargarFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-cloud-arrow-down"></i></i></button>
       <button class="btn btn-warning btnEditFichaTrabajo" codFichTrab="' . $codFichTrab . '" ><i class="fa-solid fa-pencil"></i></button>
    <button class="btn btn-danger btnDeleteFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;

  }
  public static function getBtnVerProcesTrabajo($codFichTrab)
  {
    $botones = '
     <button class="btn btn-info btnVerFichaTrabajo" data-bs-toggle="modal" data-bs-target="#modalProcesosTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-network-wired"></i></button>
    ';
    return $botones;
  }

  public static function getBtnDescargarFichaTec($codFichaTec)
  {
    $botones = '
     <button class="btn btn-dark btnDescargarFichaTecnica" codFichaTec="' . $codFichaTec . '"><i class="fa-solid fa-cloud-arrow-down"></i></i></button>
    ';
    return $botones;

  }
}

