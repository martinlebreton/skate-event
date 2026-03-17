// ── Formatage des dates pour l'app SkateEvt ──────────────

/**
 * Formate une date en jour long français
 * Ex: "mercredi 15 avril 2026"
 */
export function formatJour(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formate une date en heure française
 * Ex: "14h00"
 */
export function formatHeure(date) {
  return new Date(date)
    .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    .replace(":", "h");
}

/**
 * Formate une date en format court
 * Ex: "15 avr. 2026"
 */
export function formatDateCourte(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formate une date en format agenda "Du ... au ..."
 * Gère 3 cas :
 * - Pas de fin     → "Le mercredi 15 avril 2026 à 14h00"
 * - Même jour      → "Le mercredi 15 avril 2026\nde 14h00 à 18h00"
 * - Jours différents → "Du mercredi 15 avril à 14h00\nau vendredi 17 avril 2026 à 18h00"
 */
export function formatAgenda(dateDebut, dateFin) {
  const debut = new Date(dateDebut);
  const fin = dateFin ? new Date(dateFin) : null;

  if (!fin) {
    return "Le " + formatJour(debut) + " à " + formatHeure(debut);
  }

  const memeJour = debut.toDateString() === fin.toDateString();

  if (memeJour) {
    return (
      "Le " +
      formatJour(debut) +
      "\nde " +
      formatHeure(debut) +
      " à " +
      formatHeure(fin)
    );
  }

  return (
    "Du " +
    formatJour(debut) +
    " à " +
    formatHeure(debut) +
    "\nau " +
    formatJour(fin) +
    " à " +
    formatHeure(fin)
  );
}
