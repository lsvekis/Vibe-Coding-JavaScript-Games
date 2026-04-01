
const key='ironwakeTraderV1';
const ports=['Driftbay','Saltreach','Brass Harbor','Frost Quay','Sunwake'];
const goods=['Spice','Silk','Timber','Iron','Medicine','Gems'];
let state=JSON.parse(localStorage.getItem(key)||'null')||{gold:300,port:0,hull:12,cannons:1,cargoMax:10,cargo:{Spice:0,Silk:0,Timber:0,Iron:0,Medicine:0,Gems:0},prices:{}};
const $=id=>document.getElementById(id), logEl=$('log');
function save(){localStorage.setItem(key,JSON.stringify(state))}
function log(t){logEl.innerHTML=`<div>${t}</div>`+logEl.innerHTML}
function usedCargo(){return Object.values(state.cargo).reduce((a,b)=>a+b,0)}
function genPrices(){const p={}; for(const g of goods){let base={Spice:20,Silk:28,Timber:12,Iron:16,Medicine:25,Gems:45}[g]; p[g]=Math.max(4, base + Math.floor(Math.random()*18)-6 + state.port*2)} state.prices=p}
if(!Object.keys(state.prices).length) genPrices();
function render(){gold.textContent=state.gold;portName.textContent=ports[state.port];hull.textContent=state.hull;cannons.textContent=state.cannons;cargoSpace.textContent=state.cargoMax;usedCargo.textContent=usedCargo();
market.innerHTML='<tr><th>Good</th><th>Price</th><th>Owned</th></tr>'+goods.map(g=>`<tr><td>${g}</td><td>${state.prices[g]}</td><td>${state.cargo[g]}</td></tr>`).join('');
goodSelect.innerHTML=goods.map(g=>`<option>${g}</option>`).join('');
cargoList.innerHTML='<strong>Cargo Hold</strong><br>'+goods.map(g=>`${g}: ${state.cargo[g]}`).join('<br>');
}
function pirateAttack(){const pirate=Math.random()<0.45; if(!pirate)return; let enemy=1+Math.floor(Math.random()*3); log(`Pirates attack with strength ${enemy}!`);
const power=state.cannons+Math.floor(Math.random()*3); if(power>=enemy){const loot=10+Math.floor(Math.random()*25); state.gold+=loot; log(`You repel them and salvage ${loot} gold.`)}
else{const dmg=1+enemy-power; state.hull-=dmg; const lossGood=goods.find(g=>state.cargo[g]>0); if(lossGood) state.cargo[lossGood]=Math.max(0,state.cargo[lossGood]-1); log(`They breach the hull for ${dmg} damage and steal cargo.`); if(state.hull<=0){state.gold=Math.max(80,Math.floor(state.gold*.5)); state.hull=6; for(const g of goods) state.cargo[g]=0; log('Your ship nearly sinks. Emergency tow to port costs dearly.')}}}
buy.onclick=()=>{const g=goodSelect.value,q=Math.max(1,+qty.value||1),cost=state.prices[g]*q; if(state.gold<cost)return log('Not enough gold.'); if(usedCargo()+q>state.cargoMax)return log('Not enough cargo space.'); state.gold-=cost; state.cargo[g]+=q; save(); render(); log(`Bought ${q} ${g}.`)}
sell.onclick=()=>{const g=goodSelect.value,q=Math.max(1,+qty.value||1); if(state.cargo[g]<q)return log('Not enough goods to sell.'); const amt=state.prices[g]*q; state.cargo[g]-=q; state.gold+=amt; save(); render(); log(`Sold ${q} ${g} for ${amt} gold.`)}
travel.onclick=()=>{state.port=(state.port+1+Math.floor(Math.random()*(ports.length-1)))%ports.length; genPrices(); pirateAttack(); save(); render(); log(`Reached ${ports[state.port]}. Market prices shifted.`)}
repair.onclick=()=>{const cost=(12-state.hull)*8; if(cost<=0)return log('Hull is already strong.'); if(state.gold<cost)return log('Not enough gold to repair.'); state.gold-=cost; state.hull=12; save(); render(); log(`Hull repaired for ${cost}.`)}
upgrade.onclick=()=>{const cost=100+state.cannons*60; if(state.gold<cost)return log('Not enough gold for upgrades.'); state.gold-=cost; state.cannons+=1; state.cargoMax+=4; state.hull+=2; save(); render(); log(`Ship upgraded: +1 cannons, +4 cargo, +2 hull for ${cost}.`)}
render(); log('New voyage begins.')
