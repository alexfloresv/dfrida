<?php
class FunctionFichaTrabajo
{

  //botones ficha trabajo
  public static function getBtnFichaTrabajo($codFichTrab)
  {
    $botones = '
       <button class="btn btn-dark btnDescargarFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-file-pdf"></i></i></button>
       <button class="btn btn-warning btnEditFichaTrabajo" codFichTrab="' . $codFichTrab . '" ><i class="fa-solid fa-pencil"></i></button>
    <button class="btn btn-danger btnDeleteFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
  //boton ver procesos trabajo
  public static function getBtnVerProcesTrabajo($codFichTrab)
  {
    $botones = '
     <button class="btn btn-info btnVerFichaTrabajo" data-bs-toggle="modal" data-bs-target="#modalProcesosTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-network-wired"></i></button>
    ';
    return $botones;
  }
  //boton pdf ver fichas de trajaoi modal
  public static function getBtnFichaTrabajoModal($codFichTrab)
  {
    $botones = '
       <button class="btn btn-primary btnDescargarFichaTrabajo" codFichTrab="' . $codFichTrab . '"><i class="fa-solid fa-file-pdf"></i></i></button>  
    ';
    return $botones;
  }
}

