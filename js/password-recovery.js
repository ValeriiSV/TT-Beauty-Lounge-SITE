(() => {
  const API = 'https://azfacbrdujwadnsoasnz.supabase.co';
  const KEY = 'sb_publishable_AwJd2SUhBwiL3OMaGGhkQw_j2kycR6X';
  const redirectUrl = 'https://ttbeautylounge.pages.dev/';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.hash.replace(/^#/, ''));
  const recoveryToken = params.get('access_token');
  const isRecovery = params.get('type') === 'recovery' && !!recoveryToken;

  async function sendRecovery(email, message) {
    if (!email) { message.textContent = 'Introdu adresa de email.'; return; }
    message.textContent = 'Se trimite emailul de resetare…';
    const response = await fetch(`${API}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectUrl)}`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { message.textContent = data.msg || data.error_description || 'Emailul de resetare nu a putut fi trimis.'; return; }
    message.textContent = 'Ți-am trimis un email. Deschide linkul nou din mesaj pentru a seta o parolă nouă.';
  }

  function showResetPassword() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#241a15;display:flex;align-items:center;justify-content:center;padding:20px;';
    overlay.innerHTML = `
      <div style="width:min(440px,100%);background:#fff;border-radius:22px;padding:28px;box-shadow:0 20px 70px rgba(0,0,0,.35);font-family:inherit;color:#241a15">
        <h2 style="margin:0 0 8px">Setează parola nouă</h2>
        <p style="margin:0 0 20px;opacity:.72">Introdu o parolă nouă pentru contul TT Beauty Lounge.</p>
        <form id="siteRecoveryForm">
          <label style="display:block;margin-bottom:12px">Parolă nouă<input id="siteNewPassword" type="password" minlength="6" required autocomplete="new-password" style="display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border:1px solid #d8d0cb;border-radius:12px"></label>
          <label style="display:block;margin-bottom:16px">Repetă parola<input id="siteConfirmPassword" type="password" minlength="6" required autocomplete="new-password" style="display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:12px;border:1px solid #d8d0cb;border-radius:12px"></label>
          <button type="submit" style="width:100%;padding:13px;border:0;border-radius:12px;background:#241a15;color:#fff;font-weight:700">Salvează parola</button>
          <p id="siteRecoveryMessage" style="margin:14px 0 0;min-height:20px"></p>
        </form>
      </div>`;
    document.body.appendChild(overlay);
    $('siteRecoveryForm').addEventListener('submit', async event => {
      event.preventDefault();
      const password = $('siteNewPassword').value;
      const confirm = $('siteConfirmPassword').value;
      const message = $('siteRecoveryMessage');
      if (password.length < 6) { message.textContent = 'Parola trebuie să aibă cel puțin 6 caractere.'; return; }
      if (password !== confirm) { message.textContent = 'Parolele nu coincid.'; return; }
      message.textContent = 'Se salvează parola…';
      const response = await fetch(`${API}/auth/v1/user`, {
        method: 'PUT',
        headers: { apikey: KEY, Authorization: `Bearer ${recoveryToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { message.textContent = data.msg || data.error_description || 'Parola nu a putut fi schimbată.'; return; }
      localStorage.removeItem('tt_client_session');
      history.replaceState(null, '', `${location.pathname}${location.search}`);
      message.textContent = 'Parola a fost schimbată. Te poți autentifica folosind parola nouă.';
      setTimeout(() => location.replace(redirectUrl), 1400);
    });
  }

  function injectForgotButton() {
    const form = $('clientAuthForm');
    const email = $('accountEmail');
    const message = $('clientAuthMessage');
    if (!form || !email || !message || $('siteForgotPassword')) return;
    const button = document.createElement('button');
    button.id = 'siteForgotPassword';
    button.type = 'button';
    button.className = 'btn btn-ghost';
    button.textContent = 'Am uitat parola';
    button.style.marginLeft = '8px';
    $('clientAuthSubmit').insertAdjacentElement('afterend', button);
    button.addEventListener('click', () => sendRecovery(email.value.trim().toLowerCase(), message));
    const updateVisibility = () => {
      const loginTab = document.querySelector('[data-auth-mode="login"]');
      button.style.display = loginTab?.classList.contains('active') ? '' : 'none';
    };
    document.querySelector('.auth-tabs')?.addEventListener('click', () => setTimeout(updateVisibility, 0));
    updateVisibility();
  }

  if (isRecovery) showResetPassword();
  else {
    injectForgotButton();
    setTimeout(injectForgotButton, 250);
  }
})();
