const root = document;
const scene = root.querySelector('#scene');
const stage = root.querySelector('#design-stage');
const dialog = root.querySelector('#section-dialog');
const panel = dialog.querySelector('.panel');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const dayPhotos=Array.from({length:5},(_,i)=>({src:'assets/gallery/full-day/photo-'+String(i+1).padStart(2,'0')+'.jpg',title:'Школа полного дня — фотография '+(i+1)}));
const photoTitles = ['Открытие игр — команды с флагами','Встреча на спортивной площадке','Команда с кубком','Футбольный матч','Зажжение олимпийского огня','Награждение участников','Команды на открытии','Олимпийская эстафета'];
const albums = [
  {title:'Школьные олимпийские игры',video:'https://vk.ru/wall-104609113_14155',photos:photoTitles.map((title,i)=>({src:`assets/gallery/olympics/photo-${String(i+1).padStart(2,'0')}.jpg`,title}))},
  {title:'Кубок президента школы по спортивным играм в креативных пространствах',video:'https://vk.ru/wall-104609113_8228',photos:['Настольный футбол','Аэрохоккей','Настольный теннис','Флэтбол','Бильярд','Шашки'].map((title,i)=>({src:`assets/gallery/president-cup/photo-${String(i+1).padStart(2,'0')}.jpg`,title}))},
  {title:'Городская круглогодичная спартакиада',video:null,photos:['Команда на спартакиаде','Баскетбольная команда','Баскетбол','Легкоатлетический кросс','Команда по плаванию','Итоговая таблица спартакиады'].map((title,i)=>({src: 'assets/gallery/spartakiad/photo-'+String(i+1).padStart(2,'0')+'.jpg',title}))}
,
  {title:'Ежегодный день здоровья «Зимние фантазии»',video:null,photos:Array.from({length:9},(_,i)=>({src:'assets/gallery/winter-fantasies/photo-'+String(i+1).padStart(2,'0')+'.jpg',title:'Зимние фантазии — фотография '+(i+1)}))}
,
  {title:'Зимние олимпийские игры',video:'https://vk.ru/wall-104609113_899',photos:Array.from({length:8},(_,i)=>({src:'assets/gallery/winter-olympics/photo-'+String(i+1).padStart(2,'0')+'.jpg',title:'Зимние олимпийские игры — фотография '+(i+1)}))}
,
  {title:'Ежедневная утренняя зарядка на 4 уроке',video:null,photos:Array.from({length:7},(_,i)=>({src:'assets/gallery/morning-exercise/photo-'+String(i+1).padStart(2,'0')+'.jpg',title:'Ежедневная утренняя зарядка — фотография '+(i+1)}))}
];
let activeAlbum = 0, photos = albums[0].photos;
let trigger = null, galleryIndex = 0, awardIndex = 0;
const videoLink = (url=albums[activeAlbum].video) => !url ? '' : `<a class="video-link" href="${url}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▶</span> Смотреть видео в VK <span aria-hidden="true">↗</span></a>`;
const photoCard = (i) => `<button class="event-photo" data-photo="${i}" aria-label="Открыть фотографию: ${photos[i].title}"><img src="${photos[i].src}" alt="${photos[i].title}" loading="lazy" decoding="async"></button>`;
const templates = {
  about: () => '<article class="club-description"><span class="scene-hand">спорт начинается с нас</span><h2 class="scene-title">Легенда №47</h2><p>Школьный спортивный клуб «Легенда №47» работает в школе № 47 Липецка с 2021 года и открыт для учащихся 1–11 классов.</p><p>Основа спортивной жизни школы — круглогодичная спартакиада. Каждый класс накапливает баллы за участие и победы, а промежуточные результаты публикуются на открытом стенде. Так соревнование продолжается весь учебный год.</p><p>Клуб проводит летние и зимние школьные Олимпийские игры, дни здоровья и турниры, организует сдачу норм ГТО и участие сборных школы в городских и областных соревнованиях.</p><p>По итогам 2025 года в клубе занимались 492 человека. В 2025–2026 учебном году «Легенда №47» заняла первое место в городской спартакиаде школьных спортивных клубов в третьей группе.</p></article>',
  gallery: () => `<h2 class="scene-title">Фотогалерея</h2>${albums.map((album,i)=>`<article class="album-feature"><button class="album-feature-cover" data-album="${i}" aria-label="Открыть альбом: ${album.title}"><img src="${album.photos[0].src}" alt="${album.photos[0].title}" loading="lazy"><span>${album.photos.length} фотографий</span></button><div class="album-feature-copy"><h3>${album.title}</h3><button class="scene-button" data-album="${i}">Открыть альбом <span aria-hidden="true">↗</span></button>${videoLink(album.video)}</div></article>`).join('')}`,
  council: () => `<div class="council-heading"><div><span class="scene-hand">команда — это люди</span><h2 class="team-word" aria-label="Наша команда">${[...'НАША КОМАНДА'].map(c=>`<span aria-hidden="true">${c===' '?'&nbsp;':c}</span>`).join('')}</h2></div><button class="scene-button" data-replay>Собрать команду ещё раз</button></div><article class="club-description"><p>Функции Совета ШСК выполняет Совет по спорту при президенте школы. Вместе с Комитетом по спорту Школьной думы он участвует в планировании мероприятий и оценке работы клуба.</p><h3>Спортивный актив</h3><p>В него входят члены правительства школьного государства «Серебряная Орбита», советники по спорту и представители классов. Ученики помогают организовывать и освещать соревнования, представляют интересы своих команд.</p><h3>Помощники и волонтёры</h3><p>Старшеклассники помогают судьям, организуют этапы соревнований и поддерживают участников. Руководитель ШСК координирует работу клуба и взаимодействие с партнёрами, а директор школы утверждает планы и локальные акты.</p></article>`,
  traditions: () => `<h2 class="scene-title">Наши традиции</h2><span class="scene-hand">разные старты — одна команда</span><article class="club-description"><p>Наши традиции объединяет круглогодичная спартакиада: классы зарабатывают баллы за участие и победы, следят за открытым рейтингом и поддерживают свои команды.</p><h3>Школьные Олимпийские игры</h3><p>Летние игры включают эстафеты, баскетбол, пионербол, бадминтон, воркаут, скейтбординг и футбольный фристайл. Зимой проходят хоккей, бобслей, кёрлинг, перетягивание каната, лыжный забег, метание снежков и рисунки на снегу.</p><h3>«Зимние фантазии» и масленичные забавы</h3><p>Ежегодный день здоровья «Зимние фантазии» и масленичные забавы входят в календарь традиционных спортивных событий школы.</p><h3>Кубок президента</h3><p>В креативных пространствах проходят соревнования по шахматам, флэтболу, настольному футболу, настольному теннису, аэрохоккею и бильярду. В подготовке турниров участвует ученическое самоуправление.</p></article><div class="tradition-photos"><button class="event-photo" data-tradition="olympics" data-photo="7" aria-label="Открыть фото летних Олимпийских игр"><img src="assets/gallery/olympics/photo-08.jpg" alt="Олимпийская эстафета" loading="lazy"></button><button class="event-photo" data-tradition="winter-olympics" data-photo="3" aria-label="Открыть фото зимних Олимпийских игр"><img src="assets/gallery/winter-olympics/photo-04.jpg" alt="Перетягивание каната на зимних играх" loading="lazy"></button></div>`,
  day: () => '<article class="club-description"><span class="scene-hand">учимся, двигаемся, растём</span><h2 class="scene-title">Школа полного дня</h2><p>Спортивная жизнь школы продолжается за пределами уроков физкультуры. В клубе работают направления баскетбола, волейбола, футбола, воркаута и общей физической подготовки в тренажёрном зале. Занятия проходят по утверждённому расписанию.</p><p>В креативных пространствах школы проходят турниры по настольному футболу, настольному теннису, аэрохоккею, бильярду, шахматам и флэтболу. Эти пространства создавались при участии активистов ШСК.</p><p>Участие в занятиях и мероприятиях добровольное, с учётом состояния здоровья и индивидуальных возможностей ребёнка. Для учащихся с ОВЗ и инвалидностью предусмотрены адаптированные форматы участия. В школе также проходят уроки ритмики.</p><p><a href="assets/documents/document-11.pdf" target="_blank" rel="noopener">Расписание занятий ↗</a></p><div class="event-photo-grid full-day-photos"><button class="event-photo" data-day-photo="0" aria-label="Открыть фотографию 1"><img src="assets/gallery/full-day/photo-01.jpg" alt="Школа полного дня — фотография 1" loading="lazy"></button><button class="event-photo" data-day-photo="1" aria-label="Открыть фотографию 2"><img src="assets/gallery/full-day/photo-02.jpg" alt="Школа полного дня — фотография 2" loading="lazy"></button><button class="event-photo" data-day-photo="2" aria-label="Открыть фотографию 3"><img src="assets/gallery/full-day/photo-03.jpg" alt="Школа полного дня — фотография 3" loading="lazy"></button><button class="event-photo" data-day-photo="3" aria-label="Открыть фотографию 4"><img src="assets/gallery/full-day/photo-04.jpg" alt="Школа полного дня — фотография 4" loading="lazy"></button><button class="event-photo" data-day-photo="4" aria-label="Открыть фотографию 5"><img src="assets/gallery/full-day/photo-05.jpg" alt="Школа полного дня — фотография 5" loading="lazy"></button></div></article>',
  wins: () => renderAwards(),
  partners: () => '<article class="club-description"><span class="scene-hand">спасибо за поддержку!</span><h2 class="scene-title">Наши партнёры</h2><h3>Спортивные школы и детско-юношеские центры</h3><p>Школа сотрудничает со спортивными школами города и области, детско-юношескими центрами. На базе школы работают привлечённые специалисты, в том числе из ДЮСШ № 2.</p><h3>Городские соревнования</h3><p>Департамент образования и департамент по физической культуре и спорту администрации Липецка организуют городскую спартакиаду и награждение победителей. Команды школы участвуют в этих соревнованиях.</p><h3>Родители и выпускники</h3><p>Родители участвуют в днях здоровья, совместных праздниках и мероприятии «Папа, мама, я — спортивная семья». Выпускники возвращаются на школьные Олимпийские игры и турниры как гости, судьи и наставники.</p></article>',
  docs: () => '<div class="doc-sheet"><h2 class="scene-title">Документы клуба</h2><ul class="club-documents"><li><a href="assets/documents/document-01.pdf" download="Otskanirovanny_dokument_15.pdf"><span>Сканированный документ № 15</span><small>PDF · Скачать ↓</small></a></li><li><a href="assets/documents/document-02.pdf" download="Otskanirovanny_dokument_16.pdf"><span>Сканированный документ № 16</span><small>PDF · Скачать ↓</small></a></li><li><a href="assets/documents/document-03.docx" download="Календарьный план.docx"><span>Календарный план</span><small>DOCX · Скачать ↓</small></a></li><li><a href="assets/documents/document-04.docx" download="Карточка образовательной организации и ШСК.docx"><span>Карточка образовательной организации и ШСК</span><small>DOCX · Скачать ↓</small></a></li><li><a href="assets/documents/document-05.docx" download="Локальный акт.docx"><span>Локальный акт</span><small>DOCX · Скачать ↓</small></a></li><li><a href="assets/documents/document-06.docx" download="ОТЧЕТ  ОУ № 47.docx"><span>ОТЧЕТ  ОУ № 47</span><small>DOCX · Скачать ↓</small></a></li><li><a href="assets/documents/document-07.xlsx" download="ОУ № 47 ОТЧЕТ 1-ФК 2025.xlsx"><span>ОУ № 47 ОТЧЕТ 1-ФК 2025</span><small>XLSX · Скачать ↓</small></a></li><li><a href="assets/documents/document-08.xls" download="ОУ № 47 ОТЧЕТ № 1ФК 2022.XLS"><span>ОУ № 47 ОТЧЕТ № 1ФК 2022</span><small>XLS · Скачать ↓</small></a></li><li><a href="assets/documents/document-09.docx" download="План ШСК.docx"><span>План ШСК</span><small>DOCX · Скачать ↓</small></a></li><li><a href="assets/documents/document-10.pdf" download="Положение ШСК.pdf"><span>Положение ШСК</span><small>PDF · Скачать ↓</small></a></li><li><a href="assets/documents/document-11.pdf" download="Расписание занятий.pdf"><span>Расписание занятий</span><small>PDF · Скачать ↓</small></a></li><li><a href="assets/documents/document-12.pdf" download="Свидетельство ШСК.pdf"><span>Свидетельство ШСК</span><small>PDF · Скачать ↓</small></a></li><li><a href="assets/documents/document-13.doc" download="Таблица описание практики.doc"><span>Таблица описание практики</span><small>DOC · Скачать ↓</small></a></li><li><a href="assets/documents/document-14.pdf" download="ШСК Легенда 47.pdf"><span>ШСК Легенда 47</span><small>PDF · Скачать ↓</small></a></li></ul></div>'
};
const labels = {about:'НАШ КЛУБ',gallery:'ФОТОГАЛЕРЕЯ',council:'СОВЕТ КЛУБА',traditions:'НАШИ ТРАДИЦИИ',day:'ШКОЛА ПОЛНОГО ДНЯ',wins:'НАШИ ДОСТИЖЕНИЯ',partners:'НАШИ ПАРТНЁРЫ',docs:'ДОКУМЕНТЫ'};
function assemble() {
  if (reduced.matches) return;
  scene.querySelectorAll('.team-word span').forEach((letter,i) => letter.animate([{transform:`translate(${(i%3-1)*60}px,${i%2?42:-40}px) rotate(${i%2?16:-16}deg)`,opacity:0},{transform:'none',opacity:1}],{duration:680,delay:i*42,easing:'cubic-bezier(.2,.8,.25,1.2)',fill:'backwards'}));
}
function selectSection(id, scroll=true) {
  if (!templates[id]) return;
  activeAlbum = 0; photos = albums[0].photos;
  scene.innerHTML = templates[id]();
  root.querySelector('#stage-kicker').textContent = labels[id];
  root.querySelectorAll('[data-section]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.section===id)));
  if (scroll) stage.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  if (id==='council') assemble();
}
function openAlbum(index) {
  if (!albums[index]) return;
  activeAlbum = index; photos = albums[index].photos;
  scene.innerHTML = `<div class="album-top"><button class="album-back" data-albums>← Все мероприятия</button><span>${photos.length} ФОТОГРАФИЙ</span></div><div class="gallery-head"><div><h2 class="scene-title">${albums[index].title}</h2></div>${videoLink()}</div><div class="event-photo-grid">${photos.map((_,i)=>photoCard(i)).join('')}</div>`;
  scene.querySelector('[data-albums]').focus({preventScroll:true});
}
function photoHTML() {
  const p = photos[galleryIndex];
  return `<span class="panel-tag" id="panel-title">${activeAlbum===-1 ? 'Школа полного дня' : albums[activeAlbum].title}</span><img class="panel-photo" src="${p.src}" alt="${p.title}"><div class="image-dialog-controls"><button data-step="-1" aria-label="Предыдущая фотография">← Назад</button><span aria-live="polite">${galleryIndex+1} / ${photos.length}</span><button data-step="1" aria-label="Следующая фотография">Дальше →</button></div>`;
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
  if (button.hasAttribute('data-album')) return openAlbum(Number(button.dataset.album));
  if (button.hasAttribute('data-albums')) { selectSection('gallery',false); scene.querySelector('[data-album]').focus({preventScroll:true}); return; }
  if (button.hasAttribute('data-day-photo')) { activeAlbum=-1; photos=dayPhotos; galleryIndex=Number(button.dataset.dayPhoto); show(photoHTML(),button,'photos-dialog'); return; }
  if (button.hasAttribute('data-replay')) return assemble();
  if (button.hasAttribute('data-photo')) { if (button.dataset.tradition) { activeAlbum=albums.findIndex(a=>a.photos[0].src.includes('/'+button.dataset.tradition+'/')); photos=albums[activeAlbum].photos; } galleryIndex=Number(button.dataset.photo); show(photoHTML(),button,'photos-dialog'); return; }
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
