// ============================================================
// WALLET LABELS — Wallet display-name helpers, rename-wallet modal
// ============================================================
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


// ============================================================
// SETTINGS MODALS — Goal modal, settings modal, backup export/import
// ============================================================
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


// ============================================================
// CONFIRM MODAL — Generic danger-confirmation modal
// ============================================================
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


// ============================================================
// VALUE EDIT MODAL — Adjust/Income/Expense value-edit modal for wallets
// ============================================================
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
    ? `New Amount (${currencySymbol(activeCurrency)})`
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
  } else if((action==='income' || action==='expense') && pendingValueEdit){
    document.getElementById('value-amount').value='0';
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


// ============================================================
// ADD ACCOUNT — Manual-category grid + add-account modal
// ============================================================
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
  const color=ACC_COLORS[accounts.length%ACC_COLORS.length];
  accounts.push({id:Date.now(),name,wallets:[],color});
  closeAddAccount(); save(); render();
}


// ============================================================
// CEX LOOKUP — CoinGecko symbol lookup used by the 'add CEX wallet' flow
// ============================================================
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


// ============================================================
// ADD WALLET — Add-wallet modal: DEX/CEX/Manual type selection, address scanning
// ============================================================
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


// ============================================================
// REMOVE / RENAME — Remove account/wallet/token, inline account renaming
// ============================================================
function rememberDeletedAccountName(acc){
  if(!acc) return;
  deletedAccountNames[String(acc.id)]=acc.name;
  try{ localStorage.setItem(DELETED_ACCOUNT_NAMES_KEY,JSON.stringify(deletedAccountNames)); }catch{}
}
function removeAccount(id){
  const acc=accounts.find(a=>a.id===id);if(!acc)return;
  openConfirmModal(`Delete account "${acc.name}"?`,'This will remove the account and every wallet inside it.','Delete account',()=>{
    rememberDeletedAccountName(acc);
    accounts=accounts.filter(a=>a.id!==id);save();render();
  });
}
function removeWallet(accId,wId){
  const acc=accounts.find(a=>a.id===accId);if(!acc)return;
  const wallet=acc.wallets.find(w=>w.id===wId);if(!wallet)return;
  if(acc.wallets.length<=1){
    openConfirmModal(`Delete account "${acc.name}"?`,'This is the last wallet in the account, so deleting it will remove the whole account.','Delete account',()=>{
      rememberDeletedAccountName(acc);
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


// ============================================================
// TOKEN IMPORT — Import-token modals for DEX (by contract) and CEX (by symbol)
// ============================================================
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