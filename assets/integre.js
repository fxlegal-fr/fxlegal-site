/* Page ouverte dans la carte (/carte, en surimpression) : le logo devient « ‹ Retour » et ferme la surimpression. */
(function(){var e=false;try{e=window.self!==window.top}catch(x){e=true}
 if(!e)return;
 function go(){var a=document.querySelector('.top a[href="/carte/"],header a[href="/"],header a[href="/en/"]');if(!a)return;
  var en=(document.documentElement.lang||'fr').indexOf('en')===0;
  a.innerHTML='<span style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px 7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:#F6F2FA;font:700 14px/1 Outfit,system-ui,sans-serif"><span style="font-size:20px;line-height:.8;color:#B8A6FF">‹</span>'+(en?'Back':'Retour')+'</span>';
  a.style.textDecoration='none';a.setAttribute('aria-label',en?'Back to the card':'Retour à la carte');
  a.addEventListener('click',function(ev){ev.preventDefault();parent.postMessage('fx-fermer','*')});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
