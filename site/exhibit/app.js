import {nextIndex,shouldResume,rotationItems,videoIsActive} from './rotation.mjs';
const $=id=>document.getElementById(id), {projects,items}=window.EXHIBIT;
const names={photo:'照片',video:'影片',music:'音樂',news:'新聞',award:'獎項'};
const offline=!!window.OFFLINE_ONLY;
const chapters={all:'計畫總覽',goal:'計畫目標',method:'實踐方法',results:'影音成果',awards:'得獎肯定'};
const state={project:'usr',section:'all',type:'all',id:items[0].id,auto:true,mixed:!offline,sound:false,lastAction:Date.now(),playing:false,listenUntil:0,deadline:Date.now()+12000,span:12000,token:0,player:null,watchdog:null,gallery:null,videoDeadlineSet:false,lastPosition:0,lastAdvance:Date.now()};
const current=()=>items.find(x=>x.id===state.id);
const visibleItems=()=>items.filter(x=>x.project===state.project&&(state.section==='all'||x.section===state.section)&&(state.type==='all'||x.type===state.type));
function el(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
function touch(){state.lastAction=Date.now();}
function manual(){state.auto=false;touch();$('media-tag').textContent=names[current().type]+' / 點選探索';updateStatus();}
function stopMedia(){state.token++;clearTimeout(state.watchdog);state.watchdog=null;clearInterval(state.gallery);state.gallery=null;state.videoDeadlineSet=false;if(state.player){try{state.player.destroy();}catch{}state.player=null;}state.playing=false;state.listenUntil=0;$('media').replaceChildren();document.querySelector('.visual').classList.remove('playing');}
function navs(){
 $('projects').replaceChildren();for(const [id,p] of Object.entries(projects)){const option=el('option',p.label);option.value=id;option.selected=id===state.project;$('projects').append(option);}
 $('chapters').replaceChildren();for(const [id,label] of Object.entries(chapters)){const b=el('button',label,id===state.section?'active':'');b.setAttribute('aria-pressed',id===state.section);b.onclick=()=>{if(id==='all'){startAuto();return;}manual();state.project='usr';state.section=id;state.type='all';navs();const a=visibleItems();if(a.length)show(a[0].id);else empty();};$('chapters').append(b);}
 $('types').replaceChildren();for(const [id,label] of [['all','全部'],...Object.entries(names)]){if(offline&&['music','video'].includes(id))continue;const b=el('button',label,id===state.type?'active':'');b.setAttribute('aria-pressed',id===state.type);b.onclick=()=>{manual();state.type=id;if(id!=='all')state.section='all';navs();const a=visibleItems();if(a.length)show(a[0].id);else empty();};$('types').append(b);}
}
$('projects').onchange=e=>{manual();state.project=e.target.value;state.section='all';state.type='all';navs();const a=visibleItems();if(a.length)show(a[0].id);else empty();};
function rail(){const a=visibleItems();$('rail').replaceChildren();$('count').textContent=`${a.length} 項展示`;for(const item of a){const b=el('button',undefined,'tile'+(item.id===state.id?' selected':''));b.setAttribute('aria-label',`${names[item.type]}：${item.title}`);b.setAttribute('aria-pressed',item.id===state.id);const img=el('img');img.src=item.image;img.alt='';img.loading='lazy';img.onerror=()=>{img.src='assets/musical-residents-training.webp';img.onerror=null;};b.append(img,el('span',names[item.type],'kind'),el('span',item.title,'label'));b.onclick=()=>{manual();show(item.id,item.type==='video'||item.type==='music');};$('rail').append(b);}if(!a.length)$('rail').append(el('p','這個計畫目前沒有此類成果，請選擇其他類型。','empty'));}
function empty(){stopMedia();$('media').append(el('div','此類成果尚未收錄','fallback'));$('item-title').textContent='選擇其他成果類型';$('item-meta').textContent='';$('media-tag').textContent='';$('item-description').textContent='請選擇其他類型，繼續探索計畫成果。';$('credits').textContent='';$('source').hidden=true;$('listen-tools').hidden=true;rail();updateStatus();}
function show(id,launch=false){
 const item=items.find(x=>x.id===id);if(!item)return;stopMedia();state.id=id;const p=projects[item.project];
 $('source').hidden=false;$('project-goal').textContent=p.goal;$('project-method').textContent=p.method;$('project-detail').open=false;$('evidence-label').textContent=item.section==='goal'?'我們希望帶來的改變':item.section==='method'?'流行音樂專業如何實踐':item.type==='award'?'外部肯定':'此刻，看見的成果';$('project-type').textContent=p.type;$('project-title').textContent=p.title;$('project-title').style.whiteSpace='pre-line';$('project-description').textContent=p.description;$('project-tags').replaceChildren(...p.tags.map(t=>el('span',t)));
 $('item-title').textContent=item.title;$('item-meta').textContent=item.date;$('media-tag').textContent=names[item.type]+(state.auto?' / 自動展示':' / 點選探索');$('item-description').textContent=item.description;$('credits').textContent=item.credits||'';$('source').href=item.source;$('source').textContent=item.type==='music'?'在 StreetVoice 開啟 ↗':item.type==='video'?'在 YouTube 開啟 ↗':item.type==='news'||item.type==='award'?'閱讀來源報導 ↗':'查看計畫來源 ↗';$('listen-tools').hidden=true;
 const img=el('img');img.src=item.image;img.alt=item.title;img.onerror=()=>{img.onerror=null;img.src='assets/musical-residents-training.webp';};$('media').append(img);if(item.type==='photo')img.className='moving-photo';
 if(item.type==='photo'){img.onclick=()=>{manual();$('large-photo').src=item.image;$('large-photo').alt=item.title;$('large-caption').textContent=item.title+'｜'+item.date;$('lightbox').showModal();};}
 if(item.type==='video'||item.type==='music'){const overlay=el('div',undefined,'media-launch'),b=el('button',item.type==='video'?'▶ 播放影片':'♫ 開啟 StreetVoice 播放器','launch-button');b.onclick=()=>{manual();activate(item);};overlay.append(b);$('media').append(overlay);if(launch)activate(item);}
 state.span=12000;state.deadline=Date.now()+state.span;rail();updateStatus();
}
let youtubePromise;
function yt(){if(window.YT?.Player)return Promise.resolve();if(!youtubePromise)youtubePromise=new Promise((resolve,reject)=>{const old=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{old?.();resolve();};const script=el('script');script.src='https://www.youtube.com/iframe_api';script.onerror=()=>{youtubePromise=null;reject(Error('播放器無法載入'));};document.head.append(script);});return youtubePromise;}
function fail(token,message){if(token!==state.token)return;state.token++;clearTimeout(state.watchdog);if(state.player){try{state.player.destroy();}catch{}state.player=null;}state.playing=false;const item=current();$('media').replaceChildren();const box=el('div',undefined,'fallback');box.append(el('p',message));const a=el('a','開啟原始作品 ↗');a.href=item.source;a.target='_blank';a.rel='noopener noreferrer';box.append(a);const b=el('button','繼續觀看其他成果');b.onclick=()=>step(1);box.append(b);$('media').append(box);state.span=8000;state.deadline=Date.now()+state.span;touch();updateStatus();}
async function activate(item){
 stopMedia();const token=state.token;document.querySelector('.visual').classList.add('playing');
 if(item.type==='music'){
  const wrap=el('div',undefined,'music-stage'),img=el('img');img.src=item.image;img.alt=item.title;const note=el('p','點播放器的播放鍵，即可聆聽作品');const frame=el('iframe');frame.title='StreetVoice：'+item.title;frame.src=`https://streetvoice.com/music/embed/?id=${item.songId}`;frame.allow='autoplay';frame.referrerPolicy='strict-origin-when-cross-origin';wrap.append(img,note,frame);$('media').append(wrap);startMusicGallery();state.listenUntil=Date.now()+(item.seconds+60)*1000;$('listen-tools').hidden=false;$('listen-note').textContent='歌曲畫面預留完整曲長與操作時間；重播或暫停較久時，可按「繼續聆聽」。';updateStatus();return;
 }
 $('media').append(el('div','正在載入影片…','fallback'));state.watchdog=setTimeout(()=>fail(token,'目前無法載入影片，您可以繼續看其他成果。'),15000);
 try{await yt();if(token!==state.token)return;$('media').replaceChildren();const holder=el('div');holder.id='yt-player-'+token;$('media').append(holder);
 state.player=new window.YT.Player(holder.id,{videoId:item.videoId,host:'https://www.youtube.com',width:'100%',height:'100%',playerVars:{autoplay:1,playsinline:1,origin:location.origin,rel:0},events:{
 onReady:e=>{if(token!==state.token)return;e.target.getIframe().setAttribute('title',item.title);if(!state.sound)e.target.mute();else e.target.unMute();e.target.playVideo();state.lastAdvance=Date.now();},
 onStateChange:e=>{if(token!==state.token)return;state.playing=videoIsActive(e.data);
  if(e.data===1){clearTimeout(state.watchdog);state.watchdog=null;state.lastAdvance=Date.now();state.lastPosition=e.target.getCurrentTime();if(state.auto&&!state.videoDeadlineSet){state.videoDeadlineSet=true;state.span=45000;state.deadline=Date.now()+45000;$('media-tag').textContent='影片 / 精選45秒';}}
  if(e.data===2){touch();}
  if(e.data===0){touch();if(state.auto)step(1);}
  updateStatus();
 },onError:()=>fail(token,'這支影片目前無法在此播放，請開啟原始作品或選擇其他成果。'),onAutoplayBlocked:()=>{if(token!==state.token)return;clearTimeout(state.watchdog);state.watchdog=null;state.playing=false;touch();$('status').textContent='請點影片中的播放鍵';if(state.auto){state.deadline=Date.now()+12000;state.span=12000;}}}});
 }catch{fail(token,'目前無法連線至 YouTube，照片仍可繼續展示。');}
}
function rotation(){return rotationItems(items,state.mixed).filter(x=>x.project==='usr');}
function step(direction){const a=state.auto?rotation():visibleItems();if(!a.length)return;const i=nextIndex(a.findIndex(x=>x.id===state.id),a.length,direction),item=a[i];show(item.id,state.auto&&item.type==='video');}
function startAuto(){if($('lightbox').open)$('lightbox').close();if($('resources-dialog').open)$('resources-dialog').close();state.auto=true;state.project='usr';state.section='all';state.type='all';navs();const a=rotation();const item=a.find(x=>x.id===state.id)||a[0];if(item)show(item.id,state.mixed&&item.type==='video');updateStatus();}
function updateStatus(){document.body.classList.toggle('auto-mode',state.auto);const a=rotation(),i=nextIndex(a.findIndex(x=>x.id===state.id),a.length);$('next-up').textContent=state.auto&&a[i]?'接著看｜'+a[i].title:'點選縮圖，探索完整作品';const item=current();$('auto').textContent=state.auto?'暫停輪播':'回到自動展示';$('sound').textContent=state.sound?'影片聲音：開':'影片聲音：關';if(state.auto)$('status').textContent=offline?'離線照片展示':state.mixed?'自動展示 · 照片12秒／影片45秒':'自動展示 · 每則12秒';else if(state.listenUntil>Date.now())$('status').textContent='聆聽保留 '+Math.ceil((state.listenUntil-Date.now())/1000)+' 秒';else if(state.playing)$('status').textContent='影片播放中 · 保留完整觀看';else $('status').textContent='點選瀏覽 · '+Math.max(0,60-Math.floor((Date.now()-state.lastAction)/1000))+' 秒後恢復輪播';}
$('auto').onclick=()=>{if(state.auto){manual();if(state.player)state.player.pauseVideo();}else startAuto();};
$('prev').onclick=()=>{manual();step(-1);};$('next').onclick=()=>{manual();step(1);};
$('rotation-kind').onchange=e=>{state.mixed=e.target.value==='mixed';startAuto();};
$('sound').onclick=()=>{state.sound=!state.sound;if(state.player){if(state.sound)state.player.unMute();else state.player.mute();}updateStatus();};
$('fullscreen').onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen();}catch{$('status').textContent='此瀏覽器未提供全螢幕，請使用視窗放大。';}};
$('extend').onclick=()=>{state.listenUntil=Date.now()+(current().seconds+60)*1000;touch();updateStatus();};$('end-listen').onclick=startAuto;
$('close-lightbox').onclick=()=>$('lightbox').close();$('lightbox').addEventListener('close',()=>{touch();state.deadline=Date.now()+state.span;});
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))$('lightbox').close();});
for(const event of ['pointerdown','keydown','touchstart','wheel'])document.addEventListener(event,touch,{passive:true});
document.addEventListener('pointermove',()=>{if(!state.auto)touch();},{passive:true});
document.addEventListener('keydown',e=>{if(['BUTTON','SELECT','INPUT','TEXTAREA'].includes(e.target.tagName)||$('lightbox').open)return;if(e.key==='ArrowRight'){manual();step(1);}if(e.key==='ArrowLeft'){manual();step(-1);}if(e.code==='Space'){e.preventDefault();$('auto').click();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(state.player)state.player.pauseVideo();}else{touch();state.deadline=Date.now()+12000;}});
setInterval(()=>{
 if(document.hidden)return;const now=Date.now();
 if(state.playing&&state.player){try{const pos=state.player.getCurrentTime();if(pos!==state.lastPosition){state.lastPosition=pos;state.lastAdvance=now;}else if(now-state.lastAdvance>25000)fail(state.token,'影片連線暫停，請選擇其他成果或重新開啟作品。');}catch{}}
 if(state.auto&&!$('lightbox').open&&!$('resources-dialog').open&&now>=state.deadline){step(1);}
 else if(!state.auto&&!$('lightbox').open&&!$('resources-dialog').open&&shouldResume({now,lastAction:state.lastAction,playing:state.playing,listenUntil:state.listenUntil}))startAuto();
 $('progress').firstElementChild.style.width=state.auto?Math.max(0,Math.min(100,100*(1-(state.deadline-now)/state.span)))+'%':'0';updateStatus();
},1000);
navs();$('rotation-kind').value=state.mixed?'mixed':'photos';show(state.id);

function startMusicGallery(){
 const photos=items.filter(x=>x.project==='usr'&&x.type==='photo'&&x.eligible);
 if(!photos.length)return;const backdrop=el('div',undefined,'music-gallery'),photo=el('img'),caption=el('span');
 let n=0;function change(){const item=photos[n++%photos.length];photo.src=item.image;photo.alt='';caption.textContent='共創現場｜'+item.title;}
 change();backdrop.append(photo,caption);$('media').prepend(backdrop);state.gallery=setInterval(()=>{if(!document.hidden&&!document.body.classList.contains('reduced-motion')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)change();},10000);
}
let wakeLock=null,exhibitionMode=false;
async function keepAwake(){
 if(!exhibitionMode||document.hidden||wakeLock)return;
 if(!navigator.wakeLock){$('display-state').textContent='展覽模式 · 請保持視窗開啟';return;}
 try{const lock=await navigator.wakeLock.request('screen');if(!exhibitionMode){await lock.release();return;}wakeLock=lock;$('display-state').textContent='展覽模式 · 螢幕保持喚醒';lock.addEventListener('release',()=>{wakeLock=null;$('display-state').textContent=exhibitionMode?'展覽模式 · 螢幕喚醒已釋放':'點選探索 · 閒置60秒回到USR展示';});}catch{$('display-state').textContent='展覽模式 · 裝置未允許保持喚醒';}
}
$('exhibition').onclick=async()=>{
 if(exhibitionMode){exhibitionMode=false;state.sound=false;if(state.player)state.player.mute();await wakeLock?.release();wakeLock=null;$('exhibition').textContent=offline?'開始照片展覽':'開始有聲展覽';$('display-state').textContent='點選探索 · 閒置60秒回到USR展示';updateStatus();return;}
 exhibitionMode=true;state.sound=!offline;state.mixed=!offline;$('rotation-kind').value=state.mixed?'mixed':'photos';$('exhibition').textContent='結束展覽模式';startAuto();keepAwake();
 try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();}catch{}
};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&exhibitionMode)keepAwake();});
$('resources').onclick=()=>{touch();$('resources-dialog').showModal();};
$('close-resources').onclick=()=>$('resources-dialog').close();
$('resources-dialog').addEventListener('close',()=>{touch();state.deadline=Date.now()+state.span;});
$('reduce-motion').onchange=e=>document.body.classList.toggle('reduced-motion',e.target.checked);
if(offline){$('exhibition').textContent='開始照片展覽';$('sound').hidden=true;$('rotation-kind').hidden=true;$('offline-download').hidden=true;$('offline-note').textContent='這份檔案已內含展示照片，可在無網路時使用。影片與音樂請使用線上版。';}
