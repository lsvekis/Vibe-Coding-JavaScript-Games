
const key='slotMachinePackV1';
const symbols=['🍒','🍋','🍊','🍇','⭐','7'];
let state=JSON.parse(localStorage.getItem(key)||'null')||{credits:100,bet:10,jackpot:500,lastWin:0};
const $=id=>document.getElementById(id), logEl=$('log');
function save(){localStorage.setItem(key,JSON.stringify(state))}
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function rnd(){return symbols[Math.floor(Math.random()*symbols.length)]}
function draw(){credits.textContent=state.credits;bet.textContent=state.bet;jackpot.textContent=state.jackpot;lastWin.textContent=state.lastWin;spin.disabled=state.credits<state.bet}
function payout(a,b,c){if(a==='⭐'&&b==='⭐'&&c==='⭐')return [state.bet*10,false];if(a==='7'&&b==='7'&&c==='7')return [state.bet*8,true];if(a===b&&b===c)return [state.bet*5,false];if(a===b||b===c||a===c)return [state.bet*2,false];return [0,false]}
async function animate(el,d){for(let i=0;i<10;i++){el.textContent=rnd();await new Promise(r=>setTimeout(r,d/10))}const f=rnd();el.textContent=f;return f}
spin.onclick=async()=>{if(state.credits<state.bet)return;state.credits-=state.bet;state.jackpot+=Math.max(5,Math.floor(state.bet*.25));state.lastWin=0;draw();
const a=await animate(r1,400), b=await animate(r2,600), c=await animate(r3,800); let [win,jp]=payout(a,b,c); if(jp){win+=state.jackpot; log(`JACKPOT on 7 7 7!`); state.jackpot=500}
state.credits+=win; state.lastWin=win; save(); draw(); log(`${a} ${b} ${c} → ${win>0?`won ${win}`:'no win'}`)}
plus.onclick=()=>{state.bet=Math.min(100, state.bet+5, state.credits); save(); draw()}
minus.onclick=()=>{state.bet=Math.max(5,state.bet-5); save(); draw()}
reset.onclick=()=>{state={credits:100,bet:10,jackpot:500,lastWin:0};save();draw();log('Reset game')}
draw(); log('Game ready')
