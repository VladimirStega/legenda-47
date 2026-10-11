/* Keep the decorative basketball tucked behind the four at every screen size. */
(() => {
  const board=document.querySelector('.sports-board');
  const ball=board?.querySelector('.basketball-prop');
  const four=board?.querySelector('.digit-four');
  if(!ball||!four)return;
  function placeBall(){
    const boardBox=board.getBoundingClientRect(),digit=four.getBoundingClientRect();
    const size=ball.offsetWidth;
    ball.style.left=(digit.left-boardBox.left-board.clientLeft+digit.width*.57-size/2)+'px';
    ball.style.top=(digit.top-boardBox.top-board.clientTop+size*.25-size/2)+'px';
    ball.style.transform='rotate(-16deg)';
    ball.style.zIndex='1';
    ball.dataset.scrollReady='';
  }
  const observer=new ResizeObserver(placeBall);
  observer.observe(board);observer.observe(four);
  window.addEventListener('resize',placeBall,{passive:true});
  document.fonts.ready.then(placeBall);
  placeBall();
})();
