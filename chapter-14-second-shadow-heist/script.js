
let ghost=[], path=[], loop=1, player={x:0,y:0}, keyPos={x:6,y:1}, goal={x:7,y:7}, gotKey=false, step=0;
const walls=new Set(['2,0','2,1','2,2','4,3','5,3','1,5','2,5','3,5','6,6']);
const logEl=document.getElementById('log');
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function reset(full=false){if(full){ghost=[];loop=1} else {ghost=path.slice();loop++} path=[]; player={x:0,y:0}; gotKey=false; step=0; render()}
function move(dx,dy){const nx=player.x+dx, ny=player.y+dy; if(nx<0||ny<0||nx>7||ny>7||walls.has(nx+','+ny)) return; player={x:nx,y:ny}; path.push(`${nx},${ny}`); step++;
if(ghost[step-1]===`${nx},${ny}`){log('Caught by your shadow from the previous loop.'); reset()}
if(nx===keyPos.x&&ny===keyPos.y){gotKey=true}
if(nx===goal.x&&ny===goal.y&&gotKey){log(`Vault opened on loop ${loop}.`); reset(true)}
render()}
function render(){loopNo.textContent=loop; status.textContent=gotKey?'Key acquired':'Need key'; board.innerHTML=''; for(let y=0;y<8;y++)for(let x=0;x<8;x++){const b=document.createElement('div'); b.className='tile revealed'; let txt=''; if(walls.has(x+','+y)) txt='■'; else if(ghost[step]===`${x},${y}`) txt='☠'; else if(player.x===x&&player.y===y) txt='🕵'; else if(!gotKey&&keyPos.x===x&&keyPos.y===y) txt='🔑'; else if(goal.x===x&&goal.y===y) txt='⬢'; else txt='·'; b.textContent=txt; board.appendChild(b)}}
document.addEventListener('keydown',e=>{if(e.key==='ArrowUp')move(0,-1);if(e.key==='ArrowDown')move(0,1);if(e.key==='ArrowLeft')move(-1,0);if(e.key==='ArrowRight')move(1,0)})
restart.onclick=()=>reset(true); render(); log('Heist begins.')
