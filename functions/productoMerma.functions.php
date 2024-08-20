<?php
class FunctionProductoMerma
{

 
  public static function getEstadoProdMerma($stateValue)
  {

    if ($stateValue == 1) {
      $estado = '<span class="badge rounded-pill bg-success">En Almacen</span>';
    }
    if ($stateValue == 2) {
      $estado = '<span class="badge rounded-pill bg-primary">Confirmada</span>';
    }
 
    return $estado;
  }

  //botones de productos prima merma
  public static function btnProdMprimaMerma($codProdMpMerma)
  {

    $botones = '
              <button class="btn btn-primary btnMermaMPrima" codProdMpMerma="' . $codProdMpMerma . '" ><i class="fa-solid fa-recycle"></i></button>
              ';

    return $botones;
  }

   //botones de productos prima merma
   public static function btnProdMerma($codProdMerma)
   {
 
     $botones = '
               <button class="btn btn-primary btnMermaMPrima" codProdMerma="' . $codProdMerma . '" ><i class="fa-solid fa-arrow-up-wide-short"></i></button>
               ';
 
     return $botones;
   }

}

