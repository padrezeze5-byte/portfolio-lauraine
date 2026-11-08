// 1. On récupère les éléments de la page
const prixInput = document.getElementById("prix");
const quantiteInput = document.getElementById("quantite");
const remiseInput = document.getElementById("remise");
const bouton = document.getElementById("bouton");
const message = document.getElementById("message");
const resultat = document.getElementById("resultat");

// 2. Une fonction pour écrire un nombre comme "12 500 FCFA"
function formater(nombre) {
  return Math.round(nombre).toLocaleString("fr-FR") + " FCFA";
}

// 3. Ce qui se passe quand on clique sur "Calculer"
bouton.addEventListener("click", function () {
  const prix = Number(prixInput.value);
  const quantite = Number(quantiteInput.value);
  const remise = Number(remiseInput.value);

  // Vérifications : on protège contre les erreurs
  if (prixInput.value === "" || prix < 0) {
    message.textContent = "Entre un prix valide.";
    resultat.classList.add("cache");
    return;
  }
  if (quantite < 1) {
    message.textContent = "La quantité doit être au moins 1.";
    resultat.classList.add("cache");
    return;
  }
  if (remise < 0 || remise > 100) {
    message.textContent = "La remise doit être entre 0 et 100.";
    resultat.classList.add("cache");
    return;
  }

  // Les calculs
  const sousTotal = prix * quantite;
  const montantRemise = sousTotal * (remise / 100);
  const total = sousTotal - montantRemise;

  // On affiche les résultats
  message.textContent = "";
  document.getElementById("sousTotal").textContent = formater(sousTotal);
  document.getElementById("montantRemise").textContent = "- " + formater(montantRemise);
  document.getElementById("total").textContent = formater(total);
  resultat.classList.remove("cache");
});