<?php
class FunctionProcesoOperativo
{
  //boton para inio de proceso oeprativo
  public static function getBtnInicioProc($codIniProcOp, $stateProcOp)
  {
    if ($stateProcOp == 1) {
      $botones = '
              <button class="btn btn-success btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalInicioProcesoOp" codIniProcOp="' . $codIniProcOp . '">
                  <i class="fa-solid fa-person-walking-arrow-right"></i>
              </button>
          ';
    } else {
      $botones = '
              <button class="btn btn-secondary btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalInicioProcesoOp" codIniProcOp="' . $codIniProcOp . '" disabled>
                  <i class="fa-solid fa-person-walking-arrow-right"></i>
              </button>
          ';
    }
    return $botones;
  }

  //boton para fin de proceso oeprativo
  public static function getBtnFinProc($codIniProcOp, $stateProcOp)
  {
    if ($stateProcOp == 5) {
      $botones = '
                <button class="btn btn-success btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalProdIngresados" codIniProcOp="' . $codIniProcOp . '">
                   <i class="fa-solid fa-hand-holding-medical"></i>
                </button>
            ';
    } else {
      $botones = '
                <button class="btn btn-secondary btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalProdIngresados" codIniProcOp="' . $codIniProcOp . '" disabled>
                    <i class="fa-solid fa-hand-holding-medical"></i>
                </button>
            ';
    }
    return $botones;
  }

  //botones aciones de proc Op
  public static function getBtnProcOp($codProcOp)
  {
    $botones = '
     <button class="btn btn-warning btnEditarProcOp" codProcOp="' . $codProcOp . '"><i class="fa-solid fa-pencil"></i></i></button>
      <button class="btn btn-danger btnDeleteProcOp" codProcOp="' . $codProcOp . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }

  //boton para Tipo Proc
  public static function getBtnVerTipoProc($codTipProc)
  {
    $botones = '
        <button class="btn btn-warning btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalProdIngresados" codTipProc="' . $codTipProc . '">
        <i class="fa-solid fa-network-wired"></i>
        </button>
       ';
    return $botones;
  }

  //boton para ver pedido
  public static function getBtnVerPedido($codPed)
  {
    $botones = '
       <button class="btn btn-success btnVerSalProd" data-bs-toggle="modal" data-bs-target="#modalProdSalidas" codPed="' . $codPed . '">
       <i class="fa-solid fa-cart-shopping"></i>
       </button>
      ';
    return $botones;
  }

  //boton para ver la salida de productos involucrados 
  public static function getBtnVerSalProdPrima($codSalProdMprima)
  {
    $botones = '
        <button class="btn btn-success btnVerSalProd" data-bs-toggle="modal" data-bs-target="#modalProdSalidas" codSalProdMprima="' . $codSalProdMprima . '">
        <i class="fa-solid fa-boxes-stacked"></i>
        </i></button>
       ';
    return $botones;
  }

  //  Estados del proc dependiendo del tipo de proc
  public static function getEstadoProcOp($stateValue)
  {
    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-success">REGISTRADO</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-danger">EJECUTADO</span>';
    }
    if ($stateValue > 3) {
      $estado = '<span class="badge rounded-pill bg-warning">DETENIDO</span>';
    }
    if ($stateValue > 4) {
      $estado = '<span class="badge rounded-pill bg-warning">LISTO</span>';
    }
    if ($stateValue > 5) {
      $estado = '<span class="badge rounded-pill bg-warning">FINALIZADO</span>';
    }
    if ($stateValue > 6) {
      $estado = '<span class="badge rounded-pill bg-warning">RETRASADO</span>';
    }
    return $estado;
  }
}

