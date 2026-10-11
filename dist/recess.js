/* A small game, independent of the club-section prototype. */
(() => {
  const board = document.querySelector('.recess-board');
  const ball = board.querySelector('.ball');
  const seven = board.querySelector('.digit-seven');
  const four = board.querySelector('.digit-four');
  const svg = board.querySelector('.play-route');
  const guides = [...svg.querySelectorAll('.route-guide path')];
  const trails = [...svg.querySelectorAll('.route-trail path')];
  const trailGroup = svg.querySelector('.route-trail');
  const dust = svg.querySelector('.route-dust');
  const target = board.querySelector('.goal-target');
  const net = board.querySelector('.goal-drawing');
  const shout = board.querySelector('.goal-shout');
  const score = board.querySelector('.goal-score b');
  const scoreOutput = board.querySelector('.goal-score');
  const instruction = board.querySelector('.pass-count');
  const eraser = board.querySelector('.board-eraser');
  const basketball = board.querySelector('.basketball-prop img');
  const memo = board.querySelector('.turn-note > span');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let goals = 0, flying = false, frame = 0, generation = 0, start, lengths;
  const timers = new Set();
  const later = (fn, ms) => {
    const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
    timers.add(id);
  };
  function cancelEffects() {
    cancelAnimationFrame(frame);
    timers.forEach(clearTimeout); timers.clear();
    [ball, seven, net, shout, trailGroup, dust, basketball, memo, eraser.querySelector('.eraser-body')].filter(Boolean).forEach(el => el.getAnimations().forEach(a => a.cancel()));
  }
  function count() {
    score.textContent = String(goals).padStart(2, '0');
    scoreOutput.setAttribute('aria-label', 'Забито голов: ' + goals);
  }
  function readyText() {
    instruction.innerHTML = '<span class="pointer-instruction">Нажми на мяч</span><span class="touch-instruction">Коснись мяча</span>';
  }
  function layout() {
    const r = board.getBoundingClientRect();
    const x0 = r.left + board.clientLeft, y0 = r.top + board.clientTop;
    const box = el => { const b = el.getBoundingClientRect(); return {x:b.left-x0,y:b.top-y0,w:b.width,h:b.height}; };
    const b = box(ball), d = box(seven), f = box(four), g = box(target);
    const w = board.clientWidth, h = board.clientHeight;
    const compact = w < 650;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    start = {x:b.x+b.w/2,y:b.y+b.h/2};
    const hit = {x:d.x+d.w*.49,y:d.y+d.h*.62};
    const goal = {x:g.x,y:g.y};
    const lx = Math.max(39, f.x - (compact ? 20 : 54));
    const ly = f.y + f.h*.46;
    const first = 'M'+start.x+' '+start.y+
      ' C'+(start.x-w*.12)+' '+(start.y+18)+' '+lx+' '+(ly+115)+' '+lx+' '+ly+
      ' C'+lx+' '+(ly-95)+' '+(lx+w*.20)+' '+(ly-113)+' '+(lx+w*.20)+' '+(ly-19)+
      ' C'+(lx+w*.20)+' '+(ly+67)+' '+(lx+w*.05)+' '+(ly+43)+' '+(lx+w*.09)+' '+(ly-14)+
      // Reflect the previous control point so the loop exit has a continuous tangent.
      ' C'+(lx+w*.13)+' '+(ly-71)+' '+(hit.x-55)+' '+(hit.y-87)+' '+hit.x+' '+hit.y;
    const last = 'M'+hit.x+' '+hit.y+' Q'+(hit.x+(goal.x-hit.x)*.61)+' '+(Math.min(hit.y,goal.y)-(compact?42:75))+' '+goal.x+' '+goal.y;
    guides[0].setAttribute('d', first); guides[1].setAttribute('d', last);
    trails[0].setAttribute('d', first); trails[1].setAttribute('d', last);
    lengths = guides.map(p => p.getTotalLength());
    trails.forEach((p,i) => { p.style.strokeDasharray = lengths[i]; p.style.strokeDashoffset = lengths[i]; });
  }
  function reset(animate = true) {
    generation++; flying = false; cancelEffects();
    ball.disabled = false; ball.removeAttribute('aria-busy');
    ball.style.transform = ''; ball.style.opacity = '';
    shout.style.opacity = '0'; dust.style.opacity = '0';
    goals = 0; count(); readyText();
    if (animate && !motion.matches) {
      trailGroup.animate([{opacity:1,clipPath:'inset(0 0 0 0)'},{opacity:0,clipPath:'inset(0 0 0 100%)'}],{duration:460,fill:'forwards'});
      eraser.querySelector('.eraser-body').animate([
        {transform:'translateX(0) rotate(10deg)'},{transform:'translateX(-22px) rotate(-9deg)'},
        {transform:'translateX(12px) rotate(7deg)'},{transform:'translateX(0) rotate(10deg)'}
      ],{duration:470});
      later(() => { trailGroup.style.opacity='0'; layout(); },480);
    } else {
      trailGroup.style.opacity='0'; layout();
    }
  }
  function scatter() {
    dust.replaceChildren();
    for (let i=0;i<26;i++) {
      const route = i<18?0:1, len = lengths[route]*((i*0.137)%1), p = guides[route].getPointAtLength(len);
      const speck = document.createElementNS('http://www.w3.org/2000/svg','circle');
      speck.setAttribute('cx',p.x+(i%3-1)*3); speck.setAttribute('cy',p.y);
      speck.setAttribute('r',i%4===0?1.8:.9); dust.append(speck);
    }
    dust.animate([{opacity:.7,transform:'translateY(0)'},{opacity:0,transform:'translateY(18px)'}],{duration:1250,fill:'forwards'});
    trailGroup.animate([{opacity:1},{opacity:0}],{duration:1100,fill:'forwards'});
  }
  function finish(id) {
    if (id !== generation) return;
    goals++; count();
    instruction.textContent = 'Ещё один?';
    if (motion.matches) {
      ball.style.transform=''; ball.disabled=false; ball.removeAttribute('aria-busy'); flying=false;
      shout.style.opacity='1'; return;
    }
    shout.animate([{opacity:0,transform:'rotate(-15deg) scale(.7)'},{opacity:1,transform:'rotate(-9deg) scale(1.1)',offset:.15},{opacity:1,transform:'rotate(-12deg) scale(1)',offset:.77},{opacity:0,transform:'rotate(-12deg) scale(1)'}],{duration:1800});
    net.animate([{transform:'scale(1)'},{transform:'scale(.95,1.05) skewX(3deg)'},{transform:'scale(1.02,.98)'},{transform:'scale(1)'}],{duration:550});
    later(scatter,550);
    later(() => {
      ball.style.opacity='0'; ball.style.transform='';
      ball.animate([{opacity:0,transform:'scale(.75)'},{opacity:1,transform:'scale(1)'}],{duration:270});
      ball.style.opacity=''; ball.disabled=false; ball.removeAttribute('aria-busy'); flying=false;
    },420);
  }
  ball.addEventListener('click', () => {
    if (flying) return;
    cancelEffects(); generation++; const id=generation;
    ball.style.transform=''; ball.style.opacity=''; layout();
    flying=true; ball.disabled=true; ball.setAttribute('aria-busy','true');
    shout.style.opacity='0'; dust.style.opacity='0'; trailGroup.style.opacity='1';
    instruction.textContent='Через семёрку…';
    if (motion.matches) {
      trails.forEach(p => p.style.strokeDashoffset='0'); finish(id); return;
    }
    memo?.animate([{transform:'perspective(400px) rotateX(0)'},{transform:'perspective(400px) rotateX(-9deg)',offset:.45},{transform:'perspective(400px) rotateX(0)'}],{duration:700,delay:1050,easing:'ease-in-out'});
    let t0, bounced=false;
    function tick(now) {
      if (id!==generation) return;
      if (t0===undefined) t0=now;
      const t=Math.min(1,(now-t0)/2350), route=t<.72?0:1;
      const progress=route===0?t/.72:(t-.72)/.28;
      const p=guides[route].getPointAtLength(lengths[route]*progress);
      const shrink=t<.88?1:1-(t-.88)/.12*.5;
      ball.style.transform='translate('+(p.x-start.x)+'px,'+(p.y-start.y)+'px) rotate('+(t*850)+'deg) scale('+shrink+')';
      trails[0].style.strokeDashoffset=lengths[0]*(route===0?1-progress:0);
      trails[1].style.strokeDashoffset=lengths[1]*(route===1?1-progress:1);
      if (route===1 && !bounced) {
        bounced=true;
        seven.animate([{transform:'rotate(0)'},{transform:'rotate(8deg) translateY(-4px)',offset:.28},{transform:'rotate(-4deg)',offset:.63},{transform:'rotate(0)'}],{duration:560,easing:'ease-out'});
      }
      if(t<1) frame=requestAnimationFrame(tick); else finish(id);
    }
    frame=requestAnimationFrame(tick);
  });
  eraser.addEventListener('click',()=>reset());
  let previousSize='';
  const observe = new ResizeObserver(() => {
    const size=board.clientWidth+'x'+board.clientHeight;
    if (size===previousSize) return;
    previousSize=size;
    if (flying) { generation++; flying=false; cancelEffects(); ball.disabled=false; ball.removeAttribute('aria-busy'); ball.style.transform=''; ball.style.opacity=''; readyText(); }
    trailGroup.style.opacity='0'; layout();
  });
  observe.observe(board);
  document.fonts.ready.then(() => { if(!flying)layout(); });
  motion.addEventListener('change',()=>reset(false));
  count(); readyText(); layout();
})();

