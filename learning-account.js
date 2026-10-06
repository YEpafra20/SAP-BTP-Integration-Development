(() => {
  const config = window.SAP_BTP_FEEDBACK_CONFIG || {};
  const supabaseUrl = (config.supabaseUrl || '').replace(/\/+$/, '');
  const supabaseAnonKey = config.supabaseAnonKey || '';
  const authGate = document.getElementById('auth-gate');
  const authTitle = document.getElementById('auth-title');
  const authStatus = document.getElementById('auth-status');
  const accountName = document.getElementById('account-name');
  const accountEmail = document.getElementById('account-email');
  const accountNotice = document.getElementById('account-notice');
  const signOutButton = document.getElementById('sign-out-button');
  const authForms = {
    signIn: document.getElementById('sign-in-form'),
    signUp: document.getElementById('sign-up-form'),
    accessRequest: document.getElementById('access-request-form'),
    reset: document.getElementById('reset-password-form'),
    update: document.getElementById('update-password-form')
  };
  const client = supabaseUrl && supabaseAnonKey && window.supabase
    ? window.supabase.createClient(supabaseUrl, supabaseAnonKey)
    : null;
  const moduleIds = Array.from({ length: 36 }, (_, index) => `day-${index + 1}`);
  const legacyProgressPrefix = 'sap-btp-completed-';
  let currentSession = null;
  let currentUser = null;
  let passwordRecoveryPending = `${window.location.hash}&${window.location.search}`.includes('type=recovery');

  if (passwordRecoveryPending) setAuthMode('update');

  const authModes = {
    signIn: 'Sign in to continue learning',
    signUp: 'Create your learning account',
    accessRequest: 'Request account access',
    reset: 'Reset your password',
    update: 'Choose a new password'
  };

  function setAuthMode(mode) {
    authTitle.textContent = authModes[mode];
    Object.entries(authForms).forEach(([formMode, form]) => {
      form.hidden = formMode !== mode;
    });
    authStatus.textContent = '';
  }

  function setAccountNotice(message) {
    accountNotice.textContent = message;
  }

  function showSignedInState(session) {
    currentSession = session;
    currentUser = session?.user || null;
    const isSignedIn = Boolean(currentUser);
    document.body.classList.toggle('is-authenticated', isSignedIn);
    authGate.hidden = isSignedIn;
    accountName.textContent = currentUser?.user_metadata?.full_name || '';
    accountName.hidden = !accountName.textContent;
    accountEmail.textContent = currentUser?.email || '';
    signOutButton.hidden = !isSignedIn;

    if (isSignedIn) {
      void migrateLegacyProgress(currentUser.id);
    } else {
      setAuthMode('signIn');
    }

    window.dispatchEvent(new CustomEvent('learningauthchange', {
      detail: { user: currentUser }
    }));
  }

  async function migrateLegacyProgress(userId) {
    const migrationKey = 'sap-btp-progress-imported';
    if (localStorage.getItem(migrationKey) === 'true' || !client) return;

    const legacyRecords = moduleIds
      .filter((moduleId) => localStorage.getItem(`${legacyProgressPrefix}${moduleId}`) === 'true')
      .map((moduleId) => ({ user_id: userId, module_id: moduleId }));

    const legacyDayOne = localStorage.getItem(`${legacyProgressPrefix}module-1`) === 'true';
    if (legacyDayOne && !legacyRecords.some((record) => record.module_id === 'day-1')) {
      legacyRecords.push({ user_id: userId, module_id: 'day-1' });
    }

    if (legacyRecords.length) {
      const { error } = await client
        .from('user_module_progress')
        .upsert(legacyRecords, { onConflict: 'user_id,module_id', ignoreDuplicates: true });
      if (error) {
        setAccountNotice('Existing browser progress could not be imported. Check the account database setup.');
        return;
      }
    }

    moduleIds.forEach((moduleId) => localStorage.removeItem(`${legacyProgressPrefix}${moduleId}`));
    localStorage.removeItem(`${legacyProgressPrefix}module-1`);
    localStorage.setItem(migrationKey, 'true');
  }

  function setBusy(form, busy) {
    form.querySelectorAll('button[type="submit"]').forEach((button) => {
      button.disabled = busy;
    });
  }

  async function handleSubmit(form, action) {
    authStatus.textContent = '';
    setBusy(form, true);
    try {
      await action(new FormData(form));
    } catch (error) {
      authStatus.textContent = error.message || 'The request could not be completed.';
    } finally {
      setBusy(form, false);
    }
  }

  authForms.signIn.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(authForms.signIn, async (formData) => {
      const { error } = await client.auth.signInWithPassword({
        email: String(formData.get('email')).trim(),
        password: String(formData.get('password'))
      });
      if (error) throw error;
    });
  });

  authForms.signUp.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(authForms.signUp, async (formData) => {
      const { data, error } = await client.auth.signUp({
        email: String(formData.get('email')).trim(),
        password: String(formData.get('password')),
        options: {
          data: { full_name: String(formData.get('full_name')).trim() },
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`
        }
      });
      if (error) throw error;
      if (!data.session) {
        authStatus.textContent = 'Check your email to confirm your account, then sign in.';
        authForms.signUp.reset();
      }
    });
  });

  authForms.accessRequest.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(authForms.accessRequest, async (formData) => {
      const { error } = await client.from('account_access_requests').insert({
        full_name: String(formData.get('full_name')).trim(),
        email: String(formData.get('email')).trim().toLowerCase(),
        message: String(formData.get('message')).trim()
      });
      if (error) {
        const errorMessage = error.message || '';
        if (error.code === 'PGRST205' || (errorMessage.includes('account_access_requests') && errorMessage.includes('schema cache'))) {
          authStatus.textContent = 'Access requests are not set up yet. Ask the administrator to run supabase-accounts.sql in the Supabase SQL Editor, then reload and try again.';
          return;
        }
        if (error.code === '23505') {
          authStatus.textContent = 'A request for this email is already on file. Please wait for the administrator to review it.';
          return;
        }
        throw error;
      }
      authStatus.textContent = 'Request received. An administrator will review it and add your account manually.';
      authForms.accessRequest.reset();
    });
  });

  authForms.reset.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(authForms.reset, async (formData) => {
      const { error } = await client.auth.resetPasswordForEmail(String(formData.get('email')).trim(), {
        redirectTo: `${window.location.origin}${window.location.pathname}`
      });
      if (error) throw error;
      authStatus.textContent = 'If that email has an account, a password reset link is on its way.';
      authForms.reset.reset();
    });
  });

  authForms.update.addEventListener('submit', (event) => {
    event.preventDefault();
    handleSubmit(authForms.update, async (formData) => {
      const { error } = await client.auth.updateUser({ password: String(formData.get('password')) });
      if (error) throw error;
      authStatus.textContent = 'Password updated. Signing you in...';
    });
  });

  document.getElementById('show-signup').addEventListener('click', () => setAuthMode('signUp'));
  document.getElementById('show-access-request').addEventListener('click', () => setAuthMode('accessRequest'));
  document.getElementById('show-signin').addEventListener('click', () => setAuthMode('signIn'));
  document.getElementById('cancel-access-request').addEventListener('click', () => setAuthMode('signIn'));
  document.getElementById('show-reset').addEventListener('click', () => setAuthMode('reset'));
  document.getElementById('cancel-reset').addEventListener('click', () => setAuthMode('signIn'));
  document.getElementById('cancel-update').addEventListener('click', () => setAuthMode('signIn'));

  signOutButton.addEventListener('click', async () => {
    signOutButton.disabled = true;
    const { error } = await client.auth.signOut();
    if (error) setAccountNotice('Sign out failed. Please try again.');
    signOutButton.disabled = false;
  });

  async function getCompletion(moduleId) {
    const { data, error } = await client
      .from('user_module_progress')
      .select('completed_at')
      .eq('user_id', currentUser.id)
      .eq('module_id', moduleId)
      .maybeSingle();
    if (error) throw error;
    return Boolean(data);
  }

  async function setCompletion(moduleId, isComplete) {
    if (isComplete) {
      const { error } = await client.from('user_module_progress').upsert({
        user_id: currentUser.id,
        module_id: moduleId,
        full_name: currentUser.user_metadata?.full_name || null,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,module_id' });
      if (error) throw error;
      return;
    }

    const { error } = await client
      .from('user_module_progress')
      .delete()
      .eq('user_id', currentUser.id)
      .eq('module_id', moduleId);
    if (error) throw error;
  }

  async function recordVisit(moduleId) {
    if (!currentUser || !moduleIds.includes(moduleId)) return;
    const visitKey = `sap-btp-visited-${currentUser.id}-${moduleId}`;
    if (sessionStorage.getItem(visitKey)) return;

    const { error } = await client.from('user_learning_activity').insert({
      user_id: currentUser.id,
      module_id: moduleId,
      full_name: currentUser.user_metadata?.full_name || null
    });
    if (error) throw error;
    sessionStorage.setItem(visitKey, 'true');
  }

  async function loadLearningOverview() {
    const [progressResult, activityResult] = await Promise.all([
      client.from('user_module_progress')
        .select('module_id,completed_at')
        .eq('user_id', currentUser.id)
        .order('completed_at', { ascending: false }),
      client.from('user_learning_activity')
        .select('module_id,visited_at')
        .eq('user_id', currentUser.id)
        .order('visited_at', { ascending: false })
        .limit(20)
    ]);

    if (progressResult.error) throw progressResult.error;
    if (activityResult.error) throw activityResult.error;
    return { progress: progressResult.data || [], activity: activityResult.data || [] };
  }

  window.learningAccount = {
    get user() { return currentUser; },
    getAccessToken() { return currentSession?.access_token || null; },
    getCompletion,
    setCompletion,
    recordVisit,
    loadLearningOverview,
    setAccountNotice
  };

  if (!client) {
    authStatus.textContent = 'Account service is not configured. Check feedback-config.js and load Supabase JS.';
    authGate.querySelectorAll('button[type="submit"]').forEach((button) => { button.disabled = true; });
    return;
  }

  client.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      passwordRecoveryPending = true;
      currentSession = session;
      currentUser = session?.user || null;
      setAuthMode('update');
      authGate.hidden = false;
      document.body.classList.remove('is-authenticated');
      return;
    }
    if (event === 'USER_UPDATED') passwordRecoveryPending = false;
    if (passwordRecoveryPending) return;
    showSignedInState(session);
  });

  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      authStatus.textContent = 'Could not check your sign-in session. Reload the page to retry.';
      return;
    }
    if (passwordRecoveryPending) {
      currentSession = data.session;
      currentUser = data.session?.user || null;
      setAuthMode('update');
      return;
    }
    showSignedInState(data.session);
  });
})();