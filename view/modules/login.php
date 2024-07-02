<body class="fondoLogin">
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4"><img class="imagenLogin"
                      src="assets/img/dfridaSnFondo.png"></h3>
                </div>
                <div class="card-body">
                  <form method="post">
                  <div id="message" class="alert alert-info text-center" role="alert"><strong>¡Bienvenido!</strong></div>
                    <div class="form-floating mb-3">
                      <input class="form-control" id="inputUser" type="text" name="inputUser" placeholder="Usuario" />
                      <label for="inputUser"></label>
                    </div>
                    <div class="form-floating mb-3">
                      <input class="form-control" id="inputPassword" type="password" name="inputPassword"
                        placeholder="Contraseña" />
                      <label for="inputPassword"></label>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                      <button class="btn btn-light" type="submit">Ingresar</button>
                    </div>
                    <?php
                    $login = new UsersController();
                    $login->ctrLogIn();
                    ?>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Modal cambiar contraseña -->
      <div class="modal fade" id="cambiarPasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="cambiarPasswordModalLabel" aria-hidden="true"
        style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; ">
        <div class="modal-dialog">
          <div class="modal-content"
            style="background-color: rgba(0, 0, 0, 0.4); color: white; text-align: center; padding: 20px; border: 1px solid white; width: 85%;   margin-left: 40px; margin-right: 50px;  margin-top: 270px;  margin-bottom: 70px; ">
            <div class="modal-header ">
            <h1 class="modal-title fs-5 text-center" id="cambiarPasswordModalLabel">Cambiar Contraseña</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input class="form-control" id="inputUser" type="text" name="inputUser"
                  placeholder="Nombre Usuario Obligatorio" required title="Este campo es necesario"
                  style="background-color: rgba(255, 255, 255, 0.3); color: white; border: none;" />
                <label for="inputUser"></label>
                <style>
                  #inputUser::placeholder {
                    color: #ccc;
                  }
                </style>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputPassword" type="password" name="inputPassword"
                  placeholder="Nueva Contraseña" required title="Este campo es necesario"
                  style="background-color: rgba(255, 255, 255, 0.3); color: white; border: none;" />
                <label for="inputPassword"></label>
                <style>
                  #inputPassword::placeholder {
                    color: #ccc;
                  }
                </style>
              </div>
            </div>
            <div class="modal-footer" style="padding: 30px;">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                style="background-color: #ffdf46; color: rgb(0, 0, 0); border: none; margin-right: 20px;">Cancelar</button>
              <button type="button" class="btn btn-primary"
                style="background-color: #ffdf46; color: rgb(0, 0, 0); border: none; display: block; margin: 0 auto;">Cambiar
                Contraseña</button>
            </div>
          </div>
        </div>
      </div>