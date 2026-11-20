/*
 * Homepage: section transitions and components.
 *
 *  - Stats use NumberFlow 0.6.2 (vendored in assets/vendor, MIT), the pick-ui-library
 *    default for animated numbers. It respects prefers-reduced-motion by default.
 *  - Headings rise in word by word; key words get a hand-drawn underline.
 *  - About pillars highlight one at a time as they pass the middle of the screen.
 */
import "/assets/vendor/number-flow@0.6.2/index.mjs";

const root = document.documentElement;
root.classList.add("sx-ready");

/* ---------- Headings: split into words ---------- */
document.querySelectorAll("[data-words]").forEach((heading) => {
  let i = 0;
  const wrap = (node) => {
    const w = document.createElement("span");
    w.className = "w";
    w.style.setProperty("--i", i++);
    return w;
  };
  [...heading.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(" ");
        const w = wrap();
        w.textContent = part;
        frag.append(w);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const w = wrap();
      node.replaceWith(w);
      w.append(node);
    }
  });
});

// Scribble paths draw from 0 to 1 regardless of their real length.
document.querySelectorAll(".scribble path").forEach((p) => p.setAttribute("pathLength", "1"));

/* ---------- Reveal once on entering the viewport ---------- */
const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      revealer.unobserve(e.target);
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
);
document.querySelectorAll("[data-reveal], [data-words]").forEach((el) => revealer.observe(el));

/* ---------- Stats: NumberFlow rolls up when the band is in view ---------- */
customElements.whenDefined("number-flow").then(() => {
  const flows = [...document.querySelectorAll("number-flow[data-count]")];
  flows.forEach((flow) => {
    if (flow.dataset.suffix) flow.numberSuffix = flow.dataset.suffix;
    flow.spinTiming = { duration: 1400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" };
    flow.update(0);
  });
  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.update(Number(e.target.dataset.count));
        counter.unobserve(e.target);
      });
    },
    { threshold: 0.6 }
  );
  flows.forEach((flow) => counter.observe(flow));
});

/* ---------- About: one pillar active at a time ---------- */
const list = document.querySelector(".pillar-list");
if (list) {
  const pillars = [...list.querySelectorAll(".pillar")];
  const activate = (el) => {
    pillars.forEach((p) => p.classList.toggle("is-active", p === el));
    list.classList.add("has-active");
  };
  const middle = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && activate(e.target)),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  pillars.forEach((p) => middle.observe(p));
  // Clear the highlight once the whole list has scrolled away.
  new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) return;
      list.classList.remove("has-active");
      pillars.forEach((p) => p.classList.remove("is-active"));
    });
  }).observe(list);
}
