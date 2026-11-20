/*
 * Gavel intro: one continuous motion, driven by a single timeline.
 *
 * Artwork, inlined in index.html: the Material Design Icons "gavel" (Apache 2.0)
 * and a pad traced from assets/img/gavel.png. Sources: assets/img/gavel.svg,
 * assets/img/gavel-pad.svg.
 *
 * Plays on the first homepage visit of a browser session (add ?intro to force it);
 * click or Escape skips it. Reduced motion skips it.
 *
 *  1. The camera pushes into the scene while the gavel swings down.
 *  2. The gavel strikes the pad and settles.
 *  3. On the way back up it swings toward the camera and grows until it
 *     fills the screen.
 *  4. Under that fill the TJMUN logo appears, expanding into place as the
 *     fill fades away; then the title, tagline and header settle in.
 *
 * Every property is a pure function of elapsed time, so nothing is chained.
 */
(function () {
  const hero = document.querySelector("[data-gavel-intro]");
  if (!hero) return;

  // Scene geometry, in the 700 x 520 viewBox used by both stage SVGs.
  const VB_W = 700;
  const STRIKE = { x: 350, y: 380 }; // striking face meets the top of the pad
  const PIVOT = { x: 2.6, y: 260 }; // end of the grip
  const HEAD = { x: 350, y: 260 }; // centre of the gavel head at the strike
  const ARM = HEAD.x - PIVOT.x; // the handle runs level through the head centre

  const T = {
    windUpEnd: 420,
    hit: 1150,
    expandStart: 1400, // gavel starts coming up toward the camera
    coverStart: 1880, // gavel is past the camera: the fill takes over
    covered: 2080, // screen is fully filled; the scene behind is reset
    uncoverStart: 2150,
    uncoverEnd: 2850,
    logoStart: 2100,
    logoEnd: 3050,
    nameStart: 2700,
    nameEnd: 3500,
    afterStart: 3100,
    chromeStart: 3300,
    total: 4100,
  };
  const PEAK_ZOOM = 1.45;
  const GAVEL_MAX_SCALE = 20;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const span = (t, a, b) => clamp((t - a) / (b - a));
  const mix = (a, b, p) => a + (b - a) * p;
  const easeInSine = (p) => 1 - Math.cos((p * Math.PI) / 2);
  const easeOutSine = (p) => Math.sin((p * Math.PI) / 2);
  const easeInCubic = (p) => p * p * p;
  const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

  const layers = [...hero.querySelectorAll("[data-camera]")];
  const stages = [...hero.querySelectorAll(".intro-box")];
  const stage = hero.querySelector(".intro-stage");
  const zoomGroup = hero.querySelector(".gavel-zoom");
  const gavel = hero.querySelector(".gavel");
  const pad = hero.querySelector(".gavel-pad");
  const cover = hero.querySelector(".intro-cover");
  const logo = hero.querySelector('[data-intro="logo"]');
  const logoImg = logo.querySelector("img");
  const logoTint = logo.querySelector(".hero-logo-tint");
  const name = hero.querySelector('[data-intro="name"]');
  const after = [...hero.querySelectorAll('[data-intro="after"]')];
  const chrome = [...document.querySelectorAll("[data-intro-chrome]")];
  const root = document.documentElement;

  for (const g of [gavel, zoomGroup]) g.style.transformBox = "view-box";
  gavel.style.transformOrigin = `${PIVOT.x}px ${PIVOT.y}px`;

  let start = null;
  let raf = 0;

  // The camera zooms around the strike point.
  function measure() {
    layers.forEach((l) => (l.style.transform = "none"));
    const h = hero.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const k = s.width / VB_W;
    const x = s.left - h.left + STRIKE.x * k;
    const y = s.top - h.top + STRIKE.y * k;
    layers.forEach((l) => (l.style.transformOrigin = `${x}px ${y}px`));
  }

  // Negative angles raise the head (it sits to the right of the pivot).
  function gavelAngle(t) {
    if (t < T.windUpEnd) return mix(-34, -42, easeOutSine(span(t, 0, T.windUpEnd)));
    if (t < T.hit) return mix(-42, 0, easeInCubic(span(t, T.windUpEnd, T.hit)));
    if (t < T.expandStart) {
      const p = span(t, T.hit, T.expandStart);
      return -3 * Math.sin(p * Math.PI) * (1 - p);
    }
    // a modest lift: the motion now reads as coming toward the camera
    return mix(0, -16, easeOutSine(span(t, T.expandStart, T.covered)));
  }

  function cameraZoom(t) {
    if (t >= T.covered) return 1; // reset while the screen is filled
    let z = 1 + (PEAK_ZOOM - 1) * easeInSine(span(t, 0, T.hit));
    if (t > T.hit) {
      const d = (t - T.hit) / 90;
      z += 0.025 * d * Math.exp(1 - d); // gentle push on impact
    }
    return z + 0.12 * easeInSine(span(t, T.expandStart, T.covered));
  }

  function frame(now) {
    if (start === null) start = now; // clock starts on the first painted frame
    const t = now - start;
    const covered = t >= T.covered;

    const z = cameraZoom(t);
    layers.forEach((l) => (l.style.transform = `scale(${z})`));

    // Gavel: swing, strike, then grow around the centre of its head.
    const a = gavelAngle(t);
    const rad = (a * Math.PI) / 180;
    const hx = PIVOT.x + ARM * Math.cos(rad);
    const hy = PIVOT.y + ARM * Math.sin(rad);
    const g = 1 + (GAVEL_MAX_SCALE - 1) * easeInCubic(span(t, T.expandStart, T.covered));
    gavel.style.transform = `rotate(${a}deg)`;
    zoomGroup.style.transformOrigin = `${hx}px ${hy}px`;
    zoomGroup.style.transform = `scale(${g})`;
    gavel.style.opacity = covered ? 0 : span(t, 0, 300);
    pad.style.opacity = covered ? 0 : span(t, 0, 300);

    // The fill: rises as the gavel passes the camera, falls to reveal the logo.
    const fill = covered
      ? 1 - easeInOutCubic(span(t, T.uncoverStart, T.uncoverEnd))
      : easeInCubic(span(t, T.coverStart, T.covered));
    cover.style.opacity = fill;
    logoTint.style.opacity = covered ? fill : 0; // blue on the fill, white once it's gone

    // Logo: appears as it expands into place under the fading fill.
    const l = easeOutCubic(span(t, T.logoStart, T.logoEnd));
    logo.style.opacity = easeOutCubic(span(t, T.logoStart, T.logoStart + 450));
    logo.style.transform = `scale(${mix(0.3, 1, l)})`;

    const n = easeOutCubic(span(t, T.nameStart, T.nameEnd));
    name.style.opacity = n;
    name.style.transform = `translateY(${mix(14, 0, n)}px) scale(${mix(0.96, 1, n)})`;

    after.forEach((el, i) => {
      const p = easeOutCubic(span(t, T.afterStart + i * 140, T.afterStart + i * 140 + 750));
      el.style.opacity = p;
      el.style.transform = `translateY(${mix(16, 0, p)}px)`;
    });

    const c = easeOutCubic(span(t, T.chromeStart, T.chromeStart + 700));
    chrome.forEach((el) => (el.style.opacity = c));

    if (t < T.total) raf = requestAnimationFrame(frame);
    else finish();
  }

  function finish() {
    cancelAnimationFrame(raf);
    layers.forEach((l) => (l.style.transform = ""));
    [logo, name, ...after, ...chrome].forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
    });
    stages.forEach((s) => (s.hidden = true));
    cover.hidden = true;
    logoTint.style.opacity = "";
    root.classList.remove("intro-running");
  }

  function play() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
    cancelAnimationFrame(raf);
    root.classList.add("intro-running");
    stages.forEach((s) => (s.hidden = false));
    cover.hidden = false;
    measure();

    // Review hook: ?intro-at=1200 freezes the intro at 1200 ms.
    const freeze = Number(new URLSearchParams(location.search).get("intro-at"));
    if (freeze) {
      start = performance.now() - freeze;
      frame(performance.now());
      cancelAnimationFrame(raf);
      return;
    }

    start = null;
    raf = requestAnimationFrame(frame);
  }

  const running = () => root.classList.contains("intro-running");
  hero.addEventListener("click", () => running() && finish());
  window.addEventListener("keydown", (e) => e.key === "Escape" && running() && finish());
  window.addEventListener("resize", () => {
    if (new URLSearchParams(location.search).has("intro-at")) return play();
    if (running()) finish();
  });

  // Start once the logo and fonts are ready. Don't wait for window "load":
  // the background video can hold that up for a long time.
  let started = false;
  const begin = () => {
    if (started) return;
    started = true;
    play();
  };

  // Already visited this session: go straight to the hero.
  const params = new URLSearchParams(location.search);
  let seen = false;
  try {
    seen = sessionStorage.getItem("tjmun-intro-seen") === "1";
    sessionStorage.setItem("tjmun-intro-seen", "1");
  } catch (e) {}
  if (seen && !params.has("intro") && !params.has("intro-at")) {
    started = true;
    finish();
    return;
  }

  Promise.all([
    logoImg.decode().catch(() => {}),
    document.fonts ? document.fonts.ready : null,
  ]).then(begin);
  setTimeout(begin, 1500);
})();
