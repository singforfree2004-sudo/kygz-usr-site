const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const body = document.body;
const toggle = document.querySelector(".lang-toggle");
const savedLanguage = localStorage.getItem("kygz-language");

function setLanguage(lang) {
  body.dataset.lang = lang;
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  localStorage.setItem("kygz-language", lang);
}

if (savedLanguage === "en" || savedLanguage === "zh") {
  setLanguage(savedLanguage);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    setLanguage(body.dataset.lang === "en" ? "zh" : "en");
  });
}
