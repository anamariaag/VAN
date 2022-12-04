const getUsers = (place, reset) => {
    document.getElementById(place).innerHTML =
        "<option>--SELECCIONAR --</option>";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/users");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status == 400) {
            alert(xhr.status + ": " + xhr.statusText);
        } else {
            let usuarios = JSON.parse(xhr.response);
            let addHere = document.getElementById(place);
            for (let i = 0; i < usuarios.length; i++) {
                let toAdd = document.createElement("option");
                toAdd.innerText = usuarios[i];
                toAdd.setAttribute("id", usuarios[i]);
                addHere.append(toAdd);
            }
            document.getElementById(reset).innerText = "";
        }
    };
};

const selectUser = (from, to) => {
    let selectItem = document.getElementById(from);
    if (document.getElementById(to).innerText == "")
        document.getElementById(to).innerText += selectItem.value;
    else document.getElementById(to).innerText += ", " + selectItem.value;
    document.getElementById(selectItem.value).remove();
};

const cerrarSesion = () => {
    localStorage.token = null;
    console.log(localStorage);
    window.location.href = "login.html";
};
