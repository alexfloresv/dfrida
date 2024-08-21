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
        Creacion Producto Merma D'Frida
      </h1>
    </div>

    <form role="form" method="post" class="row g-3 m-2 formIngresoProdMerma " id="formIngresoProdMerma">

      <div class="container row g-8" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">

        <h3> Producto Merma</h3>

        <!-- datos de la cotizacion Enpresa -->
        <div class="form-group col-md-8">
          <label for="nombreProdMerma" class="form-label" style="font-weight: bold">Descripcion Ingreso Producto
            Merma:</label>
          <input type="text" class="form-control" id="nombreProdMerma" name="nombreProdMerma"
            placeholder="Ingrese una una descripcion para el ingreso ">
        </div>

        <div class="col-md-2">
          <label for="fechaProdMerma" class="form-label" style="font-weight: bold">Fecha Ingreso: </label>
          <input type="date" class="form-control" id="fechaProdMerma" name="fechaProdMerma">
        </div><br>

        <!-- fin -->
      </div>

      <!-- Productos -->
      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Agregar Producto Merma a Crear</h3>
        <div class="d-inline-flex m-2">
          <button type="button" class="btn btn-warning" id="btnAddNuevoProdMerma">Agregar Productos Merma Nuevo
          </button>
        </div>

        <div class="row" style="font-weight: bold">
          <div class="col-lg-2">Nombre</div>
          <div class="col-lg-2">Codigo</div>
          <div class="col-lg-2">Unidad</div>
          <div class="col-lg-2">Cantidad</div>
          <div class="col-lg-2">Precio Producto</div>
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->
        <div class="form-group row AddProductoMermaNuevo">

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
            <label for="totalProdMerma" class="form-label" style="font-weight: bold">Total Producto Merma : </label>
            <input type="text" class="form-control" id="totalProdMerma" name="totalProdMerma" value=""
              placeholder="Total producto" readonly required>
          </div>
        </div>
        <!-- fin -->
      </div>
      <!-- fin -->

      <div class="container row g-3" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
        <h3>Materias Prima Merma Confirmada </h3>

        <div class="col-md-2" style="border: 3px solid #808080; padding: 3px; margin-left: 2px; ">
          <div id="prodMermaAdd">
            <button type="button" class="btn btn-primary w-100" id="btnAddProductosMermados">Agregar Merma</button>
          </div>
        </div>


        <div class="row mt-3" style="font-weight: bold">
          <div class="col-lg-2">Nombre Materia Prima Merma</div>
          <div class="col-lg-2">Codigo</div>
          <div class="col-lg-2">Unidad</div>
          <div class="col-lg-2">Cantidad</div>
          <div class="col-lg-2">Precio Materia Prima Merma</div>
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->
        <div class="form-group row AddMateriaPrimaMermad">
        </div>
        <!-- aqui se agregan los productos del modal de prodcutos  -->

        <!-- fin -->

        <!-- total producto materia prima -->
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
            <label for="totalMerma" class="form-label" style="font-weight: bold">Total Merma : </label>
            <input type="text" class="form-control" id="totalMerma" name="totalMerma" value="" placeholder="Total merma"
              readonly required>
          </div>
        </div>
        <!-- fin -->
      </div>

      <!-- campo que guarde el id del registro-->
      <input type="hidden" class="form-control" id="codProduccion" name="codProduccion">

      <!-- fin -->
      <div class="container row g-3 p-3 ">
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-danger" style="margin-right: 10px;"
          id="btnCerrarProductoMerma">Cerrar</button>
        <button type="button" class="col-2 d-inline-flex-center p-2 btn btn-success "
          id="btnRegistrarProdMerma">Registrar Producto merma a Almacen </button>
      </div>
    </form>
  </main>
</div>
</div>
