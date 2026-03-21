const CHAINS = [
  { name:"Ethereum",     rpc:"https://cloudflare-eth.com",                          sym:"ETH",   cg:"ethereum",            cgp:"ethereum" },
  { name:"BNB Chain",    rpc:"https://bsc-dataseed.binance.org/",                   sym:"BNB",   cg:"binancecoin",         cgp:"binance-smart-chain" },
  { name:"Base",         rpc:"https://mainnet.base.org",                            sym:"ETH",   cg:"ethereum",            cgp:"base" },
  { name:"Polygon",      rpc:"https://polygon-bor-rpc.publicnode.com",              sym:"POL",   cg:"matic-network",       cgp:"polygon-pos" },
  { name:"Arbitrum One", rpc:"https://arb1.arbitrum.io/rpc",                        sym:"ETH",   cg:"ethereum",            cgp:"arbitrum-one" },
  { name:"Optimism",     rpc:"https://mainnet.optimism.io",                         sym:"ETH",   cg:"ethereum",            cgp:"optimistic-ethereum" },
  { name:"Celo",         rpc:"https://forno.celo.org",                              sym:"CELO",  cg:"celo",                cgp:"celo" },
  { name:"Avax C-Chain", rpc:"https://api.avax.network/ext/bc/C/rpc",               sym:"AVAX",  cg:"avalanche-2",         cgp:"avalanche" },
  { name:"Mantle",       rpc:"https://rpc.mantle.xyz",                              sym:"MNT",   cg:"mantle",              cgp:"mantle" },
  { name:"Linea",        rpc:"https://rpc.linea.build",                             sym:"ETH",   cg:"ethereum",            cgp:"linea" },
  { name:"Abstract",     rpc:"https://api.mainnet.abs.xyz",                         sym:"ETH",   cg:"ethereum",            cgp:"abstract" },
  { name:"Ape",          rpc:"https://rpc.apechain.com/http",                       sym:"APE",   cg:"apecoin",             cgp:"apechain" },
  { name:"Bera",         rpc:"https://rpc.berachain.com",                           sym:"BERA",  cg:"berachain-bera",      cgp:"berachain" },
  { name:"Blast",        rpc:"https://rpc.blast.io",                                sym:"ETH",   cg:"ethereum",            cgp:"blast" },
  { name:"BTTC",         rpc:"https://rpc.bt.io",                                   sym:"BTT",   cg:"bittorrent",          cgp:"bittorrent-chain-mainnet" },
  { name:"Fraxtal",      rpc:"https://rpc.frax.com",                                sym:"frxETH",cg:"frax-ether",          cgp:"fraxtal" },
  { name:"Gnosis",       rpc:"https://rpc.gnosischain.com",                         sym:"xDAI",  cg:"xdai",                cgp:"xdai" },
  { name:"Moonbeam",     rpc:"https://rpc.api.moonbeam.network",                    sym:"GLMR",  cg:"moonbeam",            cgp:"moonbeam" },
  { name:"Moonriver",    rpc:"https://rpc.api.moonriver.moonbeam.network",          sym:"MOVR",  cg:"moonriver",           cgp:"moonriver" },
  { name:"opBNB",        rpc:"https://opbnb-mainnet-rpc.bnbchain.org",              sym:"BNB",   cg:"binancecoin",         cgp:"opbnb" },
  { name:"Scroll",       rpc:"https://rpc.scroll.io",                               sym:"ETH",   cg:"ethereum",            cgp:"scroll" },
  { name:"Sonic",        rpc:"https://rpc.soniclabs.com",                           sym:"S",     cg:"sonic-3",             cgp:"sonic" },
  { name:"Taiko",        rpc:"https://rpc.mainnet.taiko.xyz",                       sym:"ETH",   cg:"ethereum",            cgp:"taiko" },
  { name:"Unichain",     rpc:"https://mainnet.unichain.org",                        sym:"ETH",   cg:"ethereum",            cgp:"unichain" },
  { name:"XDC",          rpc:"https://erpc.xinfin.network",                         sym:"XDC",   cg:"xdce-crowd-sale",     cgp:"xdc-network" },
  { name:"Sei",          rpc:"https://evm-rpc.sei-apis.com",                        sym:"SEI",   cg:"sei-network",         cgp:"sei-network" },
];

const ICONS={
  'grip-vertical':`<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>`,
  'link':`<path d="M9 15l6 -6"/><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"/><path d="M13 18l-.464 .536a5 5 0 0 1 -7.071 -7.073l.535 -.463"/>`,
  'building-2':`<path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/><path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/><path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/>`,
  'wallet':`<path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"/><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"/>`,
  'banknote':`<path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 12l.01 0"/><path d="M6 12l.01 0"/>`,
  'smartphone':`<path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z"/><path d="M11 17l2 0"/>`,
  'landmark':`<path d="M3 21l18 0"/><path d="M3 10l18 0"/><path d="M5 10l0 11"/><path d="M19 10l0 11"/><path d="M9 10l0 11"/><path d="M15 10l0 11"/><path d="M12 3l9 7l-18 0z"/>`,
  'trending-up':`<path d="M3 17l6 -6l4 4l8 -8"/><path d="M14 7l7 0l0 7"/>`,
  'piggy-bank':`<path d="M15 11v.01"/><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377"/><path d="M16 4v3.803a6.019 6.019 0 0 1 2 4.197a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -5.916 -5h-1.084a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1.084a5.99 5.99 0 0 1 .834 -2h-1.918v-2h4.5m5.5 11v2m-3 -2v2"/>`,
  'folder':`<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"/>`,
  'x':`<path d="M18 6l-12 12"/><path d="M6 6l12 12"/>`,
  'plus':`<path d="M12 5l0 14"/><path d="M5 12l14 0"/>`,
  'chevron-down':`<path d="M6 9l6 6l6 -6"/>`,
  'ellipsis':`<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>`,
  'refresh-cw':`<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>`,
  'info':`<circle cx="12" cy="12" r="9"/><path d="M12 8l.01 0"/><path d="M11 12l1 0l0 4l1 0"/>`,
  'pencil':`<path d="M4 20l4.5 -1l9.5 -9.5a2.121 2.121 0 0 0 -3 -3l-9.5 9.5l-1 4.5"/><path d="M13.5 6.5l3 3"/>`,
};
function svg(n,s=14,sw='1.75'){
  const p=ICONS[n]||ICONS['folder'];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

const MANUAL_CATS = [
  { id:'cash',     label:'Cash',       lucide:'banknote' },
  { id:'ewallet',  label:'E-Wallet',   lucide:'smartphone' },
  { id:'bank',     label:'Bank',       lucide:'landmark' },
  { id:'invest',   label:'Investment', lucide:'trending-up' },
  { id:'savings',  label:'Savings',    lucide:'piggy-bank' },
  { id:'other',    label:'Other',      lucide:'folder' },
];
const CEX_MANUAL_CAT = { id:'cex', label:'CEX', lucide:'building-2' };

function getManualCat(catId){
  if(catId===CEX_MANUAL_CAT.id) return CEX_MANUAL_CAT;
  return MANUAL_CATS.find(c=>c.id===catId) || MANUAL_CATS[MANUAL_CATS.length-1];
}

const GOAL_DEFAULT_USD=1000000;
const GOAL_VALUE_KEY='llion_goal_value';
const GOAL_CURRENCY_KEY='llion_goal_currency';
const USD_MAIN_DEFAULTS_KEY='llion_usd_main_defaults_v1';
const PNL_ACCOUNT_HISTORY_KEY='llion_pnl_account_history';
const PNL_LAST_CHANGE_BASE_KEY='llion_pnl_last_change_base';
const PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY='llion_pnl_day_open_account_history';

let accounts = JSON.parse(localStorage.getItem('llion_accounts') || '[]');
let goalAmount = (()=>{
  const saved=parseFloat(localStorage.getItem('llion_goal') || '');
  return Number.isFinite(saved) && saved>0 ? saved : GOAL_DEFAULT_USD;
})();
let goalValue=null;
let goalCurrency='USD';
let pnlHistory = JSON.parse(localStorage.getItem('llion_pnl_history') || '{}');
let pnlAccountHistory = (()=>{
  try{
    const parsed=JSON.parse(localStorage.getItem(PNL_ACCOUNT_HISTORY_KEY) || '{}');
    return parsed && typeof parsed==='object' ? parsed : {};
  }catch{
    return {};
  }
})();
let pnlLastChangeBase = (()=>{
  try{
    const parsed=JSON.parse(localStorage.getItem(PNL_LAST_CHANGE_BASE_KEY) || 'null');
    return parsed && typeof parsed==='object' ? parsed : null;
  }catch{
    return null;
  }
})();
let pnlDayOpenAccountHistory = (()=>{
  try{
    const parsed=JSON.parse(localStorage.getItem(PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY) || '{}');
    return parsed && typeof parsed==='object' ? parsed : {};
  }catch{
    return {};
  }
})();
const PRICES = {}, TPRICES = {}, CEXPRICES = {};
let importForAcc=null, importForWallet=null, importChain=null, pendingTok=null;
let cexTokForAcc=null, cexTokForWallet=null;
let pendingCexToken=null, pendingCexWalletToken=null;
let pendingCexTokenMatches=[], pendingCexWalletMatches=[];
let cexLookupTimer=null, cexAddLookupTimer=null;
let addWalletForAcc=null, selectedWalletType=null, selectedCat=null;
let openMenuId=null;
let pendingConfirmAction=null;
let pendingValueEdit=null;
let pendingWalletRename=null;
let selectedValueEditAction='adjust';
let CEX_SYMBOL_CACHE={};
try{ CEX_SYMBOL_CACHE=JSON.parse(localStorage.getItem('llion_cg_symbol_cache')||'{}')||{}; }catch{ CEX_SYMBOL_CACHE={}; }
const CG_JSON_CACHE=new Map();
const CG_CACHE_MS=90*1000;
const CG_COOLDOWN_MS=75*1000;
const CG_BATCH_SIZE=35;
const CG_CHUNK_DELAY_MS=1200;
const CG_PRICE_TTL_MS=10*60*1000;
const DISPLAY_CURRENCIES=['USD','PHP'];
const PHP_PER_USD_DEFAULT=58;
const PHP_PER_USD_CACHE_KEY='llion_php_per_usd_cache';
const PHP_PER_USD_TTL_MS=15*60*1000;
const DATA_UPDATED_AT_KEY='llion_data_updated_at';
const NATIVE_PRICES_KEY='llion_native_prices';
const TOKEN_PRICES_KEY='llion_token_prices';
const CEX_PRICES_KEY='llion_cex_prices';
const BOOT_SCAN_STALE_MS=10*60*1000;
const USD_BASE_MIGRATION_KEY='llion_usd_base_migration_v1';
let cgCooldownUntil=0;
let CG_PRICE_CACHE={};
try{ CG_PRICE_CACHE=JSON.parse(localStorage.getItem('llion_cg_price_cache')||'{}')||{}; }catch{ CG_PRICE_CACHE={}; }
let displayCurrency=String(localStorage.getItem('llion_display_currency')||'USD').toUpperCase();
if(!DISPLAY_CURRENCIES.includes(displayCurrency)) displayCurrency='USD';
let phpPerUsd=PHP_PER_USD_DEFAULT;
let phpPerUsdUpdatedAt=0;
let phpPerUsdFetchPromise=null;
try{
  const fx=JSON.parse(localStorage.getItem(PHP_PER_USD_CACHE_KEY)||'{}')||{};
  const r=num(fx.rate), ts=num(fx.ts);
  if(r!==null && r>0 && ts!==null && ts>0){
    phpPerUsd=r;
    phpPerUsdUpdatedAt=ts;
  }
}catch{}
function migratePhpBaseToUsdIfNeeded(){
  if(localStorage.getItem(USD_BASE_MIGRATION_KEY)==='1') return;
  const hasLegacyData=
    localStorage.getItem('llion_accounts')!==null ||
    localStorage.getItem('llion_goal')!==null ||
    localStorage.getItem('llion_pnl_history')!==null;
  if(!hasLegacyData){
    displayCurrency='USD';
    localStorage.setItem('llion_display_currency',displayCurrency);
    localStorage.setItem(USD_BASE_MIGRATION_KEY,'1');
    return;
  }
  const rate=num(phpPerUsd);
  const fx=rate!==null && rate>0 ? rate : PHP_PER_USD_DEFAULT;
  const toUsd=(v)=>{ const n=num(v); return n===null ? v : n/fx; };

  goalAmount=toUsd(goalAmount);
  Object.keys(pnlHistory||{}).forEach(k=>{ pnlHistory[k]=toUsd(pnlHistory[k]); });
  Object.keys(pnlAccountHistory||{}).forEach(k=>{
    const snap=pnlAccountHistory[k];
    if(!snap || typeof snap!=='object') return;
    Object.keys(snap).forEach(accId=>{ snap[accId]=toUsd(snap[accId]); });
  });
  if(pnlLastChangeBase && typeof pnlLastChangeBase==='object'){
    Object.keys(pnlLastChangeBase).forEach(accId=>{ pnlLastChangeBase[accId]=toUsd(pnlLastChangeBase[accId]); });
  }
  Object.keys(pnlDayOpenAccountHistory||{}).forEach(k=>{
    const snap=pnlDayOpenAccountHistory[k];
    if(!snap || typeof snap!=='object') return;
    Object.keys(snap).forEach(accId=>{ snap[accId]=toUsd(snap[accId]); });
  });

  accounts.forEach(acc=>{
    if(!Array.isArray(acc.wallets)) acc.wallets=[];
    acc.wallets.forEach(w=>{
      if(w?.type==='manual') w.amount=toUsd(w.amount||0);
      if(Array.isArray(w?.toks)){
        w.toks.forEach(t=>{
          if(Object.prototype.hasOwnProperty.call(t,'php')) t.php=toUsd(t.php);
          if(Object.prototype.hasOwnProperty.call(t,'manualPhp')) t.manualPhp=toUsd(t.manualPhp);
          if(Object.prototype.hasOwnProperty.call(t,'amount')) t.amount=toUsd(t.amount);
        });
      }
    });
  });

  CG_PRICE_CACHE={};
  CEX_SYMBOL_CACHE={};
  displayCurrency='USD';

  localStorage.setItem('llion_accounts',JSON.stringify(accounts));
  localStorage.setItem('llion_goal',String(goalAmount));
  localStorage.setItem('llion_pnl_history',JSON.stringify(pnlHistory));
  localStorage.setItem(PNL_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlAccountHistory));
  localStorage.setItem(PNL_LAST_CHANGE_BASE_KEY,JSON.stringify(pnlLastChangeBase));
  localStorage.setItem(PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlDayOpenAccountHistory));
  localStorage.setItem('llion_display_currency',displayCurrency);
  localStorage.setItem('llion_cg_price_cache',JSON.stringify(CG_PRICE_CACHE));
  localStorage.setItem('llion_cg_symbol_cache',JSON.stringify(CEX_SYMBOL_CACHE));
  localStorage.setItem(USD_BASE_MIGRATION_KEY,'1');
}

migratePhpBaseToUsdIfNeeded();

function enforceUsdMainDefaultsIfNeeded(){
  if(localStorage.getItem(USD_MAIN_DEFAULTS_KEY)==='1') return;
  const hasSavedCurrency=localStorage.getItem('llion_display_currency')!==null;
  const hasSavedGoal=localStorage.getItem('llion_goal')!==null;
  if(!hasSavedCurrency){
    displayCurrency='USD';
    localStorage.setItem('llion_display_currency',displayCurrency);
  }
  if(!hasSavedGoal){
    goalAmount=GOAL_DEFAULT_USD;
    localStorage.setItem('llion_goal',String(goalAmount));
  }
  localStorage.setItem(USD_MAIN_DEFAULTS_KEY,'1');
}

enforceUsdMainDefaultsIfNeeded();

let lastSavedAccountsJSON=localStorage.getItem('llion_accounts')||'[]';
let lastSavedGoalValue=localStorage.getItem('llion_goal')||String(goalAmount);
let lastSavedGoalShapeJSON=JSON.stringify({value:goalValue,currency:goalCurrency});
let dataUpdatedAt=num(localStorage.getItem(DATA_UPDATED_AT_KEY));
let isOfflineMode=typeof navigator!=='undefined' ? navigator.onLine===false : false;
if(dataUpdatedAt===null || dataUpdatedAt<=0) dataUpdatedAt=0;
if(!dataUpdatedAt && accounts.length){
  dataUpdatedAt=Date.now();
  localStorage.setItem(DATA_UPDATED_AT_KEY,String(dataUpdatedAt));
}

const ACC_COLORS = ['#4ade80','#fbbf24','#60a5fa','#a78bfa','#f87171','#34d399','#fb923c','#e879f9'];
const CURRENCY_DECIMALS=2;
const PERCENT_DECIMALS=1;
const TOKEN_DECIMALS=3;

function uid(){ return Date.now()+Math.floor(Math.random()*1000000); }

function num(v){ const n=parseFloat(v); return Number.isFinite(n) ? n : null; }
function fmtUpdatedAt(ts){
  const d=new Date(ts);
  const now=new Date();
  const sameDay=d.toDateString()===now.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })
    : d.toLocaleString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
}
function renderUpdatedTime(){
  const el=document.getElementById('upd-time');
  if(!el) return;
  el.textContent=dataUpdatedAt>0 ? `Data updated ${fmtUpdatedAt(dataUpdatedAt)}` : 'Data not updated yet';
}
function markDataUpdated(ts=Date.now()){
  dataUpdatedAt=ts;
  localStorage.setItem(DATA_UPDATED_AT_KEY,String(dataUpdatedAt));
  renderUpdatedTime();
}
function restorePriceSnapshots(){
  try{ Object.assign(PRICES, JSON.parse(localStorage.getItem(NATIVE_PRICES_KEY)||'{}')||{}); }catch{}
  try{ Object.assign(TPRICES, JSON.parse(localStorage.getItem(TOKEN_PRICES_KEY)||'{}')||{}); }catch{}
  try{ Object.assign(CEXPRICES, JSON.parse(localStorage.getItem(CEX_PRICES_KEY)||'{}')||{}); }catch{}
}
function persistPriceSnapshots(){
  localStorage.setItem(NATIVE_PRICES_KEY,JSON.stringify(PRICES));
  localStorage.setItem(TOKEN_PRICES_KEY,JSON.stringify(TPRICES));
  localStorage.setItem(CEX_PRICES_KEY,JSON.stringify(CEXPRICES));
}
function setOfflineMode(flag){
  isOfflineMode=!!flag;
}
function fmtUiNumber(v,min=0,max=CURRENCY_DECIMALS){
  const n=num(v);
  const x=n===null?0:n;
  return x.toLocaleString(undefined,{minimumFractionDigits:min,maximumFractionDigits:max});
}
function fmtUiInput(v,decimals=CURRENCY_DECIMALS){
  const n=num(v);
  return (n===null?0:n).toFixed(decimals);
}
function fmtQty(n){ return fmtUiNumber(n,TOKEN_DECIMALS,TOKEN_DECIMALS); }
function moneySymbol(){ return displayCurrency==='PHP' ? '\u20B1' : '$'; }
function phpToDisplay(v){ const n=num(v); if(n===null) return 0; return displayCurrency==='PHP' ? n*phpPerUsd : n; }
function displayToPhp(v){ const n=num(v); if(n===null) return 0; return displayCurrency==='PHP' ? n/phpPerUsd : n; }
function currencySymbol(currency){ return currency==='PHP' ? '\u20B1' : '$'; }
function baseToCurrency(v,currency){ const n=num(v); if(n===null) return 0; return currency==='PHP' ? n*phpPerUsd : n; }
function currencyToBase(v,currency){ const n=num(v); if(n===null) return 0; return currency==='PHP' ? n/phpPerUsd : n; }
function persistPhpPerUsd(rate){
  const val=num(rate);
  if(val===null || val<=0) return;
  phpPerUsd=val;
  phpPerUsdUpdatedAt=Date.now();
  localStorage.setItem(PHP_PER_USD_CACHE_KEY,JSON.stringify({rate:phpPerUsd,ts:phpPerUsdUpdatedAt}));
}
function ensureGoalShape(){
  let nextCurrency=String(localStorage.getItem(GOAL_CURRENCY_KEY)||goalCurrency||'USD').toUpperCase();
  if(nextCurrency!=='USD' && nextCurrency!=='PHP') nextCurrency='USD';

  let nextValue=num(goalValue);
  if(nextValue===null || nextValue<=0){
    const saved=num(localStorage.getItem(GOAL_VALUE_KEY));
    if(saved!==null && saved>0) nextValue=saved;
  }
  if(nextValue===null || nextValue<=0){
    nextValue=baseToCurrency(goalAmount,nextCurrency);
    if(nextValue<=0) nextValue=GOAL_DEFAULT_USD;
  }

  goalCurrency=nextCurrency;
  goalValue=nextValue;
  goalAmount=currencyToBase(goalValue,goalCurrency);
}
async function fetchPhpPerUsd(force=false){
  if(!force && phpPerUsdUpdatedAt>0 && Date.now()-phpPerUsdUpdatedAt<PHP_PER_USD_TTL_MS) return phpPerUsd;
  if(phpPerUsdFetchPromise) return phpPerUsdFetchPromise;

  phpPerUsdFetchPromise=(async()=>{
    try{
      const r=await fetch('https://open.er-api.com/v6/latest/USD',{signal:AbortSignal.timeout(9000)});
      const d=await r.json();
      const rate=num(d?.rates?.PHP);
      if(rate!==null && rate>0){
        persistPhpPerUsd(rate);
        return phpPerUsd;
      }
    }catch{}

    try{
      const d=await cgFetchJson('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=php');
      const rate=num(d?.tether?.php);
      if(rate!==null && rate>0){
        persistPhpPerUsd(rate);
        return phpPerUsd;
      }
    }catch{}

    return phpPerUsd||PHP_PER_USD_DEFAULT;
  })();

  try{return await phpPerUsdFetchPromise;} finally{phpPerUsdFetchPromise=null;}
}
function setDisplayCurrency(next){
  const val=String(next||'').toUpperCase();
  if(!DISPLAY_CURRENCIES.includes(val)) return;
  displayCurrency=val;
  localStorage.setItem('llion_display_currency',displayCurrency);
  if(selectedWalletType!=='cex'){
    const amountLbl=document.getElementById('mw-amount-lbl');
    if(amountLbl) amountLbl.textContent=`Amount (${moneySymbol()})`;
  }
  render();
  if(displayCurrency==='PHP'){
    fetchPhpPerUsd(false).then(()=>{
      if(displayCurrency==='PHP') render();
    });
  }
}
function requestDisplayCurrencyChange(next){
  const val=String(next||'').toUpperCase();
  if(!DISPLAY_CURRENCIES.includes(val)) return;
  if(val===displayCurrency) return;

  const from=displayCurrency;
  const to=val;
  openConfirmModal(
    'Switch display currency?',
    `This will convert values from ${from} to ${to} for display. Converted amounts may change based on the latest exchange rate.`,
    `Switch to ${to}`,
    ()=>setDisplayCurrency(to),
    'primary'
  );
}

function updateCurrencyDropdownUi(){
  const valEl=document.getElementById('currency-dd-val');
  if(valEl) valEl.textContent=displayCurrency;
  document.querySelectorAll('.currency-dd-item').forEach(item=>{
    item.classList.toggle('active',item.dataset.currency===displayCurrency);
  });
}
function closeCurrencyDropdown(){
  const dd=document.getElementById('currency-dd');
  const btn=document.getElementById('currency-dd-btn');
  if(dd) dd.classList.remove('open');
  if(btn){
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
  }
}
function toggleCurrencyDropdown(ev){
  if(ev) ev.stopPropagation();
  const dd=document.getElementById('currency-dd');
  const btn=document.getElementById('currency-dd-btn');
  if(!dd || !btn) return;
  const willOpen=!dd.classList.contains('open');
  closeCurrencyDropdown();
  if(willOpen){
    dd.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded','true');
  }
}
function initCurrencyDropdown(){
  const dd=document.getElementById('currency-dd');
  const btn=document.getElementById('currency-dd-btn');
  if(!dd || !btn) return;

  btn.addEventListener('click',toggleCurrencyDropdown);
  dd.querySelectorAll('.currency-dd-item').forEach(item=>{
    item.addEventListener('click',ev=>{
      ev.stopPropagation();
      const next=item.dataset.currency;
      if(next) requestDisplayCurrencyChange(next);
      closeCurrencyDropdown();
    });
  });
  document.addEventListener('click',ev=>{
    if(!dd.contains(ev.target)) closeCurrencyDropdown();
  });
  updateCurrencyDropdownUi();
}

restorePriceSnapshots();
ensureGoalShape();

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
  });
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

function manualAmountToBase(wallet){
  ensureManualWalletShape(wallet);
  return currencyToBase(wallet.amountValue,wallet.amountCurrency);
}

function normalizeAccountWallets(accountList){
  (accountList||[]).forEach(a=>{
    if(!Array.isArray(a.wallets)) a.wallets=[];
    a.wallets.forEach(w=>{
      ensureCexWalletShape(w);
      ensureManualWalletShape(w);
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
function buildWeeklyPnlPoints(){
  const anchors=[21,14,7,0];
  return anchors.map(back=>{
    const d=new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()-back);
    const key=localDateKey(d);
    return {label:fmtDateKey(key),key,value:snapshotValueForKeyOrZero(key)};
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
  if(days===31) return buildWeeklyPnlPoints();
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
  return acc?.name || `Account ${id}`;
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
function hasAccountSnapshotOnOrBefore(targetKey){
  const accountKeys=Object.keys(pnlAccountHistory).sort();
  for(const k of accountKeys){
    if(k>targetKey) break;
    const snap=pnlAccountHistory[k];
    if(snap && typeof snap==='object') return true;
  }
  return false;
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

  const isLongRange=days===7 || days===31 || days===365;
  const noHistoricalAccountBaseline=!baseline || !hasAccountSnapshotOnOrBefore(baseline.key);
  if(isLongRange && noHistoricalAccountBaseline && hasDayOpen){
    const impacts=accountImpactBetweenSnapshots(dayOpen,currentSnap);
    if(impacts.length) return impacts;
  }

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
    return;
  }

  const maxRows=6;
  const shown=impacts.slice(0,maxRows);
  const hidden=impacts.length-shown.length;
  const rows=shown.map(item=>{
    const sign=item.delta>=0?'+':'-';
    const tone=item.delta>0?'pos':item.delta<0?'neg':'neu';
    return `<div class="pnl-impact-row"><span class="pnl-impact-name">${item.name}</span><span class="pnl-impact-pct ${tone}">${sign}${fmt(Math.abs(item.delta))}</span></div>`;
  });
  if(hidden>0){
    rows.push(`<div class="pnl-impact-row"><span class="pnl-impact-name">+${hidden} more</span><span class="pnl-impact-pct neu">--</span></div>`);
  }
  listEl.innerHTML=rows.join('');
}
function pnlForPeriodDisplay(current,days,sortedKeys){
  const baseline=periodBaselineFromBuckets(days,sortedKeys);
  return pnlFromBaseline(current,baseline);
}
function pnlTone(v){ return v>0?'pos':v<0?'neg':'neu'; }
function openPnlDetailModal(days){
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
  document.getElementById('pnlDetailOverlay').classList.remove('open');
}
function renderPnlChart(points){
  const svg=document.getElementById('pnl-chart');
  if(!svg) return;
  if(!points.length){
    svg.innerHTML='';
    return;
  }
  const width=320, height=160, pad=14;
  const vals=points.map(p=>phpToDisplay(p.value));
  let min=Math.min(...vals), max=Math.max(...vals);
  if(!Number.isFinite(min)||!Number.isFinite(max)){
    svg.innerHTML='';
    return;
  }
  if(max===min){
    max+=1;
    min-=1;
  }
  const xAt=(i)=>pad+(i*(width-pad*2))/Math.max(vals.length-1,1);
  const yAt=(v)=>height-pad-((v-min)/(max-min))*(height-pad*2);
  const linePoints=vals.map((v,i)=>`${xAt(i)},${yAt(v)}`).join(' ');
  const areaPoints=`${pad},${height-pad} ${linePoints} ${xAt(vals.length-1)},${height-pad}`;
  const tone=vals[vals.length-1]>vals[0]?'var(--green)':vals[vals.length-1]<vals[0]?'var(--red)':'var(--text3)';
  svg.innerHTML=`
    <line x1="${pad}" y1="${height-pad}" x2="${width-pad}" y2="${height-pad}" stroke="var(--border)" stroke-width="1" />
    <polygon points="${areaPoints}" fill="rgba(96,165,250,0.12)" />
    <polyline points="${linePoints}" fill="none" stroke="${tone}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="${xAt(vals.length-1)}" cy="${yAt(vals[vals.length-1])}" r="3" fill="${tone}" />
  `;
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
function fmtGoal(){return currencySymbol(goalCurrency)+fmtUiNumber(goalValue,CURRENCY_DECIMALS,CURRENCY_DECIMALS);}
function walletDisplayName(w){
  if(w?.type==='crypto') return String(w.name||'').trim() || 'DEX Wallet';
  if(w?.type==='cex') return String(w.name||'').trim() || 'CEX Wallet';
  return String(w?.name||'').trim() || 'Wallet';
}
function walletMetaLabel(w){
  if(w?.type==='crypto') return `Dex Wallet | ${short(w.addr)}`;
  if(w?.type==='cex') return 'CEX Wallet';
  return 'Wallet';
}
function walletLabel(w){
  if(w?.type==='crypto') return walletDisplayName(w);
  if(w?.type==='cex') return walletDisplayName(w);
  return walletDisplayName(w);
}

function openRenameWalletModal(accId,wId){
  closeMenus();
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===wId);
  if(!acc||!w||(w.type!=='crypto'&&w.type!=='cex')) return;
  pendingWalletRename={accId,wId};
  document.getElementById('rename-wallet-sub').textContent=`Update the wallet name in "${acc.name}".`;
  const input=document.getElementById('rename-wallet-input');
  input.value=walletDisplayName(w);
  document.getElementById('renameWalletOverlay').classList.add('open');
  setTimeout(()=>{input.focus();input.select();},100);
}
function closeRenameWalletModal(){
  document.getElementById('renameWalletOverlay').classList.remove('open');
  pendingWalletRename=null;
}
function confirmRenameWallet(){
  if(!pendingWalletRename) return;
  const next=document.getElementById('rename-wallet-input').value.trim();
  if(!next) return;
  const acc=accounts.find(a=>a.id===pendingWalletRename.accId);const w=acc?.wallets.find(x=>x.id===pendingWalletRename.wId);
  if(!acc||!w) return;
  w.name=next;
  closeRenameWalletModal();
  save();
  render();
}

function openGoalModal(){
  goalAmount=currencyToBase(goalValue,goalCurrency);
  document.getElementById('goal-input').value=fmtUiInput(phpToDisplay(goalAmount),CURRENCY_DECIMALS);
  const goalLbl=document.getElementById('goal-input-lbl');
  if(goalLbl) goalLbl.textContent=`Goal Amount (${moneySymbol()})`;
  document.getElementById('goalOverlay').classList.add('open');
  setTimeout(()=>{const input=document.getElementById('goal-input');input.focus();input.select();},100);
}
function closeGoalModal(){document.getElementById('goalOverlay').classList.remove('open');}
function confirmGoalUpdate(){
  const nextDisplay=parseFloat(document.getElementById('goal-input').value);
  if(!Number.isFinite(nextDisplay) || nextDisplay<=0) return;
  goalCurrency=displayCurrency;
  goalValue=nextDisplay;
  goalAmount=currencyToBase(goalValue,goalCurrency);
  closeGoalModal(); save(); render();
}

function openSettingsModal(){
  const fileInput=document.getElementById('settings-import-file');
  if(fileInput) fileInput.value='';
  document.getElementById('settingsOverlay').classList.add('open');
}
function closeSettingsModal(){
  document.getElementById('settingsOverlay').classList.remove('open');
}
function openStatusModal(title,msg){
  document.getElementById('status-title').textContent=title||'Success';
  document.getElementById('status-sub').textContent=msg||'Operation completed successfully.';
  document.getElementById('statusOverlay').classList.add('open');
}
function closeStatusModal(){
  document.getElementById('statusOverlay').classList.remove('open');
}
function showExportSuccessAfterSaveInteraction(){
  let shown=false;
  let fallbackId=null;
  const cleanup=()=>{
    window.removeEventListener('focus',onFocus);
    document.removeEventListener('visibilitychange',onVisibility);
    if(fallbackId!==null) clearTimeout(fallbackId);
  };
  const done=()=>{
    if(shown) return;
    shown=true;
    cleanup();
    openStatusModal('Success','Backup exported successfully.');
  };
  const onFocus=()=>setTimeout(done,100);
  const onVisibility=()=>{ if(!document.hidden) setTimeout(done,100); };

  window.addEventListener('focus',onFocus,{once:true});
  document.addEventListener('visibilitychange',onVisibility);
  fallbackId=setTimeout(done,2200);
}
function makeBackupPayload(){
  return {
    app:'llion',
    version:1,
    exportedAt:new Date().toISOString(),
    data:{
      accounts,
      goalAmount,
      goalValue,
      goalCurrency,
      pnlHistory,
      pnlAccountHistory,
      pnlDayOpenAccountHistory,
      displayCurrency,
      collapsed:[...collapsed],
      cgPriceCache:CG_PRICE_CACHE,
      cgSymbolCache:CEX_SYMBOL_CACHE
    }
  };
}
function exportSettingsData(){
  try{
    const payload=makeBackupPayload();
    const stamp=new Date().toISOString().slice(0,19).replace(/[T:]/g,'-');
    const filename=`llion-backup-${stamp}.json`;
    const jsonText=JSON.stringify(payload,null,2);
    exportSettingsDataNative(filename,jsonText)
      .then((handled)=>{
        if(handled){
          openStatusModal('Success','Backup exported successfully.');
          return;
        }
        const blob=new Blob([jsonText],{type:'application/json'});
        const url=URL.createObjectURL(blob);
        const a=document.createElement('a');
        a.href=url;
        a.download=filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=>URL.revokeObjectURL(url),1000);
        showExportSuccessAfterSaveInteraction();
      })
      .catch(()=>{
        alert('Could not export backup on this device.');
      });
  }catch{
    alert('Could not export backup on this device.');
  }
}

async function exportSettingsDataNative(filename,jsonText){
  const cap=window.Capacitor;
  if(!cap?.isNativePlatform?.()) return false;
  const Filesystem=cap?.Plugins?.Filesystem;
  const Share=cap?.Plugins?.Share;
  if(!Filesystem || !Share) return false;

  const path=`llion/${filename}`;
  await Filesystem.writeFile({
    path,
    data:jsonText,
    directory:'Documents',
    encoding:'utf8',
    recursive:true,
  });

  let shareUrl='';
  try{
    const uri=await Filesystem.getUri({path,directory:'Documents'});
    shareUrl=String(uri?.uri||'');
  }catch{}

  const canShare=await Share.canShare?.();
  if(canShare && canShare.value===false) throw new Error('Share not supported');

  await Share.share({
    title:'Llion Backup',
    text:'Llion backup JSON file',
    url:shareUrl||undefined,
    dialogTitle:'Export Backup',
  });
  return true;
}
function parseBackupData(raw){
  if(!raw || typeof raw!=='object') return null;
  const src=raw.data && typeof raw.data==='object' ? raw.data : raw;
  if(!Array.isArray(src.accounts)) return null;

  const nextGoal=num(src.goalAmount);
  const nextGoalValue=num(src.goalValue);
  const nextGoalCurrency=String(src.goalCurrency||'').toUpperCase();
  const safeGoalCurrency=nextGoalCurrency==='PHP'||nextGoalCurrency==='USD'
    ? nextGoalCurrency
    : 'USD';
  const nextPnl=src.pnlHistory && typeof src.pnlHistory==='object' ? src.pnlHistory : {};
  const nextPnlByAcc=src.pnlAccountHistory && typeof src.pnlAccountHistory==='object' ? src.pnlAccountHistory : {};
  const nextPnlDayOpenByAcc=src.pnlDayOpenAccountHistory && typeof src.pnlDayOpenAccountHistory==='object' ? src.pnlDayOpenAccountHistory : {};
  const nextCurrency=String(src.displayCurrency||'USD').toUpperCase();
  const nextCollapsed=Array.isArray(src.collapsed) ? src.collapsed : [];
  const nextCgPrice=src.cgPriceCache && typeof src.cgPriceCache==='object' ? src.cgPriceCache : {};
  const nextCgSymbol=src.cgSymbolCache && typeof src.cgSymbolCache==='object' ? src.cgSymbolCache : {};

  return {
    accounts:src.accounts,
    goalAmount:Number.isFinite(nextGoal) && nextGoal>0 ? nextGoal : GOAL_DEFAULT_USD,
    goalValue:Number.isFinite(nextGoalValue) && nextGoalValue>0 ? nextGoalValue : null,
    goalCurrency:safeGoalCurrency,
    pnlHistory:nextPnl,
    pnlAccountHistory:nextPnlByAcc,
    pnlDayOpenAccountHistory:nextPnlDayOpenByAcc,
    displayCurrency:DISPLAY_CURRENCIES.includes(nextCurrency) ? nextCurrency : 'USD',
    collapsed:nextCollapsed,
    cgPriceCache:nextCgPrice,
    cgSymbolCache:nextCgSymbol
  };
}
async function importSettingsData(ev){
  const file=ev?.target?.files?.[0];
  if(!file) return;
  try{
    const raw=await file.text();
    const parsed=JSON.parse(raw);
    const next=parseBackupData(parsed);
    if(!next) throw new Error('Invalid backup file');

    accounts=next.accounts;
    normalizeAccountWallets(accounts);
    goalAmount=next.goalAmount;
    goalCurrency=next.goalCurrency;
    goalValue=next.goalValue;
    ensureGoalShape();
    pnlHistory=next.pnlHistory;
    pnlAccountHistory=next.pnlAccountHistory;
    pnlDayOpenAccountHistory=next.pnlDayOpenAccountHistory;
    displayCurrency=next.displayCurrency;
    CG_PRICE_CACHE=next.cgPriceCache;
    CEX_SYMBOL_CACHE=next.cgSymbolCache;

    collapsed.clear();
    next.collapsed.forEach(id=>collapsed.add(id));

    localStorage.setItem('llion_accounts',JSON.stringify(accounts));
    localStorage.setItem('llion_goal',String(goalAmount));
    localStorage.setItem(GOAL_VALUE_KEY,String(goalValue));
    localStorage.setItem(GOAL_CURRENCY_KEY,goalCurrency);
    localStorage.setItem('llion_pnl_history',JSON.stringify(pnlHistory));
    localStorage.setItem(PNL_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlAccountHistory));
    localStorage.setItem(PNL_DAY_OPEN_ACCOUNT_HISTORY_KEY,JSON.stringify(pnlDayOpenAccountHistory));
    localStorage.setItem('llion_display_currency',displayCurrency);
    localStorage.setItem('llion_collapsed',JSON.stringify([...collapsed]));
    localStorage.setItem('llion_cg_price_cache',JSON.stringify(CG_PRICE_CACHE));
    localStorage.setItem('llion_cg_symbol_cache',JSON.stringify(CEX_SYMBOL_CACHE));
    markDataUpdated();

    render();
    closeSettingsModal();
    openStatusModal('Success','Backup imported successfully.');
  }catch{
    alert('Import failed. Please use a valid Llion backup JSON file.');
  }finally{
    if(ev?.target) ev.target.value='';
  }
}

function openConfirmModal(title, sub, actionLabel, action, tone='danger'){
  pendingConfirmAction=action;
  document.getElementById('confirm-title').textContent=title;
  document.getElementById('confirm-sub').textContent=sub;
  const btn=document.getElementById('confirm-ok');
  btn.textContent=actionLabel || 'Confirm';
  btn.classList.toggle('btn-danger', tone==='danger');
  btn.classList.toggle('btn-ok', tone!=='danger');
  document.getElementById('confirmOverlay').classList.add('open');
}
function closeConfirmModal(){document.getElementById('confirmOverlay').classList.remove('open');pendingConfirmAction=null;}
function confirmDangerAction(){
  const action=pendingConfirmAction;
  closeConfirmModal();
  if(action) action();
}

function openValueEditModal({title,sub,current,kind,accId,walletId,tokId=null}){
  pendingValueEdit={kind,accId,walletId,tokId,current};
  selectedValueEditAction='adjust';
  const actionGrid=document.getElementById('value-action-grid');
  let manualCurrency=displayCurrency;
  if(kind==='manual'){
    const acc=accounts.find(a=>a.id===accId);
    const w=acc?.wallets.find(x=>x.id===walletId);
    if(w&&w.type==='manual'){
      ensureManualWalletShape(w);
      const baseCurrent=manualAmountToBase(w);
      manualCurrency=displayCurrency;
      pendingValueEdit.currency=manualCurrency;
      pendingValueEdit.currentDisplay=baseToCurrency(baseCurrent,manualCurrency);
    }
  }
  const activeCurrency=kind==='manual' ? manualCurrency : displayCurrency;
  const isCexToken=kind==='cex-token';
  document.getElementById('value-edit-title').textContent=title;
  document.getElementById('value-edit-sub').textContent=sub;
  document.getElementById('value-edit-current').textContent=isCexToken
    ? `Current: ${fmtQty(current||0)} tokens`
    : `Current: ${kind==='manual' ? `${currencySymbol(activeCurrency)}${fmtUiNumber((pendingValueEdit.currentDisplay||0),CURRENCY_DECIMALS,CURRENCY_DECIMALS)}` : fmt(current)}`;
  const initialInputValue=fmtUiInput(
    isCexToken
      ? (current||0)
      : kind==='manual'
        ? (pendingValueEdit.currentDisplay||0)
        : phpToDisplay(current||0),
    isCexToken ? TOKEN_DECIMALS : CURRENCY_DECIMALS
  );
  pendingValueEdit.initialInputValue=initialInputValue;
  document.getElementById('value-amount').value=initialInputValue;
  document.getElementById('value-amount-lbl').textContent=isCexToken?'Total Tokens':`New Total (${currencySymbol(activeCurrency)})`;
  actionGrid.style.display=isCexToken?'none':'grid';
  ['adjust','income','expense'].forEach(a=>{
    document.getElementById('act-'+a).classList.toggle('selected', a==='adjust');
  });
  checkValueEditReady();
  document.getElementById('valueEditOverlay').classList.add('open');
  setTimeout(()=>{const i=document.getElementById('value-amount');i.focus();i.select();},100);
}
function openManualValueModal(accId,walletId){
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===walletId);
  if(!w||w.type!=='manual')return;
  ensureManualWalletShape(w);
  openValueEditModal({
    title:`Edit "${w.name}"`,
    sub:`Apply a value update in "${acc.name}".`,
    current:manualAmountToBase(w),
    kind:'manual',
    accId,
    walletId
  });
}
function openCexTokenValueModal(accId,walletId,tokId){
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===walletId);
  const raw=w?.toks?.find(x=>x.id===tokId);
  if(!w||w.type!=='cex'||!raw)return;
  const t=ensureCexTokenShape(raw);
  openValueEditModal({
    title:`Adjust token "${t.sym}"`,
    sub:`Set the new total token quantity in ${walletLabel(w)}.`,
    current:num(t.qty)||0,
    kind:'cex-token',
    accId,
    walletId,
    tokId
  });
}
function closeValueEditModal(){
  document.getElementById('valueEditOverlay').classList.remove('open');
  document.getElementById('value-action-grid').style.display='grid';
  pendingValueEdit=null;
  selectedValueEditAction='adjust';
}
function selectValueEditAction(action){
  if(pendingValueEdit?.kind==='cex-token') return;
  selectedValueEditAction=action;
  const activeCurrency=pendingValueEdit?.kind==='manual'
    ? (pendingValueEdit?.currency||displayCurrency)
    : displayCurrency;
  ['adjust','income','expense'].forEach(a=>{
    document.getElementById('act-'+a).classList.toggle('selected', a===action);
  });
  document.getElementById('value-amount-lbl').textContent=action==='adjust'
    ? `New Total (${currencySymbol(activeCurrency)})`
    : `Amount (${currencySymbol(activeCurrency)})`;
  if(action==='adjust' && pendingValueEdit){
    const initialInputValue=fmtUiInput(
      pendingValueEdit.kind==='manual'
        ? (pendingValueEdit.currentDisplay||0)
        : phpToDisplay(pendingValueEdit.current||0),
      pendingValueEdit.kind==='cex-token' ? TOKEN_DECIMALS : CURRENCY_DECIMALS
    );
    pendingValueEdit.initialInputValue=initialInputValue;
    document.getElementById('value-amount').value=initialInputValue;
    const i=document.getElementById('value-amount');
    i.focus();
    i.select();
  }
  checkValueEditReady();
}
function checkValueEditReady(){
  const amt=parseFloat(document.getElementById('value-amount').value);
  document.getElementById('value-edit-ok').disabled=!(Number.isFinite(amt)&&amt>=0&&pendingValueEdit);
}
function applyValueEdit(){
  if(!pendingValueEdit)return;
  const rawInput=document.getElementById('value-amount').value.trim();
  const rawAmt=num(rawInput);
  if(rawAmt===null||rawAmt<0)return;

  const {kind,accId,walletId,tokId,current}=pendingValueEdit;
  const usedInitial=selectedValueEditAction==='adjust' && rawInput===String(pendingValueEdit.initialInputValue||'');
  const amt=kind==='cex-token'
    ? (usedInitial ? (current||0) : rawAmt)
    : kind==='manual'
      ? (usedInitial ? (pendingValueEdit.currentDisplay||0) : rawAmt)
      : (usedInitial ? (current||0) : displayToPhp(rawAmt));
  const next=(kind==='cex-token' || selectedValueEditAction==='adjust')
    ? amt
    : selectedValueEditAction==='income'
      ? current+amt
      : Math.max(0,current-amt);

  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===walletId);
  if(!acc||!w)return;

  if(kind==='manual' && w.type==='manual'){
    ensureManualWalletShape(w);
    const pendingCurrency=pendingValueEdit?.currency||displayCurrency;
    const currentDisplay=Number.isFinite(num(pendingValueEdit?.currentDisplay))
      ? pendingValueEdit.currentDisplay
      : baseToCurrency(manualAmountToBase(w),pendingCurrency);
    const manualNext=(selectedValueEditAction==='adjust')
      ? (usedInitial ? currentDisplay : rawAmt)
      : selectedValueEditAction==='income'
        ? currentDisplay+rawAmt
        : Math.max(0,currentDisplay-rawAmt);
    w.amountCurrency=pendingCurrency;
    w.amountValue=manualNext;
    w.amount=currencyToBase(manualNext,pendingCurrency);
  } else if(kind==='cex-token' && w.type==='cex'){
    const t=w.toks?.find(x=>x.id===tokId);
    if(!t)return;
    t.qty=next;
  } else {
    return;
  }

  closeValueEditModal();
  save();
  render();
}

function buildCatGrid(){
  const g=document.getElementById('cat-grid'); g.innerHTML='';
  MANUAL_CATS.forEach(c=>{
    const d=document.createElement('div');
    d.className='cat-chip'+(selectedCat===c.id?' selected':'');
    d.dataset.catId=c.id;
    d.innerHTML=svg(c.lucide,11)+` ${c.label}`;
    d.onclick=()=>selectCat(c.id); g.appendChild(d);
  });
}
function selectCat(id){
  selectedCat=id;
  document.querySelectorAll('.cat-chip').forEach(c=>{
    c.classList.toggle('selected', c.dataset.catId===id);
  });
  checkWalletFormReady();
}

function openAddAccount(){document.getElementById('acc-name').value='';document.getElementById('addAccOverlay').classList.add('open');setTimeout(()=>document.getElementById('acc-name').focus(),100);}
function closeAddAccount(){document.getElementById('addAccOverlay').classList.remove('open');}
function confirmAddAccount(){
  const name=document.getElementById('acc-name').value.trim()||`Account ${accounts.length+1}`;
  accounts.push({id:Date.now(),name,wallets:[]});
  closeAddAccount(); save(); render();
}

function tokenOptLabel(t){
  return `${t.name} (${t.sym}) | ${t.id}${t.php>0?` | ${fmt(t.php)}`:' | no price'}`;
}
function fillMatchSelect(selectId, items){
  const sel=document.getElementById(selectId);
  sel.innerHTML='<option value="">Select token...</option>';
  items.forEach((t,i)=>{
    const o=document.createElement('option');
    o.value=String(i);
    o.textContent=tokenOptLabel(t);
    sel.appendChild(o);
  });
  sel.value='';
}

function resetCexAddLookupUI(){
  pendingCexWalletToken=null;
  pendingCexWalletMatches=[];
  document.getElementById('cex-add-match-wrap').style.display='none';
  document.getElementById('cex-add-match').innerHTML='';
  document.getElementById('cex-add-err').textContent='Token not found on CoinGecko. Try exact symbol (e.g. ETH, USDT).';
  ['cex-add-loading','cex-add-err','cex-add-prev'].forEach(id=>document.getElementById(id).classList.remove('show'));
}
function onCexAddMatchChange(){
  const v=document.getElementById('cex-add-match').value;
  const idx=parseInt(v,10);
  if(!Number.isInteger(idx) || !pendingCexWalletMatches[idx]){
    pendingCexWalletToken=null;
    document.getElementById('cex-add-prev').classList.remove('show');
    checkWalletFormReady();
    return;
  }
  pendingCexWalletToken=pendingCexWalletMatches[idx];
  updateCexAddPreview();
}
function updateCexAddPreview(){
  if(!pendingCexWalletToken){ checkWalletFormReady(); return; }
  const qty=num(document.getElementById('mw-amount').value);
  const token=pendingCexWalletToken;
  const total=(qty!==null&&qty>=0)?qty*(token.php||0):0;
  document.getElementById('cex-add-name').textContent=`${token.name} (${token.sym})`;
  document.getElementById('cex-add-detail').innerHTML=`Coin: <span class="hi">${token.id}</span><br>Price: <span class="hi">${fmt(token.php||0)}</span> per token<br>Total: <span class="hi">${fmt(total)}</span>`;
  document.getElementById('cex-add-prev').classList.add('show');
  checkWalletFormReady();
}
async function lookupCexAddToken(symbol){
  document.getElementById('cex-add-loading').classList.add('show');
  document.getElementById('cex-add-err').classList.remove('show');
  const matches=await findCoinsBySymbol(symbol);
  if(selectedWalletType!=='cex') return;
  document.getElementById('cex-add-loading').classList.remove('show');
  if(!matches.length){
    pendingCexWalletToken=null;
    pendingCexWalletMatches=[];
    document.getElementById('cex-add-match-wrap').style.display='none';
    document.getElementById('cex-add-prev').classList.remove('show');
    document.getElementById('cex-add-err').classList.add('show');
    checkWalletFormReady();
    return;
  }
  pendingCexWalletMatches=matches;
  if(matches.length===1){
    document.getElementById('cex-add-match-wrap').style.display='none';
    pendingCexWalletToken=matches[0];
    updateCexAddPreview();
    return;
  }
  pendingCexWalletToken=null;
  fillMatchSelect('cex-add-match',matches);
  document.getElementById('cex-add-match-wrap').style.display='block';
  document.getElementById('cex-add-prev').classList.remove('show');
  document.getElementById('cex-add-err').classList.remove('show');
  checkWalletFormReady();
}
function onCexAddTokInput(){
  clearTimeout(cexAddLookupTimer);
  pendingCexWalletToken=null;
  pendingCexWalletMatches=[];
  document.getElementById('cex-add-match-wrap').style.display='none';
  document.getElementById('cex-add-match').innerHTML='';
  document.getElementById('cex-add-err').textContent='Token not found on CoinGecko. Try exact symbol (e.g. ETH, USDT).';
  ['cex-add-loading','cex-add-err','cex-add-prev'].forEach(id=>document.getElementById(id).classList.remove('show'));
  const sym=document.getElementById('cex-token-name').value.trim();
  if(sym.length<2){ checkWalletFormReady(); return; }
  cexAddLookupTimer=setTimeout(()=>lookupCexAddToken(sym),450);
  checkWalletFormReady();
}

function openAddWalletType(accId){
  addWalletForAcc=accId; selectedWalletType=null; selectedCat=null;
  pendingCexWalletToken=null;
  ['tc-dex','tc-cex','tc-manual'].forEach(id=>document.getElementById(id).classList.remove('selected'));
  document.getElementById('dex-fields').style.display='none';
  document.getElementById('manual-fields').style.display='none';
  document.getElementById('manual-category-group').style.display='block';
  document.getElementById('cex-token-group').style.display='none';
  document.getElementById('cex-info').classList.remove('show');
  document.getElementById('wtype-ok').disabled=true;
  document.getElementById('cw-addr').value='';
  document.getElementById('mw-name').value='';
  document.getElementById('cex-token-name').value='';
  document.getElementById('mw-amount').value='';
  resetCexAddLookupUI();
  document.getElementById('mw-name-lbl').textContent='Label';
  document.getElementById('mw-amount-lbl').textContent=`Amount (${moneySymbol()})`;
  document.getElementById('cex-token-lbl').textContent='Token Symbol';
  document.getElementById('mw-name').placeholder='e.g. Cash, Bank, E-Wallet...';
  const acc=accounts.find(a=>a.id===accId);
  document.getElementById('wtype-sub').textContent=`Adding to "${acc?.name}"`;
  buildCatGrid();
  document.getElementById('addWalletTypeOverlay').classList.add('open');
}
function closeAddWalletType(){document.getElementById('addWalletTypeOverlay').classList.remove('open');addWalletForAcc=null;}

let selectedDexChain = 'evm'; // 'evm' or 'sol'

function setDexChain(chain) {
  selectedDexChain = chain;
  document.getElementById('dex-evm-btn').classList.toggle('selected', chain === 'evm');
  document.getElementById('dex-sol-btn').classList.toggle('selected', chain === 'sol');
  document.getElementById('dex-evm-fields').style.display = chain === 'evm' ? 'block' : 'none';
  document.getElementById('dex-sol-fields').style.display = chain === 'sol' ? 'block' : 'none';
  checkWalletFormReady();
  setTimeout(() => {
    if (chain === 'evm') document.getElementById('cw-addr').focus();
    else document.getElementById('cw-sol-addr').focus();
  }, 50);
}

function selectWalletType(type){
  selectedWalletType=type;
  ['tc-dex','tc-cex','tc-manual'].forEach(id=>document.getElementById(id).classList.remove('selected'));
  document.getElementById('tc-'+type).classList.add('selected');
  document.getElementById('dex-fields').style.display=type==='dex'?'block':'none';
  document.getElementById('manual-fields').style.display=type==='manual'?'block':'none';
  document.getElementById('cex-info').classList.toggle('show', type==='cex');
  document.getElementById('manual-category-group').style.display=type==='manual'?'block':'none';
  document.getElementById('cex-token-group').style.display=type==='cex'?'block':'none';
  document.getElementById('mw-name-lbl').textContent=type==='cex'?'Wallet Name':'Label';
  document.getElementById('mw-amount-lbl').textContent=type==='cex'?'Token Quantity':`Amount (${moneySymbol()})`;
  document.getElementById('mw-name').placeholder=type==='cex'?'e.g. Binance, Coinbase, Gate.io...':'e.g. Cash, Bank, E-Wallet...';
  if(type==='cex'){
    document.getElementById('manual-fields').style.display='block';
    selectedCat=null;
    resetCexAddLookupUI();
    setTimeout(()=>document.getElementById('mw-name').focus(),50);
  }
  if(type==='manual') buildCatGrid();
  if(type==='dex') setDexChain('evm'); // default to EVM on open
  checkWalletFormReady();
  if(type==='manual') setTimeout(()=>document.getElementById('mw-name').focus(),50);
}

function isValidSolAddress(addr) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr);
}

function checkWalletFormReady(){
  let ok=false;
  if(selectedWalletType==='dex') {
    if(selectedDexChain==='evm') {
      ok=document.getElementById('cw-addr').value.trim().startsWith('0x');
    } else if(selectedDexChain==='sol') {
      ok=isValidSolAddress(document.getElementById('cw-sol-addr').value.trim());
    }
  }
  if(selectedWalletType==='manual') ok=document.getElementById('mw-name').value.trim().length>0;
  if(selectedWalletType==='cex'){
    const w=document.getElementById('mw-name').value.trim();
    const a=num(document.getElementById('mw-amount').value);
    ok=w.length>0&&pendingCexWalletToken&&a!==null&&a>0;
  }
  document.getElementById('wtype-ok').disabled=!ok;
}

function confirmAddWallet(){
  const acc=accounts.find(a=>a.id===addWalletForAcc);if(!acc)return;
  if(selectedWalletType==='dex'){
    if(selectedDexChain==='evm') {
      const addr=document.getElementById('cw-addr').value.trim();
      if(!addr.startsWith('0x')||addr.length<40)return alert('Invalid address');
      if(acc.wallets.find(w=>w.type==='crypto'&&w.addr.toLowerCase()===addr.toLowerCase()))return alert('Already added');
      const w={id:Date.now(),type:'crypto',name:'EVM',addr,nets:[],toks:[],scanning:true, chain:'evm'};
      acc.wallets.push(w); closeAddWalletType(); save(); render();
      (async()=>{await scanNative(w);await fetchTokBals(w);w.scanning=false;w.lastScan=Date.now();save();render();})();
    } else if(selectedDexChain==='sol') {
      const addr=document.getElementById('cw-sol-addr').value.trim();
      if(!isValidSolAddress(addr)) return alert('Invalid Solana address');
      if(acc.wallets.find(w=>w.type==='crypto'&&w.addr===addr&&w.chain==='sol')) return alert('Already added');
      const w={id:Date.now(),type:'crypto',name:'SVM',addr,nets:[],toks:[],scanning:true, chain:'sol'};
      acc.wallets.push(w); closeAddWalletType(); save(); render();
      (async()=>{await scanSolanaNative(w);w.scanning=false;w.lastScan=Date.now();save();render();})();
    }
  } else if(selectedWalletType==='manual'){
    const name=document.getElementById('mw-name').value.trim();
    const amountDisplay=num(document.getElementById('mw-amount').value);
    const amountValue=amountDisplay===null?0:amountDisplay;
    const amountCurrency=displayCurrency;
    const amount=currencyToBase(amountValue,amountCurrency);
    const cat=getManualCat(selectedCat);
    acc.wallets.push({id:Date.now(),type:'manual',name,cat:cat.id,lucide:cat.lucide,amount,amountValue,amountCurrency});
    closeAddWalletType(); save(); render();
  } else if(selectedWalletType==='cex'){
    const walletName=document.getElementById('mw-name').value.trim();
    const qty=num(document.getElementById('mw-amount').value);
    const tok=pendingCexWalletToken;
    if(!tok||qty===null||qty<=0)return;
    CEXPRICES[tok.id]=tok.php||0;
    acc.wallets.push({
      id:uid(),
      type:'cex',
      name:walletName,
      lucide:'building-2',
      toks:[{id:uid(),sym:tok.sym,name:tok.name,cgid:tok.id,qty,php:tok.php||0}]
    });
    closeAddWalletType(); save(); render();
  }
}

const SOLANA_RPC = 'https://solana-rpc.publicnode.com';
async function scanSolanaNative(w) {
  const prevNets=Array.isArray(w.nets)?[...w.nets]:[];
  let sol = null;
  let fetchError = false;
  try {
    const res = await fetch(SOLANA_RPC, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [w.addr]
      }),
      signal: AbortSignal.timeout(8000)
    });
    const data = await res.json();
    const lamports = Number(data?.result?.value);
    if (Number.isFinite(lamports)) {
      sol = lamports / 1e9;
    } else {
      fetchError = true;
    }
  } catch { fetchError = true; }
  if (!Number.isFinite(PRICES['SOL']) || PRICES['SOL'] <= 0) {
    const cg = await fetchCgSimplePrices(['solana']);
    if (cg && Number.isFinite(cg['solana'])) PRICES['SOL'] = cg['solana'];
  }
  if(sol===null){
    if(prevNets.length) w.nets=prevNets;
    return false;
  }
  w.nets=[{chain: 'Solana', sym: 'SOL', bal: sol, warning: fetchError ? 'Could not fetch balance' : undefined}];
  return true;
}

function removeAccount(id){
  const acc=accounts.find(a=>a.id===id);if(!acc)return;
  openConfirmModal(`Delete account "${acc.name}"?`,'This will remove the account and every wallet inside it.','Delete account',()=>{
    accounts=accounts.filter(a=>a.id!==id);save();render();
  });
}
function removeWallet(accId,wId){
  const acc=accounts.find(a=>a.id===accId);if(!acc)return;
  const wallet=acc.wallets.find(w=>w.id===wId);if(!wallet)return;
  if(acc.wallets.length<=1){
    openConfirmModal(`Delete account "${acc.name}"?`,'This is the last wallet in the account, so deleting it will remove the whole account.','Delete account',()=>{
      accounts=accounts.filter(a=>a.id!==accId);save();render();
    });
    return;
  }
  openConfirmModal(`Delete wallet "${walletLabel(wallet)}"?`,`This will remove it from "${acc.name}".`,'Delete wallet',()=>{
    acc.wallets=acc.wallets.filter(w=>w.id!==wId);save();render();
  });
}
function removeTok(accId,wId,addr,chain){
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===wId);if(!w)return;
  const token=(w.toks||[]).find(t=>t.addr===addr && t.chain===chain);if(!token)return;
  openConfirmModal(`Delete token "${token.sym}"?`,`This will remove ${token.name} from ${walletLabel(w)} in "${acc.name}".`,'Delete token',()=>{
    w.toks=(w.toks||[]).filter(t=>!(t.addr===addr && t.chain===chain));save();render();
  });
}
function removeCexTok(accId,wId,tokId){
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===wId);if(!w||w.type!=='cex')return;
  const token=(w.toks||[]).find(t=>t.id===tokId);if(!token)return;
  openConfirmModal(`Delete token "${token.name}"?`,`This will remove it from ${walletLabel(w)} in "${acc.name}".`,'Delete token',()=>{
    w.toks=(w.toks||[]).filter(t=>t.id!==tokId);save();render();
  });
}

function startRename(accId){
  const acc=accounts.find(a=>a.id===accId);if(!acc)return;
  document.getElementById(`aedit-${accId}`).value=acc.name;
  document.getElementById(`aname-${accId}`).classList.add('hidden');
  document.getElementById(`aedit-${accId}`).classList.add('show');
  document.getElementById(`aedit-${accId}`).focus();
  document.getElementById(`aedit-${accId}`).select();
}
function finishRename(accId){
  const acc=accounts.find(a=>a.id===accId);if(!acc)return;
  const v=document.getElementById(`aedit-${accId}`).value.trim();
  if(v)acc.name=v;
  document.getElementById(`aname-${accId}`).textContent=acc.name;
  document.getElementById(`aname-${accId}`).classList.remove('hidden');
  document.getElementById(`aedit-${accId}`).classList.remove('show');
  save();
}

function toggleMenu(e,key){e.stopPropagation();if(openMenuId===key){closeMenus();return;}closeMenus();const el=document.getElementById('menu-'+key);if(el){el.style.display='block';openMenuId=key;}}
function closeMenus(){document.querySelectorAll('.ctx-menu').forEach(m=>m.style.display='none');openMenuId=null;closeCurrencyDropdown();}
document.addEventListener('click',closeMenus);

function openTokModal(accId,wId,chainName){
  closeMenus();importForAcc=accId;importForWallet=wId;importChain=chainName;pendingTok=null;
  document.getElementById('tok-contract').value='';
  ['tok-prev','tok-err','tok-loading'].forEach(id=>document.getElementById(id).classList.remove('show'));
  document.getElementById('tok-ok').disabled=true;
  document.getElementById('tok-sub').textContent=`Chain: ${chainName}`;
  document.getElementById('tokOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('tok-contract').focus(),100);
}
function closeTokModal(){document.getElementById('tokOverlay').classList.remove('open');importForAcc=importForWallet=importChain=pendingTok=null;}

let ltimer=null;
async function onTokInput(){
  clearTimeout(ltimer);
  ['tok-prev','tok-err','tok-loading'].forEach(id=>document.getElementById(id).classList.remove('show'));
  document.getElementById('tok-ok').disabled=true;pendingTok=null;
  const ca=document.getElementById('tok-contract').value.trim();
  if(importChain === 'Solana') {
    if(!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(ca)) return;
  } else {
    if(!ca.startsWith('0x')||ca.length<40) return;
  }
  ltimer=setTimeout(()=>lookupTok(ca),650);
}
async function lookupTok(contract){
  const acc=accounts.find(a=>a.id===importForAcc);const w=acc?.wallets.find(x=>x.id===importForWallet);if(!w)return;
  document.getElementById('tok-loading').classList.add('show');
  if(importChain === 'Solana') {
    try {
      const mint = contract;
      const SPL_KNOWN = {
        'EPeUFDgHRxs9xxEPVaL6kfGQvCon7jmAWKVUHuux1Tpz': {
          symbol: 'BAT',
          name: 'Basic Attention Token',
          decimals: 8,
          coingecko: 'basic-attention-token'
        }
      };

      let symbol = null;
      let name = null;
      let decimals = 9;
      let cgid = null;
      let phpFromContract = null;

      if (SPL_KNOWN[mint]) {
        symbol = SPL_KNOWN[mint].symbol;
        name = SPL_KNOWN[mint].name;
        decimals = SPL_KNOWN[mint].decimals;
        cgid = SPL_KNOWN[mint].coingecko;
      } else {
        try {
          const cgByContract = await cgFetchJson(`https://api.coingecko.com/api/v3/coins/solana/contract/${mint}`);
          if (cgByContract) {
            if (cgByContract.symbol) symbol = String(cgByContract.symbol).toUpperCase();
            if (cgByContract.name) name = String(cgByContract.name);
            if (cgByContract.id) cgid = String(cgByContract.id);
            const p = num(cgByContract?.market_data?.current_price?.usd);
            if (p !== null) phpFromContract = p;
          }
        } catch {}

        try {
          const metaRes = await fetch(`https://api.helius.xyz/v0/tools/metadata?mint=${mint}`);
          if (metaRes.ok) {
            const meta = await metaRes.json();
            if (meta?.symbol) symbol = String(meta.symbol).toUpperCase();
            if (meta?.name) name = String(meta.name);
          }
        } catch {}

        try {
          const res = await fetch(SOLANA_RPC, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({jsonrpc: '2.0', id: 1, method: 'getAccountInfo', params: [mint, {encoding: 'jsonParsed'}]}),
            signal: AbortSignal.timeout(8000)
          });
          const data = await res.json();
          const mintInfo = data?.result?.value?.data?.parsed?.info;
          if (Number.isFinite(Number(mintInfo?.decimals))) decimals = Number(mintInfo.decimals);
        } catch {}

        if (!symbol) symbol = mint.slice(0, 4) + '...' + mint.slice(-4);
        if (!name) name = 'Unknown SPL Token';
      }

      let bal = 0;
      try {
        const res = await fetch(SOLANA_RPC, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({jsonrpc: '2.0', id: 1, method: 'getTokenAccountsByOwner', params: [w.addr, {mint}, {encoding: 'jsonParsed'}]}),
          signal: AbortSignal.timeout(8000)
        });
        const data = await res.json();
        const first = data?.result?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount;
        if (first) bal = Number(first.uiAmount ?? first.uiAmountString ?? 0);
      } catch {}

      let php = 0;
      if (phpFromContract !== null) {
        php = phpFromContract;
      } else if (cgid) {
        const d = await cgFetchJson(`https://api.coingecko.com/api/v3/coins/${cgid}`);
        if (d) php = d.market_data?.current_price?.usd || 0;
      } else if (symbol) {
        const cg = await findCoinsBySymbol(symbol);
        if (cg && cg.length) {
          php = cg[0].php || 0;
          cgid = cg[0].id || null;
        }
      }

      pendingTok = {sym: symbol, name, dec: decimals, bal, php, cgid, addr: mint, chain: 'Solana'};
      TPRICES[mint] = php;
      document.getElementById('tp-name').textContent = `${name} (${symbol})`;
      const phpStr = php ? `<span class=\"hi\">\u20B1${fmtUiNumber(php,CURRENCY_DECIMALS,CURRENCY_DECIMALS)}</span> per token` : 'price not on CoinGecko';
      document.getElementById('tp-detail').innerHTML = `Balance: <span class=\"hi\">${fmtUiNumber(bal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${symbol}</span><br>${phpStr}`;
      document.getElementById('tok-prev').classList.add('show');
      document.getElementById('tok-ok').disabled = false;
      document.getElementById('tok-loading').classList.remove('show');
      return;
    } catch {
      document.getElementById('tok-loading').classList.remove('show');
      document.getElementById('tok-err').classList.add('show');
      return;
    }
  } else {
    const info=await getERC20(importChain,contract,w.addr);
    document.getElementById('tok-loading').classList.remove('show');
    if(!info||!info.sym){document.getElementById('tok-err').classList.add('show');return;}
    let php=0,cgid=null;
    const ch=CHAINS.find(c=>c.name===importChain);
    if(ch?.cgp){
      const d=await cgFetchJson(`https://api.coingecko.com/api/v3/coins/${ch.cgp}/contract/${contract.toLowerCase()}`);
      if(d){ php=d.market_data?.current_price?.usd||0; cgid=d.id||null; }
    }
    pendingTok={sym:info.sym,name:info.name,dec:info.dec,bal:info.bal,php,cgid,addr:contract.toLowerCase(),chain:importChain};
    TPRICES[contract.toLowerCase()]=php;
    document.getElementById('tp-name').textContent=`${info.name} (${info.sym})`;
    const phpStr=php?`<span class=\"hi\">\u20B1${fmtUiNumber(php,CURRENCY_DECIMALS,CURRENCY_DECIMALS)}</span> per token`:'price not on CoinGecko';
    document.getElementById('tp-detail').innerHTML=`Balance: <span class=\"hi\">${fmtUiNumber(info.bal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${info.sym}</span><br>${phpStr}`;
    document.getElementById('tok-prev').classList.add('show');
    document.getElementById('tok-ok').disabled=false;
    return;
  }
}
function confirmImport(){
  if(!pendingTok||importForAcc===null)return;
  const accId=importForAcc;
  const walletId=importForWallet;
  const chainName=importChain;
  const token={...pendingTok};
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===walletId);if(!w)return;
  if(w.toks?.find(t=>t.addr===token.addr&&t.chain===token.chain)){closeTokModal();return;}
  closeTokModal();
  openConfirmModal(
    `Import token "${token.sym}"?`,
    `Add ${token.name} on ${chainName} to ${walletLabel(w)} in "${acc.name}".`,
    'Import token',
    ()=>{
      const targetAcc=accounts.find(a=>a.id===accId);const targetWallet=targetAcc?.wallets.find(x=>x.id===walletId);if(!targetWallet)return;
      if(!targetWallet.toks)targetWallet.toks=[];
      if(targetWallet.toks.find(t=>t.addr===token.addr&&t.chain===token.chain))return;
      targetWallet.toks.push(token);save();render();
    },
    'primary'
  );
}

function openCexTokModal(accId,wId){
  closeMenus();
  cexTokForAcc=accId; cexTokForWallet=wId; pendingCexToken=null; pendingCexTokenMatches=[];
  const acc=accounts.find(a=>a.id===accId);const w=acc?.wallets.find(x=>x.id===wId);if(!w||w.type!=='cex')return;
  document.getElementById('cex-tok-name').value='';
  document.getElementById('cex-tok-amount').value='';
  document.getElementById('cex-tok-match-wrap').style.display='none';
  document.getElementById('cex-tok-match').innerHTML='';
  document.getElementById('cex-tok-err').textContent='Token not found on CoinGecko. Try exact symbol (e.g. ETH, USDT).';
  ['cex-tok-loading','cex-tok-err','cex-tok-prev'].forEach(id=>document.getElementById(id).classList.remove('show'));
  document.getElementById('cex-tok-sub').textContent=`Wallet: ${walletLabel(w)}`;
  document.getElementById('cex-tok-ok').disabled=true;
  document.getElementById('cexTokOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('cex-tok-name').focus(),100);
}
function closeCexTokModal(){
  document.getElementById('cexTokOverlay').classList.remove('open');
  pendingCexToken=null;
  pendingCexTokenMatches=[];
  document.getElementById('cex-tok-match-wrap').style.display='none';
  document.getElementById('cex-tok-match').innerHTML='';
  cexTokForAcc=null; cexTokForWallet=null;
}
function onCexTokMatchChange(){
  const v=document.getElementById('cex-tok-match').value;
  const idx=parseInt(v,10);
  if(!Number.isInteger(idx) || !pendingCexTokenMatches[idx]){
    pendingCexToken=null;
    document.getElementById('cex-tok-prev').classList.remove('show');
    checkCexTokReady();
    return;
  }
  pendingCexToken=pendingCexTokenMatches[idx];
  updateCexImportPreview();
}
function updateCexImportPreview(){
  if(!pendingCexToken){ checkCexTokReady(); return; }
  const qty=num(document.getElementById('cex-tok-amount').value);
  const total=(qty!==null&&qty>=0)?qty*(pendingCexToken.php||0):0;
  document.getElementById('cex-tok-prev-name').textContent=`${pendingCexToken.name} (${pendingCexToken.sym})`;
  document.getElementById('cex-tok-prev-detail').innerHTML=`Coin: <span class="hi">${pendingCexToken.id}</span><br>Price: <span class="hi">${fmt(pendingCexToken.php||0)}</span> per token<br>Total: <span class="hi">${fmt(total)}</span>`;
  document.getElementById('cex-tok-prev').classList.add('show');
  checkCexTokReady();
}
async function lookupCexImportToken(symbol){
  document.getElementById('cex-tok-loading').classList.add('show');
  document.getElementById('cex-tok-err').classList.remove('show');
  const matches=await findCoinsBySymbol(symbol);
  if(cexTokForAcc===null||cexTokForWallet===null) return;
  document.getElementById('cex-tok-loading').classList.remove('show');
  if(!matches.length){
    pendingCexToken=null;
    pendingCexTokenMatches=[];
    document.getElementById('cex-tok-match-wrap').style.display='none';
    document.getElementById('cex-tok-prev').classList.remove('show');
    document.getElementById('cex-tok-err').classList.add('show');
    checkCexTokReady();
    return;
  }
  pendingCexTokenMatches=matches;
  if(matches.length===1){
    document.getElementById('cex-tok-match-wrap').style.display='none';
    pendingCexToken=matches[0];
    updateCexImportPreview();
    return;
  }
  pendingCexToken=null;
  fillMatchSelect('cex-tok-match',matches);
  document.getElementById('cex-tok-match-wrap').style.display='block';
  document.getElementById('cex-tok-prev').classList.remove('show');
  document.getElementById('cex-tok-err').classList.remove('show');
  checkCexTokReady();
}
function onCexTokInput(){
  clearTimeout(cexLookupTimer);
  pendingCexToken=null;
  pendingCexTokenMatches=[];
  document.getElementById('cex-tok-match-wrap').style.display='none';
  document.getElementById('cex-tok-match').innerHTML='';
  document.getElementById('cex-tok-err').textContent='Token not found on CoinGecko. Try exact symbol (e.g. ETH, USDT).';
  ['cex-tok-loading','cex-tok-err','cex-tok-prev'].forEach(id=>document.getElementById(id).classList.remove('show'));
  const sym=document.getElementById('cex-tok-name').value.trim();
  if(sym.length<2){ checkCexTokReady(); return; }
  cexLookupTimer=setTimeout(()=>lookupCexImportToken(sym),450);
  checkCexTokReady();
}
function checkCexTokReady(){
  const amount=num(document.getElementById('cex-tok-amount').value);
  document.getElementById('cex-tok-ok').disabled=!(pendingCexToken&&amount!==null&&amount>0);
}
function confirmCexTokenImport(){
  const qty=num(document.getElementById('cex-tok-amount').value);
  if(!pendingCexToken||qty===null||qty<=0)return;
  const acc=accounts.find(a=>a.id===cexTokForAcc);const w=acc?.wallets.find(x=>x.id===cexTokForWallet);if(!w||w.type!=='cex')return;
  const tok={id:uid(),sym:pendingCexToken.sym,name:pendingCexToken.name,cgid:pendingCexToken.id,qty,php:pendingCexToken.php||0};
  const total=qty*(pendingCexToken.php||0);
  closeCexTokModal();
  openConfirmModal(
    `Import token "${tok.sym}"?`,
    `Add ${fmtQty(qty)} ${tok.sym} to ${walletLabel(w)} in "${acc.name}". Current total: ${fmt(total)}.`,
    'Import token',
    ()=>{
      if((w.toks||[]).some(t=>(t.cgid&&t.cgid===tok.cgid)||String(t.sym||'').toUpperCase()===tok.sym)) return;
      CEXPRICES[tok.cgid]=tok.php;
      w.toks=[...(w.toks||[]),tok];
      save();
      render();
    },
    'primary'
  );
}

function fmt(n){return moneySymbol()+fmtUiNumber(phpToDisplay(n),CURRENCY_DECIMALS,CURRENCY_DECIMALS);}
function short(addr){return addr.slice(0,5)+'...'+addr.slice(-4);}
function fmtEach(price){return price>0?`${fmt(price)} each`:'price unavailable';}
function renderPnlCell(prefix,data){
  const vEl=document.getElementById(prefix+'-v');
  const pEl=document.getElementById(prefix+'-p');
  if(!vEl||!pEl)return;
  if(!data.hasBase){
    vEl.textContent='--';
    pEl.textContent='tracking';
    vEl.className='pnl-val neu';
    pEl.className='pnl-pct neu';
    return;
  }
  const sign=data.value>0?'+':data.value<0?'-':'';
  const signPct=data.pct>0?'+':data.pct<0?'-':'';
  const tone=data.value>0?'pos':data.value<0?'neg':'neu';
  vEl.textContent=`${sign}${fmt(Math.abs(data.value))}`;
  pEl.textContent=data.pctNa ? 'n/a' : `${signPct}${Math.abs(data.pct).toFixed(PERCENT_DECIMALS)}%`;
  vEl.className='pnl-val '+tone;
  pEl.className='pnl-pct '+tone;
}
function accValue(acc){
  let v=0;
  acc.wallets.forEach(w=>{
    ensureCexWalletShape(w);
    ensureManualWalletShape(w);
    if(w.type==='manual'){v+=manualAmountToBase(w);return;}
    if(w.type==='cex'){v+=cexWalletTotal(w);return;}
    (w.nets||[]).forEach(n=>v+=n.bal*(PRICES[n.sym]||0));
    (w.toks||[]).forEach(t=>v+=t.bal*(TPRICES[t.addr]??t.php??0));
  });
  return v;
}

const collapsed = new Set(JSON.parse(localStorage.getItem('llion_collapsed')||'[]'));
function toggleCollapse(accId){
  const body=document.getElementById('abody-'+accId);
  const btn=document.getElementById('acollapse-'+accId);
  if(collapsed.has(accId)){ collapsed.delete(accId); body.classList.remove('collapsed'); btn.classList.remove('closed'); btn.classList.add('open'); }
  else { collapsed.add(accId); body.classList.add('collapsed'); btn.classList.remove('open'); btn.classList.add('closed'); }
  localStorage.setItem('llion_collapsed', JSON.stringify([...collapsed]));
}

let DR = null; // active drag state
const DRAG_START_PX=8;
const DRAG_SWAP_BUFFER_PX=8;

function gripDown(e, type, accId, idx){
  e.preventDefault();
  e.stopPropagation();
  const grip = e.currentTarget;
  const row = grip.closest('[data-drag-item]');
  if(!row) return;
  const rect = row.getBoundingClientRect();
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const ghost = row.cloneNode(true);
  ghost.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;z-index:999;pointer-events:none;background:var(--surface);border:1px solid var(--border);`;
  ghost.classList.add('dragging-ghost');
  document.body.appendChild(ghost);

  row.style.opacity = '0.25';

  DR = { type, accId, idx, row, ghost, offsetY: clientY - rect.top, placeholder: null, targetIdx: idx, startY: clientY, started: false };

  const ph = document.createElement('div');
  ph.style.cssText = `height:${rect.height}px;background:rgba(255,255,255,0.03);border:1px dashed var(--border);`;
  row.parentNode.insertBefore(ph, row.nextSibling);
  DR.placeholder = ph;

  document.addEventListener('mousemove', gripMove, {passive:false});
  document.addEventListener('touchmove', gripMove, {passive:false});
  document.addEventListener('mouseup', gripUp);
  document.addEventListener('touchend', gripUp);
}

function gripMove(e){
  if(!DR) return;
  e.preventDefault();
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  if(!DR.started){
    if(Math.abs(clientY-DR.startY)<DRAG_START_PX) return;
    DR.started=true;
  }
  DR.ghost.style.top = (clientY - DR.offsetY) + 'px';

  let container;
  if(DR.type === 'account') container = document.getElementById('alist');
  else container = DR.row.parentElement;

  const siblings = [...container.querySelectorAll(`[data-drag-type="${DR.type}"]`)].filter(s => s !== DR.row);
  const ordered = [...siblings].sort((a,b)=>(parseInt(a.dataset.dragItem)-parseInt(b.dataset.dragItem)));
  if(!ordered.length || !DR.placeholder) return;

  let placed=false;
  for(const sib of ordered){
    const r=sib.getBoundingClientRect();
    const mid=r.top+r.height/2;
    const sibIdx=parseInt(sib.dataset.dragItem);
    if(clientY < mid-DRAG_SWAP_BUFFER_PX){
      sib.parentNode.insertBefore(DR.placeholder,sib);
      DR.targetIdx=sibIdx;
      placed=true;
      break;
    }
  }

  if(!placed){
    const last=ordered[ordered.length-1];
    const lastIdx=parseInt(last.dataset.dragItem);
    last.parentNode.insertBefore(DR.placeholder,last.nextSibling);
    DR.targetIdx=lastIdx+1;
  }
}

function gripUp(){
  document.removeEventListener('mousemove', gripMove);
  document.removeEventListener('touchmove', gripMove);
  document.removeEventListener('mouseup', gripUp);
  document.removeEventListener('touchend', gripUp);
  if(!DR){ DR=null; return; }

  DR.ghost.remove();
  DR.row.style.opacity = '';
  if(DR.placeholder) DR.placeholder.remove();

  if(!DR.started){ DR=null; return; }

  const from = DR.idx, to = DR.targetIdx;
  const type = DR.type, accId = DR.accId;
  DR = null;

  if(from === to){ return; }

  if(type === 'account'){
    const item = accounts.splice(from,1)[0]; accounts.splice(to,0,item); save();
  } else if(type === 'chain'){
    const acc = accounts.find(a=>a.id===accId); if(!acc) return;
    const order = acc._renderChainOrder ? [...acc._renderChainOrder] : [];
    const item = order.splice(from,1)[0]; order.splice(to,0,item);
    acc.chainOrder = order; save();
  } else if(type === 'token'){
    const acc = accounts.find(a=>a.id===accId); if(!acc) return;
    const order = acc._renderTokOrder ? acc._renderTokOrder.map(x=>x.t.addr) : [];
    const item = order.splice(from,1)[0]; order.splice(to,0,item);
    acc.tokOrder = order; save();
  } else if(type === 'manual'){
    const acc = accounts.find(a=>a.id===accId); if(!acc) return;
    const manuals = acc.wallets.filter(w=>w.type==='manual');
    const item = manuals.splice(from,1)[0]; manuals.splice(to,0,item);
    const cryptos = acc.wallets.filter(w=>w.type==='crypto');
    acc.wallets = [...cryptos, ...manuals];
    save();
  }
  render();
}

function render(){
  const list=document.getElementById('alist');list.innerHTML='';
  goalAmount=currencyToBase(goalValue,goalCurrency);
  let grandTotal=0,holdings=0;
  const accTotals=accounts.map(acc=>{const v=accValue(acc);grandTotal+=v;return{acc,v};});
  const accColorMap=new Map(accounts.map((a,i)=>[a.id,ACC_COLORS[i%ACC_COLORS.length]]));

  const bkWrap=document.getElementById('breakdown-wrap');
  if(accounts.length>1&&grandTotal>0){
    bkWrap.style.display='block';
    const bar=document.getElementById('bk-bar'),leg=document.getElementById('bk-legend');
    const breakdownTotals=[...accTotals].sort((a,b)=>b.v-a.v);
    bar.innerHTML='';leg.innerHTML='';
    breakdownTotals.forEach(({acc,v})=>{
      const pct=grandTotal>0?(v/grandTotal*100):0,color=accColorMap.get(acc.id)||ACC_COLORS[0];
      bar.innerHTML+=`<div class="bk-seg" style="width:${pct}%;background:${color}"></div>`;
      leg.innerHTML+=`<div class="bk-item"><div class="bk-dot" style="background:${color}"></div>${acc.name} ${pct.toFixed(PERCENT_DECIMALS)}%</div>`;
    });
  } else { bkWrap.style.display='none'; }

  accTotals.forEach(({acc,v:accPhp},aidx)=>{
    const pctOfTotal=grandTotal>0?(accPhp/grandTotal*100):0;
    const chainMap={},tokMap={};

    acc.wallets.forEach(w=>{
      ensureCexWalletShape(w);
      ensureManualWalletShape(w);
      if(w.type==='manual'){ holdings++; return; }
      if(w.type==='cex'){ (w.toks||[]).forEach(()=>holdings++); return; }
      (w.nets||[]).forEach(n=>{
        const val=n.bal*(PRICES[n.sym]||0); holdings++;
        if(!chainMap[n.chain])chainMap[n.chain]={sym:n.sym,totalBal:0,totalPhp:0,wId:w.id,addrs:[]};
        chainMap[n.chain].totalBal+=n.bal; chainMap[n.chain].totalPhp+=val;
        if(!chainMap[n.chain].addrs.includes(w.addr))chainMap[n.chain].addrs.push(w.addr);
      });
      (w.toks||[]).forEach(t=>{
        const val=t.bal*(TPRICES[t.addr]??t.php??0); holdings++;
        if(!tokMap[t.chain])tokMap[t.chain]=[];
        tokMap[t.chain].push({t,wId:w.id,val,wAddr:w.addr});
      });
    });

    const isScanning=acc.wallets.some(w=>w.type==='crypto'&&w.scanning);
    const hasCrypto=acc.wallets.some(w=>w.type==='crypto');
  const manualWallets=acc.wallets.filter(w=>w.type==='manual'&&w.cat!=='cex');
  const cexWallets=acc.wallets.filter(w=>w.type==='cex');

    let walletRows='';
    acc.wallets.filter(w=>w.type==='crypto').forEach(w=>{
      const menuKey=`dex_${acc.id}_${w.id}`;
      const dexPhp=dexWalletTotal(w);
      const isSol = w.chain === 'sol';
      const offlineBadge=isOfflineMode?` <span class="offline-badge">offline</span>`:'';
      walletRows+=`<div class="wrow">
        <div class="manual-ic">${svg(isSol ? 'banknote' : 'link',12,'1.75')}</div>
        <div class="wrow-info"><div class="wrow-name">${walletDisplayName(w)}</div><div class="wrow-addr">${walletMetaLabel(w)}${offlineBadge}</div></div>
        <div class="tright"><div class="tphp-total">${fmt(dexPhp)}</div></div>
        ${w.scanning?`<div class="spin-sm"></div>`:''}
        <button class="dots-btn" onclick="toggleMenu(event,'${menuKey}')">${svg('ellipsis',14,'1.75')}</button>
        <div class="ctx-menu" id="menu-${menuKey}" style="display:none">
          <button class="ctx-item" onclick="openRenameWalletModal(${acc.id},${w.id})">Rename wallet</button>
        </div>
        <button class="wrow-del" onclick="removeWallet(${acc.id},${w.id})">${svg('x',11,'1.75')}</button>
      </div>`;
    });

    let cexRows='';
    cexWallets.forEach(w=>{
      const menuKey=`cex_${acc.id}_${w.id}`;
      const total=cexWalletTotal(w);
      const offlineBadge=isOfflineMode?` <span class="offline-badge">offline</span>`:'';
      cexRows+=`<div class="wrow">
        <div class="manual-ic">${svg('building-2',12,'1.75')}</div>
        <div class="wrow-info"><div class="wrow-name">${walletDisplayName(w)}</div><div class="wrow-addr">${walletMetaLabel(w)}${offlineBadge}</div></div>
        <div class="tright"><div class="tphp-total">${fmt(total)}</div></div>
        <button class="dots-btn" onclick="toggleMenu(event,'${menuKey}')">${svg('ellipsis',14,'1.75')}</button>
        <div class="ctx-menu" id="menu-${menuKey}" style="display:none">
          <button class="ctx-item" onclick="openRenameWalletModal(${acc.id},${w.id})">Rename wallet</button>
          <button class="ctx-item" onclick="openCexTokModal(${acc.id},${w.id})">+ Import token</button>
        </div>
        <button class="wrow-del" onclick="removeWallet(${acc.id},${w.id})">${svg('x',11,'1.75')}</button>
      </div>`;
      cexRows+=`<div class="sec-head">Tokens</div>`;
      if((w.toks||[]).length===0){
        cexRows+=`<div class="empty-row">No tokens yet.</div>`;
      } else {
        (w.toks||[]).forEach(t=>{
          const tok=ensureCexTokenShape(t);
          const qty=num(tok.qty);
          const price=cexTokenPrice(tok);
          const total=cexTokenTotal(tok);
          const sub=qty!==null
            ? `${fmtQty(qty)} ${tok.sym} | ${price>0?`${fmt(price)} each`:'price unavailable'}`
            : 'Legacy manual total';
          cexRows+=`<div class="cex-token-row">
            <div class="tdot erc"></div>
            <div class="tinfo"><div class="cex-token-name">${tok.sym}<span class="chain-addr">${w.name}</span></div><div class="cex-token-sub">${sub}</div></div>
            <div class="manual-php">${fmt(total)}</div>
            <button class="icon-btn" onclick="openCexTokenValueModal(${acc.id},${w.id},${tok.id})">${svg('pencil',11,'1.75')}</button>
            <button class="tok-remove" onclick="removeCexTok(${acc.id},${w.id},${tok.id})">${svg('x',10,'1.75')}</button>
          </div>`;
        });
      }
    });

    let chainEntries=Object.entries(chainMap);
    if(acc.chainOrder?.length){
      chainEntries.sort((a,b)=>{
        const ai=acc.chainOrder.indexOf(a[0]),bi=acc.chainOrder.indexOf(b[0]);
        if(ai===-1&&bi===-1)return b[1].totalPhp-a[1].totalPhp;
        if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;
      });
    } else { chainEntries.sort((a,b)=>b[1].totalPhp-a[1].totalPhp); }
    acc._renderChainOrder=chainEntries.map(([n])=>n);

    let allToks=Object.entries(tokMap).flatMap(([,items])=>items);
    acc.wallets.filter(w=>w.type==='crypto'&&w.chain==='sol'&&Array.isArray(w.toks)).forEach(w=>{
      w.toks.forEach(t=>{
        if(!tokMap['Solana'])tokMap['Solana']=[];
        if(!tokMap['Solana'].some(x=>x.t.addr===t.addr)){
          tokMap['Solana'].push({t,wId:w.id,val:t.bal*(TPRICES[t.addr]??t.php??0),wAddr:w.addr});
        }
      });
    });
    allToks=Object.entries(tokMap).flatMap(([,items])=>items);
    if(acc.tokOrder?.length){
      allToks.sort((a,b)=>{
        const ai=acc.tokOrder.indexOf(a.t.addr),bi=acc.tokOrder.indexOf(b.t.addr);
        if(ai===-1&&bi===-1)return b.val-a.val;
        if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;
      });
    }
    acc._renderTokOrder=allToks;
    const tokenIndexByKey=new Map();
    allToks.forEach((item,idx)=>{
      const key=`${item.t.chain}::${item.t.addr}`;
      if(!tokenIndexByKey.has(key)) tokenIndexByKey.set(key,idx);
    });
    const orderedTokMap={};
    allToks.forEach(item=>{
      if(!orderedTokMap[item.t.chain])orderedTokMap[item.t.chain]=[];
      orderedTokMap[item.t.chain].push(item);
    });

    let manualRows='';
    if(manualWallets.length){
      manualRows+=`<div class="sec-head">Manual</div>`;
      manualWallets.forEach((w,mi)=>{
        ensureManualWalletShape(w);
        const mCat=getManualCat(w.cat);
        const baseAmount=manualAmountToBase(w);
        manualRows+=`<div class="manual-amount-row" data-drag-type="manual" data-drag-item="${mi}">
          <div class="drag-grip" onmousedown="gripDown(event,'manual',${acc.id},${mi})" ontouchstart="gripDown(event,'manual',${acc.id},${mi})">${svg('grip-vertical',14,'1.75')}</div>
          <div class="manual-ic">${svg(w.lucide||mCat.lucide||'folder',14)}</div>
          <div class="manual-info"><div class="manual-label">${w.name}</div><div class="manual-cat">${mCat.label}</div></div>
          <div class="manual-php">${fmt(baseAmount)}</div>
          <button class="icon-btn" onclick="openManualValueModal(${acc.id},${w.id})">${svg('pencil',11,'1.75')}</button>
          <button class="wrow-del" onclick="removeWallet(${acc.id},${w.id})">${svg('x',11,'1.75')}</button>
        </div>`;
      });
    }

    let chainRows='';
    if(hasCrypto){
      if(chainEntries.length || allToks.length){
        chainEntries.forEach(([chainName,c],ci)=>{
          const chainSafe=String(chainName).replace(/'/g,"\\'");
          const headAddr=c.addrs?.[0]||'';
          const addrLabel=c.addrs?.length>1?`${c.addrs.length} wallets`:headAddr?short(headAddr):'wallet';
          const nativePrice=PRICES[c.sym]||0;
          chainRows+=`<div class="trow" data-drag-type="chain" data-drag-item="${ci}">
            <div class="drag-grip" onmousedown="gripDown(event,'chain',${acc.id},${ci})" ontouchstart="gripDown(event,'chain',${acc.id},${ci})">${svg('grip-vertical',14,'1.75')}</div>
            <div class="tdot"></div>
            <div class="tinfo"><div class="tname">${chainName}<span class="chain-addr">${addrLabel}</span></div><div class="tsym">${fmtEach(nativePrice)}</div></div>
            <div class="tright"><div class="tbal">${fmtUiNumber(c.totalBal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${c.sym}</div><div class="tphp-native">${fmt(c.totalPhp)}</div></div>
            <button class="icon-btn" onclick="openTokModal(${acc.id},${c.wId},'${chainSafe}')">${svg('plus',11,'2')}</button>
          </div>`;

          const toks=orderedTokMap[chainName]||[];
          toks.forEach(({t,wId,val},ti)=>{
            const globalIdx=tokenIndexByKey.get(`${t.chain}::${t.addr}`)??-1;
            const isLast=ti===toks.length-1;
            const tokenPrice=TPRICES[t.addr]??t.php??0;
            chainRows+=`<div class="tok-indent" data-drag-type="token" data-drag-item="${globalIdx}">
              <div class="tokrow">
                <div class="drag-grip" style="padding-left:4px" onmousedown="gripDown(event,'token',${acc.id},${globalIdx})" ontouchstart="gripDown(event,'token',${acc.id},${globalIdx})">${svg('grip-vertical',14,'1.75')}</div>
                <div class="tok-line" style="height:${isLast?'50%':'100%'}"></div>
                <div class="tok-corner"></div>
                <div class="tdot erc"></div>
                <div class="tinfo">
                  <div class="tname" style="font-size:12px">${t.sym}</div>
                  <div class="tsym">${t.name} | ${fmtEach(tokenPrice)}</div>
                </div>
                <div class="tright">
                  <div class="tbal">${fmtUiNumber(t.bal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${t.sym}</div>
                  <div class="${val>0?'tphp-erc':'tphp-dim'}">${val>0?fmt(val):'no price'}</div>
                </div>
                <button class="tok-remove" onclick="removeTok(${acc.id},${wId},'${t.addr}','${t.chain}')">${svg('x',10,'1.75')}</button>
              </div>
            </div>`;
          });
        });

        Object.entries(orderedTokMap).forEach(([chainName,items])=>{
          if(chainMap[chainName])return;
          items.forEach(({t,wId,val})=>{
            const tokenPrice=TPRICES[t.addr]??t.php??0;
            chainRows+=`<div class="trow tok-only">
              <div class="tdot erc"></div>
              <div class="tinfo"><div class="tname">${t.sym}<span style="color:var(--text2);font-size:10px"> | ${chainName}</span></div><div class="tsym">${t.name} | ${fmtEach(tokenPrice)}</div></div>
              <div class="tright">
                <div class="tbal">${fmtUiNumber(t.bal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${t.sym}</div>
                <div class="${val>0?'tphp-erc':'tphp-dim'}">${val>0?fmt(val):'no price'}</div>
              </div>
              <button class="tok-remove" onclick="removeTok(${acc.id},${wId},'${t.addr}','${t.chain}')">${svg('x',10,'1.75')}</button>
            </div>`;
          });
        });

        if(isScanning) chainRows+=`<div class="scan-row"><div class="spin-sm"></div><div class="scan-txt">checking remaining chains...</div></div>`;
      } else if(!manualWallets.length){
        chainRows=`<div class="empty-row">No balances found.</div>`;
      }
    }

    const accColor=accColorMap.get(acc.id)||ACC_COLORS[aidx%ACC_COLORS.length];
    const accDark=shadeHex(accColor,-28);
    const isCollapsed=collapsed.has(acc.id);

    const cardEl=document.createElement('div');
    cardEl.className='acard';
    cardEl.dataset.dragType='account';
    cardEl.dataset.dragItem=aidx;
    cardEl.style.animationDelay=aidx*.06+'s';
    cardEl.style.setProperty('--acc-main',accColor);
    cardEl.style.setProperty('--acc-dark',accDark);
    cardEl.innerHTML=`
      <div class="acard-head">
        <div class="drag-grip" onmousedown="gripDown(event,'account',null,${aidx})" ontouchstart="gripDown(event,'account',null,${aidx})">${svg('grip-vertical',14,'1.75')}</div>
        <div class="aname-wrap">
          <span class="aname" id="aname-${acc.id}" onclick="startRename(${acc.id})" title="Click to rename">${acc.name}</span>
          <input class="aname-edit" id="aedit-${acc.id}" onblur="finishRename(${acc.id})" onkeydown="if(event.key==='Enter'||event.key==='Escape')finishRename(${acc.id})">
          <span class="edit-hint" onclick="startRename(${acc.id})">\u270E</span>
          <span class="apct-badge" style="border-color:${accColor}22;color:${accColor}">${pctOfTotal.toFixed(PERCENT_DECIMALS)}%</span>
        </div>
        <div class="ahead-right">
          <div class="atotal">${fmt(accPhp)}</div>
          <button class="icon-btn collapse-btn ${isCollapsed?'closed':'open'}" id="acollapse-${acc.id}" onclick="toggleCollapse(${acc.id})">${svg('chevron-down',13,'1.75')}</button>
          <button class="icon-btn danger" onclick="removeAccount(${acc.id})">${svg('x',13,'1.75')}</button>
        </div>
      </div>
      <div class="acard-body ${isCollapsed?'collapsed':''}" id="abody-${acc.id}">
        ${walletRows}
        ${cexRows}
        ${manualRows}
        ${chainRows}
        <div class="add-wallet-row">
          <button class="add-wallet-inline" onclick="openAddWalletType(${acc.id})">${svg('plus',11,'2')} Add Wallet</button>
        </div>
      </div>`;
    list.appendChild(cardEl);
  });

  document.getElementById('m-total').textContent=fmtUiNumber(phpToDisplay(grandTotal),CURRENCY_DECIMALS,CURRENCY_DECIMALS);
  const curEl=document.querySelector('.sum-total .cur');
  if(curEl) curEl.textContent=moneySymbol();
  updateCurrencyDropdownUi();
  const pct=goalAmount>0?Math.min(grandTotal/goalAmount*100,100):0;
  document.getElementById('goal-label').textContent=`Goal ${fmtGoal()}`;
  document.getElementById('goal-pct').textContent=pct.toFixed(PERCENT_DECIMALS)+'%';
  document.getElementById('pfill').style.width=pct+'%';
  document.getElementById('s-a').textContent=accounts.length;
  document.getElementById('s-t').textContent=holdings;

  recordPnlPoint(grandTotal);
  const pnlKeys=Object.keys(pnlHistory).sort();
  renderPnlCell('pnl-d',pnlForPeriodDisplay(grandTotal,1,pnlKeys));
  renderPnlCell('pnl-w',pnlForPeriodDisplay(grandTotal,7,pnlKeys));
  renderPnlCell('pnl-m',pnlForPeriodDisplay(grandTotal,31,pnlKeys));
  renderPnlCell('pnl-y',pnlForPeriodDisplay(grandTotal,365,pnlKeys));

  renderUpdatedTime();
}

function wireOverlayDismiss(overlayId, onClose){
  const overlay=document.getElementById(overlayId);
  overlay.addEventListener('click',e=>{ if(e.target===overlay) onClose(); });
}

wireOverlayDismiss('addAccOverlay', closeAddAccount);
wireOverlayDismiss('renameWalletOverlay', closeRenameWalletModal);
wireOverlayDismiss('goalOverlay', closeGoalModal);
wireOverlayDismiss('settingsOverlay', closeSettingsModal);
wireOverlayDismiss('statusOverlay', closeStatusModal);
wireOverlayDismiss('confirmOverlay', closeConfirmModal);
wireOverlayDismiss('addWalletTypeOverlay', closeAddWalletType);
wireOverlayDismiss('tokOverlay', closeTokModal);
wireOverlayDismiss('cexTokOverlay', closeCexTokModal);
wireOverlayDismiss('valueEditOverlay', closeValueEditModal);
wireOverlayDismiss('pnlDetailOverlay', closePnlDetailModal);
document.getElementById('acc-name').addEventListener('keydown',e=>{if(e.key==='Enter')confirmAddAccount();if(e.key==='Escape')closeAddAccount();});
document.getElementById('rename-wallet-input').addEventListener('keydown',e=>{if(e.key==='Enter')confirmRenameWallet();if(e.key==='Escape')closeRenameWalletModal();});
document.getElementById('goal-input').addEventListener('keydown',e=>{if(e.key==='Enter')confirmGoalUpdate();if(e.key==='Escape')closeGoalModal();});
document.getElementById('cw-addr').addEventListener('input',checkWalletFormReady);
document.getElementById('cw-sol-addr').addEventListener('input',checkWalletFormReady);
document.getElementById('mw-name').addEventListener('input',checkWalletFormReady);
document.getElementById('cex-token-name').addEventListener('input',()=>{ if(selectedWalletType==='cex') onCexAddTokInput(); else checkWalletFormReady(); });
document.getElementById('mw-amount').addEventListener('input',()=>{ if(selectedWalletType==='cex') updateCexAddPreview(); else checkWalletFormReady(); });
document.getElementById('cex-add-match').addEventListener('change',onCexAddMatchChange);
document.getElementById('cw-addr').addEventListener('keydown',e=>{if(e.key==='Enter')confirmAddWallet();});
document.getElementById('tok-contract').addEventListener('input',onTokInput);
document.getElementById('tok-contract').addEventListener('keydown',e=>{if(e.key==='Escape')closeTokModal();});
document.getElementById('cex-tok-name').addEventListener('input',onCexTokInput);
document.getElementById('cex-tok-amount').addEventListener('input',updateCexImportPreview);
document.getElementById('cex-tok-match').addEventListener('change',onCexTokMatchChange);
document.getElementById('cex-tok-amount').addEventListener('keydown',e=>{if(e.key==='Enter')confirmCexTokenImport();if(e.key==='Escape')closeCexTokModal();});
document.getElementById('cex-tok-name').addEventListener('keydown',e=>{if(e.key==='Enter')confirmCexTokenImport();if(e.key==='Escape')closeCexTokModal();});
document.getElementById('value-amount').addEventListener('input',checkValueEditReady);
document.getElementById('value-amount').addEventListener('keydown',e=>{if(e.key==='Enter')applyValueEdit();if(e.key==='Escape')closeValueEditModal();});
document.getElementById('pnl-card-d').addEventListener('click',()=>openPnlDetailModal(1));
document.getElementById('pnl-card-w').addEventListener('click',()=>openPnlDetailModal(7));
document.getElementById('pnl-card-m').addEventListener('click',()=>openPnlDetailModal(31));
document.getElementById('pnl-card-y').addEventListener('click',()=>openPnlDetailModal(365));
document.getElementById('settings-import-file').addEventListener('change',importSettingsData);
initCurrencyDropdown();
window.addEventListener('online',()=>{ setOfflineMode(false); render(); });
window.addEventListener('offline',()=>{ setOfflineMode(true); render(); });

boot();

