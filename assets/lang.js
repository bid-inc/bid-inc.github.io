// ページの言語を決める：?lang= → 前に選んだ言語 → ブラウザの言語（日本語以外は英語）
(function () {
  var key = "bid.lang";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function remember(lang) {
    try { localStorage.setItem(key, lang); } catch (e) {}
  }

  function initial() {
    var query = new URLSearchParams(location.search).get("lang");
    if (query === "ja" || query === "en") return query;
    var stored = saved();
    if (stored === "ja" || stored === "en") return stored;
    return (navigator.language || "").toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    document.querySelectorAll(".lang button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.set === lang));
    });
  }

  apply(initial());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));
    document.querySelectorAll(".lang button").forEach(function (button) {
      button.addEventListener("click", function () {
        remember(button.dataset.set);
        apply(button.dataset.set);
      });
    });
  });
})();
