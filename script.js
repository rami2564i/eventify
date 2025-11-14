// === MOVING BETWING section=======

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

// Basic form submit skeleton (no validation yet)
addEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted"); // placeholder
});
// === Validation Function ====

function validateEvent(data) {
    const errors = [];
    if (!data.title.trim()) errors.push("Title is required.");
    else if (data.title.trim().length < 3)
        errors.push("Title must be at least 3 characters.");

    if (!Number.isInteger(data.seats) || data.seats <= 0)
        errors.push("Seats must be a positive integer.");

    if (isNaN(data.price) || data.price < 0)
        errors.push("Price must be a positive number.");

    return errors;
}

// Modify form submit to include validation
addEventForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const eventData = {
        title: document.getElementById("event-title").value.trim(),
        image: document.getElementById("event-image").value.trim(),
        description: document.getElementById("event-description").value.trim(),
        seats: parseInt(document.getElementById("event-seats").value),
        price: parseFloat(document.getElementById("event-price").value),
        variants: [],
    };

    const errors = validateEvent(eventData);
    if (errors.length > 0) {
        formErrors.classList.remove("is-hidden");
        formErrors.innerHTML = errors.join("<br>");
        return;
    }

    formErrors.classList.add("is-hidden");
    formErrors.innerHTML = "";
    console.log("Validated event:", eventData);
});
// === Variants Dynamic Rows ===


// Create a variant row
function createVariantRow() {
    const div = document.createElement("div");
    div.classList.add("variant-row");
    div.innerHTML = `
        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g. Early Bird)" />
        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
        <select class="select variant-row__type">
            <option value="fixed">Fixed Price</option>
            <option value="percentage">Percentage Off</option>
        </select>
        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
    `;
    return div;
}

// Add new variant
addVariantBtn.addEventListener("click", () => {
    const newRow = createVariantRow();
    variantsList.appendChild(newRow);
});

// Remove variant
variantsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("variant-row__remove")) {
        e.target.parentElement.remove();
    }
});