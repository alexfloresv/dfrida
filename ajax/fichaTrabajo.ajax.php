<?php
require_once "../controller/fichaTrabajo.controller.php";
require_once "../model/fichaTrabajo.model.php";
require_once "../functions/fichaTrabajo.functions.php";
//inicio de secion 
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
//funciones para escuchar entrada de datos desde $.ajax de jquery
//datatable de fichaTrabajo
if (isset($_POST["todasLasFichasTrabajo"])) {
  $todasLasFichasTrabajo = new FichaTrabajoAjax();
  $todasLasFichasTrabajo->ajaxDTableFrichasTrabajo();
}

//visualizar procesos en el modal de procesos trabajo
if (isset($_POST["codFichTrab"])) {
  $view = new FichaTrabajoAjax();
  $view->codFichTrab = $_POST["codFichTrab"];
  $view->ajaxVerProcesosTrabajo($_POST["codFichTrab"]);
}

//  crear procesos trabajo
if (isset($_POST["jsonCrearProcesoTrabajo"], $_POST["jsonProcesosTrabajo"])) {
  $create = new FichaTrabajoAjax();
  $create->jsonCrearProcesoTrabajo = $_POST["jsonCrearProcesoTrabajo"];
  $create->jsonProcesosTrabajo = $_POST["jsonProcesosTrabajo"];
  $create->ajaxCrearFichaTrabajo($_POST["jsonCrearProcesoTrabajo"], $_POST["jsonProcesosTrabajo"]);
}

//visualizar datos para editar ficha trabajo
if (isset($_POST["codFichTrabView"])) {
  $viewData = new FichaTrabajoAjax();
  $viewData->codFichTrabView = $_POST["codFichTrabView"];
  $viewData->ajaxVerDataFichaTrabajo($_POST["codFichTrabView"]);
}

//  editar procesos trabajo
if (isset($_POST["jsonEditarFichaTrabajo"], $_POST["jsonProcesosTrabajoEdit"])) {
  $edit = new FichaTrabajoAjax();
  $edit->jsonEditarFichaTrabajo = $_POST["jsonEditarFichaTrabajo"];
  $edit->jsonProcesosTrabajoEdit = $_POST["jsonProcesosTrabajoEdit"];
  $edit->ajaxEditFichaTrabajo($_POST["jsonEditarFichaTrabajo"], $_POST["jsonProcesosTrabajoEdit"]);
}

//borrar cotizacion
if (isset($_POST["jsonBorraFichaTrabajo"])) {
  $delete = new FichaTrabajoAjax();
  $delete->jsonBorraFichaTrabajo = $_POST["jsonBorraFichaTrabajo"];
  $delete->ajaxBorrarFichaTrabajo($_POST["jsonBorraFichaTrabajo"]);
}

//  Descargar PDF de la cotizacion
if (isset($_POST["jsonPdfCotizacion"])) {
  $pdf = new FichaTrabajoAjax();
  $pdf->jsonPdfCotizacion = $_POST["jsonPdfCotizacion"];
  $pdf->ajaxDescargarPdfCotizacion($_POST["jsonPdfCotizacion"]);
}
//modal de tipos de procesos operativos modal
if (isset($_POST["todasLasFichasTrabajoModal"])) {
  $todasLasFichasTrabajoModal = new FichaTrabajoAjax();
  $todasLasFichasTrabajoModal->ajaxDTableFrichasTrabajoModal();
}
/////////////////////////////

class FichaTrabajoAjax
{
  //datatable de fichas trabajo
  public function ajaxDTableFrichasTrabajo()
  {
    $todasLasFichasTrabajo = FichaTrabajoController::ctrDTableFrichasTrabajo();
    foreach ($todasLasFichasTrabajo as &$proces) {
      $proces['buttons'] = FunctionFichaTrabajo::getBtnFichaTrabajo($proces["idFichaProc"]);
      $proces['modalProcs'] = FunctionFichaTrabajo::getBtnVerProcesTrabajo($proces["idFichaProc"]);
    }
    //mostar todos los ProductosMprima DataTable
    echo json_encode($todasLasFichasTrabajo);
  }

  //visualizar procesos en el modal de procesos trabajo
  public function ajaxVerProcesosTrabajo($codFichTrab)
  {
    $response = FichaTrabajoController::ctrVerProcesosTrabajo($codFichTrab);
    echo json_encode($response);
  }

  //  crear ficha Trabajo
  public function ajaxCrearFichaTrabajo($jsonCrearProcesoTrabajo, $jsonProcesosTrabajo)
  {
    $CrearProcesoTrabajo = json_decode($jsonCrearProcesoTrabajo, true);

    $response = FichaTrabajoController::ctrCrearFichaTrabajo($CrearProcesoTrabajo, $jsonProcesosTrabajo);
    echo json_encode($response);
  }

  //visualizar datos para editar ficha trabajo
  public function ajaxVerDataFichaTrabajo($codFichTrabView)
  {
    $response = FichaTrabajoController::ctrVerDataFichaTrabajo($codFichTrabView);
    echo json_encode($response);
  }

  //  editar ficha Trabajo
  public function ajaxEditFichaTrabajo($jsonEditarFichaTrabajo, $jsonProcesosTrabajoEdit)
  {
    $editarProcesoTrabajo = json_decode($jsonEditarFichaTrabajo, true);

    $response = FichaTrabajoController::ctrEditFichaTrabajo($editarProcesoTrabajo, $jsonProcesosTrabajoEdit);
    echo json_encode($response);
  }

  //eliminar ficha trabajo
  public function ajaxBorrarFichaTrabajo($jsonBorraFichaTrabajo)
  {
    $borrarFichaTrabajo = json_decode($jsonBorraFichaTrabajo, true);
    $response = FichaTrabajoController::ctrDeleteFichaTrabajo($borrarFichaTrabajo);
    echo json_encode($response);
  }

  //  Descargar PDF de la cotizacion
  public function ajaxDescargarPdfCotizacion($jsonPdfCotizacion)
  {
    $codCotiPdf = json_decode($jsonPdfCotizacion, true); // Decodificar la cadena de texto JSON en un array asociativo
    $response = FichaTrabajoController::ctrDescargarPdfCotizacion($codCotiPdf);
    echo json_encode($response);
  }
    //datatable de fichas trabajo modal
    public function ajaxDTableFrichasTrabajoModal()
    {
      $todasLasFichasTrabajoModal = FichaTrabajoController::ctrDTableFrichasTrabajo();
      foreach ($todasLasFichasTrabajoModal as &$proces) {
        $proces['buttons'] = FunctionFichaTrabajo::getBtnFichaTrabajoModal($proces["idFichaProc"]);
        $proces['modalProcs'] = FunctionFichaTrabajo::getBtnVerProcesTrabajo($proces["idFichaProc"]);
      }
      //mostar todos los ProductosMprima DataTable
      echo json_encode($todasLasFichasTrabajoModal);
    }
}

