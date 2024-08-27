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
      <h1 class="mt-4">Lista de Productos terminados</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProduccion -->
          <h5 class="mt-4 tituloProduccion"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProduccion -->
          <table id="dataTableProduccion" class="display dataTableProduccion">
            <thead>
              <!-- dataTableProduccion -->
            </thead>
            <tbody>
              <!--dataTableProduccion-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>


<!-- modal data table  ver los productos adjuntos no tocar-->
<div class="modal fade" id="modalVerProductosPedido" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalVerProductosPedido" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="">Productos Confeccionados</h1>
      </div>
      <div class="modal-body" id="">
        <div class="container">

          <div class="row">

            <div class="card-body">
              <!-- dataTableProductosActivosConfeccion -->
              <table id="dataTableProductosActivosConfeccion" class="display dataTableProductosActivosConfeccion">
                <thead>
                  <!-- dataTableProductosActivosConfeccion -->
                </thead>
                <tbody>
                  <!--dataTableProductosActivosConfeccion-->
                </tbody>
              </table>
              <!-- fin -->
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger " id="" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin modal -->

<!-- Modal Aceptar Produccion-->
<div class="modal fade" id="modalProduccionAceptacion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalProduccionAceptacion" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="">Aceptar Produccion</h1>
      </div>
      <div class="modal-body" id="">
        <div class="container">
          <form id="formProduccionAceptacion">
            <div class="row">

              <div class="col-md-4 ">
                <label for="nombreProduccionAcept" class="form-label" style="font-weight: bold">Nombre Produccion:</label>
                <input type="text" class="form-control" id="nombreProduccionAcept" name="nombreProduccionAcept">
              </div>

              <div class="col-md-4 ">
                <label for="fechaProduccionAcept" class="form-label" style="font-weight: bold">Fecha Aprobada:</label>
                <input type="date" class="form-control" id="fechaProduccionAcept" name="fechaProduccionAcept">
              </div>


              <!-- ver las salidas de productos prima -->
              <div class="col-md-4">
                <div class="form-group">
                  <label for="codProduccionAcept">Crear Ingreso a almacén</label>
                  <button type="button" class="btn btn-warning" id="codProduccionAcept" value="">
                    Crear Ingreso Directo
                  </button>
                </div>
              </div>

              <!-- campo que guarde el id del registro-->
              <input type="hidden" class="form-control" id="codProduccion" name="codProduccion">

          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" id="crearAceptacionProduccion">Aceptar Produccion</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<!-- fin -->