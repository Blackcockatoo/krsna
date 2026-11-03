const audio=document.querySelector('#audio'),play=document.querySelector('#play'),seek=document.querySelector('#seek'),time=document.querySelector('#time'),mute=document.querySelector('#mute'),status=document.querySelector('#audio-status');
const fmt=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
function update(){const duration=Number.isFinite(audio.duration)?audio.duration:225.76;seek.max=duration;seek.value=audio.currentTime;time.textContent=`${fmt(audio.currentTime)} / ${fmt(duration)}`;play.textContent=audio.paused?'▶':'Ⅱ';play.setAttribute('aria-label',audio.paused?'Play the crossing-song':'Pause the crossing-song')}
play.addEventListener('click',async()=>{try{status.textContent='';if(audio.paused)await audio.play();else audio.pause()}catch{status.textContent='Playback could not start. Try the download link below.'}});
['timeupdate','loadedmetadata','play','pause','ended'].forEach(e=>audio.addEventListener(e,update));
seek.addEventListener('input',()=>{if(Number.isFinite(audio.duration)){audio.currentTime=Number(seek.value);update()}});
mute.addEventListener('click',()=>{audio.muted=!audio.muted;mute.textContent=audio.muted?'Sound off':'Sound on';mute.setAttribute('aria-label',audio.muted?'Unmute audio':'Mute audio')});
audio.addEventListener('error',()=>{status.textContent='The recording could not load. Please try the download link.'});
document.querySelectorAll('[data-view]').forEach(button=>{if(button.tagName!=='BUTTON')return;button.addEventListener('click',()=>{document.querySelector('#movements').dataset.view=button.dataset.view;document.querySelectorAll('.view-options button').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})})});
document.querySelector('#jump').addEventListener('change',e=>document.getElementById(e.target.value)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
