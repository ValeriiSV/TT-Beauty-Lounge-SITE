const SUPABASE_URL = 'https://azfacbrdujwadnsoasnz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AwJd2SUhBwiL3OMaGGhkQw_j2kycR6X';
const TELEGRAM_BOT = 'TTbeautylounge_bot';

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

async function loadApprovedReviews() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=name,rating,message&status=eq.approved&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY }
  });
  if (!response.ok) throw new Error('Nu au putut fi încărcate recenziile.');
  const reviews = await response.json();
  if (!reviews.length) return;
  document.getElementById('reviewsList').innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>„${escapeHtml(review.message)}”</p>
      <div class="who">${escapeHtml(review.name)}</div>
    </div>
  `).join('');
}

loadApprovedReviews().catch(() => {});

const bookingService = document.getElementById('bkService');
const bookingDate = document.getElementById('bkDate');
const bookingTime = document.getElementById('bkTime');
const availabilityMessage = document.getElementById('bkAvailability');
const today = new Date();
bookingDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

async function loadAvailableSlots() {
  const service = bookingService.value;
  const date = bookingDate.value;
  bookingTime.disabled = true;
  bookingTime.innerHTML = '<option value="">Alege mai întâi serviciul și data</option>';
  availabilityMessage.textContent = '';
  if (!service || !date) return;

  availabilityMessage.textContent = 'Verificăm orele disponibile...';
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/available_appointment_slots`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_date: date, p_service: service })
    });
    if (!response.ok) throw new Error('Orele libere nu au putut fi încărcate.');
    const slots = await response.json();
    if (!slots.length) {
      bookingTime.innerHTML = '<option value="">Nu există ore libere în această zi</option>';
      availabilityMessage.textContent = 'Nu există suficient timp liber pentru această procedură. Alege altă zi.';
      return;
    }
    bookingTime.innerHTML = `<option value="">Alege ora</option>${slots.map(slot => `<option value="${escapeHtml(String(slot.slot_time).slice(0, 5))}">${escapeHtml(slot.label)}</option>`).join('')}`;
    bookingTime.disabled = false;
    const duration = bookingService.selectedOptions[0]?.dataset.duration;
    availabilityMessage.textContent = `${slots.length} ore disponibile${duration ? ` · durata procedurii: ${Math.floor(duration / 60) ? `${Math.floor(duration / 60)} h ` : ''}${duration % 60 ? `${duration % 60} min` : ''}` : ''}`;
  } catch (error) {
    bookingTime.innerHTML = '<option value="">Orele nu sunt disponibile momentan</option>';
    availabilityMessage.textContent = error.message;
  }
}

bookingService.addEventListener('change', loadAvailableSlots);
bookingDate.addEventListener('change', loadAvailableSlots);

async function uploadBookingPhoto(file, bookingCode) {
  if (!window.ttClientToken || !window.ttClientUser?.id) throw new Error('Autentifică-te înainte de programare.');
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Alege o fotografie JPG, PNG sau WebP.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Fotografia este prea mare. Dimensiunea maximă este 8 MB.');
  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${window.ttClientUser.id}/${bookingCode}.${extension}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/booking-photos/${path}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${window.ttClientToken}`, 'Content-Type': file.type, 'x-upsert': 'false' },
    body: file
  });
  if (!response.ok) throw new Error('Fotografia nu a putut fi încărcată. Încearcă din nou.');
  return path;
}

// star picker for reviews
  let rating = 0;
  const starBtns = document.querySelectorAll('#starPicker button');
  starBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rating = parseInt(btn.dataset.v, 10);
      document.getElementById('rvRating').value = rating;
      starBtns.forEach(b => b.classList.toggle('active', parseInt(b.dataset.v,10) <= rating));
    });
  });

  document.getElementById('reviewForm').addEventListener('submit', function(e){
    e.preventDefault();
    const msg = document.getElementById('rvMsg');
    if(!rating){
      msg.textContent = 'Te rugăm să alegi o notă (stele) înainte de a trimite.';
      return;
    }
    const form = this;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Se trimite...';
    if (form.querySelector('[name="bot-field"]').value) return;
    fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        name: document.getElementById('rvName').value.trim(),
        rating,
        message: document.getElementById('rvText').value.trim()
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Recenzia nu a putut fi trimisă.');
        msg.textContent = 'Mulțumim! Recenzia a fost trimisă spre aprobare.';
        form.reset();
        rating = 0;
        starBtns.forEach(b => b.classList.remove('active'));
      })
      .catch(() => {
        msg.textContent = 'Nu am putut trimite recenzia. Încearcă din nou.';
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = 'Trimite recenzia';
      });
  });

  document.getElementById('bookingForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('bkName').value.trim();
    const phone = document.getElementById('bkPhone').value.trim();
    const service = document.getElementById('bkService').value;
    const date = document.getElementById('bkDate').value;
    const time = document.getElementById('bkTime').value;
    const hairLength = document.getElementById('bkHairLength').value;
    const hairPhoto = document.getElementById('bkHairPhoto').files[0];
    const note = document.getElementById('bkNote').value.trim();
    const form = this;
    const button = form.querySelector('button[type="submit"]');
    const bookingCode = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    button.disabled = true;
    button.textContent = window.siteLanguage?.() === 'ru' ? 'Загружаем фото...' : 'Se încarcă fotografia...';
    uploadBookingPhoto(hairPhoto, bookingCode).then(hairPhotoPath => {
      button.textContent = window.siteLanguage?.() === 'ru' ? 'Отправляем...' : 'Se trimite...';
      return fetch(`${SUPABASE_URL}/rest/v1/rpc/create_appointment_with_photo`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${window.ttClientToken}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        p_name: name,
        p_phone: phone,
        p_service: service,
        p_date: date,
        p_time: time,
        p_note: note || null,
        p_booking_code: bookingCode,
        p_hair_length: hairLength,
        p_hair_photo_path: hairPhotoPath
      })
      });
    })
      .then(async response => {
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message?.includes('slot_unavailable') ? 'Ora aleasă tocmai a fost ocupată. Selectează altă oră.' : 'Programarea nu a putut fi trimisă.');
        }
        const booking = await response.json();
        const success = document.getElementById('bkSuccess');
        if (booking.notification_channel === 'telegram') {
          const telegramUrl = `https://t.me/${TELEGRAM_BOT}?start=${encodeURIComponent(bookingCode)}`;
          success.innerHTML = window.siteLanguage?.() === 'ru'
            ? `Заявка отправлена. <a href="${telegramUrl}" rel="noopener">Откройте Telegram</a> и нажмите Start, чтобы получать уведомления.`
            : `Cererea a fost trimisă. <a href="${telegramUrl}" rel="noopener">Deschide Telegram</a> și apasă Start pentru a primi notificările.`;
          setTimeout(() => { window.location.href = telegramUrl; }, 900);
        } else {
          success.textContent = window.siteLanguage?.() === 'ru'
            ? 'Заявка отправлена прямо в панель администратора. Подтверждение придёт на ваш email.'
            : 'Cererea a ajuns direct în panoul administratorului. Confirmarea va veni pe email.';
        }
        success.classList.add('show');
        window.ttReloadClientBookings?.();
        form.reset();
        bookingDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        bookingTime.disabled = true;
        bookingTime.innerHTML = '<option value="">Alege mai întâi serviciul și data</option>';
        availabilityMessage.textContent = '';
      })
      .catch(error => {
        const success = document.getElementById('bkSuccess');
        success.textContent = error.message;
        success.classList.add('show');
        loadAvailableSlots();
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = 'Trimite cererea';
      });
  });
