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
      <h1 class="mt-4">Catálogo de Proveedores</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Proveedores</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAddProveedor">
          Agregar Proveedor
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTableProveedores -->
          <h5 class="mt-4 tituloProveedores"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableProveedores -->
          <table id="dataTableProveedores" class="display dataTableProveedores">
            <thead>
              <!-- dataTableProveedores -->
            </thead>
            <tbody>
              <!--dataTableProveedores-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>

<!-- Modal Crear Proveedor -->
<div class="modal fade" id="modalAddProveedor" tabindex="-1" role="dialog" aria-labelledby="modalAddProveedor"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Crear Nuevo Proveedor</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" id="formCrearProveedor">

          <!-- razonSocialProv -->
          <div class="form-group">
            <label for="razonSocialProv" class="col-form-label">Razon Social</label>
            <input type="text" class="form-control" id="razonSocialProv" name="razonSocialProv" placeholder="Opcional">
          </div>

          <!-- rucProv -->
          <div class="form-group">
            <label for="rucProv" class="col-form-label">Ruc:</label>
            <input type="number" class="form-control" id="rucProv" name="rucProv" placeholder="Opcional">
          </div>

          <!--  nombreProv -->
          <div class="form-group">
            <label for="nombreProv" class="col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="nombreProv" name="nombreProv" placeholder="Requerido">
          </div>

          <!--  correoProv -->
          <div class="form-group">
            <label for="correoProv" class="col-form-label">Correo:</label>
            <input type="text" class="form-control" id="correoProv" name="correoProv" placeholder="Opcional">
          </div>

          <!--  direccionProv -->
          <div class="form-group">
            <label for="direccionProv" class="col-form-label">Direccion:</label>
            <input type="text" class="form-control" id="direccionProv" name="direccionProv" placeholder="Opcional">
          </div>

          <!--  celularProv -->
          <div class="form-group">
            <label for="celularProv" class="col-form-label">Celular:</label>
            <input type="number" class="form-control" id="celularProv" name="celularProv" placeholder="Requerido">
          </div>

          <!--  observacionProv -->
          <div class="form-group">
            <label for="detalleProv" class="col-form-label">Observacion:</label>
            <input type="text" class="form-control" id="detalleProv" name="detalleProv" placeholder="Opcional">
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary " id="btnCrearProveedor">Crear Proveedor</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal Edit Proveedor -->
<div class="modal fade" id="modalEditProveedor" tabindex="-1" role="dialog" aria-labelledby="modalEditProveedor"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar Proveedor</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <form role="form" id="formEditarProveedor">
          <!-- razonSocialProvEdit -->
          <div class="form-group">
            <label for="razonSocialProvEdit" class="col-form-label">Razon Social</label>
            <input type="text" class="form-control" id="razonSocialProvEdit" name="razonSocialProvEdit"
              placeholder="Opcional">
          </div>

          <!-- rucProvEdit -->
          <div class="form-group">
            <label for="rucProvEdit" class="col-form-label">Ruc:</label>
            <input type="number" class="form-control" id="rucProvEdit" name="rucProvEdit" placeholder="Opcional">
          </div>

          <!-- nombreProvEdit -->
          <div class="form-group">
            <label for="nombreProvEdit" class="col-form-label">Nombre:</label>
            <input type="text" class="form-control" id="nombreProvEdit" name="nombreProvEdit" placeholder="Requerido">
          </div>

          <!-- correoProvEdit -->
          <div class="form-group">
            <label for="correoProvEdit" class="col-form-label">Correo:</label>
            <input type="text" class="form-control" id="correoProvEdit" name="correoProvEdit" placeholder="Opcional">
          </div>

          <!-- direccionProvEdit -->
          <div class="form-group">
            <label for="direccionProvEdit" class="col-form-label">Direccion:</label>
            <input type="text" class="form-control" id="direccionProvEdit" name="direccionProvEdit"
              placeholder="Opcional">
          </div>

          <!-- celularProvEdit -->
          <div class="form-group">
            <label for="celularProvEdit" class="col-form-label">Celular:</label>
            <input type="number" class="form-control" id="celularProvEdit" name="celularProvEdit"
              placeholder="Requerido">
          </div>

          <!-- observacionProvEdit -->
          <div class="form-group">
            <label for="detalleProvEdit" class="col-form-label">Observacion:</label>
            <input type="text" class="form-control" id="detalleProvEdit" name="detalleProvEdit" placeholder="Opcional">
          </div>

          <!-- estadoProvEdit -->
          <div class="form-group">
            <label for="estadoProvEdit" class="col-form-label">Estado:</label>
            <select class="form-control" id="estadoProvEdit" name="estadoProvEdit" required>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>

          <div class="modal-footer">
            <input type="hidden" id="codProveedorEdit" name="codProveedorEdit" class="codProveedorEdit">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="btnEditarProveedor">Editar Proveedor</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>