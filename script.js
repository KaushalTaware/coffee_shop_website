var initialPath = `M 0 25 Q 95 25 1100 25`;
var finalPath = `M 0 25 Q 95 25 1100 25`;

let line = document.querySelector("#line");

line.addEventListener("mousemove", function (e) {
  const rect = line.getBoundingClientRect();

 
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

 
  const dynamicPath = `M 0 25 Q ${x} ${y} 1100 25`;

  gsap.to("svg path", {
    attr: { d: dynamicPath },
    duration: 0.25,
    ease: "power3.out",
  });
});

line.addEventListener("mouseout", function () {
  gsap.to("svg path", {
    attr: { d: finalPath },
    duration: 1.2,
    ease: "elastic.out(1, 0.1)",
  });
});



const tl = gsap.timeline();

tl.from("#navleft", {
  y: -100,
  opacity: 0,
  duration: 1,
})
  .from("#navright a,#navright button", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
  })
  .from("#mainleft", {
    y: 100,
    opacity: 0,
    duration: 0.8,
  });

const lazyImages = document.querySelectorAll("img[data-src]");
const options = { threshold: 0.2 };

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    img.onload = () => img.classList.add("loaded");
    obs.unobserve(img);
  });
}, options);

lazyImages.forEach((img) => observer.observe(img));





const scrollEl = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollEl,
  smooth: true,
  multiplier: 1,
  lerp: 0.05,
});

gsap.registerPlugin(ScrollTrigger);
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(scrollEl, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();


gsap.to("#mainright img", {
  rotate: 360,
  duration: 1,
  scrollTrigger: {
    trigger: "#mainright",
    scroller: "[data-scroll-container]",
    start: "bottom 100%",
    end: "bottom 0%",
    scrub: 2,
  },
});

gsap.to("#social section", {
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#social",
    scroller: "[data-scroll-container]",
    start: "top 0%",
    end: "bottom 0%",
    scrub: 4,
  },
});

gsap.from("#grid div", {
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#grid",
    scroller: "[data-scroll-container]",
    start: "top 100%",
    end: "top 75%",
    scrub: 4,
  },
});


Shery.mouseFollower();