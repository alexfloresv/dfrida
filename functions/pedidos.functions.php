<?php
class FunctionPedidos
{
  //  Estados de los pedidos
  public static function getEstadoPedido($stateValue)
  {
    //  Estado de los Pedidos
    if ($stateValue != null) {
      $estado = '<span class="badge rounded-pill bg-success">Asignado</span>';
    }
    if ($stateValue == null) {
      $estado = '<span class="badge rounded-pill bg-warning">Sin Asignar</span>';
    }

    return $estado;
  }

  //botones Pedido
  public static function getBtnPedido($codCoti)
  {
    $botones = '
     <button class="btn btn-dark btnDescargarCoti" codCoti="' . $codCoti . '"><i class="fa-solid fa-file-pdf"></i></button>
    
    <button class="btn btn-danger btnDeleteCotizacion" codCoti="' . $codCoti . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
    /* <button class="btn btn-warning btnEditCotizacion" codCoti="' . $codCoti . '" ><i class="fa-solid fa-pencil"></i></button> */
  }
}

