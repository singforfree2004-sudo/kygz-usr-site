const storyMapData = {
  temple: {
    tag: "Local Heritage",
    image: "assets/media/sigang-qingan-temple.webp",
    link: "#why",
    title: {
      zh: "西港慶安宮",
      en: "Sigang Qing'an Temple"
    },
    body: {
      zh: "香科、廟埕與地方記憶，是西港最先開口的地方。學生從這裡學會：文化不是遠遠觀看的風景，而是可以一起靠近、一起理解、一起創作的生活。",
      en: "Temple rituals, public space, and local memory are where Sigang first begins to speak. Students learn that culture is not a distant view, but a life that can be approached and co-created."
    },
    chips: {
      zh: ["香科文化", "地方踏查", "文化轉譯"],
      en: ["Ritual culture", "Fieldwork", "Cultural translation"]
    }
  },
  baicheng: {
    tag: "Local Platform",
    image: "assets/media/baicheng-old-house.webp",
    link: "#method",
    title: {
      zh: "白埕物所",
      en: "Baicheng Wu-Suo"
    },
    body: {
      zh: "一棟老屋、一把胡麻、一場餐桌旁的談話，都可能是認識西港的入口。白埕物所讓地方產業、食農教育與社區生活有了可以停留、學習、再出發的空間。",
      en: "An old house, a handful of sesame, and a conversation by the table can all become entry points into Sigang. Baicheng Wu-Suo gives food education, local industry, and community life a place to gather and begin again."
    },
    chips: {
      zh: ["食農教育", "地方平台", "老屋再使用"],
      en: ["Food education", "Local platform", "Adaptive reuse"]
    }
  },
  children: {
    tag: "Learning Participation",
    image: "assets/media/houying-classroom-activity-2025.webp",
    link: "#outcomes",
    title: {
      zh: "小朋友音樂營隊",
      en: "Children's Music Camp"
    },
    body: {
      zh: "孩子們不只是聽大人講西港。他們跟著節奏拍手、把歌詞唱出口，也把家鄉記憶變成自己可以感受的聲音。",
      en: "Children do not only listen to adults speak about Sigang. They clap with the rhythm, sing the lyrics aloud, and let local memory become a sound inside their own bodies."
    },
    chips: {
      zh: ["兒童參與", "音樂教育", "文化傳承"],
      en: ["Children", "Music education", "Cultural continuity"]
    }
  },
  podcast: {
    tag: "Resident Voices",
    image: "assets/media/sigang-mothers-podcast.webp",
    link: "https://xigang-podcast.firstory.io/",
    title: {
      zh: "西港媽媽 Podcast",
      en: "Sigang Mothers Podcast"
    },
    body: {
      zh: "麥克風打開的時候，平常在市場、廚房與路口說著的故事，也有了被好好聽見的位置。Podcast 讓媽媽們的聲音，成為可以反覆回來聽的地方記憶。",
      en: "When the microphone opens, stories usually told in markets, kitchens, and street corners are given a place to be heard with care. The podcast lets mothers' voices become local memory we can return to."
    },
    chips: {
      zh: ["Podcast", "居民聲音", "數位保存"],
      en: ["Podcast", "Resident voices", "Digital preservation"]
    }
  },
  musical: {
    tag: "Public Performance",
    image: "assets/media/musical-training-performance.webp",
    link: "#media",
    title: {
      zh: "西港音樂劇",
      en: "Sigang Musical Theatre"
    },
    body: {
      zh: "田野裡聽見的故事，經過排練、歌唱、走位與一次次修正，最後在舞台上被看見。音樂劇讓學生與居民不是彼此的觀眾，而是同一個作品裡的人。",
      en: "Stories heard in the field pass through rehearsal, singing, movement, and revision before lighting up on stage. Musical theatre lets students and residents become people inside the same work, not audiences for one another."
    },
    chips: {
      zh: ["音樂劇", "居民共創", "公共展演"],
      en: ["Musical theatre", "Resident co-creation", "Public showcase"]
    }
  },
  singapore: {
    tag: "Asia-Pacific Link",
    image: "assets/media/singapore-vlog-2026.jpg",
    link: "#international",
    title: {
      zh: "從西港到新加坡",
      en: "From Sigang to Singapore"
    },
    body: {
      zh: "當西港的經驗被帶到新加坡，它不只是一次成果展示，也是一種交流：讓不同地方的學校與夥伴，一起思考高等教育如何陪地方累積自己的聲音。",
      en: "When the Sigang experience travels to Singapore, it is more than a showcase. It becomes an invitation for schools and partners in different places to imagine how higher education can help local communities grow their own voices."
    },
    chips: {
      zh: ["國際合作", "高教共創", "模式延伸"],
      en: ["International", "Higher education", "Model scaling"]
    }
  }
};

const body = document.body;
body.classList.add('js');
const toggle = document.querySelector('.lang-toggle');
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-navigation');
let currentStory = 'temple';
let currentLanguage = 'zh';
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const localizedElements = Array.from(document.querySelectorAll('[data-alt-en], [data-title-en]'));
localizedElements.forEach(el => {
  if (el.hasAttribute('alt')) el.dataset.altZh = el.getAttribute('alt');
  if (el.hasAttribute('title')) el.dataset.titleZh = el.getAttribute('title');
});
function renderStoryMap(id) {
  const story = storyMapData[id];
  const image = document.getElementById('story-map-image');
  if (!story || !image) return;
  currentStory = id;
  const lang = currentLanguage;
  const tagNames = {temple:['地方文化','Local heritage'],baicheng:['地方平台','Local platform'],children:['參與學習','Learning together'],podcast:['居民聲音','Resident voices'],musical:['公共展演','Public performance'],singapore:['亞太交流','Asia-Pacific exchange']};
  image.src = story.image;
  image.alt = story.title[lang];
  document.getElementById('story-map-tag').textContent = tagNames[id][lang === 'en' ? 1 : 0];
  document.getElementById('story-map-title').textContent = story.title[lang];
  document.getElementById('story-map-body').textContent = story.body[lang];
  const chips = document.getElementById('story-map-chips');
  chips.replaceChildren(...story.chips[lang].map(label => {const span = document.createElement('span'); span.textContent = label; return span;}));
  const link = document.getElementById('story-map-link');
  link.href = story.link;
  if (story.link.startsWith('http')) {link.target = '_blank'; link.rel = 'noopener noreferrer';}
  else {link.removeAttribute('target');link.removeAttribute('rel');}
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.classList.toggle('active',pin.dataset.story === id);
    pin.setAttribute('aria-pressed',String(pin.dataset.story === id));
  });
}
function setLanguage(lang) {
  currentLanguage = lang === 'en' ? 'en' : 'zh';
  body.dataset.lang = currentLanguage;
  document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'zh-Hant-TW';
  try {localStorage.setItem('kygz-language',currentLanguage);} catch (_) { /* Language works even when storage is disabled. */ }
  if (toggle) toggle.setAttribute('aria-label',currentLanguage === 'en' ? '切換為繁體中文' : 'Switch to English');
  if (navigation) navigation.setAttribute('aria-label',currentLanguage === 'en' ? 'Main navigation' : '主要導覽');
  localizedElements.forEach(el => {
    if (el.hasAttribute('alt')) el.alt = currentLanguage === 'en' ? el.dataset.altEn : el.dataset.altZh;
    if (el.hasAttribute('title')) el.title = currentLanguage === 'en' ? el.dataset.titleEn : el.dataset.titleZh;
  });
  document.querySelectorAll('[data-video]').forEach(el => {
    el.setAttribute('aria-label',(currentLanguage === 'en' ? 'Play: ' : '播放：') + (currentLanguage === 'en' ? el.dataset.titleEn : el.dataset.titleZh));
  });
  document.querySelectorAll('[data-label-en]').forEach(el => {
    if (!el.dataset.labelZh) el.dataset.labelZh = el.getAttribute('aria-label');
    el.setAttribute('aria-label',currentLanguage === 'en' ? el.dataset.labelEn : el.dataset.labelZh);
  });
  const esg = body.classList.contains('esg-page');
  document.title = currentLanguage === 'en' ? (esg ? 'ESG Partnerships | Inclusive Harmony in Sigang' : 'Inclusive Harmony in Sigang | Local Stories, Shared with the World') : (esg ? 'ESG 合作｜跨樂尬陣' : '跨樂尬陣｜讓西港的故事，被世界聽見');
  renderStoryMap(currentStory);
}
let savedLanguage;
try { savedLanguage = localStorage.getItem('kygz-language'); } catch (_) {}
setLanguage(savedLanguage === 'en' ? 'en' : 'zh');
if (toggle) toggle.addEventListener('click',() => setLanguage(currentLanguage === 'en' ? 'zh' : 'en'));
document.querySelectorAll('.map-pin').forEach(pin => pin.addEventListener('click',() => renderStoryMap(pin.dataset.story)));
function closeMenu(restoreFocus = false) {
  if (!menu || !navigation) return;
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded','false');
  if (restoreFocus) menu.focus();
}
if (menu && navigation) {
  menu.addEventListener('click',() => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded',String(open));
    navigation.classList.toggle('is-open',open);
  });
  navigation.querySelectorAll('a').forEach(a => a.addEventListener('click',() => closeMenu()));
  document.addEventListener('keydown',event => {if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);});
}
function revealHashTarget() {
  if (!location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) {return;}
  const target = document.getElementById(id);
  if (!target) return;
  const parent = target.closest('details');
  if (parent && !parent.open) {parent.open = true; target.scrollIntoView();}
}
window.addEventListener('hashchange',revealHashTarget);
revealHashTarget();
