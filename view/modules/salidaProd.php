</div>
</div>

<div class="sb-sidenav-footer">
  <div class="small">Sesión iniciada como:</div>
  <?php echo $_SESSION["nombre"] ?>
</div>
</nav>
</div>

<div id="layoutSidenav_content">
  <main class="bg">
    <div class="container-fluid px-4">
      <h1 class="mt-4">
        Salida Productos D'Frida
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formSalidaProd " id="formSalidaProd">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3>Datos para la Salida de Productos del Almacen</h3>

        <!-- datos de la cotizacion Enpresa -->
        <div class="form-group col-md-10">
          <label for="tituloSalProdAdds" class="form-label" style="font-weight: bold">Descripcion Salida:</label>
          <input type="text" class="form-control" id="tituloSalProdAdds" name="tituloSalProdAdds"
            placeholder="Ingrese una una descripcion para la salida ">
        </div>
        <div class="col-md-2">
          <label for="fechaSalProdAdd" class="form-label" style="font-weight: bold">Fecha Salida: </label>
          <input type="date" class="form-control" id="fechaSalProdAdd" name="fechaSalProdAdd">
        </div><br>

        <!-- fin -->
      </div>

      <!-- Productos -->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Ingresar Productos de Almacen</h3>
        <div class="d-inline-flex m-2">
          <button type="button" class="btn btn-warning" data-bs-toggle="modal"
            data-bs-target="#modalAddProdSali">Agregar Productos</button>
        </div>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-2">Nombre</div>
          <div class="col-lg-2">Codigo</div>
          <div class="col-lg-2">Unidad</div>
          <div class="col-lg-2">Cantidad</div>
          <div class="col-lg-2">Precio Producto</div>
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->
        <div class="form-group row AddProductoSalida">

          <!-- aqui se agregan los productos selecionado del modal de prodcutos  -->
        </div>

        <!-- total producto  -->
        <div class="form-group row ">
          <div class="form-group col-md-4">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>

          <div class="form-group col-md-2">
            <label for="totalIngProdAddList" class="form-label" style="font-weight: bold">Total Producto : </label>
            <input type="text" class="form-control" id="totalIngProdAddList" name="totalIngProdAddList" value=""
              placeholder="Total Productos" readonly required>
          </div>
        </div>
        <!-- fin -->
      </div>
      <!-- fin -->

      <!-- Calculo totales-->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Valores Totales de la salida Almacen</h3>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-4"></div>
          <div class="col-lg-2"> </div>
          <div class="col-lg-2">IGV</div>
          <div class="col-lg-2">Sub Total</div>
          <div class="col-lg-2">Total S/</div>
        </div>
        <div class="form-group row totalIngreso">
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <!-- vacio -->
          </div>
          <div class="form-group col-md-2">
            <button type="button" class="btn btn-info btnCalcularTotalIng" id="btnCalcularTotalIng">Calular Total
            </button>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="igvIngProdAdd" name="igvIngProdAdd" value=""
              placeholder="IGV" readonly required>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="subTotalIngProdAdd" name="subTotalIngProdAdd" value=""
              placeholder="Sub Total Ingreso" readonly required>
          </div>
          <div class="form-group col-md-2">
            <input type="text" class="form-control" id="totalIngProdAdd" name="totalIngProdAdd" value=""
              placeholder="Total Ingreso" readonly required>
          </div>
        </div>
      </div>
      <!-- fin -->
      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarSalidaProd">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success "
          id="btnRegistrarSalidaProd">Registrar Salida</button>
      </div>
    </form>
  </main>
</div>
</div>

<!-- Modal produtos -->
<div class="modal fade" id="modalAddProdSali" tabindex="-1" aria-labelledby="modalAddProdSali" aria-hidden="true">
  <div class="modal-dialog modal-lg"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalAddProdSali">Lista Productos de Almacen </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableProductosSalidaAlmacen" class="display dataTableProductosSalidaAlmacen">
          <thead>
            <!-- dataTableProductosSalidaAlmacen -->
          </thead>
          <tbody>
            <!--dataTableProductosSalidaAlmacen-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>