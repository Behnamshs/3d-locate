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
  document.body.classList.remove('body-locked'); // همین‌جا پاکش کن
  setTimeout(() => {
    sidebar.style.display = 'none';
  }, 300); // طول ترنزیشن Sidebar
});
document.querySelectorAll('.accordion-title').forEach(title => {
  title.addEventListener('click', () => {
    const accordion = title.parentElement;

    // بستن بقیه آکاردئون‌ها
    document.querySelectorAll('.accordion').forEach(acc => {
      if (acc !== accordion) {
        acc.classList.remove('active');
      }
    });

    // باز/بسته کردن آکاردئون کلیک شده
    accordion.classList.toggle('active');
  });
});
pannellum.viewer('panorama', {
  "type": "equirectangular",
  "panorama": "https://pannellum.org/images/alma.jpg", // نمونه عمومی
  "autoLoad": true,
  "showZoomCtrl": true,
  "showFullscreenCtrl": true,
  "yaw": 180,
  "pitch": 0
});
const viewer = pannellum.viewer('panorama', {
  "type": "equirectangular",
  "panorama": "https://pannellum.org/images/alma.jpg",
  "autoLoad": true,
  "showZoomCtrl": true,
  "showFullscreenCtrl": true,
  "yaw": 180,
  "pitch": 0
});

// اضافه کردن دکمه شیر
const shareBtn = document.createElement('div');
shareBtn.className = 'pnml-share';
document.getElementById('panorama').appendChild(shareBtn);

// اکشن دکمه شیر
shareBtn.addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('لینک کپی شد ✅');
});
// سومین آیتم داخل اکشن
const thirdActionItem = document.querySelectorAll('.action .item')[2];
const commentIcon2 = thirdActionItem.querySelector('i.fa-commenting-o');

const comments = document.querySelector('.tozihat .comments');
const description = document.querySelector('.tozihat .description');

let isOpen = false;

commentIcon2.addEventListener('click', () => {
  if (!isOpen) {
    comments.classList.add('open');
    description.style.transition = 'margin-top 0.5s ease';
    description.style.marginTop = '1rem'; // هل دادن توضیحات پایین با فاصله طبیعی
    commentIcon2.className = 'fa fa-times';
    isOpen = true;
  } else {
    comments.classList.remove('open');
    description.style.marginTop = '0';
    commentIcon2.className = 'fa fa-commenting-o';
    isOpen = false;
  }
});

const loadMoreBtn = comments.querySelector('.load-more-comments');
const commentList = comments.querySelector('.comment-list');

let moreCommentsAdded = false; // آیا کامنت‌های بیشتر اضافه شده‌اند
let moreCommentsVisible = false; // آیا کامنت‌های بیشتر در حال حاضر نمایش داده می‌شوند

// آرایه کامنت‌های بیشتر
const extraComments = [
  {name: 'نیما', text: 'فضای کار گروهی خیلی مناسبه.'},
  {name: 'سارا', text: 'قهوه لاته اینجا خیلی خوشمزه‌ست.'},
  {name: 'حسین', text: 'موسیقی ملایم عالیه.'}
];

loadMoreBtn.addEventListener('click', () => {
  if (!moreCommentsAdded) {
    // اضافه کردن کامنت‌ها فقط یک بار
    extraComments.forEach(c => {
      const div = document.createElement('div');
      div.className = 'comment extra-comment'; // کلاس extra-comment برای toggle
      div.style.display = 'none'; // ابتدا مخفی
      const strong = document.createElement('strong');
      strong.className = 'username';
      strong.textContent = c.name;
      const p = document.createElement('p');
      p.className = 'comment-text';
      p.textContent = c.text;

      div.appendChild(strong);
      div.appendChild(p);
      commentList.appendChild(div);
    });
    moreCommentsAdded = true;
  }

  const extraCommentDivs = commentList.querySelectorAll('.extra-comment');

  if (!moreCommentsVisible) {
    extraCommentDivs.forEach(div => div.style.display = 'block'); // نمایش کامنت‌ها
    loadMoreBtn.textContent = 'کامنت کمتر';
    moreCommentsVisible = true;
  } else {
    extraCommentDivs.forEach(div => div.style.display = 'none'); // مخفی کردن کامنت‌ها
    loadMoreBtn.textContent = 'کامنت‌های بیشتر';
    moreCommentsVisible = false;
  }
});
function initMap() {
    const sari = { lat: 36.5634, lng: 53.0790 }; // مختصات ساری
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: sari,
      gestureHandling: 'greedy' // قابلیت Drag/Zoom با انگشت و ماوس
    });

    const marker = new google.maps.Marker({
      position: sari,
      map: map,
      title: "کافه فلان",
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // مارکر قرمز
    });
  }

  window.onload = initMap;
const shareActionItem = document.querySelectorAll('.action .item')[0];
const shareIcon = shareActionItem.querySelector('i.fa-share-alt');
const sharePanel = document.querySelector('.tozihat .share-panel');

const commentPanel = document.querySelector('.tozihat .comments');
const commentIcon = document.querySelectorAll('.action .item')[2].querySelector('i.fa-commenting-o');

let shareOpen = false;
let commentOpen = false;

// کامنت toggle
commentIcon.addEventListener('click', () => {
  if (!commentOpen) {
    commentPanel.classList.add('open');
    commentIcon.className = 'fa fa-times';
    commentOpen = true;

    // اگر share باز بود، ببندش
    if (shareOpen) {
      sharePanel.classList.remove('open');
      shareIcon.className = 'fa fa-share-alt';
      shareOpen = false;
    }
  } else {
    commentPanel.classList.remove('open');
    commentIcon.className = 'fa fa-commenting-o';
    commentOpen = false;
  }
});

// share toggle
shareIcon.addEventListener('click', () => {
  if (!shareOpen) {
    sharePanel.classList.add('open');
    shareIcon.className = 'fa fa-times';
    shareOpen = true;

    // اگر کامنت باز بود، ببندش
    if (commentOpen) {
      commentPanel.classList.remove('open');
      commentIcon.className = 'fa fa-commenting-o';
      commentOpen = false;
    }
  } else {
    sharePanel.classList.remove('open');
    shareIcon.className = 'fa fa-share-alt';
    shareOpen = false;
  }
});