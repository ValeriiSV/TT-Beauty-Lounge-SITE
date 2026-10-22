(()=>{
  const gallery=document.getElementById('videoGallery');
  if(!gallery)return;

  const cards=[...gallery.querySelectorAll('.g-item')];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(pointer:fine)').matches;

  const io='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.16}):null;

  cards.forEach((card,i)=>{
    card.style.transitionDelay=(i*75)+'ms';
    if(io)io.observe(card); else card.classList.add('is-visible');
    const video=card.querySelector('video');
    if(!video)return;
    video.removeAttribute('controls');
    video.muted=true;
    video.loop=true;
    video.playsInline=true;
    video.setAttribute('aria-hidden','true');
    video.addEventListener('loadedmetadata',()=>{
      try{
        if(video.duration>.2)video.currentTime=Math.min(.12,video.duration/10);
      }catch(e){}
    },{once:true});

    if(fine&&!reduce){
      card.addEventListener('mouseenter',()=>{
        cards.forEach(c=>{
          if(c!==card){
            const v=c.querySelector('video');
            if(v&&!v.paused)v.pause();
            c.classList.remove('is-previewing');
          }
        });
        card.classList.add('is-previewing');
        video.play().catch(()=>{});
      });
      card.addEventListener('mouseleave',()=>{
        video.pause();
        card.classList.remove('is-previewing');
      });
    }
  });

  const modal=document.createElement('div');
  modal.className='gallery-modal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML='<div class="gallery-modal-shell" role="dialog" aria-modal="true" aria-label="Video TT Beauty Lounge">'+
    '<button type="button" class="gallery-modal-close" aria-label="Închide">×</button>'+
    '<video controls playsinline preload="metadata"></video>'+
    '<div class="gallery-modal-caption"><strong></strong><span></span></div>'+
    '</div>';
  document.body.appendChild(modal);

  const modalVideo=modal.querySelector('video');
  const modalTitle=modal.querySelector('strong');
  const modalTag=modal.querySelector('.gallery-modal-caption span');
  const closeBtn=modal.querySelector('.gallery-modal-close');

  function openCard(card){
    cards.forEach(c=>{
      const v=c.querySelector('video');
      if(v&&!v.paused)v.pause();
      c.classList.remove('is-previewing');
    });
    const src=card.querySelector('source')?.src;
    if(!src)return;
    modalVideo.src=src;
    modalTitle.textContent=card.dataset.title||'TT Beauty Lounge';
    modalTag.textContent=card.dataset.tag||'Portofoliu';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    modalVideo.play().catch(()=>{});
    closeBtn.focus();
  }

  function closeModal(){
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  cards.forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('button,a'))return;
      openCard(card);
    });
    const btn=card.querySelector('.gallery-play');
    if(btn)btn.addEventListener('click',e=>{
      e.stopPropagation();
      openCard(card);
    });
  });

  closeBtn.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});

  const more=document.querySelector('[data-gallery-more]');
  if(more){
    more.addEventListener('click',()=>{
      const expanded=gallery.classList.toggle('show-all');
      more.textContent=expanded?'Arată mai puține':'Vezi toate transformările';
      if(expanded){
        const sixth=cards[5];
        if(sixth)sixth.classList.add('is-visible');
      }
    });
  }
})();