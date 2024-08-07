<?php
class FunctionProcesoOperativo
{
  //botones aciones de tipos de procesos op
  public static function getBtnTipoProcOp($codTipoProc)
  {
    $botones = '
       <button class="btn btn-warning btnEditarTipoProcOp" data-bs-toggle="modal" data-bs-target="#modalEditTipoProcesoOp" codTipoProc="' . $codTipoProc . '"><i class="fa-solid fa-pencil"></i></i></button>
        <button class="btn btn-danger btnDeleteTipoProcOp" codTipoProc="' . $codTipoProc . '"><i class="fa-solid fa-trash"></i></button>
      ';
    return $botones;
  }

  public static function getBtnDescargarFichaTrabajoModalTipoProc($codFichTrab)
  {
    $botones = '
       <button class="btn btn-primary btnDescargarFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-file-pdf"></i></i></button>';
    return $botones;
  }

  //boton para inio de proceso oeprativo
  public static function getBtnInicioProc($codIniProcOp, $stateProcOp)
  {
    if ($stateProcOp == 1) {
      $botones = '
              <button class="btn btn-success btnIniciarProcesoOp"  codIniProcOp="' . $codIniProcOp . '">
                  <i class="fa-solid fa-person-walking-arrow-right"></i>
              </button>
          ';
    } else {
      $botones = '
              <button class="btn btn-secondary btnIniciarProcesoOp" codIniProcOp="' . $codIniProcOp . '" disabled>
                  <i class="fa-solid fa-person-walking-arrow-right"></i>
              </button>
          ';
    }
    return $botones;
  }

  //boton para fin de proceso oeprativo
  public static function getBtnFinProc($codFinProcOp, $stateProcOp)
  {
    if ($stateProcOp == 1 || $stateProcOp == 5) {
      $botones = '
              <button class="btn btn-secondary btnFinProcesoOp" codFinProcOp="' . $codFinProcOp . '" disabled>
                  <i class="fa-solid fa-hand-holding-medical"></i>
              </button>
          ';
    } else {
      $botones = '
              <button class="btn btn-danger btnFinProcesoOp" codFinProcOp="' . $codFinProcOp . '">
                  <i class="fa-solid fa-hand-holding-medical"></i>
              </button>
          ';
    }
    return $botones;
  }

  //botones aciones de proc Op
  public static function getBtnProcOp($codProcOp, $stateProcOp)
  {
    if ($stateProcOp == 1) {
      $botones = '
              <button class="btn btn-warning btnEditarProcOp" codProcOp="' . $codProcOp . '">
                  <i class="fa-solid fa-pencil"></i>
              </button>
              <button class="btn btn-danger btnDeleteProcOp" codProcOp="' . $codProcOp . '">
                  <i class="fa-solid fa-trash"></i>
              </button>
          ';
    } elseif ($stateProcOp == 5) {
      $botones = '
              <button class="btn btn-secondary btnEditarProcOp" codProcOp="' . $codProcOp . '" disabled>
                  <i class="fa-solid fa-pencil"></i>
              </button>
              <button class="btn btn-secondary btnDeleteProcOp" codProcOp="' . $codProcOp . '" disabled>
                  <i class="fa-solid fa-trash"></i>
              </button>
          ';
    } else {
      $botones = '
              <button class="btn btn-warning btnEditarProcOp" codProcOp="' . $codProcOp . '">
                  <i class="fa-solid fa-pencil"></i>
              </button>
              <button class="btn btn-secondary btnDeleteProcOp" codProcOp="' . $codProcOp . '" disabled>
                  <i class="fa-solid fa-trash"></i>
              </button>
          ';
    }
    return $botones;
  }

  //boton para editar el estado del proceso en con el Tipo Proceso
  public static function getBtnVerTipoProc($codProcOp, $codTipProc, $stateProcOp)
  {
    if ($stateProcOp == 1 || $stateProcOp == 5) {
      $botones = '
              <button class="btn btn-secondary btnEstadosProcOp" codProcOp="' . $codProcOp . '" codTipProc="' . $codTipProc . '" disabled>
                  <i class="fa-solid fa-network-wired"></i>
              </button>
          ';
    } else {
      $botones = '
              <button class="btn btn-warning btnEstadosProcOp" codProcOp="' . $codProcOp . '" codTipProc="' . $codTipProc . '">
                  <i class="fa-solid fa-network-wired"></i>
              </button>
          ';
    }
    return $botones;
  }


  //boton para ver pedido
  public static function getBtnVerPedido($codPed)
  {
    $botones = '
       <button class="btn btn-success btnVerPedido" data-bs-toggle="modal" data-bs-target="#" codPed="' . $codPed . '">
       <i class="fa-solid fa-cart-shopping"></i>
       </button>
      ';
    return $botones;
  }

  //boton para ver la salida de productos involucrados 
  public static function getBtnVerSalProdPrima($codSalProdMprima)
  {
    $botones = '
        <button class="btn btn-success btnVerSalProdProcOp" data-bs-toggle="modal" data-bs-target="#modalProdSalidasProcOP" codSalProdMprimaProcOP="' . $codSalProdMprima . '">
        <i class="fa-solid fa-boxes-stacked"></i>
        </i></button>
       ';
    return $botones;
  }

  //  Estados del proc dependiendo del tipo de proc
  public static function getEstadoProcOp($stateValue)
  {
    $estado = ''; // Inicializar la variable $estado

    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-primary">REGISTRADO</span>';
    } elseif ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-warning">EN PROCESO</span>';
    } elseif ($stateValue == 3) {
      $estado = '<span class="badge rounded-pill bg-danger">CUELLO DE BOTELLA</span>';
    } elseif ($stateValue == 4) {
      $estado = '<span class="badge rounded-pill bg-warning">LISTO</span>';
    } elseif ($stateValue == 5) {
      $estado = '<span class="badge rounded-pill bg-success">PRENDA TERMINADA</span>';
    } elseif ($stateValue == 6) {
      $estado = '<span class="badge rounded-pill bg-danger">RETRASADO</span>';
    }

    return $estado;
  }

}

