// index.js

// Scroll-triggered animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  const scrollElements = document.querySelectorAll('.scroll-element');

  const observerOptions = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => observer.observe(el));

  // 3D Droplet Particle Background
  const canvas = document.createElement('canvas');
  canvas.className = 'particles';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize(){
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Droplet {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 1 + Math.random() * 3;
      this.speedY = 0.2 + Math.random() * 0.7;
      this.alpha = 0.2 + Math.random() * 0.3;
    }

    update() {
      this.y += this.speedY;
      if (this.y > height + this.radius) {
        this.x = Math.random() * width;
        this.y = -this.radius;
      }
    }

    draw(ctx) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, `rgba(162, 89, 255, ${this.alpha})`);
      gradient.addColorStop(1, 'rgba(162, 89, 255, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const droplets = [];
  const DROPLET_COUNT = 120;

  for (let i = 0; i < DROPLET_COUNT; i++) {
    droplets.push(new Droplet());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    droplets.forEach(droplet => {
      droplet.update();
      droplet.draw(ctx);
    });
    requestAnimationFrame(animate);
  }
  animate();
});

// Header shrink on scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (window.scrollY > 60) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// Toggle mobile menu
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('main-nav');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const profilePhoto = document.getElementById("profilePhoto");
  const popup = document.getElementById("popupMessage");

  profilePhoto.addEventListener("click", () => {
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 5000); // 5 seconds
  });
});
