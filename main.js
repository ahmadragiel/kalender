const API_KEY = "AIzaSyCHdJfqVSd-1rQ1wbbp7uaJwk9Ty2iWRAE";
const CALENDAR_ID = "id.indonesian#holiday@group.v.calendar.google.com";

const DAY_NAMES = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const MONTH_NAMES = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];


const PASARAN_LIST = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

// Referensi: 1 Januari 2023 = Ahad Pahing
const REF_DATE = new Date(2023, 0, 1);
const REF_PASARAN_IDX = 1; // Pahing


const NEPTU_HARI = [5, 4, 3, 7, 8, 6, 9]; // Min,Sen,Sel,Rab,Kam,Jum,Sab
const NAMA_HARI = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];


const NEPTU_PASARAN = { Legi: 5, Pahing: 9, Pon: 7, Wage: 4, Kliwon: 8 };


const WATAK_PASARAN = {
    Legi: {
        emoji: "🌟",
        ringkas: "Ramah & Dermawan",
        detail: "Orang berpasaran Legi cenderung murah hati, ramah, dan mudah bergaul. Mereka disukai banyak orang karena sifatnya yang terbuka dan senang berbagi. Namun perlu berhati-hati agar tidak terlalu mudah dipercaya orang lain.",
        haribaik: "Hari baik: Senin, Kamis, dan Jumat — cocok untuk memulai usaha dan hajat besar.",
        larangan: "Hindari memulai perjalanan jauh pada hari Selasa Kliwon."
    },
    Pahing: {
        emoji: "🔥",
        ringkas: "Tegas & Berwibawa",
        detail: "Pasaran Pahing melahirkan pribadi yang tegas, berpendirian kuat, dan berwibawa. Mereka adalah pemimpin alami yang disegani. Kadang terkesan keras dan sulit dikompromikan, namun sangat dapat diandalkan.",
        haribaik: "Hari baik: Rabu dan Sabtu — cocok untuk negosiasi dan pengambilan keputusan penting.",
        larangan: "Hindari bertengkar pada hari Ahad Legi karena energi akan sulit dikendalikan."
    },
    Pon: {
        emoji: "💫",
        ringkas: "Bijaksana & Sabar",
        detail: "Orang berpasaran Pon dikenal bijaksana, sabar, dan berpikiran panjang. Mereka jarang terburu-buru dalam mengambil keputusan. Memiliki kemampuan analisa yang baik dan sering jadi penengah dalam konflik.",
        haribaik: "Hari baik: Senin Pon dan Kamis Pon — sangat cocok untuk pindahan rumah dan menikah.",
        larangan: "Hindari memulai proyek besar pada hari Jumat Wage."
    },
    Wage: {
        emoji: "⚡",
        ringkas: "Energik & Pekerja Keras",
        detail: "Pasaran Wage memberi sifat dinamis, penuh semangat, dan pantang menyerah. Mereka sangat produktif dan tidak mudah putus asa. Cocok di bidang yang membutuhkan stamina dan kegigihan tinggi.",
        haribaik: "Hari baik: Selasa dan Jumat — cocok untuk pekerjaan fisik dan memulai proyek.",
        larangan: "Hindari bepergian ke arah Barat pada hari Sabtu Kliwon."
    },
    Kliwon: {
        emoji: "🌙",
        ringkas: "Intuitif & Spiritual",
        detail: "Orang berpasaran Kliwon memiliki kepekaan batin yang tinggi, intuitif, dan dekat dengan hal-hal spiritual. Sering mendapat firasat atau petunjuk batin. Mereka cenderung misterius namun sangat terpercaya.",
        haribaik: "Hari baik: Jumat Kliwon (Jumat Keliwon) — hari paling sakral dan baik untuk doa serta hajat spiritual.",
        larangan: "Hindari memulai usaha baru pada hari Rabu malam (malam Kamis)."
    },
};


function getKecocokan(neptuA, neptuB) {
    const total = (neptuA + neptuB) % 9 || 9;
    const tabel = {
        1: { label: "Wasesa Segara", skor: 90, cls: "bagus", desc: "Laksana lautan — penuh wibawa, murah hati, dan banyak rezeki." },
        2: { label: "Tunggak Semi", skor: 85, cls: "bagus", desc: "Seperti tunggul tumbuh — rejeki lancar, anak cucu sejahtera." },
        3: { label: "Satriya Wibawa", skor: 75, cls: "bagus", desc: "Punya wibawa seperti ksatria — disegani banyak orang." },
        4: { label: "Sumur Sinaba", skor: 80, cls: "bagus", desc: "Seperti sumur — selalu ada solusi dan menjadi tempat bergantung." },
        5: { label: "Pandita Sakti", skor: 70, cls: "sedang", desc: "Perlu usaha lebih, namun memiliki ilmu dan kebijaksanaan." },
        6: { label: "Bumi Kapetak", skor: 55, cls: "sedang", desc: "Butuh kesabaran dan kerjasama ekstra agar hubungan harmonis." },
        7: { label: "Lebu Katiup Angin", skor: 40, cls: "kurang", desc: "Seperti debu ditiup angin — perlu perhatian lebih dalam menjaga hubungan." },
        8: { label: "Satria Wirang", skor: 50, cls: "sedang", desc: "Ada tantangan yang harus dilalui bersama dengan penuh keikhlasan." },
        9: { label: "Tulus", skor: 88, cls: "bagus", desc: "Ketulusan menjadi fondasi — hubungan dilandasi keikhlasan dan kejujuran." },
    };
    return {...tabel[total], total, sisaNeptu: total };
}


function isHariBaik(dateObj) {
    const hari = dateObj.getDay();
    const pasaran = getPasaran(dateObj);
    const neptu = NEPTU_HARI[hari] + NEPTU_PASARAN[pasaran];
    return neptu >= 13 || neptu === 10 || neptu === 12;
}


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
    holidays: {},
    events: {},
    showHoliday: true,
    showEvent: true,
    showWeton: true,
    theme: "blue",
    isAnimating: false,
    editDate: null,
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
    pillWeton: $("pillWeton"),
    toast: $("toast"),
    footer: $("appFooter"),
    eventModal: $("eventModal"),
    themeModal: $("themeModal"),
    listModal: $("listModal"),
    confirmModal: $("confirmModal"),
    wetonDetailModal: $("wetonDetailModal"),
    wetonDetailBody: $("wetonDetailBody"),
    evDate: $("evDate"),
    evTime: $("evTime"),
    evTitle: $("evTitle"),
    evDesc: $("evDesc"),
    evReminder: $("evReminder"),
    reminderRow: $("reminderRow"),
    eventForm: $("eventForm"),
    eventModalTitle: $("eventModalTitle"),
    eventListWrap: $("eventListWrap"),
    confirmText: $("confirmText"),
};


const ICONS = {
    edit: `<svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z"/></svg>`,
    del: `<svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/></svg>`,
    remOn: `<svg viewBox="0 0 24 24"><path d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16.5V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.93 6,11V16.5L4,18V19H20V18L18,16.5Z"/></svg>`,
    empty: `<svg viewBox="0 0 24 24"><path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V9H7V7M7,11H17V13H7V11M7,15H13V17H7V15Z"/></svg>`,
    weton: `<svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>`,
};


function getPasaran(date) {
    const diff = Math.floor((date - REF_DATE) / 86400000);
    const idx = ((REF_PASARAN_IDX + diff) % 5 + 5) % 5;
    return PASARAN_LIST[idx];
}

function getWetonInfo(dateObj) {
    const hari = dateObj.getDay();
    const pasaran = getPasaran(dateObj);
    const neptuH = NEPTU_HARI[hari];
    const neptuP = NEPTU_PASARAN[pasaran];
    const neptu = neptuH + neptuP;
    const namaH = NAMA_HARI[hari];
    const weton = `${namaH} ${pasaran}`;
    const watak = WATAK_PASARAN[pasaran];
    const hariB = isHariBaik(dateObj);
    return { hari: namaH, pasaran, neptuHari: neptuH, neptuPasaran: neptuP, neptu, weton, watak, hariB };
}


const pad2 = n => String(n).padStart(2, "0");
const mkDateStr = (y, m, d) => `${y}-${pad2(m+1)}-${pad2(d)}`;
const todayStr = () => new Date().toISOString().slice(0, 10);

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

function showToast(msg, dur = 2500) {
    els.toast.textContent = msg;
    els.toast.classList.add("show");
    setTimeout(() => els.toast.classList.remove("show"), dur);
}


function applyTheme(name) {
    const t = THEMES[name] || THEMES.blue;
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-light", t.accentLight);
    r.setProperty("--accent-glow", t.accentGlow);
    r.setProperty("--accent-rgb", t.accentRgb);
    r.setProperty("--holiday", t.holiday);
    state.theme = name;
    localStorage.setItem("kalender_theme", name);
    document.querySelectorAll(".theme-opt").forEach(el =>
        el.classList.toggle("sel", el.dataset.theme === name));
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
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${year}-01-01T00:00:00Z&timeMax=${year}-12-31T23:59:59Z&singleEvents=true&orderBy=startTime`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        const h = { _year: year };
        (data.items || []).forEach(ev => { h[ev.start.date] = ev.summary; });
        state.holidays = h;
    } catch (e) { console.warn("Gagal ambil data libur:", e); }
}


function renderDayHeaders() {
    els.dayHeaders.innerHTML = DAY_NAMES.map((n, i) =>
        `<div class="day-header${i===0?" sun":""}">${n}</div>`).join("");
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
        const ds = mkDateStr(y, m, d);
        const dateObj = new Date(y, m, d);
        const wi = getWetonInfo(dateObj);
        const isHol = state.showHoliday && state.holidays[ds] !== undefined;
        const hasEv = state.showEvent && state.events[ds] !== undefined;
        const isSun = dateObj.getDay() === 0;
        const isToday = ds === tStr;
        const isSel = ds === state.selectedDate;

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


        const wetonLabel = state.showWeton ?
            `<div class="day-weton">${wi.pasaran.slice(0,3)}</div>` :
            `<div class="day-pasaran">${wi.pasaran.slice(0,3)}</div>`;

        html += `
      <div class="${cls}" data-date="${ds}" tabindex="0" role="button" aria-label="${ds}">
        <div class="day-num">${d}</div>
        ${wetonLabel}
        ${dots ? `<div class="day-dots">${dots}</div>` : ""}
      </div>`;
  }

  els.calGrid.innerHTML = html;

  els.calGrid.querySelectorAll(".day-cell").forEach(el => {
    el.addEventListener("click",   () => selectDate(el.dataset.date));
    el.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); selectDate(el.dataset.date); } });
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

  const ds      = state.selectedDate;
  const dateObj = new Date(ds); dateObj.setUTCHours(12);
  const hol     = state.showHoliday ? state.holidays[ds] : null;
  const ev      = state.showEvent   ? state.events[ds]   : null;
  const wi      = getWetonInfo(dateObj);
  const diff    = diffLabel(ds);

  let html = "";


  if (hol) {
    html += `
      <div class="info-block fade-up">
        <div class="info-tag h">🎉 Libur Nasional</div>
        <div class="info-title">${hol}</div>
      </div>`;
  }

 
  if (state.showWeton) {
    const hariB = wi.hariB ? `<span style="color:var(--green);font-weight:700;">✨ Hari Baik</span>` : "";
    html += `
      <div class="info-block fade-up">
        <div class="info-tag w">🔮 Weton Jawa</div>
        <div class="info-title">${wi.weton} ${hariB}</div>
        <div class="weton-inline-grid">
          <div class="weton-inline-item">
            <div class="weton-inline-label">Hari</div>
            <div class="weton-inline-val">${wi.hari}</div>
            <div class="weton-inline-sub">Neptu ${wi.neptuHari}</div>
          </div>
          <div class="weton-inline-item">
            <div class="weton-inline-label">Pasaran</div>
            <div class="weton-inline-val">${wi.pasaran}</div>
            <div class="weton-inline-sub">Neptu ${wi.neptuPasaran}</div>
          </div>
          <div class="weton-inline-item">
            <div class="weton-inline-label">Total Neptu</div>
            <div class="weton-inline-val">${wi.neptu}</div>
            <div class="weton-inline-sub">Gabungan</div>
          </div>
          <div class="weton-inline-item">
            <div class="weton-inline-label">Watak</div>
            <div class="weton-inline-val" style="font-size:12px;">${wi.watak.ringkas}</div>
            <div class="weton-inline-sub">${wi.pasaran}</div>
          </div>
        </div>
        <button class="weton-detail-btn" data-date="${ds}">
          ${ICONS.weton} Lihat Detail Weton
        </button>
      </div>`;
  }


  if (ev) {
    const remCls = ev.reminder ? "on" : "";
    html += `
      <div class="info-block fade-up">
        <div class="info-tag e">📅 Acara Saya</div>
        <div class="info-title">${ev.title}</div>
        ${ev.time ? `<div class="info-time">🕐 Pukul ${ev.time}</div>` : ""}
        ${ev.desc ? `<div class="info-desc">${ev.desc.replace(/\n/g,"<br>")}</div>` : ""}
        <div class="info-actions">
          ${ev.time ? `<button class="info-act-btn reminder ${remCls}" data-action="remind" data-date="${ds}">${ICONS.remOn} ${ev.reminder?"Pengingat Aktif":"Pengingat"}</button>` : ""}
          <button class="info-act-btn edit"   data-action="edit"   data-date="${ds}">${ICONS.edit} Edit</button>
          <button class="info-act-btn delete" data-action="delete" data-date="${ds}">${ICONS.del} Hapus</button>
        </div>
      </div>`;
  }

  html += `
    <div class="info-footer">
      <span class="info-date-str">${formatDateLong(ds)}</span>
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

  
  els.infoPanel.querySelectorAll(".weton-detail-btn").forEach(btn => {
    btn.addEventListener("click", () => openWetonDetail(btn.dataset.date));
  });
}


function openWetonDetail(ds) {
  const dateObj = new Date(ds); dateObj.setUTCHours(12);
  const wi      = getWetonInfo(dateObj);
  const w       = wi.watak;

  els.wetonDetailBody.innerHTML = `
    <div class="weton-detail-section">
      <div class="weton-detail-big">
        <div style="font-size:36px;margin-bottom:8px;">${w.emoji}</div>
        <div class="weton-detail-big-name">${wi.weton}</div>
        <div class="weton-detail-big-sub">${formatDateLong(ds)}</div>
      </div>
      <div class="weton-detail-stats">
        <div class="wds">
          <div class="wds-label">Hari</div>
          <div class="wds-val">${wi.hari}</div>
          <div class="wds-sub">Neptu ${wi.neptuHari}</div>
        </div>
        <div class="wds">
          <div class="wds-label">Pasaran</div>
          <div class="wds-val">${wi.pasaran}</div>
          <div class="wds-sub">Neptu ${wi.neptuPasaran}</div>
        </div>
        <div class="wds">
          <div class="wds-label">Total Neptu</div>
          <div class="wds-val">${wi.neptu}</div>
          <div class="wds-sub">${wi.hariB ? "✨ Hari Baik" : "Biasa"}</div>
        </div>
      </div>
    </div>

    <div class="weton-detail-section">
      <div class="weton-detail-section-title">Watak & Karakter</div>
      <div class="weton-detail-watak">
        <div class="weton-detail-watak-title">${w.ringkas}</div>
        <div class="weton-detail-watak-text">${w.detail}</div>
      </div>
    </div>

    <div class="weton-detail-section">
      <div class="weton-detail-section-title">Pantangan & Anjuran</div>
      <div class="weton-detail-hari-baik">🌟 ${w.haribaik}</div>
      <div class="weton-detail-larangan">⚠️ ${w.larangan}</div>
    </div>
  `;
  openModal("wetonDetailModal");
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
  overlay.addEventListener("click", e => { if (e.target===overlay) closeModal(overlay.id); });
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
  els.evDate.value   = ds;
  els.evTitle.value  = ev.title;
  els.evTime.value   = ev.time  || "";
  els.evDesc.value   = ev.desc  || "";
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
  const newDate  = els.evDate.value;
  const title    = els.evTitle.value.trim();
  const desc     = els.evDesc.value.trim();
  const time     = els.evTime.value;
  const reminder = els.evReminder.checked;
  if (!newDate || !title) { showToast("Tanggal & judul wajib diisi!"); return; }
  if (state.editDate && state.editDate !== newDate) delete state.events[state.editDate];
  state.events[newDate] = { title, desc, time, reminder };
  saveEvents();
  closeModal("eventModal");
  showToast(state.editDate ? "✅ Acara diperbarui!" : "✅ Acara disimpan!");
  state.selectedDate = newDate;
  renderCalendar(); renderInfoPanel();
});


let _confirmResolve = null;
function showConfirm(msg) {
  els.confirmText.innerHTML = msg;
  openModal("confirmModal");
  return new Promise(r => { _confirmResolve = r; });
}
$("confirmYes").addEventListener("click", () => { if(_confirmResolve) _confirmResolve(true);  closeModal("confirmModal"); });
$("confirmNo").addEventListener("click",  () => { if(_confirmResolve) _confirmResolve(false); closeModal("confirmModal"); });

async function deleteEvent(ds) {
  const ev = state.events[ds]; if (!ev) return;
  const ok = await showConfirm(`Hapus acara <b>"${ev.title}"</b>?`);
  if (!ok) return;
  delete state.events[ds]; saveEvents();
  showToast("🗑️ Acara dihapus.");
  renderCalendar(); renderInfoPanel();
  if (els.listModal.classList.contains("active")) renderEventList();
}
async function toggleReminder(ds) {
  const ev = state.events[ds]; if (!ev||!ev.time) return;
  if (!ev.reminder) {
    const ok = await requestNotifPerm();
    if (!ok) { showToast("Izin notifikasi ditolak."); return; }
  }
  ev.reminder = !ev.reminder; saveEvents();
  showToast(ev.reminder ? "🔔 Pengingat diaktifkan!" : "🔕 Dinonaktifkan.");
  renderInfoPanel();
  if (els.listModal.classList.contains("active")) renderEventList();
}


function renderEventList() {
  const dates = Object.keys(state.events).sort((a,b) => new Date(a)-new Date(b));
  if (!dates.length) {
    els.eventListWrap.innerHTML = `
      <div class="ev-list-empty">
        ${ICONS.empty}
        <strong>Belum ada acara</strong><br>Ketuk tombol <strong>+</strong> untuk menambah.
      </div>`; return;
  }
  els.eventListWrap.innerHTML = dates.map(ds => {
    const ev    = state.events[ds];
    const d     = new Date(ds); d.setUTCHours(12);
    const remCls= ev.reminder&&ev.time ? "on" : "";
    return `
      <div class="ev-card">
        <div class="ev-date-box">
          <div class="ev-day">${d.getDate()}</div>
          <div class="ev-month">${d.toLocaleString("id-ID",{month:"short"})}</div>
        </div>
        <div class="ev-info">
          <div class="ev-title">${ev.title}</div>
          ${ev.time ? `<div class="ev-meta">🕐 ${ev.time}</div>` : ""}
          ${ev.desc ? `<div class="ev-desc">${ev.desc}</div>` : ""}
        </div>
        <div class="ev-actions">
          ${ev.time ? `<button class="ea-btn rem ${remCls}" data-action="remind" data-date="${ds}">${ICONS.remOn}</button>` : ""}
          <button class="ea-btn edit" data-action="edit"   data-date="${ds}">${ICONS.edit}</button>
          <button class="ea-btn del"  data-action="delete" data-date="${ds}">${ICONS.del}</button>
        </div>
      </div>`;
  }).join("");
  els.eventListWrap.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const { action, date } = btn.dataset;
      if (action==="edit")   { closeModal("listModal"); openEditEvent(date); }
      if (action==="delete") { deleteEvent(date); }
      if (action==="remind") { toggleReminder(date); }
    });
  });
}


els.pillHoliday.addEventListener("click", () => {
  state.showHoliday = !state.showHoliday;
  els.pillHoliday.classList.toggle("on-holiday", state.showHoliday);
  renderCalendar(); renderInfoPanel();
});
els.pillEvent.addEventListener("click", () => {
  state.showEvent = !state.showEvent;
  els.pillEvent.classList.toggle("on-event", state.showEvent);
  renderCalendar(); renderInfoPanel();
});
els.pillWeton.addEventListener("click", () => {
  state.showWeton = !state.showWeton;
  els.pillWeton.classList.toggle("on-weton", state.showWeton);
  renderCalendar(); renderInfoPanel();
});
[els.pillHoliday, els.pillEvent, els.pillWeton].forEach(p =>
  p.addEventListener("keydown", e => { if(e.key==="Enter") p.click(); }));


document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-page").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $(`tab-${btn.dataset.tab}`).classList.add("active");
    if (btn.dataset.tab === "weton") renderWetonPage();
  });
});

$("bbAddBtn").addEventListener("click",   () => openAddEvent(state.selectedDate));
$("bbListBtn").addEventListener("click",  () => { renderEventList(); openModal("listModal"); });
$("bbThemeBtn").addEventListener("click", () => openModal("themeModal"));


$("prevMonthBtn").addEventListener("click", () => changeMonth(-1));
$("nextMonthBtn").addEventListener("click", () => changeMonth(1));
$("todayBtn").addEventListener("click", () => {
  state.date = new Date(); state.selectedDate = todayStr(); simpleRender();
});
$("goYearBtn").addEventListener("click", () => {
  const y = parseInt(els.yearInput.value);
  if (y >= 1900 && y <= 2100) { state.date.setFullYear(y); simpleRender(); }
});
els.yearInput.addEventListener("keydown", e => { if(e.key==="Enter") $("goYearBtn").click(); });


document.querySelectorAll(".theme-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    applyTheme(opt.dataset.theme);
    renderCalendar(); renderInfoPanel();
    closeModal("themeModal");
    showToast("🎨 Tema diubah!");
  });
});


let touchX = 0;
document.querySelector(".calendar-wrap").addEventListener("touchstart", e => { touchX = e.changedTouches[0].screenX; }, {passive:true});
document.querySelector(".calendar-wrap").addEventListener("touchend",   e => {
  const dx = e.changedTouches[0].screenX - touchX;
  if (Math.abs(dx) > 50) changeMonth(dx < 0 ? 1 : -1);
}, {passive:true});


async function requestNotifPerm() {
  if (!("Notification" in window)) { showToast("Browser tidak mendukung notifikasi."); return false; }
  if (Notification.permission === "granted") return true;
  if (Notification.permission !== "denied") { return (await Notification.requestPermission()) === "granted"; }
  return false;
}
function checkNotifications() {
  const now = new Date();
  const ds  = now.toISOString().slice(0,10);
  const t   = now.toTimeString().slice(0,5);
  const ev  = state.events[ds];
  if (ev?.reminder && ev.time===t && ev.lastNotified!==t) {
    if (Notification.permission==="granted") new Notification("📅 Pengingat Acara", { body: ev.title, icon:"./favicon.ico" });
    ev.lastNotified = t;
  }
}

// ─── WETON PAGE ───────────────────────────────────────────────────────────────
function renderWetonPage() {
  renderHariIni();
  renderHariBaik();
  renderWatakGrid();
  $("wtYear").textContent = new Date().getFullYear();
}

function renderHariIni() {
  const today = new Date();
  const wi    = getWetonInfo(today);
  const hariB = wi.hariB ? " — <span style='color:var(--green)'>✨ Hari Baik</span>" : "";
  $("wetonHariIni").innerHTML = `
    <div class="weton-hari-ini">
      <div class="weton-hari-ini-icon">${wi.watak.emoji}</div>
      <div>
        <div class="weton-hari-ini-weton">${wi.weton}${hariB}</div>
        <div class="weton-hari-ini-date">${today.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
        <div class="weton-hari-ini-neptu">Neptu ${wi.neptu}</div>
      </div>
    </div>`;
}

function renderHariBaik() {
  const y   = state.date.getFullYear();
  const m   = state.date.getMonth();
  const dim = new Date(y, m+1, 0).getDate();
  const items = [];

  for (let d = 1; d <= dim; d++) {
    const dateObj = new Date(y, m, d);
    const wi      = getWetonInfo(dateObj);
    if (wi.hariB) {
      const ds = mkDateStr(y, m, d);
      items.push({ ds, dateObj, wi });
    }
  }

  if (!items.length) {
    $("hariBaikList").innerHTML = `<div style="color:var(--text-muted);font-size:13px;padding:12px 0;">Tidak ada hari baik khusus bulan ini.</div>`;
    return;
  }

  $("hariBaikList").innerHTML = items.map(({ ds, dateObj, wi }) => {
    const label = dateObj.toLocaleDateString("id-ID",{day:"numeric",month:"short"});
    const isPrime = wi.neptu >= 15;
    return `
      <div class="hari-baik-item${isPrime?" prime":""}" style="cursor:pointer;" data-date="${ds}">
        <div class="hari-baik-date">${label}</div>
        <div class="hari-baik-weton">${wi.weton}</div>
        <div class="hari-baik-neptu">${wi.neptu}</div>
      </div>`;
  }).join("");

  $("hariBaikList").querySelectorAll("[data-date]").forEach(el => {
    el.addEventListener("click", () => {
      const ds = el.dataset.date;
      const [y2,m2,d2] = ds.split("-").map(Number);
      state.date = new Date(y2, m2-1, d2);
      state.selectedDate = ds;
      // Switch to kalender tab
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-page").forEach(p => p.classList.remove("active"));
      document.querySelector('[data-tab="kalender"]').classList.add("active");
      $("tab-kalender").classList.add("active");
      simpleRender();
    });
  });
}

function renderWatakGrid() {
  $("watakGrid").innerHTML = PASARAN_LIST.map(p => {
    const w = WATAK_PASARAN[p];
    return `
      <div class="watak-card">
        <div class="watak-pasaran">${w.emoji} ${p}</div>
        <div class="watak-neptu">Neptu ${NEPTU_PASARAN[p]}</div>
        <div class="watak-text">${w.ringkas}. ${w.detail.substring(0,80)}...</div>
      </div>`;
  }).join("");
}


$("wetonCalcBtn").addEventListener("click", () => {
  const val = $("wetonDateInput").value;
  if (!val) { showToast("Pilih tanggal terlebih dahulu!"); return; }
  const dateObj = new Date(val); dateObj.setUTCHours(12);
  const wi = getWetonInfo(dateObj);
  const w  = wi.watak;
  $("wetonResult").innerHTML = `
    <div class="weton-result-header">
      <div class="weton-big-badge">${w.emoji}</div>
      <div>
        <div class="weton-result-name">${wi.weton}</div>
        <div class="weton-result-sub">${dateObj.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"})}</div>
      </div>
    </div>
    <div class="weton-result-body">
      <div class="weton-stat-row"><span class="weton-stat-label">Hari</span><span class="weton-stat-val">${wi.hari} (neptu ${wi.neptuHari})</span></div>
      <div class="weton-stat-row"><span class="weton-stat-label">Pasaran</span><span class="weton-stat-val">${wi.pasaran} (neptu ${wi.neptuPasaran})</span></div>
      <div class="weton-stat-row"><span class="weton-stat-label">Total Neptu</span><span class="weton-stat-val accent">${wi.neptu}</span></div>
      <div class="weton-stat-row"><span class="weton-stat-label">Hari Baik?</span><span class="weton-stat-val">${wi.hariB ? "✨ Ya, hari baik" : "Tidak"}</span></div>
      <div class="weton-watak-box">
        <div class="weton-watak-title">Watak: ${w.ringkas}</div>
        <div class="weton-watak-text">${w.detail}</div>
      </div>
      <div class="weton-watak-box" style="border-top:1px solid var(--border);">
        <div class="weton-watak-title" style="color:var(--green);">🌟 Hari Baik</div>
        <div class="weton-watak-text">${w.haribaik}</div>
      </div>
      <div class="weton-watak-box" style="border-top:1px solid var(--border);">
        <div class="weton-watak-title" style="color:var(--red);">⚠️ Pantangan</div>
        <div class="weton-watak-text">${w.larangan}</div>
      </div>
    </div>`;
  $("wetonResult").classList.remove("hidden");
});


$("cocokBtn").addEventListener("click", () => {
  const v1 = $("cocok1").value;
  const v2 = $("cocok2").value;
  if (!v1 || !v2) { showToast("Isi kedua tanggal!"); return; }
  const d1 = new Date(v1); d1.setUTCHours(12);
  const d2 = new Date(v2); d2.setUTCHours(12);
  const w1 = getWetonInfo(d1);
  const w2 = getWetonInfo(d2);
  const k  = getKecocokan(w1.neptu, w2.neptu);

  $("cocokResult").innerHTML = `
    <div class="cocok-result-header ${k.cls}">
      <div class="cocok-score-circle ${k.cls}">
        <div class="cocok-score-num">${k.skor}</div>
        <div class="cocok-score-lbl">POIN</div>
      </div>
      <div>
        <div class="cocok-result-label">${k.label}</div>
        <div class="cocok-result-sub">${k.cls==="bagus"?"Kecocokan Baik ✨":k.cls==="sedang"?"Kecocokan Sedang ⚡":"Perlu Perhatian ⚠️"}</div>
      </div>
    </div>
    <div class="weton-result-body">
      <div class="weton-stat-row"><span class="weton-stat-label">${w1.weton}</span><span class="weton-stat-val">Neptu ${w1.neptu}</span></div>
      <div class="weton-stat-row"><span class="weton-stat-label">${w2.weton}</span><span class="weton-stat-val">Neptu ${w2.neptu}</span></div>
      <div class="weton-stat-row"><span class="weton-stat-label">Total Neptu</span><span class="weton-stat-val accent">${w1.neptu + w2.neptu} → sisa ${k.sisaNeptu}</span></div>
      <div class="weton-watak-box">
        <div class="weton-watak-title">Makna</div>
        <div class="weton-watak-text">${k.desc}</div>
      </div>
    </div>`;
  $("cocokResult").classList.remove("hidden");
});


function setFooter() {
  if (els.footer) els.footer.innerHTML = `&copy; ${new Date().getFullYear()} Kalender Indonesia &mdash; Ahmad Ragiel Zaini`;
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