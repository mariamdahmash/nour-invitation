'use strict';
const openBtn=document.getElementById('openBtn');
const opening=document.getElementById('opening');
const main=document.getElementById('main');
const envelope=document.getElementById('envelope');
const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let opened=false;
function setMusicUI(){const playing=!music.paused;musicBtn.classList.toggle('playing',playing);musicBtn.setAttribute('aria-pressed',String(playing));musicBtn.setAttribute('aria-label',playing?'إيقاف الموسيقى':'تشغيل الموسيقى');musicBtn.title=playing?'إيقاف الموسيقى':'تشغيل الموسيقى';}
async function playMusic(){try{await music.play();}catch(e){/* No file or playback blocked: manual control remains available. */}setMusicUI();}
openBtn.addEventListener('click',()=>{if(opened)return;opened=true;envelope.classList.add('opened');playMusic();const delay=reducedMotion?0:1050;window.setTimeout(()=>{opening.classList.add('dismissed');main.inert=false;musicBtn.hidden=false;document.querySelector('.hero h1').focus?.();if(!reducedMotion)heartBurst();window.setTimeout(()=>{opening.hidden=true},900)},delay)});
musicBtn.addEventListener('click',()=>{if(music.paused)playMusic();else music.pause()});
music.addEventListener('play',setMusicUI);music.addEventListener('pause',setMusicUI);music.addEventListener('error',()=>{musicBtn.title='أضفوا ملف الموسيقى لتشغيلها';setMusicUI()});
const target=Date.parse('2026-11-14T20:00:00+02:00');
function updateCountdown(){const diff=Math.max(0,target-Date.now());const units=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(units[i]).padStart(2,'0'));document.getElementById('countdownDone').hidden=diff!==0;}
updateCountdown();setInterval(updateCountdown,1000);
function downloadCalendar(){const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Noorhan and Omar//Engagement Invitation//AR','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:engagement-20261114-noorhan-omar@example.invalid','DTSTAMP:'+stamp,'DTSTART:20261114T180000Z','DTEND:20261114T210000Z','SUMMARY:خطوبة نورهان وعمر','DESCRIPTION:فرحتنا تكمل بوجودكم معانا','URL:https://maps.app.goo.gl/DyGBWhxAvbo9Fw9z6?g_st=aw','END:VEVENT','END:VCALENDAR'];const blob=new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='noorhan-omar-engagement.ics';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
document.getElementById('calendarBtn').addEventListener('click',downloadCalendar);
if('IntersectionObserver'in window&&!reducedMotion){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
function heartBurst(){for(let i=0;i<13;i++){const heart=document.createElement('span');heart.className='burst';heart.textContent='♡';heart.style.left='50%';heart.style.top='50%';heart.style.setProperty('--x',`${(Math.random()-.5)*460}px`);heart.style.setProperty('--y',`${(Math.random()-.5)*450}px`);heart.style.fontSize=`${15+Math.random()*20}px`;document.body.append(heart);setTimeout(()=>heart.remove(),1600)}}
if(!reducedMotion){const container=document.getElementById('petals');for(let i=0;i<12;i++){const p=document.createElement('span');p.className='petal';p.textContent=i%3===0?'♡':'✿';p.style.left=`${Math.random()*100}%`;p.style.animationDuration=`${12+Math.random()*12}s`;p.style.animationDelay=`-${Math.random()*24}s`;container.append(p)}}
