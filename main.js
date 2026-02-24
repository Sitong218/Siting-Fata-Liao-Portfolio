
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

/* smooth scroll for anchor links */
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const target = $(id);
    if(!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* lightbox */
const lb = $('.lb');
if(lb){
  const lbImg = $('.lb img');
  const lbCount = $('.lb-count');
  const lbClose = $('.lb-close');
  const lbPrev = $('.lb-prev');
  const lbNext = $('.lb-next');

  let imgs = [];
  let idx = 0;

  const open = (arr, i) => {
    imgs = arr;
    idx = i;
    lb.classList.add('open');
    render();
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  const render = () => {
    lbImg.src = imgs[idx].dataset.full;
    lbCount.textContent = `${idx+1} / ${imgs.length}`;
  };
  const prev = () => { idx = (idx - 1 + imgs.length) % imgs.length; render(); };
  const next = () => { idx = (idx + 1) % imgs.length; render(); };

  $$('.gi').forEach((gi, i, all)=>{
    gi.addEventListener('click', ()=> open(all, i));
  });

  lbClose?.addEventListener('click', close);
  lb?.addEventListener('click', (e)=>{ if(e.target === lb) close(); });
  lbPrev?.addEventListener('click', prev);
  lbNext?.addEventListener('click', next);

  window.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  });
}
