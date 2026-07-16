// ============================================================
// CONSTANTS — Chain list, icon SVG defs, manual wallet categories
// ============================================================
const CHAINS = [
  { name:"Ethereum",     rpc:"https://cloudflare-eth.com",                          sym:"ETH",   cg:"ethereum",            cgp:"ethereum" },
  { name:"BNB Chain",    rpc:"https://bsc-dataseed.binance.org/",                   sym:"BNB",   cg:"binancecoin",         cgp:"binance-smart-chain" },
  { name:"Base",         rpc:"https://mainnet.base.org",                            sym:"ETH",   cg:"ethereum",            cgp:"base" },
  { name:"Polygon",      rpc:"https://polygon-bor-rpc.publicnode.com",              sym:"POL",   cg:"polygon-ecosystem-token", cgp:"polygon-pos" },
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
  { name:"Robinhood Chain", rpc:"https://rpc.mainnet.chain.robinhood.com",          sym:"ETH",   cg:"ethereum",            cgp:"robinhood-chain" },
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

const CHAIN_LOGO_SLUG = {
  'Ethereum':'ethereum','BNB Chain':'smartchain','Base':'base','Polygon':'polygon',
  'Arbitrum One':'arbitrum','Optimism':'optimism','Celo':'celo','Avax C-Chain':'avalanchec',
  'Mantle':'mantle','Linea':'linea','Blast':'blast','Gnosis':'xdai','Moonbeam':'moonbeam',
  'Moonriver':'moonriver','opBNB':'opbnb','Scroll':'scroll','Sonic':'sonic','XDC':'xdc',
  'Sei':'sei','Robinhood Chain':'robinhoodchain','Solana':'solana',
};
function chainIconUrl(chainName){
  const slug=CHAIN_LOGO_SLUG[chainName];
  return slug?`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${slug}/info/logo.png`:null;
}
function escAttr(s){
  return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;');
}

function imgWithFallback(url, fallbackHtml, style){
  return `<img src="${url}" alt="" style="${style}" onerror="this.outerHTML='${escAttr(fallbackHtml)}'">`;
}
function chainIconHtml(chainName){
  const url=chainIconUrl(chainName);
  const fallback=`<div class="tdot native"></div>`;
  if(!url) return fallback;
  return imgWithFallback(url, fallback, 'width:16px;height:16px;border-radius:50%;object-fit:cover;flex:none');
}

function walletChainIconHtml(isSol){
  const url=chainIconUrl(isSol?'Solana':'Ethereum');
  const fallback=svg(isSol?'banknote':'link',12,'1.75');
  if(!url) return fallback;
  return imgWithFallback(url, fallback, 'width:16px;height:16px;border-radius:50%;object-fit:cover;flex:none');
}

// ============================================================
// TOKEN AVATARS — Deterministic initials-based fallback for tokens
// without a resolvable logo (replaces the plain grey dot)
// ============================================================
const AVATAR_PALETTE = ['#4ade80','#60a5fa','#a78bfa','#fbbf24','#f87171','#34d399','#818cf8','#f472b6','#38bdf8','#facc15'];
function hashStr(s){
  let h=0;
  for(let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))|0; }
  return Math.abs(h);
}
function tokenInitials(sym){
  const clean=String(sym||'').replace(/[^a-zA-Z0-9]/g,'');
  if(!clean) return '?';
  if(clean.length===1) return clean.toUpperCase();
  return (clean[0]+clean[1]).toUpperCase();
}
function tokenAvatarHtml(sym,size=17){
  const initials=tokenInitials(sym);
  const color=AVATAR_PALETTE[hashStr(String(sym||'').toUpperCase())%AVATAR_PALETTE.length];
  const fontSize=Math.max(7,Math.round(size*0.36));
  return `<div class="tok-avatar" style="width:${size}px;height:${size}px;font-size:${fontSize}px;background:${color}20;color:${color};border-color:${color}55">${escAttr(initials)}</div>`;
}

// ============================================================
// CEX BRAND ICONS — Top 10 exchanges with local SVG logos
// (put files at images/{id}.svg — see list below), falling back
// to a colored letter-monogram for anything unrecognized
// ============================================================
const CEX_BRANDS = [
  { id:'binance',  name:'Binance',           match:/binance/i,          label:'B',  color:'#F0B90B' },
  { id:'bitget',   name:'Bitget',            match:/bitget/i,           label:'BG', color:'#00F0FF' },
  { id:'bybit',    name:'Bybit',             match:/bybit/i,            label:'BY', color:'#F7A600' },
  { id:'coinbase', name:'Coinbase Exchange', match:/coinbase/i,         label:'C',  color:'#0052FF' },
  { id:'gate',     name:'Gate',              match:/gate\.?io|^gate$/i, label:'G',  color:'#00D0C6' },
  { id:'htx',      name:'HTX',               match:/htx|huobi/i,       label:'H',  color:'#2CA6E0' },
  { id:'kucoin',   name:'KuCoin',            match:/kucoin/i,           label:'KC', color:'#24AE8F' },
  { id:'mexc',     name:'MEXC',              match:/mexc/i,             label:'M',  color:'#2FD9AC' },
  { id:'okx',      name:'OKX',               match:/\bokx\b|okex/i,    label:'OK', color:'#7FDBFF' },
  { id:'upbit',    name:'Upbit',             match:/upbit/i,            label:'UP', color:'#1261C4' },
];
// Filenames expected: images/binance.svg, images/coinbase.svg, images/upbit.svg,
// images/okx.svg, images/bybit.svg, images/bitget.svg, images/gate.svg,
// images/kucoin.svg, images/mexc.svg, images/htx.svg
function cexBrandMonoHtml(brand,size){
  return `<div class="cex-ic-mono" style="width:${size}px;height:${size}px;font-size:${Math.max(7,Math.round(size*0.38))}px;background:${brand.color}20;color:${brand.color};border-color:${brand.color}55">${escAttr(brand.label)}</div>`;
}
function cexBrandLogoHtml(brand,size=18){
  const fallback=cexBrandMonoHtml(brand,size);
  return imgWithFallback(`images/${brand.id}.svg`, fallback, `width:${size}px;height:${size}px;object-fit:contain;flex:none;border-radius:5px`);
}
function cexWalletIconHtml(name){
  const n=String(name||'');
  const brand=CEX_BRANDS.find(b=>b.match.test(n));
  if(brand){
    return `<div class="manual-ic cex-ic-wrap">${cexBrandLogoHtml(brand,17)}</div>`;
  }
  const letter=(n.trim()[0]||'#').toUpperCase();
  return `<div class="manual-ic cex-ic cex-ic-generic">${escAttr(letter)}</div>`;
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


// ============================================================
// STATE — Global app state, localStorage-backed vars, one-time data migrations
// ============================================================
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
const DELETED_ACCOUNT_NAMES_KEY='llion_deleted_account_names';
let deletedAccountNames = (()=>{
  try{
    const parsed=JSON.parse(localStorage.getItem(DELETED_ACCOUNT_NAMES_KEY) || '{}');
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
let pnlChartSelectedIndex=-1;
let pnlChartDismissTimer=null;
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


// ============================================================
// FORMAT UTILS — Number/date/currency formatting, display-currency (USD/PHP) handling
// ============================================================
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
function compactMoneyValue(v){
  const n=num(v);
  if(n===null) return '0';
  const abs=Math.abs(n);
  if(abs>=1e9) return `${(abs/1e9).toFixed(1).replace(/\.0$/,'')}b`;
  if(abs>=1e6) return `${(abs/1e6).toFixed(1).replace(/\.0$/,'')}m`;
  if(abs>=1e3) return `${(abs/1e3).toFixed(2).replace(/\.0+$/,'').replace(/\.(\d)0$/,'.$1')}k`;
  return `${Math.round(abs)}`;
}
function fmtCompactMoney(v){
  const n=num(v);
  if(n===null) return `${moneySymbol()}0`;
  const sign=n<0?'-':'';
  return `${sign}${moneySymbol()}${compactMoneyValue(n)}`;
}
function roundToThousands(v){
  const n=num(v);
  if(n===null) return 0;
  return Math.round(n/1000)*1000;
}
function fmtWholeMoney(v){
  return moneySymbol()+fmtUiNumber(Math.round(num(v)||0),0,0);
}
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