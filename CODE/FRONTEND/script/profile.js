

//funcion que permite visualizar los campos
//de un usuario en la página de perfil
function profileToHTML(profile){

    console.log("mostrando pagina de perfil")

    let oculto="";
 
    for(let i=0;i<profile.password.length;i++){
        oculto+="*"
    }
    informacionPerfil.innerHTML=`
    <div class="container" id="frontProfile">
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
                                        src=${profile.imagen}
                                        alt="Admin"
                                        class="rounded-circle"
                                        width="270"
                                    />
                                    <div class="mt-3">
                                        <h4>@${profile.usuario}</h4></h4>
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
                                        <h6 class="mb-0">Nombre</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.nombre}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Apellido</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.apellido}
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
                                    <div class="col-sm-9 text-secondary type="password"">
                                    ${oculto}
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">
                                            Fecha de nacimiento
                                        </h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                    ${profile.fecha}
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

async function loadProfileJSON(){
    console.log("CARGANDO VENTANA DE PERFIL");
    let datosToUpdate=[];

    let xhr = new XMLHttpRequest();
            
    xhr.open('GET', 'http://localhost:3000/api/users/10');
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();

    xhr.onload = function () {   
        if(xhr.status != 200){
            alert("¡No ha iniciado sesión! No tiene permisos para ver esta página :(");
        }else {
            datosToUpdate =JSON.parse(xhr.response);
            console.table(datosToUpdate); 
            let profile=datosToUpdate[0];
            profileToHTML(profile);
        }
    };


}

async function deleteProfileJSON(){


    let xhr = new XMLHttpRequest();
            
    xhr.open('DELETE', 'http://localhost:3000/api/users/11');
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();

    xhr.onload = function () {   
        if(xhr.status != 200){
            
        }else {
            console.log("se elimino al usuario");
        }
    };


}

