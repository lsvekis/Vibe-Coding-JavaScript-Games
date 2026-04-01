
const cvs=document.getElementById('game'),ctx=cvs.getContext('2d'),logEl=document.getElementById('log'); let best=+(localStorage.getItem('inversionRunBest')||0);
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
let p,obs,gravity,score;
function reset(){p={x:90,y:220,vy:0,r:10}; gravity=.35; obs=[]; score=0; log('Run restarted.')}
function spawn(){obs.push({x:660,y:Math.random()<.5?230:20,w:20,h:30})}
function tick(){ctx.clearRect(0,0,640,260); ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,640,260); ctx.fillStyle='#1f2937'; ctx.fillRect(0,240,640,20); ctx.fillRect(0,0,640,20);
if(Math.random()<.03) spawn(); p.vy+=gravity; p.y+=p.vy; if(p.y>230) {p.y=230;p.vy=0} if(p.y<30){p.y=30;p.vy=0}
obs.forEach(o=>o.x-=5); obs=obs.filter(o=>o.x>-30); ctx.fillStyle='#fb7185'; obs.forEach(o=>ctx.fillRect(o.x,o.y,o.w,o.h));
ctx.fillStyle='#7dd3fc'; ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fill();
for(const o of obs){ if(p.x+10>o.x&&p.x-10<o.x+o.w&&p.y+10>o.y&&p.y-10<o.y+o.h){best=Math.max(best,Math.floor(score));localStorage.setItem('inversionRunBest',best); log(`Crash at ${Math.floor(score)}.`); reset()}}
score+=.1; dist.textContent=Math.floor(score); bestEl.textContent=best; requestAnimationFrame(tick)}
document.addEventListener('keydown',e=>{if(e.key===' '){gravity*=-1; p.vy=-p.vy; log('Gravity inverted.')}})
const dist=document.getElementById('dist'),bestEl=document.getElementById('best'); reset(); tick()
