const slider = document.querySelector('.slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
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
  const walk = (x - startX) * 1.5; // سرعت جابه‌جایی
  slider.scrollLeft = scrollLeft - walk;
});

window.addEventListener('load', () =>{
    const slider = document.querySelector('.slider');
    slider.scrollLeft = slider.scrollWidth;
});
slider.scrollLeft = slider.scrollWidth / 2;

// Sidebar toggle
const btn3 = document.querySelector('.btn3');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn')
btn3.addEventListener('click', () => {
  sidebar.style.display = 'block';
  setTimeout(() => {
    sidebar.classList.add('open');
  }, 10);
})
closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebar.addEventListener('transitionend', () => {
    if (!sidebar.classList.contains('open')) {
      sidebar.style.display = 'none';
    }
  }, { once: true });
});