/* -------------------------------------------------
   College Event Management – JavaScript (vanilla)
   ------------------------------------------------- */

/* ---------- 1. Event data (source of truth) ---------- */
const events = [
    {
        id: 1,
        name: "Sports Gala",
        category: "Sports",
        date: "October 15, 2026",
        location: "College Sports Ground",
        description: "An exciting day of athletic competitions, team games, and individual challenges designed to bring students together through healthy competition.",
        activities: ["Cricket", "Football", "Badminton", "Table Tennis", "Basketball", "Athletics"]
    },
    {
        id: 2,
        name: "Music Night",
        category: "Music & Entertainment",
        date: "November 5, 2026",
        location: "College Auditorium",
        description: "An evening dedicated to live performances, musical talent, singing, and entertainment featuring students from different departments.",
        activities: ["Singing", "Instrumental Performance", "Band Performance", "Solo Performance", "Open Mic"]
    },
    {
        id: 3,
        name: "Culture Day",
        category: "Cultural",
        date: "December 2, 2026",
        location: "College Quad",
        description: "A celebration of cultural diversity where students can showcase traditional clothing, food, performances, art, and cultural heritage.",
        activities: ["Cultural Performance", "Traditional Dress", "Cultural Stall", "Food Display", "Art Exhibition"]
    },
    {
        id: 4,
        name: "Society Fair",
        category: "Student Societies",
        date: "January 12, 2027",
        location: "Main Hall",
        description: "Explore college societies, meet society members, discover student communities, and participate in activities organized by different societies.",
        activities: ["IT Society", "Literary Society", "Sports Society", "Media Society", "Debating Society", "Entrepreneurship Society"]
    }
];

/* ---------- 2. localStorage helpers ---------- */
const STORAGE_KEY = "eventRegistrations";

function loadRegistrations() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}
function saveRegistrations(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ---------- 3. Populate Event <select> ---------- */
function populateEventSelect(selected = "") {
    const sel = document.getElementById("eventSelect");
    sel.innerHTML = `<option value="">Choose…</option>`;
    events.forEach(ev => {
        const opt = document.createElement("option");
        opt.value = ev.id;
        opt.textContent = ev.name;
        if (ev.id == selected) opt.selected = true;
        sel.appendChild(opt);
    });
}

/* ---------- 4. Show event details in modal ---------- */
function showEventDetails(eventId) {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    document.getElementById("eventDetailsLabel").textContent = ev.name;
    document.getElementById("modalContent").innerHTML = `
        <p><strong>Category:</strong> ${ev.category}</p>
        <p><strong>Date:</strong> ${ev.date}</p>
        <p><strong>Location:</strong> ${ev.location}</p>
        <p>${ev.description}</p>
        <h6>Activities</h6>
        <ul>${ev.activities.map(a => `<li>${a}</li>`).join("")}</ul>
    `;
    new bootstrap.Modal(document.getElementById('eventDetailsModal')).show();
}

/* ---------- 5. Apply Now – pre‑fill form ---------- */
function applyNow(eventId) {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return;
    populateEventSelect(eventId);
    document.getElementById("eventDate").value = ev.date;
    updateActivityOptions(); // refresh checkboxes
    document.getElementById("registration").scrollIntoView({ behavior: "smooth" });
}

/* ---------- 6. Update activity checkboxes ---------- */
function updateActivityOptions() {
    const sel = document.getElementById("eventSelect");
    const container = document.getElementById("activityContainer");
    container.innerHTML = ""; // reset

    const evId = Number(sel.value);
    if (!evId) {
        document.getElementById("eventDate").value = "";
        return;
    }
    const ev = events.find(e => e.id === evId);
    document.getElementById("eventDate").value = ev.date;

    ev.activities.forEach((act, i) => {
        const id = `act-${evId}-${i}`;
        const col = document.createElement("div");
        col.className = "col-6 col-md-4";
        col.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                       id="${id}" name="activities" value="${act}">
                <label class="form-check-label" for="${id}">${act}</label>
            </div>
        `;
        container.appendChild(col);
    });
}

/* ---------- 7. Form validation (Bootstrap) ---------- */
function validateForm() {
    const form = document.getElementById("registrationForm");
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return false;
    }
    return true;
}

/* ---------- 8. Form submit – CREATE or UPDATE ---------- */
function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const editId = document.getElementById("editId").value;

    const reg = {
        id: editId ? Number(editId) : Date.now(),
        name: document.getElementById("fullName").value.trim(),
        studentId: document.getElementById("studentId").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        department: document.getElementById("department").value,
        semester: document.getElementById("semester").value,
        eventId: Number(document.getElementById("eventSelect").value),
        eventDate: document.getElementById("eventDate").value,
        activities: Array.from(document.querySelectorAll('input[name="activities"]:checked'))
                         .map(cb => cb.value)
    };

    const list = loadRegistrations();

    if (editId) {
        // ---- UPDATE ----
        const idx = list.findIndex(r => r.id === reg.id);
        if (idx !== -1) list[idx] = reg;
        document.getElementById("submitBtn").textContent = "Register Now";
        document.getElementById("editId").value = "";
    } else {
        // ---- CREATE ----
        list.push(reg);
    }

    saveRegistrations(list);
    displayRegistrations();

    // Reset form UI
    document.getElementById("registrationForm").reset();
    document.getElementById("registrationForm").classList.remove("was-validated");
    populateEventSelect(); // bring dropdown back to empty state
    document.getElementById("activityContainer").innerHTML = "";
}

/* ---------- 9. Render registration table (READ) ---------- */
function displayRegistrations() {
    const tbody = document.getElementById("registrationTableBody");
    tbody.innerHTML = "";
    const data = loadRegistrations();

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">No registrations found.</td></tr>`;
        updateDashboard([]);
        return;
    }

    data.forEach((reg, i) => {
        const ev = events.find(e => e.id === reg.eventId);
        const acts = reg.activities.length ? reg.activities.join(", ") : "-";
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${reg.name}</td>
            <td>${reg.studentId}</td>
            <td>${reg.department}</td>
            <td>${ev ? ev.name : "N/A"}</td>
            <td>${reg.semester}</td>
            <td>${acts}</td>
            <td class="text-nowrap">
                <button class="btn btn-sm btn-outline-primary me-1"
                        onclick="editRegistration(${reg.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger"
                        onclick="deleteRegistration(${reg.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateDashboard(data);
}

/* ---------- 10. Edit (populate form) ---------- */
function editRegistration(id) {
    const list = loadRegistrations();
    const reg = list.find(r => r.id === id);
    if (!reg) return;

    document.getElementById("fullName").value = reg.name;
    document.getElementById("studentId").value = reg.studentId;
    document.getElementById("email").value = reg.email;
    document.getElementById("phone").value = reg.phone;
    document.getElementById("department").value = reg.department;
    document.getElementById("semester").value = reg.semester;

    populateEventSelect(reg.eventId);
    document.getElementById("eventDate").value = reg.eventDate;
    updateActivityOptions();

    // check previously selected activities
    reg.activities.forEach(act => {
        const cb = Array.from(document.querySelectorAll('input[name="activities"]'))
                        .find(i => i.value === act);
        if (cb) cb.checked = true;
    });

    document.getElementById("editId").value = reg.id;
    document.getElementById("submitBtn").textContent = "Update Registration";

    document.getElementById("registration").scrollIntoView({ behavior: "smooth" });
}

/* ---------- 11. Delete (CRUD) ---------- */
function deleteRegistration(id) {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    let list = loadRegistrations();
    list = list.filter(r => r.id !== id);
    saveRegistrations(list);
    displayRegistrations();
}

/* ---------- 12. Clear all registrations ---------- */
function clearAllRegistrations() {
    if (!confirm("Are you sure you want to delete all registrations?")) return;
    localStorage.removeItem(STORAGE_KEY);
    displayRegistrations();
}

/* ---------- 13. Dashboard counters ---------- */
function updateDashboard(registrations) {
    const container = document.getElementById("dashboardCards");
    container.innerHTML = "";

    const total = registrations.length;
    const perEvent = events.map(ev => ({
        name: ev.name,
        count: registrations.filter(r => r.eventId === ev.id).length
    }));

    const cards = [
        { title: "Total Registrations", value: total, bg: "bg-primary" },
        ...perEvent.map(e => ({ title: e.name, value: e.count, bg: "bg-success" }))
    ];

    cards.forEach(c => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-sm-6";
        col.innerHTML = `
            <div class="dashboard-card ${c.bg} text-white rounded-3">
                <h6 class="mb-2">${c.title}</h6>
                <h3 class="mb-0">${c.value}</h3>
            </div>
        `;
        container.appendChild(col);
    });
}

/* ---------- 14. Initial page setup ---------- */
document.addEventListener("DOMContentLoaded", () => {
    populateEventSelect();                 // empty dropdown at start
    document.getElementById("registrationForm")
            .