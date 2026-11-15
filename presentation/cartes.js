
(function(){
 var cards=[].slice.call(document.querySelectorAll('.card')),n=cards.length,i=0,bars=document.getElementById('bars');
 cards.forEach(function(){bars.appendChild(document.createElement('i')).appendChild(document.createElement('b'))});
 var bi=[].slice.call(bars.children);
 var h=parseInt((location.hash||'').slice(1),10); if(h>=1&&h<=n) i=h-1;
 function show(){cards.forEach(function(c,k){c.className=c.className.replace(/\s?(cur|prev|next1)/g,'');if(k===i)c.classList.add('cur');else if(k<i)c.classList.add('prev');else if(k===i+1)c.classList.add('next1')});
  bi.forEach(function(b,k){b.classList.toggle('on',k<=i)});document.getElementById('cnt').textContent=(i+1)+' / '+n;
  history.replaceState(null,'','#'+(i+1));}
 function go(d){var j=Math.max(0,Math.min(n-1,i+d));if(j!==i){i=j;show()}}
 document.addEventListener('keydown',function(e){if(['ArrowRight','ArrowDown','PageDown',' '].indexOf(e.key)>=0){e.preventDefault();go(1)}if(['ArrowLeft','ArrowUp','PageUp'].indexOf(e.key)>=0){e.preventDefault();go(-1)}});
 document.getElementById('nx').onclick=function(){go(1)};document.getElementById('pv').onclick=function(){go(-1)};
 var x0=null,y0=0,dx=0,dy=0,vu=false;
 /* Une carte qui défile (très petit écran) garde son défilement vertical : on ne change alors de carte que sur le côté. */
 function defile(c){return c.classList.contains('fit-min')}
 document.addEventListener('touchstart',function(e){vu=true;if(e.target.closest('a,button'))return;x0=e.touches[0].clientX;y0=e.touches[0].clientY;dx=dy=0;cards[i].classList.remove('nudge');cards[i].classList.add('drag')},{passive:true});
 document.addEventListener('touchmove',function(e){if(x0===null)return;dx=e.touches[0].clientX-x0;dy=e.touches[0].clientY-y0;var c=cards[i];
  if(Math.abs(dy)>Math.abs(dx)){if(!defile(c))c.style.transform='translateY('+(dy/3)+'px)'}
  else c.style.transform='translateX('+dx+'px) rotate('+(dx/40)+'deg)'},{passive:true});
 document.addEventListener('touchend',function(e){if(x0===null)return;var c=cards[i],ax=Math.abs(dx),ay=Math.abs(dy);c.classList.remove('drag');c.style.transform='';
  if(ax>60&&ax>=ay)go(dx<0?1:-1);                       /* glisser vers la gauche ou la droite */
  else if(ay>60&&ay>ax){if(!defile(c))go(dy<0?1:-1)}    /* faire défiler vers le haut : carte suivante */
  else if(ax<8&&ay<8)go(x0>innerWidth*.33?1:-1);        /* toucher */
  x0=null});
 /* Molette ou pavé tactile sur ordinateur */
 var tw=0;document.addEventListener('wheel',function(e){vu=true;var d=Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX,t=Date.now();
  if(Math.abs(d)<12||t-tw<450)return;tw=t;go(d>0?1:-1)},{passive:true});
 document.addEventListener('keydown',function(){vu=true});
 /* À l'ouverture, la première carte bouge une fois pour montrer qu'on peut la faire glisser. */
 if(i===0&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))
  setTimeout(function(){if(!vu&&i===0)cards[0].classList.add('nudge')},1100);
 show();
 /* Partage : menu de partage du téléphone, sinon copie du lien. Le lien ouvre la présentation à la première carte. */
 var toast=document.body.appendChild(document.createElement('div'));toast.className='toast';
 function partager(b){var u=location.origin+location.pathname,d={title:document.title,url:u};
  if(navigator.share){navigator.share(d).catch(function(){});return}
  var fin=function(){toast.textContent=b.getAttribute('data-copied')||'OK';toast.classList.add('on');setTimeout(function(){toast.classList.remove('on')},1800)};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(fin,function(){prompt('',u)});else prompt('',u);}
 [].forEach.call(document.querySelectorAll('[data-share]'),function(b){b.addEventListener('click',function(e){e.stopPropagation();partager(b)})});
 /* Comptage sans cookie ni identifiant : quelle présentation est ouverte (onglet « Visites » du CRM). */
 try{var m=location.pathname.match(/presentation\/(pme|eti)/);
  if(m)new Image().src='https://script.google.com/macros/s/AKfycbwdddYYDbGJyHZjcldpZf21HN1JpkNsdoru0yGUDDjxxl5FdFuUmSDpTWBEpRS5LJSJ2w/exec?hit=presentation-'+m[1]+'&src=carte&lang='+(document.documentElement.lang||'fr').slice(0,2)+'&t='+Date.now();}catch(x){}
 /* Ajuste la taille du texte de chaque carte pour que rien ne soit coupé (petits téléphones). */
 function fit(){cards.forEach(function(c){c.style.fontSize='';c.classList.remove('fit-min');var f=16;
   while(c.scrollHeight>c.clientHeight+1&&f>11.5){f-=.5;c.style.fontSize=f+'px'}
   if(c.scrollHeight>c.clientHeight+1)c.classList.add('fit-min');});}
 fit();addEventListener('resize',fit);addEventListener('load',fit);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();
