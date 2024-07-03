<?php
class FunctionCotizacion
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
  public static function getEstadoCoti($stateValue)
  {
    //  Estado de los Cotizacion 1 = Activo & 2 = Desactivado
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-warning">Sin Emitir</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-success">Emitido</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-danger">Pendiente</span>';
    }

    return $estado;
  }

  //botones Cotizacion
  public static function getBtnCotizacion($codCoti)
  {
    $botones = '
     <button class="btn btn-dark btnDescargarCoti" codCoti="' . $codCoti . '"><i class="fa-solid fa-file-pdf"></i></button>
    
    <button class="btn btn-danger btnDeleteCotizacion" codCoti="' . $codCoti . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
    /* <button class="btn btn-warning btnEditCotizacion" codCoti="' . $codCoti . '" ><i class="fa-solid fa-pencil"></i></button> */
  }
}

