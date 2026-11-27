/* Langue : un navigateur qui n'est pas en français est envoyé vers la version anglaise de la page.
   Un choix manuel (?lang=fr ou ?lang=en, posé par les liens FR / EN) est retenu sur cet appareil. */
(function(){try{
 var M={'/':'/en/','/eti/':'/en/midsize/','/ai-build-run/':'/en/ai-build-run/','/offre/':'/en/offer/','/fonds/':'/en/funds/','/mentions/':'/en/legal/','/presentation/pme/':'/en/presentation/pme/','/presentation/eti/':'/en/presentation/eti/','/presentation/ia/':'/en/presentation/ia/'};
 var q=new URLSearchParams(location.search),c=q.get('lang'),S=null;
 try{S=window.localStorage}catch(e){}
 if(S&&(c==='fr'||c==='en'))try{S.setItem('fx-lang',c)}catch(e){}
 if(/bot|crawl|spider|slurp|google|bing|yandex|baidu|duckduck|lighthouse|facebookexternalhit|linkedin/i.test(navigator.userAgent||''))return; /* robots : jamais de redirection, chaque langue est indexée sous sa propre URL */
 var en=M[location.pathname.replace(/index\.html$/,'')];if(!en)return;
 var choix=c;if(!choix&&S)try{choix=S.getItem('fx-lang')}catch(e){}
 if(choix==='fr')return;
 var l=((navigator.languages&&navigator.languages[0])||navigator.language||'fr').toLowerCase();
 if(choix==='en'||l.indexOf('fr')!==0){q.delete('lang');var s=q.toString();location.replace(en+(s?'?'+s:'')+location.hash)}
}catch(e){}})();
