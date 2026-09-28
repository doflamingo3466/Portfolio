/**
 * Personal Portfolio Website with Admin Dashboard
 * Author: Muhammad Abid Subhani
 * Architecture: Native Vanilla JavaScript (ES6+) with LocalStorage Data Operations
 */

document.addEventListener("DOMContentLoaded", function () {
    // Application Context & State
    const STORAGE_KEY = "portfolioMessages";
    let messages = [];
    let activeFilter = "All";
    let activeSearchQuery = "";

    // DOM Elements Reference Object
    const elements = {
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

        // Detail View Modal
        viewMessageModal: document.getElementById("viewMessageModal"),
        closeViewModal: document.getElementById("closeViewModal"),
        closeViewModalBtn: document.getElementById("closeViewModalBtn"),
        messageModalBody: document.getElementById("messageModalBody")
    };

    /* ==========================================================================
       Initialization
       ========================================================================== */
    function initApp() {
        loadMessagesFromStorage();
        attachEventListeners();
        renderDashboard();
    }

    /* ==========================================================================
       LocalStorage Operations (CRUD Core Engine)
       ========================================================================== */
    // Helper function to safely parse LocalStorage data with error handling
    function loadMessagesFromStorage() {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            messages = storedData ? JSON.parse(storedData) : [];
            // Ensure array type safety
            if (!Array.isArray(messages)) {
                messages = [];
            }
        } catch (error) {
            console.error("Error reading messages from LocalStorage:", error);
            messages = [];
        }
    }

    // Helper function to write messages to LocalStorage
    function saveMessagesToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            renderDashboard(); // Re-render state everywhere upon alteration
        } catch (error) {
            console.error("Failed to write to LocalStorage:", error);
            alert("Storage operation failed. Your browser storage might be full or blocked.");
        }
    }

    /* ==========================================================================
       Event Registering Engine
       ========================================================================== */
    function attachEventListeners() {
        // Navigation Mobile Menu Toggle
        elements.menuToggle.addEventListener("click", toggleMobileMenu);

        // Close mobile nav when link clicked
        document.querySelectorAll(".nav-item").forEach(link => {
            link.addEventListener("click", () => {
                elements.navLinks.classList.remove("active");
            });
        });

        // Contact Form Processing
        elements.contactForm.addEventListener("submit", handleContactSubmit);

        // Admin Modal Controls
        elements.openAdminBtn.addEventListener("click", showLoginModal);
        elements.footerAdminBtn.addEventListener("click", showLoginModal);
        elements.closeLoginModal.addEventListener("click", hideLoginModal);
        elements.loginForm.addEventListener("submit", handleAdminLogin);

        // Admin Session & Tab Navigation
        elements.exitAdminBtn.addEventListener("click", exitAdminView);
        elements.logoutBtn.addEventListener("click", logoutAdmin);

        elements.sidebarLinks.forEach(button => {
            button.addEventListener("click", function () {
                const targetTab = this.getAttribute("data-tab");
                switchAdminTab(targetTab);
            });
        });

        // Search & Filter Listeners
        elements.searchInput.addEventListener("input", function (e) {
            activeSearchQuery = e.target.value.toLowerCase().trim();
            renderMessagesList();
        });

        elements.statusFilter.addEventListener("change", function (e) {
            activeFilter = e.target.value;
            renderMessagesList();
        });

        elements.clearAllBtn.addEventListener("click", clearAllMessages);

        // Detail Modal Closing Operations
        elements.closeViewModal.addEventListener("click", closeViewModal);
        elements.closeViewModalBtn.addEventListener("click", closeViewModal);
    }

    /* ==========================================================================
       Public View Functions
       ========================================================================== */
    function toggleMobileMenu() {
        elements.navLinks.classList.toggle("active");
    }

    /* Contact Form Validation and Message Dispatch */
    function handleContactSubmit(e) {
        e.preventDefault();
        
        // Reset Error Feedback Messages
        clearFormErrors();

        // Capture Inputs
        const name = elements.nameInput.value.trim();
        const email = elements.emailInput.value.trim();
        const subject = elements.subjectInput.value.trim();
        const message = elements.messageInput.value.trim();

        let isValid = true;

        // Validation Checks
        if (name === "") {
            elements.nameError.textContent = "Please enter your full name.";
            isValid = false;
        }

        if (email === "") {
            elements.emailError.textContent = "Please enter your email address.";
            isValid = false;
        } else if (!validateEmailPattern(email)) {
            elements.emailError.textContent = "Please provide a valid email format.";
            isValid = false;
        }

        if (subject === "") {
            elements.subjectError.textContent = "Please state a subject message line.";
            isValid = false;
        }

        if (message === "") {
            elements.messageError.textContent = "Please fill out your message body.";
            isValid = false;
        }

        if (!isValid) return;

        // Construct Data Object (Create Operation)
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

        // Append to Array and Persist
        messages.push(newMessage);
        saveMessagesToStorage();

        // Feedback & Form Reset
        elements.contactForm.reset();
        elements.formSuccess.style.display = "block";
        elements.formSuccess.textContent = "Thank you! Your message has been sent successfully.";

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
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    /* ==========================================================================
       Admin Access & Navigation Logic
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
        
        /**
         * FRONTEND DEMONSTRATION NOTICE:
         * Standard static username/password checking logic. 
         * Real security requires a backend server with cryptographic password hashing and HTTP cookies/tokens.
         */
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
            if (link.getAttribute("data-tab") === targetTab) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        elements.tabContents.forEach(content => {
            if (content.id === targetTab + "Tab") {
                content.classList.add("active");
            } else {
                content.classList.remove("active");
            }
        });
    }

    /* ==========================================================================
       Dashboard & Data Rendering
       ========================================================================== */
    function renderDashboard() {
        calculateStatistics();
        renderMessagesList();
        renderRecentMessages();
    }

    /* Dynamic Statistics Engine */
    function calculateStatistics() {
        const total = messages.length;
        const unread = messages.filter(m => m.status === "Unread").length;
        const read = messages.filter(m => m.status === "Read").length;
        const replied = messages.filter(m => m.status === "Replied").length;

        elements.statTotal.textContent = total;
        elements.statUnread.textContent = unread;
        elements.statRead.textContent = read;
        elements.statReplied.textContent = replied;
    }

    /* Render Main Data Management Table (Read Operation) */
    function renderMessagesList() {
        // Filter and Search Pipeline
        let filtered = messages.filter(m => {
            const matchesFilter = (activeFilter === "All") || (m.status === activeFilter);
            const matchesSearch = m.name.toLowerCase().includes(activeSearchQuery) ||
                                  m.email.toLowerCase().includes(activeSearchQuery) ||
                                  m.subject.toLowerCase().includes(activeSearchQuery);
            return matchesFilter && matchesSearch;
        });

        // Reverse to show newest messages first
        filtered.sort((a, b) => b.id - a.id);

        if (filtered.length === 0) {
            elements.messagesListWrapper.innerHTML = `
                <div class="empty-state">
                    <h4>NO MESSAGES FOUND</h4>
                    <p>Messages submitted through the Contact Us form will appear here.</p>
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
            const badgeClass = getBadgeClass(msg.status);

            tableHTML += `
                <tr>
                    <td data-label="Sender">
                        <strong>${escapeHTML(msg.name)}</strong><br>
                        <small style="color:var(--muted);">${escapeHTML(msg.email)}</small>
                    </td>
                    <td data-label="Subject">${escapeHTML(msg.subject)}</td>
                    <td data-label="Date">${msg.date}</td>
                    <td data-label="Status">
                        <select onchange="updateMessageStatus(${msg.id}, this.value)" style="padding:0.2rem 0.4rem; border:1px solid var(--border);">
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

    /* Render Overview Recent Activity Stream */
    function renderRecentMessages() {
        const recent = [...messages].sort((a, b) => b.id - a.id).slice(0, 3);

        if (recent.length === 0) {
            elements.recentMessagesContainer.innerHTML = `<p style="color:var(--muted); margin-top:1rem;">No messages currently logged in system.</p>`;
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
       Message Action Handlers (Update and Delete Operations)
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

        // Auto mark as read on view if currently unread
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

        // Mark message as Replied
        msg.status = "Replied";
        saveMessagesToStorage();

        // Launch system default email client
        const mailtoUri = `mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent("Re: " + msg.subject)}`;
        window.location.href = mailtoUri;
    };

    window.deleteSingleMessage = function (id) {
        const confirmed = confirm("Are you sure you want to permanently delete this message record?");
        if (confirmed) {
            messages = messages.filter(m => m.id !== id);
            saveMessagesToStorage();
        }
    };

    function clearAllMessages() {
        if (messages.length === 0) {
            alert("There are no messages available to delete.");
            return;
        }

        const confirmed = confirm("WARNING: Are you sure you want to delete ALL stored contact messages?");
        if (confirmed) {
            messages = [];
            saveMessagesToStorage();
        }
    }

    /* Helper Utility Functions */
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

    // Launch App
    initApp();
});