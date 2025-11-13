// === MOVING BETWING SECTION=======

const sections = document.querySelectorAll("section[data-screen]");
const navButtons = document.querySelectorAll(".sidebar__btn");

function showSection(name) {
    sections.forEach((s) =>
        s.dataset.screen === name ?
        s.classList.add("is-visible") :
        s.classList.remove("is-visible")
    );

    navButtons.forEach((b) =>
        b.getAttribute("data-screen") === name ?
        b.classList.add("is-active") :
        b.classList.remove("is-active")
    );

    localStorage.setItem("currentScreen", name);
}

navButtons.forEach((btn) => {
    btn.addEventListener("click", () =>
        showSection(btn.getAttribute("data-screen"))
    );
});


showSection(localStorage.getItem("currentScreen") || "stats"); // 
// === DOM ELEMENTS ===========

const addEventForm = document.getElementById("event-form");
const formErrors = document.getElementById("form-errors");
const variantsList = document.getElementById("variants-list");
const addVariantBtn = document.getElementById("btn-add-variant");

// empty arrays for events and archive
let events = [];
let archive = [];