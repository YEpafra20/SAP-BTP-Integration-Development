(() => {
  const config = window.SAP_BTP_FEEDBACK_CONFIG || {};
  const supabaseUrl = (config.supabaseUrl || '').replace(/\/+$/, '');
  const supabaseAnonKey = config.supabaseAnonKey || '';
  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  async function request(path, body) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(`Feedback request failed (${response.status}).`);
    return null;
  }

  async function loadCounts(moduleId) {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_module_feedback_counts`, {
      method: 'POST',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requested_module: moduleId })
    });

    if (!response.ok) throw new Error(`Feedback totals request failed (${response.status}).`);
    const result = await response.json();
    return Array.isArray(result) ? result[0] : result;
  }

  window.initializeModuleFeedback = (container, moduleId) => {
    const section = document.createElement('section');
    const titleId = `module-feedback-title-${moduleId}`;
    section.className = 'module-feedback';
    section.setAttribute('aria-labelledby', titleId);
    section.innerHTML = `
      <div class="module-feedback-heading">
        <h2 id="${titleId}">Was this module useful?</h2>
        <p>Votes are shared. Comments are private to the site owner.</p>
      </div>
      <p class="feedback-counts" aria-live="polite">${isConfigured ? 'Loading feedback totals...' : 'Feedback database setup is required.'}</p>
      <form class="feedback-form">
        <fieldset>
          <legend>Did you find this module useful?</legend>
          <label class="feedback-choice"><input type="radio" name="feedback-vote" value="true" required><span>Yes</span></label>
          <label class="feedback-choice"><input type="radio" name="feedback-vote" value="false" required><span>No</span></label>
        </fieldset>
        <label for="feedback-comment">Comment (optional)</label>
        <textarea id="feedback-comment" name="comment" maxlength="1000" placeholder="Share feedback with the site owner"></textarea>
        <button class="feedback-submit" type="submit" ${isConfigured ? '' : 'disabled'}>Send feedback</button>
        <p class="feedback-status" aria-live="polite">${isConfigured ? '' : 'Connect Supabase to enable submissions.'}</p>
      </form>`;
    container.after(section);

    const countsLabel = section.querySelector('.feedback-counts');
    const form = section.querySelector('.feedback-form');
    const submitButton = section.querySelector('.feedback-submit');
    const status = section.querySelector('.feedback-status');

    async function refreshCounts() {
      const counts = await loadCounts(moduleId);
      const useful = Number(counts?.useful_count || 0);
      const notUseful = Number(counts?.not_useful_count || 0);
      countsLabel.textContent = `${useful} found this useful - ${notUseful} did not`;
    }

    if (isConfigured) {
      refreshCounts().catch(() => {
        countsLabel.textContent = 'Feedback totals are temporarily unavailable.';
      });
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!isConfigured) return;

      const formData = new FormData(form);
      const vote = formData.get('feedback-vote');
      if (vote === null) {
        status.textContent = 'Choose Yes or No before submitting.';
        return;
      }

      submitButton.disabled = true;
      status.textContent = 'Sending feedback...';
      try {
        await request('module_feedback', {
          module_id: moduleId,
          is_useful: vote === 'true',
          comment: String(formData.get('comment') || '').trim() || null
        });
        form.reset();
        status.textContent = 'Thanks. Your feedback was sent.';
        try {
          await refreshCounts();
        } catch {
          countsLabel.textContent = 'Feedback totals are temporarily unavailable.';
        }
      } catch {
        status.textContent = 'Feedback could not be sent. Please try again.';
      } finally {
        submitButton.disabled = false;
      }
    });
  };
})();