const root = document;
const scene = root.querySelector('#scene');
const stage = root.querySelector('#design-stage');
const dialog = root.querySelector('#section-dialog');
const panel = dialog.querySelector('.panel');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const videoUrl = 'https://vk.ru/wall-104609113_14155';
const photoTitles = ['Открытие игр — команды с флагами','Встреча на спортивной площадке','Команда с кубком','Футбольный матч','Зажжение олимпийского огня','Награждение участников','Команды на открытии','Олимпийская эстафета'];
const photos = photoTitles.map((title, i) => ({src:`assets/gallery/olympics/photo-${String(i+1).padStart(2,'0')}.jpg`, title}));
let trigger = null, galleryIndex = 0, awardIndex = 0;
const videoLink = () => `<a class="video-link" href="${videoUrl}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span> Смотреть видео в VK <span aria-hidden="true">↗</span></a>`;
const photoCard = (i) => `<button class="event-photo" data-photo="${i}" aria-label="Открыть фотографию: ${photos[i].title}"><img src="${photos[i].src}" alt="${photos[i].title}" loading="lazy" decoding="async"><span>${photos[i].title}</span></button>`;
const templates = {
  about: () => '<article class="club-description"><span class="scene-hand">спорт начинается с нас</span><h2 class="scene-title">Легенда №47</h2><p>Школьный спортивный клуб «Легенда №47» — это объединение учащихся, заинтересованных в развитии спорта в школе.</p><p>Участники занимаются организацией спортивных мероприятий в школе и представляют школьную команду на уровне города и региона.</p><p><strong>Ключевое дело клуба</strong> — организация и проведение школьных летних и зимних Олимпийских игр.</p></article>',
  gallery: () => `<h2 class="scene-title">Фотогалерея</h2><span class="scene-hand">вспоминаем, как это было</span><article class="album-feature"><button class="album-feature-cover" data-album aria-label="Открыть альбом Школьные олимпийские игры"><img src="${photos[0].src}" alt="Открытие школьных Олимпийских игр — команды с флагами" loading="lazy"><span>8 фотографий</span></button><div class="album-feature-copy"><span class="album-eyebrow">НАШ ГЛАВНЫЙ СТАРТ</span><h3>Школьные<br>олимпийские игры</h3><p>Открытие, спортивные встречи и награждение — моменты наших игр.</p><button class="scene-button" data-album>Открыть альбом <span aria-hidden="true">↗</span></button>${videoLink()}</div></article>`,
  council: () => `<div class="council-heading"><div><span class="scene-hand">команда — это люди</span><h2 class="team-word" aria-label="Наша команда">${[...'НАША КОМАНДА'].map(c=>`<span aria-hidden="true">${c===' '?'&nbsp;':c}</span>`).join('')}</h2></div><button class="scene-button" data-replay>Собрать команду ещё раз</button></div><p class="section-pending">Скоро здесь появятся фотографии и имена участников совета клуба.</p>`,
  traditions: () => `<h2 class="scene-title">Наши традиции</h2><span class="scene-hand">разные старты — одна команда</span><p class="scene-intro">Организация и проведение школьных летних и зимних Олимпийских игр — ключевое дело «Легенды №47».</p><div class="tradition-photos">${[4,7,2].map(photoCard).join('')}</div>`,
  day: () => '<div class="day-description"><span class="scene-hand">учимся, двигаемся, растём</span><h2 class="scene-title">Школа полного дня</h2><p class="section-pending">Информация о программе и фотографии занятий готовятся к публикации.</p></div>',
  wins: () => renderAwards(),
  partners: () => '<div class="partner-names"><span class="scene-hand">спасибо за поддержку!</span><h2 class="scene-title">Наши партнёры</h2><p class="section-pending">Информация о партнёрах клуба скоро появится здесь.</p></div>',
  docs: () => '<div class="doc-sheet"><h2 class="scene-title">Документы клуба</h2><p class="section-pending">Документы готовятся к публикации.</p></div>'
};
const labels = {about:'01 / НАШ КЛУБ',gallery:'02 / ФОТОГАЛЕРЕЯ',council:'03 / СОВЕТ КЛУБА',traditions:'04 / НАШИ ТРАДИЦИИ',day:'05 / ШКОЛА ПОЛНОГО ДНЯ',wins:'06 / НАШИ ДОСТИЖЕНИЯ',partners:'07 / НАШИ ПАРТНЁРЫ',docs:'08 / ДОКУМЕНТЫ'};
function assemble() {
  if (reduced.matches) return;
  scene.querySelectorAll('.team-word span').forEach((letter,i) => letter.animate([{transform:`translate(${(i%3-1)*60}px,${i%2?42:-40}px) rotate(${i%2?16:-16}deg)`,opacity:0},{transform:'none',opacity:1}],{duration:680,delay:i*42,easing:'cubic-bezier(.2,.8,.25,1.2)',fill:'backwards'}));
}
function selectSection(id, scroll=true) {
  if (!templates[id]) return;
  scene.innerHTML = templates[id]();
  root.querySelector('#stage-kicker').textContent = labels[id];
  root.querySelectorAll('[data-section]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.section===id)));
  if (scroll) stage.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  if (id==='council') assemble();
}
function openAlbum() {
  scene.innerHTML = `<div class="album-top"><button class="album-back" data-albums>← Все мероприятия</button><span>8 ФОТОГРАФИЙ</span></div><div class="gallery-head"><div><h2 class="scene-title">Школьные олимпийские игры</h2><span class="scene-hand">свои моменты, своя история</span></div>${videoLink()}</div><div class="event-photo-grid">${photos.map((_,i)=>photoCard(i)).join('')}</div>`;
  scene.querySelector('[data-albums]').focus({preventScroll:true});
}
function photoHTML() {
  const p = photos[galleryIndex];
  return `<span class="panel-tag">ШКОЛЬНЫЕ ОЛИМПИЙСКИЕ ИГРЫ</span><h2 id="panel-title">${p.title}</h2><img class="panel-photo" src="${p.src}" alt="${p.title}"><div class="image-dialog-controls"><button data-step="-1" aria-label="Предыдущая фотография">← Назад</button><span aria-live="polite">${galleryIndex+1} / ${photos.length}</span><button data-step="1" aria-label="Следующая фотография">Дальше →</button></div>`;
}
function show(html, button, mode) {
  trigger = button;
  dialog.classList.add(mode);
  panel.innerHTML = html;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
function movePhoto(step) {
  galleryIndex = (galleryIndex+step+photos.length)%photos.length;
  panel.innerHTML = photoHTML();
  panel.querySelector(`[data-step="${step}"]`).focus({preventScroll:true});
}
function moveAward(step) {
  awardIndex = (awardIndex+step+clubAwards.length)%clubAwards.length;
  panel.innerHTML = awardPanelHTML(awardIndex);
  panel.querySelector(`[data-award-step="${step}"]`).focus({preventScroll:true});
}
root.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => {
  const id = button.dataset.section;
  history.replaceState(null,'','#'+id);
  selectSection(id);
}));
scene.addEventListener('click', e => {
  const button = e.target.closest('button');
  if (!button) return;
  if (button.hasAttribute('data-album')) return openAlbum();
  if (button.hasAttribute('data-albums')) { selectSection('gallery',false); scene.querySelector('[data-album]').focus({preventScroll:true}); return; }
  if (button.hasAttribute('data-replay')) return assemble();
  if (button.hasAttribute('data-photo')) { galleryIndex=Number(button.dataset.photo); show(photoHTML(),button,'photos-dialog'); return; }
  if (button.hasAttribute('data-award')) { awardIndex=Number(button.dataset.award); show(awardPanelHTML(awardIndex),button,'awards-dialog'); }
});
panel.addEventListener('click', e => {
  const photoButton = e.target.closest('[data-step]');
  const awardButton = e.target.closest('[data-award-step]');
  if (photoButton) movePhoto(Number(photoButton.dataset.step));
  if (awardButton) moveAward(Number(awardButton.dataset.awardStep));
});
dialog.addEventListener('keydown', e => {
  if(e.ctrlKey||e.metaKey||e.altKey||!['ArrowLeft','ArrowRight'].includes(e.key)) return;
  const step = e.key==='ArrowRight'?1:-1;
  if (dialog.classList.contains('photos-dialog')) { e.preventDefault(); movePhoto(step); }
  if (dialog.classList.contains('awards-dialog')) { e.preventDefault(); moveAward(step); }
});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';dialog.classList.remove('awards-dialog','photos-dialog');trigger?.focus({preventScroll:true});});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
const initialSection = location.hash.slice(1);
selectSection(templates[initialSection]?initialSection:'about',Boolean(templates[initialSection]));
