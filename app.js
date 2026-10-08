// Viewer, thumbnails, index and info. Routes live in the URL hash so it works on GitHub Pages.
// #/                 first photo
// #/alpha-2026-03    photo 3 of "alpha" (numbered address per photo)
// #/thumbs  #/index  #/info
(function () {
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");

  const photos = [];
  SITE.works.forEach((w) => {
    for (let i = 1; i <= w.count; i++) {
      photos.push({ work: w, n: i, id: `${w.slug}-${w.year}-${pad(i)}`, file: `${w.slug}-${pad(i)}.jpg` });
    }
  });
  const indexOfId = (id) => photos.findIndex((p) => p.id === id);

  let current = 0;

  document.title = SITE.name;
  $("name").textContent = SITE.name;
  $("role").textContent = SITE.role;

  function setBar(items) {
    const bar = $("bar");
    bar.textContent = "";
    items.forEach((it, i) => {
      if (i) bar.append(document.createTextNode("—"));
      const el = document.createElement(it.href ? "a" : "span");
      el.textContent = it.label;
      if (it.href) el.href = it.href;
      if (it.on) el.className = "on";
      bar.append(el);
    });
  }

  function hideAll() {
    ["thumbs", "info"].forEach((id) => ($(id).hidden = true));
    document.body.classList.remove("thumbs", "index");
  }

  function showViewer(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    hideAll();
    $("viewer").hidden = false;
    $("viewer").querySelectorAll("button").forEach((b) => (b.hidden = false));
    $("photo").src = `img/${p.file}`;
    $("photo").alt = `${p.work.title} ${p.n}`;
    $("caption").textContent = SITE.captions[`${p.work.slug}-${pad(p.n)}`] || "";
    $("counter").textContent = `${p.work.title} ${pad(p.n)}/${pad(p.work.count)}`;
    setBar([{ label: "Index", href: "#/index" }, { label: "Thumbs", href: "#/thumbs" }]);
    preload(current + 1);
  }

  function preload(i) {
    const p = photos[(i + photos.length) % photos.length];
    new Image().src = `img/${p.file}`;
  }

  function showThumbs() {
    hideAll();
    document.body.classList.add("thumbs");
    $("viewer").hidden = false;
    $("photo").src = `img/${photos[current].file}`;
    const box = $("thumbs");
    box.textContent = "";
    photos.forEach((p, i) => {
      const a = document.createElement("a");
      a.href = `#/${p.id}`;
      const img = document.createElement("img");
      img.src = `img/thumb/${p.file}`;
      img.alt = `${p.work.title} ${p.n}`;
      img.loading = "lazy";
      a.append(img);
      box.append(a);
    });
    box.hidden = false;
    $("counter").textContent = "";
    $("viewer").querySelectorAll("button").forEach((b) => (b.hidden = true));
    setBar([{ label: "Thumbs", on: true }, { label: "Close", href: `#/${photos[current].id}` }]);
  }

  function showIndex() {
    hideAll();
    document.body.classList.add("index");
    $("viewer").hidden = false;
    $("photo").src = `img/${photos[current].file}`;
    const box = $("index");
    box.textContent = "";
    SITE.works.forEach((w) => {
      const a = document.createElement("a");
      a.className = "row" + (w === photos[current].work ? " on" : "");
      a.href = `#/${w.slug}-${w.year}-01`;
      [w.title, String(w.year), String(w.count)].forEach((t) => {
        const s = document.createElement("span");
        s.textContent = t;
        a.append(s);
      });
      box.append(a);
    });
    $("counter").textContent = `${photos[current].work.title} ${pad(photos[current].n)}/${pad(photos[current].work.count)}`;
    setBar([{ label: "Index", on: true }, { label: "Thumbs", href: "#/thumbs" }, { label: "Close", href: `#/${photos[current].id}` }]);
  }

  function showInfo() {
    hideAll();
    $("viewer").hidden = true;
    const box = $("info");
    box.textContent = "";
    const col = document.createElement("div");
    col.className = "col";
    SITE.info.forEach((t) => {
      const p = document.createElement("p");
      p.textContent = t;
      col.append(p);
    });
    SITE.sections.forEach((s) => {
      const h = document.createElement("h2");
      h.textContent = s.title;
      col.append(h);
      const p = document.createElement("p");
      s.lines.forEach((l, i) => {
        if (i) p.append(document.createElement("br"));
        p.append(document.createTextNode(l));
      });
      col.append(p);
    });
    const ig = document.createElement("p");
    const a = document.createElement("a");
    a.href = SITE.instagram;
    a.textContent = "Instagram";
    a.target = "_blank";
    a.rel = "noopener";
    ig.append(a);
    col.append(ig);
    box.append(col);
    box.hidden = false;
    $("counter").textContent = "";
    setBar([{ label: "Info", on: true }, { label: "Close", href: `#/${photos[current].id}` }]);
  }

  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    if (h === "thumbs") return showThumbs();
    if (h === "index") return showIndex();
    if (h === "info") return showInfo();
    const i = indexOfId(h);
    showViewer(i >= 0 ? i : 0);
  }

  const go = (i) => { location.hash = `#/${photos[(i + photos.length) % photos.length].id}`; };
  $("next").addEventListener("click", () => go(current + 1));
  $("prev").addEventListener("click", () => go(current - 1));
  document.addEventListener("keydown", (e) => {
    const open = document.body.classList.contains("thumbs") || document.body.classList.contains("index") || !$("info").hidden;
    if (e.key === "Escape") { if (open) location.hash = `#/${photos[current].id}`; return; }
    if (open) return;
    if (e.key === "ArrowRight") go(current + 1);
    if (e.key === "ArrowLeft") go(current - 1);
  });
  let x0 = null;
  document.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (x0 === null || document.body.className || !$("info").hidden) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener("hashchange", route);
  route();
})();
