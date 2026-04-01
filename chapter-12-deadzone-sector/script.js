
const cvs=document.getElementById('game'), ctx=cvs.getContext('2d'), logEl=document.getElementById('log');
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
let player, bullets, enemies, keys={}, score=0,lives=3,wave=1,cool=0;
function reset(){player={x:320,y:360,r:12,s:4}; bullets=[]; enemies=[]; score=0;lives=3;wave=1; spawnWave(); log('Sector armed.')}
function spawnWave(){for(let i=0;i<4+wave;i++) enemies.push({x:40+Math.random()*560,y:20+Math.random()*120,r:12,vy:.3+Math.random()*.4+wave*.05,hp:1+Math.floor(wave/3)}); log(`Wave ${wave} incoming.`)}
function tick(){
if(keys['ArrowLeft']||keys['a']) player.x-=player.s; if(keys['ArrowRight']||keys['d']) player.x+=player.s; if(keys['ArrowUp']||keys['w']) player.y-=player.s; if(keys['ArrowDown']||keys['s']) player.y+=player.s;
player.x=Math.max(14,Math.min(626,player.x)); player.y=Math.max(14,Math.min(406,player.y));
if((keys[' ']||keys['Space'])&&cool<=0){bullets.push({x:player.x,y:player.y-14,vy:-6}); cool=10}
cool--;
bullets.forEach(b=>b.y+=b.vy); bullets=bullets.filter(b=>b.y>-20);
enemies.forEach(e=>e.y+=e.vy);
for(const b of bullets){for(const e of enemies){if(Math.hypot(b.x-e.x,b.y-e.y)<e.r+4){e.hp--; b.y=-100; if(e.hp<=0){e.dead=true; score+=10}}}}
enemies=enemies.filter(e=>!e.dead);
for(const e of enemies){if(Math.hypot(player.x-e.x,player.y-e.y)<e.r+player.r || e.y>440){lives--; e.dead=true; log(`Hit taken. Lives ${lives}.`)}}
enemies=enemies.filter(e=>!e.dead);
if(lives<=0){log('Ship destroyed. Restarting.'); reset()}
if(!enemies.length){wave++; spawnWave()}
draw(); requestAnimationFrame(tick)}
function draw(){ctx.clearRect(0,0,640,420); ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,640,420); ctx.fillStyle='#7dd3fc'; ctx.beginPath(); ctx.arc(player.x,player.y,player.r,0,Math.PI*2); ctx.fill();
ctx.fillStyle='#fde047'; bullets.forEach(b=>ctx.fillRect(b.x-2,b.y-8,4,10)); ctx.fillStyle='#fb7185'; enemies.forEach(e=>{ctx.beginPath(); ctx.arc(e.x,e.y,e.r,0,Math.PI*2); ctx.fill()}); scoreEl.textContent=score; livesEl.textContent=lives; waveEl.textContent=wave}
document.addEventListener('keydown',e=>keys[e.key]=true); document.addEventListener('keyup',e=>keys[e.key]=false);
const scoreEl=document.getElementById('score'), livesEl=document.getElementById('lives'), waveEl=document.getElementById('wave'); reset(); tick()
