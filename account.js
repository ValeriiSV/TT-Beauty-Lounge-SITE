(() => {
  const API = 'https://azfacbrdujwadnsoasnz.supabase.co';
  const KEY = 'sb_publishable_AwJd2SUhBwiL3OMaGGhkQw_j2kycR6X';
  const SESSION_KEY = 'tt_client_session';
  let mode = 'register';
  const $ = id => document.getElementById(id);
  const headers = token => ({ apikey: KEY, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });
  const escapeHtml = value => { const element = document.createElement('div'); element.textContent = value ?? ''; return element.innerHTML; };

  function saveSession(data) {
    const session = { access_token: data.access_token, refresh_token: data.refresh_token, user: data.user };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.ttClientToken = session.access_token;
    window.ttClientUser = session.user;
    return session;
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.ttClientToken = null;
    window.ttClientUser = null;
  }
  function storedSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } }
  async function refreshSession(session) {
    if (!session?.refresh_token) return null;
    const response = await fetch(`${API}/auth/v1/token?grant_type=refresh_token`, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
    if (!response.ok) return null;
    return saveSession(await response.json());
  }
  async function loadMyBookings() {
    const container = $('clientBookings');
    container.innerHTML = '<p>Se încarcă...</p>';
    const response = await fetch(`${API}/rest/v1/appointments?select=id,service,preferred_date,preferred_time,status,quoted_price&client_user_id=eq.${window.ttClientUser.id}&order=created_at.desc`, { headers: headers(window.ttClientToken) });
    if (!response.ok) { container.innerHTML = '<p>Programările nu au putut fi încărcate.</p>'; return; }
    const rows = await response.json();
    container.innerHTML = rows.length ? rows.map(row => `<article class="client-booking"><strong>${escapeHtml(row.service)}</strong><br>${escapeHtml(row.preferred_date)} · ${escapeHtml(String(row.preferred_time).slice(0, 5))}<br>Statut: ${row.status === 'approved' ? 'Confirmată' : row.status === 'rejected' ? 'Refuzată' : 'În așteptare'}${row.quoted_price ? `<br>Preț estimat: ${escapeHtml(Number(row.quoted_price).toFixed(0))} MDL` : ''}</article>`).join('') : '<p>Nu ai încă programări.</p>';
  }
  async function showLoggedIn(session) {
    window.ttClientToken = session.access_token;
    window.ttClientUser = session.user;
    $('clientAuthLoggedOut').classList.add('hidden');
    $('clientAuthLoggedIn').classList.remove('hidden');
    $('bookingForm').classList.remove('hidden');
    const metadata = session.user.user_metadata || {};
    $('clientAccountName').textContent = metadata.name || 'Contul meu';
    $('clientAccountEmail').textContent = session.user.email || '';
    $('bkName').value = metadata.name || '';
    $('bkPhone').value = metadata.phone || '';
    document.querySelector(`[name="siteNotificationChannel"][value="${metadata.notification_channel === 'telegram' ? 'telegram' : 'email'}"]`).checked = true;
    await loadMyBookings();
  }
  function showLoggedOut() {
    $('clientAuthLoggedOut').classList.remove('hidden');
    $('clientAuthLoggedIn').classList.add('hidden');
    $('bookingForm').classList.add('hidden');
  }
  function setMode(next) {
    mode = next;
    document.querySelectorAll('[data-auth-mode]').forEach(button => button.classList.toggle('active', button.dataset.authMode === mode));
    $('registerIdentityFields').classList.toggle('hidden', mode === 'login');
    $('accountName').required = mode === 'register';
    $('accountPhone').required = mode === 'register';
    $('clientAuthSubmit').textContent = mode === 'register' ? 'Creează cont' : 'Intră în cont';
    $('accountPassword').autocomplete = mode === 'register' ? 'new-password' : 'current-password';
    $('clientAuthMessage').textContent = '';
  }

  document.querySelector('.auth-tabs').addEventListener('click', event => { const button = event.target.closest('[data-auth-mode]'); if (button) setMode(button.dataset.authMode); });
  $('clientAuthForm').addEventListener('submit', async event => {
    event.preventDefault();
    const email = $('accountEmail').value.trim().toLowerCase();
    const password = $('accountPassword').value;
    const message = $('clientAuthMessage');
    const endpoint = mode === 'register' ? 'signup' : 'token?grant_type=password';
    const payload = mode === 'register' ? { email, password, data: { name: $('accountName').value.trim(), phone: $('accountPhone').value.trim(), notification_channel: 'email' } } : { email, password };
    message.textContent = mode === 'register' ? 'Se creează contul...' : 'Se verifică datele...';
    const response = await fetch(`${API}/auth/v1/${endpoint}`, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) { message.textContent = data.error_description || data.msg || 'Operațiunea nu a reușit.'; return; }
    if (!data.access_token) { message.textContent = 'Contul a fost creat. Verifică emailul, apoi intră în cont.'; setMode('login'); return; }
    await showLoggedIn(saveSession(data));
  });
  $('clientLogoutBtn').addEventListener('click', () => { clearSession(); showLoggedOut(); });
  $('siteNotificationForm').addEventListener('submit', async event => {
    event.preventDefault();
    const message = $('siteNotificationMessage');
    const notificationChannel = document.querySelector('[name="siteNotificationChannel"]:checked').value;
    message.textContent = 'Se salvează...';
    const response = await fetch(`${API}/auth/v1/user`, {
      method: 'PUT',
      headers: headers(window.ttClientToken),
      body: JSON.stringify({ data: { ...(window.ttClientUser?.user_metadata || {}), notification_channel: notificationChannel } })
    });
    const user = await response.json();
    if (!response.ok) { message.textContent = 'Preferința nu a putut fi salvată.'; return; }
    window.ttClientUser = user;
    const session = storedSession();
    if (session) {
      session.user = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    message.textContent = notificationChannel === 'telegram'
      ? 'Telegram selectat. După programare vei fi trimisă la bot pentru conectare.'
      : 'Notificările vor veni pe email.';
  });
  window.ttReloadClientBookings = loadMyBookings;

  (async () => {
    const session = storedSession();
    if (!session) { showLoggedOut(); return; }
    const refreshed = await refreshSession(session);
    if (refreshed) await showLoggedIn(refreshed); else { clearSession(); showLoggedOut(); }
  })();
})();
