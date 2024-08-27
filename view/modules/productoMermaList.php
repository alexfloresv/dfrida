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
      <h1 class="mt-4">Lista de Productos Merma Registrados</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-primary me-4" id="btnRegistrarProdMerma">
          Crear Producto Merma
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProductoMerma -->
          <h5 class="mt-4 tituloProdMerma"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProductoMerma -->
          <table id="dataTableProductoMerma" class="display dataTableProductoMerma">
            <thead>
              <!-- dataTableProductoMerma -->
            </thead>
            <tbody>
              <!--dataTableProductoMerma-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>

<!-- Modal producto merma-->
<div class="modal fade" id="modalProdMerma" tabindex="-1" aria-labelledby="modalProdMerma" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Nuevos Productos Mermas</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="">

        <table id="modalDataTableProdMerma" class="display modalDataTableProdMerma">
          <thead>
            <!-- modalDataTableProdMerma -->
          </thead>
          <tbody>
            <!--modalDataTableProdMerma-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- fin -->

<!-- Modal productos merma mprima-->
<div class="modal fade" id="modalProdMprimaMerma" tabindex="-1" aria-labelledby="modalProdMprimaMerma"
  aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Materias Prima Mermadas</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="">

        <table id="modalDataTableProdMprimaMerma" class="display modalDataTableProdMprimaMerma">
          <thead>
            <!-- modalDataTableProdMprimaMerma -->
          </thead>
          <tbody>
            <!--modalDataTableProdMprimaMerma-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- fin -->