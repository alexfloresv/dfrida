<?php 

//  Controllers
require_once "controller/template.controller.php";


//  Controllers 
require_once "controller/users.controller.php";
require_once "controller/clients.controller.php";
require_once "controller/proveedores.controller.php";
require_once "controller/products.controller.php";
require_once "controller/categoriaProd.controller.php";
require_once "controller/productMprima.controller.php";
require_once "controller/categoriaProdMprima.controller.php";
require_once "controller/cotizacion.controller.php";
require_once "controller/fichaTecnica.controller.php";
require_once "controller/fichaTrabajo.controller.php";
require_once "controller/ingresoProd.controller.php";
require_once "controller/almacenProductos.controller.php";
require_once "controller/salidaProd.controller.php";
require_once "controller/ingresoMprima.controller.php";
require_once "controller/almacenMateriaPrima.controller.php";
require_once "controller/salidaMprima.controller.php";
require_once "controller/procesoOperativo.controller.php";
require_once "controller/produccion.controller.php";
require_once "controller/pedidos.controller.php";
require_once "controller/merma.controller.php";
require_once "controller/home.controller.php";
require_once "controller/productoMerma.controller.php";

//+



//  Models
require_once "model/users.model.php";
require_once "model/clients.model.php";
require_once "model/proveedores.model.php";
require_once "model/products.model.php";
require_once "model/categoriaProd.model.php";
require_once "model/productMprima.model.php";
require_once "model/categoriaProdMprima.model.php";
require_once "model/cotizacion.model.php";
require_once "model/fichaTecnica.model.php";
require_once "model/fichaTrabajo.model.php";
require_once "model/ingresoProd.model.php";
require_once "model/almacenProductos.model.php";
require_once "model/salidaProd.model.php";
require_once "model/ingresoMprima.model.php";
require_once "model/almacenMateriaPrima.model.php";
require_once "model/salidaMprima.model.php";
require_once "model/procesoOperativo.model.php";
require_once "model/produccion.model.php";
require_once "model/pedidos.model.php";
require_once "model/merma.model.php";
require_once "model/home.model.php";
require_once "model/productoMerma.model.php";

//+


//  Functions
require_once "functions/alertas.function.php";
require_once "functions/usuarios.functions.php";
require_once "functions/clientes.functions.php";
require_once "functions/proveedores.functions.php";
require_once "functions/productos.functions.php";
require_once "functions/categoriaProd.functions.php";
require_once "functions/productoMprima.functions.php";
require_once "functions/categoriaProdMprima.functions.php";
require_once "functions/cotizacion.functions.php";
require_once "functions/fichaTecnica.functions.php";
require_once "functions/fichaTrabajo.functions.php";
require_once "functions/ingresoProd.functions.php";
require_once "functions/almacenProductos.functions.php";
require_once "functions/salidaProd.functions.php";
require_once "functions/ingresoMprima.functions.php";
require_once "functions/salidaMprima.functions.php";
require_once "functions/procesoOperativo.functions.php";
require_once "functions/produccion.functions.php";
require_once "functions/pedidos.functions.php";
require_once "functions/merma.functions.php";
require_once "functions/productoMerma.functions.php";
//+
$template = new TemplateController();
$template -> ctrTemplate();