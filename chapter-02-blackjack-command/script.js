
const key='blackjackCommandV1'; let state=JSON.parse(localStorage.getItem(key)||'null')||{chips:300,bet:25};
let deck=[], player=[], dealer=[], inRound=false;
const $=id=>document.getElementById(id), logEl=$('log');
function save(){localStorage.setItem(key,JSON.stringify(state))}
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function makeDeck(){const suits=['♠','♥','♦','♣'], vals=['A','2','3','4','5','6','7','8','9','10','J','Q','K']; deck=[]; for(const s of suits){for(const v of vals)deck.push({v,s})} for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}}
function drawCard(arr){if(!deck.length)makeDeck(); arr.push(deck.pop())}
function val(hand){let t=0,a=0; for(const c of hand){if(c.v==='A'){a++; t+=11}else if(['K','Q','J'].includes(c.v)) t+=10; else t+=+c.v} while(t>21&&a){t-=10;a--} return t}
function renderCards(el,hand,hide=false){el.innerHTML=''; hand.forEach((c,i)=>{const d=document.createElement('div'); d.className='playing-card'; d.textContent=(hide&&i===0&&inRound)?'🂠':c.v+c.s; el.appendChild(d)})}
function render(){chips.textContent=state.chips; bet.textContent=state.bet; playerScore.textContent=`(${val(player)})`; dealerScore.textContent=inRound?`(${dealer.length>1?valueVisible():0})`:`(${val(dealer)})`; renderCards(playerCards,player); renderCards(dealerCards,dealer,true); hit.disabled=stand.disabled=!inRound; deal.disabled=inRound; betPlus.disabled=betMinus.disabled=inRound}
function valueVisible(){ if(!dealer.length) return 0; return val(dealer.slice(1));}
function settle(msg,delta){inRound=false; state.chips+=delta; save(); render(); log(msg)}
deal.onclick=()=>{ if(state.chips<state.bet)return log('Not enough chips.'); makeDeck(); player=[]; dealer=[]; inRound=true; state.chips-=state.bet; drawCard(player);drawCard(dealer);drawCard(player);drawCard(dealer); render(); log('New hand dealt.'); if(val(player)===21){const dv=val(dealer); if(dv===21) settle('Push on blackjack.', state.bet); else settle('Blackjack! Paid 3:2.', Math.floor(state.bet*2.5));}}
hit.onclick=()=>{drawCard(player); render(); const pv=val(player); if(pv>21) settle(`Bust at ${pv}.`,0)}
stand.onclick=()=>{ while(val(dealer)<17) drawCard(dealer); const pv=val(player), dv=val(dealer); render(); if(dv>21||pv>dv) settle(`Player wins ${pv} vs ${dv}.`, state.bet*2); else if(pv===dv) settle(`Push ${pv}-${dv}.`, state.bet); else settle(`Dealer wins ${dv} vs ${pv}.`,0)}
betPlus.onclick=()=>{state.bet=Math.min(state.chips, state.bet+25); save(); render()}
betMinus.onclick=()=>{state.bet=Math.max(25, state.bet-25); save(); render()}
render(); log('Table ready.')
