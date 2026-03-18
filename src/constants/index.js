// ── Types d'événements ────────────────────────────────────
export const EVENT_TYPES = ["Street", "Bowl", "Ramp"];

// ── Types d'organisation ──────────────────────────────────
export const ORG_TYPES = [
  "Association",
  "Fédération",
  "Institution publique",
  "Skateshop",
];

// ── Statuts organisateur ──────────────────────────────────
export const ORG_STATUTS = [
  "Compte en attente",
  "Compte vérifié",
  "Compte validé",
  "Compte bloqué",
];

// ── Régions de France ─────────────────────────────────────
export const REGIONS = [
  "Auvergne-Rhône-Alpes",
  "Bourgogne-Franche-Comté",
  "Bretagne",
  "Centre-Val de Loire",
  "Corse",
  "Grand Est",
  "Guadeloupe",
  "Guyane",
  "Hauts-de-France",
  "Île-de-France",
  "La Réunion",
  "Martinique",
  "Mayotte",
  "Normandie",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur",
];

// ── Styles badges type d'événement ───────────────────────
export const BADGE_EVENT_TYPE = {
  Street: "bg-teal-700 dark:bg-teal-400 text-white dark:text-slate-900",
  Bowl: "bg-amber-700 dark:bg-amber-400 text-white dark:text-slate-900",
  Ramp: "bg-violet-700 dark:bg-violet-400 text-white dark:text-slate-900",
};

// ── Styles badges statut organisateur ────────────────────
export const BADGE_STATUT = {
  "Compte validé":
    "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400",
  "Compte vérifié":
    "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  "Compte bloqué": "bg-red-50 dark:bg-red-950 text-red-500",
  "Compte en attente":
    "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
};

// ── Styles badges type d'organisation ────────────────────
export const BADGE_TYPE_ORG = {
  Association: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  Fédération:
    "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
  "Institution publique":
    "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300",
  Skateshop: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
};

// ── Styles badges tarif ───────────────────────────────────
export const BADGE_TARIF = {
  Gratuit: "bg-green-200 dark:bg-green-800 text-green-600 dark:text-green-500",
  Payant: "bg-amber-200 dark:bg-amber-800 text-amber-600 dark:text-amber-500",
};
