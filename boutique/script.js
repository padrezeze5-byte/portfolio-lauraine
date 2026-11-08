// 1. La liste de tes produits (tu peux changer noms, prix, emojis)
const produits = [
  { id: 1, nom: "Sac en pagne", prix: 8000, emoji: "👜" },
  { id: 2, nom: "Bracelet perlé", prix: 2500, emoji: "📿" },
  { id: 3, nom: "Savon naturel", prix: 1500, emoji: "🧼" },
  { id: 4, nom: "Bougie parfumée", prix: 3500, emoji: "🕯️" },
  { id: 5, nom: "Panier tressé", prix: 6000, emoji: "🧺" }
];

// 2. Le panier : on récupère celui sauvegardé, sinon il est vide
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// 3. Les éléments de la page
const zoneProduits = document.getElementById("produits");
const listePanier = document.getElementById("liste-panier");
const totalElement = document.getElementById("total");
const videMessage = document.getElementById("vide");
const boutonVider = document.getElementById("vider");
const boutonCommander = document.getElementById("commander");

// 4. Écrire un nombre comme "12 500 FCFA"
function formater(nombre) {
  return nombre.toLocaleString("fr-FR") + " FCFA";
}

// 5. Afficher les produits sur la page
function afficherProduits() {
  let html = "";
  produits.forEach(function (p) {
    html += `
      <article class="produit">
        <div class="image">${p.emoji}</div>
        <h3>${p.nom}</h3>
        <p class="prix">${formater(p.prix)}</p>
        <button data-ajouter="${p.id}">Ajouter</button>
      </article>`;
  });
  zoneProduits.innerHTML = html;
}

// 6. Ajouter un produit au panier
function ajouter(id) {
  const ligne = panier.find(function (l) { return l.id === id; });
  if (ligne) {
    ligne.quantite += 1;
  } else {
    panier.push({ id: id, quantite: 1 });
  }
  mettreAJour();
}

// 7. Changer la quantité (+1 ou -1). À 0, le produit disparaît.
function changerQuantite(id, changement) {
  const ligne = panier.find(function (l) { return l.id === id; });
  if (!ligne) return;
  ligne.quantite += changement;
  if (ligne.quantite <= 0) {
    panier = panier.filter(function (l) { return l.id !== id; });
  }
  mettreAJour();
}

// 8. Afficher le panier, calculer le total, préparer le lien WhatsApp
function afficherPanier() {
  let html = "";
  let total = 0;
  let resume = "Bonjour, je voudrais commander :%0A";

  panier.forEach(function (ligne) {
    const p = produits.find(function (x) { return x.id === ligne.id; });
    const sousTotal = p.prix * ligne.quantite;
    total += sousTotal;
    resume += "- " + ligne.quantite + " x " + p.nom + "%0A";
    html += `
      <li>
        <span>${p.emoji} ${p.nom}</span>
        <span class="quantite">
          <button data-moins="${p.id}">-</button>
          ${ligne.quantite}
          <button data-plus="${p.id}">+</button>
        </span>
        <strong>${formater(sousTotal)}</strong>
      </li>`;
  });

  listePanier.innerHTML = html;
  totalElement.textContent = formater(total);
  videMessage.classList.toggle("cache", panier.length > 0);
  boutonVider.classList.toggle("cache", panier.length === 0);
  boutonCommander.classList.toggle("cache", panier.length === 0);

  // Remplace XXXXXXXXXX par ton numéro (sans espace), ex : 2250700000000
  const numero = "225XXXXXXXXXX";
  resume += "Total : " + encodeURIComponent(formater(total));
  boutonCommander.href = "https://wa.me/" + numero + "?text=" + resume;
}

// 9. Tout mettre à jour + sauvegarder dans le navigateur
function mettreAJour() {
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
}

// 10. Écouter les clics sur les boutons
document.addEventListener("click", function (e) {
  const d = e.target.dataset;
  if (d.ajouter) ajouter(Number(d.ajouter));
  if (d.plus) changerQuantite(Number(d.plus), 1);
  if (d.moins) changerQuantite(Number(d.moins), -1);
});

boutonVider.addEventListener("click", function () {
  panier = [];
  mettreAJour();
});

// 11. Au chargement de la page
afficherProduits();
afficherPanier();