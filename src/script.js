// --- Conversion de devises ---
const EUR_TO_USD = 1.18; // taux euro -> dollar
const EUR_TO_AUD = 1.79; // taux euro -> dollar australien

// Sélection des champs du formulaire de conversion
const euroBtn = document.getElementById('euroBtn');
const usdBtn = document.getElementById('usdBtn');
const audBtn = document.getElementById('audBtn');

// Conversion au clic du bouton "Convertir"
document.getElementById('convertBtn').addEventListener('click', ()=>{
    const e = parseFloat(euroBtn.value) || 0; // lire la valeur euro
    usdBtn.value = (e * EUR_TO_USD).toFixed(2); // calcul USD
    audBtn.value = (e * EUR_TO_AUD).toFixed(2); // calcul AUD
});

// --- Conversion dynamique bidirectionnelle ---
const euro = document.getElementById('euro');
const usd = document.getElementById('usd');
const aud = document.getElementById('aud');
let ignore = false; // éviter les boucles infinies lors de la mise à jour

function updateFromEUR(){
    if(ignore) return; ignore = true;
    const e = parseFloat(euro.value) || 0;
    usd.value = (e * EUR_TO_USD).toFixed(2);
    aud.value = (e * EUR_TO_AUD).toFixed(2);
    ignore = false;
}
function updateFromUSD(){
    if(ignore) return; ignore = true;
    const u = parseFloat(usd.value) || 0;
    const e = u / EUR_TO_USD;
    euro.value = e.toFixed(2);
    aud.value = (e * EUR_TO_AUD).toFixed(2);
    ignore = false;
}
function updateFromAUD(){
    if(ignore) return; ignore = true;
    const a = parseFloat(aud.value) || 0;
    const e = a / EUR_TO_AUD;
    euro.value = e.toFixed(2);
    usd.value = (e * EUR_TO_USD).toFixed(2);
    ignore = false;
}

// Événements d'entrée pour conversion automatique
euro.addEventListener('input', updateFromEUR);
usd.addEventListener('input', updateFromUSD);
aud.addEventListener('input', updateFromAUD);
updateFromEUR(); // initialise les valeurs

// --- Curseur de volume ---
const vol = document.getElementById('volume');
const out = document.getElementById('rangeOutput');
out.textContent = vol.value; // valeur initiale
vol.addEventListener('input', ()=> out.textContent = vol.value );

// --- Lien Wikipédia dynamique ---
const wikiLink = document.querySelector('.wiki-link');
wikiLink.href = "https://fr.wikipedia.org/";  

// --- Champ texte avec vérification ---
const inputText = document.querySelector('form input[type="text"]');
const btn = document.querySelector('button');
btn.addEventListener('click', function() {
  const val = inputText.value.trim();
  if (val !== "Oui" && val !== "Non") {    
    inputText.value = "Entrez Oui ou Non";
  } 
});

// --- Boutons radio et texte associé ---
const radio1 = document.querySelector('#radio1');
const radio2 = document.querySelector('#radio2');
const radio3 = document.querySelector('#radio3');
radio1.nextSibling.textContent = "HP";
radio2.nextSibling.textContent = "Casque";
radio3.nextSibling.textContent = "Bluetooth";

// --- Mise à jour du label du volume selon le radio choisi ---
const radios = document.querySelectorAll('input[name="choix"]');
const volumeSpan = document.querySelector('.range-row span');
radios.forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.value == "1") volumeSpan.textContent = "Volume HP";
    else if (this.value == "2") volumeSpan.textContent = "Volume Casque";
    else if (this.value == "3") volumeSpan.textContent = "Volume Bluetooth";
  });
});

// --- Checkbox pour couper le volume ---
const checkboxLabel = document.querySelector("label[for='check']");
checkboxLabel.textContent = "Mute";
const checkbox = document.getElementById('check');
checkbox.addEventListener('change', function() {
  vol.disabled = this.checked; // désactive le curseur si coché
});

// --- Ajout d'une image dans la carte ---
const card = document.querySelector('.card');
const img = document.createElement('img');
img.src = "https://upload.wikimedia.org/wikipedia/commons/b/bd/UPHF_logo.svg";
img.width = 200; 
card.appendChild(img);

// --- Menu pour afficher/masquer sections ---
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section'); 
  sections.forEach(sec => sec.style.display = 'none'); // cacher toutes les sections

  const menu = document.createElement('div');
  menu.id = 'menu';
  menu.innerHTML = `
    <h2>Menu</h2>
    <label><input type="checkbox" data-target="convertSection"> Conversion</label>
    <label><input type="checkbox" data-target="card"> Lien et images</label>
  `;
  document.body.insertBefore(menu, document.body.firstChild);

  const checkboxes = menu.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.checked = false; 
    cb.addEventListener('change', function() {
      const targetId = this.getAttribute('data-target');
      const targetEl = document.getElementById(targetId) || document.querySelector(`.${targetId}`);
      if (this.checked) targetEl.style.display = 'block';
      else targetEl.style.display = 'none';
    });
  });
});

// --- Récupérer l'année depuis le champ date ---
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('dateInput');
  dateInput.addEventListener('change', () => {
    const dateValue = new Date(dateInput.value);
    const year = dateValue.getFullYear();
    console.log('Année choisie :', year);
  });

  // --- Progress bars ---
  const progresses = document.querySelectorAll('progress');
  progresses.forEach(p => p.value = 0); // réinitialise les barres

  let progressValue = 0;
  const interval = setInterval(() => {
    progressValue += 5; // augmenter de 5% chaque seconde
    if (progressValue > 100) progressValue = 100; 
    progresses.forEach(p => p.value = progressValue);
    if (progressValue >= 100) clearInterval(interval);
  }, 1000); 
});
