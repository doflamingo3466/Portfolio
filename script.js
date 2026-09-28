/**
 * Personal Portfolio Website with Admin Dashboard & Project Showcase
 * Author: Muhammad Abid Subhani
 */

document.addEventListener("DOMContentLoaded", function () {
    // Custom Image Configuration URLs (Paste direct URLs here or in CSS variables)
    const USER_CONFIG = {
        // Leave string empty "" to keep initial fallback monogram avatar
        profileImageUrl: "https://wallpapers.com/images/featured/one-piece-desktop-idg4aqn5l0lh40dk.jpg", 
        // Example: "https://images.unsplash.com/photo-1518770660439-4636190af475"
        heroBgUrl: "" 
    };

    // Project Details Data Source
    const projectsData = [
        {
            id: 1,
            num: "PROJECT 01",
            title: "LAN Chat Application",
            summary: "A high-performance socket-based local network communication platform designed for instant dynamic text sharing across desktop and mobile devices without requiring internet connection.",
            techStack: ["Flutter", "Dart", "Sockets", "XAMPP", "PHP"],
            features: [
                "Real-time IP discovery across local subnet client sockets.",
                "Cross-platform support across Android and Windows operating systems.",
                "Secure peer-to-peer payload transfers with low latency.",
                "Database logging on XAMPP server for historical chat retrieval."
            ],
            architecture: "Client-Server socket architecture utilizing asynchronous Dart stream listeners bound to active TCP/UDP ports."
        },
        {
            id: 2,
            num: "PROJECT 02",
            title: "Trading Journal Dashboard",
            summary: "An analytical client-side web application crafted to log, compute, and visualize financial trading positions, calculating win-rates, risk-to-reward ratios, and performance metrics.",
            techStack: ["HTML5", "CSS3", "JavaScript (ES6)", "JSON", "Chart.js"],
            features: [
                "Interactive Chart.js visualizations tracking daily PnL and trade execution distribution.",
                "Dynamic position calculation (Win/Loss metrics, Expectancy, and Average Drawdown).",
                "JSON export and import features for easy data backing.",
                "LocalStorage dynamic state persistence ensuring zero server storage needed."
            ],
            architecture: "Modular Vanilla JavaScript architecture utilizing array aggregation methods and dynamic Canvas API updates."
        },
        {
            id: 3,
            num: "PROJECT 03",
            title: "Student Management System",
            summary: "A comprehensive administrative frontend platform allowing educational institutions to manage student records, course enrollments, grade points, and academic status reports.",
            techStack: ["HTML5", "CSS3", "JavaScript", "LocalStorage API"],
            features: [
                "Complete CRUD operations (Create, Read, Update, Delete) for student records.",
                "Real-time search filtering by Student ID, Name, or Semester.",
                "Automatic CGPA calculations and academic status badge generation.",
                "Client-side LocalStorage schema persistence."
            ],
            architecture: "Event-driven DOM manipulation pipeline enforcing single-responsibility functions and strict data validation."
        }
    ];

    // Application Context & State
    const STORAGE_KEY = "portfolioMessages";
    let messages = [];
    let activeFilter = "All";
    let activeSearchQuery = "";

    // DOM Elements Reference Object
    const elements = {
        // Profile Image Elements
        profileImage: document.getElementById("profileImage"),
        avatarFallback: document.getElementById("avatarFallback"),

        // Public Navigation & Layout
        menuToggle: document.getElementById("menuToggle"),
        navLinks: document.getElementById("navLinks"),
        publicView: document.getElementById("publicView"),
        publicFooter: document.getElementById("publicFooter"),
        
        // Contact Form
        contactForm: document.getElementById("contactForm"),
        nameInput: document.getElementById("name"),
        emailInput: document.getElementById("email"),
        subjectInput: document.getElementById("subject"),
        messageInput: document.getElementById("message"),
        nameError: document.getElementById("nameError"),
        emailError: document.getElementById("emailError"),
        subjectError: document.getElementById("subjectError"),
        messageError: document.getElementById("messageError"),
        formSuccess: document.getElementById("formSuccess"),

        // Project Modal Elements
        projectModal: document.getElementById("projectModal"),
        closeProjectModal: document.getElementById("closeProjectModal"),
        closeProjectModalBtn: document.getElementById("closeProjectModalBtn"),
        modalProjectNum: document.getElementById("modalProjectNum"),
        modalProjectTitle: document.getElementById("modalProjectTitle"),
        projectModalBody: document.getElementById("projectModalBody"),

        // Admin Access Modals
        openAdminBtn: document.getElementById("openAdminBtn"),
        footerAdminBtn: document.getElementById("footerAdminBtn"),
        loginModal: document.getElementById("loginModal"),
        closeLoginModal: document.getElementById("closeLoginModal"),
        loginForm: document.getElementById("loginForm"),
        adminUsername: document.getElementById("adminUsername"),
        adminPassword: document.getElementById("adminPassword"),
        loginError: document.getElementById("loginError"),

        // Admin Dashboard Layout & Navigation
        adminView: document.getElementById("adminView"),
        exitAdminBtn: document.getElementById("exitAdminBtn"),
        logoutBtn: document.getElementById("logoutBtn"),
        sidebarLinks: document.querySelectorAll(".sidebar-link[data-tab]"),
        tabContents: document.querySelectorAll(".tab-content"),

        // Statistics Display
        statTotal: document.getElementById("statTotal"),
        statUnread: document.getElementById("statUnread"),
        statRead: document.getElementById("statRead"),
        statReplied: document.getElementById("statReplied"),

        // Admin Message Controls
        searchInput: document.getElementById("searchInput"),
        statusFilter: document.getElementById("statusFilter"),
        clearAllBtn: document.getElementById("clearAllBtn"),
        messagesListWrapper: document.getElementById("messagesListWrapper"),
        recentMessagesContainer: document.getElementById("recentMessagesContainer"),

        // Message Detail View Modal
        viewMessageModal: document.getElementById("viewMessageModal"),
        closeViewModal: document.getElementById("closeViewModal"),
        closeViewModalBtn: document.getElementById("closeViewModalBtn"),
        messageModalBody: document.getElementById("messageModalBody")
    };

    /* ==========================================================================
       Initialization
       ========================================================================== */
    function initApp() {
        setupImages();
        loadMessagesFromStorage();
        attachEventListeners();
        renderDashboard();
    }

    /* Configure Profile & Background Images */
    function setupImages() {
        if (USER_CONFIG.profileImageUrl && USER_CONFIG.profileImageUrl.trim() !== "") {
            elements.profileImage.src = USER_CONFIG.profileImageUrl;
            elements.profileImage.classList.remove("hidden");
            elements.avatarFallback.classList.add("hidden");
        }

        if (USER_CONFIG.heroBgUrl && USER_CONFIG.heroBgUrl.trim() !== "") {
            document.documentElement.style.setProperty('--hero-bg-url', `url("${USER_CONFIG.heroBgUrl}")`);
        }
    }

    /* ==========================================================================
       LocalStorage CRUD Logic
       ========================================================================== */
    function loadMessagesFromStorage() {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            messages = storedData ? JSON.parse(storedData) : [];
            if (!Array.isArray(messages)) messages = [];
        } catch (error) {
            console.error("Error reading from LocalStorage:", error);
            messages = [];
        }
    }

    function saveMessagesToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            renderDashboard();
        } catch (error) {
            console.error("Failed writing to LocalStorage:", error);
            alert("Storage limit reached or action prohibited by browser settings.");
        }
    }

    /* ==========================================================================
       Event Listeners
       ========================================================================== */
    function attachEventListeners() {
        elements.menuToggle.addEventListener("click", toggleMobileMenu);

        document.querySelectorAll(".nav-item").forEach(link => {
            link.addEventListener("click", () => {
                elements.navLinks.classList.remove("active");
            });
        });

        elements.contactForm.addEventListener("submit", handleContactSubmit);

        // Project Modal Listeners
        elements.closeProjectModal.addEventListener("click", closeProjectModal);
        elements.closeProjectModalBtn.addEventListener("click", closeProjectModal);

        // Admin Login Listeners
        elements.openAdminBtn.addEventListener("click", showLoginModal);
        elements.footerAdminBtn.addEventListener("click", showLoginModal);
        elements.closeLoginModal.addEventListener("click", hideLoginModal);
        elements.loginForm.addEventListener("submit", handleAdminLogin);

        // Admin Navigation
        elements.exitAdminBtn.addEventListener("click", exitAdminView);
        elements.logoutBtn.addEventListener("click", logoutAdmin);

        elements.sidebarLinks.forEach(button => {
            button.addEventListener("click", function () {
                switchAdminTab(this.getAttribute("data-tab"));
            });
        });

        // Search and Filter Listeners
        elements.searchInput.addEventListener("input", function (e) {
            activeSearchQuery = e.target.value.toLowerCase().trim();
            renderMessagesList();
        });

        elements.statusFilter.addEventListener("change", function (e) {
            activeFilter = e.target.value;
            renderMessagesList();
        });

        elements.clearAllBtn.addEventListener("click", clearAllMessages);

        // View Message Modal Listeners
        elements.closeViewModal.addEventListener("click", closeViewModal);
        elements.closeViewModalBtn.addEventListener("click", closeViewModal);
    }

    /* ==========================================================================
       Project Details Modal Feature
       ========================================================================== */
    window.openProjectDetails = function (projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        elements.modalProjectNum.textContent = project.num;
        elements.modalProjectTitle.textContent = project.title;

        let techBadges = project.techStack.map(t => `<span class="skill-tag">${escapeHTML(t)}</span>`).join(" ");
        let featuresList = project.features.map(f => `<li>${escapeHTML(f)}</li>`).join("");

        elements.projectModalBody.innerHTML = `
            <div class="project-detail-section">
                <h4>Overview</h4>
                <p>${escapeHTML(project.summary)}</p>
            </div>

            <div class="project-detail-section">
                <h4>Technologies Employed</h4>
                <div class="tags-list" style="margin-top:0.4rem;">${techBadges}</div>
            </div>

            <div class="project-detail-section">
                <h4>Key Operational Features</h4>
                <ul class="project-features-list" style="margin-top:0.4rem;">${featuresList}</ul>
            </div>

            <div class="project-detail-section">
                <h4>System Architecture</h4>
                <p>${escapeHTML(project.architecture)}</p>
            </div>
        `;

        elements.projectModal.classList.add("active");
    };

    function closeProjectModal() {
        elements.projectModal.classList.remove("active");
    }

    /* ==========================================================================
       Public View & Contact Form
       ========================================================================== */
    function toggleMobileMenu() {
        elements.navLinks.classList.toggle("active");
    }

    function handleContactSubmit(e) {
        e.preventDefault();
        clearFormErrors();

        const name = elements.nameInput.value.trim();
        const email = elements.emailInput.value.trim();
        const subject = elements.subjectInput.value.trim();
        const message = elements.messageInput.value.trim();

        let isValid = true;

        if (name === "") {
            elements.nameError.textContent = "Please enter your full name.";
            isValid = false;
        }

        if (email === "") {
            elements.emailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!validateEmailPattern(email)) {
            elements.emailError.textContent = "Please enter a valid email format.";
            isValid = false;
        }

        if (subject === "") {
            elements.subjectError.textContent = "Please state a subject line.";
            isValid = false;
        }

        if (message === "") {
            elements.messageError.textContent = "Please write your message.";
            isValid = false;
        }

        if (!isValid) return;

        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            subject: subject,
            message: message,
            status: "Unread",
            date: new Date().toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            })
        };

        messages.push(newMessage);
        saveMessagesToStorage();

        elements.contactForm.reset();
        elements.formSuccess.style.display = "block";
        elements.formSuccess.textContent = "Thank you! Your message has been recorded.";

        setTimeout(() => {
            elements.formSuccess.style.display = "none";
        }, 4000);
    }

    function clearFormErrors() {
        elements.nameError.textContent = "";
        elements.emailError.textContent = "";
        elements.subjectError.textContent = "";
        elements.messageError.textContent = "";
    }

    function validateEmailPattern(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* ==========================================================================
       Admin Access & Navigation
       ========================================================================== */
    function showLoginModal() {
        elements.loginModal.classList.add("active");
        elements.loginError.textContent = "";
    }

    function hideLoginModal() {
        elements.loginModal.classList.remove("active");
        elements.loginForm.reset();
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        const username = elements.adminUsername.value.trim();
        const password = elements.adminPassword.value.trim();

        if (username === "admin" && password === "admin123") {
            hideLoginModal();
            enterAdminView();
        } else {
            elements.loginError.textContent = "Invalid username or password credentials.";
        }
    }

    function enterAdminView() {
        elements.publicView.classList.add("hidden");
        elements.publicFooter.classList.add("hidden");
        elements.adminView.classList.remove("hidden");
        renderDashboard();
    }

    function exitAdminView() {
        elements.adminView.classList.add("hidden");
        elements.publicView.classList.remove("hidden");
        elements.publicFooter.classList.remove("hidden");
    }

    function logoutAdmin() {
        exitAdminView();
    }

    function switchAdminTab(targetTab) {
        elements.sidebarLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("data-tab") === targetTab);
        });

        elements.tabContents.forEach(content => {
            content.classList.toggle("active", content.id === targetTab + "Tab");
        });
    }

    /* ==========================================================================
       Dashboard Rendering
       ========================================================================== */
    function renderDashboard() {
        calculateStatistics();
        renderMessagesList();
        renderRecentMessages();
    }

    function calculateStatistics() {
        elements.statTotal.textContent = messages.length;
        elements.statUnread.textContent = messages.filter(m => m.status === "Unread").length;
        elements.statRead.textContent = messages.filter(m => m.status === "Read").length;
        elements.statReplied.textContent = messages.filter(m => m.status === "Replied").length;
    }

    function renderMessagesList() {
        let filtered = messages.filter(m => {
            const matchesFilter = (activeFilter === "All") || (m.status === activeFilter);
            const matchesSearch = m.name.toLowerCase().includes(activeSearchQuery) ||
                                  m.email.toLowerCase().includes(activeSearchQuery) ||
                                  m.subject.toLowerCase().includes(activeSearchQuery);
            return matchesFilter && matchesSearch;
        });

        filtered.sort((a, b) => b.id - a.id);

        if (filtered.length === 0) {
            elements.messagesListWrapper.innerHTML = `
                <div class="empty-state">
                    <h4>NO MESSAGES FOUND</h4>
                    <p>Messages submitted through the Contact form will appear here.</p>
                </div>
            `;
            return;
        }

        let tableHTML = `
            <table class="messages-table">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filtered.forEach(msg => {
            tableHTML += `
                <tr>
                    <td data-label="Sender">
                        <strong>${escapeHTML(msg.name)}</strong><br>
                        <small style="color:var(--muted);">${escapeHTML(msg.email)}</small>
                    </td>
                    <td data-label="Subject">${escapeHTML(msg.subject)}</td>
                    <td data-label="Date">${msg.date}</td>
                    <td data-label="Status">
                        <select onchange="updateMessageStatus(${msg.id}, this.value)">
                            <option value="Unread" ${msg.status === "Unread" ? "selected" : ""}>Unread</option>
                            <option value="Read" ${msg.status === "Read" ? "selected" : ""}>Read</option>
                            <option value="Replied" ${msg.status === "Replied" ? "selected" : ""}>Replied</option>
                        </select>
                    </td>
                    <td data-label="Actions">
                        <div class="table-actions">
                            <button class="btn btn-outline btn-sm" onclick="viewMessageDetails(${msg.id})">View</button>
                            <button class="btn btn-outline btn-sm" onclick="replyToMessage(${msg.id})">Reply</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteSingleMessage(${msg.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        elements.messagesListWrapper.innerHTML = tableHTML;
    }

    function renderRecentMessages() {
        const recent = [...messages].sort((a, b) => b.id - a.id).slice(0, 3);

        if (recent.length === 0) {
            elements.recentMessagesContainer.innerHTML = `<p style="color:var(--muted); margin-top:1rem;">No messages recorded yet.</p>`;
            return;
        }

        let html = `<div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">`;
        recent.forEach(msg => {
            html += `
                <div style="background:var(--surface); border:1px solid var(--border); padding:1rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <strong>${escapeHTML(msg.name)}</strong> - <span style="color:var(--muted); font-size:0.85rem;">${escapeHTML(msg.subject)}</span>
                        <div style="font-size:0.75rem; color:var(--muted);">${msg.date}</div>
                    </div>
                    <span class="badge ${getBadgeClass(msg.status)}">${msg.status}</span>
                </div>
            `;
        });
        html += `</div>`;
        elements.recentMessagesContainer.innerHTML = html;
    }

    /* ==========================================================================
       Message Action Handlers
       ========================================================================== */
    window.updateMessageStatus = function (id, newStatus) {
        const msg = messages.find(m => m.id === id);
        if (msg) {
            msg.status = newStatus;
            saveMessagesToStorage();
        }
    };

    window.viewMessageDetails = function (id) {
        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        if (msg.status === "Unread") {
            msg.status = "Read";
            saveMessagesToStorage();
        }

        elements.messageModalBody.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">Sender Name</div>
                <div class="detail-content">${escapeHTML(msg.name)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email Address</div>
                <div class="detail-content">${escapeHTML(msg.email)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Subject</div>
                <div class="detail-content">${escapeHTML(msg.subject)}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date Submitted</div>
                <div class="detail-content">${msg.date}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Current Status</div>
                <div class="detail-content"><span class="badge ${getBadgeClass(msg.status)}">${msg.status}</span></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Message Content</div>
                <div class="detail-content detail-box">${escapeHTML(msg.message)}</div>
            </div>
        `;

        elements.viewMessageModal.classList.add("active");
    };

    function closeViewModal() {
        elements.viewMessageModal.classList.remove("active");
    }

    window.replyToMessage = function (id) {
        const msg = messages.find(m => m.id === id);
        if (!msg) return;

        msg.status = "Replied";
        saveMessagesToStorage();

        window.location.href = `mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent("Re: " + msg.subject)}`;
    };

    window.deleteSingleMessage = function (id) {
        if (confirm("Are you sure you want to permanently delete this message?")) {
            messages = messages.filter(m => m.id !== id);
            saveMessagesToStorage();
        }
    };

    function clearAllMessages() {
        if (messages.length === 0) {
            alert("No messages available to delete.");
            return;
        }

        if (confirm("Are you sure you want to permanently clear ALL stored messages?")) {
            messages = [];
            saveMessagesToStorage();
        }
    }

    /* Helper Utilities */
    function getBadgeClass(status) {
        switch (status) {
            case "Unread": return "badge-unread";
            case "Read": return "badge-read";
            case "Replied": return "badge-replied";
            default: return "";
        }
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    initApp();
});