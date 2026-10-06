(() => {
  const trainingData = [
    { day: "Day 1", date: "2026-09-28", category: "SAP & BTP Fundamentals", topics: ["SAP Overview"] },
    { day: "Day 2", date: "2026-09-29", category: "SAP & BTP Fundamentals", topics: ["SAP Discovery Center", "SAP Business Accelerator Hub"] },
    { day: "Day 3", date: "2026-09-30", category: "SAP & BTP Fundamentals", topics: ["SAP Learning Hub", "SAP Help Portal", "SAP Community"] },
    { day: "Day 4", date: "2026-10-01", category: "Connectivity & Connectors", topics: ["Message protocols: SOAP, REST, IDOC, RFC, AMQP"] },
    { day: "Day 5", date: "2026-10-05", category: "SAP BTP Fundamentals", topics: ["Introduction to SAP BTP", "Cloud Foundry", "Create an SAP BTP trial account"] },
    { day: "Day 6", date: "2026-10-06", category: "Other", topics: ["Agentic AI"] },
    { day: "Day 7", date: "2026-10-07", category: "SAP Integration Suite", topics: ["Introduction to SAP Integration Suite", "Subscription and Activation"] },
    { day: "Day 8", date: "2026-10-08", category: "SAP Integration Suite", topics: ["Overview of SAP Cloud Integration", "XSLT Demo"] },
    { day: "Day 9", date: "2026-10-09", category: "Connectivity & Connectors", topics: ["Tools and Basic Concepts", "Cloud Connector", "CSV to XML Demo"] },
    { day: "Day 10", date: "2026-10-12", category: "Other", topics: ["Pre-packaged Content", "Calculator Demo", "Use of Postman"] },
    { day: "Day 11", date: "2026-10-13", category: "Revision & Assessment", topics: ["Integration Process Steps", "Hands-on / Assessment"] },
    { day: "Day 12", date: "2026-10-14", category: "SAP Integration Suite", topics: ["Integration Process Steps", "Parallel and Sequential Multicast Demo", "PGP and Mail Adapter Demo"] },
    { day: "Day 13", date: "2026-10-15", category: "Connectivity & Connectors", topics: ["SOAP Connectivity", "OData Connectivity", "On-Premise and Cloud Connectivity"] },
    { day: "Day 14", date: "2026-10-16", category: "Connectivity & Connectors", topics: ["SFTP Connectivity", "FTP Connectivity"] },
    { day: "Day 15", date: "2026-10-22", category: "Connectivity & Connectors", topics: ["RFC Connectivity", "IDOC Connectivity"] },
    { day: "Day 16", date: "2026-10-23", category: "Revision & Assessment", topics: ["Revision", "Hands-on / Assessment"] },
    { day: "Day 17", date: "2026-10-26", category: "Assessment", topics: ["MCQ 1", "SuccessFactors Connectivity"] },
    { day: "Day 18", date: "2026-10-27", category: "Connectivity & Connectors", topics: ["AMQP Connectivity"] },
    { day: "Day 19", date: "2026-10-28", category: "Connectivity & Connectors", topics: ["SAP Open Connectors", "Twitter Connector", "JMS", "Process Direct"] },
    { day: "Day 20", date: "2026-10-29", category: "Connectivity & Connectors", topics: ["Security Material Overview", "Keystore", "Connectivity Test", "Monitoring", "Transport Options"] },
    { day: "Day 21", date: "2026-10-30", category: "Revision & Assessment", topics: ["Revision", "Hands-on / Assessment"] },
    { day: "Day 22", date: "2026-11-02", category: "SAP API Management", topics: ["SAP API Management Introduction", "API Management Features", "Developing Different Types of APIs"] },
    { day: "Day 23", date: "2026-11-03", category: "SAP API Management", topics: ["Developing Different Types of APIs"] },
    { day: "Day 24", date: "2026-11-04", category: "SAP API Management", topics: ["Products and Applications", "Policies in API Management"] },
    { day: "Day 25", date: "2026-11-05", category: "SAP API Management", topics: ["Policies in API Management"] },
    { day: "Day 26", date: "2026-11-06", category: "Revision & Assessment", topics: ["Revision", "Hands-on / Assessment"] },
    { day: "Day 27", date: "2026-11-09", category: "Connectivity & Connectors", topics: ["Introduction to SAP Open Connectors", "Connector and Instance Creation", "Common Resources", "Formula"] },
    { day: "Day 28", date: "2026-11-11", category: "SAP API Management", topics: ["SAP Process Integration / Orchestration", "Best Practices for SAP Cloud Integration", "Best Practices for API Management"] },
    { day: "Day 29", date: "2026-11-12", category: "Integration & Migration", topics: ["Overview of SAP Migration", "SAP PO to SAP Integration Suite Migration", "Accenture Cloud Integration Catalyst Tool", "Tool Benefits and Demo"] },
    { day: "Day 30", date: "2026-11-13", category: "Assessment", topics: ["MCQ 2"] },
    { day: "Day 31", date: "2026-11-16", category: "Revision & Assessment", topics: ["Revision", "Hands-on / Assessment"] },
    { day: "Day 32", date: "2026-11-17", category: "Capstone Project", topics: ["Capstone Project"] },
    { day: "Day 33", date: "2026-11-18", category: "Capstone Project", topics: ["Capstone Project"] },
    { day: "Day 34", date: "2026-11-19", category: "Capstone Project", topics: ["Capstone Project"] },
    { day: "Day 35", date: "2026-11-20", category: "Capstone Project", topics: ["Capstone Project"] },
    { day: "Day 36", date: "2026-11-23", category: "Capstone Project", topics: ["Capstone Project"] }
  ];

  window.SAP_BTP_STREAM_DATA = trainingData;
  window.SAP_BTP_DAY_MODULES = Object.fromEntries(trainingData.map((entry, index) => {
    const moduleId = `day-${index + 1}`;
    return [moduleId, {
      moduleId,
      title: `${entry.day} · ${entry.category}`,
      summary: entry.topics.join(' • '),
      topics: entry.topics,
      date: entry.date,
      category: entry.category,
      day: entry.day
    }];
  }));

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function formatDate(dateString) {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  const indiaDateTimeFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  function getIndiaDateTime(date = new Date()) {
    const parts = Object.fromEntries(indiaDateTimeFormatter.formatToParts(date)
      .filter(({ type }) => ["year", "month", "day", "hour", "minute"].includes(type))
      .map(({ type, value }) => [type, value]));

    return {
      date: `${parts.year}-${parts.month}-${parts.day}`,
      minuteOfDay: Number(parts.hour) * 60 + Number(parts.minute)
    };
  }

  function isMeetingWindowOpen(date = new Date()) {
    const { minuteOfDay } = getIndiaDateTime(date);
    return minuteOfDay >= 7 * 60 + 30 && minuteOfDay < 17 * 60 + 30;
  }

  function getCurrentDayIndex(date = new Date()) {
    const today = getIndiaDateTime(date).date;
    const currentIndex = trainingData.findIndex((item) => item.date >= today);
    return currentIndex >= 0 ? currentIndex : trainingData.length - 1;
  }

  let selectedDay = getCurrentDayIndex();
  let meetingWindowTimer = null;

  function renderStreamMap(container) {
    if (meetingWindowTimer) window.clearInterval(meetingWindowTimer);
    container.classList.add("stream-map-view");
    container.innerHTML = `
      <section class="map-heading" aria-labelledby="map-title">
        <p class="map-kicker">SAP BTP Integration Development</p>
        <h1 id="map-title">Stream Map</h1>
        <p class="map-intro" id="map-intro"></p>
      </section>
      <section class="assessment-panel" aria-labelledby="assessment-title">
        <div class="assessment-panel-heading">
          <p class="map-kicker">Important dates</p>
          <h2 id="assessment-title">Assessments and capstone</h2>
        </div>
        ${document.getElementById("assessment-schedule-template").innerHTML}
      </section>
      <section class="map-stats" aria-label="Training summary">
        <div><strong id="map-total-days"></strong><span>Training days (capstone included)</span></div>
        <div><strong id="map-area-count"></strong><span>Major areas</span></div>
        <div><strong id="map-assessment-days"></strong><span>MCQ assessments</span></div>
        <div><strong id="map-capstone-days"></strong><span>Capstone days</span></div>
      </section>
      <section class="map-progress" aria-label="Selected day progress">
        <div class="map-progress-heading"><h2>Training progress</h2><span id="map-progress-text"></span></div>
        <div class="map-progress-track" role="progressbar" aria-label="Selected training day" aria-valuemin="0" aria-valuemax="36" aria-valuenow="1"><span id="map-progress-fill"></span></div>
      </section>
      <section class="map-toolbar" aria-label="Find a training day">
        <label class="map-search-label" for="map-search">Search topics</label>
        <input id="map-search" type="search" placeholder="Search topics, tools, or dates">
        <label class="map-category-label" for="map-category">Category</label>
        <select id="map-category"><option value="all">All categories</option></select>
      </section>
      <p class="map-results" id="map-results" aria-live="polite"></p>
      <section class="map-grid" id="map-grid" aria-label="Training days"></section>
      <section class="map-selected" id="map-selected" aria-live="polite"></section>`;

    const categories = [...new Set(trainingData.map((item) => item.category))];
    const majorAreaCount = categories.filter((name) => name !== "Other").length;
    const assessmentCount = trainingData.filter((item) => item.category === "Assessment").length;
    const practiceAssessmentCount = trainingData.filter((item) => item.category === "Revision & Assessment").length;
    const capstoneCount = trainingData.filter((item) => item.category === "Capstone Project").length;
    const grid = container.querySelector("#map-grid");
    const search = container.querySelector("#map-search");
    const category = container.querySelector("#map-category");
    const results = container.querySelector("#map-results");
    const progressText = container.querySelector("#map-progress-text");
    const progressFill = container.querySelector("#map-progress-fill");
    const progressTrack = container.querySelector(".map-progress-track");
    const selected = container.querySelector("#map-selected");

    container.querySelector("#map-total-days").textContent = trainingData.length;
    container.querySelector("#map-area-count").textContent = majorAreaCount;
    container.querySelector("#map-assessment-days").textContent = assessmentCount;
    container.querySelector("#map-capstone-days").textContent = capstoneCount;
    container.querySelector("#map-intro").textContent = `${trainingData.length} scheduled days across ${majorAreaCount} major areas. Includes ${assessmentCount} MCQ assessments and ${practiceAssessmentCount} hands-on/revision assessment sessions. The ${capstoneCount} capstone days are already included in the training-day total.`;
    category.innerHTML += categories.map((name) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join("");

    function renderSelectedDay() {
      const item = trainingData[selectedDay];
      const progress = selectedDay + 1;
      progressText.textContent = `${item.day} of ${trainingData.length}`;
      progressFill.style.width = `${(progress / trainingData.length) * 100}%`;
      progressTrack.setAttribute("aria-valuemax", String(trainingData.length));
      progressTrack.setAttribute("aria-valuenow", String(progress));
      selected.innerHTML = `
        <div class="map-selected-heading">
          <div><p class="map-kicker">Selected training day</p><h2>${escapeHTML(item.day)} <span>·</span> ${escapeHTML(item.category)}</h2></div>
          <time datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
        </div>
        <ol>${item.topics.map((topic) => `<li>${escapeHTML(topic)}</li>`).join("")}</ol>`;
    }

    function renderCards() {
      const query = search.value.trim().toLocaleLowerCase();
      const chosenCategory = category.value;
      const currentDayIndex = getCurrentDayIndex();
      const meetingWindowOpen = isMeetingWindowOpen();
      const visibleDays = trainingData.map((item, index) => ({ item, index })).filter(({ item }) => {
        const text = `${item.day} ${item.date} ${item.category} ${item.topics.join(" ")}`.toLocaleLowerCase();
        return (chosenCategory === "all" || item.category === chosenCategory) && (!query || text.includes(query));
      });

      results.textContent = `${visibleDays.length} of ${trainingData.length} training days`;
      grid.innerHTML = visibleDays.length ? visibleDays.map(({ item, index }) => {
        const isCompleted = index < currentDayIndex;
        const route = `#day-${index + 1}`;
        return `
          <article class="map-day-card${index === selectedDay ? " is-selected" : ""}${isCompleted ? " is-complete" : ""}" data-day-index="${index}" aria-label="${escapeHTML(item.day)} training day">
            <div class="map-card-top">
              <div>
                <strong>${escapeHTML(item.day)}</strong>
                <time datetime="${escapeHTML(item.date)}">${escapeHTML(formatDate(item.date))}</time>
              </div>
              <span class="map-badge">${isCompleted ? "Completed" : escapeHTML(item.category)}</span>
            </div>
            <div class="map-card-topics">${item.topics.map((topic) => `<span>${escapeHTML(topic)}</span>`).join("")}</div>
            <div class="map-card-actions">
              <a href="${route}" class="map-view-button" data-route="${route}">View</a>
              ${index === currentDayIndex && meetingWindowOpen ? `<a href="https://teams.microsoft.com/meet/223687928940681?p=aAZIFaYB5va169p4l6" class="map-meeting-button" target="_blank" rel="noopener noreferrer" aria-label="Join ${escapeHTML(item.day)} meeting in Microsoft Teams" title="Join ${escapeHTML(item.day)} meeting in Microsoft Teams">Join meeting</a>` : ""}
            </div>
          </article>`;
      }).join("") : '<p class="map-empty">No training days match your search.</p>';
    }

    grid.addEventListener("click", (event) => {
      if (event.target.closest(".map-meeting-button")) return;

      const viewButton = event.target.closest(".map-view-button");
      if (viewButton) {
        event.preventDefault();
        event.stopPropagation();
        window.location.hash = viewButton.dataset.route || "#stream-guide";
        return;
      }

      const card = event.target.closest("[data-day-index]");
      if (!card) return;
      selectedDay = Number(card.dataset.dayIndex);
      renderSelectedDay();
      renderCards();
    });
    search.addEventListener("input", renderCards);
    category.addEventListener("change", renderCards);
    renderSelectedDay();
    renderCards();
    meetingWindowTimer = window.setInterval(() => {
      if (window.location.hash !== "#stream-map") {
        window.clearInterval(meetingWindowTimer);
        meetingWindowTimer = null;
        return;
      }
      renderCards();
    }, 30_000);
  }

  window.renderStreamMap = renderStreamMap;
})();
