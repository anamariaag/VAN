const login = () => {

    

    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/login");
    xhr.setRequestHeader("content-type", "application/json");
    let datos = {};
    datos.user = document.getElementById("uname").value;
    datos.pass = document.getElementById("passwd").value;
    xhr.send([JSON.stringify(datos)]);
    console.log(datos);
    xhr.onload = function () {
        if (xhr.status == 401) {
            alert(xhr.response);
        } else if (xhr.status != 201) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
           
            localStorage.setItem(
                "token",
                xhr
                    .getResponseHeader("x-user-token")
                    .substring(
                        0,
                        xhr.getResponseHeader("x-user-token").indexOf(",")
                    )
            );
            localStorage.setItem(
                "id",
                xhr
                .getResponseHeader("x-user-token")
                .substring(14, xhr.getResponseHeader("x-user-token").length)
            );

            cargando.innerHTML=`
            <lottie-player src=" https://assets9.lottiefiles.com/packages/lf20_p8bfn5to.json" background="transparent"   padding: 10px 15px speed="1"  style="width: 250px; height: 60px;" loop 
            autoplay></lottie-player>`

            setTimeout(goHome, 1000);
        }
    };
};

function goHome(){
    window.location.href = "home.html";
  }
  


const registrarse = () => {
    let contra = document.getElementById("password1").value;
    if (contra != document.getElementById("password2").value) {
        alert("Las contraseñas no coinciden");
        return;
    }
    let datos = {};
    if (document.getElementById("name").value != "")
        datos.nombre = document.getElementById("name").value;
    if (document.getElementById("last_name").value != "")
        datos.apellido = document.getElementById("last_name").value;
    datos.password = contra;
    datos.sexo = document.getElementById("Mujer").checked ? "M" : "H";
    if (document.getElementById("date").value != "")
        datos.fecha = document.getElementById("date").value;
    if (document.getElementById("email").value != "")
        datos.correo = document.getElementById("email").value;
    if (document.getElementById("img_perfil").value != "")
        datos.imagen = document.getElementById("img_perfil").value;
    if (document.getElementById("user").value != "")
        datos.usuario = document.getElementById("user").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/users");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-auth-user", localStorage.token);

    xhr.send([JSON.stringify(datos)]);

    xhr.onload = () => {
        if (xhr.status == 400) {
            alert(xhr.response);
        } else if (xhr.status == 401) alert(xhr.response);
        else if (xhr.status != 201) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            console.log("se guardó el usuario:");
            console.table(datos);
            window.location.href = "login.html";
        }
    };
};
