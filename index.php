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

//+
$template = new TemplateController();
$template -> ctrTemplate();