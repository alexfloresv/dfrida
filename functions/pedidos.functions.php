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
  //boton para ver el cliente del pedido
  public static function getBtnVerClientePedido($codPed, $idCli)
  {
    $botones = '
         <button class="btn btn-success btnVerClientePedido" data-bs-toggle="modal" data-bs-target="#modalVerClientePedidos" codPed="' . $codPed . '" idCli="' . $idCli . '">
         <i class="fa-solid fa-user-tie"></i>
         </button>
        ';
    return $botones;
  }
  //boton para ver el cliente del pedido
  public static function getBtnVerProductosPedido($codPed, $idCoti)
  {
    $botones = '
             <button class="btn btn-primary btnVerProductosPedido" data-bs-toggle="modal" data-bs-target="#modalVerProdCotiPedidos" codPed="' . $codPed . '" idCoti="' . $idCoti . '">
             <i class="fa-solid fa-boxes-packing"></i>
             </button>
            ';
    return $botones;
  }
  //boton para ver el cliente del pedido
  public static function getBtnVerProductosPrimaPedido($codPed, $idCoti)
  {
    $botones = '
         <button class="btn btn-warning btnVerProductosPrimaPedido" data-bs-toggle="modal" data-bs-target="#modalVerProdPrimaCotiPedidos" codPed="' . $codPed . '" idCoti="' . $idCoti . '">
         <i class="fa-solid fa-box-archive"></i>
         </button>
        ';
    return $botones;
  }

}

