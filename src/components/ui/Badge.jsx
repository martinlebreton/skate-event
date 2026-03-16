// Styles par type d'event
const eventTypeStyles = {
  Street: "bg-teal-700 dark:bg-teal-400 text-white dark:text-slate-900",
  Bowl: "bg-amber-700 dark:bg-amber-400 text-white dark:text-slate-900",
  Ramp: "bg-violet-700 dark:bg-violet-400 text-white dark:text-slate-900",
};

// Styles par statut organisateur
const statutStyles = {
  "Compte validé":
    "bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400",
  "Compte vérifié":
    "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  "Compte bloqué": "bg-red-50 dark:bg-red-950 text-red-500",
  "Compte en attente":
    "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
};

// Styles par type d'organisation
const typeOrgStyles = {
  Association: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  Fédération:
    "bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400",
  "Institution publique":
    "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300",
  Skateshop: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
};

function Badge({ type, value, size = "md" }) {
  // Choisit le bon style selon le type de badge
  const styles = {
    eventType: eventTypeStyles,
    statut: statutStyles,
    typeOrg: typeOrgStyles,
  };

  const style =
    styles[type]?.[value] ||
    "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300";

  const sizeClass = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-[11px] px-2.5 py-0.5",
    lg: "text-xs px-3 py-1",
  };

  return (
    <span
      className={
        "inline-flex items-center font-semibold rounded-full " +
        sizeClass[size] +
        " " +
        style
      }
    >
      {value}
    </span>
  );
}

export default Badge;
