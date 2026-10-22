(()=>{
  const hero=document.querySelector('.hero');
  const card=document.querySelector('.hero-luxe-card');
  if(!hero||!card)return;

  requestAnimationFrame(()=>hero.classList.add('hero-ready'));

  const canTilt=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(canTilt){
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.setProperty('--ry',(x*5.2).toFixed(2)+'deg');
      card.style.setProperty('--rx',(-y*4.1).toFixed(2)+'deg');
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--ry','0deg');
      card.style.setProperty('--rx','0deg');
    });
  }

  function updateReviewBadge(){
    const stars=[...document.querySelectorAll('#reviewsList .review-card .stars')];
    if(!stars.length)return;
    const ratings=stars.map(el=>(el.textContent.match(/★/g)||[]).length).filter(Boolean);
    if(!ratings.length)return;
    const avg=ratings.reduce((a,b)=>a+b,0)/ratings.length;
    const badge=document.querySelector('[data-hero-rating]');
    if(badge)badge.textContent='★ '+avg.toFixed(1)+' · '+ratings.length+' recenzii';
  }
  setTimeout(updateReviewBadge,900);
  setTimeout(updateReviewBadge,2200);
})();