<?php
date_default_timezone_set('America/Bogota');

class procesoOperativoController
{
  //datatable de proceso Op
  public static function ctrDTableProcesosOperativos()
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlDTableProcesosOperativos($table);
    return $response;
  }
  //funcion para mostrar el selec2 de fichas de trabajo
  public static function ctrSelect2FichTrabModal()
  {
    $table = "ficha_proceso";
    $response = procesoOperativoModel::mdlSelect2FichTrabModal($table);
    return $response;
  }

  //crear el tipo de proceso operativo
  public static function ctrCrearTipoProcModal($jsonCrearTipoProceso)
  {
    $dataTipoProc = json_decode($jsonCrearTipoProceso, true);
    $table = "tipo_proceso";
    if (!empty($dataTipoProc["idFichTrabProcAdd"]) && $dataTipoProc["idFichTrabProcAdd"] != 0) {
      $dataCreate = array(
        "nombreTipoProc" => $dataTipoProc["nombreTipoProcOpAdd"],
        "descripcionTipoProc" => $dataTipoProc["descripcionTipoProcOpAdd"],
        "idFichaProc" => $dataTipoProc["idFichTrabProcAdd"],
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );
      $response = procesoOperativoModel::mdlCrearTipoProcModal($table, $dataCreate);
    } else {
      $response = "error";
    }
    return $response;
  }

  //data table tipos de procesos operativos
  public static function ctrDTableTiposProcesosOperativos()
  {
    $table = "tipo_proceso";
    $response = procesoOperativoModel::mdlDTableTiposProcesosOperativos($table);
    return $response;
  }

  //// visualizar datos para editar tipo de proceso operativo
  public static function ctrViewDataTipoProcOp($codTipoProc)
  {
    $table = "tipo_proceso";
    $response = procesoOperativoModel::mdlViewDataTipoProcOp($table, $codTipoProc);
    return $response;
  }

  //funcion para mostrar el selec2 de pedidos
  public static function ctrSelect2Pedido()
  {
    $table = "pedido";
    $response = procesoOperativoModel::mdlSelect2Pedido($table);
    return $response;
  }

  //funcion para mostrar el selec2 de tipo de procesos
  public static function ctrSelect2TiposProcesos()
  {
    $table = "tipo_proceso";
    $response = procesoOperativoModel::mdlSelect2TiposProcesos($table);
    return $response;
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima
  public static function ctrSelect2SalMprima()
  {
    $table = "salida_mprima";
    $response = procesoOperativoModel::mdSelect2SalMprima($table);
    return $response;
  }

  //crear  proceso operativo principal
  public static function ctrCrearProcOpModal($jsonCrearProceso)
  {
    $dataProcOp = json_decode($jsonCrearProceso, true);

    // Crear registro de proceso operativo
    $addProcOp = self::ctrCrearRegistro($dataProcOp);

    // Obtener el último registro de proceso operativo
    $ultimoRegistro = self::ctrUltimoRegistroProcOp();
    // actualizar estado de pedido
    $updateEstadoPedido = self::ctrActualizarPedidoProcOp($dataProcOp["idPedidoProcOp"], $dataProcOp["idSalProdPrima"]);

    if ($updateEstadoPedido = true) {
      // Verificar si idSalProdPrima tiene un valor válido
      if (!empty($dataProcOp["idSalProdPrima"]) && $dataProcOp["idSalProdPrima"] != 0) {
        // Asignar proceso operativo a salida materia prima
        $salidaMPrimaProcOp = self::ctrAsignarAsalMprima($ultimoRegistro["idProcOp"], $dataProcOp["idSalProdPrima"]);
        // Si salidaMPrimaProcOp es verdadero, retornar addProcOp "ok"
        if ($salidaMPrimaProcOp) {
          return $addProcOp;
        } else {
          return "error";
        }
      } else {
        // Si el valor de idSalProdPrima es null, vacío o 0, retornar addProcOp "ok"
        return $addProcOp;
      }
    } else {
      return "errorPedido";
    }
  }

  //crear proceso operativo
  public static function ctrCrearRegistro($dataProcOp)
  {
    $table = "proceso_operativo";
    $dataCreate = array(
      "nombreProcOp" => $dataProcOp["nombreProcOpAdd"],
      "descripcionProcOp" => $dataProcOp["descripcionProcOpAdd"],
      "fechaRegistroProcOp" => $dataProcOp["fechaRegProcOpAdd"],
      "fechaFinProcOp" => $dataProcOp["fechaFinProcOpAdd"],
      "idSalMprima" => $dataProcOp["idSalProdPrima"],
      "idPedido" => $dataProcOp["idPedidoProcOp"],
      "idTipoProc" => $dataProcOp["idTipoProcOp"],
      "estadoProcOp" => 1, //registrado
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlCrearProcOpModal($table, $dataCreate);
    return $response;
  }
  //obtener el ultimo registro de proceso operativo
  public static function ctrUltimoRegistroProcOp()
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlUltimoRegistroProcOp($table);
    return $response;
  }
  // actualizar estado de pedido
  public static function ctrActualizarPedidoProcOp($idPedido, $idSalMprima)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $idPedido,
      "estadoPedido" => 2,//en proceso
      "idSalMprima" => $idSalMprima,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlActualizarPedidoProcOp($table, $dataUpdate);
    return $response;
  }
  //asignar proceso operativo a salida materia prima
  public static function ctrAsignarAsalMprima($idProcOp, $idSalProdPrima)
  {
    $table = "salida_mprima";
    $dataUpdate = array(
      "idSalMprima" => $idSalProdPrima,
      "idProcOp" => $idProcOp,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlAsignarSalMprima($table, $dataUpdate);
    return $response;

  }
  //editar  tipo de proceso operativo 
  public static function ctrEditarTipoProc($jsonEditarTipoProc)
  {
    $dataEditTipoProc = json_decode($jsonEditarTipoProc, true);
    $table = "tipo_proceso";
    if (!empty($dataEditTipoProc["idFichTrabProcEdit"]) && $dataEditTipoProc["idFichTrabProcEdit"] != 0) {
      $dataUpdate = array(
        "idTipoProc" => $dataEditTipoProc["codTipoProc"],
        "nombreTipoProc" => $dataEditTipoProc["nombreTipoProcOpEdit"],
        "descripcionTipoProc" => $dataEditTipoProc["descripcionTipoProcOpEdit"],
        "idFichaProc" => $dataEditTipoProc["idFichTrabProcEdit"],
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = procesoOperativoModel::mdlEditarTipoProc($table, $dataUpdate);
    } else {
      $response = "error";
    }
    return $response;
  }
  //borrar  tipo de proceso operativo 
  public static function ctrBorrarTipoProc($codTipoProcDelet)
  {
    $table = "tipo_proceso";
    $response = procesoOperativoModel::mdlBorrarTipoProc($table, $codTipoProcDelet);
    return $response;
  }
  //funcion visualizar datos para editar proceso operativo principal
  public static function ctrViewDataProcOp($codProcOpEditView)
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlViewDataProcOp($table, $codProcOpEditView);
    return $response;
  }

  //funcion para mostrar el selec2 de selecionar salida materia prima edit
  public static function ctrSelect2SalMprimaEdit()
  {
    $table = "salida_mprima";
    $response = procesoOperativoModel::mdSelect2SalMprimaEdit($table);
    return $response;
  }
  //funcion para mostrar el selec2 de pedidos edit
  public static function ctrSelect2PedidoEdit()
  {
    $table = "pedido";
    $response = procesoOperativoModel::mdlSelect2PedidoEdit($table);
    return $response;
  }
  //editar proceso operativo principal
  public static function ctrEditarProcOp($jsonEditarProcOp)
  {
    $dataEditProcOp = json_decode($jsonEditarProcOp, true);
    //registro actual de proceso operativo
    $registroAcutalProcOp = self::ctrViewRegDataProcOp($dataEditProcOp["codProcOpEdit"]);
    //validar si se selecciona valores 0 de los selct2
    if (!empty($dataEditProcOp["idSalProdPrimaEdit"]) && $dataEditProcOp["idSalProdPrimaEdit"] != 0 && !empty($dataEditProcOp["idTipoProcOpEdit"]) && $dataEditProcOp["idTipoProcOpEdit"] != 0 && !empty($dataEditProcOp["idPedidoProcOpEdit"]) && $dataEditProcOp["idPedidoProcOpEdit"] != 0) {
      //actualizar salida materia prima
      $updateSalidaMprima = self::updateSalidaMprima($dataEditProcOp["idSalProdPrimaEdit"], $dataEditProcOp["codProcOpEdit"]);

      if ($updateSalidaMprima) {
        //actualizar pedido
        $updatePedido = self::updatePedido($dataEditProcOp["idPedidoProcOpEdit"], $registroAcutalProcOp["idPedido"], $dataEditProcOp["codProcOpEdit"]);

        if ($updatePedido) {
          //asignar salida mprima a pedido
          $pedidoxSalida = self::ctrAsignarSalMprimaApedido($dataEditProcOp["idPedidoProcOpEdit"], 
          $dataEditProcOp["idSalProdPrimaEdit"]);
          $table = "proceso_operativo";
          $dataCreate = array(
            "idProcOp" => $dataEditProcOp["codProcOpEdit"],
            "idSalMprima" => $dataEditProcOp["idSalProdPrimaEdit"],
            "nombreProcOp" => $dataEditProcOp["nombreProcOpEdit"],
            "descripcionProcOp" => $dataEditProcOp["descripcionProcOpEdit"],
            "fechaRegistroProcOp" => $dataEditProcOp["fechaRegProcOpEdit"],
            "fechaFinProcOp" => $dataEditProcOp["fechaFinProcOpEdit"],
            "idTipoProc" => $dataEditProcOp["idTipoProcOpEdit"],
            "DateUpdate" => date("Y-m-d\TH:i:sP"),
          );
          //editar proceso operativo
          $response = procesoOperativoModel::mdlEditarProcOp($table, $dataCreate);
          return $response;
        } else {
          return "errorasignarPedido";
        }
      } else {
        return "errorAsignarSalida";
      }
    } else {
      // Si algun valor es 0
      return "error";
    }
  }

  //asignar salida mprima a pedido
  public static function ctrAsignarSalMprimaApedido($idPedido, $idSalMprima)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $idPedido,//where
      "idSalMprima" => $idSalMprima,//update
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlAsignarSalMprimaApedido($table, $dataUpdate);
    return $response;
  }

  //registro actual de proceso operativo
  public static function ctrViewRegDataProcOp($idProcOp)
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlViewRegDataProcOp($table, $idProcOp);
    return $response;
  }
  //actualizar salida materia prima
  public static function updateSalidaMprima($codMprima, $idProcOp)
  {
    //obtener registro actual de proceso operativo
    $tableProcOP = "proceso_operativo";
    $registroProcOpActualMprima = procesoOperativoModel::mdlRegistroActualProcOp($tableProcOP, $idProcOp);

    //no tiene registro de salida materia prima agregado
    if ($registroProcOpActualMprima["idSalMprima"] == 0) {
      //asignar idProcOp a salida materia prima
      $addSalMprima = self::ctrAsignarProcOpSalMprima($idProcOp, $codMprima);
      if ($addSalMprima) {
        //asignar salida a proceso operativo
        $dataUpdate = array(
          "idProcOp" => $idProcOp,//wehere
          "idSalMprima" => $codMprima,//update
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = procesoOperativoModel::mdlAsignarSalMprimaProcOp($tableProcOP, $dataUpdate);
        return $response;
      }

    } else {

      $updateSalMprima = self::ctrActualizarSalMprima($idProcOp, $codMprima, $registroProcOpActualMprima["idSalMprima"]);

      if ($updateSalMprima) {
        return $updateSalMprima;
      }
    }
  }

  //asignar proceso operativo a salida materia prima
  public static function ctrAsignarProcOpSalMprima($idProcOp, $codMprima)
  {
    $table = "salida_mprima";
    $dataUpdate = array(
      "idProcOp" => $idProcOp,//update
      "idSalMprima" => $codMprima,//where
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlAsignarProcOpSalMprima($table, $dataUpdate);
    return $response;
  }

  //actualizar salida materia prima si selecciona otra salida
  public static function ctrActualizarSalMprima($idProcOp, $nuevoMprima, $actualMprima)
  {
    if ($nuevoMprima == $actualMprima) {
      return true;

    } else {

      $table = "salida_mprima";
      //quitar registro proc op actual de salida materia prima
      $updateActualMprima = self::ctrQuitarSalMprimaProcOp($actualMprima);
      //agregar nuevo registro de proc op a salida materia prima
      if ($updateActualMprima) {
        $dataUpdate = array(
          "idProcOp" => $idProcOp,//update
          "idSalMprima" => $nuevoMprima,//where
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = procesoOperativoModel::mdlAddUpdateSalMprimaProcOp($table, $dataUpdate);
        return $response;
      }
    }
  }

  //quitar registro proc op actual de salida materia prima
  public static function ctrQuitarSalMprimaProcOp($actualMprima)
  {
    $table = "salida_mprima";
    $dataUpdate = array(
      "idSalMprima" => $actualMprima,
      "idProcOp" => 0,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlQuitarSalMprimaProcOp($table, $dataUpdate);
    return $response;
  }

  //actualizar pedido
  public static function updatePedido($nuevoPedido, $actualPedido, $idProcOp)
  {
    if ($nuevoPedido == $actualPedido) {
      return true;
    } else {
      //quitar perdido anterior
      $updatePedidoAnterior = self::ctrQuitarPedidoAnterior($actualPedido);

      if ($updatePedidoAnterior) {
        $updatePedidoNuevo = self::ctrAgregarPedidoNuevo($nuevoPedido);
        //agregar nuevo pedido a proceso operativo
        $table = "proceso_operativo";
        $dataUpdate = array(
          "idProcOp" => $idProcOp,
          "idPedido" => $nuevoPedido,
          "DateUpdate" => date("Y-m-d\TH:i:sP"),
        );
        $response = procesoOperativoModel::mdlAddPedidoNewProcOp($table, $dataUpdate);
        return $response;
      }
    }

  }
  //quitar perdido anterior
  public static function ctrQuitarPedidoAnterior($actualPedido)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $actualPedido,
      "estadoPedido" => 1,
      "idSalMprima" => null,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlQuitarPedidoAnterior($table, $dataUpdate);
    return $response;
  }

  //asignar nuevo pedido a proceso cambiar el estado dela signado para diferenciarlo
  public static function ctrAgregarPedidoNuevo($nuevoPedido)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $nuevoPedido,
      "estadoPedido" => 2,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlAgregarPedidoNuevo($table, $dataUpdate);
    return $response;
  }

  //borrar  proceso operativo 
  public static function ctrBorrarProcOp($codProcDelet)
  {
    if ($_SESSION["idTipoUsu"] == 1) {
      //obtener registro actual de proceso operativo para borrar
      $registroProcOpActual = self::ctrViewRegDataProcOpDelet($codProcDelet);

      $idPedido = $registroProcOpActual["idPedido"];
      $idSalMprima = $registroProcOpActual["idSalMprima"];
      //actualizar tablas relacionadas
      $updatePedido = self::ctrQuitarPedidoAnterior($idPedido);
      $updateSalMprima = self::ctrQuitarSalMprimaProcOp($idSalMprima);

      $table = "proceso_operativo";
      $response = procesoOperativoModel::mdlBorrarProcOp($table, $codProcDelet);
      return $response;

    } else {
      return "noAdmin";
    }
  }
  //obtener registro actual de proceso operativopara borrar
  public static function ctrViewRegDataProcOpDelet($codProcDelet)
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlViewRegDataProcOpDelet($table, $codProcDelet);
    return $response;
  }

  //iniciar proceso operativo
  public static function ctrIniciarProcesoOperativo($codIniProcOp)
  {
    //obtener registro actual de proceso operativo para borrar
    $registroProcOpActual = self::ctrViewRegDataProcOpDelet($codIniProcOp);
    $idSalMprima = $registroProcOpActual["idSalMprima"];

    if ($idSalMprima != 0) {
      $table = "proceso_operativo";
      $dataUpdate = array(
        "idProcOp" => $codIniProcOp,
        "fechaInicioProcOp" => date("Y-m-d"),
        "estadoProcOp" => 2,//en proceso
        "DateUpdate" => date("Y-m-d\TH:i:sP"),
      );
      $response = procesoOperativoModel::mdlIniciarProcesoOperativo($table, $dataUpdate);
      return $response;
    } else {
      return "errorIniSalMprima";
    }
  }

  //finalizar proceso operativo
  public static function ctrFinalizarProcesoOperativo($codIniProcOp)
  {
    //obtener registro actual de proceso operativo para borrar
    $registroProcOpActual = self::ctrViewRegDataProcOpDelet($codIniProcOp);
    $idPedido = $registroProcOpActual["idPedido"];
    $idSalMprima = $registroProcOpActual["idSalMprima"];

    if ($idSalMprima != 0) {
      //actualziar estado de pedido a finalizado
      $statePedidoUpdate = self::ctrActualizarPedidoProcOpFin($idPedido);
      if ($statePedidoUpdate) {
        //crear registro de finalizacion de proceso operativo
        $createRegFinProceso = self::ctrRegistroProcOpFinalizado($codIniProcOp);
        $createRegMerma = self::ctrRegistroMermaProcOp($codIniProcOp, $idSalMprima);
        if ($createRegFinProceso) {
          $table = "proceso_operativo";
          $dataUpdate = array(
            "idProcOp" => $codIniProcOp,
            "estadoProcOp" => 5,//finalizado
            "DateUpdate" => date("Y-m-d\TH:i:sP"),
          );
          $response = procesoOperativoModel::mdlFinalizarProcesoOperativo($table, $dataUpdate);
          return $response;
        }
        ;
      } else {
        return "errorActPedido";
      }
    } else {
      return "errorSnSalida";
    }
  }

  //crear registro de finalizacion de proceso operativo
  public static function ctrRegistroProcOpFinalizado($codProcOp)
  {

    $table = "proceso_operativo_fin";
    $dataCreate = array(
      "idProcOp" => $codProcOp,
      "estadoProcOpFin" => 1,//finalizdo
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $createRegFinProceso = procesoOperativoModel::mdlRegistrarProcOpFinalizado($table, $dataCreate);
    if ($createRegFinProceso) {
      //ultimo registro de proceso operativo finalizado
      $obtenerUltimoRegistro = self::ctrUltimoRegProcOpFin();
      //registro de produccion
      $tableProducc = "produccion";
      $dataCreateProducc = array(
        "idProcOpFin" => $obtenerUltimoRegistro["idProcOpFin"],
        "estadoProduccion" => 1,//finalizdo
        "DateCreate" => date("Y-m-d\TH:i:sP"),
      );
      $response = procesoOperativoModel::mdlRegistrarProduccion($tableProducc, $dataCreateProducc);
    }
    return $response;

  }
  //ultimo registro de proceso operativo finalizado
  public static function ctrUltimoRegProcOpFin()
  {
    $table = "proceso_operativo_fin";
    $response = procesoOperativoModel::mdlUltimoRegProcOpFin($table);
    return $response;
  }

  //crear registro de merma ala finalizacion de proceso operativo
  public static function ctrRegistroMermaProcOp($idProcOp, $idSalMprima)
  {
    $table = "merma";
    $dataCreate = array(
      "idProcOp" => $idProcOp,
      "nombreMerma" => "Merma de proceso operativo Sin Aceptar",
      "idSalMprima" => $idSalMprima,
      "fechaMermaIng" => date("Y-m-d"),
      "estadoMerma" => 1,//Sin Aceptar
      "DateCreate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlRegistroMermaProcOp($table, $dataCreate);
    return $response;
  }
  //fin
  //actualziar estado de pedido a finalizado
  public static function ctrActualizarPedidoProcOpFin($idPedido)
  {
    $table = "pedido";
    $dataUpdate = array(
      "idPedido" => $idPedido,
      "estadoPedido" => 3,//finalizado
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlActualizarPedidoProcOpFin($table, $dataUpdate);
    return $response;
  }

  //visualizar datos estados de proceso operativo principal
  public static function ctrViewDataEstadosProcesoOperativo($dataEstadosProcOp)
  {
    $idProcOp = $dataEstadosProcOp["codProcOp"];
    $idTipoProc = $dataEstadosProcOp["codTipProc"];
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlViewDataEstadosProcesoOperativo($table, $idProcOp);
    return $response;
  }

  //visualizar procesos en el modal de procesos trabajo del proceso operativo
  public static function ctrVerProcesosTrabajo($dataEstadosFichTrab)
  {
    $idFichaProc = $dataEstadosFichTrab["idFichaProc"];
    $idProcOp = $dataEstadosFichTrab["idProcOp"];
    $estadoProcOp = self::ctrOptenerEstadoDeprocesoOp($idProcOp);
    $table = "ficha_proceso";
    $procesosTrabajo = procesoOperativoModel::mdlVerProcesosTrabajo($table, $idFichaProc);

    $response = array_merge(['estadosProcOpTrab' => $estadoProcOp], $procesosTrabajo);

    return $response;
  }
  //obtener estado de proceso operativo
  public static function ctrOptenerEstadoDeprocesoOp($idProcOp)
  {
    $table = "proceso_operativo";
    $response = procesoOperativoModel::mdlOptenerEstadoDeprocesoOp($table, $idProcOp);
    return $response;
  }

  //finalizar proceso operativo modal estados
  public static function ctrBtnFinalizarProcesoOperativo($idProcOpFin)
  {
    $idProcOp = $idProcOpFin["idProcOp"];
    //funcion para finalizar proceso operativo 
    $response = self::ctrFinalizarProcesoOperativo($idProcOp);
    return $response;
  }

  //actualizar estado de proceso operativo modal estados
  public static function ctrActualizarEstadoProcesoOperativo($dataActProcOp)
  {
    $table = "proceso_operativo";

    $idProcOp = $dataActProcOp["codProcOpEst"];
    $estadoProcOp = $dataActProcOp["estadoPrincipalProcOP"];
    $fechaFinAct = $dataActProcOp["fechaFinProcOpEstate"];

    $dataUpdate = array(
      "fechaFinProcOp" => $fechaFinAct,
      "idProcOp" => $idProcOp,
      "estadoProcOp" => $estadoProcOp,
      "DateUpdate" => date("Y-m-d\TH:i:sP"),
    );
    $response = procesoOperativoModel::mdlActualizarEstadoProcesoOperativo($table, $dataUpdate);
    return $response;
  }

  //ver productos en proceso de confeccion
  public static function ctrViewProdProcOpConfecion($codPed)
  {
    $table = "pedido";
    $idPedido = $codPed;
    $response = procesoOperativoModel::mdlViewProdProcOpConfecion($table, $idPedido);
    return $response;
  }

  //obtener codigo de producto
  public static function ctrObtenerCodigoProd($codProdCoti)
  {
    $table = "producto";
    $response = procesoOperativoModel::mdlObtenerCodigoProd($table, $codProdCoti);
    return $response;
  }
  ///////////////////////////////////////////////////




}
