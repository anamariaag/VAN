
//trae los datos por default al mostrar
//del usuario
const showProfile=()=>{
    let infoProfile=[];
    console.log("mostrando datos guardados");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/profile");
    xhr.setRequestHeader("x-auth-user", localStorage.token);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 401) {
            alert(xhr.response);
        } else if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
          infoProfile=JSON.parse(xhr.response);
          console.log("Datos traidos desde el backend");
          console.table(infoProfile);
          document.getElementById("frontProfile").innerHTML=``;
          profileToHTML(infoProfile);

         
        }
    };

}

//funcion que permite visualizar los campos
//de un usuario en la página de perfil
function profileToHTML(profile){

    console.log("mostrando pagina de perfil")
    informacionPerfil.innerHTML=`
    <div class="container">
            <div class="main-body">
                <br />
                <br />
                <br />
                <br />

                <!-- /Breadcrumb -->
                <div class="row gutters-sm">
                    <div class="col-md-4 mb-3">
                        <div class="card" id="card">
                            <div class="card-body">
                                <div
                                    class="d-flex flex-column align-items-center text-center"
                                >
                                    <img
                                        src="${profile.imagen}"
                                        alt="Admin"
                                        class="rounded-circle"
                                        width="270"
                                    />
                                    <div class="mt-3">
                                        <h4 id="usuarioInfoProfile">${profile.usuario}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--información completa del usuario-->
                    <div class="col-md-8">
                        <div class="card mb-3" id="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Nombre Completo</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.nombre}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.correo}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Usuario</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.usuario}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Contraseña</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.contraseña}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">
                                        ${profile.fecha}
                                        </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        01/12/2001
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-12">
                                        <a
                                            class="btn btn-info"
                                            id="btn_editar"
                                            href="editProfile.html"
                                            >Editar perfil</a
                                        >
                                        <a
                                            class="btn btn-danger"
                                            href="login.html"
                                            data-toggle="modal"
                                            data-target="#eliminarUsuario"
                                            >Eliminar perfil</a
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    `
}


