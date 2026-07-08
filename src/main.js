// ============================================================
// MAIN / INIT — Wires up overlay-dismiss handlers, input listeners, then boots the app
// ============================================================
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
wireOverlayDismiss('visibilityOverlay', closeVisibilityModal);
wireOverlayDismiss('networkVisibilityOverlay', closeNetworkVisibilityModal);
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