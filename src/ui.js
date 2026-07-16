// ============================================================
// RENDER HELPERS — Small formatting/value helpers used while rendering rows
// ============================================================
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


// ============================================================
// DRAG REORDER — Drag-and-drop reordering of accounts/wallets
// ============================================================
function gripDown(e, type, accId, idx, walletId){
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
  // Neutralize the account's accent color on the dragged copy so the total/badge/icons
  // always show in gray while dragging, regardless of that account's assigned color.
  ghost.style.setProperty('--acc-main','var(--text2)');
  ghost.style.setProperty('--acc-dark','var(--border)');
  ghost.querySelectorAll('.apct-badge').forEach(b=>{ b.style.color='var(--text2)'; b.style.borderColor='var(--border)'; });
  document.body.appendChild(ghost);

  row.style.opacity = '0.25';

  DR = { type, accId, idx, walletId, row, ghost, offsetY: clientY - rect.top, placeholder: null, targetIdx: idx, startY: clientY, started: false };

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
    document.body.style.pointerEvents='none';
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
  document.body.style.pointerEvents='';
  if(!DR){ DR=null; return; }

  DR.ghost.remove();
  DR.row.style.opacity = '';
  if(DR.placeholder) DR.placeholder.remove();

  if(!DR.started){ DR=null; return; }

  const from = DR.idx, to = DR.targetIdx;
  const type = DR.type, accId = DR.accId, walletId = DR.walletId;
  DR = null;

  if(from === to){ return; }

  if(type.startsWith('cextoken_')){
    const acc = accounts.find(a=>a.id===accId);
    if(!acc) return;
    const w = acc.wallets.find(x=>x.id===walletId);
    if(!w || !Array.isArray(w.toks)) return;
    const item = w.toks.splice(from,1)[0];
    w.toks.splice(to,0,item);
    save();
  } else if(type === 'account'){
    const item = accounts.splice(from,1)[0]; 
    accounts.splice(to,0,item); 
    save();
  } else if(type === 'chain'){
    const acc = accounts.find(a=>a.id===accId); 
    if(!acc) return;
    // Get all chain names from the current render order
    const chains = acc._renderChainOrder || [];
    const item = chains.splice(from,1)[0]; 
    chains.splice(to,0,item);
    acc.chainOrder = chains;
    save();
  } else if(type === 'token'){
    const acc = accounts.find(a=>a.id===accId); 
    if(!acc) return;
    // Get all token addresses from the current render order
    const tokens = (acc._renderTokOrder || []).map(item=>item.t.addr);
    const item = tokens.splice(from,1)[0]; 
    tokens.splice(to,0,item);
    acc.tokOrder = tokens;
    save();
  } else if(type === 'manual'){
    const acc = accounts.find(a=>a.id===accId); 
    if(!acc) return;
    const manuals = acc.wallets.filter(w=>w.type==='manual');
    const item = manuals.splice(from,1)[0]; 
    manuals.splice(to,0,item);
    const cryptos = acc.wallets.filter(w=>w.type==='crypto');
    const cexs = acc.wallets.filter(w=>w.type==='cex');
    acc.wallets = [...cryptos, ...cexs, ...manuals];
    save();
  }
  render();
}


// ============================================================
// RENDER — The main render() function - builds the whole account list DOM
// ============================================================
function render(){
  const list=document.getElementById('alist');list.innerHTML='';
  goalAmount=currencyToBase(goalValue,goalCurrency);
  let grandTotal=0,holdings=0;
  const accTotals=accounts.map(acc=>{const v=accValue(acc);grandTotal+=v;return{acc,v};});
  const accColorMap=new Map(accounts.map((a,i)=>[a.id,a.color||ACC_COLORS[i%ACC_COLORS.length]]));

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

    let chainEntries=Object.entries(chainMap);
    if(acc.chainOrder?.length){
      chainEntries.sort((a,b)=>{
        const ai=acc.chainOrder.indexOf(a[0]),bi=acc.chainOrder.indexOf(b[0]);
        if(ai===-1&&bi===-1)return b[1].totalPhp-a[1].totalPhp;
        if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;
      });
    } else { chainEntries.sort((a,b)=>b[1].totalPhp-a[1].totalPhp); }
    acc._renderChainOrder=chainEntries.map(([n])=>n);
    // Stable index per chain name, shared across every DEX wallet in this account
    // (fixes the network drag not working when an account has 2+ DEX wallets,
    // since the old per-wallet loop counter reset to 0 for each wallet).
    const chainIndexByName=new Map(chainEntries.map(([name],idx)=>[name,idx]));

    acc.wallets.filter(w=>w.type==='crypto'&&w.chain==='sol'&&Array.isArray(w.toks)).forEach(w=>{
      w.toks.forEach(t=>{
        if(!tokMap['Solana'])tokMap['Solana']=[];
        if(!tokMap['Solana'].some(x=>x.t.addr===t.addr)){
          tokMap['Solana'].push({t,wId:w.id,val:t.bal*(TPRICES[t.addr]??t.php??0),wAddr:w.addr});
        }
      });
    });
    let allToks=Object.entries(tokMap).flatMap(([,items])=>items);
    if(acc.tokOrder?.length){
      allToks.sort((a,b)=>{
        const ai=acc.tokOrder.indexOf(a.t.addr),bi=acc.tokOrder.indexOf(b.t.addr);
        if(ai===-1&&bi===-1)return b.val-a.val;
        if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;
      });
    }
    acc._renderTokOrder=allToks;
    // Stable index per token (chain+addr), used instead of acc.tokOrder.indexOf(t.addr)
    // which returned -1 for every token until the first successful drag ever happened,
    // making every token row share the same drag index and collide.
    const tokenIndexByKey=new Map();
    allToks.forEach((item,idx)=>{
      const key=`${item.t.chain}::${item.t.addr}`;
      if(!tokenIndexByKey.has(key)) tokenIndexByKey.set(key,idx);
    });

    const isScanning=acc.wallets.some(w=>w.type==='crypto'&&w.scanning);
    const hasCrypto=acc.wallets.some(w=>w.type==='crypto');
  const manualWallets=acc.wallets.filter(w=>w.type==='manual'&&w.cat!=='cex');
  const cexWallets=acc.wallets.filter(w=>w.type==='cex');

    let walletAndChainRows='';
    const dexWallets=acc.wallets.filter(w=>w.type==='crypto');
    
    const walletChainMap={};
    
    dexWallets.forEach((w,widx)=>{
        if(w.hidden) return;
      ensureCryptoWalletShape(w);
      const menuKey=`dex_${acc.id}_${w.id}`;
      const dexPhp=visibleDexWalletTotal(w);
      const isSol = w.chain === 'sol';
      const offlineBadge=isOfflineMode?` <span class="offline-badge">offline</span>`:'';
      walletAndChainRows+=`<div class="wrow">
        <div class="manual-ic">${walletChainIconHtml(isSol)}</div>
        <div class="wrow-info"><div class="wrow-name">${walletDisplayName(w)}</div><div class="wrow-addr">${walletMetaLabel(w)}${offlineBadge}</div></div>
        <div class="tright"><div class="tphp-total">${fmt(dexPhp)}</div></div>
        ${w.scanning?`<div class="spin-sm"></div>`:''}
        <button class="dots-btn" onclick="toggleMenu(event,'${menuKey}')">${svg('ellipsis',14,'1.75')}</button>
        <div class="ctx-menu" id="menu-${menuKey}" style="display:none">
          <button class="ctx-item" onclick="openRenameWalletModal(${acc.id},${w.id})">Rename wallet</button>
          <button class="ctx-item" onclick="openNetworkVisibilityModal(${acc.id},${w.id})">Manage networks</button>
        </div>
        <button class="wrow-del" onclick="removeWallet(${acc.id},${w.id})">${svg('x',11,'1.75')}</button>
      </div>`;
      
      const wChainMap={}, wTokMap={};
      (w.nets||[]).filter(n=>isWalletNetworkVisible(w,n.chain)).forEach(n=>{
        const val=n.bal*(PRICES[n.sym]||0);
        if(!wChainMap[n.chain])wChainMap[n.chain]={sym:n.sym,totalBal:0,totalPhp:0,wId:w.id,addrs:[]};
        wChainMap[n.chain].totalBal+=n.bal;
        wChainMap[n.chain].totalPhp+=val;
        if(!wChainMap[n.chain].addrs.includes(w.addr))wChainMap[n.chain].addrs.push(w.addr);
      });
      (w.toks||[]).filter(t=>isWalletNetworkVisible(w,t.chain)).forEach(t=>{
        const val=t.bal*(TPRICES[t.addr]??t.php??0);
        if(!wTokMap[t.chain])wTokMap[t.chain]=[];
        wTokMap[t.chain].push({t,wId:w.id,val,wAddr:w.addr});
      });
      if(w.chain==='sol'&&Array.isArray(w.toks)){
        w.toks.filter(t=>isWalletNetworkVisible(w,t.chain||'Solana')).forEach(t=>{
          if(!wTokMap['Solana'])wTokMap['Solana']=[];
          if(!wTokMap['Solana'].some(x=>x.t.addr===t.addr)){
            wTokMap['Solana'].push({t,wId:w.id,val:t.bal*(TPRICES[t.addr]??t.php??0),wAddr:w.addr});
          }
        });
      }
      
      let wChainEntries=Object.entries(wChainMap);
      if(acc.chainOrder?.length){
        wChainEntries.sort((a,b)=>{
          const ai=acc.chainOrder.indexOf(a[0]),bi=acc.chainOrder.indexOf(b[0]);
          if(ai===-1&&bi===-1)return b[1].totalPhp-a[1].totalPhp;
          if(ai===-1)return 1;if(bi===-1)return -1;return ai-bi;
        });
      } else { wChainEntries.sort((a,b)=>b[1].totalPhp-a[1].totalPhp); }
      
      wChainEntries.forEach(([chainName,c])=>{
        const chainSafe=String(chainName).replace(/'/g,"\\'");
        const ci=chainIndexByName.get(chainName);
        const headAddr=c.addrs?.[0]||'';
        const addrLabel=c.addrs?.length>1?`${c.addrs.length} wallets`:headAddr?short(headAddr):'wallet';
        const nativePrice=PRICES[c.sym]||0;
        walletAndChainRows+=`<div class="trow" data-drag-type="chain" data-drag-item="${ci}">
          <div class="drag-grip" onmousedown="gripDown(event,'chain',${acc.id},${ci})" ontouchstart="gripDown(event,'chain',${acc.id},${ci})">${svg('grip-vertical',14,'1.75')}</div>
          ${chainIconHtml(chainName)}
          <div class="tinfo"><div class="tname">${chainName}<span class="chain-addr">${addrLabel}</span></div><div class="tsym">${fmtEach(nativePrice)}</div></div>
          <div class="tright"><div class="tbal">${fmtUiNumber(c.totalBal,TOKEN_DECIMALS,TOKEN_DECIMALS)} ${c.sym}</div><div class="tphp-native">${fmt(c.totalPhp)}</div></div>
          <button class="icon-btn" onclick="openTokModal(${acc.id},${c.wId},'${chainSafe}')">${svg('plus',11,'2')}</button>
        </div>`;
        
        const toks=(wTokMap[chainName]||[]).slice().sort((a,b)=>{
          const ai=tokenIndexByKey.get(`${a.t.chain}::${a.t.addr}`) ?? -1;
          const bi=tokenIndexByKey.get(`${b.t.chain}::${b.t.addr}`) ?? -1;
          return ai-bi;
        });
        toks.forEach(({t,wId,val},ti)=>{
          const isLast=ti===toks.length-1;
          const tokenPrice=TPRICES[t.addr]??t.php??0;
          const globalIdx=tokenIndexByKey.get(`${t.chain}::${t.addr}`) ?? -1;
          walletAndChainRows+=`<div class="tok-indent" data-drag-type="token" data-drag-item="${globalIdx}">
            <div class="tokrow">
              <div class="drag-grip" style="padding-left:4px" onmousedown="gripDown(event,'token',${acc.id},${globalIdx})" ontouchstart="gripDown(event,'token',${acc.id},${globalIdx})">${svg('grip-vertical',14,'1.75')}</div>
              <div class="tok-line" style="height:${isLast?'50%':'100%'}"></div>
              <div class="tok-corner"></div>
              ${tokenAvatarHtml(t.sym)}
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
    });

    let cexRows='';
    cexWallets.forEach(w=>{
        if(w.hidden) return;
      const menuKey=`cex_${acc.id}_${w.id}`;
      const total=cexWalletTotal(w);
      const offlineBadge=isOfflineMode?` <span class="offline-badge">offline</span>`:'';
      cexRows+=`<div class="wrow">
        ${cexWalletIconHtml(w.name)}
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
        (w.toks||[]).forEach((t,ti)=>{
          const tok=ensureCexTokenShape(t);
          const qty=num(tok.qty);
          const price=cexTokenPrice(tok);
          const total=cexTokenTotal(tok);
          const sub=qty!==null
            ? `${fmtQty(qty)} ${tok.sym} | ${price>0?`${fmt(price)} each`:'price unavailable'}`
            : 'Legacy manual total';
          cexRows+=`<div class="cex-token-row" data-drag-type="cextoken_${w.id}" data-drag-item="${ti}">
            <div class="drag-grip" onmousedown="gripDown(event,'cextoken_${w.id}',${acc.id},${ti},${w.id})" ontouchstart="gripDown(event,'cextoken_${w.id}',${acc.id},${ti},${w.id})">${svg('grip-vertical',14,'1.75')}</div>
            ${tokenAvatarHtml(tok.sym)}
            <div class="tinfo"><div class="cex-token-name">${tok.sym}<span class="chain-addr">${w.name}</span></div><div class="cex-token-sub">${sub}</div></div>
            <div class="manual-php">${fmt(total)}</div>
            <button class="icon-btn" onclick="openCexTokenValueModal(${acc.id},${w.id},${tok.id})">${svg('pencil',11,'1.75')}</button>
            <button class="tok-remove" onclick="removeCexTok(${acc.id},${w.id},${tok.id})">${svg('x',10,'1.75')}</button>
          </div>`;
        });
      }
    });

    let manualRows='';
    if(manualWallets.length){
      manualRows+=`<div class="sec-head">Manual</div>`;
      manualWallets.forEach((w,mi)=>{
          if(w.hidden) return;
        ensureManualWalletShape(w);
        const mCat=getManualCat(w.cat);
        // Avoid an FX round-trip (PHP -> USD base -> PHP) when the wallet is
        // already denominated in the currency being displayed - the stored
        // base can drift from what the user actually typed as the FX rate
        // ticks between saves, even though no conversion was ever needed.
        const manualDisplay=(displayCurrency===w.amountCurrency)
          ? w.amountValue
          : phpToDisplay(manualAmountToBase(w));
        manualRows+=`<div class="manual-amount-row" data-drag-type="manual" data-drag-item="${mi}">
          <div class="drag-grip" onmousedown="gripDown(event,'manual',${acc.id},${mi})" ontouchstart="gripDown(event,'manual',${acc.id},${mi})">${svg('grip-vertical',14,'1.75')}</div>
          <div class="manual-ic">${svg(w.lucide||mCat.lucide||'folder',14)}</div>
          <div class="manual-info"><div class="manual-label">${w.name}</div><div class="manual-cat">${mCat.label}</div></div>
          <div class="manual-php">${moneySymbol()}${fmtUiNumber(manualDisplay,CURRENCY_DECIMALS,CURRENCY_DECIMALS)}</div>
          <button class="icon-btn" onclick="openManualValueModal(${acc.id},${w.id})">${svg('pencil',11,'1.75')}</button>
          <button class="wrow-del" onclick="removeWallet(${acc.id},${w.id})">${svg('x',11,'1.75')}</button>
        </div>`;
      });
    }

    let chainRows='';
    if(!hasCrypto && !manualWallets.length){
      chainRows=`<div class="empty-row">No balances found.</div>`;
    }
    if(isScanning && hasCrypto) chainRows+=`<div class="scan-row"><div class="spin-sm"></div><div class="scan-txt">checking remaining chains...</div></div>`;

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
                    <button class="icon-btn" onclick="openVisibilityModal(${acc.id})" title="Edit visibility" aria-label="Edit account visibility">${svg('info',13,'1.75')}</button>
          <button class="icon-btn danger" onclick="removeAccount(${acc.id})">${svg('x',13,'1.75')}</button>
        </div>
      </div>
      <div class="acard-body ${isCollapsed?'collapsed':''}" id="abody-${acc.id}">
        ${walletAndChainRows}
        ${cexRows}
        ${manualRows}
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


// ============================================================
// VISIBILITY MODALS — Wallet/network visibility toggle modals
// ============================================================
function wireOverlayDismiss(overlayId, onClose){
  const overlay=document.getElementById(overlayId);
  overlay.addEventListener('click',e=>{ if(e.target===overlay) onClose(); });
}

let pendingVisibilityAccId=null;
function openVisibilityModal(accId){
  pendingVisibilityAccId=accId;
  const acc=accounts.find(a=>a.id===accId);
  if(!acc) return;
  
  const list=document.getElementById('visibility-list');
  list.innerHTML='';
  
  acc.wallets.forEach(w=>{
    const isHidden=w.hidden||false;
    const walletValue=accValue({wallets:[w]});
    const label=walletDisplayName(w);
    const sub=walletMetaLabel(w);
    const valueStr=fmt(walletValue);
    
    const rowEl=document.createElement('div');
    rowEl.className='visibility-item';
    rowEl.innerHTML=`
      <label class="visibility-checkbox">
        <input type="checkbox" ${!isHidden?'checked':''} onchange="toggleWalletVisibility(${accId},${w.id},this.checked)">
        <span class="checkbox-mark"></span>
      </label>
      <div class="visibility-info">
        <div class="visibility-label">${label}</div>
        <div class="visibility-sub">${sub}</div>
      </div>
      <div class="visibility-value">${valueStr}</div>
    `;
    list.appendChild(rowEl);
  });
  
  document.getElementById('visibilityOverlay').classList.add('open');
}

function closeVisibilityModal(){
  pendingVisibilityAccId=null;
  document.getElementById('visibilityOverlay').classList.remove('open');
  render();
}

function toggleWalletVisibility(accId,walletId,isVisible){
  const acc=accounts.find(a=>a.id===accId);
  const w=acc?.wallets.find(x=>x.id===walletId);
  if(!acc || !w) return;
  
  w.hidden=!isVisible;
  save();
}

let pendingNetworkVisibility=null;
function openNetworkVisibilityModal(accId,walletId){
  const acc=accounts.find(a=>a.id===accId);
  const w=acc?.wallets.find(x=>x.id===walletId);
  if(!acc || !w || w.type!=='crypto') return;

  ensureCryptoWalletShape(w);
  pendingNetworkVisibility={accId,walletId};

  const title=document.getElementById('network-visibility-sub');
  if(title) title.textContent=`Choose networks to show for ${walletDisplayName(w)}.`;

  const byChain=new Map();
  (w.nets||[]).forEach(n=>{
    const key=String(n.chain||'').trim()||'Unknown';
    const curr=byChain.get(key)||{native:0,tokens:0};
    curr.native+=n.bal*(PRICES[n.sym]||0);
    byChain.set(key,curr);
  });
  (w.toks||[]).forEach(t=>{
    const key=String(t.chain||'').trim()||'Unknown';
    const curr=byChain.get(key)||{native:0,tokens:0};
    curr.tokens+=t.bal*(TPRICES[t.addr]??t.php??0);
    byChain.set(key,curr);
  });

  const chains=[...byChain.keys()].sort((a,b)=>a.localeCompare(b));
  const list=document.getElementById('network-visibility-list');
  list.innerHTML='';

  if(!chains.length){
    list.innerHTML='<div class="empty-row">No network data yet. Refresh wallet first.</div>';
  } else {
    chains.forEach(chainName=>{
      const totals=byChain.get(chainName)||{native:0,tokens:0};
      const totalVal=(totals.native||0)+(totals.tokens||0);

      const row=document.createElement('div');
      row.className='visibility-item';

      const labelWrap=document.createElement('label');
      labelWrap.className='visibility-checkbox';

      const input=document.createElement('input');
      input.type='checkbox';
      input.checked=isWalletNetworkVisible(w,chainName);
      input.addEventListener('change',()=>toggleWalletNetworkVisibility(accId,walletId,chainName,input.checked));

      const mark=document.createElement('span');
      mark.className='checkbox-mark';
      labelWrap.appendChild(input);
      labelWrap.appendChild(mark);

      const info=document.createElement('div');
      info.className='visibility-info';
      info.innerHTML=`<div class="visibility-label">${chainName}</div><div class="visibility-sub">Native + tokens</div>`;

      const value=document.createElement('div');
      value.className='visibility-value';
      value.textContent=fmt(totalVal);

      row.appendChild(labelWrap);
      row.appendChild(info);
      row.appendChild(value);
      list.appendChild(row);
    });
  }

  document.getElementById('networkVisibilityOverlay').classList.add('open');
}

function closeNetworkVisibilityModal(){
  pendingNetworkVisibility=null;
  document.getElementById('networkVisibilityOverlay').classList.remove('open');
  render();
}

function toggleWalletNetworkVisibility(accId,walletId,networkName,isVisible){
  const acc=accounts.find(a=>a.id===accId);
  const w=acc?.wallets.find(x=>x.id===walletId);
  if(!acc || !w || w.type!=='crypto') return;
  ensureCryptoWalletShape(w);

  const key=String(networkName||'').trim();
  if(!key) return;

  const set=new Set(w.hiddenNetworks||[]);
  if(isVisible) set.delete(key);
  else set.add(key);
  w.hiddenNetworks=[...set];
  save();
}