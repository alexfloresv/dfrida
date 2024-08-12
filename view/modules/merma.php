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
      <h1 class="mt-4">Lista de Mermas</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableMerma -->
          <h5 class="mt-4 tituloMerma"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableMerma -->
          <table id="dataTableMerma" class="display dataTableMerma">
            <thead>
              <!-- dataTableMerma -->
            </thead>
            <tbody>
              <!--dataTableMerma-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>


<!-- Modal productos ingresados-->
<div class="modal fade" id="modalMateriaPrimaMerma" tabindex="-1" aria-labelledby="modalMateriaPrimaMerma"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">

        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="procesosTrabajoModal">
        <span style="margin-right: 10px;"></span>
        <!-- Productos materia prima-->
        <div class="container row g-3" style="border: 3px solid #808080; padding: 3px;     margin-left: 2px; ">
          <h3>Edite y elimine la Materia Prima a Mermar</h3>

          <span style="margin-right: 10px;"></span>

          <div class="row" style="font-weight: bold">
            <div class="col-lg-2">Nombre</div>
            <div class="col-lg-2">Codigo</div>
            <div class="col-lg-2">Unidad</div>
            <div class="col-lg-2">Cantidad</div>
            <div class="col-lg-2">Precio Producto</div>
          </div>
          <!-- aqui se agregan los productos del modal de prodcutos  -->
          <div class="form-group row AddMateriaPrimaMerma">

            <!-- aqui se agregan los productos selecionado del modal de prodcutos  -->
          </div>
          <span style="margin-right: 10px;"></span>
        </div>
        <!-- fin -->
        <span style="margin-right: 10px;"></span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-success" id="crearProcOpModal">AceptarMerma</button>
      </div>
    </div>
  </div>
</div>
<!-- fin modal de aceptar produccion -->

<!-- fin del div de bodyu -->
</div>