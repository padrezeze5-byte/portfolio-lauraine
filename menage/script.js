function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('active');
}
function devis(service){
  document.getElementById('service').value = service;
  document.getElementById('contact').scrollIntoView({behavior:'smooth'});
}
function sendWhatsApp(e){
  e.preventDefault();
  const nom = document.getElementById('nom').value;
  const service = document.getElementById('service').value;
  const msg = document.getElementById('msg').value;
  const text = `Bonjour Mafina Services 👋%0A%0AJe suis ${nom}%0AService: ${service}%0ADetails: ${msg}%0A%0AJe veux un devis svp!`;
  window.open(`https://wa.me/2250585961379?text=${text}`, '_blank');
}