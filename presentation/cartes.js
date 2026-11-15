
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
 var x0=null,y0=0,dx=0;
 document.addEventListener('touchstart',function(e){if(e.target.closest('a'))return;x0=e.touches[0].clientX;y0=e.touches[0].clientY;dx=0;cards[i].classList.add('drag')},{passive:true});
 document.addEventListener('touchmove',function(e){if(x0===null)return;dx=e.touches[0].clientX-x0;cards[i].style.transform='translateX('+dx+'px) rotate('+(dx/40)+'deg)'},{passive:true});
 document.addEventListener('touchend',function(e){if(x0===null)return;var c=cards[i];c.classList.remove('drag');c.style.transform='';
  if(Math.abs(dx)>60)go(dx<0?1:-1);else if(Math.abs(dx)<8){go(x0>innerWidth*.33?1:-1)}x0=null});
 show();
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
