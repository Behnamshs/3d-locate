const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {
  let isDown = false;
  let startX;
  let scrollLeft;

  // کشیدن با موس
  slider.addEventListener('mousedown', (e) => {
    // جلوگیری از درگ روی لینک یا دکمه
    if (e.target.closest('a') || e.target.closest('button')) return;

    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  // بعد از لود → بره آخر
  window.addEventListener('load', () => {
    slider.scrollLeft = slider.scrollWidth - slider.clientWidth;
  });
});

// Sidebar toggle
const btn3 = document.querySelector('.btn3');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn')
// باز شدن منو
btn3.addEventListener('click', () => {
  sidebar.style.display = 'block';
  setTimeout(() => {
    sidebar.classList.add('open');
    document.body.classList.add('body-locked') // قفل اسکرول صفحه اصلی
  }, 10);
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebar.addEventListener('transitionend', () => {
    if (!sidebar.classList.contains('open')) {
      sidebar.style.display = 'none';
      document.body.classList.remove('body-locked') // آزاد شدن اسکرول صفحه اصلی
    }
  }, { once: true });
});
//dark mode&lightmode
const btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

 const menu = document.getElementById("menu");
  const btn = document.getElementById("menuBtn");

  btn.addEventListener("click", () => {
    menu.classList.toggle("open");
    btn.textContent = menu.classList.contains("open") ? "✕" : "≡";
  });
window.addEventListener('load', () => {
  const headline = document.querySelector('.headline');
  const info = document.querySelector('.info');
  const searchBox = document.querySelector('.headline input');

  // فعال کردن بلور بک‌گراند
  headline.classList.add('blur');

  // نمایش متن و عکس ۳۶۰
  setTimeout(() => {
    info.classList.add('show');
  }, 500);

  // سرچ باکس از پایین بیاد
  setTimeout(() => {
    searchBox.parentElement.classList.add('show');
  }, 800);
});
// accordion
const accordions = document.querySelectorAll('.accordion-title');
accordions.forEach(title => {
  title.addEventListener('click', () => {
    const parent = title.parentElement;
    parent.classList.toggle('active');
  });
});
const statusScroll = document.querySelector('.status-scroll');
let isDown2 = false;
let startX2;
let scrollLeft2;

statusScroll.addEventListener('mousedown', e => {
  isDown2 = true;
  startX2 = e.pageX - statusScroll.offsetLeft;
  scrollLeft2 = statusScroll.scrollLeft;
});

statusScroll.addEventListener('mouseleave', () => isDown2 = false);
statusScroll.addEventListener('mouseup', () => isDown2 = false);

statusScroll.addEventListener('mousemove', e => {
  if(!isDown2) return;
  e.preventDefault();
  const x = e.pageX - statusScroll.offsetLeft;
  const walk = (x - startX2) * 1.5;
  statusScroll.scrollLeft = scrollLeft2 - walk;
});
window.addEventListener('load', () => {
  const statusScroll = document.querySelector('.status-scroll');
  statusScroll.scrollTo({
    left: statusScroll.scrollWidth - statusScroll.clientWidth,
    behavior: 'smooth'
  });
});
(function(){
  const preloader = document.getElementById("preloader");
  const percentEl = document.getElementById("percent");
  const brandEl = document.querySelector(".brand");
  const rects = Array.from(document.querySelectorAll(".loader-rect"));

  let pct = 0;
  const interval = setInterval(() => {
    pct++;
    percentEl.textContent = pct + "%";
    if(pct >= 100){
      clearInterval(interval);
      startRectsAnimation();
    }
  }, 20);

function startRectsAnimation(){
  // متن و درصد رو مخفی کن
  brandEl.style.display = "none";
  percentEl.style.display = "none";

  // مرحله اول: یکی یکی از پایین بیان بالا
  rects.forEach((rect, i) => {
    setTimeout(() => {
      rect.style.transform = "translateY(0%)";
    }, i * 300);
  });

  // وقتی همه مستطیل‌ها رسیدن بالا → پس‌زمینه سفید رو حذف کن
  setTimeout(() => {
    preloader.classList.add("done-bg");
  }, rects.length * 300 + 500); // اینجا زمانو تنظیم کردم

  // بعد از اومدن همه، یکی یکی از بالا برن بیرون
  setTimeout(() => {
    rects.forEach((rect, i) => {
      setTimeout(() => {
        rect.style.transform = "translateY(-100%)";
      }, i * 300);
    });

    // بعد از پایان انیمیشن کل preloader حذف بشه
    setTimeout(() => {
      preloader.remove();
    }, rects.length * 300 + 800);

  }, rects.length * 300 + 1200);
}
})();
  window.addEventListener("load", function() {
    document.getElementById("preloader").style.display = "none";
  });
