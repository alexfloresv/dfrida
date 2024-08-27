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
      <h1 class="mt-4">Catálogo de Materia Prima</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Todos los Productos</li>
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAddProductoMprima">
          Agregar Producto Prima
        </button>
        <span style="margin-right: 10px;"></span>
        <!-- Button  modal  ver lista categorias-->
        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalViewCatProdMprima">
          Ver todas las Categorías Producto Prima
        </button>
        <span style="margin-right: 10px;"></span>
        <!-- Button  modal  crear categoria-->
        <button type="button" class="btn btn-info" data-bs-toggle="modal"
          data-bs-target="#modalCrearCategoriaProdMprima">
          Crear Categoría Producto Prima
        </button>
      </div>
      <!--  -->
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProductosMprima -->
          <h5 class="mt-4 tituloProductosMprima"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProductosMprima -->
          <table id="dataTableProductosMprima" class="display dataTableProductosMprima">
            <thead>
              <!-- dataTableProductosMprima -->
            </thead>
            <tbody>
              <!--dataTableProductosMprima-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
      <!--  -->
    </div>
  </main>
</div>
</div>

<!-- Modal Add ProductMprima -->
<div class="modal fade" id="modalAddProductoMprima" tabindex="-1" role="dialog" aria-labelledby="modalAddProductoMprima"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Producto Prima</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" id="formCrearProductoMprima">

          <!-- Nombre Producto -->
          <div class="form-group">
            <label for="productNameMp" class="col-form-label">Nombre del Producto:</label>
            <input type="text" class="form-control" id="productNameMp" name="productNameMp" required>
          </div>

          <!-- Categoría -->
          <div class="form-group" id="productCategoryContainerMprima">

          </div>

          <!-- Provedores -->
          <div class="form-group" id="proveedorMprima">

          </div>

          <!-- Codigo Producto -->
          <div class="form-group">
            <label for="productCodigoMp" class="col-form-label">Código Producto:</label>
            <input type="text" class="form-control" id="productCodigoMp" name="productCodigoMp" required>
          </div>

          <!-- Unidad -->
          <div class="form-group">
            <label for="productUnitMp" class="col-form-label">Unidad:</label>
            <input type="text" class="form-control" id="productUnitMp" name="productUnitMp"
              placeholder="1/Metros/Uni/etc" required>
          </div>

          <!-- Precio -->
          <div class="form-group">
            <label for="productPriceMp" class="col-form-label">Precio:</label>
            <input type="number" step="0.01" class="form-control" id="productPriceMp" name="productPriceMp" required>
          </div>

          <!-- Detalle Producto -->
          <div class="form-group">
            <label for="productDetailMp" class="col-form-label">Observación del Producto Prima:</label>
            <input type="text" class="form-control" id="productDetailMp" name="productDetailMp">
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="btnCrearProductoMprima">Crear Producto</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal Editar productMprima -->
<div class="modal fade" data-bs-backdrop="static" id="modalEditProductoMprima" tabindex="-1"
  aria-labelledby="modalEditProductoMprima" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Editar Producto Prima </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="post" id="formEditarProductoMprima">
        <div class="modal-body">
          <div class="box-body">

            <!-- Nombre Producto -->
            <div class="form-group">
              <label for="editProductNameMp" class="col-form-label">Nombre del Producto:</label>
              <input type="text" class="form-control" id="editProductNameMp" name="editProductNameMp" required>
            </div>

            <!-- categoria producto -->
            <div class="form-group" id="productCategoryContainerMprimaEdit">

            </div>

            <!-- Provedores -->
            <div class="form-group" id="proveedorMprimaEdit">

            </div>

            <!-- Codigo Producto -->
            <div class="form-group">
              <label for="editProductCodigoMp" class="col-form-label">Codigo Producto:</label>
              <input type="text" class="form-control" id="editProductCodigoMp" name="editProductCodigoMp" required>
            </div>

            <!-- Unidad -->
            <div class="form-group">
              <label for="editProductUnitMp" class="col-form-label">Unidad:</label>
              <input type="text" class="form-control" id="editProductUnitMp" name="editProductUnitMp" required>
            </div>

            <!-- Precio -->
            <div class="form-group">
              <label for="editProductPriceMp" class="col-form-label">Precio:</label>
              <input type="number" step="0.01" class="form-control" id="editProductPriceMp" name="editProductPriceMp"
                required>
            </div>

            <!-- Detalle Producto -->
            <div class="form-group">
              <label for="editProductDetailMp" class="col-form-label">Observación del Producto Prima:</label>
              <input type="text" class="form-control" id="editProductDetailMp" name="editProductDetailMp">
            </div>


          </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="codProductMp" name="codProductMp" class="codProductMp">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            id="btnCerrarEditarProducto">Cerrar</button>
          <button type="button" class="btn btn-primary" id="btnEditarProductoMprima">Editar Producto</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Crear Categoria produtos prima-->
<div class="modal fade" id="modalCrearCategoriaProdMprima" data-bs-backdrop="static" data-bs-keyboard="false"
  tabindex="-1" aria-labelledby="modalCrearCategoriaProdMprima" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalCrearCategoriaProdMprima">Crear Nueva Categoria</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form role="form" id="formCrearCategoriaProdMprima">
          <div class="form-group">
            <label for="categoriaNameProdMprima" class="col-form-label">Nombre Categoria Materia Prima</label>
            <input type="text" class="form-control" id="categoriaNameProdMprima" name="categoriaNameProdMprima"
              required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnCerrarCrearCategoria"
          data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnCrearCategoriaProdMprima">Crear Categoria Prima</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Ver Categorias produtos prima-->
<div class="modal fade" id="modalViewCatProdMprima" tabindex="-1" aria-labelledby="modalViewCatProdMprima"
  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalViewCatProdMprima">Lista Categorías Producto Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableCategoriasProductosMprima" class="display dataTableCategoriasProductosMprima">
          <thead>
            <!-- dataTableCategoriasProductosMprima -->
          </thead>
          <tbody>
            <!--dataTableCategoriasProductosMprima-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnCerrarViewCatProd"
          data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Editar Categoria produtos prima -->
<div class="modal fade" id="modalEditarCategoriaProdMprima" data-bs-backdrop="static" data-bs-keyboard="false"
  tabindex="-1" aria-labelledby="modalEditarCategoriaProdMprima" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalEditarCategoriaProdMprima">Editar Categoria</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form role="form" id="formEditarCategoriaProdMprima">
          <div class="form-group">
            <label for="categoriaNameProdEditarMprima" class="col-form-label">Nombre Categoria Materia Prima</label>
            <input type="text" class="form-control" id="categoriaNameProdEditarMprima"
              name="categoriaNameProdEditarMprima" required>
          </div>
          <input type="hidden" id="codCatProMp" name="codCatProMp" class="codCatProMp">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnCerrarEditarCategoriaProdMprima"
          data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnEditarCategoriaProdMprima">Editar Categoria</button>
      </div>
    </div>
  </div>
</div>