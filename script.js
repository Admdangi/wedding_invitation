/* ===== EDIT EVERYTHING HERE ===== */
const CONFIG = {
  bride: "Aarohi", groom: "Vihaan",
  brideImg: "assets/images/bride.jpg", groomImg: "assets/images/groom.jpg", coupleImg: "assets/images/couple.jpg",
  weddingDateTime: "2027-02-18T19:00:00+05:30",   // ISO format, with timezone
  rsvpBy: "5 February 2027",
  venue: { name: "Rambagh Palace Lawns", address: "Bhawani Singh Road, Jaipur, Rajasthan 302005", mapQuery: "Rambagh Palace Jaipur" },
  parents: { bride: "Mr. & Mrs. Rajesh Sharma", groom: "Mr. & Mrs. Anil Mehta" },
  music: "assets/music/wedding-music.mp3",
  rsvpEndpoint: "",   // Paste Google Apps Script web-app URL here (see README)
  events: [            // date: YYYY-MM-DD, theme: class name (hal/meh/san/wed/rec or blank)
    {name:"Roka Ceremony",date:"2027-01-10",time:"11:00 AM",venue:"Sharma Residence, Jaipur",desc:"A blessed beginning as both families exchange gifts and sweets.",icon:"🪔",theme:"",img:"assets/images/gallery/roka.jpg"},
    {name:"Engagement Ceremony",date:"2027-02-05",time:"6:00 PM",venue:"The Oberoi Rajvilas, Jaipur",desc:"An evening of rings, promises and joyous music.",icon:"💍",theme:"",img:"assets/images/gallery/engagement.jpg"},
    {name:"Haldi Ceremony",date:"2027-02-16",time:"10:30 AM",venue:"Rambagh Palace Gardens",desc:"Sunshine, marigolds and turmeric laughter.",icon:"🌼",theme:"hal",img:"assets/images/gallery/haldi.jpg"},
    {name:"Mehendi Ceremony",date:"2027-02-16",time:"4:00 PM",venue:"Rambagh Palace Courtyard",desc:"Intricate henna, folk songs and sweet secrets.",icon:"🌿",theme:"meh",img:"assets/images/gallery/mehendi.jpg"},
    {name:"Sangeet Night",date:"2027-02-17",time:"7:30 PM",venue:"Rambagh Grand Ballroom",desc:"Dance, music and glowing lights till midnight.",icon:"🎶",theme:"san",img:"assets/images/gallery/sangeet.jpg"},
    {name:"Wedding Ceremony",date:"2027-02-18",time:"7:00 PM",venue:"Rambagh Palace Lawns",desc:"The sacred pheras beneath the royal mandap.",icon:"🔥",theme:"wed",img:"assets/images/gallery/wedding.jpg"},
    {name:"Grand Reception",date:"2027-02-19",time:"8:00 PM",venue:"Rambagh Palace Grand Hall",desc:"An elegant evening of dinner, toasts and celebration.",icon:"🥂",theme:"rec",img:"assets/images/gallery/reception.jpg"}
  ],
  story: [
    {t:"How We Met",d:"March 2019",p:"A rainy afternoon, a shared umbrella and a conversation that never really ended.",img:"assets/images/gallery/story1.jpg"},
    {t:"First Meeting",d:"June 2019",p:"Coffee turned into dinner, dinner into hours of laughter.",img:"assets/images/gallery/story2.jpg"},
    {t:"Special Moments",d:"2020 – 2025",p:"Road trips, festivals, and quiet evenings that became our favourite memories.",img:"assets/images/gallery/story3.jpg"},
    {t:"The Proposal",d:"December 2025",p:"Under a sky of lanterns, one question and a joyful yes.",img:"assets/images/gallery/story4.jpg"},
    {t:"The Beginning of Forever",d:"18 February 2027",p:"With our families beside us, we begin our greatest journey.",img:"assets/images/gallery/story5.jpg"}
  ],
  gallery: ["Bride","Groom","Couple","Family","Engagement","Pre-wedding","Couple","Bride","Family"].map((c,i)=>({src:`assets/images/gallery/g${i+1}.jpg`,cap:c}))
};
/* ===== END CONFIG ===== */

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const W=new Date(CONFIG.weddingDateTime);
const fmt=(d,o)=>d.toLocaleDateString('en-IN',o);
const initials=CONFIG.bride[0]+" & "+CONFIG.groom[0];
// Placeholder if a real image file is missing
const ph=(l,i=0)=>{const h=[340,20,40,300,160][i%5];return "data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='${i%2?800:600}'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#641E35'/><stop offset='1' stop-color='#4A1025'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><circle cx='300' cy='${i%2?400:300}' r='120' fill='none' stroke='#D4AF70' stroke-width='3' stroke-dasharray='6 10'/><text x='300' y='${i%2?415:315}' font-family='serif' font-size='44' fill='#D4AF70' text-anchor='middle'>${l}</text></svg>`)};
const img=(src,l,i)=>`<img src="${src}" alt="${l}" loading="lazy" onerror="this.onerror=null;this.src='${ph(l,i)}'">`;
const setImg=(el,src,l)=>{el.src=src;el.onerror=()=>{el.onerror=null;el.src=ph(l)}};
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.id);toast.id=setTimeout(()=>t.classList.remove('show'),2800)};

/* ---- Render content from CONFIG ---- */
document.title=`${CONFIG.bride} & ${CONFIG.groom} – Wedding Invitation`;
$$('.names:not(.title)').forEach(e=>e.innerHTML=`${CONFIG.bride} <span style="color:var(--gold)">&amp;</span> ${CONFIG.groom}`);
$('#heroNames').innerHTML=`${CONFIG.bride}<br><span style="color:var(--blush);font-size:.5em">weds</span><br>${CONFIG.groom}`;
$('.logo').textContent=initials;
$('#heroDate').textContent=fmt(W,{day:'numeric',month:'long',year:'numeric'});
$('#footDate').textContent=$('#heroDate').textContent;
setImg($('#brideImg'),CONFIG.brideImg,CONFIG.bride);setImg($('#groomImg'),CONFIG.groomImg,CONFIG.groom);
$('#brideCap').textContent=CONFIG.bride;$('#groomCap').textContent=CONFIG.groom;
$('#parents').innerHTML=`<div><h4>Bride's Family</h4>${CONFIG.parents.bride}<br>request your presence</div><div><h4>Groom's Family</h4>${CONFIG.parents.groom}<br>request your presence</div>`;
$('#eventList').innerHTML=CONFIG.events.map((e,i)=>{const d=new Date(e.date+"T00:00");return `<article class="ev ${e.theme}"><div class="img">${img(e.img,e.name,i)}</div><div class="body"><span class="ico">${e.icon}</span><h3>${e.name}</h3><div class="when">${fmt(d,{weekday:'long',day:'numeric',month:'long'})} · ${e.time}</div><p><strong>${e.venue}</strong></p><p>${e.desc}</p></div></article>`}).join('');
$('#timeline').innerHTML=CONFIG.story.map((s,i)=>`<div class="tl"><div class="pic">${img(s.img,s.t,i)}</div><div><small>${s.d}</small><h3>${s.t}</h3><p>${s.p}</p></div></div>`).join('');
$('#grid').innerHTML=CONFIG.gallery.map((g,i)=>`<img data-i="${i}" src="${g.src}" alt="${g.cap}" onerror="this.onerror=null;this.src='${ph(g.cap,i)}'">`).join('');
$('#vName').textContent=CONFIG.venue.name;$('#vAddr').textContent=CONFIG.venue.address;
$('#vList').innerHTML=CONFIG.events.map(e=>`<div class="vl"><b>${e.name}</b> – ${e.venue}</div>`).join('');
const q=encodeURIComponent(CONFIG.venue.mapQuery);
$('#map').src=`https://www.google.com/maps?q=${q}&output=embed`;
$('#dirBtn').href=`https://www.google.com/maps/dir/?api=1&destination=${q}`;
$('#fnSel').innerHTML=['All Functions',...CONFIG.events.map(e=>e.name)].map(n=>`<option>${n}</option>`).join('');
$('#rsvp .sec-title span').textContent=`Kindly respond by ${CONFIG.rsvpBy}`;

/* ---- Canvas effects: petals + sparkles + fireworks ---- */
const fx=$('#fx'),c=fx.getContext('2d'),fw=$('#fw'),f=fw.getContext('2d');let w,h;
const fit=()=>{w=fx.width=fw.width=innerWidth;h=fx.height=fw.height=innerHeight};fit();addEventListener('resize',fit);
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const N=innerWidth<700?18:34;
const mk=()=>({x:Math.random()*w,y:-20-Math.random()*h,s:6+Math.random()*9,v:.6+Math.random()*1.1,sw:Math.random()*6,r:Math.random()*6,t:Math.random()<.7?0:1});
const P=Array.from({length:N},mk);P.forEach(p=>p.y=Math.random()*h);
let FW=[],SP=[];
function burst(x,y,n=60){const hue=[345,42,320,50,20][Math.random()*5|0];for(let i=0;i<n;i++){const a=Math.PI*2*i/n,v=2+Math.random()*3.5;FW.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:`hsl(${hue+Math.random()*25},90%,65%)`})}}
function show(count=5){for(let i=0;i<count;i++)setTimeout(()=>burst(w*(.15+Math.random()*.7),h*(.15+Math.random()*.4)),i*350)}
function hearts(e,list=['❤','🌹','🌸','✨','💛']){for(let i=0;i<14;i++){const s=document.createElement('span');s.textContent=list[i%list.length];s.style.cssText=`position:fixed;left:${(e?e.clientX:w/2)+(Math.random()*100-50)}px;top:${e?e.clientY:h*.7}px;font-size:${18+Math.random()*20}px;z-index:150;pointer-events:none;transition:2.4s ease-out;opacity:1`;document.body.append(s);requestAnimationFrame(()=>{s.style.transform=`translate(${Math.random()*120-60}px,-${200+Math.random()*200}px) rotate(${Math.random()*80-40}deg)`;s.style.opacity=0});setTimeout(()=>s.remove(),2500)}}
(function loop(){c.clearRect(0,0,w,h);f.clearRect(0,0,w,h);
 if(!reduce){P.forEach(p=>{p.y+=p.v;p.r+=.02;p.x+=Math.sin(p.y/40+p.sw)*.7;if(p.y>h+20)Object.assign(p,mk(),{y:-20});
  c.save();c.translate(p.x,p.y);c.rotate(p.r);c.globalAlpha=.75;c.fillStyle=p.t?'#D4AF70':'#d9788c';c.beginPath();c.ellipse(0,0,p.s,p.s/2.2,0,0,7);c.fill();c.restore()});
  if(Math.random()<.15)SP.push({x:Math.random()*w,y:Math.random()*h,l:1});
  SP=SP.filter(s=>(s.l-=.02)>0);SP.forEach(s=>{c.globalAlpha=s.l;c.fillStyle='#FFE6A8';c.fillRect(s.x,s.y,2,2)});c.globalAlpha=1}
 FW=FW.filter(p=>p.l>0);FW.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.vx*=.985;p.l-=.013;f.globalAlpha=Math.max(p.l,0);f.fillStyle=p.c;f.beginPath();f.arc(p.x,p.y,2.2,0,7);f.fill()});f.globalAlpha=1;
 requestAnimationFrame(loop)})();

/* ---- Music (starts only after user click) ---- */
const au=$('#audio');au.src=CONFIG.music;let ready=false;
const setPlay=on=>{$('#player').classList.toggle('playing',on);$('#pp').textContent=on?'❚❚':'▶'};
async function play(){try{await au.play();setPlay(true)}catch{setPlay(false);toast('Add your music file at '+CONFIG.music)}}
$('#pp').onclick=()=>au.paused?play():(au.pause(),setPlay(false));
$('#mute').onclick=()=>{au.muted=!au.muted;$('#mute').textContent=au.muted?'🔇':'🔊'};

/* ---- Opening envelope ---- */
$('#openBtn').onclick=()=>{$('#env').classList.add('open');$('#openBtn').disabled=true;play();show(3);
 setTimeout(()=>{$('#intro').classList.add('gone');document.body.classList.remove('locked');show(4)},2600)};

/* ---- Date reveal ---- */
$('#discoverBtn').onclick=()=>{show(7);hearts();
 setTimeout(()=>{$('#beforeDate').hidden=true;$('#afterDate').hidden=false;
  $('#dDay').textContent=fmt(W,{weekday:'long'});$('#dNum').textContent=W.getDate();
  $('#dMonY').textContent=fmt(W,{month:'long'})+' '+W.getFullYear()},700)};

/* ---- Countdown ---- */
$('#count').innerHTML=['Days','Hours','Minutes','Seconds'].map(u=>`<div class="cd"><b data-u="${u}">00</b><span>${u}</span></div>`).join('');
function tick(){let d=W-Date.now();if(d<=0){$('#count').hidden=true;$('#today').hidden=false;return}
 const v=[d/864e5,d/36e5%24,d/6e4%60,d/1e3%60].map(n=>String(Math.floor(n)).padStart(2,'0'));
 $$('[data-u]').forEach((e,i)=>e.textContent=v[i])}
tick();setInterval(tick,1000);

/* ---- Scroll behaviours ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.ev,.tl').forEach((e,i)=>{e.style.transitionDelay=(i%3)*.12+'s';io.observe(e)});
let celebrated=false;
new IntersectionObserver(es=>{if(es[0].isIntersecting&&!celebrated&&!$('#intro').classList.contains('gone')===false){celebrated=true;show(3);hearts(null,['🌸','✨'])}},{threshold:.3}).observe($('.ev.wed'));
addEventListener('scroll',()=>{$('#top').classList.toggle('show',scrollY>600);const t=$('#timeline'),r=t.getBoundingClientRect();t.style.setProperty('--p',Math.min(1,Math.max(0,(h*.7-r.top)/r.height)));
 $('.hero').style.backgroundPositionY=scrollY*.3+'px'},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('#burger').onclick=()=>$('#links').classList.toggle('open');$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));

/* ---- Lightbox ---- */
let cur=0;const lb=$('#lb');
function openLb(i){cur=(i+CONFIG.gallery.length)%CONFIG.gallery.length;const g=$$('#grid img')[cur];$('#lbImg').src=g.src;$('#lbCap').textContent=g.alt;lb.hidden=false}
$('#grid').onclick=e=>e.target.dataset.i&&openLb(+e.target.dataset.i);
$('#lbX').onclick=()=>lb.hidden=true;$('#lbP').onclick=()=>openLb(cur-1);$('#lbN').onclick=()=>openLb(cur+1);
lb.onclick=e=>e.target===lb&&(lb.hidden=true);
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')lb.hidden=true;if(e.key==='ArrowLeft')openLb(cur-1);if(e.key==='ArrowRight')openLb(cur+1)});

/* ---- RSVP ---- */
$('#form').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
 const err=(n,m)=>{f[n].parentElement.querySelector('em').textContent=m;if(m)ok=false};
 err('name',d.name.trim().length<2?'Please enter your name':'');
 err('phone',/^[+]?[0-9\s-]{10,14}$/.test(d.phone.trim())?'':'Enter a valid mobile number');
 err('guests',d.guests>=1&&d.guests<=10?'':'Choose 1 to 10 guests');
 if(!ok)return;d.time=new Date().toISOString();
 const all=JSON.parse(localStorage.getItem('rsvps')||'[]');all.push(d);localStorage.setItem('rsvps',JSON.stringify(all)); // demo storage
 if(CONFIG.rsvpEndpoint){try{await fetch(CONFIG.rsvpEndpoint,{method:'POST',mode:'no-cors',body:JSON.stringify(d)})}catch{toast('Could not reach server; saved on this device')}}
 f.hidden=true;$('#thanks').hidden=false;show(3);hearts()};

/* ---- Share / Download / Blessings ---- */
$('#share').onclick=async()=>{const data={title:document.title,text:`You are invited to the wedding of ${CONFIG.bride} & ${CONFIG.groom}!`,url:location.href};
 try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);toast('Invitation link copied')}}catch{}};
$('#print').onclick=()=>{toast('Choose "Save as PDF" in the print dialog');setTimeout(()=>print(),600)};
$('#bless').onclick=e=>{hearts(e);toast('Thank you for your blessings ❤')};
