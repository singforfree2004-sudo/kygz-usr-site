const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const body = document.body;
const toggle = document.querySelector(".lang-toggle");
const savedLanguage = localStorage.getItem("kygz-language");
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
      zh: "香科、廟埕與地方記憶，是西港最先開口的地方。學生從這裡學會：文化不是遠遠觀看的風景，而是可以一起靠近、一起創作的生活。",
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
      zh: "一棟老屋、一把胡麻、一場餐桌旁的談話，都可能是認識西港的入口。白埕物所讓地方產業、食農教育與社區生活有了可以停留、學習、再出發的地方。",
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
      zh: "孩子們不只是聽大人講西港。他們跟著節奏拍手、把歌詞唱出口，也把家鄉記憶變成自己身體裡的聲音。",
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
      zh: "田野裡聽見的故事，經過排練、歌唱、走位與一次次修正，最後在舞台上亮起來。音樂劇讓學生與居民不是彼此的觀眾，而是同一個作品裡的人。",
      en: "Stories heard in the field pass through rehearsal, singing, movement, and revision before lighting up on stage. Musical theatre lets students and residents become people inside the same work, not audiences for one another."
    },
    chips: {
      zh: ["音樂劇", "居民共創", "公共展演"],
      en: ["Musical theatre", "Resident co-creation", "Public showcase"]
    }
  },
  singapore: {
    tag: "Asia-Pacific Link",
    image: "assets/media/singapore-xiaodujia.webp",
    link: "#contact",
    title: {
      zh: "從西港到新加坡",
      en: "From Sigang to Singapore"
    },
    body: {
      zh: "當西港的經驗被帶到新加坡，它不只是一次成果展示，而是一種邀請：邀請不同地方的學校與夥伴，一起想像高等教育如何陪地方長出自己的聲音。",
      en: "When the Sigang experience travels to Singapore, it is more than a showcase. It becomes an invitation for schools and partners in different places to imagine how higher education can help local communities grow their own voices."
    },
    chips: {
      zh: ["國際合作", "高教共創", "模式延伸"],
      en: ["International", "Higher education", "Model scaling"]
    }
  }
};
const pathwayData = {
  invest: {
    label: "ESG / CSR 預算",
    title: "從年度永續預算開始，選擇一個有故事的投入方向",
    body: "企業可以依預算、品牌目標與參與深度，支持地方共創、青年創作、文化內容製作或員工參與行動，讓投入一開始就連結明確的社會價值。",
    points: [
      "可規劃合作主題與年度期程",
      "可對應 ESG、CSR、員工參與或品牌公益需求",
      "一開始就想清楚最後要留下什麼"
    ]
  },
  field: {
    label: "Local Co-Creation",
    title: "把資源帶進西港，讓居民、學校與地方夥伴一起成為作者",
    body: "合作會落在真實場域中進行：訪談、走讀、工作坊、節慶、宮廟文化、地方產業與生活記憶，都能轉化為創作素材與公共參與。",
    points: [
      "建立企業與地方之間的真實連結",
      "讓文化保存不只停留在文字資料",
      "形成可被記錄的共創過程"
    ]
  },
  youth: {
    label: "Youth Practice",
    title: "讓學生在真實任務中完成創作、紀錄、企劃與展演",
    body: "流行音樂產業系學生不是旁觀者，而是在場域中學習如何聽見地方、整理故事、完成作品，並把創作帶回社區與公開舞台。",
    points: [
      "支持青年跨域實作與作品產出",
      "讓教育成果和地方需求接在一起",
      "累積企業可支持的人才培力案例"
    ]
  },
  brand: {
    label: "Brand Impact",
    title: "讓企業的支持，被地方記住，也被更多人看見",
    body: "合作結束後，留下的不只是活動照片，而是一段有場域、有參與者、有作品的故事。企業可以把這段故事帶回組織內部，也可以對外說明：這筆投入如何陪伴青年、地方與文化一起往前走。",
    points: [
      "留下真實可感的合作故事",
      "讓品牌溝通有畫面，也有溫度",
      "把一次支持延伸成長期關係"
    ]
  }
};

let currentStory = "temple";
let currentPathway = "invest";

function setLanguage(lang) {
  body.dataset.lang = lang;
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  localStorage.setItem("kygz-language", lang);
  renderStoryMap(currentStory);
}

function renderStoryMap(id) {
  const story = storyMapData[id];
  const image = document.getElementById("story-map-image");
  const tag = document.getElementById("story-map-tag");
  const title = document.getElementById("story-map-title");
  const bodyText = document.getElementById("story-map-body");
  const chips = document.getElementById("story-map-chips");
  const link = document.getElementById("story-map-link");
  if (!story || !image || !tag || !title || !bodyText || !chips || !link) return;

  const lang = body.dataset.lang === "en" ? "en" : "zh";
  currentStory = id;
  image.src = story.image;
  tag.textContent = story.tag;
  title.textContent = story.title[lang];
  bodyText.textContent = story.body[lang];
  chips.innerHTML = story.chips[lang].map((chip) => `<span>${chip}</span>`).join("");
  link.href = story.link;
  link.target = story.link.startsWith("http") ? "_blank" : "";
  link.rel = story.link.startsWith("http") ? "noreferrer" : "";

  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.classList.toggle("active", pin.dataset.story === id);
  });
}

if (savedLanguage === "en" || savedLanguage === "zh") {
  setLanguage(savedLanguage);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    setLanguage(body.dataset.lang === "en" ? "zh" : "en");
  });
}

document.querySelectorAll(".map-pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    renderStoryMap(pin.dataset.story);
  });
});

renderStoryMap(currentStory);

function renderPathway(id) {
  const pathway = pathwayData[id];
  const label = document.getElementById("pathway-label");
  const title = document.getElementById("pathway-title-dynamic");
  const bodyText = document.getElementById("pathway-body");
  const points = document.getElementById("pathway-points");
  const panel = document.getElementById("pathway-panel");
  if (!pathway || !label || !title || !bodyText || !points || !panel) return;

  currentPathway = id;
  panel.classList.add("changing");
  window.setTimeout(() => {
    label.textContent = pathway.label;
    title.textContent = pathway.title;
    bodyText.textContent = pathway.body;
    points.innerHTML = pathway.points.map((point) => `<li>${point}</li>`).join("");
    panel.classList.remove("changing");
  }, 120);

  document.querySelectorAll(".pathway-node").forEach((node) => {
    const active = node.dataset.pathway === id;
    node.classList.toggle("active", active);
    node.setAttribute("aria-selected", active ? "true" : "false");
  });
}

document.querySelectorAll(".pathway-node").forEach((node) => {
  node.addEventListener("click", () => {
    renderPathway(node.dataset.pathway);
  });
});

renderPathway(currentPathway);
