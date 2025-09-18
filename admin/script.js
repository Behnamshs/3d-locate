/* common behavior for sidebar burger and form/map/validations */
function setupBurger(burgerId, sidebarId) {
  const burger = document.getElementById(burgerId);
  const sidebar = document.getElementById(sidebarId);
  if (!burger || !sidebar) return;
  burger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    burger.textContent = sidebar.classList.contains('open') ? '×' : '≡';
  });
}

/* initialize burgers for pages */
setupBurger('burger','sidebar');
setupBurger('burger2','sidebar2');
setupBurger('burger3','sidebar3');
setupBurger('burger4','sidebar4');

/* ===== form validations and image checks (square images) ===== */
function countWords(text){
  const cleaned = text.replace(/\u200C/g,' ').trim();
  const m = cleaned.match(/\S+/g);
  return m ? m.length : 0;
}
function firstNWords(text,n){
  const cleaned = text.replace(/\u200C/g,' ').trim();
  const m = cleaned.match(/\S+/g) || [];
  return m.slice(0,n).join(' ');
}
function checkImageIsSquare(file){
  return new Promise((res,rej)=>{
    if(!file) return rej('فایل انتخاب نشده');
    if(!file.type || !file.type.startsWith('image/')) return rej('فایل تصویر نیست');
    const r = new FileReader();
    r.onload = e => {
      const img = new Image();
      img.onload = ()=>{
        if(img.naturalWidth !== img.naturalHeight) rej('تصویر مربع نیست');
        else res();
      };
      img.onerror = ()=> rej('خواندن تصویر ناموفق');
      img.src = e.target.result;
    };
    r.onerror = ()=> rej('خطای خواندن فایل');
    r.readAsDataURL(file);
  });
}

/* preview and quick check */
function handlePreviewAndValidate(inputEl, previewEl, errorEl){
  const file = inputEl.files && inputEl.files[0];
  errorEl.textContent='';
  previewEl.style.display='none';
  if(!file) return;
  if(!file.type || !file.type.startsWith('image/')){
    errorEl.textContent='فایل تصویر نیست';
    return;
  }
  const url = URL.createObjectURL(file);
  previewEl.src = url;
  previewEl.style.display='block';
  const img = new Image();
  img.onload = ()=>{
    if(img.naturalWidth !== img.naturalHeight) errorEl.textContent='تصویر مربع نیست';
    else errorEl.textContent='';
    URL.revokeObjectURL(url);
  };
  img.onerror = ()=>{ errorEl.textContent='خطای نمایش تصویر'; URL.revokeObjectURL(url); };
  img.src = url;
}

/* add listeners if form exists */
const form = document.getElementById('businessForm');
if(form){
  const mainImageInput = document.getElementById('mainImage');
  const logoInput = document.getElementById('logo');
  const mainImageError = document.getElementById('mainImageError');
  const logoError = document.getElementById('logoError');
  const mainPreview = document.getElementById('mainImagePreview');
  const logoPreview = document.getElementById('logoPreview');
  const desc = document.getElementById('description');
  const descCounter = document.getElementById('descCounter');
  const locationInput = document.getElementById('location');
  const mapError = document.getElementById('mapError');

  mainImageInput.addEventListener('change', ()=> handlePreviewAndValidate(mainImageInput, mainPreview, mainImageError));
  logoInput.addEventListener('change', ()=> handlePreviewAndValidate(logoInput, logoPreview, logoError));

  desc.addEventListener('input', ()=>{
    const n = countWords(desc.value);
    if(n>85){
      desc.value = firstNWords(desc.value,85);
      descCounter.textContent = '85';
    } else descCounter.textContent = String(n);
  });

  /* init leaflet map */
  try{
    const map = L.map('map').setView([35.6892,51.3890],12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
    let marker;
    map.on('click', function(e){
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      if(marker) map.removeLayer(marker);
      marker = L.marker([lat,lng]).addTo(map);
      locationInput.value = lat + ',' + lng;
      mapError.textContent='';
    });
  }catch(e){
    if(document.getElementById('mapError')) document.getElementById('mapError').textContent = 'خطا در بارگذاری نقشه';
    console.error(e);
  }

  form.addEventListener('submit', async function(ev){
    ev.preventDefault();
    // validate description
    const n = countWords(desc.value);
    if(n>85){ alert('توضیحات بیش از 85 کلمه است'); return; }
    if(!locationInput.value){ alert('لوکیشن انتخاب نشده'); return; }

    const mainFile = mainImageInput.files[0];
    const logoFile = logoInput.files[0];
    try{ await checkImageIsSquare(mainFile); } catch(err){ mainImageError.textContent = String(err); mainImageInput.focus(); return; }
    try{ await checkImageIsSquare(logoFile); } catch(err){ logoError.textContent = String(err); logoInput.focus(); return; }

    alert('ولیدیشن موفق — آماده ارسال به سرور (در نسخه نمونه فقط پیام نمایش داده می‌شود)');
  });
}

/* deletable rows behavior with confirm */
document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains('delete-btn')){
    if(confirm('آیا از حذف مطمئن هستید؟')){
      const tr = e.target.closest('tr');
      if(tr) tr.remove();
    }
  }
});