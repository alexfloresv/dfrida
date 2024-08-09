<?php
class FunctionSalidaMprima
{

  //botones para la salida
  public static function getBtnSalProd($codSalMprima)
  {
    $botones = '
     <button class="btn btn-warning btnEditarSalProd" codSalMprima="' . $codSalMprima . '"><i class="fa-solid fa-pencil"></i></i></button>
      <button class="btn btn-danger btnDeleteSalProd" codSalMprima="' . $codSalMprima . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
  //boton para modalde proceso operativo 
  public static function getBtnVerProcSalMprima($codProcSalMprima)
  {
    $botones = '
        <button class="btn btn-warning btnVerProcOp" codProcSalMprima="' . $codProcSalMprima . '"><i class="fa-solid fa-clipboard-list"></i></button>
       ';
    return $botones;
  }

  //boton para modal salida de materias primas salidas
  public static function getBtnVerSalMprima($codAllSalMprima)
  {
    $botones = '
       <button class="btn btn-info btnVerSalProd" data-bs-toggle="modal" data-bs-target="#modalProdSalidas" codAllSalMprima="' . $codAllSalMprima . '"><i class="fa-solid fa-arrow-up-right-dots"></i></button>
      ';
    return $botones;
  }
}

