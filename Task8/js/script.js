/* ============================================================
   Enrollment Ledger — Student Registration System
   Handles: form validation, add/edit/delete records, rendering,
   and persistence to localStorage.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     State
     ---------------------------------------------------------- */
  const STORAGE_KEY = "enrollmentLedger.students";

  let students = loadStudents();
  let editingId = null; // id of the record currently being edited, or null

  /* ----------------------------------------------------------
     DOM references
     ---------------------------------------------------------- */
  const form = document.getElementById("registration-form");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const courseInput = document.getElementById("course");

  const submitBtn = document.getElementById("submit-btn");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  const formModeTitle = document.getElementById("form-mode-title");
  const formStatus = document.getElementById("form-status");

  const ledgerBody = document.getElementById("ledger-body");
  const ledgerTable = document.getElementById("ledger-table");
  const emptyState = document.getElementById("empty-state");
  const recordCount = document.getElementById("record-count");

  const fields = {
    fullName: fullNameInput,
    email: emailInput,
    phone: phoneInput,
    course: courseInput,
  };

  /* ----------------------------------------------------------
     Validation rules
     Each validator returns an error message string, or "" if valid.
     ---------------------------------------------------------- */
  const validators = {
    fullName(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) {
        return "Name can only contain letters, spaces, and . ' -";
      }
      return "";
    },
    email(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Email address is required.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
      return "";
    },
    phone(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Phone number is required.";
      const digitsOnly = trimmed.replace(/[\s()-]/g, "");
      if (!/^\+?\d{7,15}$/.test(digitsOnly)) {
        return "Enter a valid phone number (7-15 digits).";
      }
      return "";
    },
    course(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Course name is required.";
      if (trimmed.length < 2) return "Course name looks too short.";
      return "";
    },
  };

  /* ----------------------------------------------------------
     Validate a single field, update its UI, return true/false
     ---------------------------------------------------------- */
  function validateField(name) {
    const input = fields[name];
    const errorEl = document.getElementById(`${name}-error`);
    const message = validators[name](input.value);

    if (message) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
      errorEl.textContent = message;
      return false;
    }

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorEl.textContent = "";
    return true;
  }

  function validateAllFields() {
    return Object.keys(fields)
      .map(validateField)
      .every(Boolean);
  }

  function clearValidationStyles() {
    Object.values(fields).forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
    });
    Object.keys(fields).forEach((name) => {
      document.getElementById(`${name}-error`).textContent = "";
    });
  }

  /* ----------------------------------------------------------
     Persistence
     ---------------------------------------------------------- */
  function loadStudents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Could not load saved students:", err);
      return [];
    }
  }

  function saveStudents() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (err) {
      console.error("Could not save students:", err);
    }
  }

  /* ----------------------------------------------------------
     Roll number generator, e.g. REG-2026-001
     ---------------------------------------------------------- */
  function nextRollNumber() {
    const year = new Date().getFullYear();
    const count = students.length + 1;
    return `REG-${year}-${String(count).padStart(3, "0")}`;
  }

  /* ----------------------------------------------------------
     Rendering
     ---------------------------------------------------------- */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderStudents() {
    ledgerBody.innerHTML = "";

    if (students.length === 0) {
      ledgerTable.classList.add("hidden");
      emptyState.classList.add("visible");
    } else {
      ledgerTable.classList.remove("hidden");
      emptyState.classList.remove("visible");

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.dataset.id = student.id;
        if (student.id === editingId) row.classList.add("row-editing");

        row.innerHTML = `
          <td><span class="roll-badge">${escapeHtml(student.rollNo)}</span></td>
          <td class="cell-name">${escapeHtml(student.fullName)}</td>
          <td class="cell-muted">${escapeHtml(student.email)}</td>
          <td class="cell-muted">${escapeHtml(student.phone)}</td>
          <td>${escapeHtml(student.course)}</td>
          <td>
            <div class="row-actions">
              <button type="button" class="btn-icon edit" data-action="edit" data-id="${student.id}">Edit</button>
              <button type="button" class="btn-icon delete" data-action="delete" data-id="${student.id}">Delete</button>
            </div>
          </td>
        `;
        ledgerBody.appendChild(row);
      });
    }

    recordCount.textContent =
      students.length === 1 ? "1 record" : `${students.length} records`;
  }

  /* ----------------------------------------------------------
     Form status helper
     ---------------------------------------------------------- */
  let statusTimeout = null;
  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    clearTimeout(statusTimeout);
    statusTimeout = setTimeout(() => {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }, 3000);
  }

  /* ----------------------------------------------------------
     Enter / exit edit mode
     ---------------------------------------------------------- */
  function enterEditMode(student) {
    editingId = student.id;

    fullNameInput.value = student.fullName;
    emailInput.value = student.email;
    phoneInput.value = student.phone;
    courseInput.value = student.course;
    clearValidationStyles();

    formModeTitle.textContent = "Update Student Record";
    submitBtn.textContent = "Save Changes";
    cancelEditBtn.classList.remove("d-none");

    renderStudents();
    fullNameInput.focus();
  }

  function exitEditMode() {
    editingId = null;
    form.reset();
    clearValidationStyles();

    formModeTitle.textContent = "Register a Student";
    submitBtn.textContent = "Add to Ledger";
    cancelEditBtn.classList.add("d-none");

    renderStudents();
  }

  /* ----------------------------------------------------------
     Event: live validation as the user types / leaves a field
     ---------------------------------------------------------- */
  Object.keys(fields).forEach((name) => {
    const input = fields[name];
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("input", () => {
      // Only re-validate on input once the field has already been marked invalid,
      // so we don't scold the user before they've finished typing.
      if (input.classList.contains("is-invalid")) validateField(name);
    });
  });

  /* ----------------------------------------------------------
     Event: form submit (add or update)
     ---------------------------------------------------------- */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateAllFields()) {
      showStatus("Please fix the highlighted fields before submitting.", "info");
      return;
    }

    const data = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      course: courseInput.value.trim(),
    };

    if (editingId) {
      const student = students.find((s) => s.id === editingId);
      Object.assign(student, data);
      saveStudents();
      showStatus("Record updated successfully.", "success");
      exitEditMode();
    } else {
      const newStudent = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        rollNo: nextRollNumber(),
        ...data,
      };
      students.push(newStudent);
      saveStudents();
      form.reset();
      clearValidationStyles();
      showStatus("Student added to the ledger.", "success");
      renderStudents();

      // Briefly highlight the newly added row
      const newRow = ledgerBody.querySelector(`tr[data-id="${newStudent.id}"]`);
      if (newRow) newRow.classList.add("row-new");
    }
  });

  /* ----------------------------------------------------------
     Event: cancel edit
     ---------------------------------------------------------- */
  cancelEditBtn.addEventListener("click", () => {
    exitEditMode();
    showStatus("Edit cancelled.", "info");
  });

  /* ----------------------------------------------------------
     Event: edit / delete buttons (delegated on tbody)
     ---------------------------------------------------------- */
  ledgerBody.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;

    const { action, id } = btn.dataset;
    const student = students.find((s) => s.id === id);
    if (!student) return;

    if (action === "edit") {
      enterEditMode(student);
    } else if (action === "delete") {
      const confirmed = window.confirm(
        `Remove ${student.fullName} (${student.rollNo}) from the ledger?`
      );
      if (!confirmed) return;

      students = students.filter((s) => s.id !== id);
      saveStudents();

      // If we were editing the record that just got deleted, reset the form.
      if (editingId === id) exitEditMode();

      renderStudents();
      showStatus("Record removed.", "info");
    }
  });

  /* ----------------------------------------------------------
     Initial render
     ---------------------------------------------------------- */
  renderStudents();
})();
