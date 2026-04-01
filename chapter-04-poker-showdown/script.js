
const key='pokerShowdownV1'; let state=JSON.parse(localStorage.getItem(key)||'null')||{chips:400,bet:20}; let deck=[], hand=[], hold=[false,false,false,false,false], phase='idle';
const $=id=>document.getElementById(id), logEl=$('log');
function save(){localStorage.setItem(key,JSON.stringify(state))}
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function mkDeck(){const suits=['♠','♥','♦','♣'], vals=['2','3','4','5','6','7','8','9','10','J','Q','K','A']; deck=[]; for(const s of suits){for(const v of vals)deck.push({v,s})} for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}}
function dealHand(){mkDeck(); hand=[]; hold=[false,false,false,false,false]; for(let i=0;i<5;i++) hand.push(deck.pop())}
function val(c){return {'J':11,'Q':12,'K':13,'A':14}[c.v]||+c.v}
function counts(){const m={}; hand.forEach(c=>m[c.v]=(m[c.v]||0)+1); return Object.values(m).sort((a,b)=>b-a)}
function isFlush(){return hand.every(c=>c.s===hand[0].s)}
function isStraight(){const arr=hand.map(val).sort((a,b)=>a-b); let ok=true; for(let i=1;i<arr.length;i++) if(arr[i]!==arr[0]+i) ok=false; if(ok) return true; return JSON.stringify(arr)==JSON.stringify([2,3,4,5,14])}
function rankHand(){const cnt=counts(), flush=isFlush(), straight=isStraight(), vals=hand.map(val).sort((a,b)=>a-b); const high=Math.max(...vals);
if(straight&&flush&&high===14) return ['Royal Flush',250];
if(straight&&flush) return ['Straight Flush',50];
if(cnt[0]===4) return ['Four of a Kind',25];
if(cnt[0]===3&&cnt[1]===2) return ['Full House',9];
if(flush) return ['Flush',6];
if(straight) return ['Straight',4];
if(cnt[0]===3) return ['Three of a Kind',3];
if(cnt[0]===2&&cnt[1]===2) return ['Two Pair',2];
if(cnt[0]===2){const pairVal=Object.entries(hand.reduce((m,c)=>(m[c.v]=(m[c.v]||0)+1,m),{})).find(([k,v])=>v===2)[0]; if(['J','Q','K','A'].includes(pairVal)) return ['Jacks or Better',1];}
return ['No Win',0]}
function render(){chips.textContent=state.chips;bet.textContent=state.bet; handEl=document.getElementById('hand'); handEl.innerHTML=''; hand.forEach((c,i)=>{const d=document.createElement('div'); d.className='playing-card'; d.innerHTML=`${c.v}${c.s}<div style="font-size:.72rem;margin-top:6px">${hold[i]?'HOLD':''}</div>`; d.onclick=()=>{if(phase==='drawReady'){hold[i]=!hold[i]; render()}}; handEl.appendChild(d)}); draw.disabled=phase!=='drawReady'; deal.disabled=phase==='drawReady'}
deal.onclick=()=>{ if(state.chips<state.bet)return log('Not enough chips.'); state.chips-=state.bet; dealHand(); phase='drawReady'; save(); render(); const [name]=rankHand(); rank.textContent='Hand: '+name; log('Cards dealt. Select holds, then draw.')}
draw.onclick=()=>{ for(let i=0;i<5;i++) if(!hold[i]) hand[i]=deck.pop(); const [name,multi]=rankHand(); const payout=state.bet*(multi+1); if(multi>0){state.chips+=payout; log(`${name}! Payout ${payout}.`)} else log('No payout.'); rank.textContent='Hand: '+name; phase='idle'; save(); render()}
plus.onclick=()=>{state.bet=Math.min(state.chips, state.bet+10); save(); render()}
minus.onclick=()=>{state.bet=Math.max(10,state.bet-10); save(); render()}
render(); log('Video poker ready.')
