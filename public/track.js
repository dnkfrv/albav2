/* Alba: send key visitor actions to Google Analytics via the existing Google tag.
   Event names (mark them as key events in GA4):
   menu_open, directions_click, instagram_click, email_click, menu_pdf_download */
(function () {
  function send(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }
  document.addEventListener(
    "click",
    function (e) {
      var el = e.target && e.target.closest && e.target.closest("a, [data-track]");
      if (!el) return;
      var tracked = el.getAttribute("data-track");
      if (tracked) return send(tracked, { location: location.pathname });
      var href = el.getAttribute("href") || "";
      var where = { location: location.pathname, link_url: href };
      if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps/.test(href)) send("directions_click", where);
      else if (/instagram\.com/.test(href)) send("instagram_click", where);
      else if (/^mailto:/.test(href)) send("email_click", where);
      else if (/\.pdf($|\?)/.test(href)) send("menu_pdf_download", where);
      else if (/^\/(pt\/)?menu\/?$/.test(href)) send("menu_open", where);
    },
    true
  );
})();
