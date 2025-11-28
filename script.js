// small UI interactions: year, nav toggle, simple contact validation, lightbox fallback
document.addEventListener("DOMContentLoaded", function(){
  // set year in multiple spots
  const y = new Date().getFullYear();
  document.querySelectorAll("#year, #year-courses").forEach(el => { if(el) el.textContent = y });

  // nav toggle
  const toggle = document.getElementById("nav-toggle") || document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav") || document.querySelector(".nav");
  if(toggle && nav){
    toggle.addEventListener("click", ()=> {
      nav.classList.toggle("open");
      if(nav.classList.contains("open")) { nav.style.display = "flex"; }
      else { nav.style.display = ""; }
    });
  }

  // contact form validation + fake submit
  const form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const status = document.getElementById("form-status");
      status.textContent = "";
      // simple checks
      if(!name.value || name.value.trim().length < 2){ status.textContent = "Please enter a valid name."; name.focus(); return }
      if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)){ status.textContent = "Please enter a valid email."; email.focus(); return }
      if(!message.value || message.value.trim().length < 10){ status.textContent = "Message is too short."; message.focus(); return }
      // show sending -> success (simulate)
      status.textContent = "Sending...";
      setTimeout(()=> {
        status.textContent = "Thanks — your message was sent (simulated). We will reply soon.";
        form.reset();
      }, 900);
    });
  }

  // simple lightbox: if anchor links to image, open in new tab as fallback
  document.querySelectorAll('.glightbox').forEach(a=>{
    a.addEventListener('click', function(e){
      // try to open native lightbox if available, otherwise open image in overlay
      e.preventDefault();
      const src = this.getAttribute('href');
      openImageOverlay(src);
    });
  });

  function openImageOverlay(src){
    // create overlay
    const existing = document.getElementById('img-overlay');
    if(existing) existing.remove();
    const o = document.createElement('div');
    o.id = 'img-overlay';
    o.style.position='fixed';
    o.style.inset=0;
    o.style.background='rgba(0,0,0,0.85)';
    o.style.display='flex';
    o.style.alignItems='center';
    o.style.justifyContent='center';
    o.style.zIndex=9999;
    o.innerHTML = '<img src="'+src+'" style="max-width:90%;max-height:90%;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.8)"><button aria-label="close" id="img-overlay-close" style="position:absolute;right:18px;top:18px;background:transparent;border:2px solid rgba(255,255,255,0.06);color:#fff;padding:8px;border-radius:8px">✕</button>';
    document.body.appendChild(o);
    document.getElementById('img-overlay-close').addEventListener('click', ()=> o.remove());
    o.addEventListener('click', (ev)=> { if(ev.target===o) o.remove(); });
  }
});
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".year").forEach(y=> y.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if(toggle){
    toggle.onclick = ()=> nav.classList.toggle("open");
  }

  const form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const msg = document.getElementById("message");
      const status = document.getElementById("status");

      if(!/^\S+@\S+\.\S+$/.test(email.value)){
        status.textContent="Enter valid email.";return;
      }
      if(!/^[0-9]{10}$/.test(phone.value)){
        status.textContent="Phone must be 10 digits.";return;
      }
      if(msg.value.trim().length<10){
        status.textContent="Message too short.";return;
      }

      status.textContent="Message sent successfully!";
      form.reset();
    });
  }
});
