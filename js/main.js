gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const navLinks = gsap.utils.toArray('.main-nav a');
  const navLinksReverse = gsap.utils.toArray('.main-nav a').reverse();

  navLinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      link.classList.add('animate-out');
      setTimeout(() => {
        link.classList.remove('animate-out');
      }, 300);
    });
  });

  function navAnimation(direction) {
    const scrollDown = direction === 1;
    const links = scrollDown ? navLinks : navLinksReverse;
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollDown ? 0 : 1),
      y: () => (scrollDown ? 20 : 0),
    });
  }

  ScrollTrigger.create({
    start: 100,
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled',
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: true,
  });
}

function initHeader() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
}
function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;

  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientWidth - 0.5;

  const leftImages = gsap.utils.toArray('.hg__left .hg__image');
  const rightImages = gsap.utils.toArray('.hg__right .hg__image');

  const modifier = (index) => index * 1.2 + 0.5;

  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 30 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 30 * modifier(index),
      y: -yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });
  gsap.to('.decor__circle', {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: 'Power4.out',
  });
}

function init() {
  initNavigation();
  initHeader();
}

window.addEventListener('load', function () {
  init();
});
