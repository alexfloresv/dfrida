<?php
class FunctionSalidaProd
{

  //botones para la salida
  public static function getBtnSalProd($codSalProd)
  {
    $botones = '
     <button class="btn btn-warning btnEditarSalProd" codSalProd="' . $codSalProd . '"><i class="fa-solid fa-pencil"></i></i></button>
      <button class="btn btn-danger btnDeleteSalProd" codSalProd="' . $codSalProd . '"><i class="fa-solid fa-trash"></i></button>
    ';
    return $botones;
  }
   //boton para modal salida
   public static function getBtnVerPedSalProd($codPedSalProd)
   {
     $botones = '
        <button class="btn btn-warning btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalProdIngresados" codPedSalProd="' . $codPedSalProd . '"><i class="fa-solid fa-clipboard-list"></i></button>
       ';
     return $botones;
   }

  //boton para modal salida
  public static function getBtnVerSalProd($codAllSalProd)
  {
    $botones = '
       <button class="btn btn-info btnVerIngProd" data-bs-toggle="modal" data-bs-target="#modalProdIngresados" codAllSalProd="' . $codAllSalProd . '"><i class="fa-solid fa-cubes-stacked"></i></button>
      ';
    return $botones;
  }
}

