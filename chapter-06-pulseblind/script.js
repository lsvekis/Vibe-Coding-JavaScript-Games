
const cvs=document.getElementById('game'), ctx=cvs.getContext('2d'), logEl=document.getElementById('log');
const W=12,H=12,S=40; let maze=[], player={x:0,y:0}, goal={x:11,y:11}, pulsesLeft=8, steps=0, reveal=0;
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function newMaze(){maze=[]; for(let y=0;y<H;y++){const row=[]; for(let x=0;x<W;x++){row.push(Math.random()<0.24 && !(x===0&&y===0) && !(x===11&&y===11)?1:0)} maze.push(row)} player={x:0,y:0}; pulsesLeft=8; steps=0; reveal=2; draw(); log('A new dark maze forms.')}
function draw(){ctx.clearRect(0,0,cvs.width,cvs.height); for(let y=0;y<H;y++) for(let x=0;x<W;x++){const dist=Math.abs(x-player.x)+Math.abs(y-player.y); if(dist<=reveal){ctx.fillStyle=maze[y][x]?'#1e293b':'#0f172a'; ctx.fillRect(x*S,y*S,S-2,S-2); if(x===goal.x&&y===goal.y){ctx.fillStyle='#22c55e'; ctx.fillRect(x*S+10,y*S+10,20,20)}} else {ctx.fillStyle='#020617'; ctx.fillRect(x*S,y*S,S-2,S-2)}}
ctx.fillStyle='#7dd3fc'; ctx.beginPath(); ctx.arc(player.x*S+20,player.y*S+20,11,0,Math.PI*2); ctx.fill(); pulses.textContent=pulsesLeft; stepsEl.textContent=steps}
function move(dx,dy){const nx=player.x+dx, ny=player.y+dy; if(nx<0||ny<0||nx>=W||ny>=H||maze[ny][nx]) return; player.x=nx; player.y=ny; steps++; reveal=Math.max(1,reveal-0.25); if(nx===goal.x&&ny===goal.y){log(`Goal reached in ${steps} steps.`)} draw()}
document.addEventListener('keydown',e=>{if(e.key==='ArrowUp')move(0,-1); if(e.key==='ArrowDown')move(0,1); if(e.key==='ArrowLeft')move(-1,0); if(e.key==='ArrowRight')move(1,0)})
document.getElementById('pulse').onclick=()=>{if(pulsesLeft<=0)return; pulsesLeft--; reveal=3.5; draw(); log('Pulse reveals nearby walls.')}
document.getElementById('reset').onclick=newMaze; const pulses=document.getElementById('pulses'), stepsEl=document.getElementById('steps'); newMaze()
