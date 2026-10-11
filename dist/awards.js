const clubAwards = [
  {id:'swimming-girls', title:'Плавание', group:'Команда девушек', place:1, event:'Спартакиада школьных спортивных клубов города Липецка', date:'2025–2026 учебный год · 2026', format:'jpg'},
  {id:'presidential-competitions', title:'Президентские состязания', group:'Команда школы №47', place:1, event:'Муниципальный этап Всероссийских спортивных соревнований школьников', date:'2025–2026 учебный год · 2026', format:'pdf'},
  {id:'basketball-boys', title:'Баскетбол', group:'Команда юношей', place:1, event:'Спартакиада школьных спортивных клубов города Липецка', date:'2025–2026 учебный год · 2025', format:'pdf'},
  {id:'basketball-girls', title:'Баскетбол', group:'Команда девушек', place:1, event:'Спартакиада школьных спортивных клубов города Липецка', date:'2025–2026 учебный год · 2025', format:'pdf'},
  {id:'cross-country-girls', title:'Легкоатлетический кросс', group:'Команда девушек', place:2, event:'Спартакиада школьных спортивных клубов города Липецка', date:'2025–2026 учебный год · 2025', format:'pdf'},
  {id:'cross-country-boys', title:'Легкоатлетический кросс', group:'Команда юношей', place:3, event:'Спартакиада школьных спортивных клубов города Липецка', date:'2025–2026 учебный год · 2025', format:'pdf'},
  {id:'fitness-girls-first', title:'Общая физическая подготовка', group:'Девочки 2010–2012 г. р.', place:1, event:'Турнир по общей физической подготовке · Липецкая область', date:'7 ноября 2025', format:'jpg'},
  {id:'fitness-girls-third', title:'Общая физическая подготовка', group:'Девочки 2010–2012 г. р.', place:3, event:'Турнир по общей физической подготовке · Липецкая область', date:'7 ноября 2025', format:'jpg'},
  {id:'fitness-boys-third', title:'Общая физическая подготовка', group:'Мальчики 2013–2015 г. р.', place:3, event:'Турнир по общей физической подготовке · Липецкая область', date:'7 ноября 2025', format:'jpg'},
  {id:'esports', title:'Компьютерный спорт', group:'Команда школы №47 · CS 2', place:2, event:'«От пикселя до звезды» · тактический трёхмерный бой', date:'', format:'jpg'},
  {id:'small-olympics', title:'Малые Олимпийские игры', group:'Команда школы №47', place:2, event:'ДОЛ «Ёлочка» · вторая смена «Познай себя»', date:'Липецк · 2025', format:'pdf'},
  {id:'team-sports', title:'Игровые виды спорта', group:'Команда школы №47', place:3, event:'ДОЛ «Ёлочка» · первая смена «Калейдоскоп профессий»', date:'Липецк · 2025', format:'pdf'},
  {id:'exercise-game', title:'Сила в зарядке!', group:'Команда школы №47', place:3, event:'ДОЛ «Ёлочка» · третья смена «Профессии и праздники»', date:'Липецк · 2025', format:'pdf'}
];
function awardAsset(award, suffix) { return 'assets/awards/' + award.id + suffix; }
function awardAlt(award) { return 'Грамота: ' + award.title + ', ' + award.group + ', ' + award.place + ' место'; }
function renderAwards() {
  return '<div class="awards-heading"><div><span class="scene-hand">за каждой наградой — общая работа</span><h2 class="scene-title">Наши достижения</h2></div></div>' +
    '<p class="awards-intro">Победы команды и личные результаты. Нажмите на грамоту, чтобы рассмотреть её и прочитать подробности.</p>' +
    '<div class="award-grid real-awards">' + clubAwards.map((award,index) =>
      '<button class="award-card real-award" data-award="'+index+'" aria-label="Открыть: '+awardAlt(award)+'">'+
      '<div class="award-preview real-award-preview"><img src="'+awardAsset(award,'-thumb.webp')+'" alt="'+awardAlt(award)+'" width="550" height="680" loading="lazy" decoding="async"><span class="award-open">Рассмотреть ↗</span></div>'+
      '<div class="award-caption"><span class="award-place place-'+award.place+'">'+award.place+' место</span><h3>'+award.title+'</h3><p>'+award.group+'</p><small>'+ (award.date || '«От пикселя до звезды»') +'</small></div></button>'
    ).join('')+'</div>';
}
function awardPanelHTML(index) {
  const award=clubAwards[index];
  return '<span class="panel-tag">НАШИ ДОСТИЖЕНИЯ · '+award.place+' МЕСТО</span>'+
    '<h2 id="panel-title">'+award.title+'</h2><p class="award-detail">'+award.group+'<br>'+award.event+(award.date?'<br>'+award.date:'')+'</p>'+
    '<div class="award-reader-controls"><button type="button" data-award-step="-1" aria-label="Предыдущая награда">← Назад</button><span aria-live="polite">'+(index+1)+' из '+clubAwards.length+'</span><button type="button" data-award-step="1" aria-label="Следующая награда">Дальше →</button></div>'+
    '<div class="award-original-links"><a href="'+awardAsset(award,'.'+award.format)+'" target="_blank" rel="noopener">Открыть оригинал ('+award.format.toUpperCase()+') ↗</a><a href="'+awardAsset(award,'.'+award.format)+'" download>Скачать</a></div>'+
    '<a class="award-scan-link" href="'+awardAsset(award,'.webp')+'" target="_blank" rel="noopener" aria-label="Открыть скан в полном размере"><img class="award-full-scan" src="'+awardAsset(award,'.webp')+'" alt="'+awardAlt(award)+'"></a>';
}
