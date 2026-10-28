(function(){
  const ICONS={
    accountName:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></svg>',
    accountPhone:'<svg viewBox="0 0 24 24"><path d="M7 3h3l1.2 4-2 1.4c1.2 2.8 3.3 4.9 6.1 6.1l1.4-2L21 14v3c0 2-1.5 4-4 4C9 21 3 15 3 7c0-2.5 2-4 4-4Z"/></svg>',
    accountEmail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    accountPassword:'<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
  };

  function sceneMarkup(){
    return '<div class="tt-auth-character">'+
      '<img class="tt-concierge-photo" src="images/tt-concierge-hq.jpg?v=1" alt="TT Beauty Concierge">'+
      
      '<div class="tt-scene-brand"><span>TT Beauty Concierge</span></div>'+
      
      '<div class="tt-privacy-veil" aria-hidden="true"></div>'+
      '<div class="tt-scene-caption"><div><strong>Frumusețe cu grijă.</strong><small>Experiență personalizată · Chișinău</small></div><span class="tt-scene-status">online</span></div>'+
    '</div>';
  }

  function progressMarkup(){
    return '<div class="tt-auth-progress" aria-label="Progres">'+
      '<div class="tt-progress-step is-active" data-tt-progress="1"><b>1</b><span data-ro="Cont" data-ru="Аккаунт">Cont</span></div>'+
      '<div class="tt-progress-step" data-tt-progress="2"><b>2</b><span data-ro="Date" data-ru="Данные">Date</span></div>'+
      '<div class="tt-progress-step" data-tt-progress="3"><b>3</b><span data-ro="Gata" data-ru="Готово">Gata</span></div>'+
    '</div>';
  }

  function currentLang(){
    var active=document.querySelector('[data-site-lang].active');
    return active&&active.dataset.siteLang==='ru'?'ru':'ro';
  }

  function syncLang(root){
    var lang=currentLang();
    root.querySelectorAll('[data-ro][data-ru]').forEach(function(el){
      el.textContent=el.getAttribute('data-'+lang);
    });
  }

  function setProgress(root,n){
    root.querySelectorAll('[data-tt-progress]').forEach(function(el){
      var k=Number(el.dataset.ttProgress);
      el.classList.toggle('is-active',k===n);
      el.classList.toggle('is-done',k<n);
    });
  }

  function setStep(n){
    document.querySelectorAll('#programare .steps .step').forEach(function(step,i){
      step.classList.toggle('tt-step-active',i===n-1);
    });
  }

  function addIcons(panel){
    panel.querySelectorAll('.field').forEach(function(field){
      if(field.querySelector('.tt-field-icon'))return;
      var input=field.querySelector('input,select,textarea');
      if(!input)return;
      var icon=document.createElement('span');
      icon.className='tt-field-icon';
      icon.innerHTML=ICONS[input.id]||ICONS.accountName;
      field.insertBefore(icon,field.firstChild);
      if(input.tagName==='INPUT') input.setAttribute('placeholder',' ');
      function valueState(){field.classList.toggle('tt-has-value',!!input.value)}
      input.addEventListener('input',valueState);
      input.addEventListener('change',valueState);
      valueState();
    });
  }

  function addHelper(panel){
    if(panel.querySelector('.tt-auth-helper'))return;
    var form=panel.querySelector('#clientAuthForm');
    if(!form)return;
    var helper=document.createElement('div');
    helper.className='tt-auth-helper';
    helper.innerHTML='<span data-ro="Ai deja cont?" data-ru="Уже есть аккаунт?">Ai deja cont?</span> <button type="button" data-tt-quick-login data-ro="Intră rapid" data-ru="Войти">Intră rapid</button>';
    form.appendChild(helper);
    helper.querySelector('button').addEventListener('click',function(){
      var login=panel.querySelector('[data-auth-mode="login"]');
      if(login)login.click();
    });
  }

  function addSuccess(panel){
    if(panel.querySelector('.tt-auth-success-card'))return;
    var card=document.createElement('div');
    card.className='tt-auth-success-card';
    card.innerHTML='<div class="tt-success-mark">✓</div><h3 data-ro="Bun venit la TT Beauty Lounge" data-ru="Добро пожаловать в TT Beauty Lounge">Bun venit la TT Beauty Lounge</h3><p data-ro="Contul este pregătit. Acum poți continua cu programarea." data-ru="Аккаунт готов. Теперь можно перейти к записи.">Contul este pregătit. Acum poți continua cu programarea.</p>';
    panel.appendChild(card);
  }

  function burst(root){
    for(var i=0;i<22;i++){
      var p=document.createElement('span');
      p.className='tt-auth-confetti';
      p.style.left=(62+Math.random()*30)+'%';
      p.style.top=(22+Math.random()*36)+'%';
      p.style.setProperty('--cx',((Math.random()-.5)*260)+'px');
      p.style.setProperty('--cy',(-70+Math.random()*220)+'px');
      if(i%3===1)p.style.background='#a85e63';
      root.appendChild(p);
      setTimeout(function(el){el.remove()},1500,p);
    }
  }

  function enhance(target,host){
    if(!target||target.dataset.ttCinematic==='4')return;
    target.dataset.ttCinematic='4';
    var root=host||target;
    root.classList.add('tt-auth-cinematic');

    var panel=document.createElement('div');
    panel.className='tt-auth-panel';
    while(target.firstChild)panel.appendChild(target.firstChild);
    addIcons(panel);
    addHelper(panel);
    addSuccess(panel);

    var scene=document.createElement('div');
    scene.className='tt-auth-scene';
    scene.innerHTML=sceneMarkup();

    var layout=document.createElement('div');
    layout.className='tt-auth-layout';
    layout.innerHTML=progressMarkup();
    layout.appendChild(scene);
    layout.appendChild(panel);
    target.appendChild(layout);

    syncLang(root);
    var character=scene.querySelector('.tt-auth-character');
    var sceneEl=scene;
    var finePointer=window.matchMedia&&window.matchMedia('(pointer:fine)').matches;
    var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(finePointer&&!reduceMotion){
      sceneEl.addEventListener('pointermove',function(e){
        var r=sceneEl.getBoundingClientRect();
        var x=(e.clientX-r.left)/r.width-.5;
        var y=(e.clientY-r.top)/r.height-.5;
        sceneEl.style.setProperty('--tt-px',(x*10).toFixed(2)+'px');
        sceneEl.style.setProperty('--tt-py',(y*8).toFixed(2)+'px');
      });
      sceneEl.addEventListener('pointerleave',function(){
        sceneEl.style.setProperty('--tt-px','0px');
        sceneEl.style.setProperty('--tt-py','0px');
      });
    }
    var password=panel.querySelector('#accountPassword,input[type="password"]');
    var inputs=[].slice.call(panel.querySelectorAll('input,select,textarea'));

    inputs.forEach(function(input){
      input.addEventListener('focus',function(){
        character.classList.toggle('is-password',input===password); character.classList.add('is-engaged');
        setProgress(root,1);
        setStep(input===password?2:1);
      });
      input.addEventListener('blur',function(){
        if(input===password)character.classList.remove('is-password'); character.classList.remove('is-engaged');
      });
    });

    panel.addEventListener('click',function(e){
      var tab=e.target.closest('[data-auth-mode]');
      if(!tab)return;
      setProgress(root,1);
      setStep(tab.dataset.authMode==='login'?2:1);
      setTimeout(function(){
        addIcons(panel);
        addHelper(panel);
        syncLang(root);
      },30);
    });

    document.querySelectorAll('[data-site-lang]').forEach(function(btn){
      btn.addEventListener('click',function(){setTimeout(function(){syncLang(root)},20)});
    });

    var msg=panel.querySelector('#clientAuthMessage');
    if(msg&&'MutationObserver' in window){
      new MutationObserver(function(){
        var text=(msg.textContent||'').toLowerCase();
        if(/creat|created|succes|success|bun venit|welcome|autentificat|вход|создан/.test(text)){
          setProgress(root,2);
          setStep(2);
          root.classList.add('tt-auth-success');
          burst(root);
          syncLang(root);
          setTimeout(function(){root.classList.remove('tt-auth-success')},1800);
        }
      }).observe(msg,{childList:true,subtree:true,characterData:true});
    }

    var bookingSuccess=document.getElementById('bkSuccess');
    if(bookingSuccess&&'MutationObserver' in window){
      new MutationObserver(function(){
        var text=(bookingSuccess.textContent||'').trim();
        if(text){
          setProgress(root,3);
          setStep(3);
          burst(root);
        }
      }).observe(bookingSuccess,{childList:true,subtree:true,characterData:true});
    }

    setProgress(root,1);
    setStep(1);
    setTimeout(function(){setStep(2)},1400);
  }

  function boot(){
    var loggedOut=document.getElementById('clientAuthLoggedOut');
    var card=document.getElementById('clientAuthCard');
    if(loggedOut)enhance(loggedOut,card);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
  setTimeout(boot,350);
})();