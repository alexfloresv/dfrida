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
      $estado = '<span class="badge rounded-pill bg-warning">Sin Asignar</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-success">Asignado</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-danger">Pendiente</span>';
    }

    return $estado;
  }

  //botones Cotizacion
  public static function getBtnCotizacion($codCoti, $estadoCoti)
  {
    $botones = '
         <button class="btn btn-dark btnDescargarCoti" codCoti="' . $codCoti . '"><i class="fa-solid fa-file-pdf"></i></button>
        <button class="btn btn-primary btnEditCotizacion" codCoti="' . $codCoti . '" ><i class="fa-solid fa-pencil"></i></button>
        ';

    // Evaluar si el estadoCoti es 2 para deshabilitar el botón de eliminar
    $botones .= '<button class="btn btn-danger btnDeleteCotizacion" codCoti="' . $codCoti . '" ' . ($estadoCoti == 2 ? 'disabled' : '') . '><i class="fa-solid fa-trash"></i></button>';

    return $botones;
  }
  // Botones de Cotizacion para la vista de Pedidos
  public static function getBtnCotizacionPedidosVista($codCoti)
  {
    $botones = '
     <button class="btn btn-danger btnDescargarCotiPedidosList" codCoti="' . $codCoti . '"><i class="fa-solid fa-file-pdf"></i></button>
    ';
    return $botones;
  }
}

