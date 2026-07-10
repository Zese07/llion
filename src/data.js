// ============================================================
// WALLET DATA — Wallet shape normalization, CoinGecko price fetch/cache helpers
// ============================================================
function ensureCexTokenShape(t){
  if(!t || typeof t!=='object') return {id:uid(),sym:'TOKEN',name:'Token',qty:null,php:0,cgid:null};
  t.id=t.id||uid();
  const symSrc=String(t.sym||t.name||'').trim();
  t.sym=symSrc ? symSrc.toUpperCase() : 'TOKEN';
  t.name=String(t.name||t.sym||'Token').trim();
  const q=num(t.qty);
  t.qty=q!==null && q>=0 ? q : null;
  const p=num(t.php);
  t.php=p!==null && p>=0 ? p : 0;
  t.cgid=t.cgid||null;
  const legacy=num(t.amount);
  if(t.qty===null && legacy!==null && legacy>=0 && !Number.isFinite(num(t.manualPhp))) t.manualPhp=legacy;
  return t;
}

function cexTokenPrice(tok){
  if(tok?.cgid && Number.isFinite(CEXPRICES[tok.cgid])) return CEXPRICES[tok.cgid];
  const p=num(tok?.php);
  return p!==null && p>=0 ? p : 0;
}
function cexTokenTotal(tok){
  const q=num(tok?.qty);
  if(q!==null && q>=0) return q*cexTokenPrice(tok);
  const legacy=num(tok?.manualPhp ?? tok?.amount);
  return legacy!==null && legacy>=0 ? legacy : 0;
}

function sleep(ms){ return new Promise(resolve=>setTimeout(resolve,ms)); }

function getCgPriceCache(id){
  const e=CG_PRICE_CACHE[id];
  if(!e) return null;
  const px=num(e.usd ?? e.php);
  if(px===null || !Number.isFinite(e.ts)) return null;
  if(Date.now()-e.ts>CG_PRICE_TTL_MS) return null;
  return px;
}
function setCgPriceCache(id,php,skipFlush=false){
  if(!id || !Number.isFinite(php) || php<0) return;
  CG_PRICE_CACHE[id]={usd:php,ts:Date.now()};
  if(!skipFlush) localStorage.setItem('llion_cg_price_cache',JSON.stringify(CG_PRICE_CACHE));
}
function flushCgPriceCache(){
  localStorage.setItem('llion_cg_price_cache',JSON.stringify(CG_PRICE_CACHE));
}

async function fetchCgSimplePrices(ids){
  const uniq=[...new Set((ids||[]).filter(Boolean))];
  const out={};
  const missing=[];
  uniq.forEach(id=>{
    const cached=getCgPriceCache(id);
    if(cached!==null) out[id]=cached;
    else missing.push(id);
  });
  if(!missing.length) return out;

  let updated=false;
  for(let i=0;i<missing.length;i+=CG_BATCH_SIZE){
    if(i>0) await sleep(CG_CHUNK_DELAY_MS);
    const chunk=missing.slice(i,i+CG_BATCH_SIZE);
    const d=await cgFetchJson(`https://api.coingecko.com/api/v3/simple/price?ids=${chunk.join(',')}&vs_currencies=usd`);
    if(!d) continue;
    chunk.forEach(id=>{
      const php=num(d[id]?.usd);
      if(php!==null){
        out[id]=php;
        setCgPriceCache(id,php,true);
        updated=true;
      }
    });
  }
  if(updated) flushCgPriceCache();
  return out;
}

async function findCoinBySymbol(symbol){
  const list=await findCoinsBySymbol(symbol);
  return list[0]||null;
}

async function findCoinsBySymbol(symbol){
  const raw=String(symbol||'').trim();
  if(!raw) return [];
  const key=raw.toLowerCase();
  const mkey=`matches:${key}`;
  if(Array.isArray(CEX_SYMBOL_CACHE[mkey])){
    return CEX_SYMBOL_CACHE[mkey].map(c=>{
      const p=getCgPriceCache(c.id);
      return p!==null ? {...c,php:p} : c;
    });
  }
  const data=await cgFetchJson(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(raw)}`);
  const coins=Array.isArray(data?.coins)?data.coins:[];
  const exact=coins.filter(c=>String(c.symbol||'').toLowerCase()===key);
  const starts=coins.filter(c=>String(c.symbol||'').toLowerCase().startsWith(key));
  const pickList=(exact.length?exact:starts.length?starts:coins).slice(0,8);

  if(!pickList.length || !pickList[0]?.id){
    const fb=fallbackPriceForSymbol(raw);
    if(!fb) return [];
    const out={id:`sym:${key}`,name:raw.toUpperCase(),sym:raw.toUpperCase(),php:fb};
    setCgSymbolCache(mkey,[out]);
    return [out];
  }

  const ids=pickList.map(c=>c.id).filter(Boolean);
  const pmap=await fetchCgSimplePrices(ids);
  const out=pickList.map(c=>{
    const sym=String(c.symbol||raw).toUpperCase();
    const php=pmap[c.id]||fallbackPriceForSymbol(sym)||0;
    if(Number.isFinite(php)) CEXPRICES[c.id]=php;
    return {id:c.id,name:c.name||sym,sym,php};
  }).sort((a,b)=>(b.php>0?1:0)-(a.php>0?1:0));
  setCgSymbolCache(mkey,out);
  return out;
}

function ensureCexWalletShape(wallet){
  if(wallet.type==='cex'){
    if(!Array.isArray(wallet.toks)) wallet.toks=[];
    wallet.toks=wallet.toks.map(ensureCexTokenShape);
    wallet.lucide=wallet.lucide||'building-2';
    return wallet;
  }
  if(wallet.type==='manual' && wallet.cat==='cex'){
    wallet.type='cex';
    wallet.lucide='building-2';
    wallet.toks=Array.isArray(wallet.toks)
      ? wallet.toks.map(ensureCexTokenShape)
      : [{id:uid(),sym:'BALANCE',name:'Balance',qty:null,php:0,manualPhp:wallet.amount||0,cgid:null}];
    delete wallet.cat;
    delete wallet.amount;
    return wallet;
  }
  return wallet;
}

function ensureManualWalletShape(wallet){
  if(!wallet || wallet.type!=='manual' || wallet.cat==='cex') return wallet;
  let currency=String(wallet.amountCurrency||'').toUpperCase();
  if(currency!=='USD' && currency!=='PHP') currency=displayCurrency==='PHP' ? 'PHP' : 'USD';
  let amountValue=num(wallet.amountValue);
  const legacyBase=num(wallet.amount);
  if(amountValue===null || amountValue<0){
    amountValue=legacyBase!==null && legacyBase>=0 ? baseToCurrency(legacyBase,currency) : 0;
  }
  wallet.amountCurrency=currency;
  wallet.amountValue=amountValue;
  wallet.amount=currencyToBase(amountValue,currency);
  return wallet;
}

function ensureCryptoWalletShape(wallet){
  if(!wallet || wallet.type!=='crypto') return wallet;
  if(!Array.isArray(wallet.hiddenNetworks)) wallet.hiddenNetworks=[];
  wallet.hiddenNetworks=[...new Set(wallet.hiddenNetworks.map(n=>String(n||'').trim()).filter(Boolean))];
  return wallet;
}

function isWalletNetworkVisible(wallet,networkName){
  ensureCryptoWalletShape(wallet);
  const key=String(networkName||'').trim();
  if(!key) return true;
  return !(wallet.hiddenNetworks||[]).includes(key);
}

function visibleDexWalletTotal(wallet){
  const native=(wallet.nets||[])
    .filter(n=>isWalletNetworkVisible(wallet,n.chain))
    .reduce((sum,n)=>sum+(n.bal*(PRICES[n.sym]||0)),0);
  const tokens=(wallet.toks||[])
    .filter(t=>isWalletNetworkVisible(wallet,t.chain))
    .reduce((sum,t)=>sum+(t.bal*(TPRICES[t.addr]??t.php??0)),0);
  return native+tokens;
}

function manualAmountToBase(wallet){
  ensureManualWalletShape(wallet);
  return currencyToBase(wallet.amountValue,wallet.amountCurrency);
}

function normalizeAccountWallets(accountList){
  (accountList||[]).forEach((a,i)=>{
    if(!Array.isArray(a.wallets)) a.wallets=[];
    if(!a.color) a.color=ACC_COLORS[i%ACC_COLORS.length];
    a.wallets.forEach(w=>{
      ensureCexWalletShape(w);
      ensureManualWalletShape(w);
      ensureCryptoWalletShape(w);
    });
  });
}

normalizeAccountWallets(accounts);

function cexWalletTotal(wallet){
  return (wallet.toks||[]).reduce((sum,t)=>sum+cexTokenTotal(ensureCexTokenShape(t)),0);
}

function dexWalletTotal(wallet){
  const native=(wallet.nets||[]).reduce((sum,n)=>sum+(n.bal*(PRICES[n.sym]||0)),0);
  const tokens=(wallet.toks||[]).reduce((sum,t)=>sum+(t.bal*(TPRICES[t.addr]??t.php??0)),0);
  return native+tokens;
}

function shadeHex(hex,pct){
  const c=(hex||'').replace('#','');
  if(c.length!==6) return hex;
  const amt=Math.round(2.55*pct);
  const r=Math.min(255,Math.max(0,parseInt(c.slice(0,2),16)+amt));
  const g=Math.min(255,Math.max(0,parseInt(c.slice(2,4),16)+amt));
  const b=Math.min(255,Math.max(0,parseInt(c.slice(4,6),16)+amt));
  return `#${[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('')}`;
}

function setCgSymbolCache(key,val){
  CEX_SYMBOL_CACHE[key]=val;
  localStorage.setItem('llion_cg_symbol_cache',JSON.stringify(CEX_SYMBOL_CACHE));
}

function fallbackPriceForSymbol(symbol){
  const s=String(symbol||'').toUpperCase();
  const stable={USDT:1,USDC:1,DAI:1,BUSD:1,TUSD:1,USDE:1};
  if(Number.isFinite(stable[s])) return stable[s];
  const chain=CHAINS.find(c=>String(c.sym||'').toUpperCase()===s);
  if(chain && Number.isFinite(PRICES[chain.sym])) return PRICES[chain.sym];
  return 0;
}

async function cgFetchJson(url){
  const key=url;
  const cached=CG_JSON_CACHE.get(key);
  if(cached && cached.expiresAt>Date.now()) return cached.data;
  if(Date.now()<cgCooldownUntil) return null;

  const doFetch=async(target)=>{
    const r=await fetch(target,{signal:AbortSignal.timeout(12000)});
    if(r.status===429){
      cgCooldownUntil=Date.now()+CG_COOLDOWN_MS;
      return null;
    }
    if(!r.ok) return null;
    try{ return await r.json(); }catch{ return null; }
  };

  let data=null;
  try{ data=await doFetch(url); }catch{}

  if(data){
    CG_JSON_CACHE.set(key,{data,expiresAt:Date.now()+CG_CACHE_MS});
  }
  return data;
}


// ============================================================
// PNL CALC — PnL math: snapshot recording, baselines, day/week/month bucket calcs
// ============================================================
function localDateKey(dt){
  const d=dt||new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
function offsetDateKey(days){
  const d=new Date();
  d.setDate(d.getDate()-days);
  return localDateKey(d);
}
function accountSnapshotForPnl(){
  const snap={};
  accounts.forEach(acc=>{
    snap[String(acc.id)]=accValue(acc);
  });
  return snap;
}
function snapshotsEqual(a,b){
  if(!a || typeof a!=='object' || !b || typeof b!=='object') return false;
  const aKeys=Object.keys(a);
  const bKeys=Object.keys(b);
  if(aKeys.length!==bKeys.length) return false;
  for(const k of aKeys){
    if(!Object.prototype.hasOwnProperty.call(b,k)) return false;
    if(num(a[k])!==num(b[k])) return false;
  }
  return true;
}
function recordPnlPoint(total){
  const today=localDateKey();
  const nextAccountSnap=accountSnapshotForPnl();
  const prevTodaySnap=pnlAccountHistory[today];
  let dayOpenChanged=false;
  const hasDayOpen=pnlDayOpenAccountHistory[today] && typeof pnlDayOpenAccountHistory[today]==='object';
  if(!hasDayOpen){
    pnlDayOpenAccountHistory[today]=prevTodaySnap && typeof prevTodaySnap==='object' ? prevTodaySnap : nextAccountSnap;
    dayOpenChanged=true;
  }
  if(prevTodaySnap && !snapshotsEqual(prevTodaySnap,nextAccountSnap)){
    pnlLastChangeBase=prevTodaySnap;
    localStorage.setItem(PNL_LAST_CHANGE_BASE_KEY,JSON.stringify(pnlLastChangeBase));
  }
  const sameTotal=pnlHistory[today]===total;
  const sameSplit=snapshotsEqual(pnlAccountHistory[today],nextAccountSnap);
  if(sameTotal && sameSplit){
    if(dayOpenChanged) localStorage.setItem(PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlDayOpenAccountHistory));
    return;
  }
  pnlHistory[today]=total;
  pnlAccountHistory[today]=nextAccountSnap;
  const keys=Object.keys(pnlHistory);
  if(keys.length>450){
    keys.sort();
    while(keys.length>450){
      const k=keys.shift();
      if(k!==undefined){
        delete pnlHistory[k];
        delete pnlAccountHistory[k];
        delete pnlDayOpenAccountHistory[k];
      }
    }
  }
  localStorage.setItem('llion_pnl_history',JSON.stringify(pnlHistory));
  localStorage.setItem(PNL_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlAccountHistory));
  localStorage.setItem(PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlDayOpenAccountHistory));
}
function baselineForPeriod(targetKey,currentKey,sortedKeys){
  const keys=sortedKeys||Object.keys(pnlHistory).sort();
  if(!keys.length) return null;
  let candidate=null;
  keys.forEach(k=>{ if(k<=targetKey) candidate=k; });
  if(candidate!==null) return pnlHistory[candidate];
  const prev=[...keys].reverse().find(k=>k<currentKey);
  if(prev) return pnlHistory[prev];
  return null;
}
function pnlForDays(current,days,sortedKeys){
  const nowKey=localDateKey();
  const base=baselineForPeriod(offsetDateKey(days),nowKey,sortedKeys);
  if(!Number.isFinite(base)) return {hasBase:false,value:0,pct:0};
  const diff=current-base;
  const pct=base!==0?(diff/base*100):0;
  return {hasBase:true,value:diff,pct};
}

function keyToDate(key){
  const p=String(key||'').split('-');
  if(p.length!==3) return null;
  const y=Number(p[0]), m=Number(p[1]), d=Number(p[2]);
  if(!Number.isInteger(y)||!Number.isInteger(m)||!Number.isInteger(d)) return null;
  const dt=new Date(y,m-1,d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}
function fmtDateKey(key,withYear=false){
  const d=keyToDate(key);
  if(!d) return String(key||'--');
  return d.toLocaleDateString([],withYear?{month:'short',day:'numeric',year:'numeric'}:{month:'short',day:'numeric'});
}
function findSnapshotMetaOnOrBefore(targetKey,sortedKeys){
  let candidate=null;
  sortedKeys.forEach(k=>{ if(k<=targetKey) candidate=k; });
  if(candidate===null) return null;
  return {key:candidate,value:pnlHistory[candidate]};
}
function baselineMetaForPeriod(days,sortedKeys){
  const nowKey=localDateKey();
  const targetKey=offsetDateKey(days);
  const keys=sortedKeys||Object.keys(pnlHistory).sort();
  const meta=findSnapshotMetaOnOrBefore(targetKey,keys);
  if(meta) return meta;
  const prev=[...keys].reverse().find(k=>k<nowKey);
  if(prev) return {key:prev,value:pnlHistory[prev]};
  return null;
}
function currentPortfolioTotal(){
  return accounts.reduce((sum,acc)=>sum+accValue(acc),0);
}
function snapshotValueForKeyOrZero(key){
  const v=num(pnlHistory[key]);
  return v===null ? 0 : v;
}
function buildDailyPnlPoints(dayCount){
  const pts=[];
  for(let back=dayCount-1;back>=0;back--){
    const d=new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()-back);
    const key=localDateKey(d);
    pts.push({label:fmtDateKey(key),key,value:snapshotValueForKeyOrZero(key)});
  }
  return pts;
}
function buildWeeklyPnlPoints(sortedKeys){
  const keys=sortedKeys||Object.keys(pnlHistory).sort();
  const ranges=weeklyBucketRanges();
  return ranges.map(r=>{
    const snapKey=latestSnapshotInRange(keys,r.startKey,r.endKey);
    return {
      label:fmtDateKey(r.endKey),
      key:snapKey||r.endKey,
      value:snapKey ? snapshotValueForKeyOrZero(snapKey) : 0
    };
  });
}
function latestSnapshotInRange(sortedKeys,startKey,endKey){
  let candidate=null;
  sortedKeys.forEach(k=>{
    if(k>=startKey && k<=endKey) candidate=k;
  });
  return candidate;
}
function periodBaselineMeta(days,sortedKeys){
  if(days===7) return baselineMetaForPeriod(6,sortedKeys);   // today .. -6
  if(days===31) return baselineMetaForPeriod(30,sortedKeys); // 5 weekly buckets for 31-day period
  return baselineMetaForPeriod(days,sortedKeys);
}
function buildMonthlyPnlPoints(sortedKeys){
  const now=new Date();
  const keys=sortedKeys||Object.keys(pnlHistory).sort();
  const pts=[];
  for(let m=11;m>=0;m--){
    const d=new Date(now.getFullYear(),now.getMonth()-m,1);
    const startKey=localDateKey(d);
    const endDate=m===0
      ? new Date(now.getFullYear(),now.getMonth(),now.getDate())
      : new Date(d.getFullYear(),d.getMonth()+1,0);
    const endKey=localDateKey(endDate);
    const snapKey=latestSnapshotInRange(keys,startKey,endKey);
    pts.push({
      label:d.toLocaleDateString([], {month:'short',year:'2-digit'}),
      key:snapKey||endKey,
      value:snapKey ? snapshotValueForKeyOrZero(snapKey) : 0
    });
  }
  return pts;
}
function pnlFromPoints(current,points){
  if(!Array.isArray(points) || !points.length) return {hasBase:false,value:0,pct:0,pctNa:false};
  const base=num(points[0].value);
  if(base===null) return {hasBase:false,value:0,pct:0,pctNa:false};
  const value=current-base;
  if(base===0) return {hasBase:true,value,pct:0,pctNa:true};
  return {hasBase:true,value,pct:(value/base*100),pctNa:false};
}
function pnlFromBaseline(current,baselineMeta){
  const base=num(baselineMeta?.value);
  if(base===null) return {hasBase:false,value:0,pct:0,pctNa:false};
  const value=current-base;
  if(base===0) return {hasBase:true,value,pct:0,pctNa:true};
  return {hasBase:true,value,pct:(value/base*100),pctNa:false};
}
function periodPoints(days,sortedKeys){
  if(days===7) return buildDailyPnlPoints(7);
  if(days===31) return buildWeeklyPnlPoints(sortedKeys);
  if(days===365) return buildMonthlyPnlPoints(sortedKeys);
  if(days===1) return buildDailyPnlPoints(2);
  return [];
}
function firstNonZeroBaselineFromPoints(points){
  if(!Array.isArray(points) || !points.length) return null;
  const p=points.find(pt=>{
    const v=num(pt?.value);
    return v!==null && v!==0;
  });
  if(!p) return null;
  return {key:p.key,value:num(p.value)};
}
function firstNonZeroInRange(sortedKeys,startKey,endKey){
  for(const k of (sortedKeys||[])){
    if(k<startKey || k>endKey) continue;
    const v=num(pnlHistory[k]);
    if(v!==null && v!==0) return {key:k,value:v};
  }
  return null;
}
function hasNonZeroBeforeKey(sortedKeys,beforeKey){
  for(const k of (sortedKeys||[])){
    if(k>=beforeKey) break;
    const v=num(pnlHistory[k]);
    if(v!==null && v!==0) return true;
  }
  return false;
}
function weeklyBucketRanges(){
  const out=[];
  for(let w=3;w>=0;w--){
    const endOffset=w*7;
    const startOffset=endOffset+6;
    out.push({startKey:offsetDateKey(startOffset),endKey:offsetDateKey(endOffset)});
  }
  return out;
}
function monthlyBucketRanges(){
  const now=new Date();
  const out=[];
  for(let m=11;m>=0;m--){
    const start=new Date(now.getFullYear(),now.getMonth()-m,1);
    const end=m===0
      ? new Date(now.getFullYear(),now.getMonth(),now.getDate())
      : new Date(start.getFullYear(),start.getMonth()+1,0);
    out.push({startKey:localDateKey(start),endKey:localDateKey(end)});
  }
  return out;
}
function startupWeekSharedBaseline(sortedKeys){
  const ranges=weeklyBucketRanges();
  const currentWeek=ranges[ranges.length-1];
  if(!currentWeek) return null;
  const baseline=firstNonZeroInRange(sortedKeys,currentWeek.startKey,currentWeek.endKey);
  if(!baseline) return null;
  if(hasNonZeroBeforeKey(sortedKeys,currentWeek.startKey)) return null;
  return baseline;
}
function periodBaselineFromBuckets(days,sortedKeys){
  const keys=sortedKeys||Object.keys(pnlHistory).sort();
  if(days===1) return periodBaselineMeta(1,keys);
  if(days===7 || days===31 || days===365){
    const startupBaseline=startupWeekSharedBaseline(keys);
    if(startupBaseline) return startupBaseline;
  }
  if(days===7) return firstNonZeroBaselineFromPoints(buildDailyPnlPoints(7));
  if(days===31){
    const ranges=weeklyBucketRanges();
    for(const r of ranges){
      const baseline=firstNonZeroInRange(keys,r.startKey,r.endKey);
      if(baseline) return baseline;
    }
    return null;
  }
  if(days===365){
    const ranges=monthlyBucketRanges();
    for(const r of ranges){
      const baseline=firstNonZeroInRange(keys,r.startKey,r.endKey);
      if(baseline) return baseline;
    }
    return null;
  }
  return periodBaselineMeta(days,keys);
}
function accountNameById(accountId){
  const id=String(accountId);
  const acc=accounts.find(a=>String(a.id)===id);
  if(acc?.name) return acc.name;
  if(deletedAccountNames[id]) return `${deletedAccountNames[id]} (deleted)`;
  return 'Account (Deleted)';
}
function latestSnapshotKeyOnOrBefore(sortedKeys,targetKey){
  let candidate=null;
  for(const k of (sortedKeys||[])){
    if(k<=targetKey) candidate=k;
    else break;
  }
  return candidate;
}
function accountImpactBaseKey(startKey,endKey){
  const accountKeys=Object.keys(pnlAccountHistory).sort();
  if(!accountKeys.length) return null;

  const beforeOrAtStart=latestSnapshotKeyOnOrBefore(accountKeys,startKey);
  if(beforeOrAtStart) return beforeOrAtStart;

  for(const k of accountKeys){
    if(k<startKey) continue;
    if(k<=endKey) return k;
    break;
  }
  return null;
}
function accountImpactBetweenSnapshots(prevSnap,curSnap){
  if(!curSnap || !prevSnap || typeof curSnap!=='object' || typeof prevSnap!=='object') return [];

  const ids=new Set([...Object.keys(curSnap),...Object.keys(prevSnap)]);
  const deltas=[];
  ids.forEach(id=>{
    const curr=num(curSnap[id]);
    const prev=num(prevSnap[id]);
    const delta=(curr===null?0:curr)-(prev===null?0:prev);
    if(Math.abs(delta)>1e-9) deltas.push({id,delta});
  });
  if(!deltas.length) return [];

  const denom=deltas.reduce((sum,d)=>sum+Math.abs(d.delta),0);
  if(!(denom>0)) return [];

  deltas.sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta));
  return deltas.map(d=>({
    id:d.id,
    name:accountNameById(d.id),
    delta:d.delta,
    pct:Math.abs(d.delta)/denom*100
  }));
}
function accountImpactForRange(startKey,endKey,sortedKeys){
  if(!startKey || !endKey || !Array.isArray(sortedKeys) || !sortedKeys.length) return [];
  const fromKey=accountImpactBaseKey(startKey,endKey);
  if(!fromKey) return [];

  const curSnap=accountSnapshotForPnl();
  const todayKey=localDateKey();
  if(fromKey===todayKey){
    const dayOpen=pnlDayOpenAccountHistory[todayKey];
    if(dayOpen && typeof dayOpen==='object') return accountImpactBetweenSnapshots(dayOpen,curSnap);
  }
  const prevSnap=pnlAccountHistory[fromKey];
  return accountImpactBetweenSnapshots(prevSnap,curSnap);
}
function periodImpactsForDisplay(days,baseline,sortedKeys){
  const todayKey=localDateKey();
  const currentSnap=accountSnapshotForPnl();
  const dayOpen=pnlDayOpenAccountHistory[todayKey];
  const hasDayOpen=dayOpen && typeof dayOpen==='object';

  if(baseline){
    const impacts=accountImpactForRange(baseline.key,todayKey,sortedKeys);
    if(impacts.length) return impacts;
  }

  if(hasDayOpen){
    const impacts=accountImpactBetweenSnapshots(dayOpen,currentSnap);
    if(impacts.length) return impacts;
  }

  if(pnlLastChangeBase){
    const impacts=accountImpactBetweenSnapshots(pnlLastChangeBase,currentSnap);
    if(impacts.length) return impacts;
  }

  return [];
}
function renderPnlImpact(impacts){
  const listEl=document.getElementById('pnl-impact-list');
  if(!listEl) return;

  if(!Array.isArray(impacts) || !impacts.length){
    listEl.innerHTML='<div class="pnl-impact-empty">Tracking</div>';
    listEl.classList.remove('is-scrollable');
    return;
  }

  // Alphabetical order (by account name) instead of by impact size.
  const sorted=[...impacts].sort((a,b)=>String(a.name).localeCompare(String(b.name),undefined,{sensitivity:'base'}));

  const rows=sorted.map(item=>{
    const sign=item.delta>=0?'+':'-';
    const tone=item.delta>0?'pos':item.delta<0?'neg':'neu';
    return `<div class="pnl-impact-row"><span class="pnl-impact-name">${item.name}</span><span class="pnl-impact-pct ${tone}">${sign}${fmt(Math.abs(item.delta))}</span></div>`;
  });

  // Show every account instead of hiding extras behind "+N more" (which had no
  // way to reveal what was hidden). Once the list grows past a handful of
  // rows, let it scroll (same pattern as .pnl-series) so nothing is unreachable.
  const maxVisibleRows=4;
  listEl.classList.toggle('is-scrollable', sorted.length>maxVisibleRows);
  listEl.innerHTML=rows.join('');
}
function pnlForPeriodDisplay(current,days,sortedKeys){
  const baseline=periodBaselineFromBuckets(days,sortedKeys);
  return pnlFromBaseline(current,baseline);
}
function pnlTone(v){ return v>0?'pos':v<0?'neg':'neu'; }

// ============================================================
// PNL CHART UI — PnL detail modal: chart rendering, axis ticks, series list
// ============================================================
function openPnlDetailModal(days){
  pnlChartSelectedIndex=-1;
  if(pnlChartDismissTimer){ clearTimeout(pnlChartDismissTimer); pnlChartDismissTimer=null; }
  const conf=days===1
    ? {title:'1 Day PnL',subtitle:'View: 1 Day',mode:'daily'}
    : days===7
      ? {title:'7 Day PnL',subtitle:'View: 7 Days',mode:'daily'}
      : days===31
        ? {title:'31 Day PnL',subtitle:'View: 4 Weeks',mode:'weekly'}
        : {title:'365 Day PnL',subtitle:'View: 12 Months',mode:'monthly'};
  const sortedKeys=Object.keys(pnlHistory).sort();
  const nowTotal=currentPortfolioTotal();
  const points=periodPoints(days,sortedKeys);

  const baseline=periodBaselineFromBuckets(days,sortedKeys);
  const pnl=pnlFromBaseline(nowTotal,baseline);

  document.getElementById('pnl-detail-title').textContent=conf.title;
  document.getElementById('pnl-detail-sub').textContent=conf.subtitle;
  document.getElementById('pnl-base-val').textContent=baseline?fmt(baseline.value):'--';
  document.getElementById('pnl-base-date').textContent=baseline?fmtDateKey(baseline.key,true):'No baseline yet';
  document.getElementById('pnl-now-val').textContent=fmt(nowTotal);
  document.getElementById('pnl-now-date').textContent=fmtDateKey(localDateKey(),true);

  const changeEl=document.getElementById('pnl-change-val');
  const changePctEl=document.getElementById('pnl-change-pct');
  if(!pnl.hasBase){
    changeEl.textContent='--';
    changePctEl.textContent='Tracking';
    changeEl.className='neu';
  }else{
    const sign=pnl.value>0?'+':pnl.value<0?'-':'';
    const psign=pnl.pct>0?'+':pnl.pct<0?'-':'';
    const tone=pnlTone(pnl.value);
    changeEl.textContent=`${sign}${fmt(Math.abs(pnl.value))}`;
    changePctEl.textContent=pnl.pctNa ? 'n/a' : `${psign}${Math.abs(pnl.pct).toFixed(PERCENT_DECIMALS)}%`;
    changeEl.className=tone;
  }

  const axis=document.getElementById('pnl-axis');
  if(points.length){
    const mid=points[Math.floor((points.length-1)/2)];
    axis.innerHTML=`<span>${points[0].label}</span><span>${mid.label}</span><span>${points[points.length-1].label}</span>`;
  } else {
    axis.innerHTML='<span>--</span><span>No data yet</span><span>--</span>';
  }

  const impacts=periodImpactsForDisplay(days,baseline,sortedKeys);
  renderPnlImpact(impacts);

  renderPnlChart(points);
  renderPnlSeries(points);
  document.getElementById('pnlDetailOverlay').classList.add('open');
}
function closePnlDetailModal(){
  if(pnlChartDismissTimer){ clearTimeout(pnlChartDismissTimer); pnlChartDismissTimer=null; }
  document.getElementById('pnlDetailOverlay').classList.remove('open');
}
function niceNum(range,round){
  if(!Number.isFinite(range) || range<=0) return 1;
  const exponent=Math.floor(Math.log10(range));
  const fraction=range/Math.pow(10,exponent);
  let niceFraction;
  if(round){
    if(fraction<1.5) niceFraction=1;
    else if(fraction<3) niceFraction=2;
    else if(fraction<7) niceFraction=5;
    else niceFraction=10;
  } else {
    if(fraction<=1) niceFraction=1;
    else if(fraction<=2) niceFraction=2;
    else if(fraction<=5) niceFraction=5;
    else niceFraction=10;
  }
  return niceFraction*Math.pow(10,exponent);
}
// Computes a "nice" axis (round min/max/step) the way most charting
// libraries do, so gridlines land on clean numbers (0, 5k, 10k...)
// instead of arbitrary fractions of the raw data range.
function computeNiceAxis(dataMin,dataMax,maxTicks=5){
  let min=dataMin, max=dataMax;
  if(min===max){
    const pad=Math.abs(min)>0?Math.abs(min)*0.5:1000;
    min-=pad; max+=pad;
  }
  const rawRange=niceNum(max-min,false);
  const step=niceNum(rawRange/Math.max(maxTicks-1,1),true);
  let niceMin=Math.floor(min/step)*step;
  let niceMax=Math.ceil(max/step)*step;
  // Don't let the axis dip below zero if none of the actual data does -
  // a portfolio total floor of "0" reads as empty, not negative/debt.
  if(dataMin>=0 && niceMin<0) niceMin=0;
  if(niceMax===niceMin) niceMax=niceMin+step;
  return {min:niceMin,max:niceMax,step};
}
function renderPnlChart(points){
  const svg=document.getElementById('pnl-chart');
  if(!svg) return;
  if(!points.length){
    svg.innerHTML='';
    return;
  }
  const width=320, height=160, leftPad=48, rightPad=14, topPad=14, bottomPad=18;
  const vals=points.map(p=>phpToDisplay(p.value));
  let min=Math.min(...vals), max=Math.max(...vals);
  if(!Number.isFinite(min)||!Number.isFinite(max)){
    svg.innerHTML='';
    return;
  }
  const niceAxis=computeNiceAxis(min,max,5);
  const axisMin=niceAxis.min;
  const axisMax=niceAxis.max;
  const xAt=(i)=>leftPad+(i*(width-leftPad-rightPad))/Math.max(vals.length-1,1);
  const yAt=(v)=>height-bottomPad-((v-axisMin)/(axisMax-axisMin))*(height-topPad-bottomPad);
  const linePoints=vals.map((v,i)=>`${xAt(i)},${yAt(v)}`).join(' ');
  const areaPoints=`${leftPad},${height-bottomPad} ${linePoints} ${xAt(vals.length-1)},${height-bottomPad}`;
  const tone=vals[vals.length-1]>vals[0]?'var(--green)':vals[vals.length-1]<vals[0]?'var(--red)':'var(--text3)';
  const tickCount=Math.round((axisMax-axisMin)/niceAxis.step)+1;
  const ticks=Array.from({length:tickCount},(_,i)=>{
    const value=axisMin+(niceAxis.step*i);
    const y=yAt(value);
    return {
      value,
      y,
      label:fmtCompactMoney(value),
    };
  });
  const selectedIndex=pnlChartSelectedIndex>=0 && pnlChartSelectedIndex<vals.length ? pnlChartSelectedIndex : -1;
  const selectedValue=selectedIndex>=0 ? vals[selectedIndex] : null;
  const selectedX=selectedIndex>=0 ? xAt(selectedIndex) : null;
  const selectedY=selectedIndex>=0 ? yAt(selectedValue) : null;
  const selectedLabel=selectedIndex>=0 ? `${moneySymbol()}${fmtUiNumber(selectedValue,CURRENCY_DECIMALS,CURRENCY_DECIMALS)}` : '';
  const bubbleX=selectedIndex>=0 ? Math.min(width-18-60, Math.max(4, selectedX-30)) : 0;
  const bubbleY=selectedIndex>=0 ? Math.max(6, selectedY-30) : 0;
  svg.innerHTML=`
    ${ticks.map((tick,index)=>`<g pointer-events="none"><line x1="${leftPad}" y1="${tick.y}" x2="${width-rightPad}" y2="${tick.y}" stroke="var(--border)" stroke-width="1" opacity="${index===0||index===ticks.length-1 ? '0.9' : '0.55'}" /><text x="8" y="${tick.y+3}" fill="var(--text2)" font-family="var(--mono)" font-size="9">${tick.label}</text></g>`).join('')}
    <line x1="${leftPad}" y1="${topPad}" x2="${leftPad}" y2="${height-bottomPad}" stroke="var(--border)" stroke-width="1" opacity="0.7" pointer-events="none" />
    <line x1="${leftPad}" y1="${height-bottomPad}" x2="${width-rightPad}" y2="${height-bottomPad}" stroke="var(--border)" stroke-width="1" pointer-events="none" />
    <polygon points="${areaPoints}" fill="rgba(96,165,250,0.12)" pointer-events="none" />
    <polyline points="${linePoints}" fill="none" stroke="${tone}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pointer-events="none" />
    ${vals.map((v,i)=>`<circle cx="${xAt(i)}" cy="${yAt(v)}" r="${i===selectedIndex?6:4.5}" fill="${i===selectedIndex?tone:'var(--bg)'}" stroke="${tone}" stroke-width="1.5" pointer-events="none" /><circle data-pnl-index="${i}" cx="${xAt(i)}" cy="${yAt(v)}" r="12" fill="transparent" stroke="none" />`).join('')}
    ${selectedIndex>=0 ? `<g id="pnl-bubble" pointer-events="none" style="opacity:1;transition:opacity .2s ease;"><rect x="${bubbleX}" y="${bubbleY}" width="60" height="18" rx="6" fill="var(--surface2)" stroke="var(--border)"/><text x="${bubbleX+30}" y="${bubbleY+12}" text-anchor="middle" fill="var(--text)" font-family="var(--mono)" font-size="9">${selectedLabel}</text></g>` : ''}
  `;
  svg.style.cursor='pointer';
  svg.style.touchAction='manipulation';
  svg.onclick=(ev)=>{
    const target=ev.target?.closest?.('[data-pnl-index]');
    if(!target) return;
    const idx=parseInt(target.getAttribute('data-pnl-index'),10);
    if(!Number.isInteger(idx)) return;
    const nextIndex=pnlChartSelectedIndex===idx ? -1 : idx;
    pnlChartSelectedIndex=nextIndex;
    renderPnlChart(points);
    if(pnlChartDismissTimer){ clearTimeout(pnlChartDismissTimer); pnlChartDismissTimer=null; }
    if(nextIndex>=0){
      pnlChartDismissTimer=setTimeout(()=>{
        const bubbleEl=svg.querySelector('#pnl-bubble');
        if(bubbleEl) bubbleEl.style.opacity='0';
        pnlChartDismissTimer=setTimeout(()=>{
          pnlChartDismissTimer=null;
          if(pnlChartSelectedIndex===nextIndex){
            pnlChartSelectedIndex=-1;
            renderPnlChart(points);
          }
        },200);
      },1500);
    }
  };
}
function renderPnlSeries(points){
  const wrap=document.getElementById('pnl-series');
  if(!wrap) return;
  if(!points.length){
    wrap.innerHTML='<div class="pnl-series-empty">No snapshots yet. Refresh to start tracking.</div>';
    return;
  }
  const rows=[...points].reverse().slice(0,18).map(p=>`<div class="pnl-series-row"><span class="pnl-series-date">${p.label}</span><span class="pnl-series-val ${pnlTone(p.value)}">${fmt(p.value)}</span></div>`).join('');
  wrap.innerHTML=rows;
}


// ============================================================
// BOOT — App boot sequence, splash screen, refresh-all orchestration
// ============================================================
function sp(msg,pct){
  const msgEl=document.getElementById('sp-msg');
  const fillEl=document.getElementById('sp-fill');
  if(msgEl) msgEl.textContent=msg;
  if(pct!==undefined && fillEl) fillEl.style.width=pct+'%';
}
function hideSplash(){ const s=document.getElementById('splash'); s.classList.add('hide'); setTimeout(()=>s.remove(),500); }

function needsBootRescan(wallet){
  const ls=num(wallet?.lastScan);
  if(ls===null || ls<=0) return true;
  return Date.now()-ls>BOOT_SCAN_STALE_MS;
}

async function refreshCryptoWallet(wallet, progressCb){
  let updated=false;
  if(wallet.chain==='sol'){
    updated=await scanSolanaNative(wallet);
    if(progressCb) progressCb('Solana');
  } else {
    const [nativeOk,tokenOk]=await Promise.all([
      scanNative(wallet,progressCb),
      fetchTokBals(wallet)
    ]);
    updated=!!(nativeOk||tokenOk);
  }
  if(updated) wallet.lastScan=Date.now();
  return updated;
}

async function boot(){
  normalizeAccountWallets(accounts);
  const browserOffline=typeof navigator!=='undefined' && navigator.onLine===false;
  let nativePriceOk=false;
  let tokenPriceOk=false;
  if(!browserOffline){
    sp('fetching prices...',5);
    nativePriceOk=await fetchPrices();
    if(accounts.length) tokenPriceOk=await fetchTokPrices();
  }
  setOfflineMode(browserOffline || (!nativePriceOk && !tokenPriceOk && accounts.length>0));
  render();
  sp('ready',100);
  setTimeout(hideSplash,250);
  if(!accounts.length) return;
  if(browserOffline) return;

  const cryptoWallets=accounts.flatMap(a=>a.wallets.filter(w=>w.type==='crypto'));
  if(!cryptoWallets.length){
    if(nativePriceOk || tokenPriceOk) markDataUpdated();
    return;
  }

  cryptoWallets.forEach(w=>{w.scanning=true;});
  render();

  let done=0;
  const total=cryptoWallets.reduce((sum,w)=>sum+(w.chain==='sol'?1:CHAINS.length),0);
  const tick=(name)=>{
    done++;
    sp(`refreshing ${name}...`, 10+Math.round(done/Math.max(total,1)*75));
  };

  let refreshedAny=false;
  await Promise.all(cryptoWallets.map(async w=>{
    const updated=await refreshCryptoWallet(w,tick);
    if(updated) refreshedAny=true;
    w.scanning=false;
  }));
  if(refreshedAny || nativePriceOk || tokenPriceOk){
    setOfflineMode(false);
    save();
    if(!refreshedAny) markDataUpdated();
  } else {
    setOfflineMode(true);
  }
  render();
}

async function refreshAll(){
  const btn=document.getElementById('refresh-btn'); btn.disabled=true; btn.classList.add('spinning');
  try{
    if(typeof navigator!=='undefined' && navigator.onLine===false){
      setOfflineMode(true);
      render();
      openStatusModal('Offline','No internet connection. Showing last saved data.');
      return;
    }
    const nativePriceOk=await fetchPrices();
    const tokenPriceOk=await fetchTokPrices();
    const cw=accounts.flatMap(a=>a.wallets.filter(w=>w.type==='crypto'));
    cw.forEach(w=>{w.scanning=true;});
    render();
    let refreshedAny=false;
    await Promise.all(cw.map(async w => {
      const updated=await refreshCryptoWallet(w);
      if(updated) refreshedAny=true;
      w.scanning=false;
    }));
    if(refreshedAny || nativePriceOk || tokenPriceOk){
      setOfflineMode(false);
      save();
      if(!refreshedAny) markDataUpdated();
    } else {
      setOfflineMode(true);
    }
    render();
  } finally {
    btn.disabled=false;
    btn.classList.remove('spinning');
  }
}

async function fetchPrices(){
  await fetchPhpPerUsd(false);
  const defaults={ETH:3200,BNB:560,POL:0.7,AVAX:34,CELO:0.7,MNT:0.8,GT:8,APE:1.1,BERA:6,BTT:0.0000014,GLMR:0.2,MOVR:7,S:0.5,XDC:0.1,SEI:0.6};
  const ids=[...new Set(CHAINS.map(c=>c.cg))];
  const d=await fetchCgSimplePrices(ids);
  let hasFreshPrice=false;
  CHAINS.forEach(c=>{
    const php=d[c.cg];
    if(Number.isFinite(php) && php>0){
      PRICES[c.sym]=php;
      hasFreshPrice=true;
    }
    else if(!Number.isFinite(PRICES[c.sym])||PRICES[c.sym]<=0) PRICES[c.sym]=defaults[c.sym]||0;
  });
  persistPriceSnapshots();
  return hasFreshPrice;
}
async function fetchTokPrices(){
  const ids=[...new Set(accounts.flatMap(a=>a.wallets.flatMap(w=>{
    if(w.type==='crypto') return (w.toks||[]).map(t=>t.cgid).filter(id=>id && !String(id).startsWith('sym:'));
    if(w.type==='cex') return (w.toks||[]).map(t=>t.cgid).filter(id=>id && !String(id).startsWith('sym:'));
    return [];
  })))];
  if(!ids.length) return false;
  const merged=await fetchCgSimplePrices(ids);
  let hasFreshPrice=false;
  accounts.forEach(a=>a.wallets.forEach(w=>{
    if(w.type==='crypto'){
      (w.toks||[]).forEach(t=>{if(t.cgid&&Number.isFinite(merged[t.cgid])){TPRICES[t.addr]=merged[t.cgid]||0;hasFreshPrice=true;}});
    }
    if(w.type==='cex'){
      (w.toks||[]).forEach(t=>{
        if(t.cgid&&Number.isFinite(merged[t.cgid])){
          CEXPRICES[t.cgid]=merged[t.cgid]||0;
          t.php=merged[t.cgid]||0;
          hasFreshPrice=true;
        }
      });
    }
  }));
  persistPriceSnapshots();
  return hasFreshPrice;
}


// ============================================================
// CHAIN RPC — Raw EVM JSON-RPC calls (eth_call), ERC20/native balance fetching
// ============================================================
function encAddr(a){return '000000000000000000000000'+a.slice(2).toLowerCase();}
async function ecall(rpc,to,data){
  const r=await fetch(rpc,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'eth_call',params:[{to,data},'latest']}),signal:AbortSignal.timeout(9000)});
  return(await r.json()).result;
}
function decStr(hex){
  if(!hex||hex==='0x') return '';
  try{ const raw=hex.slice(2),off=parseInt(raw.slice(0,64),16)*2,len=parseInt(raw.slice(off,off+64),16); let s=''; for(let i=0;i<len;i++) s+=String.fromCharCode(parseInt(raw.slice(off+64+i*2,off+66+i*2),16)); return s; }
  catch{return '';}
}
function decUint(hex){if(!hex||hex==='0x')return 0;try{return Number(BigInt(hex));}catch{return 0;}}
async function getERC20(chainName,contract,wallet){
  const c=CHAINS.find(x=>x.name===chainName);if(!c)return null;
  try{
    const[sh,nh,dh,bh]=await Promise.all([ecall(c.rpc,contract,'0x95d89b41'),ecall(c.rpc,contract,'0x06fdde03'),ecall(c.rpc,contract,'0x313ce567'),ecall(c.rpc,contract,'0x70a08231'+encAddr(wallet))]);
    const dec=dh?decUint(dh):18;
    return{sym:decStr(sh),name:decStr(nh),dec,bal:bh?Number(BigInt(bh))/10**dec:0};
  }catch{return null;}
}
async function getTokBal(rpc,wallet,contract,dec){try{return Number(BigInt(await ecall(rpc,contract,'0x70a08231'+encAddr(wallet))))/10**dec;}catch{return null;}}

async function scanNative(w,cb){
  const nextNets=[];
  let success=0;
  await Promise.all(CHAINS.map(async c=>{
    try{ const res=await fetch(c.rpc,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'eth_getBalance',params:[w.addr,'latest']}),signal:AbortSignal.timeout(8000)});
      const bal=Number(BigInt((await res.json()).result))/1e18;
      success++;
      if(bal>0.000001)nextNets.push({chain:c.name,sym:c.sym,bal}); }catch{}
    if(cb)cb(c.name);
  }));
  if(success>0) w.nets=nextNets;
  return success>0;
}

async function fetchTokBals(w){
  if(!w.toks?.length)return false;
  let success=0;
  await Promise.all(w.toks.map(async t=>{
    const c=CHAINS.find(x=>x.name===t.chain);if(!c)return;
    const bal=await getTokBal(c.rpc,w.addr,t.addr,t.dec);
    if(bal===null){
      if(num(t.bal)===null) t.bal=0;
      return;
    }
    t.bal=bal;
    success++;
  }));
  return success>0;
}


// ============================================================
// PERSISTENCE — save() - writes accounts/goal/pnl state to localStorage
// ============================================================
function save(){
  normalizeAccountWallets(accounts);
  goalAmount=currencyToBase(goalValue,goalCurrency);
  const nextAccountsJSON=JSON.stringify(accounts);
  const nextGoalValue=String(goalAmount);
  const nextGoalShapeJSON=JSON.stringify({value:goalValue,currency:goalCurrency});
  let changed=false;
  if(nextAccountsJSON!==lastSavedAccountsJSON){
    localStorage.setItem('llion_accounts',nextAccountsJSON);
    lastSavedAccountsJSON=nextAccountsJSON;
    changed=true;
  }
  if(nextGoalValue!==lastSavedGoalValue){
    localStorage.setItem('llion_goal',nextGoalValue);
    lastSavedGoalValue=nextGoalValue;
    changed=true;
  }
  if(nextGoalShapeJSON!==lastSavedGoalShapeJSON){
    localStorage.setItem(GOAL_VALUE_KEY,String(goalValue));
    localStorage.setItem(GOAL_CURRENCY_KEY,goalCurrency);
    lastSavedGoalShapeJSON=nextGoalShapeJSON;
    changed=true;
  }
  if(changed) markDataUpdated();
}