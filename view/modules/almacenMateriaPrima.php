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
      <h1 class="mt-4">Stock de Almacen Productos Prima</h1>
      <ol class="breadcrumb mb-4">
   
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" id="btnAddIngresoProd">
         Descargar Iventario <i class="fa-solid fa-file-arrow-down fa-1x"></i>
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableAlmacenMateriaPrima -->
          <h5 class="mt-4 tituloAlmacenMateriaPrima"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableAlmacenMateriaPrima -->
          <table id="dataTableAlmacenMateriaPrima" class="display dataTableAlmacenMateriaPrima">
            <thead>
              <!-- dataTableAlmacenMateriaPrima -->
            </thead>
            <tbody>
              <!--dataTableAlmacenMateriaPrima-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>