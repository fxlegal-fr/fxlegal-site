/* Mesure d'audience (Google Tag Manager GTM-W6F64BNR) chargée UNIQUEMENT après accord du visiteur (règles CNIL).
   Choix mémorisé 6 mois. Lien « Cookies » (id fx-cookies) : rouvre le choix. */
(function(){
  var ID='GTM-W6F64BNR',K='fx-consent',DUREE=182*864e5;
  var en=(document.documentElement.lang||'fr').indexOf('en')===0;
  var T=en?{t:'This site uses audience measurement cookies (Google) to understand how it is used. Nothing is set without your consent.',o:'Accept',n:'Decline',m:'Learn more',u:'/en/legal/'}
          :{t:'Ce site utilise des cookies de mesure d’audience (Google) pour comprendre comment il est consulté. Rien n’est déposé sans votre accord.',o:'Accepter',n:'Refuser',m:'En savoir plus',u:'/mentions/'};
  function lire(){try{var v=JSON.parse(localStorage.getItem(K)||'null');return v&&Date.now()-v.d<DUREE?v.c:null}catch(e){return null}}
  function ecrire(c){try{localStorage.setItem(K,JSON.stringify({c:c,d:Date.now()}))}catch(e){}}
  function gtm(){if(window.__fxgtm)return;window.__fxgtm=1;window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+ID;document.head.appendChild(s);}
  function bandeau(){
    if(document.getElementById('fx-consent'))return;
    var d=document.createElement('div');d.id='fx-consent';d.setAttribute('role','dialog');d.setAttribute('aria-label','Cookies');
    d.innerHTML='<p>'+T.t+' <a href="'+T.u+'">'+T.m+'</a></p><div><button type="button" data-c="non">'+T.n+'</button><button type="button" data-c="oui">'+T.o+'</button></div>';
    var st=document.createElement('style');
    st.textContent='#fx-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;background:#120C1A;color:#E4DCEE;border:1px solid rgba(255,255,255,.14);border-radius:18px;padding:16px 18px;font:14px/1.5 Outfit,system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)}'
      +'#fx-consent p{margin:0 0 12px}#fx-consent a{color:#B8A6FF}#fx-consent div{display:flex;gap:10px;justify-content:flex-end}'
      +'#fx-consent button{font:inherit;font-weight:700;border-radius:999px;padding:9px 18px;cursor:pointer;border:1px solid rgba(255,255,255,.22);background:transparent;color:#F6F2FA}'
      +'#fx-consent button[data-c=oui]{border:0;background:linear-gradient(120deg,#33248F,#5E1A7A 48%,#7E1232);color:#fff}';
    d.appendChild(st);
    d.addEventListener('click',function(e){var c=e.target.getAttribute&&e.target.getAttribute('data-c');if(!c)return;ecrire(c);d.remove();if(c==='oui')gtm();});
    document.body.appendChild(d);
  }
  function go(){
    var c=lire();if(c==='oui')gtm();else if(c===null)bandeau();
    var l=document.getElementById('fx-cookies');if(l)l.addEventListener('click',function(e){e.preventDefault();try{localStorage.removeItem(K)}catch(x){}bandeau();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
