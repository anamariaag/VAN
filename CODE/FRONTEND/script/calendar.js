var days = 0;
var today = new Date();
const setCalendar = () => {
    days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    let k = today.getDate();
    k = 1;
    let m = (today.getMonth() + 11) % 12;
    let C = Math.floor(today.getFullYear() / 100);
    let Y = today.getFullYear() % 100;
    let W =
        (k +
            Math.floor(2.6 * m - 0.2) -
            2 * C +
            Y +
            Math.floor(Y / 4) +
            Math.floor(C / 4)) %
        7;

    let put_days = document.getElementById("days");

    for (let i = 0; i < W; i++) {
        let toAdd = document.createElement("li");
        put_days.append(toAdd);
    }

    for (let i = 1; i < days + 1; i++) {
        let toAdd = document.createElement("li");
        toAdd.innerText = i;
        put_days.append(toAdd);
    }

    let dias = document.getElementById("days");
    var lis = dias.getElementsByTagName("li");
    let li_arr = Array.from(lis);

    for (let i = 0; i < li_arr.length; i++) {
        li_arr[i].addEventListener("mouseover", () => {
            let varElem = document.createElement("span");
            varElem.setAttribute("class", "active");
            varElem.innerText = li_arr[i].innerText;
            li_arr[i].innerText = "";
            li_arr[i].append(varElem);
        });
        li_arr[i].addEventListener("mouseout", () => {
            let span = li_arr[i].firstChild;
            li_arr[i].innerText = span.innerText;
            span.remove();
        });
    }

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    document.getElementById("monthName").innerText = months[today.getMonth()];
    document.getElementById("year").innerText = today.getFullYear();
};

const changeMonth = (num) => {
    today.setMonth(today.getMonth() + num);
    document.getElementById("days").innerHTML = "";

    setCalendar();
};

setCalendar();
