(function(){
  function avatarMarkup(){
    return '<div class="tt-auth-brand"><img class="tt-brand-mark" src="images/tt-beauty-lounge-logo-new.webp?v=3" alt=""><span>Beauty Lounge</span></div>'+
      '<span class="tt-auth-rail"></span><span class="tt-auth-rail r2"></span>'+
      '<span class="tt-auth-spark s1"></span><span class="tt-auth-spark s2"></span><span class="tt-auth-spark s3"></span><span class="tt-auth-spark s4"></span>'+
      '<div class="tt-auth-character">'+
      '<div class="tt-auth-avatar-wrap" aria-hidden="true">'+
      '<svg class="tt-auth-avatar" viewBox="0 0 260 430" role="img" aria-label="Stilist TT Beauty">'+
        '<defs>'+
          '<linearGradient id="ttDress" x1="0" x2="1"><stop offset="0" stop-color="#7d4546"/><stop offset=".55" stop-color="#b76d73"/><stop offset="1" stop-color="#6d3838"/></linearGradient>'+
          '<linearGradient id="ttSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5cfb7"/><stop offset="1" stop-color="#dca88c"/></linearGradient>'+
          '<linearGradient id="ttGold" x1="0" x2="1"><stop offset="0" stop-color="#aa8145"/><stop offset=".5" stop-color="#f1d79b"/><stop offset="1" stop-color="#9a7139"/></linearGradient>'+
        '</defs>'+
        '<ellipse cx="130" cy="403" rx="55" ry="10" fill="rgba(0,0,0,.18)"/>'+
        '<g class="tt-leg-l"><path d="M103 292h23l-4 91h-26z" fill="#2a211f"/><path d="M94 378h30l8 14H88z" fill="#160e0b"/></g>'+
        '<g class="tt-leg-r"><path d="M136 292h23l7 91h-27z" fill="#342724"/><path d="M138 378h31l8 14h-45z" fill="#160e0b"/></g>'+
        '<g class="tt-body">'+
          '<path d="M90 151c13-23 29-34 43-34 17 0 34 12 45 36l16 147c-39 19-83 19-126 0l22-149z" fill="url(#ttDress)"/>'+
          '<path d="M97 157c18 11 51 11 73-1l3 49H91z" fill="#f4e9df" opacity=".97"/>'+
          '<path d="M94 204h82l15 88c-38 15-79 15-119 0z" fill="url(#ttDress)"/>'+
          '<path d="M127 158c2 9 7 14 14 15 7-3 11-8 13-16" fill="none" stroke="url(#ttGold)" stroke-width="3"/>'+
          '<circle cx="141" cy="177" r="7" fill="url(#ttGold)"/>'+
        '</g>'+
        '<g class="tt-arm-l"><path d="M89 161c-12 3-18 12-18 24l-2 102c0 12 17 14 20 2l8-95z" fill="url(#ttSkin)"/><circle cx="78" cy="290" r="10" fill="#e9b99d"/></g>'+
        '<g class="tt-arm-r"><path d="M177 160c12 2 20 11 20 23l5 100c1 12-16 15-20 3l-12-93z" fill="url(#ttSkin)"/><circle cx="193" cy="287" r="10" fill="#e9b99d"/></g>'+
        '<ellipse class="tt-face" cx="135" cy="90" rx="45" ry="52" fill="url(#ttSkin)"/>'+
        '<path class="tt-hair" d="M89 88c0-47 29-70 58-62 28 8 40 39 28 76-7-21-25-35-46-36-15 0-27 8-40 22z" fill="#39211e"/>'+
        '<path class="tt-hair-tail" d="M167 70c24 22 25 62 9 91-9-15-12-34-8-53 2-13 1-26-1-38z" fill="#39211e"/>'+
        '<path d="M112 82c6-5 13-6 19-2M145 80c7-2 13 0 17 5" fill="none" stroke="#4a2b27" stroke-width="3" stroke-linecap="round"/>'+
        '<ellipse cx="122" cy="94" rx="3" ry="3.5" fill="#32211f"/><ellipse cx="153" cy="94" rx="3" ry="3.5" fill="#32211f"/>'+
        '<path class="tt-avatar-smile" d="M124 116c8 8 18 8 27 0" fill="none" stroke="#9f565b" stroke-width="3.2" stroke-linecap="round"/>'+
        '<path d="M138 96c-1 7-2 12-5 15 4 2 8 2 11 0" fill="none" stroke="#d3947f" stroke-width="2" stroke-linecap="round"/>'+
        '<path d="M99 145c10 8 23 13 37 13 16 0 30-5 41-14" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>'+
      '</svg></div></div><div class="tt-auth-case" aria-hidden="true"></div>';
  }

  function setStep(n){
    document.querySelectorAll('#programare .steps .step').forEach(function(step,i){
      step.classList.toggle('tt-step-active',i===n-1);
    });
  }

  function burst(root){
    if(!root)return;
    root.classList.add('tt-auth-success');
    for(var i=0;i<18;i++){
      var p=document.createElement('span');
      p.className='tt-auth-confetti';
      p.style.left=(52+Math.random()*35)+'%';
      p.style.top=(28+Math.random()*28)+'%';
      p.style.setProperty('--cx',((Math.random()-.5)*220)+'px');
      p.style.setProperty('--cy',(-40+Math.random()*190)+'px');
      if(i%3===1)p.style.background='#b76d73';
      root.appendChild(p);
      setTimeout(function(el){el.remove()},1400,p);
    }
    setTimeout(function(){root.classList.remove('tt-auth-success')},1700);
  }

  function enhance(target,host){
    if(!target||target.dataset.ttCinematic==='2')return;
    target.dataset.ttCinematic='2';
    var root=host||target;
    root.classList.add('tt-auth-cinematic');

    var panel=document.createElement('div');
    panel.className='tt-auth-panel';
    while(target.firstChild)panel.appendChild(target.firstChild);

    var scene=document.createElement('div');
    scene.className='tt-auth-scene';
    scene.innerHTML=avatarMarkup();

    var layout=document.createElement('div');
    layout.className='tt-auth-layout';
    layout.appendChild(scene);
    layout.appendChild(panel);
    target.appendChild(layout);

    var character=scene.querySelector('.tt-auth-character');
    var password=panel.querySelector('input[type="password"]');
    var inputs=[].slice.call(panel.querySelectorAll('input,select,textarea'));

    function replay(){
      root.classList.add('tt-auth-replay');
      root.classList.remove('tt-auth-run');
      void root.offsetWidth;
      root.classList.add('tt-auth-run');
      setStep(1);
      setTimeout(function(){setStep(2)},850);
      setTimeout(function(){root.classList.remove('tt-auth-replay','tt-auth-run')},1800);
    }

    panel.addEventListener('click',function(e){
      if(e.target.closest('[data-auth-mode],[data-auth]'))setTimeout(replay,25);
    });

    inputs.forEach(function(input){
      input.addEventListener('focus',function(){
        if(!character)return;
        character.classList.remove('is-pointing','is-password');
        character.classList.add(input===password?'is-password':'is-pointing');
        setStep(2);
      });
      input.addEventListener('blur',function(){
        if(!character)return;
        character.classList.remove('is-pointing','is-password');
      });
    });

    var msg=panel.querySelector('#clientAuthMessage,#accountMsg');
    if(msg && 'MutationObserver' in window){
      new MutationObserver(function(){
        var text=(msg.textContent||'').toLowerCase();
        if(/creat|created|salvat|succes|success|bun venit|welcome/.test(text)){
          if(character)character.classList.add('is-happy');
          burst(root);
          setStep(3);
          setTimeout(function(){if(character)character.classList.remove('is-happy')},1600);
        }
      }).observe(msg,{childList:true,subtree:true,characterData:true});
    }

    setStep(1);
    setTimeout(function(){setStep(2)},1550);
  }

  function boot(){
    var siteLoggedOut=document.getElementById('clientAuthLoggedOut');
    var siteCard=document.getElementById('clientAuthCard');
    if(siteLoggedOut)enhance(siteLoggedOut,siteCard);
    var appAuth=document.getElementById('clientAuth');
    if(appAuth&&!siteLoggedOut)enhance(appAuth,appAuth);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
  setTimeout(boot,350);
})();