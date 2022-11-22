const login = () => {
    let xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:3000/api/login");
    // xhr.setRequestHeader("content-type", "application/json");
    let datos = {};
    datos.correo = document.getElementById("uname").value;
    datos.pass = document.getElementById("passwd").value;
    // xhr.send([JSON.stringify(datos)]);
    console.log(datos);
    // xhr.onload = function () {
    //     if (xhr.status == 401) {
    //         alert(xhr.response);
    //     } else if (xhr.status != 201) {
    //         alert(xhr.status + ": " + xhr.statusText);
    //     } else {
    // localStorage.setItem("token", xhr.getResponseHeader("x-user-token"));
    localStorage.setItem("token", "un token chilo");
    console.log("Sesion iniciada");
    window.location.href = "home.html";
    //         }
    //     };
};

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
    datos.pass = contra;
    datos.sexo = document.getElementById("Mujer").checked ? "M" : "H";
    if (document.getElementById("date").value != "")
        datos.fecha = document.getElementById("date").value;
    if (document.getElementById("email").value != "")
        datos.correo = document.getElementById("email").value;
    if (document.getElementById("img_perfil").value != "")
        datos.url = document.getElementById("img_perfil").value;
    if (document.getElementById("user").value != "")
        datos.user = document.getElementById("user").value;

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:3000/api/users");
    // xhr.setRequestHeader("content-type", "application/json");
    // xhr.setRequestHeader("x-auth-user", localStorage.token);

    // xhr.send([JSON.stringify(datos)]);

    // xhr.onload = () => {
    //     if (xhr.status == 400) {
    //         alert(xhr.response);
    //     } else if (xhr.status == 401) alert(xhr.response);
    //     else if (xhr.status != 201) {
    //         alert(xhr.status + ": " + xhr.statusText);
    //     } else {
    console.log("se guardó el usuario:");
    console.table(datos);
    //         alert("Se guardó el usuario");
    //     }
    // };
};
