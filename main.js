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
    document.body.style.overflow = 'hidden'; // قفل اسکرول صفحه اصلی
  }, 10);
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebar.addEventListener('transitionend', () => {
    if (!sidebar.classList.contains('open')) {
      sidebar.style.display = 'none';
      document.body.style.overflow = ''; // آزاد شدن اسکرول صفحه اصلی
    }
  }, { once: true });
});
//dark mode&lightmode
const btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
const btn2 = document.querySelector('.btn2');
const input = btn2.querySelector('input');

//baraye bastan search
// وقتی روی دکمه کلیک شد
btn2.addEventListener('click', (e) => {
  if (!btn2.classList.contains('active')) {
    btn2.classList.add('active');
    input.focus();
  }
});

// وقتی بیرون کلیک شد، ببند
document.addEventListener('click', (e) => {
  if (!btn2.contains(e.target)) {
    btn2.classList.remove('active');
    input.value = "";
  }
});
