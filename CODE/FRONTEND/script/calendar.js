var days = 0;
var today = new Date();
var selected = new Date(today.getFullYear(), today.getMonth(), 1);
const setCalendar = () => {
    days = new Date(
        selected.getFullYear(),
        selected.getMonth() + 1,
        0
    ).getDate();

    let W = selected.getDay();
    W = (W + 6) % 7;

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
        if (
            li_arr[i].innerText == today.getDate() &&
            selected.getMonth() == today.getMonth() &&
            selected.getFullYear() == today.getFullYear()
        ) {
            li_arr[i].setAttribute("class", "today");
            li_arr[i].addEventListener("mouseout", () => {
                li_arr[i].setAttribute("class", "today");
            });
        } else {
            li_arr[i].addEventListener("mouseout", () => {
                li_arr[i].classList.remove("activeDay");
            });
        }

        li_arr[i].addEventListener("mouseover", () => {
            // li_arr[i].classList.add("activeDay");
            li_arr[i].setAttribute("class", "activeDay");
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
    document.getElementById("monthName").innerText =
        months[selected.getMonth()];
    document.getElementById("year").innerText = selected.getFullYear();
};

const changeMonth = (num) => {
    selected.setMonth(selected.getMonth() + num);
    document.getElementById("days").innerHTML = "";
    setCalendar();
};

const returnToday = () => {
    selected = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById("days").innerHTML = "";
    setCalendar();
};

setCalendar();
