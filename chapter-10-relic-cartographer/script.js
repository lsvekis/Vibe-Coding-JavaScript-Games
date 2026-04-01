
const boardEl = document.getElementById("board");
const bannerEl = document.getElementById("banner");
const logEl = document.getElementById("log");
const ui = {energy, relics, traps, revealed};
const SIZE = 10;
let state;
function logNote(text){const row=document.createElement("div");row.className="history-item";row.textContent=text;logEl.prepend(row);while(logEl.children.length>12)logEl.removeChild(logEl.lastChild)}
function buildMap(){const cells=[];for(let i=0;i<SIZE*SIZE;i++){let type="plain";if(i!==0&&i!==SIZE*SIZE-1){const r=Math.random();if(r<.10)type="relic";else if(r<.18)type="trap";else if(r<.28)type="mountain";else if(r<.35)type="cache"}cells.push({type,revealed:i===0})}cells[SIZE*SIZE-1].type="exit";return cells}
function newExpedition(){state={x:0,y:0,energy:24,relics:0,traps:0,pulseCharges:2,done:false,cells:buildMap()};bannerEl.className="result-banner neutral";bannerEl.textContent="A new map unfolds. Recover relics, manage energy, and reach extraction.";logEl.innerHTML="";logNote("New expedition prepared.");render()}
function idx(x,y){return y*SIZE+x}function cell(x,y){return state.cells[idx(x,y)]}
function reveal(x,y){const c=cell(x,y);if(!c.revealed)c.revealed=true}
function revealAround(x,y,radius=1){for(let dy=-radius;dy<=radius;dy++){for(let dx=-radius;dx<=radius;dx++){const nx=x+dx,ny=y+dy;if(nx>=0&&nx<SIZE&&ny>=0&&ny<SIZE)reveal(nx,ny)}}}
function move(dx,dy){if(!state||state.done)return;const nx=state.x+dx,ny=state.y+dy;if(nx<0||ny<0||nx>=SIZE||ny>=SIZE)return;let target=cell(nx,ny);let cost=target.type==="mountain"?2:1;state.energy-=cost;state.x=nx;state.y=ny;reveal(nx,ny);
if(target.type==="relic"){state.relics++;target.type="plain";bannerEl.className="result-banner win";bannerEl.textContent="Relic recovered. The map reveals a little more of its story.";logNote("Recovered an ancient relic.")}
else if(target.type==="trap"){state.traps++;state.energy-=2;target.type="plain";bannerEl.className="result-banner lose";bannerEl.textContent="Trap triggered. The expedition loses precious energy.";logNote("Triggered a hidden trap.")}
else if(target.type==="cache"){state.energy=Math.min(24,state.energy+4);target.type="plain";bannerEl.className="result-banner win";bannerEl.textContent="Supply cache found. Energy restored.";logNote("Found a supply cache.")}
else if(target.type==="exit"){if(state.relics>=3){state.done=true;bannerEl.className="result-banner win";bannerEl.textContent=`Extraction successful. You escaped with ${state.relics} relics.`;logNote("Reached extraction with enough relics.")}else{bannerEl.className="result-banner neutral";bannerEl.textContent="Extraction found, but you need at least 3 relics.";}}
if(state.energy<=0&&!state.done){state.done=true;state.energy=0;bannerEl.className="result-banner lose";bannerEl.textContent="The expedition fails. You ran out of energy in the field.";logNote("Expedition ended due to energy loss.")}render()}
function scoutPulse(){if(!state||state.done)return;if(state.pulseCharges<=0){bannerEl.className="result-banner neutral";bannerEl.textContent="No scout pulses remaining on this expedition.";return}state.pulseCharges--;revealAround(state.x,state.y,2);bannerEl.className="result-banner neutral";bannerEl.textContent="Scout pulse used. Nearby terrain and dangers become visible.";logNote("Used a scout pulse.");render()}
function render(){boardEl.innerHTML="";let revealedCount=0;for(let y=0;y<SIZE;y++){for(let x=0;x<SIZE;x++){const c=cell(x,y);const div=document.createElement("div");let cls="tile ";let label="";if(!c.revealed){cls+="fog";label=" "}else{revealedCount++;cls+=c.type;if(c.type==="plain")label="·";if(c.type==="mountain")label="▲";if(c.type==="relic")label="◆";if(c.type==="trap")label="✕";if(c.type==="cache")label="✚";if(c.type==="exit")label="⬢"}if(state.x===x&&state.y===y){cls+=" player";label="P"}div.className=cls;div.textContent=label;boardEl.appendChild(div)}}ui.energy.textContent=state.energy;ui.relics.textContent=state.relics;ui.traps.textContent=state.traps;ui.revealed.textContent=revealedCount}
document.addEventListener("keydown",e=>{if(e.key==="ArrowUp"||e.key==="w")move(0,-1);if(e.key==="ArrowDown"||e.key==="s")move(0,1);if(e.key==="ArrowLeft"||e.key==="a")move(-1,0);if(e.key==="ArrowRight"||e.key==="d")move(1,0)});
newMapBtn.addEventListener("click",newExpedition);pulseBtn.addEventListener("click",scoutPulse);newExpedition();
