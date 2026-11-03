const dialog = document.querySelector('#art-dialog');
let opener;
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('.art-open').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      dialog.querySelector('img').src = button.dataset.src;
      dialog.querySelector('img').alt = button.querySelector('img').alt;
      dialog.querySelector('p').textContent = button.dataset.title;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => opener?.focus());
}
const chapters = document.querySelector('aside details');
if (matchMedia('(max-width: 680px)').matches) chapters.open = false;
chapters.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (matchMedia('(max-width: 680px)').matches) chapters.open = false;
}));
