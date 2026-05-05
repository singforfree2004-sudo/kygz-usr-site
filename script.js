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
      zh: "從香科、廟埕與地方記憶出發，讓學生理解西港文化不是靜態資產，而是可以被重新詮釋與共同創作的生活場域。",
      en: "Temple rituals, public space, and local memory help students understand Sigang culture as a living field that can be reinterpreted and co-created."
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
      zh: "老屋、食農教育與地方產業成為學生進入西港的入口，讓胡麻、故事館與社區空間被整理成可學習、可創作的地方平台。",
      en: "The old house, food education, and local industry become entry points for students to connect sesame culture, local stories, and community space."
    },
    chips: {
      zh: ["食農教育", "地方平台", "老屋再使用"],
      en: ["Food education", "Local platform", "Adaptive reuse"]
    }
  },
  children: {
    tag: "Learning Participation",
    image: "assets/media/children-music-camp.webp",
    link: "#outcomes",
    title: {
      zh: "小朋友音樂營隊",
      en: "Children's Music Camp"
    },
    body: {
      zh: "小朋友不是只聽大人說地方故事，而是透過唱歌、節奏、歌詞與演出，把西港記憶變成自己可以參與的文化經驗。",
      en: "Children do not only hear local stories from adults; through singing, rhythm, lyrics, and performance, they turn Sigang memory into lived participation."
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
      zh: "居民的聲音被錄下、剪輯、上架，地方記憶不再只停留在私人聊天，而變成可被聽見、保存與再使用的公共內容。",
      en: "Residents' voices are recorded, edited, and published so local memory can move from private conversation into public, reusable cultural content."
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
      zh: "學生、居民與專業團隊把田野故事轉成音樂劇與公開展演，讓文化成果從資料與訪談走向舞台，也走回社區。",
      en: "Students, residents, and professional teams transform field stories into musical theatre and public showcases, bringing cultural work onto the stage and back to the community."
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
      zh: "西港經驗被整理成可以交流的高教共創模式，連結地方場域、學生學習與亞太夥伴，讓社會共融不只停留在單一地方案例。",
      en: "The Sigang experience is being organized as an exchangeable higher education co-creation model that connects local practice, student learning, and Asia-Pacific partners."
    },
    chips: {
      zh: ["國際合作", "高教共創", "模式延伸"],
      en: ["International", "Higher education", "Model scaling"]
    }
  }
};

let currentStory = "temple";

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
