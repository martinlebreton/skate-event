import {
  BADGE_EVENT_TYPE,
  BADGE_STATUT,
  BADGE_TYPE_ORG,
  BADGE_TARIF,
} from "../../constants";

function Badge({ type, value, size = "md" }) {
  const styles = {
    eventType: BADGE_EVENT_TYPE,
    statut: BADGE_STATUT,
    typeOrg: BADGE_TYPE_ORG,
    tarif: BADGE_TARIF,
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
