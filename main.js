const API_KEY = "AIzaSyCHdJfqVSd-1rQ1wbbp7uaJwk9Ty2iWRAE";
const CALENDAR_ID = "id.indonesian#holiday@group.v.calendar.google.com";

const DAY_NAMES = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const MONTH_NAMES = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

const THEMES = {
    blue: { accent: "#4f8ef7", accentLight: "#7aadff", accentGlow: "rgba(79,142,247,0.2)", accentRgb: "79,142,247", holiday: "#f87171" },
    green: { accent: "#22c55e", accentLight: "#4ade80", accentGlow: "rgba(34,197,94,0.2)", accentRgb: "34,197,94", holiday: "#fb923c" },
    purple: { accent: "#a855f7", accentLight: "#c084fc", accentGlow: "rgba(168,85,247,0.2)", accentRgb: "168,85,247", holiday: "#fbbf24" },
    rose: { accent: "#f43f5e", accentLight: "#fb7185", accentGlow: "rgba(244,63,94,0.2)", accentRgb: "244,63,94", holiday: "#fbbf24" },
    amber: { accent: "#f59e0b", accentLight: "#fbbf24", accentGlow: "rgba(245,158,11,0.2)", accentRgb: "245,158,11", holiday: "#f87171" },
    teal: { accent: "#14b8a6", accentLight: "#2dd4bf", accentGlow: "rgba(20,184,166,0.2)", accentRgb: "20,184,166", holiday: "#f87171" },
};


let state = {
    date: new Date(),
    selectedDate: null,
    holidays: {}, // { "YYYY-MM-DD": "Nama Libur" }
    events: {}, // { "YYYY-MM-DD": { title, desc, time, reminder } }
    showHoliday: true,
    showEvent: true,
    theme: "blue",
    isAnimating: false,
    editDate: null, // date being edited
};


const $ = id => document.getElementById(id);
const els = {
    monthLabel: $("monthLabel"),
    yearInput: $("yearInput"),
    calGrid: $("calendarGrid"),
    dayHeaders: $("dayHeaders"),
    infoPanel: $("infoPanel"),
    pillHoliday: $("pillHoliday"),
    pillEvent: $("pillEvent"),
    toast: $("toast"),
    footer: $("appFooter"),
    // Modals
    eventModal: $("eventModal"),
    themeModal: $("themeModal"),
    listModal: $("listModal"),
    confirmModal: $("confirmModal"),
    // Event form
    evDate: $("evDate"),
    evTime: $("evTime"),
    evTitle: $("evTitle"),
    evDesc: $("evDesc"),
    evReminder: $("evReminder"),
    reminderRow: $("reminderRow"),
    eventForm: $("eventForm"),
    eventModalTitle: $("eventModalTitle"),
    // Lists
    eventListWrap: $("eventListWrap"),
    confirmText: $("confirmText"),
};


const ICONS = {
    edit: `<svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"/></svg>`,
    del: `<svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/></svg>`,
    remOn: `<svg viewBox="0 0 24 24"><path d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16.5V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.93 6,11V16.5L4,18V19H20V18L18,16.5Z"/></svg>`,
    remOff: `<svg viewBox="0 0 24 24"><path d="M2.76,3.87L1.49,5.14L6,9.65V11C6,7.93 7.64,5.36 10.5,4.68V4A1.5,1.5 0 0,1 12,2.5A1.5,1.5 0 0,1 13.5,4V4.68C14.1,4.82 14.67,5.03 15.2,5.3L18.87,8.96L20.14,7.69L2.76,3.87M18,16.5V11.82L8.14,2L6.87,3.27L18,16.5M4,19H20V18L18,16.5V11.82L4.5,6L3,7.5L4,8.5V16.5L2,18V19H4M10,20H14A2,2 0 0,1 12,22A2,2 0 0,1 10,20Z"/></svg>`,
    empty: `<svg viewBox="0 0 24 24"><path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V9H7V7M7,11H17V13H7V11M7,15H13V17H7V15Z"/></svg>`,
};


const pad2 = n => String(n).padStart(2, "0");
const dateStr = (y, m, d) => `${y}-${pad2(m+1)}-${pad2(d)}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

function getPasaran(date) {
    const ref = new Date(2023, 0, 1);
    const diff = Math.floor((date - ref) / 86400000);
    return PASARAN[(diff % 5 + 5) % 5];
}

function formatDateLong(ds) {
    if (!ds) return "";
    const d = new Date(ds);
    d.setUTCHours(12);
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function diffLabel(ds) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tgt = new Date(ds);
    tgt.setHours(0, 0, 0, 0);
    const diff = Math.round((tgt - today) / 86400000);
    if (diff === 0) return { text: "Hari Ini", cls: "today" };
    if (diff > 0) return { text: `${diff} hari lagi`, cls: "future" };
    return { text: `${Math.abs(diff)} hari lalu`, cls: "past" };
}

function showToast(msg, duration = 2500) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    setTimeout(() => els.toast.classList.remove("show"), duration);
}


function applyTheme(name) {
    const t = THEMES[name] || THEMES.blue;
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-light", t.accentLight);
    r.setProperty("--accent-glow", t.accentGlow);
    r.setProperty("--accent-rgb", t.accentRgb);
    r.setProperty("--holiday", t.holiday);
    // Holiday color also red-variant
    state.theme = name;
    localStorage.setItem("kalender_theme", name);
    // Update picker UI
    document.querySelectorAll(".theme-opt").forEach(el => {
        el.classList.toggle("sel", el.dataset.theme === name);
    });
}


function saveEvents() {
    try { localStorage.setItem("kalender_events", JSON.stringify(state.events)); } catch (e) { showToast("Gagal menyimpan."); }
}

function loadEvents() {
    try {
        const raw = localStorage.getItem("kalender_events");
        if (raw) state.events = JSON.parse(raw);
    } catch (e) { state.events = {}; }
}


async function fetchHolidays(year) {
    if (state.holidays._year === year) return;
    const tMin = `${year}-01-01T00:00:00Z`;
    const tMax = `${year}-12-31T23:59:59Z`;
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${tMin}&timeMax=${tMax}&singleEvents=true&orderBy=startTime`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        const h = { _year: year };
        (data.items || []).forEach(ev => { h[ev.start.date] = ev.summary; });
        state.holidays = h;
    } catch (e) {
        console.warn("Gagal ambil data libur:", e);
    }
}


function renderDayHeaders() {
    els.dayHeaders.innerHTML = DAY_NAMES.map((n, i) =>
        `<div class="day-header${i===0?" sun":""}">${n}</div>`
    ).join("");
}

function renderCalendar() {
    const y = state.date.getFullYear();
    const m = state.date.getMonth();

    els.monthLabel.textContent = `${MONTH_NAMES[m]} ${y}`;
    els.yearInput.value = y;

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const tStr = todayStr();

    let html = "";
    for (let i = 0; i < firstDay; i++) html += `<div></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
        const ds = dateStr(y, m, d);
        const dateObj = new Date(y, m, d);
        const isSun = dateObj.getDay() === 0;
        const isHol = state.showHoliday && state.holidays[ds] !== undefined;
        const hasEv = state.showEvent && state.events[ds] !== undefined;
        const isToday = ds === tStr;
        const isSel = ds === state.selectedDate;
        const pasaran = getPasaran(dateObj);

        const cls = ["day-cell",
            isSun ? "is-sunday" : "",
            isHol ? "is-holiday" : "",
            isToday ? "is-today" : "",
            isSel ? "is-selected" : "",
        ].filter(Boolean).join(" ");

        const dots = [
            isHol ? `<span class="dot dot-h"></span>` : "",
            hasEv ? `<span class="dot dot-e"></span>` : "",
        ].join("");

        html += `
      <div class="${cls}" data-date="${ds}" tabindex="0" role="button" aria-label="${ds}${isHol?" (Libur)":""}${hasEv?" (Ada acara)":""}">
        <div class="day-num">${d}</div>
        <div class="day-pasaran">${pasaran}</div>
        ${dots ? `<div class="day-dots">${dots}</div>` : ""}
      </div>`;
  }

  els.calGrid.innerHTML = html;

  
  els.calGrid.querySelectorAll(".day-cell").forEach(el => {
    el.addEventListener("click", () => selectDate(el.dataset.date));
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectDate(el.dataset.date); }
    });
  });
}

function selectDate(ds) {
  if (navigator.vibrate) navigator.vibrate(8);
  state.selectedDate = ds;
  renderCalendar();
  renderInfoPanel();
}


function renderInfoPanel() {
  if (!state.selectedDate) { els.infoPanel.classList.add("hidden"); return; }

  const ds    = state.selectedDate;
  const hol   = state.showHoliday ? state.holidays[ds] : null;
  const ev    = state.showEvent   ? state.events[ds]   : null;
  const diff  = diffLabel(ds);

  let html = "";

  if (hol) {
    html += `
      <div class="info-block fade-up">
        <div class="info-tag h">🎉 Libur Nasional</div>
        <div class="info-title">${hol}</div>
      </div>`;
  }

  if (ev) {
    const remCls = ev.reminder ? "on" : "";
    const remLbl = ev.reminder ? "Pengingat Aktif" : "Pengingat";
    html += `
      <div class="info-block fade-up">
        <div class="info-tag e">📅 Acara Saya</div>
        <div class="info-title">${ev.title}</div>
        ${ev.time ? `<div class="info-time">🕐 Pukul ${ev.time}</div>` : ""}
        ${ev.desc ? `<div class="info-desc">${ev.desc.replace(/\n/g,"<br>")}</div>` : ""}
        <div class="info-actions">
          ${ev.time ? `<button class="info-act-btn reminder ${remCls}" data-action="remind" data-date="${ds}">${ICONS.remOn} ${remLbl}</button>` : ""}
          <button class="info-act-btn edit"   data-action="edit"   data-date="${ds}">${ICONS.edit} Edit</button>
          <button class="info-act-btn delete" data-action="delete" data-date="${ds}">${ICONS.del} Hapus</button>
        </div>
      </div>`;
  }

  const dateStr2 = formatDateLong(ds);
  html += `
    <div class="info-footer">
      <span class="info-date-str">${dateStr2}</span>
      <span class="info-diff ${diff.cls}">${diff.text}</span>
    </div>`;

  els.infoPanel.innerHTML = html;
  els.infoPanel.classList.remove("hidden");


  els.infoPanel.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const { action, date } = btn.dataset;
      if (action === "edit")   openEditEvent(date);
      if (action === "delete") deleteEvent(date);
      if (action === "remind") toggleReminder(date);
    });
  });
}


async function changeMonth(dir) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  const outCls = dir > 0 ? "cal-out-l" : "cal-out-r";
  const inCls  = dir > 0 ? "cal-in-r"  : "cal-in-l";

  els.calGrid.classList.add(outCls);
  await new Promise(r => setTimeout(r, 200));

  state.date.setMonth(state.date.getMonth() + dir);
  await fetchHolidays(state.date.getFullYear());
  renderCalendar();

  els.calGrid.classList.remove(outCls);
  els.calGrid.classList.add(inCls);
  await new Promise(r => setTimeout(r, 220));
  els.calGrid.classList.remove(inCls);
  state.isAnimating = false;
}


function openModal(id) {
  const m = $(id); if (!m) return;
  m.classList.add("active");
  document.addEventListener("keydown", escHandler);
}

function closeModal(id) {
  const m = $(id); if (!m) return;
  m.classList.remove("active");
}

function escHandler(e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
    document.removeEventListener("keydown", escHandler);
  }
}


document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});


document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});


function openAddEvent(ds) {
  state.editDate = null;
  els.eventModalTitle.textContent = "Tambah Acara";
  els.eventForm.reset();
  els.evDate.value = ds || todayStr();
  updateReminderRow();
  openModal("eventModal");
}

function openEditEvent(ds) {
  const ev = state.events[ds]; if (!ev) return;
  state.editDate = ds;
  els.eventModalTitle.textContent = "Edit Acara";
  els.evDate.value    = ds;
  els.evTitle.value   = ev.title;
  els.evTime.value    = ev.time  || "";
  els.evDesc.value    = ev.desc  || "";
  els.evReminder.checked = ev.reminder || false;
  updateReminderRow();
  openModal("eventModal");
}

function updateReminderRow() {
  const hasTime = !!els.evTime.value;
  els.reminderRow.classList.toggle("off", !hasTime);
  if (!hasTime) els.evReminder.checked = false;
}

els.evTime.addEventListener("input", updateReminderRow);
els.evReminder.addEventListener("change", async () => {
  if (els.evReminder.checked) await requestNotifPerm();
});

els.eventForm.addEventListener("submit", e => {
  e.preventDefault();
  const newDate = els.evDate.value;
  const title   = els.evTitle.value.trim();
  const desc    = els.evDesc.value.trim();
  const time    = els.evTime.value;
  const reminder= els.evReminder.checked;

  if (!newDate || !title) { showToast("Tanggal & judul wajib diisi!"); return; }


  if (state.editDate && state.editDate !== newDate) {
    delete state.events[state.editDate];
  }

  state.events[newDate] = { title, desc, time, reminder };
  saveEvents();
  closeModal("eventModal");
  showToast(state.editDate ? "✅ Acara diperbarui!" : "✅ Acara disimpan!");

  state.selectedDate = newDate;
  renderCalendar();
  renderInfoPanel();
});


let _confirmResolve = null;

function showConfirm(msg) {
  els.confirmText.innerHTML = msg;
  openModal("confirmModal");
  return new Promise(r => { _confirmResolve = r; });
}

$("confirmYes").addEventListener("click", () => {
  if (_confirmResolve) _confirmResolve(true);
  closeModal("confirmModal");
});
$("confirmNo").addEventListener("click", () => {
  if (_confirmResolve) _confirmResolve(false);
  closeModal("confirmModal");
});

async function deleteEvent(ds) {
  const ev = state.events[ds]; if (!ev) return;
  const ok = await showConfirm(`Hapus acara <b>"${ev.title}"</b>?`);
  if (!ok) return;
  delete state.events[ds];
  saveEvents();
  showToast("🗑️ Acara dihapus.");
  renderCalendar();
  renderInfoPanel();
  if (els.listModal.classList.contains("active")) renderEventList();
}

async function toggleReminder(ds) {
  const ev = state.events[ds]; if (!ev || !ev.time) return;
  if (!ev.reminder) {
    const ok = await requestNotifPerm();
    if (!ok) { showToast("Izin notifikasi ditolak."); return; }
  }
  ev.reminder = !ev.reminder;
  saveEvents();
  showToast(ev.reminder ? "🔔 Pengingat diaktifkan!" : "🔕 Pengingat dinonaktifkan.");
  renderInfoPanel();
  if (els.listModal.classList.contains("active")) renderEventList();
}


function renderEventList() {
  const dates = Object.keys(state.events).sort((a,b) => new Date(a) - new Date(b));
  if (!dates.length) {
    els.eventListWrap.innerHTML = `
      <div class="ev-list-empty">
        ${ICONS.empty}
        <strong>Belum ada acara</strong><br>
        Ketuk tombol <strong>+</strong> di bawah untuk menambah acara.
      </div>`;
    return;
  }
  els.eventListWrap.innerHTML = dates.map(ds => {
    const ev    = state.events[ds];
    const d     = new Date(ds); d.setUTCHours(12);
    const day   = d.getDate();
    const month = d.toLocaleString("id-ID",{ month:"short" });
    const remCls= ev.reminder && ev.time ? "on" : "";
    const remLbl= ev.reminder && ev.time ? "Pengingat Aktif" : "Pengingat";
    return `
      <div class="ev-card">
        <div class="ev-date-box">
          <div class="ev-day">${day}</div>
          <div class="ev-month">${month}</div>
        </div>
        <div class="ev-info">
          <div class="ev-title">${ev.title}</div>
          ${ev.time ? `<div class="ev-meta">🕐 ${ev.time}</div>` : ""}
          ${ev.desc ? `<div class="ev-desc">${ev.desc}</div>` : ""}
        </div>
        <div class="ev-actions">
          ${ev.time ? `<button class="ea-btn rem ${remCls}" data-action="remind" data-date="${ds}" title="${remLbl}">${ICONS.remOn}</button>` : ""}
          <button class="ea-btn edit"  data-action="edit"   data-date="${ds}" title="Edit">${ICONS.edit}</button>
          <button class="ea-btn del"   data-action="delete" data-date="${ds}" title="Hapus">${ICONS.del}</button>
        </div>
      </div>`;
  }).join("");

  els.eventListWrap.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const { action, date } = btn.dataset;
      if (action === "edit")   { closeModal("listModal"); openEditEvent(date); }
      if (action === "delete") { deleteEvent(date); }
      if (action === "remind") { toggleReminder(date); }
    });
  });
}


els.pillHoliday.addEventListener("click", () => {
  state.showHoliday = !state.showHoliday;
  els.pillHoliday.classList.toggle("on-holiday", state.showHoliday);
  renderCalendar();
  renderInfoPanel();
});
els.pillHoliday.addEventListener("keydown", e => { if (e.key==="Enter") els.pillHoliday.click(); });

els.pillEvent.addEventListener("click", () => {
  state.showEvent = !state.showEvent;
  els.pillEvent.classList.toggle("on-event", state.showEvent);
  renderCalendar();
  renderInfoPanel();
});
els.pillEvent.addEventListener("keydown", e => { if (e.key==="Enter") els.pillEvent.click(); });


$("bbAddBtn").addEventListener("click", () => openAddEvent(state.selectedDate));
$("bbListBtn").addEventListener("click", () => { renderEventList(); openModal("listModal"); });
$("bbThemeBtn").addEventListener("click", () => openModal("themeModal"));


$("prevMonthBtn").addEventListener("click", () => changeMonth(-1));
$("nextMonthBtn").addEventListener("click", () => changeMonth(1));
$("todayBtn").addEventListener("click", () => {
  state.date = new Date();
  state.selectedDate = todayStr();
  simpleRender();
});
$("goYearBtn").addEventListener("click", () => {
  const y = parseInt(els.yearInput.value);
  if (y >= 1900 && y <= 2100) { state.date.setFullYear(y); simpleRender(); }
});
els.yearInput.addEventListener("keydown", e => {
  if (e.key === "Enter") $("goYearBtn").click();
});


document.querySelectorAll(".theme-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    applyTheme(opt.dataset.theme);
    renderCalendar();
    renderInfoPanel();
    closeModal("themeModal");
    showToast("🎨 Tema diubah!");
  });
});


let touchX = 0;
const calWrap = document.querySelector(".calendar-wrap");
calWrap.addEventListener("touchstart", e => { touchX = e.changedTouches[0].screenX; }, { passive:true });
calWrap.addEventListener("touchend",   e => {
  const dx = e.changedTouches[0].screenX - touchX;
  if (Math.abs(dx) > 50) changeMonth(dx < 0 ? 1 : -1);
}, { passive:true });


async function requestNotifPerm() {
  if (!("Notification" in window)) { showToast("Browser tidak mendukung notifikasi."); return false; }
  if (Notification.permission === "granted") return true;
  if (Notification.permission !== "denied") {
    const p = await Notification.requestPermission();
    return p === "granted";
  }
  return false;
}

function checkNotifications() {
  const now = new Date();
  const ds  = now.toISOString().slice(0,10);
  const t   = now.toTimeString().slice(0,5);
  const ev  = state.events[ds];
  if (ev?.reminder && ev.time === t && ev.lastNotified !== t) {
    if (Notification.permission === "granted") {
      new Notification("📅 Pengingat Acara", { body: ev.title, icon: "./favicon.ico" });
    }
    ev.lastNotified = t;
  }
}


function setFooter() {
  els.footer.innerHTML = `&copy; ${new Date().getFullYear()} Kalender Indonesia &mdash; Libur Nasional &amp; Acara Pribadi`;
}


async function simpleRender() {
  await fetchHolidays(state.date.getFullYear());
  renderCalendar();
  renderInfoPanel();
}


(async function init() {
  loadEvents();
  setFooter();
  renderDayHeaders();


  const savedTheme = localStorage.getItem("kalender_theme") || "blue";
  applyTheme(savedTheme);


  state.selectedDate = todayStr();

  await simpleRender();

  
  setInterval(checkNotifications, 60000);
  checkNotifications();
})();