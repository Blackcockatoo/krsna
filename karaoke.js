import {LINES} from './lyrics-data.js';
import {start,end,text,atTime,fill,loopBounds} from './karaoke-core.mjs';
const $=s=>document.querySelector(s),audio=$('#audio'),shell=$('#karaoke'),stage=$('#sung-line'),translation=$('#sung-english'),previous=$('#stage-previous'),next=$('#stage-next'),meta=$('#stage-movement'),count=$('#stage-count'),kicker=$('#stage-kicker'),scroller=$('#translation-scroll'),rows=[...document.querySelectorAll('.lyric-row')],followButton=$('#follow'),resume=$('#resume-follow'),repeat=$('#repeat-line'),status=$('#karaoke-status');
let offset=0,follow=true,loop=-1,selected=-1,lastMode='',lastFocus=-2,frame=0,lastStamp=0,words=[],autoScrollUntil=0,channel=null,lastBroadcast=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{channel=new BroadcastChannel('krsnapaksi-live-chant')}catch{}
function setFollow(on){follow=on;followButton.setAttribute('aria-pressed',String(on));followButton.textContent=on?'Follow on':'Follow off';resume.hidden=on;if(on){lastFocus=-2;render()}}
function seekLine(i){const row=LINES[i];if(!row||!Number.isFinite(audio.duration))return;audio.currentTime=Math.max(0,Math.min(audio.duration,start(row)-offset));if(loop>=0)loop=i;selected=i;render();audio.dispatchEvent(new Event('timeupdate'))}
function syncFocus(i){rows.forEach((row,n)=>{row.classList.toggle('current',n===i);if(n===i)row.setAttribute('aria-current','true');else row.removeAttribute('aria-current')});if(i>=0&&follow){const row=rows[i];autoScrollUntil=performance.now()+650;scroller.scrollTo({top:Math.max(0,row.offsetTop-scroller.clientHeight*.35),behavior:reduced?'instant':'smooth'})}}
function render(){
 const t=audio.currentTime+offset,state=atTime(LINES,t),line=state.active>=0?LINES[state.active]:null;
 const mode=line?'line-'+state.active:state.ended?'ended':t<start(LINES[0])?'intro':'rest-'+state.next;
 selected=state.active>=0?state.active:state.focus;
 if(mode!==lastMode){lastMode=mode;words=[];stage.replaceChildren();kicker.hidden=!!line;
  if(line){for(const word of line.words){const span=document.createElement('span');span.className='sung-word';span.textContent=word.t;stage.append(span,document.createTextNode(' '));words.push(span)}translation.textContent=line.en;meta.textContent=`${line.mov} · ${line.title}`;count.textContent=`${state.active+1} / ${LINES.length}`;previous.textContent=state.active>0?text(LINES[state.active-1]):'';kicker.textContent='';}
  else if(state.ended){stage.textContent='tarata, tarata';translation.textContent='Let heaven and hell both know our name.';kicker.textContent='THE OFFERING CONTINUES';meta.textContent='XVI · CROSS, CROSS, CROSS';count.textContent='80 / 80';previous.textContent='';}
  else{const upcoming=LINES[state.next];stage.textContent=t<start(LINES[0])?'Kṛṣṇapakṣi':'The wing rests';translation.textContent=t<start(LINES[0])?'Press play. Follow the Names.':upcoming?.en??'';kicker.textContent=t<start(LINES[0])?'THE FRUIT OF BHAKTI':'BETWEEN THE LINES';meta.textContent=upcoming?`${upcoming.mov} · ${upcoming.title}`:'THE CROSSING-SONG';count.textContent='';previous.textContent=t>=start(LINES[0])&&state.focus>=0?text(LINES[state.focus]):'';}
  next.textContent=state.next>=0?text(LINES[state.next]):'The fruit of bhakti.';shell.classList.toggle('is-singing',!!line);
 }
 if(line)words.forEach((span,i)=>span.style.setProperty('--fill',`${fill(line.words[i],t)*100}%`));
 const focused=state.active>=0?state.active:state.ended?-1:state.next>=0?state.next:state.focus;
 if(focused!==lastFocus){lastFocus=focused;syncFocus(focused)}
 if(loop>=0){const bounds=loopBounds(LINES[loop],offset,audio.duration||225.76);if(!audio.paused&&audio.currentTime>=bounds.to){audio.currentTime=bounds.from;lastMode=''}}
 if(channel&&performance.now()-lastBroadcast>90){lastBroadcast=performance.now();channel.postMessage({type:'clock',t,playing:!audio.paused,index:focused})}
}
function tick(stamp){if(stamp-lastStamp>30){lastStamp=stamp;render()}if(!audio.paused)frame=requestAnimationFrame(tick)}
audio.addEventListener('play',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(tick)});
audio.addEventListener('pause',()=>{cancelAnimationFrame(frame);render()});
['seeked','timeupdate','loadedmetadata','ended'].forEach(event=>audio.addEventListener(event,render));
rows.forEach((row,i)=>row.addEventListener('click',()=>seekLine(i)));
followButton.addEventListener('click',()=>setFollow(!follow));resume.addEventListener('click',()=>setFollow(true));
for(const event of ['wheel','touchstart','pointerdown'])scroller.addEventListener(event,()=>setFollow(false),{passive:true});
scroller.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(e.key))setFollow(false)});
$('#previous-line').addEventListener('click',()=>seekLine(Math.max(0,selected-1)));
$('#next-line').addEventListener('click',()=>seekLine(Math.min(LINES.length-1,selected+1)));
repeat.addEventListener('click',()=>{loop=loop>=0?-1:Math.max(0,selected);repeat.setAttribute('aria-pressed',String(loop>=0));repeat.textContent=loop>=0?'Repeating line ↻':'Repeat line';if(loop>=0)seekLine(loop)});
$('#tempo').addEventListener('change',e=>{audio.playbackRate=Number(e.target.value)});
function setOffset(value){offset=Math.round(Math.max(-5,Math.min(5,value))*10)/10;$('#offset-label').textContent=`Timing ${offset>=0?'+':''}${offset.toFixed(1)}s`;lastMode='';render()}
$('#offset-more').addEventListener('click',()=>setOffset(offset+.1));$('#offset-less').addEventListener('click',()=>setOffset(offset-.1));$('#offset-reset').addEventListener('click',()=>setOffset(0));
function immerse(on){shell.classList.toggle('immersive',on);document.body.classList.toggle('chant-immersive',on);$('#immersive').textContent=on?'Close ×':'Expand ↗';$('#immersive').setAttribute('aria-pressed',String(on));if(on){shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','Immersive crossing-song');shell.focus({preventScroll:true})}else{shell.removeAttribute('role');shell.removeAttribute('aria-modal');shell.removeAttribute('aria-label')};lastFocus=-2;render()}
$('#immersive').addEventListener('click',()=>immerse(!shell.classList.contains('immersive')));
shell.addEventListener('keydown',e=>{if(e.key==='Tab'&&shell.classList.contains('immersive')){const focusable=[...shell.querySelectorAll('button,input,select,a')].filter(el=>!el.hidden&&el.getClientRects().length);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===shell)){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}};if(e.key==='Escape'){immerse(false);$('#immersive').focus();return}if(e.target.closest('input,select,button,a'))return;if(e.code==='Space'){e.preventDefault();$('#play').click()}if(e.key==='ArrowRight'){e.preventDefault();seekLine(Math.min(LINES.length-1,selected+1))}if(e.key==='ArrowLeft'){e.preventDefault();seekLine(Math.max(0,selected-1))}});
$('#pop-translation').addEventListener('click',()=>{const opened=window.open('translation.html','krsnapaksi-english','width=520,height=850');status.textContent=opened?'English companion opened. It follows this player.':'The pop-up was blocked. The English panel here continues to follow.'});
if(channel)channel.onmessage=event=>{const data=event.data;if(data?.type==='seek'&&Number.isInteger(data.index)&&data.index>=0&&data.index<LINES.length)seekLine(data.index);if(data?.type==='ready'){lastBroadcast=0;render()}};
render();
