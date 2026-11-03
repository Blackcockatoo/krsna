(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); }
  menu.addEventListener('click', () => { const on = !nav.classList.contains('is-open'); nav.classList.toggle('is-open',on); menu.setAttribute('aria-expanded',String(on)); });
  nav.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); menu.focus(); } });

  const dialog = document.querySelector('#art-dialog');
  const art = [...document.querySelectorAll('.art-open')];
  let index = 0, opener;
  function showArt(n) {
    index = (n + art.length) % art.length;
    const item = art[index];
    dialog.querySelector('img').src = item.dataset.src;
    dialog.querySelector('img').alt = item.querySelector('img').alt;
    document.querySelector('#art-caption').textContent = item.dataset.title;
    document.querySelector('#art-counter').textContent = `${index+1} / ${art.length}`;
  }
  art.forEach((button,n) => button.addEventListener('click', () => { opener = button; showArt(n); dialog.showModal(); }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => opener?.focus());
  document.querySelector('#art-prev').addEventListener('click', () => showArt(index-1));
  document.querySelector('#art-next').addEventListener('click', () => showArt(index+1));
  dialog.addEventListener('keydown', e => { if(e.key==='ArrowRight') { e.preventDefault(); showArt(index+1); } if(e.key==='ArrowLeft') { e.preventDefault(); showArt(index-1); } });

  const audio = document.querySelector('#audio'), dock = document.querySelector('.listening-dock'), play = document.querySelector('#dock-play');
  let listeningVisible = true, hasPlayed = false;
  function syncDock() {
    dock.hidden = listeningVisible || !hasPlayed;
    play.textContent = audio.paused ? '▶' : 'Ⅱ';
    play.setAttribute('aria-label',audio.paused?'Resume recording':'Pause recording');
    document.querySelector('#dock-time').textContent = `${Math.floor(audio.currentTime/60)}:${String(Math.floor(audio.currentTime%60)).padStart(2,'0')} · Return to the voice ↗`;
  }
  new IntersectionObserver(entries => { listeningVisible = entries[0].isIntersecting; syncDock(); },{threshold:0}).observe(document.querySelector('#listening'));
  audio.addEventListener('play',() => { hasPlayed = true; syncDock(); });
  ['pause','timeupdate','ended'].forEach(event => audio.addEventListener(event,syncDock));
  play.addEventListener('click', () => document.querySelector('#play').click());

  function revealAnchor() {
    let target; try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { return; }
    if (!target) return;
    let parent = target.parentElement, opened = false;
    while(parent) { if(parent.tagName==='DETAILS' && !parent.open) { parent.open=true; opened=true; } parent=parent.parentElement; }
    if(opened) requestAnimationFrame(() => target.scrollIntoView());
  }
  window.addEventListener('hashchange',revealAnchor);revealAnchor();
  const chapterLinks=[...document.querySelectorAll('.literary-nav nav a')];
  const chapters = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) chapterLinks.forEach(a => { if(a.hash === '#'+entry.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); },{rootMargin:'-10% 0px -65% 0px'});
  chapterLinks.forEach(a => chapters.observe(document.querySelector(a.hash)));
})();
