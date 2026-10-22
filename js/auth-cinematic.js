(function(){
  function avatarMarkup(){
    return '<div class="tt-auth-brand"><img class="tt-brand-mark" src="images/tt-beauty-lounge-logo-new.webp?v=3" alt=""><span>Beauty Lounge</span></div>'+
      '<span class="tt-auth-rail"></span><span class="tt-auth-rail r2"></span>'+
      '<span class="tt-auth-spark s1"></span><span class="tt-auth-spark s2"></span><span class="tt-auth-spark s3"></span><span class="tt-auth-spark s4"></span>'+
      '<div class="tt-auth-character">'+
      '<div class="tt-auth-avatar-wrap" aria-hidden="true">'+
      '<svg class="tt-auth-avatar" viewBox="0 0 280 460" role="img" aria-label="Stilist TT Beauty">'+
        '<defs>'+
          '<linearGradient id="skinReal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7d6c1"/><stop offset=".58" stop-color="#e9b79d"/><stop offset="1" stop-color="#c98f76"/></linearGradient>'+
          '<linearGradient id="skinShade" x1="0" x2="1"><stop offset="0" stop-color="#d99f86"/><stop offset="1" stop-color="#f2c8ae"/></linearGradient>'+
          '<linearGradient id="hairReal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#211310"/><stop offset=".45" stop-color="#4a2823"/><stop offset=".78" stop-color="#6c3d32"/><stop offset="1" stop-color="#2a1714"/></linearGradient>'+
          '<linearGradient id="dressReal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a2d2f"/><stop offset=".42" stop-color="#a95f67"/><stop offset=".72" stop-color="#7d4046"/><stop offset="1" stop-color="#3b2020"/></linearGradient>'+
          '<linearGradient id="blouseReal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf5"/><stop offset="1" stop-color="#e8d7c7"/></linearGradient>'+
          '<linearGradient id="goldReal" x1="0" x2="1"><stop offset="0" stop-color="#9d7436"/><stop offset=".48" stop-color="#f0d49a"/><stop offset="1" stop-color="#a37a3d"/></linearGradient>'+
          '<radialGradient id="faceLight" cx=".36" cy=".28" r=".7"><stop offset="0" stop-color="#fff0e3" stop-opacity=".8"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
        '</defs>'+
        '<ellipse cx="140" cy="430" rx="58" ry="11" fill="rgba(0,0,0,.22)"/>'+
        '<g class="tt-leg-l"><path d="M107 320c7-2 14-2 22 0l-5 89h-28z" fill="#2b211f"/><path d="M95 402h31l10 15H87z" fill="#120c0a"/></g>'+
        '<g class="tt-leg-r"><path d="M151 320c7-2 14-2 22 0l8 89h-29z" fill="#332623"/><path d="M151 402h31l12 15h-49z" fill="#120c0a"/></g>'+
        '<g class="tt-torso">'+
          '<path class="tt-chest" d="M95 170c11-30 29-45 47-45 21 0 40 16 52 48l17 143c-46 24-96 24-144 0l28-146z" fill="url(#dressReal)"/>'+
          '<path d="M103 169c20 17 53 19 77 1l6 55H96z" fill="url(#blouseReal)"/>'+
          '<path d="M99 225h88l16 84c-44 17-90 17-132 0z" fill="url(#dressReal)"/>'+
          '<path d="M118 171c6 11 14 17 24 18 12-3 20-10 25-20" fill="none" stroke="url(#goldReal)" stroke-width="2.6"/>'+
          '<circle cx="143" cy="192" r="6.8" fill="url(#goldReal)"/>'+
          '<path d="M104 241c24 11 54 12 82 1" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1.4"/>'+
        '</g>'+
        '<g class="tt-normal-arms">'+
          '<g class="tt-arm-l"><path d="M97 178c-14 2-23 13-25 29l-5 82c-1 15 7 30 19 40" fill="none" stroke="url(#skinShade)" stroke-width="19" stroke-linecap="round"/><circle cx="84" cy="326" r="10.5" fill="#e6b094"/></g>'+
          '<g class="tt-arm-r"><path d="M190 177c15 2 24 13 26 29l6 80c2 16-5 30-17 41" fill="none" stroke="url(#skinReal)" stroke-width="19" stroke-linecap="round"/><circle cx="207" cy="324" r="10.5" fill="#e8b79d"/></g>'+
        '</g>'+
        '<g class="tt-face-group">'+
          '<path class="tt-hair-main" d="M89 103c0-56 31-84 66-79 38 5 56 41 48 89-4 26-18 46-31 57-1-31-5-51-15-67-14 13-31 18-52 17-2 19-3 37-1 52-12-11-15-42-15-69z" fill="url(#hairReal)"/>'+
          '<path d="M111 53c18-18 50-18 69 1" fill="none" stroke="#7d4b3d" stroke-width="4.5" stroke-linecap="round" opacity=".45"/>'+
          '<path class="tt-hair-highlight" d="M112 42c16-10 34-12 52-6M101 70c12-16 27-24 45-27" fill="none" stroke="#aa6d58" stroke-width="3.2" stroke-linecap="round"/>'+
          '<ellipse class="tt-face" cx="145" cy="101" rx="45" ry="53" fill="url(#skinReal)"/>'+
          '<ellipse cx="145" cy="99" rx="43" ry="51" fill="url(#faceLight)"/>'+
          '<path d="M113 89c8-5 16-5 23-1M154 88c8-4 16-3 23 2" fill="none" stroke="#5c342e" stroke-width="3" stroke-linecap="round"/>'+
          '<g class="tt-eye-l"><ellipse cx="126" cy="101" rx="7.6" ry="5.2" fill="#fffaf7"/><ellipse cx="127" cy="101" rx="3.2" ry="3.5" fill="#49302d"/><circle cx="128.2" cy="99.9" r=".8" fill="#fff"/></g>'+
          '<g class="tt-eye-r"><ellipse cx="165" cy="101" rx="7.6" ry="5.2" fill="#fffaf7"/><ellipse cx="164" cy="101" rx="3.2" ry="3.5" fill="#49302d"/><circle cx="165.2" cy="99.9" r=".8" fill="#fff"/></g>'+
          '<path d="M146 103c-1 7-2 13-6 18 5 2 10 2 14-1" fill="none" stroke="#c88775" stroke-width="2.1" stroke-linecap="round"/>'+
          '<ellipse class="tt-cheek" cx="116" cy="119" rx="11" ry="5" fill="#d77e83"/><ellipse class="tt-cheek" cx="175" cy="119" rx="11" ry="5" fill="#d77e83"/>'+
          '<path class="tt-avatar-smile" d="M129 132c10 8 23 8 33 0" fill="none" stroke="#a14f57" stroke-width="3.1" stroke-linecap="round"/>'+
          '<path d="M136 132c5 2 11 2 17 0" fill="none" stroke="#d28a91" stroke-width="1.3" stroke-linecap="round"/>'+
          '<path d="M101 110c-5 22-2 43 8 61M187 108c3 21 0 42-12 60" fill="none" stroke="#3f241f" stroke-width="10" stroke-linecap="round"/>'+
          '<g class="tt-earring"><circle cx="101" cy="119" r="3.5" fill="url(#goldReal)"/><path d="M101 123v12" stroke="url(#goldReal)" stroke-width="2"/><circle cx="101" cy="139" r="4.5" fill="none" stroke="url(#goldReal)" stroke-width="2"/></g>'+
          '<g class="tt-earring"><circle cx="188" cy="119" r="3.5" fill="url(#goldReal)"/><path d="M188 123v12" stroke="url(#goldReal)" stroke-width="2"/><circle cx="188" cy="139" r="4.5" fill="none" stroke="url(#goldReal)" stroke-width="2"/></g>'+
        '</g>'+
        '<g class="tt-cover-hands">'+
          '<path d="M93 219c10-32 22-56 40-77" fill="none" stroke="url(#skinShade)" stroke-width="18" stroke-linecap="round"/>'+
          '<path d="M196 219c-10-32-22-56-40-77" fill="none" stroke="url(#skinReal)" stroke-width="18" stroke-linecap="round"/>'+
          '<g transform="translate(119 125) rotate(-8)"><rect x="-18" y="-9" width="36" height="20" rx="10" fill="#efc2a8"/><rect x="-16" y="-17" width="5" height="14" rx="2.5" fill="#f1c6ad"/><rect x="-9" y="-19" width="5" height="16" rx="2.5" fill="#f1c6ad"/><rect x="-2" y="-19" width="5" height="16" rx="2.5" fill="#f1c6ad"/><rect x="5" y="-17" width="5" height="14" rx="2.5" fill="#f1c6ad"/></g>'+
          '<g transform="translate(169 125) rotate(8)"><rect x="-18" y="-9" width="36" height="20" rx="10" fill="#e9b59a"/><rect x="-10" y="-17" width="5" height="14" rx="2.5" fill="#edbca2"/><rect x="-3" y="-19" width="5" height="16" rx="2.5" fill="#edbca2"/><rect x="4" y="-19" width="5" height="16" rx="2.5" fill="#edbca2"/><rect x="11" y="-17" width="5" height="14" rx="2.5" fill="#edbca2"/></g>'+
        '</g>'+
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