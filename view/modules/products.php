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
      <h1 class="mt-4">Catálogo de Productos</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Todos los Productos</li>
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modalAddProducto">
          Agregar Producto
        </button>
        <span style="margin-right: 10px;"></span>
        <!-- Button  modal  ver lista categorias-->
        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalViewCatProd">
          Ver todas las Categorias Producto
        </button>
        <span style="margin-right: 10px;"></span>
        <!-- Button  modal  crear categoria-->
        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalCrearCategoriaProd">
          Crear Categoria Producto
        </button>
      </div>
      <!--  -->
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProductos -->
          <h5 class="mt-4 tituloProductos"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProductos -->
          <table id="dataTableProductos" class="display dataTableProductos">
            <thead>
              <!-- dataTableProductos -->
            </thead>
            <tbody>
              <!--dataTableProductos-->
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

<!-- Modal Add Product -->
<div class="modal fade" id="modalAddProducto" tabindex="-1" role="dialog" aria-labelledby="modalAddProducto"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Producto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" id="formCrearProducto">

          <!-- Nombre Producto -->
          <div class="form-group">
            <label for="productName" class="col-form-label">Nombre del Producto:</label>
            <input type="text" class="form-control" id="productName" name="productName" required>
          </div>

          <!-- Categoría -->
          <div class="form-group">
            <label for="productCategory" class="col-form-label">Categoría:</label>
            <select class="form-control" name="productCategory" id="productCategory">
              <?php
              $categoryList = ProductsController::ctrGetAllCategories();
              foreach ($categoryList as $key => $value) {
                echo '<option value="' . $value["idCatPro"] . '">' . $value["nombreCategoriaProd"] . '</option>';
              }
              ?>
            </select>
          </div>

          <!-- Codigo Producto -->
          <div class="form-group">
            <label for="productCodigo" class="col-form-label">Codigo Producto:</label>
            <input type="text" class="form-control" id="productCodigo" name="productCodigo" required>
          </div>

          <!-- Unidad -->
          <div class="form-group">
            <label for="productUnit" class="col-form-label">Unidad:</label>
            <input type="text" class="form-control" id="productUnit" name="productUnit" value="" placeholder="1/Uni/Docena/etc" required>
          </div>

          <!-- Precio -->
          <div class="form-group">
            <label for="productPrice" class="col-form-label">Precio:</label>
            <input type="number" step="0.01" class="form-control" id="productPrice" name="productPrice" required>
          </div>

          <!-- Detalle Producto -->
          <div class="form-group">
            <label for="productDetail" class="col-form-label">Observacion del Producto:</label>
            <input type="text" class="form-control" id="productDetail" name="productDetail">
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="btnCrearProducto">Crear Producto</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal Editar Producto -->
<div class="modal fade" data-bs-backdrop="static" id="modalEditProducto" tabindex="-1"
  aria-labelledby="modalEditProducto" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Editar Producto </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form role="form" method="post" id="formEditarProducto">
        <div class="modal-body">
          <div class="box-body">

            <!-- Nombre Producto -->
            <div class="form-group">
              <label for="editProductName" class="col-form-label">Nombre del Producto:</label>
              <input type="text" class="form-control" id="editProductName" name="editProductName" required>
            </div>

            <!-- categoria producto -->
            <div class="form-group">
              <label for="editProductCategory" class="col-form-label">Categoría:</label>
              <select class="form-control" name="editProductCategory" id="editProductCategory">
                <?php
                $categoryList = ProductsController::ctrGetAllCategories();
                foreach ($categoryList as $key => $value) {
                  echo '<option value="' . $value["idCatPro"] . '">' . $value["nombreCategoriaProd"] . '</option>';
                }
                ?>
              </select>
            </div>

            <!-- Codigo Producto -->
            <div class="form-group">
              <label for="editProductCodigo" class="col-form-label">Codigo Producto:</label>
              <input type="text" class="form-control" id="editProductCodigo" name="editProductCodigo" required>
            </div>

            <!-- Unidad -->
            <div class="form-group">
              <label for="editProductUnit" class="col-form-label">Unidad:</label>
              <input type="text" class="form-control" id="editProductUnit" name="editProductUnit" required>
            </div>

            <!-- Precio -->
            <div class="form-group">
              <label for="editProductPrice" class="col-form-label">Precio:</label>
              <input type="number" step="0.01" class="form-control" id="editProductPrice" name="editProductPrice"
                required>
            </div>

            <!-- Detalle Producto -->
            <div class="form-group">
              <label for="editProductDetail" class="col-form-label">Detalle del Producto:</label>
              <input type="text" class="form-control" id="editProductDetail" name="editProductDetail">
            </div>


          </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="codProduct" name="codProduct" class="codProduct">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            id="btnCerrarEditarProducto">Cerrar</button>
          <button type="button" class="btn btn-primary" id="btnEditarProducto">Editar Producto</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Crear Categoria produtos -->
<div class="modal fade" id="modalCrearCategoriaProd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalCrearCategoriaProd" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalCrearCategoriaProd">Crear Nueva Categoria</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form role="form" id="formCrearCategoriaProd">
          <div class="form-group">
            <label for="categoriaNameProd" class="col-form-label">Nombre Categoria</label>
            <input type="text" class="form-control" id="categoriaNameProd" name="categoriaNameProd" required>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnCerrarCrearCategoria"
          data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnCrearCategoriaProd">Crear Categoria</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Ver Categorias produtos -->
<div class="modal fade" id="modalViewCatProd" tabindex="-1" aria-labelledby="modalViewCatProd" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalViewCatProd">Lista Categorias</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableCategoriasProductos" class="display dataTableCategoriasProductos">
          <thead>
            <!-- dataTableCategoriasProductos -->
          </thead>
          <tbody>
            <!--dataTableCategoriasProductos-->
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

<!-- Modal Editar Categoria produtos -->
<div class="modal fade" id="modalEditarCategoriaProd" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="modalEditarCategoriaProd" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalEditarCategoriaProd">Editar Categoria</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form role="form" id="formEditarCategoriaProd">
          <div class="form-group">
            <label for="categoriaNameProdEditar" class="col-form-label">Nombre Categoria</label>
            <input type="text" class="form-control" id="categoriaNameProdEditar" name="categoriaNameProdEditar"
              required>
          </div>
          <input type="hidden" id="codCatPro" name="codCatPro" class="codCatPro">
        </form>
      </div>
      <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btnCerrarEditarCategoriaProd"
          data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnEditarCategoriaProd">Editar Categoria</button>
      </div>
    </div>
  </div>
</div>