const translations = {
  en: {
    title: "hi, i'm rickey.",
    subtitle: "i like to create things.",
  },
  zh: {
    title: "嗨, 我是楷翔。",
    subtitle: "我喜歡創作。",
  },
  ja: {
    title: "リッキーです。",
    subtitle: "物を作るのが好き。",
  },
  ko: {
    title: "안녕, 릭키입니다.",
    subtitle: "무언가 만들어내는 걸 좋아해요.",
  },
};

const STORAGE_KEY = "preferredLanguage";

function normalizeLanguage(rawLang) {
  if (!rawLang) return "en";
  const lower = rawLang.toLowerCase();
  if (lower.startsWith("zh")) return "zh";
  if (lower.startsWith("ja")) return "ja";
  if (lower.startsWith("ko")) return "ko";
  return "en";
}

function setLanguage(lang, { persist = true } = {}) {
  const normalized = normalizeLanguage(lang);
  const strings = translations[normalized] ?? translations.en;

  const titleEl = document.getElementById("hero-title");
  const subtitleEl = document.getElementById("hero-subtitle");
  if (titleEl) titleEl.textContent = strings.title;
  if (subtitleEl) subtitleEl.textContent = strings.subtitle;

  document.documentElement.lang = normalized;

  const buttons = document.querySelectorAll("[data-lang]");
  for (const button of buttons) {
    const isActive = button.getAttribute("data-lang") === normalized;
    button.setAttribute("aria-pressed", String(isActive));
  }

  if (persist) localStorage.setItem(STORAGE_KEY, normalized);
}

function initLanguagePicker() {
  const buttons = document.querySelectorAll("[data-lang]");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      setLanguage(lang);
    });
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const preferred = stored || (navigator.languages?.[0] ?? navigator.language);
  setLanguage(preferred, { persist: Boolean(stored) });
}

initLanguagePicker();

// Keep available for debugging in the console.
window.setLanguage = setLanguage;
