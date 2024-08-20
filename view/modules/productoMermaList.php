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