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
      <h1 class="mt-4">Lista Pedidos</h1>
      <ol class="breadcrumb mb-4">
        <!-- <li class="breadcrumb-item active">Todos los Usuarios</li> -->
      </ol>
      <div class="d-flex m-2">
        <button type="button" class="btn btn-success" id="btnAddPedido" data-bs-toggle="modal"
          data-bs-target="#modalCrearPedido">
          Agregar Pedido
        </button>
      </div>
      <div class="card mb-4">
        <div class="card-header">
          <!--  Titulo dataTablePedidos -->
          <h5 class="mt-4 tituloPedidos"></h5>
        </div>
        <div class="card-body">
          <!-- dataTableCotizaciones -->
          <table id="dataTablePedidos" class="display dataTablePedidos">
            <thead>
              <!-- dataTablePedidos -->
            </thead>
            <tbody>
              <!--dataTablePedidos-->
            </tbody>
          </table>
          <!-- fin -->
        </div>
      </div>
    </div>
  </main>
</div>
</div>
<!-- Modal productos vista pedidos -->
<div class="modal fade" id="modalVerProdCotiPedidos" tabindex="-1" aria-labelledby="modalVerProdCotiPedidos"
  aria-hidden="true">
  <div class="modal-dialog modal-lg"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalVerProdCotiPedidos">Lista Productos </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableProductosCotizacionPedidos" class="display dataTableProductosCotizacionPedidos">
          <thead>
            <!-- dataTableProductos -->
          </thead>
          <tbody>
            <!--dataTableProductos-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal productos prima vista pedidos -->
<div class="modal fade" id="modalVerProdPrimaCotiPedidos" tabindex="-1" aria-labelledby="modalVerProdPrimaCotiPedidos"
  aria-hidden="true">
  <div class="modal-dialog modal-lg"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalVerProdPrimaCotiPedidos">Lista Productos Prima </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableProductosMateriaPrimaCotizacionPedidos"
          class="display dataTableProductosMateriaPrimaCotizacionPedidos">
          <thead>
            <!-- dataTableProductos -->
          </thead>
          <tbody>
            <!--dataTableProductos-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal Ver Cliente vista pedidos -->
<div class="modal fade" id="modalVerClientePedidos" tabindex="-1" role="dialog" aria-labelledby="modalVerClientePedidos"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalVerClientePedidos">Ver Cliente</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <!-- RUC Client -->
        <div class="form-group">
          <label for="VerRuPedido" class="col-form-label">RUC:</label>
          <input type="text" class="form-control" id="VerRuPedido" name="VerRuPedido" readonly>
        </div>
        <!-- Razon social -->
        <div class="form-group">
          <label for="VerRazonSocialPedido" class="col-form-label">Razón social:</label>
          <input type="text" class="form-control" id="VerRazonSocialPedido" name="VerRazonSocialPedido" readonly>
        </div>
        <!-- Name Client -->
        <div class="form-group">
          <label for="VerNameCliPedido" class="col-form-label">Nombre Cliente:</label>
          <input type="text" class="form-control" id="VerNameCliPedido" name="VerNameCliPedido" readonly>
        </div>
        <!-- Email Client -->
        <div class="form-group">
          <label for="VerEmailCliPedido" class="col-form-label">Correo Electrónico:</label>
          <input type="email" class="form-control" id="VerEmailCliPedido" name="VerEmailCliPedido" readonly>
        </div>
        <!-- Address Client -->
        <div class="form-group">
          <label for="VerAddressCliPedido" class="col-form-label">Dirección:</label>
          <input type="text" class="form-control" id="VerAddressCliPedido" name="VerAddressCliPedido" readonly>
        </div>
        <!-- Phone Client -->
        <div class="form-group">
          <label for="VerPhoneCliPedido" class="col-form-label">Número de Teléfono:</label>
          <input type="number" class="form-control" id="VerPhoneCliPedido" name="VerPhoneCliPedido" readonly>
        </div>
        <!-- Detalle Client -->
        <div class="form-group">
          <label for="VerDetallCliPedido" class="col-form-label">Observación Cliente:</label>
          <input type="text" class="form-control" id="VerDetallCliPedido" name="VerDetallCliPedido" readonly>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal"
            id="btnCerrarVerClientesPedidos">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Modal Crear Pedido -->
<div class="modal fade" id="modalCrearPedido" tabindex="-1" aria-labelledby="modalCrearPedidoLabel" aria-hidden="true"
  data-bs-backdrop="static">
  <div class="modal-dialog modal-xl modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 text-center w-100" id="modalCrearPedidoLabel">Crear Pedido</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <form id="formPedidoAdd">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="tituloPedidoAdd" class="form-label" style="font-weight: bold">Titulo Del Pedido:</label>
                <input type="text" class="form-control" id="tituloPedidoAdd" name="tituloPedidoAdd"
                  placeholder="Ingrese el titulo del pedido">
              </div>

              <div class="col-md-6 mb-3">
                <label for="nombrePedidoAdd" class="form-label" style="font-weight: bold">Nombre Del Pedido:</label>
                <input type="text" class="form-control" id="nombrePedidoAdd" name="nombrePedidoAdd"
                  placeholder="Ingrese el nombre del pedido">
              </div>

              <div class="col-md-2 mb-3">
                <label for="fechaPedidoAdd" class="form-label" style="font-weight: bold">Fecha Del Pedido:</label>
                <input type="date" class="form-control" id="fechaPedidoAdd" name="fechaPedidoAdd">
              </div>

              <!-- Ver las salidas de productos prima -->
              <div class="col-md-2 mb-3">
                <div class="form-group">
                  <label for="btnVerCotizacionesPedidoAdd">Cotizaciones</label>
                  <button type="button" class="btn btn-warning" id="btnVerCotizacionesPedidoAdd" idCoti="">
                    Seleccionar Cotización
                  </button>
                </div>
              </div>

              <!-- Select2 para pedidos -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="idClienteAddPedido">Seleccionar Cliente:</label>
                  <select class="form-select" id="idClienteAddPedido" name="idClienteAddPedido" data-selected="">
                  </select>
                </div>
              </div>

              <!-- Select2 para tipos de procesos -->
              <div class="col-md-4 mb-3">
                <div class="form-group">
                  <label for="idFichaTecnicaAddPedido">Seleccionar Ficha Técnica:</label>
                  <select class="form-select" id="idFichaTecnicaAddPedido" name="idFichaTecnicaAddPedido"
                    data-selected="">
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-success" id="btncrearPedidoModal">Crear Pedido</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal cotizaciones para la vista de pedidos -->
<div class="modal fade" id="modalSeleccionarCotizacionPedidos" tabindex="-1"
  aria-labelledby="modalSeleccionarCotizacionPedidosLabel" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog modal-xl"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="titleModalSeleccionarCotizacionPedidosLabel">Lista Productos Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableSeleccionarCotizacionPedidos" class="display dataTableSeleccionarCotizacionPedidos">
          <thead>
            <!-- dataTableProductos -->
          </thead>
          <tbody>
            <!--dataTableProductos-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btnSeleccionarCotizaciónparaPedido">Seleccionar
          Cotización</button>
        <button type="button" class="btn btn-secondary" id="btnCerrarModalSeleccionarCotizacionPedidos"
          data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Editar Pedidos -->
<div class="modal fade" id="modalEditarPedido" tabindex="-1" role="dialog" aria-labelledby="modalEditarPedido"
  aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditarPedido">Editar Pedido</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- Cuerpo modal -->
      <div class="modal-body">
        <!-- Titulo Pedido -->
        <div class="form-group">
          <label for="editarTituloPedidoModal" class="col-form-label">Titulo:</label>
          <input type="text" class="form-control" id="editarTituloPedidoModal" name="editarTituloPedidoModal">
        </div>
        <!-- Nombre Pedido -->
        <div class="form-group">
          <label for="editarNombrePedidoModal" class="col-form-label">Nombre:</label>
          <input type="text" class="form-control" id="editarNombrePedidoModal" name="editarNombrePedidoModal">
        </div>
        <!-- Fecha Pedido -->
        <div class="form-group">
          <label for="editarFechaPedidoModal" class="col-form-label">Fecha:</label>
          <input type="date" class="form-control" id="editarFechaPedidoModal" name="editarFechaPedidoModal">
        </div>
        <!-- Cotización Pedido -->
        <div class="form-group">
          <label for="editarCotizacionPedidoModal" class="col-form-label">Cotización:</label>
          <div class="input-group">
            <input type="text" class="form-control" id="editarCotizacionPedidoModal" name="editarCotizacionPedidoModal"
              cotizacion-original-id="" cotizacion-original-name="" readonly>
            <button class="btn btn-outline-warning" id="btnSeleccionarCotizacionEdit" type="button" idCoti="">
              <i class="fa-solid fa-right-left"></i>
            </button>
          </div>
        </div>
        <!-- Cotización Pedido Nueva -->
        <div class="form-group nuevo-cotizacion d-none">
          <label for="editarCotizacionPedidoNuevaModal" class="col-form-label">Nueva Cotización:</label>
          <div class="input-group">
            <input type="text" class="form-control" id="editarCotizacionPedidoNuevaModal"
              name="editarCotizacionPedidoModal" cotizacion-nueva-id="" readonly>
          </div>
        </div>
        <!-- Seleccionar Ficha Técnica y Cliente en una fila -->
        <div class="form-group row">
          <div class="col-md-6 d-flex flex-column">
            <label for="idFichaTecnicaEditPedido" class="col-form-label">Ficha Técnica:</label>
            <select class="form-select" id="idFichaTecnicaEditPedido" name="idFichaTecnicaEditPedido" data-selected="">
            </select>
          </div>
          <div class="col-md-6 d-flex flex-column">
            <label for="idClienteEditPedido" class="col-form-label">Cliente:</label>
            <select class="form-select" id="idClienteEditPedido" name="idClienteEditPedido" data-selected="">
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btnGuardarCambiosPedidoModal">Guardar Cambios</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal"
            id="btnCerrarEditarPedido">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Modal cotizaciones para la vista de pedidos -->
<div class="modal fade" id="modalSeleccionarCotizacionPedidosEditar" tabindex="-1"
  aria-labelledby="titleModalSeleccionarCotizacionPedidosEditarLabel" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog modal-xl"> <!-- Clase "modal-lg" agregada aquí -->
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="titleModalSeleccionarCotizacionPedidosEditarLabel">Lista Productos Prima</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table id="dataTableSeleccionarCotizacionPedidosEditar"
          class="display dataTableSeleccionarCotizacionPedidosEditar">
          <thead>
            <!-- dataTableSeleccionarCotizacionPedidosEditar -->
          </thead>
          <tbody>
            <!--dataTableSeleccionarCotizacionPedidosEditar-->
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btnSeleccionarCotizaciónparaPedidoEditar">Seleccionar
          Cotización</button>
        <button type="button" class="btn btn-secondary" id="btnCerrarModalSeleccionarCotizacionPedidosEditar"
          data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>