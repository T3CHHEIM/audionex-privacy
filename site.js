// AUDIONEX – Sprachumschaltung für alle Seiten.
// Kurze Texte stehen als data-de / data-en direkt am Element,
// lange Absätze als Block mit data-lang-block="de" bzw. "en".
(function () {
  var KEY = "audionex-lang";

  function buttons() {
    return Array.prototype.slice.call(document.querySelectorAll(".lang button"));
  }

  function apply(lang) {
    if (lang !== "de" && lang !== "en") lang = "de";

    document.documentElement.lang = lang;

    var title = document.documentElement.getAttribute("data-title-" + lang);
    if (title) document.title = title;

    document.querySelectorAll("[data-de]").forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value !== null) el.innerHTML = value;
    });

    document.querySelectorAll("[data-lang-block]").forEach(function (el) {
      el.style.display = el.getAttribute("data-lang-block") === lang ? "" : "none";
    });

    buttons().forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  // Auf schmalen Displays scrollt die Reiter-Leiste: den aktiven Reiter mittig zeigen.
  function centerActiveTab() {
    var current = document.querySelector('.nav a[aria-current="page"]');
    if (!current || !current.parentElement) return;
    var nav = current.parentElement;
    if (nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollLeft = Math.max(0, current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2);
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var device = (navigator.language || "de").toLowerCase();
  apply(stored || (device.indexOf("de") === 0 ? "de" : "en"));
  centerActiveTab();

  buttons().forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
  });
})();
